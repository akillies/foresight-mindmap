import React, { useState, useEffect } from 'react';
import { tourManager, TOUR_STATES } from './TourManager';
import { getAllTours, getTour } from './tourData';

/**
 * TourUI - LCARS-styled tour launcher and HUD
 *
 * Components:
 * - Tour Launcher: Button to open tour selection
 * - Tour HUD: Overlay during tour with controls and progress
 */

// LCARS Color Palette (matching main app)
const COLORS = {
  primary: '#5C88DA',
  secondary: '#FFCC66',
  accent: '#CC99CC',
  highlight: '#FF9966',
  success: '#99CC99',
  pink: '#FF6B9D',
  background: '#000000',
  panel: '#1a1a2e',
  text: '#E8F1FF',
};

/**
 * Tour Launcher Button - Shows in control panel
 */
export function TourLauncherButton({ onLaunch }) {
  return (
    <button
      onClick={onLaunch}
      aria-label="Start guided tour of Strategic Foresight"
      style={{
        width: '100%',
        background: `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`,
        border: `2px solid ${COLORS.secondary}`,
        color: COLORS.secondary,
        padding: '12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '2px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}40 0%, ${COLORS.highlight}40 100%)`;
        e.target.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`;
        e.target.style.transform = 'scale(1)';
      }}
    >
      <span style={{ fontSize: '12px', fontWeight: '700' }}>[+]</span>
      GUIDED TOUR
    </button>
  );
}

/**
 * Tour Selection Modal - Choose which tour to start
 */
