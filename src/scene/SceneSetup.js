/**
 * Three.js Scene Setup Module
 * Handles initialization of renderer, camera, controls, lighting, and post-processing.
 * Supports WebGPU with automatic WebGL2 fallback.
 */
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { tourManager } from '../TourManager';
import { SCENE_CONFIG, VR_CONFIG } from '../constants';
import { createRenderer } from './RendererFactory';
import { createPostProcessing } from './PostProcessingSetup';

const IS_VR = new URLSearchParams(window.location.search).has('planetary')
  && new URLSearchParams(window.location.search).has('vr');

// Install camera-controls with the THREE.js subset it requires
CameraControls.install({ THREE });

/**
 * Initialize the Three.js scene with all core components.
 * Now async because WebGPU adapter request requires awaiting.
 *
 * @param {HTMLElement} container - DOM element to attach renderer to
 * @returns {Promise<Object>} Scene components
 */
export async function initializeScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // Exponential fog for depth falloff — objects fade to black at distance
  // Reduced density in VR for less overdraw (stereo rendering doubles cost)
  scene.fog = new THREE.FogExp2(0x000000, IS_VR ? VR_CONFIG.fogDensityVR : 0.004);
  scene.rotation.y = 0;

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 50);
  camera.lookAt(0, 0, 0);

  // Create renderer (WebGPU with auto WebGL2 fallback)
  const { renderer, isWebGPU, capabilities } = await createRenderer(container);

  // Shadow maps (WebGLRenderer and WebGPURenderer both support this)
  if (renderer.shadowMap) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // Camera controls (replaces OrbitControls)
  const controls = new CameraControls(camera, renderer.domElement);
  controls.smoothTime = 0.25;
  controls.draggingSmoothTime = 0.125;
  controls.minDistance = SCENE_CONFIG.cameraMinDistance;
  controls.maxDistance = SCENE_CONFIG.cameraMaxDistance;
  controls.maxPolarAngle = Math.PI;
  controls.minPolarAngle = 0;

  // Initialize TourManager with camera and controls
  tourManager.initialize(camera, controls);

  // Post-processing (TSL bloom for WebGPU, legacy EffectComposer for ?forceWebGL)
  const useLegacy = !isWebGPU && !capabilities.tsl;
  const pp = await createPostProcessing(renderer, scene, camera, useLegacy);

  return {
    scene,
    camera,
    renderer,
    controls,
    postProcessing: pp,
    isWebGPU,
    capabilities,
  };
}

/**
 * Setup lighting for the scene
 */
export function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0x505070, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x5C88DA, 1.2);
  keyLight.position.set(50, 50, 50);
  keyLight.castShadow = true;
  const shadowSize = IS_VR ? VR_CONFIG.shadowMapSizeVR : 4096;
  keyLight.shadow.mapSize.width = shadowSize;
  keyLight.shadow.mapSize.height = shadowSize;
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xFFCC66, 0.8, 100);
  fillLight.position.set(-30, 20, 40);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xCC99CC, 0.6, 100);
  rimLight.position.set(0, -30, -50);
  scene.add(rimLight);
}

/**
 * Handle window resize events.
 * Works with both TSL and legacy post-processing.
 */
export function handleResize(camera, renderer, postProcessing, container) {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  if (postProcessing && postProcessing.setSize) {
    postProcessing.setSize(width, height);
  }
}

/**
 * Cleanup scene resources
 */
export function cleanupScene(sceneComponents, container) {
  const { renderer, controls, scene } = sceneComponents;

  if (controls) {
    controls.dispose();
  }

  if (renderer) {
    renderer.dispose();
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
