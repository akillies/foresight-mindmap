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
        id: '00-intro-wide',
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
        id: '01-strategic-foresight',
        title: 'Strategic Foresight',
        nodeId: 'strategic-foresight',
        cameraPosition: { x: 35, y: 28, z: 20 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/01-strategic-foresight.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'A disciplined framework for exploring alternative futures.'
      },

      // SEGMENT 2: Pan to show Six Pillars
      {
        id: '02-six-pillars',
        title: 'The Six Pillars',
        nodeId: null,
        cameraPosition: { x: 40, y: 45, z: 60 },
        lookAt: { x: 0, y: 0, z: 0 },
        transitionDuration: 3500,
        narrationUrl: '/audio/narration/02-six-pillars.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1500,
        subtitle: 'Sohail Inayatullah\'s framework for organizing foresight methods.'
      },

      // SEGMENT 3: Mapping the Future (pillar at x: 25, z: 0)
      {
        id: '03-mapping',
        title: 'Mapping the Future',
        nodeId: 'mapping',
        cameraPosition: { x: 55, y: 25, z: 5 },
        lookAt: { x: 25, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/03-mapping.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Understanding our current assumptions about the future.'
      },

      // SEGMENT 4: Futures Triangle (at x: 34.2, z: -3.8 under Mapping)
      {
        id: '04-futures-triangle',
        title: 'Futures Triangle',
        nodeId: 'futures-triangle',
        cameraPosition: { x: 60, y: 20, z: -6 },
        lookAt: { x: 34, y: 0, z: -4 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/04-futures-triangle.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Balancing the push of the present, pull of the future, and weight of the past.'
      },

      // SEGMENT 5: Anticipating (pillar at x: 12.5, z: 21.7)
      {
        id: '05-anticipating',
        title: 'Anticipating Change',
        nodeId: 'anticipating',
        cameraPosition: { x: 30, y: 25, z: 48 },
        lookAt: { x: 12.5, y: 0, z: 21.7 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/05-anticipating.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Detecting early signs of emerging change.'
      },

      // SEGMENT 6: Environmental Scanning (at x: 20.4, z: 27.8 under Anticipating)
      {
        id: '06-env-scanning',
        title: 'Environmental Scanning',
        nodeId: 'env-scanning',
        cameraPosition: { x: 40, y: 20, z: 54 },
        lookAt: { x: 20, y: 0, z: 28 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/06-env-scanning.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Systematic monitoring of the external environment.'
      },

      // SEGMENT 7: Timing (pillar at x: -12.5, z: 21.7)
      {
        id: '07-timing',
        title: 'Timing the Future',
        nodeId: 'timing',
        cameraPosition: { x: -30, y: 25, z: 48 },
        lookAt: { x: -12.5, y: 0, z: 21.7 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/07-timing.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Understanding temporal patterns and cycles.'
      },

      // SEGMENT 8: Deepening (pillar at x: -25, z: 0)
      {
        id: '08-deepening',
        title: 'Deepening Understanding',
        nodeId: 'deepening',
        cameraPosition: { x: -55, y: 25, z: -5 },
        lookAt: { x: -25, y: 0, z: 0 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/08-deepening.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Examining underlying worldviews and assumptions.'
      },

      // SEGMENT 9: Causal Layered Analysis (at x: -34.2, z: 3.8 under Deepening)
      {
        id: '09-cla',
        title: 'Causal Layered Analysis',
        nodeId: 'cla',
        cameraPosition: { x: -60, y: 20, z: 8 },
        lookAt: { x: -34, y: 0, z: 4 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/09-cla.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Four layers: litany, social causes, worldview, myth.'
      },

      // SEGMENT 10: Creating Alternatives (pillar at x: -12.5, z: -21.7)
      {
        id: '10-creating',
        title: 'Creating Alternatives',
        nodeId: 'creating',
        cameraPosition: { x: -30, y: 25, z: -48 },
        lookAt: { x: -12.5, y: 0, z: -21.7 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/10-creating.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Generating diverse possible futures.'
      },

      // SEGMENT 11: Scenario Planning (at x: -20.4, z: -27.8 under Creating)
      {
        id: '11-scenarios',
        title: 'Scenario Planning',
        nodeId: 'scenarios',
        cameraPosition: { x: -40, y: 20, z: -54 },
        lookAt: { x: -20, y: 0, z: -28 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/11-scenarios.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1500,
        subtitle: 'Exploring multiple plausible futures through narrative.'
      },

      // SEGMENT 12: Transforming (pillar at x: 12.5, z: -21.7)
      {
        id: '12-transforming',
        title: 'Transforming the Future',
        nodeId: 'transforming',
        cameraPosition: { x: 30, y: 25, z: -48 },
        lookAt: { x: 12.5, y: 0, z: -21.7 },
        transitionDuration: 3000,
        narrationUrl: '/audio/narration/12-transforming.mp3',
        narrationDelay: 500,
        postNarrationDwell: 1000,
        subtitle: 'Creating and achieving preferred futures.'
      },

      // SEGMENT 13: Backcasting (at x: 13.8, z: -31.6 under Transforming)
      {
        id: '13-backcasting',
        title: 'Backcasting',
        nodeId: 'backcasting',
        cameraPosition: { x: 32, y: 20, z: -58 },
        lookAt: { x: 14, y: 0, z: -32 },
        transitionDuration: 2500,
        narrationUrl: '/audio/narration/13-backcasting.mp3',
        narrationDelay: 300,
        postNarrationDwell: 1000,
        subtitle: 'Working backward from desired futures to present actions.'
      },

      // SEGMENT 14: Final overview - pull back
      {
        id: '14-closing',
        title: 'The Journey Continues',
        nodeId: null,
        cameraPosition: { x: -20, y: 60, z: 80 },
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
