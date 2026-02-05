# SCRATCHPAD - Session Continuity Document

**Strategic Foresight Mind Map - Living Development Notes**

This document serves as the **quick-reference continuity scratchpad** for ongoing development. Update at the end of each session for seamless handoffs.

---

## Current Status

### Version & Branch
- **Version**: v0.1 (Content Richness Overhaul Complete)
- **Current Branch**: `main`
- **Last Merged Feature**: `feature/content-richness-overhaul` (merged Dec 5, 2025)
- **Build Status**: Production-ready, 324.65 KB gzipped
- **Production URL**: https://futures.alexanderkline.com
- **Hosting**: Vercel (already deployed)
- **ElevenLabs Voice ID**: `kxiHSAoBC3AYooCDRGAY` (custom trained voice)

### Last Session
- **Date**: January 28, 2026
- **Focus**: Documentation audit and scratchpad creation
- **Branch**: `main`
- **Key Activity**: Information architecture assessment

---

## What's Complete (v0.1 Checklist)

### Core Features
- ✅ **3D Mind Map Visualization** - Six Pillars + 18 methodologies
- ✅ **Interactive Navigation** - Orbit, zoom, click to expand
- ✅ **Search System** - Real-time filtering with 300ms debounce
- ✅ **Media Integration** - 142+ curated resources (videos, images, articles, docs)
- ✅ **Enhanced Info Panels** - 4-tab system (Overview, Media, Process, Cases)
- ✅ **Featured Content Dashboard** - Right-side showcase with auto-rotation
- ✅ **Global Media Browser** - Filterable grid view of all media
- ✅ **Diagram Gallery** - Component created (not yet integrated)
- ✅ **Tour System** - 15-segment primary tour + 4-segment quick tour
- ✅ **TTS Audio** - 19 narration files (Mac voices, placeholder quality)
- ✅ **Binaural Audio** - 3 scientifically-backed presets (Grounding, Calm Flow, Deep Focus)
- ✅ **LCARS UI** - Star Trek TNG aesthetic throughout
- ✅ **Mobile Responsive** - Works on desktop, tablet, mobile
- ✅ **SEO Optimized** - JSON-LD structured data, Open Graph tags
- ✅ **Performance Optimized** - Lazy loading, debounced search

### Content Completeness
- ✅ All 18 methodologies have enriched content
- ✅ All have metadata (difficulty, time, group size, sectors, pitfalls)
- ✅ All have process guides and case studies
- ✅ 142+ media items curated and categorized
- ✅ 15 custom SVG diagrams created
- ✅ Historical context and pioneers documented
- ✅ Cross-pillar relationships mapped

---

## In Progress / Next Up

### High Priority (v0.2 - Polish & Deploy)

#### 1. Complete Diagram Gallery Integration
**Status**: Component built (`DiagramGallery.jsx`) but not integrated
**Remaining Work**: 5-10 minutes
- [ ] Add lazy import to `ForesightMindMap.jsx`
- [ ] Add `showDiagramGallery` state
- [ ] Add "VIEW DIAGRAMS" button to control panel
- [ ] Add Suspense wrapper in render
- [ ] Test open/close functionality

#### 2. Professional Audio Production
**Status**: TTS placeholders working, need upgrade
**Priority**: Critical for production
- [ ] Generate ElevenLabs narration (Carl Sagan-inspired voice)
  - 15 primary tour narrations
  - 4 quick tour narrations
  - Settings: Stability 65%, Similarity 75%, Style 40%
- [ ] Source/license Yagya ambient music track
- [ ] Replace placeholder AIFF files with MP3s
- [ ] Normalize audio levels (-16 LUFS)

#### 3. Deployment Preparation
**Status**: Not started
**Target Platform**: Netlify or Vercel
- [ ] Choose hosting platform
- [ ] Configure build settings
- [ ] Set up custom domain (e.g., mindmap.theboundarylayer.com)
- [ ] Add privacy-focused analytics (Plausible or Fathom)
- [ ] Create social share preview images

### Medium Priority (v0.3 - Content Expansion)

