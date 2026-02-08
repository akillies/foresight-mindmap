/**
 * Asteroid Belt
 * Creates an InstancedMesh ring of deformed icosahedrons around a planet.
 * Single draw call for all asteroids. Works on both WebGPU and WebGL paths.
 *
 * @module AsteroidBelt
 */
import * as THREE from 'three';

/**
 * Create an asteroid belt around a planet node.
 * Single draw call for all asteroids via InstancedMesh.
 *
 * @param {THREE.Object3D} planet - The planet to orbit
 * @param {object} [options]
 * @param {number} [options.count=300] - Number of asteroids
 * @param {number} [options.innerRadius=4.0] - Inner ring radius
 * @param {number} [options.outerRadius=6.0] - Outer ring radius
 * @param {number} [options.color=0x888888] - Belt color (hex)
 * @returns {{ mesh: THREE.InstancedMesh, update: (time: number) => void }}
 */
export function createAsteroidBelt(planet, {
  count = 300,
  innerRadius = 4.0,
  outerRadius = 6.0,
  color = 0x888888,
} = {}) {
  // Deformed icosahedron (detail level 0 = 12 faces, very cheap)
  const baseGeo = new THREE.IcosahedronGeometry(0.15, 0);

  // Deform vertices for rocky appearance (done once on geometry)
  const posAttr = baseGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const scale = 0.7 + Math.random() * 0.6; // 0.7-1.3x deformation
    posAttr.setXYZ(i, x * scale, y * scale, z * scale);
  }
  baseGeo.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true,
  });

  const mesh = new THREE.InstancedMesh(baseGeo, material, count);

  // Pre-compute orbital parameters per asteroid
  const dummy = new THREE.Object3D();
  const angles = new Float32Array(count);
  const radii = new Float32Array(count);
  const speeds = new Float32Array(count);
  const tilts = new Float32Array(count);
  const scales = new Float32Array(count);
  const rotX = new Float32Array(count);
  const rotY = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const speed = 0.0001 + Math.random() * 0.0002; // slow orbital speed
    const tilt = (Math.random() - 0.5) * 0.3;      // slight Y offset

    angles[i] = angle;
    radii[i] = radius;
    speeds[i] = speed;
    tilts[i] = tilt;
    scales[i] = 0.5 + Math.random() * 1.0;
    rotX[i] = Math.random() * Math.PI;
    rotY[i] = Math.random() * Math.PI;

    // Initial transform
    dummy.position.set(
      Math.cos(angle) * radius,
      tilt,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(rotX[i], rotY[i], 0);
    dummy.scale.setScalar(scales[i]);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  // Attach to planet as child so it inherits planet position
  planet.add(mesh);

  // Animate: slow orbital rotation
  const update = (time) => {
    for (let i = 0; i < count; i++) {
      const a = angles[i] + time * speeds[i];
      dummy.position.set(
        Math.cos(a) * radii[i],
        tilts[i],
        Math.sin(a) * radii[i]
      );
      // Slow tumble
      dummy.rotation.x = rotX[i] + time * speeds[i] * 0.5;
      dummy.rotation.y = rotY[i] + time * speeds[i] * 0.3;
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  return { mesh, update };
}
