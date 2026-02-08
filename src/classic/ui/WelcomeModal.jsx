import React, { useState, useEffect } from 'react';
import { COLORS } from '@shared/constants';

const STORAGE_KEY = 'foresight-welcome-dismissed';

/**
 * Welcome Modal - First-time user onboarding
 * Shows on first visit, can be dismissed permanently
 */
const WelcomeModal = ({ onStartTour, onExplore, isVisible: externalVisibility }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check if user has dismissed before
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Small delay for smoother page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Allow external control (e.g., from help button)
  useEffect(() => {
    if (externalVisibility !== undefined) {
      setIsVisible(externalVisibility);
    }
  }, [externalVisibility]);

  const handleDismiss = (action) => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setIsVisible(false);

    if (action === 'tour' && onStartTour) {
      onStartTour();
    } else if (action === 'explore' && onExplore) {
      onExplore();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss('explore');
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          background: COLORS.panel,
          border: `3px solid ${COLORS.secondary}`,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: `0 0 60px ${COLORS.secondary}30`,
          animation: 'slideUp 0.4s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.pink} 100%)`,
            padding: '24px 30px',
            textAlign: 'center',
          }}
        >
          <h1
            id="welcome-title"
            style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              color: COLORS.background,
              letterSpacing: '3px',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}
          >
            STRATEGIC FORESIGHT
          </h1>
          <div
            style={{
              fontSize: '13px',
              color: `${COLORS.background}90`,
              fontWeight: '600',
              letterSpacing: '1px',
            }}
          >
            MIND MAP EXPLORER
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '30px' }}>
          {/* What is this */}
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: COLORS.text,
              margin: '0 0 28px 0',
              textAlign: 'center',
            }}
          >
            An interactive 3D visualization of <strong style={{ color: COLORS.secondary }}>18 foresight methodologies</strong> for
            exploring and shaping alternative futures.
          </p>

          {/* How to use it - 3 hints */}
          <div
            style={{
              background: `${COLORS.primary}15`,
              border: `2px solid ${COLORS.primary}40`,
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                color: COLORS.primary,
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              HOW TO EXPLORE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Hint 1: Click nodes */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: COLORS.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '18px',
                  }}
                >
                  <span role="img" aria-label="click">
                    {'\u{1F446}'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text, marginBottom: '2px' }}>
                    Click any node
                  </div>
                  <div style={{ fontSize: '12px', color: `${COLORS.text}90`, lineHeight: '1.4' }}>
                    Explore 142+ videos, articles, and diagrams embedded throughout
                  </div>
                </div>
              </div>

              {/* Hint 2: Navigate */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: COLORS.pink,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '18px',
                  }}
                >
                  <span role="img" aria-label="navigate">
                    {'\u{1F5B1}'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text, marginBottom: '2px' }}>
                    Drag to rotate, scroll to zoom
                  </div>
                  <div style={{ fontSize: '12px', color: `${COLORS.text}90`, lineHeight: '1.4' }}>
                    Orbit around the 3D mind map to see all six pillars
                  </div>
                </div>
              </div>

              {/* Hint 3: Take the tour */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '18px',
                  }}
                >
                  <span role="img" aria-label="tour">
                    {'\u{1F3A7}'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text, marginBottom: '2px' }}>
                    Take the guided tour
                  </div>
                  <div style={{ fontSize: '12px', color: `${COLORS.text}90`, lineHeight: '1.4' }}>
                    A 15-minute narrated journey through the framework
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => handleDismiss('tour')}
              aria-label="Start the guided tour of Strategic Foresight"
              style={{
                flex: 1,
                padding: '14px 20px',
                background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.pink} 100%)`,
                border: 'none',
                borderRadius: '12px',
                color: COLORS.background,
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 20px ${COLORS.secondary}50`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              START GUIDED TOUR
            </button>

            <button
              onClick={() => handleDismiss('explore')}
              aria-label="Dismiss welcome and explore freely"
              style={{
                flex: 1,
                padding: '14px 20px',
                background: 'transparent',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: '12px',
                color: COLORS.primary,
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.primary;
                e.target.style.color = COLORS.background;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = COLORS.primary;
              }}
            >
              EXPLORE FREELY
            </button>
          </div>

          {/* Don't show again checkbox */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12px',
              color: `${COLORS.text}70`,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                accentColor: COLORS.secondary,
              }}
            />
            Don't show this again
          </label>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomeModal;
