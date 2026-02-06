/**
 * Scene Module Index
 * Re-exports all scene-related functionality
 */

export {
  initializeScene,
  setupLighting,
  handleResize,
  cleanupScene,
} from './SceneSetup';

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
} from './NodeFactory';

export {
  createConnection,
  createCrossPillarConnections,
  removeCrossPillarConnections,
  animateConnections,
} from './ConnectionManager';

export {
  createBlackSwan,
  createEnterpriseD,
  checkEasterEggSpawn,
  animateEasterEgg,
} from './EasterEggs';
