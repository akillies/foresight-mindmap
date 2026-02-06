/**
 * useThreeScene Hook
 * Manages Three.js scene lifecycle, animation loop, and event handling
 */
import { useRef, useLayoutEffect, useCallback, useEffect } from 'react';
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
} from '../scene';
import { SCALE_SELECTED, SCALE_NORMAL, SCENE_CONFIG, ANIMATION_CONFIG } from '../constants';

/**
 * Custom hook for Three.js scene management
 * @param {Function} onNodeClick - Callback when a node is clicked
 * @param {Function} onHoverChange - Callback when hover state changes
 * @param {Object|null} selectedNode - Currently selected node
 * @returns {Object} Scene refs and utilities
 */
export function useThreeScene(onNodeClick, onHoverChange, selectedNode) {
  // Ref to track selectedNode for animation loop (avoids stale closure)
  const selectedNodeRef = useRef(selectedNode);
  // Core refs
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const controlsRef = useRef(null);

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

  // Keep selectedNodeRef in sync with selectedNode prop
  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Initialize scene components
    const { scene, camera, renderer, composer, controls } = initializeScene(container);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    composerRef.current = composer;
    controlsRef.current = controls;

    // Setup lighting
    setupLighting(scene);

    // Create starfield and nebulas
    particlesRef.current = createStarfield(scene);
    nebulasRef.current = createNebulas(scene);

    // Create initial nodes
    createCenterNode(scene, nodesRef.current);
    createLevel1Nodes(scene, nodesRef.current, connectionsRef.current);

    // Animation Loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Gentle scene rotation
      scene.rotation.y += ANIMATION_CONFIG.sceneRotationSpeed;

      // Animate nodes (use ref for fresh value in animation loop)
      const currentSelectedNode = selectedNodeRef.current;
      nodesRef.current.forEach((node, index) => {
        const isSelected = currentSelectedNode && node.userData.id === currentSelectedNode.id;

        // Floating motion
        if (node.originalY !== undefined) {
          node.position.y = node.originalY + Math.sin(Date.now() * ANIMATION_CONFIG.nodeFloatSpeed + index) * ANIMATION_CONFIG.nodeFloatAmplitude;
        }

        // Pulse effect - enhanced for selected node
        if (node.material && node.material.emissive) {
          let baseIntensity;
          let pulseAmplitude;

          if (isSelected) {
            baseIntensity = 0.9;
            pulseAmplitude = 0.2;
          } else if (node.isHovered) {
            baseIntensity = 0.6;
            pulseAmplitude = 0.1;
          } else {
            baseIntensity = 0.3;
            pulseAmplitude = 0.1;
          }

          node.material.emissiveIntensity = baseIntensity + Math.sin(Date.now() * ANIMATION_CONFIG.nodePulseSpeed + index) * pulseAmplitude;
        }

        // Scale effect for selected node (using reusable Vector3 to prevent memory leak)
        if (isSelected) {
          node.scale.lerp(SCALE_SELECTED, ANIMATION_CONFIG.scaleLerpSelected);
        } else if (!node.isHovered && node.scale.x > 1.0) {
          node.scale.lerp(SCALE_NORMAL, ANIMATION_CONFIG.scaleLerpNormal);
        }
      });

      // Animate connections
      animateConnections(connectionsRef.current, currentSelectedNode);

      // Animate starfield
      animateStarfield(particlesRef.current);

      // Animate nebulas
      animateNebulas(nebulasRef.current);

      // Easter Egg spawn system (check every 10 seconds)
      const currentTime = Date.now();
      if (currentTime - lastEasterEggCheckRef.current > SCENE_CONFIG.easterEggCheckInterval) {
        lastEasterEggCheckRef.current = currentTime;

        if (!easterEggRef.current) {
          easterEggRef.current = checkEasterEggSpawn(scene, easterEggRef.current);
        }
      }

      // Animate active easter egg
      if (easterEggRef.current) {
        const stillActive = animateEasterEgg(easterEggRef.current, scene);
        if (!stillActive) {
          easterEggRef.current = null;
        }
      }

      // Raycasting for hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(nodesRef.current, false);

      // Reset all hover states
      nodesRef.current.forEach(node => {
        node.isHovered = false;
      });

      if (intersects.length > 0) {
        const hoveredObj = intersects[0].object;
        hoveredObj.isHovered = true;
        hoveredObj.scale.setScalar(1.1);
        onHoverChange(hoveredObj.userData);
      } else {
        onHoverChange(null);
      }

      // Update OrbitControls
      controls.update();

      // Render with bloom post-processing
      composer.render();
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
      const intersects = raycasterRef.current.intersectObjects(nodesRef.current, false);

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
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
      handleSceneResize(camera, renderer, composer, container);
    };

    // Attach event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleClick);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      cleanupScene({ scene, camera, renderer, controls }, container);
      rendererRef.current = null;
    };
  }, []); // Note: selectedNode is NOT in deps to avoid re-init. Animation loop reads it fresh.

  return {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    composerRef,
    controlsRef,
    nodesRef,
    connectionsRef,
    crossPillarConnectionsRef,
    particlesRef,
    nebulasRef,
  };
}
