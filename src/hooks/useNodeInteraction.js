/**
 * useNodeInteraction Hook
 * Manages node click, hover, and expansion state
 * Includes performance safety: debouncing, depth limits, node count guards
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  createChildNodes,
  createMediaNodes,
  removeChildNodes,
  getDescendantIds,
  getNodeDepth,
} from '../scene/NodeFactory';
import { PERFORMANCE_LIMITS } from '../constants';

/**
 * Custom hook for node interaction management
 * @returns {Object} Node interaction state and handlers
 */
export function useNodeInteraction() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [warningToast, setWarningToast] = useState(null);

  // Ref to track expanded nodes for stale closure prevention
  const expandedNodesRef = useRef(new Set());

  // Ref to track hovered node to avoid excessive state updates
  const hoveredNodeRef = useRef(null);

  // Click debounce ref - prevents rapid-fire expansion cascades
  const lastClickTimeRef = useRef(0);
  const isProcessingClickRef = useRef(false);

  // Warning toast auto-dismiss timer
  const warningTimerRef = useRef(null);

  // Keep expandedNodesRef in sync with expandedNodes state
  useEffect(() => {
    expandedNodesRef.current = expandedNodes;
  }, [expandedNodes]);

  /**
   * Show an LCARS-styled warning toast that auto-dismisses
   * @param {string} message - Warning message
   * @param {string} level - 'warning' or 'error'
   */
  const showWarning = useCallback((message, level = 'warning') => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    setWarningToast({ message, level });
    warningTimerRef.current = setTimeout(() => {
      setWarningToast(null);
      warningTimerRef.current = null;
    }, 4000);
  }, []);

  /**
   * Handle node click with expansion/collapse logic
   * Includes: debouncing, depth guard, node count guard, try/catch
   * @param {THREE.Mesh} node - The clicked node
   * @param {THREE.Scene} scene - The Three.js scene
   * @param {THREE.Mesh[]} nodesRef - Array of node references
   * @param {THREE.Line[]} connectionsRef - Array of connection references
   */
  const handleNodeClick = useCallback((node, scene, nodesRef, connectionsRef) => {
    try {
      // DEFENSIVE: Guard against null/undefined
      if (!node || !node.userData) {
        console.warn('handleNodeClick: Invalid node', node);
        return;
      }

      // DEBOUNCE: Prevent rapid-fire clicks from cascading expansions
      const now = Date.now();
      if (now - lastClickTimeRef.current < PERFORMANCE_LIMITS.CLICK_DEBOUNCE_MS) {
        return;
      }
      if (isProcessingClickRef.current) {
        return;
      }
      lastClickTimeRef.current = now;
      isProcessingClickRef.current = true;

      try {
        const nodeData = node.userData;

        // Handle media click FIRST (media nodes use mediaId, not id)
        if (nodeData.isMedia) {
          setImageError(false);
          setSelectedMedia(nodeData);
          return;
        }

        // DEFENSIVE: Guard against missing ID (for regular nodes)
        if (!nodeData.id) {
          console.warn('handleNodeClick: Node missing ID', nodeData);
          return;
        }

        // Handle regular node click
        setSelectedNode(nodeData);

        const nodeId = nodeData.id;
        const isExpanded = expandedNodesRef.current.has(nodeId);

        // DEFENSIVE: Guard against missing scene
        if (!scene) {
          console.warn('handleNodeClick: Scene not ready');
          return;
        }

        if (isExpanded) {
          // Collapse - also remove all descendant IDs from expandedNodes
          const descendantIds = getDescendantIds(nodeId, nodesRef);
          removeChildNodes(scene, node, nodesRef, connectionsRef);
          setExpandedNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(nodeId);
            descendantIds.forEach(id => newSet.delete(id));
            return newSet;
          });
        } else {
          // DEPTH GUARD: Refuse to expand beyond MAX_EXPANSION_DEPTH
          const depth = getNodeDepth(nodeId, nodesRef);
          if (depth >= PERFORMANCE_LIMITS.MAX_EXPANSION_DEPTH) {
            showWarning(
              `DEPTH LIMIT -- Maximum expansion depth (${PERFORMANCE_LIMITS.MAX_EXPANSION_DEPTH}) reached. Collapse some nodes first.`
            );
            return;
          }

          // NODE COUNT GUARD: Check total visible node count before expanding
          const currentNodeCount = nodesRef.length;
          if (currentNodeCount >= PERFORMANCE_LIMITS.MAX_VISIBLE_NODES) {
            showWarning(
              `NODE LIMIT -- Maximum visible nodes (${PERFORMANCE_LIMITS.MAX_VISIBLE_NODES}) reached. Collapse some branches to continue.`,
              'error'
            );
            return;
          }

          // NODE COUNT WARNING: Warn when approaching limit
          if (currentNodeCount >= PERFORMANCE_LIMITS.NODE_WARNING_THRESHOLD) {
            showWarning(
              `SYSTEM ADVISORY -- ${currentNodeCount} nodes active. Approaching limit of ${PERFORMANCE_LIMITS.MAX_VISIBLE_NODES}. Consider collapsing unused branches.`
            );
          }

          // Expand
          let hasExpanded = false;

          // DEFENSIVE: Check children exists and is array before accessing
          if (Array.isArray(nodeData.children) && nodeData.children.length > 0) {
            createChildNodes(scene, node, nodesRef, connectionsRef);
            hasExpanded = true;
          }

          // DEFENSIVE: Check media exists and is array before accessing
          if (Array.isArray(nodeData.media) && nodeData.media.length > 0) {
            createMediaNodes(scene, node, nodesRef, connectionsRef);
            hasExpanded = true;
          }

          // Add to expanded nodes if anything was created
          if (hasExpanded) {
            setExpandedNodes(prev => new Set(prev).add(nodeId));
          }
        }
      } finally {
        isProcessingClickRef.current = false;
      }
    } catch (error) {
      isProcessingClickRef.current = false;
      console.error('handleNodeClick: Error occurred', {
        error: error.message,
        stack: error.stack,
        nodeId: node?.userData?.id,
        nodeLabel: node?.userData?.label,
      });
      showWarning(
        `EXPANSION ERROR -- Unable to process node: ${node?.userData?.label || 'Unknown'}. Try collapsing some branches.`,
        'error'
      );
    }
  }, [showWarning]);

  /**
   * Update hovered node state (optimized to avoid excessive updates)
   * @param {Object|null} nodeData - The hovered node's userData, or null
   */
  const updateHoveredNode = useCallback((nodeData) => {
    if (hoveredNodeRef.current !== nodeData) {
      hoveredNodeRef.current = nodeData;
      setHoveredNode(nodeData);
    }
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Close media viewer
   */
  const closeMedia = useCallback(() => {
    setSelectedMedia(null);
    setImageError(false);
  }, []);

  /**
   * Dismiss warning toast
   */
  const dismissWarning = useCallback(() => {
    setWarningToast(null);
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  }, []);

  return {
    // State
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

    // Handlers
    handleNodeClick,
    updateHoveredNode,
    clearSelection,
    closeMedia,
    dismissWarning,
  };
}
