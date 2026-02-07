/**
 * FlightController — Shuttlecraft flight system
 *
 * State machine:
 *   ORBITING -> DEPARTING (0.8s) -> IN_TRANSIT (variable) -> ARRIVING (1.0s) -> ORBITING
 *
 * Generates CatmullRomCurve3 arcs between planets and drives the camera
 * along them. Integrates with camera-controls via setLookAt for smooth
 * transitions, and ConnectionManager for active-lane highlighting.
 */
import * as THREE from 'three';
import { FLIGHT_CONFIG } from '../constants';

const STATES = {
  ORBITING: 'ORBITING',
  DEPARTING: 'DEPARTING',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVING: 'ARRIVING',
};

// Reusable temporaries (avoid per-frame allocation)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();

/**
 * Ease-in-out cubic
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export class FlightController {
  constructor() {
    this.state = STATES.ORBITING;
    this._camera = null;
    this._controls = null;

    // Current flight data
    this._curve = null;
    this._targetNode = null;
    this._sourcePosition = new THREE.Vector3();
    this._targetPosition = new THREE.Vector3();

    // Timing
    this._elapsed = 0;
    this._phaseDuration = 0;

    // Resolve callback for flyTo promise
    this._resolveFlightPromise = null;

    // Connection manager hook (set externally)
    this._onActiveConnection = null;
    this._onClearConnection = null;
    this._sourceNodeId = null;
    this._targetNodeId = null;
  }

  /**
   * Bind camera and controls references.
   * Must be called after scene init.
   */
  init(camera, controls) {
    this._camera = camera;
    this._controls = controls;
  }

  /**
   * Fly from current camera position to a target node.
   * Returns a Promise that resolves when the ARRIVING phase completes.
   *
   * @param {THREE.Object3D} targetNode - the mesh/group to fly to
   * @param {THREE.Camera} camera - (optional, uses stored ref)
   * @param {Object} controls - (optional, uses stored ref)
   * @returns {Promise<void>}
   */
  flyTo(targetNode, camera, controls) {
    const cam = camera || this._camera;
    const ctrl = controls || this._controls;
    if (!cam || !ctrl) {
      return Promise.reject(new Error('FlightController not initialised'));
    }

    // Abort any in-progress flight
    if (this._resolveFlightPromise) {
      this._resolveFlightPromise();
      this._resolveFlightPromise = null;
    }

    this._camera = cam;
    this._controls = ctrl;
    this._targetNode = targetNode;

    // Source: current camera position (world space)
    this._sourcePosition.copy(cam.position);

    // Target: position offset so the camera orbits around the node
    const nodePos = targetNode.position;
    this._targetPosition.copy(nodePos);

    // Store IDs for connection highlighting
    this._sourceNodeId = null; // will be set externally if needed
    this._targetNodeId = targetNode.userData?.id || null;

    // Build flight path
    this._buildCurve();

    // Begin DEPARTING phase
    this._elapsed = 0;
    this._phaseDuration = FLIGHT_CONFIG.departDuration;
    this.state = STATES.DEPARTING;

    // Fire connection highlight
    if (this._onActiveConnection && this._sourceNodeId && this._targetNodeId) {
      this._onActiveConnection(this._sourceNodeId, this._targetNodeId);
    }

    return new Promise((resolve) => {
      this._resolveFlightPromise = resolve;
    });
  }

  /**
   * Build a CatmullRomCurve3 arc between source and target.
   */
  _buildCurve() {
    const src = this._sourcePosition;
    const tgt = this._targetPosition;

    // Midpoint elevated by arcHeightRatio * distance
    const mid = _vec3A.lerpVectors(src, tgt, 0.5);
    const dist = src.distanceTo(tgt);
    mid.y += dist * FLIGHT_CONFIG.arcHeightRatio;

    this._curve = new THREE.CatmullRomCurve3(
      [src.clone(), mid.clone(), tgt.clone()],
      false,
      'catmullrom',
      0.5,
    );

    // Compute transit duration: baseDuration + distance * multiplier, capped
    const raw = FLIGHT_CONFIG.baseDuration + dist * FLIGHT_CONFIG.distanceMultiplier;
    this._transitDuration = Math.min(raw, FLIGHT_CONFIG.maxDuration);
  }

  /**
   * Must be called every frame from the animation loop.
   * @param {number} deltaTime - seconds since last frame
   */
  update(deltaTime) {
    if (this.state === STATES.ORBITING) return;

    this._elapsed += deltaTime;

    switch (this.state) {
      case STATES.DEPARTING:
        this._updateDeparting();
        break;
      case STATES.IN_TRANSIT:
        this._updateTransit();
        break;
      case STATES.ARRIVING:
        this._updateArriving();
        break;
    }
  }

  // -- Phase handlers -------------------------------------------------------

  _updateDeparting() {
    const t = Math.min(this._elapsed / this._phaseDuration, 1);
    const eased = easeInOutCubic(t);

    // During departing, pull the camera back slightly and begin looking at the target
    const nodePos = this._targetPosition;
    const camStart = this._sourcePosition;

    // Zoom out a bit
    _vec3A.copy(camStart).multiplyScalar(1 + eased * 0.05);
    this._camera.position.copy(_vec3A);

    // Smoothly shift look-at toward the target
    if (this._controls) {
      _vec3B.lerpVectors(this._controls.getTarget(_vec3A), nodePos, eased * 0.3);
      this._controls.setLookAt(
        this._camera.position.x, this._camera.position.y, this._camera.position.z,
        _vec3B.x, _vec3B.y, _vec3B.z,
        false, // no transition — we drive it manually
      );
    }

    if (t >= 1) {
      // Transition to IN_TRANSIT
      this._elapsed = 0;
      this._phaseDuration = this._transitDuration;
      this.state = STATES.IN_TRANSIT;
    }
  }

  _updateTransit() {
    const t = Math.min(this._elapsed / this._phaseDuration, 1);
    const eased = easeInOutCubic(t);

    // Follow the spline
    const point = this._curve.getPoint(eased);

    // Orbit offset: position the camera slightly above and away from the path point
    const nodePos = this._targetPosition;
    const offsetDir = _vec3A.copy(point).sub(nodePos).normalize();
    const orbitDist = 15 * (1 - eased) + 12; // approach from far, settle at comfortable orbit
    const camPos = _vec3B.copy(nodePos).addScaledVector(offsetDir, orbitDist);
    camPos.y = point.y + 3;

    this._camera.position.copy(camPos);

    if (this._controls) {
      // Look at the destination node
      this._controls.setLookAt(
        camPos.x, camPos.y, camPos.z,
        nodePos.x, nodePos.y, nodePos.z,
        false,
      );
    }

    if (t >= 1) {
      this._elapsed = 0;
      this._phaseDuration = FLIGHT_CONFIG.arriveDuration;
      this.state = STATES.ARRIVING;
    }
  }

  _updateArriving() {
    const t = Math.min(this._elapsed / this._phaseDuration, 1);
    const eased = easeInOutCubic(t);

    // Settle into a nice orbit distance
    const nodePos = this._targetPosition;
    const finalDist = 10;
    const startDist = 15;
    const dist = startDist + (finalDist - startDist) * eased;

    // Gentle orbit during arrival
    const angle = eased * Math.PI * 0.25;
    const cx = nodePos.x + Math.sin(angle) * dist;
    const cy = nodePos.y + 2 * (1 - eased) + 1;
    const cz = nodePos.z + Math.cos(angle) * dist;

    this._camera.position.set(cx, cy, cz);

    if (this._controls) {
      this._controls.setLookAt(cx, cy, cz, nodePos.x, nodePos.y, nodePos.z, false);
    }

    if (t >= 1) {
      this.state = STATES.ORBITING;

      // Clear connection highlight
      if (this._onClearConnection) {
        this._onClearConnection();
      }

      // Resolve the flight promise
      if (this._resolveFlightPromise) {
        const resolve = this._resolveFlightPromise;
        this._resolveFlightPromise = null;
        resolve();
      }
    }
  }

  // -- Public queries --------------------------------------------------------

  /** @returns {boolean} true if a flight is in progress */
  isFlying() {
    return this.state !== STATES.ORBITING;
  }

  /** @returns {THREE.Object3D|null} the node we are flying toward */
  getCurrentTarget() {
    return this.state !== STATES.ORBITING ? this._targetNode : null;
  }

  /** @returns {string} current state label */
  getState() {
    return this.state;
  }

  /**
   * Register callbacks for connection lane highlighting.
   * @param {Function} onActive  (parentId, childId) => void
   * @param {Function} onClear   () => void
   */
  setConnectionCallbacks(onActive, onClear) {
    this._onActiveConnection = onActive;
    this._onClearConnection = onClear;
  }

  /**
   * Set the source node ID (used for connection highlighting).
   * Call before flyTo if you want the active lane to glow.
   */
  setSourceNodeId(id) {
    this._sourceNodeId = id;
  }

  /** Clean up references */
  dispose() {
    if (this._resolveFlightPromise) {
      this._resolveFlightPromise();
      this._resolveFlightPromise = null;
    }
    this._camera = null;
    this._controls = null;
    this._curve = null;
    this._targetNode = null;
    this.state = STATES.ORBITING;
  }
}
