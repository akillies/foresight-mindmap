/**
 * CockpitMesh — 3D LCARS Shuttlecraft Cockpit for VR/XR
 *
 * Design philosophy: Content is "on screen" — projected onto the windshield
 * glass like a heads-up display, filling the viewport. The physical cockpit
 * frame (bezels, elbows) sits at the edges. HUD readouts are at the glass
 * plane with additive-style blending, so they feel like projected light.
 *
 * Layout (from pilot's perspective):
 *   ┌─ elbow ─────── TOP STATUS ──────── elbow ─┐
 *   │ NAV           ╔═══════════════╗          │ │
 *   │ CTRL          ║  WINDSHIELD   ║    SCAN  │ │
 *   │ switches      ║  (viewport)   ║   TARGET │ │
 *   │               ╚═══════════════╝          │ │
 *   └─ elbow ──── INSTRUMENT STRIP ──── elbow ─┘
 *
 * The scanner and nav readouts are projected onto the glass edges (not
 * in separate wall-mounted panels), so they feel like part of the viewport.
 *
 * Dual-mode:
 *   - Flat-screen: parented to camera at z = -2
 *   - XR mode: placed in XR reference space at comfortable arm's length
 */
import * as THREE from 'three';
import { COLORS, VR_CONFIG } from '../constants';
import { createCockpitTextureSet } from './CockpitTextures';

const { cockpitRadius, bezelThickness, elbowSize, cockpitFlatScreenZ } = VR_CONFIG;

// Reusable color objects
const COLOR_GOLD = new THREE.Color(COLORS.secondary);
const COLOR_BLUE = new THREE.Color(COLORS.primary);
const COLOR_LAVENDER = new THREE.Color(COLORS.accent);
const COLOR_ORANGE = new THREE.Color(COLORS.highlight);
const COLOR_PANEL_BG = new THREE.Color(0x060812);

/* ── Geometry Helpers ──────────────────────────────────────── */

/**
 * Create a glow plane behind an element (AdditiveBlending for emissive halo).
 */
function createGlowPlane(width, height, color, opacity) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: opacity || 0.15,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 * Create a thin accent strip (colored edge highlight).
 */
function createAccentStrip(width, height, color) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 * Create an L-shaped LCARS elbow.
 */
function createElbowGeometry(size, thickness, depth) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(size, 0);
  shape.lineTo(size, thickness);
  shape.lineTo(thickness, thickness);
  shape.lineTo(thickness, size);
  shape.lineTo(0, size);
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
}

/**
 * Create a windshield-projected text panel.
 * Uses additive-style blending for that "projected onto glass" look.
 */
function createWindshieldPanel(width, height, texture) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 * Create a physical bezel strip (the opaque frame edge).
 */
function createBezelStrip(width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({
    color: COLOR_PANEL_BG,
    roughness: 0.7,
    metalness: 0.3,
    transparent: true,
    opacity: 0.95,
  });
  return new THREE.Mesh(geometry, material);
}

/* ── Main Cockpit Group ───────────────────────────────────── */

