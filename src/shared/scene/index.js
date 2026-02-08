/**
 * Shared Scene Module Index
 * Re-exports all shared scene functionality
 */

export {
  initializeScene,
  setupLighting,
  handleResize,
  cleanupScene,
} from './SceneSetup';

export { createRenderer } from './RendererFactory';
export { createPostProcessing } from './PostProcessingSetup';

export {
  createStarfield,
  createDistantGalaxies,
  createNebulas,
  animateStarfield,
  animateNebulas,
} from './ParticleSystem';

export {
  createCenterNode,
  createLevel1Nodes,
  createChildNodes,
  createMediaNodes,
  removeChildNodes,
  getDescendantIds,
  getNodeDepth,
  setPlanetaryMode,
  getAsteroidBelts,
} from './NodeFactory';

export {
  createConnection,
  createCrossPillarConnections,
  removeCrossPillarConnections,
  animateConnections,
  setActiveConnection,
  clearActiveConnection,
} from './ConnectionManager';

export {
  createBlackSwan,
  createEnterpriseD,
  checkEasterEggSpawn,
  animateEasterEgg,
} from './EasterEggs';
