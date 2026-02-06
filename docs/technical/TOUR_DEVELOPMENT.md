# Tour Development Documentation

## Current State (v2.0 Museum Experience)

**Branch:** `feature/v2-museum-experience`
**Status:** Fully functional with enriched content + auto-opening nodes
**Build:** ~330 KB gzipped

---

## What We Have Built

### 1. Core Architecture

#### AudioManager (`src/AudioManager.js`)
- **Purpose**: Orchestrates all tour audio
- **Features**:
  - Background music with crossfade transitions
  - Narration playback with automatic music ducking (lowers music during speech)
  - Browser TTS fallback (Web Speech API)
  - Volume controls with smooth easing animations
  - Preloading system for seamless playback

- **TTS Fallback Logic**:
  ```javascript
  playNarration(audioUrl, ttsText)
  // 1. Try loading audio file from /public/audio/narration/
  // 2. If fails → fall back to browser TTS
  // 3. Prefer voices: Daniel (UK), Alex (macOS), Google UK
  ```

#### TourCameraController (`src/TourCameraController.js`)
- **Purpose**: Cinematic camera movements
- **Features**:
  - Catmull-Rom spline paths for smooth arcs
  - Variable speed with cubic easing
  - Orbit capability around nodes
  - Look-at targeting with smooth transitions
  - Pause/resume support

- **Movement Types**:
  - `moveTo()` - Direct movement to position
  - `moveAlongPath()` - Smooth curve through waypoints
  - `orbitAround()` - Circle around target
  - `zoomTo()` - Calculated approach angle
  - `flyby()` - Multi-node sequence

#### TourManager (`src/TourManager.js`)
- **Purpose**: State machine orchestrating the tour
- **State Flow**:
  ```
  IDLE → LOADING → PLAYING ⇄ PAUSED → SKIPPING → COMPLETED
  ```
- **Features**:
  - Synchronizes audio and camera
  - Manages tour segments (stops)
  - Event system for UI updates
  - Cinematic arc path generation

- **Arc Path Generation**:
  - Short movements (<30 units): direct
  - Medium (30-60): 2 waypoints
  - Long (>60): 3 waypoints
  - Creates "swoop" effect like Epcot rides

### 2. Content & Data

#### Tour Narration Scripts (`src/tourNarration.js`)
- **Voice Inspiration**: Carl Sagan / Buckminster Fuller / Isaac Asimov
- **Style**: Poetic yet precise, cosmic wonder, systems thinking
- **Coverage**:
  - 15 segments for Primary Tour (~15-20 min)
  - 4 segments for Quick Tour (~5 min)
  - ~200-300 words per segment

**Sample Opening:**
> "Welcome, fellow explorer of possible futures. Before you lies not merely a visualization, but a cosmos of methodologies—eighteen distinct approaches to understanding what comes next. The future, you see, is not a place we're traveling to. It's a landscape we're actively constructing, one decision, one assumption, one paradigm at a time."

#### Tour Data Structure (`src/tourData.js`)
```javascript
{
  id: 'primary',
  title: 'Journey Through Strategic Foresight',
  musicUrl: '/audio/music/ambient-futures.mp3',
  segments: [
    {
      id: 'intro-wide',
      title: 'Welcome to the Cosmos',
      cameraPosition: { x: 0, y: 80, z: 120 },
      lookAt: { x: 0, y: 0, z: 0 },
      transitionDuration: 4000,
      narrationUrl: '/audio/narration/00-intro-wide.mp3',
      narrationDelay: 1000,
      subtitle: '...'
    },
    // ... 14 more segments
  ]
}
```

**Primary Tour Segments:**
1. Intro (wide cosmos view)
2. Strategic Foresight center
3. Six Pillars overview
4. Mapping pillar
5. Futures Triangle method
6. Anticipating pillar
7. Environmental Scanning method
8. Timing pillar
9. Deepening pillar
10. Causal Layered Analysis method
11. Creating Alternatives pillar
12. Scenario Planning method
13. Transforming pillar
14. Backcasting method
15. Closing (pullback)

### 3. User Interface

#### Tour UI Components (`src/TourUI.jsx`)
- **TourLauncherButton**: Yellow/orange gradient in control panel
- **TourSelectionModal**: Choose Primary or Quick tour
- **TourHUD**: Bottom overlay during tour
  - Progress bar (gradient blue→yellow)
  - Segment info (title, subtitle, X/15)
  - Controls: PAUSE/RESUME, SKIP, EXIT

