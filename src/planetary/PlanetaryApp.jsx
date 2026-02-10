/**
 * PlanetaryApp — Planetary Explorer orchestrator.
 * Renders CockpitFrame HUD, transit overlay, VR button.
 * Wrapped in HUDProvider for HUD context.
 */
import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { COLORS } from '@shared/constants';
import { getTour } from '@shared/tour/tourData';
import { tourManager } from '@shared/tour/TourManager';
import { ErrorBoundary } from '@shared/ErrorBoundary';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import {
  useAppState,
  useSearchEffect,
  useCrossPillarEffect,
  useTourSegmentEffect,
} from '@shared/hooks/useAppState';
import { usePlanetaryScene } from './usePlanetaryScene';
import { HUDWiring } from './HUDWiring';
import { HUDProvider } from '@planetary/ui/HUDContext';
import { CockpitFrame } from '@planetary/ui/CockpitFrame';
import { TransitOverlay } from '@planetary/ui/TransitOverlay';
import { AboutModal } from '@shared/ui/AboutModal';
import { GlobalStyles } from '@shared/ui/GlobalStyles';

const IS_VR = new URLSearchParams(window.location.search).has('vr');

// Lazy-loaded components
const TimelineView = lazy(() => import('@shared/lazy/TimelineView'));
const TourSelectionModal = lazy(() => import('@shared/tour/TourUI').then(m => ({ default: m.TourSelectionModal })));
const TourHUD = lazy(() => import('@shared/tour/TourUI').then(m => ({ default: m.TourHUD })));
const GlobalMediaBrowser = lazy(() => import('@shared/lazy/GlobalMediaBrowser'));
const DiagramGallery = lazy(() => import('@shared/lazy/DiagramGallery'));
const MediaViewer = lazy(() => import('@shared/lazy/MediaViewer/MediaViewer'));

