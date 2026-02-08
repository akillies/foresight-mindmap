/**
 * WarpStreaks — 3D star elongation during shuttlecraft transit
 *
 * Creates a set of LineSegments distributed in a radial cylinder around the
 * camera. During flight transit, lines stretch outward from the screen center
 * with rainbow chromatic dispersion (prismatic effect).
 *
 * Works on both WebGPU and WebGL paths — uses basic LineSegments geometry.
 */
import * as THREE from 'three';

const STREAK_COUNT = 300;
const MAX_STREAK_LENGTH = 12;  // maximum radial elongation at peak speed

/**
 * Create the warp streak system.
 * Returns an object with update() and dispose() methods.
 *
 * @param {THREE.Scene} scene
 * @returns {{ mesh: THREE.LineSegments, update: Function, dispose: Function }}
 */
export function createWarpStreaks(scene) {
  const positions = new Float32Array(STREAK_COUNT * 6); // 2 verts * 3 xyz
  const colors = new Float32Array(STREAK_COUNT * 6);    // 2 verts * 3 rgb

  // Pre-compute base layout: each streak sits at a fixed angle and radius
  // in camera-local space (camera looks down -Z)
  const baseData = [];
  for (let i = 0; i < STREAK_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const innerR = 1.5 + Math.random() * 8;     // distance from center (screen center = camera axis)
    const depth = -5 - Math.random() * 50;       // spread along the -Z (forward) axis
    const speedVar = 0.5 + Math.random() * 1.0;  // per-streak speed variation

    // Assign rainbow hue based on angle (creates chromatic dispersion)
    const hue = angle / (Math.PI * 2);

    baseData.push({ angle, innerR, depth, speedVar, hue });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    linewidth: 1, // WebGL caps at 1px; WebGPU may support wider
  });

  const mesh = new THREE.LineSegments(geometry, material);
  mesh.frustumCulled = false;
  mesh.visible = false;
  scene.add(mesh);

  // Reusable color objects
  const leadColor = new THREE.Color();
  const trailColor = new THREE.Color();

  return {
    mesh,

    /**
     * @param {THREE.Camera} camera
     * @param {string} flightState - ORBITING | DEPARTING | IN_TRANSIT | ARRIVING
     * @param {number} phaseProgress - 0..1 within the current phase
     */
    update(camera, flightState, phaseProgress) {
      if (flightState === 'ORBITING') {
        if (mesh.visible) {
          mesh.visible = false;
          material.opacity = 0;
        }
        return;
      }

      mesh.visible = true;

      // Intensity and opacity ramp per flight phase
      let intensity = 0;
      let opacity = 0;

      switch (flightState) {
        case 'DEPARTING':
          intensity = phaseProgress * 0.25;
          opacity = phaseProgress * 0.5;
          break;
        case 'IN_TRANSIT': {
          // Bell curve — peaks at midpoint of transit
          const speedCurve = Math.sin(phaseProgress * Math.PI);
          intensity = 0.25 + speedCurve * 0.75;
          opacity = 0.5 + speedCurve * 0.5;
          break;
        }
        case 'ARRIVING':
          intensity = (1 - phaseProgress) * 0.25;
          opacity = (1 - phaseProgress) * 0.5;
          break;
      }

      material.opacity = opacity;

      // Anchor the streak system to the camera every frame
      mesh.position.copy(camera.position);
      mesh.quaternion.copy(camera.quaternion);

      const posArr = geometry.attributes.position.array;
      const colArr = geometry.attributes.color.array;
      const time = Date.now() * 0.001;

      for (let i = 0; i < STREAK_COUNT; i++) {
        const d = baseData[i];
        const si = i * 6;

        const cosA = Math.cos(d.angle);
        const sinA = Math.sin(d.angle);

        // Scroll depth so streaks stream past continuously during transit
        const scrollSpeed = 30 * intensity * d.speedVar;
        const scrolledDepth = d.depth + ((time * scrollSpeed) % 55) - 55;

        // Inner (leading) point — closer to center
        posArr[si]     = cosA * d.innerR;
        posArr[si + 1] = sinA * d.innerR;
        posArr[si + 2] = scrolledDepth;

        // Outer (trailing) point — further from center, creating radial stretch
        const elongation = MAX_STREAK_LENGTH * intensity * d.speedVar;
        const outerR = d.innerR + elongation;
        posArr[si + 3] = cosA * outerR;
        posArr[si + 4] = sinA * outerR;
        posArr[si + 5] = scrolledDepth + elongation * 0.15; // slight z-trail

        // Rainbow chromatic color (hue cycles around the ring)
        // Leading edge: bright white-shifted
        // Trailing edge: saturated rainbow color
        const hueShift = Math.sin(time * 1.5 + i * 0.3) * 0.08; // subtle hue oscillation
        const hue = (d.hue + hueShift + 1) % 1;

        leadColor.setHSL(hue, 0.3, 0.9);  // desaturated, bright
        trailColor.setHSL(hue, 0.95, 0.6); // vivid rainbow

        // Leading point color
        colArr[si]     = leadColor.r;
        colArr[si + 1] = leadColor.g;
        colArr[si + 2] = leadColor.b;

        // Trailing point color
        colArr[si + 3] = trailColor.r;
        colArr[si + 4] = trailColor.g;
        colArr[si + 5] = trailColor.b;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    },

    dispose() {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    },
  };
}
