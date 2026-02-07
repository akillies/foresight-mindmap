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

const FONT = '"Exo 2", "Courier New", Consolas, monospace';
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

function drawGradientBg(ctx, w, h, accentColor) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(14, 18, 38, 0.92)');
  grad.addColorStop(1, 'rgba(4, 6, 14, 0.96)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Accent edge glow (left)
  if (accentColor) {
    const edge = ctx.createLinearGradient(0, 0, 12, 0);
    edge.addColorStop(0, `${accentColor}30`);
    edge.addColorStop(1, 'transparent');
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, 12, h);
  }
}

function drawGlowingBorder(ctx, w, h, color, inset) {
  const i = inset || 3;
  ctx.strokeStyle = `${color}35`;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(i, i, w - i * 2, h - i * 2);
  // Outer glow pass
  ctx.strokeStyle = `${color}12`;
  ctx.lineWidth = 3;
  ctx.strokeRect(i - 1, i - 1, w - (i - 1) * 2, h - (i - 1) * 2);
}

function drawScanSweep(ctx, w, h, now) {
  const period = 4000;
  const t = (now % period) / period;
  const sweepY = t * h;
  const grad = ctx.createLinearGradient(0, sweepY - 16, 0, sweepY + 16);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.5, 'rgba(92, 200, 255, 0.06)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, sweepY - 16, w, 32);
}

function drawGlowText(ctx, text, x, y, color, font) {
  ctx.font = font;
  // Glow pass
  ctx.fillStyle = `${color}40`;
  ctx.fillText(text, x, y + 1);
  // Sharp pass
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawLabel(ctx, text, x, y, color) {
  ctx.letterSpacing = '1.5px';
  drawGlowText(ctx, text.toUpperCase(), x, y, color || COLORS.textMuted, `700 ${LABEL_SIZE}px ${FONT}`);
  ctx.letterSpacing = '0px';
}

function drawValue(ctx, text, x, y, color) {
  drawGlowText(ctx, text, x, y, color || COLORS.text, `700 ${VALUE_SIZE}px ${FONT}`);
}

function drawHeader(ctx, text, x, y, color) {
  ctx.letterSpacing = '2px';
  drawGlowText(ctx, text.toUpperCase(), x, y, color || COLORS.secondary, `700 ${HEADER_SIZE}px ${FONT}`);
  ctx.letterSpacing = '0px';
}

function drawAccentBar(ctx, x, y, height, color) {
  const grad = ctx.createLinearGradient(x, y, x, y + height);
  grad.addColorStop(0, `${color}80`);
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, `${color}80`);
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, 3, height);
}

