import React, { useState } from 'react';
import mindMapData from './mindMapData';
import { COLORS } from './constants';

const SPECULATIVE_COLOR = '#9D4EDD';

const TimelineView = ({ onClose }) => {
  const [selectedEra, setSelectedEra] = useState('all');
  const [showUncertainty, setShowUncertainty] = useState(true);

  // Timeline eras
  const eras = [
    { id: 'all', label: 'ALL ERAS', range: '1948-2100' },
    { id: 'foundation', label: 'FOUNDATION', range: '1940s-1950s', color: COLORS.primary },
    { id: 'cold-war', label: 'COLD WAR', range: '1950s-1960s', color: COLORS.secondary },
    { id: 'corporate', label: 'CORPORATE', range: '1970s-1980s', color: COLORS.accent },
    { id: 'academic', label: 'ACADEMIC', range: '1990s-2000s', color: COLORS.highlight },
    { id: 'modern', label: 'MODERN', range: '2010s-2020s', color: COLORS.success },
    { id: 'speculative', label: 'SPECULATIVE', range: '2030s-2100', color: SPECULATIVE_COLOR },
  ];

  // Filter helper function for era filtering
  const filterByEra = (year) => {
    if (selectedEra === 'all') return true;

    const eraRanges = {
      'foundation': [1940, 1959],
      'cold-war': [1950, 1969],
      'corporate': [1970, 1989],
      'academic': [1990, 2009],
      'modern': [2010, 2029],
      'speculative': [2030, 2100]
    };

    const range = eraRanges[selectedEra];
    if (!range) return true;

    const [start, end] = range;
    return year >= start && year <= end;
  };

  // Historical methodologies with years (simplified timeline)
  const methodologyTimeline = [
    { year: 1948, name: 'Morphological Analysis', creator: 'Fritz Zwicky', color: COLORS.success },
    { year: 1950, name: 'Delphi Method', creator: 'RAND Corporation', color: COLORS.success },
    { year: 1958, name: 'Macro-Historical Analysis', creator: 'Fernand Braudel', color: COLORS.accent },
    { year: 1970, name: 'Scenario Planning (Shell)', creator: 'Pierre Wack', color: COLORS.success },
    { year: 1975, name: 'Weak Signals', creator: 'Igor Ansoff', color: COLORS.secondary },
    { year: 1980, name: 'Strategic Issue Management', creator: 'Igor Ansoff', color: COLORS.pink },
    { year: 1982, name: 'Backcasting', creator: 'John Robinson', color: COLORS.pink },
    { year: 1998, name: 'Causal Layered Analysis', creator: 'Sohail Inayatullah', color: COLORS.highlight },
    { year: 1999, name: 'Environmental Scanning', creator: 'Choo (formalized)', color: COLORS.secondary },
  ];

  // Futurists timeline
  const futuristsTimeline = mindMapData.futurists || [];

  // Speculative futures
  const speculativeFutures = mindMapData.speculativeFutures?.scenarios || [];

  // Positive futures
  const positiveFutures = mindMapData.positiveFutures?.milestones || [];

  return (
    <div
      role="region"
      aria-label="Timeline view of foresight methodologies from 1948 to 2100"
      className="timeline-container"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '500px',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.98)',
        backdropFilter: 'blur(10px)',
        borderLeft: `3px solid ${COLORS.primary}`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideInRight 0.3s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.primary,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `2px solid ${COLORS.secondary}`,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: COLORS.background,
              letterSpacing: '3px',
              fontFamily: 'monospace',
            }}
          >
            TEMPORAL ANALYSIS
          </h2>
          <div
            style={{
              fontSize: '11px',
              color: COLORS.background,
              opacity: 0.7,
              letterSpacing: '1px',
              marginTop: '4px',
              fontFamily: 'monospace',
            }}
          >
            1948 - 2100 TIMELINE
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close timeline view"
          style={{
            background: 'transparent',
            border: `2px solid ${COLORS.background}`,
            color: COLORS.background,
            fontSize: '24px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'all 0.2s',
          }}
        >
          ×
        </button>
      </div>

      {/* Era Selector */}
      <div
        style={{
          padding: '16px 20px',
          background: COLORS.panel,
          borderBottom: `1px solid ${COLORS.primary}30`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              style={{
                background: selectedEra === era.id ? (era.color || COLORS.primary) : 'transparent',
                border: `2px solid ${era.color || COLORS.primary}`,
                color: selectedEra === era.id ? COLORS.background : (era.color || COLORS.primary),
                padding: '8px 14px',
                borderRadius: '15px',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
            >
              {era.label}
              <div style={{ fontSize: '8px', opacity: 0.7, marginTop: '2px' }}>{era.range}</div>
            </button>
          ))}
        </div>

        {/* Uncertainty Toggle */}
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="uncertainty-toggle"
            checked={showUncertainty}
            onChange={(e) => setShowUncertainty(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label
            htmlFor="uncertainty-toggle"
            style={{
              color: SPECULATIVE_COLOR,
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            SHOW UNCERTAINTY CONE
          </label>
        </div>
      </div>

      {/* Timeline Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        {/* Historical Methodologies Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3
            style={{
              color: COLORS.secondary,
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              marginBottom: '20px',
              fontFamily: 'monospace',
            }}
          >
            METHODOLOGY DEVELOPMENT
          </h3>
          {methodologyTimeline.filter(item => filterByEra(item.year)).map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '20px',
                position: 'relative',
              }}
            >
              {/* Year Badge */}
              <div
                style={{
                  minWidth: '60px',
                  height: '60px',
                  background: item.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: COLORS.background,
                  fontFamily: 'monospace',
                  boxShadow: `0 0 20px ${item.color}60`,
                }}
              >
                {item.year}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    background: `${item.color}20`,
                    border: `2px solid ${item.color}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                  }}
                >
                  <div
                    style={{
                      color: item.color,
                      fontSize: '13px',
                      fontWeight: '700',
                      marginBottom: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      color: COLORS.text,
                      fontSize: '11px',
                      opacity: 0.7,
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.creator}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < methodologyTimeline.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '30px',
                    top: '60px',
                    bottom: '-20px',
                    width: '2px',
                    background: `linear-gradient(to bottom, ${item.color}80, ${methodologyTimeline[index + 1]?.color}80)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Futurists & Sci-Fi Visionaries Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3
            style={{
              color: COLORS.accent,
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              marginBottom: '20px',
              fontFamily: 'monospace',
            }}
          >
            FUTURISTS & VISIONARIES
          </h3>
          {futuristsTimeline.filter(futurist => {
            const startYear = parseInt(futurist.lifespan.split('-')[0]);
            return filterByEra(startYear);
          }).map((futurist, index) => {
            const startYear = futurist.lifespan.split('-')[0];
            const isFuturist = futurist.type === 'futurist';

            return (
              <div
                key={futurist.id}
                style={{
                  marginBottom: '16px',
                  background: `${futurist.color}10`,
                  border: `2px solid ${futurist.color}`,
                  borderRadius: '12px',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: futurist.color,
                        fontSize: '13px',
                        fontWeight: '700',
                        marginBottom: '4px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {futurist.label.replace(/\n/g, ' ')}
                    </div>
                    <div
                      style={{
                        color: COLORS.text,
                        fontSize: '10px',
                        opacity: 0.6,
                        marginBottom: '8px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {futurist.lifespan} • {isFuturist ? 'FUTURIST' : 'SCI-FI WRITER'}
                    </div>
                    <div
                      style={{
                        color: COLORS.text,
                        fontSize: '11px',
                        lineHeight: '1.5',
                        opacity: 0.9,
                        fontFamily: 'monospace',
                      }}
                    >
                      {futurist.description}
                    </div>
                  </div>
                </div>

                {/* Major Works */}
                {futurist.majorWorks && futurist.majorWorks.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <div
                      style={{
                        fontSize: '9px',
                        color: futurist.color,
                        fontWeight: '700',
                        marginBottom: '6px',
                        letterSpacing: '1px',
                        fontFamily: 'monospace',
                      }}
                    >
                      MAJOR WORKS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {futurist.majorWorks.slice(0, 3).map((work, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '9px',
                            background: futurist.color,
                            color: COLORS.background,
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontFamily: 'monospace',
                          }}
                        >
                          {work.title} ({work.year})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Speculative Futures 2060+ Section */}
        <div>
          <h3
            style={{
              color: SPECULATIVE_COLOR,
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontFamily: 'monospace',
            }}
          >
            SPECULATIVE FUTURES 2060+
          </h3>
          <div
            style={{
              color: COLORS.text,
              fontSize: '11px',
              opacity: 0.7,
              marginBottom: '20px',
              fontStyle: 'italic',
              fontFamily: 'monospace',
            }}
          >
            The cone of possibilities - uncertainty expands exponentially beyond 2060
          </div>

          {speculativeFutures.filter(() => selectedEra === 'all' || selectedEra === 'speculative').map((scenario) => {
            // Calculate opacity based on uncertainty
            const opacityMap = { low: 1.0, medium: 0.8, high: 0.6, 'very-high': 0.4 };
            const opacity = showUncertainty ? opacityMap[scenario.uncertainty] || 0.7 : 1.0;

            // Probability indicator
            const probabilityColors = {
              'very-low': '#EF4444',
              low: '#F59E0B',
              'low-medium': COLORS.secondary,
              medium: COLORS.success,
              'medium-high': COLORS.primary,
              high: '#10B981',
              'very-high': '#059669',
            };

            return (
              <div
                key={scenario.id}
                style={{
                  marginBottom: '20px',
                  background: `${scenario.color}15`,
                  border: `2px solid ${scenario.color}`,
                  borderRadius: '12px',
                  padding: '16px',
                  opacity: opacity,
                  transition: 'opacity 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Uncertainty Pulse Effect */}
                {showUncertainty && scenario.uncertainty === 'high' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle, ${scenario.color}20, transparent)`,
                      animation: 'pulse 3s infinite',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: scenario.color,
                          fontSize: '14px',
                          fontWeight: '700',
                          marginBottom: '4px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {scenario.label.replace(/\n/g, ' ')}
                      </div>
                      <div
                        style={{
                          color: COLORS.text,
                          fontSize: '10px',
                          opacity: 0.6,
                          marginBottom: '10px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {scenario.timeframe}
                        {showUncertainty && (
                          <>
                            {' '}
                            • UNCERTAINTY: {scenario.uncertainty.toUpperCase()} • PROBABILITY:{' '}
                            {scenario.probability.toUpperCase()}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Probability Badge */}
                    <div
                      style={{
                        background: probabilityColors[scenario.probability] || COLORS.secondary,
                        padding: '6px 10px',
                        borderRadius: '10px',
                        fontSize: '9px',
                        fontWeight: '700',
                        color: COLORS.background,
                        letterSpacing: '1px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {scenario.probability.toUpperCase()}
                    </div>
                  </div>

                  <div
                    style={{
                      color: COLORS.text,
                      fontSize: '11px',
                      lineHeight: '1.6',
                      opacity: 0.9,
                      marginBottom: '12px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {scenario.description}
                  </div>

                  {/* Key Milestones */}
                  {scenario.details?.keyMilestones && scenario.details.keyMilestones.length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: '9px',
                          color: scenario.color,
                          fontWeight: '700',
                          marginBottom: '8px',
                          letterSpacing: '1px',
                          fontFamily: 'monospace',
                        }}
                      >
                        KEY MILESTONES
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {scenario.details.keyMilestones.slice(0, 2).map((milestone, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: '10px',
                              color: COLORS.text,
                              opacity: 0.8,
                              paddingLeft: '12px',
                              borderLeft: `2px solid ${scenario.color}40`,
                              fontFamily: 'monospace',
                            }}
                          >
                            {milestone}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Positive Futures 2025-2099 Section */}
        <div style={{ marginTop: '40px' }}>
          <h3
            style={{
              color: COLORS.success,
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontFamily: 'monospace',
            }}
          >
            POSITIVE FUTURES 2025-2099
          </h3>
          <div
            style={{
              color: COLORS.text,
              fontSize: '11px',
              opacity: 0.7,
              marginBottom: '20px',
              fontStyle: 'italic',
              fontFamily: 'monospace',
            }}
          >
            Star Trek-inspired pathway: abundance, collaboration, enlightenment
          </div>

          {positiveFutures.filter(milestone => filterByEra(parseInt(milestone.year))).map((milestone) => (
            <div
              key={milestone.id}
              style={{
                marginBottom: '20px',
                background: `${milestone.color}15`,
                border: `2px solid ${milestone.color}`,
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: milestone.color,
                      fontSize: '12px',
                      fontWeight: '700',
                      marginBottom: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {milestone.year}
                  </div>
                  <h4
                    style={{
                      color: COLORS.text,
                      fontSize: '14px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {milestone.title}
                  </h4>
                </div>
              </div>

              <div
                style={{
                  color: COLORS.text,
                  fontSize: '11px',
                  lineHeight: '1.6',
                  opacity: 0.9,
                  marginBottom: '12px',
                  fontFamily: 'monospace',
                }}
              >
                {milestone.description}
              </div>

              {milestone.details?.keyDevelopments && (
                <div>
                  <div
                    style={{
                      fontSize: '9px',
                      color: milestone.color,
                      fontWeight: '700',
                      marginBottom: '8px',
                      letterSpacing: '1px',
                      fontFamily: 'monospace',
                    }}
                  >
                    KEY DEVELOPMENTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {milestone.details.keyDevelopments.slice(0, 3).map((dev, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: '10px',
                          color: COLORS.text,
                          opacity: 0.8,
                          paddingLeft: '12px',
                          borderLeft: `2px solid ${milestone.color}40`,
                          fontFamily: 'monospace',
                        }}
                      >
                        • {dev}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            right: -500px;
            opacity: 0;
          }
          to {
            right: 0;
            opacity: 1;
          }
        }

        @keyframes slideInBottom {
          from {
            bottom: -100vh;
            opacity: 0;
          }
          to {
            bottom: 0;
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(26, 26, 46, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: ${COLORS.primary};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${COLORS.secondary};
        }

        /* Mobile Responsive Timeline */
        @media (max-width: 768px) {
          .timeline-container {
            width: 100vw !important;
            height: 85vh !important;
            top: auto !important;
            bottom: 0 !important;
            right: 0 !important;
            border-left: none !important;
            border-top: 3px solid ${COLORS.primary} !important;
            border-radius: 20px 20px 0 0 !important;
            animation: slideInBottom 0.3s ease !important;
          }
        }

        @media (max-width: 480px) {
          .timeline-container {
            height: 90vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelineView;
