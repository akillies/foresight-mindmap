/**
 * HUDWiring — Renderless component that connects scene data to HUD context.
 * Must be rendered inside HUDProvider so useHUD() returns real setters.
 * Planetary mode only.
 */
import { useEffect } from 'react';
import mindMapData from '@shared/mindMapData';
import { COLORS } from '@shared/constants';
import { useHUD } from '@planetary/ui/HUDContext';

export function HUDWiring({ selectedNode, nodesRef, gpuInfo, transitCallbackRef, hudDataRef }) {
  const { setPlanetInfo, setSceneStats, setTransitState } = useHUD();

  // --- 1. Connect planet info to selected node ---
  useEffect(() => {
    if (!selectedNode) {
      setPlanetInfo({
        name: 'STRATEGIC FORESIGHT',
        color: COLORS.primary,
        biome: null,
        childrenCount: 0,
        mediaCount: 0,
        description: '',
      });
      return;
    }

    let nodeData = null;
    let childrenCount = 0;
    let mediaCount = 0;

    if (selectedNode.id === 'root' || selectedNode.id === 'strategic-foresight') {
      nodeData = mindMapData.center;
      childrenCount = mindMapData.level1.length;
      mediaCount = nodeData.media?.length || 0;
    } else {
      const pillar = mindMapData.level1.find(p => p.id === selectedNode.id);
      if (pillar) {
        nodeData = pillar;
        childrenCount = mindMapData.methodologies.filter(m => m.parent === pillar.id).length;
        mediaCount = pillar.media?.length || 0;
      } else {
        const methodology = mindMapData.methodologies.find(m => m.id === selectedNode.id);
        if (methodology) {
          nodeData = methodology;
          childrenCount = 0;
          mediaCount = methodology.media?.length || 0;
        }
      }
    }

    setPlanetInfo({
      name: selectedNode.label?.replace('\n', ' ') || 'UNKNOWN',
      color: selectedNode.color || COLORS.primary,
      biome: nodeData?.biome || selectedNode.biome || null,
      childrenCount,
      mediaCount,
      description: selectedNode.description || nodeData?.description || '',
    });
  }, [selectedNode, setPlanetInfo]);

  // --- 2. Connect FPS counter and scene stats ---
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;
    let active = true;

    setSceneStats({
      gpuBackend: gpuInfo.isWebGPU ? 'WebGPU' : 'WebGL',
      nodeCount: nodesRef.current.length,
    });

    const measure = () => {
      if (!active) return;
      rafId = requestAnimationFrame(measure);
      frameCount++;

      const now = performance.now();
      const delta = now - lastTime;
      if (delta >= 500) {
        const fps = Math.round((frameCount * 1000) / delta);
        frameCount = 0;
        lastTime = now;
        setSceneStats({
          fps,
          nodeCount: nodesRef.current.length,
        });
      }
    };
    rafId = requestAnimationFrame(measure);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, [gpuInfo, nodesRef, setSceneStats]);

  // --- 3. Connect transit state ---
  useEffect(() => {
    if (!transitCallbackRef) return;

    transitCallbackRef.current = (isInTransit, target, progress) => {
      setTransitState(isInTransit, target, progress);
    };

    return () => {
      transitCallbackRef.current = null;
    };
  }, [transitCallbackRef, setTransitState]);

  // --- 4. Bridge HUD data to 3D cockpit (VR mode) ---
  const {
    accentColor, planetName, biome, childrenCount, mediaCount,
    description, nodeCount, fps, gpuBackend, isInTransit, transitTarget,
  } = useHUD();

  useEffect(() => {
    if (!hudDataRef) return;
    hudDataRef.current = {
      accentColor, planetName, biome, childrenCount, mediaCount,
      description, nodeCount, fps, gpuBackend, isInTransit, transitTarget,
    };
  }, [
    hudDataRef, accentColor, planetName, biome, childrenCount, mediaCount,
    description, nodeCount, fps, gpuBackend, isInTransit, transitTarget,
  ]);

  return null;
}
