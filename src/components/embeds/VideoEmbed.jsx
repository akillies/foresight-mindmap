import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from '../../constants';

// Platform detection and configuration
const PLATFORMS = {
  youtube: {
    name: 'YouTube',
    match: (url) => url?.includes('youtube.com') || url?.includes('youtu.be'),
    extractId: (url) => {
      const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    },
    canEmbed: true,
  },
  ted: {
    name: 'TED',
    match: (url) => url?.includes('ted.com'),
    canEmbed: false,
  },
  pbs: {
    name: 'PBS',
    match: (url) => url?.includes('pbs.org'),
    canEmbed: false,
  },
  archive: {
    name: 'Internet Archive',
    match: (url) => url?.includes('archive.org'),
    canEmbed: false,
  },
  vimeo: {
    name: 'Vimeo',
    match: (url) => url?.includes('vimeo.com'),
    canEmbed: false,
  },
  dailymotion: {
    name: 'Dailymotion',
    match: (url) => url?.includes('dailymotion.com'),
    canEmbed: false,
  },
  longnow: {
    name: 'Long Now Foundation',
    match: (url) => url?.includes('longnow.org'),
    canEmbed: false,
  },
};

function detectPlatform(url) {
  for (const [key, config] of Object.entries(PLATFORMS)) {
    if (config.match(url)) {
      return { key, ...config };
    }
  }
  return { key: 'external', name: 'External Video', canEmbed: false };
}

/**
 * Video Embed Component
 *
 * Handles multiple video platforms:
 * - YouTube: Full embedded player with thumbnail preview
 * - Others: Rich preview card with link to source
 */
const VideoEmbed = ({
  url,
  sourceUrl,
  title,
  description,
  source,
  year,
}) => {
  const videoUrl = sourceUrl || url;
  const platform = detectPlatform(videoUrl);

  if (platform.key === 'youtube' && platform.canEmbed) {
    const videoId = platform.extractId(videoUrl);
    if (videoId) {
      return (
        <YouTubePlayer
          videoId={videoId}
          title={title}
          watchUrl={videoUrl}
          source={source}
          year={year}
        />
      );
    }
  }

  // For non-YouTube or failed extraction, show preview card
  return (
    <VideoCard
      title={title}
      description={description}
      url={videoUrl}
      platform={platform}
      source={source}
      year={year}
    />
  );
};

/**
 * YouTube Player with lazy loading
 */
const YouTubePlayer = ({ videoId, title, watchUrl, source, year }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

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

  if (hasError) {
    return (
      <VideoCard
        title={title}
        url={watchUrl}
        platform={{ name: 'YouTube', key: 'youtube' }}
        source={source}
      />
    );
  }

  return (
    <div ref={containerRef}>
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
          <button
            onClick={() => setIsLoaded(true)}
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
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
            )}
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
              }}
            >
              <span style={{ fontSize: '32px', color: COLORS.background, marginLeft: '4px' }}>
                &#9658;
              </span>
            </div>
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
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setHasError(true)}
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

      <SourceFooter watchUrl={watchUrl} source={source || 'YouTube'} />
    </div>
  );
};

/**
 * Video Card for non-embeddable platforms
 */
const VideoCard = ({ title, description, url, platform, source, year }) => (
  <div>
    <div
      style={{
        background: `${COLORS.pink}12`,
        border: `2px solid ${COLORS.pink}40`,
        borderRadius: '12px',
        padding: '30px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            background: `${COLORS.pink}25`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '32px', color: COLORS.pink }}>&#9658;</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: COLORS.text,
              fontWeight: '600',
              marginBottom: '8px',
              fontSize: '16px',
              lineHeight: '1.3',
            }}
          >
            {title}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {year && (
              <span
                style={{
                  background: COLORS.pink,
                  color: COLORS.background,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                }}
              >
                {year}
              </span>
            )}
            <span
              style={{
                background: `${COLORS.pink}30`,
                color: COLORS.pink,
                padding: '3px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: '600',
                fontFamily: 'monospace',
              }}
            >
              {platform.name}
            </span>
          </div>

          {description && (
            <div
              style={{
                color: COLORS.textMuted,
                fontSize: '13px',
                lineHeight: '1.5',
                marginBottom: '16px',
              }}
            >
              {description}
            </div>
          )}

          <a
            href={url}
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
            WATCH ON {platform.name.toUpperCase()}
            <span style={{ fontSize: '14px' }}>&#8599;</span>
          </a>
        </div>
      </div>
    </div>

    <SourceFooter watchUrl={url} source={source || platform.name} />
  </div>
);

const SourceFooter = ({ watchUrl, source }) => (
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
      SOURCE: <span style={{ color: COLORS.pink }}>{source?.toUpperCase()}</span>
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
);

export default VideoEmbed;