export function TourSelectionModal({ isOpen, onClose, onSelectTour }) {
  const tours = getAllTours();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-selection-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        background: COLORS.panel,
        border: `3px solid ${COLORS.secondary}`,
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
      }}>
        <h2
          id="tour-selection-title"
          style={{
            color: COLORS.secondary,
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '3px',
            marginBottom: '20px',
            fontFamily: 'monospace',
            textAlign: 'center',
          }}
        >
          SELECT TOUR
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tours.map(tour => (
            <button
              key={tour.id}
              onClick={() => onSelectTour(tour.id)}
              style={{
                background: 'transparent',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: '12px',
                padding: '15px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${COLORS.primary}20`;
                e.currentTarget.style.borderColor = COLORS.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = COLORS.primary;
              }}
            >
              <div style={{
                color: COLORS.text,
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '1px',
                fontFamily: 'monospace',
                marginBottom: '8px',
              }}>
                {tour.title}
              </div>
              <div style={{
                color: COLORS.text,
                fontSize: '11px',
                opacity: 0.7,
                marginBottom: '8px',
                lineHeight: '1.4',
              }}>
                {tour.description}
              </div>
              <div style={{
                display: 'flex',
                gap: '15px',
                fontSize: '10px',
                fontFamily: 'monospace',
              }}>
                <span style={{ color: COLORS.secondary }}>
                  {tour.estimatedDuration}
                </span>
                <span style={{ color: COLORS.primary }}>
                  {tour.segmentCount} stops
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'transparent',
            border: `1px solid ${COLORS.pink}`,
            color: COLORS.pink,
            padding: '10px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: '600',
            letterSpacing: '1px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            marginTop: '20px',
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

/**
 * Tour HUD - Overlay during active tour
 */
export function TourHUD({ onClose }) {
  const [state, setState] = useState(TOUR_STATES.IDLE);
  const [segment, setSegment] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Subscribe to tour events
    const unsubState = tourManager.on('stateChange', ({ to }) => {
      setState(to);
    });

    const unsubSegment = tourManager.on('segment', (data) => {
      setSegment(data);
      setProgress((data.index + 1) / data.total);
    });

    const unsubComplete = tourManager.on('complete', () => {
      // Auto-close after completion
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
    });

    // Initial state
    const initialState = tourManager.getState();
    setState(initialState);
    const currentSeg = tourManager.getCurrentSegment();
    if (currentSeg) {
      setSegment(currentSeg);
      setProgress(tourManager.getProgress());
    }

    return () => {
      unsubState();
      unsubSegment();
      unsubComplete();
    };
  }, [onClose]);

  // Don't show HUD if not in tour (but keep visible during loading)
  if (state === TOUR_STATES.IDLE) {
    return null;
  }

  const isPaused = state === TOUR_STATES.PAUSED;
  const isComplete = state === TOUR_STATES.COMPLETED;
  const isLoading = state === TOUR_STATES.LOADING;

  return (
    <div
      role="region"
      aria-label="Tour controls and progress"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: `${COLORS.panel}F0`,
        border: `2px solid ${COLORS.primary}`,
        borderRadius: '20px',
        padding: '15px 25px',
        minWidth: '400px',
        maxWidth: '90vw',
        zIndex: 1500,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div style={{
          textAlign: 'center',
          color: COLORS.secondary,
          fontSize: '12px',
          fontFamily: 'monospace',
          letterSpacing: '2px',
        }}>
          LOADING TOUR...
        </div>
      )}

      {/* Completed State */}
      {isComplete && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: COLORS.success,
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '2px',
            fontFamily: 'monospace',
            marginBottom: '10px',
          }}>
            TOUR COMPLETE
          </div>
          <div style={{
            color: COLORS.text,
            fontSize: '11px',
            opacity: 0.7,
          }}>
            Thank you for exploring Strategic Foresight
          </div>
        </div>
      )}

      {/* Active Tour State */}
      {!isLoading && !isComplete && (
        <>
          {/* Progress Bar */}
          <div style={{
            height: '4px',
            background: '#333',
            borderRadius: '2px',
            marginBottom: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
              borderRadius: '2px',
              transition: 'width 0.5s ease',
            }} />
          </div>

          {/* Segment Info */}
          {segment && (
            <div style={{ marginBottom: '12px', textAlign: 'center' }}>
              <div style={{
                color: COLORS.secondary,
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '2px',
                fontFamily: 'monospace',
                marginBottom: '4px',
              }}>
                {segment.index + 1} / {segment.total}
              </div>
              <div style={{
                color: COLORS.text,
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '1px',
              }}>
                {segment.segment.title}
              </div>
              {segment.segment.subtitle && (
                <div style={{
                  color: COLORS.text,
                  fontSize: '10px',
                  opacity: 0.6,
                  marginTop: '4px',
                  fontStyle: 'italic',
                }}>
                  {segment.segment.subtitle}
                </div>
              )}
            </div>
          )}

          {/* Control Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}>
            {/* Pause/Resume Button */}
            <button
              onClick={() => isPaused ? tourManager.resume() : tourManager.pause()}
              aria-label={isPaused ? 'Resume tour' : 'Pause tour'}
              style={{
                background: isPaused ? COLORS.success : 'transparent',
                border: `2px solid ${isPaused ? COLORS.success : COLORS.primary}`,
                color: isPaused ? '#000' : COLORS.primary,
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
            >
              {isPaused ? 'RESUME' : 'PAUSE'}
            </button>

            {/* Next Button */}
            <button
              onClick={() => tourManager.skip()}
              aria-label="Go to next segment"
              style={{
                background: 'transparent',
                border: `2px solid ${COLORS.secondary}`,
                color: COLORS.secondary,
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
            >
              NEXT
            </button>

            {/* Exit Button */}
            <button
              onClick={() => {
                tourManager.exit();
                if (onClose) onClose();
              }}
              aria-label="Exit tour"
              style={{
                background: 'transparent',
                border: `2px solid ${COLORS.pink}`,
                color: COLORS.pink,
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
            >
              EXIT
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Main TourUI Component - Manages tour UI state
 */
export default function TourUI({ camera, controls }) {
  const [showSelection, setShowSelection] = useState(false);
  const [tourActive, setTourActive] = useState(false);

  // Initialize tour manager when camera/controls are available
  useEffect(() => {
    if (camera && controls) {
      tourManager.initialize(camera, controls);
    }
  }, [camera, controls]);

  // Handle tour selection
  const handleSelectTour = async (tourId) => {
    setShowSelection(false);
    const tourData = getTour(tourId);

    if (tourData) {
      setTourActive(true);
      await tourManager.loadTour(tourData);
      await tourManager.start();
    }
  };

  // Handle tour end
  const handleTourClose = () => {
    setTourActive(false);
  };

  return (
    <>
      {/* Launcher Button (rendered in parent) */}
      <TourLauncherButton onLaunch={() => setShowSelection(true)} />

      {/* Selection Modal */}
      <TourSelectionModal
        isOpen={showSelection}
        onClose={() => setShowSelection(false)}
        onSelectTour={handleSelectTour}
      />

      {/* Active Tour HUD */}
      {tourActive && <TourHUD onClose={handleTourClose} />}
    </>
  );
}
