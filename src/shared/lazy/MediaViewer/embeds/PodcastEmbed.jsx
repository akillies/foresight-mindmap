import React, { useState } from 'react';
import { COLORS } from '@shared/constants';

/**
 * Podcast Embed Component
 *
 * Supports:
 * - Spotify: iframe embed player
 * - Apple Podcasts: iframe embed player
 * - Others: Rich card with link out
 */
const PodcastEmbed = ({
  url,
  sourceUrl,
  title,
  description,
  source,
  year,
}) => {
  const podcastUrl = sourceUrl || url;
  const platform = detectPlatform(podcastUrl);

  const renderEmbed = () => {
    switch (platform.type) {
      case 'spotify':
        return (
          <SpotifyEmbed
            embedId={platform.id}
            embedType={platform.subtype}
            title={title}
            sourceUrl={podcastUrl}
          />
        );

      case 'apple':
        return (
          <ApplePodcastsEmbed
            embedUrl={platform.embedUrl}
            title={title}
            sourceUrl={podcastUrl}
          />
        );

      default:
        return (
          <PodcastCard
            title={title}
            description={description}
            sourceUrl={podcastUrl}
            source={source}
            year={year}
          />
        );
    }
  };

  return (
    <div>
      {renderEmbed()}

      {/* Source citation footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: `1px solid ${COLORS.accent}30`,
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        <span style={{ color: COLORS.textMuted, letterSpacing: '1px' }}>
          SOURCE:{' '}
          <span style={{ color: COLORS.accent }}>
            {source?.toUpperCase() || platform.type?.toUpperCase() || 'PODCAST'}
          </span>
        </span>
        <a
          href={podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.accent,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '1px',
          }}
        >
          OPEN IN APP
          <span style={{ fontSize: '14px' }}>&#8599;</span>
        </a>
      </div>
    </div>
  );
};

/**
 * Spotify Embed Component
 */
const SpotifyEmbed = ({ embedId, embedType = 'show', title, sourceUrl }) => {
  const [hasError, setHasError] = useState(false);

  const embedUrl = `https://open.spotify.com/embed/${embedType}/${embedId}?utm_source=generator&theme=0`;

  if (hasError) {
    return <PodcastCard title={title} sourceUrl={sourceUrl} source="Spotify" />;
  }

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
        onError={() => setHasError(true)}
        style={{
          borderRadius: '12px',
          background: COLORS.background,
        }}
      />
    </div>
  );
};

/**
 * Apple Podcasts Embed Component
 */
const ApplePodcastsEmbed = ({ embedUrl, title, sourceUrl }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <PodcastCard title={title} sourceUrl={sourceUrl} source="Apple Podcasts" />
    );
  }

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        frameBorder="0"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        allow="autoplay *; encrypted-media *; fullscreen *"
        loading="lazy"
        title={title}
        onError={() => setHasError(true)}
        style={{
          borderRadius: '12px',
          background: COLORS.panel,
        }}
      />
    </div>
  );
};

/**
 * Fallback Podcast Card
 */
const PodcastCard = ({ title, description, sourceUrl, source, year }) => (
  <div
    style={{
      background: `${COLORS.accent}15`,
      border: `2px solid ${COLORS.accent}40`,
      borderRadius: '12px',
      padding: '30px',
    }}
  >
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* Podcast icon */}
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '12px',
          background: `${COLORS.accent}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '28px', color: COLORS.accent }}>&#9835;</span>
      </div>

      {/* Content */}
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

        {year && (
          <span
            style={{
              display: 'inline-block',
              background: COLORS.accent,
              color: COLORS.background,
              padding: '3px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '700',
              marginBottom: '10px',
              fontFamily: 'monospace',
            }}
          >
            {year}
          </span>
        )}

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
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: COLORS.accent,
            color: COLORS.background,
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '1px',
            fontFamily: 'monospace',
          }}
        >
          LISTEN NOW
          <span style={{ fontSize: '14px' }}>&#8599;</span>
        </a>
      </div>
    </div>
  </div>
);

/**
 * Detect podcast platform from URL
 */
function detectPlatform(url) {
  if (!url) return { type: 'generic' };

  // Spotify
  if (url.includes('spotify.com')) {
    const match = url.match(
      /spotify\.com\/(show|episode|playlist)\/([a-zA-Z0-9]+)/
    );
    if (match) {
      return { type: 'spotify', subtype: match[1], id: match[2] };
    }
    console.warn('[PodcastEmbed] Could not extract Spotify ID from URL:', url);
    return { type: 'generic' };
  }

  // Apple Podcasts
  if (url.includes('podcasts.apple.com')) {
    // Extract podcast ID for embed
    const match = url.match(/\/id(\d+)/);
    if (match) {
      // Build embed URL
      const embedUrl = `https://embed.podcasts.apple.com/us/podcast/id${match[1]}?theme=dark`;
      return { type: 'apple', id: match[1], embedUrl };
    }
    console.warn('[PodcastEmbed] Could not extract Apple Podcasts ID from URL:', url);
    return { type: 'generic' };
  }

  // Long Now
  if (url.includes('longnow.org')) {
    return { type: 'longnow', source: 'Long Now Foundation' };
  }

  // IFTF
  if (url.includes('iftf.org')) {
    return { type: 'iftf', source: 'Institute for the Future' };
  }

  return { type: 'generic' };
}

export default PodcastEmbed;
