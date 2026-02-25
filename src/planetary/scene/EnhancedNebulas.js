/**
 * EnhancedNebulas — Volumetric nebula clusters with cross-plane parallax
 *
 * Replaces the flat billboard nebulas from useSceneCore with multi-layer
 * clusters that have depth spread and rotated planes for parallax.
 * Also adds a galactic plane haze band.
 *
 * Planetary-only — classic mode keeps existing ParticleSystem nebulas.
 */
import * as THREE from 'three';

const NEBULA_CLUSTERS = [
  { center: [200, 40, -300], color: 0x6644AA, size: 80, layers: 8 },
  { center: [-250, -30, 280], color: 0x4466CC, size: 90, layers: 9 },
  { center: [320, 60, 200], color: 0xAA4488, size: 70, layers: 7 },
  { center: [-180, 80, -350], color: 0x5588AA, size: 85, layers: 8 },
  { center: [100, -60, 400], color: 0x8844AA, size: 75, layers: 7 },
  { center: [-350, 20, -150], color: 0x6688CC, size: 60, layers: 6 },
  { center: [400, -40, -100], color: 0xCC6688, size: 65, layers: 7 },
];

function createNebulaTexture(baseColor, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const r = (baseColor >> 16) & 0xFF;
  const g = (baseColor >> 8) & 0xFF;
  const b = baseColor & 0xFF;

  const cx = size / 2;
  const cy = size / 2;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
  grad.addColorStop(0.3, `rgba(${r},${g},${b},0.2)`);
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.06)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

/**
 * Create enhanced nebula clusters with depth and parallax.
 * @param {THREE.Scene} scene
 * @returns {{ group: THREE.Group, dispose: () => void }}
 */
export function createEnhancedNebulas(scene) {
  const group = new THREE.Group();
  const textures = [];

  for (const cluster of NEBULA_CLUSTERS) {
    const [cx, cy, cz] = cluster.center;
    const tex = createNebulaTexture(cluster.color, 256);
    textures.push(tex);

    for (let i = 0; i < cluster.layers; i++) {
      const depthSpread = 30 + Math.random() * 30;
      const layerOffset = (i - cluster.layers / 2) * depthSpread / cluster.layers;

      const planeSize = cluster.size * (0.6 + Math.random() * 0.8);
      const geo = new THREE.PlaneGeometry(planeSize, planeSize);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.06 + Math.random() * 0.06,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        cx + (Math.random() - 0.5) * 40,
        cy + layerOffset,
        cz + (Math.random() - 0.5) * 40,
      );

      // Rotate alternating layers for cross-plane parallax
      if (i % 3 === 0) {
        mesh.rotation.y = (Math.PI / 3) + Math.random() * 0.5;
      } else if (i % 3 === 1) {
        mesh.rotation.x = (Math.PI / 4) + Math.random() * 0.5;
      } else {
        mesh.rotation.z = Math.random() * Math.PI;
      }

      group.add(mesh);
    }
  }

  // Galactic plane haze — wide faint horizontal band at y≈0
  const hazeTex = createNebulaTexture(0x4455AA, 256);
  textures.push(hazeTex);
  const hazeGeo = new THREE.PlaneGeometry(600, 40);
  const hazeMat = new THREE.MeshBasicMaterial({
    map: hazeTex,
    transparent: true,
    opacity: 0.025,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const haze = new THREE.Mesh(hazeGeo, hazeMat);
  haze.position.set(0, 0, -200);
  haze.rotation.x = Math.PI / 2;
  group.add(haze);

  scene.add(group);

  return {
    group,
    dispose() {
      group.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      textures.forEach((t) => t.dispose());
      scene.remove(group);
    },
  };
}
