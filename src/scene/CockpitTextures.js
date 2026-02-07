/**
 * CockpitTextures — Canvas-based text rendering for 3D cockpit HUD panels.
 *
 * Each panel has an offscreen canvas + CanvasTexture. Text is drawn using
 * LCARS monospace styling. Textures update at a throttled rate (2 Hz) to
 * avoid per-frame canvas redraws in VR.
 *
 * Pattern mirrors BiomeTextures.js but for HUD readout text instead of terrain.
 */
import * as THREE from 'three';
import { COLORS, VR_CONFIG } from '../constants';

const FONT = '"Courier New", Consolas, monospace';
const LABEL_SIZE = 11;
const VALUE_SIZE = 14;
const HEADER_SIZE = 12;
const LINE_HEIGHT = 18;

// Biome label mapping (mirrors CockpitFrame.jsx)
const BIOME_LABELS = {
  ocean: 'OCEANIC',
  desert: 'ARID',
  crystal: 'CRYSTALLINE',
  volcanic: 'VOLCANIC',
  garden: 'VERDANT',
  gasGiant: 'GAS GIANT',
};

/* ── Helpers ───────────────────────────────────────────────── */

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { canvas, ctx, texture };
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawLabel(ctx, text, x, y, color) {
  ctx.font = `700 ${LABEL_SIZE}px ${FONT}`;
  ctx.fillStyle = color || COLORS.textMuted;
  ctx.letterSpacing = '1.5px';
  ctx.fillText(text.toUpperCase(), x, y);
  ctx.letterSpacing = '0px';
}

function drawValue(ctx, text, x, y, color) {
  ctx.font = `700 ${VALUE_SIZE}px ${FONT}`;
  ctx.fillStyle = color || COLORS.text;
  ctx.fillText(text, x, y);
}

function drawHeader(ctx, text, x, y, color) {
  ctx.font = `700 ${HEADER_SIZE}px ${FONT}`;
  ctx.fillStyle = color || COLORS.secondary;
  ctx.letterSpacing = '2px';
  ctx.fillText(text.toUpperCase(), x, y);
  ctx.letterSpacing = '0px';
}

function drawDivider(ctx, x, y, width, color) {
  ctx.strokeStyle = color || `${COLORS.textMuted}40`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.stroke();
}

/* ── Status Strip (Top Bezel) ─────────────────────────────── */

export function createStatusStripTexture() {
  const { canvas, ctx, texture } = createCanvas(1024, 64);
  return { canvas, ctx, texture, lastData: null };
}

export function updateStatusStripTexture(handle, data) {
  const { ctx, texture } = handle;
  const { planetName, nodeCount, fps, gpuBackend, accentColor } = data;

  clearCanvas(ctx);

  // Background with subtle gradient
  ctx.fillStyle = 'rgba(10, 12, 28, 0.85)';
  ctx.fillRect(0, 0, 1024, 64);

  // Planet name (left)
  drawValue(ctx, (planetName || 'STRATEGIC FORESIGHT').toUpperCase(), 20, 38, accentColor || COLORS.primary);

  // Node count (center)
  drawLabel(ctx, 'NODES', 480, 26);
  drawValue(ctx, String(nodeCount || 0), 480, 46, COLORS.text);

  // FPS (center-right)
  const fpsVal = fps || 0;
  const fpsColor = fpsVal >= 50 ? COLORS.success : fpsVal >= 30 ? COLORS.warning : COLORS.pink;
  drawLabel(ctx, 'FPS', 600, 26);
  drawValue(ctx, String(fpsVal), 600, 46, fpsColor);

  // GPU badge (right)
  const backend = (gpuBackend || 'WebGL').toUpperCase();
  const isGPU = backend.includes('WEBGPU');
  drawValue(ctx, backend, 780, 38, isGPU ? COLORS.successBright : COLORS.secondary);

  texture.needsUpdate = true;
}

/* ── Scanner Display (Right Bezel) ────────────────────────── */

export function createScannerTexture() {
  const { canvas, ctx, texture } = createCanvas(512, 512);
  return { canvas, ctx, texture, lastData: null };
}

export function updateScannerTexture(handle, data) {
  const { ctx, texture } = handle;
  const { planetName, biome, childrenCount, mediaCount, description, accentColor } = data;

  clearCanvas(ctx);

  // Background
  ctx.fillStyle = 'rgba(6, 8, 18, 0.9)';
  ctx.fillRect(0, 0, 512, 512);

  // Recessed border effect
  ctx.strokeStyle = `${accentColor || COLORS.primary}25`;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 504);

  const isCenterStar = !planetName || planetName.toUpperCase() === 'STRATEGIC FORESIGHT';

  if (isCenterStar) {
    drawLabel(ctx, 'AWAITING TARGET', 160, 260, '#556677');
    texture.needsUpdate = true;
    return;
  }

  let y = 40;

  // Header
  drawHeader(ctx, 'SCAN TARGET', 20, y, accentColor);
  y += 10;
  drawDivider(ctx, 20, y, 472, `${accentColor}40`);
  y += LINE_HEIGHT + 4;

  // Designation
  drawLabel(ctx, 'DESIGNATION', 20, y);
  y += LINE_HEIGHT;
  drawValue(ctx, (planetName || 'UNKNOWN').toUpperCase(), 20, y, accentColor);
  y += LINE_HEIGHT + 8;

  // Biome
  if (biome) {
    drawLabel(ctx, 'BIOME CLASS', 20, y);
    y += LINE_HEIGHT;
    drawValue(ctx, BIOME_LABELS[biome] || biome.toUpperCase(), 20, y, accentColor);
    y += LINE_HEIGHT + 8;
  }

  // Sub-nodes
  drawLabel(ctx, 'SUB-NODES', 20, y);
  y += LINE_HEIGHT;
  drawValue(ctx, String(childrenCount || 0).padStart(3, '0'), 20, y);
  y += LINE_HEIGHT + 8;

  // Media objects
  drawLabel(ctx, 'MEDIA OBJECTS', 20, y);
  y += LINE_HEIGHT;
  drawValue(ctx, String(mediaCount || 0).padStart(3, '0'), 20, y);
  y += LINE_HEIGHT + 8;

  // Summary (truncated to fit)
  if (description) {
    drawDivider(ctx, 20, y, 472);
    y += LINE_HEIGHT;
    drawLabel(ctx, 'SUMMARY', 20, y);
    y += LINE_HEIGHT;

    ctx.font = `400 ${LABEL_SIZE}px ${FONT}`;
    ctx.fillStyle = COLORS.textDim;

    const words = description.split(' ');
    let line = '';
    const maxWidth = 472;
    for (const word of words) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > maxWidth) {
        ctx.fillText(line, 20, y);
        y += LINE_HEIGHT;
        line = word;
        if (y > 480) { line += '...'; break; }
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 20, y);
  }

  texture.needsUpdate = true;
}