function drawDivider(ctx, x, y, width, color) {
  const grad = ctx.createLinearGradient(x, y, x + width, y);
  grad.addColorStop(0, color || `${COLORS.textMuted}40`);
  grad.addColorStop(0.5, color || `${COLORS.textMuted}60`);
  grad.addColorStop(1, 'transparent');
  ctx.strokeStyle = grad;
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

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, 'rgba(14, 18, 38, 0.90)');
  grad.addColorStop(0.5, 'rgba(10, 12, 28, 0.85)');
  grad.addColorStop(1, 'rgba(14, 18, 38, 0.90)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 64);

  // Bottom accent line
  const accent = accentColor || COLORS.primary;
  const lineGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  lineGrad.addColorStop(0, `${accent}80`);
  lineGrad.addColorStop(0.3, accent);
  lineGrad.addColorStop(0.7, accent);
  lineGrad.addColorStop(1, `${accent}80`);
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 60, 1024, 2);

  // Status dot (pulsing via alpha)
  ctx.beginPath();
  ctx.arc(12, 38, 4, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.successBright;
  ctx.fill();

  // Planet name (left)
  drawValue(ctx, (planetName || 'STRATEGIC FORESIGHT').toUpperCase(), 26, 38, accent);

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
  const badgeColor = isGPU ? COLORS.successBright : COLORS.secondary;
  // Badge background
  ctx.fillStyle = `${badgeColor}18`;
  const badgeW = ctx.measureText(backend).width + 16;
  ctx.beginPath();
  ctx.roundRect(772, 22, badgeW, 24, 4);
  ctx.fill();
  ctx.strokeStyle = `${badgeColor}50`;
  ctx.lineWidth = 1;
  ctx.stroke();
  drawValue(ctx, backend, 780, 40, badgeColor);

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
  const accent = accentColor || COLORS.primary;
  const now = performance.now();

  clearCanvas(ctx);

  // Gradient background
  drawGradientBg(ctx, 512, 512, accent);

  // Glowing border
  drawGlowingBorder(ctx, 512, 512, accent);

  // Scan sweep animation
  drawScanSweep(ctx, 512, 512, now);

  const isCenterStar = !planetName || planetName.toUpperCase() === 'STRATEGIC FORESIGHT';

  if (isCenterStar) {
    // Idle crosshair
    ctx.strokeStyle = '#33445540';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(256, 200); ctx.lineTo(256, 310);
    ctx.moveTo(200, 256); ctx.lineTo(310, 256);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(256, 256, 40, 0, Math.PI * 2);
    ctx.stroke();
    drawLabel(ctx, 'AWAITING TARGET', 185, 320, '#556677');
    texture.needsUpdate = true;
    return;
  }

  let y = 40;

  // Header with accent bar
  drawAccentBar(ctx, 8, y - 14, 18, accent);
  drawHeader(ctx, 'SCAN TARGET', 20, y, accent);
  y += 10;
  drawDivider(ctx, 20, y, 472, `${accent}60`);
  y += LINE_HEIGHT + 4;

  // Designation
  drawAccentBar(ctx, 8, y - 10, 32, accent);
  drawLabel(ctx, 'DESIGNATION', 20, y);
  y += LINE_HEIGHT;
  drawValue(ctx, (planetName || 'UNKNOWN').toUpperCase(), 20, y, accent);
  y += LINE_HEIGHT + 10;

  // Biome
  if (biome) {
    drawAccentBar(ctx, 8, y - 10, 32, accent);
    drawLabel(ctx, 'BIOME CLASS', 20, y);
    y += LINE_HEIGHT;
    drawValue(ctx, BIOME_LABELS[biome] || biome.toUpperCase(), 20, y, accent);
    y += LINE_HEIGHT + 10;
  }

  // Stat row — sub-nodes and media side by side
  drawDivider(ctx, 20, y - 4, 472, `${accent}25`);
  y += 8;
  drawLabel(ctx, 'SUB-NODES', 20, y);
  drawLabel(ctx, 'MEDIA', 200, y);
  y += LINE_HEIGHT;
  drawValue(ctx, String(childrenCount || 0).padStart(3, '0'), 20, y);
  drawValue(ctx, String(mediaCount || 0).padStart(3, '0'), 200, y);

  // Mini bar chart for counts
  const maxBar = 140;
  const nodeBar = Math.min((childrenCount || 0) / 20, 1) * maxBar;
  const mediaBar = Math.min((mediaCount || 0) / 10, 1) * maxBar;
  y += 12;
  ctx.fillStyle = `${accent}30`;
  ctx.fillRect(20, y, maxBar, 4);
  ctx.fillStyle = accent;
  ctx.fillRect(20, y, nodeBar, 4);
  ctx.fillStyle = `${accent}30`;
  ctx.fillRect(200, y, maxBar, 4);
  ctx.fillStyle = accent;
  ctx.fillRect(200, y, mediaBar, 4);
  y += LINE_HEIGHT + 4;

  // Summary (truncated to fit)
  if (description) {
    drawDivider(ctx, 20, y, 472, `${accent}40`);
    y += LINE_HEIGHT;
    drawAccentBar(ctx, 8, y - 10, 16, COLORS.textMuted);
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
  const accent = accentColor || COLORS.primary;

  clearCanvas(ctx);

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, 'rgba(14, 18, 38, 0.90)');
  grad.addColorStop(0.5, 'rgba(10, 12, 28, 0.85)');
  grad.addColorStop(1, 'rgba(14, 18, 38, 0.90)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 64);

  // Top accent line
  const lineGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  lineGrad.addColorStop(0, `${COLORS.accent}60`);
  lineGrad.addColorStop(0.5, `${COLORS.highlight}80`);
  lineGrad.addColorStop(1, `${COLORS.accent}60`);
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, 1024, 2);

  // Tick marks (decorative instrument dividers)
  ctx.strokeStyle = `${COLORS.textMuted}18`;
  ctx.lineWidth = 1;
  for (let x = 60; x < 1024; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x, 48);
    ctx.stroke();
  }

  if (isInTransit) {
    // Transit animation — chevrons
    const now = performance.now();
    const offset = Math.floor((now % 1000) / 250);
    const chevrons = '\u25B8'.repeat(3);
    const dimChevrons = offset % 2 === 0 ? `${chevrons}` : ` ${chevrons}`;
    drawValue(ctx, `IN TRANSIT ${dimChevrons} ${(transitTarget || '...').toUpperCase()}`, 280, 40, accent);
  } else {
    // Status indicators
    ctx.beginPath();
    ctx.arc(310, 34, 4, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.success;
    ctx.fill();
    drawValue(ctx, 'SYSTEMS ONLINE', 324, 38, COLORS.textMuted);

    ctx.beginPath();
    ctx.arc(520, 34, 4, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.info;
    ctx.fill();
    drawValue(ctx, 'SENSORS ACTIVE', 534, 38, COLORS.textMuted);
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

  // Gradient background with right-edge accent
  drawGradientBg(ctx, 256, 512, COLORS.secondary);
  drawGlowingBorder(ctx, 256, 512, COLORS.secondary, 4);

  // Header with accent bar
  drawAccentBar(ctx, 8, 22, 18, COLORS.secondary);
  drawHeader(ctx, 'NAV CTRL', 20, 36, COLORS.secondary);
  drawDivider(ctx, 20, 48, 216, `${COLORS.secondary}50`);

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

    // Switch track background
    ctx.fillStyle = active ? `${sw.color}15` : 'rgba(20, 24, 48, 0.6)';
    ctx.beginPath();
    ctx.roundRect(16, y - 16, 224, 30, 4);
    ctx.fill();

    // Accent bar for active switches
    if (active) {
      drawAccentBar(ctx, 16, y - 16, 30, sw.color);
    }

    // Switch indicator dot with glow
    ctx.beginPath();
    ctx.arc(34, y - 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = active ? sw.color : '#334455';
    ctx.fill();
    if (active) {
      ctx.beginPath();
      ctx.arc(34, y - 2, 8, 0, Math.PI * 2);
      ctx.fillStyle = `${sw.color}20`;
      ctx.fill();
    }

    // Label
    drawLabel(ctx, sw.label, 50, y, color);
    y += 42;

    // Separator after 3rd item
    if (i === 2) {
      drawDivider(ctx, 20, y - 20, 216, `${COLORS.textMuted}25`);
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