export function createCockpitMesh(isXR = false) {
  const group = new THREE.Group();
  group.name = 'CockpitFrame3D';

  const textures = createCockpitTextureSet();

  const R = cockpitRadius;
  const DEPTH = bezelThickness;

  // Windshield glass plane — all HUD content projects onto this Z depth
  const GLASS_Z = -R * 0.95;

  // ── Physical Frame: Top/Bottom Bezel Strips ──
  // These are the opaque frame edges surrounding the viewport
  const topBezel = createBezelStrip(R * 2.2, 0.06, DEPTH * 2);
  topBezel.position.set(0, R * 0.62, GLASS_Z - 0.01);
  group.add(topBezel);

  const bottomBezel = createBezelStrip(R * 2.2, 0.05, DEPTH * 2);
  bottomBezel.position.set(0, -R * 0.58, GLASS_Z - 0.01);
  group.add(bottomBezel);

  // ── Windshield HUD: Status Strip (top of glass) ──
  // Spans the full windshield width — planet name, FPS, GPU badge
  const statusPanel = createWindshieldPanel(R * 2.0, 0.10, textures.statusStrip.texture);
  statusPanel.position.set(0, R * 0.52, GLASS_Z);
  group.add(statusPanel);

  // ── Windshield HUD: Instrument Strip (bottom of glass) ──
  const instrumentPanel = createWindshieldPanel(R * 2.0, 0.08, textures.instrument.texture);
  instrumentPanel.position.set(0, -R * 0.50, GLASS_Z);
  group.add(instrumentPanel);

  // ── Windshield HUD: Scanner Display (right side of glass) ──
  // Fills the right windshield quadrant like a projected overlay
  const scannerPanel = createWindshieldPanel(0.60, 0.85, textures.scanner.texture);
  scannerPanel.position.set(R * 0.68, 0, GLASS_Z);
  group.add(scannerPanel);

  // ── Windshield HUD: Nav Panel (left side of glass) ──
  const navPanel = createWindshieldPanel(0.35, 0.75, textures.navPanel.texture);
  navPanel.position.set(-R * 0.72, 0, GLASS_Z);
  group.add(navPanel);

  // ── Physical Frame: Side Bezel Strips ──
  // Thin vertical strips at the viewport edges
  const leftBezelStrip = createBezelStrip(0.04, R * 1.2, DEPTH * 2);
  leftBezelStrip.position.set(-R * 0.95, 0, GLASS_Z - 0.01);
  group.add(leftBezelStrip);

  const rightBezelStrip = createBezelStrip(0.04, R * 1.2, DEPTH * 2);
  rightBezelStrip.position.set(R * 0.95, 0, GLASS_Z - 0.01);
  group.add(rightBezelStrip);

  // ── Corner Elbows ──
  // Physical LCARS elements at the frame corners
  const elbowColors = [COLOR_GOLD, COLOR_BLUE, COLOR_LAVENDER, COLOR_ORANGE];
  const elbowPositions = [
    { x: -R * 0.88, y: R * 0.55, z: GLASS_Z - 0.005, sx: 1, sy: 1 },
    { x: R * 0.88, y: R * 0.55, z: GLASS_Z - 0.005, sx: -1, sy: 1 },
    { x: -R * 0.88, y: -R * 0.50, z: GLASS_Z - 0.005, sx: 1, sy: -1 },
    { x: R * 0.88, y: -R * 0.50, z: GLASS_Z - 0.005, sx: -1, sy: -1 },
  ];

  const elbowGeo = createElbowGeometry(elbowSize, elbowSize * 0.3, DEPTH);

  for (let i = 0; i < 4; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: elbowColors[i],
      transparent: true,
      opacity: 0.9,
    });
    const elbow = new THREE.Mesh(elbowGeo, mat);
    const pos = elbowPositions[i];
    elbow.position.set(pos.x, pos.y, pos.z);
    elbow.scale.set(pos.sx, pos.sy, 1);
    group.add(elbow);

    // Glow halo behind each elbow
    const glow = createGlowPlane(elbowSize * 1.8, elbowSize * 1.8, elbowColors[i], 0.12);
    glow.position.set(pos.x, pos.y, pos.z - 0.01);
    group.add(glow);
  }

  // ── Accent Edge Strips ──
  // Colored lines along the top and bottom bezels (gradient gold → blue)
  const topAccent = createAccentStrip(R * 2.2, 0.004, COLOR_GOLD);
  topAccent.position.set(0, R * 0.62 + 0.032, GLASS_Z);
  group.add(topAccent);

  const bottomAccent = createAccentStrip(R * 2.2, 0.004, COLOR_LAVENDER);
  bottomAccent.position.set(0, -R * 0.58 - 0.028, GLASS_Z);
  group.add(bottomAccent);

  // Vertical accent strips on side bezels
  const leftAccent = createAccentStrip(0.004, R * 1.2, COLOR_GOLD);
  leftAccent.position.set(-R * 0.95 - 0.024, 0, GLASS_Z);
  group.add(leftAccent);

  const rightAccent = createAccentStrip(0.004, R * 1.2, COLOR_BLUE);
  rightAccent.position.set(R * 0.95 + 0.024, 0, GLASS_Z);
  group.add(rightAccent);

  // ── LCARS Pill Decorations ──
  const pillGeo = new THREE.BoxGeometry(0.06, 0.015, DEPTH * 0.5);
  const pillColors = [COLORS.secondary, COLORS.primary, COLORS.accent, COLORS.highlight];

  // Pills along top bezel
  for (let i = 0; i < 2; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(pillColors[i]) });
    const pill = new THREE.Mesh(pillGeo, mat);
    pill.position.set(i === 0 ? -R * 0.80 : R * 0.80, R * 0.62, GLASS_Z + DEPTH);
    group.add(pill);
  }

  // Pills along bottom bezel
  for (let i = 0; i < 2; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(pillColors[i + 2]) });
    const pill = new THREE.Mesh(pillGeo, mat);
    pill.position.set(i === 0 ? -R * 0.80 : R * 0.80, -R * 0.58, GLASS_Z + DEPTH);
    group.add(pill);
  }

  // ── Viewport Vignette ──
  // Dark gradient ring at the glass edge — defines the windshield boundary
  const vignetteGeo = new THREE.RingGeometry(R * 0.85, R * 1.15, 64);
  const vignetteMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const vignette = new THREE.Mesh(vignetteGeo, vignetteMat);
  vignette.position.set(0, 0, GLASS_Z + 0.005);
  group.add(vignette);

  // ── Windshield Glass Tint ──
  // Very subtle tinted plane over the whole viewport for "looking through glass"
  const glassTintMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(COLORS.primary).multiplyScalar(0.05),
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassTint = new THREE.Mesh(
    new THREE.PlaneGeometry(R * 2.0, R * 1.3),
    glassTintMat,
  );
  glassTint.position.set(0, 0, GLASS_Z + 0.003);
  group.add(glassTint);

  // ── Scanline Overlay ──
  // Subtle CRT effect across the windshield
  const scanlineCanvas = document.createElement('canvas');
  scanlineCanvas.width = 4;
  scanlineCanvas.height = 256;
  const slCtx = scanlineCanvas.getContext('2d');
  for (let y = 0; y < 256; y += 2) {
    slCtx.fillStyle = 'rgba(0,0,0,0.06)';
    slCtx.fillRect(0, y, 4, 1);
  }
  const scanlineTex = new THREE.CanvasTexture(scanlineCanvas);
  scanlineTex.wrapS = THREE.RepeatWrapping;
  scanlineTex.wrapT = THREE.RepeatWrapping;
  scanlineTex.repeat.set(400, 200);

  const scanlinePlane = new THREE.Mesh(
    new THREE.PlaneGeometry(R * 2.5, R * 1.5),
    new THREE.MeshBasicMaterial({
      map: scanlineTex,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  scanlinePlane.position.set(0, 0, GLASS_Z + 0.008);
  scanlinePlane.renderOrder = 999;
  group.add(scanlinePlane);

  // ── Status Dot ──
  const dotGeo = new THREE.CircleGeometry(0.008, 16);
  const dotMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(COLORS.successBright),
    transparent: true,
    depthWrite: false,
  });
  const statusDot = new THREE.Mesh(dotGeo, dotMat);
  statusDot.position.set(-R * 0.85, R * 0.52, GLASS_Z + 0.001);
  group.add(statusDot);

  // ── Return API ──

  return {
    group,

    /**
     * Update all cockpit text readouts.
     * Internally throttled by CockpitTextures (2 Hz).
     */
    updateReadouts(hudData) {
      textures.update(hudData);

      const now = performance.now();

      // Pulse the status dot
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.003);
      dotMat.opacity = 0.6 + pulse * 0.4;

      // Breathing glass tint (slow, subtle opacity oscillation)
      const breathe = 0.5 + 0.5 * Math.sin(now * 0.0008);
      glassTintMat.opacity = 0.05 + breathe * 0.06;
    },

    /**
     * Attach to camera for flat-screen mode.
     */
    attachToCamera(camera) {
      camera.add(group);
      group.position.set(0, 0, cockpitFlatScreenZ);
    },

    /**
     * Place in XR scene space.
     */
    placeInXRSpace(scene, playerPos) {
      scene.add(group);
      group.position.copy(playerPos || new THREE.Vector3(0, 0, 0));
    },

    dispose() {
      textures.dispose();

      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });

      if (group.parent) group.parent.remove(group);
    },
  };
}
