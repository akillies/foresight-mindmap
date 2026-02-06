/**
 * useNodeInteraction Hook
 * Manages node click, hover, and expansion state
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  createChildNodes,
  createMediaNodes,
  removeChildNodes,
  getDescendantIds,
} from '../scene/NodeFactory';

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

  // Ref to track expanded nodes for stale closure prevention
  const expandedNodesRef = useRef(new Set());

  // Ref to track hovered node to avoid excessive state updates
  const hoveredNodeRef = useRef(null);

  // Keep expandedNodesRef in sync with expandedNodes state
  useEffect(() => {
    expandedNodesRef.current = expandedNodes;
  }, [expandedNodes]);

  /**
   * Handle node click with expansion/collapse logic
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
    } catch (error) {
      console.error('handleNodeClick: Error occurred', {
        error: error.message,
        stack: error.stack,
        nodeId: node?.userData?.id,
        nodeLabel: node?.userData?.label,
      });
      alert(`Unable to open node: ${node?.userData?.label || 'Unknown'}. Error: ${error.message}`);
    }
  }, []);

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

    // Handlers
    handleNodeClick,
    updateHoveredNode,
    clearSelection,
    closeMedia,
  };
}
