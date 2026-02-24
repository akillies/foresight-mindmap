# Roadmap Checkpoint — 2026-02-23

> Everything done, everything remaining, in priority order.
> This is the single source of truth for "what's next."

---

## What's Shipped (Main Branch at `e86074e`)

| Commit | Feature | Status |
|--------|---------|--------|
| `3215e6d` | Vite multi-page split (classic `/` + planetary `/explore`) | DEPLOYED |
| `a2f9172` | Planetary visual overhaul (cockpit, textures, LOD, spacing, media) | DEPLOYED |
| `2986041` | Layout isolation (classic spacing restored) | DEPLOYED |
| `e3dabaf` | 10x visual fidelity (MeshPhysicalMaterial, clouds, bloom, connections) | PUSHED |
| `e86074e` | Cockpit HUD overhaul (amber canopy, reticle, SFX, cosmos, llms.txt) | PUSHED |

Build: PASS. Tests: 33/33 PASS.

---

## PHASE A: QA & Stabilization (DO FIRST)

**Why**: Two major visual commits (`e3dabaf` + `e86074e`) are pushed but never visually verified. No code ships without eyes on it.

| Task | How | Pass Criteria |
|------|-----|---------------|
| A1. Planetary visual QA | Load `/explore` in browser | Amber cockpit visible, targeting reticle tracks planet, selection ring appears on click, SFX plays on hover/click/warp, planets have distinct biome materials, cloud layers animate on garden/gasGiant, galaxy sprites visible at far zoom, dust particles drift near camera |
| A2. Classic regression QA | Load `/` in browser | No amber, no cockpit, no SFX, no selection ring. Mind map looks identical to pre-overhaul. Bloom unchanged (0.85/0.8). |
| A3. Performance | FPS counter in cockpit | FPS >= 50 on `/explore` with all effects |
| A4. Responsive | Resize to 1024px and 768px | Cockpit collapses gracefully, no overflow, scanner hides |
| A5. Connection QA | Click planets, observe connections | Dashed lines animate, look clean in both `/` and `/explore` |

**Checkpoint**: If all pass → Vercel deployment is safe. If any fail → fix before moving on.

---

## PHASE B: Tech Debt Cleanup (LOW EFFORT, HIGH HYGIENE)

| Task | Effort | Risk |
|------|--------|------|
| B1. Delete `src/ForesightMindMap.refactored.jsx` | 1 min | None (orphaned) |
| B2. Gate nebulas behind `planetaryMode` in useSceneCore | 15 min | Low (just an if-check) |
| B3. Delete barrel re-export files + update test imports | 30 min | Med (test import paths change) |
| B4. Code-split GlobalStyles chunk (1.1 MB) | 1 hr | Med (lazy-load mindMapData) |

**Checkpoint**: Commit after each. Tests must pass after each.

---

## PHASE C: Content Enrichment (EXTERNAL DEPENDENCIES)

These need external input or resources — not pure code work.

| Task | Blocker | Effort |
|------|---------|--------|
| C1. Background music for tours | Need to acquire/license ambient track | External |
| C2. AIFF→MP3 conversion (19 files, 52.7 MB → ~12 MB) | Need `ffmpeg` or similar | 30 min |
| C3. Concept illustrations for methodologies | Need design/illustration work | External |
| C4. Case study graphics (Singapore, Hawaii, etc.) | Need design work | External |
| C5. Original video explainers per pillar | Need production | External |

**C2 is immediately actionable** — `ffmpeg` batch conversion. The rest need creative assets.

---

## PHASE D: Scenario Flight (NEXT MAJOR FEATURE)

Full PRD at `docs/` (TBD) + concept doc. See also: Claude memory `scenario-flight-concept.md` + `scenario-flight-prd.md`.

**Status**: Concept & Research COMPLETE. Architecture designed. Zero code written.

### D1. Scenario Content Authoring (BLOCKER)
- Write the first scenario: "AI Governance" (4 decision points, CLA layers, outcome families)
- Define state effects per choice (sustainability/technology/socialCohesion deltas)
- Map outcomes to biomes (8-10 convergent endpoints)
- Write narration text for prebriefing + each decision point + debriefing
- **This is 20-40 hours of writing work**

### D2. Data Schema + State Engine (code, ~1 day)
- Ink-inspired JSON format
- State tracking (scores, flags, choiceHistory)
- Convergent outcome mapper (state ranges → biome selection)
- New file: `src/scenario/ScenarioEngine.js`

