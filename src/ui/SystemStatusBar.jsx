/**
 * SystemStatusBar Component
 * Top bar showing location name, node count, FPS, WebGPU/WebGL badge
 * 28px height, geometric top border using accent color
 */
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants';
import { useHUD } from './HUDContext';
import './HUDStyles.css';

export function SystemStatusBar({ gpuInfo }) {
  const { accentColor, planetName, nodeCount, fps, gpuBackend } = useHUD();
  const [displayFps, setDisplayFps] = useState(60);
  const fpsRef = useRef(fps);

  // Smooth FPS display updates (avoid jitter)
  useEffect(() => {
    fpsRef.current = fps;
    const interval = setInterval(() => {
      setDisplayFps(Math.round(fpsRef.current));
    }, 500);
    return () => clearInterval(interval);
  }, [fps]);

  const backend = gpuInfo?.backend || gpuBackend || 'WebGL';
  const isWebGPU = backend.toLowerCase().includes('webgpu');

  return (
    <div
      role="status"
      aria-label="System status bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '28px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: 'rgba(10, 12, 28, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${accentColor}30`,
        fontFamily: '"Courier New", Consolas, monospace',
        fontSize: '10px',
        color: COLORS.text,
        letterSpacing: '0.12em',
        animation: 'hud-fade-in 0.4s ease-out',
      }}
    >
      {/* Accent border line at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
      }} />

      {/* Left: Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Blinking status dot */}
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 6px ${accentColor}`,
          animation: 'pulse 2s infinite',
        }} />
        <span style={{
          fontWeight: '700',
          textTransform: 'uppercase',
          color: accentColor,
        }}>
          {planetName}
        </span>
      </div>

      {/* Center: Node count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: COLORS.textMuted,
      }}>
        <span>
          <span style={{ color: COLORS.textMuted, marginRight: '4px' }}>NODES</span>
          <span style={{ color: COLORS.text, fontWeight: '700' }}>{nodeCount}</span>
        </span>
        <span style={{
          width: '1px',
          height: '12px',
          background: `${COLORS.textMuted}40`,
        }} />
        <span>
          <span style={{ color: COLORS.textMuted, marginRight: '4px' }}>FPS</span>
          <span style={{
            color: displayFps >= 50 ? COLORS.success : displayFps >= 30 ? COLORS.warning : COLORS.pink,
            fontWeight: '700',
          }}>
            {displayFps}
          </span>
        </span>
      </div>

      {/* Right: GPU badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          padding: '2px 8px',
          borderRadius: '3px',
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          background: isWebGPU
            ? `${COLORS.successBright}20`
            : `${COLORS.secondary}20`,
          color: isWebGPU ? COLORS.successBright : COLORS.secondary,
          border: `1px solid ${isWebGPU ? COLORS.successBright : COLORS.secondary}40`,
        }}>
          {backend.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default SystemStatusBar;
