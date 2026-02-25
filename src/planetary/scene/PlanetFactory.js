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
import {
  PLANET_CONFIG, STATION_SHAPES,
  BIOME_MATERIAL_PROFILES, DEFAULT_PLANET_MATERIAL, MOON_MATERIAL,
} from '@planetary/constants';
import {
  createStarTexture,
  createMoonTexture,
  createCloudTexture,
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

  // Override data color — rich golden amber for planetary mode
  const starColor = new THREE.Color(0xFFAA22);

  // Textured core with emissive material for bloom interaction
  const texture = getCachedTexture('star', createStarTexture);
  const geometry = new THREE.SphereGeometry(size, 48, 48);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: starColor,
    emissive: new THREE.Color(0xFFBB33),
    emissiveIntensity: 2.5,
    emissiveMap: texture,
    roughness: 1.0,
    metalness: 0.0,
  });

  const star = new THREE.Mesh(geometry, material);
  star.position.copy(position);
  star.userData = { ...userData, celestialType: 'star' };
  star.originalY = position.y;
  star.castShadow = false;
  star.receiveShadow = false;

  // Inner glow — warm golden, boosted opacity
  const innerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.15, 32, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFFCC44),
      transparent: true,
      opacity: 0.75,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(innerGlow);

  // Corona — warm amber, stronger presence
  const corona = new THREE.Mesh(
    new THREE.SphereGeometry(size * 2.0, 32, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFFAA33),
      transparent: true,
      opacity: 0.4,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(corona);

  // Outer corona — deep orange halo
  const outerCorona = new THREE.Mesh(
    new THREE.SphereGeometry(size * 3.0, 32, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFF8800),
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(outerCorona);

  // 4th corona — ultra-wide bloom halo
  const wideHalo = new THREE.Mesh(
    new THREE.SphereGeometry(size * 4.5, 32, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFF6600),
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  star.add(wideHalo);

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

  // Look up biome material profile
  const profile = BIOME_MATERIAL_PROFILES[biome] || DEFAULT_PLANET_MATERIAL;

  // Planet surface
  const geometry = new THREE.SphereGeometry(size, segments, segments);
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    ...(texture ? {} : { color: planetColor }),
    ...(bumpTex ? { bumpMap: bumpTex, bumpScale: profile.bumpScale } : {}),
    emissive: planetColor,
    emissiveIntensity: profile.emissiveIntensity,
    roughness: profile.roughness,
    metalness: profile.metalness,
    clearcoat: profile.clearcoat,
    clearcoatRoughness: profile.clearcoatRoughness,
    sheen: profile.sheen,
    sheenColor: new THREE.Color(profile.sheenColor),
    sheenRoughness: profile.sheenRoughness,
    iridescence: profile.iridescence,
    iridescenceIOR: profile.iridescenceIOR,
  });

  const planet = new THREE.Mesh(geometry, material);
  planet.position.copy(position);
  planet.userData = { ...userData, celestialType: 'planet', biome };
  planet.originalY = position.y;
  planet.castShadow = true;
  planet.receiveShadow = true;

  // Single merged atmosphere shell (higher quality, replaces old atmosphere + outerGlow)
  const atmoColor = profile.atmosphereTint
    ? new THREE.Color(profile.atmosphereTint)
    : planetColor;
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(size * atmosphereScale, 32, 32),
    new THREE.MeshBasicMaterial({
      color: atmoColor,
      transparent: true,
      opacity: profile.atmosphereOpacity,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  planet.add(atmosphere);

  // Cloud layer for biomes that have one (garden, gasGiant)
  if (profile.hasCloudLayer) {
    const cloudTex = getCachedTexture(`cloud-layer`, createCloudTexture);
    const cloudLayer = new THREE.Mesh(
      new THREE.SphereGeometry(size * 1.08, 32, 32),
      new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.6,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    planet.add(cloudLayer);
    planet.userData._cloudMesh = cloudLayer;
  }

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
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    emissive: moonColor,
    emissiveIntensity: MOON_MATERIAL.emissiveIntensity,
    roughness: MOON_MATERIAL.roughness,
    metalness: MOON_MATERIAL.metalness,
    sheen: MOON_MATERIAL.sheen,
    sheenColor: new THREE.Color(MOON_MATERIAL.sheenColor),
    sheenRoughness: MOON_MATERIAL.sheenRoughness,
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.position.copy(position);
  moon.userData = { ...userData, celestialType: 'moon' };
  moon.originalY = position.y;
  moon.castShadow = true;
  moon.receiveShadow = true;

  // Single atmosphere glow shell (merged atmosphere + outer glow)
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(size * atmosphereScale, 24, 24),
    new THREE.MeshBasicMaterial({
      color: moonColor,
      transparent: true,
      opacity: MOON_MATERIAL.atmosphereOpacity,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  moon.add(atmo);

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
