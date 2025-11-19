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
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Futures_cone.svg',
        description: 'Visual representation of possible, plausible, probable, and preferable futures expanding from the present moment. This foundational diagram shows how uncertainty increases over time, with different categories of futures nested within each other - from the broadest cone of possible futures to the narrowest desired preferable futures.'
      },
      {
        type: 'article',
        title: 'Futures Studies - Encyclopedia Entry',
        url: 'https://en.wikipedia.org/wiki/Futures_studies',
        source: 'Wikipedia',
        description: 'Comprehensive overview of the field and its history, covering major methodologies, pioneers, and theoretical foundations. Essential reading for understanding how futures thinking evolved from military planning to a multidisciplinary academic field.'
      },
      {
        type: 'image',
        title: 'SWOT Analysis Framework',
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/SWOT_en.svg',
        description: 'Foundation matrix for strategic analysis mapping Strengths, Weaknesses, Opportunities, and Threats. This classic 2x2 framework helps organizations assess internal capabilities against external environment, forming the basis for strategic planning and foresight work.'
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
      description: 'Three competing forces - push of the present, pull of envisioned futures, weight of historical inertia - shaping plausible future trajectories',
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
        overview: 'The Futures Triangle analyzes the interplay of three fundamental forces that determine which futures are plausible. Created by Sohail Inayatullah as a simple diagnostic tool, it reveals why certain futures emerge while others remain stuck in aspiration. The triangle maps the dynamic tension between what we want (pull), where we are heading (push), and what holds us back (weight). This tension zone determines what futures can actually materialize versus those that remain wishful thinking.',
        components: [
          'Pull of the Future - The visions, goals, and aspirations that attract us forward',
          'Push of the Present - Current trends and drivers propelling us toward certain futures',
          'Weight of the Past - Historical barriers, legacies, and inertia resisting change'
        ],
        application: 'Plot issues on the triangle to understand tensions and identify pathways forward',
        creator: 'Sohail Inayatullah',

        processGuide: {
          title: 'How to Conduct a Futures Triangle Analysis',
          steps: [
            {
              number: 1,
              name: 'Define the focal issue',
              description: 'Clearly articulate the future you are exploring. Frame it as a specific outcome or transformation (e.g., "renewable energy transition by 2040" or "shift to remote-first work culture"). Ensure stakeholders agree on the time horizon and scope. A well-defined issue makes the three-force analysis more actionable.',
              timeRequired: '30-45 minutes',
              deliverable: 'Clear statement of the future being analyzed with defined time horizon'
            },
            {
              number: 2,
              name: 'Map the Pull of the Future',
              description: 'Identify the visions, aspirations, and ideal outcomes that attract people toward this future. What do different stakeholders hope will happen? What values drive the desire for change? Include both articulated goals (policy statements, strategic plans) and implicit aspirations (cultural movements, emerging ideals). Ask: What images of the future inspire action? Who champions this future and why? Pull forces are often emotional and values-driven, not just rational.',
              timeRequired: '45-60 minutes',
              deliverable: 'List of 5-10 pull forces with sources and stakeholders identified'
            },
            {
              number: 3,
              name: 'Identify the Push of the Present',
              description: 'Map current trends, technologies, and momentum already underway that propel us toward (or away from) the focal future. These are empirical forces with data behind them: demographic shifts, technological adoption curves, economic trends, policy changes, behavioral patterns. Push forces exist whether we want them or not. Ask: What is already happening that makes this future more or less likely? What trends have momentum behind them? Push forces are data-driven and observable.',
              timeRequired: '60-90 minutes',
              deliverable: 'List of 8-15 push forces with supporting data and trend evidence'
            },
            {
              number: 4,
              name: 'Uncover the Weight of the Past',
              description: 'Identify historical legacies, institutional inertia, cultural barriers, and structural constraints that resist change. These include: existing infrastructure and sunk costs, established power structures and vested interests, cultural norms and mental models, regulations and institutional rules, and deeply embedded habits and practices. Weight forces are often invisible until examined deliberately. Ask: What makes change difficult? Who benefits from the status quo? What infrastructure locks us into current patterns? Weight forces are structural and systemic.',
              timeRequired: '60-90 minutes',
              deliverable: 'List of 8-15 weight forces with analysis of resistance sources'
            },
            {
              number: 5,
              name: 'Analyze the tensions',
              description: 'Plot forces on a triangle diagram and examine where they conflict or reinforce each other. Strong pull + strong push + weak weight = likely future. Strong weight + weak pull + weak push = blocked future. Identify which forces are negotiable versus structural. Look for leverage points where small changes could shift the dynamic. Ask: Which force is dominant? Where are the irreconcilable conflicts? What would need to change to shift the balance?',
              timeRequired: '45-60 minutes',
              deliverable: 'Triangle diagram with forces mapped and tensions analyzed'
            },
            {
              number: 6,
              name: 'Develop strategic pathways',
              description: 'Based on the triangle analysis, identify actionable strategies: strengthen pull forces through compelling narratives and coalition-building, accelerate push forces through policy, investment, and innovation, or reduce weight forces by addressing root barriers and creating transitional pathways. Prioritize strategies based on feasibility and leverage. Create monitoring indicators to track how the triangle shifts over time.',
              timeRequired: '60-90 minutes',
              deliverable: 'Strategic action plan with priorities and monitoring framework'
            }
          ],
          totalTime: '5-7 hours for comprehensive analysis',
          facilitationTips: 'Use large wall chart or digital whiteboard. Color-code forces by strength. Revisit triangle quarterly as forces evolve. Combine with stakeholder analysis to understand who influences each force.'
        },

        workedExample: {
          title: 'Electric Vehicle Transition in Southeast Asia by 2035',
          context: 'Regional policymakers analyzing EV adoption feasibility',
          pullForces: [
            'Climate commitments under Paris Agreement',
            'Urban air quality improvement goals',
            'Energy independence aspirations',
            'Green technology leadership ambitions'
          ],
          pushForces: [
            'Declining battery costs (80% reduction since 2010)',
            'Major automakers announcing EV-only futures',
            'China and India EV manufacturing scale-up',
            'Ride-hailing fleet electrification programs',
            'Young consumer preference for sustainable products'
          ],
          weightForces: [
            'Massive investment in fossil fuel refining infrastructure',
            'Auto industry jobs tied to internal combustion engines',
            'Limited charging infrastructure outside major cities',
            'Lower purchasing power favoring used gasoline vehicles',
            'Electricity grid constraints and coal dependency',
            'Cultural attachment to motorcycle transportation'
          ],
          analysis: 'Triangle reveals strong push (technology and market forces) and moderate pull (policy aspirations) but very strong weight (infrastructure lock-in and economic constraints). The tension suggests partial transition concentrated in urban centers rather than complete regional transformation by 2035.',
          strategicImplication: 'Focus on high-leverage interventions: mandate EV taxis/delivery fleets first, invest in charging corridors along major routes, create battery recycling and second-life programs, and develop financing models for lower-income buyers. Do not assume passenger vehicle market will lead transition naturally.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Futures_Triangle',
      caseStudies: [
        {
          title: 'Singapore Smart Nation 2025 - Identifying Barriers to Digital Transformation',
          organization: 'Singapore Government Technology Agency',
          year: 2015,
          challenge: 'Singapore aimed to become a "Smart Nation" but faced unclear understanding of what forces would enable or block digital transformation across society. Leaders needed a framework to map the complex dynamics beyond just technology deployment.',
          application: 'Government facilitated Futures Triangle workshops with cross-sector stakeholders (tech industry, civil society, academia, government agencies). Participants mapped pull forces (vision for digital economy, citizen service improvement, global competitiveness), push forces (smartphone adoption, 5G deployment, AI maturity, startup ecosystem growth), and weight forces (aging population digital divide, privacy concerns, bureaucratic silos, legacy IT systems, risk-averse governance culture).',
          outcome: 'Triangle revealed that weight forces (especially organizational culture and legacy systems) were significantly underestimated compared to pull and push. This led to strategic shift: creation of GovTech agency with mandate to break down silos, major investment in digital literacy programs for seniors, and experimental "regulatory sandboxes" to reduce risk aversion. By 2020, Singapore ranked #1 on UN E-Government Index.',
          insights: 'Futures Triangle prevented common mistake of assuming technology adoption (push) alone would drive transformation. Surfacing cultural and organizational weight forces early allowed targeted interventions. Method was accessible enough for diverse stakeholders to contribute, creating shared ownership of the analysis.',
          sourceUrl: 'https://www.smartnation.gov.sg'
        },
        {
          title: 'University of Hawaii Cancer Center - Strategic Direction Amid Uncertainty',
          organization: 'University of Hawaii Cancer Center',
          year: 2010,
          challenge: 'Cancer center leadership faced decision about research focus areas for next decade. Uncertainty about funding, technology, and demographics made traditional strategic planning inadequate. Needed method to surface hidden assumptions about institutional inertia.',
          application: 'Director Sohail Inayatullah facilitated Futures Triangle with research faculty, clinicians, administrators, and patient advocates. Pull forces included becoming top-10 cancer center, personalized medicine leadership, and reducing Native Hawaiian cancer disparities. Push forces mapped genomics breakthroughs, aging population, shift to outpatient care, and data science capabilities. Weight forces revealed significant institutional barriers: researcher silos, traditional funding models, publish-or-perish culture misaligned with translational research, and lack of indigenous community trust.',
          outcome: 'Weight force analysis led to creation of community partnership office, shift from individual PI grants to collaborative teams, and investment in indigenous health researchers. Center received NCI designation renewal in 2012 with praise for innovative community engagement model. Native Hawaiian cancer mortality rates decreased 15% by 2018.',
          insights: 'Triangle made visible the "weight of colonialism" in health research - a force that was affecting outcomes but never explicitly discussed in strategic planning. Tool gave permission to name uncomfortable truths. The simplicity of three categories made complex institutional dynamics discussable. Revisiting triangle annually kept strategy dynamic rather than fixed.',
          sourceUrl: 'https://www.uhcancercenter.org'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Arrange room with three wall sections labeled Pull, Push, Weight. Provide color-coded sticky notes (green for pull, blue for push, red for weight). Display large triangle diagram centrally. Plan for 3-4 hour session with 15-30 participants representing diverse stakeholder perspectives.',
        groupDynamics: 'Watch for tendency of senior leaders to dominate pull forces (vision) while frontline staff focus on weight (barriers). Actively solicit weight forces early to create psychological safety for truth-telling. Use silent brainstorming first, then group discussion to prevent groupthink. Ensure voices from different organizational levels contribute to each force category.',
        commonChallenges: [
          'Participants confuse weight (structural barriers) with lack of will - clarify weight forces are systemic constraints not personal failures',
          'Over-focusing on weight leads to pessimism - balance by celebrating strong pull/push forces too',
          'Abstract forces need grounding - ask for specific examples and data for each force',
          'Triangle becomes static - emphasize forces evolve and plan quarterly reviews'
        ],
        successIndicators: 'Participants have "aha moments" recognizing previously invisible forces. Laughter or discomfort when naming taboo weight forces (sign of honesty). Concrete action items emerge naturally from analysis. Leaders ask to institutionalize triangle as ongoing strategic tool.'
      },

      successCriteria: {
        processQuality: [
          'All three force categories populated with specific, concrete examples',
          'Forces backed by evidence (data for push, stakeholder quotes for pull, structural analysis for weight)',
          'Diverse stakeholder perspectives represented in each category',
          'Tensions and conflicts between forces explicitly identified'
        ],
        outcomeQuality: [
          'Strategic insights that challenge initial assumptions',
          'Clear identification of leverage points for intervention',
          'Shared understanding among stakeholders of why futures are plausible or blocked',
          'Monitoring framework established to track force evolution over time'
        ]
      },

      comparativeAnalysis: {
        vsScenarioPlanning: 'Futures Triangle is diagnostic (analyzing one future) while scenario planning is generative (creating multiple futures). Use triangle first to understand current forces, then scenarios to explore how forces might recombine differently. Triangle is faster (3-4 hours vs. 2-3 days for scenarios) and more accessible to non-experts.',
        vsSWOTAnalysis: 'SWOT maps organizational factors (internal strengths/weaknesses, external opportunities/threats) while Futures Triangle maps temporal forces (aspirations, trends, legacies). SWOT is present-focused; triangle is futures-oriented. Triangle reveals tensions SWOT misses: strong vision (opportunity) may be blocked by weight (legacy constraints).',
        whenToUse: 'Use Futures Triangle for quick futures diagnostic (3-6 hours), testing plausibility of a specific future, surfacing hidden barriers and assumptions, or as workshop warm-up before deeper foresight work. Avoid when need multiple alternative futures (use scenarios instead) or when forces are too complex for three categories (use Causal Layered Analysis instead).'
      },
      metadata: {
        difficulty: 'beginner',
        timeRequired: '2-4 hours',
        groupSize: 'small-large groups (5-30 people)',
        bestFor: ['Quick situation analysis', 'Identifying strategic tensions', 'Workshop warm-up exercise', 'Clarifying competing forces'],
        sectors: ['Government policy', 'Corporate strategy', 'NGO planning', 'Community development'],
        commonPitfalls: ['Superficial identification of forces without deep analysis', 'Treating categories as silos rather than dynamic tensions', 'Focusing only on barriers (weight) while ignoring vision (pull)', 'Not updating triangle as situation evolves']
      },
      media: [
        {
          type: 'image',
          title: 'The Futures Triangle Framework',
          url: '/diagrams/futures-triangle.svg',
          description: 'Educational diagram showing the three forces shaping futures (Sohail Inayatullah, 2008): Pull of the Future (aspirations, visions, hopes), Push of the Present (current trends, drivers, momentum), and Weight of the Past (inertia, barriers, resistance). The plausible futures space emerges from the dynamic tension between these forces. Includes practical examples for each force.'
        },
        {
          type: 'video',
          title: 'Sohail Inayatullah Explains the Futures Triangle',
          url: 'https://www.youtube.com/watch?v=2nI8OLJjMCw',
          description: 'Creator of the method explains its application',
          year: 2012
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
        overview: 'Stakeholder Analysis in foresight systematically maps who has stakes in the future and what they envision. Formalized by R. Edward Freeman in 1984 for strategic management, adapted for futures work to reveal competing visions shaping which futures emerge. Unlike traditional stakeholder analysis focused on current interests, futures-oriented stakeholder mapping explores: What future do they want? What power do they have to realize it? Whose voices dominate futures narratives? Who is excluded? The insight: futures don\'t emerge neutrally but through contestation between stakeholders with differing power, interests, and visions. Some stakeholders (governments, corporations, dominant groups) shape mainstream futures while others (marginalized communities, nature, future generations) lack voice despite high stakes. Mapping reveals: Which futures scenarios favor whom? Where do stakeholder visions conflict? Which coalitions could shift power dynamics? The methodology combines power/interest grids (plotting stakeholders by influence and concern), influence networks (mapping relationships), and perspective matrices (comparing future visions). Modern applications extend to participatory foresight ensuring inclusive engagement, conflict analysis surfacing tensions early, and strategic planning identifying allies and opponents. The value: preventing futures work from serving only powerful stakeholders, surfacing hidden conflicts before implementation, and building coalitions around preferred futures.',
        components: [
          'Identify key stakeholders',
          'Map their interests and power',
          'Understand their future visions',
          'Analyze relationships and conflicts'
        ],
        application: 'Create power/interest grids, influence maps, and perspective matrices',

        processGuide: {
          title: 'How to Conduct Stakeholder Analysis for Foresight',
          steps: [
            {
              number: 1,
              name: 'Identify comprehensive stakeholder set',
              description: 'Brainstorm all entities with stakes in the future: organizations, communities, demographics, ecosystems, future generations. Include obvious (government, business, NGOs) and hidden (informal networks, marginalized groups). Mitchell et al framework: assess power (ability to influence), legitimacy (rightful claim), urgency (time sensitivity). Don\'t limit to human stakeholders—consider environment, non-human species. Cast wide net initially, will prioritize later.',
              timeRequired: 'Half-day workshop',
              deliverable: 'Comprehensive stakeholder inventory with power/legitimacy/urgency ratings'
            },
            {
              number: 2,
              name: 'Map stakeholder positions and power',
              description: 'Plot stakeholders on power/interest grid: High power + high interest = key players (manage closely), high power + low interest = context setters (keep satisfied), low power + high interest = subjects (keep informed), low power + low interest = crowd (monitor). Assess influence networks: who influences whom? Who are connectors, brokers, isolated actors? Power isn\'t only formal authority—includes resources, expertise, legitimacy, network position, narrative control. Document current positions on key issues affecting futures.',
              timeRequired: '1-2 days',
              deliverable: 'Power/interest grid and influence network map with documented positions'
            },
            {
              number: 3,
              name: 'Surface stakeholder future visions',
              description: 'Understand what future each stakeholder wants. Conduct interviews, analyze public statements, review strategic plans. Create perspective matrix comparing visions across dimensions: economic models, technology adoption, governance structures, environmental priorities, social arrangements. Distinguish stated visions (public positions) from underlying interests (true motivations). Identify: Which visions align? Which conflict fundamentally? Whose visions dominate discourse? Whose are marginalized?',
              timeRequired: '1-2 weeks for research and synthesis',
              deliverable: 'Perspective matrix comparing stakeholder future visions with analysis of alignments and conflicts'
            },
            {
              number: 4,
              name: 'Analyze coalitions and conflicts',
              description: 'Map potential alliances and antagonisms. Which stakeholders share visions and could coalition? Which have irreconcilable conflicts? Use conflict analysis: what are core tensions? Are conflicts over values (zero-sum) or interests (negotiable)? Identify bridging stakeholders who span divides. Consider power shifts: Which stakeholders gaining influence? Which declining? How might power dynamics evolve affecting which futures become possible?',
              timeRequired: '3-5 days',
              deliverable: 'Coalition map showing alliances, conflicts, and potential bridges with power shift analysis'
            },
            {
              number: 5,
              name: 'Assess inclusivity and representation',
              description: 'Critically examine whose voices are present and absent. Who lacks power but has high legitimacy (future generations, nature, marginalized communities)? Whose visions aren\'t being heard in mainstream futures discourse? Consider representation: Who speaks for stakeholders without voice? What mechanisms ensure their inclusion? Participatory foresight principle: those affected by futures should help shape them. Identify strategies to amplify marginalized voices.',
              timeRequired: '2-3 days',
              deliverable: 'Inclusivity assessment identifying underrepresented stakeholders with engagement recommendations'
            },
            {
              number: 6,
              name: 'Develop engagement strategy',
              description: 'Design stakeholder engagement tailored to analysis. Key players: deep collaboration, co-creation. Context setters: consultation, influence. Subjects: participation, voice. Crowd: information, transparency. For participatory foresight: How to engage stakeholders in visioning, scenario development, backcasting? For strategic planning: Which coalitions to build? Which conflicts to navigate? Which stakeholders to educate, negotiate with, or challenge? Update strategy as stakeholder positions and power evolve.',
              timeRequired: '1 week',
              deliverable: 'Stakeholder engagement plan with specific tactics for each stakeholder group'
            }
          ],
          totalTime: '4-6 weeks for comprehensive stakeholder analysis',
          facilitationTips: 'Include diverse perspectives in mapping team to surface blind spots. Use participatory methods—stakeholders can help identify other stakeholders and map power dynamics. Be transparent about analysis purpose—stakeholder mapping can be politically sensitive. Update regularly as positions and power shift. Combine qualitative understanding (visions, values) with quantitative metrics (power scores, network centrality). Visualize findings to make complex stakeholder landscapes comprehensible.'
        },

        workedExample: {
          title: 'Urban Transit Futures: Stakeholder Analysis for City Transportation 2040',
          context: 'City planning sustainable transport futures. Stakeholder analysis reveals competing visions, power dynamics, and coalition opportunities.',
          stakeholders: 'Identified: Municipal government (high power/interest), automobile industry (high power/low interest), public transit unions (moderate power/high interest), environmental NGOs (low power/high interest), suburban commuters (low power/moderate interest), downtown businesses (moderate power/high interest), cycling advocates (low power/high interest), ride-sharing companies (emerging power/high interest), low-income residents (low power/high stakes—depends on affordable transit), future generations (no formal power/ultimate stakes—inheriting infrastructure decisions).',
          visionConflicts: 'Vision divergence: Auto industry favors electric vehicle future maintaining car dominance; environmental NGOs want car-free urban cores with mass transit; unions want job-protecting transit expansion; ride-sharing companies want autonomous vehicle future reducing need for transit or private cars; cyclists want bike infrastructure prioritization; low-income communities need affordable mobility regardless of technology. Fundamental conflict: car-centric vs. transit-centric vs. shared mobility vs. active transport visions.',
          powerDynamics: 'Auto industry: high economic power (jobs, investment) but declining political legitimacy (climate, congestion). Municipal government: formal authority but constrained by state/federal policy and funding. Ride-sharing: growing power through lobbying and market disruption. Environmental NGOs: increasing legitimacy from climate urgency, moderate mobilization capacity. Unions: declining membership but strategic position to disrupt. Cycling advocates: growing middle-class support but limited political power. Low-income residents and future generations: highest stakes, lowest voice.',
          coalitions: 'Potential progressive coalition: Environmental NGOs + cycling advocates + public health advocates + progressive politicians around car-free, transit-oriented vision. Resistance coalition: Auto industry + suburban commuters + some businesses around maintaining car access. Bridging opportunity: Low-income transit advocates could connect progressive vision with social equity, strengthening political viability. Ride-sharing companies: wild card, could align with either depending on business model evolution.',
          engagementStrategy: 'Key players (government): intensive co-design. Context setters (auto, business): consultation and negotiation. Subjects (transit-dependent communities): participatory visioning ensuring their needs shape scenarios. Crowd (general public): information campaigns. Amplify marginalized voices: create advisory panels for low-income residents, youth (representing future generations). Use scenarios showing how different visions serve different stakeholders to make power dynamics visible and surface trade-offs explicitly.',
          outcome: 'Stakeholder analysis revealed transit futures aren\'t technical choices but political contestations. Shaped scenario development to explore visions favoring different coalitions. Informed engagement ensuring marginalized voices included. Identified that middle path (multimodal future) could build broader coalition than either extreme. Prevented futures process from serving only powerful stakeholders.'
        }
      },
      relatedMethodologies: [
        { id: 'env-scanning', type: 'complements', description: 'Stakeholder mapping reveals who to scan for signals and emerging issues in the environment' },
        { id: 'scenario-planning', type: 'builds-on', description: 'Stakeholder analysis informs which scenarios to develop based on competing visions of different groups' },
        { id: 'visioning', type: 'prerequisite', description: 'Understanding stakeholder perspectives is essential before creating inclusive preferred futures' }
      ],
      caseStudies: [
        {
          title: 'South African Truth and Reconciliation Commission: Stakeholder Analysis for National Futures',
          organization: 'South African Government',
          year: 1996,
          challenge: 'Post-apartheid South Africa needed inclusive futures vision reconciling deeply divided stakeholders. Stakeholder analysis essential to ensure all voices heard in shaping post-apartheid future.',
          application: 'Comprehensive stakeholder mapping identified: victims of apartheid, perpetrators, political parties (ANC, National Party, others), business community, international observers, white and black South Africans, tribal authorities, religious leaders, youth. Power/interest analysis revealed: Previously marginalized black majority now had political power but economic power remained concentrated. Truth Commission created space for victim voices typically excluded from national planning. Used restorative justice framing to bridge stakeholder divides.',
          outcome: 'Stakeholder-inclusive process enabled peaceful transition by giving voice to previously silenced. Revealed that multiple competing visions of South African future existed. Inclusive stakeholder engagement built legitimacy for transition even among those who lost power. Demonstrated that futures work in divided societies requires explicit stakeholder analysis to prevent perpetuating exclusion.',
          insights: 'In contexts with deep power imbalances, stakeholder analysis must actively amplify marginalized voices. Inclusivity isn\'t neutral facilitation but deliberate intervention to rebalance power dynamics. Transparent acknowledgment of stakeholder conflicts often more productive than pretending consensus exists.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Stakeholder analysis workshops require diversity in mapping team to avoid blind spots—don\'t let dominant stakeholders map themselves. Use visual tools: large wall space for power/interest grids, network mapping. Provide stakeholder identification prompts across sectors. Create safe space for naming power dynamics honestly. Plan 1-2 day workshops for comprehensive mapping.',
        groupDynamics: 'Include marginal and central voices in mapping team. Facilitator must actively draw out perspectives of less powerful participants—dominant stakeholders naturally shape discourse. Use anonymous input methods (cards, digital tools) to surface uncomfortable truths about power. Acknowledge that stakeholder analysis itself is political act shaping whose voice counts.',
        commonChallenges: [
          'Mapping only obvious, powerful stakeholders. Solution: Use systematic prompts. Ask "who is affected but absent?" Include future generations, nature, marginalized groups.',
          'Confusing stated positions with underlying interests. Solution: Dig deeper through interviews. Distinguish surface rhetoric from core motivations.',
          'Static analysis not tracking evolving positions. Solution: Build regular updates into process. Track power shifts and changing alliances.',
          'Analysis without action. Solution: Link directly to engagement strategy and scenario development. Make stakeholder insights actionable.'
        ],
        successIndicators: 'Previously invisible stakeholders identified. Power dynamics made explicit and discussable. Marginalized voices amplified in futures process. Coalition opportunities recognized. Conflicts surfaced early enabling navigation. Engagement strategy tailored to different stakeholder groups. Participants report changed understanding of whose future is being planned.'
      },
      successCriteria: {
        processQuality: [
          'Comprehensive stakeholder identification including marginalized and non-human',
          'Power/interest mapping with documented rationale',
          'Future vision comparison revealing alignments and conflicts',
          'Coalition and conflict analysis',
          'Explicit inclusivity assessment',
          'Participatory mapping including diverse voices',
          'Regular updates tracking shifts'
        ],
        outcomeQuality: [
          'Futures process includes previously excluded voices',
          'Power dynamics transparent and addressed',
          'Scenarios reflect diverse stakeholder visions not just dominant narratives',
          'Coalitions built around shared preferred futures',
          'Conflicts navigated rather than erupting unexpectedly',
          'Engagement strategy tailored to stakeholder landscape',
          'Legitimacy of futures work strengthened through inclusivity'
        ]
      },
      comparativeAnalysis: {
        vsPowerAnalysis: 'Stakeholder analysis in foresight specifically maps future visions and how power shapes which futures emerge. General power analysis examines current influence structures. Foresight stakeholder mapping is forward-looking and vision-oriented.',
        vsParticipation: 'Stakeholder analysis reveals who to involve; participatory methods are how to involve them. Analysis informs engagement design. Integration: map stakeholders first, then design participation processes accordingly.',
        whenToUse: 'Essential for: participatory foresight, contested futures with competing interests, public policy requiring legitimacy, organizational change affecting diverse groups. Critical when: power imbalances risk excluding important voices, conflicts likely to derail implementation, coalition-building needed. Less relevant when: stakeholder landscape homogeneous, consensus already exists, technical problem without political dimensions. Most effective when: transparently acknowledge political nature of futures, commitment to inclusive engagement, willingness to shift power dynamics.'
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Stakeholder_analysis',
      metadata: {
        difficulty: 'beginner',
        timeRequired: '4-8 hours',
        groupSize: 'small groups (3-8 people) or facilitated workshops',
        bestFor: ['Mapping power dynamics', 'Identifying key influencers', 'Participatory planning', 'Conflict analysis'],
        sectors: ['Public policy', 'Corporate strategy', 'Community development', 'Infrastructure projects'],
        commonPitfalls: ['Mapping only obvious stakeholders, missing hidden influencers', 'Static analysis that doesn\'t track changing positions', 'Confusing stated positions with underlying interests', 'Not distinguishing between power, legitimacy, and urgency']
      },
      media: [
        {
          type: 'image',
          title: 'Stakeholder Power/Interest Matrix (Educational)',
          url: '/diagrams/stakeholder-power-interest.svg',
          description: 'Comprehensive 2×2 stakeholder mapping framework with detailed engagement strategies for each quadrant: Manage Closely (high power/high interest key players requiring partnership), Keep Satisfied (high power/low interest influencers to satisfy without burdening), Keep Informed (low power/high interest advocates to consult actively), and Monitor (low power/low interest peripheral stakeholders). Includes concrete examples, strategic guidance, and engagement approaches for effective stakeholder management in foresight and futures work.',
          source: 'AK Consulting'
        },
        {
          type: 'image',
          title: 'Stakeholder Power/Interest Grid',
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Stakeholder_analysis.png',
          description: 'Classic 2x2 framework for mapping stakeholder relationships based on their power (ability to influence) and interest (degree of concern) in an issue. This grid helps prioritize engagement strategies: manage closely (high power/high interest), keep satisfied (high power/low interest), keep informed (low power/high interest), or monitor (low power/low interest).'
        },
        {
          type: 'image',
          title: 'Stakeholder Matrix (Four Quadrants)',
          url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Stakeholders_matrix.svg',
          description: 'Four-quadrant stakeholder mapping framework showing the relationship between power and interest levels. This visualization helps identify key players requiring close management, context setters to keep satisfied, subjects to keep informed, and the crowd to monitor. Essential tool for participatory foresight and futures work involving diverse stakeholder groups.'
        },
        {
          type: 'article',
          title: 'Stakeholder Analysis in Foresight',
          url: 'https://en.wikipedia.org/wiki/Stakeholder_analysis',
          source: 'Wikipedia',
          description: 'Comprehensive guide to stakeholder mapping techniques used in foresight work, covering methods for identifying stakeholders, assessing their future visions, analyzing power dynamics, and engaging diverse voices in participatory futures processes.'
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
      description: 'Systematic environmental monitoring across STEEP domains (Social, Technological, Economic, Environmental, Political) to detect trends, signals, and emerging changes',
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
        overview: 'Environmental Scanning is systematic monitoring of the external environment to detect signals of change before they become obvious trends. Pioneered by Francis Joseph Aguilar at Harvard Business School in 1967, it emerged from recognition that organizations miss critical changes because they focus inward while threats and opportunities develop externally. Aguilar introduced ETPS framework (Economic, Technical, Political, Social) for structured scanning. Chun Wei Choo formalized scanning processes in 1999 with Four Modes framework: Undirected Viewing (broad exposure without specific agenda), Conditioned Viewing (directed attention to areas of concern), Informal Search (active but unstructured information gathering), and Formal Search (methodical research on defined questions). The methodology evolved from business intelligence to strategic foresight, expanding to STEEP domains (Social, Technological, Economic, Environmental, Political). Modern scanning combines human sense-making with digital tools: RSS feeds, topic monitoring, AI-powered trend detection. The value proposition: organizations that scan systematically detect changes earlier than competitors relying on conventional news, gaining lead time for strategic adaptation. Scanning is not passive reading—it requires deliberate attention allocation, diverse source selection, sense-making to interpret ambiguous signals, and dissemination mechanisms to inform decision-makers. When institutionalized, scanning creates organizational peripheral vision, reducing strategic surprise and expanding opportunity recognition.',
        modes: [
          'Undirected Viewing - Broad exposure with no specific purpose',
          'Conditioned Viewing - Directed exposure in areas of interest',
          'Informal Search - Active seeking for specific information',
          'Formal Search - Structured, methodical search efforts'
        ],
        creator: 'Choo (1999) - Four Modes of Scanning',
        domains: 'STEEP - Social, Technological, Economic, Environmental, Political',

        processGuide: {
          title: 'How to Implement Environmental Scanning',
          steps: [
            {
              number: 1,
              name: 'Design scanning architecture',
              description: 'Define what to scan, where to look, and how often. Map STEEP domains relevant to your context: which social trends matter? which technologies? which policy developments? Identify information sources for each domain: publications, databases, conferences, expert networks, social media, patent filings. Balance breadth (discovering unexpected) with depth (understanding critical areas). Establish scanning rhythm: daily for fast-moving domains (technology, markets), weekly for medium-pace (policy), monthly for slow-changing (demographics). Create scanning assignments so domains don\'t fall through cracks. Document in scanning charter.',
              timeRequired: '1-2 weeks for initial design',
              deliverable: 'Scanning architecture document with STEEP domain map, source inventory, and scanning schedule'
            },
            {
              number: 2,
              name: 'Build scanning team and assign roles',
              description: 'Environmental scanning works best when distributed across organization rather than centralized in single analyst. Recruit scanning team representing different perspectives: technical specialists, market analysts, policy watchers, social trend observers. Assign STEEP domains to individuals based on expertise and interest. Define roles: scanners (gather signals), synthesizers (identify patterns), disseminators (share intelligence), coordinator (ensure coverage and avoid duplication). Provide training: what constitutes signal vs. noise? how to use scanning sources? how to tag and share findings? Create psychological safety so scanners flag uncertain signals without fear of being wrong.',
              timeRequired: '2-3 weeks',
              deliverable: 'Scanning team roster with domain assignments, role definitions, and trained participants'
            },
            {
              number: 3,
              name: 'Establish scanning routines',
              description: 'Convert scanning from ad hoc activity to habitual practice. Individuals: allocate daily/weekly scanning time (30-60 minutes for most). Use RSS readers, Google Alerts, topic monitoring tools to aggregate sources. Organizations: create scanning workflow using collaboration platforms (Slack channels for each STEEP domain, shared databases for signals, tagging systems for categorization). Balance undirected viewing (serendipitous discovery) with directed scanning (monitoring known concerns). Encourage diverse sources: academic journals, fringe publications, international media, practitioner communities, startup ecosystems—not just mainstream business news. Document signals in standardized format: what was observed, source, potential implications, confidence level.',
              timeRequired: 'Ongoing with 30 min-2 hour daily commitment',
              deliverable: 'Scanning workflow with tools configured, routines established, and initial signals documented'
            },
            {
              number: 4,
              name: 'Filter and synthesize signals',
              description: 'Raw scanning generates volume—filtering extracts value. Weekly or monthly synthesis sessions: scanning team reviews accumulated signals, identifies patterns across domains (e.g., AI signals in technology domain + regulatory signals in political domain = convergent trend), prioritizes signals by potential impact and uncertainty, develops initial interpretations. Use synthesis frameworks: which signals reinforce existing scenarios? which challenge assumptions? which represent genuine novelty? Create signal summaries: 1-page briefs on significant patterns with evidence, alternative interpretations, and strategic questions. Distinguish three categories: clear trends (strong signals, high confidence), emerging issues (moderate signals, building evidence), weak signals (ambiguous but potentially important).',
              timeRequired: 'Weekly 1-2 hour synthesis sessions',
              deliverable: 'Signal synthesis reports with categorized findings, pattern analysis, and strategic questions'
            },
            {
              number: 5,
              name: 'Disseminate intelligence to decision-makers',
              description: 'Scanning creates value only when insights reach decision-makers. Design dissemination appropriate to audience: executives need crisp summaries highlighting strategic implications, planners need detailed signal catalogs for scenario development, business units need domain-specific intelligence. Formats: weekly email bulletins with top 5 signals, monthly synthesis reports, quarterly horizon scanning briefings for leadership, signal database accessible to all. Avoid information overload: prioritize quality over quantity. Make intelligence actionable: every signal summary should answer "so what?" and suggest "now what?" Create feedback loops: do decision-makers find scanning valuable? which signals proved useful? which domains need more coverage?',
              timeRequired: 'Weekly reporting + quarterly reviews',
              deliverable: 'Intelligence dissemination system with multiple formats, distribution channels, and usage feedback'
            },
            {
              number: 6,
              name: 'Review and refine scanning system',
              description: 'Quarterly or annual scanning system audit: Are we detecting signals others miss (competitive advantage) or just aggregating obvious news (low value)? Which domains yielded highest-value signals? Which sources most productive? Which scanners most effective? What signals were missed that we should have caught? Update source inventory removing low-value feeds, adding productive new ones. Adjust STEEP domain focus based on strategic priorities. Rotate scanning assignments to prevent fatigue and maintain fresh perspectives. Invest in scanners\' professional development: conferences, training, networks. Measure lead time: how much earlier did scanning detect change vs. mainstream awareness? This metric validates scanning investment.',
              timeRequired: 'Quarterly half-day reviews',
              deliverable: 'Scanning system performance assessment with refinements to sources, assignments, and processes'
            }
          ],
          totalTime: '6-8 weeks to establish; ongoing operation becomes organizational routine',
          facilitationTips: 'Start small: pilot with one business unit or strategic priority before enterprise rollout. Demonstrate value through early wins: identify signal that proves strategically important, build credibility. Integrate with existing processes rather than creating parallel structure: feed scanning into strategic planning, innovation pipelines, risk management. Use technology to enhance, not replace, human judgment—algorithms aggregate, humans interpret. Celebrate scanning success stories to build culture of peripheral vision.'
        },

        workedExample: {
          title: 'UK Government Office for Science: Horizon Scanning Programme',
          context: 'The UK Government Office for Science operates horizon scanning to identify emerging issues affecting national policy across next 50 years. Challenge: government departments focus on immediate crises; long-term strategic issues get neglected until they become crises. Solution: systematic environmental scanning to surface issues early.',
          architecture: 'Scanning covers STEEP domains relevant to government: S (demographic shifts, social movements), T (emerging technologies like AI, biotech, quantum), E (economic disruption, trade patterns), E (climate, biodiversity, resource scarcity), P (geopolitical realignments, governance challenges). Sources include academic journals, think tank reports, international organizations (UN, OECD), patent databases, startup ecosystems, expert workshops, citizen input. Scanning rhythm: continuous monitoring with quarterly synthesis.',
          team: 'Cross-government scanning network: each department assigns horizon scanners who monitor their domain (health, defense, education) while contributing to whole-of-government picture. Central Horizon Scanning Centre coordinates, synthesizes cross-cutting themes, and disseminates intelligence. External expert networks provide domain expertise. Approximately 50 active scanners across government.',
          process: 'Individual scanners allocate time weekly to monitor sources, document signals in shared database tagged by STEEP domain and department relevance. Monthly synthesis: Horizon Scanning Centre reviews database, identifies patterns, conducts expert consultations to interpret ambiguous signals. Quarterly reports: Top 10-15 emerging issues with evidence, implications, and policy questions. Annual report: comprehensive horizon scan across all domains informing national strategy.',
          outcomes: 'Detected early signals: AI governance challenges (2015-2016, before mainstream), antimicrobial resistance becoming crisis (2010-2012), supply chain vulnerabilities (2018-2019, validated by COVID), demographic aging implications (ongoing). Policy impact: scanning informed national AI strategy, pandemic preparedness (albeit imperfect), net-zero transition planning. By surfacing issues 5-10 years before crisis, enabled proactive policy development rather than reactive crisis management.',
          lessons: 'Institutional commitment essential—scanning requires protected time and leadership engagement. Cross-domain synthesis creates most value: issues rarely confined to single STEEP category. External networks provide signals internal bureaucracy misses. Regular dissemination keeps scanning relevant—unused intelligence breeds cynicism. Scanning works best when integrated with foresight methods (scenarios, emerging issues analysis) not isolated intelligence function.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Environmental_scanning',
      relatedMethodologies: [
        { id: 'stakeholder-analysis', type: 'complements', description: 'Stakeholder mapping identifies who to scan and which perspectives to monitor for emerging signals' },
        { id: 'weak-signals', type: 'builds-on', description: 'Environmental scanning is the systematic process that detects weak signals across STEEP domains' },
        { id: 'emerging-issues', type: 'complements', description: 'Scanning provides the raw data from which emerging issues are identified and analyzed' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Scanning across multiple domains provides essential input for developing robust scenarios' }
      ],
      caseStudies: [
        {
          title: 'Royal Dutch Shell: Pioneering Corporate Environmental Scanning',
          organization: 'Royal Dutch Shell Strategic Planning Group',
          year: 1970,
          challenge: 'Following 1973 oil crisis, Shell recognized need for systematic monitoring of external environment beyond traditional market intelligence. Company had been blindsided by geopolitical shift (OPEC embargo) because scanning focused narrowly on technical and market domains, missing political developments.',
          application: 'Shell established comprehensive scanning system across STEEP domains: Social (changing attitudes toward energy), Technology (alternative energy R&D), Economic (global trade patterns), Environmental (emerging environmental movement), Political (resource nationalism, geopolitical shifts). Created network of in-house scanners and external experts providing diverse perspectives. Scanning fed into scenario planning process (Shell pioneered scenario methodology partly in response to scanning insights). Rhythm: continuous monitoring with monthly synthesis, quarterly scenario updates.',
          outcome: 'Scanning detected early signals of environmental movement strengthening (1970s-1980s), former Soviet Union instability (1980s), renewable energy potential (1990s-2000s), shale revolution possibility (2000s). By detecting changes earlier than competitors, Shell adapted faster: divested coal anticipating environmental pressure, entered renewables earlier, navigated oil price volatility more effectively. The scanning system became institutionalized culture—every executive expected to contribute signals from their domain. Demonstrated scanning creates competitive advantage in volatile industries.',
          insights: 'Effective scanning requires executive engagement, not just analyst activity. External networks (academics, government, startups) provide signals internal teams miss. Scanning most valuable when integrated with foresight methods—Shell combined scanning with scenarios. Requires long-term commitment: value accumulates over years as pattern recognition improves, not immediate. Shell case showed scanning works in commercial context, not just government intelligence.'
        },
        {
          title: 'Singapore Centre for Strategic Futures: Risk Assessment and Horizon Scanning',
          organization: 'Singapore Government Prime Minister\'s Office',
          year: 2009,
          challenge: 'Small island nation highly vulnerable to external shocks needed systematic early warning system. Traditional government focus on immediate crises meant strategic issues emerged only after becoming problems.',
          application: 'Established Risk Assessment and Horizon Scanning (RAHS) network spanning all ministries. Each ministry assigns officers to scan their domain (health, education, defense, economy) while contributing to cross-government synthesis. Central CSF coordinates and identifies cross-cutting themes. Scanning covers 10-50 year horizon across STEEP domains. Quarterly synthesis produces strategic issue reports for Cabinet. Annual comprehensive horizon scan informs national strategy and budget planning.',
          outcome: 'Early detection of strategic issues: AI implications for workforce (2015), pandemic risks (pre-COVID), supply chain vulnerabilities, demographic challenges, climate adaptation needs. When COVID-19 emerged, scanning system had already flagged pandemic risk, enabling faster government response. Scanning influenced policy: AI strategy, smart nation initiatives, resilience investments. Demonstrated scanning at national scale creates policy advantage.',
          insights: 'Whole-of-government scanning requires institutional mandate from top leadership (Prime Minister). Cross-ministry synthesis reveals connections single-department scanning misses. Regular reporting cycles force discipline—scanning can\'t just accumulate, must inform decisions. Small, vulnerable entities benefit most from scanning because single missed signal can be catastrophic.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Environmental scanning workshops train participants in systematic monitoring. Provide source inventory across STEEP domains. Demonstrate scanning tools: RSS readers, topic alerts, databases. Practice signal documentation and synthesis. Allow participants to select domains matching their expertise and interest. Create accountability: participants commit to specific scanning assignments and reporting rhythm.',
        groupDynamics: 'Diverse scanning team outperforms homogeneous one—different perspectives detect different signals. Mix: domain experts (depth) with generalists (breadth), optimists (opportunities) with pessimists (threats), insiders (organizational context) with outsiders (fresh eyes). Rotate domains periodically to prevent blind spots. Celebrate signal discovery to build positive culture around scanning.',
        commonChallenges: [
          'Information overload: Too many sources, scanners overwhelmed. Solution: Start narrow, expand gradually. Use filters and aggregation tools. Prioritize quality over quantity—10 high-value sources better than 100 low-value ones.',
          'Scanning without synthesis: Signals accumulate but patterns missed. Solution: Mandatory weekly/monthly synthesis sessions. Assign synthesizer role explicitly. Use frameworks to structure pattern recognition.',
          'Dissemination failure: Intelligence doesn\'t reach decision-makers. Solution: Design multiple dissemination formats for different audiences. Build feedback loops showing how scanning informed decisions. Make intelligence actionable, not just informative.',
          'Fading commitment: Initial enthusiasm wanes, scanning becomes sporadic. Solution: Institutionalize with protected time, performance metrics, leadership recognition. Demonstrate value through documented successes. Integrate into existing workflows rather than additional burden.'
        ],
        successIndicators: 'Effective scanning shows: Signals detected before becoming mainstream news. Strategic decisions reference scanned intelligence. Reduced surprises from external changes. Diverse signal portfolio across all STEEP domains, not concentrated in favorite areas. Active use of intelligence by decision-makers. Scanning team engaged and sustained, not experiencing turnover or burnout.'
      },
      successCriteria: {
        processQuality: [
          'Comprehensive STEEP domain coverage with explicit assignments',
          'Diverse source portfolio including academic, practitioner, fringe, international',
          'Regular scanning rhythm maintained consistently (daily/weekly per domain)',
          'Synthesis sessions occurring on schedule with pattern identification',
          'Signal documentation standardized and accessible',
          'Dissemination reaching decision-makers in actionable formats',
          'Periodic system reviews with refinements based on performance'
        ],
        outcomeQuality: [
          'Signals detected earlier than competitors or mainstream awareness',
          'Strategic decisions informed by scanning intelligence',
          'Avoided surprises from external changes due to early detection',
          'Opportunities identified and captured before competitors',
          'Balanced signal portfolio across threats and opportunities',
          'Cross-domain synthesis revealing connections single-domain scanning misses',
          'Organizational culture values peripheral vision and external monitoring'
        ]
      },
      comparativeAnalysis: {
        vsWeakSignals: 'Environmental scanning is the systematic process; weak signals are what it detects. Scanning spans all STEEP domains continuously; weak signal analysis focuses on interpreting specific ambiguous indicators. Use scanning to find signals, weak signal methods to interpret them.',
        vsTrendAnalysis: 'Scanning is broader and earlier. Trend analysis examines established patterns with strong data; scanning detects emerging patterns with weak data. Scanning feeds trend analysis by surfacing phenomena before they become measurable trends. Use scanning for discovery, trend analysis for quantification.',
        vsStrategicIssueManagement: 'Scanning is surveillance component of strategic issue management. Issue management includes scanning plus assessment, response, and learning. Scanning is input; issue management is complete system. Integrate: use scanning to feed strategic issue management pipeline.',
        whenToUse: 'Essential for: organizations in high-velocity environments, entities vulnerable to external shocks, strategic planning requiring external data, competitive intelligence, government policy development. Less useful for: purely internal process improvement, stable environments with minimal external change, organizations lacking capacity to act on intelligence. Most effective when: sustained over time (patterns emerge from longitudinal scanning), integrated with other foresight methods (scenarios, issues analysis), disseminated to decision-makers who value intelligence.'
      },
      metadata: {
        difficulty: 'beginner',
        timeRequired: 'Ongoing (30 min-2 hours daily)',
        groupSize: 'individual or small teams (2-5 people)',
        bestFor: ['Horizon scanning', 'Early warning systems', 'Strategic intelligence', 'Trend monitoring'],
        sectors: ['Government intelligence', 'Corporate foresight', 'Defense', 'Technology forecasting'],
        commonPitfalls: ['Information overload without filtering', 'Scanning only familiar sources', 'Passive collection without analysis', 'Siloed scanning without STEEP integration']
      },
      media: [
        {
          type: 'image',
          title: 'PESTLE/STEEP Framework Diagram',
          url: '/diagrams/pestle-framework.svg',
          description: 'Comprehensive environmental scanning framework showing six domains: Political (government policy, regulation, geopolitics), Economic (growth, markets, trade), Social (demographics, culture, values), Technological (innovation, R&D, emerging tech), Legal (legislation, compliance, rights), and Environmental (climate, sustainability, resources). Each domain feeds intelligence about the organization or issue under analysis.'
        },
        {
          type: 'video',
          title: 'How to Scan for Emerging Issues',
          url: 'https://www.youtube.com/watch?v=kpJNPWQ_Gno',
          description: 'Practical guide to environmental scanning techniques',
          year: 2015
        },
        {
          type: 'image',
          title: 'Three Horizons Framework',
          url: '/diagrams/three-horizons.svg',
          description: 'Pattern of innovation emergence showing three overlapping curves over time. Horizon 1 (declining): Business as Usual - current dominant system. Horizon 2 (rising/declining): Transition - entrepreneurial innovation competing with H1. Horizon 3 (emerging): Visionary Future - marginal today with transformative potential. Disruption zone where H1/H2 compete, Innovation zone where H2/H3 develop. Example: Transportation 2025 - H1: Internal combustion, H2: Electric vehicles, H3: Autonomous mobility.'
        },
        {
          type: 'article',
          title: 'Four Modes of Scanning',
          url: 'https://en.wikipedia.org/wiki/Environmental_scanning',
          source: 'Wikipedia',
          description: 'Choo\'s framework categorizing four distinct modes of environmental scanning: undirected viewing (general exposure), conditioned viewing (directed topics), informal search (unstructured data gathering), and formal search (systematic investigation). This typology helps organizations design appropriate scanning strategies based on information needs and uncertainty levels.'
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Competitiveforces.svg',
          description: 'Michael Porter\'s framework for analyzing industry competitive forces: rivalry, suppliers, buyers, substitutes, new entrants'
        }
      ]
    },
    {
      id: 'weak-signals',
      label: 'Weak Signals',
      parent: 'anticipating',
      description: 'Faint early indicators of potential disruption detected at the periphery before they amplify into mainstream trends or crises',
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
        overview: 'Weak signals are early, often ambiguous indicators of potentially significant change. They are easy to dismiss but can be harbingers of major discontinuities. Igor Ansoff developed this concept in 1975 after observing how organizations repeatedly failed to anticipate strategic surprises. Weak signals differ from trends in their ambiguity and fragility - they may represent noise, or they may be the first tremors of transformation. The challenge is distinguishing meaningful signals from background noise without waiting so long that the signal becomes a trend everyone can see. Organizations that master weak signal detection gain precious lead time to prepare for disruption rather than react to crisis.',
        types: [
          'Exosigns - External signals from the environment',
          'Endosigns - Internal signals from within the organization'
        ],
        characteristics: [
          'Low signal-to-noise ratio - Hard to distinguish from background noise',
          'Ambiguous meaning - Multiple interpretations possible',
          'Potentially high impact - Could indicate major discontinuity',
          'Requires interpretation - Meaning emerges through analysis and dialogue',
          'Structural novelty - Does not fit existing mental models',
          'Fragmentary evidence - Scattered across sources and domains'
        ],
        creator: 'Igor Ansoff (1975)',

        processGuide: {
          title: 'How to Detect and Interpret Weak Signals',
          steps: [
            {
              number: 1,
              name: 'Define scanning domains and focal questions',
              description: 'Establish what you are scanning for. Weak signals are never detected in a vacuum - they emerge against the backdrop of specific strategic questions. Define 3-5 focal questions tied to organizational strategy: What could disrupt our industry? What emerging technologies might enable new competitors? What social shifts could change customer expectations? Identify STEEP domains (Social, Technological, Economic, Environmental, Political) most relevant to your questions. This provides the filter that distinguishes signal from noise.',
              timeRequired: '2-3 hours',
              deliverable: 'Focal questions document and STEEP domain priorities'
            },
            {
              number: 2,
              name: 'Establish diverse scanning sources',
              description: 'Weak signals rarely appear in mainstream sources - they emerge at the edges. Build a portfolio of scanning sources across multiple dimensions: geographic (different regions), sectoral (adjacent industries), demographic (edge groups like early adopters or marginalized communities), disciplinary (fields outside your expertise), and temporal (historical analogies). Include academic journals, fringe publications, social media, patents, art and science fiction, and direct observation of emerging behaviors. Diversity is essential - homogeneous sources produce groupthink, not weak signals.',
              timeRequired: '3-4 hours',
              deliverable: 'Curated list of 30-50 diverse scanning sources with rationale'
            },
            {
              number: 3,
              name: 'Conduct systematic observation and collection',
              description: 'Implement regular scanning rhythms. Daily scanning (30-60 minutes): scan curated sources for anomalies, surprises, or things that do not fit expectations. Weekly reflection (2 hours): review accumulated observations, identify patterns or connections across signals. Monthly synthesis (half-day): bring scanning team together to share signals and interpret collectively. Use capture tools: signal database, tagging system (STEEP categories, impact level, confidence level), and visual boards for pattern recognition. Do not filter too early - ambiguity is the nature of weak signals.',
              timeRequired: 'Ongoing: 30-60 min daily + 2 hours weekly + half-day monthly',
              deliverable: 'Signal database with tagged observations and emerging patterns'
            },
            {
              number: 4,
              name: 'Apply interpretation frameworks',
              description: 'Move from observation to meaning-making. For each signal cluster, apply interpretation questions: What assumptions does this challenge? (signals often violate current mental models). What would have to be true for this signal to matter? (backcasting logic). Who would see this as opportunity vs. threat? (stakeholder analysis). What other signals support or contradict this? (triangulation). Is this signal strengthening or weakening over time? (trajectory assessment). Interpretation is inherently social - bring diverse perspectives together. One person\'s noise is another\'s signal.',
              timeRequired: '4-6 hours per signal cluster',
              deliverable: 'Interpreted signal briefs with multiple perspectives and implications'
            },
            {
              number: 5,
              name: 'Assess signal lifecycle stage',
              description: 'Not all weak signals are equally actionable. Classify signals by lifecycle stage: nascent (very early, high ambiguity, low coherence), emerging (gaining clarity, early advocates appear), consolidating (evidence accumulates, interpretations converge), or trending (mainstream awareness, window closing). Ansoff argued organizations should act when signals are still weak - waiting for certainty means losing first-mover advantage. Balance risk of acting too early (wasting resources on false signals) against risk of acting too late (being blindsided by change).',
              timeRequired: '2-3 hours',
              deliverable: 'Signal portfolio map showing lifecycle stages and strategic priorities'
            },
            {
              number: 6,
              name: 'Develop strategic responses',
              description: 'Translate insights into action. For high-priority signals: conduct deeper investigation (commission research, run pilots, engage experts), build organizational awareness (share signals widely, challenge assumptions), develop strategic options (scenarios incorporating signal, contingency plans), and establish monitoring triggers (indicators that signal is strengthening). For ambiguous signals: maintain watch (continue monitoring without major commitment), conduct small experiments (low-cost probes to test signal validity), or deliberately ignore (consciously deprioritize low-relevance signals). Document rationale for all decisions.',
              timeRequired: '6-8 hours',
              deliverable: 'Strategic response plan with specific actions, owners, and monitoring triggers'
            }
          ],
          totalTime: 'Ongoing practice with intensive monthly synthesis sessions',
          facilitationTips: 'Create psychological safety for sharing "weird" signals. Celebrate signals that challenge dominant narratives. Avoid premature closure - keep signals in ambiguous state longer than feels comfortable. Rotate scanning team members to prevent habituation. Use physical or visual signal boards to enable pattern recognition across team.'
        },

        workedExample: {
          title: 'Netflix DVD-by-Mail as Weak Signal of Streaming Future (2000-2007)',
          context: 'Traditional video rental industry (Blockbuster era) analyzing competitive threats',
          signalObserved: 'In 2000, Netflix launched DVD-by-mail subscription service. Weak signals included: elimination of late fees (violating industry revenue model), subscription rather than per-transaction pricing, algorithm-driven recommendations (data-centric approach), and willingness to operate at a loss to build subscriber base. Most competitors dismissed these as niche business model for movie buffs.',
          ambiguityFactors: [
            'Unclear if customers would tolerate mail delivery delays vs. instant gratification of store rentals',
            'Uncertain if subscription model could scale beyond enthusiasts',
            'DVD technology itself was still emerging - VHS dominated',
            'Broadband penetration too low for streaming (the actual disruption)',
            'Netflix was tiny ($5M revenue) vs. Blockbuster ($5B revenue) in 2000'
          ],
          interpretation: 'Traditional players saw Netflix as weak signal but interpreted it as "niche mail-order business" rather than "harbinger of digital distribution." The actual weak signal was not the DVD delivery mechanism but the underlying strategic posture: building customer relationships through data, prioritizing subscriber growth over per-transaction profit, and viewing physical delivery as temporary stepping-stone to digital. Those who scanned only for delivery method innovations missed the deeper signal about changing basis of competition.',
          outcome: 'By 2007, when Netflix launched streaming, it was too late for competitors to catch up. Blockbuster filed bankruptcy in 2010. The weak signal window was 2000-2004, when Netflix was still small and its model was ambiguous. By 2007, it was a strong signal visible to everyone.',
          lesson: 'Weak signals often appear in unexpected forms. Netflix DVD-by-mail was not the disruption - it was the weak signal pointing toward streaming disruption. Interpreters who focused on surface features (mail delivery) missed deeper structural signals (data-driven customer relationships, tolerance for losses to build position). Effective weak signal detection requires looking beneath the obvious.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_foresight#Weak_signals',
      relatedMethodologies: [
        { id: 'env-scanning', type: 'prerequisite', description: 'Environmental scanning provides the systematic process through which weak signals are detected across domains' },
        { id: 'emerging-issues', type: 'builds-on', description: 'Weak signals evolve into emerging issues as they gain coherence and move through the issue lifecycle' },
        { id: 'wild-cards', type: 'contrasts', description: 'Weak signals are subtle early indicators while wild cards are dramatic low-probability events with high impact' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Detection of weak signals informs which uncertainties and discontinuities to explore in scenarios' }
      ],
      caseStudies: [
        {
          title: 'Nokia Missed Smartphone Weak Signals (1996-2007)',
          organization: 'Nokia Corporation',
          year: 2007,
          challenge: 'Nokia dominated mobile phone market with 40% global share in 2007. Despite pioneering smartphone concepts (Nokia Communicator 1996), the company failed to detect weak signals of smartphone disruption and was overtaken by iPhone and Android. How did the market leader miss signals visible in hindsight?',
          application: 'Retrospective weak signal analysis reveals multiple early indicators Nokia could have detected: (1) 1996-2000: Palm Pilot success showed demand for pocket computing beyond phone calls. (2) 2001-2004: Blackberry enterprise adoption demonstrated keyboard-centric email devices could displace voice-primary phones for business users. (3) 2004-2006: iPod dominance showed Apple could create aspirational consumer electronics and build platform ecosystems. (4) 2005-2007: Mobile data usage growing faster than voice in key markets. (5) 2006: Google acquiring Android indicated search giant saw mobile as strategic. (6) Internal: Nokia engineers building iPhone-like prototypes but leadership rejected them as too expensive/complex.',
          outcome: 'Nokia\'s weak signal blindspots: (1) Cultural: Engineers saw signals but leadership dismissed them due to "we know phones" hubris. (2) Business model: Signals threatened profitable hardware sales model. (3) Organizational: R&D separated from strategy, signals not escalated. (4) Cognitive: Interpreted signals through "phones are for calling" mental model rather than "phones are becoming pocket computers" frame. By 2010, Nokia share collapsed. Company sold phone division to Microsoft in 2013.',
          insights: 'This case demonstrates weak signal detection failures: (1) Signals were present but not interpreted correctly. (2) Disruptive signals often violate dominant logic and thus get filtered out. (3) Organizational structure matters - signals detected at edges must reach strategic decision-makers. (4) Past success creates cognitive barriers to seeing signals that threaten current model. (5) Speed matters - Nokia saw some signals but moved too slowly. Weak signal detection requires cultural willingness to challenge own assumptions.',
          sourceUrl: 'https://hbr.org/2015/07/how-nokia-embraced-the-opportunities-and-challenges-of-disruption'
        },
        {
          title: 'DARPA\'s Weak Signal Detection for Emerging Threats',
          organization: 'Defense Advanced Research Projects Agency (DARPA)',
          year: 'Ongoing since 1990s',
          challenge: 'U.S. military and intelligence agencies needed systematic approach to detect emerging threats before they became crises. Traditional intelligence focused on known adversaries and existing capabilities. How to detect fundamentally new threats arising from technological, social, or geopolitical shifts?',
          application: 'DARPA developed multi-layered weak signal detection system: (1) Broad environmental scanning across science, technology, social movements, and geopolitics. (2) Network of "sentinel" experts in diverse fields who report anomalies. (3) Horizon scanning workshops bringing together unconventional thinkers (sci-fi authors, hackers, futurists). (4) Red team exercises imagining how adversaries could exploit emerging capabilities. (5) Small-scale experiments to probe uncertain signals (rapid prototyping of technologies, war games testing new scenarios). (6) Deliberate cultivation of "heretical" perspectives that challenge conventional wisdom.',
          outcome: 'System detected early signals of: autonomous weapons (1990s drone research), cyber warfare (1980s hacker culture analysis), improvised explosive devices in asymmetric warfare (1990s insurgency studies), social media as organizing tool (early 2000s), and commercial space capabilities (2000s private launch vehicles). Detection led to research programs developing countermeasures years before threats materialized. Not all signals proved accurate (many false positives) but system philosophy was "better to investigate 10 weak signals where only 1 matters than miss the 1 that matters."',
          insights: 'DARPA approach offers lessons: (1) Institutionalize weak signal detection as ongoing function, not ad hoc. (2) Diversity of scanning sources is critical - conventional sources miss unconventional threats. (3) Create permission structure for sharing "crazy" signals without career risk. (4) Couple detection with rapid experimentation - do not just analyze, probe. (5) Accept high false positive rate as cost of not missing true positives. (6) Weak signals often emerge from recombination of existing elements in new ways (e.g., drones existed but weaponized autonomous drones was the signal).',
          sourceUrl: 'https://www.darpa.mil/about-us/timeline'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Create "signal wall" with three zones: Nascent Signals (very weak, high ambiguity), Emerging Signals (gaining clarity), Consolidating Signals (evidence accumulating). Provide diverse scanning materials (fringe publications, academic journals, social media feeds, patent databases, trade magazines from adjacent industries). Plan half-day workshop with 8-15 participants from diverse backgrounds.',
        groupDynamics: 'Combat confirmation bias by explicitly rewarding signals that contradict dominant narratives. Use "Yes, and..." protocol - when someone shares signal, others must build on it before critiquing. Rotate who presents signals to prevent hierarchy effects (junior staff often see signals senior leaders miss). Create anonymity option for controversial signals. Pair "signal hunters" (external focus) with "signal interpreters" (meaning-making focus).',
        commonChallenges: [
          'Premature dismissal - Group labels signal as "noise" too quickly. Counter: Require explicit articulation of why signal matters before discussing why it does not.',
          'Analysis paralysis - Group endlessly debates signal meaning without action. Counter: Set interpretation deadline, move ambiguous signals to "monitor" category with trigger conditions.',
          'Novelty bias - Group fixates on exciting signals while ignoring boring but important ones. Counter: Explicitly scan for signals that are unglamorous but structurally significant.',
          'Single interpretation - Group converges on one meaning for signal. Counter: Require minimum three alternative interpretations before deciding.'
        ],
        successIndicators: 'Team surfaces signals that genuinely surprise participants. Healthy debate occurs about signal interpretation, not just signal validity. Participants share signals they initially dismissed but now see as potentially important. Concrete actions emerge (investigations to commission, monitoring protocols to establish, assumptions to challenge). Signal detection becomes ongoing practice, not one-off exercise.'
      },
      successCriteria: {
        processQuality: [
          'Scanning sources span diverse domains, geographies, and perspectives (not just mainstream)',
          'Regular scanning rhythm established (daily observation, weekly reflection, monthly synthesis)',
          'Signals tagged with context (STEEP domain, lifecycle stage, impact potential, confidence level)',
          'Interpretation involves diverse perspectives, not single analyst viewpoint',
          'False positives tolerated - better to investigate 10 weak signals where only 1 matters'
        ],
        outcomeQuality: [
          'Signals detected 6-24 months before mainstream awareness (lead time for strategic response)',
          'Organization develops vocabulary for discussing ambiguity and uncertainty without premature closure',
          'Strategic surprises decrease - fewer "we never saw this coming" moments',
          'Signals inform scenario planning, strategic planning, and innovation roadmaps',
          'Culture shifts from "prove it before we act" to "probe while it is still ambiguous"'
        ]
      },
      comparativeAnalysis: {
        vsTrendAnalysis: 'Trends are strong signals with clear trajectory and mainstream awareness. Weak signals are ambiguous, fragmented, and easy to dismiss. Trends are for planning; weak signals are for early warning. Use weak signal detection to identify trends before they become trends. Once signal strengthens into trend, it is often too late for first-mover advantage.',
        vsEnvironmentalScanning: 'Environmental scanning is the systematic process; weak signals are what you detect through scanning. Scanning is the radar system; weak signals are the blips on the radar that may or may not matter. Good scanning increases weak signal detection, but signals still require interpretation. Think of scanning as data collection and weak signals as pattern recognition.',
        vsEmergingIssues: 'Weak signals are earlier and more ambiguous than emerging issues. A weak signal may evolve into an emerging issue as it gains coherence, evidence, and stakeholder attention. Weak signal: "A few companies experimenting with remote work." Emerging issue: "Remote work adoption accelerating, raising questions about urban planning, real estate, and labor markets." Emerging issues have crossed the ambiguity threshold.',
        whenToUse: 'Use weak signal detection when you need early warning of potential disruptions (6-24 months before mainstream awareness), when operating in high-uncertainty environments where surprises are costly, when building organizational capacity to challenge assumptions and dominant logic, or when seeking innovation opportunities at the edges of current thinking. Avoid when you need certainty before acting (wrong method - signals are inherently uncertain), when you lack resources to investigate ambiguous leads (requires tolerance for false positives), or when your strategic horizon is very short-term (weak signals pay off over medium to long-term).'
      },
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '4-8 hours initial + ongoing monitoring',
        groupSize: 'small groups (3-6 people) with diverse perspectives',
        bestFor: ['Detecting early change signals', 'Strategic surprise preparedness', 'Anticipatory intelligence', 'Innovation scouting'],
        sectors: ['Technology forecasting', 'Defense intelligence', 'Corporate strategy', 'Policy planning'],
        commonPitfalls: ['Dismissing signals as noise too quickly', 'Confirmation bias - seeing only expected signals', 'Not connecting signals across domains', 'Waiting for signals to strengthen before acting']
      },
      media: [
        {
          type: 'image',
          title: 'Weak Signals Detection Framework',
          url: '/diagrams/weak-signals-framework.svg',
          description: 'Igor Ansoff\'s signal strength spectrum (1975) showing progression from Noise → Weak Signals → Emerging Issues → Strong Trends → Megatrends. Each zone shows characteristics, examples, and recommended actions. Strategic advantage comes from acting on weak signals before competitors, when uncertainty is high but strategic options still open.'
        },
        {
          type: 'image',
          title: 'Signal Strength Over Time Curve',
          url: '/diagrams/signal-strength-curve.svg',
          description: 'S-curve showing how signals evolve from noise to mainstream trends over time. Highlights the strategic window (foresight zone) when signals are detectable but not yet widely recognized, offering maximum leverage for early action before competitive advantage is lost.'
        },
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Igor_Ansoff%2C_1971.jpg',
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
        overview: 'Emerging Issues Analysis tracks issues through their lifecycle—from weak signals to trends to mainstream concerns—allowing early response. Developed by Graham Molitor and Joseph Coates in the 1970s, this method recognizes that issues follow predictable S-curve patterns as they move from fringe to mainstream. The key insight: issues are most actionable in the emergence and early growth phases, before they crystallize into rigid positions. By the time an issue reaches maturity, response options narrow dramatically. Organizations that detect and engage issues early shape their evolution; those who wait become reactive responders to forces beyond their control.',
        stages: [
          'Emergence (1-5% awareness) - First weak signals appear at the edges',
          'Growth (5-20% awareness) - Issue gains advocates and early adopters',
          'Maturity (20-80% awareness) - Becomes trend, enters mainstream discourse',
          'Decline or Transformation - Issue fades, splinters, or morphs into new form'
        ],
        application: 'Monitor issue lifecycle to intervene at optimal time - shape in emergence, prepare during growth, respond at maturity',

        processGuide: {
          title: 'How to Conduct Emerging Issues Analysis',
          steps: [
            {
              number: 1,
              name: 'Scan for weak signals and emerging patterns',
              description: 'Use environmental scanning and weak signal detection to identify nascent issues. Look for: unexpected behaviors in edge groups, regulatory changes in leading jurisdictions, new research findings challenging conventional wisdom, fringe advocacy gaining coherence, and technology prototypes enabling new possibilities. Issues often emerge at intersection of trends (e.g., aging population + AI diagnostics = automated elder care issue).',
              timeRequired: 'Ongoing scanning with quarterly synthesis',
              deliverable: 'Curated list of 10-20 potential emerging issues with supporting evidence'
            },
            {
              number: 2,
              name: 'Map issues onto S-curve lifecycle',
              description: 'For each potential issue, estimate its lifecycle stage using multiple indicators: media mention frequency (tracking velocity), stakeholder mobilization level, regulatory attention, market formation, and public awareness surveys. Plot issues on S-curve with axes of time and adoption/awareness. This reveals which issues are nascent (high uncertainty, high opportunity), which are accelerating (time to prepare), and which are mature (time to respond).',
              timeRequired: '1-2 days',
              deliverable: 'Issue lifecycle map with 3-5 priority issues identified'
            },
            {
              number: 3,
              name: 'Analyze issue drivers and stakeholders',
              description: 'For priority issues, conduct deeper analysis: What forces are pushing this issue forward? (technological enablers, demographic shifts, value changes, regulatory precedents). What barriers slow it? (vested interests, cultural inertia, competing issues). Who are early advocates and resisters? Map stakeholder positions and power to understand issue dynamics and anticipate coalition formation.',
              timeRequired: '4-6 hours per priority issue',
              deliverable: 'Issue briefs with driver analysis and stakeholder mapping'
            },
            {
              number: 4,
              name: 'Scenario test and develop response options',
              description: 'Test how issue might evolve under different scenarios: accelerated adoption, backlash/resistance, fragmentation into sub-issues, or transformation into something unexpected. For each scenario, develop strategic responses: early engagement to shape issue framing, preparation/hedging strategies, or reactive crisis plans. Early-stage issues offer broader option space than mature issues.',
              timeRequired: 'Half-day workshop per priority issue',
              deliverable: 'Response playbook with triggers and actions for different issue trajectories'
            },
            {
              number: 5,
              name: 'Monitor evolution and update assessments',
              description: 'Establish monitoring protocols to track issue evolution: quarterly reassessment of lifecycle stage, monthly media/stakeholder tracking, and trigger-based alerts when issues hit tipping points (e.g., major legislation proposed, mainstream media coverage, industry leader adopts position). Issues do not evolve linearly - some accelerate, some plateau, some fade. Continuous monitoring enables adaptive response.',
              timeRequired: 'Ongoing: monthly check-ins, quarterly deep reassessment',
              deliverable: 'Issue tracking dashboard with lifecycle progression and alert system'
            }
          ],
          totalTime: 'Initial analysis: 2-3 days; Ongoing monitoring: 4-8 hours/month',
          facilitationTips: 'Bring diverse perspectives - issues look different from different vantage points. Use historical analogies to understand issue evolution (e.g., how did privacy concerns evolve 1990s-2010s?). Avoid "this time is different" bias while remaining open to genuine novelty. Track both issue content and issue process (how it spreads, who champions it).'
        },

        workedExample: {
          title: 'Tracking Cryptocurrency from Weak Signal to Mainstream Issue (2009-2021)',
          context: 'Financial services analyzing payment system innovation and regulatory risk',
          lifecycle: {
            emergence: '2009-2013: Bitcoin whitepaper circulates in cryptography circles. Seen as libertarian fringe experiment. Banks largely ignore. Early signals: tech adoption by Silk Road, small merchant acceptance, academic cryptography interest.',
            growth: '2014-2017: Issue enters early growth as cryptocurrency exchange infrastructure develops, ICO boom begins, and  major financial institutions start blockchain experiments. Regulators begin hearings. Media coverage shifts from "weird tech thing" to "potential disruption."',
            maturity: '2018-2021: Issue reaches maturity with institutional adoption (PayPal, Tesla accepting crypto), central banks launching digital currency programs, comprehensive regulatory frameworks proposed, and mainstream retail platforms offering crypto. Issue has "crossed the chasm."',
            currentState: '2021+: Issue fragmenting into sub-issues: DeFi regulation, stablecoin systemic risk, central bank digital currencies, energy consumption, and use in illicit finance. Original cryptocurrency issue evolving into digital asset policy domain.'
          },
          interventionWindows: 'Banks that detected signals in 2009-2013 emergence phase could have: acquired exchanges, developed wallets, influenced regulatory framing. By 2018 maturity phase, banks were reactive followers rather than shapers. The 2014-2017 growth phase was the optimal intervention window - issue was visible but not yet crystallized.',
          lesson: 'Emerging issues analysis is not just about detection but about understanding when to act. Too early risks wasted resources on issues that fade; too late means responding to others\' agendas. The growth phase offers sweet spot of clarity and influence.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Emerging_issues_analysis',
      relatedMethodologies: [
        { id: 'env-scanning', type: 'prerequisite', description: 'Environmental scanning across STEEP domains provides the raw data from which emerging issues are identified' },
        { id: 'weak-signals', type: 'prerequisite', description: 'Weak signals are the early indicators that coalesce into identifiable emerging issues over time' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Emerging issues analysis identifies key uncertainties and driving forces to explore in scenario development' },
        { id: 'strategic-issue-mgmt', type: 'builds-on', description: 'As emerging issues mature along the S-curve, they transition to strategic issue management for active response' }
      ],
      caseStudies: [
        {
          title: 'Tobacco Regulation - Issue Lifecycle 1950-2000',
          organization: 'Public Health and Tobacco Industry',
          year: '1950-2000',
          challenge: 'Tracking how smoking transformed from normal behavior to regulated public health issue over 50 years demonstrates classic S-curve issue evolution',
          application: 'Emergence (1950s-1960s): Medical studies linking smoking to cancer published but widely disputed. Seen as fringe concern by public health advocates. Growth (1970s-1980s): Surgeon General warnings, advertising bans, non-smoker rights movement. Issue gains advocates and enters policy discourse. Maturity (1990s-2000s): Master Settlement Agreement, workplace bans, social norm shift. Issue becomes mainstream. Transformation (2000s+): Issue evolves into vaping/e-cigarettes, new cycle begins.',
          outcome: 'Tobacco companies that dismissed early signals faced later regulatory constraints. Companies engaging in emergence/growth phases (alternative products, harm reduction) positioned better. Public health advocates who acted early (1950s-60s) shaped 50 years of policy.',
          insights: 'Issue lifecycles can span decades. Early skepticism does not mean issue will fade - structural issues (health costs) ensure persistence. Issue transformed but core concern (nicotine harm) persists in new forms (vaping).'
        }
      ],
      successCriteria: {
        processQuality: [
          'Issues mapped across full lifecycle spectrum, not clustered in one stage',
          'Lifecycle stage assessments use multiple indicators (media, stakeholders, regulation), not single metric',
          'Historical issue evolution studied to calibrate S-curve timing expectations',
          'Quarterly reassessment captures issue movement and tipping points'
        ],
        outcomeQuality: [
          'Organization engages issues in emergence/growth, not just at maturity',
          'Issue-related strategic surprises decrease over time',
          'Response options developed for multiple issue trajectories',
          'Issue intelligence informs strategic planning and scenario work'
        ]
      },
      comparativeAnalysis: {
        vsWeakSignals: 'Weak signals are ambiguous indicators; emerging issues are coherent enough to track over time. Weak signal becomes emerging issue when it gains stakeholder champions, media narrative, and measurable adoption curve. Use weak signals to find issues; use emerging issues analysis to track them.',
        vsTrendAnalysis: 'Trends are mature issues (20-80% adoption). Emerging issues analysis tracks the full lifecycle including pre-trend stages. The value is in the early phases when influence is highest. Trend analysis tells you what is happening; emerging issues analysis helps you shape what will happen.',
        whenToUse: 'Use for issues that evolve over months to years (not overnight disruptions - see wild cards). Best for: regulatory/policy domains, social value shifts, technology adoption patterns, market structure changes. Requires patience - issues rarely evolve as fast as expected.'
      },
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '1-2 days for initial analysis',
        groupSize: 'small expert teams (4-8 people)',
        bestFor: ['Issue lifecycle tracking', 'S-curve analysis', 'Policy anticipation', 'Trend maturation assessment'],
        sectors: ['Public policy', 'Regulatory affairs', 'Public health', 'Technology assessment'],
        commonPitfalls: ['Mistaking fads for emerging issues', 'Not tracking issue evolution over time', 'Missing tipping points in lifecycle', 'Intervening too early or too late']
      },
      media: [
        {
          type: 'image',
          title: 'Emerging Issues Lifecycle',
          url: '/diagrams/emerging-issues-lifecycle.svg',
          description: 'Issue-attention cycle showing five stages: Pre-Problem (unrecognized), Alarmed Discovery (catalyzed by dramatic event), Peak Attention (intense debate), Declining Interest (fatigue or complexity), and Post-Problem (institutionalized or forgotten). Highlights foresight zone (act during pre-problem/alarmed discovery) vs. crisis zone (peak attention with constrained options).'
        },
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Technology-Adoption-Lifecycle.png',
          description: 'Visual representation of issue maturation'
        },
        {
          type: 'image',
          title: 'Diffusion of Innovation (Rogers)',
          url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Diffusion_of_ideas.svg',
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
        overview: 'Macro-Historical Analysis, pioneered by French historian Fernand Braudel in 1958, examines change across three distinct time scales to reveal how deep structures shape surface events. Braudel, leader of the Annales School of History, revolutionized historical thinking by distinguishing between événements (micro-level events and individual actions unfolding over years), conjonctures (meso-level social and economic trends lasting decades to generations), and longue durée (macro-level structural patterns persisting over centuries). His insight: we typically focus on dramatic events—wars, elections, crises—while missing the slow-moving tectonic shifts in geography, demographics, technology, and culture that ultimately determine what is possible. The framework emerged from Braudel\'s masterwork "The Mediterranean and the Mediterranean World in the Age of Philip II" (1949), which analyzed the same region across all three time scales simultaneously. For futurists, macro-historical analysis provides essential perspective: today\'s headlines (micro) play out against generational trends (meso) shaped by civilizational structures (macro). Understanding this temporal layering helps distinguish ephemeral fluctuations from enduring transformations, recognizes which aspects of the present are historically contingent versus structurally determined, and identifies leverage points where intervention can shift long-term trajectories. The methodology has been adapted by strategic foresight practitioners, systems thinkers, and long-term planners seeking to contextualize present-day decisions within deeper historical currents.',
        timeScales: [
          'Micro - Events and individuals (years to decades)',
          'Meso - Conjunctures and trends (decades to generations)',
          'Macro - Longue durée and deep structures (centuries)'
        ],
        creator: 'Fernand Braudel',
        application: 'Analyze current issues across all three time scales to understand deeper forces',

        processGuide: {
          title: 'How to Conduct Macro-Historical Analysis',
          steps: [
            {
              number: 1,
              name: 'Define focal issue or phenomenon',
              description: 'Select the issue, trend, or question you want to understand through macro-historical lens. Frame it broadly enough to examine across centuries but specifically enough to maintain focus. Examples: "transformation of work," "evolution of energy systems," "changing nature of warfare," "urbanization patterns." Clarify why you need historical depth—what present-day puzzle requires understanding long-term patterns? Establish geographic and cultural scope: analyzing single civilization, regional system, or global patterns? Define time horizon for macro scale (typically 300-500 years provides sufficient longue durée perspective while remaining manageable).',
              timeRequired: '1-2 days',
              deliverable: 'Focal issue statement with clear scope, geographic boundaries, and time horizon'
            },
            {
              number: 2,
              name: 'Map micro-level events (événements)',
              description: 'Document specific events, crises, and individual actions related to your focal issue over recent decades. These are the "headlines of history"—dramatic moments that capture attention. Identify: pivotal decisions by leaders, technological breakthroughs, policy changes, conflicts, social movements, market disruptions. Create event timeline showing when each occurred. Note: these events feel significant in the moment but gain meaning only when contextualized against longer timeframes. Resist the temptation to explain everything through events—you\'re building bottom layer to be contextualized by deeper structures. Typical time span: 5-30 years depending on issue velocity.',
              timeRequired: '1-2 weeks',
              deliverable: 'Timeline of micro-level events with dates, key actors, and immediate consequences'
            },
            {
              number: 3,
              name: 'Identify meso-level patterns (conjonctures)',
              description: 'Examine social, economic, and technological trends unfolding across generations. These are the medium-term cycles and structural shifts: economic expansions and contractions, demographic transitions, technological adoption curves, ideological movements, institutional evolutions. Typical duration: 20-80 years. Look for: generational changes in values and behaviors, economic cycles (Kondratiev waves), technology life cycles (steam → electric → digital), geopolitical realignments, urbanization waves, educational attainment shifts. These meso-patterns provide context for micro events—a policy decision (micro) may succeed or fail depending on which phase of a generational cycle (meso) it encounters. Map interactions: how do conjonctures amplify or dampen événements?',
              timeRequired: '2-3 weeks',
              deliverable: 'Documentation of 3-5 major meso-level trends with durations, phases, and interactions with micro events'
            },
            {
              number: 4,
              name: 'Explore macro-level structures (longue durée)',
              description: 'Investigate deep structural continuities and very slow transformations spanning centuries. These are the almost-invisible foundations: geographic constraints (rivers, mountains, climate), demographic fundamentals (population density, migration patterns over centuries), civilizational worldviews (religious frameworks, cultural assumptions), technological paradigms (agricultural → industrial → information societies), institutional architectures (property rights, governance systems). Braudel emphasized that these structures change so slowly they appear almost permanent—yet they ultimately determine what is possible. For energy systems: wood → coal transition took 150+ years; coal → oil another 100+ years. For governance: democracy\'s spread spans 250+ years and ongoing. Identify which macro structures are genuinely stable versus slowly shifting. Look for inflection points where longue durée enters phase transition.',
              timeRequired: '3-4 weeks requiring historical research',
              deliverable: 'Analysis of 2-3 fundamental macro-level structures with evidence of continuity and/or slow transformation'
            },
            {
              number: 5,
              name: 'Synthesize cross-scale insights',
              description: 'Integrate findings across all three time scales to reveal how they interact. Key synthesis questions: (1) How do macro structures enable or constrain meso trends? Example: geographic resource distribution shapes energy transition possibilities. (2) How do meso trends create context for micro events? Example: generational value shifts determine which leaders succeed. (3) When do micro events trigger meso or macro shifts? Example: COVID-19 (micro event) potentially accelerating remote work trend (meso) and questioning urban density (macro). (4) Which current phenomena are ephemeral (micro fluctuations) versus signaling deeper shifts (meso or macro transitions)? Create visual representation showing temporal layering and causal relationships. This synthesis is the analytical payoff: seeing how surface turbulence, medium-term patterns, and deep structures interact.',
              timeRequired: '1-2 weeks',
              deliverable: 'Integrated narrative and visual model showing cross-scale interactions and causal relationships'
            },
            {
              number: 6,
              name: 'Apply to strategic foresight',
              description: 'Translate historical understanding into futures insight. Identify: (1) Which macro structures will likely persist over planning horizon? These are constraints or stable foundations. (2) Which meso trends are approaching inflection points? These are critical uncertainties for scenarios. (3) Which micro interventions could shift meso or macro trajectories? These are high-leverage opportunities. (4) What historical analogues inform current situation? Past transitions offer insight (while avoiding simplistic repetition). Build scenarios recognizing temporal layering: near-term scenarios shaped by meso trends within macro constraints; long-term scenarios exploring macro structure transitions. Use macro-historical perspective to challenge presentism—the assumption that current conditions are normal or permanent. The past was radically different; the future will be too.',
              timeRequired: '1-2 weeks',
              deliverable: 'Strategic implications document identifying continuities, transitions, leverage points, and historical analogues informing futures work'
            }
          ],
          totalTime: '10-14 weeks for comprehensive macro-historical analysis; can be compressed to 4-6 weeks for focused application',
          facilitationTips: 'Macro-historical analysis requires access to historical expertise—partner with historians, archeologists, or scholars who can guide research beyond Wikipedia-level understanding. Balance breadth and depth: you cannot become expert in centuries of history, but you can identify credible sources and patterns. Use primary historical research where available, but synthesis of existing scholarship is often sufficient for foresight purposes. Beware anachronism: avoid projecting present-day categories backward (e.g., "nationalism" in medieval Europe). Embrace complexity: historical change is rarely linear or deterministic—macro structures constrain but don\'t determine outcomes. Create visualizations: timelines, layered diagrams, and pattern maps help communicate findings. Connect to present: macro-historical analysis gains strategic relevance when linked to current decisions and future possibilities, not as academic exercise.'
        },

        workedExample: {
          title: 'Energy Transitions: Macro-Historical Analysis of Societal Energy Systems',
          context: 'To inform energy policy and investment strategy for 2025-2050, we conduct macro-historical analysis of how societies transition between primary energy sources. This reveals deep patterns invisible when examining only recent decades.',
          microEvents: 'Recent events (1990-2025): Fukushima nuclear disaster (2011) causing Japanese energy pivot, Paris Climate Agreement (2015), fracking revolution enabling US oil/gas boom (2010s), renewable energy cost collapse (solar PV dropping 90% in cost 2010-2020), Russia-Ukraine energy crisis (2022), Inflation Reduction Act green subsidies (2022), COP climate negotiations annually. Each felt momentous, but do they represent fundamental transition or fluctuations within existing system?',
          mesoPatterns: 'Generational trends (1950-2025): Post-WWII oil supremacy and petrostate formation (1950s-1970s), oil shocks driving efficiency and nuclear power (1970s-1980s), climate change emergence as policy concern (1990s-present), renewable energy industrialization and cost decline (2000s-present), electric vehicle adoption curve beginning (2010s-present). These 20-50 year patterns show oil dominance being challenged but not yet displaced—we\'re in early stages of potential transition, not completion. Coal declined over 40+ years (1950s-1990s in developed economies), suggesting oil-to-renewables transition similarly generational.',
          macroStructures: 'Deep structures (1500-2025): Energy transitions move extremely slowly at societal scale. Wood-to-coal transition: 1500s-1900s (400 years), with coal becoming dominant only in late 1800s. Coal-to-oil transition: 1850s-1970s (120+ years), with oil surpassing coal only in 1960s despite being known since ancient times. Each transition required: new infrastructure (rail for coal, pipelines/refineries for oil, grids for electricity), institutional frameworks (property rights, regulations, standards), geopolitical realignments (British coal power, American/Middle East oil power), and multi-generational capital stock turnover. The macro pattern: energy systems exhibit enormous inertia due to: (1) massive sunk infrastructure (trillions in power plants, vehicles, distribution systems), (2) institutional lock-in (regulations, expertise, political coalitions defending status quo), (3) energy density and convenience advantages of incumbents initially, (4) coordination challenges across entire economy. Yet transitions do happen—longue durée shows they\'re rare, slow, but eventually complete once started.',
          synthesis: 'Cross-scale insight: Current renewable energy growth (micro events) occurs within oil-dominated system (meso pattern established 1950s-1970s) shaped by century-scale energy transition dynamics (macro structure). Historical pattern suggests: (1) early-stage transitions look slower than they are—exponential growth hidden by small base, (2) incumbent systems persist far longer than technically "obsolete"—oil remained marginal fuel for decades after discovery, (3) infrastructure and institutions lag technology by generations—we have renewable tech but not yet renewable-optimized grids, transport, or industrial systems, (4) geopolitical realignment follows energy shifts—renewable transition will create new power centers (lithium/battery producers?) and strand old ones (petrostate decline), (5) complete transitions take 50-150 years but accelerate in later phases. The 2020s micro events (IRA, cost declines) may signal meso-level transition entering acceleration phase, but macro-historical perspective cautions against assuming rapid completion.',
          foresightImplications: 'For 2025-2050 strategy: (1) Expect continued oil/gas relevance despite renewable growth—transitions are slow. (2) Infrastructure bottlenecks will constrain pace—grids, mining, manufacturing capacity matter more than technology potential. (3) Early movers in new energy infrastructure gain advantages lasting decades—like Rockefeller in oil era. (4) Geopolitical instability likely as petrostate power wanes but hasn\'t yet collapsed—analogous to coal powers\' decline. (5) Policy becomes critical accelerant or brake—past transitions aided by state action (naval coal conversion, interstate highways for oil). (6) By 2050, we\'re likely mid-transition, not post-transition—plan for hybrid systems. Macro-historical lens prevents both excessive optimism (rapid transition) and pessimism (nothing changes)—it reveals transitions as slow but inexorable once structural forces align.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Fernand_Braudel',
      relatedMethodologies: [
        { id: 'cycle-theory', type: 'complements', description: 'Macro-historical analysis examines deep structural time while cycle theory identifies recurring patterns within that timeframe' },
        { id: 'cla', type: 'complements', description: 'Braudel\'s longue durée corresponds to CLA\'s worldview and myth layers, both revealing deep cultural structures' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Understanding historical patterns across multiple time scales reveals which continuities and discontinuities to explore in scenarios' },
        { id: 'emerging-issues', type: 'complements', description: 'Macro-historical perspective helps distinguish ephemeral issues from those connected to deep structural shifts' }
      ],
      caseStudies: [
        {
          title: 'Braudel\'s Mediterranean: The Archetype of Macro-Historical Analysis',
          organization: 'Annales School / Fernand Braudel',
          year: 1949,
          challenge: 'Traditional historical scholarship focused narrowly on political events and great leaders—wars, treaties, dynastic successions. Braudel sought to understand the Mediterranean world during Philip II\'s reign (1556-1598) by examining not just political dramas but also the geographic, economic, and social structures shaping what was possible during this era. The challenge was methodological: how to write history that captured both dramatic events and slow-moving structural forces simultaneously?',
          application: 'Braudel structured "The Mediterranean and the Mediterranean World in the Age of Philip II" across three time scales: Part 1 examined the longue durée—geography, climate, trade routes, demographic patterns, agricultural systems persisting across centuries. These structures created Mediterranean unity despite political fragmentation. Part 2 analyzed conjonctures—economic cycles, social structures, states and civilizations evolving over decades to generations. This meso-level showed how Spanish empire, Ottoman power, and Italian city-states operated within geographic and economic constraints. Part 3 chronicled événements—political and military history, battles, treaties, conspiracies unfolding over years. These familiar historical dramas gained new meaning when contextualized against deeper structures. The innovation: Braudel showed how Philip II\'s decisions (micro) played out within Mediterranean economic cycles (meso) constrained by geographic realities (macro). The same events appeared differently when viewed across temporal scales.',
          outcome: 'Published in 1949, "The Mediterranean" revolutionized historical methodology. It demonstrated that major historical outcomes result not primarily from individual decisions but from deep structural forces. Philip II\'s policies succeeded or failed depending on whether they aligned with or fought against geographic and economic structures. The work revealed patterns invisible in event-focused history: why Mediterranean unity persisted despite political division (geographic longue durée), why certain economic patterns recurred across centuries (structural constraints), how micro-level crises reflected macro-level transitions (like shift from Mediterranean to Atlantic as center of European power). Braudel\'s framework spread beyond history to sociology, economics, and strategic foresight. The macro-historical method became essential for anyone seeking to understand long-term change.',
          insights: 'The Mediterranean case established core principles: (1) Deep structures change slowly but ultimately determine possibility spaces for events. (2) Focusing only on recent events produces misleading analysis—current conditions often represent late stages of long-term processes. (3) Geographic and material constraints matter more than ideologies or intentions—Philip II\'s ambitions crashed against economic realities. (4) Temporal layering reveals causation: micro events often just make visible meso or macro shifts already underway. (5) Historical transitions between structural eras (e.g., Mediterranean to Atlantic dominance) are rare but transformative—understanding these informs how to recognize contemporary transitions. For futurists, Braudel\'s lesson: today\'s headlines play out against generational trends shaped by civilizational structures. Miss the longue durée, miss what\'s actually driving change.'
        },
        {
          title: 'Long Now Foundation: Designing for 10,000-Year Thinking',
          organization: 'Long Now Foundation',
          year: 1996,
          challenge: 'Modern society operates on increasingly short time horizons: quarterly earnings, election cycles, news cycles measured in hours. This "short now" mentality prevents addressing civilizational challenges like climate change, species extinction, or cultural preservation that unfold across centuries. The Long Now Foundation, founded by Stewart Brand, Brian Eno, and Danny Hillis, aimed to foster macro-historical thinking in contemporary decision-making. The challenge: make 10,000-year timeframes psychologically real and practically relevant.',
          application: 'Long Now uses multiple interventions applying macro-historical principles: (1) The 10,000 Year Clock—mechanical timepiece designed to run for millennia, making deep time tangible. The clock ticks once per year, chimes once per century, cuckoo once per millennium. Engineering for 10,000-year operation requires thinking about material degradation, societal continuity, and technological succession—all macro-historical concerns. (2) The Rosetta Project—archive of 1,500+ human languages on durable medium designed to last 10,000 years. Recognizes that languages constitute macro-level cultural structures that can be lost (événement: language death) within generational timescales (meso) but represent civilizational heritage (macro). (3) Long Bets—platform for predictions extending 10+ years, encouraging macro-temporal thinking. (4) Seminars About Long-term Thinking (SALT)—talks examining issues across Braudelian time scales. (5) The Manual for Civilization—library of 3,500 books deemed essential for rebuilding civilization, recognizing macro-level knowledge structures.',
          outcome: 'Over 25+ years, Long Now has influenced how technologists, policymakers, and cultural leaders think about time. The Clock project has inspired long-term thinking in organizations from government agencies to tech companies. The Rosetta archive demonstrated that cultural preservation requires macro-historical perspective—micro events (individual speaker deaths) cumulatively cause macro loss (language extinction). Long Bets has fostered public macro-temporal discourse. SALT seminars exposed thousands to Braudelian temporal layering. The foundation demonstrated that macro-historical thinking can inform practical action: climate strategy, species conservation, cultural preservation, institutional design all benefit from understanding deep time. Projects like GitHub\'s Arctic Code Vault (1,000-year software preservation) show Long Now\'s influence spreading.',
          insights: 'Long Now\'s work reveals: (1) Macro-historical thinking isn\'t just academic retrospection—it informs how we build for the future. (2) Making deep time tangible (through artifacts like the Clock) helps people grasp temporal scales intellectually accessible but psychologically distant. (3) Current institutions are optimized for micro/meso scales (election cycles, business quarters) creating mismatch with macro challenges (climate, species loss). (4) Civilizational continuity requires intentional design—languages, knowledge, ecosystems don\'t preserve themselves across centuries. (5) Macro-historical perspective shifts priorities: decisions optimized for quarterly returns often undermine century-scale resilience. For strategic foresight, Long Now demonstrates how Braudel\'s framework can be operationalized: identify which current decisions have macro-level implications, design interventions that shift longue durée trajectories, build institutions capable of thinking across temporal scales.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Macro-historical workshops require longer timeframes than typical foresight sessions—allow 2-3 days for meaningful historical immersion. Pre-reading is essential: distribute historical summaries, timelines, and key sources 2-3 weeks before. Partner with historians or historical scholars who can guide participants through centuries of context. Create physical timeline spanning walls (500-year timeline requires significant space). Use three-color system: one color for micro events, one for meso patterns, one for macro structures. Provide access to historical databases, archives, or curated research materials. Set expectation: this is research-intensive methodology, not brainstorming exercise.',
        groupDynamics: 'Ideal team combines historical knowledge, domain expertise, and strategic thinking. Include historians or scholars who can prevent anachronism and identify credible sources. Add domain experts (e.g., energy specialists for energy transitions analysis) who understand technical constraints. Include strategic thinkers who can translate historical insight into futures implications. Avoid pure presentism: participants who cannot mentally engage with pre-modern contexts struggle with macro-historical work. Create roles: historians focus on accuracy and context, domain experts identify technical patterns, strategists extract futures lessons. Rotate through time scales: everyone contributes to all three layers but individuals may lead different scales based on expertise.',
        commonChallenges: [
          'Insufficient historical knowledge: Participants lack depth to analyze centuries of history. Solution: Partner with historians from universities or research institutions. Use existing historical scholarship rather than attempting original research. Focus macro-historical analysis on well-documented domains where secondary sources provide adequate coverage.',
          'Analysis paralysis from complexity: Examining three time scales across centuries overwhelms. Solution: Narrow geographic or topical scope. Start with meso scale (most accessible), then extend to macro and micro. Use templates structuring analysis. Accept that macro-historical work is iterative—first pass identifies patterns, subsequent iterations add nuance.',
          'Presentism and anachronism: Projecting current categories backward. Solution: Historians on team call out anachronisms. Study periods in their own terms before drawing parallels. Recognize that past societies had different possibility spaces, values, technologies—avoid assuming current conditions are universal or permanent.',
          'Disconnection from present: Historical analysis becomes academic exercise without strategic relevance. Solution: Continuously link findings to present decisions. Ask: "How does this historical pattern inform our current situation?" End with explicit futures implications. Use historical analogues judiciously—past doesn\'t repeat but sometimes rhymes.',
          'Deterministic thinking: Treating macro structures as fate. Solution: Emphasize that structures constrain but don\'t determine—agency and contingency matter. Historical transitions show structures can shift, just slowly. Focus on identifying leverage points where action can influence long-term trajectories.'
        ],
        successIndicators: 'Successful macro-historical analysis produces: Participants perceiving current issues differently after understanding deep historical context. Ability to distinguish ephemeral fluctuations from structural shifts. Recognition that "unprecedented" claims often reflect historical ignorance. Strategic decisions incorporating temporal layering (what persists? what transitions? what fluctuates?). Futures scenarios grounded in historical patterns rather than pure imagination. Humility about pace of change—neither excessive optimism nor pessimism but realistic assessment based on historical precedent. Stakeholders repeatedly referencing historical analogues in strategy discussions. Most importantly: changed time horizons—participants thinking in decades and centuries, not just quarters and years.'
      },
      successCriteria: {
        processQuality: [
          'Clear articulation of phenomena across all three time scales (micro, meso, macro)',
          'Use of credible historical sources and scholarship, not Wikipedia-level knowledge',
          'Avoidance of anachronism and presentism in historical interpretation',
          'Explicit documentation of causal relationships across temporal scales',
          'Visual representations (timelines, layered diagrams) showing temporal structure',
          'Partnership with historical expertise for domains requiring deep knowledge',
          'Balanced attention to continuities (what persists) and transitions (what shifts)'
        ],
        outcomeQuality: [
          'Strategic insights that would be invisible without historical depth',
          'Identification of macro structures likely to persist across planning horizon',
          'Recognition of meso transitions approaching inflection points',
          'Calibrated expectations about pace of change based on historical patterns',
          'Historical analogues informing but not determining future scenarios',
          'Ability to distinguish structural shifts from cyclical fluctuations',
          'Long-term perspective shifting organizational time horizons and decision criteria',
          'Reduced susceptibility to presentism and "unprecedented" claims'
        ]
      },
      comparativeAnalysis: {
        vsCycleTheory: 'Cycle theory looks for recurring patterns (Kondratiev waves, generational cycles) within historical time. Macro-historical analysis examines all three temporal scales—including but not limited to cycles. Cycles are one type of meso-level pattern macro-historical analysis might identify. Use cycle theory when you suspect repetition; use macro-historical analysis for comprehensive temporal understanding including cycles, trends, and structural shifts.',
        vsCLA: 'Causal Layered Analysis examines four depth levels (litany, systems, worldview, myth) in present-day issues. Macro-historical analysis examines three time scales (micro, meso, macro) across historical time. Both reveal deep structures: CLA\'s worldview/myth layers correspond roughly to Braudel\'s longue durée—civilizational assumptions changing very slowly. CLA is synchronic (depth at single time point); macro-historical is diachronic (change across time). Integrate both: use CLA to go deep on present, macro-historical to understand how we got here and where deep structures might be heading.',
        vsScenarioPlanning: 'Scenario planning creates multiple plausible futures (typically 5-20 years forward). Macro-historical analysis examines multiple time scales backward to inform what futures are structurally plausible. Historical analysis precedes scenario development—Braudelian understanding reveals which macro structures will persist (scenario constraints), which meso trends might shift (critical uncertainties), what historical analogues inform possibilities. Scenarios without historical grounding often explore futures that violate macro constraints or ignore historical precedents. Integrate: conduct macro-historical analysis first, then build scenarios grounded in realistic understanding of temporal layering.',
        vsEnvironmentalScanning: 'Environmental scanning monitors current signals across STEEP domains. Macro-historical analysis examines how STEEP domains evolved across centuries. Scanning is present-focused; macro-historical is longitudinal. Combine them: use macro-historical analysis to understand which scanned signals represent ephemeral noise versus indicators of meso or macro transitions. Historical depth helps interpret current signals—is this genuinely novel or recurring pattern? Environmental scanning detects signals; macro-historical analysis provides context for interpretation.',
        whenToUse: 'Essential when: (1) Addressing challenges unfolding across decades to centuries (climate, demographics, technological paradigm shifts), (2) Current situation feels "unprecedented" but may have historical analogues, (3) Need to distinguish structural shifts from cyclical fluctuations, (4) Long-term commitments (infrastructure, institutions) require understanding what endures, (5) Stakeholders operate with presentist assumptions needing challenge. Most valuable for: civilizational-scale challenges, infrastructure planning, institutional design, cultural strategy, geopolitical analysis. Less useful for: rapid-iteration industries, short-term tactical decisions, genuinely novel phenomena with no historical precedent (though these are rarer than claimed). Time-intensive—reserve for strategic questions where historical depth provides irreplaceable insight.'
      },
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Braudel_time_scales.png',
          description: 'Diagram showing Braudel\'s three overlapping time scales of historical change: événements (micro - events/individual actions), conjonctures (meso - social/economic cycles lasting decades), and longue durée (macro - deep structural patterns over centuries). This framework helps futurists see beyond surface events to underlying patterns.'
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Fernand_Braudel_%281902-1985%29.jpg',
          description: 'French historian (1902-1985), pioneer of the Annales School and longue durée concept'
        },
        {
          type: 'image',
          title: 'Kondratiev Wave Timeline',
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Kondratieff_Wave.svg',
          description: 'Historical timeline showing five Kondratiev waves (40-60 year cycles) from 1780s to present, exemplifying Braudel\'s meso timeframe (conjonctures): Industrial Revolution, Railway Age, Electrical Age, Mass Production, and Information Age. Each wave represents a meso-level pattern within the macro structures of industrial capitalism.'
        }
      ],
      metadata: {
        difficulty: 'advanced',
        timeRequired: '2-4 weeks for comprehensive analysis',
        groupSize: 'small research teams (3-5 people) with historical knowledge',
        bestFor: ['Understanding deep structural forces', 'Distinguishing ephemeral from enduring change', 'Long-term strategic planning', 'Historical pattern recognition', 'Contextualizing current events'],
        sectors: ['Academic research', 'Policy planning', 'Cultural institutions', 'Strategic consulting', 'International relations'],
        commonPitfalls: ['Focusing only on macro scale and ignoring events', 'Deterministic thinking that discounts agency', 'Insufficient historical data for all three scales', 'Mistaking correlation across timeframes for causation', 'Overwhelming complexity when analyzing multiple parallel structures']
      }
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
        overview: 'Cycle Theory encompasses various frameworks proposing that economic, technological, and social change follows recurring patterns rather than purely linear progression. Most influential are Kondratiev Waves (40-60 year techno-economic cycles identified by Soviet economist Nikolai Kondratiev in 1925), Strauss-Howe Generational Theory (80-year cycles of four generational archetypes creating recurring historical turnings), and technology S-curves describing adoption lifecycles. Unlike trend analysis assuming continuous change, cycle theory suggests periodic rhythms: expansions and contractions, innovations and consolidations, crisis and renewal. The insight: if patterns recur, understanding where we are in current cycles helps anticipate transitions before they arrive. Kondratiev observed that capitalist economies undergo long waves driven by clusters of innovations—steam power, railways, electricity, automobiles, information technology. Each wave has spring (growth), summer (prosperity), autumn (stagnation), and winter (recession) phases. Strauss-Howe identified four generational turnings: High (optimism and institution-building), Awakening (spiritual upheaval), Unraveling (individualism and institutional decay), Crisis (upheaval leading to new order). Critics note cycles aren\'t deterministic—disruptions, policy choices, and contingencies matter. Proponents counter that while exact timing varies, cyclical patterns recur remarkably across different eras and geographies. For futurists, cycle theory provides temporal templates: are we approaching cycle peak or trough? Which historical turning does present resemble? The methodology is probabilistic, not predictive—cycles illuminate likely dynamics, not predetermined outcomes.',
        types: [
          'Kondratiev Waves - 40-60 year economic/technology cycles',
          'Generational Theory - 20-year cohort cycles (Strauss-Howe)',
          'Technology Cycles - S-curves of innovation adoption'
        ],
        application: 'Identify where we are in current cycles to anticipate transitions',

        processGuide: {
          title: 'How to Conduct Cycle Analysis',
          steps: [
            {
              number: 1,
              name: 'Select relevant cycle frameworks',
              description: 'Identify which cycle theories apply to your strategic question. Kondratiev waves for economic/technology strategy, Strauss-Howe for generational dynamics, S-curves for specific technology adoption, business cycles for shorter-term patterns. Research the theoretical foundations: What causes the cycle? What historical evidence supports it? What are the characteristic phases? Not all phenomena are cyclical—distinguish genuine cycles from one-time trends or random fluctuations. Document cycle parameters: typical duration, phase characteristics, historical examples.',
              timeRequired: '2-3 days',
              deliverable: 'Framework selection document explaining chosen cycle theories and why they apply to your context'
            },
            {
              number: 2,
              name: 'Map historical cycle data',
              description: 'Gather historical data covering multiple complete cycles (ideally 2-3 full cycles minimum for pattern validation). For Kondratiev waves: economic indicators, innovation clusters, infrastructure investments from 1780s-present. For generational cycles: demographic cohort data, cultural mood indicators, crisis events spanning 160+ years. For technology S-curves: adoption rates from introduction through maturity. Create visual timelines showing cycles overlaid on historical events. Identify cycle turning points: when did expansion shift to contraction? When did one generation give way to next? Statistical validation where possible but recognize many cycles defy precise quantification.',
              timeRequired: '1-2 weeks',
              deliverable: 'Historical cycle timeline with phases marked, turning points identified, and supporting data documented'
            },
            {
              number: 3,
              name: 'Determine current cycle position',
              description: 'Assess where we are in active cycles using multiple indicators. For Kondratiev: are we in winter (recession/restructuring) or spring (new growth)? Evidence: innovation clusters emerging? Infrastructure investment patterns? Financial market dynamics? For Strauss-Howe: which turning and generational constellation? Evidence: cultural mood, institutional trust levels, crisis orientation. Compare current indicators to historical patterns at equivalent cycle positions. Recognize ambiguity—cycles don\'t announce themselves clearly. Build multiple hypotheses: "If we\'re in late autumn..." vs "If we\'re in early winter..." Use expert judgment alongside data.',
              timeRequired: '1 week',
              deliverable: 'Current position assessment with evidence, indicators, and alternative interpretations if ambiguous'
            },
            {
              number: 4,
              name: 'Analyze cycle interactions',
              description: 'Examine how multiple cycles interact—they don\'t operate independently. Technology S-curves occur within Kondratiev waves; generational turnings influence how economic cycles play out. When cycles align (e.g., Kondratiev winter + generational Crisis), turbulence intensifies. When cycles oppose (e.g., technology spring during economic autumn), tensions create unpredictability. Map cycle overlaps: which cycles are synchronized? Which offset? Historical precedents: what happened last time these cycles aligned this way? The synthesis reveals whether current moment has historical analogues or represents unusual configuration.',
              timeRequired: '3-5 days',
              deliverable: 'Cycle interaction map showing synchronicities, offsets, and historical analogues for current configuration'
            },
            {
              number: 5,
              name: 'Project transition timing',
              description: 'Estimate when current cycle phases will transition based on historical patterns. If Kondratiev winter typically lasts 20-25 years and started in 2008, expect shift to spring around 2028-2033. If generational Crisis began 2008 (financial collapse), typical duration suggests resolution 2025-2030. Technology S-curves: where on adoption curve? Early majority phase suggests 10-15 more years to saturation. Caveat all projections: cycles aren\'t clockwork, exact timing varies. Provide ranges, not point predictions. Identify leading indicators that would signal transition approaching: for Kondratiev winter-to-spring, watch for new infrastructure investment clusters; for Crisis-to-High, watch institutional rebuilding and cultural consensus.',
              timeRequired: '3-5 days',
              deliverable: 'Transition timing estimates with ranges, assumptions, and leading indicators to monitor'
            },
            {
              number: 6,
              name: 'Develop cycle-aware strategies',
              description: 'Translate cycle insights into strategic implications. Strategies aligned with cycle dynamics succeed; those fighting cycles struggle. If entering Kondratiev spring: invest in new infrastructure, expect growth acceleration, position for next wave. If in generational Crisis: expect institutional transformation, prepare for resolution, avoid assuming normalcy. If technology reaching maturity: shift from growth to efficiency, scan for next S-curve. Build adaptive strategies: what works in current phase? How to prepare for next? Scenario variations based on cycle timing uncertainty. Identify no-regret moves effective across multiple cycle interpretations.',
              timeRequired: '1-2 weeks',
              deliverable: 'Strategic recommendations tailored to current cycle position with contingencies for transition timing uncertainty'
            }
          ],
          totalTime: '5-8 weeks for comprehensive cycle analysis',
          facilitationTips: 'Cycle analysis benefits from economic historians and demographers who understand long-term data. Balance pattern recognition with critical skepticism—humans see patterns even in randomness. Test cycle theories against out-of-sample data (predictions made before events occurred). Communicate probabilistically: "Historical patterns suggest..." not "Cycles prove..." Avoid determinism: cycles illuminate dynamics, not destiny. Use cycles as one input among many, not sole strategic driver. Visual timelines make cycles tangible for stakeholders unfamiliar with theory.'
        },

        workedExample: {
          title: 'Where Are We in the Current Kondratiev Wave? (2025 Analysis)',
          context: 'To inform technology investment and economic strategy for 2025-2035, we analyze position in the current Kondratiev wave and anticipate next transition.',
          historicalMapping: 'Kondratiev waves since 1780s: First wave (1780s-1840s): steam power, textiles, iron. Second wave (1840s-1890s): railways, steel, coal. Third wave (1890s-1940s): electricity, chemicals, internal combustion. Fourth wave (1940s-1990s): automobiles, petrochemicals, suburbanization, mass production. Fifth wave (1990s-2020s?): information technology, telecommunications, internet, globalization. Each 40-60 year wave shows spring (new infrastructure enabling growth), summer (prosperity and expansion), autumn (maturity and stagnation), winter (crisis and restructuring preparing for next wave).',
          currentPosition: 'Most analysts place us in late autumn or early winter of fifth Kondratiev wave (information age). Evidence: ICT infrastructure now mature/ubiquitous, internet business models saturated, FAANG companies defensive not expansionary, digital advertising plateauing, globalization reversing, 2008 financial crisis and 2020 pandemic resembling winter disruptions of prior waves. Technology returns diminishing: smartphones ubiquitous, social media mature, cloud computing commoditized. The "great stagnation" in productivity growth (2005-2020) mirrors autumn stagnation of prior cycles. However, winter phase typically involves painful restructuring: financial crisis (2008), pandemic shock (2020), geopolitical instability (2020s), questioning of institutions. This positions us in early-to-mid winter: crisis initiated but transformation incomplete.',
          cycleInteractions: 'Winter coincides with Strauss-Howe Fourth Turning (Crisis, began 2008): aligned cycles intensify. Previous such alignment: 1930s-1940s (Great Depression/WWII), 1860s (Civil War), 1770s-1780s (Revolution). Suggests current decade will be turbulent but foundational—crises that break old order and enable new one. Generational constellation: Millennials entering leadership as Artists (cautious institution-builders), Gen Z as Prophets (values-driven), setting stage for post-winter reconstruction.',
          transitionTiming: 'Historical pattern: winter lasts 15-25 years. If winter began 2008, expect emergence of next spring 2023-2033. Leading indicators of spring transition: (1) new infrastructure investment clusters—candidates include renewable energy grids, biotech manufacturing, AI computing infrastructure, (2) productivity acceleration from new technologies, (3) new business models exploiting infrastructure (like internet enabled Amazon/Google in 1990s spring), (4) generational shift in leadership and values, (5) geopolitical stabilization after crisis. By 2025: too early to declare spring arrived, but watch for signals accumulating.',
          strategicImplications: 'For 2025-2035: (1) Winter strategies: expect continued volatility, protect against shocks, maintain flexibility. (2) Position for spring: identify which new infrastructure clusters will power sixth wave (renewable energy? biotech? AI? space?). Early movers in new infrastructure gain advantages lasting decades. (3) Avoid fighting winter: strategies optimized for fifth wave (digital advertising, globalization arbitrage, platform monopolies) likely stagnate. (4) Learn from history: 1930s winter led to 1950s-1960s boom; positioning in 1930s determined 1950s winners. (5) By 2030-2035: if spring emerges on schedule, shift fully to growth mode in new infrastructure. Cycle analysis doesn\'t predict which technology wins but suggests we\'re in transition period between waves—time to explore rather than exploit.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
      relatedMethodologies: [
        { id: 'macro-historical', type: 'complements', description: 'Cycle theory identifies recurring patterns within the deep structural timeframes revealed by macro-historical analysis' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Understanding where we are in current cycles helps identify critical uncertainties and potential turning points for scenarios' },
        { id: 'emerging-issues', type: 'complements', description: 'Cycle analysis helps determine which emerging issues signal transitions between eras versus normal cyclical fluctuations' },
        { id: 'weak-signals', type: 'complements', description: 'Early indicators of cycle transitions often appear first as weak signals before becoming mainstream trends' }
      ],
      caseStudies: [
        {
          title: 'Carlota Perez: Technological Revolutions and Financial Capital',
          organization: 'Academic Research / Carlota Perez',
          year: 2002,
          challenge: 'Understanding why technology booms repeatedly create financial bubbles followed by crashes, and how to navigate these patterns. Historical pattern: each major technology revolution (canals, railways, electricity, automobiles, information) follows similar cycle of installation phase (rapid deployment, speculation, bubble) followed by deployment phase (mature growth, productivity). Why does this pattern recur?',
          application: 'Perez synthesized Kondratiev wave theory with financial market dynamics to create practical framework. Each 40-60 year technological revolution has two phases: Installation (20-30 years): New infrastructure rapidly deployed using financial capital. Innovators build future but profitability unclear. Speculation dominates, culminating in bubble (1840s railway mania, 1920s stock bubble, 2000 dot-com). Bubble bursts, recession follows. Turning Point: Crisis forces institutional adaptation, regulation, and business model maturation. Deployment (20-30 years): Technology reaches mass market, productivity surges, golden age emerges (Victorian boom, Belle Epoque, postwar prosperity, coming era?). Real wealth created, not just speculation. The framework helped analysts position in cycle: during installation, expect volatility and bubbles; after turning point, expect productivity boom. Current position (2025): post-2000 dot-com crash, through 2008 crisis, possibly entering deployment phase where digital technology delivers productivity (AI, automation) rather than just speculation.',
          outcome: 'Perez framework influenced policymakers, investors, and strategists. It explained dot-com bubble not as irrational exuberance but as typical installation-phase pattern. Post-2008, her framework suggested we were at turning point between installation and deployment—institutional adaptation needed before productivity boom. By 2020s, evidence mounting: AI driving productivity, digital infrastructure mature, business models proven. Investors using framework positioned for deployment phase rather than expecting repeat bubble. Policymakers recognized need for institutional evolution (antitrust, data regulation) to enable deployment phase productivity. The case demonstrates how cycle theory provides practical navigation through turbulent transitions—not predicting exact events but illuminating likely dynamics.',
          insights: 'Cycle frameworks work best when they explain mechanisms, not just patterns. Perez explained why bubbles recur: new technologies require infrastructure before productivity, creating lag between investment and returns, enabling speculation. Cycles aren\'t deterministic: turning point requires institutional adaptation that could be delayed or accelerated by policy. Current application: if entering deployment phase of information revolution, expect productivity acceleration 2025-2040 but only if institutional framework adapts (education, regulation, business models). Cycle theory most valuable at transitions—helping recognize when we\'re shifting between phases rather than experiencing temporary fluctuation.'
        },
        {
          title: 'Strauss-Howe Fourth Turning: Generational Cycles in American History',
          organization: 'William Strauss & Neil Howe',
          year: 1997,
          challenge: 'Explaining why American history exhibits recurring patterns of crisis and renewal approximately every 80 years. Pattern: American Revolution (1770s-1780s), Civil War (1860s), Great Depression/WWII (1930s-1940s)—roughly 80-year intervals. Strauss-Howe proposed generational theory: four generation archetypes (Prophet, Nomad, Hero, Artist) cycling every 80 years create four turnings (High, Awakening, Unraveling, Crisis) shaping historical mood.',
          application: 'Published "The Fourth Turning" in 1997 predicting Crisis turning would begin circa 2005-2010, matching 80-year cycle from prior Crisis (1930s). The book outlined Crisis characteristics: institutional collapse, existential threats, generational constellation with values-driven Prophets in elder leadership (Boomers), pragmatic Nomads in mid-life (Gen X), civic-minded Heroes coming of age (Millennials), protected Artists in childhood (Gen Z). Crisis culminates in decisive resolution reshaping institutions and values. Critics dismissed theory as pattern-seeking. Then 2008 financial crisis hit, followed by rising political polarization, pandemic, institutional questioning—matching predicted Crisis dynamics. Suddenly theory gained attention. Strategists using framework anticipated: institutional turbulence continuing through 2020s, generational leadership transitions reshaping politics/business, resolution emerging 2025-2030 setting stage for new High (optimism and institution-building). The cycle suggested current turmoil isn\'t permanent dysfunction but phase transition.',
          outcome: 'By 2020s, Fourth Turning framework widely referenced in strategy circles. It helped make sense of seemingly unprecedented chaos by showing historical precedent. Organizations preparing for Crisis resolution: what institutions need rebuilding? What values will dominate post-Crisis High? Generational dynamics became central to workforce planning: Millennials entering leadership with different style than Boomers, Gen Z bringing new values. Investors recognized Crisis patterns: volatility until resolution, then potential multi-decade boom (like 1950s-1960s following 1940s Crisis). Political analysts saw polarization as typical Crisis dynamic, not aberration. Most valuably, framework provided hope: Crisis is temporary phase, resolution approaches, renewal follows. Cycles suggest current challenges are passage not permanent state.',
          insights: 'Generational cycles demonstrate how demographic cohorts shape history through shared formative experiences. Millennials growing up during prosperity developed different worldview than Gen X raised during Unraveling chaos—these differences predictably influence later leadership decisions. Cycles help distinguish temporary turbulence from permanent change: Crisis feels unprecedented to those living through it, but historical perspective shows recurring pattern. Practical use: preparing for next High (institutional rebuilding, values consensus) rather than assuming current Crisis dynamics persist indefinitely. The case shows cycles aid sensemaking and horizon-setting even if exact timing uncertain.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Cycle analysis workshops require historical data visualization: prepare timeline posters showing multiple complete cycles. Bring economic historians or demographic experts who understand long-term patterns. Provide cycle theory readings (Kondratiev, Perez, Strauss-Howe) as pre-work. Create physical or digital cycle maps where participants can plot current position. Allow 1-2 days for meaningful cycle analysis—cannot be rushed into 3-hour session. Set realistic expectations: cycles provide probabilistic guidance, not certainty.',
        groupDynamics: 'Ideal mix: skeptics who challenge pattern claims and believers who see cycle signals. Tension between perspectives produces balanced analysis. Include long-tenure employees who remember prior cycles and newcomers with fresh perspectives. Cross-generational teams valuable for generational cycle analysis. Assign roles: historians document cycle evidence, strategists translate to implications, skeptics test validity. Rotate perspectives: have skeptics argue cycle case, believers argue against.',
        commonChallenges: [
          'Over-fitting: Seeing cycles everywhere, forcing data into patterns. Solution: Apply statistical tests where possible. Require multiple cycle examples before claiming pattern. Distinguish cycles from one-time events. Accept that not all phenomena are cyclical.',
          'Determinism: Treating cycles as fate rather than probabilistic patterns. Solution: Emphasize cycles show likely dynamics, not predetermined outcomes. Policy and agency matter. Use conditional language: "If historical patterns hold..." Develop strategies for scenarios where cycles break.',
          'Precision illusion: Claiming exact cycle timing when inherently uncertain. Solution: Provide ranges, not point estimates. Highlight leading indicators rather than fixed dates. Acknowledge ambiguity in identifying current position. Update assessments as new data arrives.',
          'Ignoring discontinuities: Missing genuine novelty that breaks cycles. Solution: Identify potential cycle-breaking forces: new technologies with no precedent, unprecedented global coordination, climate change effects. Build scenarios for both cycle continuation and discontinuity.',
          'Analysis paralysis: Debating cycle validity instead of extracting strategic value. Solution: Time-box theoretical debates. Focus on "even if cycles are approximate, what do they suggest?" Use cycles as one analytical lens among several, not sole framework.'
        ],
        successIndicators: 'Cycle analysis succeeds when: Strategy explicitly accounts for phase transitions rather than assuming present continues. Leadership discussions reference cycle position ("We\'re in winter, so..."). Resource allocation shifts anticipate cycle changes (invest in spring infrastructure during winter). Reduced surprise when transitions occur—organization prepared mentally and operationally. However, maintains strategic flexibility recognizing cycles could break. Most importantly: provides temporal context that calms panic during Crisis and prevents complacency during High.'
      },
      successCriteria: {
        processQuality: [
          'Multiple complete historical cycles documented (minimum 2-3 full cycles)',
          'Clear criteria for cycle phases with supporting evidence',
          'Statistical validation where applicable or explicit acknowledgment of interpretive judgment',
          'Multiple hypotheses for current position if ambiguous',
          'Analysis of cycle interactions, not just individual cycles in isolation',
          'Identified leading indicators for upcoming transitions',
          'Explicit caveats about uncertainty and non-deterministic nature'
        ],
        outcomeQuality: [
          'Strategic decisions reflect cycle-aware timing and sequencing',
          'Organization positioned for upcoming phase transitions',
          'Reduced volatility in strategy from recognizing cyclical vs. permanent changes',
          'Appropriate resource allocation across cycle phases (invest in winter for spring, harvest in autumn)',
          'Mental models updated: presentism replaced with historical perspective',
          'Calibrated expectations about pace and nature of change',
          'Contingency plans for cycle timing uncertainty or cycle-breaking events'
        ]
      },
      comparativeAnalysis: {
        vsMacroHistorical: 'Macro-historical analysis examines three time scales (micro, meso, macro) across all patterns; cycle theory focuses specifically on recurring patterns within meso timeframe (decades to generations). Cycles are subset of macro-historical analysis. Use cycles when repetition likely; use macro-historical for comprehensive temporal understanding including but not limited to cycles.',
        vsTrendAnalysis: 'Trend analysis assumes continuous, linear change; cycle theory assumes periodic, oscillating change. Trends: "Technology adoption accelerating continuously." Cycles: "Technology adoption follows S-curves with maturation phases." Reality often combines both: long-term trends with cyclical fluctuations. Integrate: identify underlying trends (e.g., increasing connectivity) within which cycles operate (e.g., specific technology waves).',
        vsScenarioPlanning: 'Scenario planning explores alternative futures based on uncertainties; cycle theory suggests likely temporal patterns. Cycles inform scenario timing: "If entering Kondratiev spring, which technologies dominate?" Scenarios explore what happens; cycles suggest when transitions likely. Best practice: use cycles to time scenario transitions and identify critical inflection points.',
        whenToUse: 'Most valuable when: (1) Historical data shows recurring patterns worth investigating, (2) Planning horizon extends across potential cycle transitions (10+ years), (3) Strategic question involves timing: when to invest? when to harvest? (4) Turbulent period where cycles help distinguish temporary from permanent, (5) Generational shifts affecting workforce, markets, or culture. Less useful for: genuinely unprecedented situations, short-term tactical decisions, linear trend environments. Cycles work best for techno-economic systems (Kondratiev), demographics (generational), and sectors with clear innovation lifecycles.'
      },
      media: [
        {
          type: 'image',
          title: 'Strauss-Howe Generational Cycle',
          url: '/diagrams/generational-cycle.svg',
          description: 'Four Turnings cycle repeating every 80-100 years (Fourth Turning theory, 1997). Shows circular progression: First Turning/High (Spring - institutions strong), Second Turning/Awakening (Summer - spiritual exploration), Third Turning/Unraveling (Autumn - civic decay), Fourth Turning/Crisis (Winter - institutional destruction & rebuilding). Includes historical examples and four generational archetypes (Prophet, Nomad, Hero, Artist).'
        },
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Kondratieff_Wave.svg',
          description: 'Historical timeline showing five Kondratiev waves of economic development from 1780s to present: Industrial Revolution (steam/textiles), Railway Age (steel/rail), Electrical Age (electricity/chemicals), Mass Production Age (automobiles/petrochemicals), and Information Age (computers/telecommunications). Each wave lasts 40-60 years with distinct innovation clusters.'
        },
        {
          type: 'article',
          title: 'Economic Cycles and Innovation',
          url: 'https://en.wikipedia.org/wiki/Kondratiev_wave',
          source: 'Wikipedia',
          description: 'Deep dive into cycle theory covering Kondratiev waves, generational cycles, technology adoption curves, and other cyclical patterns in economic and social systems. Explores how understanding these rhythms helps anticipate turning points and transitions between eras.'
        },
        {
          type: 'image',
          title: 'Kondratiev-Schumpeter Innovation Waves',
          url: '/diagrams/innovation-waves.svg',
          description: 'Visual representation of six long waves of creative destruction (1785-2060+): Water power/textiles (1785-1845), Steam/railways (1845-1900), Electricity/chemicals (1900-1950), Petrochemicals/electronics (1950-1990), Digital networks/software (1990-2020), and AI/renewable energy (2020-2060?). Kondratiev (1925) empirically identified 40-60 year economic cycles; Schumpeter (1939) explained the mechanism through innovation clustering and creative destruction. Shows how general-purpose technologies drive long-wave economic growth.',
          source: 'AK Consulting'
        }
      ],
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '1-3 days for cycle mapping and analysis',
        groupSize: 'small teams (3-6 people) with economic/historical knowledge',
        bestFor: ['Anticipating turning points', 'Technology adoption timing', 'Economic trend forecasting', 'Generational shift planning', 'Long-wave pattern recognition'],
        sectors: ['Economic forecasting', 'Technology planning', 'Investment strategy', 'Demographic planning', 'Innovation management'],
        commonPitfalls: ['Over-deterministic cycle predictions', 'Ignoring disruptions that break cycles', 'Confusing cycles with one-time trends', 'Forcing data to fit cycle theories', 'Missing the influence of policy interventions']
      }
    },

    // DEEPENING Methods
    {
      id: 'cla',
      label: 'Causal Layered\nAnalysis',
      parent: 'deepening',
      description: 'Four-layer depth analysis examining litany (events), systems (structures), worldviews (discourses), and myths (metaphors) underlying current and alternative futures',
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
        overview: 'Causal Layered Analysis (CLA), developed by Sohail Inayatullah in 1998, is a transformative futures methodology that deconstructs problems across four layers of increasing depth: Litany (surface events and data), Social Causes (systemic drivers and STEEP factors), Discourse/Worldview (ideological structures and paradigms), and Myth/Metaphor (deep unconscious narratives and cultural archetypes). Unlike conventional analysis that stops at symptoms or systems, CLA reveals how deeper cultural narratives and metaphors create surface realities. By excavating these hidden layers, CLA enables transformative interventions that address root causes rather than symptoms. The method integrates poststructuralist critique with futures thinking, asking not just "what is the future?" but "whose future?" and "what narratives sustain current trajectories?" CLA is particularly powerful for revealing how language, power, and culture constrain our imagination of alternatives, opening space for genuinely novel futures.',
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
      caseStudies: [
        {
          title: 'University of the Sunshine Coast 2032 Strategic Plan',
          organization: 'University of the Sunshine Coast, Australia',
          year: 2012,
          challenge: 'University needed strategic direction beyond incremental planning to reimagine higher education\'s future role',
          application: 'Inayatullah facilitated CLA workshops with faculty, staff, students, and community to deconstruct current university paradigm across four layers and co-create transformative vision',
          outcome: 'Generated "USC 2032" plan focused on sustainability, indigenous knowledge integration, and community engagement rather than conventional growth metrics. Shifted from "teaching factory" metaphor to "learning ecosystem"',
          layers: {
            litany: 'Budget cuts, enrollment targets, rankings pressure',
            social: 'Neoliberal education policy, credential inflation, research funding competition',
            worldview: 'Universities as economic engines producing human capital for industry',
            myth: 'Factory model - students as products, learning as assembly line, credentials as certificates of conformity'
          }
        },
        {
          title: 'Climate Change Communication Strategy',
          organization: 'European Environment Agency',
          year: 2009,
          challenge: 'Public engagement with climate change remained low despite scientific consensus. Traditional information campaigns failing',
          application: 'Applied CLA to understand why climate messages weren\'t resonating. Analyzed discourse across European countries and demographic segments',
          outcome: 'Revealed problem was not information deficit but mythic narratives of progress, growth, and human dominion over nature. Led to new communication emphasizing stewardship narratives and systemic thinking',
          layers: {
            litany: 'Climate denial, political gridlock, consumer apathy, "it\'s too late anyway"',
            social: 'Fossil fuel lobbying, short-term electoral cycles, carbon lock-in infrastructure',
            worldview: 'Nature as resource for human use, technology will solve problems, growth = prosperity',
            myth: 'Prometheus myth - humans as masters of fire/energy, nature as wilderness to be conquered, infinite frontier'
          }
        }
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
          description: 'Comprehensive overview of Causal Layered Analysis methodology, explaining how the four-layer framework (litany, social causes, discourse/worldview, myth/metaphor) deconstructs problems to reveal transformative solutions. Includes examples, applications, and theoretical foundations in poststructuralism.'
        },
        {
          type: 'image',
          title: 'UNESCO Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/UNESCO_logo.svg',
          description: 'UNESCO Chair in Futures Studies - Sohail Inayatullah developed CLA as UNESCO Chair holder'
        },
        {
          type: 'image',
          title: 'CLA Four Layers Framework',
          url: '/diagrams/cla-four-layers.svg',
          description: 'Visual representation of Causal Layered Analysis\' four-layer depth framework (Inayatullah, 1998): Layer 1 (Litany) - surface headlines and quantifiable trends; Layer 2 (Systemic Causes) - social, economic, political systems and structures; Layer 3 (Worldview/Discourse) - ideological assumptions and paradigms that make systems seem natural; Layer 4 (Myth/Metaphor) - deep unconscious narratives and archetypal stories. Shows how transformative change requires shifting myths/metaphors, not just surface interventions.',
          source: 'AK Consulting'
        }
      ],
      metadata: {
        difficulty: 'advanced',
        timeRequired: '1-2 days for initial workshop, ongoing for implementation',
        groupSize: 'facilitated workshops (8-15 people) with diverse perspectives',
        bestFor: ['Deep problem reframing', 'Transformative strategy development', 'Uncovering hidden assumptions', 'Cultural/worldview analysis', 'Participatory futures work'],
        sectors: ['Strategic planning', 'Policy development', 'Organizational change', 'Education reform', 'Sustainability transitions'],
        commonPitfalls: ['Staying stuck at superficial layers', 'Difficulty accessing myth/metaphor layer', 'Group resistance to challenging worldviews', 'Not moving from analysis to action', 'Facilitator bias influencing layer interpretations']
      }
    },
    {
      id: 'discourse-analysis',
      label: 'Discourse\nAnalysis',
      parent: 'deepening',
      description: 'Critical examination of language, narratives, and communication patterns that shape how futures are imagined and whose visions are privileged',
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
        overview: 'Discourse Analysis, pioneered by Norman Fairclough in the 1980s, examines how language, narratives, and communication patterns shape social reality and constrain or enable futures thinking. Applied to foresight, it reveals how dominant discourses frame what futures are considered possible, desirable, or even thinkable, while marginalizing alternative visions. The method analyzes text, discourse practices, and sociocultural contexts to uncover power relations embedded in language. By deconstructing organizational narratives, policy documents, and media representations of the future, discourse analysis exposes whose voices dominate futures conversations and whose are silenced. This critical lens is essential for inclusive foresight, revealing how seemingly neutral language perpetuates existing power structures and limits imagination of alternatives.',
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
      relatedMethodologies: [
        { id: 'cla', type: 'complements', description: 'Discourse analysis provides tools to examine CLA\'s third layer (discourse/worldview), revealing how language maintains specific futures' },
        { id: 'scenario-planning', type: 'prerequisite', description: 'Analyzing dominant narratives and frames reveals hidden assumptions to challenge when developing alternative scenarios' },
        { id: 'stakeholder-analysis', type: 'complements', description: 'Discourse analysis reveals power dynamics and whose voices shape organizational narratives about the future' },
        { id: 'visioning', type: 'prerequisite', description: 'Deconstructing dominant discourses creates space for inclusive visioning that incorporates marginalized perspectives' }
      ],
      media: [
        {
          type: 'video',
          title: 'Norman Fairclough: Critical Discourse Analysis',
          url: 'https://www.youtube.com/watch?v=68ShJJmPzKs',
          description: 'Fairclough explaining critical discourse analysis framework and methodology',
          year: 2013
        },
        {
          type: 'image',
          title: 'Fairclough\'s Three-Dimensional CDA Framework',
          url: 'https://www.researchgate.net/figure/CDA-Three-Dimensional-Norman-Fairclough-Fairclough-2010_fig1_358499059',
          description: 'Norman Fairclough\'s critical discourse analysis framework showing three interconnected dimensions: text (linguistic analysis), discourse practice (production and consumption of text), and sociocultural practice (institutional and social contexts). This layered approach reveals how language perpetuates power structures and shapes what futures are considered possible or desirable.'
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
      ],
      metadata: {
        difficulty: 'advanced',
        timeRequired: '1-3 weeks for comprehensive discourse analysis',
        groupSize: 'small analytical teams (2-4 people) with linguistic/critical theory background',
        bestFor: ['Deconstructing dominant narratives', 'Revealing power structures', 'Amplifying marginalized voices', 'Language and framing analysis', 'Challenging assumptions in futures work'],
        sectors: ['Policy analysis', 'Media studies', 'Social change organizations', 'International development', 'Political communication'],
        commonPitfalls: ['Over-intellectualizing without actionable insights', 'Researcher bias in interpretation', 'Missing nuanced cultural contexts', 'Neglecting material conditions behind discourse', 'Alienating stakeholders with academic jargon']
      }
    },

    // CREATING ALTERNATIVES Methods
    {
      id: 'scenarios',
      label: 'Scenario\nPlanning',
      parent: 'creating',
      description: 'Development of multiple plausible divergent future narratives to explore uncertainties, test strategies, and challenge assumptions in complex environments',
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
        overview: 'Scenario Planning, developed at Royal Dutch Shell in the 1970s by Pierre Wack, creates multiple plausible narrative descriptions of how the future might unfold, based on different assumptions about key uncertainties and driving forces. Unlike forecasting (which predicts a single future) or visioning (which imagines preferred futures), scenarios explore the space of possibility by asking "what if?" Rather than attempting to predict the future, scenarios prepare decision-makers to recognize and respond effectively when different futures emerge. The method identifies critical uncertainties (factors that will significantly impact the future but whose outcomes are unpredictable), constructs 3-4 divergent but plausible scenarios, and uses these narratives to test strategies and surface hidden assumptions. Effective scenarios are not best/worst case, but genuinely different logics of how the future could unfold, each internally consistent and challenging to conventional thinking.',
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
      caseStudies: [
        {
          title: 'Shell and the 1973 Oil Crisis',
          organization: 'Royal Dutch Shell Group Planning',
          year: 1972,
          challenge: 'Oil industry operated on assumption of stable, predictable prices. Planning based on single-point forecasts. Shell needed strategic flexibility',
          application: 'Pierre Wack\'s team developed scenarios exploring what could disrupt oil markets. Created "Crisis" scenario imagining OPEC supply restrictions and price shocks alongside "Boom and Bust" alternative',
          outcome: 'When 1973 oil crisis hit exactly as Crisis scenario predicted, Shell was only major oil company prepared. Shifted investments before competitors, moving from #7 to #2 global ranking. Validated scenario planning for business strategy',
          keyInsight: 'Scenarios don\'t predict the future—they prepare minds to recognize it when it arrives. Shell managers had "rehearsed" the crisis mentally'
        },
        {
          title: 'Mont Fleur Scenarios: Post-Apartheid South Africa',
          organization: 'Mont Fleur Scenario Team, South Africa',
          year: 1992,
          challenge: 'South Africa transitioning from apartheid. Deep divisions between political factions. No shared vision of post-apartheid future. Risk of civil war',
          application: 'Adam Kahane facilitated diverse group (ANC, government, business, civil society) through scenario process. Co-created four scenarios: Ostrich (denial), Lame Duck (weak government), Icarus (unsustainable populism), Flight of Flamingos (inclusive growth)',
          outcome: 'Scenarios became common language across political spectrum. "Flight of Flamingos" inspired ANC\'s economic policy. Helped peaceful transition by making futures discussable. Demonstrated scenario planning for social transformation',
          keyInsight: 'Scenarios as "boundary objects" - allowed hostile groups to explore futures together without requiring agreement on the past'
        },
        {
          title: 'Singapore Scenarios 2065',
          organization: 'Centre for Strategic Futures, Singapore Government',
          year: 2015,
          challenge: 'Singapore\'s 50th anniversary (SG50). Need to imagine next 50 years amid rising uncertainty: climate change, technology disruption, geopolitical shifts',
          application: 'Developed seven scenarios spanning 2015-2065 using "cone of plausibility" approach. Engaged 2,500+ citizens in workshops. Combined expert analysis with public imagination',
          outcome: 'Created "Our Singapore Conversation" - national dialogue on preferred futures. Informed long-term policies on sustainability, innovation, social cohesion. Built futures literacy across population',
          keyInsight: 'Scenarios for nation-building - using foresight to create shared purpose and prepare society for long-term challenges'
        }
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Scenario_matrix.png',
          description: 'Classic 2x2 scenario matrix framework for generating four distinct scenarios by crossing two critical uncertainties. This tool helps explore the scenario space systematically, ensuring diversity of futures while keeping the number manageable. Widely used in Shell scenario planning and corporate foresight.'
        },
        {
          type: 'article',
          title: 'Scenario Planning',
          url: 'https://en.wikipedia.org/wiki/Scenario_planning',
          source: 'Wikipedia',
          description: 'Comprehensive guide to scenario planning methods covering the Shell approach, GBN frameworks, intuitive logics, and various scenario development techniques. Explains the process from horizon scanning to scenario construction, narrative development, and strategic testing.'
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Eisenhower_matrix.svg',
          description: '2x2 matrix representing Dator\'s four future archetypes: Growth, Collapse, Steady State, and Transformation'
        },
        {
          type: 'image',
          title: 'Herman Kahn Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Herman_Kahn.jpg',
          description: 'American physicist and futurist (1922-1983), RAND Corporation pioneer of scenario thinking'
        },
        {
          type: 'image',
          title: 'Peter Schwartz Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Peter_Schwartz_in_2022.jpg',
          description: 'American futurist and business strategist (b. 1946), popularized scenario planning through Global Business Network'
        },
        {
          type: 'image',
          title: 'RAND Corporation Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Rand_Corporation_logo.svg',
          description: 'RAND Corporation - birthplace of scenario planning in the 1950s, where Herman Kahn pioneered the methodology'
        }
      ],
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '2-5 days for full scenario development process',
        groupSize: 'workshops with 8-20 participants plus facilitation team',
        bestFor: ['Strategic planning under uncertainty', 'Exploring multiple plausible futures', 'Stress-testing strategies', 'Building organizational foresight capacity', 'Long-term decision making'],
        sectors: ['Corporate strategy', 'Government planning', 'Defense/security', 'Energy and resources', 'Technology companies'],
        commonPitfalls: ['Creating too many scenarios', 'Scenarios too similar or predictable', 'Focusing on preferred futures instead of plausible ones', 'Not connecting scenarios to current decisions', 'Treating scenarios as predictions']
      }
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
        overview: 'Wild cards are surprising, low-probability events with potentially transformative impact that can fundamentally reshape assumptions, industries, or societies. Unlike weak signals which require careful interpretation, wild cards arrive as dramatic discontinuities with immediate, far-reaching consequences. Popularized by Nassim Nicholas Taleb as "Black Swans," these events share three characteristics: rarity (nothing in the past convincingly points to their possibility), extreme impact (they carry massive consequences), and retrospective predictability (after the fact, we construct explanations making them appear less random). Wild card thinking is essential for strategic resilience—not to predict the unpredictable, but to build adaptive capacity and robust strategies that can withstand radical surprises. Organizations that systematically consider wild cards develop more flexible plans, broader contingency responses, and greater organizational agility. The practice involves identifying potential discontinuities, assessing their impact dimensions, and developing response strategies that increase readiness without requiring precise prediction.',
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
        application: 'Include 1-2 wild card scenarios alongside plausible scenarios to stress-test strategies',

        processGuide: {
          title: 'How to Conduct Wild Card Scenario Analysis',
          steps: [
            {
              number: 1,
              name: 'Define context and boundaries',
              description: 'Establish the strategic question, time horizon, and scope of wild card exploration. Define what constitutes "low probability" and "high impact" for your context. Identify key assumptions underlying current strategies that wild cards might violate. Frame the exercise clearly: Are you stress-testing a specific strategy, building general resilience, or expanding strategic imagination? Document current baseline expectations to create contrast.',
              timeRequired: '30-60 minutes',
              deliverable: 'Clear scope statement with defined probability/impact thresholds and strategic context'
            },
            {
              number: 2,
              name: 'Brainstorm wild card events',
              description: 'Use divergent thinking techniques to generate surprising, discontinuous events. Consider multiple domains: technological breakthroughs, natural disasters, political upheavals, economic shocks, social movements, scientific discoveries. Challenge participants to think beyond incremental change to transformative disruptions. Use prompts: "What would make our industry obsolete overnight?" "What event would force us to completely rethink our strategy?" "What surprise would our competitors never see coming?" Aim for 20-40 initial wild cards before filtering.',
              timeRequired: '1-2 hours',
              deliverable: 'Long list of 20-40 potential wild card events across multiple domains'
            },
            {
              number: 3,
              name: 'Select and develop scenarios',
              description: 'Narrow to 3-5 wild cards representing different types of disruption (technological, political, environmental, social, economic). For each selected wild card, develop a rich scenario narrative: triggering event, cascade of immediate consequences, medium-term adaptations, long-term transformations. Describe the event vividly enough to make it feel real. Include both negative and positive wild cards—surprises can be opportunities as well as threats. Ensure scenarios genuinely challenge current assumptions rather than merely extending known trends.',
              timeRequired: '2-3 hours',
              deliverable: '3-5 developed wild card scenarios with detailed narratives and consequence chains'
            },
            {
              number: 4,
              name: 'Assess multi-dimensional impact',
              description: 'For each wild card scenario, systematically evaluate impact across key dimensions: strategic (how would core strategies need to change?), operational (what immediate adaptations are required?), financial (what are cost implications?), reputational (how does this affect stakeholder trust?), regulatory (what policy changes might follow?), cultural (how would organizational culture need to evolve?). Use impact scales (1-10) to quantify severity. Identify which wild cards would be existential threats versus manageable disruptions.',
              timeRequired: '2-3 hours',
              deliverable: 'Multi-dimensional impact assessment matrix for each wild card scenario'
            },
            {
              number: 5,
              name: 'Develop response strategies',
              description: 'Design adaptive response strategies for high-impact wild cards. Create three types of responses: preventive actions (reducing likelihood or building early warning systems), contingency plans (prepared responses if the event occurs), and strategic hedges (investments in flexibility that pay off across multiple scenarios). Focus on no-regret moves—actions valuable regardless of whether the wild card materializes. Identify capability gaps that leave you vulnerable and areas where strategic flexibility needs strengthening.',
              timeRequired: '3-4 hours',
              deliverable: 'Response strategy portfolio with preventive, contingency, and hedging actions for each wild card'
            },
            {
              number: 6,
              name: 'Monitor and update',
              description: 'Establish ongoing scanning for early warning indicators that might signal wild card emergence. Some "wild cards" send subtle precursor signals. Create monitoring protocols to revisit wild card scenarios quarterly or annually. Update probability assessments as context changes—yesterday\'s wild card may become tomorrow\'s emerging issue. Build organizational learning from near-miss events and minor disruptions to strengthen adaptive capacity. Integrate wild card thinking into strategic planning cycles.',
              timeRequired: 'Ongoing quarterly review (1-2 hours per session)',
              deliverable: 'Monitoring dashboard and quarterly review process for wild card landscape updates'
            }
          ],
          totalTime: '10-15 hours for initial comprehensive wild card analysis; ongoing quarterly reviews',
          facilitationTips: 'Create psychological safety for "outrageous" ideas—the most valuable wild cards often sound absurd initially. Use creative prompts and analogies from other industries. Mix optimists and pessimists to generate both positive and negative wild cards. Avoid dismissing ideas as "too unlikely"—probability assessment comes later. Ground wild card narratives in plausible triggering mechanisms to maintain credibility. Balance imagination with strategic relevance. Consider running wild card workshops separately from main scenario planning to avoid contaminating the core scenarios with extreme outliers.'
        },

        workedExample: {
          title: 'COVID-19 Pandemic: Anatomy of a Wild Card Event',
          context: 'In early 2020, the COVID-19 pandemic emerged as a quintessential wild card—a low-probability, high-impact event that fundamentally disrupted global society, economy, and governance within weeks. While epidemiologists had long warned about pandemic risks, the specific timing, scale, and cascading consequences were not anticipated by most organizations and governments.',
          triggeringEvent: 'Novel coronavirus (SARS-CoV-2) identified in Wuhan, China in December 2019, spreading globally by January 2020. WHO declares pandemic March 11, 2020.',
          immediateImpact: 'Within 60 days: Global lockdowns affecting 3+ billion people, stock markets losing 30-40% of value, international travel halting almost completely, healthcare systems overwhelmed, supply chains disrupted, unemployment spiking to levels unseen since Great Depression.',
          secondOrderEffects: 'Acceleration of digital transformation (5-year digital adoption compressed into months), remote work normalization, e-commerce surge, video conferencing becoming primary communication mode, urban exodus, mental health crisis, education disruption affecting 1.6 billion students, geopolitical tensions over vaccines and PPE, massive government stimulus programs.',
          longTermTransformations: 'Permanent hybrid work models, restructured office real estate markets, accelerated automation and AI adoption, renewed focus on supply chain resilience, telemedicine mainstreaming, heightened biosecurity awareness, expanded government intervention in economy, changed social behaviors around health and proximity.',
          strategicLessons: 'Organizations with strong balance sheets and digital capabilities adapted faster. Companies that had previously considered "remote work impossible" proved it was feasible. Scenario planning that included pandemic wild cards (e.g., some financial institutions, Singapore government) enabled faster, more effective responses. The event demonstrated that wild cards can combine elements from different domains—health crisis triggering economic, social, political, and technological disruptions simultaneously.',
          responseVariations: 'Countries with recent pandemic experience (South Korea, Taiwan, Singapore) responded more effectively due to institutional memory and prepared protocols. New Zealand pursued elimination strategy while Sweden tried herd immunity approach—demonstrating that wild card responses involve strategic choices. Organizations with scenario planning practices adapted faster than those relying solely on forecasting and extrapolation.',
          implications: 'Wild cards reveal hidden fragilities in seemingly robust systems (just-in-time supply chains, concentrated manufacturing, office-dependent work). They accelerate latent trends (e.g., digital transformation was underway but pandemic compressed years into months). Building resilience requires diverse capabilities, financial buffers, operational flexibility, and cultural adaptability—not precise prediction of specific wild card events.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Wild_card_(foresight)',
      relatedMethodologies: [
        { id: 'weak-signals', type: 'contrasts', description: 'Weak signals are subtle early indicators requiring interpretation, while wild cards are dramatic discontinuities with immediate transformative impact' },
        { id: 'scenario-planning', type: 'complements', description: 'Wild card scenarios complement plausible scenarios by stress-testing strategies against radical discontinuities and surprises' },
        { id: 'env-scanning', type: 'prerequisite', description: 'Systematic environmental scanning can sometimes detect early signals of potential wild card events before they materialize' },
        { id: 'backcasting', type: 'contrasts', description: 'Wild cards represent disruptive discontinuities while backcasting assumes ability to navigate smoothly toward preferred futures' }
      ],
      caseStudies: [
        {
          title: 'Royal Dutch Shell: Wild Card Scenarios in the 1970s-1980s',
          organization: 'Royal Dutch Shell Strategic Planning Group',
          year: 1973,
          challenge: 'Shell needed to navigate extreme oil market volatility and geopolitical uncertainty following the 1973 oil crisis. Traditional forecasting based on historical trends had failed spectacularly when OPEC instituted the oil embargo, causing oil prices to quadruple overnight. Shell\'s planning group, led by Pierre Wack, recognized that discontinuous events could fundamentally reshape the energy landscape in ways that linear extrapolation could never anticipate.',
          application: 'Shell developed multiple scenarios including wild card events like further Middle East conflicts, major technological breakthroughs in alternative energy, collapse of OPEC, and sudden government policy shifts. Rather than treating these as "most likely" forecasts, planners used wild cards to stress-test capital allocation decisions and strategic commitments. The scenarios challenged assumptions about oil demand growth, refining capacity needs, and geographic diversification. Wild card thinking helped Shell executives recognize that their mental models of "normal" market conditions were actually temporary equilibria that could shift rapidly.',
          outcome: 'When the 1979 Iranian Revolution triggered another oil shock, Shell was one of the only major oil companies that had mentally prepared for such a discontinuity. While competitors were caught off guard, Shell had already considered similar wild cards and developed flexible response strategies. The company adjusted faster to the new reality, gaining competitive advantage. By the mid-1980s, Shell had risen from the eighth-largest to the second-largest oil company globally, with scenario planning and wild card thinking credited as key strategic differentiators. The practice became institutionalized and continues today.',
          insights: 'Wild cards are most valuable not for prediction but for mental preparation—expanding the range of futures leaders consider plausible. Having "pre-lived" a disruption through scenario exercises, decision-makers recognize emerging wild cards faster and respond more decisively. Wild card scenarios create strategic optionality by revealing which commitments are irreversible and which strategies remain robust across multiple futures. The Shell case demonstrates that wild card thinking delivers competitive advantage in volatile environments where conventional forecasting fails.'
        },
        {
          title: 'Singapore: Risk Assessment and Horizon Scanning (RAHS)',
          organization: 'Singapore Government Centre for Strategic Futures',
          year: 2009,
          challenge: 'As a small island nation vulnerable to external shocks, Singapore needed systematic methods to anticipate and prepare for wild card events that could threaten national security, economic stability, or social cohesion. The 2003 SARS outbreak and 2008 global financial crisis had revealed how quickly low-probability events could escalate into national emergencies. The government recognized that traditional planning focused on probable futures left Singapore exposed to catastrophic surprises.',
          application: 'The Centre for Strategic Futures established the Risk Assessment and Horizon Scanning (RAHS) system, which systematically identifies and monitors potential wild cards across seven domains: political, economic, social, technological, environmental, security, and public health. Analysts generate wild card scenarios quarterly, assessing each for probability, impact, and velocity of onset. High-impact wild cards trigger deeper analysis and contingency planning across relevant government agencies. The system explicitly includes "black swan" scenarios deemed highly improbable but potentially catastrophic, such as pandemics, terrorist attacks, cyber infrastructure failures, and regional conflicts.',
          outcome: 'When COVID-19 emerged in January 2020, Singapore activated pandemic response protocols that had been developed through RAHS wild card planning. The government implemented contact tracing, border controls, and healthcare surge capacity within days—faster than almost any other nation. While the pandemic still caused significant disruption, Singapore\'s mortality rate remained among the world\'s lowest, and economic recovery began sooner due to prepared crisis management structures. The RAHS system demonstrated that systematic wild card analysis enables rapid, coordinated responses when low-probability events materialize, reducing both human and economic costs.',
          insights: 'Wild card planning at national scale requires dedicated institutional capacity and cross-agency coordination. Periodic review cycles keep wild card scenarios updated as context changes. The key is not predicting which specific wild card will occur, but building general adaptive capacity and institutional muscle memory for crisis response. Singapore\'s success shows that wild card thinking is particularly valuable for entities facing existential vulnerabilities where single events could have catastrophic consequences.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Create a divergent-thinking environment with visual stimulus materials: news headlines, trend reports, science fiction scenarios, historical wild cards. Use large wall space for mapping wild cards across probability/impact axes. Provide colored sticky notes for different wild card categories (positive/negative, different domains). Set ground rules explicitly: no idea is "too crazy" during brainstorming; probability assessment comes later; suspend judgment initially.',
        groupDynamics: 'Mix optimists and pessimists to generate balanced portfolio of positive and negative wild cards. Include domain experts for credibility alongside outsiders for fresh perspectives. Break into small teams (3-4 people) for initial brainstorming, then share in plenary to cross-fertilize ideas. Use round-robin techniques to ensure all voices contribute. Watch for groupthink or anchoring on familiar scenarios—actively push for genuine surprises. Encourage building on others\' wild cards to develop cascade effects.',
        commonChallenges: [
          'Dismissiveness: Participants reject wild cards as "too unlikely to consider." Remind group that many historical wild cards (9/11, fall of Berlin Wall, COVID-19) were dismissed as implausible before occurring. Frame exercise as building mental flexibility, not prediction.',
          'Negativity bias: Groups generate only catastrophic wild cards, missing transformative opportunities. Use explicit prompts for positive wild cards: technological breakthroughs, social movements, policy innovations, scientific discoveries that could accelerate preferred futures.',
          'Sci-fi syndrome: Wild cards become fantastical rather than plausible discontinuities. Ground each wild card in a triggering mechanism—what specific event or development could initiate the cascade? Distinguish between wild cards (low probability but grounded in current reality) and pure fiction.',
          'Analysis paralysis: Participants get stuck debating probability or feasibility during brainstorming. Defer probability assessment to later step. During ideation, prioritize volume and diversity over accuracy. Quantity yields quality in wild card generation.',
          'Strategic disconnect: Wild cards remain abstract thought experiments without connection to strategic decisions. Always link back to the strategic question: "If this wild card occurred, how would it change our strategy?" Develop concrete response options.'
        ],
        successIndicators: 'Successful wild card sessions generate surprise and discomfort—if everyone feels comfortable, scenarios probably aren\'t disruptive enough. Look for scenarios that challenge core assumptions rather than extend known trends. Good wild cards provoke "we\'d never survive that" reactions, which then motivate resilience-building. Participants should leave with expanded sense of possibility and urgency around building adaptive capacity. Follow-up actions should include specific contingency plans or strategic hedges, not just documentation.'
      },
      successCriteria: {
        processQuality: [
          'Wide divergence in initial brainstorming (20+ distinct wild cards across multiple domains)',
          'Mix of positive and negative wild cards, avoiding pure catastrophism',
          'Each wild card grounded in plausible triggering mechanism, not pure fantasy',
          'Genuine novelty—scenarios that challenge assumptions rather than extending trends',
          'Multi-dimensional impact assessment covering strategic, operational, financial, reputational dimensions',
          'Developed response strategies (preventive, contingency, hedging) not just scenario descriptions',
          'Cross-functional participation bringing diverse perspectives'
        ],
        outcomeQuality: [
          'Strategic conversations reference wild cards when evaluating major decisions ("how would this hold up against our pandemic scenario?")',
          'Concrete resilience investments justified by wild card analysis (financial reserves, operational flexibility, capability development)',
          'Faster organizational response when low-probability events occur due to mental preparation',
          'Quarterly or annual wild card review cycles institutionalized',
          'Wild card scenarios inform risk management and strategic planning processes',
          'Leadership demonstrates increased comfort with uncertainty and ambiguity',
          'Organization develops reputation for adaptive capacity and crisis resilience'
        ]
      },
      comparativeAnalysis: {
        vsWeakSignals: 'Weak signals are subtle early indicators requiring interpretation, while wild cards are dramatic discontinuities with immediate impact. Weak signals may precede wild cards (e.g., isolated disease cases before pandemic) but can also relate to gradual trends. Wild card analysis assumes the event has already occurred and explores consequences; weak signals scanning tries to detect events before emergence. Use weak signals for anticipation, wild cards for resilience-building.',
        vsScenarioPlanning: 'Traditional scenario planning develops 3-4 plausible futures based on critical uncertainties playing out differently. Wild cards represent implausible futures that fall outside the scenario set—they\'re the surprises that invalidate your scenarios. Best practice: develop core plausible scenarios, then add 1-2 wild card scenarios to stress-test the robustness of strategies. Wild cards challenge the scenarios rather than replace them. Scenarios explore "what might happen," wild cards ask "what could we never see coming?"',
        vsRiskManagement: 'Traditional risk management focuses on known risks with estimable probabilities. Wild cards by definition have unknowable probabilities and unprecedented impacts. Risk management uses historical data; wild card thinking assumes the future will differ from the past in surprising ways. Risk management seeks to reduce variance; wild card planning builds capacity to handle novelty. Integrate both: manage known risks systematically while building general resilience for unknown wild cards.',
        whenToUse: 'Use wild card analysis when operating in high-uncertainty environments where single events could be catastrophic (national security, financial services, critical infrastructure). Valuable for stress-testing long-term commitments and irreversible decisions. Particularly important for entities with limited buffers or margins for error. Essential when stakeholders demand evidence of crisis preparedness. Most effective when combined with scenario planning—wild cards test whether your strategies are robust or fragile. Critical in post-crisis periods when recent wild cards have revealed vulnerabilities.'
      },
      media: [
        {
          type: 'image',
          title: 'Wild Card Probability × Impact Matrix',
          url: '/diagrams/wild-card-matrix.svg',
          description: '2×2 framework categorizing wild card events by probability and impact. Four quadrants: True Wild Cards (high impact, low probability - transformative if occur), Emerging Crises (high impact, high probability - urgent priority), Weak Signals (low impact, low probability - monitor for escalation), Routine Changes (low impact, high probability - standard planning). Includes examples and strategic approaches for each quadrant.'
        },
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
      ],
      metadata: {
        difficulty: 'beginner',
        timeRequired: '2-4 hours for initial wild card brainstorming',
        groupSize: 'diverse groups (6-12 people) for creative divergence',
        bestFor: ['Stress-testing plans', 'Building strategic resilience', 'Challenging assumptions', 'Crisis preparedness', 'Expanding imagination'],
        sectors: ['Risk management', 'Business continuity', 'Defense/security', 'Financial services', 'Public health'],
        commonPitfalls: ['Focusing only on negative wild cards', 'Dismissing ideas as too improbable', 'Not preparing response strategies', 'Confusing wild cards with science fiction', 'Analysis paralysis from too many possibilities']
      }
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
        overview: 'Morphological Analysis, developed by Swiss astrophysicist Fritz Zwicky in the 1940s, systematically explores all possible combinations of parameters defining a problem space to discover novel solutions. Zwicky created the method at Caltech while studying supernovae and stellar systems, recognizing that creative solutions often lie in unexplored combinations of known elements. The insight: complex problems can be decomposed into key parameters, each with multiple possible values, creating a multi-dimensional solution space (morphological box). Systematic combination reveals configurations never considered. Zwicky applied this to jet propulsion, generating over 40 patents from morphological exploration. The methodology prevents cognitive fixation on obvious solutions by forcing examination of entire possibility space. Modern applications span product design, technology forecasting, policy analysis, and futures scenarios. Process: (1) Precisely define problem, (2) Identify all critical parameters/dimensions, (3) List possible values for each, (4) Create morphological box mapping parameter × values, (5) Systematically combine values across parameters, (6) Evaluate feasibility and desirability of configurations. For 5 parameters with 4 values each: 1,024 possible combinations. This combinatorial explosion is both power and challenge—exhaustive exploration versus analytical paralysis. Advanced morphological analysis adds consistency checking (which combinations are internally coherent?) and cross-impact analysis (how do parameter values interact?). The value: discovering non-obvious solutions residing in unexplored configuration spaces, comprehensive option generation ensuring no viable alternative overlooked, and structured exploration of complex multi-variable problems.',
        process: [
          'Define problem precisely',
          'Identify all parameters/dimensions',
          'List possible values for each',
          'Create morphological box (matrix)',
          'Explore combinations systematically',
          'Evaluate promising configurations'
        ],
        creator: 'Fritz Zwicky (1948)',
        application: 'Generate comprehensive set of alternatives, discover non-obvious solutions',

        processGuide: {
          title: 'How to Conduct Morphological Analysis',
          steps: [
            {
              number: 1,
              name: 'Define problem and scope precisely',
              description: 'Frame the problem or design challenge with precision. Vague problems yield vague morphological boxes. Example: Instead of "improve transportation," specify "design urban mobility system for 2040 addressing congestion, emissions, equity." Define boundaries: geographic scope, time horizon, constraints, success criteria. This precision guides parameter selection and value identification.',
              timeRequired: '1-2 days with stakeholders',
              deliverable: 'Clear problem statement with defined scope, constraints, and success criteria'
            },
            {
              number: 2,
              name: 'Identify critical parameters',
              description: 'Decompose problem into 5-10 key parameters (dimensions) that fundamentally define solution space. Too few parameters miss important variation; too many create unmanageable combinations. Parameters should be independent (not logically dependent on each other), exhaustive (collectively cover problem), and critical (significantly affect outcomes). For mobility system: propulsion type, ownership model, control system, infrastructure type, payment structure. Validate with experts—are these the right dimensions?',
              timeRequired: '2-3 days',
              deliverable: 'List of 5-10 critical parameters with definitions explaining why each matters'
            },
            {
              number: 3,
              name: 'Identify possible values for each parameter',
              description: 'For each parameter, list all plausible values it could take. Be comprehensive without being absurd. For propulsion: electric, hydrogen, hybrid, biofuel, fossil fuel. For ownership: private, shared, public, peer-to-peer. Values should be mutually exclusive and collectively exhaustive. Aim for 3-6 values per parameter—fewer misses possibilities, more creates combinatorial explosion. Total combinations = V1 × V2 × V3... If 8 parameters with 5 values each = 390,625 combinations (too many). Balance comprehensiveness with manageability.',
              timeRequired: '1-2 weeks with expert input',
              deliverable: 'Morphological box (matrix) with parameters as rows, values as columns'
            },
            {
              number: 4,
              name: 'Generate and explore combinations',
              description: 'Systematically combine values across parameters to create configurations. With moderate box (6 parameters, 4 values each = 4,096 combinations), cannot evaluate all. Strategies: (1) Random sampling to discover unexpected combinations. (2) Systematic traversal of subspaces. (3) Constraint-based filtering: eliminate infeasible combinations early. (4) Expert-guided exploration: domain experts navigate toward promising regions. Document interesting configurations for deeper analysis. Look for surprising combinations that challenge assumptions.',
              timeRequired: '1-2 weeks',
              deliverable: 'Set of 10-30 distinct configurations spanning solution space diversity'
            },
            {
              number: 5,
              name: 'Assess feasibility and consistency',
              description: 'Evaluate configurations for internal consistency and external feasibility. Consistency: do parameter values logically cohere? (E.g., peer-to-peer ownership + centralized control = incoherent). Use cross-impact logic: some value combinations reinforce, others contradict. Feasibility: technical (can it be built?), economic (viable cost structure?), social (acceptable to users?), regulatory (legal framework supports?), environmental (sustainable?). Rate configurations on multiple criteria. Eliminate fundamentally infeasible; prioritize desirable and plausible.',
              timeRequired: '1-2 weeks with expert panels',
              deliverable: 'Feasibility assessment matrix with configurations rated across multiple criteria'
            },
            {
              number: 6,
              name: 'Develop scenarios or solutions from configurations',
              description: 'Translate promising configurations into detailed scenarios or solution proposals. Selected configurations become seed for narrative scenarios (for foresight) or design specifications (for innovation). Flesh out: How would this configuration work in practice? What enablers required? What barriers to overcome? What stakeholders favor/oppose? For futures work: develop 3-5 scenarios based on contrasting configurations spanning possibility space. For design: prototype 2-3 solutions from different morphological regions. Morphological analysis generates raw material; this step develops it.',
              timeRequired: '2-4 weeks',
              deliverable: 'Detailed scenarios or solution proposals based on morphological configurations'
            }
          ],
          totalTime: '8-12 weeks for comprehensive morphological analysis',
          facilitationTips: 'Start with smaller morphological boxes (4-5 parameters) before tackling complex problems. Use visual tools: spreadsheets, morphological software, or physical matrices with cards. Involve domain experts for parameter and value identification—non-experts miss critical dimensions. Computational tools help with large boxes (automated constraint checking, algorithmic exploration). Balance exhaustiveness with pragmatism—goal isn\'t evaluating every combination but ensuring important possibilities aren\'t overlooked. Iterate: first pass identifies parameters, second pass refines values, third pass explores combinations.'
        },

        workedExample: {
          title: 'Future of Work Morphological Analysis (2025-2040)',
          context: 'Explore comprehensive solution space for organizing work as automation, remote technology, and gig economy reshape employment.',
          problemDefinition: 'Design work organization models for knowledge economy balancing productivity, worker welfare, innovation, and social cohesion in context of advancing AI and distributed work technology.',
          parameters: 'Identified 6 critical parameters: (1) Employment Relationship: full-time employee, contractor, freelance, platform worker, cooperative member, basic income recipient. (2) Work Location: centralized office, distributed remote, hybrid, nomadic, neighborhood hub. (3) Skill Development: employer-provided, self-directed, guild-based, public education, AI-tutored. (4) Income Structure: salary, hourly, project-based, equity-based, universal basic income. (5) Social Safety Net: employer-provided, individual, union-based, government universal. (6) Career Pattern: single career, portfolio career, sabbatical-punctuated, project-to-project.',
          morphologicalBox: 'Created 6×6 matrix (6 parameters, ~5 values each = 15,625 possible combinations). Obviously cannot evaluate all. Used constraint-based filtering: eliminated internally inconsistent (e.g., full-time employee + project-to-project income). Expert panels identified promising regions to explore.',
          exploredConfigurations: 'Generated 20 diverse configurations: (C1) Traditional updated: FT employee + hybrid location + employer skill development + salary + employer benefits + single career. (C2) Freelance economy: Contractor + distributed + self-directed + project income + individual safety net + portfolio career. (C3) Platform capitalism: Platform worker + distributed + AI-tutored + platform income + minimal safety net + project-to-project. (C4) Cooperative model: Cooperative member + neighborhood hub + guild skill + equity income + cooperative safety net + sabbatical career. (C5) UBI society: Basic income + nomadic + self-directed + UBI + government universal + exploratory career. And 15 more spanning solution space.',
          feasibilityAnalysis: 'Assessed each on: Economic viability, technological feasibility, social acceptability, regulatory alignment, worker welfare. Traditional model: economically proven but increasingly misaligned with technology. Platform model: technologically enabled but raises welfare concerns. Cooperative model: high welfare but scaling challenges. UBI model: welfare potential but economic questions. Cross-impact revealed: remote technology enables distributed work but requires new management models; AI automation creates pressure for UBI but implementation politically contested.',
          scenarioDevelopment: 'Selected 4 contrasting configurations representing different futures: "Corporate Evolution" (C1 variants), "Freelance Frontier" (C2/C3), "Cooperative Commons" (C4), "UBI Abundance" (C5). Developed detailed scenarios showing how each configuration addresses unemployment, inequality, innovation, meaning. Morphological analysis ensured scenarios covered possibility space systematically rather than only exploring familiar futures.',
          insights: 'Morphological revealed combinations never considered: guild-based skill development + government safety net + sabbatical careers = intriguing hybrid. Showed that assumed necessary combinations (e.g., full-time employment + employer benefits) are just one possibility among many. Systematic exploration prevented anchoring on either pure traditional or pure gig extremes, revealing middle grounds and novel syntheses.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Morphological_analysis_(problem-solving)',
      relatedMethodologies: [
        { id: 'scenario-planning', type: 'complements', description: 'Morphological analysis systematically explores all parameter combinations while scenario planning focuses on narratively coherent alternative futures' },
        { id: 'cross-impact', type: 'complements', description: 'Morphological analysis generates comprehensive configuration spaces; cross-impact analysis evaluates how variables in those configurations interact' },
        { id: 'delphi', type: 'complements', description: 'Morphological analysis creates exhaustive option sets; Delphi method builds expert consensus on which combinations are most plausible' },
        { id: 'env-scanning', type: 'builds-on', description: 'Environmental scanning across STEEP domains identifies the key parameters and dimensions to include in morphological analysis' }
      ],
      caseStudies: [
        {
          title: 'Fritz Zwicky: Jet Propulsion Morphological Analysis',
          organization: 'Aerojet Corporation / Caltech',
          year: 1943,
          challenge: 'During WWII, need for advanced jet propulsion. Traditional engineering focused on incremental improvements to existing designs. Zwicky wanted systematic method to explore entire solution space.',
          application: 'Identified key parameters of jet propulsion systems: energy source (chemical, nuclear, solar), propellant type (liquid, solid, gas, plasma), combustion method, nozzle configuration, cooling system. Created morphological box combining these parameters systematically. Explored configurations including combinations never previously considered. Generated over 500 conceptual designs spanning possibility space from conventional to radically novel.',
          outcome: 'Led to over 40 patents across diverse jet propulsion concepts. Several configurations became foundation for modern rocket engines. Demonstrated morphological power: systematic exploration found solutions human intuition alone would miss. Methodology spread from aerospace to other engineering domains, then to policy and futures studies. Zwicky\'s success established morphological analysis as rigorous innovation method.',
          insights: 'Morphological analysis most valuable when solution space is large and unexplored. Systematic decomposition into parameters prevents fixation on familiar configurations. Combinatorial approach reveals novel syntheses at intersection of known elements. The method requires discipline—resisting premature convergence on "obvious" solutions.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Morphological workshops require visual space for large matrices—use wall space with cards or digital tools projectable for group viewing. Provide parameter identification templates. Bring domain experts who understand problem deeply but can think beyond current solutions. Plan 2-3 day intensive workshop for initial morphological box construction, then additional time for configuration exploration. Supply computational tools for large boxes.',
        groupDynamics: 'Mix expertise: domain experts (understand parameters), creative thinkers (explore combinations), systems thinkers (assess coherence). Work iteratively: individuals propose parameters/values, group refines collectively. Use structured brainstorming for comprehensive value identification. When exploring configurations, assign small teams to different morphological regions to parallelize exploration. Reconvene to share discoveries.',
        commonChallenges: [
          'Too many parameters creating unmanageable combinations. Solution: Start with 5-6 most critical parameters. Can add others in subsequent iterations.',
          'Parameters not truly independent. Solution: Test for logical dependencies. If parameter A constrains parameter B, they may be facets of single underlying dimension.',
          'Overwhelming number of configurations to evaluate. Solution: Use constraint-based filtering, random sampling, or expert-guided exploration rather than exhaustive evaluation.',
          'Focusing on feasibility too early, eliminating creative options. Solution: Separate exploration (be comprehensive) from evaluation (be critical). Explore first, filter later.'
        ],
        successIndicators: 'Novel configurations discovered that weren\'t in initial problem framing. Systematic coverage of solution space rather than jumping to favorites. Diverse configurations representing different morphological regions. Configuration evaluations revealing trade-offs clearly. Participants report expanded sense of possibility. Final scenarios or solutions demonstrably more comprehensive than traditional approaches would yield.'
      },
      successCriteria: {
        processQuality: [
          'Well-defined problem with clear scope',
          '5-10 critical parameters identified with expert validation',
          'Comprehensive value sets for each parameter',
          'Systematic exploration of configurations, not random',
          'Feasibility assessment using consistent criteria',
          'Internal consistency checking for configurations',
          'Visual representation enabling comprehension'
        ],
        outcomeQuality: [
          'Novel solutions or scenarios discovered through morphological exploration',
          'Comprehensive coverage of possibility space',
          'Non-obvious combinations identified and evaluated',
          'Clear understanding of trade-offs between configurations',
          'Scenarios or solutions defensible as thorough exploration',
          'Stakeholders convinced no major option overlooked',
          'Morphological insights inform subsequent design or planning'
        ]
      },
      comparativeAnalysis: {
        vsBrainstorming: 'Brainstorming generates ideas through free association; morphological analysis systematically explores parameter combinations. Brainstorming relies on creative leaps; morphological on structured decomposition. Brainstorming may miss regions of solution space; morphological ensures comprehensive coverage. Combine: use brainstorming to identify parameters, morphological to explore combinations.',
        vsScenarioPlanning: 'Scenarios tell coherent narratives about alternative futures; morphological analysis generates comprehensive configuration sets. Scenarios prioritize plausibility and internal logic; morphological prioritizes exhaustiveness. Often integrated: use morphological to generate scenario seeds ensuring diverse possibility space coverage, then develop selected configurations into full narratives.',
        vsCrossImpact: 'Morphological generates configurations; cross-impact evaluates how parameters interact. Morphological assumes parameters can be combined; cross-impact assesses whether combinations are internally consistent. Use together: morphological creates possibility space, cross-impact filters for coherent configurations.',
        whenToUse: 'Essential for: complex design problems with many parameters, futures exploration requiring comprehensive option sets, innovation seeking novel combinations, policy analysis needing systematic alternative comparison. Most effective when: clear parameters can be identified, expert knowledge available to define values, computational tools can handle combinatorial complexity, time available for thorough exploration. Less useful when: problem is simple with few parameters (can explore manually), parameters cannot be cleanly separated, solution space is continuous rather than discrete.'
      },
      media: [
        {
          type: 'image',
          title: 'Morphological Box Example: Future of Work',
          url: '/diagrams/morphological-box.svg',
          description: 'Zwicky morphological analysis box showing systematic exploration of Future of Work (2025-2040). Six parameters: Employment Type (5 options), Work Location (4 options), Skill Development (4 options), Income Model (4 options), Social Safety Net (4 options), Career Pattern (4 options) = 5,120 total possible combinations. Red pathway shows example scenario: "Gig/Platform Work + Fully Remote + Continuous Learning + Project Income + Government Universal + Parallel Careers". Demonstrates how morphological method ensures comprehensive coverage of solution space.'
        },
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Morphological_box.png',
          description: 'Visual representation of a morphological box showing how parameters (rows) with multiple values (columns) can be systematically combined to generate comprehensive solution spaces. This multi-dimensional matrix approach helps explore all possible configurations, revealing novel combinations that might otherwise be missed.'
        },
        {
          type: 'article',
          title: 'Morphological Analysis',
          url: 'https://en.wikipedia.org/wiki/Morphological_analysis_(problem-solving)',
          source: 'Wikipedia',
          description: 'Complete guide to morphological analysis methodology covering Fritz Zwicky\'s systematic approach to exploring solution spaces. Explains how to define parameters, identify values, construct morphological boxes, evaluate feasible combinations, and apply the method to complex problems from technology forecasting to policy design.'
        },
        {
          type: 'image',
          title: 'Fritz Zwicky Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/ETH-BIB-Zwicky%2C_Fritz_%281898-1974%29-Portrait_Schinz_B_0099_%28cropped%29.jpg',
          description: 'Swiss astronomer and astrophysicist (1898-1974), creator of morphological analysis and pioneer of dark matter theory'
        }
      ],
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '1-3 days for comprehensive morphological mapping',
        groupSize: 'small expert teams (4-8 people) with domain knowledge',
        bestFor: ['Systematic exploration of solution spaces', 'Technology design and innovation', 'Complex problem decomposition', 'Identifying novel combinations', 'Comprehensive option generation'],
        sectors: ['Product development', 'Technology forecasting', 'Engineering design', 'Policy options analysis', 'Research and development'],
        commonPitfalls: ['Too many parameters creating unmanageable combinations', 'Inadequate parameter definition', 'Not evaluating feasibility of combinations', 'Overwhelming stakeholders with complexity', 'Focusing on technical feasibility over desirability']
      }
    },

    // Additional Toolbox Methods under CREATING
    {
      id: 'delphi',
      label: 'Delphi Method',
      parent: 'creating',
      description: 'Structured expert consensus forecasting process using iterative anonymous surveys with controlled feedback to converge on probabilistic predictions',
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
        overview: 'The Delphi Method, developed at RAND Corporation in the 1950s by Olaf Helmer and Norman Dalkey, is a structured forecasting technique that builds expert consensus through iterative rounds of anonymous surveys with controlled feedback. Designed to overcome the pitfalls of traditional expert panels (groupthink, dominance by loud voices, pressure to conform), Delphi allows experts to revise their judgments after seeing aggregated group responses without knowing individual opinions. The process typically involves 2-4 rounds: experts provide initial forecasts, receive statistical summary of group responses, reflect on divergence from their own views, and revise estimates. The method is particularly valuable for long-term forecasting (10-30 years) where historical data is limited, for complex socio-technical systems with many interacting factors, and when expert judgment must substitute for empirical evidence. Delphi has been widely used for technology forecasting, policy planning, and strategic foresight.',
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
      relatedMethodologies: [
        { id: 'scenario-planning', type: 'complements', description: 'Delphi builds expert consensus on most likely futures while scenario planning explores multiple divergent possibilities' },
        { id: 'morphological', type: 'complements', description: 'Morphological analysis generates comprehensive option spaces; Delphi brings expert judgment to evaluate feasibility and likelihood' },
        { id: 'stakeholder-analysis', type: 'prerequisite', description: 'Stakeholder mapping identifies which experts and knowledge holders to include in Delphi panels' },
        { id: 'visioning', type: 'complements', description: 'Delphi method can build structured expert consensus on preferred futures and pathways to achieve collective visions' }
      ],
      caseStudies: [
        {
          title: 'RAND Long-Range Forecasting Study',
          organization: 'RAND Corporation for U.S. Air Force',
          year: 1964,
          challenge: 'U.S. military needed technological forecasts for strategic planning during Cold War. Traditional expert panels produced groupthink and dominant voices overshadowed others',
          application: 'Olaf Helmer and Norman Dalkey conducted first major Delphi study with 82 experts forecasting breakthroughs in six areas: scientific, population control, automation, space, war prevention, weapon systems. Three rounds of anonymous questionnaires with controlled feedback',
          outcome: 'Produced consensus forecasts for inventions like automatic language translators (predicted 1970s, actual 1990s), feasibility of lunar bases, and directed energy weapons. Demonstrated Delphi could harness distributed expertise while avoiding groupthink. Method declassified and adopted globally',
          keyInsight: 'Anonymous iteration allows experts to revise views without losing face, producing better forecasts than face-to-face debate'
        },
        {
          title: 'European Energy Policy Pathways 2050',
          organization: 'European Commission Joint Research Centre',
          year: 2011,
          challenge: 'EU needed expert consensus on feasible pathways to 80-95% emissions reduction by 2050. Deep uncertainty about technology trajectories, costs, and social acceptance',
          application: 'Three-round Delphi with 127 energy experts from academia, industry, government. Assessed likelihood, timing, barriers for 40+ energy technologies (renewables, storage, efficiency, CCS). Combined quantitative probability estimates with qualitative reasoning',
          outcome: 'Built consensus that 2050 targets achievable but require immediate action. Offshore wind and solar PV more feasible than experts initially thought. Nuclear and CCS faced greater barriers than assumed. Informed EU\'s 2050 Energy Roadmap policy',
          keyInsight: 'Structured iteration moved experts toward consensus on controversial topics (nuclear, CCS) by forcing examination of assumptions and evidence'
        }
      ],
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Delphi_Method.png',
          description: 'Visual flowchart showing the iterative process of Delphi method rounds: initial expert questionnaire, anonymous feedback distribution, expert revision based on group responses, further refinement, and final consensus. The diagram illustrates how multiple rounds reduce variance and build expert agreement while avoiding groupthink.'
        },
        {
          type: 'article',
          title: 'Delphi Method',
          url: 'https://en.wikipedia.org/wiki/Delphi_method',
          source: 'Wikipedia',
          description: 'Comprehensive guide to Delphi technique covering its history at RAND Corporation, methodological principles (anonymity, iteration, controlled feedback, statistical aggregation), variations (policy Delphi, real-time Delphi), and applications in technology forecasting, policy analysis, and strategic planning.'
        },
        {
          type: 'image',
          title: 'RAND Corporation Logo',
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Rand_Corporation_logo.svg',
          description: 'RAND Corporation - birthplace of Delphi Method in the 1950s for Cold War defense forecasting'
        },
        {
          type: 'image',
          title: 'Delphi Method: Four Core Principles',
          url: '/diagrams/delphi-process.svg',
          description: 'Comprehensive visualization of Delphi method iterative process flow (RAND, 1950s): Round 1 (initial independent forecasts), Round 2 (controlled feedback with statistics), Round 3+ (iteration until convergence), and final consensus report. Includes detailed explanation of four core principles: Anonymity (prevents groupthink), Iteration (enables revision through reflection), Controlled Feedback (statistical summary only), and Statistical Aggregation (median/IQR, not averages). Shows feedback loop for non-converged results.',
          source: 'AK Consulting'
        }
      ],
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '3-6 weeks for full multi-round Delphi process',
        groupSize: 'expert panels (10-50 experts) with facilitator team',
        bestFor: ['Building expert consensus', 'Technology forecasting', 'Long-range predictions', 'Policy development', 'Distributed expertise aggregation'],
        sectors: ['Technology assessment', 'Healthcare planning', 'Defense strategy', 'Standards development', 'Academic research'],
        commonPitfalls: ['Expert panel not diverse enough', 'Too many or too few rounds', 'Poor questionnaire design', 'Forcing consensus prematurely', 'Not maintaining expert engagement across rounds']
      }
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
        overview: 'Cross-Impact Analysis, developed by Theodore Gordon and Olaf Helmer at RAND Corporation in 1966, systematically examines how events, trends, and developments influence each other rather than evolving independently. Traditional forecasting treated variables in isolation—population grows at X rate, technology advances at Y rate—missing that these interact: population growth affects technology development which affects population carrying capacity. Cross-impact methodology creates matrices where each row represents a driver asking "if this happens, how does it affect everything else?" The insight: futures emerge from complex interactions, not independent trajectories. A matrix maps pairwise relationships: Event A increases/decreases probability of Event B by how much? Reinforcing loops amplify change (e.g., AI capability → automation → R&D acceleration → more AI capability). Dampening loops create stability (e.g., energy demand → prices rise → efficiency investment → reduced demand). The methodology evolved from simple impact matrices to computational models (SMIC, MICMAC) running Monte Carlo simulations to trace cascading effects through networks. Modern applications range from technology assessment to scenario planning to systems mapping. The value: revealing non-obvious relationships, identifying tipping points where feedback loops flip systems into new states, and stress-testing scenario coherence by ensuring component assumptions don\'t contradict each other.',
        process: [
          'Identify key events/trends',
          'Create impact matrix',
          'Assess pairwise interactions',
          'Calculate cumulative effects',
          'Identify reinforcing/dampening loops'
        ],
        application: 'Understand systemic effects and feedback loops between futures',

        processGuide: {
          title: 'How to Conduct Cross-Impact Analysis',
          steps: [
            {
              number: 1,
              name: 'Define scope and select drivers',
              description: 'Identify 8-20 key events, trends, or drivers relevant to your strategic question. More than 20 creates unmanageable matrices; fewer than 8 misses important interactions. Include mix of types: technological developments, policy changes, market shifts, social trends, environmental changes. Each driver should be specific enough to assess impact but broad enough to matter strategically. Frame as concrete statements: "AI achieves human-level reasoning by 2035" not vague "AI improves." Document current baseline probability/status for each driver.',
              timeRequired: '1-2 days with stakeholder input',
              deliverable: 'List of 8-20 drivers with clear definitions and baseline assessments'
            },
            {
              number: 2,
              name: 'Construct cross-impact matrix',
              description: 'Create matrix with drivers as both rows and columns. Each cell asks: "If row driver occurs/strengthens, how does it affect column driver probability/magnitude?" Use consistent rating scale: strong increase (++), moderate increase (+), no effect (0), moderate decrease (-), strong decrease (--). Or quantitative: percentage change in probability. Leave diagonal blank (driver doesn\'t impact itself). This creates N×N matrix requiring N×(N-1) assessments—for 15 drivers, that\'s 210 pairwise judgments, so prepare accordingly.',
              timeRequired: '2-4 hours for matrix setup',
              deliverable: 'Empty cross-impact matrix ready for expert assessment'
            },
            {
              number: 3,
              name: 'Assess pairwise impacts with experts',
              description: 'Convene expert workshop to populate matrix. For each row, ask: "If this driver occurs, how does it affect each other driver?" Use structured elicitation: present driver pair, allow individual reflection, share initial judgments, discuss rationale, converge on consensus or note disagreements. Document logic behind assessments—why does A strengthen B? Through what mechanism? Some cells are obvious (renewable energy costs drop → fossil fuel demand drops), others require systems thinking (remote work rises → urban density drops → infrastructure investment patterns shift → commercial real estate values change). Don\'t rush—quality of impact assessments determines analysis value.',
              timeRequired: '1-2 full days in expert workshop',
              deliverable: 'Completed cross-impact matrix with documented rationale for key relationships'
            },
            {
              number: 4,
              name: 'Identify feedback loops and cascades',
              description: 'Analyze completed matrix for systemic patterns. Reinforcing loops (virtuous/vicious cycles): A strengthens B, B strengthens C, C strengthens A—change accelerates. Dampening loops (self-correction): A strengthens B, B weakens A—system stabilizes. Cascade chains: single event triggers sequence affecting multiple drivers. Use network visualization to map strong relationships. Calculate influence scores: which drivers affect many others (high out-degree)? Which are affected by many (high in-degree)? Drivers affecting many but affected by few are system levers; those affected by many are outcome indicators.',
              timeRequired: '1-2 days for analysis',
              deliverable: 'Network diagram showing major feedback loops, cascade chains, and influence rankings'
            },
            {
              number: 5,
              name: 'Run scenarios through matrix',
              description: 'Use matrix to assess scenario coherence and trace implications. For each scenario, identify which drivers are assumed to occur/strengthen. Follow cross-impacts through matrix: if we assume X and Y happen, matrix shows they would trigger Z, dampen Q, and amplify R. Do scenario assumptions create internally consistent futures or contradictions? Adjust scenarios based on cross-impact analysis or adjust impact assessments if scenarios reveal previously unrecognized relationships. Matrix can also generate scenarios algorithmically: start with initial event, follow probabilistic impacts through network using Monte Carlo simulation.',
              timeRequired: '2-3 days',
              deliverable: 'Scenario coherence assessment and refined scenarios based on cross-impact insights'
            },
            {
              number: 6,
              name: 'Extract strategic insights',
              description: 'Translate cross-impact findings into strategic implications. Leverage points: which drivers, if influenced, cascade through network creating widespread change? Vulnerabilities: which undesirable outcomes result from reinforcing loops difficult to break? Tipping points: what thresholds shift system from one state to another? Hedging strategies: given uncertainties in impact strengths, which actions remain robust across scenarios? Monitor leading indicators: which early-moving drivers signal broader cascades? Update matrix periodically as new information revises impact assessments.',
              timeRequired: '1-2 days',
              deliverable: 'Strategic recommendations identifying leverage points, vulnerabilities, tipping points, and monitoring indicators'
            }
          ],
          totalTime: '2-3 weeks for comprehensive cross-impact analysis',
          facilitationTips: 'Start with smaller matrices (10-12 drivers) before attempting complex analyses. Use software tools (dedicated cross-impact software or spreadsheets) to manage matrices and calculate network metrics. Mix quantitative scoring (for computational analysis) with qualitative rationale (for understanding). Bring systems thinkers who can trace indirect effects. Allow time for discussion—richest insights emerge from debate about contested impact assessments. Update matrices as context changes—cross-impact relationships aren\'t static.'
        },

        workedExample: {
          title: 'Energy Transition Cross-Impact Analysis (2025-2040)',
          context: 'Analyze interactions between 10 key drivers of energy transition to understand systemic dynamics and identify strategic leverage points.',
          drivers: 'Selected drivers: (1) Renewable energy costs continue declining, (2) Battery storage reaches cost-parity, (3) Electric vehicle adoption accelerates, (4) Carbon pricing implemented globally, (5) Fossil fuel demand peaks then declines, (6) Grid infrastructure investment increases, (7) Distributed generation (rooftop solar) proliferates, (8) Hydrogen economy emerges, (9) Energy efficiency gains accelerate, (10) Climate impacts intensify driving urgency.',
          matrixConstruction: 'Created 10×10 matrix (90 impact assessments). Example assessments: (1→2) Renewable costs drop strongly increases battery storage deployment (batteries needed for intermittency). (3→5) EV adoption moderately decreases oil demand (transportation is 60% of oil use). (7→6) Distributed generation moderately decreases need for grid expansion but increases need for grid flexibility—mixed effect coded as slight increase in different type of grid investment. (10→4) Climate impacts strongly increase political will for carbon pricing.',
          feedbackLoops: 'Identified key reinforcing loop: Renewable costs drop (1) → EV adoption (3) → Oil demand down (5) → Fossil fuel revenues decline → Less capital for fossil exploration → Supply tightens → Prices rise → EVs more attractive → Loop accelerates. Dampening loop: Energy efficiency (9) → Demand down → Energy prices down → Less incentive for efficiency → Loop slows. Cascade: Battery breakthrough (2) → EVs viable (3) + Renewables firmed (1) + Distributed storage (7) → Grid transformation (6) → Multiple downstream effects.',
          influence: 'Network analysis revealed highest-influence drivers (affecting many others): Renewable costs (1), Carbon pricing (4), Climate impacts (10). These are system levers—policy or technology shifts here cascade widely. Highest-influenced drivers (affected by many): Fossil demand (5), Grid infrastructure (6)—these are outcome indicators, not levers. Surprise finding: Hydrogen economy (8) had weak cross-impacts both ways—relatively isolated subsystem, suggesting it may develop independently or not at all rather than integrating with main transition dynamics.',
          scenarioTesting: 'Tested "Rapid Transition" scenario assuming aggressive carbon pricing (4), continued cost declines (1,2), and climate pressure (10). Cross-impact matrix showed this would strongly reinforce through multiple feedback loops, creating internally coherent accelerating transition. But matrix also revealed potential bottleneck: grid infrastructure investment (6) lags because regulatory frameworks delay while technology races ahead—suggesting infrastructure policy is critical path.',
          strategicInsights: 'Leverage points: Accelerate battery storage breakthrough (2) and carbon pricing (4)—these trigger strongest cascades. Vulnerability: Grid infrastructure lag could bottleneck transition despite technology readiness. Tipping point: If EV adoption crosses ~40% market share, reinforcing loop may become self-sustaining even without continued policy support. Monitoring: Track battery costs and policy signals as leading indicators of cascade acceleration.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Cross-impact_analysis',
      relatedMethodologies: [
        { id: 'morphological', type: 'complements', description: 'Morphological analysis generates configuration spaces; cross-impact evaluates how components in those configurations interact and influence each other' },
        { id: 'scenario-planning', type: 'complements', description: 'Cross-impact analysis reveals how drivers interact and cascade, helping assess scenario plausibility and internal coherence' },
        { id: 'emerging-issues', type: 'builds-on', description: 'Cross-impact matrices show how emerging issues reinforce, dampen, or trigger cascades with other developments' },
        { id: 'delphi', type: 'complements', description: 'Cross-impact provides systematic structure for interaction analysis; Delphi brings distributed expert judgment to assess impact strengths' }
      ],
      caseStudies: [
        {
          title: 'RAND Corporation: Original Cross-Impact Development for Technology Forecasting',
          organization: 'RAND Corporation',
          year: 1966,
          challenge: 'Traditional technology forecasting assumed independent development trajectories. But technological breakthroughs don\'t occur in isolation—space program advances affected materials science which affected computing which affected telecommunications. RAND needed methodology to capture these interdependencies.',
          application: 'Theodore Gordon and Olaf Helmer developed cross-impact matrices for technology forecasting. Selected 30+ potential technological events (achievements in energy, materials, computing, biology, space). Created 30×30 matrix assessing how each event affected probability and timing of others. Example: "If desalination becomes economically viable, how does that affect probability of large-scale agricultural development in arid regions?" Found unexpected cascade: computer advances enabled modeling which accelerated multiple other fields.',
          outcome: 'Cross-impact revealed non-obvious dependencies that single-trend forecasting missed. When certain technologies developed faster than expected, matrix helped trace implications through connected systems. Methodology spread from RAND to government agencies, corporations, futures institutes. Became standard tool for technology assessment and futures studies. Demonstrated that systems thinking was essential for long-term forecasting.',
          insights: 'Key learning: second-order and third-order effects often matter more than first-order. Cross-impact forces systematic consideration of indirect relationships. Computational limits of 1960s constrained matrix size, but even 15×15 matrices revealed valuable insights modern tools can handle larger, more complex analyses.'
        },
        {
          title: 'Climate Change Cross-Impact Analysis: IPCC Scenario Development',
          organization: 'Intergovernmental Panel on Climate Change (IPCC)',
          year: 2000,
          challenge: 'Climate scenarios depend on interacting drivers: population, economic growth, technology, policy, land use, energy systems. These don\'t evolve independently—economic growth affects emissions which affects climate which affects agriculture which affects economics. IPCC needed internally consistent scenarios.',
          application: 'Used cross-impact analysis to develop SRES (Special Report on Emissions Scenarios) and later SSP (Shared Socioeconomic Pathways) scenarios. Mapped relationships between demographic trends, economic development, technological change, policy choices, and emissions. Example impacts: High population → more energy demand → higher emissions (unless offset by technology/policy). Economic growth → technology investment → lower emissions intensity (if policy framework supports). Identified reinforcing loops and potential tipping points.',
          outcome: 'Cross-impact ensured scenario internal coherence—couldn\'t assume high emissions with aggressive climate policy. Revealed critical leverage points: technology development and international cooperation had outsized effects due to cascading impacts. Scenarios became foundation for climate modeling and policy development globally. Demonstrated cross-impact value for multi-decade, multi-variable complex systems.',
          insights: 'Cross-impact essential when scenario time horizon extends decades and feedback loops dominate. Qualitative cross-impact (expert judgment on relationships) combined with quantitative modeling (numerical simulation of impacts). Regular matrix updates necessary as understanding of climate-economy-technology relationships evolves.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Cross-impact workshops require sustained focus—plan full-day or two-day sessions. Provide large wall space or digital tool for matrix visualization. Pre-populate driver list based on preparatory research so workshop focuses on impact assessment, not driver identification. Bring systems thinkers and domain experts who understand causal mechanisms. Set expectation: matrix construction is intellectually demanding—maintain energy with breaks and varied activities.',
        groupDynamics: 'Ideal team: 6-12 experts with diverse domain knowledge. Too few misses perspectives; too many becomes unwieldy. Assign facilitator to manage process and scribe to document rationale. Rotate through matrix systematically row-by-row to maintain focus. Encourage debate on contested impacts—disagreement reveals uncertainty worth noting. Use voting or Delphi-style iterations to resolve divergent views. Celebrate insights when non-obvious relationships emerge.',
        commonChallenges: [
          'Matrix too large: More than 20 drivers creates 400+ assessments—overwhelming. Solution: Start with 10-15 most critical drivers. Can expand later if needed.',
          'Superficial assessments: Rushing through cells without thinking through mechanisms. Solution: Require articulation of causal logic for significant impacts. Document examples/evidence.',
          'Missing indirect effects: Capturing A→B but missing A→C→B pathway. Solution: After matrix complete, trace multi-hop paths. Use network visualization to reveal indirect connections.',
          'Static analysis: One-time matrix becomes outdated. Solution: Build periodic review into process. Update as conditions change or new information emerges.'
        ],
        successIndicators: 'Rich discussion of causal mechanisms during assessment. Multiple non-obvious relationships identified. Clear feedback loops and leverage points emerge. Scenarios tested against matrix reveal refinements needed. Strategic decisions informed by cross-impact insights. Participants report changed understanding of system dynamics.'
      },
      successCriteria: {
        processQuality: [
          'Appropriate scope: 8-20 well-defined drivers',
          'Systematic impact assessment with documented rationale',
          'Expert participation from relevant domains',
          'Identification of major feedback loops (reinforcing and dampening)',
          'Network analysis calculating influence scores',
          'Scenario coherence testing against matrix',
          'Regular matrix updates as context evolves'
        ],
        outcomeQuality: [
          'Non-obvious relationships and indirect effects revealed',
          'System leverage points identified for strategic action',
          'Scenario internal consistency improved',
          'Vulnerability to cascading risks understood',
          'Tipping points and critical thresholds identified',
          'Strategic decisions informed by systemic understanding',
          'Monitoring focused on leading indicators in causal chains'
        ]
      },
      comparativeAnalysis: {
        vsSystemDynamics: 'Both analyze interactions but different approaches. System dynamics builds mathematical models simulating feedback loops over time with quantitative equations. Cross-impact uses expert judgment to assess pairwise relationships with qualitative or simple quantitative scores. System dynamics more rigorous but requires more data and modeling expertise. Cross-impact faster and works with expert judgment when data sparse. Often combined: cross-impact for initial mapping, system dynamics for detailed simulation.',
        vsScenarioPlanning: 'Cross-impact complements scenario planning. Scenarios describe alternative futures narratively; cross-impact analyzes how drivers in those scenarios interact. Use cross-impact to test scenario coherence: do assumed drivers logically lead to described outcomes? Scenarios can also emerge from cross-impact matrices through algorithmic exploration of driver combinations.',
        vsMorphological: 'Morphological analysis systematically combines parameters; cross-impact analyzes how combinations interact. Morphological generates configuration space; cross-impact evaluates which configurations are internally consistent and stable. Integrate: use morphological to identify possibilities, cross-impact to assess plausibility.',
        whenToUse: 'Essential for: complex systems with many interacting variables, long time horizons where feedback loops matter, scenario development requiring internal consistency, technology assessment with interdependencies, strategic planning needing systems perspective. Less useful for: simple cause-effect relationships, short-term tactical decisions, situations where variables truly independent. Most effective when: expert knowledge available, 8-20 key drivers identified, time available for thoughtful assessment, follow-up actions possible based on findings.'
      },
      media: [
        {
          type: 'image',
          title: 'Cross-Impact Analysis Matrix Example',
          url: '/diagrams/cross-impact-matrix.svg',
          description: 'Detailed example showing how drivers influence each other in cross-impact analysis (Gordon & Helmer, 1966). The 8×8 matrix maps impacts FROM drivers (rows) ON other drivers (columns), using color-coded impact strength: High (red), Medium (orange), Low (blue), Minimal (gray). Includes worked example with AI, Climate, Demographics, Energy, Trade, Tech, Urban, and Health drivers, demonstrating how to identify feedback loops, leverage points, and cascading effects.'
        },
        {
          type: 'video',
          title: 'Cross-Impact Analysis Tutorial',
          url: 'https://www.youtube.com/watch?v=7jZ3CUmFKPM',
          description: 'How to conduct cross-impact analysis',
          year: 2015
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
      ],
      metadata: {
        difficulty: 'advanced',
        timeRequired: '2-4 days for matrix construction and analysis',
        groupSize: 'expert workshops (6-12 people) with systems thinking skills',
        bestFor: ['Understanding systemic interactions', 'Identifying feedback loops', 'Assessing scenario coherence', 'Evaluating cascading effects', 'Complex systems analysis'],
        sectors: ['Systems planning', 'Technology assessment', 'Policy analysis', 'Strategic foresight', 'Complex project management'],
        commonPitfalls: ['Matrix becomes too large to manage', 'Superficial impact assessments', 'Missing indirect/second-order effects', 'Not updating matrix as conditions change', 'Over-reliance on quantitative scoring']
      }
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
        overview: 'Visioning, formalized by Elise Boulding and others in the 1980s-90s, is a participatory process for creating shared, compelling images of desired futures that guide strategic action toward transformation. Unlike forecasting (which extrapolates trends) or scenario planning (which explores multiple possibilities), visioning asks "what do we want?" and uses imagination to articulate aspirational futures that motivate change. The process typically engages diverse stakeholders in facilitated workshops using techniques like "imaging the future" (mentally stepping into a preferred future and describing it in present tense), visual mapping, and narrative storytelling. Effective visions are positive and aspirational (not problem-focused), concrete and vivid (not abstract), inclusive (reflecting diverse values), and actionable (guiding strategy). Visioning is particularly powerful for communities, organizations, and movements seeking transformative change rather than incremental improvement, creating emotional connection and shared ownership of preferred futures.',
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
      relatedMethodologies: [
        { id: 'backcasting', type: 'builds-on', description: 'Visioning articulates the desired future state; backcasting then works backward to identify pathways and milestones to achieve it' },
        { id: 'stakeholder-analysis', type: 'prerequisite', description: 'Understanding diverse stakeholder perspectives ensures visioning processes are inclusive and incorporate marginalized voices' },
        { id: 'discourse-analysis', type: 'prerequisite', description: 'Deconstructing dominant narratives creates space for participatory visioning that challenges existing power structures' },
        { id: 'aspirational-futures', type: 'complements', description: 'Both methods focus on preferred futures, with visioning creating concrete images and aspirational futures exploring ideals and values' }
      ],
      caseStudies: [
        {
          title: 'Chattanooga Vision 2000',
          organization: 'Chattanooga, Tennessee',
          year: 1984,
          challenge: 'Chattanooga once branded "dirtiest city in America" (1969). Rust belt decline, environmental degradation, social division. Needed transformative vision to reverse decades of decline',
          application: 'Community-wide visioning process engaged 1,700 citizens in facilitated workshops. Diverse groups (business, labor, minorities, youth) imagined preferred future. Co-created 40 goals across environment, economy, education, culture. Revisited vision every 5 years (Vision 2000, Vision 2010, Vision 2020)',
          outcome: 'Transformed into sustainable city model: cleaned Tennessee River, created downtown aquarium/waterfront, became outdoor recreation hub, attracted tech companies (Amazon, Volkswagen). Poverty remains challenge but demonstrated participatory visioning can drive systemic change',
          keyInsight: 'Inclusive visioning creates ownership across community, maintaining momentum across decades and political changes'
        },
        {
          title: 'New Zealand 2050: Aotearoa as a Sustainable Nation',
          organization: 'New Zealand Government & NGOs',
          year: 2009,
          challenge: 'NZ needed long-term sustainability vision beyond electoral cycles. Climate change, biodiversity loss, inequality growing. How to engage whole nation in preferred future?',
          application: 'Government facilitated nationwide visioning using Elise Boulding\'s "imaging workshops" method. 50+ workshops with 2,000+ participants. Asked Kiwis to step "through the hedge" into 2050 and describe what they saw. Themes analyzed to create shared vision',
          outcome: 'Produced "Vision New Zealand 2050" emphasizing clean energy, biodiversity restoration, bicultural partnership (Māori-Pākehā), wellbeing economy. Informed Zero Carbon Act (2019) and Wellbeing Budget framework. Showed national-scale participatory visioning possible',
          keyInsight: 'Imagery-based visioning accesses deeper aspirations than analytical planning, creating emotional connection to preferred future'
        }
      ],
      media: [
        {
          type: 'video',
          title: 'Participatory Visioning Techniques',
          url: 'https://www.youtube.com/watch?v=uL3UbDyGq9A',
          description: 'How to facilitate visioning workshops',
          year: 2016
        },
        {
          type: 'image',
          title: 'Components of Effective Visions',
          url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Vision_Framework.svg',
          description: 'Framework showing the four essential components of effective vision statements: Aspirational (inspiring and motivating stakeholders), Concrete (specific and tangible outcomes), Inclusive (incorporates diverse perspectives and voices), and Actionable (suggests clear pathways forward). This model helps ensure visions are both compelling and implementable, balancing inspiration with practical guidance for strategic planning.'
        },
        {
          type: 'article',
          title: 'Visioning in Strategic Foresight',
          url: 'https://en.wikipedia.org/wiki/Vision_statement',
          source: 'Wikipedia',
          description: 'Guide to creating effective visions of preferred futures that inspire action and guide decision-making. Covers characteristics of compelling visions (aspirational, concrete, inclusive, actionable), participatory visioning techniques, and methods for building shared purpose across diverse stakeholders.'
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
      ],
      metadata: {
        difficulty: 'beginner',
        timeRequired: '1-2 days for initial visioning workshop',
        groupSize: 'participatory workshops (15-50 people) with diverse stakeholders',
        bestFor: ['Creating shared aspirations', 'Community engagement', 'Strategic direction setting', 'Organizational alignment', 'Motivating collective action'],
        sectors: ['Community planning', 'Organizational development', 'Sustainability initiatives', 'Education planning', 'Regional development'],
        commonPitfalls: ['Vision too vague or aspirational without concrete elements', 'Not inclusive of marginalized voices', 'No pathway from vision to action', 'Vision disconnected from current reality', 'Facilitator imposing their preferred vision']
      }
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
        overview: 'Backcasting, pioneered by John Robinson in the 1980s for energy and sustainability planning, is a strategic planning method that works backward from a defined desirable future to identify pathways and actions needed to reach it. Unlike forecasting (which projects current trends forward) or scenario planning (which explores multiple possibilities), backcasting begins with normative goal-setting: "What future do we want?" and then asks "How do we get there?" The process defines a specific future state (typically 15-30 years out), describes it in detail, and then traces logical steps backward to the present, identifying necessary changes, decision points, and interventions along the way. Backcasting is especially valuable when: current trends are undesirable and must be disrupted, the problem is complex and requires systemic change, the goal is ambitious and transformative, or dominant interests resist change. It has been widely applied to climate strategy, sustainable cities, and technology transitions.',
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
      caseStudies: [
        {
          title: 'Sweden\'s Fossil Fuel-Free Vision 2030',
          organization: 'Swedish Government',
          year: 2006,
          challenge: 'Sweden committed to independence from fossil fuels by 2030—unprecedented goal requiring systemic transformation. Forecasting from current trends showed goal impossible',
          application: 'Government used backcasting to work backward from fossil-free 2030 vision. Identified pathway milestones: renewable energy expansion, transportation electrification, biofuel development, carbon pricing, building efficiency. Engaged stakeholders to co-create implementation plans',
          outcome: 'By 2020: 54% renewable energy (EU target: 20%), per capita emissions down 29% since 1990 while GDP grew 58%. Carbon tax reached $140/ton. Demonstrated backcasting enables "impossible" goals. Though 2030 target missed, progress exceeded all forecasts',
          keyInsight: 'When goal requires breaking trends, backcasting reveals pathways forecasting cannot see. Ambition drives innovation'
        },
        {
          title: 'IKEA: People & Planet Positive Strategy',
          organization: 'IKEA Group',
          year: 2012,
          challenge: 'IKEA needed sustainability strategy aligned with 1.5°C climate target. Business-as-usual growth incompatible with planetary boundaries. How to grow while reducing absolute environmental impact?',
          application: 'Used Natural Step backcasting framework. Defined 2030 vision: climate positive, circular economy, fair and equal. Worked backward to identify milestones across products, energy, materials, waste. Set science-based targets',
          outcome: 'Committed to 100% renewable energy (achieved 2020), circular products (50% renewable/recycled materials by 2030), climate positive across value chain by 2030. Proving sustainability drives competitiveness. Annual sustainability report tracks progress against milestones',
          keyInsight: 'Corporate backcasting aligns profit with purpose by starting from sustainability principles rather than incremental improvements'
        }
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Backcasting_vs_Forecasting.png',
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
          description: 'Complete guide to backcasting methodology, explaining how it differs from forecasting by starting with a desired future and working backwards to identify necessary steps. Covers applications in sustainability planning, policy design, and transformative change where conventional forecasting is inadequate.'
        }
      ],
      metadata: {
        difficulty: 'intermediate',
        timeRequired: '3-5 days for pathway development and milestone mapping',
        groupSize: 'strategic planning teams (6-15 people) with implementation authority',
        bestFor: ['Sustainability transitions', 'Transformational change', 'Goal-oriented planning', 'Breaking trend-dependencies', 'Long-term target achievement'],
        sectors: ['Sustainability planning', 'Climate action', 'Energy transitions', 'Urban planning', 'Corporate transformation'],
        commonPitfalls: ['Vision not concrete enough to backcast from', 'Underestimating barriers to change', 'Not identifying critical path dependencies', 'Missing near-term actionable steps', 'Assuming linear pathway when disruptions likely']
      }
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
        overview: 'Strategic Issue Management is Igor Ansoff\'s framework for building organizational agility through real-time detection and response to strategic discontinuities. Published in 1980, it emerged from Ansoff\'s recognition that traditional strategic planning—optimized for efficiency and stability—leaves organizations vulnerable to surprise. The framework addresses the fundamental tension between operational efficiency (which requires focus, routine, and optimization) and strategic flexibility (which requires scanning, adaptation, and responsiveness). Ansoff argued that successful organizations need both an "operating management system" for day-to-day execution and a separate "strategic issue management system" for identifying and responding to discontinuities before they become crises. The methodology operationalizes his earlier work on weak signals, creating systematic processes for surveillance (monitoring environmental changes), assessment (evaluating urgency and impact), response (mobilizing appropriate action), and learning (adapting the system based on experience). Strategic Issue Management transforms foresight from an episodic planning activity into continuous organizational capability, creating what Ansoff called "preparedness" rather than prediction. It has evolved into modern practices like strategic intelligence, horizon scanning units, and corporate innovation labs.',
        components: [
          'Surveillance - Monitor for weak signals',
          'Assessment - Evaluate impact and urgency',
          'Response - Activate appropriate action',
          'Learning - Adapt system based on experience'
        ],
        creator: 'Igor Ansoff (1980)',
        philosophy: 'Organizations need both efficiency (operating system) and flexibility (strategic issue management)',
        application: 'Create dashboard for tracking and responding to strategic issues',

        processGuide: {
          title: 'How to Implement Strategic Issue Management System',
          steps: [
            {
              number: 1,
              name: 'Design surveillance architecture',
              description: 'Establish systematic scanning infrastructure to detect potential strategic issues early. Map your environmental domains using STEEP framework (Social, Technological, Economic, Environmental, Political). Identify information sources for each domain: industry publications, research journals, regulatory filings, patent databases, social media trends, customer feedback, supplier insights. Assign scanning responsibilities across the organization—everyone becomes a sensor. Create intake mechanisms for employees to flag potential strategic issues. Establish regular rhythm: daily news monitoring, weekly trend reviews, monthly deep dives. Use both broad scanning (discovering unexpected issues) and focused monitoring (tracking known concerns). Build relationships with external networks: academia, startups, industry associations, government agencies.',
              timeRequired: '2-4 weeks for initial design',
              deliverable: 'Surveillance architecture document with assigned scanning domains, information sources, and intake mechanisms'
            },
            {
              number: 2,
              name: 'Create assessment framework',
              description: 'Develop criteria for evaluating detected signals to prioritize response. Build impact/urgency matrix: High impact + high urgency = immediate action; high impact + low urgency = strategic planning; low impact + high urgency = tactical response; low impact + low urgency = monitor. Define what constitutes "strategic issue" for your context—typically threats or opportunities that could affect core business model, competitive position, or strategic objectives. Create scoring rubrics: impact dimensions (financial, reputational, operational, regulatory) and urgency factors (speed of development, window of opportunity, irreversibility). Establish thresholds: what score triggers executive review? When do you convene cross-functional teams? Build assessment templates so evaluation is rapid and consistent.',
              timeRequired: '1-2 weeks',
              deliverable: 'Impact/urgency assessment framework with scoring criteria, templates, and decision thresholds'
            },
            {
              number: 3,
              name: 'Establish response protocols',
              description: 'Design organizational mechanisms for rapid strategic response once issues are identified. Create tiered response structure: monitoring (continue tracking), analysis (commission deeper study), task force (cross-functional team investigates options), strategic project (dedicated resources to address), strategic initiative (major organizational commitment). Define decision rights: Who can escalate issues? Who authorizes resource allocation? What level of evidence triggers action? Pre-allocate "strategic flexibility budget"—resources available for emerging issues without lengthy approval processes. Design fast-cycle strategy development: 90-day sprints to prototype responses rather than annual planning cycles. Establish pilot and experiment protocols to test responses rapidly before full commitment. Build strategic options portfolio: which responses are reversible experiments vs. irreversible commitments?',
              timeRequired: '2-3 weeks',
              deliverable: 'Response protocol playbook with escalation paths, decision rights, resource allocation mechanisms, and action templates'
            },
            {
              number: 4,
              name: 'Build organizational network',
              description: 'Create human infrastructure to activate the strategic issue management system. Identify strategic issue managers at different organizational levels: corporate (horizon scanning team), business unit (strategic planners), functional (domain experts). Establish issue champions who shepherd specific issues through the system. Build cross-functional rapid response teams that can be convened quickly. Create communication channels: regular strategic issue briefings to leadership, dashboards for tracking issue lifecycle, collaboration platforms for distributed sensing and sensemaking. Develop culture of strategic alertness—reward people for surfacing weak signals, not just solving known problems. Provide training: How to recognize strategic issues? How to use assessment framework? What is expected response speed? Build psychological safety so people flag concerns without fear of being labeled alarmist.',
              timeRequired: '4-6 weeks',
              deliverable: 'Organizational network map with roles defined, communication channels established, and training program launched'
            },
            {
              number: 5,
              name: 'Implement learning loops',
              description: 'Design feedback mechanisms to continuously improve the strategic issue management system. Conduct post-action reviews: When we responded to a strategic issue, what worked? What should we have done differently? When we missed an issue, why did surveillance fail to detect it? Track false positives (issues flagged but proved unimportant) and false negatives (issues that surprised us). Refine assessment criteria based on experience—which impact factors proved most predictive? Which signals provided earliest warning? Update surveillance domains as environment shifts. Share lessons across business units—what strategic issues in one geography might emerge in others? Create annual system audit: Is the strategic issue management system still fit for purpose? Are we detecting issues earlier than competitors? Is our response speed improving? Measure leading indicators: number of strategic issues detected, average time from detection to response, percentage of issues caught early vs. late.',
              timeRequired: 'Quarterly reviews (half-day sessions)',
              deliverable: 'Learning dashboard tracking system performance and quarterly improvement recommendations'
            },
            {
              number: 6,
              name: 'Maintain balance with operations',
              description: 'Sustain the strategic issue management system alongside operational efficiency requirements. Protect strategic flexibility resources from operational pressures—don\'t let short-term efficiency drives eliminate scanning capacity or response budgets. Institutionalize dual operating systems: efficiency-focused operating management for known business, flexibility-focused strategic issue management for discontinuities. Create explicit trade-off discussions: When does strategic flexibility justify operational inefficiency? Establish governance that protects both: operations councils for efficiency, strategy councils for flexibility. Rotate people between operational and strategic roles to build hybrid thinking. Celebrate both operational excellence and strategic agility. Communicate purpose: strategic issue management is not a luxury but insurance against strategic surprise—and unlike most insurance, it also identifies opportunities, not just mitigates threats.',
              timeRequired: 'Ongoing executive stewardship',
              deliverable: 'Governance framework balancing operational efficiency with strategic flexibility, with protected resources and clear decision forums'
            }
          ],
          totalTime: '2-4 months for initial system implementation; ongoing operation becomes embedded organizational capability',
          facilitationTips: 'Start with executive sponsorship—strategic issue management requires leadership commitment and resource allocation. Begin with limited scope: 1-2 business units or specific strategic priorities. Demonstrate value through early wins: identify an emerging issue, respond effectively, share success story. Build credibility before scaling enterprise-wide. Avoid bureaucracy: keep processes simple and fast, not elaborate and slow. Integrate with existing systems rather than creating parallel structures. Connect to strategic planning cycles so issues inform strategy development. Use technology thoughtfully: dashboards and collaboration tools enable the system but don\'t replace human judgment and networks. Maintain urgency: strategic issue management atrophies if not actively used—ensure regular cadence of review and response.'
        },

        workedExample: {
          title: 'Intel\'s Strategic Turning Point: Exit from Memory Chips (1984-1985)',
          context: 'In the early 1980s, Intel faced a strategic crisis. The company had pioneered DRAM (dynamic random-access memory) chips and built its identity as a memory company. However, Japanese competitors had entered the market with superior manufacturing and lower costs, systematically gaining market share. By 1984-1985, Intel was losing money on memory despite being the category inventor. The company\'s strategic issue management system—led by CEO Andy Grove and strategic thinker Robert Burgelman—detected signals that memory was becoming a commodity business while microprocessors offered proprietary advantage.',
          surveillance: 'Multiple weak signals emerged: (1) Japanese competitors consistently undercutting Intel on price, (2) Intel\'s memory margins compressing quarter after quarter, (3) internal microprocessor division (serving IBM PC) showing stronger profitability and strategic potential, (4) technical trends favoring complex logic over commodity memory, (5) competitive intelligence indicating Japanese plans for massive memory capacity expansion. Andy Grove systematically collected these signals from sales teams, manufacturing, and strategy analysis.',
          assessment: 'Grove posed a famous thought experiment to Intel chairman Gordon Moore: "If we got kicked out and the board brought in a new CEO, what do you think he would do?" Moore answered immediately: "He would get us out of memories." Impact assessment: Exiting memory would be emotionally wrenching (abandoning company\'s founding identity) but strategically essential (avoiding continued losses and refocusing on microprocessors where Intel had sustainable advantage). Urgency was high: continuing losses were eroding financial strength needed to invest in microprocessor R&D. The assessment concluded this was an existential strategic issue requiring decisive action.',
          response: 'Intel made the painful decision to exit the memory business and concentrate entirely on microprocessors. This required: (1) shutting down memory fabrication plants and redeploying manufacturing to microprocessors, (2) redirecting R&D investment from memory to logic chips, (3) managing workforce transitions and layoffs, (4) repositioning brand identity from "memory company" to "microprocessor company," (5) doubling down on relationship with IBM and other PC makers, (6) accepting short-term pain for long-term strategic health. The response was implemented over 12-18 months.',
          outcome: 'Intel\'s exit from memory transformed the company. By 1992, Intel had become the world\'s largest semiconductor company, dominating the microprocessor market with x86 architecture powering the PC revolution. The "Intel Inside" branding campaign solidified the repositioning. Market value grew exponentially. What appeared to be a crisis—being forced out of founding business—became a strategic turning point enabling decades of dominance. Grove later wrote "Only the Paranoid Survive" describing how strategic issue management saved Intel.',
          learning: 'Intel institutionalized the lesson, creating what Burgelman called "strategic recognition capacity"—the ability to detect when existing strategy is failing and new strategy is needed. The company continued using strategic issue management to navigate subsequent transitions: from PC microprocessors to mobile, from Intel architecture to system-on-chip designs. Grove\'s "paranoia" became cultural norm: constant scanning for strategic discontinuities rather than assuming current strategy will last forever. The memory exit demonstrated that strategic issue management\'s value isn\'t just avoiding threats but recognizing when core business model needs transformation.',
          methodologyConnection: 'Intel\'s case illustrates all four components of Ansoff\'s framework: Surveillance (detecting competitive and technical signals), Assessment (evaluating strategic significance through Grove\'s thought experiment), Response (executing difficult strategic shift), Learning (building ongoing strategic recognition capacity). It shows how strategic issue management enables fundamental strategic reorientation, not just incremental adjustment.'
        }
      },
      wikipedia: 'https://en.wikipedia.org/wiki/Strategic_management',
      relatedMethodologies: [
        { id: 'weak-signals', type: 'prerequisite', description: 'Strategic issue management\'s surveillance component systematically monitors for weak signals that indicate emerging issues' },
        { id: 'emerging-issues', type: 'builds-on', description: 'As emerging issues mature along the S-curve, strategic issue management provides real-time response framework for action' },
        { id: 'env-scanning', type: 'prerequisite', description: 'Environmental scanning across STEEP domains feeds the surveillance system with data about potential strategic issues' },
        { id: 'scenario-planning', type: 'complements', description: 'Scenario planning prepares for multiple futures; strategic issue management responds to signals in real-time as they emerge' }
      ],
      caseStudies: [
        {
          title: '3M\'s Strategic Action Council and Innovation Time',
          organization: '3M Corporation',
          year: 1948,
          challenge: '3M needed to maintain innovation leadership while growing into a large, complex organization. The company recognized that bureaucracy and operational efficiency could stifle the entrepreneurial spirit that had created breakthrough products like Scotch Tape and masking tape. CEO William McKnight wanted to institutionalize what we now call strategic issue management—the ability to detect emerging opportunities and threats while maintaining operational excellence in established businesses.',
          application: '3M created multiple structural mechanisms for strategic issue management: (1) "15% Time" policy allowing technical employees to spend 15% of work time on self-directed projects unrelated to current assignments, creating distributed surveillance for emerging opportunities. (2) Technical Forums bringing researchers together quarterly to share weak signals from different domains, cross-pollinating ideas. (3) New Product Vitality Index (NVPI) measuring percentage of revenue from products introduced in past 5 years, forcing continuous attention to emerging markets. (4) Genesis Grants providing seed funding ($85,000) for high-risk projects exploring strategic issues, no management approval needed. (5) Strategic Action Council of senior executives meeting monthly to review strategic issues flagged by business units, with authority to allocate resources rapidly. The system balanced operational efficiency in core businesses with strategic flexibility for emerging opportunities.',
          outcome: 'Over seven decades, 3M\'s strategic issue management system produced continuous stream of breakthrough innovations: Post-it Notes emerged from "15% Time" project, Thinsulate insulation from Technical Forum discussion, Scotchgard from accidental discovery recognized as strategic opportunity. The NVPI metric sustained innovation pressure: even during efficiency drives, 3M maintained 30% revenue from products less than 5 years old. The Strategic Action Council enabled rapid resource shifts: when optical films emerged as strategic opportunity in 1990s, council allocated major investment, creating billion-dollar business. The system demonstrated how strategic issue management can be embedded in organizational DNA rather than episodic practice. 3M consistently ranks among world\'s most innovative companies.',
          insights: 'Effective strategic issue management requires both structure (councils, budgets, metrics) and culture (psychological safety to flag issues, rewards for strategic alertness, tolerance for experimentation). The "15% Time" policy transformed every employee into strategic sensor. The Genesis Grant system enabled rapid experimentation before issues were fully proven. The NVPI metric prevented complacency in successful businesses. Most critically, senior leadership commitment—Strategic Action Council met monthly, not annually—signaled that strategic issue management was core responsibility, not peripheral activity. The case shows strategic issue management works best when distributed throughout organization rather than centralized in planning department.'
        },
        {
          title: 'Singapore Government\'s Strategic Futures Network',
          organization: 'Singapore Centre for Strategic Futures (CSF)',
          year: 2009,
          challenge: 'Singapore, as a small island nation highly dependent on global trade and external stability, faces existential vulnerability to strategic surprises. The 2008 global financial crisis, 2003 SARS outbreak, and recurring geopolitical tensions demonstrated that events beyond Singapore\'s control could rapidly threaten national security, economic prosperity, and social cohesion. The government needed systematic capacity to detect emerging strategic issues early and coordinate whole-of-government responses—strategic issue management at national scale.',
          application: 'Prime Minister\'s Office established Centre for Strategic Futures (CSF) as dedicated strategic issue management unit. The system includes: (1) Risk Assessment and Horizon Scanning (RAHS) network spanning all government ministries, with officers trained to detect weak signals in their domains. (2) Quarterly Strategic Issue Reports consolidating signals into assessed issues using impact/urgency framework. (3) Scenario Planning Unit developing 10-15 year scenarios to contextualize emerging issues. (4) Strategic Challenges Group convening experts from academia, industry, and government to assess critical issues. (5) Whole-of-Government exercise simulating responses to strategic surprises (pandemics, regional conflicts, economic shocks). (6) Integration with budget planning so strategic flexibility resources are protected. The system transforms strategic issue management from ad hoc crisis response to continuous organizational capability across entire government.',
          outcome: 'When COVID-19 emerged in January 2020, Singapore\'s strategic issue management system enabled rapid, coordinated response. CSF had included pandemic scenarios in 2018-2019 planning; when first cases appeared, government activated prepared protocols within days. Multi-ministry task force convened immediately (Assessment), contact tracing and healthcare surge deployed rapidly (Response), and post-crisis reviews refined the system (Learning). Singapore achieved among the world\'s lowest COVID mortality rates while maintaining economic and social stability. The RAHS network has since flagged strategic issues in supply chain resilience, climate adaptation, technological unemployment, and geopolitical realignment—enabling proactive rather than reactive governance. The system demonstrates strategic issue management at societal scale.',
          insights: 'National-level strategic issue management requires: (1) dedicated institutional capacity (CSF with permanent staff and mandate), (2) distributed sensing network (RAHS officers in every ministry), (3) integration with decision-making (direct line to Cabinet and Prime Minister), (4) protected resources (budget for strategic flexibility separate from operational efficiency), (5) learning culture (systematic post-action reviews and scenario updates). Small, vulnerable entities—whether nations or organizations—benefit most from strategic issue management because single strategic surprise can be catastrophic. The Singapore case shows that investment in foresight infrastructure pays for itself when crises hit. It also demonstrates that strategic issue management identifies opportunities (e.g., positioning for digital economy transition) as often as threats.'
        }
      ],
      facilitationGuide: {
        workshopSetup: 'Strategic issue management implementation requires executive workshops, cross-functional design sessions, and organizational training. Begin with leadership alignment: half-day executive session framing the strategic issue management imperative, reviewing Ansoff\'s efficiency/flexibility balance, examining case studies (Intel, 3M). Use impact/probability matrices to map current strategic landscape—where are we blind? Follow with design workshops involving strategic planning, competitive intelligence, and business unit leaders to architect surveillance, assessment, response, and learning components. Pilot with one business unit or strategic priority before scaling.',
        groupDynamics: 'Build cross-functional strategic issue management teams combining strategic thinkers (who see patterns), domain experts (who understand technical details), and operational leaders (who can mobilize resources). Rotate membership periodically to prevent groupthink. Create psychological safety: reward people for flagging potential issues even if they prove false alarms. Establish norms: strategic issue discussions focus on "what might be emerging?" not "here\'s what I already know." Separate divergent phases (surfacing issues) from convergent phases (prioritizing response). Designate issue champions who shepherd specific issues through the system.',
        commonChallenges: [
          'Operational pressures crowding out strategic attention: Short-term fires dominate calendars, strategic issue management gets deferred. Solution: Protect dedicated time for strategic issue reviews (e.g., monthly half-day sessions), create "strategic flexibility budget" that can\'t be raided for operational needs, measure and reward strategic alertness alongside operational metrics.',
          'Alert fatigue from too many issues: System flags so many potential issues that none get serious attention. Solution: Ruthless prioritization using impact/urgency framework, limit active strategic issues to manageable number (5-7 at most), archive lower-priority issues for quarterly review rather than continuous monitoring.',
          'Analysis paralysis preventing action: Teams endlessly debate whether signal is real issue, missing window for response. Solution: Embrace experimentation mindset—run small reversible pilots to explore issues rather than requiring certainty before action. Use 70% rule: act when 70% confident, don\'t wait for 95% certainty.',
          'Bureaucracy making system slow: Elaborate assessment processes and approval hierarchies defeat purpose of real-time response. Solution: Keep assessment frameworks simple (one-page templates), delegate decision authority to strategic issue teams, use "escalation by exception" rather than "approval by default," measure response speed and push for continuous improvement.',
          'Surveillance without action: System becomes monitoring exercise generating reports no one acts on. Solution: Every strategic issue review must result in decision—even if decision is "continue monitoring." Assign accountability: who owns this issue? What is expected action by when? Track issue lifecycle: detection → assessment → response → outcome. Close the loop.'
        ],
        successIndicators: 'Effective strategic issue management shows up in: Leadership conversations regularly referencing strategic issues ("our surveillance detected X"), faster response to industry disruptions compared to competitors, fewer strategic surprises ("we saw that coming and prepared"), strategic flexibility resources being actively deployed (not just protected but unused), cross-functional collaboration on emerging issues, employees at all levels flagging potential strategic issues, post-action reviews showing detection lead time increasing, strategic issue management vocabulary becoming organizational language ("what\'s the urgency/impact assessment?"). The ultimate indicator: when major strategic issue emerges, organization responds with speed and effectiveness that competitors can\'t match.'
      },
      successCriteria: {
        processQuality: [
          'Systematic surveillance covering all strategic domains (technology, competitors, regulations, customers, geopolitics)',
          'Clear assessment framework consistently applied (impact/urgency matrix with defined criteria)',
          'Rapid response protocols with pre-allocated resources and decision rights',
          'Distributed sensing network engaging employees across organization as strategic sensors',
          'Regular review cadence (monthly or quarterly) that actually happens, not deferred',
          'Post-action reviews after both successful responses and missed issues',
          'Balance maintained between operational efficiency and strategic flexibility'
        ],
        outcomeQuality: [
          'Detection lead time increasing: issues identified earlier in development curve',
          'Response speed improving: time from detection to action decreasing',
          'Strategic surprises decreasing: fewer "we never saw that coming" moments',
          'Opportunity capture increasing: strategic issues include positive opportunities not just threats',
          'Resource effectiveness: strategic flexibility investments yielding returns',
          'Competitive advantage: organization navigates discontinuities faster than rivals',
          'Organizational learning: strategic recognition capacity becoming cultural capability',
          'Leadership confidence: executives comfortable with uncertainty due to response readiness'
        ]
      },
      comparativeAnalysis: {
        vsWeakSignals: 'Weak signals detection is input to strategic issue management. Weak signals scanning finds early indicators; strategic issue management builds complete system for assessing, responding to, and learning from those signals. Weak signals is reconnaissance; strategic issue management is the entire command-and-control infrastructure. Use weak signals scanning as surveillance component within broader strategic issue management framework.',
        vsScenarioPlanning: 'Scenario planning explores plausible futures (3-10 year horizon) to inform long-term strategy. Strategic issue management responds to emerging issues in real-time (months to 2 years) requiring immediate action. Scenarios prepare mental models; strategic issue management mobilizes resources. Integrate both: use scenarios to contextualize strategic issues (how does this issue relate to our scenarios?) and use strategic issues to update scenarios (this emerging issue suggests our scenarios need revision). Scenarios are periodic; strategic issue management is continuous.',
        vsEnvironmentalScanning: 'Environmental scanning is broader, less focused surveillance across STEEP domains (Social, Technological, Economic, Environmental, Political). Strategic issue management includes focused surveillance but adds assessment (is this strategically significant?), response (what should we do?), and learning (how do we improve?). Environmental scanning feeds data to strategic issue management system. Many organizations scan continuously but lack strategic issue management discipline to convert signals into action—they\'re data-rich but action-poor. Strategic issue management closes the gap.',
        vsRiskManagement: 'Risk management focuses on known, quantifiable risks using probability distributions and mitigation plans. Strategic issue management addresses emerging issues with unknowable probabilities and unprecedented characteristics—Ansoff\'s "strategic surprises." Risk management assumes the future resembles the past; strategic issue management assumes discontinuities. Integrate both: manage known risks systematically while building strategic issue management capacity for unknowable surprises. Risk management reduces variance; strategic issue management builds adaptability.',
        whenToUse: 'Essential for organizations in high-velocity, high-uncertainty environments where strategic surprises are frequent (technology, financial services, healthcare, energy). Critical when operational efficiency pressures might blind organization to strategic shifts. Valuable for first movers and innovation leaders who must detect emerging opportunities early. Important for entities facing existential vulnerabilities where single strategic surprise could be catastrophic (startups, small nations, specialized firms). Most effective when: (1) leadership committed to balancing efficiency with flexibility, (2) resources allocated to strategic issue management, (3) culture rewards strategic alertness, (4) decision-making processes allow rapid response. Less valuable in stable, slow-changing environments where traditional planning suffices—but those environments are increasingly rare.'
      },
      media: [
        {
          type: 'image',
          title: 'Strategic Issue Management Lifecycle',
          url: '/diagrams/strategic-issue-lifecycle.svg',
          description: 'Complete strategic issue management cycle from detection to organizational learning. Five stages: (1) Scanning & Detection - monitor environment and detect weak signals, (2) Assessment & Analysis - evaluate significance and impact, (3) Response Planning - develop strategies and scenario planning, (4) Implementation & Monitoring - execute response and track effectiveness, (5) Learning & Adaptation - evaluate outcomes and update processes. Continuous cycle ensuring issues evolve and require repeated assessment and adaptation.'
        },
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
          description: 'Overview of strategic management approaches including Igor Ansoff\'s strategic issue management system for detecting and responding to weak signals in real-time. Explains the balance between operational efficiency and strategic flexibility, and methods for creating responsive organizational systems.'
        },
        {
          type: 'image',
          title: 'Ansoff Matrix (Product-Market Growth)',
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Ansoff_Matrix.jpg',
          description: 'Igor Ansoff\'s strategic planning framework: Market Penetration, Market Development, Product Development, Diversification'
        }
      ],
      metadata: {
        difficulty: 'advanced',
        timeRequired: '2-4 weeks to design system, ongoing for operation',
        groupSize: 'dedicated strategic teams (3-5 people) plus organizational network',
        bestFor: ['Real-time strategic response', 'Organizational agility', 'Managing discontinuities', 'Balancing efficiency with flexibility', 'Early warning systems'],
        sectors: ['Corporate strategy', 'Competitive intelligence', 'Risk management', 'Strategic planning offices', 'Innovation management'],
        commonPitfalls: ['System becomes bureaucratic rather than agile', 'Alert fatigue from too many issues', 'Not empowering rapid response', 'Surveillance without action mechanisms', 'Losing efficiency in pursuit of flexibility']
      }
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
        overview: 'Aspirational Futures Design, inspired by Gene Roddenberry\'s Star Trek and advanced by thinkers like Buckminster Fuller and Jacque Fresco, imagines radically optimistic post-scarcity futures where technology, social innovation, and human collaboration solve existential challenges and enable human flourishing. Rather than extrapolating current trends or managing risks, this approach asks "What is the most inspiring future we can imagine?" and uses that vision to pull present action toward transformative goals. Star Trek exemplifies this: a future where humanity has transcended war, poverty, and nationalism, united in exploration and self-betterment. Aspirational futures challenge default pessimism in foresight, providing positive visions that motivate action, attract resources, and shift cultural narratives from scarcity to abundance. The method is particularly relevant for addressing civilizational challenges (climate, AI, inequality) where incremental change is insufficient and bold reimagining is needed to inspire transformative action.',
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
      relatedMethodologies: [
        { id: 'visioning', type: 'complements', description: 'Both create preferred futures, with visioning focusing on concrete images and aspirational futures on inspiring ideals and values' },
        { id: 'backcasting', type: 'builds-on', description: 'Aspirational futures design articulates inspiring visions of abundance; backcasting then identifies concrete pathways to achieve them' },
        { id: 'scenario-planning', type: 'contrasts', description: 'Scenario planning explores multiple plausible futures; aspirational futures design commits to creating specific preferred futures' },
        { id: 'cla', type: 'complements', description: 'Aspirational futures work at CLA\'s deepest layer (myth/metaphor), reshaping cultural narratives from scarcity to abundance' }
      ],
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Milky_Way_IR_Spitzer.jpg',
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
          description: 'Analysis of Star Trek\'s optimistic economic and social vision where humanity has eliminated poverty, scarcity, and war through replicator technology and collaborative governance. Explores how this aspirational fiction has influenced real-world futurists, technologists, and policy makers seeking to create post-scarcity abundance futures.'
        }
      ],
      metadata: {
        difficulty: 'beginner',
        timeRequired: '1-2 days for initial aspirational vision creation',
        groupSize: 'creative workshops (8-20 people) with diverse, optimistic mindsets',
        bestFor: ['Inspiring transformative innovation', 'Long-term civilization design', 'Countering dystopian narratives', 'Mobilizing collaborative action', 'Technology ethics and direction'],
        sectors: ['Technology development', 'Social innovation', 'Education and inspiration', 'Space exploration', 'Future studies'],
        commonPitfalls: ['Naivety about implementation challenges', 'Ignoring power structures and political realities', 'Technologically deterministic thinking', 'Not addressing inequality in transition', 'Dismissing as unrealistic fantasy']
      }
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
          description: 'Comprehensive biography covering Ray Kurzweil\'s life, major inventions (OCR, text-to-speech, music synthesis), prediction methodology (Law of Accelerating Returns), and track record of forecasts with documented accuracy assessments. Includes analysis of both successful predictions (smartphones, AI assistants) and controversial claims (singularity timeline).'
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Portrait_of_Ray_Kurzweil.png',
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
          description: 'Biography covering Alvin Toffler\'s life as futurologist, his major works (Future Shock, The Third Wave, Powershift), influence on business and political leaders worldwide, and key concepts like information overload, prosumer, and acceleration of change. Documents his prescient insights about knowledge economy and technology\'s social impact.'
        },
        {
          type: 'image',
          title: 'Three Waves of Civilization Timeline',
          url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Generation_timeline.svg',
          description: 'Timeline representing Toffler\'s three waves: Agricultural Age (~8000 BCE) → Industrial Age (~1750) → Information Age (~1950)'
        },
        {
          type: 'image',
          title: 'Alvin Toffler Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Alvin_Toffler_02.jpg',
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
          description: 'Complete biography covering Fuller\'s life as architect, systems theorist, and futurist. Documents his innovations (geodesic dome, Dymaxion designs), philosophical framework (Spaceship Earth, Design Science Revolution, ephemeralization), influence on sustainability movement, and vision of making the world work for 100% of humanity through anticipatory design.'
        },
        {
          type: 'image',
          title: 'Buckminster Fuller Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Buckminster_Fuller_1917.jpg',
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
          description: 'Biography covering Asimov\'s life as biochemist and prolific science fiction author (500+ books). Documents his major works (Foundation series, Robot series), creation of Three Laws of Robotics and psychohistory concepts, influence on AI ethics and data science, and prescient predictions about automation, education, and networked society.'
        },
        {
          type: 'image',
          title: 'Isaac Asimov Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg',
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
          description: 'Complete biography covering Clarke\'s life as physicist, science fiction author, and futurist. Documents his major works (2001: A Space Odyssey, Childhood\'s End, Rendezvous with Rama), Clarke\'s Three Laws (especially "any sufficiently advanced technology is indistinguishable from magic"), accurate predictions (communications satellites, space stations), and lasting influence on space exploration and technology forecasting.'
        },
        {
          type: 'image',
          title: 'Arthur C. Clarke Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Arthur_C._Clarke_%281982%29.jpg',
          description: 'British science fiction author (1917-2008), predicted communications satellites, Clarke Belt named in his honor'
        }
      ]
    },
    {
      id: 'roddenberry',
      type: 'sci-fi-writer',
      label: 'Gene\nRoddenberry',
      lifespan: '1921-1991',
      color: '#FFD700',
      level: 3,
      description: 'Created Star Trek as a template for a positive, inclusive future humanity could actually build toward',
      details: {
        overview: 'Envisioned post-scarcity society where humanity overcame racism, poverty, and war. IDIC philosophy (Infinite Diversity in Infinite Combinations) promoted inclusion decades before mainstream. Predicted communicators (cell phones), PADDs (tablets), universal translators (AI translation), and replicators (3D printing).',
        influence: 'Inspired generations of scientists, engineers, and astronauts. Martin Luther King Jr. convinced Nichelle Nichols to stay on show for representation. First interracial kiss on US TV. Influenced NASA, cell phone design, tablet computers, and voice interfaces.',
        methodology: 'Optimistic futurism, social commentary through allegory, aspirational worldbuilding',
        accuracyRating: 'very-high'
      },
      majorWorks: [
        { title: 'Star Trek (Original Series)', year: 1966 },
        { title: 'Star Trek: The Motion Picture', year: 1979 },
        { title: 'Star Trek: The Next Generation', year: 1987 }
      ],
      keyPredictions: [
        'Communicators → Cell phones and flip phones',
        'PADDs → Tablet computers (iPad)',
        'Universal Translator → Google Translate, AI translation',
        'Replicators → 3D printing technology',
        'Voice-activated computers → Siri, Alexa',
        'Hyposprays → Needle-free injection systems',
        'Tricorders → Portable medical diagnostics'
      ],
      media: [
        {
          type: 'video',
          title: 'Gene Roddenberry on Creating Star Trek',
          url: 'https://www.youtube.com/watch?v=8PbcA3sYHXc',
          description: 'Roddenberry discussing his vision for humanity\'s future',
          year: 1988
        },
        {
          type: 'article',
          title: 'Gene Roddenberry - Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Gene_Roddenberry',
          source: 'Wikipedia',
          description: 'Complete biography covering Roddenberry\'s life from WWII pilot to TV producer who created Star Trek. Documents his vision of an optimistic future, IDIC philosophy promoting diversity and inclusion, influence on technology development (communicators, PADDs, tricorders), social commentary through science fiction allegory, and lasting cultural impact inspiring scientists, astronauts, and engineers.'
        },
        {
          type: 'image',
          title: 'Gene Roddenberry Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Gene_Roddenberry_in_1976.jpg',
          description: 'American television producer (1921-1991), creator of Star Trek and visionary of an optimistic human future'
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
          description: 'Complete works including Jurassic Park, The Andromeda Strain, Westworld, and Prey. Documents Crichton\'s influence on public understanding of emerging technologies (genetic engineering, nanotechnology, AI) through techno-thrillers exploring unintended consequences and systemic risks. His cautionary tales shaped discourse around technological governance and precautionary principle.'
        },
        {
          type: 'image',
          title: 'Michael Crichton Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/MichaelCrichton.jpg',
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
          description: 'Biography covering Le Guin\'s life as anthropologist\'s daughter and pioneering science fiction author. Documents her major works (The Left Hand of Darkness, The Dispossessed, Earthsea), exploration of gender fluidity decades before mainstream discourse, alternative political systems (anarchist utopias), ecological consciousness, and use of "elsewhere" to illuminate contemporary social issues.'
        },
        {
          type: 'image',
          title: 'Ursula K. Le Guin Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Ursula_K_Le_Guin.JPG',
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
          description: 'Biography covering Gibson\'s creation of cyberpunk genre through Neuromancer (1984), coining of term "cyberspace," and prescient vision of internet culture, virtual reality, and tech-noir aesthetics before widespread internet adoption. Documents his influence on tech developers, hackers, and Silicon Valley culture, with concepts like the matrix, cyber-consoles, and mega-corporations shaping how we imagine digital futures.'
        },
        {
          type: 'image',
          title: 'William Gibson Portrait',
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/William_Gibson_60th_birthday_portrait.jpg',
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Neal_Stephenson_2008_crop.jpg',
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
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Futures_cone.svg',
          description: 'Visual diagram showing how uncertainty expands from the present moment into multiple nested cones representing different categories of futures: possible (physically conceivable), plausible (based on current knowledge), probable (trending trajectories), and preferable (desired outcomes). This foundational framework helps futurists explore the full range of potential futures while distinguishing between what could happen versus what we want to happen.'
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
