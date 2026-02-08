/**
 * Hooks barrel — re-exports from shared/ for backward compatibility.
 * Will be deleted once all imports are updated.
 */
export { useAudio } from '@shared/hooks/useAudio';
export { useSearch } from '@shared/hooks/useSearch';
export { useNodeInteraction } from '@shared/hooks/useNodeInteraction';
export { useSceneCore } from '@shared/hooks/useSceneCore';
// useThreeScene now delegates to classic/planetary scene hooks
export { useThreeScene } from './useThreeScene';
