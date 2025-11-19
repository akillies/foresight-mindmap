import { audioManager } from './AudioManager';
import TourCameraController from './TourCameraController';

/**
 * TourManager - Orchestrates the guided tour experience
 *
 * State machine: IDLE → LOADING → PLAYING ⇄ PAUSED → SKIPPING → COMPLETED
 *
 * Features:
 * - Synchronizes audio and camera movements
 * - Manages tour segments (stops at each node)
 * - Handles pause/resume/skip/exit
 * - Emits events for UI updates
 */

export const TOUR_STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  SKIPPING: 'SKIPPING',
  COMPLETED: 'COMPLETED'
};

class TourManager {
  constructor() {
    // State
    this.state = TOUR_STATES.IDLE;
    this.currentTour = null;
    this.currentSegmentIndex = -1;
    this.cameraController = null;

    // Tour data
    this.tourData = null;
    this.segments = [];

    // Event listeners
    this.listeners = new Map();

    // Timing
    this.segmentStartTime = 0;
    this.totalElapsed = 0;

    // Setup audio manager callbacks
    audioManager.onNarrationEnd = () => this.handleNarrationEnd();
    audioManager.onError = (msg, err) => this.emit('error', { message: msg, error: err });
  }

  /**
   * Initialize the tour manager with camera and controls
   */
  initialize(camera, controls) {
    this.cameraController = new TourCameraController(camera, controls);
    console.log('[TourManager] Initialized');
  }

  /**
   * Load a tour configuration
   */
  async loadTour(tourData) {
    if (this.state !== TOUR_STATES.IDLE && this.state !== TOUR_STATES.COMPLETED) {
      console.warn('[TourManager] Cannot load tour while another is in progress');
      return false;
    }

    this.setState(TOUR_STATES.LOADING);
    this.tourData = tourData;
    this.segments = tourData.segments || [];
    this.currentSegmentIndex = -1;

    try {
      // Initialize audio manager
      await audioManager.initialize();

      // Preload audio assets
      const audioUrls = [];

      // Add music track
      if (tourData.musicUrl) {
        audioUrls.push({ url: tourData.musicUrl, type: 'music' });
      }

      // Add narration files
      for (const segment of this.segments) {
        if (segment.narrationUrl) {
          audioUrls.push({ url: segment.narrationUrl, type: 'narration' });
        }
      }

      if (audioUrls.length > 0) {
        this.emit('loading', { phase: 'audio', total: audioUrls.length });
        await audioManager.preloadAll(audioUrls);
      }

      this.emit('loaded', { tourId: tourData.id, segmentCount: this.segments.length });
      this.setState(TOUR_STATES.IDLE);
      return true;

    } catch (error) {
      console.error('[TourManager] Failed to load tour:', error);
      this.emit('error', { message: 'Failed to load tour', error });
      this.setState(TOUR_STATES.IDLE);
      return false;
    }
  }

  /**
   * Start the tour
   */
  async start() {
    if (!this.tourData) {
      console.warn('[TourManager] No tour loaded');
      return;
    }

    if (this.state !== TOUR_STATES.IDLE && this.state !== TOUR_STATES.COMPLETED) {
      console.warn('[TourManager] Cannot start tour from state:', this.state);
      return;
    }

    this.setState(TOUR_STATES.PLAYING);
    this.currentSegmentIndex = -1;
    this.totalElapsed = 0;

    this.emit('start', { tourId: this.tourData.id });

    // Start background music
    if (this.tourData.musicUrl) {
      await audioManager.playMusic(this.tourData.musicUrl, { loop: true });
    }

    // Begin first segment
    await this.nextSegment();
  }

  /**
   * Move to the next segment
   */
  async nextSegment() {
    this.currentSegmentIndex++;

    if (this.currentSegmentIndex >= this.segments.length) {
      await this.complete();
      return;
    }

    const segment = this.segments[this.currentSegmentIndex];
    this.segmentStartTime = performance.now();

    this.emit('segment', {
      index: this.currentSegmentIndex,
      total: this.segments.length,
      segment
    });

    // Move camera to segment position
    if (segment.cameraPosition && segment.lookAt) {
      const cameraPromise = this.cameraController.moveTo(
        segment.cameraPosition,
        segment.lookAt,
        {
          duration: segment.transitionDuration || 3000,
          onUpdate: (progress) => {
            this.emit('cameraProgress', { progress });
          }
        }
      );

      // Start narration after camera begins moving (with optional delay)
      const narrationDelay = segment.narrationDelay || 500;
      setTimeout(async () => {
        if (segment.narrationUrl && this.state === TOUR_STATES.PLAYING) {
          await audioManager.playNarration(segment.narrationUrl);
        }
      }, narrationDelay);

      await cameraPromise;

      // If no narration, wait for dwell time then proceed
      if (!segment.narrationUrl) {
        const dwellTime = segment.dwellTime || 3000;
        await this.delay(dwellTime);
        await this.nextSegment();
      }
      // Otherwise, handleNarrationEnd will call nextSegment

    } else if (segment.narrationUrl) {
      // Just narration, no camera movement
      await audioManager.playNarration(segment.narrationUrl);
    } else {
      // No camera or narration, just dwell
      const dwellTime = segment.dwellTime || 3000;
      await this.delay(dwellTime);
      await this.nextSegment();
    }
  }

