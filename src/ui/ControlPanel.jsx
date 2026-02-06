/**
 * ControlPanel Component
 * Left-side control panel with navigation and feature toggles
 */
import React from 'react';
import { COLORS } from '../constants';
import AudioControls from './AudioControls';

/**
 * Control Panel Component
 * @param {Object} props - Component props
 */
export function ControlPanel({
  // Panel state
  isOpen,
  onToggle,
  // Tour
  onStartTour,
  // Timeline
  timelineVisible,
  onToggleTimeline,
  // Relationships
  showRelationships,
  onToggleRelationships,
  // Media Browser
  onOpenMediaBrowser,
  // Diagram Gallery
  onOpenDiagramGallery,
  // About
  onOpenAbout,
  // Audio props
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
    <aside
      role="complementary"
      aria-labelledby="control-panel-title"
      aria-label="Navigation controls and interactive features"
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '280px',
        zIndex: 10,
      }}
    >
      {/* Header Bar with Toggle */}
      <h1
        id="control-panel-title"
        onClick={onToggle}
        style={{
          background: COLORS.primary,
          padding: '12px 20px',
          borderRadius: isOpen ? '20px 20px 0 0' : '20px',
          fontSize: '16px',
          fontWeight: '700',
          color: '#000000',
          letterSpacing: '3px',
          textAlign: 'center',
          fontFamily: 'monospace',
          margin: 0,
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '20px' }}>{isOpen ? '\u25BC' : '\u25B6'}</span>
        CONTROLS
      </h1>

      {/* Main Panel */}
      {isOpen && (
        <div style={{
          background: '#000000',
          border: `4px solid ${COLORS.primary}`,
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '20px',
        }}>
          {/* Tour Launcher Button */}
          <button
            onClick={onStartTour}
            aria-label="Start guided tour of Strategic Foresight"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`,
              border: `2px solid ${COLORS.secondary}`,
              color: COLORS.secondary,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '15px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}40 0%, ${COLORS.highlight}40 100%)`;
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`;
              e.target.style.transform = 'scale(1)';
            }}
          >
            GUIDED TOUR
          </button>

          {/* Status Bars */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: COLORS.highlight,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              DRAG TO ORBIT
            </div>
            <div style={{
              background: COLORS.accent,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              SCROLL TO ZOOM
            </div>
            <div style={{
              background: COLORS.pink,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              CLICK TO EXPAND
            </div>
            <div style={{
              background: COLORS.success,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}>
              CLICK ORBS FOR MEDIA
            </div>
          </div>

          {/* Media Browser Button */}
          <button
            onClick={onOpenMediaBrowser}
            aria-label="Browse all media resources in the knowledge base"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.accent}20 100%)`,
              border: `2px solid ${COLORS.accent}`,
              color: COLORS.accent,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '15px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}40 0%, ${COLORS.accent}40 100%)`;
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.accent}20 100%)`;
              e.target.style.transform = 'scale(1)';
            }}
          >
            BROWSE MEDIA
          </button>

          {/* Diagram Gallery Button */}
          <button
            onClick={onOpenDiagramGallery}
            aria-label="View all framework diagrams in a gallery"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`,
              border: `2px solid ${COLORS.primary}`,
              color: COLORS.primary,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '15px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}40 0%, ${COLORS.secondary}40 100%)`;
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`;
              e.target.style.transform = 'scale(1)';
            }}
          >
            DIAGRAM GALLERY
          </button>

          {/* Timeline Toggle Button */}
          <button
            onClick={onToggleTimeline}
            aria-label={timelineVisible ? 'Close historical timeline view' : 'Open historical timeline view of foresight methodologies'}
            aria-pressed={timelineVisible}
            aria-controls="timeline-panel"
            style={{
              width: '100%',
              background: timelineVisible ? COLORS.accent : 'transparent',
              border: `3px solid ${COLORS.accent}`,
              color: timelineVisible ? '#000000' : COLORS.accent,
              padding: '12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginBottom: '15px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!timelineVisible) {
                e.target.style.background = `${COLORS.accent}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (!timelineVisible) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {timelineVisible ? '\u25C0 CLOSE TIMELINE' : 'TIMELINE VIEW \u25B6'}
          </button>

          {/* Relationships Toggle */}
          <button
            onClick={onToggleRelationships}
            aria-label={showRelationships ? 'Hide cross-pillar methodology relationships' : 'Show cross-pillar methodology relationships'}
            aria-pressed={showRelationships}
            aria-describedby="relationships-description"
            style={{
              width: '100%',
              background: showRelationships ? COLORS.success : 'transparent',
              border: `3px solid ${COLORS.success}`,
              color: showRelationships ? '#000000' : COLORS.success,
              padding: '12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginBottom: '15px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!showRelationships) {
                e.target.style.background = `${COLORS.success}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (!showRelationships) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {showRelationships ? '\u2713 RELATIONSHIPS ON' : '\u25CB SHOW RELATIONSHIPS'}
          </button>
          <div
            id="relationships-description"
            style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Display connections between methodologies across different strategic foresight pillars
          </div>

          {/* Audio Controls */}
          <AudioControls
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            audioPreset={audioPreset}
            setAudioPreset={setAudioPreset}
            tourMusicVolume={tourMusicVolume}
            setTourMusicVolume={setTourMusicVolume}
            tourNarrationVolume={tourNarrationVolume}
            setTourNarrationVolume={setTourNarrationVolume}
            tourAudioMuted={tourAudioMuted}
            setTourAudioMuted={setTourAudioMuted}
          />

          {/* System Status Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            background: 'rgba(92, 136, 218, 0.1)',
            borderRadius: '10px',
            border: `1px solid ${COLORS.primary}`,
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: COLORS.success,
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              color: COLORS.success,
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}>
              SYSTEM ONLINE
            </span>
          </div>

          {/* About Button */}
          <button
            onClick={onOpenAbout}
            aria-label="About this application"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.accent}15 100%)`,
              border: `1px solid ${COLORS.primary}60`,
              color: COLORS.primary,
              padding: '8px',
              borderRadius: '8px',
              fontSize: '9px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              marginTop: '15px',
              opacity: 0.6,
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}30 0%, ${COLORS.accent}30 100%)`;
              e.target.style.borderColor = COLORS.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.6';
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.accent}15 100%)`;
              e.target.style.borderColor = `${COLORS.primary}60`;
            }}
          >
            ABOUT v0.1
          </button>
        </div>
      )}
    </aside>
  );
}

export default ControlPanel;