#### 4. Quick Access Shortcuts
**Status**: Planned, not started
- [ ] Add shortcut panel to control panel
- [ ] Quick links to: Featured Videos, Diagrams, Media, Timeline
- [ ] Consider keyboard shortcuts (D for diagrams, M for media, T for timeline)

#### 5. Testing & QA
**Status**: Partial testing done
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Performance profiling on 4+ year old hardware
- [ ] Screen reader compatibility (VoiceOver, NVDA)
- [ ] Keyboard navigation verification

---

## Blockers & Open Questions

### Current Blockers
- **None** - All critical path items are unblocked

### Open Questions

1. **Audio Strategy**: ✅ DECIDED - Using ElevenLabs with custom trained voice
   - **Voice ID**: `kxiHSAoBC3AYooCDRGAY`
   - **Action**: Generate 19 narration files using this voice

2. **Deployment Domain**: ✅ DECIDED - Already live
   - **URL**: https://futures.alexanderkline.com
   - **Platform**: Vercel

3. **Analytics Privacy**: Still open
   - **Options**: Plausible (privacy-first), Fathom (simple), Google Analytics (robust)
   - **Decision Needed**: Privacy vs. feature trade-off

4. **Media Content Quality**: CRITICAL
   - **Issue**: Many dead links, broken YouTube videos, thin content
   - **Action Needed**: Full media audit and replacement/enhancement

---

## Quick Commands

### Development
```bash
# Start dev server
npm run dev
# Opens http://localhost:5173

# Build for production
npm run build
# Output to dist/

# Preview production build
npm run preview

# Regenerate TTS audio (Mac voices)
node generate-tts-audio.mjs
```

### Git Workflow
```bash
# Check current status
git status
git branch

# View recent work
git log --oneline -10

# Create feature branch
git checkout -b feature/branch-name

# Commit changes
git add .
git commit -m "Description"

# Merge to main
git checkout main
git merge feature/branch-name
```

### Testing
```bash
# Check bundle size
npm run build
# Look for dist/assets/*.js.gz sizes

# Test audio system
# 1. Start dev server
# 2. Click "GUIDED TOUR"
# 3. Verify narration plays
```

---

## Key File Locations

### Core Application
- **Main Component**: `/src/ForesightMindMap.jsx` (3,744 lines)
- **Data Structure**: `/src/mindMapData.js` (4,054 lines, 142+ media items)
- **App Entry**: `/src/App.jsx`, `/src/main.jsx`
- **Styles**: `/src/index.css`

### New Features (v0.1)
- **Featured Dashboard**: `/src/FeaturedContentDashboard.jsx`
- **Enhanced Info Panel**: `/src/EnhancedInfoPanel.jsx`
- **Media Browser**: `/src/GlobalMediaBrowser.jsx`
- **Diagram Gallery**: `/src/DiagramGallery.jsx` (not yet integrated)

### Tour System
- **Audio Manager**: `/src/AudioManager.js`
- **Camera Controller**: `/src/TourCameraController.js`
- **Tour Manager**: `/src/TourManager.js`
- **Tour UI**: `/src/TourUI.jsx`
- **Tour Data**: `/src/tourData.js`
- **Narration Scripts**: `/src/tourNarration.js`
- **Audio Files**: `/public/audio/narration/*.aiff` (19 files)

### Documentation
- **Master Spec**: `/Users/adminster/foresight/PROJECT_MASTER.md` (parent directory)
- **Roadmap**: `/ROADMAP.md`
- **README**: `/README.md`
- **Content Guide**: `/CONTENT_STRUCTURE.md`
- **Tour Docs**: `/TOUR_DEVELOPMENT.md`
- **Session Notes**: `/SESSION_SUMMARY.md`
- **This File**: `/SCRATCHPAD.md`

---

## Recent Decisions (Decision Log)

### 2025-12-05: Content Richness Overhaul
- **Decision**: Surface all 142+ media items prominently
- **Rationale**: Content wealth was hidden, needed discoverability
- **Implementation**: Featured Dashboard + Global Browser + Enhanced Panels
- **Outcome**: Successful, merged to main

### 2025-12-05: Tab-Based Info Panels
- **Decision**: Replace 650-line scroll with 4-tab system
- **Rationale**: Better organization, reduced cognitive load
- **Tabs**: Overview, Media, Process, Cases
- **Outcome**: Much improved UX

