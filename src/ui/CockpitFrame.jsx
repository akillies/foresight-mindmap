/**
 * CockpitFrame — LCARS Shuttlecraft Cockpit Console
 *
 * TNG-inspired cockpit frame with physical depth: perspective-
 * transformed side bezels, recessed scanner/switch panels,
 * backlit LCARS corner elbows, and viewport vignette.
 *
 * Data flow (via useHUD context):
 *   Top bezel:    planet name, node count, FPS, GPU badge
 *   Left bezel:   5 nav switches in recessed switch panel
 *   Right bezel:  scanner readouts in recessed display
 *   Bottom bezel: instrument strip with system status
 */
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants';
import { useHUD } from './HUDContext';
import './CockpitFrame.css';

const BIOME_LABELS = {
  ocean: 'OCEANIC',
  desert: 'ARID',
  crystal: 'CRYSTALLINE',
  volcanic: 'VOLCANIC',
  garden: 'VERDANT',
  gasGiant: 'GAS GIANT',
};

const NAV_SWITCHES = [
  { key: 'tour', label: 'TOUR', color: COLORS.secondary, aria: 'Start guided tour' },
  { key: 'timeline', label: 'TIMELINE', color: COLORS.accent, aria: 'Toggle timeline view' },
  { key: 'links', label: 'LINKS', color: COLORS.success, aria: 'Toggle relationships' },
  { key: 'media', label: 'MEDIA', color: COLORS.info, aria: 'Open media browser' },
  { key: 'diagrams', label: 'DIAGRAMS', color: COLORS.highlight, aria: 'Open diagram gallery' },
];

/* ── Sub-components ────────────────────────────────────────────── */

function BezelSwitch({ label, isActive, onClick, color, ariaLabel }) {
  return (
    <button
      className="bezel-switch"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      style={isActive ? {
        borderLeftColor: color,
        background: `${color}15`,
        color: color,
        boxShadow: `inset 3px 0 12px ${color}12`,
      } : undefined}
    >
      <span
        className="bezel-switch-icon"
        style={isActive ? { opacity: 1, background: color } : undefined}
      />
      <span className="bezel-switch-label">{label}</span>
      {isActive && (
        <span
          className="bezel-switch-pip"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        />
      )}
    </button>
  );
}