/* ── Instrument Strip (Bottom Bezel) ──────────────────────── */

export function createInstrumentTexture() {
  const { canvas, ctx, texture } = createCanvas(1024, 64);
  return { canvas, ctx, texture, lastData: null };
}

export function updateInstrumentTexture(handle, data) {
  const { ctx, texture } = handle;
  const { isInTransit, transitTarget, accentColor } = data;

  clearCanvas(ctx);

  // Background
  ctx.fillStyle = 'rgba(10, 12, 28, 0.85)';
  ctx.fillRect(0, 0, 1024, 64);

  if (isInTransit) {
    drawValue(
      ctx,
      `IN TRANSIT \u25B8 ${(transitTarget || '...').toUpperCase()}`,
      300,
      38,
      accentColor || COLORS.primary,
    );
  } else {
    drawValue(ctx, 'SYSTEMS ONLINE', 300, 38, COLORS.textMuted);
    drawValue(ctx, '\u25C8', 500, 38, COLORS.success);
    drawValue(ctx, 'SENSORS ACTIVE', 540, 38, COLORS.textMuted);
  }

  texture.needsUpdate = true;
}

/* ── Nav Panel (Left Bezel) ───────────────────────────────── */

export function createNavPanelTexture() {
  const { canvas, ctx, texture } = createCanvas(256, 512);
  return { canvas, ctx, texture, lastData: null };
}

export function updateNavPanelTexture(handle, data) {
  const { ctx, texture } = handle;
  const { switchStates } = data;

  clearCanvas(ctx);

  // Background
  ctx.fillStyle = 'rgba(6, 8, 18, 0.9)';
  ctx.fillRect(0, 0, 256, 512);

  // Header
  drawHeader(ctx, 'NAV CTRL', 20, 36, COLORS.secondary);
  drawDivider(ctx, 20, 48, 216, `${COLORS.secondary}40`);

  // Switch labels
  const switches = [
    { label: 'TOUR', color: COLORS.secondary },
    { label: 'TIMELINE', color: COLORS.accent },
    { label: 'LINKS', color: COLORS.success },
    { label: 'MEDIA', color: COLORS.info },
    { label: 'DIAGRAMS', color: COLORS.highlight },
  ];

  let y = 80;
  for (let i = 0; i < switches.length; i++) {
    const sw = switches[i];
    const active = switchStates ? switchStates[i] : false;
    const color = active ? sw.color : COLORS.textMuted;

    // Switch indicator dot
    ctx.beginPath();
    ctx.arc(30, y - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = active ? sw.color : '#334455';
    ctx.fill();

    // Label
    drawLabel(ctx, sw.label, 46, y, color);
    y += 40;

    // Separator after 3rd item
    if (i === 2) {
      drawDivider(ctx, 20, y - 20, 216, `${COLORS.textMuted}20`);
    }
  }

  texture.needsUpdate = true;
}

/* ── Throttled Update Manager ─────────────────────────────── */

/**
 * Create all cockpit textures and return an update function
 * that throttles canvas redraws to VR_CONFIG.textureUpdateHz.
 */
export function createCockpitTextureSet() {
  const statusStrip = createStatusStripTexture();
  const scanner = createScannerTexture();
  const instrument = createInstrumentTexture();
  const navPanel = createNavPanelTexture();

  let lastUpdateTime = 0;
  const updateInterval = 1000 / VR_CONFIG.textureUpdateHz;

  return {
    statusStrip,
    scanner,
    instrument,
    navPanel,

    /**
     * Call from animation loop with current HUD data.
     * Internally throttles to 2 Hz.
     */
    update(hudData) {
      const now = performance.now();
      if (now - lastUpdateTime < updateInterval) return;
      lastUpdateTime = now;

      updateStatusStripTexture(statusStrip, hudData);
      updateScannerTexture(scanner, hudData);
      updateInstrumentTexture(instrument, hudData);
      updateNavPanelTexture(navPanel, {
        switchStates: hudData.switchStates || [false, false, false, false, false],
      });
    },

    dispose() {
      statusStrip.texture.dispose();
      scanner.texture.dispose();
      instrument.texture.dispose();
      navPanel.texture.dispose();
    },
  };
}