### 2025-12-05: TTS Audio Generation
- **Decision**: Use Mac `say` command as placeholder
- **Rationale**: Fast iteration, can upgrade to ElevenLabs later
- **Voice**: Alex (Mac default)
- **Outcome**: Functional, needs quality upgrade for production

### 2025-11-22: Tour Auto-Opening Nodes
- **Decision**: Nodes auto-expand when tour focuses on them
- **Rationale**: Full museum experience - visual + audio + interaction
- **Implementation**: Tour Manager triggers node expansion
- **Outcome**: Seamless guided experience

### 2025-11-22: Changed "SKIP" to "NEXT"
- **Decision**: Rename tour control button
- **Rationale**: "NEXT" feels more guided, "SKIP" feels like you're missing something
- **Outcome**: Better UX language

---

## Known Issues

### Active Bugs
- **Dead Links / Broken Videos**: Many media items have broken YouTube links or dead URLs (needs full audit)
- **Asset Shortage**: Content feels thin in places, need more compelling media
- **Tour Controls Disappearing**: Known intermittent bug (see TEST_PLAN.md)

### Technical Debt
1. **ForesightMindMap.jsx** - Very large (3,744 lines), should be refactored
   - Consider splitting: NodeFactory, InteractionHandlers, SceneRenderer
   - Not blocking, but would improve maintainability

2. **mindMapData.js** - Large file (4,054 lines)
   - Could split methodologies from media
   - Lazy load media on demand
   - Not urgent, bundle size is acceptable

3. **Camera Position Calibration** - Tour cameras are estimates
   - Need debug mode to log actual node positions
   - Fine-tune for optimal framing
   - Do this after audio is final

---

## Performance Metrics

### Current Benchmarks
- **Bundle Size**: 324.65 KB gzipped
- **Initial Load**: ~2-3 seconds
- **Time to Interactive**: ~3-4 seconds
- **Frame Rate**: 60 FPS (desktop), 30+ FPS (mobile)
- **Memory Usage**: ~50 MB base, +20 MB with audio
- **Lighthouse Score**: Not yet measured

### Targets
- Bundle Size: < 400 KB gzipped
- Initial Load: < 3 seconds
- Time to Interactive: < 4 seconds
- Frame Rate: 60 FPS desktop, 30+ mobile
- Lighthouse Performance: > 90

---

## Useful Context for AI Agents

### Project Philosophy
This is not just a mind map - it's a **living museum** of futures thinking knowledge. Every decision should prioritize:
1. **Content Richness**: Surface the wealth of curated resources
2. **Spatial Learning**: Use 3D navigation to reinforce conceptual relationships
3. **Historical Connection**: Link users to original pioneers and foundational materials
4. **Beautiful Experience**: LCARS aesthetic, smooth animations, polished UI
5. **Accessibility**: Works everywhere, for everyone

### Technology Choices
- **React + Three.js**: No additional dependencies, vanilla JavaScript
- **Vite**: Fast dev server, optimal production builds
- **No Redux/MobX**: Native React hooks for state management
- **Manual Controls**: Custom orbit implementation, no OrbitControls dependency
- **Lazy Loading**: All new components use React.lazy + Suspense

### Content Curation Standards
- **Authenticity**: Original thinkers preferred over secondary sources
- **Historical Value**: Foundational materials prioritized
- **Educational Quality**: Clear explanations over academic jargon
- **Accessibility**: Publicly available, no paywalls
- **Diversity**: Multiple perspectives, global reach

---

## Next Session Checklist

When resuming work, complete these steps:

1. **Check Branch**
   ```bash
   cd /Users/adminster/foresight/foresight-mindmap
   git branch
   git status
   ```

