/**
 * Planet Factory
 * Creates procedurally-textured celestial bodies for each mind map hierarchy level.
 *
 * - Center node → Star (emissive core + corona)
 * - Level 1 (pillars) → Planets (biome texture + atmosphere shell)
 * - Level 2 (methods) → Moons (tinted cratered surface)
 * - Level 3 (media) → Orbital Stations (geometric shapes by media type)
 *
 * All bodies use canvas-generated procedural textures (works on both renderers).
 * Each factory function returns a THREE.Mesh with the same userData contract
 * as the existing NodeFactory — compatible with raycasting, animation, and selection.
 */
import * as THREE from 'three';
import { PLANET_CONFIG, STATION_SHAPES } from '@planetary/constants';
import {
  createStarTexture,
  createMoonTexture,
  createBumpTexture,
  BIOME_TEXTURE_GENERATORS,
  getMoonVariant,
} from './materials';

// Cache generated textures so we don't regenerate on every node creation
const textureCache = new Map();

function getCachedTexture(key, generatorFn, ...args) {
  if (!textureCache.has(key)) {
    const canvas = generatorFn(...args);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textureCache.set(key, texture);
  }
  return textureCache.get(key);
}

/**
 * Create a central star.
 * Emissive textured sphere + corona glow layers.
 */
export function createStar({ color, position, userData }) {
  const { size, coronaScale } = PLANET_CONFIG.star;
  const starColor = new THREE.Color(color);

  // Textured core
  const texture = getCachedTexture('star', createStarTexture);
  const geometry = new THREE.SphereGeometry(size, 48, 48);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: starColor,
  });

  const star = new THREE.Mesh(geometry, material);
  star.position.copy(position);
  star.userData = { ...userData, celestialType: 'star' };
  star.originalY = position.y;
  star.castShadow = false;
  star.receiveShadow = false;

  // Inner glow (additive blend, slightly larger)
  const innerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.15, 32, 32),
    new THREE.MeshBasicMaterial({
      color: starColor,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(innerGlow);

  // Corona (large, diffuse outer glow)
  const corona = new THREE.Mesh(
    new THREE.SphereGeometry(size * coronaScale, 32, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFFEECC),
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(corona);

  return star;
}

/**
 * Create a planet with a biome-specific procedural texture and atmosphere shell.
 */
export function createPlanet({ color, biome, position, userData }) {
  const { size, atmosphereScale, segments } = PLANET_CONFIG.planet;
  const planetColor = new THREE.Color(color);

  // Generate or retrieve biome texture + bump map
  const generator = BIOME_TEXTURE_GENERATORS[biome];
  const texture = generator
    ? getCachedTexture(`planet-${biome}`, generator)
    : null;
  const bumpTex = biome
    ? getCachedTexture(`bump-${biome}`, createBumpTexture, biome)
    : null;

  // Planet surface
  const geometry = new THREE.SphereGeometry(size, segments, segments);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    ...(texture ? {} : { color: planetColor }),
    ...(bumpTex ? { bumpMap: bumpTex, bumpScale: 0.08 } : {}),
    emissive: planetColor,
    emissiveIntensity: 0.05,
    roughness: 0.7,
    metalness: 0.1,
  });

  const planet = new THREE.Mesh(geometry, material);
  planet.position.copy(position);
  planet.userData = { ...userData, celestialType: 'planet', biome };
  planet.originalY = position.y;
  planet.castShadow = true;
  planet.receiveShadow = true;

  // Atmosphere shell (transparent, slightly larger)
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(size * atmosphereScale, 32, 32),
    new THREE.MeshBasicMaterial({
      color: planetColor,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  planet.add(atmosphere);

  // Outer glow (softer, larger)
  const outerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.4, 32, 32),
    new THREE.MeshBasicMaterial({
      color: planetColor,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  planet.add(outerGlow);

  return planet;
}

/**
 * Create a moon (Level 2 node).
 * Smaller, simpler, tinted toward parent planet color.
 */
export function createMoon({ color, position, userData }) {
  const { size, atmosphereScale, segments } = PLANET_CONFIG.moon;
  const moonColor = new THREE.Color(color);

  // Select moon texture variant based on node ID
  const nodeId = userData.id || userData.mediaId || '';
  const variant = getMoonVariant(nodeId);
  const cacheKey = `moon-${color}-${variant.name}`;
  const texture = getCachedTexture(cacheKey, variant.generator, color);

  const geometry = new THREE.SphereGeometry(size, segments, segments);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: moonColor,
    emissiveIntensity: 0.2,
    roughness: 0.6,
    metalness: 0.15,
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.position.copy(position);
  moon.userData = { ...userData, celestialType: 'moon' };
  moon.originalY = position.y;
  moon.castShadow = true;
  moon.receiveShadow = true;

  // Thin atmosphere glow
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(size * atmosphereScale, 24, 24),
    new THREE.MeshBasicMaterial({
      color: moonColor,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  moon.add(atmo);

  // Outer glow shell (similar to planets)
  const outerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.35, 16, 16),
    new THREE.MeshBasicMaterial({
      color: moonColor,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  moon.add(outerGlow);

  return moon;
}

/**
 * Create an orbital station (Level 3 / media node).
 * Geometric shape determined by media type. Small, distinctive.
 */
export function createStation({ color, mediaType, position, userData }) {
  const { size, segments } = PLANET_CONFIG.station;
  const stationColor = new THREE.Color(color);

  const shapeName = STATION_SHAPES[mediaType] || 'octahedron';
  let geometry;

  switch (shapeName) {
    case 'octahedron':
      geometry = new THREE.OctahedronGeometry(size, 0);
      break;
    case 'dodecahedron':
      geometry = new THREE.DodecahedronGeometry(size, 0);
      break;
    case 'tetrahedron':
      geometry = new THREE.TetrahedronGeometry(size, 0);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(size * 0.7, size * 0.25, segments, 24);
      break;
    case 'icosahedron':
      geometry = new THREE.IcosahedronGeometry(size, 0);
      break;
    default:
      geometry = new THREE.OctahedronGeometry(size, 0);
  }

  const material = new THREE.MeshStandardMaterial({
    color: stationColor,
    emissive: stationColor,
    emissiveIntensity: 0.5,
    roughness: 0.15,
    metalness: 0.7,
    transparent: true,
    opacity: 0.9,
  });

  const station = new THREE.Mesh(geometry, material);
  station.position.copy(position);
  station.userData = { ...userData, celestialType: 'station' };
  station.originalY = position.y;
  station.castShadow = true;
  station.receiveShadow = true;

  // Small beacon glow
  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.3, 12, 12),
    new THREE.MeshBasicMaterial({
      color: stationColor,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  station.add(beacon);

  return station;
}

/**
 * Dispose all cached textures (call on scene cleanup).
 */
export function disposePlanetTextures() {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
}
