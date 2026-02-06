/**
 * MusicSelectionPanel Component
 * LCARS-themed collapsible/expandable panel for ambient audio preset selection
 * Replaces the disabled placeholder in AboutModal with a functional, integrated control
 */
import React, { useState, useRef, useEffect } from 'react';
import { COLORS, AUDIO_PRESETS } from '../constants';
import { audioManager } from '../AudioManager';

const TRACK_DETAILS = {
  1: {
    name: 'AMBIENT 1: GROUNDING',
    description: 'Earth resonance carrier with Schumann frequency binaural beat for grounding and stability',
    frequency: '136.1Hz + 7.83Hz Schumann',
    color: COLORS.success,
  },
  2: {
    name: 'AMBIENT 2: CALM FLOW',
    description: 'Lunar harmonic carrier with Alpha wave binaural beat for calm, focused workflow',
    frequency: '210.42Hz + 8Hz Alpha',
    color: COLORS.secondary,
  },
  3: {
    name: 'AMBIENT 3: DEEP FOCUS',
    description: 'Solfeggio carrier with Delta wave binaural beat and harmonic overtones for deep concentration',
    frequency: '174Hz + 3Hz Delta + Harmonics',
    color: COLORS.accent,
  },
};

/**
 * MusicSelectionPanel - collapsible LCARS panel for music preset selection
 * @param {Object} props
 * @param {boolean} props.audioEnabled - Whether ambient audio is currently on
 * @param {Function} props.setAudioEnabled - Toggle audio on/off
 * @param {number} props.audioPreset - Current preset number (1, 2, or 3)
 * @param {Function} props.setAudioPreset - Set the active preset
 * @param {number} props.tourMusicVolume - Tour music volume (0-100)
 * @param {Function} props.setTourMusicVolume - Set tour music volume
 * @param {number} props.tourNarrationVolume - Tour narration volume (0-100)
 * @param {Function} props.setTourNarrationVolume - Set tour narration volume
 * @param {boolean} props.tourAudioMuted - Whether tour audio is muted
 * @param {Function} props.setTourAudioMuted - Toggle tour audio mute
 */
