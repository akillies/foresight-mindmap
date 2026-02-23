/**
 * Planetary-specific constants
 * Only imported by the Planetary Explorer app
 */

// Planetary node sizes (used by PlanetFactory when WebGPU/TSL available)
export const PLANET_CONFIG = {
  star: { size: 3.0, atmosphereScale: 1.3, coronaScale: 1.6 },
  planet: { size: 2.0, atmosphereScale: 1.15, cloudScale: 1.05, segments: 48 },
  moon: { size: 1.0, atmosphereScale: 1.08, segments: 40 },
  station: { size: 0.5, segments: 16 },
  rotationSpeed: { planet: 0.0004, cloud: 0.0006, moon: 0.0003, star: 0.0001 },
};

// Biome-to-pillar mapping for procedural planet generation
export const BIOME_MAP = {
  mapping: 'ocean',
  anticipating: 'desert',
  timing: 'crystal',
  deepening: 'volcanic',
  creating: 'garden',
  transforming: 'gasGiant',
};

// Per-biome material tuning for MeshPhysicalMaterial
export const BIOME_MATERIAL_PROFILES = {
  ocean: {
    emissiveIntensity: 0.08,
    roughness: 0.55,
    metalness: 0.15,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
    sheen: 0.3,
    sheenColor: '#4488CC',
    sheenRoughness: 0.6,
    iridescence: 0,
    iridescenceIOR: 1.3,
    bumpScale: 0.08,
    atmosphereOpacity: 0.15,
    outerGlowOpacity: 0.08,
    atmosphereTint: null,
    hasCloudLayer: false,
  },
  desert: {
    emissiveIntensity: 0.06,
    roughness: 0.85,
    metalness: 0.05,
    clearcoat: 0,
    clearcoatRoughness: 1.0,
    sheen: 0.15,
    sheenColor: '#CCAA66',
    sheenRoughness: 0.8,
    iridescence: 0,
    iridescenceIOR: 1.3,
    bumpScale: 0.12,
    atmosphereOpacity: 0.1,
    outerGlowOpacity: 0.05,
    atmosphereTint: '#CC9944',
    hasCloudLayer: false,
  },
  crystal: {
    emissiveIntensity: 0.12,
    roughness: 0.2,
    metalness: 0.3,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    sheen: 0.5,
    sheenColor: '#AACCFF',
    sheenRoughness: 0.3,
    iridescence: 0.6,
    iridescenceIOR: 1.8,
    bumpScale: 0.06,
    atmosphereOpacity: 0.12,
    outerGlowOpacity: 0.07,
    atmosphereTint: '#88AAEE',
    hasCloudLayer: false,
  },
  volcanic: {
    emissiveIntensity: 0.2,
    roughness: 0.75,
    metalness: 0.1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.8,
    sheen: 0,
    sheenColor: '#FF6600',
    sheenRoughness: 1.0,
    iridescence: 0,
    iridescenceIOR: 1.3,
    bumpScale: 0.1,
    atmosphereOpacity: 0.1,
    outerGlowOpacity: 0.06,
    atmosphereTint: '#FF4400',
    hasCloudLayer: false,
  },
  garden: {
    emissiveIntensity: 0.06,
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    sheen: 0.2,
    sheenColor: '#66AA44',
    sheenRoughness: 0.5,
    iridescence: 0,
    iridescenceIOR: 1.3,
    bumpScale: 0.08,
    atmosphereOpacity: 0.14,
    outerGlowOpacity: 0.07,
    atmosphereTint: '#88BBFF',
    hasCloudLayer: true,
  },
  gasGiant: {
    emissiveIntensity: 0.1,
    roughness: 0.45,
    metalness: 0.05,
    clearcoat: 0.2,
    clearcoatRoughness: 0.5,
    sheen: 0.4,
    sheenColor: '#DD88BB',
    sheenRoughness: 0.4,
    iridescence: 0.2,
    iridescenceIOR: 1.5,
    bumpScale: 0.04,
    atmosphereOpacity: 0.18,
    outerGlowOpacity: 0.1,
    atmosphereTint: '#FFAACC',
    hasCloudLayer: true,
  },
};

