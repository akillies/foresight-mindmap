import React, { useState, useEffect } from 'react';
import mindMapData from './mindMapData';

// LCARS color palette
const COLORS = {
  primary: '#5C88DA',
  secondary: '#FF6B9D',
  accent: '#FFCC66',
  highlight: '#99CCFF',
  pink: '#CC99CC',
  success: '#77DD77',
  warning: '#FFB366',
  text: '#E8F1FF',
  panel: '#1A1A2E',
};

/**
 * Diagram Gallery
 * Dedicated showcase for all 15 custom SVG framework diagrams
 * Optimized for viewing educational/framework diagrams with larger previews
 */
const DiagramGallery = ({ isOpen, onClose, onDiagramClick }) => {
  const [diagrams, setDiagrams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiagrams, setFilteredDiagrams] = useState([]);

  // Extract all diagrams from mind map data
  useEffect(() => {
    const extractDiagrams = () => {
      const allDiagrams = [];

      // Helper to process media arrays
      const processMedia = (mediaArray, source, sourceColor) => {
        if (!mediaArray) return;
        mediaArray.forEach(item => {
          // Only include items with /diagrams/ in the URL
          if (item.url && item.url.includes('/diagrams/')) {
            allDiagrams.push({
              ...item,
              source,
              sourceColor,
            });
          }
        });
      };

      // Process center node
      if (mindMapData.center && mindMapData.center.media) {
        processMedia(
          mindMapData.center.media,
          mindMapData.center.label.replace(/\\n/g, ' '),
          mindMapData.center.color
        );
      }

      // Process level 1 nodes (pillars)
      if (mindMapData.level1) {
        mindMapData.level1.forEach(pillar => {
          processMedia(pillar.media, pillar.label, pillar.color);
        });
      }

      // Process level 2 nodes (methodologies)
      if (mindMapData.level2) {
        mindMapData.level2.forEach(methodology => {
          processMedia(methodology.media, methodology.label, methodology.color);
        });
      }

      return allDiagrams;
    };

    const extracted = extractDiagrams();
    setDiagrams(extracted);
    setFilteredDiagrams(extracted);
  }, []);

  // Categorize diagrams
  const categories = {
    all: 'All Diagrams',
    framework: 'Frameworks',
    lifecycle: 'Lifecycles',
    process: 'Processes',
    matrix: 'Matrices',
  };

  // Categorization logic
  const categorizeDiagram = (diagram) => {
    const title = diagram.title.toLowerCase();
    if (title.includes('lifecycle') || title.includes('cycle')) return 'lifecycle';
    if (title.includes('matrix')) return 'matrix';
    if (title.includes('process') || title.includes('method')) return 'process';
    return 'framework';
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...diagrams];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(d => categorizeDiagram(d) === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(query) ||
        (d.description && d.description.toLowerCase().includes(query)) ||
        d.source.toLowerCase().includes(query)
      );
    }

    setFilteredDiagrams(filtered);
  }, [diagrams, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          height: '90vh',
          background: COLORS.panel,
          border: `3px solid ${COLORS.accent}`,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.secondary} 100%)`,
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              color: '#000',
              letterSpacing: '3px',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}>
              DIAGRAM GALLERY
            </h2>
            <div style={{
              fontSize: '13px',
              color: '#00000080',
              fontWeight: '600',
              letterSpacing: '1px',
            }}>
              {filteredDiagrams.length} of {diagrams.length} framework diagrams
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#000',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div style={{
          padding: '20px 30px',
          background: '#00000040',
          borderBottom: `2px solid ${COLORS.accent}40`,
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-end',
        }}>
          {/* Category Tabs */}
          <div style={{ flex: 1 }}>
            <label style={{
              fontSize: '10px',
              color: COLORS.accent,
              fontWeight: '700',
              letterSpacing: '1.5px',
              marginBottom: '8px',
              display: 'block',
              fontFamily: 'monospace',
            }}>
              CATEGORY
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  style={{
                    background: selectedCategory === key ? COLORS.accent : 'transparent',
                    border: `2px solid ${COLORS.accent}`,
                    color: selectedCategory === key ? '#000' : COLORS.accent,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    transition: 'all 0.2s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{ width: '300px' }}>
            <label style={{
              fontSize: '10px',
              color: COLORS.accent,
              fontWeight: '700',
              letterSpacing: '1.5px',
              marginBottom: '8px',
              display: 'block',
              fontFamily: 'monospace',
            }}>
              SEARCH
            </label>
            <input
              type="text"
              placeholder="Search diagrams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#000',
                border: `2px solid ${COLORS.primary}`,
                color: '#fff',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>

        {/* Diagram Grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px',
        }}>
          {filteredDiagrams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9AA5B8' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: COLORS.accent, fontFamily: 'monospace', fontWeight: '700' }}>[NO RESULTS]</div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>No diagrams found</div>
              <div style={{ fontSize: '13px', marginTop: '8px' }}>Try adjusting your filters</div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '30px'
            }}>
              {filteredDiagrams.map((diagram, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Convert diagram to media format for modal
                    const mediaItem = {
                      type: 'image',
                      title: diagram.title,
                      url: diagram.url,
                      description: diagram.description,
                    };
                    onDiagramClick && onDiagramClick(mediaItem);
                    onClose();
                  }}
                  style={{
                    background: `${COLORS.accent}10`,
                    border: `3px solid ${COLORS.accent}40`,
                    borderRadius: '15px',
                    padding: '0',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    color: '#fff',
                    fontFamily: 'inherit',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${COLORS.accent}40`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Diagram Preview */}
                  <div style={{
                    width: '100%',
                    height: '240px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    borderBottom: `3px solid ${COLORS.accent}40`,
                  }}>
                    <img
                      src={diagram.url}
                      alt={diagram.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  {/* Diagram Info */}
                  <div style={{ padding: '20px', textAlign: 'left' }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: COLORS.accent,
                      marginBottom: '10px',
                      lineHeight: '1.3',
                      letterSpacing: '0.5px',
                    }}>
                      {diagram.title}
                    </div>

                    {diagram.description && (
                      <div style={{
                        fontSize: '12px',
                        color: '#b8c5d8',
                        lineHeight: '1.5',
                        marginBottom: '12px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {diagram.description}
                      </div>
                    )}

                    {/* Metadata */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: `${diagram.sourceColor || COLORS.primary}30`,
                        border: `1px solid ${diagram.sourceColor || COLORS.primary}60`,
                        color: diagram.sourceColor || COLORS.primary,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                      }}>
                        {diagram.source}
                      </span>

                      <span style={{
                        background: `${COLORS.success}30`,
                        border: `1px solid ${COLORS.success}60`,
                        color: COLORS.success,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                      }}>
                        {categorizeDiagram(diagram).toUpperCase()}
                      </span>
                    </div>

                    {/* View Button */}
                    <div style={{
                      marginTop: '15px',
                      padding: '10px',
                      background: `${COLORS.accent}20`,
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      color: COLORS.accent,
                    }}>
                      CLICK TO VIEW FULL SIZE
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagramGallery;
