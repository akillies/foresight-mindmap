import React, { useState, useEffect } from 'react';
import mindMapData from '@shared/mindMapData';
import { COLORS } from '@shared/constants';

const MEDIA_TYPE_COLORS = {
  video: COLORS.pink,         // Pink
  image: COLORS.secondary,    // Gold
  article: COLORS.secondary,     // Lavender
  document: COLORS.primary,   // Blue
  podcast: COLORS.warningLight, // Orange
};

const MEDIA_TYPE_LABELS = {
  video: 'VIDEO',
  image: 'IMAGE',
  article: 'ARTICLE',
  document: 'PAPER',
  podcast: 'PODCAST',
};

/**
 * Global Media Browser
 * Browse all 142+ media items across the entire knowledge base
 * Filter by type, year, methodology
 */
const GlobalMediaBrowser = ({ isOpen, onClose, onMediaClick }) => {
  const [allMedia, setAllMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all media from mind map data
  useEffect(() => {
    const extractAllMedia = () => {
      const media = [];

      // Process center node
      if (mindMapData.center && mindMapData.center.media) {
        mindMapData.center.media.forEach(item => {
          media.push({
            ...item,
            source: mindMapData.center.label.replace(/\\n/g, ' '),
            sourceColor: mindMapData.center.color,
            level: 0,
          });
        });
      }

      // Process level 1 nodes (pillars)
      if (mindMapData.level1) {
        mindMapData.level1.forEach(pillar => {
          if (pillar.media) {
            pillar.media.forEach(item => {
              media.push({
                ...item,
                source: pillar.label,
                sourceColor: pillar.color,
                level: 1,
              });
            });
          }
        });
      }

      // Process methodologies
      if (mindMapData.methodologies) {
        mindMapData.methodologies.forEach(methodology => {
          if (methodology.media) {
            methodology.media.forEach(item => {
              media.push({
                ...item,
                source: methodology.label,
                sourceColor: methodology.color,
                level: 2,
              });
            });
          }
        });
      }

      return media;
    };

    const media = extractAllMedia();
    setAllMedia(media);
    setFilteredMedia(media);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allMedia];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    // Filter by year
    if (filterYear !== 'all') {
      filtered = filtered.filter(item => item.year && item.year.toString() === filterYear);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.source.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => (a.year || 9999) - (b.year || 9999));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMedia(filtered);
  }, [allMedia, filterType, filterYear, sortBy, searchQuery]);

  // Get unique years
  const years = ['all', ...new Set(
    allMedia
      .filter(item => item.year)
      .map(item => item.year)
      .sort((a, b) => b - a)
  )];

  // Get type counts
  const typeCounts = {
    all: allMedia.length,
    video: allMedia.filter(m => m.type === 'video').length,
    image: allMedia.filter(m => m.type === 'image').length,
    article: allMedia.filter(m => m.type === 'article').length,
    document: allMedia.filter(m => m.type === 'document').length,
    podcast: allMedia.filter(m => m.type === 'podcast').length,
  };

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
          maxWidth: '1200px',
          height: '90vh',
          background: COLORS.panel,
          border: `3px solid ${COLORS.primary}`,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              color: COLORS.background,
              letterSpacing: '2px',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}>
              GLOBAL MEDIA BROWSER
            </h2>
            <div style={{
              fontSize: '12px',
              color: `${COLORS.background}80`,
              fontWeight: '600',
              letterSpacing: '1px',
            }}>
              {filteredMedia.length} of {allMedia.length} resources
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close media browser"
            style={{
              background: COLORS.background,
              border: 'none',
              color: COLORS.text,
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
          background: `${COLORS.background}40`,
          borderBottom: `2px solid ${COLORS.primary}40`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            {/* Type Filter */}
            <div>
              <label style={{
                fontSize: '10px',
                color: COLORS.secondary,
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '6px',
                display: 'block',
                fontFamily: 'monospace',
              }}>
                TYPE
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: '100%',
                  background: COLORS.background,
                  border: `2px solid ${COLORS.primary}`,
                  color: COLORS.text,
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                }}
              >
                <option value="all">ALL TYPES ({typeCounts.all})</option>
                <option value="video">VIDEOS ({typeCounts.video})</option>
                <option value="podcast">PODCASTS ({typeCounts.podcast})</option>
                <option value="article">ARTICLES ({typeCounts.article})</option>
                <option value="document">PAPERS ({typeCounts.document})</option>
                <option value="image">DIAGRAMS ({typeCounts.image})</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label style={{
                fontSize: '10px',
                color: COLORS.secondary,
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '6px',
                display: 'block',
                fontFamily: 'monospace',
              }}>
                YEAR
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                style={{
                  width: '100%',
                  background: COLORS.background,
                  border: `2px solid ${COLORS.accent}`,
                  color: COLORS.text,
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                }}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label style={{
                fontSize: '10px',
                color: COLORS.secondary,
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '6px',
                display: 'block',
                fontFamily: 'monospace',
              }}>
                SORT
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  background: COLORS.background,
                  border: `2px solid ${COLORS.info}`,
                  color: COLORS.text,
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label style={{
                fontSize: '10px',
                color: COLORS.secondary,
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '6px',
                display: 'block',
                fontFamily: 'monospace',
              }}>
                SEARCH
              </label>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: COLORS.background,
                  border: `2px solid ${COLORS.pink}`,
                  color: COLORS.text,
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px',
        }}>
          {filteredMedia.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: COLORS.textMuted }}>
              <div style={{ fontSize: '36px', marginBottom: '20px', fontFamily: 'monospace', fontWeight: '700', color: COLORS.primary }}>[NO RESULTS]</div>
              <div style={{ fontSize: '16px' }}>No media found matching your filters</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredMedia.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onMediaClick && onMediaClick(item);
                    onClose();
                  }}
                  style={{
                    background: COLORS.panel,
                    border: `2px solid ${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}50`,
                    borderLeft: `4px solid ${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}`,
                    borderRadius: '0 12px 12px 0',
                    padding: '0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: COLORS.text,
                    fontFamily: 'inherit',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = MEDIA_TYPE_COLORS[item.type] || COLORS.primary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}50`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Type Badge Header */}
                  <div style={{
                    background: MEDIA_TYPE_COLORS[item.type] || COLORS.primary,
                    padding: '6px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      color: COLORS.background,
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      fontFamily: 'monospace',
                    }}>
                      {MEDIA_TYPE_LABELS[item.type] || 'MEDIA'}
                    </span>
                    {item.year && (
                      <span style={{
                        color: COLORS.background,
                        fontSize: '10px',
                        fontWeight: '700',
                        fontFamily: 'monospace',
                      }}>
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '14px' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: COLORS.text,
                      marginBottom: '8px',
                      lineHeight: '1.4',
                    }}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div style={{
                        fontSize: '11px',
                        color: COLORS.textMuted,
                        lineHeight: '1.5',
                        marginBottom: '12px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {item.description}
                      </div>
                    )}

                    {/* Source Tag */}
                    <div style={{
                      display: 'inline-block',
                      background: `${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}20`,
                      border: `1px solid ${MEDIA_TYPE_COLORS[item.type] || COLORS.primary}40`,
                      color: MEDIA_TYPE_COLORS[item.type] || COLORS.primary,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      fontFamily: 'monospace',
                    }}>
                      {item.source}
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

export default GlobalMediaBrowser;
