# Strategic Foresight Mind Map - Test Plan

**Version:** v0.2 Pre-Release
**Last Updated:** January 28, 2026
**QA Lead:** QA Master
**Application URL:** https://futures.alexanderkline.com

---

## Table of Contents

1. [Test Strategy Overview](#1-test-strategy-overview)
2. [Browser and Device Compatibility Matrix](#2-browser-and-device-compatibility-matrix)
3. [Feature Test Cases](#3-feature-test-cases)
4. [Accessibility Test Cases](#4-accessibility-test-cases)
5. [Performance Test Cases](#5-performance-test-cases)
6. [Mobile-Specific Test Cases](#6-mobile-specific-test-cases)
7. [Regression Test Checklist](#7-regression-test-checklist)
8. [Known Issues Tracking](#8-known-issues-tracking)
9. [Bug Report Template](#9-bug-report-template)
10. [Pre-Release Checklist v0.2](#10-pre-release-checklist-v02)

---

## 1. Test Strategy Overview

### 1.1 Scope

This test plan covers the Strategic Foresight Mind Map application, an interactive 3D visualization built with React 18.2 and Three.js r158. The application includes:

- **3D Mind Map Visualization** - Interactive node-based navigation
- **Guided Tours** - 15-segment primary tour and 4-segment quick tour with audio narration
- **Audio System** - Binaural soundscapes and TTS/audio file narration
- **Media Browser** - 142+ curated resources (videos, images, articles, documents)
- **Info Panels** - 4-tab system (Overview, Media, Process, Cases)
- **Search System** - Real-time filtering with debounce
- **Timeline View** - Historical methodology timeline
- **LCARS UI** - Star Trek TNG aesthetic

### 1.2 Testing Approach

| Test Type | Approach | Priority |
|-----------|----------|----------|
| Functional | Manual + Exploratory | Critical |
| Cross-Browser | Manual on target matrix | Critical |
| Mobile/Responsive | Manual on physical devices | High |
| Accessibility | Automated (axe) + Manual | High |
| Performance | Lighthouse + Manual profiling | High |
| Regression | Checklist-based | Critical |

### 1.3 Risk Assessment

| Risk Area | Likelihood | Impact | Mitigation |
|-----------|------------|--------|------------|
| WebGL compatibility | Medium | High | Fallback messaging, browser detection |
| Audio autoplay blocked | High | Medium | User gesture required, graceful fallback |
| Memory leaks (Three.js) | Medium | High | Profiling, dispose() calls |
| Mobile touch navigation | Medium | Medium | Touch event testing, UX review |
| Safari-specific issues | High | High | Dedicated Safari testing pass |

### 1.4 Test Environment

- **Development:** `npm run dev` (localhost:5173)
- **Production Preview:** `npm run preview`
- **Staging:** [To be configured for v0.2]
- **Production:** https://futures.alexanderkline.com

---

## 2. Browser and Device Compatibility Matrix

### 2.1 Desktop Browsers (Primary Support)

| Browser | Version | Priority | WebGL | Web Audio | TTS | Status |
|---------|---------|----------|-------|-----------|-----|--------|
| Chrome | 120+ | Critical | Yes | Yes | Yes | Pending |
| Firefox | 120+ | High | Yes | Yes | Yes | Pending |
| Safari | 17+ | Critical | Yes | Yes* | Yes* | Pending |
| Edge | 120+ | High | Yes | Yes | Yes | Pending |

*Safari requires special handling for AudioContext resume and voiceschanged event

### 2.2 Mobile Browsers (Primary Support)

| Device/Browser | Version | Priority | Status |
|----------------|---------|----------|--------|
| iOS Safari | 17+ | Critical | Pending |
| iOS Chrome | 120+ | Medium | Pending |
| Android Chrome | 120+ | High | Pending |
| Samsung Internet | Latest | Medium | Pending |

### 2.3 Tablet Devices

| Device | Browser | Screen Size | Status |
|--------|---------|-------------|--------|
| iPad Pro 12.9" | Safari | 2732x2048 | Pending |
| iPad Air | Safari | 2360x1640 | Pending |
| iPad Mini | Safari | 2266x1488 | Pending |
| Android Tablet | Chrome | Various | Pending |

### 2.4 Screen Resolution Testing

| Resolution | Aspect | Device Category | Priority |
|------------|--------|-----------------|----------|
| 1920x1080 | 16:9 | Desktop HD | Critical |
| 2560x1440 | 16:9 | Desktop QHD | High |
| 3840x2160 | 16:9 | Desktop 4K | Medium |
| 1440x900 | 16:10 | MacBook | High |
| 2560x1600 | 16:10 | MacBook Pro | High |
| 1366x768 | 16:9 | Laptop | High |
| 390x844 | ~9:19 | iPhone 14 | Critical |
| 428x926 | ~9:20 | iPhone 14 Pro Max | High |
| 360x800 | 9:20 | Android Phone | High |
| 820x1180 | ~7:10 | iPad Air | High |

---

## 3. Feature Test Cases

### 3.1 3D Mind Map Visualization

#### TC-3D-001: Initial Scene Rendering
**Priority:** Critical
**Precondition:** Fresh page load

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to application URL | Page loads without errors |
| 2 | Wait for scene initialization | 3D scene renders with starfield background |
| 3 | Verify center node | "STRATEGIC FORESIGHT" node visible at center |
| 4 | Verify pillar nodes | 6 pillar nodes visible orbiting center |
| 5 | Verify connections | Curved connections visible between nodes |
| 6 | Verify bloom effect | Nodes have subtle glow effect |

#### TC-3D-002: Camera Orbit Controls
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click and drag left/right | Scene rotates horizontally |
| 2 | Click and drag up/down | Scene rotates vertically |
| 3 | Release mouse | Camera movement has damping (smooth stop) |
| 4 | Verify rotation limits | Full 360-degree horizontal rotation allowed |
| 5 | Verify polar limits | Camera cannot flip upside down |

#### TC-3D-003: Camera Zoom Controls
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Scroll mouse wheel down | Camera zooms out |
| 2 | Scroll mouse wheel up | Camera zooms in |
| 3 | Zoom to minimum | Camera stops at minimum distance (10 units) |
| 4 | Zoom to maximum | Camera stops at maximum distance (200 units) |
| 5 | Verify smooth zoom | Zoom transitions are smooth, not jumpy |

#### TC-3D-004: Node Expansion (Click to Expand Children)
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click center node | 6 pillar child nodes expand/animate into view |
| 2 | Click a pillar node | Methodology nodes for that pillar appear |
| 3 | Click expanded pillar again | Children collapse (toggle behavior) |
| 4 | Click methodology node | Info panel opens with methodology details |

#### TC-3D-005: Node Hover Effects
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over any node | Node scales up to 1.1x |
| 2 | Hover over node | Cursor changes to indicate clickable |
| 3 | Hover over node | Tooltip appears with node label |
| 4 | Move away from node | Node returns to normal scale |
| 5 | Verify no flicker | Hover state is stable, no flickering |

#### TC-3D-006: Node Selection Visual Feedback
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click a methodology node | Node scales to 1.4x |
| 2 | Observe selected node | Emissive intensity increases (brighter glow) |
| 3 | Observe connections | Connected lines become more visible (higher opacity) |
| 4 | Click different node | Previous selection deselects |

#### TC-3D-007: Animated Background Elements
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Observe starfield | Stars twinkle with varying opacity |
| 2 | Observe nebulas | Nebula clouds rotate slowly |
| 3 | Observe node floating | Nodes have subtle vertical oscillation |
| 4 | Observe connection particles | Energy particles flow along connection curves |

#### TC-3D-008: Easter Eggs (Rare Events)
**Priority:** Low

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Leave app running for extended time | Rare Black Swan or Enterprise may appear |
| 2 | If easter egg appears | Object animates across scene |
| 3 | Object exits scene boundary | Object is removed, no memory leak |

### 3.2 Guided Tour System

#### TC-TOUR-001: Tour Selection Modal
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "GUIDED TOUR" button | Tour selection modal appears |
| 2 | Verify modal content | Shows 2 tour options with descriptions |
| 3 | Verify tour metadata | Duration and segment count displayed |
| 4 | Click outside modal | Modal closes |
| 5 | Click "CANCEL" button | Modal closes |

#### TC-TOUR-002: Start Primary Tour
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open tour selection | Modal visible |
| 2 | Select "PRIMARY TOUR" | Modal closes, tour HUD appears |
| 3 | Verify loading state | "LOADING TOUR..." shown briefly |
| 4 | Tour begins | Camera animates to first position |
| 5 | Narration starts | TTS or audio file plays intro narration |
| 6 | Verify HUD | Progress bar, segment info, controls visible |

#### TC-TOUR-003: Tour HUD Controls - Pause/Resume
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During active tour | Click "PAUSE" button |
| 2 | Verify pause state | Narration stops, camera animation stops |
| 3 | Verify button change | Button now shows "RESUME" |
| 4 | Click "RESUME" | Narration continues, camera continues |

#### TC-TOUR-004: Tour HUD Controls - Next (Skip)
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During tour segment | Click "NEXT" button |
| 2 | Current narration stops | Audio/TTS immediately stops |
| 3 | Progress updates | Progress bar advances |
| 4 | Camera moves | Camera animates to next segment position |
| 5 | New narration | Next segment narration begins |

#### TC-TOUR-005: Tour HUD Controls - Exit
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During active tour | Click "EXIT" button |
| 2 | Tour ends | Narration stops immediately |
| 3 | HUD disappears | Tour HUD removed from screen |
| 4 | Free navigation | User can control camera normally |

#### TC-TOUR-006: Tour Completion
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Allow tour to complete | Progress reaches 100% |
| 2 | Final segment ends | "TOUR COMPLETE" message shown |
| 3 | After 3 seconds | HUD auto-closes |
| 4 | Verify no errors | Console shows no errors |

#### TC-TOUR-007: Tour Camera Positions (Known Issue)
**Priority:** Critical
**Note:** This is a known issue area - verify node framing on different screen sizes

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start tour on desktop (1920x1080) | Verify nodes are properly framed |
| 2 | Start tour on laptop (1366x768) | Verify nodes are properly framed |
| 3 | Start tour on tablet | Verify nodes are properly framed |
| 4 | Note any framing issues | Document problematic segments |

#### TC-TOUR-008: Tour Node Auto-Expansion
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start tour | Begin primary tour |
| 2 | When segment focuses on pillar | Pillar node auto-expands showing children |
| 3 | When segment focuses on methodology | That methodology's info is highlighted |

#### TC-TOUR-009: Tour Controls Disappearing (Known Bug)
**Priority:** Critical
**Note:** Debugging has been added but issue not resolved

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start tour | Tour HUD appears |
| 2 | Navigate through segments | HUD remains visible |
| 3 | Pause and resume tour | HUD remains visible |
| 4 | Let segment auto-advance | HUD remains visible |
| 5 | Note when controls disappear | Document exact conditions |

### 3.3 Audio System

#### TC-AUDIO-001: Binaural Audio Presets
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click audio toggle to enable | Audio starts with fade-in |
| 2 | Verify GROUNDING preset | 136.1Hz tone audible |
| 3 | Switch to CALM FLOW | Smooth transition to 210.42Hz tone |
| 4 | Switch to DEEP FOCUS | 174Hz with harmonics |
| 5 | Toggle audio off | Audio fades out smoothly |

#### TC-AUDIO-002: Audio Preset Switching
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable audio | Sound plays |
| 2 | Change preset multiple times rapidly | No audio glitches or errors |
| 3 | Disable audio during preset change | Stops cleanly |

#### TC-AUDIO-003: TTS Narration Fallback
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start guided tour | Tour begins |
| 2 | Audio file not found | TTS fallback activates |
| 3 | Verify TTS voice | Mature male voice (Alex/Daniel preferred) |
| 4 | Verify TTS rate | Slower pace (~0.85 rate) |
| 5 | TTS completes | onNarrationEnd callback fires |

#### TC-AUDIO-004: Safari AudioContext Resume
**Priority:** Critical (Safari-specific)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load page in Safari | No audio yet |
| 2 | Click to enable audio | AudioContext resumes (no blocked state) |
| 3 | Audio plays | No errors in console |

#### TC-AUDIO-005: iOS Voice Loading
**Priority:** Critical (iOS-specific)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load page on iOS Safari | Page loads |
| 2 | Start tour with TTS | Wait for voices to load (voiceschanged) |
| 3 | TTS begins | Voice selection succeeds |

### 3.4 Enhanced Info Panel

#### TC-INFO-001: Panel Open/Close
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click methodology node | Info panel slides in from right |
| 2 | Verify header | Shows methodology name and year |
| 3 | Click X button | Panel closes |
| 4 | Click collapse arrow | Panel minimizes off-screen |
| 5 | Click arrow again | Panel expands back |

#### TC-INFO-002: Tab Navigation
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open info panel | Default to "Overview" tab |
| 2 | Click "Media" tab | Media grid displays |
| 3 | Click "Process" tab | Process guide appears (if available) |
| 4 | Click "Cases" tab | Case studies appear (if available) |
| 5 | Verify tab count badges | Media count shown on Media tab |

#### TC-INFO-003: Overview Tab Content
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View Overview tab | Description visible |
| 2 | Check pioneers section | Pioneers listed with names |
| 3 | Check historical context | Historical information present |
| 4 | Check metadata | Difficulty, time, group size shown |

#### TC-INFO-004: Media Tab Functionality
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click Media tab | Grid of media items shown |
| 2 | Verify media types | Videos, images, articles, documents |
| 3 | Click video item | Video modal opens |
| 4 | Click external link | Opens in new tab |
| 5 | Verify thumbnails | Thumbnails load or show placeholders |

#### TC-INFO-005: Process Tab Content
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select methodology with process guide | Process tab visible |
| 2 | View steps | Numbered steps displayed |
| 3 | View tips | Facilitator tips shown |
| 4 | View pitfalls | Common pitfalls listed |

#### TC-INFO-006: Cases Tab Content
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select methodology with case studies | Cases tab visible |
| 2 | View case study | Title, context, outcome shown |
| 3 | Multiple cases | Can scroll through all cases |

### 3.5 Global Media Browser

#### TC-MEDIA-001: Open Media Browser
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "MEDIA BROWSER" button | Full-screen modal opens |
| 2 | Verify header | "MEDIA LIBRARY" title with count (142+) |
| 3 | Verify grid | Media cards displayed |
| 4 | Click outside modal | Modal closes |

#### TC-MEDIA-002: Type Filtering
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View filter buttons | All, Video, Image, Article, Document shown |
| 2 | Click "Video" filter | Only videos displayed |
| 3 | Verify count updates | Count reflects filtered results |
| 4 | Click "All" | All media shown again |

#### TC-MEDIA-003: Year Filtering
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open year dropdown | Years from media listed |
| 2 | Select specific year | Only items from that year shown |
| 3 | Select "All" | Full list returns |

#### TC-MEDIA-004: Search Functionality
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Type in search box | Results filter in real-time |
| 2 | Search by title | Matching titles shown |
| 3 | Search by description | Matching descriptions shown |
| 4 | Search by source | Items from that methodology shown |
| 5 | Clear search | Full list returns |

#### TC-MEDIA-005: Sort Options
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select "Newest" sort | Most recent items first |
| 2 | Select "Oldest" sort | Oldest items first |
| 3 | Select "Title" sort | Alphabetical order |

### 3.6 Search System

#### TC-SEARCH-001: Search Input Debouncing
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Focus search input | Input ready |
| 2 | Type quickly | Input updates immediately |
| 3 | After 300ms of no typing | Search results update |
| 4 | Verify no lag | UI remains responsive during typing |

#### TC-SEARCH-002: Search Results
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Search for "scenario" | Scenario Planning node highlighted/filtered |
| 2 | Search partial term | Partial matches found |
| 3 | Search non-existent term | No results, graceful handling |
| 4 | Clear search | All nodes visible again |

#### TC-SEARCH-003: Search + Node Interaction
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Search for methodology | Matching node highlighted |
| 2 | Click highlighted node | Info panel opens |
| 3 | Clear search | Node remains selected |

### 3.7 Timeline View

#### TC-TIMELINE-001: Open Timeline
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "TIMELINE" button | Timeline panel slides in from right |
| 2 | Verify header | "TEMPORAL VIEW" title shown |
| 3 | Verify eras | Era buttons displayed |
| 4 | Verify timeline entries | Methodologies listed chronologically |

#### TC-TIMELINE-002: Era Filtering
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "FOUNDATION" era | Only 1940s-1950s items shown |
| 2 | Click "MODERN" era | Only 2010s-2020s items shown |
| 3 | Click "ALL ERAS" | Full timeline restored |

#### TC-TIMELINE-003: Timeline Close
**Priority:** Low

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click X button | Timeline closes |
| 2 | 3D view fully visible | No obstructed view |

### 3.8 Control Panel (Left Side)

#### TC-CTRL-001: Control Panel Toggle (Mobile)
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | On mobile view | Control panel may be collapsed |
| 2 | Click toggle | Panel expands |
| 3 | Click toggle again | Panel collapses |

#### TC-CTRL-002: Audio Controls
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click audio toggle | Audio enables |
| 2 | Click preset buttons | Preset changes |
| 3 | Toggle off | Audio stops |

#### TC-CTRL-003: Show Relationships Toggle
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable "Show Relationships" | Cross-pillar connections appear |
| 2 | Disable toggle | Cross-pillar connections hidden |

### 3.9 About Modal

#### TC-ABOUT-001: About Modal Content
**Priority:** Low

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "ABOUT" button | About modal opens |
| 2 | Verify content | Credits, copyright, version shown |
| 3 | Verify links | External links work |
| 4 | Click X or outside | Modal closes |

---

## 4. Accessibility Test Cases

### 4.1 Keyboard Navigation

#### TC-A11Y-001: Focus Management
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load page | Focus starts on meaningful element |
| 2 | Tab through controls | Logical tab order |
| 3 | Focus visible | Focus indicator always visible |
| 4 | No focus trap | Can tab out of any component |

#### TC-A11Y-002: Keyboard Interactions
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tab to button | Focus visible |
| 2 | Press Enter/Space | Button activates |
| 3 | Tab to search | Can type in search |
| 4 | Escape key | Closes modals |

#### TC-A11Y-003: Modal Focus Trap (Intentional)
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open any modal | Focus moves to modal |
| 2 | Tab within modal | Focus stays within modal |
| 3 | Press Escape | Modal closes, focus returns |

### 4.2 Screen Reader Compatibility

#### TC-A11Y-004: ARIA Landmarks
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Use screen reader | Main landmark present |
| 2 | Navigate by landmarks | Navigation, main, complementary found |
| 3 | Verify roles | role="dialog" for modals |

#### TC-A11Y-005: ARIA Labels
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Focus info panel | aria-label describes panel |
| 2 | Focus buttons | aria-label describes action |
| 3 | Focus tour controls | Purpose announced |

#### TC-A11Y-006: Live Regions
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tour state changes | Screen reader announces state |
| 2 | Search results update | Results announced |

### 4.3 Visual Accessibility

#### TC-A11Y-007: Color Contrast
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check text contrast | 4.5:1 minimum for normal text |
| 2 | Check large text | 3:1 minimum for large text |
| 3 | Check button contrast | Sufficient contrast for controls |
| 4 | Focus indicators | High contrast focus rings |

#### TC-A11Y-008: Text Scaling
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Increase browser zoom to 200% | Layout remains usable |
| 2 | Text does not overflow | Content readable |
| 3 | No horizontal scroll | Responsive design adapts |

#### TC-A11Y-009: Motion Preferences
**Priority:** Low

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable reduced motion OS preference | Animations respect preference |

---

## 5. Performance Test Cases

### 5.1 Initial Load Performance

#### TC-PERF-001: Time to First Paint
**Priority:** High

| Metric | Target | Acceptable |
|--------|--------|------------|
| First Contentful Paint | < 1.5s | < 2.5s |
| Largest Contentful Paint | < 2.5s | < 4.0s |
| Time to Interactive | < 3.5s | < 5.0s |
| Cumulative Layout Shift | < 0.1 | < 0.25 |

#### TC-PERF-002: Bundle Size
**Priority:** High

| Asset | Current | Target |
|-------|---------|--------|
| Main JS (gzipped) | 324.65 KB | < 400 KB |
| Total Initial Load | TBD | < 1 MB |

### 5.2 Runtime Performance

#### TC-PERF-003: Frame Rate
**Priority:** Critical

| Scenario | Target FPS | Acceptable FPS |
|----------|------------|----------------|
| Idle (no interaction) | 60 | 45 |
| Camera rotation | 60 | 45 |
| Node expansion | 60 | 30 |
| Tour animation | 60 | 45 |

#### TC-PERF-004: Memory Usage
**Priority:** High

| Scenario | Target | Alert Threshold |
|----------|--------|-----------------|
| Initial load | < 50 MB | 80 MB |
| After 5 minutes | < 70 MB | 100 MB |
| After 30 minutes | < 80 MB | 150 MB |
| No memory leak | Stable | Growing > 10% |

#### TC-PERF-005: Garbage Collection
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open DevTools > Performance | Start recording |
| 2 | Interact with app for 2 minutes | Record activity |
| 3 | Check GC frequency | No excessive GC pauses |
| 4 | Check heap growth | Heap stable over time |

### 5.3 Tour Performance

#### TC-PERF-006: Tour Resource Loading
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start tour | Tour initializes quickly (< 2s) |
| 2 | Navigate segments | No loading delays between segments |
| 3 | Camera animations | Smooth 60fps transitions |
| 4 | TTS initiation | Narration starts within 500ms |

### 5.4 Lighthouse Audit

#### TC-PERF-007: Lighthouse Scores
**Priority:** High

| Category | Target | Minimum |
|----------|--------|---------|
| Performance | > 90 | > 70 |
| Accessibility | > 90 | > 80 |
| Best Practices | > 90 | > 80 |
| SEO | > 90 | > 80 |

---

## 6. Mobile-Specific Test Cases

### 6.1 Touch Interactions

#### TC-MOBILE-001: Touch Orbit
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Single finger drag | Camera rotates |
| 2 | Release finger | Damping effect applies |
| 3 | Two finger pinch out | Camera zooms in |
| 4 | Two finger pinch in | Camera zooms out |
| 5 | Touch sensitivity | Movement feels natural |

#### TC-MOBILE-002: Touch Node Selection
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tap on node | Node expands children / opens info |
| 2 | Tap vs drag detection | Taps not confused with drags |
| 3 | Small node tapping | Target size sufficient for touch |

#### TC-MOBILE-003: Touch Scroll in Panels
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open info panel | Panel scrollable |
| 2 | Scroll panel content | Content scrolls smoothly |
| 3 | Scroll doesn't affect scene | 3D scene stays still |

### 6.2 Responsive Layout

#### TC-MOBILE-004: Portrait Mode Layout
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View on phone portrait | UI elements visible |
| 2 | Control panel | Collapses or fits screen |
| 3 | Info panel | Opens from bottom (60vh) |
| 4 | 3D scene | Fills remaining space |

#### TC-MOBILE-005: Landscape Mode Layout
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Rotate to landscape | Layout adapts |
| 2 | Control panel | Positioned appropriately |
| 3 | More 3D space | Better visualization |

#### TC-MOBILE-006: Orientation Change
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Rotate device during use | Scene resizes correctly |
| 2 | Panels reposition | No overlapping elements |
| 3 | No crash | WebGL context maintained |

### 6.3 Mobile Performance

#### TC-MOBILE-007: Mobile Frame Rate
**Priority:** High

| Device Type | Target FPS | Minimum FPS |
|-------------|------------|-------------|
| iPhone 14 Pro | 60 | 45 |
| iPhone SE | 30 | 24 |
| Mid-range Android | 45 | 30 |
| Low-end Android | 30 | 20 |

#### TC-MOBILE-008: Mobile Battery Impact
**Priority:** Medium

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Use app for 10 minutes | Note battery drain |
| 2 | Compare to expectations | Not excessive for 3D app |
| 3 | Background tab | Audio stops, animations pause |

### 6.4 Mobile-Specific Features

#### TC-MOBILE-009: iOS Input Zoom Prevention
**Priority:** High

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tap search input on iOS | No auto-zoom |
| 2 | Font size of inputs | >= 16px to prevent zoom |

#### TC-MOBILE-010: iOS Audio Autoplay
**Priority:** Critical

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load page on iOS | No audio plays |
| 2 | Tap to enable audio | Audio starts |
| 3 | Start tour | Narration plays after tap |

---

## 7. Regression Test Checklist

### 7.1 Pre-Release Smoke Test

Run before every release. All must pass.

- [ ] Page loads without JavaScript errors
- [ ] 3D scene renders with all nodes
- [ ] Camera orbit controls work
- [ ] Camera zoom works
- [ ] Node click expands children
- [ ] Info panel opens on methodology click
- [ ] Search filters nodes
- [ ] Tour starts and plays narration
- [ ] Tour controls work (pause, next, exit)
- [ ] Audio toggle enables/disables sound
- [ ] Media browser opens and displays items
- [ ] About modal opens
- [ ] No console errors

### 7.2 Cross-Browser Regression

Run on all target browsers before release.

- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Edge Desktop
- [ ] iOS Safari
- [ ] Android Chrome

### 7.3 Feature-Specific Regression

Run when specific features are modified.

#### 3D Visualization Changes
- [ ] All nodes render correctly
- [ ] Node positions correct
- [ ] Connections render
- [ ] Bloom effect working
- [ ] Starfield animates
- [ ] No memory leaks after 5 minutes

#### Tour System Changes
- [ ] Tour selection modal works
- [ ] Primary tour completes
- [ ] Quick tour completes
- [ ] Camera positions correct
- [ ] TTS fallback works
- [ ] Pause/resume works
- [ ] Skip/next works
- [ ] Exit works
- [ ] HUD remains visible (known issue)

#### Audio System Changes
- [ ] All presets play
- [ ] Preset switching works
- [ ] Volume fade in/out works
- [ ] No audio glitches
- [ ] Safari AudioContext works
- [ ] iOS audio works

#### Info Panel Changes
- [ ] All tabs display correctly
- [ ] Media items load
- [ ] Process guide displays
- [ ] Case studies display
- [ ] Panel open/close works

---

## 8. Known Issues Tracking

### 8.1 Active Known Issues

| ID | Severity | Component | Description | Status | Workaround |
|----|----------|-----------|-------------|--------|------------|
| KI-001 | High | Tour System | Tour controls disappear early | Debugging added | Exit and restart tour |
| KI-002 | Medium | Tour System | Camera positions may not frame nodes correctly on all screens | Needs verification | Manual camera adjust after tour |
| KI-003 | Unknown | Browser | Safari compatibility after crossOrigin fix | Needs testing | None |
| KI-004 | Unknown | Mobile | Comprehensive mobile experience | Needs testing | Use desktop |

### 8.2 Technical Debt Items

| ID | Component | Issue | Impact |
|----|-----------|-------|--------|
| TD-001 | ForesightMindMap.jsx | 3,744 lines - needs splitting | Maintainability |
| TD-002 | mindMapData.js | 4,054 lines - could split methodologies from media | Bundle size |
| TD-003 | Tour cameras | Positions are estimates | User experience |

---

## 9. Bug Report Template

```markdown
## Bug Report

### Summary
[One-line description of the issue]

### Severity
[ ] Critical - System crash, data loss, core functionality completely broken
[ ] High - Major feature broken, significant user impact
[ ] Medium - Feature partially broken, workaround available
[ ] Low - Minor issue, cosmetic problem

### Environment
- **Browser:** [Chrome 120 / Safari 17 / Firefox 120 / etc.]
- **OS:** [macOS 14.2 / Windows 11 / iOS 17 / etc.]
- **Device:** [MacBook Pro / iPhone 14 / etc.]
- **Screen Resolution:** [1920x1080 / 390x844 / etc.]
- **App Version:** [v0.1 / staging / etc.]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Additional Context
- **Console Errors:** [Any JavaScript errors]
- **Network Errors:** [Any failed requests]
- **Screenshots/Video:** [Attach if helpful]
- **Frequency:** [Always / Sometimes / Rare]

### Possible Root Cause
[If you have a hypothesis]

---
Reported by: [Name]
Date: [YYYY-MM-DD]
```

---

## 10. Pre-Release Checklist v0.2

### 10.1 Development Completion

- [ ] All v0.2 features implemented
- [ ] DiagramGallery integrated
- [ ] Professional audio produced (ElevenLabs narration)
- [ ] Background music licensed/added
- [ ] Tour control disappearance bug fixed
- [ ] Camera positions verified on multiple screens

### 10.2 Quality Assurance

- [ ] All Critical test cases pass
- [ ] All High priority test cases pass
- [ ] Cross-browser regression complete
- [ ] Mobile testing complete
- [ ] Accessibility audit pass (WCAG 2.1 AA)
- [ ] Performance benchmarks met
- [ ] No Critical or High severity bugs open

### 10.3 Documentation

- [ ] README updated for v0.2
- [ ] ROADMAP updated
- [ ] SCRATCHPAD reflects current state
- [ ] Test results documented

### 10.4 Deployment Preparation

- [ ] Build succeeds (`npm run build`)
- [ ] Bundle size within limits
- [ ] Hosting platform configured
- [ ] Custom domain setup
- [ ] SSL certificate valid
- [ ] Analytics configured
- [ ] Social preview images created

### 10.5 Launch Readiness

- [ ] Soft launch to beta testers
- [ ] Beta feedback addressed
- [ ] Final QA pass
- [ ] Go/No-Go decision made
- [ ] Rollback plan documented

---

## Appendix A: Test Data

### A.1 Methodology Names for Search Testing

- Strategic Foresight
- Scenario Planning
- Causal Layered Analysis
- Backcasting
- Delphi Method
- Morphological Analysis
- Wild Cards
- Environmental Scanning
- Weak Signals

### A.2 Test URLs

- Production: https://futures.alexanderkline.com
- Development: http://localhost:5173

---

## Appendix B: Tool Recommendations

### Automated Testing
- **Accessibility:** axe DevTools, WAVE
- **Performance:** Lighthouse, WebPageTest
- **Visual Regression:** Percy, Chromatic

### Browser DevTools
- **Chrome:** Performance tab, Memory profiler
- **Safari:** Web Inspector
- **Firefox:** Developer Tools

### Mobile Testing
- **iOS:** Safari Web Inspector (via Mac)
- **Android:** Chrome Remote Debugging

---

**Document Version:** 1.0
**Created:** January 28, 2026
**Author:** QA Master
