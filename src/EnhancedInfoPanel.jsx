import React, { useState } from 'react';

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
 * Enhanced Info Panel with Tabs
 * Surfaces rich content from methodology data:
 * - Overview (description, pioneers, history)
 * - Media (videos, images, articles, documents)
 * - Process (step-by-step guide)
 * - Cases (worked examples)
 */
const EnhancedInfoPanel = ({ selectedNode, isOpen, onClose, onToggle, onMediaClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedNode) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'media', label: 'Media', icon: '🎬', count: selectedNode.media?.length || 0 },
    { id: 'process', label: 'Process', icon: '📝', visible: selectedNode.processGuide || selectedNode.steps },
    { id: 'cases', label: 'Cases', icon: '💼', visible: selectedNode.caseStudies && selectedNode.caseStudies.length > 0 },
  ].filter(tab => tab.visible !== false);

  return (
    <aside
      role="region"
      aria-labelledby="selected-node-title"
      aria-label={`Detailed information about ${selectedNode.label?.replace(/\\n/g, ' ')}`}
      style={{
        position: 'absolute',
        top: '0',
        right: isOpen ? '0' : '-500px',
        width: '500px',
        height: '100vh',
        background: 'rgba(26, 26, 46, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '0',
        overflowY: 'auto',
        borderLeft: `2px solid ${selectedNode.color || COLORS.primary}`,
        color: COLORS.text,
        fontFamily: 'Inter, sans-serif',
        transition: 'right 0.3s ease',
        boxShadow: `-10px 0 40px ${selectedNode.color || COLORS.primary}30`,
        zIndex: 100,
      }}
    >
      {/* Collapse toggle button */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close info panel' : 'Open info panel'}
        style={{
          position: 'absolute',
          left: '-40px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '80px',
          background: selectedNode.color || COLORS.primary,
          border: 'none',
          borderRadius: '8px 0 0 8px',
          color: '#000',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {isOpen ? '▶' : '◀'}
      </button>

      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(26, 26, 46, 0.98)',
        borderBottom: `2px solid ${selectedNode.color || COLORS.primary}40`,
        padding: '30px 30px 20px 30px',
        zIndex: 10,
      }}>
        <button
          onClick={onClose}
          aria-label="Close information panel"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: `2px solid ${COLORS.text}`,
            color: COLORS.text,
            fontSize: '20px',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = COLORS.text;
            e.target.style.color = COLORS.panel;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = COLORS.text;
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <h2
            id="selected-node-title"
            style={{
              margin: '0',
              fontSize: '24px',
              color: selectedNode.color || COLORS.primary,
              letterSpacing: '1px',
            }}
          >
            {selectedNode.label?.replace(/\\n/g, ' ')}
          </h2>
          {selectedNode.yearIntroduced && (
            <span
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: `${selectedNode.color || COLORS.primary}20`,
                border: `1px solid ${selectedNode.color || COLORS.primary}`,
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700',
                color: selectedNode.color || COLORS.primary,
                letterSpacing: '1px',
                fontFamily: 'monospace',
              }}
            >
              {selectedNode.yearIntroduced}
            </span>
          )}
        </div>

        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#b8c5d8',
          marginBottom: '20px',
        }}>
          {selectedNode.description}
        </p>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: `1px solid ${selectedNode.color || COLORS.primary}40`,
          paddingBottom: '0',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${selectedNode.color || COLORS.primary}40 0%, ${selectedNode.color || COLORS.primary}20 100%)`
                  : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? `3px solid ${selectedNode.color || COLORS.primary}` : '3px solid transparent',
                color: activeTab === tab.id ? selectedNode.color || COLORS.primary : '#888',
                padding: '12px 16px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = selectedNode.color || COLORS.primary;
                  e.target.style.background = `${selectedNode.color || COLORS.primary}10`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = '#888';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span style={{
                  background: selectedNode.color || COLORS.primary,
                  color: '#000',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '700',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '30px' }}>
        {activeTab === 'overview' && <OverviewTab selectedNode={selectedNode} />}
        {activeTab === 'media' && <MediaTab selectedNode={selectedNode} onMediaClick={onMediaClick} />}
        {activeTab === 'process' && <ProcessTab selectedNode={selectedNode} />}
        {activeTab === 'cases' && <CasesTab selectedNode={selectedNode} />}
      </div>
    </aside>
  );
};

// Overview Tab Component
const OverviewTab = ({ selectedNode }) => (
  <>
    {/* Pioneers */}
    {selectedNode.pioneers && selectedNode.pioneers.length > 0 && (
      <section aria-labelledby="pioneers-heading" style={{ marginBottom: '24px' }}>
        <h3 style={{
          color: COLORS.secondary,
          fontSize: '12px',
          letterSpacing: '2px',
          marginBottom: '12px',
          fontWeight: '700',
          fontFamily: 'monospace',
          margin: '0 0 12px 0',
        }}>
          PIONEERS
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedNode.pioneers.map((pioneer, idx) => (
            <div
              key={idx}
              style={{
                background: `${selectedNode.color || COLORS.primary}10`,
                border: `1px solid ${selectedNode.color || COLORS.primary}40`,
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: selectedNode.color || COLORS.primary,
                marginBottom: '4px',
              }}>
                {pioneer.name}
              </div>
              <div style={{
                fontSize: '11px',
                color: COLORS.secondary,
                marginBottom: '6px',
                fontStyle: 'italic',
              }}>
                {pioneer.role} • {pioneer.organization}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#b8c5d8',
                lineHeight: '1.5',
              }}>
                {pioneer.contribution}
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Historical Context */}
    {selectedNode.historicalContext && (
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          color: COLORS.accent,
          fontSize: '12px',
          letterSpacing: '2px',
          marginBottom: '12px',
          fontWeight: '700',
          fontFamily: 'monospace',
        }}>
          HISTORICAL CONTEXT
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#b8c5d8' }}>
          {selectedNode.historicalContext}
        </p>
      </section>
    )}

    {/* Details */}
    {selectedNode.details && (
      <section style={{ marginBottom: '24px' }}>
        {selectedNode.details.overview && (
          <>
            <h3 style={{
              color: COLORS.highlight,
              fontSize: '12px',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}>
              OVERVIEW
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#b8c5d8', marginBottom: '20px' }}>
              {selectedNode.details.overview}
            </p>
          </>
        )}

        {selectedNode.details.philosophy && Array.isArray(selectedNode.details.philosophy) && (
          <>
            <h3 style={{
              color: COLORS.pink,
              fontSize: '12px',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}>
              CORE PRINCIPLES
            </h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#b8c5d8' }}>
              {selectedNode.details.philosophy.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </section>
    )}
  </>
);

// Media Tab Component
const MediaTab = ({ selectedNode, onMediaClick }) => {
  if (!selectedNode.media || selectedNode.media.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div style={{ fontSize: '14px' }}>No media items available for this node.</div>
      </div>
    );
  }

  const mediaByType = {
    video: selectedNode.media.filter(m => m.type === 'video'),
    image: selectedNode.media.filter(m => m.type === 'image'),
    article: selectedNode.media.filter(m => m.type === 'article'),
    document: selectedNode.media.filter(m => m.type === 'document'),
  };

  const typeColors = {
    video: COLORS.secondary,
    image: COLORS.accent,
    article: COLORS.pink,
    document: COLORS.success,
  };

  const typeIcons = {
    video: '🎬',
    image: '🖼️',
    article: '📰',
    document: '📄',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {Object.entries(mediaByType).map(([type, items]) => {
        if (items.length === 0) return null;

        return (
          <section key={type}>
            <h3 style={{
              color: typeColors[type],
              fontSize: '12px',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontWeight: '700',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>{typeIcons[type]}</span>
              <span>{type.toUpperCase()}S ({items.length})</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onMediaClick && onMediaClick(item)}
                  style={{
                    background: `${typeColors[type]}10`,
                    border: `1px solid ${typeColors[type]}40`,
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: '#fff',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${typeColors[type]}20`;
                    e.currentTarget.style.borderColor = typeColors[type];
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${typeColors[type]}10`;
                    e.currentTarget.style.borderColor = `${typeColors[type]}40`;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: typeColors[type],
                    marginBottom: '6px',
                  }}>
                    {item.title}
                  </div>
                  {item.description && (
                    <div style={{
                      fontSize: '11px',
                      color: '#b8c5d8',
                      lineHeight: '1.5',
                      marginBottom: '8px',
                    }}>
                      {item.description}
                    </div>
                  )}
                  {item.year && (
                    <div style={{
                      fontSize: '10px',
                      color: typeColors[type],
                      fontWeight: '600',
                    }}>
                      {item.year}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

// Process Tab Component
const ProcessTab = ({ selectedNode }) => {
  const processGuide = selectedNode.processGuide || selectedNode.steps;

  if (!processGuide) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
        <div style={{ fontSize: '14px' }}>No process guide available for this methodology.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {processGuide.steps && processGuide.steps.map((step, idx) => (
        <div
          key={idx}
          style={{
            background: `${selectedNode.color || COLORS.primary}10`,
            border: `1px solid ${selectedNode.color || COLORS.primary}40`,
            borderLeft: `4px solid ${selectedNode.color || COLORS.primary}`,
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: selectedNode.color || COLORS.primary,
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '700',
            }}>
              {idx + 1}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: selectedNode.color || COLORS.primary,
            }}>
              {step.title || `Step ${idx + 1}`}
            </div>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#b8c5d8',
            lineHeight: '1.6',
            paddingLeft: '44px',
          }}>
            {step.description}
          </div>
          {step.duration && (
            <div style={{
              fontSize: '10px',
              color: COLORS.accent,
              marginTop: '8px',
              paddingLeft: '44px',
              fontWeight: '600',
            }}>
              ⏱️ {step.duration}
            </div>
          )}
        </div>
      ))}

      {processGuide.tips && processGuide.tips.length > 0 && (
        <div style={{
          background: `${COLORS.warning}15`,
          border: `1px solid ${COLORS.warning}40`,
          borderRadius: '8px',
          padding: '16px',
          marginTop: '10px',
        }}>
          <h4 style={{
            color: COLORS.warning,
            fontSize: '11px',
            letterSpacing: '1.5px',
            marginBottom: '10px',
            fontWeight: '700',
            fontFamily: 'monospace',
            margin: '0 0 10px 0',
          }}>
            💡 FACILITATOR TIPS
          </h4>
          <ul style={{ marginLeft: '20px', fontSize: '12px', lineHeight: '1.7', color: '#b8c5d8' }}>
            {processGuide.tips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Cases Tab Component
const CasesTab = ({ selectedNode }) => {
  if (!selectedNode.caseStudies || selectedNode.caseStudies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
        <div style={{ fontSize: '14px' }}>No case studies available for this methodology.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {selectedNode.caseStudies.map((caseStudy, idx) => (
        <div
          key={idx}
          style={{
            background: `${selectedNode.color || COLORS.primary}10`,
            border: `1px solid ${selectedNode.color || COLORS.primary}40`,
            borderRadius: '10px',
            padding: '18px',
          }}
        >
          <h4 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: selectedNode.color || COLORS.primary,
            marginBottom: '8px',
            margin: '0 0 8px 0',
          }}>
            {caseStudy.title}
          </h4>
          <div style={{
            fontSize: '11px',
            color: COLORS.secondary,
            marginBottom: '12px',
            fontStyle: 'italic',
          }}>
            {caseStudy.organization} • {caseStudy.year}
          </div>
          <p style={{
            fontSize: '12px',
            color: '#b8c5d8',
            lineHeight: '1.7',
            marginBottom: '12px',
          }}>
            {caseStudy.description}
          </p>
          {caseStudy.outcome && (
            <div style={{
              background: `${COLORS.success}15`,
              border: `1px solid ${COLORS.success}40`,
              borderRadius: '6px',
              padding: '10px',
              marginTop: '10px',
            }}>
              <div style={{
                fontSize: '10px',
                color: COLORS.success,
                fontWeight: '700',
                letterSpacing: '1px',
                marginBottom: '6px',
                fontFamily: 'monospace',
              }}>
                OUTCOME
              </div>
              <div style={{
                fontSize: '11px',
                color: '#b8c5d8',
                lineHeight: '1.6',
              }}>
                {caseStudy.outcome}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EnhancedInfoPanel;
