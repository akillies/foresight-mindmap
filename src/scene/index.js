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

export { disposePlanetTextures } from './PlanetFactory';

export { createGPUStarfield } from './GPUStarfield';

export { createAsteroidBelt } from './AsteroidBelt';

export { createPlanetLOD } from './PlanetLOD';

export {
  createConnection,
  createCrossPillarConnections,
  removeCrossPillarConnections,
  animateConnections,
  setActiveConnection,
  clearActiveConnection,
} from './ConnectionManager';

export { FlightController } from './FlightController';

export { createWarpStreaks } from './WarpStreaks';

export { createCockpitMesh } from './CockpitMesh';
export { createCockpitTextureSet } from './CockpitTextures';

export {
  createBlackSwan,
  createEnterpriseD,
  checkEasterEggSpawn,
  animateEasterEgg,
} from './EasterEggs';
