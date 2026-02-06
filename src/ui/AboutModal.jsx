/**
 * AboutModal Component
 * Displays application information and credits
 */
import React from 'react';
import { COLORS } from '../constants';

/**
 * About Modal Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Handler to close the modal
 */
export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        backdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.panel} 0%, #0a0a1a 100%)`,
        border: `3px solid ${COLORS.primary}`,
        borderRadius: '20px',
        padding: '35px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: `0 0 40px ${COLORS.primary}40`,
      }}>
        <h2
          id="about-title"
          style={{
            color: COLORS.secondary,
            fontSize: '24px',
            fontWeight: '700',
            letterSpacing: '4px',
            marginBottom: '25px',
            fontFamily: 'monospace',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Strategic Foresight Mind Map
        </h2>

        <div style={{
          color: COLORS.text,
          fontSize: '13px',
          lineHeight: '1.8',
          marginBottom: '25px',
        }}>
          <div style={{
            background: `${COLORS.primary}20`,
            border: `1px solid ${COLORS.primary}60`,
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
          }}>
            <p style={{ margin: '0 0 10px 0', color: COLORS.secondary, fontWeight: '700', letterSpacing: '2px', fontSize: '11px' }}>
              VERSION 0.1
            </p>
            <p style={{ margin: 0, opacity: 0.8 }}>
              An interactive 3D visualization exploring strategic foresight methodologies based on Sohail Inayatullah's Six Pillars framework.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: COLORS.primary, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '10px' }}>
              CREATED BY
            </h3>
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>Alexander Kline</strong>
            </p>
            <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
              AK Consulting
            </p>
            <p style={{ margin: '0 0 5px 0' }}>
              <a
                href="https://www.alexanderkline.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: COLORS.secondary,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${COLORS.secondary}60`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderBottomColor = COLORS.secondary;
                  e.target.style.color = COLORS.highlight;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderBottomColor = `${COLORS.secondary}60`;
                  e.target.style.color = COLORS.secondary;
                }}
              >
                www.alexanderkline.com
              </a>
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: COLORS.primary, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '10px' }}>
              FRAMEWORK
            </h3>
            <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
              Based on the Six Pillars of Futures Studies framework by <strong>Dr. Sohail Inayatullah</strong>
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: COLORS.primary, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '10px' }}>
              TECHNOLOGIES
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['React', 'Three.js', 'WebGL', 'Vite'].map(tech => (
                <span
                  key={tech}
                  style={{
                    background: `${COLORS.accent}30`,
                    border: `1px solid ${COLORS.accent}60`,
                    color: COLORS.accent,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Best Experience Note */}
          <div style={{
            background: `${COLORS.warning}15`,
            border: `1px solid ${COLORS.warning}40`,
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, color: COLORS.warning, fontWeight: '600', letterSpacing: '1px', fontSize: '11px' }}>
              BEST EXPERIENCED ON A DESKTOP BROWSER
            </p>
            <p style={{ margin: '6px 0 0 0', opacity: 0.7, fontSize: '11px' }}>
              Full 3D navigation and audio features require a larger screen
            </p>
          </div>

          {/* Audio Player Placeholder */}
          <div style={{
            background: `${COLORS.primary}10`,
            border: `1px dashed ${COLORS.primary}40`,
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
          }}>
            <h3 style={{ color: COLORS.primary, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '10px', textAlign: 'center' }}>
              AMBIENT AUDIO
            </h3>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
            }}>
              <button
                disabled
                style={{
                  background: `${COLORS.primary}20`,
                  border: `1px solid ${COLORS.primary}40`,
                  color: COLORS.primary,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  fontFamily: 'monospace',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                TRACK 1
              </button>
              <button
                disabled
                style={{
                  background: `${COLORS.primary}20`,
                  border: `1px solid ${COLORS.primary}40`,
                  color: COLORS.primary,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  fontFamily: 'monospace',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                TRACK 2
              </button>
            </div>
            <p style={{ margin: '10px 0 0 0', opacity: 0.5, fontSize: '10px', textAlign: 'center', fontStyle: 'italic' }}>
              Coming soon
            </p>
          </div>

          <div style={{
            background: `${COLORS.pink}15`,
            border: `1px solid ${COLORS.pink}40`,
            borderRadius: '10px',
            padding: '12px',
            fontSize: '11px',
            opacity: 0.7,
            textAlign: 'center',
          }}>
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} Alexander Kline / AK Consulting. All rights reserved.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            border: 'none',
            color: '#000',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = `0 0 20px ${COLORS.primary}60`;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AboutModal;