#### Volume Controls (ForesightMindMap.jsx)
- Music volume slider (default: 30%)
- Narration volume slider (default: 100%)
- Mute toggle button

---

## How It Works (User Flow)

1. **Launch**: Click "GUIDED TOUR" button in control panel
2. **Select**: Choose tour from modal
3. **Experience**:
   - Camera swoops to first position
   - Browser TTS reads narration (or plays audio file if available)
   - Music ducks during narration
   - After narration ends, camera moves to next stop
   - Repeat for all segments
4. **Control**:
   - PAUSE: Freeze camera and audio
   - SKIP: Jump to next segment
   - EXIT: Return to free exploration
5. **Complete**: Progress bar fills, "TOUR COMPLETE" message

---

## Recent Updates (2025-11-21)

### Bug Fixes
- ✅ Fixed segment ID mismatch causing tour failure
- ✅ Primary tour now works with TTS narration
- ✅ Both tours verified working

### Content Enrichment
- ✅ Added Pierre Wack's Shell oil crisis story (1972 scenarios, 1973 vindication)
- ✅ Added Sohail Inayatullah background (UNESCO Chair, East/West bridge)
- ✅ Added Herman Kahn "think the unthinkable" at RAND
- ✅ Added Motorola scanning success/failure case study
- ✅ Added Sweden 2005 Oil Independence Commission backcasting
- ✅ Added Elise Boulding "remembering the future"
- ✅ Added Buckminster Fuller quote
- ✅ Added Jim Dator's Law on ridiculous futures

### Interactive Features
- ✅ Nodes auto-open when tour focuses on them
- ✅ Info panels display methodology details during narration
- ✅ Changed "SKIP" button to "NEXT"
- ✅ Full museum experience: camera + narration + node interaction

---

## What's Missing (Production Readiness)

### Critical Path

#### 1. Professional Audio
**Music:**
- [ ] Reach out to Yagya for ambient tracks
- [ ] Get licensing/permission
- [ ] Add track to `/public/audio/music/`
- [ ] Update `tourData.js` with actual filename

**Narration:**
- [ ] Generate ElevenLabs voice (Carl Sagan inspired)
- [ ] Voice settings:
  - Warmth, wonder, gentle authority
  - Slightly slower than normal speech
  - Clear enunciation
- [ ] Generate MP3s for all 15 primary segments
- [ ] Generate MP3s for all 4 quick segments
- [ ] Place in `/public/audio/narration/`

#### 2. Camera Position Fine-Tuning
Current positions are estimates. Need to:
- [ ] Add debug mode to log actual node positions
- [ ] Test each segment camera movement
- [ ] Adjust positions for optimal framing
- [ ] Ensure smooth arcs between positions
- [ ] Test on multiple screen sizes

#### 3. Timing Optimization
- [ ] Match narration duration to audio files
- [ ] Adjust `transitionDuration` for each segment
- [ ] Set proper `narrationDelay` values
- [ ] Test `postNarrationDwell` timing
- [ ] Ensure total tour is ~15-20 minutes

### Nice-to-Have Enhancements

#### User Experience
- [ ] Add loading progress indicator
- [ ] Add "Tour starting in 3...2...1..." countdown
- [ ] Add visual highlight/glow on focused node
- [ ] Add subtitle text overlay during narration
- [ ] Add tour completion celebration/badge
- [ ] Add ability to restart tour
- [ ] Add ability to jump to specific segment

#### Technical Polish
- [ ] Optimize bundle size (currently 327 KB)
- [ ] Add error recovery (retry failed audio)
- [ ] Add analytics tracking (tour completion rate)
- [ ] Add keyboard shortcuts (space = pause, etc.)
- [ ] Add mobile-specific tour (shorter, vertical layout)
- [ ] Cache audio files in service worker

#### Content Expansion
- [ ] Add "Deep Dive" tours for each pillar
- [ ] Add "Methodology Spotlight" mini-tours
- [ ] Add "Historical Journey" chronological tour
- [ ] Add interactive quiz elements
- [ ] Add "Choose Your Own Path" branching tours

---

## Technical Details

