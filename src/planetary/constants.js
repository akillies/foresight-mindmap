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

// Media type → orbital station geometry
export const STATION_SHAPES = {
  video: 'octahedron',
  article: 'dodecahedron',
  document: 'tetrahedron',
  podcast: 'torus',
  image: 'icosahedron',
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
