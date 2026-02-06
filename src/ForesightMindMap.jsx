/**
 * ForesightMindMap - Main Orchestrator Component
 * Refactored from 3,184 lines to ~500 lines
 *
 * This component coordinates all sub-modules:
 * - scene/ - Three.js scene, nodes, connections, particles, easter eggs
 * - hooks/ - Audio, search, node interaction, scene lifecycle
 * - ui/ - Control panel, audio controls, tooltips, modals
 */
import React, { useEffect, useState, Component, lazy, Suspense } from 'react';
import mindMapData from './mindMapData';
import { tourManager } from './TourManager';
import { getTour } from './tourData';
import { COLORS } from './constants';

// Custom Hooks
import { useAudio } from './hooks/useAudio';
import { useSearch } from './hooks/useSearch';
import { useNodeInteraction } from './hooks/useNodeInteraction';
import { useThreeScene } from './hooks/useThreeScene';

// UI Components
import { ControlPanel, HoverTooltip, AboutModal, GlobalStyles } from './ui';

// Scene utilities for cross-pillar connections and search effects
import {
  createCrossPillarConnections,
  removeCrossPillarConnections,
} from './scene/ConnectionManager';

// Lazy load heavy components
const TimelineView = lazy(() => import('./TimelineView'));
const TourSelectionModal = lazy(() => import('./TourUI').then(m => ({ default: m.TourSelectionModal })));
const TourHUD = lazy(() => import('./TourUI').then(m => ({ default: m.TourHUD })));
const FeaturedContentDashboard = lazy(() => import('./FeaturedContentDashboard'));
const EnhancedInfoPanel = lazy(() => import('./EnhancedInfoPanel'));
const GlobalMediaBrowser = lazy(() => import('./GlobalMediaBrowser'));
const DiagramGallery = lazy(() => import('./DiagramGallery'));
const WelcomeModal = lazy(() => import('./WelcomeModal'));
const MediaViewer = lazy(() => import('./components/MediaViewer'));

