/**
 * NavigationHUD Component
 * Left-side geometric icon strip replacing pill buttons
 * Tour/Timeline toggles as HUD switches
 * Vertical layout, angular styling
 */
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { useHUD } from './HUDContext';
import './HUDStyles.css';

function HUDSwitch({ label, shortLabel, isActive, onClick, color, ariaLabel }) {
  const [hovered, setHovered] = useState(false);
  const activeColor = color || COLORS.primary;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel || label}
      aria-pressed={isActive}
      style={{
        width: '100%',
        height: '36px',
        background: isActive
          ? `${activeColor}25`
          : hovered
            ? `${COLORS.text}08`
            : 'transparent',
        border: 'none',
        borderLeft: isActive
          ? `3px solid ${activeColor}`
          : '3px solid transparent',
        color: isActive ? activeColor : hovered ? COLORS.text : COLORS.textMuted,
        fontFamily: '"Courier New", Consolas, monospace',
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 12px',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      {/* Geometric icon indicator */}
      <span style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        flexShrink: 0,
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        background: isActive ? activeColor : (hovered ? COLORS.textMuted : `${COLORS.textMuted}60`),
        transition: 'all 0.15s ease',
      }} />
      <span>{shortLabel || label}</span>

      {/* Active glow pip */}
      {isActive && (
        <span style={{
          position: 'absolute',
          right: '10px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: activeColor,
          boxShadow: `0 0 6px ${activeColor}`,
          animation: 'pulse 2s infinite',
        }} />
      )}
    </button>
  );
}

export function NavigationHUD({
  onStartTour,
  timelineVisible,
  onToggleTimeline,
  showRelationships,
  onToggleRelationships,
  onOpenMediaBrowser,
  onOpenDiagramGallery,
}) {
  const { accentColor } = useHUD();

  return (
    <nav
      role="navigation"
      aria-label="Cockpit navigation controls"
      style={{
        position: 'fixed',
        top: '48px',
        left: '16px',
        width: '160px',
        zIndex: 900,
        background: 'rgba(10, 12, 28, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${accentColor}30`,
        fontFamily: '"Courier New", Consolas, monospace',
        clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)',
        animation: 'hud-slide-left 0.5s ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Internal scan-line overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(100,200,255,0.015) 3px, rgba(100,200,255,0.015) 4px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Header */}
      <div style={{
        padding: '10px 12px 6px 20px',
        borderBottom: `1px solid ${accentColor}20`,
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '0.18em',
          color: COLORS.textMuted,
          textTransform: 'uppercase',
        }}>
          NAVIGATION
        </div>
      </div>

      {/* Switch list */}
      <div style={{ position: 'relative', zIndex: 2, padding: '4px 0' }}>
        <HUDSwitch
          label="Guided Tour"
          shortLabel="TOUR"
          isActive={false}
          onClick={onStartTour}
          color={COLORS.secondary}
          ariaLabel="Start guided tour"
        />

        <HUDSwitch
          label="Timeline"
          shortLabel="TIMELINE"
          isActive={timelineVisible}
          onClick={onToggleTimeline}
          color={COLORS.accent}
          ariaLabel={timelineVisible ? 'Close timeline view' : 'Open timeline view'}
        />

        <HUDSwitch
          label="Relationships"
          shortLabel="LINKS"
          isActive={showRelationships}
          onClick={onToggleRelationships}
          color={COLORS.success}
          ariaLabel={showRelationships ? 'Hide relationships' : 'Show relationships'}
        />

        {/* Separator */}
        <div style={{
          height: '1px',
          margin: '4px 12px',
          background: `${COLORS.textMuted}20`,
        }} />

        <HUDSwitch
          label="Media Browser"
          shortLabel="MEDIA"
          isActive={false}
          onClick={onOpenMediaBrowser}
          color={COLORS.info}
          ariaLabel="Open media browser"
        />

        <HUDSwitch
          label="Diagrams"
          shortLabel="DIAGRAMS"
          isActive={false}
          onClick={onOpenDiagramGallery}
          color={COLORS.highlight}
          ariaLabel="Open diagram gallery"
        />
      </div>

      {/* Bottom accent */}
      <div style={{
        height: '2px',
        background: `linear-gradient(90deg, ${accentColor}40, transparent)`,
      }} />
    </nav>
  );
}

export default NavigationHUD;
