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
      grokipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Environmental_scanning',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Causal_layered_analysis',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Scenario_planning',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Backcasting',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Futures_Triangle',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Stakeholder_analysis',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Environmental_scanning',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Weak_signals',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Emerging_issues_analysis',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Fernand_Braudel',
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
      details: {
        overview: 'Various theories propose that social, economic, and technological change follows cyclical patterns. Understanding these can help anticipate turning points.',
        types: [
          'Kondratiev Waves - 40-60 year economic/technology cycles',
          'Generational Theory - 20-year cohort cycles (Strauss-Howe)',
          'Technology Cycles - S-curves of innovation adoption'
        ],
        application: 'Identify where we are in current cycles to anticipate transitions'
      },
      grokipedia: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Causal_layered_analysis',
      media: [
        {
          type: 'video',
          title: 'Sohail Inayatullah Explains CLA',
          url: 'https://www.youtube.com/watch?v=7-8Xe9m7riM',
          description: 'Creator demonstrating CLA methodology',
          year: 2011
        },
        {
          type: 'image',
          title: 'CLA Four Layers Diagram',
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Causal_Layered_Analysis.png/1200px-Causal_Layered_Analysis.png',
          description: 'Visual representation of the four analytical layers'
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
      details: {
        overview: 'Discourse analysis examines how language shapes reality, maintains power structures, and frames what futures are thinkable.',
        focus: [
          'Language and terminology choices',
          'Narrative frames and stories',
          'Power/knowledge relationships',
          'Dominant and marginalized discourses'
        ],
        inspiration: 'Michel Foucault - Power/Knowledge',
        application: 'Deconstruct dominant narratives to reveal alternatives and empower marginalized voices'
      },
      grokipedia: 'https://en.wikipedia.org/wiki/Discourse_analysis',
      media: [
        {
          type: 'video',
          title: 'Michel Foucault on Power and Knowledge',
          url: 'https://www.youtube.com/watch?v=BBJTeNTZtGU',
          description: 'Foucault discussing discourse and power',
          year: 1984
        },
        {
          type: 'article',
          title: 'Discourse Analysis in Futures Studies',
          url: 'https://en.wikipedia.org/wiki/Discourse_analysis',
          source: 'Wikipedia',
          description: 'Methods for analyzing discourse'
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
      grokipedia: 'https://en.wikipedia.org/wiki/Scenario_planning',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Wild_card_(foresight)',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Morphological_analysis_(problem-solving)',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Delphi_method',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Cross-impact_analysis',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Vision_statement',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Backcasting',
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
      grokipedia: 'https://en.wikipedia.org/wiki/Strategic_management',
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
        }
      ]
    }
  ]
};

export default mindMapData;
