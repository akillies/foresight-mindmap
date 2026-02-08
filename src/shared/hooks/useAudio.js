/**
 * useAudio Hook
 * Manages Web Audio API binaural beat generation and file playback
 */
import { useEffect, useRef } from 'react';
import { AUDIO_PRESETS } from '@shared/constants';

/**
 * Custom hook for ambient audio with binaural beats
 * @param {boolean} audioEnabled - Whether audio should be playing
 * @param {number} audioPreset - Current preset number (1, 2, or 3)
 * @returns {Object} Audio refs for external control if needed
 */
export function useAudio(audioEnabled, audioPreset) {
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const audioBuffersRef = useRef({});
  const oscillatorsRef = useRef([]);

  useEffect(() => {
    const stopAudio = () => {
      // Stop all oscillators
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Already stopped
        }
      });
      oscillatorsRef.current = [];

      // Stop audio source
      if (audioSourceRef.current) {
        try {
          if (audioSourceRef.current.stop) {
            audioSourceRef.current.stop();
          }
          if (audioSourceRef.current.disconnect) {
            audioSourceRef.current.disconnect();
          }
        } catch (e) {
          // Already stopped
        }
        audioSourceRef.current = null;
      }

      // Disconnect gain node
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.disconnect();
        } catch (e) {
          // Already disconnected
        }
        gainNodeRef.current = null;
      }
    };

    const playGenerativeAudio = async (ctx, preset, gainNode, baseVolume) => {
      // Create stereo panners for binaural effect
      const pannerLeft = ctx.createStereoPanner();
      pannerLeft.pan.value = -1;
      const pannerRight = ctx.createStereoPanner();
      pannerRight.pan.value = 1;

      // Main binaural oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(preset.baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(preset.baseFreq + preset.binauralBeat, ctx.currentTime);

      osc1.connect(pannerLeft);
      pannerLeft.connect(gainNode);
      osc2.connect(pannerRight);
      pannerRight.connect(gainNode);

      oscillatorsRef.current.push(osc1, osc2);

      // Add harmonics for DEEP FOCUS preset
      if (preset.harmonics) {
        const harmonics = [preset.baseFreq * 2, preset.baseFreq * 1.5, preset.baseFreq * 0.5];
        harmonics.forEach((freq, idx) => {
          const harmOsc = ctx.createOscillator();
          harmOsc.type = 'sine';
          harmOsc.frequency.setValueAtTime(freq, ctx.currentTime);

          const harmGain = ctx.createGain();
          harmGain.gain.setValueAtTime(0, ctx.currentTime);
          harmGain.gain.linearRampToValueAtTime(baseVolume * (0.3 / (idx + 1)), ctx.currentTime + 2);

          harmOsc.connect(harmGain);
          harmGain.connect(ctx.destination);
          harmOsc.start();
          oscillatorsRef.current.push(harmOsc);
        });
      }

      osc1.start();
      osc2.start();
      audioSourceRef.current = { stop: () => {}, disconnect: () => {} };
    };

    const playFileAudio = async (ctx, preset, gainNode) => {
      // Check if buffer is cached
      if (!audioBuffersRef.current[preset.file]) {
        try {
          const response = await fetch(preset.file);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          audioBuffersRef.current[preset.file] = audioBuffer;
        } catch (error) {
          console.error('Error loading audio file:', error);
          return;
        }
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffersRef.current[preset.file];
      source.loop = true;
      source.connect(gainNode);
      source.start(0);
      audioSourceRef.current = source;
    };

    if (audioEnabled) {
      (async () => {
        // Initialize AudioContext
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const ctx = audioContextRef.current;

        // Resume AudioContext if suspended (required for mobile browsers like iOS Safari)
        if (ctx.state === 'suspended') {
          try {
            await ctx.resume();
            console.log('[Audio] AudioContext resumed for mobile');
          } catch (error) {
            console.error('[Audio] Failed to resume AudioContext:', error);
            return;
          }
        }

        const preset = AUDIO_PRESETS[audioPreset];

        // Stop any existing audio
        stopAudio();

        // Create gain node with fade in
        const gainNode = ctx.createGain();
        const baseVolume = 0.056; // Reduced for subtle ambience
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(baseVolume, ctx.currentTime + 2);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Play based on preset type
        if (preset.type === 'file') {
          await playFileAudio(ctx, preset, gainNode);
        } else if (preset.type === 'generative') {
          await playGenerativeAudio(ctx, preset, gainNode, baseVolume);
        }
      })();
    } else {
      // Fade out before stopping
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(stopAudio, 1000);
      } else {
        stopAudio();
      }
    }

    // Cleanup on unmount or any change
    return () => {
      stopAudio();
    };
  }, [audioEnabled, audioPreset]);

  return {
    audioContextRef,
    audioSourceRef,
    gainNodeRef,
  };
}
