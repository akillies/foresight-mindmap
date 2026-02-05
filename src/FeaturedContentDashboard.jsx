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
};

/**
 * Featured Content Dashboard - Showcases the rich media library
 * Makes 142+ media items discoverable and prominent
 */
const FeaturedContentDashboard = ({ onMediaClick, isVisible = true }) => {
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [featuredDiagram, setFeaturedDiagram] = useState(null);
  const [contentStats, setContentStats] = useState({ videos: 0, images: 0, articles: 0, documents: 0, total: 0 });
  const [allVideos, setAllVideos] = useState([]);
  const [localDiagrams, setLocalDiagrams] = useState([]);

  // Extract all media from mindMapData
  useEffect(() => {
    const extractAllMedia = () => {
      const allMedia = [];
      const videos = [];
      const diagrams = [];
      const stats = { videos: 0, images: 0, articles: 0, documents: 0, total: 0 };

      // Process center node
      if (mindMapData.center && mindMapData.center.media) {
        mindMapData.center.media.forEach(item => {
          allMedia.push({ ...item, source: 'Strategic Foresight' });
          stats[item.type + 's'] = (stats[item.type + 's'] || 0) + 1;
          stats.total++;

          if (item.type === 'video') {
            videos.push({ ...item, source: 'Strategic Foresight' });
          }
        });
      }

      // Process level 1 nodes
      if (mindMapData.level1) {
        mindMapData.level1.forEach(pillar => {
          if (pillar.media) {
            pillar.media.forEach(item => {
              allMedia.push({ ...item, source: pillar.label });
              stats[item.type + 's'] = (stats[item.type + 's'] || 0) + 1;
              stats.total++;

              if (item.type === 'video') {
                videos.push({ ...item, source: pillar.label });
              }
            });
          }
        });
      }

      // Process level 2 nodes (methodologies)
      if (mindMapData.level2) {
        mindMapData.level2.forEach(methodology => {
          if (methodology.media) {
            methodology.media.forEach(item => {
              allMedia.push({ ...item, source: methodology.label });
              stats[item.type + 's'] = (stats[item.type + 's'] || 0) + 1;
              stats.total++;

              if (item.type === 'video') {
                videos.push({ ...item, source: methodology.label });
              }

              // Track local diagrams (from /diagrams/ folder)
              if (item.type === 'image' && item.url && item.url.startsWith('/diagrams/')) {
                diagrams.push({ ...item, source: methodology.label });
              }
            });
          }
        });
      }

      setAllVideos(videos);
      setLocalDiagrams(diagrams);
      setContentStats(stats);

      // Set initial featured content
      if (videos.length > 0) {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        setFeaturedVideo(randomVideo);
      }

      if (diagrams.length > 0) {
        const randomDiagram = diagrams[Math.floor(Math.random() * diagrams.length)];
        setFeaturedDiagram(randomDiagram);
      }
    };

    extractAllMedia();
  }, []);

  // Rotate featured content every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (allVideos.length > 0) {
        const randomVideo = allVideos[Math.floor(Math.random() * allVideos.length)];
        setFeaturedVideo(randomVideo);
      }

      if (localDiagrams.length > 0) {
        const randomDiagram = localDiagrams[Math.floor(Math.random() * localDiagrams.length)];
        setFeaturedDiagram(randomDiagram);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [allVideos, localDiagrams]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '320px',
        zIndex: 10,
        background: '#000000',
        border: `4px solid ${COLORS.accent}`,
        borderRadius: '20px',
        padding: '20px',
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        boxShadow: `0 0 30px ${COLORS.accent}40`,
      }}
    >
      {/* Header */}
      <h2
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.highlight} 100%)`,
          padding: '12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#000',
          letterSpacing: '2px',
          textAlign: 'center',
          fontFamily: 'monospace',
          margin: '0 0 20px 0',
        }}
      >
        CONTENT LIBRARY
      </h2>

      {/* Content Statistics */}
      <div
        style={{
          background: `${COLORS.primary}15`,
          border: `2px solid ${COLORS.primary}60`,
          borderRadius: '12px',
          padding: '15px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: COLORS.primary, marginBottom: '12px', textAlign: 'center' }}>
          CURATED RESOURCES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.secondary }}>{contentStats.videos}</div>
            <div style={{ fontSize: '10px', color: COLORS.secondary, opacity: 0.8 }}>VIDEOS</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.accent }}>{contentStats.images}</div>
            <div style={{ fontSize: '10px', color: COLORS.accent, opacity: 0.8 }}>DIAGRAMS</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.pink }}>{contentStats.articles}</div>
            <div style={{ fontSize: '10px', color: COLORS.pink, opacity: 0.8 }}>ARTICLES</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.success }}>{contentStats.documents}</div>
            <div style={{ fontSize: '10px', color: COLORS.success, opacity: 0.8 }}>PAPERS</div>
          </div>
        </div>
        <div
          style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: `1px solid ${COLORS.primary}40`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.highlight }}>{contentStats.total}+</div>
          <div style={{ fontSize: '10px', color: COLORS.highlight, opacity: 0.8, letterSpacing: '1px' }}>RESOURCES TO EXPLORE</div>
          <div style={{ fontSize: '9px', color: COLORS.highlight, opacity: 0.6, marginTop: '4px', fontStyle: 'italic' }}>
            Click any node to discover more
          </div>
        </div>
      </div>

      {/* Featured Video */}
      {featuredVideo && (
        <div
          style={{
            background: `${COLORS.secondary}15`,
            border: `2px solid ${COLORS.secondary}60`,
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: COLORS.secondary, marginBottom: '10px' }}>
            FEATURED VIDEO
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px', lineHeight: '1.3' }}>
            {featuredVideo.title}
          </div>
          <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '10px', lineHeight: '1.4' }}>
            {featuredVideo.description}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {featuredVideo.year && (
              <span
                style={{
                  background: `${COLORS.warning}30`,
                  border: `1px solid ${COLORS.warning}60`,
                  color: COLORS.warning,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '600',
                }}
              >
                {featuredVideo.year}
              </span>
            )}
            <span
              style={{
                background: `${COLORS.pink}30`,
                border: `1px solid ${COLORS.pink}60`,
                color: COLORS.pink,
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: '600',
              }}
            >
              {featuredVideo.source}
            </span>
          </div>
          <button
            onClick={() => onMediaClick && onMediaClick(featuredVideo)}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.secondary}40 0%, ${COLORS.pink}40 100%)`,
              border: `2px solid ${COLORS.secondary}`,
              color: COLORS.secondary,
              padding: '10px',
              borderRadius: '10px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = `0 0 15px ${COLORS.secondary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            WATCH NOW
          </button>
        </div>
      )}

      {/* Featured Diagram */}
      {featuredDiagram && (
        <div
          style={{
            background: `${COLORS.accent}15`,
            border: `2px solid ${COLORS.accent}60`,
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: COLORS.accent, marginBottom: '10px' }}>
            CUSTOM DIAGRAM
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
            }}
          >
            <img
              src={featuredDiagram.url}
              alt={featuredDiagram.title}
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px', lineHeight: '1.3' }}>
            {featuredDiagram.title}
          </div>
          <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '10px', lineHeight: '1.4' }}>
            {featuredDiagram.description}
          </div>
          <button
            onClick={() => onMediaClick && onMediaClick(featuredDiagram)}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.accent}40 0%, ${COLORS.highlight}40 100%)`,
              border: `2px solid ${COLORS.accent}`,
              color: COLORS.accent,
              padding: '10px',
              borderRadius: '10px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = `0 0 15px ${COLORS.accent}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            VIEW DIAGRAM
          </button>
        </div>
      )}

      {/* Quick Stats Footer */}
      <div
        style={{
          fontSize: '9px',
          color: '#777',
          textAlign: 'center',
          padding: '10px',
          borderTop: `1px solid ${COLORS.accent}40`,
          letterSpacing: '1px',
        }}
      >
        {localDiagrams.length} CUSTOM DIAGRAMS • {allVideos.length} HISTORICAL VIDEOS
        <br />
        CONTENT ROTATES EVERY 30 SECONDS
      </div>
    </div>
  );
};

export default FeaturedContentDashboard;
