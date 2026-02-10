/**
 * Planet LOD System
 * Wraps planet nodes in THREE.LOD for distance-based detail switching.
 * Three levels: HIGH (full PlanetFactory), MED (24-seg + atmosphere), LOW (12-seg + glow).
 *
 * LOD.autoUpdate = true by default -- no manual update needed.
 *
 * @module PlanetLOD
 */
import * as THREE from 'three';
import { createPlanet } from './PlanetFactory';
import { createDownscaledTexture, BIOME_TEXTURE_GENERATORS } from './materials';
import { PLANET_CONFIG, LOD_DISTANCES } from '@planetary/constants';

// Cache for MED-level downscaled textures and LOW-level sampled colors
const medTextureCache = new Map();
const lowColorCache = new Map();

function getCachedMedTexture(biome) {
  const key = `planet-${biome}-med-512`;
  if (!medTextureCache.has(key)) {
    const canvas = createDownscaledTexture(biome, 512);
    if (!canvas) return null;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    medTextureCache.set(key, texture);
  }
  return medTextureCache.get(key);
}

/**
 * Sample the center pixel of a biome texture to get a representative color.
 */
function getSampledBiomeColor(biome) {
  if (lowColorCache.has(biome)) return lowColorCache.get(biome);

  const generator = BIOME_TEXTURE_GENERATORS[biome];
  if (!generator) return null;

  // Generate a tiny 8x8 texture just for color sampling (fast)
  const canvas = generator(8);
  const ctx = canvas.getContext('2d');
  const pixel = ctx.getImageData(4, 4, 1, 1).data;
  const color = new THREE.Color(pixel[0] / 255, pixel[1] / 255, pixel[2] / 255);
  lowColorCache.set(biome, color);
  return color;
}

/**
 * Create a LOD-enabled planet node.
 * @param {object} params - Same params as createPlanet
 * @param {string} params.color - Planet color hex string or THREE.Color-compatible value
 * @param {string} params.biome - Biome type for texture generation
 * @param {THREE.Vector3} params.position - World position
 * @param {object} params.userData - Node metadata (id, name, etc.)
 * @returns {THREE.LOD}
 */
export function createPlanetLOD(params) {
  const { color, biome, position, userData } = params;
  const planetColor = new THREE.Color(color);
  const lod = new THREE.LOD();

  // HIGH: Full planet from PlanetFactory (48-segment sphere + atmosphere + glow)
  const highDetail = createPlanet(params);
  // createPlanet sets position on the mesh, but LOD manages position itself,
  // so reset the child to origin (LOD group holds the world position)
  highDetail.position.set(0, 0, 0);
  lod.addLevel(highDetail, LOD_DISTANCES.HIGH);

  // MED: 24-segment sphere with downscaled 512x512 biome texture + thin atmosphere
  const medGeo = new THREE.SphereGeometry(PLANET_CONFIG.planet.size, 24, 24);
  const medTexture = getCachedMedTexture(biome);
  const medMat = new THREE.MeshStandardMaterial({
    ...(medTexture ? { map: medTexture } : { color: planetColor }),
    emissive: planetColor,
    emissiveIntensity: 0.15,
    roughness: 0.7,
    metalness: 0.1,
  });
  const medMesh = new THREE.Mesh(medGeo, medMat);
  medMesh.userData = { ...userData, celestialType: 'planet', biome };
  medMesh.originalY = position.y;

  // Add thin atmosphere
  const medAtmo = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 1.1, 16, 16),
    new THREE.MeshBasicMaterial({
      color: planetColor,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  medMesh.add(medAtmo);
  lod.addLevel(medMesh, LOD_DISTANCES.MED);

  // LOW: 12-segment sphere using sampled biome color + slight emissive
  const sampledColor = getSampledBiomeColor(biome) || planetColor;
  const lowGeo = new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 0.8, 12, 12);
  const lowMat = new THREE.MeshBasicMaterial({
    color: sampledColor,
    transparent: true,
    opacity: 0.85,
  });
  const lowMesh = new THREE.Mesh(lowGeo, lowMat);
  lowMesh.userData = { ...userData, celestialType: 'planet', biome };
  lowMesh.originalY = position.y;

  // Glow shell with emissive-like brightness
  const lowGlow = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 1.5, 8, 8),
    new THREE.MeshBasicMaterial({
      color: sampledColor,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  lowMesh.add(lowGlow);
  lod.addLevel(lowMesh, LOD_DISTANCES.LOW);

  // Position the LOD group and copy userData for raycasting
  lod.position.copy(position);
  lod.userData = { ...userData, celestialType: 'planet', biome };
  lod.originalY = position.y;

  return lod;
}
