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
import { createEnhancedNebulas } from '@planetary/scene/EnhancedNebulas';
import { VR_CONFIG, SELECTION_RING } from '@planetary/constants';
import { sfx } from '@shared/audio/SFXManager';

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
  const selectionRingRef = useRef(null);
  const galaxySpritesRef = useRef([]);
  const dustParticlesRef = useRef(null);
  const targetScreenPosRef = useRef(null);
  const enhancedNebulasRef = useRef(null);
  const deepSpaceLightsRef = useRef([]);
  const distantClustersRef = useRef([]);

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

    // Selection ring (amber targeting ring around selected planet)
    const ringGeo = new THREE.RingGeometry(SELECTION_RING.innerRadius, SELECTION_RING.outerRadius, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: SELECTION_RING.color,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const selectionRing = new THREE.Mesh(ringGeo, ringMat);
    selectionRing.rotation.x = -Math.PI / 2 + SELECTION_RING.tiltX;
    selectionRing.visible = false;
    scene.add(selectionRing);
    selectionRingRef.current = selectionRing;

    // Distant galaxy sprites (soft additive-blended billboards)
    const galaxySprites = [];
    const galaxyPositions = [
      [400, 80, -350], [-300, -50, 400], [250, 120, 450],
      [-450, 60, -200], [100, -100, -500],
    ];
    const galaxyCanvas = document.createElement('canvas');
    galaxyCanvas.width = 128;
    galaxyCanvas.height = 128;
    const gCtx = galaxyCanvas.getContext('2d');
    const gGrad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gGrad.addColorStop(0, 'rgba(180, 160, 220, 0.4)');
    gGrad.addColorStop(0.3, 'rgba(120, 140, 200, 0.15)');
    gGrad.addColorStop(1, 'rgba(80, 100, 160, 0)');
    gCtx.fillStyle = gGrad;
    gCtx.beginPath();
    gCtx.ellipse(64, 64, 64, 40, 0.3, 0, Math.PI * 2);
    gCtx.fill();
    const galaxyTex = new THREE.CanvasTexture(galaxyCanvas);

    for (const [gx, gy, gz] of galaxyPositions) {
      const spriteMat = new THREE.SpriteMaterial({
        map: galaxyTex,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(gx, gy, gz);
      sprite.scale.set(20 + Math.random() * 20, 12 + Math.random() * 12, 1);
      scene.add(sprite);
      galaxySprites.push(sprite);
    }
    galaxySpritesRef.current = galaxySprites;

    // Ambient dust (near-camera slow-drifting translucent particles)
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xAABBDD,
      size: 0.15,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);
    dustParticlesRef.current = dustPoints;

    // Enhanced volumetric nebulas (replace flat core nebulas)
    const enhancedNeb = createEnhancedNebulas(scene);
    enhancedNebulasRef.current = enhancedNeb;

    // Distant star clusters (300-600 units, faint additive points)
    const clusterColors = [0xF0A030, 0x88AAFF, 0xCC88DD, 0x66CCAA, 0xFFCC66, 0xAA88CC];
    const clusters = [];
    const clusterPositions = [
      [350, 60, -400], [-400, -30, 300], [500, 90, 100],
      [-300, 40, -500], [200, -70, 500], [-500, 80, -200],
      [450, -50, 350], [-200, 100, 450], [300, -80, -300],
      [-450, 50, 150], [550, 30, -150], [-350, -60, -350],
    ];
    for (let c = 0; c < clusterPositions.length; c++) {
      const [px, py, pz] = clusterPositions[c];
      const particleCount = 50 + Math.floor(Math.random() * 150);
      const cGeo = new THREE.BufferGeometry();
      const cPositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        cPositions[i * 3] = px + (Math.random() - 0.5) * 40;
        cPositions[i * 3 + 1] = py + (Math.random() - 0.5) * 30;
        cPositions[i * 3 + 2] = pz + (Math.random() - 0.5) * 40;
      }
      cGeo.setAttribute('position', new THREE.BufferAttribute(cPositions, 3));
      const cMat = new THREE.PointsMaterial({
        color: clusterColors[c % clusterColors.length],
        size: 0.3 + Math.random() * 0.4,
        transparent: true,
        opacity: 0.1 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const cPts = new THREE.Points(cGeo, cMat);
      scene.add(cPts);
      clusters.push(cPts);
    }
    distantClustersRef.current = clusters;

    // Star-directed warm PointLight at origin
    const starLight = new THREE.PointLight(0xFFBB44, 1.5, 200);
    starLight.position.set(0, 0, 0);
    scene.add(starLight);

    // Purple rim light below/behind camera — Discovery-style drama
    const rimLight = new THREE.PointLight(0x8866AA, 0.5, 150);
    rimLight.position.set(0, -40, 60);
    scene.add(rimLight);
    deepSpaceLightsRef.current = [starLight, rimLight];

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
      if (selectionRing) {
        selectionRing.geometry.dispose();
        selectionRing.material.dispose();
        scene.remove(selectionRing);
      }
      for (const gs of galaxySprites) {
        gs.material.dispose();
        scene.remove(gs);
      }
      galaxyTex.dispose();
      if (dustPoints) {
        dustPoints.geometry.dispose();
        dustPoints.material.dispose();
        scene.remove(dustPoints);
      }
      if (cockpitMesh) cockpitMesh.dispose();
      if (controllerRay) {
        controllerRay.geometry.dispose();
        controllerRay.material.dispose();
      }
      if (enhancedNeb) enhancedNeb.dispose();
      for (const cl of clusters) {
        cl.geometry.dispose();
        cl.material.dispose();
        scene.remove(cl);
      }
      for (const light of deepSpaceLightsRef.current) {
        scene.remove(light);
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

      // Notify consumer of transit state changes + trigger warp SFX
      const flightState = flightController.getState();
      if (flightState !== lastTransitStateRef.current) {
        const prevState = lastTransitStateRef.current;
        lastTransitStateRef.current = flightState;

        // Warp SFX
        if (flightState === 'DEPARTING') sfx.warpStart();
        if (flightState === 'ORBITING' && prevState !== 'ORBITING') sfx.warpEnd();

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

    // Galaxy sprites slow rotation
    const gSprites = galaxySpritesRef.current;
    for (let g = 0; g < gSprites.length; g++) {
      gSprites[g].material.rotation += 0.00002 * (g + 1);
    }

    // Ambient dust: slow drift relative to camera
    const dustPts = dustParticlesRef.current;
    if (dustPts) {
      dustPts.position.x = camera.position.x * 0.3;
      dustPts.position.y = camera.position.y * 0.3;
      dustPts.position.z = camera.position.z * 0.3;
      dustPts.rotation.y += 0.00005;
    }

    // Selection ring animation (rotation + opacity pulse + position tracking)
    const selRing = selectionRingRef.current;
    if (selRing && selRing.visible) {
      selRing.rotation.z += SELECTION_RING.rotationSpeed;
      const pulse = SELECTION_RING.pulseMin +
        (SELECTION_RING.pulseMax - SELECTION_RING.pulseMin) *
        (0.5 + 0.5 * Math.sin(currentTime * SELECTION_RING.pulseSpeed));
      selRing.material.opacity = pulse;

      // 3D→2D projection for targeting reticle overlay
      const projected = selRing.position.clone().project(camera);
      const hw = renderer.domElement.clientWidth / 2;
      const hh = renderer.domElement.clientHeight / 2;
      targetScreenPosRef.current = {
        x: projected.x * hw + hw,
        y: -projected.y * hh + hh,
      };
    } else {
      targetScreenPosRef.current = null;
    }

    // 3D cockpit readouts (VR mode)
    const cockpitMesh = cockpitMeshRef.current;
    if (cockpitMesh && hudDataRef.current) {
      cockpitMesh.updateReadouts(hudDataRef.current);
    }
  }, []);

  // Position the selection ring on a target node
  const moveSelectionRing = useCallback((targetNode) => {
    const ring = selectionRingRef.current;
    if (!ring) return;
    if (!targetNode || targetNode.userData.celestialType === 'star') {
      ring.visible = false;
      return;
    }
    ring.visible = true;
    ring.material.opacity = 0;
    // Get world position (handles LOD groups)
    const worldPos = new THREE.Vector3();
    targetNode.getWorldPosition(worldPos);
    ring.position.copy(worldPos);
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
      sfx.select();
      flightController.setSourceNodeId(currentSelected.id);
      flightController.flyTo(clickedNode).then(() => {
        moveSelectionRing(clickedNode);
        onNodeClick(clickedNode, scene, nodesRef.current, connectionsRef.current);
      });
      return true; // handled
    } else if (flightController.isFlying()) {
      return true; // swallow click during flight
    }

    // Non-flight click: position ring and play SFX
    if (clickedNode.userData.id && !clickedNode.userData.isMedia) {
      sfx.select();
      moveSelectionRing(clickedNode);
    }

    return false; // let core handle it
  }, [onNodeClick, moveSelectionRing]);

  // Call useSceneCore with our extensions
  const coreResult = useSceneCore(onNodeClick, onHoverChange, selectedNode, {
    sceneConfig: {
      enableVR: IS_VR,
      cameraMaxDistance: 350,
      fogDensity: 0.002,
      bloomConfig: { threshold: 0.7, strength: 1.0, radius: 0.3 },
    },
    planetaryMode: true,
    onInit: handleInit,
    onAnimate: handleAnimate,
    onClick: handleClick,
  });

  // Hide core flat nebulas — enhanced volumetric ones replace them
  useEffect(() => {
    const nebulas = coreResult.nebulasRef?.current;
    if (nebulas) {
      for (const neb of nebulas) {
        if (neb && neb.visible !== undefined) neb.visible = false;
      }
    }
  }, [coreResult.nebulasRef]);

  return {
    ...coreResult,
    flightControllerRef,
    transitCallbackRef,
    hudDataRef,
    cockpitMeshRef,
    targetScreenPosRef,
  };
}
