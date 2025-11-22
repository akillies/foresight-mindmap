/**
 * AudioManager - Handles background music and narration for the guided tour experience
 *
 * Features:
 * - Background music with crossfade transitions
 * - Narration playback with automatic music ducking
 * - Volume controls with smooth transitions
 * - Preloading for seamless playback
 * - Event callbacks for tour synchronization
 */

class AudioManager {
  constructor(options = {}) {
    // Configuration
    this.musicVolume = options.musicVolume ?? 0.3;
    this.narrationVolume = options.narrationVolume ?? 1.0;
    this.duckingLevel = options.duckingLevel ?? 0.15; // Music volume when narrating
    this.crossfadeDuration = options.crossfadeDuration ?? 2000; // ms
    this.duckingFadeDuration = options.duckingFadeDuration ?? 500; // ms

    // State
    this.isInitialized = false;
    this.isMuted = false;
    this.currentMusic = null;
    this.nextMusic = null;
    this.currentNarration = null;
    this.preloadedAudio = new Map();

    // Audio elements
    this.musicElements = {
      a: null,
      b: null
    };
    this.activeChannel = 'a';
    this.narrationElement = null;

    // Event callbacks
    this.onNarrationEnd = options.onNarrationEnd || (() => {});
    this.onNarrationStart = options.onNarrationStart || (() => {});
    this.onMusicChange = options.onMusicChange || (() => {});
    this.onError = options.onError || console.error;

    // Animation frames for smooth volume transitions
    this.volumeTransitions = new Map();
  }

  /**
   * Initialize the audio system - must be called after user interaction
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Create audio elements for music (two for crossfading)
      this.musicElements.a = this._createAudioElement('music-a');
      this.musicElements.b = this._createAudioElement('music-b');

      // Create narration element
      this.narrationElement = this._createAudioElement('narration');

      // Set up narration event handlers
      this.narrationElement.addEventListener('ended', () => {
        this._unduckMusic();
        this.onNarrationEnd();
      });

      this.narrationElement.addEventListener('play', () => {
        this._duckMusic();
        this.onNarrationStart();
      });

      this.narrationElement.addEventListener('error', (e) => {
        this.onError('Narration error:', e);
        this._unduckMusic();
      });

      this.isInitialized = true;
      console.log('[AudioManager] Initialized successfully');

    } catch (error) {
      this.onError('Failed to initialize AudioManager:', error);
      throw error;
    }
  }

  /**
   * Create a configured audio element
   */
  _createAudioElement(id) {
    const audio = new Audio();
    audio.id = `audio-manager-${id}`;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    return audio;
  }

