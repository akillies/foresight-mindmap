/**
 * SFXManager — Procedural Web Audio API sound effects engine
 * All sounds are synthesized at runtime; no audio files required.
 */

class SFXManager {
  constructor() {
    this._ctx = null;
    this._masterGain = null;
    this._muted = false;
    this._masterVolume = 0.20;
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  /**
   * Lazily create AudioContext + master gain on first user interaction.
   * Browsers require a user gesture before audio can play.
   */
  _ensureContext() {
    if (this._ctx) return;
    this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    this._masterGain = this._ctx.createGain();
    this._masterGain.gain.value = this._masterVolume;
    this._masterGain.connect(this._ctx.destination);
  }

  /**
   * Resume a suspended AudioContext (required after tab backgrounding / mobile).
   */
  _resumeIfNeeded() {
    if (this._ctx && this._ctx.state === 'suspended') {
      this._ctx.resume();
    }
  }

  /**
   * Returns true when sound should not play.
   */
  _shouldSkip() {
    return this._muted || !this._ctx;
  }

  // ---------------------------------------------------------------------------
  // Mute controls
  // ---------------------------------------------------------------------------

  mute() {
    this._muted = true;
    if (this._masterGain) this._masterGain.gain.value = 0;
  }

  unmute() {
    this._muted = false;
    if (this._masterGain) this._masterGain.gain.value = this._masterVolume;
  }

  toggleMute() {
    if (this._muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  isMuted() {
    return this._muted;
  }

  // ---------------------------------------------------------------------------
  // Utility: white noise buffer (created once, cached)
  // ---------------------------------------------------------------------------

  _getNoiseBuffer() {
    if (this._noiseBuffer) return this._noiseBuffer;
    const sampleRate = this._ctx.sampleRate;
    const length = sampleRate; // 1 second of noise
    const buffer = this._ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this._noiseBuffer = buffer;
    return buffer;
  }

  // ---------------------------------------------------------------------------
  // Sound effects
  // ---------------------------------------------------------------------------

  /**
   * Soft blip — sine 800 Hz, 50 ms
   */
  hover() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this._masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Two-tone ascending sweep — sine 600 Hz -> 900 Hz, 200 ms
   */
  select() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this._masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Noise burst — white noise through bandpass 2000 Hz, 30 ms
   */
  consoleClick() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const source = ctx.createBufferSource();
    source.buffer = this._getNoiseBuffer();

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this._masterGain);

    source.start(now);
    source.stop(now + 0.03);
  }

  /**
   * Rising sawtooth sweep — 200 Hz -> 2000 Hz over 800 ms
   */
  warpStart() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this._masterGain);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  /**
   * Descending chime — sine 1200 Hz -> 400 Hz, exponential decay, 400 ms
   */
  warpEnd() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this._masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Filtered noise sweep — white noise through bandpass 200 -> 4000 Hz, 300 ms
   */
  scannerToggle() {
    this._ensureContext();
    this._resumeIfNeeded();
    if (this._shouldSkip()) return;

    const ctx = this._ctx;
    const now = ctx.currentTime;

    const source = ctx.createBufferSource();
    source.buffer = this._getNoiseBuffer();

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 0.3);
    filter.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this._masterGain);

    source.start(now);
    source.stop(now + 0.3);
  }
}

export const sfx = new SFXManager();
