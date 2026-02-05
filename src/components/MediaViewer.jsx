import React, { Suspense, lazy } from 'react';

// Lazy load embed components for code splitting
const YouTubeEmbed = lazy(() => import('./embeds/YouTubeEmbed'));
const PodcastEmbed = lazy(() => import('./embeds/PodcastEmbed'));
const ArticleEmbed = lazy(() => import('./embeds/ArticleEmbed'));
const ImageViewer = lazy(() => import('./embeds/ImageViewer'));

const COLORS = {
  panel: '#1A1A2E',
  text: '#E8F1FF',
  muted: '#8899AA',
};

const MEDIA_COLORS = {
  video: '#FF6B9D',
  podcast: '#CC99CC',
  article: '#CC99CC',
  document: '#77DD77',
  image: '#FFCC66',
};

/**
 * MediaViewer Modal
 *
 * Unified media viewer that routes to appropriate embed component
 * based on media type. Shows embedded content instead of just links.
 */
const MediaViewer = ({ media, onClose }) => {
  if (!media) return null;

  const color = MEDIA_COLORS[media.type] || MEDIA_COLORS.video;

  const renderContent = () => {
    switch (media.type) {
      case 'video':
        return (
          <YouTubeEmbed
            url={media.url}
            sourceUrl={media.sourceUrl}
            title={media.title}
            source={media.source}
            year={media.year}
          />
        );

      case 'podcast':
        return (
          <PodcastEmbed
            url={media.url}
            sourceUrl={media.sourceUrl}
            title={media.title}
            description={media.description}
            source={media.source}
            year={media.year}
          />
        );

      case 'article':
      case 'document':
        return (
          <ArticleEmbed
            type={media.type}
            url={media.url}
            sourceUrl={media.sourceUrl}
            title={media.title}
            description={media.description}
            source={media.source}
            year={media.year}
          />
        );

      case 'image':
        return (
          <ImageViewer
            url={media.url}
            sourceUrl={media.sourceUrl}
            title={media.title}
            description={media.description}
            source={media.source}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="media-viewer-title"
      aria-describedby="media-viewer-description"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.95)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <article
        role="document"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.panel,
          borderRadius: '16px',
          border: `2px solid ${color}`,
          padding: '30px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: `0 0 60px ${color}60`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close media viewer"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'transparent',
            border: `2px solid ${COLORS.text}`,
            color: COLORS.text,
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = color;
            e.target.style.borderColor = color;
            e.target.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = COLORS.text;
            e.target.style.color = COLORS.text;
          }}
        >
          x
        </button>

        {/* Header */}
        <header style={{ marginBottom: '20px', paddingRight: '60px' }}>
          <h2
            id="media-viewer-title"
            style={{
              color,
              margin: '0 0 10px 0',
              fontSize: '22px',
              fontWeight: '600',
              lineHeight: '1.3',
            }}
          >
            {media.title}
          </h2>

          {media.year && (
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                background: color,
                color: '#000',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '12px',
                fontFamily: 'monospace',
              }}
            >
              {media.year}
            </span>
          )}

          {media.description && (
            <p
              id="media-viewer-description"
              style={{
                color: COLORS.muted,
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              {media.description}
            </p>
          )}
        </header>

        {/* Content - Lazy Loaded */}
        <Suspense
          fallback={
            <div
              style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.muted,
                fontFamily: 'monospace',
                letterSpacing: '2px',
              }}
            >
              LOADING...
            </div>
          }
        >
          {renderContent()}
        </Suspense>
      </article>
    </div>
  );
};

export default MediaViewer;