  /**
   * Preload an audio file for instant playback
   */
  async preload(url, type = 'music') {
    if (this.preloadedAudio.has(url)) {
      return this.preloadedAudio.get(url);
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';

      audio.addEventListener('canplaythrough', () => {
        this.preloadedAudio.set(url, { url, type, duration: audio.duration });
        resolve({ url, type, duration: audio.duration });
      }, { once: true });

      audio.addEventListener('error', (e) => {
        reject(new Error(`Failed to preload ${url}: ${e.message}`));
      }, { once: true });

      audio.src = url;
      audio.load();
    });
  }

  /**
   * Preload multiple audio files
   */
  async preloadAll(urls) {
    const results = await Promise.allSettled(
      urls.map(item => {
        if (typeof item === 'string') {
          return this.preload(item);
        }
        return this.preload(item.url, item.type);
      })
    );

    const failed = results.filter(r => r.status === 'rejected');
    if (failed.length > 0) {
      console.warn(`[AudioManager] ${failed.length} files failed to preload`);
    }

    return results;
  }

  /**
   * Play background music with optional crossfade from current track
   */
  async playMusic(url, options = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const { loop = true, fadeIn = true } = options;

    // Determine which channel to use
    const targetChannel = this.activeChannel === 'a' ? 'b' : 'a';
    const currentElement = this.musicElements[this.activeChannel];
    const targetElement = this.musicElements[targetChannel];

    // Set up target element
    targetElement.src = url;
    targetElement.loop = loop;
    targetElement.volume = fadeIn ? 0 : this.getMusicVolume();

    try {
      await targetElement.play();
      this.currentMusic = url;

      if (fadeIn && currentElement.src) {
        // Crossfade
        await this._crossfade(currentElement, targetElement);
      } else if (fadeIn) {
        // Just fade in
        await this._fadeVolume(targetElement, 0, this.getMusicVolume(), this.crossfadeDuration);
      }

      // Stop old track
      if (currentElement.src) {
        currentElement.pause();
        currentElement.currentTime = 0;
      }

      this.activeChannel = targetChannel;
      this.onMusicChange(url);

    } catch (error) {
      this.onError('Failed to play music:', error);
      throw error;
    }
  }

  /**
   * Stop background music with optional fade out
   */
  async stopMusic(fadeOut = true) {
    const currentElement = this.musicElements[this.activeChannel];

    if (!currentElement.src || currentElement.paused) return;

    if (fadeOut) {
      await this._fadeVolume(currentElement, currentElement.volume, 0, this.crossfadeDuration);
    }

    currentElement.pause();
    currentElement.currentTime = 0;
    this.currentMusic = null;
  }

  /**
   * Pause background music
   */
  pauseMusic() {
    const currentElement = this.musicElements[this.activeChannel];
    if (currentElement) {
      currentElement.pause();
    }
  }

  /**
   * Resume background music
   */
  async resumeMusic() {
    const currentElement = this.musicElements[this.activeChannel];
    if (currentElement && currentElement.src) {
      await currentElement.play();
    }
  }

  /**
   * Play narration audio (file or TTS)
   */
  async playNarration(url, ttsText = null) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Stop any current narration
    if (!this.narrationElement.paused) {
      this.narrationElement.pause();
      this.narrationElement.currentTime = 0;
    }

    // Stop any active TTS
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Try audio file first, fall back to TTS if it fails
    if (url) {
      this.narrationElement.src = url;
      this.narrationElement.volume = this.isMuted ? 0 : this.narrationVolume;

      try {
        await this.narrationElement.play();
        this.currentNarration = url;
        return;
      } catch (error) {
        console.warn('[AudioManager] Audio file failed, falling back to TTS:', error);
      }
    }

    // Fallback to browser TTS if audio fails or no URL provided
    if (ttsText && window.speechSynthesis) {
      return this.speakText(ttsText);
    } else {
      this.onError('No audio file or TTS text available');
    }
  }

  /**
   * Speak text using browser TTS (fallback)
   */
  async speakText(text) {
    if (!window.speechSynthesis) {
      console.warn('[AudioManager] Browser TTS not supported');
      return;
    }

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      // Configure voice (prefer natural-sounding older male voices)
      const voices = window.speechSynthesis.getVoices();

      // Priority order: older male voices with natural sound
      const voicePreferences = [
        // macOS high quality voices
        (v) => v.name === 'Daniel' && v.lang.startsWith('en-GB'), // UK English, mature
        (v) => v.name === 'Alex' && v.lang.startsWith('en-US'),   // US English, deep
        (v) => v.name === 'Fred' && v.lang.startsWith('en-US'),   // US English, warm

        // Google natural voices
        (v) => v.name.includes('Google UK English Male'),
        (v) => v.name.includes('Google US English Male'),

        // Microsoft natural voices
        (v) => v.name.includes('Microsoft David'),    // US mature male
        (v) => v.name.includes('Microsoft Mark'),     // US deep male
        (v) => v.name.includes('Microsoft George'),   // UK mature

        // Any male English voice
        (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('male'),

        // Fallback to any en-US or en-GB
        (v) => v.lang === 'en-US' || v.lang === 'en-GB',
      ];

      let selectedVoice = null;
      for (const preference of voicePreferences) {
        selectedVoice = voices.find(preference);
        if (selectedVoice) break;
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('[AudioManager] Using voice:', selectedVoice.name, selectedVoice.lang);
      } else {
        console.warn('[AudioManager] No preferred voice found, using default');
      }

      utterance.rate = 0.85;  // Slower, more contemplative (Sagan pace)
      utterance.pitch = 0.9;  // Slightly lower for mature/authoritative sound
      utterance.volume = this.isMuted ? 0 : this.narrationVolume;

      utterance.onstart = () => {
        this._duckMusic();
        this.currentNarration = 'tts';
        this.onNarrationStart();
      };

      utterance.onend = () => {
        this._unduckMusic();
        this.currentNarration = null;
        this.onNarrationEnd();
        resolve();
      };

      utterance.onerror = (error) => {
        this._unduckMusic();
        this.onError('TTS error:', error);
        reject(error);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Stop narration
   */
  stopNarration() {
    if (this.narrationElement) {
      this.narrationElement.pause();
      this.narrationElement.currentTime = 0;
      this.currentNarration = null;
      this._unduckMusic();
    }
  }

  /**
   * Pause narration
   */
  pauseNarration() {
    if (this.narrationElement && !this.narrationElement.paused) {
      this.narrationElement.pause();
    }
  }

  /**
   * Resume narration
   */
  async resumeNarration() {
    if (this.narrationElement && this.narrationElement.src && this.narrationElement.paused) {
      await this.narrationElement.play();
    }
  }

  /**
   * Get current narration time
   */
  getNarrationTime() {
    return this.narrationElement ? this.narrationElement.currentTime : 0;
  }

  /**
   * Get narration duration
   */
  getNarrationDuration() {
    return this.narrationElement ? this.narrationElement.duration : 0;
  }

  /**
   * Check if narration is playing
   */
  isNarrationPlaying() {
    return this.narrationElement && !this.narrationElement.paused;
  }

  /**
   * Check if music is playing
   */
  isMusicPlaying() {
    const currentElement = this.musicElements[this.activeChannel];
    return currentElement && !currentElement.paused;
  }

  /**
   * Duck music volume for narration
   */
  async _duckMusic() {
    const currentElement = this.musicElements[this.activeChannel];
    if (!currentElement || currentElement.paused) return;

    const targetVolume = this.isMuted ? 0 : this.duckingLevel;
    await this._fadeVolume(currentElement, currentElement.volume, targetVolume, this.duckingFadeDuration);
  }

  /**
   * Restore music volume after narration
   */
  async _unduckMusic() {
    const currentElement = this.musicElements[this.activeChannel];
    if (!currentElement || currentElement.paused) return;

    const targetVolume = this.getMusicVolume();
    await this._fadeVolume(currentElement, currentElement.volume, targetVolume, this.duckingFadeDuration);
  }

  /**
   * Crossfade between two audio elements
   */
  async _crossfade(fromElement, toElement) {
    const targetVolume = this.getMusicVolume();

    await Promise.all([
      this._fadeVolume(fromElement, fromElement.volume, 0, this.crossfadeDuration),
      this._fadeVolume(toElement, 0, targetVolume, this.crossfadeDuration)
    ]);
  }

  /**
   * Smoothly fade volume using requestAnimationFrame
   */
  _fadeVolume(element, from, to, duration) {
    return new Promise(resolve => {
      // Cancel any existing transition on this element
      const existingTransition = this.volumeTransitions.get(element);
      if (existingTransition) {
        cancelAnimationFrame(existingTransition);
      }

      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth feel
        const eased = 1 - Math.pow(1 - progress, 3);
        element.volume = from + (to - from) * eased;

        if (progress < 1) {
          const frameId = requestAnimationFrame(animate);
          this.volumeTransitions.set(element, frameId);
        } else {
          this.volumeTransitions.delete(element);
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  /**
   * Get current music volume (accounting for mute)
   */
  getMusicVolume() {
    return this.isMuted ? 0 : this.musicVolume;
  }

  /**
   * Set music volume
   */
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));

    if (!this.isMuted) {
      const currentElement = this.musicElements[this.activeChannel];
      if (currentElement && !currentElement.paused) {
        // If narration is playing, apply ducking
        const isNarrating = this.narrationElement && !this.narrationElement.paused;
        currentElement.volume = isNarrating ? this.duckingLevel : this.musicVolume;
      }
    }
  }

  /**
   * Set narration volume
   */
  setNarrationVolume(volume) {
    this.narrationVolume = Math.max(0, Math.min(1, volume));

    if (!this.isMuted && this.narrationElement) {
      this.narrationElement.volume = this.narrationVolume;
    }
  }

  /**
   * Toggle mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this._applyMuteState();
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  setMuted(muted) {
    this.isMuted = muted;
    this._applyMuteState();
  }

  /**
   * Apply mute state to all audio elements
   */
  _applyMuteState() {
    const currentMusicElement = this.musicElements[this.activeChannel];

    if (this.isMuted) {
      if (currentMusicElement) currentMusicElement.volume = 0;
      if (this.narrationElement) this.narrationElement.volume = 0;
    } else {
      if (currentMusicElement && !currentMusicElement.paused) {
        const isNarrating = this.narrationElement && !this.narrationElement.paused;
        currentMusicElement.volume = isNarrating ? this.duckingLevel : this.musicVolume;
      }
      if (this.narrationElement) {
        this.narrationElement.volume = this.narrationVolume;
      }
    }
  }

  /**
   * Pause all audio (for tour pause)
   */
  pauseAll() {
    this.pauseMusic();
    this.pauseNarration();
  }

  /**
   * Resume all audio (for tour resume)
   */
  async resumeAll() {
    await this.resumeMusic();
    if (this.currentNarration && this.narrationElement.paused) {
      await this.resumeNarration();
    }
  }

  /**
   * Stop all audio and reset
   */
  async stopAll() {
    await this.stopMusic(true);
    this.stopNarration();
    this.currentMusic = null;
    this.currentNarration = null;
  }

  /**
   * Get current state for debugging/UI
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      isMuted: this.isMuted,
      musicVolume: this.musicVolume,
      narrationVolume: this.narrationVolume,
      currentMusic: this.currentMusic,
      currentNarration: this.currentNarration,
      isMusicPlaying: this.isMusicPlaying(),
      isNarrationPlaying: this.isNarrationPlaying(),
      narrationTime: this.getNarrationTime(),
      narrationDuration: this.getNarrationDuration(),
      preloadedCount: this.preloadedAudio.size
    };
  }

  /**
   * Clean up resources
   */
  dispose() {
    // Stop all audio
    this.stopAll();

    // Cancel all transitions
    for (const frameId of this.volumeTransitions.values()) {
      cancelAnimationFrame(frameId);
    }
    this.volumeTransitions.clear();

    // Clear preloaded audio
    this.preloadedAudio.clear();

    // Remove audio elements
    this.musicElements.a = null;
    this.musicElements.b = null;
    this.narrationElement = null;

    this.isInitialized = false;
    console.log('[AudioManager] Disposed');
  }
}

// Export singleton instance and class
export const audioManager = new AudioManager();
export default AudioManager;
