/**
 * PlanetDataPanel Component
 * Right-side angular-framed translucent panel
 * Shows planet description, children count, media count, biome type
 * Data readouts with monospace labels, accent color from HUDContext
 */
import React from 'react';
import { COLORS } from '../constants';
import { useHUD } from './HUDContext';
import './HUDStyles.css';

const BIOME_LABELS = {
  ocean: 'OCEANIC',
  desert: 'ARID',
  crystal: 'CRYSTALLINE',
  volcanic: 'VOLCANIC',
  garden: 'VERDANT',
  gasGiant: 'GAS GIANT',
};

function DataReadout({ label, value, color }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: COLORS.textMuted,
        fontFamily: '"Courier New", Consolas, monospace',
        marginBottom: '2px',
        lineHeight: 1,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: color || COLORS.text,
        fontFamily: '"Courier New", Consolas, monospace',
        lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  );
}

export function PlanetDataPanel() {
  const {
    accentColor,
    planetName,
    biome,
    childrenCount,
    mediaCount,
    description,
  } = useHUD();

  if (!planetName || planetName === 'STRATEGIC FORESIGHT') {
    return null;
  }

  return (
    <aside
      role="complementary"
      aria-label="Planet data readout"
      style={{
        position: 'fixed',
        top: '48px',
        right: '16px',
        width: '220px',
        zIndex: 900,
        background: 'rgba(10, 12, 28, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${accentColor}40`,
        fontFamily: '"Courier New", Consolas, monospace',
        color: COLORS.text,
        padding: '0',
        clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
        animation: 'hud-slide-right 0.5s ease-out',
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
        padding: '14px 20px 8px 20px',
        borderBottom: `1px solid ${accentColor}30`,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '16px',
          right: '16px',
          height: '2px',
          background: accentColor,
        }} />
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          color: accentColor,
          textTransform: 'uppercase',
        }}>
          {planetName}
        </div>
      </div>

      {/* Data readouts */}
      <div style={{ padding: '12px 20px 16px 20px', position: 'relative', zIndex: 2 }}>
        {biome && (
          <DataReadout
            label="BIOME CLASS"
            value={BIOME_LABELS[biome] || biome.toUpperCase()}
            color={accentColor}
          />
        )}

        <DataReadout
          label="SUB-NODES"
          value={String(childrenCount).padStart(3, '0')}
        />

        <DataReadout
          label="MEDIA OBJECTS"
          value={String(mediaCount).padStart(3, '0')}
        />

        {description && (
          <div style={{ marginTop: '4px' }}>
            <div style={{
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: COLORS.textMuted,
              marginBottom: '4px',
              lineHeight: 1,
            }}>
              SUMMARY
            </div>
            <div style={{
              fontSize: '11px',
              color: COLORS.textDim,
              lineHeight: 1.5,
              maxHeight: '80px',
              overflow: 'hidden',
            }}>
              {description}
            </div>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '16px',
        right: '16px',
        height: '1px',
        background: `${accentColor}30`,
        zIndex: 2,
      }} />
    </aside>
  );
}

export default PlanetDataPanel;
