/**
 * useThreeScene Hook
 * Manages Three.js scene lifecycle, animation loop, and event handling.
 * Supports async WebGPU renderer initialization with ready-state gating.
 * Integrates FlightController for shuttlecraft flight between planets.
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
  disposePlanetTextures,
  FlightController,
  setActiveConnection,
  clearActiveConnection,
  createGPUStarfield,
  getAsteroidBelts,
} from '../scene';
import { PLANET_CONFIG, SCALE_SELECTED, SCALE_NORMAL, SCENE_CONFIG, ANIMATION_CONFIG, PERFORMANCE_LIMITS } from '../constants';

// Beta flag — ?planetary query param enables the planetary exploration experience
const IS_PLANETARY = new URLSearchParams(window.location.search).has('planetary');

/**
 * Custom hook for Three.js scene management
 * @param {Function} onNodeClick - Callback when a node is clicked
 * @param {Function} onHoverChange - Callback when hover state changes
 * @param {Object|null} selectedNode - Currently selected node
 * @returns {Object} Scene refs and utilities
 */
export function useThreeScene(onNodeClick, onHoverChange, selectedNode) {
  const selectedNodeRef = useRef(selectedNode);
  // Core refs
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const postProcessingRef = useRef(null);
  const controlsRef = useRef(null);
  const flightControllerRef = useRef(null);

  // GPU capability state (exposed to consumers)
  const [gpuInfo, setGpuInfo] = useState({ isWebGPU: false, capabilities: {} });

  // Object collection refs
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const crossPillarConnectionsRef = useRef([]);
  const particlesRef = useRef(null);
  const nebulasRef = useRef([]);

  // Transit state tracking (planetary beta only)
  const transitCallbackRef = useRef(null);
  const lastTransitStateRef = useRef('ORBITING');

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
    let frameId;
    let disposed = false;
    const cleanupRef = { current: null };

    // Async init wrapped in IIFE (useLayoutEffect can't be async)
    (async () => {
      try {
        const {
          scene, camera, renderer, controls,
          postProcessing, isWebGPU, capabilities,
        } = await initializeScene(container);

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

        // Create starfield — GPU compute (100K) on WebGPU, CPU (4K) on WebGL
        let gpuStarfield = null;
        if (IS_PLANETARY && capabilities.compute) {
          gpuStarfield = await createGPUStarfield(scene, renderer);
        } else {
          particlesRef.current = createStarfield(scene);
        }

        // Create nebulas (both paths)
        nebulasRef.current = createNebulas(scene);

        // Enable planetary visuals only in beta mode
        setPlanetaryMode(IS_PLANETARY);

        // Create initial nodes
        createCenterNode(scene, nodesRef.current);
        createLevel1Nodes(scene, nodesRef.current, connectionsRef.current);

        // Initialize FlightController (planetary beta only)
        let flightController = null;
        if (IS_PLANETARY) {
          flightController = new FlightController();
          flightController.init(camera, controls);
          flightController.setConnectionCallbacks(setActiveConnection, clearActiveConnection);
          flightControllerRef.current = flightController;
        }

        // Clock for delta time (camera-controls requires deltaTime in seconds)
        const clock = new THREE.Clock();

        // Animation Loop
        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        const boundingSphere = new THREE.Sphere();
        const FRUSTUM_MARGIN = PERFORMANCE_LIMITS.ANIMATION_FRUSTUM_MARGIN;

        const animate = () => {
          if (disposed) return;
          frameId = requestAnimationFrame(animate);

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

            // Starfield: GPU compute or CPU fallback
            if (gpuStarfield) {
              gpuStarfield.timeUniform.value = currentTime * 0.001;
              renderer.compute(gpuStarfield.computeUpdate);
            } else {
              animateStarfield(particlesRef.current);
            }

            animateNebulas(nebulasRef.current);

            // Animate asteroid belts (planetary beta only)
            if (IS_PLANETARY) {
              const belts = getAsteroidBelts();
              for (let b = 0; b < belts.length; b++) {
                belts[b].update(currentTime);
              }
            }

            // Update flight controller (planetary beta only)
            if (flightController) {
              flightController.update(deltaTime);

              // Notify consumer of transit state changes
              const flightState = flightController.getState();
              if (flightState !== lastTransitStateRef.current) {
                lastTransitStateRef.current = flightState;
                if (transitCallbackRef.current) {
                  const isFlying = flightState !== 'ORBITING';
                  const target = flightController.getCurrentTarget();
                  const targetLabel = target?.userData?.label?.replace('\n', ' ') || null;
                  const progress = 0;
                  transitCallbackRef.current(isFlying, targetLabel, progress);
                }
              }
              // Update transit progress while flying
              if (flightController.isFlying() && transitCallbackRef.current) {
                const elapsed = flightController._elapsed;
                const duration = flightController._phaseDuration;
                const progress = duration > 0 ? Math.min(elapsed / duration, 1) : 0;
                const target = flightController.getCurrentTarget();
                const targetLabel = target?.userData?.label?.replace('\n', ' ') || null;
                transitCallbackRef.current(true, targetLabel, progress);
              }
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
            // Recursive mode needed for LOD/Group nodes in planetary mode
            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObjects(nodes, true);

            for (let i = 0; i < nodeCount; i++) {
              nodes[i].isHovered = false;
            }

            if (intersects.length > 0) {
              // Walk up to find the top-level node in nodesRef
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
            controls.update(deltaTime);

            // Render via post-processing pipeline
            postProcessing.render();
          } catch (error) {
            console.error('Animation loop error (non-fatal):', error.message);
          }
        };

        animate();

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
            // Walk up to find the top-level node in nodesRef
            let clickedNode = intersects[0].object;
            const currentNodes = nodesRef.current;
            while (clickedNode.parent && !currentNodes.includes(clickedNode)) {
              clickedNode = clickedNode.parent;
            }
            if (!currentNodes.includes(clickedNode)) return;

            if (flightController) {
              const currentSelected = selectedNodeRef.current;

              // If clicking a DIFFERENT planet and not currently flying, fly to it
              if (
                !flightController.isFlying() &&
                currentSelected &&
                clickedNode.userData.id !== currentSelected.id &&
                clickedNode.userData.id &&
                !clickedNode.userData.isMedia
              ) {
                flightController.setSourceNodeId(currentSelected.id);
                flightController.flyTo(clickedNode).then(() => {
                  onNodeClick(clickedNode, scene, nodesRef.current, connectionsRef.current);
                });
              } else if (!flightController.isFlying()) {
                onNodeClick(clickedNode, scene, nodesRef.current, connectionsRef.current);
              }
            } else {
              // Standard mode: direct click handling
              onNodeClick(clickedNode, scene, nodesRef.current, connectionsRef.current);
            }
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

        // Keyboard handlers for flight navigation (planetary beta only)
        const handleKeyDown = !flightController ? null : (event) => {
          if (flightController.isFlying()) return;

          const nodes = nodesRef.current;
          const currentSelected = selectedNodeRef.current;

          switch (event.code) {
            case 'Space': {
              // Next planet (cycle through level-1 nodes)
              event.preventDefault();
              const level1Nodes = nodes.filter(
                (n) => n.userData.id && !n.userData.parent && !n.userData.parentId && !n.userData.isMedia && n.userData.id !== 'strategic-foresight',
              );
              if (level1Nodes.length === 0) break;

              let nextIndex = 0;
              if (currentSelected) {
                const curIdx = level1Nodes.findIndex((n) => n.userData.id === currentSelected.id);
                if (curIdx >= 0) nextIndex = (curIdx + 1) % level1Nodes.length;
              }

              const nextNode = level1Nodes[nextIndex];
              if (currentSelected) flightController.setSourceNodeId(currentSelected.id);
              flightController.flyTo(nextNode).then(() => {
                onNodeClick(nextNode, scene, nodesRef.current, connectionsRef.current);
              });
              break;
            }

            case 'Escape': {
              // Return to system overview
              event.preventDefault();
              const centerNode = nodes.find((n) => n.userData.id === 'strategic-foresight');
              if (centerNode) {
                controls.setLookAt(0, 15, 50, 0, 0, 0, true);
              }
              break;
            }

            case 'Tab': {
              // Cycle moons of current planet
              event.preventDefault();
              if (!currentSelected) break;
              const moons = nodes.filter(
                (n) => (n.userData.parent === currentSelected.id || n.userData.parentId === currentSelected.id) && !n.userData.isMedia,
              );
              if (moons.length === 0) break;

              // Find the next moon that is not currently selected
              const moonNode = moons[0];
              flightController.setSourceNodeId(currentSelected.id);
              flightController.flyTo(moonNode).then(() => {
                onNodeClick(moonNode, scene, nodesRef.current, connectionsRef.current);
              });
              break;
            }

            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6': {
              // Jump to specific pillar (1-6)
              const pillarIndex = parseInt(event.code.replace('Digit', ''), 10) - 1;
              const level1 = nodes.filter(
                (n) => n.userData.id && !n.userData.parent && !n.userData.parentId && !n.userData.isMedia && n.userData.id !== 'strategic-foresight',
              );
              if (pillarIndex < level1.length) {
                const pillarNode = level1[pillarIndex];
                if (currentSelected) flightController.setSourceNodeId(currentSelected.id);
                flightController.flyTo(pillarNode).then(() => {
                  onNodeClick(pillarNode, scene, nodesRef.current, connectionsRef.current);
                });
              }
              break;
            }
          }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('click', handleClick);
        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', handleResize);
        if (handleKeyDown) window.addEventListener('keydown', handleKeyDown);

        // Store cleanup handler for the effect return
        cleanupRef.current = () => {
          if (frameId) cancelAnimationFrame(frameId);

          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseup', handleMouseUp);
          container.removeEventListener('click', handleClick);
          container.removeEventListener('wheel', handleWheel);
          window.removeEventListener('resize', handleResize);
          if (handleKeyDown) window.removeEventListener('keydown', handleKeyDown);

          if (gpuStarfield) gpuStarfield.dispose();
          if (flightController) flightController.dispose();
          if (IS_PLANETARY) disposePlanetTextures();
          cleanupScene({ scene, camera, renderer, controls }, container);
          rendererRef.current = null;
          flightControllerRef.current = null;
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
    flightControllerRef,
    transitCallbackRef,
  };
}
