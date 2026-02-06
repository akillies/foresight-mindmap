# Strategic Foresight Mind Map - Architecture Document

**Version:** 1.0
**Last Updated:** January 28, 2026
**Project Version:** 0.1 (Live at futures.alexanderkline.com)
**Architect:** CTO Review

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [Component Architecture](#component-architecture)
4. [Data Flow](#data-flow)
5. [Technology Stack](#technology-stack)
6. [Performance Architecture](#performance-architecture)
7. [Security Considerations](#security-considerations)
8. [Technical Debt Assessment](#technical-debt-assessment)
9. [Scalability Considerations](#scalability-considerations)
10. [Architectural Recommendations](#architectural-recommendations)

---

## Executive Summary

The Strategic Foresight Mind Map is a React-based 3D interactive visualization built with Three.js, featuring an LCARS Star Trek aesthetic. The architecture follows a monolithic single-page application pattern with lazy-loaded feature components. The current implementation prioritizes developer velocity and visual polish over modular architecture, resulting in a functional v0.1 with identified technical debt that should be addressed before scaling to v1.0.

**Key Strengths:**
- Minimal dependencies (React, Three.js, Vite only)
- Effective lazy loading strategy (~70KB savings)
- Clean separation between data and presentation
- Robust error handling with React Error Boundaries

**Key Concerns:**
- Monolithic main component (3,437 lines)
- Missing state management layer for complex interactions
- No testing infrastructure
- Memory management needs attention for long sessions

---

## System Architecture Overview

### High-Level Architecture Diagram

```
                                    +----------------------------------+
                                    |        BROWSER (Client)          |
                                    +----------------------------------+
                                    |                                  |
    +---------------------------+   |   +---------------------------+  |
    |      Static Assets        |   |   |     React Application     |  |
    |  (Vercel CDN)             |   |   +---------------------------+  |
    |                           |   |   |                           |  |
    |  - index.html             |   |   |  +--------------------+   |  |
    |  - main.js (bundle)       |   |   |  | ForesightMindMap   |   |  |
    |  - vendor.js (Three.js)   |<--+-->|  | (Core Orchestrator)|   |  |
    |  - assets/                |   |   |  +--------------------+   |  |
    |    - diagrams/*.svg       |   |   |           |               |  |
    |    - audio/narration/     |   |   |  +--------+--------+      |  |
    +---------------------------+   |   |  |        |        |      |  |
                                    |   |  v        v        v      |  |
                                    |   | Three.js Audio   UI      |  |
                                    |   | Scene   System  Panels   |  |
                                    |   |                           |  |
                                    +---+---------------------------+--+
                                                    |
                                    +---------------+---------------+
                                    |               |               |
                               WebGL Canvas    Web Audio API   Speech API
                               (3D Render)    (Binaural/TTS)   (Narration)
```

### Application Layers

```
+-----------------------------------------------------------------------+
|                          PRESENTATION LAYER                            |
|  +------------------+ +------------------+ +------------------------+  |
|  | 3D Visualization | | UI Components    | | Tour Experience        |  |
|  | - Nodes          | | - InfoPanel      | | - Camera Controller    |  |
|  | - Connections    | | - SearchBox      | | - Audio Narration      |  |
|  | - Starfield      | | - ControlPanel   | | - Segment Playback     |  |
|  | - Effects        | | - MediaBrowser   | | - Progress HUD         |  |
|  +------------------+ +------------------+ +------------------------+  |
+-----------------------------------------------------------------------+
                                    |
+-----------------------------------------------------------------------+
|                           BUSINESS LOGIC LAYER                         |
|  +------------------+ +------------------+ +------------------------+  |
|  | Node Management  | | Tour Manager     | | Audio Manager          |  |
|  | - Expansion      | | - State Machine  | | - Binaural Generation  |  |
|  | - Selection      | | - Segment Sync   | | - TTS Fallback         |  |
|  | - Search Filter  | | - Event Emitter  | | - Volume Control       |  |
|  +------------------+ +------------------+ +------------------------+  |
+-----------------------------------------------------------------------+
                                    |
+-----------------------------------------------------------------------+
|                             DATA LAYER                                 |
|  +------------------+ +------------------+ +------------------------+  |
|  | mindMapData.js   | | tourData.js      | | tourNarration.js       |  |
|  | - 18 Methods     | | - Tour Segments  | | - Narration Scripts    |  |
|  | - 142+ Media     | | - Camera Paths   | | - TTS Fallback Text    |  |
|  | - Relationships  | | - Timing Data    | | - 19 Segments          |  |
|  +------------------+ +------------------+ +------------------------+  |
+-----------------------------------------------------------------------+
```

---

## Component Architecture

### Component Hierarchy

```
App.jsx
  |
  +-- ErrorBoundary
       |
       +-- ForesightMindMap.jsx (3,437 lines - NEEDS REFACTORING)
            |
            +-- Three.js Scene (Inline)
            |    +-- Starfield Particles
            |    +-- Nebula Clouds
            |    +-- Node Spheres
            |    +-- Connection Lines
            |    +-- Easter Eggs (Enterprise, Black Swan)
            |
            +-- UI Components (Inline)
            |    +-- Control Panel
            |    +-- Search Box
            |    +-- Audio Controls
            |    +-- About Modal
            |
            +-- Lazy-Loaded Components
                 +-- EnhancedInfoPanel.jsx (664 lines)
                 +-- FeaturedContentDashboard.jsx (374 lines)
                 +-- GlobalMediaBrowser.jsx (491 lines)
                 +-- TimelineView.jsx (804 lines)
                 +-- TourUI.jsx (491 lines)
                 +-- DiagramGallery.jsx (440 lines) [NOT INTEGRATED]
```

### Module Dependencies

```
ForesightMindMap.jsx
    |
    +---> THREE (three)
    |     +---> EffectComposer
    |     +---> RenderPass
    |     +---> UnrealBloomPass
    |     +---> OrbitControls
    |
    +---> mindMapData.js (Static Data)
    |
    +---> AudioManager.js (Singleton)
    |     +---> Web Audio API
    |     +---> Speech Synthesis API
    |
    +---> TourManager.js (Singleton)
    |     +---> TourCameraController.js
    |     +---> AudioManager.js
    |     +---> tourNarration.js
    |
    +---> tourData.js (Static Data)
    |
    +---> [Lazy] EnhancedInfoPanel.jsx
    +---> [Lazy] FeaturedContentDashboard.jsx
    +---> [Lazy] GlobalMediaBrowser.jsx
    +---> [Lazy] TimelineView.jsx
    +---> [Lazy] TourUI.jsx
```

### Key Component Responsibilities

| Component | Lines | Responsibility | Coupling Level |
|-----------|-------|----------------|----------------|
| ForesightMindMap.jsx | 3,437 | Scene orchestration, state, events, rendering | HIGH (monolithic) |
| mindMapData.js | 4,054 | Content: methodologies, media, relationships | LOW (pure data) |
| AudioManager.js | 658 | Audio playback, TTS, volume, crossfade | MEDIUM (singleton) |
| TourManager.js | 457 | Tour state machine, segment coordination | MEDIUM (singleton) |
| TourCameraController.js | 450 | Camera animation, path interpolation | LOW (utility) |
| EnhancedInfoPanel.jsx | 664 | Methodology detail display, tabs | LOW (presentational) |
| TimelineView.jsx | 804 | Historical timeline visualization | LOW (feature) |
| GlobalMediaBrowser.jsx | 491 | Media grid, filtering, search | LOW (feature) |

---

## Data Flow

### User Interaction Flow

```
                          USER ACTION
                               |
         +--------------------+--------------------+
         |                    |                    |
     Mouse Events        Keyboard Events     Touch Events
         |                    |                    |
         v                    v                    v
    +----------------------------------------------------------+
    |                  EVENT HANDLERS                           |
    |  handleClick | handleMouseMove | handleWheel | handleKey  |
    +----------------------------------------------------------+
                               |
         +--------------------+--------------------+
         |                    |                    |
    3D Interaction       UI Interaction      Search/Filter
         |                    |                    |
         v                    v                    v
    +--------------+   +---------------+   +----------------+
    | Raycaster    |   | React State   |   | Query Match    |
    | Intersection |   | Update        |   | Algorithm      |
    +--------------+   +---------------+   +----------------+
         |                    |                    |
         v                    v                    v
    +--------------+   +---------------+   +----------------+
    | Node Select/ |   | UI Component  |   | Node Visibility|
    | Expand       |   | Re-render     |   | Update         |
    +--------------+   +---------------+   +----------------+
         |                    |                    |
         +--------------------+--------------------+
                               |
                               v
                    +--------------------+
                    | Animation Loop     |
                    | (60 FPS render)    |
                    +--------------------+
```

### Tour System Data Flow

```
User clicks "GUIDED TOUR"
         |
         v
+-------------------+
| TourSelectionModal|
| (Tour Options)    |
+-------------------+
         |
         v
+-------------------+     +------------------+
| tourManager.      |---->| tourData.js      |
| loadTour()        |     | (Tour Segments)  |
+-------------------+     +------------------+
         |
         v
+-------------------+     +------------------+
| tourManager.      |---->| audioManager.    |
| start()           |     | initialize()     |
+-------------------+     +------------------+
         |
         v
+-------------------+
| For each segment: |
+-------------------+
         |
    +----+----+
    |         |
    v         v
+--------+ +-------------+
| Camera | | Narration   |
| Move   | | Playback    |
+--------+ +-------------+
    |         |
    v         v
+-------------------+     +------------------+
| TourCamera        |     | audioManager.    |
| Controller        |     | playNarration()  |
| .moveTo()         |     | or speakText()   |
+-------------------+     +------------------+
         |
         v
+-------------------+
| Emit: 'segment'   |
| Update: TourHUD   |
+-------------------+
         |
         v
+-------------------+
| onNarrationEnd()  |
| --> nextSegment() |
+-------------------+
```

### State Management Pattern

```
React State (useState hooks in ForesightMindMap):
+-------------------------------------------------------+
| UI State              | Selection State               |
| - searchInput         | - selectedNode                |
| - searchQuery         | - expandedNodes (Set)         |
| - controlPanelOpen    | - hoveredNode                 |
| - infoPanelOpen       | - selectedMedia               |
| - showAbout           |                               |
| - showMediaBrowser    | Audio State                   |
| - timelineVisible     | - audioEnabled                |
|                       | - audioPreset                 |
| Tour State            | - tourMusicVolume             |
| - showTourSelection   | - tourNarrationVolume         |
| - tourActive          | - tourAudioMuted              |
+-------------------------------------------------------+

Ref State (useRef - Mutable, No Re-render):
+-------------------------------------------------------+
| 3D Scene References   | Animation References          |
| - sceneRef            | - particlesRef                |
| - cameraRef           | - nebulasRef                  |
| - rendererRef         | - easterEggRef                |
| - composerRef         |                               |
| - controlsRef         | Interaction References        |
| - nodesRef            | - raycasterRef                |
| - connectionsRef      | - mouseRef                    |
| - crossPillarConns    | - isDraggingRef               |
+-------------------------------------------------------+

Singleton State (Module-level):
+-------------------------------------------------------+
| audioManager          | Single audio context          |
| tourManager           | Tour state machine            |
+-------------------------------------------------------+
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose | Bundle Impact |
|------------|---------|---------|---------------|
| React | 19.1.1 | UI Framework | ~45 KB |
| Three.js | 0.158.0 | 3D Rendering | ~600 KB (tree-shakeable) |
| Vite | 7.1.7 | Build Tool | Dev only |

### Browser APIs Used

| API | Purpose | Fallback |
|-----|---------|----------|
| WebGL | 3D Rendering | None (required) |
| Web Audio API | Binaural beats | Silent |
| Speech Synthesis | TTS Narration | Audio files |
| ResizeObserver | Responsive canvas | Window resize |
| IntersectionObserver | Lazy loading | Eager load |

### Build Configuration

```javascript
// vite.config.js (Current - Minimal)
export default defineConfig({
  plugins: [react()],
})

// Recommended additions for v0.2+
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    port: 5173
  }
})
```

### Bundle Analysis

```
Current Bundle (gzipped):
+---------------------------+
| Chunk           | Size    |
+---------------------------+
| main.js         | ~125 KB |
| three (vendor)  | ~195 KB |
| Total           | ~320 KB |
+---------------------------+

Lazy-Loaded (on demand):
+---------------------------+
| Component       | Size    |
+---------------------------+
| TimelineView    | ~15 KB  |
| TourUI          | ~10 KB  |
| EnhancedInfo    | ~12 KB  |
| MediaBrowser    | ~10 KB  |
| FeaturedDash    | ~8 KB   |
| DiagramGallery  | ~8 KB   |
+---------------------------+
```

---

## Performance Architecture

### Rendering Pipeline

```
                     +----------------------+
                     | requestAnimationFrame|
                     | (60 FPS target)      |
                     +----------------------+
                              |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
+----------------+   +----------------+   +----------------+
| Scene Updates  |   | Node Animation |   | Particle System|
| - Rotation     |   | - Floating     |   | - Position     |
| - Easter eggs  |   | - Pulse glow   |   | - Color        |
+----------------+   +----------------+   +----------------+
         |                   |                   |
         +-------------------+-------------------+
                              |
                              v
                     +----------------------+
                     | Raycaster Update     |
                     | (Hover detection)    |
                     +----------------------+
                              |
                              v
                     +----------------------+
                     | EffectComposer       |
                     | - RenderPass         |
                     | - UnrealBloomPass    |
                     +----------------------+
                              |
                              v
                     +----------------------+
                     | renderer.render()    |
                     | (WebGL draw calls)   |
                     +----------------------+
```

### Memory Management Strategies

1. **Vector3 Reuse**: Pre-allocated `SCALE_SELECTED` and `SCALE_NORMAL` vectors prevent per-frame allocation
2. **Node Pooling**: Child nodes are removed when parents collapse (via `removeChildNodes`)
3. **Lazy Loading**: Feature components load only when needed
4. **Debounced Search**: 300ms debounce prevents excessive re-renders

### Performance Bottlenecks Identified

| Issue | Impact | Recommendation |
|-------|--------|----------------|
| Large main component | Slow HMR, memory pressure | Split into modules |
| All nodes in scene | GPU memory at scale | Frustum culling |
| Per-node raycasting | CPU at high node count | Spatial indexing (Octree) |
| No texture atlas | Multiple draw calls | Combine node textures |

### Optimization Opportunities

```
Priority: HIGH
+------------------------------------------+
| Optimization          | Estimated Gain   |
+------------------------------------------+
| Frustum culling       | 40-60% GPU       |
| Octree for raycasting | 70-80% CPU       |
| Instanced meshes      | 50% draw calls   |
+------------------------------------------+

Priority: MEDIUM
+------------------------------------------+
| Component splitting   | Better HMR       |
| Web Worker for search | Main thread free |
| Texture atlasing      | Fewer state changes|
+------------------------------------------+
```

---

## Security Considerations

### Current Security Posture

**Low Risk (Static Application)**
- No backend server
- No user authentication
- No data persistence
- No sensitive data handling

### Content Security

| Concern | Current State | Recommendation |
|---------|---------------|----------------|
| External Media | YouTube, Wikipedia embeds | CSP headers on Vercel |
| XSS | React auto-escapes | Maintain React patterns |
| CORS | Handled by browser | N/A for static content |
| Dependencies | 3 production deps | Regular audit |

### Recommended CSP Headers

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  media-src 'self' https:;
  frame-src https://www.youtube.com https://www.youtube-nocookie.com;
  connect-src 'self';
```

### Dependency Security

```
Production Dependencies (3 total):
- react@19.1.1         # Well-maintained, frequent updates
- react-dom@19.1.1     # Same as react
- three@0.158.0        # Active community, regular releases

Recommendation: npm audit weekly, dependabot alerts enabled
```

---

## Technical Debt Assessment

### Critical Debt (Address in v0.2)

#### 1. Monolithic Main Component

**File:** `ForesightMindMap.jsx` (3,437 lines)

**Problem:** Single file handles 3D scene, UI, events, audio, tour integration. Violates Single Responsibility Principle.

**Impact:**
- Slow HMR during development
- Difficult to test individual features
- High cognitive load for contributors
- Memory pressure from large closure scope

**Recommended Refactor:**

```
src/
  ForesightMindMap.jsx (orchestrator, ~500 lines)
  |
  +-- scene/
  |   +-- SceneSetup.js         # Three.js initialization
  |   +-- NodeFactory.js        # Node creation functions
  |   +-- ConnectionManager.js  # Line creation/removal
  |   +-- ParticleSystem.js     # Starfield, nebulas
  |   +-- EasterEggs.js         # Enterprise, Black Swan
  |
  +-- interaction/
  |   +-- RaycastManager.js     # Click, hover detection
  |   +-- OrbitController.js    # Camera controls
  |   +-- SearchEngine.js       # Query matching
  |
  +-- ui/
  |   +-- ControlPanel.jsx      # Left-side controls
  |   +-- SearchBox.jsx         # Search input
  |   +-- AudioControls.jsx     # Binaural UI
  |   +-- AboutModal.jsx        # Credits modal
  |
  +-- hooks/
      +-- useThreeScene.js      # Scene lifecycle
      +-- useNodeInteraction.js # Click/hover state
      +-- useSearch.js          # Debounced search
```

**Effort:** 8-12 hours
**Risk:** Medium (functional code, refactoring only)

#### 2. Missing Test Infrastructure

**Problem:** Zero tests exist. Cannot verify refactoring correctness.

**Impact:**
- Regressions go unnoticed
- Refactoring is risky
- No confidence in deployments

**Recommendation:**

```bash
# Add testing dependencies
npm install -D vitest @testing-library/react jsdom

# Initial test targets
- mindMapData.js (data integrity)
- AudioManager.js (state machine)
- TourManager.js (state machine)
- Search filtering (pure function)
```

**Effort:** 4-6 hours for initial setup + tests

### Moderate Debt (Address in v0.3)

#### 3. Data File Size

**File:** `mindMapData.js` (4,054 lines)

**Problem:** All methodology content in one file. Imported entirely on load.

**Recommendation:**
- Split by pillar: `mapping.js`, `anticipating.js`, etc.
- Lazy load media arrays on node expansion
- Consider JSON format for potential CMS migration

#### 4. State Management Complexity

**Problem:** 20+ useState hooks in main component. State updates cause full re-renders.

**Recommendation:**
- Group related state with useReducer
- Consider Zustand for tour/audio global state (minimal API, ~1KB)
- Memoize expensive computations

#### 5. DiagramGallery Not Integrated

**File:** `DiagramGallery.jsx` (440 lines)

**Problem:** Component built but never wired into main app.

**Fix:** 15 minutes - add lazy import, state, and button.

### Low Priority Debt (v0.4+)

- Inline styles could use CSS-in-JS or CSS Modules
- Some magic numbers need constants
- Missing TypeScript for larger team collaboration
- No internationalization infrastructure

---

## Scalability Considerations

### Current Limits

| Dimension | Current | Comfortable Limit | Hard Limit |
|-----------|---------|-------------------|------------|
| Methodologies | 18 | 50 | 100 |
| Media Items | 142 | 500 | 1000 |
| Concurrent Users | N/A | Unlimited | Unlimited (static) |
| Node Display | 18+children | 100 | 200 (WebGL) |

### Scaling Strategies

#### Content Scaling (100+ Methodologies)

```
Problem: mindMapData.js grows linearly with content

Solution: Dynamic Data Loading
+------------------------------------------+
|  Index File (methodology-index.json)     |
|  +------------------------------------+  |
|  | { id, label, parent, color }       |  |
|  +------------------------------------+  |
+------------------------------------------+
              |
              | On node click
              v
+------------------------------------------+
|  Detail Fetch (methodology/{id}.json)    |
|  +------------------------------------+  |
|  | { details, media, caseStudies }    |  |
|  +------------------------------------+  |
+------------------------------------------+
```

#### Visual Scaling (100+ Nodes)

```
Implement Level-of-Detail (LOD):
- Far: Simple sphere, no label
- Medium: Sphere + label sprite
- Near: Full detail + glow effect

Implement Frustum Culling:
- Only render nodes in camera view
- Use Three.js built-in frustum

Implement Spatial Indexing:
- Octree for O(log n) raycasting
- Reduces CPU load significantly
```

#### Performance Scaling

```
Current: All processing on main thread

Target Architecture:
+------------------------------------------+
| Main Thread          | Web Worker        |
+------------------------------------------+
| - React UI           | - Search filtering|
| - Three.js render    | - Position calc   |
| - User input         | - Data processing |
+------------------------------------------+
              |
              | postMessage
              v
+------------------------------------------+
| SharedArrayBuffer (optional, advanced)   |
| - Node positions for physics             |
+------------------------------------------+
```

---

## Architectural Recommendations

### v0.2 Priorities (Polish & Deploy)

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 1 | Integrate DiagramGallery | 15 min | Complete feature set |
| 2 | Add Vite chunk splitting | 30 min | Better caching |
| 3 | Add CSP headers (vercel.json) | 30 min | Security |
| 4 | Setup basic tests | 4 hrs | Confidence |
| 5 | Fix tour control disappearance bug | 2 hrs | UX polish |

### v0.3 Priorities (Refactoring)

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 1 | Split ForesightMindMap.jsx | 8-12 hrs | Maintainability |
| 2 | Add Zustand for global state | 4 hrs | State clarity |
| 3 | Split mindMapData.js by pillar | 2 hrs | Load time |
| 4 | Add frustum culling | 4 hrs | Performance |

### v0.4+ Considerations

- TypeScript migration for team scale
- CMS integration for content management
- Analytics integration (Plausible)
- A/B testing infrastructure
- PWA support for offline access

### Architecture Decision Records (ADRs)

#### ADR-001: Minimal Dependencies

**Decision:** Use only React, Three.js, and Vite.

**Context:** Many 3D React projects add react-three-fiber, drei, zustand, etc.

**Rationale:**
- Smaller bundle size
- Fewer breaking changes on updates
- Direct Three.js control for custom effects
- Learning investment directly applicable

**Consequences:**
- More boilerplate for Three.js integration
- Manual implementation of patterns R3F provides
- Easier for Three.js experts, harder for React-only devs

#### ADR-002: Singleton Managers

**Decision:** AudioManager and TourManager are singletons.

**Context:** Need global audio context and tour state.

**Rationale:**
- Web Audio API requires single AudioContext
- Tour state needs consistent access across components
- Simpler than context providers for this use case

**Consequences:**
- Global state outside React
- Harder to test in isolation
- Potential issues with StrictMode double-mount

---

## Appendix: File Reference

### Source Files by Size

```
File                          Lines    Purpose
-----------------------------------------------------
mindMapData.js                4,054    Content data
ForesightMindMap.jsx          3,437    Main orchestrator
TimelineView.jsx                804    Timeline feature
EnhancedInfoPanel.jsx           664    Detail panels
AudioManager.js                 658    Audio system
GlobalMediaBrowser.jsx          491    Media grid
TourUI.jsx                      491    Tour interface
TourManager.js                  457    Tour state machine
TourCameraController.js         450    Camera animation
DiagramGallery.jsx              440    Diagram grid
FeaturedContentDashboard.jsx    374    Featured content
tourNarration.js                348    Narration scripts
tourData.js                     316    Tour segments
main.jsx                         11    React entry
App.jsx                           8    App wrapper
-----------------------------------------------------
TOTAL                        13,003
```

### Critical Paths

```
Initial Load:
index.html -> main.jsx -> App.jsx -> ForesightMindMap.jsx
                                          |
                                          +-> mindMapData.js
                                          +-> Three.js scene init

User Clicks Node:
handleClick -> raycaster.intersect -> handleNodeClick
                                          |
                                          +-> setSelectedNode
                                          +-> createChildNodes (if parent)
                                          +-> EnhancedInfoPanel (lazy)

Tour Start:
"GUIDED TOUR" button -> TourSelectionModal (lazy)
                              |
                              +-> tourManager.loadTour
                              +-> tourManager.start
                              +-> TourHUD (lazy)
```

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-28 | CTO Review | Initial architecture documentation |

---

*This document should be updated when significant architectural changes are made. Review quarterly or before major version releases.*
