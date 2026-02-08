/**
 * TransitOverlay Component
 * Warp-streak flight transition effect
 * Pure CSS warp lines radiating from center
 * Destination name + ETA countdown
 * Only visible during isInTransit from HUDContext
 */
import React, { useState, useEffect, useMemo } from 'react';
import { COLORS } from '@shared/constants';
import { useHUD } from './HUDContext';
import './HUDStyles.css';

function WarpStreak({ angle, delay, length, color }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${length}px`,
      height: '1px',
      transformOrigin: '0 50%',
      transform: `rotate(${angle}deg)`,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, ${color}00, ${color}90, ${color}00)`,
        animation: `hud-warp-streak 0.8s ${delay}s ease-out infinite`,
        transformOrigin: 'center center',
      }} />
    </div>
  );
}

export function TransitOverlay() {
  const { isInTransit, transitTarget, transitProgress, accentColor } = useHUD();
  const [eta, setEta] = useState(3);

  // Countdown timer during transit
  useEffect(() => {
    if (!isInTransit) {
      setEta(3);
      return;
    }
    const remaining = Math.max(0, Math.ceil(3 * (1 - transitProgress)));
    setEta(remaining);
  }, [isInTransit, transitProgress]);

  // Generate stable streaks
  const streaks = useMemo(() => {
    const result = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i + (Math.random() * 5 - 2.5);
      const delay = Math.random() * 0.6;
      const length = 80 + Math.random() * 200;
      result.push({ angle, delay, length, key: i });
    }
    return result;
  }, []);

  if (!isInTransit) return null;

  const color = accentColor || COLORS.primary;

  return (
    <div
      aria-live="polite"
      aria-label={`In transit to ${transitTarget || 'destination'}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Radial vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)`,
      }} />

      {/* Warp streaks */}
      {streaks.map(s => (
        <WarpStreak
          key={s.key}
          angle={s.angle}
          delay={s.delay}
          length={s.length}
          color={color}
        />
      ))}

      {/* Center ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: `1px solid ${color}40`,
        boxShadow: `0 0 40px ${color}20, inset 0 0 20px ${color}10`,
        animation: 'hud-transit-glow 1.2s ease-in-out infinite',
      }} />

      {/* Destination info */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        fontFamily: '"Exo 2", "Courier New", Consolas, monospace',
      }}>
        <div style={{
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '0.2em',
          color: COLORS.textMuted,
          marginBottom: '6px',
        }}>
          TRANSIT TO
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          color: color,
          textTransform: 'uppercase',
          textShadow: `0 0 20px ${color}60`,
          marginBottom: '12px',
        }}>
          {transitTarget || 'UNKNOWN'}
        </div>

        {/* Progress bar */}
        <div style={{
          width: '200px',
          height: '3px',
          background: `${color}20`,
          borderRadius: '2px',
          overflow: 'hidden',
          margin: '0 auto 8px auto',
        }}>
          <div style={{
            width: `${(transitProgress || 0) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            borderRadius: '2px',
            transition: 'width 0.3s ease-out',
          }} />
        </div>

        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.12em',
          color: COLORS.textMuted,
        }}>
          ETA {eta}s
        </div>
      </div>
    </div>
  );
}

export default TransitOverlay;
