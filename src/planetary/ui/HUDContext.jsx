/**
 * HUDContext - React context for cockpit HUD state
 * Holds accent color, planet info, transit state
 * Updated by flight system on planet arrival/departure
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { COLORS } from '@shared/constants';

const HUDContext = createContext(null);

export function HUDProvider({ children }) {
  const [hudState, setHudState] = useState({
    accentColor: COLORS.primary,
    planetName: 'STRATEGIC FORESIGHT',
    biome: null,
    isInTransit: false,
    transitTarget: null,
    transitProgress: 0,
    childrenCount: 0,
    mediaCount: 0,
    description: '',
    nodeCount: 0,
    fps: 0,
    gpuBackend: 'WebGL',
  });

  const setPlanetInfo = useCallback((info) => {
    setHudState(prev => ({
      ...prev,
      accentColor: info.color || COLORS.primary,
      planetName: info.name || prev.planetName,
      biome: info.biome || null,
      childrenCount: info.childrenCount ?? 0,
      mediaCount: info.mediaCount ?? 0,
      description: info.description || '',
    }));
  }, []);

  const setTransitState = useCallback((isInTransit, target, progress) => {
    setHudState(prev => ({
      ...prev,
      isInTransit,
      transitTarget: target || null,
      transitProgress: progress ?? 0,
    }));
  }, []);

  const setSceneStats = useCallback((stats) => {
    setHudState(prev => ({
      ...prev,
      nodeCount: stats.nodeCount ?? prev.nodeCount,
      fps: stats.fps ?? prev.fps,
      gpuBackend: stats.gpuBackend || prev.gpuBackend,
    }));
  }, []);

  return (
    <HUDContext.Provider value={{
      ...hudState,
      setPlanetInfo,
      setTransitState,
      setSceneStats,
    }}>
      {children}
    </HUDContext.Provider>
  );
}

export function useHUD() {
  const ctx = useContext(HUDContext);
  if (!ctx) {
    return {
      accentColor: COLORS.primary,
      planetName: 'STRATEGIC FORESIGHT',
      biome: null,
      isInTransit: false,
      transitTarget: null,
      transitProgress: 0,
      childrenCount: 0,
      mediaCount: 0,
      description: '',
      nodeCount: 0,
      fps: 0,
      gpuBackend: 'WebGL',
      setPlanetInfo: () => {},
      setTransitState: () => {},
      setSceneStats: () => {},
    };
  }
  return ctx;
}

export default HUDContext;
