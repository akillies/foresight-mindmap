/**
 * useSceneCore — Shared Three.js scene lifecycle hook.
 *
 * Owns: scene init, camera, controls, CPU starfield, nebulas, node creation,
 * core animation loop (float, pulse, scale, connections, easter eggs, raycasting,
 * render), mouse/resize event handlers, cleanup.
 *
 * Mode-specific behavior (planetary flight, GPU starfield, VR controllers, etc.)
 * is injected via extension-point callbacks: onInit, onAnimate, onClick.
 */
import { useRef, useLayoutEffect, useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  initializeScene,
  setupLighting,
  handleResize as handleSceneResize,
  cleanupScene,
  createStarfield,
  createNebulas,
  createCenterNode,
  createLevel1Nodes,
  animateStarfield,
  animateNebulas,
  animateConnections,
  checkEasterEggSpawn,
  animateEasterEgg,
  setPlanetaryMode,
} from '@shared/scene';
import {
  SCALE_SELECTED,
  SCALE_NORMAL,
  SCENE_CONFIG,
  ANIMATION_CONFIG,
  PERFORMANCE_LIMITS,
} from '@shared/constants';
import { PLANET_CONFIG } from '@planetary/constants';

/**
 * @param {Function} onNodeClick - Callback when a node is clicked
 * @param {Function} onHoverChange - Callback when hover state changes
 * @param {Object|null} selectedNode - Currently selected node
 * @param {Object} [extensions]
 * @param {Object}  [extensions.sceneConfig]  - { enableVR, fogDensity, shadowMapSize }
 * @param {boolean} [extensions.planetaryMode] - Enable planetary visuals
 * @param {Function} [extensions.onInit]     - async (initRefs) => cleanupFn
 * @param {Function} [extensions.onAnimate]  - (animRefs) => void
 * @param {Function} [extensions.onClick]    - (clickedNode, refs) => boolean (true = handled)
 * @returns {Object} Scene refs and utilities
 */
