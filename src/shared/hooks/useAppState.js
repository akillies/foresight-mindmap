/**
 * useAppState — Shared application state for both classic and planetary apps.
 * Encapsulates: modal toggles, audio state, tour state, search effects,
 * cross-pillar connections, and shared hook calls.
 */
import { useEffect, useState, useRef } from 'react';
import mindMapData from '@shared/mindMapData';
import { tourManager } from '@shared/tour/TourManager';
import { useAudio } from '@shared/hooks/useAudio';
import { useSearch } from '@shared/hooks/useSearch';
import { useNodeInteraction } from '@shared/hooks/useNodeInteraction';
import {
  createCrossPillarConnections,
  removeCrossPillarConnections,
} from '@shared/scene/ConnectionManager';

export function useAppState() {
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
  useAudio(audioEnabled, audioPreset);
  const { searchQuery } = useSearch();

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
    openMedia,
    closeMedia,
    dismissWarning,
  } = useNodeInteraction();

  return {
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

    // Audio state
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
    selectedMedia, imageError, setImageError,
    warningToast,
    handleNodeClick, updateHoveredNode,
    openMedia, closeMedia, dismissWarning,
  };
}

/**
 * useSearchEffect — Highlights/dims nodes based on search query.
 * Called inside each app after scene hook provides sceneRef/nodesRef.
 */
export function useSearchEffect(searchQuery, sceneRef, nodesRef, expandedNodesRef, setExpandedNodes) {
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

    matchingMethodologies.forEach(method => {
      const parentPillarId = method.pillar;
      const parentPillar = nodesRef.current.find(n => n.userData.id === parentPillarId);
      if (parentPillar && !expandedNodesRef.current.has(parentPillarId)) {
        setExpandedNodes(prev => new Set([...prev, parentPillarId]));
      }
    });

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
}

/**
 * useCrossPillarEffect — Manages cross-pillar relationship connections.
 */
export function useCrossPillarEffect(showRelationships, selectedNode, hoveredNode, sceneRef, nodesRef, crossPillarConnectionsRef) {
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
}

/**
 * useTourSegmentEffect — Handles tour segment navigation.
 */
export function useTourSegmentEffect(sceneRef, nodesRef, connectionsRef, expandedNodesRef, expandedNodes, handleNodeClick, setSelectedNode) {
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
}
