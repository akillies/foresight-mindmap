/**
 * TargetingReticle Component
 * Thin geometric reticle overlay positioned at hovered node screen coordinates
 * Lock-on scan animation with rotating corners and converging brackets
 * Pure CSS animation
 */
import React, { useState, useEffect } from 'react';
import { COLORS } from '@shared/constants';
import { useHUD } from './HUDContext';
import './HUDStyles.css';

export function TargetingReticle({ screenX, screenY, label, isLocked }) {
  const { accentColor } = useHUD();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (screenX != null && screenY != null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [screenX, screenY]);

  if (!visible) return null;

  const color = accentColor || COLORS.primary;
  const size = 56;
  const half = size / 2;
  const cornerLen = 14;
  const thickness = 1.5;

  // Corner bracket style generator
  const corner = (top, left, rotDeg) => ({
    position: 'absolute',
    top: top ? 0 : 'auto',
    bottom: top ? 'auto' : 0,
    left: left ? 0 : 'auto',
    right: left ? 'auto' : 0,
    width: `${cornerLen}px`,
    height: `${cornerLen}px`,
    borderTop: top ? `${thickness}px solid ${color}` : 'none',
    borderBottom: top ? 'none' : `${thickness}px solid ${color}`,
    borderLeft: left ? `${thickness}px solid ${color}` : 'none',
    borderRight: left ? 'none' : `${thickness}px solid ${color}`,
  });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: `${screenX}px`,
        top: `${screenY}px`,
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none',
        zIndex: 950,
      }}
    >
      {/* Outer rotating frame */}
      <div style={{
        position: 'absolute',
        inset: '-4px',
        border: `1px solid ${color}20`,
        animation: 'hud-reticle-rotate 8s linear infinite',
      }}>
        {/* Tick marks on rotator */}
        <div style={{
          position: 'absolute',
          top: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '1px',
          background: color,
          opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '1px',
          background: color,
          opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute',
          left: '-3px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1px',
          height: '6px',
          background: color,
          opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute',
          right: '-3px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1px',
          height: '6px',
          background: color,
          opacity: 0.5,
        }} />
      </div>

      {/* Corner brackets */}
      <div style={corner(true, true)} />
      <div style={corner(true, false)} />
      <div style={corner(false, true)} />
      <div style={corner(false, false)} />

      {/* Center crosshair - horizontal */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '25%',
        right: '25%',
        height: `${thickness}px`,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        transform: 'translateY(-50%)',
        animation: 'hud-reticle-pulse 1.5s ease-in-out infinite',
      }} />

      {/* Center crosshair - vertical */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '25%',
        bottom: '25%',
        width: `${thickness}px`,
        background: `linear-gradient(180deg, transparent, ${color}60, transparent)`,
        transform: 'translateX(-50%)',
        animation: 'hud-reticle-pulse 1.5s ease-in-out infinite',
      }} />

      {/* Center dot */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 4px ${color}`,
      }} />

      {/* Lock-on label */}
      {label && (
        <div style={{
          position: 'absolute',
          top: `${size + 6}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: '9px',
          fontFamily: '"Exo 2", "Courier New", Consolas, monospace',
          fontWeight: '700',
          letterSpacing: '0.12em',
          color: color,
          textTransform: 'uppercase',
          textShadow: `0 0 8px ${color}60`,
        }}>
          {isLocked ? '\u25C6 ' : ''}{label}
        </div>
      )}
    </div>
  );
}

export default TargetingReticle;
