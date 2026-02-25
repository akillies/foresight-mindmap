/**
 * CockpitFrame — Elite Dangerous + TNG Shuttlecraft Cockpit
 *
 * Heavy canopy frame with warm amber glow, LCARS pill indicators,
 * collapsible scanner, targeting reticle brackets, SFX triggers.
 *
 * Data flow (via useHUD context):
 *   Top bar:      planet name, node count, FPS, GPU badge
 *   Right panel:  scanner readouts (holographic overlay, fades in/out)
 *   Bottom panel: nav switches, instrument cluster, transit info, mute
 *   Reticle:      four L-brackets tracking selected planet via 3D→2D projection
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COLORS } from '@shared/constants';
import { AMBER_ACCENT } from '@planetary/constants';
import { useHUD } from './HUDContext';
import { sfx } from '@shared/audio/SFXManager';
import './CockpitFrame.css';

const BIOME_LABELS = {
  ocean: 'OCEANIC',
  desert: 'ARID',
  crystal: 'CRYSTALLINE',
  volcanic: 'VOLCANIC',
  garden: 'VERDANT',
  gasGiant: 'GAS GIANT',
};

const BIOME_SWATCH_COLORS = {
  ocean: '#4488CC',
  desert: '#CCAA66',
  crystal: '#AACCFF',
  volcanic: '#FF6633',
  garden: '#66AA44',
  gasGiant: '#DD88BB',
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
  const handleClick = useCallback(() => {
    sfx.consoleClick();
    onClick();
  }, [onClick]);

  return (
    <button
      className="console-switch"
      onClick={handleClick}
      onMouseEnter={() => sfx.hover()}
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

/* -- Targeting Reticle ------------------------------------------------ */

