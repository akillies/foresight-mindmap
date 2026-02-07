/**
 * Post-Processing Setup
 * Creates bloom effect using TSL nodes (works with both WebGPU and WebGL2 backends).
 * Falls back to legacy EffectComposer when ?forceWebGL is active.
 *
 * Uses dynamic imports to avoid pulling in three/webgpu at module load time.
 */

const BLOOM_DEFAULTS = {
  strength: 0.8,
  radius: 0.3,
  threshold: 0.85,
};

/**
 * @typedef {Object} PostProcessingResult
 * @property {Object} postProcessing - The post-processing instance
 * @property {Function} render - Call this each frame
 * @property {Function} setSize - Call on window resize
 * @property {string} type - 'tsl' or 'legacy'
 */

/**
 * Create post-processing pipeline with bloom.
 *
 * @param {Object} renderer
 * @param {Object} scene
 * @param {Object} camera
 * @param {boolean} useLegacy - Force legacy EffectComposer (for ?forceWebGL)
 * @returns {Promise<PostProcessingResult>}
 */
export async function createPostProcessing(renderer, scene, camera, useLegacy = false) {
  if (useLegacy) {
    return createLegacyPostProcessing(renderer, scene, camera);
  }

  return createTSLPostProcessing(renderer, scene, camera);
}

/**
 * TSL-based post-processing (works on WebGPU and WebGL2 backends)
 */
async function createTSLPostProcessing(renderer, scene, camera) {
  const THREE_GPU = await import('three/webgpu');
  const { pass } = await import('three/tsl');
  const { bloom } = await import('three/addons/tsl/display/BloomNode.js');

  const postProcessing = new THREE_GPU.PostProcessing(renderer);

  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode('output');
  const bloomPass = bloom(scenePassColor);

  bloomPass.threshold.value = BLOOM_DEFAULTS.threshold;
  bloomPass.strength.value = BLOOM_DEFAULTS.strength;
  bloomPass.radius.value = BLOOM_DEFAULTS.radius;

  postProcessing.outputNode = scenePassColor.add(bloomPass);

  return {
    postProcessing,
    render: () => postProcessing.render(),
    setSize: () => {}, // TSL PostProcessing auto-resizes with renderer
    type: 'tsl',
  };
}

/**
 * Legacy EffectComposer post-processing (for ?forceWebGL path)
 */
async function createLegacyPostProcessing(renderer, scene, camera) {
  const THREE = await import('three');
  const { EffectComposer } = await import('three/addons/postprocessing/EffectComposer.js');
  const { RenderPass } = await import('three/addons/postprocessing/RenderPass.js');
  const { UnrealBloomPass } = await import('three/addons/postprocessing/UnrealBloomPass.js');

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    BLOOM_DEFAULTS.strength,
    BLOOM_DEFAULTS.radius,
    BLOOM_DEFAULTS.threshold
  );
  composer.addPass(bloomPass);

  return {
    postProcessing: composer,
    render: () => composer.render(),
    setSize: (width, height) => composer.setSize(width, height),
    type: 'legacy',
  };
}
