/**
 * usePlanetaryScene — Planetary Explorer scene hook.
 * Extends useSceneCore with flight controller, GPU starfield, warp streaks,
 * cockpit mesh, XR controllers, and keyboard navigation.
 */
import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useSceneCore } from '@shared/hooks/useSceneCore';
import { setActiveConnection, clearActiveConnection } from '@shared/scene';
import { disposePlanetTextures } from '@planetary/scene/PlanetFactory';
import { FlightController } from '@planetary/scene/FlightController';
import { createGPUStarfield } from '@planetary/scene/GPUStarfield';
import { getAsteroidBelts } from '@shared/scene/NodeFactory';
import { createWarpStreaks } from '@planetary/scene/WarpStreaks';
import { createCockpitMesh } from '@planetary/scene/CockpitMesh';
import { VR_CONFIG } from '@planetary/constants';

const IS_VR = new URLSearchParams(window.location.search).has('vr');

/**
 * @param {Function} onNodeClick - Callback when a node is clicked
 * @param {Function} onHoverChange - Callback when hover state changes
 * @param {Object|null} selectedNode - Currently selected node
 * @returns {Object} Scene refs + planetary-specific refs
 */
export function usePlanetaryScene(onNodeClick, onHoverChange, selectedNode) {
  const flightControllerRef = useRef(null);
  const transitCallbackRef = useRef(null);
  const lastTransitStateRef = useRef('ORBITING');
  const hudDataRef = useRef(null);
  const cockpitMeshRef = useRef(null);
  const warpStreaksRef = useRef(null);
  const gpuStarfieldRef = useRef(null);

  // ── onInit: Set up GPU starfield, flight, warp, cockpit, VR ──
  const handleInit = useCallback(async (initRefs) => {
    const {
      scene, camera, renderer, controls,
      capabilities, nodesRef, connectionsRef,
      raycasterRef, selectedNodeRef, onNodeClick: nodeClickCb,
    } = initRefs;

    // GPU starfield (compute shader path)
    let gpuStarfield = null;
    if (capabilities.compute) {
      gpuStarfield = await createGPUStarfield(scene, renderer);
      gpuStarfieldRef.current = gpuStarfield;
    }

    // Flight controller
    const flightController = new FlightController();
    flightController.init(camera, controls);
    flightController.setConnectionCallbacks(setActiveConnection, clearActiveConnection);
    flightControllerRef.current = flightController;

    // Warp streaking effect
    const warpStreaks = createWarpStreaks(scene);
    warpStreaksRef.current = warpStreaks;

    // 3D cockpit mesh (VR mode — replaces CSS CockpitFrame)
    let cockpitMesh = null;
    if (IS_VR) {
      cockpitMesh = createCockpitMesh(false);
      cockpitMesh.attachToCamera(camera);
      cockpitMeshRef.current = cockpitMesh;

      renderer.xr.addEventListener('sessionstart', () => {
        camera.remove(cockpitMesh.group);
        cockpitMesh.placeInXRSpace(scene, camera.position);
      });
      renderer.xr.addEventListener('sessionend', () => {
        scene.remove(cockpitMesh.group);
        cockpitMesh.attachToCamera(camera);
      });
    }

    // ── XR Controllers ──
    let controller1 = null;
    let controller2 = null;
    let controllerRay = null;
    const xrTempMatrix = new THREE.Matrix4();

    if (IS_VR) {
      controller1 = renderer.xr.getController(0);
      controller2 = renderer.xr.getController(1);
      scene.add(controller1, controller2);

      const rayGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -VR_CONFIG.rayLength),
      ]);
      const rayMaterial = new THREE.LineBasicMaterial({
        color: VR_CONFIG.rayColor,
        transparent: true,
        opacity: 0.6,
      });
      controllerRay = new THREE.Line(rayGeometry, rayMaterial);
      controller1.add(controllerRay);

      // Trigger press → select planet
      controller1.addEventListener('selectstart', () => {
        if (!renderer.xr.isPresenting) return;

        xrTempMatrix.identity().extractRotation(controller1.matrixWorld);
        raycasterRef.current.ray.origin.setFromMatrixPosition(controller1.matrixWorld);
        raycasterRef.current.ray.direction.set(0, 0, -1).applyMatrix4(xrTempMatrix);

        const intersects = raycasterRef.current.intersectObjects(nodesRef.current, true);
        if (intersects.length > 0) {
          let clickedNode = intersects[0].object;
          const currentNodes = nodesRef.current;
          while (clickedNode.parent && !currentNodes.includes(clickedNode)) {
            clickedNode = clickedNode.parent;
          }
          if (!currentNodes.includes(clickedNode)) return;

          const currentSelected = selectedNodeRef.current;
          if (
            !flightController.isFlying() &&
            currentSelected &&
            clickedNode.userData.id !== currentSelected.id &&
            clickedNode.userData.id &&
            !clickedNode.userData.isMedia
          ) {
            flightController.setSourceNodeId(currentSelected.id);
            flightController.flyTo(clickedNode).then(() => {
              nodeClickCb(clickedNode, scene, nodesRef.current, connectionsRef.current);
            });
          } else if (!flightController.isFlying()) {
            nodeClickCb(clickedNode, scene, nodesRef.current, connectionsRef.current);
          }
        }
      });

      // Disable camera-controls in XR
      renderer.xr.addEventListener('sessionstart', () => {
        if (controls) controls.enabled = false;
      });
      renderer.xr.addEventListener('sessionend', () => {
        if (controls) controls.enabled = true;
      });
    }

    // Keyboard handlers
    const handleKeyDown = (event) => {
      if (flightController.isFlying()) return;

      const nodes = nodesRef.current;
      const currentSelected = selectedNodeRef.current;

      switch (event.code) {
        case 'Space': {
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
            nodeClickCb(nextNode, scene, nodesRef.current, connectionsRef.current);
          });
          break;
        }

        case 'Escape': {
          event.preventDefault();
          const centerNode = nodes.find((n) => n.userData.id === 'strategic-foresight');
          if (centerNode) {
            controls.setLookAt(0, 15, 50, 0, 0, 0, true);
          }
          break;
        }

        case 'Tab': {
          event.preventDefault();
          if (!currentSelected) break;
          const moons = nodes.filter(
            (n) => (n.userData.parent === currentSelected.id || n.userData.parentId === currentSelected.id) && !n.userData.isMedia,
          );
          if (moons.length === 0) break;

          const moonNode = moons[0];
          flightController.setSourceNodeId(currentSelected.id);
          flightController.flyTo(moonNode).then(() => {
            nodeClickCb(moonNode, scene, nodesRef.current, connectionsRef.current);
          });
          break;
        }

        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
        case 'Digit6': {
          const pillarIndex = parseInt(event.code.replace('Digit', ''), 10) - 1;
          const level1 = nodes.filter(
            (n) => n.userData.id && !n.userData.parent && !n.userData.parentId && !n.userData.isMedia && n.userData.id !== 'strategic-foresight',
          );
          if (pillarIndex < level1.length) {
            const pillarNode = level1[pillarIndex];
            if (currentSelected) flightController.setSourceNodeId(currentSelected.id);
            flightController.flyTo(pillarNode).then(() => {
              nodeClickCb(pillarNode, scene, nodesRef.current, connectionsRef.current);
            });
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gpuStarfield) gpuStarfield.dispose();
      if (warpStreaks) warpStreaks.dispose();
      if (cockpitMesh) cockpitMesh.dispose();
      if (controllerRay) {
        controllerRay.geometry.dispose();
        controllerRay.material.dispose();
      }
      flightController.dispose();
      disposePlanetTextures();
      flightControllerRef.current = null;
    };
  }, []);

  // ── onAnimate: GPU starfield, asteroid belts, flight, transit, warp, cockpit ──
  const handleAnimate = useCallback((animRefs) => {
    const { deltaTime, currentTime, renderer, camera, controls } = animRefs;
    const flightController = flightControllerRef.current;

    // GPU starfield compute update
    const gpuStarfield = gpuStarfieldRef.current;
    if (gpuStarfield) {
      gpuStarfield.timeUniform.value = currentTime * 0.001;
      renderer.compute(gpuStarfield.computeUpdate);
    }

    // Animate asteroid belts
    const belts = getAsteroidBelts();
    for (let b = 0; b < belts.length; b++) {
      belts[b].update(currentTime);
    }

    // Update flight controller
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
          transitCallbackRef.current(isFlying, targetLabel, 0);
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

      // Warp star streaks
      const warpStreaks = warpStreaksRef.current;
      if (warpStreaks) {
        const ws_flightState = flightController.getState();
        const ws_elapsed = flightController._elapsed;
        const ws_duration = flightController._phaseDuration;
        const ws_progress = ws_duration > 0 ? Math.min(ws_elapsed / ws_duration, 1) : 0;
        warpStreaks.update(camera, ws_flightState, ws_progress);
      }
    }

    // 3D cockpit readouts (VR mode)
    const cockpitMesh = cockpitMeshRef.current;
    if (cockpitMesh && hudDataRef.current) {
      cockpitMesh.updateReadouts(hudDataRef.current);
    }
  }, []);

  // ── onClick: flight intercept ──
  const handleClick = useCallback((clickedNode, refs) => {
    const flightController = flightControllerRef.current;
    if (!flightController) return false;

    const { scene, nodesRef, connectionsRef, selectedNodeRef } = refs;
    const currentSelected = selectedNodeRef.current;

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
      return true; // handled
    } else if (flightController.isFlying()) {
      return true; // swallow click during flight
    }

    return false; // let core handle it
  }, [onNodeClick]);

  // Call useSceneCore with our extensions
  const coreResult = useSceneCore(onNodeClick, onHoverChange, selectedNode, {
    sceneConfig: { enableVR: IS_VR, cameraMaxDistance: 350 },
    planetaryMode: true,
    onInit: handleInit,
    onAnimate: handleAnimate,
    onClick: handleClick,
  });

  return {
    ...coreResult,
    flightControllerRef,
    transitCallbackRef,
    hudDataRef,
    cockpitMeshRef,
  };
}
