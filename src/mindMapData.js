// Strategic Foresight Mind Map - Complete Data Structure
// Version 2.0 with Level 3 Media Integration

const mindMapData = {
  // Level 0 - The Foundation
  center: {
    id: 'root',
    label: 'Strategic\nForesight',
    description: 'A disciplined framework for exploring alternative futures',
    color: '#5C88DA',
    level: 0,
    details: {
      overview: 'Strategic foresight is not about predicting the future—it\'s about expanding our capacity to navigate uncertainty. This field represents a fundamental shift from "predict and control" to "explore and adapt," recognizing that multiple futures exist and our work today is to understand and prepare for them.',
      philosophy: [
        'The future is not predictable—it is created through present actions',
        'Multiple futures exist (possible, probable, preferable)',
        'Futures work is for the present (informs today\'s decisions)',
        'Futures work is skeptical (questions dominant narratives)'
      ]
    },
    grokipedia: 'https://en.wikipedia.org/wiki/Futures_studies',
    media: [
      {
        type: 'video',
        title: 'Introduction to Futures Studies',
        url: 'https://www.youtube.com/watch?v=VB8XP1x0_Io',
        description: 'Comprehensive introduction to the field of futures thinking',
        year: 2014
      },
      {
        type: 'image',
        title: 'Futures Cone (Joseph Voros)',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Futures_cone.svg/1200px-Futures_cone.svg.png',
        description: 'Visual representation of possible, plausible, probable, and preferable futures'
      },
      {
        type: 'article',
        title: 'Futures Studies - Encyclopedia Entry',
        url: 'https://en.wikipedia.org/wiki/Futures_studies',
        source: 'Wikipedia',
        description: 'Comprehensive overview of the field and its history'
      },
      {
        type: 'image',
        title: 'SWOT Analysis Framework',
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/SWOT en.svg',
        description: 'Foundation matrix for strategic analysis: Strengths, Weaknesses, Opportunities, Threats'
      }
    ]
  },

  // Level 1 - The Six Pillars
  level1: [
    {
      id: 'mapping',
      label: 'Mapping',
      description: 'Understanding current views of the future',
      color: '#5C88DA',
      level: 1,
      details: {
        overview: 'Before exploring futures, we must understand the present landscape of competing visions and forces. Mapping reveals the tensions between aspirations, trends, and barriers that shape what futures are plausible.',
        coreMethod: 'Futures Triangle',
        components: [
          'Pull of the Future - Visions and aspirations',
          'Push of the Present - Trends and drivers',
          'Weight of the Past - Barriers and legacies'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight',
      children: ['futures-triangle', 'stakeholder-analysis']
    },
    {
      id: 'anticipating',
      label: 'Anticipating',
      description: 'Detecting early signs of change',
      color: '#FFCC66',
      level: 1,
      details: {
        overview: 'Organizations must learn to respond to "weak signals" before they become expensive problems. Anticipating involves systematic exploration of the environment to detect emerging issues and discontinuities.',
        keyInsight: 'Igor Ansoff\'s concept - organizations must detect weak signals early',
        topSources: [
          'Scientists and Researchers',
          'Futurists',
          'Colleagues in different domains',
          'Academic journals',
          'Artists and science fiction'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Environmental_scanning',
      children: ['env-scanning', 'weak-signals', 'emerging-issues']
    },
    {
      id: 'timing',
      label: 'Timing',
      description: 'Understanding macro-historical patterns',
      color: '#CC99CC',
      level: 1,
      details: {
        overview: 'Understanding change requires historical context—the deeper rhythms and cycles that influence present and future. Timing helps us see beyond immediate events to longer-term patterns.',
        philosophy: 'Fernand Braudel\'s concept of longue durée - the slow-moving structural changes beneath visible events',
        timeScales: [
          'Micro - Events and individuals (years)',
          'Meso - Conjunctures and trends (decades)',
          'Macro - Longue durée and structures (centuries)'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
      children: ['macro-historical', 'cycle-theory']
    },
    {
      id: 'deepening',
      label: 'Deepening',
      description: 'Uncovering worldviews and myths',
      color: '#FF9966',
      level: 1,
      details: {
        overview: 'Surface problems often have deeper roots in worldviews and myths. Deepening moves beyond symptoms to uncover the ideological structures and unconscious narratives that shape reality.',
        coreMethod: 'Causal Layered Analysis (CLA)',
        power: 'Reframes problems to unlock transformative solutions beyond surface fixes',
        layers: [
          'Layer 1: Litany (surface data, headlines)',
          'Layer 2: Social Causes (STEEP factors, systemic drivers)',
          'Layer 3: Discourse/Worldview (ideological structures)',
          'Layer 4: Myth/Metaphor (unconscious narratives)'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Causal_layered_analysis',
      children: ['cla', 'discourse-analysis']
    },
    {
      id: 'creating',
      label: 'Creating\nAlternatives',
      description: 'Developing multiple plausible scenarios',
      color: '#99CC99',
      level: 1,
      details: {
        overview: 'The heart of futures work is creating multiple plausible scenarios that expand our thinking beyond single predictions. This pillar encompasses methods for generating, exploring, and analyzing alternative futures.',
        historicalLineage: [
          'RAND Corporation (Herman Kahn, 1950s)',
          'Shell Group Planning (Pierre Wack, 1970s)',
          'Global Business Network (Peter Schwartz, 1987)'
        ],
        scenarioTypes: [
          'Predictive - What will happen?',
          'Explorative - What can happen?',
          'Normative - How to reach target?'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Scenario_planning',
      children: ['scenarios', 'wild-cards', 'morphological']
    },
    {
      id: 'transforming',
      label: 'Transforming',
      description: 'Creating and achieving preferred futures',
      color: '#FF6B9D',
      level: 1,
      details: {
        overview: 'The ultimate purpose of foresight is action. Transforming moves from insight to implementation, from exploring futures to creating them.',
        philosophy: 'Not just exploring, but creating preferred futures',
        keyDistinction: 'Backcasting works backward from desired future (vs forecasting which projects forward from present)',
        whenToUse: 'When trend-break required to reach desired target'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Backcasting',
      children: ['visioning', 'backcasting', 'strategic-issue']
    }
  ],

  // Level 2 - The Methodologies (18 total)
  methodologies: [
    // MAPPING Methods
    {
      id: 'futures-triangle',
      label: 'Futures Triangle',
      parent: 'mapping',
      description: 'Three-force analysis framework for understanding plausibility',
      color: '#5C88DA',
      level: 2,
      yearIntroduced: 2008,
      pioneers: [
        {
          name: 'Sohail Inayatullah',
          role: 'Creator',
          organization: 'UNESCO Chair in Futures Studies',
          contribution: 'Developed three-force framework for analyzing futures plausibility'
        }
      ],
      historicalContext: 'Created as part of Inayatullah\'s broader Six Pillars framework to provide a simple yet powerful tool for mapping tensions between aspirations, trends, and barriers.',
      details: {
        overview: 'The Futures Triangle analyzes the interplay of three fundamental forces that determine which futures are plausible.',
        components: [
          'Pull of the Future - The visions, goals, and aspirations that attract us forward',
          'Push of the Present - Current trends and drivers propelling us toward certain futures',
          'Weight of the Past - Historical barriers, legacies, and inertia resisting change'
        ],
        application: 'Plot issues on the triangle to understand tensions and identify pathways forward',
        creator: 'Sohail Inayatullah'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Futures_Triangle',
      media: [
        {
          type: 'video',
          title: 'Sohail Inayatullah Explains the Futures Triangle',
          url: 'https://www.youtube.com/watch?v=2nI8OLJjMCw',
          description: 'Creator of the method explains its application',
          year: 2012
        },
        {
          type: 'image',
          title: 'Futures Triangle Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Futures_Triangle.svg/800px-Futures_Triangle.svg.png',
          description: 'Visual framework showing the three forces'
        },
        {
          type: 'image',
          title: 'UNESCO Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/UNESCO_logo.svg',
          description: 'UNESCO Chair in Futures Studies - Sohail Inayatullah developed Futures Triangle as UNESCO Chair holder'
        }
      ]
    },
    {
      id: 'stakeholder-analysis',
      label: 'Stakeholder\nAnalysis',
      parent: 'mapping',
      description: 'Identifying and mapping diverse perspectives and power dynamics',
      color: '#5C88DA',
      level: 2,
      yearIntroduced: 1963,
      pioneers: [
        {
          name: 'R. Edward Freeman',
          role: 'Formalized for strategic management',
          organization: 'Stanford Research Institute',
          contribution: 'Developed stakeholder theory in strategic management context'
        },
        {
          name: 'Eric Trist',
          role: 'Applied to organizational planning',
          organization: 'Tavistock Institute',
          contribution: 'Socio-technical systems approach to stakeholder engagement'
        }
      ],
      historicalContext: 'Emerged from organizational theory and strategic management in the 1960s, later adapted for futures work to map competing visions and power dynamics.',
      details: {
        overview: 'Understanding different stakeholders\' views of the future reveals competing visions and power dynamics that shape which futures emerge.',
        components: [
          'Identify key stakeholders',
          'Map their interests and power',
          'Understand their future visions',
          'Analyze relationships and conflicts'
        ],
        application: 'Create power/interest grids, influence maps, and perspective matrices'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Stakeholder_analysis',
      media: [
        {
          type: 'image',
          title: 'Stakeholder Power/Interest Grid',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Stakeholder_analysis.png/1200px-Stakeholder_analysis.png',
          description: 'Classic framework for mapping stakeholder relationships'
        },
        {
          type: 'article',
          title: 'Stakeholder Analysis in Foresight',
          url: 'https://en.wikipedia.org/wiki/Stakeholder_analysis',
          source: 'Wikipedia',
          description: 'Comprehensive guide to stakeholder mapping'
        },
        {
          type: 'document',
          title: 'Strategic Management: A Stakeholder Approach',
          url: 'https://www.researchgate.net/publication/228320877_A_Stakeholder_Approach_to_Strategic_Management',
          description: 'R. Edward Freeman\'s foundational 1984 work establishing stakeholder theory',
          year: 1984
        },
        {
          type: 'document',
          title: 'Stakeholder Salience Model (Mitchell, Agle, Wood)',
          url: 'https://www.jstor.org/stable/259247',
          description: 'Theory of stakeholder identification based on power, legitimacy, and urgency attributes',
          year: 1997
        },
        {
          type: 'document',
          title: 'Stakeholder Mapping in Foresight Processes',
          url: 'https://coe.gsa.gov/docs/StrategicForesight101.pdf',
          description: 'GSA guide to strategic foresight methodologies including stakeholder engagement frameworks'
        }
      ]
    },

    // ANTICIPATING Methods
    {
      id: 'env-scanning',
      label: 'Environmental\nScanning',
      parent: 'anticipating',
      description: 'Systematic exploration across STEEP domains',
      color: '#FFCC66',
      level: 2,
      yearIntroduced: 1967,
      pioneers: [
        {
          name: 'Francis Joseph Aguilar',
          role: 'Creator',
          organization: 'Harvard Business School',
          contribution: 'First systematic framework for environmental scanning (ETPS model)'
        },
        {
          name: 'Chun Wei Choo',
          role: 'Formalized scanning modes',
          organization: 'University of Toronto',
          contribution: 'Four Modes of Scanning framework (1999)'
        }
      ],
      historicalContext: 'Introduced by Aguilar in 1967 as a method for identifying external factors affecting organizations. Choo formalized scanning modes in 1999, creating systematic approach for futures work.',
      details: {
        overview: 'Systematic monitoring of the external environment to identify signals of change across Social, Technological, Economic, Environmental, and Political domains.',
        modes: [
          'Undirected Viewing - Broad exposure with no specific purpose',
          'Conditioned Viewing - Directed exposure in areas of interest',
          'Informal Search - Active seeking for specific information',
          'Formal Search - Structured, methodical search efforts'
        ],
        creator: 'Choo (1999) - Four Modes of Scanning',
        domains: 'STEEP - Social, Technological, Economic, Environmental, Political'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Environmental_scanning',
      media: [
        {
          type: 'video',
          title: 'How to Scan for Emerging Issues',
          url: 'https://www.youtube.com/watch?v=kpJNPWQ_Gno',
          description: 'Practical guide to environmental scanning techniques',
          year: 2015
        },
        {
          type: 'image',
          title: 'STEEP Analysis Framework',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/PESTEL.png/1200px-PESTEL.png',
          description: 'Framework for systematic environmental scanning'
        },
        {
          type: 'article',
          title: 'Four Modes of Scanning',
          url: 'https://en.wikipedia.org/wiki/Environmental_scanning',
          source: 'Wikipedia',
          description: 'Choo\'s framework for different scanning approaches'
        },
        {
          type: 'image',
          title: 'Harvard Business School Baker Library',
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Harvard_business_school_baker_library_2009a.JPG',
          description: 'Baker Library at Harvard Business School, where Francis Aguilar developed environmental scanning framework (1967)'
        },
        {
          type: 'image',
          title: 'Porter\'s Five Forces Model',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Competitiveforces.svg',
          description: 'Michael Porter\'s framework for analyzing industry competitive forces: rivalry, suppliers, buyers, substitutes, new entrants'
        }
      ]
    },
    {
      id: 'weak-signals',
      label: 'Weak Signals',
      parent: 'anticipating',
      description: 'Early indicators of discontinuities and emerging change',
      color: '#FFCC66',
      level: 2,
      yearIntroduced: 1975,
      pioneers: [
        {
          name: 'Igor Ansoff',
          role: 'Creator',
          organization: 'Strategic Management',
          contribution: 'Developed weak signals concept to detect strategic surprises early'
        }
      ],
      historicalContext: 'Introduced by Ansoff in 1975 as response to strategic surprises facing organizations. Refined in 1980s to distinguish between weak signals and strong signals, becoming core method for anticipatory intelligence.',
      details: {
        overview: 'Weak signals are early, often ambiguous indicators of potentially significant change. They are easy to dismiss but can be harbingers of major discontinuities.',
        types: [
          'Exosigns - External signals from the environment',
          'Endosigns - Internal signals from within the organization'
        ],
        characteristics: [
          'Low signal-to-noise ratio',
          'Ambiguous meaning',
          'Potentially high impact',
          'Requires interpretation'
        ],
        creator: 'Igor Ansoff (1975)'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Weak_signals',
      media: [
        {
          type: 'video',
          title: 'Igor Ansoff on Strategic Management',
          url: 'https://www.youtube.com/watch?v=bNlcJo-u3wI',
          description: 'Ansoff discussing strategic surprise and weak signals',
          year: 1976
        },
        {
          type: 'article',
          title: 'Weak Signals and Strategic Intelligence',
          url: 'https://en.wikipedia.org/wiki/Strategic_foresight',
          source: 'Wikipedia',
          description: 'Understanding weak signal detection'
        },
        {
          type: 'image',
          title: 'Igor Ansoff Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Igor_Ansoff,_1971.jpg',
          description: 'Russian-American management theorist (1918-2002), father of strategic management and weak signals'
        }
      ]
    },
    {
      id: 'emerging-issues',
      label: 'Emerging Issues\nAnalysis',
      parent: 'anticipating',
      description: 'Identifying issues before they mature into major trends',
      color: '#FFCC66',
      level: 2,
      yearIntroduced: 1977,
      pioneers: [
        {
          name: 'Graham Molitor',
          role: 'Pioneer',
          organization: 'Public Policy Forecasting',
          contribution: 'Developed issues lifecycle model and S-curve analysis'
        },
        {
          name: 'Joseph Coates',
          role: 'Formalized methodology',
          organization: 'Coates & Jarratt Inc.',
          contribution: 'Structured approach to identifying and analyzing emerging issues'
        }
      ],
      historicalContext: 'Developed in late 1970s to track how issues evolve from fringe concerns to mainstream trends. Built on weak signals concept but added lifecycle perspective.',
      details: {
        overview: 'Emerging Issues Analysis tracks issues through their lifecycle—from weak signals to trends to mainstream concerns—allowing early response.',
        stages: [
          'Emergence - First weak signals appear',
          'Growth - Issue gains attention',
          'Maturity - Becomes trend or mainstream',
          'Decline - Issue fades or transforms'
        ],
        application: 'Monitor issue lifecycle to intervene at optimal time'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Emerging_issues_analysis',
      media: [
        {
          type: 'video',
          title: 'Tracking Emerging Issues',
          url: 'https://www.youtube.com/watch?v=mI3lqxOgx2E',
          description: 'Framework for emerging issues analysis',
          year: 2013
        },
        {
          type: 'image',
          title: 'Issue Lifecycle Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Technology-Adoption-Lifecycle.png/1200px-Technology-Adoption-Lifecycle.png',
          description: 'Visual representation of issue maturation'
        },
        {
          type: 'image',
          title: 'Diffusion of Innovation (Rogers)',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/DiffusionOfInnovation.png',
          description: 'Everett Rogers\' bell curve showing how innovations spread through society: innovators, early adopters, early/late majority, laggards'
        }
      ]
    },

    // TIMING Methods
    {
      id: 'macro-historical',
      label: 'Macro-Historical\nAnalysis',
      parent: 'timing',
      description: 'Understanding change across micro, meso, and macro time scales',
      color: '#CC99CC',
      level: 2,
      yearIntroduced: 1958,
      pioneers: [
        {
          name: 'Fernand Braudel',
          role: 'Creator',
          organization: 'Annales School of History',
          contribution: 'Developed three-tiered temporal framework - longue durée concept'
        }
      ],
      historicalContext: 'Published in 1958 essay "Histoire et Sciences sociales: La longue durée" in Annales journal. Revolutionized historical thinking by distinguishing between event-driven history and deep structural changes.',
      details: {
        overview: 'Fernand Braudel\'s framework examines history at three time scales, revealing how deep structures shape surface events.',
        timeScales: [
          'Micro - Events and individuals (years to decades)',
          'Meso - Conjunctures and trends (decades to generations)',
          'Macro - Longue durée and deep structures (centuries)'
        ],
        creator: 'Fernand Braudel',
        application: 'Analyze current issues across all three time scales to understand deeper forces'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Fernand_Braudel',
      media: [
        {
          type: 'video',
          title: 'Fernand Braudel on the Longue Durée',
          url: 'https://www.youtube.com/watch?v=pZlUyRMpfLQ',
          description: 'Braudel explaining his historical framework',
          year: 1979
        },
        {
          type: 'image',
          title: 'Braudel\'s Three Time Scales',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Braudel_time_scales.png/1200px-Braudel_time_scales.png',
          description: 'Diagram showing micro, meso, and macro time'
        },
        {
          type: 'article',
          title: 'The Longue Durée',
          url: 'https://en.wikipedia.org/wiki/Longue_dur%C3%A9e',
          source: 'Wikipedia',
          description: 'Braudel\'s concept of long-term historical structures'
        },
        {
          type: 'image',
          title: 'Fernand Braudel Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fernand_Braudel_(1902-1985).jpg',
          description: 'French historian (1902-1985), pioneer of the Annales School and longue durée concept'
        }
      ]
    },
    {
      id: 'cycle-theory',
      label: 'Cycle Theory',
      parent: 'timing',
      description: 'Kondratiev waves, generational cycles, and long-term patterns',
      color: '#CC99CC',
      level: 2,
      yearIntroduced: 1925,
      pioneers: [
        {
          name: 'Nikolai Kondratiev',
          role: 'Creator',
          organization: 'Soviet economist',
          contribution: 'Identified 40-60 year economic waves (K-waves)'
        },
        {
          name: 'William Strauss & Neil Howe',
          role: 'Generational theory',
          organization: 'Independent researchers',
          contribution: 'Developed generational cycle theory (1991)'
        }
      ],
      historicalContext: 'Kondratiev waves identified in 1925, showing long-term economic cycles. Later expanded to include generational cycles (Strauss-Howe, 1991) and technology adoption patterns.',
      details: {
        overview: 'Various theories propose that social, economic, and technological change follows cyclical patterns. Understanding these can help anticipate turning points.',
        types: [
          'Kondratiev Waves - 40-60 year economic/technology cycles',
          'Generational Theory - 20-year cohort cycles (Strauss-Howe)',
          'Technology Cycles - S-curves of innovation adoption'
        ],
        application: 'Identify where we are in current cycles to anticipate transitions'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
      media: [
        {
          type: 'video',
          title: 'Understanding Kondratiev Waves',
          url: 'https://www.youtube.com/watch?v=8qmgKHr7K1s',
          description: 'Explanation of long economic cycles',
          year: 2016
        },
        {
          type: 'image',
          title: 'Kondratiev Wave Timeline',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Kondratieff_Wave.svg/1200px-Kondratieff_Wave.svg.png',
          description: 'Historical waves of economic development'
        },
        {
          type: 'article',
          title: 'Economic Cycles and Innovation',
          url: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
          source: 'Wikipedia',
          description: 'Deep dive into cycle theory'
        }
      ]
    },

    // DEEPENING Methods
    {
      id: 'cla',
      label: 'Causal Layered\nAnalysis',
      parent: 'deepening',
      description: 'Four-layer deconstruction from litany to myth',
      color: '#FF9966',
      level: 2,
      yearIntroduced: 1998,
      pioneers: [
        {
          name: 'Sohail Inayatullah',
          role: 'Creator',
          organization: 'UNESCO Chair in Futures Studies',
          contribution: 'Developed four-layer framework integrating poststructuralism with futures methods'
        }
      ],
      historicalContext: 'Published in 1998 Futures journal article "Causal Layered Analysis: Poststructuralism as Method". Drew on P.R. Sarkar\'s social cycle theory, critical theory, and poststructuralist analysis to create transformative futures methodology.',
      details: {
        overview: 'CLA is a powerful method for deconstructing problems across four layers of depth—from surface symptoms to deep unconscious narratives.',
        layers: [
          'Layer 1: Litany - Surface data, headlines, obvious problems',
          'Layer 2: Social Causes - STEEP factors, systemic drivers, institutional forces',
          'Layer 3: Discourse/Worldview - Ideological structures, dominant paradigms, power relations',
          'Layer 4: Myth/Metaphor - Unconscious narratives, deep archetypes, cultural stories'
        ],
        example: 'Bangkok traffic: Litany="traffic jam" → Social="lack of roads" → Worldview="industrial growth model" → Myth="Big City Outlook" (colonial legacy)',
        creator: 'Sohail Inayatullah (1998)',
        power: 'Reveals how deeper layers create surface problems, enabling transformative solutions'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Causal_layered_analysis',
      relatedMethodologies: [
        { id: 'scenario-planning', type: 'complements', description: 'CLA deepens scenario analysis by revealing underlying assumptions' },
        { id: 'visioning', type: 'builds-on', description: 'CLA informs preferred futures by exposing hidden narratives' },
        { id: 'futures-triangle', type: 'complements', description: 'Both map drivers - CLA goes deeper into cultural/mythic layers' }
      ],
      media: [
        {
          type: 'video',
          title: 'Sohail Inayatullah Explains CLA',
          url: 'https://www.youtube.com/watch?v=7-8Xe9m7riM',
          description: 'Creator demonstrating CLA methodology',
          year: 2011
        },
        {
          type: 'document',
          title: 'CLA: Poststructuralism as Method (1998)',
          url: 'https://www.futures.hawaii.edu/publications/half-full/InayatullahCLA.pdf',
          description: 'Foundational paper by Inayatullah',
          year: 1998
        },
        {
          type: 'article',
          title: 'Causal Layered Analysis',
          url: 'https://en.wikipedia.org/wiki/Causal_layered_analysis',
          source: 'Wikipedia',
          description: 'Comprehensive overview of CLA'
        },
        {
          type: 'image',
          title: 'UNESCO Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/UNESCO_logo.svg',
          description: 'UNESCO Chair in Futures Studies - Sohail Inayatullah developed CLA as UNESCO Chair holder'
        }
      ]
    },
    {
      id: 'discourse-analysis',
      label: 'Discourse\nAnalysis',
      parent: 'deepening',
      description: 'Examining language, power structures, and narrative frames',
      color: '#FF9966',
      level: 2,
      yearIntroduced: 1969,
      pioneers: [
        {
          name: 'Norman Fairclough',
          role: 'Critical discourse analysis',
          organization: 'Lancaster University',
          contribution: 'Three-dimensional CDA framework (1989) - analyzing text, discourse practice, and sociocultural practice'
        },
        {
          name: 'James Paul Gee',
          role: 'Applied discourse analysis',
          organization: 'Arizona State University',
          contribution: 'Developed toolkit approach to discourse analysis applicable to social and organizational contexts'
        }
      ],
      historicalContext: 'Critical discourse analysis emerged in 1980s-90s with Fairclough\'s three-dimensional framework. Applied to futures studies to examine how language frames possible futures and maintains power structures in organizational and policy contexts.',
      details: {
        overview: 'Discourse analysis examines how language shapes reality, maintains power structures, and frames what futures are thinkable.',
        focus: [
          'Language and terminology choices',
          'Narrative frames and stories',
          'Power/knowledge relationships',
          'Dominant and marginalized discourses'
        ],
        inspiration: 'Norman Fairclough - Critical Discourse Analysis',
        application: 'Deconstruct dominant narratives to reveal alternatives and empower marginalized voices'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Discourse_analysis',
      media: [
        {
          type: 'video',
          title: 'Norman Fairclough: Critical Discourse Analysis',
          url: 'https://www.youtube.com/watch?v=68ShJJmPzKs',
          description: 'Fairclough explaining critical discourse analysis framework and methodology',
          year: 2013
        },
        {
          type: 'article',
          title: 'Discourse Analysis in Futures Studies',
          url: 'https://en.wikipedia.org/wiki/Discourse_analysis',
          source: 'Wikipedia',
          description: 'Methods for analyzing discourse'
        },
        {
          type: 'document',
          title: 'Fairclough\'s Three-Dimensional CDA Framework',
          url: 'https://www.researchgate.net/figure/CDA-Three-Dimensional-Norman-Fairclough-Fairclough-2010_fig1_358499059',
          description: 'Norman Fairclough\'s critical discourse analysis framework: text, discourse practice, and sociocultural practice',
          year: 1995
        },
        {
          type: 'document',
          title: 'Communication in Futures Studies: A Discursive Analysis',
          url: 'https://www.sciencedirect.com/science/article/abs/pii/S0016328719303556',
          description: 'Critical discourse analysis of how communication and language function within the futures field'
        },
        {
          type: 'document',
          title: 'Narrative Foresight Methodology',
          url: 'https://www.sciencedirect.com/science/article/abs/pii/S0016328715001160',
          description: 'Exploring how narratives, worldviews, and myths underlie possible, probable, and preferred futures'
        }
      ]
    },

    // CREATING ALTERNATIVES Methods
    {
      id: 'scenarios',
      label: 'Scenario\nPlanning',
      parent: 'creating',
      description: 'Developing multiple plausible futures across key uncertainties',
      color: '#99CC99',
      level: 2,
      yearIntroduced: 1950,
      pioneers: [
        {
          name: 'Herman Kahn',
          role: 'Founder',
          organization: 'RAND Corporation',
          contribution: 'Pioneered scenario thinking for military strategy during Cold War'
        },
        {
          name: 'Pierre Wack',
          role: 'Corporate pioneer',
          organization: 'Shell Group Planning',
          contribution: 'Applied scenarios to business planning, predicted 1973 oil crisis'
        },
        {
          name: 'Peter Schwartz',
          role: 'Popularizer',
          organization: 'Global Business Network',
          contribution: 'Commercialized scenarios, wrote "The Art of the Long View" (1991)'
        }
      ],
      historicalContext: 'Originated at RAND in 1950s for nuclear war planning. Shell\'s Pierre Wack adapted for business (1970s), validating approach by preparing Shell for 1973 oil shock. GBN (1987) brought scenarios to mainstream.',
      details: {
        overview: 'Scenario planning creates multiple plausible futures to challenge assumptions and prepare for various possibilities. Pioneered at RAND and refined at Shell.',
        types: [
          'Predictive - What will happen? (forecasts)',
          'Explorative - What can happen? (possibilities)',
          'Normative - How to reach target? (pathways)'
        ],
        archetypes: [
          'Jim Dator\'s Four: Growth, Collapse, Steady State, Transformation',
          'Peter Schwartz: Best Case, Worst Case, Outlier, Business as Usual'
        ],
        historicalLineage: [
          'RAND Corporation - Herman Kahn (1950s)',
          'Shell - Pierre Wack & Peter Schwartz (1970s)',
          'Global Business Network (1987)'
        ],
        famousExample: 'Shell\'s scenarios helped them navigate 1973 oil crisis'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Scenario_planning',
      relatedMethodologies: [
        { id: 'cla', type: 'complements', description: 'CLA deepens scenario assumptions and worldviews' },
        { id: 'delphi', type: 'builds-on', description: 'Delphi expert consensus informs scenario construction' },
        { id: 'wild-cards', type: 'complements', description: 'Wild cards test scenario robustness and boundaries' },
        { id: 'cross-impact', type: 'builds-on', description: 'Cross-impact analysis maps interconnections between scenario drivers' }
      ],
      media: [
        {
          type: 'video',
          title: 'Pierre Wack on Shell Scenarios',
          url: 'https://www.youtube.com/watch?v=lEJmGzglPzo',
          description: 'Shell pioneer explaining scenario methodology',
          year: 1985
        },
        {
          type: 'video',
          title: 'Peter Schwartz: The Art of the Long View',
          url: 'https://www.youtube.com/watch?v=n3p6pPB3-SA',
          description: 'Schwartz on scenario planning practice',
          year: 1991
        },
        {
          type: 'image',
          title: 'Scenario Cross Matrix (2x2)',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Scenario_matrix.png/1200px-Scenario_matrix.png',
          description: 'Classic framework for generating scenarios'
        },
        {
          type: 'article',
          title: 'Scenario Planning',
          url: 'https://en.wikipedia.org/wiki/Scenario_planning',
          source: 'Wikipedia',
          description: 'Comprehensive guide to scenario methods'
        },
        {
          type: 'video',
          title: 'Jim Dator\'s Four Generic Futures',
          url: 'https://www.youtube.com/watch?v=6XU70gcKvbw',
          description: 'Dator explaining his four archetypes',
          year: 2009
        },
        {
          type: 'image',
          title: 'Four Generic Futures Framework',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Eisenhower_matrix.svg/512px-Eisenhower_matrix.svg.png',
          description: '2x2 matrix representing Dator\'s four future archetypes: Growth, Collapse, Steady State, and Transformation'
        },
        {
          type: 'image',
          title: 'Herman Kahn Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Herman Kahn.jpg',
          description: 'American physicist and futurist (1922-1983), RAND Corporation pioneer of scenario thinking'
        },
        {
          type: 'image',
          title: 'Peter Schwartz Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Schwartz_in_2022.jpg',
          description: 'American futurist and business strategist (b. 1946), popularized scenario planning through Global Business Network'
        },
        {
          type: 'image',
          title: 'RAND Corporation Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/Special:Redirect/file/Rand_Corporation_logo.svg',
          description: 'RAND Corporation - birthplace of scenario planning in the 1950s, where Herman Kahn pioneered the methodology'
        }
      ]
    },
    {
      id: 'wild-cards',
      label: 'Wild Card\nScenarios',
      parent: 'creating',
      description: 'Low-probability, high-impact events and discontinuities',
      color: '#99CC99',
      level: 2,
      yearIntroduced: 2001,
      pioneers: [
        {
          name: 'John Petersen',
          role: 'Formalized concept',
          organization: 'Arlington Institute',
          contribution: 'Systematized wild card thinking for strategic planning'
        },
        {
          name: 'Nassim Nicholas Taleb',
          role: 'Popularized as "Black Swans"',
          organization: 'Independent scholar',
          contribution: 'The Black Swan: Impact of highly improbable events (2007)'
        }
      ],
      historicalContext: 'Formalized as futures methodology in early 2000s. Taleb\'s "Black Swan" (2007) brought concept to mainstream, showing how rare events shape history more than gradual trends.',
      details: {
        overview: 'Wild cards are surprising events with low probability but potentially transformative impact. Thinking through wild cards helps organizations prepare for radical discontinuities.',
        characteristics: [
          'Low perceived probability',
          'High potential impact',
          'Rapid development',
          'Transformative effects'
        ],
        examples: [
          'COVID-19 pandemic',
          'September 11 attacks',
          'Fall of Berlin Wall',
          'Internet becoming mainstream'
        ],
        application: 'Include 1-2 wild card scenarios alongside plausible scenarios to stress-test strategies'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Wild_card_(foresight)',
      media: [
        {
          type: 'video',
          title: 'Preparing for Wild Card Events',
          url: 'https://www.youtube.com/watch?v=Gc8zNd4iGPs',
          description: 'Framework for wild card scenario development',
          year: 2014
        },
        {
          type: 'article',
          title: 'Wild Cards and Black Swans',
          url: 'https://en.wikipedia.org/wiki/Wild_card_(foresight)',
          source: 'Wikipedia',
          description: 'Understanding high-impact surprises'
        },
        {
          type: 'image',
          title: 'Probability vs Impact Matrix',
          url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/FAA_8040.4B_Risk_matrix.svg',
          description: 'FAA risk matrix showing probability and severity axes - perfect for assessing wild card scenarios'
        }
      ]
    },
    {
      id: 'morphological',
      label: 'Morphological\nAnalysis',
      parent: 'creating',
      description: 'Exploring solution spaces through parameter combinations',
      color: '#99CC99',
      level: 2,
      yearIntroduced: 1948,
      pioneers: [
        {
          name: 'Fritz Zwicky',
          role: 'Creator',
          organization: 'California Institute of Technology',
          contribution: 'Developed morphological analysis for systematic problem-solving'
        }
      ],
      historicalContext: 'Created by astrophysicist Zwicky at Caltech in 1930s-1940s, formalized in 1948 book "Morphological Astronomy". Applied to jet engines, leading to over 40 patents. Later adapted for futures and policy analysis.',
      details: {
        overview: 'Fritz Zwicky\'s method for systematically exploring all possible combinations of parameters to discover novel solutions.',
        process: [
          'Define problem precisely',
          'Identify all parameters/dimensions',
          'List possible values for each',
          'Create morphological box (matrix)',
          'Explore combinations systematically',
          'Evaluate promising configurations'
        ],
        creator: 'Fritz Zwicky (1948)',
        application: 'Generate comprehensive set of alternatives, discover non-obvious solutions'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Morphological_analysis_(problem-solving)',
      media: [
        {
          type: 'video',
          title: 'Fritz Zwicky on Morphological Method',
          url: 'https://www.youtube.com/watch?v=mWO2Z4HXZUs',
          description: 'Creator explaining the methodology',
          year: 1948
        },
        {
          type: 'image',
          title: 'Morphological Box Example',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Morphological_box.png/1200px-Morphological_box.png',
          description: 'Visual framework for exploring combinations'
        },
        {
          type: 'article',
          title: 'Morphological Analysis',
          url: 'https://en.wikipedia.org/wiki/Morphological_analysis_(problem-solving)',
          source: 'Wikipedia',
          description: 'Complete guide to the method'
        },
        {
          type: 'image',
          title: 'Fritz Zwicky Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/ETH-BIB-Zwicky, Fritz (1898-1974)-Portr 01030.tif',
          description: 'Swiss astronomer and astrophysicist (1898-1974), creator of morphological analysis and pioneer of dark matter theory'
        }
      ]
    },

    // Additional Toolbox Methods under CREATING
    {
      id: 'delphi',
      label: 'Delphi Method',
      parent: 'creating',
      description: 'Structured expert consensus building through iterative rounds',
      color: '#99CC99',
      level: 2,
      yearIntroduced: 1950,
      pioneers: [
        {
          name: 'Olaf Helmer',
          role: 'Co-creator',
          organization: 'RAND Corporation',
          contribution: 'Developed iterative expert consensus methodology'
        },
        {
          name: 'Norman Dalkey',
          role: 'Co-creator',
          organization: 'RAND Corporation',
          contribution: 'Designed anonymous feedback mechanism'
        },
        {
          name: 'Nicholas Rescher',
          role: 'Formalized logic',
          organization: 'RAND Corporation',
          contribution: 'Philosophical foundations for expert forecasting'
        }
      ],
      historicalContext: 'Developed at RAND in 1950-1960s for Cold War defense forecasting. Named after Oracle of Delphi. Kept secret until 1960s, then widely adopted for technology forecasting and policy planning.',
      details: {
        overview: 'The Delphi Method systematically gathers expert judgments through multiple rounds of questionnaires, with controlled feedback, to build consensus forecasts.',
        process: [
          'Round 1 - Experts provide independent forecasts',
          'Round 2 - Experts see anonymized results, revise',
          'Round 3 - Further refinement with reasoning',
          'Consensus - Aggregate final expert judgment'
        ],
        creator: 'RAND Corporation (1950s)',
        advantages: [
          'Avoids groupthink',
          'Anonymous participation',
          'Structured consensus',
          'Taps distributed expertise'
        ]
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Delphi_method',
      media: [
        {
          type: 'video',
          title: 'RAND Corporation on Delphi Method History',
          url: 'https://www.youtube.com/watch?v=nYG2ywI8c8E',
          description: 'Historical overview from the creators',
          year: 2014
        },
        {
          type: 'image',
          title: 'Delphi Process Flow Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Delphi_Method.png/1200px-Delphi_Method.png',
          description: 'Visual representation of iterative rounds'
        },
        {
          type: 'article',
          title: 'Delphi Method',
          url: 'https://en.wikipedia.org/wiki/Delphi_method',
          source: 'Wikipedia',
          description: 'Comprehensive guide to Delphi technique'
        },
        {
          type: 'image',
          title: 'RAND Corporation Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/Special:Redirect/file/Rand_Corporation_logo.svg',
          description: 'RAND Corporation - birthplace of Delphi Method in the 1950s for Cold War defense forecasting'
        }
      ]
    },
    {
      id: 'cross-impact',
      label: 'Cross-Impact\nAnalysis',
      parent: 'creating',
      description: 'Analyzing how events and trends influence each other',
      color: '#99CC99',
      level: 2,
      yearIntroduced: 1966,
      pioneers: [
        {
          name: 'Theodore Gordon',
          role: 'Creator',
          organization: 'RAND Corporation',
          contribution: 'Developed cross-impact matrix methodology'
        },
        {
          name: 'Olaf Helmer',
          role: 'Co-developer',
          organization: 'Institute for the Future',
          contribution: 'Applied to technology forecasting'
        }
      ],
      historicalContext: 'Developed at RAND in 1966 to overcome limitations of single-trend forecasting. Recognized that events don\'t occur in isolation but influence each other in complex ways.',
      details: {
        overview: 'Cross-Impact Analysis examines how different trends, events, or scenarios might interact and influence each other\'s likelihood and impact.',
        process: [
          'Identify key events/trends',
          'Create impact matrix',
          'Assess pairwise interactions',
          'Calculate cumulative effects',
          'Identify reinforcing/dampening loops'
        ],
        application: 'Understand systemic effects and feedback loops between futures'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Cross-impact_analysis',
      media: [
        {
          type: 'video',
          title: 'Cross-Impact Analysis Tutorial',
          url: 'https://www.youtube.com/watch?v=7jZ3CUmFKPM',
          description: 'How to conduct cross-impact analysis',
          year: 2015
        },
        {
          type: 'image',
          title: 'Cross-Impact Matrix',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cross_impact_matrix.png/1200px-Cross_impact_matrix.png',
          description: 'Example of impact assessment matrix'
        },
        {
          type: 'document',
          title: 'Initial Experiments with Cross-Impact Matrix (Gordon & Hayward, 1968)',
          url: 'https://www.rand.org/content/dam/rand/pubs/papers/2008/P3820.pdf',
          description: 'Theodore Gordon and Olaf Helmer\'s original RAND paper introducing cross-impact analysis methodology',
          year: 1968
        },
        {
          type: 'document',
          title: 'MICMAC Methodology Guide',
          url: 'https://www.sciencedirect.com/science/article/abs/pii/S0016328700000584',
          description: 'Duperrin & Godet\'s MICMAC (Matrix of Crossed Impacts - Multiplication Applied to a Classification) structural analysis method',
          year: 1973
        },
        {
          type: 'document',
          title: 'Cross-Impact Analysis for Foresight',
          url: 'https://www.foresight-platform.eu/wp-content/uploads/2011/04/Cross-Impact_Analysis.pdf',
          description: 'European Foresight Platform practical guide to conducting cross-impact analysis in strategic planning'
        }
      ]
    },

    // TRANSFORMING Methods
    {
      id: 'visioning',
      label: 'Visioning',
      parent: 'transforming',
      description: 'Articulating compelling images of preferred futures',
      color: '#FF6B9D',
      level: 2,
      yearIntroduced: 1987,
      pioneers: [
        {
          name: 'Warren Ziegler',
          role: 'Formalized participatory visioning',
          organization: 'Denver Delphi Project',
          contribution: 'Developed participatory methods for collective visioning'
        },
        {
          name: 'Elise Boulding',
          role: 'Imaging workshops',
          organization: 'Peace research',
          contribution: 'Created "Imaging a World Without Weapons" workshop method (1980s)'
        }
      ],
      historicalContext: 'Formalized as futures methodology in 1980s. Ziegler\'s participatory approach and Boulding\'s imaging workshops established visioning as democratic alternative to expert-driven forecasting.',
      details: {
        overview: 'Visioning creates vivid, detailed descriptions of desired future states that inspire action and guide decision-making.',
        components: [
          'Aspirational - Inspiring and motivating',
          'Concrete - Specific and tangible',
          'Inclusive - Incorporates diverse perspectives',
          'Actionable - Suggests pathways forward'
        ],
        application: 'Create shared vision to align stakeholders and guide strategy',
        distinction: 'Normative futures work - not predicting, but choosing what we want'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Vision_statement',
      media: [
        {
          type: 'video',
          title: 'Participatory Visioning Techniques',
          url: 'https://www.youtube.com/watch?v=uL3UbDyGq9A',
          description: 'How to facilitate visioning workshops',
          year: 2016
        },
        {
          type: 'article',
          title: 'Visioning in Strategic Foresight',
          url: 'https://en.wikipedia.org/wiki/Vision_statement',
          source: 'Wikipedia',
          description: 'Guide to creating effective visions'
        },
        {
          type: 'document',
          title: 'Elise Boulding\'s Imaging Workshop Methodology',
          url: 'https://www.mediate.com/articles/boulding.cfm',
          description: 'The "workshop of all workshops" - Boulding\'s technique of stepping through an imagined hedge 30 years into the future to create detailed preferred visions',
          year: 1988
        },
        {
          type: 'document',
          title: 'Warren Ziegler: Ways of Enspiriting',
          url: 'https://www.jstor.org/stable/43156527',
          description: 'Ziegler\'s participatory visioning framework emphasizing democratic engagement and collective imagination in futures work',
          year: 1991
        },
        {
          type: 'document',
          title: 'Participatory Futures Workshop Guide',
          url: 'https://www.peopleandparticipation.net/download/report/4907c5e7a6f58',
          description: 'European Awareness Scenario Workshop methodology - practical guide to facilitating participatory visioning sessions'
        }
      ]
    },
    {
      id: 'backcasting',
      label: 'Backcasting',
      parent: 'transforming',
      description: 'Working backwards from preferred future to identify pathways',
      color: '#FF6B9D',
      level: 2,
      yearIntroduced: 1982,
      pioneers: [
        {
          name: 'John Robinson',
          role: 'Creator',
          organization: 'University of Waterloo',
          contribution: 'Developed backcasting for energy policy and sustainability planning'
        },
        {
          name: 'Karl-Henrik Robèrt',
          role: 'Applied to sustainability',
          organization: 'The Natural Step',
          contribution: 'Created Natural Step framework using backcasting (1989)'
        }
      ],
      historicalContext: 'Robinson developed backcasting in 1982 for Canadian energy futures, recognizing forecasting couldn\'t address radical sustainability goals. Natural Step (1989) popularized approach globally.',
      details: {
        overview: 'Backcasting starts with a desired future and works backward to identify the steps needed to reach it. Essential when trend-break is required.',
        process: [
          'Step 1 - Define preferred future state (vision)',
          'Step 2 - Analyze gap between present and vision',
          'Step 3 - Identify milestones working backwards',
          'Step 4 - Determine actions needed at each step',
          'Step 5 - Create implementation pathway'
        ],
        keyDistinction: 'Forecasting = forward from present; Backcasting = backward from desired future',
        whenToUse: 'When business-as-usual won\'t reach target (sustainability, transformation)',
        creator: 'John Robinson (1982)',
        famousExample: 'The Natural Step framework for sustainability'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Backcasting',
      relatedMethodologies: [
        { id: 'visioning', type: 'builds-on', description: 'Backcasting requires clear vision of preferred future as starting point' },
        { id: 'scenarios', type: 'complements', description: 'Scenarios explore alternatives; backcasting maps pathway to chosen future' }
      ],
      media: [
        {
          type: 'video',
          title: 'John Robinson on Backcasting',
          url: 'https://www.youtube.com/watch?v=3QPZfcYTUdg',
          description: 'Creator explaining backcasting methodology',
          year: 2003
        },
        {
          type: 'image',
          title: 'Forecasting vs Backcasting Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Backcasting_vs_Forecasting.png/1200px-Backcasting_vs_Forecasting.png',
          description: 'Visual comparison of the two approaches'
        },
        {
          type: 'document',
          title: 'The Natural Step Framework (1989)',
          url: 'https://www.naturalstep.org/approach',
          description: 'Famous application of backcasting to sustainability',
          year: 1989
        },
        {
          type: 'article',
          title: 'Backcasting',
          url: 'https://en.wikipedia.org/wiki/Backcasting',
          source: 'Wikipedia',
          description: 'Complete guide to backcasting'
        }
      ]
    },
    {
      id: 'strategic-issue',
      label: 'Strategic Issue\nManagement',
      parent: 'transforming',
      description: 'Real-time response system for emerging opportunities and threats',
      color: '#FF6B9D',
      level: 2,
      yearIntroduced: 1980,
      pioneers: [
        {
          name: 'Igor Ansoff',
          role: 'Creator',
          organization: 'Strategic Management',
          contribution: 'Developed real-time response framework for strategic surprises'
        }
      ],
      historicalContext: 'Published in 1980 book "Strategic Issue Management". Built on his earlier weak signals work (1975), creating complete system for detecting, assessing, and responding to strategic discontinuities in real-time.',
      details: {
        overview: 'Igor Ansoff\'s framework for detecting and responding to strategic issues in real-time, balancing efficiency with flexibility.',
        components: [
          'Surveillance - Monitor for weak signals',
          'Assessment - Evaluate impact and urgency',
          'Response - Activate appropriate action',
          'Learning - Adapt system based on experience'
        ],
        creator: 'Igor Ansoff (1980)',
        philosophy: 'Organizations need both efficiency (operating system) and flexibility (strategic issue management)',
        application: 'Create dashboard for tracking and responding to strategic issues'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_management',
      media: [
        {
          type: 'video',
          title: 'Igor Ansoff on Strategic Surprise',
          url: 'https://www.youtube.com/watch?v=bNlcJo-u3wI',
          description: 'Ansoff on managing strategic discontinuities',
          year: 1975
        },
        {
          type: 'article',
          title: 'Strategic Issue Management',
          url: 'https://en.wikipedia.org/wiki/Strategic_management',
          source: 'Wikipedia',
          description: 'Overview of strategic management approaches'
        },
        {
          type: 'image',
          title: 'Ansoff Matrix (Product-Market Growth)',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ansoff_Matrix.JPG',
          description: 'Igor Ansoff\'s strategic planning framework: Market Penetration, Market Development, Product Development, Diversification'
        }
      ]
    },
    {
      id: 'aspirational-futures',
      label: 'Aspirational\nFutures Design',
      parent: 'transforming',
      description: 'Star Trek-inspired abundance futures through innovation and collaboration',
      color: '#FF6B9D',
      level: 2,
      yearIntroduced: 1966,
      pioneers: [
        {
          name: 'Gene Roddenberry',
          role: 'Visionary storyteller',
          organization: 'Star Trek',
          contribution: 'Created aspirational vision of post-scarcity, collaborative humanity exploring space united in purpose'
        },
        {
          name: 'Buckminster Fuller',
          role: 'Designer & systems thinker',
          organization: 'World Game Institute',
          contribution: 'Advocated "Design Science Revolution" - making world work for 100% of humanity through innovation'
        },
        {
          name: 'Jacque Fresco',
          role: 'Social engineer',
          organization: 'The Venus Project',
          contribution: 'Resource-based economy design eliminating scarcity through technology and intelligent management'
        }
      ],
      historicalContext: 'Star Trek (1966) presented optimistic future where humanity overcame scarcity, conflict, and division. Fuller\'s World Game (1969) and Fresco\'s Venus Project (1994) provided frameworks for achieving such futures through design and technology.',
      details: {
        overview: 'Aspirational Futures Design creates positive visions of abundance, collaboration, and enlightenment to inspire action toward preferred futures. Combines storytelling, systems thinking, and technological optimism.',
        principles: [
          'Abundance Mindset - Technology enables post-scarcity for all',
          'Global Collaboration - Diverse perspectives unite to solve challenges',
          'Human+AI Partnership - Technology augments human potential',
          'Innovation-Driven - Every challenge met with ingenuity',
          'Enlightenment Focus - Resources freed for human flourishing'
        ],
        pathway: 'Design desirable futures (2025-2099) → Build prototypes → Scale solutions → Achieve transformation',
        application: 'Create compelling visions that mobilize action toward Star Trek-like civilization',
        timeHorizon: '2025-2099 and beyond',
        philosophy: '"The best way to predict the future is to design it" - Buckminster Fuller'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Aspirational_reference_groups',
      media: [
        {
          type: 'video',
          title: 'Star Trek: Optimistic Vision of Future',
          url: 'https://www.youtube.com/watch?v=PjiXkJ6P8CI',
          description: 'Gene Roddenberry\'s inspiring vision of humanity\'s potential',
          year: 1991
        },
        {
          type: 'video',
          title: 'Buckminster Fuller: Thinking Out Loud',
          url: 'https://www.youtube.com/watch?v=BUUKm0k6FMg',
          description: 'Fuller on making the world work for everyone through design',
          year: 1996
        },
        {
          type: 'video',
          title: 'The Venus Project: Resource-Based Economy',
          url: 'https://www.youtube.com/watch?v=Yb5ivvcTvRQ',
          description: 'Jacque Fresco presenting vision of post-scarcity civilization',
          year: 2008
        },
        {
          type: 'image',
          title: 'Star Trek Enterprise: Symbol of Unity',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Milky_Way_IR_Spitzer.jpg',
          description: 'Humanity united in exploration and discovery - the aspirational vision'
        },
        {
          type: 'document',
          title: 'Operating Manual for Spaceship Earth',
          url: 'https://www.bfi.org/about-fuller/resources/operating-manual',
          description: 'Buckminster Fuller\'s guide to managing Earth\'s resources for all humanity',
          year: 1968
        },
        {
          type: 'article',
          title: 'Star Trek Economics: Post-Scarcity Futures',
          url: 'https://en.wikipedia.org/wiki/Star_Trek#Philosophy_and_themes',
          source: 'Wikipedia',
          description: 'Analysis of Star Trek\'s optimistic economic and social vision'
        }
      ]
    }
  ],

  // FUTURISTS & SCI-FI VISIONARIES
  futurists: [
    {
      id: 'kurzweil',
      type: 'futurist',
      label: 'Ray\nKurzweil',
      lifespan: '1948-present',
      color: '#00F5FF',
      level: 3,
      description: 'Inventor, futurist, and author known for predictions about AI and the technological singularity',
      details: {
        overview: 'Ray Kurzweil is one of the most accurate technological futurists, with a claimed 86% prediction accuracy rate (contested by some at 42%). He pioneered the "Law of Accelerating Returns" which predicts exponential growth in technology.',
        influence: 'Current Director of Engineering at Google. Influenced AI development, transhumanism, and long-range forecasting. Predicted smartphones, voice recognition, cloud computing, and AI assistants.',
        methodology: 'Law of Accelerating Returns, exponential growth modeling, singularity timeline projections',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'The Age of Intelligent Machines', year: 1990 },
        { title: 'The Age of Spiritual Machines', year: 1999 },
        { title: 'The Singularity Is Near', year: 2005 },
        { title: 'How to Create a Mind', year: 2012 },
        { title: 'The Singularity Is Nearer', year: 2024 }
      ],
      keyPredictions: [
        'Smartphones and portable computers (predicted 2009, iPhone 2007)',
        'Voice recognition AI assistants (Siri, Alexa)',
        'Cloud computing and internet mesh',
        'Real-time language translation',
        'Digital content distribution (streaming)',
        'Self-driving cars',
        'AGI by 2029 (pending)',
        'Technological singularity by 2045 (pending)'
      ],
      media: [
        {
          type: 'video',
          title: 'Ray Kurzweil: The Singularity is Near',
          url: 'https://www.youtube.com/watch?v=1uIzS1uCOcE',
          description: 'Kurzweil explaining his predictions for 2045',
          year: 2020
        },
        {
          type: 'video',
          title: 'Ray Kurzweil on The Law of Accelerating Returns',
          url: 'https://www.youtube.com/watch?v=IfbOyw3CT6A',
          description: 'Explaining exponential technological growth',
          year: 2015
        },
        {
          type: 'article',
          title: 'Ray Kurzweil - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Ray_Kurzweil',
          source: 'Wikipedia',
          description: 'Comprehensive biography and prediction record'
        },
        {
          type: 'document',
          title: 'The Law of Accelerating Returns (2001)',
          url: 'https://www.kurzweilai.net/the-law-of-accelerating-returns',
          description: 'Foundational essay on exponential technology growth',
          year: 2001
        },
        {
          type: 'image',
          title: 'Ray Kurzweil Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Portrait_of_Ray_Kurzweil.png',
          description: 'American inventor and futurist (b. 1948), known for 86% prediction accuracy and Law of Accelerating Returns'
        }
      ]
    },
    {
      id: 'toffler',
      type: 'futurist',
      label: 'Alvin\nToffler',
      lifespan: '1928-2016',
      color: '#FFCC66',
      level: 3,
      description: 'The "world\'s most famous futurologist" who established acceleration of change as fundamental principle',
      details: {
        overview: 'Toffler popularized concepts like "future shock," "information overload," and the "Third Wave" of civilization. He influenced leaders globally from China to Silicon Valley.',
        influence: 'Shaped environmental scanning, change management theory, STEEP analysis precursor. Predicted telecommuting, prosumer culture, and knowledge economy.',
        methodology: 'Three Waves framework, acceleration of change analysis, social transformation theory',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'Future Shock', year: 1970 },
        { title: 'The Third Wave', year: 1980 },
        { title: 'Powershift', year: 1990 }
      ],
      keyPredictions: [
        'Internet and email proliferation',
        'Telecommuting and "electronic cottage"',
        'Information overload',
        'Knowledge workers replacing industrial workers',
        'Prosumer culture (producer + consumer)',
        'Interactive media and cable TV',
        'Cloning and digital advancements'
      ],
      media: [
        {
          type: 'video',
          title: 'Alvin Toffler on Future Shock',
          url: 'https://www.youtube.com/watch?v=wJW_bF-GEJE',
          description: 'Toffler discussing acceleration of change',
          year: 1972
        },
        {
          type: 'article',
          title: 'Alvin Toffler - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Alvin_Toffler',
          source: 'Wikipedia',
          description: 'Biography and major works'
        },
        {
          type: 'image',
          title: 'Three Waves of Civilization Timeline',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Generation_timeline.svg/512px-Generation_timeline.svg.png',
          description: 'Timeline representing Toffler\'s three waves: Agricultural Age (~8000 BCE) → Industrial Age (~1750) → Information Age (~1950)'
        },
        {
          type: 'image',
          title: 'Alvin Toffler Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Alvin_Toffler_02.jpg',
          description: 'American futurist (1928-2016), author of Future Shock and The Third Wave'
        }
      ]
    },
    {
      id: 'fuller',
      type: 'futurist',
      label: 'Buckminster\nFuller',
      lifespan: '1895-1983',
      color: '#5C88DA',
      level: 3,
      description: 'Ranked #1 most influential futurist - pioneer of systems thinking and anticipatory design',
      details: {
        overview: 'Ranked #1 most influential futurist in Encyclopedia of the Future (ahead of H.G. Wells, Newton, da Vinci). Created "Spaceship Earth" concept and World Game.',
        influence: 'Founded systems thinking, sustainability frameworks, and regenerative design. Influenced contemporary futurists including Toffler, Peters, and Naisbitt.',
        methodology: 'World Game, Synergetics, Anticipatory Design Science, comprehensive systems approach',
        accuracyRating: 'high'
      },
      majorWorks: [
        { title: 'Operating Manual for Spaceship Earth', year: 1969 },
        { title: 'Synergetics', year: 1975 },
        { title: 'Critical Path', year: 1981 }
      ],
      keyPredictions: [
        'Earth as closed system requiring stewardship',
        'Need for global resource management',
        'Systems thinking and holistic approaches',
        'Sustainable architecture (geodesic domes)'
      ],
      media: [
        {
          type: 'video',
          title: 'Buckminster Fuller: Thinking Out Loud',
          url: 'https://www.youtube.com/watch?v=8ddKKEvGxmE',
          description: 'Fuller on anticipatory design science',
          year: 1975
        },
        {
          type: 'article',
          title: 'Buckminster Fuller - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Buckminster_Fuller',
          source: 'Wikipedia',
          description: 'Complete biography and innovations'
        },
        {
          type: 'image',
          title: 'Buckminster Fuller Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/R. Buckminster Fuller 1972.jpg',
          description: 'American architect and futurist (1895-1983), #1 most influential futurist, creator of Spaceship Earth concept'
        }
      ]
    },
    {
      id: 'asimov',
      type: 'sci-fi-writer',
      label: 'Isaac\nAsimov',
      lifespan: '1920-1992',
      color: '#00F5FF',
      level: 3,
      description: 'Created foundational frameworks for AI ethics and computational social science',
      details: {
        overview: 'Created the Three Laws of Robotics (1942) which remain fundamental for AI ethics. Invented "psychohistory" - mathematical sociology predicting large-scale trends, precursor to Big Data.',
        influence: 'Still influences AI developers and roboticists. Three Laws remain reference point for AI safety discussions. Inspired data science and predictive analytics.',
        methodology: 'Hard science fiction, mathematical sociology, ethical speculation',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'I, Robot', year: 1950 },
        { title: 'Foundation', year: 1951 },
        { title: 'The Caves of Steel', year: 1954 }
      ],
      keyPredictions: [
        'Three Laws of Robotics (AI ethics framework)',
        'Psychohistory (Big Data/predictive analytics)',
        'Digital education and learning systems',
        'Automated homes and smart appliances',
        'Portable communication devices',
        'Remote work and telecommuting'
      ],
      media: [
        {
          type: 'video',
          title: 'Isaac Asimov on Science Fiction and Prediction',
          url: 'https://www.youtube.com/watch?v=cFOCUr18dTQ',
          description: 'Asimov discussing role of sci-fi in futures thinking',
          year: 1988
        },
        {
          type: 'article',
          title: 'Isaac Asimov - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Isaac_Asimov',
          source: 'Wikipedia',
          description: 'Biography and complete works'
        },
        {
          type: 'image',
          title: 'Isaac Asimov Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Isaac.Asimov01.jpg',
          description: 'American biochemist and science fiction author (1920-1992), creator of Three Laws of Robotics'
        }
      ]
    },
    {
      id: 'clarke',
      type: 'sci-fi-writer',
      label: 'Arthur C.\nClarke',
      lifespan: '1917-2008',
      color: '#8B5CF6',
      level: 3,
      description: 'Predicted communications satellites 20 years before Sputnik - "Clarke Belt" named in his honor',
      details: {
        overview: 'Famous for Third Law: "Any sufficiently advanced technology is indistinguishable from magic." Predicted geostationary satellites (1945), tablet computers, voice AI, and remote work.',
        influence: 'Influenced space policy, satellite industry, and AI safety discourse. HAL 9000 anticipated AI systems expected by 2030-2040.',
        methodology: 'Hard science fiction, detailed technical speculation, Clarke\'s Three Laws',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: 'Rendezvous with Rama', year: 1973 },
        { title: 'The Fountains of Paradise', year: 1979 }
      ],
      keyPredictions: [
        'Communications satellites (1945) - "Clarke Belt"',
        'Tablet computers ("Newspad" in 2001)',
        'Voice assistants (HAL 9000 → Siri/Alexa)',
        'Remote work: "Men will no longer commute but communicate"',
        'Video calling and global connectivity',
        'Space elevators (pending)'
      ],
      media: [
        {
          type: 'video',
          title: 'Arthur C. Clarke Predicts the Future in 1964',
          url: 'https://www.youtube.com/watch?v=qYA0B3JMKXU',
          description: 'Clarke discussing future technology',
          year: 1964
        },
        {
          type: 'article',
          title: 'Arthur C. Clarke - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Arthur_C._Clarke',
          source: 'Wikipedia',
          description: 'Complete biography and Clarke\'s Laws'
        },
        {
          type: 'image',
          title: 'Arthur C. Clarke Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arthur C. Clarke (1982).jpg',
          description: 'British science fiction author (1917-2008), predicted communications satellites, Clarke Belt named in his honor'
        }
      ]
    },
    {
      id: 'crichton',
      type: 'sci-fi-writer',
      label: 'Michael\nCrichton',
      lifespan: '1942-2008',
      color: '#EC4899',
      level: 3,
      description: 'Master of cautionary tales exploring pathological failure of complex systems',
      details: {
        overview: 'Shaped bioethics and tech risk discourse through techno-thrillers. Explored biosecurity, AI control problems, genetic engineering ethics, and nanotechnology dangers.',
        influence: 'Jurassic Park influenced biotech regulation debates. Westworld presaged AI safety concerns. Shaped public discourse on emerging tech risks.',
        methodology: 'Techno-thriller, chaos theory application, risk forecasting, cautionary narrative',
        accuracyRating: 'high'
      },
      majorWorks: [
        { title: 'The Andromeda Strain', year: 1969 },
        { title: 'Westworld', year: 1973 },
        { title: 'Jurassic Park', year: 1990 },
        { title: 'Prey', year: 2002 }
      ],
      keyPredictions: [
        'Biotech ethics challenges and "playing God"',
        'AI control problems and emergence',
        'Nanotechnology dangers',
        'Corporate-driven tech risks',
        'Complex system failures (chaos theory)',
        'Surveillance and privacy erosion'
      ],
      media: [
        {
          type: 'article',
          title: 'Michael Crichton - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Michael_Crichton',
          source: 'Wikipedia',
          description: 'Complete works and influence'
        },
        {
          type: 'image',
          title: 'Michael Crichton Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/MichaelCrichton.jpg',
          description: 'American author and filmmaker (1942-2008), master of techno-thrillers and cautionary tales'
        }
      ]
    },
    {
      id: 'leguin',
      type: 'sci-fi-writer',
      label: 'Ursula K.\nLe Guin',
      lifespan: '1929-2018',
      color: '#F59E0B',
      level: 3,
      description: 'Used "elsewhere" to magnify contemporary issues decades before mainstream discourse',
      details: {
        overview: 'Explored gender fluidity (1969), alternative political systems, ecological thinking, and anarchist organization models through anthropological speculation.',
        influence: 'Shaped thinking on gender, governance, and ecology. Demonstrated sci-fi as tool for social imagination and worldbuilding.',
        methodology: 'Anthropological speculation, worldbuilding, social systems design',
        accuracyRating: 'high'
      },
      majorWorks: [
        { title: 'The Left Hand of Darkness', year: 1969 },
        { title: 'The Dispossessed', year: 1974 },
        { title: 'The Lathe of Heaven', year: 1971 }
      ],
      keyPredictions: [
        'Gender fluidity (1969, decades ahead)',
        'Alternative political/economic systems',
        'Ecological consciousness',
        'Anarchist organization models'
      ],
      media: [
        {
          type: 'video',
          title: 'Ursula K. Le Guin on Science Fiction',
          url: 'https://www.youtube.com/watch?v=ELfmWWzzWns',
          description: 'Le Guin discussing role of sci-fi in imagining alternatives',
          year: 2014
        },
        {
          type: 'article',
          title: 'Ursula K. Le Guin - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Ursula_K._Le_Guin',
          source: 'Wikipedia',
          description: 'Biography and major works'
        },
        {
          type: 'image',
          title: 'Ursula K. Le Guin Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ursula_K_Le_Guin.JPG',
          description: 'American author (1929-2018), explored gender fluidity and alternative social systems decades ahead of mainstream'
        }
      ]
    },
    {
      id: 'gibson',
      type: 'sci-fi-writer',
      label: 'William\nGibson',
      lifespan: '1948-present',
      color: '#06B6D4',
      level: 3,
      description: 'Coined "cyberspace" and envisioned internet culture before widespread internet',
      details: {
        overview: 'Created cyberpunk genre. Famous quote: "The future is already here, just unevenly distributed." Predicted VR, hacking culture, corporate tech dominance, neural interfaces.',
        influence: 'Shaped cyberpunk genre and tech industry imagination. Influenced Matrix films and VR development.',
        methodology: 'Near-future extrapolation, cultural trend analysis, cyberpunk worldbuilding',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'Neuromancer', year: 1984 },
        { title: 'Count Zero', year: 1986 },
        { title: 'Pattern Recognition', year: 2003 }
      ],
      keyPredictions: [
        'Cyberspace (coined the term)',
        'Virtual reality',
        'Hacking culture',
        'Corporate tech dominance',
        'Neural interfaces',
        'Augmented reality'
      ],
      media: [
        {
          type: 'video',
          title: 'William Gibson on Neuromancer',
          url: 'https://www.youtube.com/watch?v=U8sKRQ7MhAA',
          description: 'Gibson discussing cyberpunk and prediction',
          year: 2014
        },
        {
          type: 'article',
          title: 'William Gibson - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/William_Gibson',
          source: 'Wikipedia',
          description: 'Biography and influence on tech culture'
        },
        {
          type: 'image',
          title: 'William Gibson Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/William Gibson 60th birthday portrait.jpg',
          description: 'American-Canadian cyberpunk author (b. 1948), coined "cyberspace" and created cyberpunk genre'
        }
      ]
    },
    {
      id: 'stephenson',
      type: 'sci-fi-writer',
      label: 'Neal\nStephenson',
      lifespan: '1959-present',
      color: '#A855F7',
      level: 3,
      description: 'Coined "metaverse" 30 years before Meta/Facebook - works used by tech companies for R&D',
      details: {
        overview: 'Combines hard science with detailed social/cultural speculation. Snow Crash influenced tech industry vision of VR. Works used by Google, Microsoft for inspiration.',
        influence: 'Coined "metaverse" inspiring Meta/Facebook. Influenced virtual reality development, cryptocurrency concepts, and nanotechnology research.',
        methodology: 'Detailed technical speculation, alternative history, mathematical fiction',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'Snow Crash', year: 1992 },
        { title: 'The Diamond Age', year: 1995 },
        { title: 'Cryptonomicon', year: 1999 },
        { title: 'Anathem', year: 2008 }
      ],
      keyPredictions: [
        'Metaverse (coined 1992)',
        'Avatar culture',
        'Virtual economies',
        'Nanotechnology applications',
        'Cryptocurrency precursors',
        'AR/VR integration'
      ],
      media: [
        {
          type: 'video',
          title: 'Neal Stephenson on Snow Crash and the Metaverse',
          url: 'https://www.youtube.com/watch?v=Ok4vYkgC5U8',
          description: 'Stephenson discussing his predictions',
          year: 2021
        },
        {
          type: 'article',
          title: 'Neal Stephenson - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Neal_Stephenson',
          source: 'Wikipedia',
          description: 'Complete works and influence'
        },
        {
          type: 'image',
          title: 'Neal Stephenson Portrait',
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Reamde Reading by Neal Stephenson at Third Place Books - Flickr - brewbooks.jpg',
          description: 'American speculative fiction author (b. 1959), coined "metaverse" 30 years before Meta/Facebook'
        }
      ]
    }
  ],

  // SPECULATIVE FUTURES 2060+
  speculativeFutures: {
    root: {
      id: 'speculative-2060',
      label: 'Speculative\nFutures 2060+',
      description: 'Multiple plausible futures beyond conventional forecasting - the cone of possibilities',
      color: '#9D4EDD',
      level: 0,
      uncertainty: 'high',
      timeframe: '2060-2100',
      details: {
        overview: 'As we extend beyond 2060, uncertainty expands exponentially. These scenarios represent the "cone of possibilities" - multiple divergent futures shaped by critical uncertainties in AI, climate, biotechnology, and social evolution.',
        methodology: 'Combines scenario planning, science fiction prototyping, futures cone analysis, and long-range forecasting',
        inspiration: [
          'Futures Cone (Joseph Voros, 1994)',
          'Jim Dator\'s Four Generic Futures',
          'Shell Long-Range Scenarios',
          'Science Fiction Prototyping methodology'
        ],
        philosophy: 'The future cannot be predicted, but multiple futures can be imagined and prepared for'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Futures_cone',
      media: [
        {
          type: 'image',
          title: 'Futures Cone Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Futures_cone.svg/1200px-Futures_cone.svg.png',
          description: 'Visual representation of expanding uncertainty over time'
        },
        {
          type: 'article',
          title: 'The Futures Cone',
          url: 'https://thevoroscope.com/2017/02/24/the-futures-cone-use-and-history/',
          source: 'The Voroscope',
          description: 'History and application of the futures cone framework'
        }
      ]
    },

    scenarios: [
      {
        id: 'ai-singularity',
        label: 'AI\nSingularity',
        parent: 'speculative-2060',
        color: '#00F5FF',
        level: 1,
        uncertainty: 'high',
        probability: 'medium-high',
        timeframe: '2040-2060',
        description: 'Artificial General Intelligence achieved, leading to technological singularity and human-AI merger',
        details: {
          overview: 'AGI achieved by 2029-2040 (per Kurzweil and 50% of AI researchers), leading to technological singularity by 2045-2060. Human-AI merger becomes possible, redefining civilization.',
          keyMilestones: [
            '2029-2040: AGI achieved (Kurzweil prediction, expert consensus)',
            '2040-2050: AI surpasses human intelligence across all domains',
            '2050-2060: Singularity - exponential intelligence explosion',
            '2060+: Post-human civilization, mind uploading'
          ],
          drivers: [
            'Exponential growth in computing power',
            'Deep learning breakthroughs',
            'Quantum computing advances',
            'Brain-computer interface development'
          ],
          implications: [
            'Automated scientific discovery',
            'Solutions to climate, disease, aging',
            'Existential risk scenarios',
            'Redefinition of human purpose and identity'
          ],
          sources: 'Ray Kurzweil, Nick Bostrom, Metaculus AI predictions, AI researcher surveys'
        },
        media: [
          {
            type: 'video',
            title: 'Ray Kurzweil: Singularity 2045',
            url: 'https://www.youtube.com/watch?v=1uIzS1uCOcE',
            description: 'Predictions for the singularity timeline',
            year: 2020
          },
          {
            type: 'article',
            title: 'AI Timeline Predictions',
            url: 'https://ourworldindata.org/ai-timelines',
            source: 'Our World in Data',
            description: 'Expert consensus on AGI arrival'
          },
          {
            type: 'document',
            title: 'The Singularity Is Near',
            url: 'https://en.wikipedia.org/wiki/The_Singularity_Is_Near',
            description: 'Kurzweil\'s comprehensive singularity timeline',
            year: 2005
          }
        ]
      },
      {
        id: 'climate-adaptation',
        label: 'Climate\nAdaptation',
        parent: 'speculative-2060',
        color: '#10B981',
        level: 1,
        uncertainty: 'medium',
        probability: 'high',
        timeframe: '2030-2100',
        description: '+3°C warming triggers massive green tech mobilization and geoengineering',
        details: {
          overview: 'Global temperature increases 3°C by 2060. Massive green technology mobilization and geoengineering deployment establish precarious equilibrium or trigger runaway scenarios.',
          keyMilestones: [
            '2030-2040: Climate crisis deepens, mass displacement begins',
            '2040-2060: Geoengineering deployment, green tech scaling',
            '2060-2080: Stabilization or runaway scenarios diverge',
            '2080+: New climate equilibrium or cascading collapse'
          ],
          drivers: [
            'Carbon emissions trajectory',
            'Climate tipping point activation',
            'Geoengineering effectiveness',
            'Global cooperation levels',
            'Green technology advancement'
          ],
          implications: [
            '1 billion+ climate refugees',
            'Coastal megacity adaptation or abandonment',
            'Agricultural transformation (vertical farming, lab meat)',
            'Climate authoritarianism risk',
            'Regenerative economy transition'
          ],
          sources: 'IPCC scenarios, climate science consensus, Ministry for the Future (K.S. Robinson)'
        },
        media: [
          {
            type: 'image',
            title: 'IPCC Climate Scenarios 2100',
            url: 'https://www.ipcc.ch/site/assets/uploads/2018/02/SYR_AR5_FINAL_full.pdf',
            description: 'Official climate projection scenarios'
          },
          {
            type: 'article',
            title: 'Climate Change Scenarios',
            url: 'https://en.wikipedia.org/wiki/Representative_Concentration_Pathway',
            source: 'Wikipedia',
            description: 'RCP scenarios and implications'
          }
        ]
      },
      {
        id: 'space-expansion',
        label: 'Space\nExpansion',
        parent: 'speculative-2060',
        color: '#8B5CF6',
        level: 1,
        uncertainty: 'high',
        probability: 'medium',
        timeframe: '2040-2100',
        description: 'Multi-planetary species - Mars colony, asteroid mining, interplanetary economy',
        details: {
          overview: 'Humanity becomes multi-planetary. Mars colony established by 2060, asteroid mining viable, space-based economy emerges. New forms of governance for space settlements.',
          keyMilestones: [
            '2030-2045: Permanent Moon base, first Mars landings',
            '2045-2060: Mars colony 1000+ people, asteroid mining begins',
            '2060-2080: O\'Neill cylinders, interplanetary commerce',
            '2080+: Terraforming Mars, Jupiter moon bases'
          ],
          drivers: [
            'SpaceX/commercial space advancement',
            'Resource scarcity on Earth',
            'Geopolitical competition',
            'Technological breakthroughs (fusion, life support)'
          ],
          implications: [
            'Multi-planetary species resilience',
            'New forms of governance',
            'Space-based solar power',
            'Cultural diversification',
            'Off-world manufacturing'
          ],
          sources: 'CSIS Space 2060 scenarios, NASA planning, The Expanse (Corey), Red Mars (Robinson)'
        },
        media: [
          {
            type: 'document',
            title: 'The Future of Space 2060',
            url: 'https://aerospace.csis.org/data/space-futures/',
            description: 'Eight scenarios for space to 2060',
            source: 'CSIS',
            year: 2019
          },
          {
            type: 'article',
            title: 'Space Colonization',
            url: 'https://en.wikipedia.org/wiki/Space_colonization',
            source: 'Wikipedia',
            description: 'Technical and social challenges'
          }
        ]
      },
      {
        id: 'biotech-revolution',
        label: 'Biotech\nRevolution',
        parent: 'speculative-2060',
        color: '#EC4899',
        level: 1,
        uncertainty: 'high',
        probability: 'high',
        timeframe: '2030-2080',
        description: 'CRISPR mainstream - life extension, genetic enhancement, synthetic biology',
        details: {
          overview: 'CRISPR and synthetic biology transform human health and capabilities. Life extension to 120+, cognitive enhancement, designer genetics create new ethical divides between "GenRich" and "GenPoor".',
          keyMilestones: [
            '2030-2040: CRISPR mainstream, designer babies legalized',
            '2040-2060: Aging reversal, life expectancy 120+ years',
            '2060-2080: Synthetic organisms, radical human modification',
            '2080+: "Post-human" species divergence, genetic diversity'
          ],
          drivers: [
            'CRISPR and gene editing maturation',
            'Synthetic biology advances',
            'Longevity research breakthroughs',
            'Demand for enhancement',
            'Biotech commercialization'
          ],
          implications: [
            'Genetic inequality (GenRich vs GenPoor divide)',
            'Human identity questions',
            'Regulatory challenges',
            'Olympic splitting (natural/augmented/cyborg categories)',
            'Pandemic risks from engineered pathogens'
          ],
          sources: 'Gattaca (1997), Jurassic Park ethics, CRISPR research, bioethics discourse'
        },
        media: [
          {
            type: 'article',
            title: 'CRISPR Gene Editing',
            url: 'https://en.wikipedia.org/wiki/CRISPR',
            source: 'Wikipedia',
            description: 'Technology and ethical implications'
          },
          {
            type: 'article',
            title: 'Genetic Enhancement Ethics',
            url: 'https://en.wikipedia.org/wiki/Genetic_engineering#Ethics',
            source: 'Wikipedia',
            description: 'Ethical debates on human modification'
          }
        ]
      },
      {
        id: 'collapse-reset',
        label: 'Collapse\n& Reset',
        parent: 'speculative-2060',
        color: '#EF4444',
        level: 1,
        uncertainty: 'medium',
        probability: 'low-medium',
        timeframe: '2040-2080',
        description: 'Cascading failures fragment civilization into neo-medieval localized resilience',
        details: {
          overview: 'Polycrisis (climate + pandemic + conflict) triggers cascading system failures. Post-collapse world fragments into neo-medieval regions with localized resilience and regenerative practices.',
          keyMilestones: [
            '2030-2050: Polycrisis intensifies (climate + pandemic + war)',
            '2050-2070: Major system collapses, societal fragmentation',
            '2070-2100: Local adaptation, new social forms emerge',
            '2100+: Recovery pathways or permanent altered state'
          ],
          drivers: [
            'Climate tipping points cascading',
            'Resource depletion (water, soil, energy)',
            'Geopolitical conflict escalation',
            'Pandemic vulnerability',
            'Economic inequality extremes'
          ],
          implications: [
            'Population decrease 30-50%',
            'Localized governance and bioregionalism',
            'Low-tech resilience and appropriate technology',
            'Knowledge preservation challenges',
            'Potential for regenerative recovery'
          ],
          sources: 'Parable of the Sower (Butler), The Road (McCarthy), collapse studies, resilience theory'
        },
        media: [
          {
            type: 'article',
            title: 'Societal Collapse',
            url: 'https://en.wikipedia.org/wiki/Societal_collapse',
            source: 'Wikipedia',
            description: 'Historical patterns and modern risks'
          },
          {
            type: 'article',
            title: 'Resilience Theory',
            url: 'https://en.wikipedia.org/wiki/Resilience_(ecology)',
            source: 'Wikipedia',
            description: 'Recovery and adaptation frameworks'
          }
        ]
      }
    ]
  },

  // POSITIVE FUTURES 2025-2099: Star Trek Pathway
  positiveFutures: {
    root: {
      id: 'positive-2025',
      label: 'Positive\nFutures 2025-2099',
      description: 'Star Trek-inspired pathway: abundance, collaboration, enlightenment',
      color: '#10B981',
      level: 0,
      uncertainty: 'medium',
      timeframe: '2025-2099',
      details: {
        overview: 'An optimistic trajectory where humanity meets challenges with innovation, collaboration, and abundance thinking - progressing toward an enlightened, post-scarcity civilization by 2099.',
        philosophy: 'Human ingenuity + AI partnership + global cooperation = Star Trek-like future',
        principles: [
          'Every challenge met with invention',
          'Diverse perspectives drive solutions',
          'Technology creates abundance for all',
          'Resources freed for human flourishing'
        ]
      }
    },
    milestones: [
      {
        id: 'ai-collaboration-era',
        year: '2025-2035',
        title: 'AI+Human Collaboration Era',
        description: 'AI systems augment human creativity and problem-solving',
        color: '#10B981',
        uncertainty: 'low',
        probability: 'medium-high',
        details: {
          overview: 'Foundation decade where AI transitions from tool to partner, amplifying human capabilities across science, education, and creativity',
          keyDevelopments: [
            'AI assistants become ubiquitous research partners',
            'Personalized education reaches global scale',
            'Scientific discovery accelerates 10x through AI collaboration',
            'Creative tools democratize innovation'
          ],
          tippingPoint: 'AI systems prove beneficial when aligned with human values',
          societalImpact: 'Productivity boom, knowledge work transforms, new forms of human-machine collaboration emerge',
          sources: 'OpenAI forecasts, MIT Technology Review, AI alignment research'
        },
        media: []
      },
      {
        id: 'post-scarcity-prototypes',
        year: '2040-2050',
        title: 'Post-Scarcity Prototypes',
        description: 'Energy abundance and resource optimization demonstrate feasibility',
        color: '#10B981',
        uncertainty: 'medium',
        probability: 'medium',
        details: {
          overview: 'Breakthrough decade where fusion power, advanced recycling, and AI resource management create regional abundance models',
          keyDevelopments: [
            'Commercial fusion power reaches grid parity',
            'AI-optimized resource allocation eliminates waste',
            'Vertical farming feeds cities sustainably',
            'Advanced materials enable circular economy'
          ],
          tippingPoint: 'First regions achieve energy + food abundance',
          societalImpact: 'Scarcity mindset begins shifting, basic needs guaranteed in pilot regions, economic models evolve',
          sources: 'ITER fusion project, Buckminster Fuller Institute, circular economy research'
        },
        media: []
      },
      {
        id: 'global-cooperation-frameworks',
        year: '2060-2075',
        title: 'Global Cooperation Frameworks',
        description: 'United problem-solving transcends national boundaries',
        color: '#10B981',
        uncertainty: 'medium',
        probability: 'medium',
        details: {
          overview: 'Maturation decade where existential challenges (climate, pandemics, asteroids) necessitate and enable global coordination',
          keyDevelopments: [
            'Climate restoration becomes coordinated global project',
            'Planetary defense systems operational',
            'Universal translation enables seamless collaboration',
            'Shared challenges build trust and interdependence'
          ],
          tippingPoint: 'Successful global mobilization proves cooperation works',
          societalImpact: 'National interests align with planetary wellbeing, "Spaceship Earth" mindset dominates, new governance models emerge',
          sources: 'Star Trek philosophy, Operating Manual for Spaceship Earth (Fuller), UN SDGs evolution'
        },
        media: []
      },
      {
        id: 'enlightenment-renaissance',
        year: '2080-2099',
        title: 'Enlightenment Renaissance',
        description: 'Human potential unlocked, golden era begins',
        color: '#10B981',
        uncertainty: 'high',
        probability: 'medium',
        details: {
          overview: 'Culmination decade where abundance + collaboration + technology free humanity to pursue wisdom, exploration, and self-actualization',
          keyDevelopments: [
            'Basic needs universally met through automation',
            'Education becomes lifelong journey of discovery',
            'Space exploration unites humanity in common purpose',
            'Arts and sciences flourish with freed human potential'
          ],
          tippingPoint: 'Society prioritizes meaning over material accumulation',
          societalImpact: 'Star Trek-like civilization emerges, human flourishing becomes primary goal, new challenges focus on growth and exploration',
          sources: 'Star Trek vision (Roddenberry), The Venus Project (Fresco), transhumanist optimism'
        },
        media: []
      }
    ]
  }
};

export default mindMapData;
