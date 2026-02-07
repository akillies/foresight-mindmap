/**
 * Procedural Canvas Textures for Planet Biomes
 * Generates 512x512 textures using 2D canvas + simplex noise.
 * Used as the primary visual for all renderer paths.
 */
import { createNoise2D } from 'simplex-noise';

const TEX_SIZE = 512;

/**
 * Create an offscreen canvas and return its 2D context.
 */
function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  return { canvas, ctx: canvas.getContext('2d') };
}

/**
 * Utility: lerp between two [r,g,b] arrays.
 */
function lerpColor(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function rgbStr([r, g, b]) {
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

/**
 * Generate an ocean world texture.
 * Deep blue seas with white cloud wisps and land masses.
 */
export function createOceanTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const deepBlue = [20, 60, 160];
  const shallowBlue = [60, 140, 220];
  const land = [40, 120, 80];
  const cloud = [220, 240, 255];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Ocean depth (large-scale noise)
      const oceanVal = (noise(nx * 4, ny * 4) + 1) * 0.5;
      // Land mass (sharper threshold)
      const landVal = (noise(nx * 3 + 10, ny * 3 + 10) + 1) * 0.5;
      // Cloud wisps (high-frequency)
      const cloudVal = (noise(nx * 8 + 50, ny * 8 + 50) + 1) * 0.5;

      let color;
      if (landVal > 0.62) {
        color = land;
      } else {
        color = lerpColor(deepBlue, shallowBlue, oceanVal);
      }

      // Cloud overlay
      if (cloudVal > 0.7) {
        const cloudT = (cloudVal - 0.7) / 0.3;
        color = lerpColor(color, cloud, cloudT * 0.6);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a desert world texture.
 * Amber dunes with wind-carved patterns.
 */
export function createDesertTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const darkSand = [160, 110, 40];
  const lightSand = [230, 190, 100];
  const dune = [200, 155, 60];
  const rockBand = [120, 80, 35];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Dune ridges (stretched noise for wind patterns)
      const duneVal = (noise(nx * 6, ny * 2) + 1) * 0.5;
      // Color variation
      const detailVal = (noise(nx * 12 + 20, ny * 12 + 20) + 1) * 0.5;
      // Rock outcrops
      const rockVal = (noise(nx * 3 + 40, ny * 3 + 40) + 1) * 0.5;

      let color;
      if (rockVal > 0.75) {
        color = rockBand;
      } else {
        color = lerpColor(darkSand, lightSand, duneVal);
        color = lerpColor(color, dune, detailVal * 0.3);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a crystal/ice world texture.
 * Pale crystalline surface with iridescent highlights.
 */
export function createCrystalTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const ice = [180, 200, 230];
  const crystal = [200, 160, 210];
  const bright = [240, 230, 255];
  const crevasse = [100, 120, 160];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      const iceVal = (noise(nx * 5, ny * 5) + 1) * 0.5;
      const crystalVal = (noise(nx * 10 + 30, ny * 10 + 30) + 1) * 0.5;
      const crackVal = (noise(nx * 15 + 60, ny * 15 + 60) + 1) * 0.5;

      let color = lerpColor(ice, crystal, iceVal * 0.5);

      // Iridescent highlights
      if (crystalVal > 0.65) {
        const t = (crystalVal - 0.65) / 0.35;
        color = lerpColor(color, bright, t * 0.7);
      }

      // Crevasses
      if (crackVal > 0.82) {
        color = crevasse;
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a volcanic world texture.
 * Dark surface with glowing magma fissures.
 */
export function createVolcanicTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const darkRock = [30, 25, 25];
  const hotRock = [80, 40, 20];
  const magma = [255, 100, 20];
  const magmaBright = [255, 180, 50];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      const rockVal = (noise(nx * 6, ny * 6) + 1) * 0.5;
      const fissureVal = (noise(nx * 10 + 20, ny * 10 + 20) + 1) * 0.5;
      const hotSpot = (noise(nx * 3 + 40, ny * 3 + 40) + 1) * 0.5;

      let color = lerpColor(darkRock, hotRock, rockVal * 0.4);

      // Magma fissures
      if (fissureVal > 0.72) {
        const t = (fissureVal - 0.72) / 0.28;
        color = lerpColor(magma, magmaBright, t);
      }

      // Localized hotspots
      if (hotSpot > 0.8 && fissureVal > 0.6) {
        color = lerpColor(color, magmaBright, 0.5);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a garden world texture.
 * Lush green/blue terrain with Earth-like clouds.
 */
export function createGardenTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const ocean = [30, 90, 160];
  const lowland = [50, 140, 60];
  const highland = [80, 160, 80];
  const mountain = [140, 130, 110];
  const cloud = [240, 245, 255];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      const elevation = (noise(nx * 4, ny * 4) + 1) * 0.5;
      const detail = (noise(nx * 10 + 15, ny * 10 + 15) + 1) * 0.5;
      const cloudVal = (noise(nx * 6 + 50, ny * 6 + 50) + 1) * 0.5;

      let color;
      if (elevation < 0.4) {
        color = ocean;
      } else if (elevation < 0.55) {
        color = lerpColor(lowland, highland, detail);
      } else if (elevation < 0.75) {
        color = highland;
      } else {
        color = lerpColor(highland, mountain, (elevation - 0.75) / 0.25);
      }

      // Cloud cover
      if (cloudVal > 0.65) {
        const t = (cloudVal - 0.65) / 0.35;
        color = lerpColor(color, cloud, t * 0.55);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a gas giant texture.
 * Banded atmospheric layers with a storm eye.
 */
export function createGasGiantTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const band1 = [200, 80, 120];
  const band2 = [255, 140, 180];
  const band3 = [180, 60, 100];
  const storm = [255, 200, 220];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Horizontal bands (dominant latitude pattern)
      const bandVal = Math.sin(ny * Math.PI * 8) * 0.5 + 0.5;
      // Turbulence (wind shear between bands)
      const turbulence = noise(nx * 8, ny * 2) * 0.15;
      const combined = Math.max(0, Math.min(1, bandVal + turbulence));

      let color;
      if (combined < 0.33) {
        color = lerpColor(band3, band1, combined / 0.33);
      } else if (combined < 0.66) {
        color = lerpColor(band1, band2, (combined - 0.33) / 0.33);
      } else {
        color = lerpColor(band2, band3, (combined - 0.66) / 0.34);
      }

      // Great storm (centered around 0.4, 0.5)
      const dx = nx - 0.4;
      const dy = ny - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.08) {
        const t = 1 - dist / 0.08;
        color = lerpColor(color, storm, t * 0.8);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a star surface texture.
 * Bright emissive surface with darker convection cells.
 */
export function createStarTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const core = [255, 200, 100];
  const bright = [255, 240, 200];
  const spot = [200, 140, 60];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      const cellVal = (noise(nx * 8, ny * 8) + 1) * 0.5;
      const brightVal = (noise(nx * 15 + 30, ny * 15 + 30) + 1) * 0.5;

      let color = lerpColor(core, bright, cellVal * 0.6);

      // Darker convection cells (sunspot-like)
      if (brightVal < 0.2) {
        color = lerpColor(color, spot, (0.2 - brightVal) / 0.2 * 0.6);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Generate a simple moon texture.
 * Grey cratered surface.
 */
export function createMoonTexture(tintColor) {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  // Tint the grey toward the parent planet's color
  const r = parseInt(tintColor.slice(1, 3), 16);
  const g = parseInt(tintColor.slice(3, 5), 16);
  const b = parseInt(tintColor.slice(5, 7), 16);

  const baseGrey = [140, 140, 150];
  const darkGrey = [80, 80, 90];
  const tint = [
    (baseGrey[0] + r) / 2,
    (baseGrey[1] + g) / 2,
    (baseGrey[2] + b) / 2,
  ];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      const terrain = (noise(nx * 6, ny * 6) + 1) * 0.5;
      const craterVal = (noise(nx * 20 + 10, ny * 20 + 10) + 1) * 0.5;

      let color = lerpColor(darkGrey, tint, terrain);

      // Craters
      if (craterVal > 0.8) {
        color = lerpColor(color, darkGrey, 0.5);
      }

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Texture generator lookup by biome name.
 */
export const BIOME_TEXTURE_GENERATORS = {
  ocean: createOceanTexture,
  desert: createDesertTexture,
  crystal: createCrystalTexture,
  volcanic: createVolcanicTexture,
  garden: createGardenTexture,
  gasGiant: createGasGiantTexture,
};