2. **Review Recent Changes**
   ```bash
   git log --oneline -5
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Pick Next Task** (see "In Progress / Next Up" section above)

5. **Update This File** at end of session with:
   - What was completed
   - What's next
   - Any new blockers or decisions
   - Updated "Last Session" metadata

---

## Emergency Recovery

If project state is unclear:

1. **Check Git Status**
   ```bash
   git status
   git log --oneline -10
   git branch -a
   ```

2. **Verify Build Works**
   ```bash
   npm run build
   # Should complete without errors
   ```

3. **Check Documentation**
   - `/ROADMAP.md` - Overall development plan
   - `/SESSION_SUMMARY.md` - Last session details
   - `/TOUR_DEVELOPMENT.md` - Tour system specifics
   - This file (`/SCRATCHPAD.md`) - Quick reference

4. **Test Application**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   # Click around, test tours, verify media browser
   ```

---

## Architecture Quick Reference

### Component Map
```
ForesightMindMap.jsx (3,437 lines) - Main orchestrator
    |
    +-- Three.js Scene (inline)
    |   +-- Starfield, Nebulas, Nodes, Connections, Easter Eggs
    |
    +-- Lazy Components
        +-- EnhancedInfoPanel.jsx (664 lines) - Methodology details
        +-- FeaturedContentDashboard.jsx (374 lines) - Featured content
        +-- GlobalMediaBrowser.jsx (491 lines) - Media grid
        +-- TimelineView.jsx (804 lines) - Historical timeline
        +-- TourUI.jsx (491 lines) - Tour controls
        +-- DiagramGallery.jsx (440 lines) - NOT YET INTEGRATED
```

### Key Modules
| Module | Purpose | Pattern |
|--------|---------|---------|
| `AudioManager.js` | Binaural audio, TTS, volume | Singleton |
| `TourManager.js` | Tour state machine, segments | Singleton |
| `TourCameraController.js` | Camera animation paths | Utility |
| `mindMapData.js` | 18 methodologies, 142+ media | Static data |
| `tourData.js` | Tour segments, camera positions | Static data |

### State Management
- **React useState**: UI state, selection, search
- **React useRef**: 3D objects, animation, mutable state
- **Singletons**: audioManager, tourManager (global)

### Bundle Size
- Main: ~125 KB gzipped
- Three.js: ~195 KB gzipped
- Total: ~320 KB gzipped
- Target: < 400 KB

### Critical Technical Debt
1. **ForesightMindMap.jsx too large** - Split into scene/, interaction/, ui/ modules
2. **No tests** - Add Vitest for AudioManager, TourManager, search
3. **DiagramGallery not integrated** - 15 min fix
4. **20+ useState hooks** - Consider useReducer or Zustand

### Full Architecture Details
See **ARCHITECTURE.md** for comprehensive diagrams, data flow, and recommendations.

---

## Stakeholder Communication

### For The Boundary Layer (Alexander Kline)
- **Current State**: v0.1 complete, content-rich, fully functional
- **Ready for**: Beta testing with small group
- **Needs Before Public Launch**:
  1. Professional narration audio (ElevenLabs)
  2. Background music licensing (Yagya)
  3. Hosting setup and domain configuration
  4. Social media preview images
  5. Cross-browser QA testing
- **Timeline Estimate**: 2-4 weeks to production-ready
- **Next Milestone**: Deploy to staging for feedback

---

## Resources & References

### Documentation Hierarchy
1. **PROJECT_MASTER.md** (parent dir) - Complete vision, technical spec, philosophy (2,868 lines)
2. **ARCHITECTURE.md** - System architecture, components, data flow, tech debt (NEW)
3. **ROADMAP.md** - Development phases, feature planning (456 lines)
4. **SCRATCHPAD.md** (this file) - Day-to-day continuity and quick reference
5. **SESSION_SUMMARY.md** - Detailed last session notes (432 lines)
6. **README.md** - User-facing project overview (358 lines)
7. **TOUR_DEVELOPMENT.md** - Tour system technical details (423 lines)
8. **CONTENT_STRUCTURE.md** - Data structure guide for methodologies (239 lines)

### External Links
- **The Boundary Layer**: https://theboundarylayer.substack.com
- **ElevenLabs**: https://elevenlabs.io (for narration)
- **Netlify**: https://netlify.com (deployment option)
- **Vercel**: https://vercel.com (deployment option)
- **Plausible Analytics**: https://plausible.io (privacy-first analytics)

---

**Last Updated**: January 28, 2026
**Updated By**: Documentation Architect AI
**Next Review**: End of next development session