function TargetingReticle({ targetScreenPos, isLocked }) {
  if (!targetScreenPos) return null;

  const bracketClass = isLocked ? 'active converging' : '';

  return (
    <div
      className="cockpit-reticle"
      style={{ left: targetScreenPos.x, top: targetScreenPos.y }}
    >
      <div className={`reticle-bracket reticle-tl ${bracketClass}`} />
      <div className={`reticle-bracket reticle-tr ${bracketClass}`} />
      <div className={`reticle-bracket reticle-bl ${bracketClass}`} />
      <div className={`reticle-bracket reticle-br ${bracketClass}`} />
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
    targetScreenPos,
  } = useHUD();

  // Scanner collapse state
  const [scannerCollapsed, setScannerCollapsed] = useState(false);

  // Mute state
  const [muted, setMuted] = useState(false);

  // Scan animation trigger — on planet change
  const [scanActive, setScanActive] = useState(false);
  const prevPlanetRef = useRef(planetName);

  useEffect(() => {
    if (planetName !== prevPlanetRef.current && planetName) {
      setScanActive(true);
      prevPlanetRef.current = planetName;
      const timer = setTimeout(() => setScanActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [planetName]);

  // FPS smoothing -- update display at 2 Hz
  const [displayFps, setDisplayFps] = useState(60);
  const fpsRef = useRef(fps);
  useEffect(() => {
    fpsRef.current = fps;
    const interval = setInterval(() => setDisplayFps(Math.round(fpsRef.current)), 500);
    return () => clearInterval(interval);
  }, [fps]);

  // Mouse parallax tracking
  const frameRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!frameRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      frameRef.current.style.setProperty('--mouse-x', x.toFixed(3));
      frameRef.current.style.setProperty('--mouse-y', y.toFixed(3));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const handleMuteToggle = useCallback(() => {
    sfx.toggleMute();
    setMuted(sfx.isMuted());
  }, []);

  const handleScannerToggle = useCallback(() => {
    sfx.scannerToggle();
    setScannerCollapsed(!scannerCollapsed);
  }, [scannerCollapsed]);

  return (
    <div className="cockpit-frame" ref={frameRef}>

      {/* -- Canopy Struts (heavy angular frame with amber glow) -- */}
      <div className="cockpit-struts">
        <div className="cockpit-strut-tr" />
        <div className="cockpit-strut-bl" />
        <div className="cockpit-strut-line-tl" />
        <div className="cockpit-strut-line-tr" />
        <div className="cockpit-strut-cross-top" />
        <div className="cockpit-strut-cross-bottom" />
        <div className="cockpit-strut-angle-left" />
        <div className="cockpit-strut-angle-right" />
      </div>

      {/* -- Subtle amber canopy reflection -- */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 958,
        background: 'linear-gradient(180deg, rgba(240, 160, 48, 0.02) 0%, transparent 30%, transparent 80%, rgba(240, 160, 48, 0.01) 100%)',
      }} />

      {/* -- Viewport Vignette -- */}
      <div className="cockpit-viewport-edge" />

      {/* -- Targeting Reticle -- */}
      <TargetingReticle
        targetScreenPos={!isCenterStar ? targetScreenPos : null}
        isLocked={!isCenterStar && !isInTransit}
      />

      {/* -- Top Holographic Status Bar -- */}
      <div className="cockpit-status-bar">
        <div className="cockpit-status-left">
          <div className="cockpit-status-dot" />
          <span style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            color: AMBER_ACCENT,
            textShadow: '0 0 12px rgba(240, 160, 48, 0.4)',
          }}>
            {planetName}
          </span>
        </div>

        <div className="cockpit-status-right" style={{ color: COLORS.textMuted }}>
          <span>
            <span style={{ marginRight: 4, color: 'rgba(240, 160, 48, 0.5)' }}>NODES</span>
            <span style={{ color: COLORS.text, fontWeight: 700 }}>{nodeCount}</span>
          </span>
          <span className="instrument-divider" />
          <span>
            <span style={{ marginRight: 4, color: 'rgba(240, 160, 48, 0.5)' }}>FPS</span>
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

      {/* -- Scanner Panel (collapsible right overlay) -- */}
      <aside
        className={`cockpit-scanner-panel ${
          isCenterStar && !scannerCollapsed ? 'scanner-hidden' :
          scannerCollapsed ? 'scanner-hidden' :
          'scanner-visible'
        }`}
        role="complementary"
        aria-label="Scanner readout"
      >
        <button
          className="scanner-collapse-tab"
          onClick={handleScannerToggle}
          aria-label={scannerCollapsed ? 'Expand scanner' : 'Collapse scanner'}
        >
          {scannerCollapsed ? '\u25C0' : '\u25B6'}
        </button>

        <div className="scanner-panel-header">
          <span className="scanner-pill" />
          <span>{isCenterStar ? 'SCANNER' : 'SCAN TARGET'}</span>
        </div>

        <div className={`scanner-display ${scanActive ? 'scan-active' : ''}`}>
          {!isCenterStar && (
            <>
              <DataReadout label="DESIGNATION" value={planetName} color={AMBER_ACCENT} />
              {biome && (
                <DataReadout
                  label="BIOME CLASS"
                  value={
                    <>
                      <span
                        className="scanner-biome-swatch"
                        style={{ color: BIOME_SWATCH_COLORS[biome], background: BIOME_SWATCH_COLORS[biome] }}
                      />
                      {BIOME_LABELS[biome] || biome.toUpperCase()}
                    </>
                  }
                  color={AMBER_ACCENT}
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
            <span style={{ color: AMBER_ACCENT }}>
              IN TRANSIT {'\u25B8'} {transitTarget?.toUpperCase() || '...'}
            </span>
          ) : (
            <>
              <span>SYSTEMS ONLINE</span>
              <span className="instrument-divider" />
              <span style={{ color: AMBER_ACCENT }}>{'\u25C8'}</span>
              <span className="instrument-divider" />
              <span>SENSORS ACTIVE</span>
            </>
          )}
        </div>

        {/* Right: transit status + mute */}
        <div className="console-transit">
          {isInTransit && (
            <span style={{ color: COLORS.highlight }}>WARP</span>
          )}
          <button
            className={`cockpit-mute-btn ${muted ? 'muted' : ''}`}
            onClick={handleMuteToggle}
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {muted ? 'SFX OFF' : 'SFX ON'}
          </button>
        </div>
      </div>

      {/* -- Scanline Overlay -- */}
      <div className="cockpit-scanlines" />
    </div>
  );
}

export default CockpitFrame;
