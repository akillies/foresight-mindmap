import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from '@shared/constants';

/**
 * YouTube Embed Component
 *
 * - Uses youtube-nocookie.com for privacy (no tracking cookies)
 * - Shows thumbnail preview until user clicks play
 * - Lazy loads iframe only when in viewport
 * - Falls back to external link if embed blocked
 */
const YouTubeEmbed = ({
  embedId,
  url,
  title,
  sourceUrl,
  source,
  year,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Extract video ID from URL if embedId not provided
  const videoId = embedId || extractYouTubeId(url || sourceUrl);
  const watchUrl = sourceUrl || url || `https://www.youtube.com/watch?v=${videoId}`;

  // Thumbnail URL
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    setIsLoaded(true);
  };

  const handleIframeError = () => {
    setHasError(true);
    onError?.();
  };

  // Error/blocked state - show link out
  if (hasError || !videoId) {
    return (
      <div
        style={{
          background: `${COLORS.pink}15`,
          border: `2px solid ${COLORS.pink}40`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: `${COLORS.pink}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '32px', color: COLORS.pink }}>&#9658;</span>
        </div>
        <div
          style={{
            color: COLORS.text,
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: COLORS.textMuted,
            marginBottom: '20px',
            fontSize: '13px',
          }}
        >
          Video embed unavailable
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: COLORS.pink,
            color: COLORS.background,
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '1px',
            fontFamily: 'monospace',
          }}
        >
          WATCH ON YOUTUBE
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {/* 16:9 Aspect Ratio Container */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '8px',
          background: COLORS.background,
        }}
      >
        {!isLoaded ? (
          // Thumbnail preview with play button
          <button
            onClick={handlePlay}
            aria-label={`Play video: ${title}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: COLORS.background,
            }}
          >
            {isInView && (
              <img
                src={thumbnail}
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  // Fallback to lower quality thumbnail
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
            )}
            {/* Play button overlay */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                background: COLORS.pink,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 20px ${COLORS.pink}60`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  color: COLORS.background,
                  marginLeft: '4px',
                }}
              >
                &#9658;
              </span>
            </div>
            {/* Duration/year badge */}
            {year && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.8)',
                  color: COLORS.pink,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'monospace',
                }}
              >
                {year}
              </span>
            )}
          </button>
        ) : (
          // Actual iframe (loaded after user clicks)
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleIframeError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        )}
      </div>

      {/* Source citation footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: `1px solid ${COLORS.pink}30`,
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        <span style={{ color: COLORS.textMuted, letterSpacing: '1px' }}>
          SOURCE:{' '}
          <span style={{ color: COLORS.pink }}>
            {source?.toUpperCase() || 'YOUTUBE'}
          </span>
        </span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.pink,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '1px',
          }}
        >
          VIEW ORIGINAL
          <span style={{ fontSize: '14px' }}>&#8599;</span>
        </a>
      </div>
    </div>
  );
};

// Helper to extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default YouTubeEmbed;
