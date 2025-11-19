/**
 * Tour Data - Defines guided tour configurations
 *
 * Each tour has:
 * - Metadata (id, title, description, duration)
 * - Music track
 * - Segments (sequence of stops with camera positions and narration)
 */

// Camera positions are relative to the 3D scene coordinate system
// The mind map uses: Center at (0,0,0), nodes spread on XZ plane with Y height

export const tours = {
  /**
   * Primary Tour: Introduction to Strategic Foresight
   * Duration: ~15-20 minutes
   * Journey: Overview → Each Pillar → Key Methodologies
   */
  primary: {
    id: 'primary',
    title: 'Journey Through Strategic Foresight',
    description: 'A guided exploration of futures thinking methodologies, from mapping the present to transforming the future.',
    estimatedDuration: '15-20 minutes',
    musicUrl: '/audio/music/ambient-futures.mp3', // Placeholder - will be Yagya track

    segments: [
      // SEGMENT 0: Opening - Wide view of entire cosmos
      {
        id: 'intro-wide',
        title: 'Welcome to the Cosmos',
        nodeId: null, // No specific node
        cameraPosition: { x: 0, y: 80, z: 120 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 4000,
        narrationUrl: '/audio/narration/00-intro-wide.mp3',
        narrationDelay: 1000,
        postNarrationDwell: 1500,
        subtitle: 'The future is not a destination to be predicted, but a landscape to be explored.'
      },

      // SEGMENT 1: Zoom to Strategic Foresight center
      {
        id: 'intro-center',
        title: 'Strategic Foresight',
        nodeId: 'strategic-foresight',
        cameraPosition: { x: 0, y: 30, z: 50 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/01-strategic-foresight.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'A disciplined framework for exploring alternative futures.'
      },

      // SEGMENT 2: Pan to show Six Pillars
      {
        id: 'six-pillars-overview',
        title: 'The Six Pillars',
        nodeId: null,
        cameraPosition: { x: 40, y: 40, z: 60 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3500,
        narrationUrl: '/audio/narration/02-six-pillars.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1500,
        subtitle: 'Sohail Inayatullah\'s framework for organizing foresight methods.'
      },

      // SEGMENT 3: Mapping the Future
      {
        id: 'pillar-mapping',
        title: 'Mapping the Future',
        nodeId: 'mapping',
        cameraPosition: { x: -50, y: 25, z: 20 },
        lookAt: { x: -35, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/03-mapping.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Understanding our current assumptions about the future.'
      },

      // SEGMENT 4: Futures Triangle (under Mapping)
      {
        id: 'method-futures-triangle',
        title: 'Futures Triangle',
        nodeId: 'futures-triangle',
        cameraPosition: { x: -55, y: 15, z: 15 },
        lookAt: { x: -45, y: 5, z: -10 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/04-futures-triangle.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Balancing the push of the present, pull of the future, and weight of the past.'
      },

      // SEGMENT 5: Anticipating
      {
        id: 'pillar-anticipating',
        title: 'Anticipating Change',
        nodeId: 'anticipating',
        cameraPosition: { x: -30, y: 25, z: 45 },
        lookAt: { x: -20, y: 0, z: 25 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/05-anticipating.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Detecting early signs of emerging change.'
      },

      // SEGMENT 6: Environmental Scanning (key method)
      {
        id: 'method-env-scanning',
        title: 'Environmental Scanning',
        nodeId: 'env-scanning',
        cameraPosition: { x: -35, y: 12, z: 55 },
        lookAt: { x: -25, y: 0, z: 35 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/06-env-scanning.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Systematic monitoring of the external environment.'
      },

      // SEGMENT 7: Timing
      {
        id: 'pillar-timing',
        title: 'Timing the Future',
        nodeId: 'timing',
        cameraPosition: { x: 10, y: 25, z: 55 },
        lookAt: { x: 5, y: 0, z: 35 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/07-timing.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Understanding temporal patterns and cycles.'
      },

      // SEGMENT 8: Deepening
      {
        id: 'pillar-deepening',
        title: 'Deepening Understanding',
        nodeId: 'deepening',
        cameraPosition: { x: 50, y: 25, z: 30 },
        lookAt: { x: 35, y: 0, z: 15 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/08-deepening.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Examining underlying worldviews and assumptions.'
      },

      // SEGMENT 9: Causal Layered Analysis (key method)
      {
        id: 'method-cla',
        title: 'Causal Layered Analysis',
        nodeId: 'cla',
        cameraPosition: { x: 55, y: 12, z: 20 },
        lookAt: { x: 45, y: 0, z: 10 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/09-cla.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Four layers: litany, social causes, worldview, myth.'
      },

      // SEGMENT 10: Creating Alternatives
      {
        id: 'pillar-creating',
        title: 'Creating Alternatives',
        nodeId: 'creating',
        cameraPosition: { x: 45, y: 25, z: -25 },
        lookAt: { x: 30, y: 0, z: -15 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/10-creating.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Generating diverse possible futures.'
      },

      // SEGMENT 11: Scenario Planning (flagship method)
      {
        id: 'method-scenarios',
        title: 'Scenario Planning',
        nodeId: 'scenarios',
        cameraPosition: { x: 50, y: 12, z: -35 },
        lookAt: { x: 40, y: 0, z: -25 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/11-scenarios.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1500,
        subtitle: 'Exploring multiple plausible futures through narrative.'
      },

      // SEGMENT 12: Transforming
      {
        id: 'pillar-transforming',
        title: 'Transforming the Future',
        nodeId: 'transforming',
        cameraPosition: { x: -10, y: 25, z: -45 },
        lookAt: { x: -5, y: 0, z: -30 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/12-transforming.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Creating and achieving preferred futures.'
      },

      // SEGMENT 13: Backcasting (key method)
      {
        id: 'method-backcasting',
        title: 'Backcasting',
        nodeId: 'backcasting',
        cameraPosition: { x: -15, y: 12, z: -55 },
        lookAt: { x: -10, y: 0, z: -40 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/13-backcasting.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Working backward from desired futures to present actions.'
      },

      // SEGMENT 14: Final overview - pull back
      {
        id: 'closing-overview',
        title: 'The Journey Continues',
        nodeId: null,
        cameraPosition: { x: 20, y: 60, z: 80 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 4000,
        narrationUrl: '/audio/narration/14-closing.mp3',
        narrationDelay: 1000,
        postNarrationDwell: 2000,
        subtitle: 'The future is not something we enter, but something we create.'
      }
    ]
  },

  /**
   * Quick Tour: Highlights Only
   * Duration: ~5 minutes
   * For users who want a brief overview
   */
  quick: {
    id: 'quick',
    title: 'Quick Overview',
    description: 'A brief introduction to the core concepts of strategic foresight.',
    estimatedDuration: '5 minutes',
    musicUrl: '/audio/music/ambient-futures.mp3',

    segments: [
      {
        id: 'quick-intro',
        title: 'Strategic Foresight',
        nodeId: 'strategic-foresight',
        cameraPosition: { x: 0, y: 40, z: 60 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/quick-intro.mp3',
        postNarrationDwell: 1000
      },
      {
        id: 'quick-pillars',
        title: 'Six Pillars Overview',
        nodeId: null,
        cameraPosition: { x: 30, y: 50, z: 50 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/quick-pillars.mp3',
        postNarrationDwell: 1000
      },
      {
        id: 'quick-scenarios',
        title: 'Scenario Planning',
        nodeId: 'scenarios',
        cameraPosition: { x: 50, y: 20, z: -30 },
        lookAt: { x: 40, y: 0, z: -20 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/quick-scenarios.mp3',
        postNarrationDwell: 1000
      },
      {
        id: 'quick-close',
        title: 'Explore Further',
        nodeId: null,
        cameraPosition: { x: 0, y: 60, z: 80 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/quick-close.mp3',
        postNarrationDwell: 1500
      }
    ]
  }
};

/**
 * Get tour by ID
 */
export function getTour(id) {
  return tours[id] || null;
}

/**
 * Get all available tours
 */
export function getAllTours() {
  return Object.values(tours).map(tour => ({
    id: tour.id,
    title: tour.title,
    description: tour.description,
    estimatedDuration: tour.estimatedDuration,
    segmentCount: tour.segments.length
  }));
}

export default tours;