export const DEFAULT_PLANET_MATERIAL = {
  emissiveIntensity: 0.05,
  roughness: 0.7,
  metalness: 0.1,
  clearcoat: 0,
  clearcoatRoughness: 1.0,
  sheen: 0,
  sheenColor: '#FFFFFF',
  sheenRoughness: 1.0,
  iridescence: 0,
  iridescenceIOR: 1.3,
  bumpScale: 0.08,
  atmosphereOpacity: 0.12,
  outerGlowOpacity: 0.06,
  atmosphereTint: null,
  hasCloudLayer: false,
};

export const MOON_MATERIAL = {
  emissiveIntensity: 0.25,
  roughness: 0.45,
  metalness: 0.2,
  sheen: 0.2,
  sheenColor: '#AAAACC',
  sheenRoughness: 0.6,
  atmosphereOpacity: 0.12,
  outerGlowOpacity: 0.08,
};

// Media type → orbital station geometry
export const STATION_SHAPES = {
  video: 'octahedron',
  article: 'dodecahedron',
  document: 'tetrahedron',
  podcast: 'torus',
  image: 'icosahedron',
};

// Biome-specific asteroid belt color palettes
export const BIOME_BELT_COLORS = {
  ocean:    { base: 0x4477AA, accent: 0x88BBDD, metalness: 0.25, emissive: 0.02 },
  desert:   { base: 0xAA8855, accent: 0xCCAA66, metalness: 0.15, emissive: 0.01 },
  crystal:  { base: 0x7799CC, accent: 0xAADDFF, metalness: 0.55, emissive: 0.08 },
  volcanic: { base: 0x554433, accent: 0xFF6633, metalness: 0.20, emissive: 0.05 },
  garden:   { base: 0x557744, accent: 0x88AA66, metalness: 0.10, emissive: 0.01 },
  gasGiant: { base: 0x665577, accent: 0x9988AA, metalness: 0.30, emissive: 0.03 },
};

// Planetary-specific layout overrides (wider spacing for meaningful flight)
export const PLANETARY_LAYOUT = {
  level1Radius: 60,
  level2Radius: 18,
  level3Radius: 12,
  cameraMaxDistance: 350,
};

// Flight controller configuration
export const FLIGHT_CONFIG = {
  arcHeightRatio: 0.35,
  baseDuration: 3.5,
  distanceMultiplier: 0.04,
  maxDuration: 7.0,
  departDuration: 0.8,
  arriveDuration: 1.0,
  laneGlowOpacity: 0.8,
  laneParticleBoost: 3,
};

// LOD distance thresholds for planet detail levels
export const LOD_DISTANCES = {
  HIGH: 0,
  MED: 45,
  LOW: 100,
};

// GPU compute particle system configuration (WebGPU path)
export const GPU_PARTICLE_CONFIG = {
  count: 80_000,
  spaceSize: 800,
  resetDistance: 500,
  deadZone: 140,
  driftSpeed: 0.001,
  twinkleSpeed: 2.0,
  orbitalSpeed: 0.0003,
  maxStarSize: 0.7,
  minStarSize: 0.1,
  baseOpacity: 0.45,
};

// VR/XR configuration
export const VR_CONFIG = {
  cockpitRadius: 1.5,
  cockpitFlatScreenZ: -2,
  bezelThickness: 0.02,
  elbowSize: 0.12,
  textureUpdateHz: 2,
  fogDensityVR: 0.003,
  nebulaCountVR: 12,
  starfieldCountVR: 50_000,
  shadowMapSizeVR: 2048,
  referenceSpaceType: 'local-floor',
  initialFramebufferScale: 1.0,
  minFramebufferScale: 0.7,
  foveationLevel: 1,
  targetFPS: 90,
  fpsFloor: 75,
  rayLength: 10,
  rayColor: 0xFFCC66,
  selectButton: 'trigger',
  gripAction: 'grab',
};
