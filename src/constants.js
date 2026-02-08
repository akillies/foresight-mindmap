/**
 * Constants barrel — re-exports from shared + planetary for backward compatibility.
 * Will be deleted once all imports are updated.
 */
export {
  COLORS,
  MEDIA_COLORS,
  AUDIO_PRESETS,
  SCALE_SELECTED,
  SCALE_NORMAL,
  SCENE_CONFIG,
  PERFORMANCE_LIMITS,
  ANIMATION_CONFIG,
  MATERIAL_DEFAULTS,
} from './shared/constants';

export {
  PLANET_CONFIG,
  BIOME_MAP,
  STATION_SHAPES,
  FLIGHT_CONFIG,
  LOD_DISTANCES,
  GPU_PARTICLE_CONFIG,
  VR_CONFIG,
} from './planetary/constants';
