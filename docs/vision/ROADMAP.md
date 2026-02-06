# Strategic Foresight Mind Map - Development Roadmap

**Current Version:** 0.1
**Project:** Interactive 3D visualization of futures thinking methodologies
**Creator:** Alexander Kline / AK Consulting
**Website:** www.alexanderkline.com

---

## Table of Contents
1. [Vision Summary](#vision-summary)
2. [Completed (v0.1)](#completed-v01)
3. [Immediate Next Steps](#immediate-next-steps)
4. [Phase 2: Content Enrichment](#phase-2-content-enrichment)
5. [Phase 3: Experience Enhancements](#phase-3-experience-enhancements)
6. [Phase 4: Advanced Features](#phase-4-advanced-features)
7. [Technical Debt & Optimizations](#technical-debt--optimizations)
8. [Open Questions for Peer Feedback](#open-questions-for-peer-feedback)

---

## Vision Summary

Create a comprehensive, immersive educational platform for strategic foresight that combines:
- **Visual Learning**: 3D spatial navigation through interconnected methodologies
- **Guided Experience**: Carl Sagan-inspired narrated tours with Yagya ambient soundscapes
- **Rich Content**: Curated media library (videos, diagrams, case studies, papers)
- **Neuroscience-Backed**: Scientifically-validated binaural frequencies for optimal learning states
- **Accessible**: Works across desktop, tablet, and mobile devices
- **Beautiful**: LCARS-inspired Star Trek TNG aesthetic with particle starfield

**Goal:** Make futures thinking accessible, engaging, and memorable for strategists, educators, and decision-makers.

---

## Completed (v0.1)

### Core Features Built
- ✅ **3D Mind Map Visualization**
  - Six Pillars framework (Sohail Inayatullah)
  - 18 methodologies with detailed descriptions
  - 50+ curated media items (videos, images, articles, documents)
  - Interactive node selection with info panels
  - Cross-pillar relationship indicators

- ✅ **Guided Tours**
  - Primary Tour: 15-segment journey through Strategic Foresight (15-20 min)
  - Quick Tour: 4-segment highlights overview (5 min)
  - Camera positions mathematically calibrated to actual node coordinates
  - Cinematic arc movements between segments
  - Browser TTS fallback narration system
  - Pause/Resume/Skip/Exit controls

- ✅ **Audio Environment**
  - 3 scientifically-backed binaural presets:
    - GROUNDING (136.1Hz Earth + 7.83Hz Schumann)
    - CALM FLOW (210.42Hz Moon + 8Hz Alpha)
    - DEEP FOCUS (174Hz Solfeggio + 3Hz Delta)
  - Web Audio API generative soundscapes
  - Volume controls and mute

- ✅ **User Interface**
  - LCARS Star Trek TNG aesthetic
  - Real-time search with debouncing (300ms)
  - Timeline view toggle
  - Mobile-responsive design (desktop/tablet/mobile)
  - About modal with credits and copyright

- ✅ **Performance Optimizations**
  - Lazy loading for tour components (~50-60 KB savings)
  - Debounced search input
  - Debug logs removed
  - Bundle: 324.65 KB gzipped

- ✅ **Content Completeness**
  - All 18 methodologies have metadata (difficulty, time, group size, sectors, pitfalls)
  - All 18 have diagrams
  - Cross-pillar relationships documented
  - 5 methodologies have case studies

- ✅ **SEO & Accessibility**
  - JSON-LD structured data for AI discoverability
  - Open Graph and Twitter Card meta tags
  - Semantic HTML with ARIA landmarks
  - Screen reader friendly

---

## Immediate Next Steps

### 1. Audio Production (HIGH PRIORITY)
**Status:** Placeholder system working with TTS fallback

**Needed:**
- [ ] Generate 15 primary tour narrations using ElevenLabs (Carl Sagan-inspired voice)
- [ ] Generate 4 quick tour narrations
- [ ] Source Yagya background music track
- [ ] Record and add to `/public/audio/narration/` and `/public/audio/music/`

**Files to create:**
```
/public/audio/narration/
  00-intro-wide.mp3
  01-strategic-foresight.mp3
  02-six-pillars.mp3
  ... (15 total for primary tour)
  quick-intro.mp3
  quick-pillars.mp3
  quick-scenarios.mp3
  quick-close.mp3

/public/audio/music/
  ambient-futures.mp3  (Yagya track)
```

**Scripts ready:** All narration text is in `/src/tourNarration.js`

---

### 2. User Testing & Bug Fixes
**Known Issues:**
- [ ] Tour controls disappearing early (debugging added but not resolved)
- [ ] Verify camera positions frame nodes correctly on all screen sizes
- [ ] Test Safari compatibility after crossOrigin fix
- [ ] Test mobile experience comprehensively

**Testing Checklist:**
- [ ] Desktop: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Tablet: iPad Safari, Android Chrome
- [ ] Screen readers: VoiceOver, NVDA
- [ ] Keyboard navigation

---

### 3. Deployment
- [ ] Choose hosting platform (Vercel, Netlify, CloudFlare Pages)
- [ ] Set up CI/CD pipeline
- [ ] Configure custom domain (if applicable)
- [ ] Add analytics (privacy-focused: Plausible, Fathom)
- [ ] Create social share preview images

---

## Phase 2: Content Enrichment

### Expand Media Library
- [ ] **Case Studies:** Add real-world examples for remaining 13 methodologies
  - Current: 5/18 have case studies
  - Target: 18/18 with diverse sector examples
  - Examples: Shell Scenarios (energy), Singapore Futures (government), IFTF Health Horizons (healthcare)

- [ ] **Practitioner Videos:** Interview clips from foresight experts
  - Sohail Inayatullah (CLA, Six Pillars)
  - Stuart Candy (Experiential Futures)
  - Jamais Cascio (Scenarios)
  - Angela Wilkinson (Transformative Scenarios)

- [ ] **Interactive Diagrams:** Upgrade static images to interactive SVGs
  - Clickable elements with tooltips
  - Animated process flows
  - Zoomable complexity layers

- [ ] **Reading Lists:** Curated bibliography per methodology
  - Foundational papers
  - Practitioner guides
  - Academic research
  - Popular books

### Add Methodology Detail Pages
Instead of just info panels, create full methodology "deep dives":
- [ ] Step-by-step process guides
- [ ] Templates and worksheets (downloadable)
- [ ] Common pitfalls and how to avoid them
- [ ] Facilitator tips
- [ ] Time/budget planning guides

---

## Phase 3: Experience Enhancements

### Improved Tours
- [ ] **Methodology-Specific Tours:** 6 pillar-focused tours (5-7 min each)
  - "Mapping Deep Dive"
  - "Anticipating Workshop"
  - "Timing Mastery"
  - etc.

- [ ] **Use Case Tours:** Application-focused journeys
  - "Corporate Strategy Tour"
  - "Public Policy Tour"
  - "Technology Forecasting Tour"
  - "Social Change Tour"

- [ ] **Interactive Tour Choices:** Branching narratives
  - User selects their context at start
  - Tour adapts camera path and narration
  - Highlights relevant case studies

### Gamification Elements
- [ ] **Progress Tracking:** User accounts to track exploration
  - Methodologies explored
  - Media viewed
  - Tours completed

- [ ] **Achievements/Badges:** Unlock as you learn
  - "Six Pillars Explorer" - visited all pillars
  - "Deep Thinker" - read all CLA content
  - "Scenario Master" - completed scenario planning resources

- [ ] **Learning Paths:** Structured curricula
  - Beginner: Introduction to Foresight (5 methodologies)
  - Intermediate: Building Foresight Capacity (10 methodologies)
  - Advanced: Master Futurist (all 18 + cross-pillar synthesis)

### Social Features
- [ ] **Share Discoveries:** Generate shareable cards
  - "I'm exploring Causal Layered Analysis..."
  - Beautiful og:image with node visualization
  - Link back to specific methodology

- [ ] **Community Contributions:** User-submitted case studies
  - Moderated submissions
  - Upvoting/curation
  - Attribution to contributors

---

## Phase 4: Advanced Features

### AI-Powered Assistance
- [ ] **Foresight Coach Chatbot:** Help users apply methodologies
  - "I'm working on healthcare strategy, which methods should I use?"
  - Provides step-by-step guidance
  - Suggests combinations of methods
  - RAG on academic foresight literature

- [ ] **Scenario Generator:** AI-assisted scenario building
  - Input: Domain, uncertainties, time horizon
  - Output: 4 plausible scenarios with narratives
  - Based on morphological analysis + LLM creativity

### Visualization Enhancements
- [ ] **VR Mode:** Immersive 3D navigation with WebXR
  - Walk through the mind map cosmos
  - Hand controllers to grab and examine nodes
  - Spatial audio narration

- [ ] **Network Graph View:** Alternative 2D force-directed layout
  - For users who prefer traditional network diagrams
  - Toggle between 3D cosmos and 2D network

- [ ] **Temporal Dimension:** Animate methodology evolution
  - Show when each methodology was developed
  - Playback timeline of foresight field development
  - Highlight paradigm shifts

### Collaboration Tools
- [ ] **Workshop Mode:** Multi-user collaboration
  - Facilitator can guide group through shared view
  - Participants see same camera position
  - Annotation tools for discussion
  - Export session notes

- [ ] **Method Mixer:** Interactive tool for combining methods
  - Drag methodologies onto canvas
  - Shows synergies and conflicts
  - Suggests optimal sequences
  - Generates workshop agenda

---

## Technical Debt & Optimizations

### Code Architecture Improvements
- [ ] **Split ForesightMindMap.jsx** (3,744 lines → multiple files)
  - Extract node creation functions → `NodeFactory.js`
  - Extract event handlers → `InteractionHandlers.js`
  - Extract rendering logic → `SceneRenderer.js`
  - Extract search/filter → `SearchEngine.js`

- [ ] **Component Memoization:** Prevent unnecessary re-renders
  - React.memo on InfoPanel components
  - React.memo on Tour buttons
  - React.memo on Control panel items
  - useMemo for expensive computations (getDescendantIds, position calculations)

- [ ] **Virtual Scrolling:** Only render visible nodes
  - Implement frustum culling for off-screen nodes
  - Dynamically destroy far nodes
  - Regenerate as camera approaches

### Performance Optimizations
- [ ] **Web Workers:** Offload heavy computation
  - Cross-pillar relationship calculations
  - Search filtering on large datasets
  - Audio processing

- [ ] **Optimize mindMapData.js** (4,054 lines)
  - Minify description strings (remove extra whitespace): ~10 KB savings
  - Split into chunks (methodologies vs media): lazy load media on node click
  - Consider shorter property names with mapping

- [ ] **Texture Optimization:** Reduce image sizes
  - Compress diagrams with WebP format
  - Lazy load images as nodes are approached
  - Use thumbnails + full-res on click

- [ ] **Three.js Audit:** Remove unused imports
  - Check if all imported Three.js modules are used
  - Potential 20-50 KB savings

### Browser Compatibility
- [ ] **Cross-browser audio testing:** Verify Web Audio API across browsers
- [ ] **Mobile performance:** Profile on mid-range Android devices
- [ ] **Accessibility audit:** Professional WCAG 2.1 AA compliance review

---

## Open Questions for Peer Feedback

### Content Questions
1. **Methodology Completeness:** Are there critical foresight methods missing?
   - Delphi Technique is included, but what about Real-Time Delphi?
   - Should we add Horizon Scanning as distinct from Environmental Scanning?
   - Three Horizons framework (Bill Sharpe)?

2. **Pillar Organization:** Is the Six Pillars grouping intuitive?
   - Some methodologies could fit multiple pillars
   - Should we show cross-pillar connections more prominently?

3. **Case Study Selection:** Are the examples diverse enough?
   - Geographic diversity (currently Western-heavy)
   - Sector diversity (corporate vs public vs NGO)
   - Scale diversity (local to global)

### Design Questions
4. **LCARS Aesthetic:** Does the Star Trek theme enhance or distract?
   - Is it too "geeky" for corporate strategists?
   - Does it make the content feel less serious/academic?
   - Alternative: More minimal/modern UI?

5. **3D vs 2D:** Is 3D visualization worth the complexity?
   - Does spatial navigation aid learning or hinder it?
   - Should we offer 2D fallback as default?

6. **Audio Ambience:** Do users want background audio?
   - Is generative binaural audio too experimental?
   - Should we offer silence by default?
   - Need user testing on preference

### Experience Questions
7. **Tour Length:** Are 15-20 min tours too long?
   - Attention span concerns
   - Should we split into 5-minute chapters?

8. **Narration Tone:** Carl Sagan-inspired poetic style - appropriate?
   - Too lyrical for business users?
   - Perfect for educational context?
   - Should we offer "executive summary" alternative?

9. **Mobile Experience:** Can we deliver value on small screens?
   - Is 3D navigation too complex on touch?
   - Should mobile get a different interface entirely?

### Technical Questions
10. **Data Management:** Should we move to a CMS?
    - Currently all content is hardcoded in `mindMapData.js`
    - Pros of CMS: easier updates, community contributions
    - Cons: added complexity, hosting costs

11. **User Accounts:** Do we need authentication?
    - For progress tracking: yes
    - For public access: no
    - Hybrid: optional accounts?

12. **Analytics & Privacy:** How much tracking is ethical?
    - What's useful: page views, tour completions, methodology popularity
    - Privacy-first: no user identification, aggregate only
    - Tool: Plausible vs Google Analytics?

---

## Priority Roadmap (Recommended Sequence)

### v0.2 - Polish & Deploy (2-4 weeks)
1. Generate ElevenLabs narration audio
2. Source Yagya background music
3. Fix tour control disappearance bug
4. Comprehensive cross-browser testing
5. Deploy to production hosting
6. Soft launch to friends & peers

### v0.3 - Content Expansion (1-2 months)
1. Add case studies for all 18 methodologies
2. Expand media library with practitioner videos
3. Create methodology detail pages
4. Add downloadable templates/worksheets

### v0.4 - Advanced Tours (1-2 months)
1. Build 6 pillar-focused tours
2. Create use-case specific tours
3. Implement progress tracking (optional accounts)
4. Add achievement system

### v1.0 - Full Platform (3-6 months)
1. AI Foresight Coach chatbot
2. VR mode with WebXR
3. Collaboration/workshop mode
4. Community contribution system
5. Professional accessibility audit
6. Public launch with marketing

---

## Notes & Credits

**Development Start:** November 2024
**Current Status:** v0.1 functional prototype
**Technology Stack:** React 18.2, Three.js r158, Vite 5.0, Web Audio API
**Bundle Size:** 324.65 KB gzipped

**Key Frameworks:**
- Six Pillars of Futures Thinking (Sohail Inayatullah)
- Causal Layered Analysis (Sohail Inayatullah)
- Scenario Planning (Pierre Wack, Shell)
- Futures Triangle (Sohail Inayatullah)

**Audio Research:**
- Schumann Resonance: 7.83Hz (Pobachenko et al., 2006; NASA studies)
- Planetary Frequencies: Hans Cousto's "The Cosmic Octave"
- Alpha/Theta/Delta entrainment: Peer-reviewed binaural beat research
- 432Hz vs 440Hz: Calamassi & Pomponi, 2019

**Creator:** Alexander Kline
**Organization:** AK Consulting
**Website:** www.alexanderkline.com
**Copyright:** © 2024 Alexander Kline / AK Consulting. All rights reserved.

**Built with:** Claude Code by Anthropic

---

## Feedback & Contributions

This roadmap is a living document. As peers provide feedback, we'll refine priorities and add new ideas.

**Questions to explore with peers:**
- What resonates most from v0.1?
- What feels missing or incomplete?
- Which Phase 2-4 features excite you most?
- Any methodologies we should add?
- How would you use this in your work?

**Contact:** See www.alexanderkline.com for inquiries.
