/**
 * Shared constants for the Strategic Foresight Mind Map
 * Extracted from ForesightMindMap.jsx for reusability across modules
 */
import * as THREE from 'three';

// LCARS Color Palette - Star Trek inspired design system
export const COLORS = {
  primary: '#5C88DA',
  secondary: '#FFCC66',
  accent: '#CC99CC',
  highlight: '#FF9966',
  success: '#99CC99',
  pink: '#FF6B9D',
  background: '#000000',
  panel: '#1a1a2e',
  text: '#E8F1FF',
  textMuted: '#8899AA',
  textDim: '#b8c5d8',
  warning: '#FFCC66',
  info: '#99CCFF',
  successBright: '#77DD77',
  warningLight: '#FFB366',
};

// Media type colors for visual categorization
export const MEDIA_COLORS = {
  video: '#FF6B9D',
  image: '#64c8ff',
  article: '#FFCC66',
  document: '#99CC99',
  podcast: '#CC99CC',
};

// Audio presets - scientifically-backed frequencies for grounding, focus, and deep relaxation
// Carrier frequencies: 136.1Hz (Earth), 210.42Hz (Moon), 174Hz (Solfeggio)
// Binaural beats: 7.83Hz (Schumann), 8Hz (Alpha focus), 3Hz (Delta deep state)
export const AUDIO_PRESETS = {
  1: {
    type: 'generative',
    baseFreq: 136.1,
    binauralBeat: 7.83,
    label: 'GROUNDING (136.1Hz + 7.83Hz Schumann)',
    harmonics: false,
  },
  2: {
    type: 'generative',
    baseFreq: 210.42,
    binauralBeat: 8,
    label: 'CALM FLOW (210.42Hz + 8Hz Alpha)',
    harmonics: false,
  },
  3: {
    type: 'generative',
    baseFreq: 174,
    binauralBeat: 3,
    label: 'DEEP FOCUS (174Hz + 3Hz Delta)',
    harmonics: true,
  },
};

// CRITICAL FIX: Reusable Vector3 objects to prevent memory leak in animation loop
// Creating new Vector3 every frame (60 FPS x nodes) causes browser crashes
export const SCALE_SELECTED = new THREE.Vector3(1.4, 1.4, 1.4);
export const SCALE_NORMAL = new THREE.Vector3(1, 1, 1);

// Scene configuration defaults
export const SCENE_CONFIG = {
  starfieldCount: 3000,
  galaxyCount: 8,
  nebulaCount: 3,
  level1Radius: 25,
  level2Radius: 10,
  level3Radius: 8,
  centerNodeSize: 2.0,
  level1NodeSize: 1.5,
  level2NodeSize: 1.2,
  mediaNodeSize: 0.8,
  cameraMinDistance: 10,
  cameraMaxDistance: 200,
  easterEggCheckInterval: 10000, // 10 seconds
  blackSwanSpawnChance: 0.0005, // 0.05% per check
  enterpriseSpawnChance: 0.0017, // 0.17% per check
};

// Performance safety limits - prevent stack overflow and browser crashes
export const PERFORMANCE_LIMITS = {
  MAX_VISIBLE_NODES: 200,
  MAX_EXPANSION_DEPTH: 4,
  CLICK_DEBOUNCE_MS: 300,
  NODE_WARNING_THRESHOLD: 150,
  ANIMATION_FRUSTUM_MARGIN: 1.5, // multiplier for frustum culling check
};

// Animation configuration
export const ANIMATION_CONFIG = {
  sceneRotationSpeed: 0.0003,
  nodeFloatSpeed: 0.0008,
  nodeFloatAmplitude: 0.3,
  nodePulseSpeed: 0.002,
  connectionOpacityLerp: 0.1,
  particleSpeed: 0.003,
  particleSpeedVariation: 0.002,
  scaleLerpSelected: 0.15,
  scaleLerpNormal: 0.1,
};

// Planetary node sizes (used by PlanetFactory when WebGPU/TSL available)
export const PLANET_CONFIG = {
  star: { size: 3.0, atmosphereScale: 1.3, coronaScale: 1.6 },
  planet: { size: 2.0, atmosphereScale: 1.15, cloudScale: 1.05, segments: 48 },
  moon: { size: 1.0, atmosphereScale: 1.08, segments: 32 },
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

// Flight controller configuration
export const FLIGHT_CONFIG = {
  arcHeightRatio: 0.3,
  baseDuration: 2.5,
  distanceMultiplier: 0.04,
  maxDuration: 5.0,
  departDuration: 0.8,
  arriveDuration: 1.0,
  laneGlowOpacity: 0.8,
  laneParticleBoost: 3,
};

// LOD distance thresholds for planet detail levels (world units from camera)
export const LOD_DISTANCES = {
  HIGH: 0,    // < 30 units: full detail (48-segment + atmosphere + glow)
  MED: 30,    // 30-80 units: simplified (24-segment + atmosphere)
  LOW: 80,    // 80+ units: minimal (12-segment + glow shell)
};

// GPU compute particle system configuration (WebGPU path)
export const GPU_PARTICLE_CONFIG = {
  count: 80_000,
  spaceSize: 500,
  resetDistance: 300,
  deadZone: 80,               // no stars within this radius of origin
  driftSpeed: 0.001,
  twinkleSpeed: 2.0,
  orbitalSpeed: 0.0003,
  maxStarSize: 0.7,           // reduced from 1.5 — stars are background, not foreground
  minStarSize: 0.1,
  baseOpacity: 0.45,          // reduced from 0.8 — subtler star field
};

// VR/XR configuration
export const VR_CONFIG = {
  // Cockpit geometry (meters in XR space, world-units in flat-screen)
  cockpitRadius: 1.5,           // distance from player to bezels
  cockpitFlatScreenZ: -2,       // z-offset when parented to camera (flat-screen)
  bezelThickness: 0.02,         // extrusion depth of bezel panels
  elbowSize: 0.12,              // corner elbow square size
  textureUpdateHz: 2,           // canvas texture refresh rate

  // Performance budgets for stereo rendering
  fogDensityVR: 0.003,          // reduced from 0.004
  nebulaCountVR: 12,            // reduced from 26
  starfieldCountVR: 50_000,     // reduced from 100K
  shadowMapSizeVR: 2048,        // reduced from 4096

  // XR session settings
  referenceSpaceType: 'local-floor',
  initialFramebufferScale: 1.0,
  minFramebufferScale: 0.7,
  foveationLevel: 1,            // 0 = none, 1 = low, 2 = medium, 3 = high
  targetFPS: 90,
  fpsFloor: 75,                 // below this, reduce resolution

  // Controller
  rayLength: 10,                // meters
  rayColor: 0xFFCC66,           // LCARS gold
  selectButton: 'trigger',
  gripAction: 'grab',
};

// Material defaults for consistent node appearance
export const MATERIAL_DEFAULTS = {
  center: {
    roughness: 0.1,
    metalness: 0.6,
    opacity: 0.85,
    emissiveIntensity: 0.8,
  },
  level1: {
    roughness: 0.15,
    metalness: 0.5,
    opacity: 0.85,
    emissiveIntensity: 0.7,
  },
  level2: {
    roughness: 0.2,
    metalness: 0.4,
    opacity: 0.85,
    emissiveIntensity: 0.6,
  },
  media: {
    roughness: 0.1,
    metalness: 0.6,
    opacity: 0.9,
    emissiveIntensity: 0.8,
  },
};