### File Structure
```
src/
├── AudioManager.js           # Audio orchestration
├── TourCameraController.js   # Camera movements
├── TourManager.js            # State machine
├── TourUI.jsx                # UI components
├── tourData.js               # Tour configurations
├── tourNarration.js          # TTS scripts
└── ForesightMindMap.jsx      # Integration

public/
└── audio/
    ├── music/
    │   └── ambient-futures.mp3    (placeholder)
    └── narration/
        ├── 00-intro-wide.mp3      (placeholder)
        ├── 01-strategic-foresight.mp3
        └── ... (19 total files needed)
```

### Dependencies
- **Three.js**: Camera movements, Catmull-Rom curves
- **Web Speech API**: Browser TTS fallback
- **React**: UI state management

### Performance
- **Build Size**: 327 KB gzipped (+6 KB from base)
- **Tour Audio**: ~20 MB total (when files added)
- **Camera FPS**: Target 60 FPS during transitions
- **Memory**: ~50 MB for audio buffers

---

## ElevenLabs Voice Generation Guide

### Voice Profile: "Carl Sagan Futurist"

**Reference Audio**: Carl Sagan clips (Cosmos, Pale Blue Dot)

**Voice Characteristics:**
- Warm, gentle authority
- Sense of wonder and awe
- Clear, measured pace
- Slight upward inflection on key concepts
- Pauses for dramatic effect

**Settings (Recommended):**
```
Stability: 65%
Similarity: 75%
Style Exaggeration: 40%
Speaker Boost: Enabled
```

**Generation Process:**
1. Upload Carl Sagan reference clips to ElevenLabs
2. Create custom voice: "Sagan Futurist"
3. Test with sample script (00-intro-wide)
4. Adjust settings based on output
5. Generate all 19 narration files
6. Export as MP3, 192 kbps
7. Normalize audio levels (-16 LUFS)

**File Naming Convention:**
```
00-intro-wide.mp3
01-strategic-foresight.mp3
02-six-pillars.mp3
...
14-closing.mp3
quick-intro.mp3
quick-pillars.mp3
quick-scenarios.mp3
quick-close.mp3
```

---

## Testing Checklist

### Before Merging to Main

#### Functionality
- [ ] Tour launches without errors
- [ ] All 15 segments play in sequence
- [ ] Camera movements are smooth
- [ ] Audio plays correctly (music + narration)
- [ ] Music ducks during narration
- [ ] Pause/Resume works at any point
- [ ] Skip advances to next segment
- [ ] Exit returns to normal mode
- [ ] Progress bar updates correctly
- [ ] Volume controls work

#### Content Quality
- [ ] Narration matches script
- [ ] Camera frames nodes properly
- [ ] Transitions feel cinematic
- [ ] Music enhances experience
- [ ] Timing feels natural
- [ ] Total duration is 15-20 min

#### Cross-Browser Testing
- [ ] Chrome (Mac)
- [ ] Safari (Mac)
- [ ] Firefox (Mac)
- [ ] Chrome (Windows)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### Performance
- [ ] No dropped frames during tour
- [ ] Audio sync stays tight
- [ ] Memory doesn't leak
- [ ] UI remains responsive
- [ ] Works on 4+ year old hardware

---

## Deployment Strategy

### Phase 1: Soft Launch (Feature Branch)
- Test with small group
- Gather feedback
- Iterate on camera positions
- Fine-tune narration timing

### Phase 2: Beta (Staging Environment)
- Deploy to staging subdomain
- Public beta testing
- Analytics tracking
- Bug fixes

### Phase 3: Production Release
- Merge to main
- Deploy to futures.alexanderkline.com
- Announce on social media
- Monitor user engagement

---

## Future Roadmap

### v2.1: Interactive Elements
- Click nodes during tour to pause and explore
- "Dive deeper" on interesting topics
- Return to tour when ready

### v2.2: Personalization
- Choose tour focus (business, education, policy)
- Adjust tour length preference
- Save tour progress for later

### v2.3: Social Features
- Share tour with timestamp
- Group tours (synchronized viewing)
- Discussion/Q&A during tour

### v3.0: Tool Integration
- Live horizon scanning during tour
- Interactive scenario builder
- CLA workshop mode
- Futures wheel creator

---

## Contact & Support

**Developer**: Alexander Kline Consulting
**Documentation**: This file
**Issues**: GitHub Issues
**Deployment**: Netlify

---

*Last Updated: 2025-11-21*
*Status: Active Development*
