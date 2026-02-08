/**
 * Renderer Factory
 * Creates WebGPU renderer with automatic WebGL2 fallback.
 * Exports capability flags so other modules can branch on GPU features.
 *
 * Uses dynamic imports to avoid pulling in three/webgpu at module load time,
 * which would break in test environments (jsdom) that lack WebGL constants.
 *
 * Parameterized — callers pass { enableVR } instead of reading URL params.
 */
import { VR_CONFIG } from '@planetary/constants';

/**
 * Create and initialize the renderer.
 * Uses WebGPURenderer which auto-falls back to WebGL2 if WebGPU is unavailable.
 * The ?forceWebGL query param bypasses WebGPU for testing.
 *
 * @param {HTMLElement} container - DOM element to attach renderer to
 * @param {Object} [options]
 * @param {boolean} [options.enableVR=false] - Enable WebXR support
 * @returns {Promise<RendererResult>}
 */
export async function createRenderer(container, options = {}) {
  const { enableVR = false } = options;
  const params = new URLSearchParams(window.location.search);
  const forceWebGL = params.has('forceWebGL');

  if (forceWebGL) {
    const THREE = await import('three');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    await configureRenderer(renderer, container);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (enableVR) {
      renderer.xr.enabled = true;
      renderer.xr.setFramebufferScaleFactor(VR_CONFIG.initialFramebufferScale);
      renderer.xr.setFoveation(VR_CONFIG.foveationLevel);
    }

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

  if (enableVR) {
    renderer.xr.enabled = true;
    renderer.xr.setFramebufferScaleFactor(VR_CONFIG.initialFramebufferScale);
    renderer.xr.setFoveation(VR_CONFIG.foveationLevel);
  }

  return {
    renderer,
    isWebGPU,
    capabilities: {
      compute: isWebGPU,
      tsl: true,
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