export function MusicSelectionPanel({
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
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const [focusedTrack, setFocusedTrack] = useState(null);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, audioEnabled]);

  const currentTrack = TRACK_DETAILS[audioPreset];
  const headerLabel = audioEnabled
    ? currentTrack.name
    : 'AMBIENT AUDIO';

  const handleTrackSelect = (presetNum) => {
    if (audioPreset === presetNum && audioEnabled) {
      // Clicking active track toggles audio off
      setAudioEnabled(false);
    } else {
      setAudioPreset(presetNum);
      if (!audioEnabled) {
        setAudioEnabled(true);
      }
    }
  };

  const handleHeaderKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  const handleTrackKeyDown = (e, presetNum) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTrackSelect(presetNum);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = presetNum < 3 ? presetNum + 1 : 1;
      setFocusedTrack(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = presetNum > 1 ? presetNum - 1 : 3;
      setFocusedTrack(prev);
    }
  };

  // Focus management for keyboard arrow navigation
  useEffect(() => {
    if (focusedTrack !== null) {
      const el = document.getElementById(`music-track-${focusedTrack}`);
      if (el) el.focus();
    }
  }, [focusedTrack]);

  return (
    <section
      role="region"
      aria-labelledby="music-panel-heading"
      aria-label="Ambient audio selection panel"
      style={{ marginBottom: '15px' }}
    >
      {/* LCARS Capsule Header - click to expand/collapse */}
      <div
        id="music-panel-heading"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls="music-panel-content"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={handleHeaderKeyDown}
        style={{
          background: audioEnabled
            ? `linear-gradient(135deg, ${COLORS.pink}, ${currentTrack.color})`
            : `linear-gradient(135deg, ${COLORS.pink}80, ${COLORS.pink}40)`,
          padding: '10px 16px',
          borderRadius: expanded ? '16px 16px 0 0' : '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          boxShadow: audioEnabled
            ? `0 0 12px ${COLORS.pink}40`
            : 'none',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Status indicator dot */}
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: audioEnabled ? COLORS.successBright : COLORS.textMuted,
            boxShadow: audioEnabled ? `0 0 6px ${COLORS.successBright}` : 'none',
            transition: 'all 0.3s',
          }} />
          <span style={{
            color: COLORS.background,
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '2px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}>
            {headerLabel}
          </span>
        </div>
        <span style={{
          color: COLORS.background,
          fontSize: '14px',
          transition: 'transform 0.3s ease',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          {'\u25BC'}
        </span>
      </div>

      {/* Expandable Content Area with smooth slide animation */}
      <div
        id="music-panel-content"
        style={{
          maxHeight: expanded ? `${contentHeight + 40}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
          background: 'rgba(26, 26, 46, 0.98)',
          backdropFilter: 'blur(10px)',
          borderRadius: expanded ? '0 0 16px 16px' : '0 0 16px 16px',
          border: expanded ? `2px solid ${COLORS.pink}40` : '2px solid transparent',
          borderTop: 'none',
        }}
      >
        <div ref={contentRef} style={{ padding: expanded ? '12px' : '0 12px' }}>
          {/* Audio Master Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAudioEnabled(!audioEnabled);
            }}
            aria-label={audioEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
            aria-pressed={audioEnabled}
            style={{
              width: '100%',
              background: audioEnabled
                ? `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.pink}cc)`
                : 'transparent',
              border: `2px solid ${COLORS.pink}`,
              color: audioEnabled ? COLORS.background : COLORS.pink,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginBottom: '10px',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
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

          {/* Track Cards */}
          <div
            role="radiogroup"
            aria-label="Select ambient audio preset"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            {[1, 2, 3].map((presetNum) => {
              const track = TRACK_DETAILS[presetNum];
              const isActive = audioEnabled && audioPreset === presetNum;

              return (
                <div
                  key={presetNum}
                  id={`music-track-${presetNum}`}
                  role="radio"
                  tabIndex={0}
                  aria-checked={isActive}
                  aria-label={`${track.name} - ${track.description}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrackSelect(presetNum);
                  }}
                  onKeyDown={(e) => handleTrackKeyDown(e, presetNum)}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${track.color}20, ${track.color}10)`
                      : `rgba(255, 255, 255, 0.03)`,
                    border: `1px solid ${isActive ? track.color : `${COLORS.pink}30`}`,
                    borderRadius: '12px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive
                      ? `0 0 10px ${track.color}30, inset 0 0 10px ${track.color}10`
                      : 'none',
                    animation: isActive ? 'musicPulse 3s ease-in-out infinite' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = `${track.color}10`;
                      e.currentTarget.style.borderColor = `${track.color}60`;
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = `${COLORS.pink}30`;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {/* Track Name */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}>
                    <span style={{
                      color: isActive ? track.color : COLORS.text,
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                    }}>
                      {track.name}
                    </span>
                    {isActive && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: track.color,
                        boxShadow: `0 0 6px ${track.color}`,
                        animation: 'musicDot 1.5s ease-in-out infinite',
                      }} />
                    )}
                  </div>

                  {/* Description */}
                  <p style={{
                    color: isActive ? `${COLORS.text}cc` : `${COLORS.text}80`,
                    fontSize: '9px',
                    lineHeight: '1.4',
                    margin: '0 0 4px 0',
                    fontFamily: 'monospace',
                  }}>
                    {track.description}
                  </p>

                  {/* Frequency Badge */}
                  <span style={{
                    display: 'inline-block',
                    background: isActive ? `${track.color}25` : `${COLORS.pink}15`,
                    border: `1px solid ${isActive ? `${track.color}50` : `${COLORS.pink}25`}`,
                    color: isActive ? track.color : `${COLORS.text}60`,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '8px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    fontFamily: 'monospace',
                  }}>
                    {track.frequency}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tour Volume Controls */}
          <div style={{
            paddingTop: '10px',
            borderTop: `1px solid ${COLORS.pink}30`,
          }}>
            <h3 style={{
              color: COLORS.pink,
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              margin: '0 0 8px 0',
              fontFamily: 'monospace',
              opacity: 0.8,
              textTransform: 'uppercase',
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
                  htmlFor="music-vol-slider"
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
                id="music-vol-slider"
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
                  background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourMusicVolume}%, ${COLORS.panel} ${tourMusicVolume}%, ${COLORS.panel} 100%)`,
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
                  htmlFor="narration-vol-slider"
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
                id="narration-vol-slider"
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
                  background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourNarrationVolume}%, ${COLORS.panel} ${tourNarrationVolume}%, ${COLORS.panel} 100%)`,
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Tour narration volume"
              />
            </div>

            {/* Mute Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
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
                textTransform: 'uppercase',
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
        </div>
      </div>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes musicPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 107, 157, 0.15); }
          50% { box-shadow: 0 0 16px rgba(255, 107, 157, 0.3); }
        }
        @keyframes musicDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}

export default MusicSelectionPanel;
