/**
 * Tests for refactored module structure
 * Verifies that all extracted modules export expected functions
 */
import { describe, it, expect } from 'vitest';

describe('Module Structure', () => {
  describe('constants.js', () => {
    it('should export COLORS object', async () => {
      const { COLORS } = await import('../constants');
      expect(COLORS).toBeDefined();
      expect(COLORS.primary).toBe('#5C88DA');
      expect(COLORS.secondary).toBe('#FFCC66');
      expect(COLORS.pink).toBe('#FF6B9D');
    });

    it('should export MEDIA_COLORS object', async () => {
      const { MEDIA_COLORS } = await import('../constants');
      expect(MEDIA_COLORS).toBeDefined();
      expect(MEDIA_COLORS.video).toBe('#FF6B9D');
      expect(MEDIA_COLORS.article).toBe('#FFCC66');
    });

    it('should export AUDIO_PRESETS object', async () => {
      const { AUDIO_PRESETS } = await import('../constants');
      expect(AUDIO_PRESETS).toBeDefined();
      expect(AUDIO_PRESETS[1]).toBeDefined();
      expect(AUDIO_PRESETS[1].baseFreq).toBe(136.1);
      expect(AUDIO_PRESETS[2]).toBeDefined();
      expect(AUDIO_PRESETS[3]).toBeDefined();
    });

    it('should export SCENE_CONFIG object', async () => {
      const { SCENE_CONFIG } = await import('../constants');
      expect(SCENE_CONFIG).toBeDefined();
      expect(SCENE_CONFIG.starfieldCount).toBe(4000);
      expect(SCENE_CONFIG.level1Radius).toBe(25);
    });

    it('should export FLIGHT_CONFIG object', async () => {
      const { FLIGHT_CONFIG } = await import('../constants');
      expect(FLIGHT_CONFIG).toBeDefined();
      expect(FLIGHT_CONFIG.baseDuration).toBe(1.5);
      expect(FLIGHT_CONFIG.maxDuration).toBe(3.0);
      expect(FLIGHT_CONFIG.arcHeightRatio).toBe(0.3);
    });

    it('should export Vector3 constants for scale', async () => {
      const { SCALE_SELECTED, SCALE_NORMAL } = await import('../constants');
      expect(SCALE_SELECTED).toBeDefined();
      expect(SCALE_NORMAL).toBeDefined();
      expect(SCALE_SELECTED.x).toBe(1.4);
      expect(SCALE_NORMAL.x).toBe(1);
    });
  });

  describe('scene/index.js exports', () => {
    it('should export SceneSetup functions', async () => {
      const scene = await import('../scene');
      expect(scene.initializeScene).toBeTypeOf('function');
      expect(scene.setupLighting).toBeTypeOf('function');
      expect(scene.handleResize).toBeTypeOf('function');
      expect(scene.cleanupScene).toBeTypeOf('function');
    });

    it('should export ParticleSystem functions', async () => {
      const scene = await import('../scene');
      expect(scene.createStarfield).toBeTypeOf('function');
      expect(scene.createDistantGalaxies).toBeTypeOf('function');
      expect(scene.createNebulas).toBeTypeOf('function');
      expect(scene.animateStarfield).toBeTypeOf('function');
      expect(scene.animateNebulas).toBeTypeOf('function');
    });

    it('should export NodeFactory functions', async () => {
      const scene = await import('../scene');
      expect(scene.createCenterNode).toBeTypeOf('function');
      expect(scene.createLevel1Nodes).toBeTypeOf('function');
      expect(scene.createChildNodes).toBeTypeOf('function');
      expect(scene.createMediaNodes).toBeTypeOf('function');
      expect(scene.removeChildNodes).toBeTypeOf('function');
      expect(scene.getDescendantIds).toBeTypeOf('function');
    });

    it('should export ConnectionManager functions', async () => {
      const scene = await import('../scene');
      expect(scene.createConnection).toBeTypeOf('function');
      expect(scene.createCrossPillarConnections).toBeTypeOf('function');
      expect(scene.removeCrossPillarConnections).toBeTypeOf('function');
      expect(scene.animateConnections).toBeTypeOf('function');
      expect(scene.setActiveConnection).toBeTypeOf('function');
      expect(scene.clearActiveConnection).toBeTypeOf('function');
    });

    it('should export FlightController class', async () => {
      const scene = await import('../scene');
      expect(scene.FlightController).toBeTypeOf('function');
    });

    it('should export EasterEggs functions', async () => {
      const scene = await import('../scene');
      expect(scene.createBlackSwan).toBeTypeOf('function');
      expect(scene.createEnterpriseD).toBeTypeOf('function');
      expect(scene.checkEasterEggSpawn).toBeTypeOf('function');
      expect(scene.animateEasterEgg).toBeTypeOf('function');
    });
  });

  describe('hooks/index.js exports', () => {
    it('should export all custom hooks', async () => {
      const hooks = await import('../hooks');
      expect(hooks.useAudio).toBeTypeOf('function');
      expect(hooks.useSearch).toBeTypeOf('function');
      expect(hooks.useNodeInteraction).toBeTypeOf('function');
      expect(hooks.useThreeScene).toBeTypeOf('function');
    });
  });

  describe('ui/index.js exports', () => {
    it('should export all UI components', async () => {
      const ui = await import('../ui');
      expect(ui.ControlPanel).toBeTypeOf('function');
      expect(ui.AudioControls).toBeTypeOf('function');
      expect(ui.HoverTooltip).toBeTypeOf('function');
      expect(ui.AboutModal).toBeTypeOf('function');
      expect(ui.GlobalStyles).toBeTypeOf('function');
    });
  });
});

describe('Hook Functionality', () => {
  describe('useSearch', () => {
    it('should return search state and handlers', async () => {
      // Note: Can't test hooks directly without React, but verify export shape
      const { useSearch } = await import('../hooks/useSearch');
      expect(useSearch).toBeTypeOf('function');
    });
  });

  describe('useAudio', () => {
    it('should be a valid hook function', async () => {
      const { useAudio } = await import('../hooks/useAudio');
      expect(useAudio).toBeTypeOf('function');
    });
  });

  describe('useNodeInteraction', () => {
    it('should be a valid hook function', async () => {
      const { useNodeInteraction } = await import('../hooks/useNodeInteraction');
      expect(useNodeInteraction).toBeTypeOf('function');
    });
  });
});

describe('Scene Functions', () => {
  describe('EasterEggs', () => {
    it('checkEasterEggSpawn returns null when easter egg exists', async () => {
      const { checkEasterEggSpawn } = await import('../scene/EasterEggs');
      const result = checkEasterEggSpawn(null, { exists: true });
      expect(result).toBeNull();
    });
  });

  describe('ConnectionManager', () => {
    it('removeCrossPillarConnections clears array', async () => {
      const { removeCrossPillarConnections } = await import('../scene/ConnectionManager');
      const mockArray = [1, 2, 3];
      const mockScene = {
        remove: () => {},
      };
      // Mock objects with dispose methods
      mockArray[0] = { geometry: { dispose: () => {} }, material: { dispose: () => {} } };
      mockArray[1] = { geometry: { dispose: () => {} }, material: { dispose: () => {} } };
      mockArray[2] = { geometry: { dispose: () => {} }, material: { dispose: () => {} } };

      removeCrossPillarConnections(mockScene, mockArray);
      expect(mockArray.length).toBe(0);
    });
  });
});
