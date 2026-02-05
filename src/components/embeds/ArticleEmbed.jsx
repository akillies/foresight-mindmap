import React from 'react';

const COLORS = {
  article: '#CC99CC',
  document: '#77DD77',
  text: '#E8F1FF',
  muted: '#8899AA',
};

/**
 * Article/Document Preview Component
 *
 * Rich preview card with description and link out
 */
const ArticleEmbed = ({
  type = 'article',
  url,
  sourceUrl,
  title,
  description,
  source,
  year,
}) => {
  const linkUrl = sourceUrl || url;
  const color = type === 'document' ? COLORS.document : COLORS.article;
  const icon = type === 'document' ? '\u25A0' : '\u25CF';
  const actionText = type === 'document' ? 'DOWNLOAD PDF' : 'READ ARTICLE';

  return (
    <div>
      {/* Preview Card */}
      <div
        style={{
          background: `${color}15`,
          border: `2px solid ${color}40`,
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: `${color}25`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '24px', color }}>{icon}</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: COLORS.text,
              fontWeight: '600',
              marginBottom: '6px',
              fontSize: '16px',
              lineHeight: '1.3',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '10px',
              flexWrap: 'wrap',
            }}
          >
            {year && (
              <span
                style={{
                  background: color,
                  color: '#000',
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
            {source && (
              <span
                style={{
                  background: `${color}30`,
                  color,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '600',
                  fontFamily: 'monospace',
                }}
              >
                {source}
              </span>
            )}
          </div>

          {description && (
            <div
              style={{
                color: COLORS.muted,
                fontSize: '13px',
                lineHeight: '1.6',
                marginBottom: '16px',
              }}
            >
              {description}
            </div>
          )}

          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: color,
              color: '#000',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}
          >
            {actionText}
            <span style={{ fontSize: '14px' }}>&#8599;</span>
          </a>
        </div>
      </div>

      {/* Source citation footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: `1px solid ${color}30`,
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        <span style={{ color: COLORS.muted, letterSpacing: '1px' }}>
          SOURCE:{' '}
          <span style={{ color }}>
            {source?.toUpperCase() || extractDomain(linkUrl)}
          </span>
        </span>
        <span style={{ color: COLORS.muted }}>
          {type === 'document' ? 'PDF DOCUMENT' : 'EXTERNAL LINK'}
        </span>
      </div>
    </div>
  );
};

function extractDomain(url) {
  if (!url) return 'EXTERNAL';
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.toUpperCase();
  } catch {
    return 'EXTERNAL';
  }
}

export default ArticleEmbed;
