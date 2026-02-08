/**
 * useClassicScene — Classic 3D mind map scene hook.
 * Thin wrapper around useSceneCore with no extensions.
 */
import { useSceneCore } from '@shared/hooks/useSceneCore';

export function useClassicScene(onNodeClick, onHoverChange, selectedNode) {
  return useSceneCore(onNodeClick, onHoverChange, selectedNode);
}
