/**
 * Asteroid Belt
 * Creates an InstancedMesh ring of varied rocky shapes around a planet.
 * 3 geometry types randomly assigned per-instance for visual variety.
 * Single draw call per geometry type. Works on both WebGPU and WebGL paths.
 *
 * @module AsteroidBelt
 */
import * as THREE from 'three';
import { BIOME_BELT_COLORS, BELT_DENSITY } from '@planetary/constants';

// Pre-create 3 deformed base geometries (shared across all belts)
let geoCache = null;

function getBaseGeometries() {
  if (geoCache) return geoCache;

  // Type 1: Deformed icosahedron (classic asteroid)
  const ico = new THREE.IcosahedronGeometry(0.15, 0);
  deformVertices(ico, 0.6, 0.7);

  // Type 2: Stretched box (elongated shard)
  const box = new THREE.BoxGeometry(0.12, 0.25, 0.1);
  deformVertices(box, 0.7, 0.5);

  // Type 3: Flattened dodecahedron (flat rock)
  const dodec = new THREE.DodecahedronGeometry(0.14, 0);
  const dPos = dodec.attributes.position;
  for (let i = 0; i < dPos.count; i++) {
    dPos.setY(i, dPos.getY(i) * 0.4); // flatten Y
  }
  deformVertices(dodec, 0.8, 0.4);

  geoCache = [ico, box, dodec];
  return geoCache;
}

function deformVertices(geo, minScale, range) {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const s = minScale + Math.random() * range;
    pos.setXYZ(i, pos.getX(i) * s, pos.getY(i) * s, pos.getZ(i) * s);
  }
  geo.computeVertexNormals();
}

/**
 * Create an asteroid belt around a planet node.
 * Uses 3 InstancedMesh groups (one per geometry type) for visual variety.
 *
 * @param {THREE.Object3D} planet - The planet to orbit
 * @param {object} [options]
 * @param {number} [options.count] - Number of asteroids (auto from biome density)
 * @param {number} [options.innerRadius=4.0] - Inner ring radius
 * @param {number} [options.outerRadius=6.0] - Outer ring radius
 * @param {number} [options.color=0x888888] - Belt color (hex)
 * @param {string} [options.biome] - Biome name for per-instance coloring & density
 * @returns {{ mesh: THREE.Group, update: (time: number) => void }}
 */
export function createAsteroidBelt(planet, {
  count,
  innerRadius = 4.0,
  outerRadius = 6.0,
  color = 0x888888,
  biome,
} = {}) {
  const palette = biome && BIOME_BELT_COLORS[biome];
  const totalCount = count || (biome && BELT_DENSITY[biome]) || 300;

  const geometries = getBaseGeometries();
  const group = new THREE.Group();

  // Split count across 3 geometry types (roughly equal, with some randomness)
  const counts = [
    Math.floor(totalCount * 0.45),  // icosahedron (most common)
    Math.floor(totalCount * 0.30),  // stretched box
    totalCount - Math.floor(totalCount * 0.45) - Math.floor(totalCount * 0.30), // dodecahedron
  ];

  const allMeshes = [];
  const allOrbitalData = [];

  for (let g = 0; g < 3; g++) {
    const geoCount = counts[g];
    if (geoCount <= 0) continue;

    const material = new THREE.MeshStandardMaterial({
      color: palette ? palette.base : color,
      roughness: 0.75,
      metalness: palette ? palette.metalness : 0.1,
      flatShading: true,
      ...(palette && {
        emissive: new THREE.Color(palette.base),
        emissiveIntensity: palette.emissive,
      }),
    });

    const mesh = new THREE.InstancedMesh(geometries[g], material, geoCount);

    const dummy = new THREE.Object3D();
    const angles = new Float32Array(geoCount);
    const radii = new Float32Array(geoCount);
    const speeds = new Float32Array(geoCount);
    const tilts = new Float32Array(geoCount);
    const scales = new Float32Array(geoCount);
    const rotX = new Float32Array(geoCount);
    const rotY = new Float32Array(geoCount);

    for (let i = 0; i < geoCount; i++) {
      const angle = (i / geoCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const speed = 0.00008 + Math.random() * 0.00018;
      const tilt = (Math.random() - 0.5) * 0.4;

      angles[i] = angle;
      radii[i] = radius;
      speeds[i] = speed;
      tilts[i] = tilt;
      scales[i] = 0.3 + Math.random() * 2.2; // 0.3x-2.5x range
      rotX[i] = Math.random() * Math.PI;
      rotY[i] = Math.random() * Math.PI;

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

    // Per-instance color variation
    if (palette) {
      const baseColor = new THREE.Color(palette.base);
      const accentColor = new THREE.Color(palette.accent);
      const instanceColor = new THREE.Color();
      for (let i = 0; i < geoCount; i++) {
        instanceColor.copy(baseColor).lerp(accentColor, Math.random());
        mesh.setColorAt(i, instanceColor);
      }
      mesh.instanceColor.needsUpdate = true;
    }

    group.add(mesh);
    allMeshes.push(mesh);
    allOrbitalData.push({ angles, radii, speeds, tilts, scales, rotX, rotY, count: geoCount });
  }

  planet.add(group);

  // Animate: slow orbital rotation + tumble
  const animDummy = new THREE.Object3D();
  const update = (time) => {
    for (let g = 0; g < allMeshes.length; g++) {
      const mesh = allMeshes[g];
      const data = allOrbitalData[g];
      for (let i = 0; i < data.count; i++) {
        const a = data.angles[i] + time * data.speeds[i];
        animDummy.position.set(
          Math.cos(a) * data.radii[i],
          data.tilts[i],
          Math.sin(a) * data.radii[i]
        );
        animDummy.rotation.x = data.rotX[i] + time * data.speeds[i] * 0.5;
        animDummy.rotation.y = data.rotY[i] + time * data.speeds[i] * 0.3;
        animDummy.scale.setScalar(data.scales[i]);
        animDummy.updateMatrix();
        mesh.setMatrixAt(i, animDummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  };

  return { mesh: group, update };
}
