/**
 * CockpitFrame — Descent-style Angular Cockpit
 *
 * Glass canopy with thin metallic struts at corners,
 * holographic status bar (top), scanner overlay (right),
 * lower console panel (bottom). Mostly open viewport.
 *
 * Data flow (via useHUD context):
 *   Top bar:      planet name, node count, FPS, GPU badge
 *   Right panel:  scanner readouts (holographic overlay, fades in/out)
 *   Bottom panel: nav switches, system status, transit info
 */
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '@shared/constants';
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

/* -- Sub-components -------------------------------------------------- */

function ConsoleSwitch({ label, isActive, onClick, color, ariaLabel }) {
  return (
    <button
      className="console-switch"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      style={isActive ? {
        borderBottomColor: color,
        color: color,
      } : undefined}
    >
      <span
        className="console-switch-icon"
        style={isActive ? { opacity: 1, background: color } : undefined}
      />
      <span className="console-switch-label">{label}</span>
      {isActive && (
        <span
          className="console-switch-pip"
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

/* -- Main Component -------------------------------------------------- */

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

  // FPS smoothing -- update display at 2 Hz to avoid jitter
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

      {/* -- Canopy Struts (angular corner lines) -- */}
      <div className="cockpit-struts">
        <div className="cockpit-strut-tr" />
        <div className="cockpit-strut-bl" />
        <div className="cockpit-strut-line-tl" />
        <div className="cockpit-strut-line-tr" />
      </div>

      {/* -- Viewport Vignette -- */}
      <div className="cockpit-viewport-edge" />

      {/* -- Top Holographic Status Bar -- */}
      <div className="cockpit-status-bar">
        <div className="cockpit-status-left">
          <div className="cockpit-status-dot" />
          <span style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            color: accentColor,
            textShadow: `0 0 12px ${accentColor}40`,
          }}>
            {planetName}
          </span>
        </div>

        <div className="cockpit-status-right" style={{ color: COLORS.textMuted }}>
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
          <span className="instrument-divider" />
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
        </div>
      </div>

      {/* -- Scanner Panel (holographic right overlay) -- */}
      <aside
        className={`cockpit-scanner-panel ${isCenterStar ? 'scanner-hidden' : 'scanner-visible'}`}
        role="complementary"
        aria-label="Scanner readout"
      >
        <div className="scanner-panel-header">
          <span className="scanner-pill" style={{ background: COLORS.primary }} />
          <span style={{ color: COLORS.textMuted }}>
            {isCenterStar ? 'SCANNER' : 'SCAN TARGET'}
          </span>
        </div>

        <div className="scanner-display">
          {!isCenterStar && (
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

      {/* -- Lower Console Panel -- */}
      <div className="cockpit-console">
        {/* Nav switches (left) */}
        <nav
          className="console-nav-switches"
          role="navigation"
          aria-label="Cockpit navigation"
        >
          {NAV_SWITCHES.map((sw, i) => (
            <React.Fragment key={sw.key}>
              {i === 3 && <div className="cockpit-separator" />}
              <ConsoleSwitch
                label={sw.label}
                isActive={switchActive[sw.key]}
                onClick={switchHandlers[sw.key]}
                color={sw.color}
                ariaLabel={sw.aria}
              />
            </React.Fragment>
          ))}
        </nav>

        {/* Center instrument cluster */}
        <div className="console-instrument-cluster">
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

        {/* Right: transit status or spacer */}
        <div className="console-transit">
          {isInTransit && (
            <span style={{ color: COLORS.highlight }}>WARP</span>
          )}
        </div>
      </div>

      {/* -- Scanline Overlay -- */}
      <div className="cockpit-scanlines" />
    </div>
  );
}

export default CockpitFrame;