export function useSceneCore(onNodeClick, onHoverChange, selectedNode, extensions = {}) {
  const {
    sceneConfig = {},
    planetaryMode = false,
    onInit,
    onAnimate,
    onClick,
  } = extensions;

  const selectedNodeRef = useRef(selectedNode);

  // Core refs
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const postProcessingRef = useRef(null);
  const controlsRef = useRef(null);

  // GPU capability state (exposed to consumers)
  const [gpuInfo, setGpuInfo] = useState({ isWebGPU: false, capabilities: {} });

  // Object collection refs
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const crossPillarConnectionsRef = useRef([]);
  const particlesRef = useRef(null);
  const nebulasRef = useRef([]);

  // Easter egg refs
  const easterEggRef = useRef(null);
  const lastEasterEggCheckRef = useRef(0);

  // Interaction refs
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  // Keep selectedNodeRef in sync
  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let disposed = false;
    const cleanupRef = { current: null };

    // Async init wrapped in IIFE (useLayoutEffect can't be async)
    (async () => {
      try {
        const {
          scene, camera, renderer, controls,
          postProcessing, isWebGPU, capabilities,
        } = await initializeScene(container, sceneConfig);

        // Bail if component unmounted during async init
        if (disposed) {
          cleanupScene({ scene, camera, renderer, controls }, container);
          return;
        }

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        postProcessingRef.current = postProcessing;
        controlsRef.current = controls;

        setGpuInfo({ isWebGPU, capabilities });

        // Setup lighting
        setupLighting(scene);

        // CPU starfield (extensions may override with GPU starfield)
        if (!(planetaryMode && capabilities.compute)) {
          particlesRef.current = createStarfield(scene);
        }

        // Create nebulas (both paths)
        nebulasRef.current = createNebulas(scene);

        // Enable planetary visuals if requested
        setPlanetaryMode(planetaryMode);

        // Create initial nodes
        createCenterNode(scene, nodesRef.current);
        createLevel1Nodes(scene, nodesRef.current, connectionsRef.current);

        // ── Extension: onInit ──
        // Let mode-specific hooks set up GPU starfield, flight, VR, cockpit, etc.
        let extensionCleanup = null;
        if (onInit) {
          extensionCleanup = await onInit({
            scene, camera, renderer, controls, postProcessing,
            isWebGPU, capabilities,
            nodesRef, connectionsRef, raycasterRef, selectedNodeRef,
            onNodeClick,
          });
        }

        // Clock for delta time (camera-controls requires deltaTime in seconds)
        const clock = new THREE.Clock();

        // Animation Loop
        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        const boundingSphere = new THREE.Sphere();
        const FRUSTUM_MARGIN = PERFORMANCE_LIMITS.ANIMATION_FRUSTUM_MARGIN;

        const animate = (time, xrFrame) => {
          if (disposed) return;

          try {
            const deltaTime = clock.getDelta();

            scene.rotation.y += ANIMATION_CONFIG.sceneRotationSpeed;

            camera.updateMatrixWorld();
            projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            frustum.setFromProjectionMatrix(projScreenMatrix);

            const currentTime = Date.now();
            const currentSelectedNode = selectedNodeRef.current;
            const nodes = nodesRef.current;
            const nodeCount = nodes.length;

            for (let i = 0; i < nodeCount; i++) {
              const node = nodes[i];
              const isSelected = currentSelectedNode && node.userData.id === currentSelectedNode.id;
              const isHovered = node.isHovered;

              if (!isSelected && !isHovered) {
                boundingSphere.center.copy(node.position);
                boundingSphere.radius = FRUSTUM_MARGIN;
                if (!frustum.intersectsSphere(boundingSphere)) {
                  continue;
                }
              }

              // Floating motion
              if (node.originalY !== undefined) {
                node.position.y = node.originalY + Math.sin(currentTime * ANIMATION_CONFIG.nodeFloatSpeed + i) * ANIMATION_CONFIG.nodeFloatAmplitude;
              }

              // Planetary axial rotation
              const celestialType = node.userData.celestialType;
              if (celestialType) {
                const speed = PLANET_CONFIG.rotationSpeed[celestialType] || PLANET_CONFIG.rotationSpeed.planet;
                node.rotation.y += speed;
              }

              // Pulse effect
              if (node.material && node.material.emissive) {
                let baseIntensity;
                let pulseAmplitude;

                if (isSelected) {
                  baseIntensity = 0.9;
                  pulseAmplitude = 0.2;
                } else if (isHovered) {
                  baseIntensity = 0.6;
                  pulseAmplitude = 0.1;
                } else {
                  baseIntensity = 0.3;
                  pulseAmplitude = 0.1;
                }

                node.material.emissiveIntensity = baseIntensity + Math.sin(currentTime * ANIMATION_CONFIG.nodePulseSpeed + i) * pulseAmplitude;
              }

              // Scale effect
              if (isSelected) {
                node.scale.lerp(SCALE_SELECTED, ANIMATION_CONFIG.scaleLerpSelected);
              } else if (!isHovered && node.scale.x > 1.0) {
                node.scale.lerp(SCALE_NORMAL, ANIMATION_CONFIG.scaleLerpNormal);
              }
            }

            animateConnections(connectionsRef.current, currentSelectedNode);

            // Starfield: CPU fallback (GPU handled in extension)
            if (particlesRef.current) {
              animateStarfield(particlesRef.current);
            }

            animateNebulas(nebulasRef.current);

            // ── Extension: onAnimate ──
            if (onAnimate) {
              onAnimate({
                deltaTime, currentTime, renderer, camera, controls,
                postProcessing, nodesRef, selectedNodeRef,
              });
            }

            // Easter Egg spawn system
            if (currentTime - lastEasterEggCheckRef.current > SCENE_CONFIG.easterEggCheckInterval) {
              lastEasterEggCheckRef.current = currentTime;
              if (!easterEggRef.current) {
                easterEggRef.current = checkEasterEggSpawn(scene, easterEggRef.current);
              }
            }

            if (easterEggRef.current) {
              const stillActive = animateEasterEgg(easterEggRef.current, scene);
              if (!stillActive) {
                easterEggRef.current = null;
              }
            }

            // Raycasting for hover effects
            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObjects(nodes, true);

            for (let i = 0; i < nodeCount; i++) {
              nodes[i].isHovered = false;
            }

            if (intersects.length > 0) {
              let hoveredObj = intersects[0].object;
              while (hoveredObj.parent && !nodes.includes(hoveredObj)) {
                hoveredObj = hoveredObj.parent;
              }
              if (nodes.includes(hoveredObj)) {
                hoveredObj.isHovered = true;
                hoveredObj.scale.setScalar(1.1);
                onHoverChange(hoveredObj.userData);
              } else {
                onHoverChange(null);
              }
            } else {
              onHoverChange(null);
            }

            // camera-controls requires delta in seconds
            const xrPresenting = renderer.xr?.isPresenting;
            if (!xrPresenting) {
              controls.update(deltaTime);
            }

            // Render: bypass post-processing in XR (incompatible with stereo)
            if (xrPresenting) {
              renderer.render(scene, camera);
            } else {
              postProcessing.render();
            }
          } catch (error) {
            console.error('Animation loop error (non-fatal):', error.message);
          }
        };

        // setAnimationLoop works for both flat-screen (rAF) and XR (XR frame loop)
        renderer.setAnimationLoop(animate);

        // Event Handlers
        const handleMouseMove = (event) => {
          const rect = container.getBoundingClientRect();
          mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          if (isDraggingRef.current) {
            const deltaX = event.clientX - previousMouseRef.current.x;
            const deltaY = event.clientY - previousMouseRef.current.y;

            scene.rotation.y += deltaX * 0.005;
            camera.position.y -= deltaY * 0.1;

            previousMouseRef.current = { x: event.clientX, y: event.clientY };
          }
        };

        const handleMouseDown = (event) => {
          isDraggingRef.current = true;
          previousMouseRef.current = { x: event.clientX, y: event.clientY };
          container.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
          isDraggingRef.current = false;
          container.style.cursor = 'grab';
        };

        const handleClick = (event) => {
          if (isDraggingRef.current) return;

          const rect = container.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycasterRef.current.setFromCamera({ x, y }, camera);
          const intersects = raycasterRef.current.intersectObjects(nodesRef.current, true);

          if (intersects.length > 0) {
            let clickedNode = intersects[0].object;
            const currentNodes = nodesRef.current;
            while (clickedNode.parent && !currentNodes.includes(clickedNode)) {
              clickedNode = clickedNode.parent;
            }
            if (!currentNodes.includes(clickedNode)) return;

            // ── Extension: onClick ──
            if (onClick) {
              const handled = onClick(clickedNode, {
                scene, nodesRef, connectionsRef, selectedNodeRef,
              });
              if (handled) return;
            }

            // Default: direct click handling
            onNodeClick(clickedNode, scene, nodesRef.current, connectionsRef.current);
          }
        };

        const handleWheel = (event) => {
          event.preventDefault();
          const zoomSpeed = 0.1;
          const direction = event.deltaY > 0 ? 1 : -1;
          const scaleFactor = 1 + direction * zoomSpeed;

          camera.position.multiplyScalar(scaleFactor);

          const distance = camera.position.length();
          if (distance < SCENE_CONFIG.cameraMinDistance) camera.position.setLength(SCENE_CONFIG.cameraMinDistance);
          if (distance > SCENE_CONFIG.cameraMaxDistance) camera.position.setLength(SCENE_CONFIG.cameraMaxDistance);
        };

        const handleResize = () => {
          handleSceneResize(camera, renderer, postProcessing, container);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('click', handleClick);
        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', handleResize);

        // Store cleanup handler for the effect return
        cleanupRef.current = () => {
          renderer.setAnimationLoop(null);

          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseup', handleMouseUp);
          container.removeEventListener('click', handleClick);
          container.removeEventListener('wheel', handleWheel);
          window.removeEventListener('resize', handleResize);

          if (extensionCleanup) extensionCleanup();
          cleanupScene({ scene, camera, renderer, controls }, container);
          rendererRef.current = null;
        };
      } catch (error) {
        console.error('Scene initialization failed:', error);
      }
    })();

    return () => {
      disposed = true;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    postProcessingRef,
    controlsRef,
    nodesRef,
    connectionsRef,
    crossPillarConnectionsRef,
    particlesRef,
    nebulasRef,
    gpuInfo,
  };
}
