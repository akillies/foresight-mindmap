/**
 * Renderer Factory
 * Creates WebGPU renderer with automatic WebGL2 fallback.
 * Exports capability flags so other modules can branch on GPU features.
 *
 * Uses dynamic imports to avoid pulling in three/webgpu at module load time,
 * which would break in test environments (jsdom) that lack WebGL constants.
 */

/**
 * @typedef {Object} RendererResult
 * @property {Object} renderer - The initialized renderer
 * @property {boolean} isWebGPU - Whether WebGPU backend is active
 * @property {Object} capabilities - GPU capability flags
 * @property {boolean} capabilities.compute - Compute shader support
 * @property {boolean} capabilities.tsl - TSL node materials available
 */

/**
 * Create and initialize the renderer.
 * Uses WebGPURenderer which auto-falls back to WebGL2 if WebGPU is unavailable.
 * The ?forceWebGL query param bypasses WebGPU for testing.
 *
 * @param {HTMLElement} container - DOM element to attach renderer to
 * @returns {Promise<RendererResult>}
 */
export async function createRenderer(container) {
  const forceWebGL = new URLSearchParams(window.location.search).has('forceWebGL');

  if (forceWebGL) {
    const THREE = await import('three');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    await configureRenderer(renderer, container);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return {
      renderer,
      isWebGPU: false,
      capabilities: { compute: false, tsl: false },
    };
  }

  // Dynamic import keeps three/webgpu out of the module graph until needed
  const THREE_GPU = await import('three/webgpu');
  const renderer = new THREE_GPU.WebGPURenderer({ antialias: true, alpha: true });
  await configureRenderer(renderer, container);

  // init() is required — requests the GPU adapter/device (or sets up WebGL2)
  await renderer.init();

  const isWebGPU = renderer.backend?.isWebGPUBackend === true;

  return {
    renderer,
    isWebGPU,
    capabilities: {
      compute: isWebGPU,
      tsl: true, // TSL compiles to both WGSL and GLSL
    },
  };
}

/**
 * Shared renderer configuration
 */
async function configureRenderer(renderer, container) {
  const THREE = await import('three');
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);
}