  /**
   * Handle narration end - proceed to next segment
   */
  async handleNarrationEnd() {
    if (this.state === TOUR_STATES.PLAYING) {
      const segment = this.segments[this.currentSegmentIndex];
      const postNarrationDwell = segment?.postNarrationDwell || 1000;

      await this.delay(postNarrationDwell);

      if (this.state === TOUR_STATES.PLAYING) {
        await this.nextSegment();
      }
    }
  }

  /**
   * Pause the tour
   */
  pause() {
    if (this.state !== TOUR_STATES.PLAYING) return;

    this.setState(TOUR_STATES.PAUSED);
    audioManager.pauseAll();
    this.cameraController?.pause();

    this.emit('pause', { segmentIndex: this.currentSegmentIndex });
  }

  /**
   * Resume the tour
   */
  async resume() {
    if (this.state !== TOUR_STATES.PAUSED) return;

    this.setState(TOUR_STATES.PLAYING);
    await audioManager.resumeAll();
    this.cameraController?.resume();

    this.emit('resume', { segmentIndex: this.currentSegmentIndex });
  }

  /**
   * Skip to the next segment
   */
  async skip() {
    if (this.state !== TOUR_STATES.PLAYING && this.state !== TOUR_STATES.PAUSED) return;

    const wasPlaying = this.state === TOUR_STATES.PLAYING;
    this.setState(TOUR_STATES.SKIPPING);

    // Stop current narration and camera animation
    audioManager.stopNarration();
    this.cameraController?.stop();

    this.emit('skip', { fromIndex: this.currentSegmentIndex });

    if (wasPlaying || this.state === TOUR_STATES.SKIPPING) {
      this.setState(TOUR_STATES.PLAYING);
      await this.nextSegment();
    }
  }

  /**
   * Exit the tour
   */
  async exit() {
    const wasState = this.state;
    this.setState(TOUR_STATES.IDLE);

    // Stop everything
    await audioManager.stopAll();
    this.cameraController?.stop();

    // Reset
    this.currentSegmentIndex = -1;
    this.totalElapsed = 0;

    this.emit('exit', { fromState: wasState });
  }

  /**
   * Complete the tour
   */
  async complete() {
    this.setState(TOUR_STATES.COMPLETED);

    // Fade out music
    await audioManager.stopMusic(true);

    this.emit('complete', {
      tourId: this.tourData?.id,
      totalDuration: performance.now() - this.segmentStartTime + this.totalElapsed
    });
  }

  /**
   * Set state and emit change
   */
  setState(newState) {
    const oldState = this.state;
    this.state = newState;
    this.emit('stateChange', { from: oldState, to: newState });
  }

  /**
   * Get current state
   */
  getState() {
    return this.state;
  }

  /**
   * Get current segment info
   */
  getCurrentSegment() {
    if (this.currentSegmentIndex < 0 || this.currentSegmentIndex >= this.segments.length) {
      return null;
    }
    return {
      index: this.currentSegmentIndex,
      total: this.segments.length,
      segment: this.segments[this.currentSegmentIndex]
    };
  }

  /**
   * Get tour progress (0-1)
   */
  getProgress() {
    if (this.segments.length === 0) return 0;
    return (this.currentSegmentIndex + 1) / this.segments.length;
  }

  /**
   * Get narration progress for current segment
   */
  getNarrationProgress() {
    const duration = audioManager.getNarrationDuration();
    if (duration === 0) return 0;
    return audioManager.getNarrationTime() / duration;
  }

  /**
   * Event system
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  emit(event, data) {
    if (!this.listeners.has(event)) return;
    for (const callback of this.listeners.get(event)) {
      try {
        callback(data);
      } catch (error) {
        console.error(`[TourManager] Error in ${event} listener:`, error);
      }
    }
  }

  /**
   * Utility delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Dispose resources
   */
  dispose() {
    this.exit();
    this.cameraController?.dispose();
    audioManager.dispose();
    this.listeners.clear();
    console.log('[TourManager] Disposed');
  }
}

// Export singleton instance
export const tourManager = new TourManager();
export default TourManager;