### D3. Scenario UI (code, ~1-2 days)
- Decision overlay in CockpitFrame (choice cards, CLA layer expansion)
- Futures Triangle force bars in HUD
- Debriefing screen (flowchart, reflection prompts, export)
- New files: `src/scenario/ScenarioApp.jsx`, `src/scenario/ui/ScenarioPanel.jsx`

### D4. Scene Integration (code, ~1 day)
- Procedural planet generation from state (uses existing PlanetFactory + BiomeTextures)
- Camera transitions between decision points (extends FlightController)
- New file: `src/scenario/useScenarioScene.js`, `src/scenario/scene/ScenarioAnimator.js`

### D5. Route + Entry Point (code, ~2 hrs)
- Add `/scenario` route to Vite config
- Create `scenario.html` + `src/scenario/main.jsx`
- Add Vercel rewrite
- Add beacon planet or menu entry in planetary explorer

### D6. Alpha Testing
- Hidden alpha at `/explore?scenario` or `/scenario`
- 10-15 invited testers
- Target: 50%+ completion rate

**Checkpoint**: Each sub-phase gets its own commit. Build + test after each.

---

## PHASE E: Platform Polish (AFTER SCENARIO FLIGHT)

| Task | Priority |
|------|----------|
| E1. Subtitles/captions for tour narration (accessibility) | High |
| E2. Interactive data viz (D3.js charts for Kondratiev waves, etc.) | Medium |
| E3. Expert portraits gallery (40+ futurists mentioned) | Medium |
| E4. Comparative visuals ("which method when" matrix) | Medium |
| E5. Historical timeline of futures studies breakthroughs | Low |
| E6. Additional SVG diagrams (15 → 25-30) | Low |

---

## Priority Order

```
A (QA)  →  B (debt cleanup)  →  C2 (MP3 convert)  →  D1 (scenario content)  →  D2-D5 (scenario code)
   ↑                                                         ↑
   Must do NOW                                    Needs writing time
```

**C1, C3-C5**: Do whenever creative assets become available (parallel with anything).
**E1-E6**: After Scenario Flight ships.

---

## Architecture Summary

### Two Experiences, One Data Pool
- **Classic** (`/`) → `src/classic/main.jsx` → ClassicApp.jsx → useClassicScene
- **Planetary** (`/explore`) → `src/planetary/main.jsx` → PlanetaryApp.jsx → usePlanetaryScene
- **Shared** → `src/shared/` (hooks, scene, ui, tour, lazy, constants, audio)

### Extension Point System
Core scene lifecycle in `useSceneCore.js` with three injection points:
- **onInit** — async setup (returns cleanup fn)
- **onAnimate** — per-frame update
- **onClick** — interaction intercept (return true = handled)

### Key Files
| File | Purpose |
|------|---------|
| `src/shared/hooks/useSceneCore.js` | Shared scene lifecycle + extension points |
| `src/shared/audio/SFXManager.js` | Procedural Web Audio SFX (singleton, 6 sounds) |
| `src/planetary/constants.js` | PLANET_CONFIG, FLIGHT_CONFIG, SELECTION_RING, AMBER_ACCENT |
| `src/planetary/ui/CockpitFrame.jsx` | Amber canopy HUD with targeting reticle, scanner, console |
| `src/planetary/ui/HUDContext.jsx` | React context for cockpit data + targetScreenPos |
| `src/planetary/HUDWiring.jsx` | Renderless bridge: scene → React HUD |
| `public/llms.txt` | AI engine discoverability (AEO) |

### Tech Stack
React + Three.js v0.182.0 + Vite 7 multi-page build. WebGPU with WebGL fallback. LCARS design system (Exo 2 font). Vercel deployment.

---

## Technical Debt

### Active
- [ ] Nebula leak: renders in classic mode (gate behind `planetaryMode`)
- [ ] Barrel re-export files still exist (safe to delete, update test imports)
- [ ] `src/ForesightMindMap.refactored.jsx` orphaned backup
- [ ] Vite chunk size warning: GlobalStyles at 1.1 MB (inlined mindMapData)

### Resolved (Recent)
- [x] 10x visual fidelity — MeshPhysicalMaterial, cloud layers, bloom isolation (`e3dabaf`)
- [x] Cockpit HUD overhaul — amber canopy, targeting reticle, selection ring (`e86074e`)
- [x] Procedural SFX engine — 6 Web Audio sounds (`e86074e`)
- [x] Atmosphere shell cleanup — merged 2 shells into 1 (`e86074e`)
- [x] Asteroid belt variety — 3 geometry types, conditional spawning (`e86074e`)
- [x] llms.txt for AEO discoverability (`e86074e`)
