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
  warning: '#FFCC66',
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
  starfieldCount: 4000,
  galaxyCount: 4,
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
