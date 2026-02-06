/**
 * HoverTooltip Component
 * Displays node information when hovering
 */
import React from 'react';
import { COLORS } from '../constants';

/**
 * Hover Tooltip Component
 * @param {Object} props - Component props
 * @param {Object|null} props.hoveredNode - The currently hovered node data
 * @param {Object|null} props.selectedNode - The currently selected node (tooltip hidden when selected)
 */
export function HoverTooltip({ hoveredNode, selectedNode }) {
  if (!hoveredNode || selectedNode) {
    return null;
  }

  return (
    <div
      role="tooltip"
      aria-live="polite"
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(26, 26, 46, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '15px 25px',
        borderRadius: '8px',
        border: `1px solid ${hoveredNode.color || COLORS.primary}`,
        color: COLORS.text,
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        maxWidth: '400px',
        textAlign: 'center',
        pointerEvents: 'none',
        boxShadow: `0 0 20px ${hoveredNode.color || COLORS.primary}40`,
      }}
    >
      <strong>{hoveredNode.title || hoveredNode.label?.replace(/\\n/g, ' ')}</strong>
      {hoveredNode.description && (
        <div style={{ fontSize: '12px', marginTop: '5px', color: '#b8c5d8' }}>
          {hoveredNode.description}
        </div>
      )}
    </div>
  );
}

export default HoverTooltip;
