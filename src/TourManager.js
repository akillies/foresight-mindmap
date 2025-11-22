import { audioManager } from './AudioManager';
import TourCameraController from './TourCameraController';
import { getNarrationScript } from './tourNarration';

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

      // SKIP preload for now - using browser TTS fallback
      // Audio files don't exist yet, will be generated later with ElevenLabs
      // The AudioManager.playNarration() will gracefully fall back to TTS
      console.log('[TourManager] Skipping audio preload - using TTS fallback');

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

    // SKIP background music for now - file doesn't exist yet
    // Will add when Yagya track is available
    console.log('[TourManager] Skipping background music - file not available yet');

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
      // Create cinematic arc path instead of straight line
      const waypoints = this._generateArcPath(
        this.cameraController.camera.position,
        segment.cameraPosition,
        segment.lookAt
      );

      const cameraPromise = waypoints.length > 2
        ? this.cameraController.moveAlongPath(waypoints, {
            duration: segment.transitionDuration || 3000,
            lookAt: segment.lookAt,
            onUpdate: (progress) => {
              this.emit('cameraProgress', { progress });
            }
          })
        : this.cameraController.moveTo(
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
        if (this.state === TOUR_STATES.PLAYING) {
          const narrationText = getNarrationScript(segment.id);
          await audioManager.playNarration(segment.narrationUrl, narrationText);
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

    } else if (segment.narrationUrl || segment.id) {
      // Just narration, no camera movement
      const narrationText = getNarrationScript(segment.id);
      await audioManager.playNarration(segment.narrationUrl, narrationText);
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
   * Generate cinematic arc path between two positions
   * Creates waypoints that orbit around the look-at target
   */
  _generateArcPath(fromPos, toPos, lookAt) {
    const from = { x: fromPos.x, y: fromPos.y, z: fromPos.z };
    const to = { x: toPos.x, y: toPos.y, z: toPos.z };
    const target = { x: lookAt.x, y: lookAt.y, z: lookAt.z };

    // Calculate distance to determine if arc is needed
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dz = to.z - from.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Short movements don't need arcs
    if (distance < 30) {
      return [from, to];
    }

    // Create arc with 2-3 intermediate waypoints
    const waypoints = [from];

    // Calculate number of arc points based on distance
    const numPoints = distance > 60 ? 3 : 2;

    for (let i = 1; i <= numPoints; i++) {
      const t = i / (numPoints + 1);

      // Linear interpolation
      const baseX = from.x + (to.x - from.x) * t;
      const baseY = from.y + (to.y - from.y) * t;
      const baseZ = from.z + (to.z - from.z) * t;

      // Add orbital offset perpendicular to movement direction
      // This creates the "swoop" effect
      const arcHeight = Math.sin(t * Math.PI) * (distance * 0.2);

      // Vector from waypoint to target
      const toTargetX = target.x - baseX;
      const toTargetY = target.y - baseY;
      const toTargetZ = target.z - baseZ;
      const toTargetDist = Math.sqrt(toTargetX * toTargetX + toTargetY * toTargetY + toTargetZ * toTargetZ);

      // Normalize and scale by arc height
      if (toTargetDist > 0.1) {
        const normalX = toTargetX / toTargetDist;
        const normalY = toTargetY / toTargetDist;
        const normalZ = toTargetZ / toTargetDist;

        waypoints.push({
          x: baseX + normalX * arcHeight,
          y: baseY + normalY * arcHeight + arcHeight * 0.5, // Extra Y lift for drama
          z: baseZ + normalZ * arcHeight
        });
      } else {
        waypoints.push({ x: baseX, y: baseY + arcHeight, z: baseZ });
      }
    }

    waypoints.push(to);
    return waypoints;
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
