/**
 * useThreeScene — Backward-compatible delegator.
 * Routes to useClassicScene or usePlanetaryScene based on ?planetary query param.
 * Will be deleted in Phase 8 when ForesightMindMap.jsx is split into separate apps.
 */
import { useClassicScene } from '@classic/useClassicScene';
import { usePlanetaryScene } from '@planetary/usePlanetaryScene';

const IS_PLANETARY = new URLSearchParams(window.location.search).has('planetary');

export function useThreeScene(onNodeClick, onHoverChange, selectedNode) {
  if (IS_PLANETARY) {
    return usePlanetaryScene(onNodeClick, onHoverChange, selectedNode);
  }
  return useClassicScene(onNodeClick, onHoverChange, selectedNode);
}
