/**
 * AudioControls Component
 * Controls for ambient audio and tour audio volumes
 */
import React from 'react';
import { COLORS, AUDIO_PRESETS } from '../constants';
import { audioManager } from '../AudioManager';

/**
 * Audio Controls Panel
 * @param {Object} props - Component props
 * @param {boolean} props.audioEnabled - Whether ambient audio is enabled
 * @param {Function} props.setAudioEnabled - Toggle audio enabled state
 * @param {number} props.audioPreset - Current audio preset number
 * @param {Function} props.setAudioPreset - Set audio preset
 * @param {number} props.tourMusicVolume - Tour music volume (0-100)
 * @param {Function} props.setTourMusicVolume - Set tour music volume
 * @param {number} props.tourNarrationVolume - Tour narration volume (0-100)
 * @param {Function} props.setTourNarrationVolume - Set tour narration volume
 * @param {boolean} props.tourAudioMuted - Whether tour audio is muted
 * @param {Function} props.setTourAudioMuted - Toggle tour audio mute
 */
export function AudioControls({
  audioEnabled,
  setAudioEnabled,
  audioPreset,
  setAudioPreset,
  tourMusicVolume,
  setTourMusicVolume,
  tourNarrationVolume,
  setTourNarrationVolume,
  tourAudioMuted,
  setTourAudioMuted,
}) {
  return (
    <section
      role="region"
      aria-labelledby="audio-controls-heading"
      style={{
        background: 'rgba(255, 107, 157, 0.1)',
        border: `2px solid ${COLORS.pink}`,
        borderRadius: '15px',
        padding: '15px',
        marginBottom: '15px',
      }}
    >
      <h2
        id="audio-controls-heading"
        style={{
          color: COLORS.pink,
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '2px',
          marginBottom: '12px',
          fontFamily: 'monospace',
          margin: '0 0 12px 0',
        }}
      >
        AMBIENT AUDIO
      </h2>

      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-label={audioEnabled ? 'Disable ambient background audio' : 'Enable ambient background audio'}
        aria-pressed={audioEnabled}
        aria-describedby="audio-presets-group"
        style={{
          width: '100%',
          background: audioEnabled ? COLORS.pink : 'transparent',
          border: `2px solid ${COLORS.pink}`,
          color: audioEnabled ? '#000000' : COLORS.pink,
          padding: '10px',
          borderRadius: '10px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '2px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          marginBottom: '10px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!audioEnabled) {
            e.target.style.background = `${COLORS.pink}20`;
          }
        }}
        onMouseLeave={(e) => {
          if (!audioEnabled) {
            e.target.style.background = 'transparent';
          }
        }}
      >
        {audioEnabled ? '\u25A0 AUDIO ON' : '\u25B6 AUDIO OFF'}
      </button>

      {/* Preset Radio Buttons */}
      <fieldset
        id="audio-presets-group"
        role="radiogroup"
        aria-label="Select ambient audio preset for focus or relaxation"
        style={{ display: 'flex', flexDirection: 'column', gap: '6px', border: 'none', padding: 0, margin: 0 }}
      >
        {[1, 2, 3].map(presetNum => (
          <label
            key={presetNum}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '6px 8px',
              borderRadius: '8px',
              background: audioEnabled && audioPreset === presetNum ? `${COLORS.pink}20` : 'transparent',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (audioEnabled) {
                e.currentTarget.style.background = `${COLORS.pink}15`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = audioEnabled && audioPreset === presetNum ? `${COLORS.pink}20` : 'transparent';
            }}
          >
            <input
              type="radio"
              name="audioPreset"
              value={presetNum}
              checked={audioPreset === presetNum}
              onChange={() => setAudioPreset(presetNum)}
              disabled={!audioEnabled}
              aria-label={`${AUDIO_PRESETS[presetNum].label} - ${presetNum === 1 ? 'Beta waves for focused study' : presetNum === 2 ? 'Alpha waves for calm workflow' : 'Deep ambient soundscape'}`}
              style={{
                width: '14px',
                height: '14px',
                cursor: audioEnabled ? 'pointer' : 'not-allowed',
                accentColor: COLORS.pink,
              }}
            />
            <span style={{
              color: audioEnabled ? COLORS.pink : '#8899AA',
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}>
              AMBIENT {presetNum}: {AUDIO_PRESETS[presetNum].label}
            </span>
          </label>
        ))}
      </fieldset>

      {/* Tour Audio Volume Controls */}
      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: `1px solid ${COLORS.pink}40`,
      }}>
        <h3 style={{
          color: COLORS.pink,
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '1.5px',
          marginBottom: '10px',
          fontFamily: 'monospace',
          margin: '0 0 10px 0',
          opacity: 0.8,
        }}>
          TOUR VOLUME
        </h3>

        {/* Music Volume */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
          }}>
            <label
              htmlFor="music-volume"
              style={{
                color: COLORS.pink,
                fontSize: '9px',
                fontWeight: '600',
                letterSpacing: '1px',
                fontFamily: 'monospace',
              }}
            >
              MUSIC
            </label>
            <span style={{
              color: COLORS.pink,
              fontSize: '9px',
              fontFamily: 'monospace',
              opacity: 0.7,
            }}>
              {tourMusicVolume}%
            </span>
          </div>
          <input
            id="music-volume"
            type="range"
            min="0"
            max="100"
            value={tourMusicVolume}
            onChange={(e) => {
              const vol = parseInt(e.target.value);
              setTourMusicVolume(vol);
              audioManager.setMusicVolume(vol / 100);
            }}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourMusicVolume}%, #333 ${tourMusicVolume}%, #333 100%)`,
              WebkitAppearance: 'none',
              cursor: 'pointer',
            }}
            aria-label="Tour background music volume"
          />
        </div>

        {/* Narration Volume */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
          }}>
            <label
              htmlFor="narration-volume"
              style={{
                color: COLORS.pink,
                fontSize: '9px',
                fontWeight: '600',
                letterSpacing: '1px',
                fontFamily: 'monospace',
              }}
            >
              NARRATION
            </label>
            <span style={{
              color: COLORS.pink,
              fontSize: '9px',
              fontFamily: 'monospace',
              opacity: 0.7,
            }}>
              {tourNarrationVolume}%
            </span>
          </div>
          <input
            id="narration-volume"
            type="range"
            min="0"
            max="100"
            value={tourNarrationVolume}
            onChange={(e) => {
              const vol = parseInt(e.target.value);
              setTourNarrationVolume(vol);
              audioManager.setNarrationVolume(vol / 100);
            }}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourNarrationVolume}%, #333 ${tourNarrationVolume}%, #333 100%)`,
              WebkitAppearance: 'none',
              cursor: 'pointer',
            }}
            aria-label="Tour narration volume"
          />
        </div>

        {/* Mute Toggle */}
        <button
          onClick={() => {
            const newMuted = !tourAudioMuted;
            setTourAudioMuted(newMuted);
            audioManager.setMuted(newMuted);
          }}
          aria-label={tourAudioMuted ? 'Unmute tour audio' : 'Mute tour audio'}
          aria-pressed={tourAudioMuted}
          style={{
            width: '100%',
            background: tourAudioMuted ? `${COLORS.pink}30` : 'transparent',
            border: `1px solid ${COLORS.pink}60`,
            color: COLORS.pink,
            padding: '6px',
            borderRadius: '6px',
            fontSize: '9px',
            fontWeight: '600',
            letterSpacing: '1px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.2s',
            opacity: tourAudioMuted ? 1 : 0.7,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `${COLORS.pink}20`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = tourAudioMuted ? `${COLORS.pink}30` : 'transparent';
          }}
        >
          {tourAudioMuted ? 'MUTED' : 'MUTE'}
        </button>
      </div>
    </section>
  );
}

export default AudioControls;