function PlanetaryAppInner() {
  const state = useAppState();
  const {
    timelineVisible, setTimelineVisible,
    showRelationships, setShowRelationships,
    showTourSelection, setShowTourSelection,
    tourActive, setTourActive,
    showAbout, setShowAbout,
    showMediaBrowser, setShowMediaBrowser,
    showDiagramGallery, setShowDiagramGallery,
    // Search
    searchQuery,
    // Node interaction
    selectedNode, setSelectedNode,
    hoveredNode,
    expandedNodes, setExpandedNodes, expandedNodesRef,
    selectedMedia,
    warningToast,
    handleNodeClick, updateHoveredNode,
    openMedia, closeMedia, dismissWarning,
  } = state;

  // Scene hook
  const {
    containerRef,
    sceneRef,
    rendererRef,
    nodesRef,
    connectionsRef,
    crossPillarConnectionsRef,
    gpuInfo,
    transitCallbackRef,
    hudDataRef,
  } = usePlanetaryScene(handleNodeClick, updateHoveredNode, selectedNode);

  // Shared effects
  useSearchEffect(searchQuery, sceneRef, nodesRef, expandedNodesRef, setExpandedNodes);
  useCrossPillarEffect(showRelationships, selectedNode, hoveredNode, sceneRef, nodesRef, crossPillarConnectionsRef);
  useTourSegmentEffect(sceneRef, nodesRef, connectionsRef, expandedNodesRef, expandedNodes, handleNodeClick, setSelectedNode);

  // VR Button
  const vrButtonRef = useRef(null);
  useEffect(() => {
    if (!IS_VR || !rendererRef.current) return;

    const button = VRButton.createButton(rendererRef.current);
    Object.assign(button.style, {
      fontFamily: '"Exo 2", "Courier New", Consolas, monospace',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      background: 'rgba(10, 12, 28, 0.9)',
      border: `1px solid ${COLORS.secondary}`,
      borderRadius: '4px',
      color: COLORS.secondary,
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: '900',
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
    });
    vrButtonRef.current = button;
    document.body.appendChild(button);

    return () => {
      if (button.parentElement) button.parentElement.removeChild(button);
    };
  }, [rendererRef.current]);

  return (
    <HUDProvider>
      <HUDWiring
        selectedNode={selectedNode}
        nodesRef={nodesRef}
        gpuInfo={gpuInfo}
        transitCallbackRef={transitCallbackRef}
        hudDataRef={hudDataRef}
      />
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* 3D Canvas Container */}
        <main
          ref={containerRef}
          role="main"
          aria-label="Interactive planetary exploration of Strategic Foresight methodologies"
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            background: COLORS.background,
          }}
        />

        {/* CockpitFrame HUD (flat-screen mode only) */}
        {!IS_VR && (
          <>
            <CockpitFrame
              gpuInfo={gpuInfo}
              onStartTour={() => setShowTourSelection(true)}
              timelineVisible={timelineVisible}
              onToggleTimeline={() => setTimelineVisible(!timelineVisible)}
              showRelationships={showRelationships}
              onToggleRelationships={() => setShowRelationships(!showRelationships)}
              onOpenMediaBrowser={() => setShowMediaBrowser(true)}
              onOpenDiagramGallery={() => setShowDiagramGallery(true)}
            />
            <TransitOverlay />
          </>
        )}

        {/* Media Viewer */}
        {selectedMedia && (
          <Suspense fallback={null}>
            <MediaViewer
              media={selectedMedia}
              onClose={closeMedia}
            />
          </Suspense>
        )}

        {/* Global Styles */}
        <GlobalStyles />

        {/* Performance Warning Toast */}
        {warningToast && (
          <div
            role="alert"
            aria-live="assertive"
            onClick={dismissWarning}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'stretch',
              fontFamily: '"Exo 2", "Courier New", Consolas, monospace',
              cursor: 'pointer',
              animation: 'lcars-toast-in 0.3s ease-out',
              maxWidth: '90vw',
            }}
          >
            <div style={{
              width: '8px',
              borderRadius: '4px 0 0 4px',
              background: warningToast.level === 'error' ? COLORS.pink : COLORS.warning,
            }} />
            <div style={{
              background: COLORS.panel,
              border: `1px solid ${warningToast.level === 'error' ? COLORS.pink : COLORS.warning}`,
              borderLeft: 'none',
              borderRadius: '0 8px 8px 0',
              padding: '12px 20px 12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                color: warningToast.level === 'error' ? COLORS.pink : COLORS.warning,
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {warningToast.level === 'error' ? 'ALERT' : 'ADVISORY'}
              </span>
              <span style={{
                color: COLORS.text,
                fontSize: '12px',
                lineHeight: '1.4',
                letterSpacing: '0.5px',
              }}>
                {warningToast.message}
              </span>
            </div>
            <style>{`
              @keyframes lcars-toast-in {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
              }
            `}</style>
          </div>
        )}

        {/* Timeline View */}
        {timelineVisible && (
          <div id="timeline-panel">
            <Suspense fallback={<div style={{ padding: '20px', color: COLORS.text }}>Loading timeline...</div>}>
              <TimelineView onClose={() => setTimelineVisible(false)} />
            </Suspense>
          </div>
        )}

        {/* About Modal */}
        <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

        {/* Tour Selection Modal */}
        <Suspense fallback={null}>
          <TourSelectionModal
            isOpen={showTourSelection}
            onClose={() => setShowTourSelection(false)}
            onSelectTour={async (tourId) => {
              setShowTourSelection(false);
              const tourData = getTour(tourId);
              if (tourData) {
                setTourActive(true);
                try {
                  await tourManager.loadTour(tourData);
                  await tourManager.start();
                } catch (error) {
                  console.error('[Tour] Failed to start:', error);
                  alert(`Tour failed to start: ${error.message}\n\nCheck browser console for details.`);
                  setTourActive(false);
                }
              }
            }}
          />
        </Suspense>

        {/* Tour HUD */}
        {tourActive && (
          <Suspense fallback={null}>
            <TourHUD onClose={() => setTourActive(false)} />
          </Suspense>
        )}

        {/* Global Media Browser */}
        <Suspense fallback={null}>
          <GlobalMediaBrowser
            isOpen={showMediaBrowser}
            onClose={() => setShowMediaBrowser(false)}
            onMediaClick={openMedia}
          />
        </Suspense>

        {/* Diagram Gallery */}
        <Suspense fallback={null}>
          <DiagramGallery
            isOpen={showDiagramGallery}
            onClose={() => setShowDiagramGallery(false)}
            onDiagramClick={openMedia}
          />
        </Suspense>

        {/* Return to Classic Map */}
        <a
          href="/"
          aria-label="Return to classic mind map"
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            zIndex: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(10, 12, 28, 0.85)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${COLORS.secondary}50`,
            borderRadius: '4px',
            color: COLORS.secondary,
            fontFamily: '"Exo 2", "Courier New", Consolas, monospace',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${COLORS.secondary}`;
            e.currentTarget.style.boxShadow = `0 0 16px ${COLORS.secondary}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${COLORS.secondary}50`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          RETURN TO MAP
        </a>
      </div>
    </HUDProvider>
  );
}

export default function PlanetaryApp() {
  return (
    <ErrorBoundary>
      <PlanetaryAppInner />
    </ErrorBoundary>
  );
}
