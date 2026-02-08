/**
 * Scene Module Index — backward compatibility barrel.
 * Re-exports from shared/ + planetary/ locations.
 * Will be deleted once all imports are updated.
 */

export {
  initializeScene,
  setupLighting,
  handleResize,
  cleanupScene,
  createRenderer,
  createPostProcessing,
  createStarfield,
  createDistantGalaxies,
  createNebulas,
  animateStarfield,
  animateNebulas,
  createCenterNode,
  createLevel1Nodes,
  createChildNodes,
  createMediaNodes,
  removeChildNodes,
  getDescendantIds,
  getNodeDepth,
  setPlanetaryMode,
  getAsteroidBelts,
  createConnection,
  createCrossPillarConnections,
  removeCrossPillarConnections,
  animateConnections,
  setActiveConnection,
  clearActiveConnection,
  createBlackSwan,
  createEnterpriseD,
  checkEasterEggSpawn,
  animateEasterEgg,
} from '@shared/scene';

export { disposePlanetTextures } from '@planetary/scene/PlanetFactory';
export { createGPUStarfield } from '@planetary/scene/GPUStarfield';
export { createAsteroidBelt } from '@planetary/scene/AsteroidBelt';
export { createPlanetLOD } from '@planetary/scene/PlanetLOD';
export { FlightController } from '@planetary/scene/FlightController';
export { createWarpStreaks } from '@planetary/scene/WarpStreaks';
export { createCockpitMesh } from '@planetary/scene/CockpitMesh';
export { createCockpitTextureSet } from '@planetary/scene/CockpitTextures';