// Error Boundary to catch React render crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught error:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: COLORS.background,
            color: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: 'monospace',
            padding: '40px',
          }}
        >
          <h1 style={{ color: COLORS.pink, marginBottom: '20px' }}>SYSTEM ERROR</h1>
          <p style={{ maxWidth: '600px', lineHeight: '1.6', marginBottom: '20px' }}>
            A critical rendering error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            aria-label="Reload the application"
            style={{
              background: COLORS.primary,
              color: COLORS.background,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            RELOAD APPLICATION
          </button>
          <details style={{ marginTop: '40px', maxWidth: '800px' }}>
            <summary style={{ cursor: 'pointer', color: COLORS.secondary }}>Technical Details</summary>
            <pre style={{
              background: COLORS.panel,
              padding: '20px',
              borderRadius: '10px',
              overflow: 'auto',
              marginTop: '10px',
              fontSize: '12px',
            }}>
              {this.state.error && this.state.error.toString()}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Main ForesightMindMap Component
 */
const ForesightMindMap = () => {
  // ===== UI STATE =====
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showTourSelection, setShowTourSelection] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMediaBrowser, setShowMediaBrowser] = useState(false);
  const [showDiagramGallery, setShowDiagramGallery] = useState(false);
  const [controlPanelOpen, setControlPanelOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);

  // ===== AUDIO STATE =====
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState(1);
  const [tourMusicVolume, setTourMusicVolume] = useState(30);
  const [tourNarrationVolume, setTourNarrationVolume] = useState(100);
  const [tourAudioMuted, setTourAudioMuted] = useState(false);

  // ===== CUSTOM HOOKS =====
  // Audio hook - handles binaural beat generation
  useAudio(audioEnabled, audioPreset);

  // Search hook (temporarily disabled in UI but kept for future)
  const { searchQuery } = useSearch();

  // Node interaction hook
  const {
    selectedNode,
    setSelectedNode,
    hoveredNode,
    expandedNodes,
    setExpandedNodes,
    expandedNodesRef,
    selectedMedia,
    imageError,
    setImageError,
    warningToast,
    handleNodeClick,
    updateHoveredNode,
    closeMedia,
    dismissWarning,
  } = useNodeInteraction();

  // Three.js scene hook
  const {
    containerRef,
    sceneRef,
    nodesRef,
    connectionsRef,
    crossPillarConnectionsRef,
    controlsRef,
  } = useThreeScene(handleNodeClick, updateHoveredNode, selectedNode);

  // ===== SEARCH EFFECT =====
  // Enhanced search highlighting when search query changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (!searchQuery || typeof searchQuery !== 'string' || !searchQuery.trim()) {
      nodesRef.current.forEach(node => {
        if (node.material) {
          node.material.opacity = 0.9;
          node.material.emissiveIntensity = 0.3;
        }
      });
      return;
    }

    const query = searchQuery.toLowerCase();

    // Search all methodologies
    const matchingMethodologies = mindMapData.methodologies.filter(method => {
      if (method.label?.toLowerCase().includes(query)) return true;
      if (method.description?.toLowerCase().includes(query)) return true;
      if (method.id?.toLowerCase().includes(query)) return true;
      if (method.historicalContext?.toLowerCase().includes(query)) return true;
      if (method.media?.some(m =>
        m.title?.toLowerCase().includes(query) ||
        m.description?.toLowerCase().includes(query)
      )) return true;
      if (method.pioneers?.some(p => typeof p === 'string' && p.toLowerCase().includes(query))) return true;
      return false;
    });

    // Auto-expand parent pillars for matched methodologies
    matchingMethodologies.forEach(method => {
      const parentPillarId = method.pillar;
      const parentPillar = nodesRef.current.find(n => n.userData.id === parentPillarId);
      if (parentPillar && !expandedNodesRef.current.has(parentPillarId)) {
        setExpandedNodes(prev => new Set([...prev, parentPillarId]));
      }
    });

    // Highlight matching nodes
    nodesRef.current.forEach(node => {
      const data = node.userData;
      let matches =
        (data.label && data.label.toLowerCase().includes(query)) ||
        (data.description && data.description.toLowerCase().includes(query)) ||
        (data.id && data.id.toLowerCase().includes(query));

      if (data.level === 2) {
        const methodology = mindMapData.methodologies.find(m => m.id === data.id);
        if (methodology) {
          matches = matches || matchingMethodologies.includes(methodology);
        }
      }

      if (node.material) {
        node.material.opacity = matches ? 1.0 : 0.2;
        node.material.emissiveIntensity = matches ? 0.7 : 0.1;
      }
    });
  }, [searchQuery]);

  // ===== CROSS-PILLAR RELATIONSHIPS EFFECT =====
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    removeCrossPillarConnections(scene, crossPillarConnectionsRef.current);

    if (showRelationships && (selectedNode || hoveredNode)) {
      const activeNode = selectedNode || hoveredNode;
      createCrossPillarConnections(scene, activeNode, nodesRef.current, crossPillarConnectionsRef.current);
    }

    return () => {
      if (scene) {
        removeCrossPillarConnections(scene, crossPillarConnectionsRef.current);
      }
    };
  }, [showRelationships, selectedNode, hoveredNode]);

  // ===== TOUR SEGMENT HANDLER =====
  useEffect(() => {
    const handleSegment = ({ segment }) => {
      if (!segment.nodeId || !sceneRef.current) return;

      let targetNode = null;
      sceneRef.current.traverse((obj) => {
        if (obj.userData && obj.userData.id === segment.nodeId) {
          targetNode = obj;
        }
      });

      if (targetNode) {
        const isExpanded = expandedNodesRef.current.has(segment.nodeId);
        if (!isExpanded) {
          handleNodeClick(targetNode, sceneRef.current, nodesRef.current, connectionsRef.current);
        } else {
          setSelectedNode(targetNode.userData);
        }
      }
    };

    const unsubscribe = tourManager.on('segment', handleSegment);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [expandedNodes]);

  // ===== RENDER =====
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
          onMediaClick={(media) => {
            setImageError(false);
            // Media selection is handled through the handleNodeClick in useNodeInteraction
          }}
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

      {/* Performance Warning Toast - LCARS styled */}
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
          {/* LCARS left bar accent */}
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

      {/* Hidden About Section - Copyright & Attribution */}
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
            onMediaClick={(media) => {
              setImageError(false);
              // Need to set selectedMedia through the hook
            }}
            isVisible={!selectedMedia}
          />
        </Suspense>
      )}

      {/* Global Media Browser */}
      <Suspense fallback={null}>
        <GlobalMediaBrowser
          isOpen={showMediaBrowser}
          onClose={() => setShowMediaBrowser(false)}
          onMediaClick={(media) => {
            setImageError(false);
          }}
        />
      </Suspense>

      {/* Diagram Gallery */}
      <Suspense fallback={null}>
        <DiagramGallery
          isOpen={showDiagramGallery}
          onClose={() => setShowDiagramGallery(false)}
          onDiagramClick={(diagram) => {
            setImageError(false);
          }}
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
    </div>
  );
};

// Wrap component with Error Boundary
const ForesightMindMapWithErrorBoundary = () => (
  <ErrorBoundary>
    <ForesightMindMap />
  </ErrorBoundary>
);

export default ForesightMindMapWithErrorBoundary;
