import * as THREE from 'three';

/**
 * TourCameraController - Handles smooth camera movements for guided tour
 *
 * Features:
 * - Catmull-Rom spline paths for cinematic camera movement
 * - Variable speed with easing
 * - Orbit capability around nodes
 * - Look-at targeting with smooth transitions
 * - Pause/resume support
 */

class TourCameraController {
  constructor(camera, controls, options = {}) {
    this.camera = camera;
    this.controls = controls;

    // Configuration
    this.defaultDuration = options.defaultDuration || 3000; // ms per segment
    this.orbitDuration = options.orbitDuration || 8000; // ms for full orbit
    this.easing = options.easing || this.easeInOutCubic;

    // State
    this.isAnimating = false;
    this.isPaused = false;
    this.currentAnimation = null;
    this.animationStartTime = 0;
    this.pausedTime = 0;
    this.pauseStartTime = 0;

    // Current path data
    this.currentPath = null;
    this.currentTarget = null;
    this.currentDuration = 0;

    // Callbacks
    this.onComplete = null;
    this.onUpdate = null;
  }

  /**
   * Easing functions
   */
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  /**
   * Move camera to a position looking at a target
   */
  moveTo(position, target, options = {}) {
    return new Promise((resolve) => {
      const {
        duration = this.defaultDuration,
        easing = this.easing,
        onComplete,
        onUpdate
      } = options;

      // Cancel any existing animation
      this.stop();

      // Store current camera state
      const startPosition = this.camera.position.clone();
      const startTarget = this.controls?.getTarget
        ? this.controls.getTarget(new THREE.Vector3())
        : (this.controls?.target?.clone() || new THREE.Vector3(0, 0, 0));

      // Target values
      const endPosition = new THREE.Vector3().copy(position);
      const endTarget = new THREE.Vector3().copy(target);

      this.isAnimating = true;
      this.animationStartTime = performance.now();
      this.currentDuration = duration;
      this.onComplete = () => {
        if (onComplete) onComplete();
        resolve();
      };
      this.onUpdate = onUpdate;

      const animate = () => {
        if (!this.isAnimating) return;

        if (this.isPaused) {
          this.currentAnimation = requestAnimationFrame(animate);
          return;
        }

        const elapsed = performance.now() - this.animationStartTime - this.pausedTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easing(progress);

        // Interpolate position
        this.camera.position.lerpVectors(startPosition, endPosition, eased);

        // Interpolate look-at target
        if (this.controls) {
          const lookTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased);
          if (this.controls.setLookAt) {
            this.controls.setLookAt(
              this.camera.position.x, this.camera.position.y, this.camera.position.z,
              lookTarget.x, lookTarget.y, lookTarget.z,
              false,
            );
          } else {
            this.controls.target.lerpVectors(startTarget, endTarget, eased);
            this.controls.update();
          }
        } else {
          const lookTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased);
          this.camera.lookAt(lookTarget);
        }

        if (this.onUpdate) {
          this.onUpdate(progress);
        }

        if (progress < 1) {
          this.currentAnimation = requestAnimationFrame(animate);
        } else {
          this.isAnimating = false;
          this.currentAnimation = null;
          if (this.onComplete) this.onComplete();
        }
      };

      this.currentAnimation = requestAnimationFrame(animate);
    });
  }

  /**
   * Move camera along a smooth path through multiple waypoints
   */
  moveAlongPath(waypoints, options = {}) {
    return new Promise((resolve) => {
      const {
        duration,
        easing = this.easing,
        lookAt,
        onComplete,
        onUpdate
      } = options;

      if (waypoints.length < 2) {
        console.warn('[TourCameraController] Path needs at least 2 waypoints');
        resolve();
        return;
      }

      // Cancel any existing animation
      this.stop();

      // Create Catmull-Rom curve from waypoints
      const points = waypoints.map(wp => new THREE.Vector3(wp.x, wp.y, wp.z));
      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);

      // Calculate duration based on path length if not specified
      const pathLength = curve.getLength();
      const actualDuration = duration || Math.max(2000, pathLength * 100);

      // Determine look-at target
      const target = lookAt ? new THREE.Vector3().copy(lookAt) : points[points.length - 1];

      this.currentPath = curve;
      this.currentTarget = target;
      this.isAnimating = true;
      this.animationStartTime = performance.now();
      this.currentDuration = actualDuration;
      this.pausedTime = 0;

      this.onComplete = () => {
        if (onComplete) onComplete();
        resolve();
      };
      this.onUpdate = onUpdate;

      const startTarget = this.controls?.getTarget
        ? this.controls.getTarget(new THREE.Vector3())
        : (this.controls?.target?.clone() || new THREE.Vector3(0, 0, 0));

      const animate = () => {
        if (!this.isAnimating) return;

        if (this.isPaused) {
          this.currentAnimation = requestAnimationFrame(animate);
          return;
        }

        const elapsed = performance.now() - this.animationStartTime - this.pausedTime;
        const progress = Math.min(elapsed / actualDuration, 1);
        const eased = easing(progress);

        // Get position along curve
        const point = curve.getPoint(eased);
        this.camera.position.copy(point);

        // Smooth look-at transition
        if (this.controls) {
          const lookTarget = new THREE.Vector3().lerpVectors(startTarget, target, Math.min(eased * 2, 1));
          if (this.controls.setLookAt) {
            this.controls.setLookAt(
              point.x, point.y, point.z,
              lookTarget.x, lookTarget.y, lookTarget.z,
              false,
            );
          } else {
            this.controls.target.lerpVectors(startTarget, target, Math.min(eased * 2, 1));
            this.controls.update();
          }
        } else {
          const lookTarget = new THREE.Vector3().lerpVectors(startTarget, target, Math.min(eased * 2, 1));
          this.camera.lookAt(lookTarget);
        }

        if (this.onUpdate) {
          this.onUpdate(progress);
        }

        if (progress < 1) {
          this.currentAnimation = requestAnimationFrame(animate);
        } else {
          this.isAnimating = false;
          this.currentAnimation = null;
          if (this.onComplete) this.onComplete();
        }
      };

      this.currentAnimation = requestAnimationFrame(animate);
    });
  }

  /**
   * Orbit camera around a target point
   */
  orbitAround(target, options = {}) {
    return new Promise((resolve) => {
      const {
        radius = null,
        duration = this.orbitDuration,
        revolutions = 1,
        direction = 1, // 1 = clockwise, -1 = counter-clockwise
        elevation = null,
        onComplete,
        onUpdate
      } = options;

      // Cancel any existing animation
      this.stop();

      const targetVec = new THREE.Vector3().copy(target);

      // Calculate current camera position relative to target
      const offset = this.camera.position.clone().sub(targetVec);
      const currentRadius = radius || offset.length();
      const currentAzimuth = Math.atan2(offset.x, offset.z);
      const currentElevation = elevation !== null ? elevation : Math.asin(offset.y / currentRadius);

      this.isAnimating = true;
      this.animationStartTime = performance.now();
      this.currentDuration = duration;
      this.pausedTime = 0;

      this.onComplete = () => {
        if (onComplete) onComplete();
        resolve();
      };
      this.onUpdate = onUpdate;

      const animate = () => {
        if (!this.isAnimating) return;

        if (this.isPaused) {
          this.currentAnimation = requestAnimationFrame(animate);
          return;
        }

        const elapsed = performance.now() - this.animationStartTime - this.pausedTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate new azimuth
        const azimuth = currentAzimuth + direction * progress * Math.PI * 2 * revolutions;

        // Calculate new camera position
        const x = targetVec.x + currentRadius * Math.sin(azimuth) * Math.cos(currentElevation);
        const y = targetVec.y + currentRadius * Math.sin(currentElevation);
        const z = targetVec.z + currentRadius * Math.cos(azimuth) * Math.cos(currentElevation);

        this.camera.position.set(x, y, z);

        if (this.controls) {
          if (this.controls.setLookAt) {
            this.controls.setLookAt(x, y, z, targetVec.x, targetVec.y, targetVec.z, false);
          } else {
            this.controls.target.copy(targetVec);
            this.controls.update();
          }
        } else {
          this.camera.lookAt(targetVec);
        }

        if (this.onUpdate) {
          this.onUpdate(progress);
        }

        if (progress < 1) {
          this.currentAnimation = requestAnimationFrame(animate);
        } else {
          this.isAnimating = false;
          this.currentAnimation = null;
          if (this.onComplete) this.onComplete();
        }
      };

      this.currentAnimation = requestAnimationFrame(animate);
    });
  }

  /**
   * Zoom camera to focus on a specific area
   */
  zoomTo(target, distance, options = {}) {
    const {
      duration = this.defaultDuration,
      angle = null, // radians from front
      elevation = 0.3, // radians above horizontal
      ...rest
    } = options;

    const targetVec = new THREE.Vector3().copy(target);

    // Calculate camera position
    const azimuth = angle !== null ? angle : Math.atan2(
      this.camera.position.x - targetVec.x,
      this.camera.position.z - targetVec.z
    );

    const position = new THREE.Vector3(
      targetVec.x + distance * Math.sin(azimuth) * Math.cos(elevation),
      targetVec.y + distance * Math.sin(elevation),
      targetVec.z + distance * Math.cos(azimuth) * Math.cos(elevation)
    );

    return this.moveTo(position, targetVec, { duration, ...rest });
  }

  /**
   * Create a cinematic flyby through multiple nodes
   */
  async flyby(nodes, options = {}) {
    const {
      distanceMultiplier = 1.5,
      heightOffset = 5,
      dwellTime = 2000,
      onNodeReached,
      ...pathOptions
    } = options;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const isLast = i === nodes.length - 1;

      // Calculate viewing position for this node
      const nodePos = new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0);
      const radius = (node.radius || 5) * distanceMultiplier;

      await this.zoomTo(nodePos, radius, {
        elevation: 0.4,
        duration: 2000,
        ...pathOptions
      });

      if (onNodeReached) {
        onNodeReached(node, i);
      }

      // Dwell at node (unless last)
      if (!isLast && dwellTime > 0) {
        await this.delay(dwellTime);
      }
    }
  }

  /**
   * Pause current animation
   */
  pause() {
    if (this.isAnimating && !this.isPaused) {
      this.isPaused = true;
      this.pauseStartTime = performance.now();

      // Disable user controls during tour
      if (this.controls) {
        this.controls.enabled = false;
      }
    }
  }

  /**
   * Resume paused animation
   */
  resume() {
    if (this.isAnimating && this.isPaused) {
      this.pausedTime += performance.now() - this.pauseStartTime;
      this.isPaused = false;

      // Re-enable controls when not animating
      if (this.controls && !this.isAnimating) {
        this.controls.enabled = true;
      }
    }
  }

  /**
   * Stop current animation
   */
  stop() {
    if (this.currentAnimation) {
      cancelAnimationFrame(this.currentAnimation);
      this.currentAnimation = null;
    }
    this.isAnimating = false;
    this.isPaused = false;
    this.pausedTime = 0;
    this.currentPath = null;
    this.currentTarget = null;

    // Re-enable controls
    if (this.controls) {
      this.controls.enabled = true;
    }
  }

  /**
   * Get current animation progress
   */
  getProgress() {
    if (!this.isAnimating || this.currentDuration === 0) return 0;
    const elapsed = performance.now() - this.animationStartTime - this.pausedTime;
    return Math.min(elapsed / this.currentDuration, 1);
  }

  /**
   * Check if currently animating
   */
  isActive() {
    return this.isAnimating;
  }

  /**
   * Utility: delay for ms
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Dispose resources
   */
  dispose() {
    this.stop();
    this.camera = null;
    this.controls = null;
  }
}

export default TourCameraController;
