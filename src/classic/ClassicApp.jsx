/**
 * ClassicApp — Classic 3D mind map orchestrator.
 * Renders the standard control panel, info panel, tooltips, modals.
 */
import React, { useEffect, lazy, Suspense } from 'react';
import { COLORS } from '@shared/constants';
import { getTour } from '@shared/tour/tourData';
import { tourManager } from '@shared/tour/TourManager';
import { ErrorBoundary } from '@shared/ErrorBoundary';
import {
  useAppState,
  useSearchEffect,
  useCrossPillarEffect,
  useTourSegmentEffect,
} from '@shared/hooks/useAppState';
import { useClassicScene } from './useClassicScene';

// UI Components
import { ControlPanel } from '@classic/ui/ControlPanel';
import { HoverTooltip } from '@classic/ui/HoverTooltip';
import { AboutModal } from '@shared/ui/AboutModal';
import { GlobalStyles } from '@shared/ui/GlobalStyles';

// Lazy-loaded components
const TimelineView = lazy(() => import('@shared/lazy/TimelineView'));
const TourSelectionModal = lazy(() => import('@shared/tour/TourUI').then(m => ({ default: m.TourSelectionModal })));
const TourHUD = lazy(() => import('@shared/tour/TourUI').then(m => ({ default: m.TourHUD })));
const FeaturedContentDashboard = lazy(() => import('@classic/ui/FeaturedContentDashboard'));
const EnhancedInfoPanel = lazy(() => import('@classic/ui/EnhancedInfoPanel'));
const GlobalMediaBrowser = lazy(() => import('@shared/lazy/GlobalMediaBrowser'));
const DiagramGallery = lazy(() => import('@shared/lazy/DiagramGallery'));
const WelcomeModal = lazy(() => import('@classic/ui/WelcomeModal'));
const MediaViewer = lazy(() => import('@shared/lazy/MediaViewer/MediaViewer'));

function ClassicAppInner() {
  const state = useAppState();
  const {
    // UI state
    timelineVisible, setTimelineVisible,
    showRelationships, setShowRelationships,
    showTourSelection, setShowTourSelection,
    tourActive, setTourActive,
    showAbout, setShowAbout,
    showMediaBrowser, setShowMediaBrowser,
    showDiagramGallery, setShowDiagramGallery,
    controlPanelOpen, setControlPanelOpen,
    infoPanelOpen, setInfoPanelOpen,
    // Audio
    audioEnabled, setAudioEnabled,
    audioPreset, setAudioPreset,
    tourMusicVolume, setTourMusicVolume,
    tourNarrationVolume, setTourNarrationVolume,
    tourAudioMuted, setTourAudioMuted,
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
    nodesRef,
    connectionsRef,
    crossPillarConnectionsRef,
    gpuInfo,
  } = useClassicScene(handleNodeClick, updateHoveredNode, selectedNode);

  // Shared effects
  useSearchEffect(searchQuery, sceneRef, nodesRef, expandedNodesRef, setExpandedNodes);
  useCrossPillarEffect(showRelationships, selectedNode, hoveredNode, sceneRef, nodesRef, crossPillarConnectionsRef);
  useTourSegmentEffect(sceneRef, nodesRef, connectionsRef, expandedNodesRef, expandedNodes, handleNodeClick, setSelectedNode);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* SEO H1 Tag - Visually Hidden */}
      <h1 style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}>
        Strategic Foresight Mind Map - Interactive 3D Educational Visualization of Futures Thinking Methodologies
      </h1>

      {/* 3D Canvas Container */}
      <main
        ref={containerRef}
        role="main"
        aria-label="Interactive 3D mind map visualization of Strategic Foresight methodologies"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          background: COLORS.background,
        }}
      />

      {/* Control Panel */}
      <ControlPanel
        isOpen={controlPanelOpen}
        onToggle={() => setControlPanelOpen(!controlPanelOpen)}
        onStartTour={() => setShowTourSelection(true)}
        timelineVisible={timelineVisible}
        onToggleTimeline={() => setTimelineVisible(!timelineVisible)}
        showRelationships={showRelationships}
        onToggleRelationships={() => setShowRelationships(!showRelationships)}
        onOpenMediaBrowser={() => setShowMediaBrowser(true)}
        onOpenDiagramGallery={() => setShowDiagramGallery(true)}
        onOpenAbout={() => setShowAbout(true)}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        audioPreset={audioPreset}
        setAudioPreset={setAudioPreset}
        tourMusicVolume={tourMusicVolume}
        setTourMusicVolume={setTourMusicVolume}
        tourNarrationVolume={tourNarrationVolume}
        setTourNarrationVolume={setTourNarrationVolume}
        tourAudioMuted={tourAudioMuted}
        setTourAudioMuted={setTourAudioMuted}
      />

      {/* Enhanced Info Panel */}
      <Suspense fallback={null}>
        <EnhancedInfoPanel
          selectedNode={selectedNode}
          isOpen={infoPanelOpen}
          onClose={() => setSelectedNode(null)}
          onToggle={() => setInfoPanelOpen(!infoPanelOpen)}
          onMediaClick={openMedia}
        />
      </Suspense>

      {/* Media Viewer */}
      {selectedMedia && (
        <Suspense fallback={null}>
          <MediaViewer
            media={selectedMedia}
            onClose={closeMedia}
          />
        </Suspense>
      )}

      {/* Hover Tooltip */}
      <HoverTooltip hoveredNode={hoveredNode} selectedNode={selectedNode} />

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
            fontFamily: '"Courier New", monospace',
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

      {/* Hidden About Section */}
      <div
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        role="contentinfo"
        aria-label="Copyright and attribution information"
      >
        <p>Future Studies Explorer - Copyright 2025 Alexander Kline Consulting. All rights reserved.</p>
        <p>An interactive 3D visualization of strategic foresight methodologies based on the Six Pillars framework by Sohail Inayatullah.</p>
      </div>

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

      {/* Featured Content Dashboard */}
      {!tourActive && (
        <Suspense fallback={null}>
          <FeaturedContentDashboard
            onMediaClick={openMedia}
            isVisible={!selectedMedia}
          />
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

      {/* Welcome Modal */}
      {!tourActive && (
        <Suspense fallback={null}>
          <WelcomeModal
            onStartTour={() => setShowTourSelection(true)}
            onExplore={() => {/* Just close the modal */}}
          />
        </Suspense>
      )}

      {/* Planetary Beta Launcher */}
      <a
        href="/explore"
        aria-label="Launch planetary exploration beta"
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
          border: `1px solid ${COLORS.primary}50`,
          borderRadius: '4px',
          color: COLORS.primary,
          fontFamily: '"Courier New", Consolas, monospace',
          fontSize: '10px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${COLORS.primary}`;
          e.currentTarget.style.boxShadow = `0 0 16px ${COLORS.primary}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${COLORS.primary}50`;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: COLORS.successBright,
          boxShadow: `0 0 6px ${COLORS.successBright}`,
        }} />
        PLANETARY BETA
      </a>
    </div>
  );
}

export default function ClassicApp() {
  return (
    <ErrorBoundary>
      <ClassicAppInner />
    </ErrorBoundary>
  );
}
