/**
 * Three.js Scene Setup Module
 * Handles initialization of renderer, camera, controls, lighting, and post-processing
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { tourManager } from '../TourManager';
import { SCENE_CONFIG } from '../constants';

/**
 * Initialize the Three.js scene with all core components
 * @param {HTMLElement} container - DOM element to attach renderer to
 * @returns {Object} Scene components (scene, camera, renderer, composer, controls)
 */
export function initializeScene(container) {
  // Initialize Three.js Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.rotation.y = 0;

  // Initialize Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 50);
  camera.lookAt(0, 0, 0);

  // Initialize Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Enhanced graphics quality (THREE.js r152+ API)
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Initialize OrbitControls for camera rotation
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = SCENE_CONFIG.cameraMinDistance;
  controls.maxDistance = SCENE_CONFIG.cameraMaxDistance;
  controls.maxPolarAngle = Math.PI; // Allow full rotation including looking from above
  controls.minPolarAngle = 0;
  controls.enablePan = false; // Disable panning to keep focus on center

  // Initialize TourManager with camera and controls
  tourManager.initialize(camera, controls);

  // Post-Processing: Bloom Effect for Cinematic Glow
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  composer.addPass(bloomPass);

  return { scene, camera, renderer, composer, controls };
}

/**
 * Setup lighting for the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function setupLighting(scene) {
  // Ambient Light - provides base illumination
  const ambientLight = new THREE.AmbientLight(0x505070, 0.7);
  scene.add(ambientLight);

  // Key Light - main directional light with shadows
  const keyLight = new THREE.DirectionalLight(0x5C88DA, 1.2);
  keyLight.position.set(50, 50, 50);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 4096;
  keyLight.shadow.mapSize.height = 4096;
  scene.add(keyLight);

  // Fill Light - softens shadows from the key light
  const fillLight = new THREE.PointLight(0xFFCC66, 0.8, 100);
  fillLight.position.set(-30, 20, 40);
  scene.add(fillLight);

  // Rim Light - creates depth separation from background
  const rimLight = new THREE.PointLight(0xCC99CC, 0.6, 100);
  rimLight.position.set(0, -30, -50);
  scene.add(rimLight);
}

/**
 * Handle window resize events
 * @param {THREE.Camera} camera - The camera to update
 * @param {THREE.WebGLRenderer} renderer - The renderer to resize
 * @param {EffectComposer} composer - The post-processing composer
 * @param {HTMLElement} container - The container element
 */
export function handleResize(camera, renderer, composer, container) {
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
}

/**
 * Cleanup scene resources
 * @param {Object} sceneComponents - Object containing scene components to dispose
 * @param {HTMLElement} container - The container element
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

  // Dispose of all geometries and materials in the scene
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
