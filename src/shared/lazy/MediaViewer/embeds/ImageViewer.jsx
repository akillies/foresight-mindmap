import React, { useState } from 'react';
import { COLORS } from '@shared/constants';

/**
 * Image Viewer Component
 *
 * Displays images with zoom capability
 */
const ImageViewer = ({
  url,
  sourceUrl,
  title,
  description,
  source,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageUrl = sourceUrl || url;

  if (hasError) {
    return (
      <div
        style={{
          background: `${COLORS.secondary}15`,
          border: `2px solid ${COLORS.secondary}40`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>
          &#128444;
        </div>
        <div style={{ color: COLORS.text, marginBottom: '8px', fontSize: '16px' }}>
          {title}
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: '13px' }}>
          Image could not be loaded
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Image container */}
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={imageUrl}
          alt={title}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: isZoomed ? 'none' : '400px',
            objectFit: 'contain',
            borderRadius: '8px',
            transition: 'max-height 0.3s ease',
          }}
        />
      </div>

      {/* Caption */}
      {description && (
        <div
          style={{
            color: COLORS.textMuted,
            fontSize: '13px',
            lineHeight: '1.5',
            marginTop: '12px',
            fontStyle: 'italic',
          }}
        >
          {description}
        </div>
      )}

      {/* Source citation footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: `1px solid ${COLORS.secondary}30`,
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        <span style={{ color: COLORS.textMuted, letterSpacing: '1px' }}>
          SOURCE:{' '}
          <span style={{ color: COLORS.secondary }}>
            {source?.toUpperCase() || 'LOCAL DIAGRAM'}
          </span>
        </span>
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          style={{
            background: 'transparent',
            border: `1px solid ${COLORS.secondary}`,
            color: COLORS.secondary,
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'monospace',
            letterSpacing: '1px',
          }}
        >
          {isZoomed ? 'COLLAPSE' : 'EXPAND'}
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