function DataReadout({ label, value, color }) {
  return (
    <div className="cockpit-readout">
      <div className="cockpit-readout-label">{label}</div>
      <div className="cockpit-readout-value" style={color ? { color } : undefined}>
        {value}
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────── */

export function CockpitFrame({
  gpuInfo,
  onStartTour,
  timelineVisible,
  onToggleTimeline,
  showRelationships,
  onToggleRelationships,
  onOpenMediaBrowser,
  onOpenDiagramGallery,
}) {
  const {
    accentColor,
    planetName,
    biome,
    childrenCount,
    mediaCount,
    description,
    nodeCount,
    fps,
    gpuBackend,
    isInTransit,
    transitTarget,
  } = useHUD();

  // FPS smoothing — update display at 2 Hz to avoid jitter
  const [displayFps, setDisplayFps] = useState(60);
  const fpsRef = useRef(fps);
  useEffect(() => {
    fpsRef.current = fps;
    const interval = setInterval(() => setDisplayFps(Math.round(fpsRef.current)), 500);
    return () => clearInterval(interval);
  }, [fps]);

  const backend = gpuInfo?.backend || gpuBackend || 'WebGL';
  const isWebGPU = backend.toLowerCase().includes('webgpu');
  const isCenterStar = !planetName || planetName.toUpperCase() === 'STRATEGIC FORESIGHT';

  const switchHandlers = {
    tour: onStartTour,
    timeline: onToggleTimeline,
    links: onToggleRelationships,
    media: onOpenMediaBrowser,
    diagrams: onOpenDiagramGallery,
  };

  const switchActive = {
    tour: false,
    timeline: timelineVisible,
    links: showRelationships,
    media: false,
    diagrams: false,
  };

  return (
    <div className="cockpit-frame" style={{ '--cockpit-accent': accentColor }}>

      {/* ── Corner Elbows ── */}
      <div className="cockpit-elbow cockpit-elbow-tl" />
      <div className="cockpit-elbow cockpit-elbow-tr" />
      <div className="cockpit-elbow cockpit-elbow-bl" />
      <div className="cockpit-elbow cockpit-elbow-br" />

      {/* ── Viewport Windshield Edge (vignette) ── */}
      <div className="cockpit-viewport-edge" />

      {/* ── Top Bezel: Console Status Strip ── */}
      <div className="cockpit-bezel cockpit-top">
        <div className="cockpit-pill" style={{ background: '#FFCC66' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="cockpit-status-dot" />
          <span style={{ fontWeight: 700, textTransform: 'uppercase', color: accentColor }}>
            {planetName}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: COLORS.textMuted }}>
          <span>
            <span style={{ marginRight: 4 }}>NODES</span>
            <span style={{ color: COLORS.text, fontWeight: 700 }}>{nodeCount}</span>
          </span>
          <span className="instrument-divider" />
          <span>
            <span style={{ marginRight: 4 }}>FPS</span>
            <span style={{
              color: displayFps >= 50 ? COLORS.success : displayFps >= 30 ? COLORS.warning : COLORS.pink,
              fontWeight: 700,
            }}>
              {displayFps}
            </span>
          </span>
        </div>

        <div
          className="cockpit-gpu-badge"
          style={{
            background: isWebGPU ? `${COLORS.successBright}20` : `${COLORS.secondary}20`,
            color: isWebGPU ? COLORS.successBright : COLORS.secondary,
            border: `1px solid ${isWebGPU ? COLORS.successBright : COLORS.secondary}40`,
          }}
        >
          {backend.toUpperCase()}
        </div>

        <div className="cockpit-pill" style={{ background: '#5C88DA' }} />
      </div>

      {/* ── Left Bezel: Navigation Console ── */}
      <nav
        className="cockpit-bezel cockpit-left"
        role="navigation"
        aria-label="Cockpit navigation"
      >
        <div className="console-panel-header">
          <span className="console-panel-pill" style={{ background: '#FFCC66' }} />
          <span>NAV CTRL</span>
        </div>

        <div className="console-switch-panel">
          {NAV_SWITCHES.map((sw, i) => (
            <React.Fragment key={sw.key}>
              {i === 3 && <div className="cockpit-separator" />}
              <BezelSwitch
                label={sw.label}
                isActive={switchActive[sw.key]}
                onClick={switchHandlers[sw.key]}
                color={sw.color}
                ariaLabel={sw.aria}
              />
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* ── Right Bezel: Scanner Console ── */}
      <aside
        className="cockpit-bezel cockpit-right"
        role="complementary"
        aria-label="Scanner readout"
      >
        <div className="console-panel-header">
          <span className="console-panel-pill" style={{ background: '#5C88DA' }} />
          <span>{isCenterStar ? 'SCANNER' : 'SCAN TARGET'}</span>
        </div>

        <div
          className="scanner-display"
          style={!isCenterStar ? {
            borderColor: `${accentColor}25`,
            boxShadow: `inset 2px 2px 8px rgba(0,0,0,0.6), inset -1px -1px 4px rgba(255,255,255,0.02), 0 0 10px ${accentColor}15`,
          } : undefined}
        >
          {isCenterStar ? (
            <div style={{
              color: '#556677',
              fontSize: 10,
              letterSpacing: '0.1em',
              textAlign: 'center',
              padding: '20px 0',
            }}>
              AWAITING TARGET
            </div>
          ) : (
            <>
              <DataReadout label="DESIGNATION" value={planetName} color={accentColor} />
              {biome && (
                <DataReadout
                  label="BIOME CLASS"
                  value={BIOME_LABELS[biome] || biome.toUpperCase()}
                  color={accentColor}
                />
              )}
              <DataReadout label="SUB-NODES" value={String(childrenCount).padStart(3, '0')} />
              <DataReadout label="MEDIA OBJECTS" value={String(mediaCount).padStart(3, '0')} />
              {description && (
                <div className="cockpit-readout">
                  <div className="cockpit-readout-label">SUMMARY</div>
                  <div className="cockpit-summary">{description}</div>
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      {/* ── Bottom Bezel: Instrument Strip ── */}
      <div className="cockpit-bezel cockpit-bottom">
        <div className="cockpit-pill" style={{ background: '#CC99CC' }} />

        <div className="instrument-cluster">
          {isInTransit ? (
            <span style={{ color: accentColor }}>
              IN TRANSIT {'\u25B8'} {transitTarget?.toUpperCase() || '...'}
            </span>
          ) : (
            <>
              <span>SYSTEMS ONLINE</span>
              <span className="instrument-divider" />
              <span style={{ color: COLORS.success }}>{'\u25C8'}</span>
              <span className="instrument-divider" />
              <span>SENSORS ACTIVE</span>
            </>
          )}
        </div>

        <div className="cockpit-pill" style={{ background: '#FF9966' }} />
      </div>

      {/* ── Scanline Overlay ── */}
      <div className="cockpit-scanlines" />
    </div>
  );
}

export default CockpitFrame;
