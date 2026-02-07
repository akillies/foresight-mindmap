/**
 * Procedural Canvas Textures for Planet Biomes
 * Generates 1024x1024 textures using 2D canvas + multi-octave simplex noise (fBm).
 * Used as the primary visual for all renderer paths.
 */
import { createNoise2D } from 'simplex-noise';

const TEX_SIZE = 1024;

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
 * Fractional Brownian Motion (fBm) - multi-octave noise for realistic terrain.
 * @param {Function} noise - simplex noise function
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} octaves - number of noise layers (typically 4-6)
 * @param {number} lacunarity - frequency multiplier per octave (typically 2.0)
 * @param {number} gain - amplitude multiplier per octave (typically 0.5)
 * @returns {number} - combined noise value in range [-1, 1]
 */
function fbm(noise, x, y, octaves = 5, lacunarity = 2.0, gain = 0.5) {
  let value = 0;
  let amplitude = 1.0;
  let frequency = 1.0;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += noise(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return value / maxValue;
}

/**
 * Ridged noise - useful for sharp features like mountain ridges and lava fissures.
 * Takes the absolute value to create sharp peaks/valleys.
 */
function ridgedNoise(noise, x, y, octaves = 4, lacunarity = 2.0, gain = 0.5) {
  let value = 0;
  let amplitude = 1.0;
  let frequency = 1.0;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    const n = Math.abs(noise(x * frequency, y * frequency));
    value += (1 - n) * amplitude;
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return value / maxValue;
}

/**
 * Generate an ocean world texture.
 * Deep blue seas with continent shapes, coastal shelves, swirling clouds, and polar ice caps.
 */
export function createOceanTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const deepOcean = [10, 40, 120];
  const midOcean = [20, 60, 160];
  const shallowBlue = [60, 140, 220];
  const coastalShelf = [80, 160, 200];
  const beach = [180, 170, 140];
  const land = [40, 120, 80];
  const highland = [60, 100, 70];
  const cloud = [220, 240, 255];
  const iceCap = [240, 250, 255];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Continent shapes with fBm for realistic landmasses
      const continentVal = (fbm(noise, nx * 3 + 10, ny * 3 + 10, 5, 2.0, 0.5) + 1) * 0.5;

      // Ocean depth variation
      const oceanDepth = (fbm(noise, nx * 4, ny * 4, 4, 2.2, 0.55) + 1) * 0.5;

      // Swirling cloud bands (stretched noise)
      const cloudBands = (fbm(noise, nx * 6 + 50, ny * 2 + 50, 3, 2.0, 0.6) + 1) * 0.5;
      const cloudDetail = (fbm(noise, nx * 12 + 100, ny * 12 + 100, 2, 2.0, 0.5) + 1) * 0.5;

      // Ice caps at poles (ny close to 0 or 1)
      const poleDistance = Math.min(ny, 1 - ny) * 2; // 0 at poles, 1 at equator
      const iceCapStrength = Math.max(0, 1 - poleDistance * 1.8);

      let color;

      // Determine base terrain
      if (continentVal > 0.58) {
        // Land
        if (continentVal > 0.72) {
          color = highland;
        } else if (continentVal > 0.62) {
          color = land;
        } else {
          color = beach; // Coastal area
        }
      } else {
        // Ocean with depth gradation
        if (continentVal > 0.52) {
          // Coastal shelf
          color = lerpColor(coastalShelf, shallowBlue, (0.58 - continentVal) / 0.06);
        } else if (continentVal > 0.35) {
          // Shallow water
          color = lerpColor(shallowBlue, midOcean, oceanDepth * 0.6);
        } else {
          // Deep ocean
          color = lerpColor(midOcean, deepOcean, oceanDepth);
        }
      }

      // Apply ice caps at poles
      if (iceCapStrength > 0.15) {
        const iceNoise = (fbm(noise, nx * 8 + 200, ny * 8 + 200, 3, 2.0, 0.5) + 1) * 0.5;
        const iceT = iceCapStrength * (0.7 + iceNoise * 0.3);
        color = lerpColor(color, iceCap, iceT);
      }

      // Cloud overlay with realistic coverage
      const cloudCoverage = cloudBands * 0.7 + cloudDetail * 0.3;
      if (cloudCoverage > 0.55) {
        const cloudT = (cloudCoverage - 0.55) / 0.45;
        color = lerpColor(color, cloud, cloudT * 0.65);
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
 * Multi-scale dune ridges, wind erosion, rocky mesas, dried riverbeds, sandy gradients.
 */
export function createDesertTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const darkAmber = [140, 100, 35];
  const darkSand = [160, 110, 40];
  const midSand = [200, 155, 60];
  const lightSand = [230, 190, 100];
  const brightSand = [245, 210, 130];
  const rockMesa = [100, 70, 30];
  const darkRock = [80, 55, 25];
  const riverbed = [60, 45, 20];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Large dune ridges (anisotropic - stretched X more than Y for wind direction)
      const largeDunes = (fbm(noise, nx * 3, ny * 1.5, 4, 2.0, 0.5) + 1) * 0.5;
      // Medium dune patterns
      const medDunes = (fbm(noise, nx * 8, ny * 3 + 20, 3, 2.2, 0.55) + 1) * 0.5;
      // Fine sand ripples
      const ripples = (fbm(noise, nx * 20, ny * 8 + 50, 2, 2.0, 0.6) + 1) * 0.5;

      // Rocky mesa outcrops
      const rockVal = (fbm(noise, nx * 2.5 + 40, ny * 2.5 + 40, 4, 2.0, 0.5) + 1) * 0.5;

      // Wind erosion patterns (high frequency detail)
      const erosion = (fbm(noise, nx * 15 + 100, ny * 15 + 100, 2, 2.0, 0.5) + 1) * 0.5;

      // Dried riverbeds (thin dark lines using ridged noise)
      const riverbedVal = ridgedNoise(noise, nx * 6 + 200, ny * 6 + 200, 3, 2.5, 0.6);

      let color;

      // Rocky mesa regions
      if (rockVal > 0.72) {
        const rockDetail = erosion * 0.3;
        color = lerpColor(darkRock, rockMesa, rockDetail);
      } else {
        // Sandy terrain with multi-scale detail
        const duneHeight = largeDunes * 0.5 + medDunes * 0.3 + ripples * 0.2;

        if (duneHeight > 0.65) {
          // Bright dune crests
          color = lerpColor(lightSand, brightSand, (duneHeight - 0.65) / 0.35);
        } else if (duneHeight > 0.45) {
          // Mid-tone sand
          color = lerpColor(midSand, lightSand, (duneHeight - 0.45) / 0.2);
        } else if (duneHeight > 0.3) {
          color = lerpColor(darkSand, midSand, (duneHeight - 0.3) / 0.15);
        } else {
          // Dark sand in valleys
          color = lerpColor(darkAmber, darkSand, duneHeight / 0.3);
        }

        // Apply erosion patterns
        color = lerpColor(color, darkSand, (0.5 - erosion) * 0.15);
      }

      // Dried riverbeds (very high threshold creates thin lines)
      if (riverbedVal > 0.88 && rockVal < 0.65) {
        const bedStrength = (riverbedVal - 0.88) / 0.12;
        color = lerpColor(color, riverbed, bedStrength * 0.8);
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
 * Voronoi-like crack patterns, iridescent shimmer, frost formations, subsurface blue glow.
 */
export function createCrystalTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const deepIce = [140, 170, 210];
  const ice = [180, 200, 230];
  const paleCrystal = [200, 210, 240];
  const crystalPink = [200, 160, 210];
  const crystalPurple = [180, 140, 200];
  const bright = [240, 230, 255];
  const shimmer = [220, 200, 250];
  const crevasse = [80, 100, 140];
  const deepCrevasse = [40, 60, 100];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Base ice terrain
      const iceVal = (fbm(noise, nx * 5, ny * 5, 5, 2.0, 0.5) + 1) * 0.5;

      // Iridescent shimmer using noise to shift hue
      const shimmerVal = (fbm(noise, nx * 8 + 30, ny * 8 + 30, 4, 2.2, 0.55) + 1) * 0.5;
      const hueShift = (fbm(noise, nx * 12 + 100, ny * 12 + 100, 3, 2.0, 0.5) + 1) * 0.5;

      // Voronoi-like crack patterns (using ridged noise for sharp edges)
      const crackPattern = ridgedNoise(noise, nx * 10 + 60, ny * 10 + 60, 4, 2.5, 0.6);

      // Frost formations (high frequency detail)
      const frostDetail = (fbm(noise, nx * 20 + 150, ny * 20 + 150, 3, 2.0, 0.6) + 1) * 0.5;

      // Deep crevasses with blue subsurface glow
      const deepCrackVal = ridgedNoise(noise, nx * 6 + 200, ny * 6 + 200, 3, 2.3, 0.55);

      let color;

      // Base crystal/ice color with variation
      if (iceVal > 0.6) {
        color = lerpColor(paleCrystal, bright, (iceVal - 0.6) / 0.4);
      } else {
        color = lerpColor(ice, paleCrystal, iceVal / 0.6);
      }

      // Apply iridescent shimmer with hue shifting
      if (shimmerVal > 0.55) {
        const shimmerT = (shimmerVal - 0.55) / 0.45;
        if (hueShift > 0.6) {
          // Pink/purple iridescence
          const shimmerColor = lerpColor(crystalPink, crystalPurple, (hueShift - 0.6) / 0.4);
          color = lerpColor(color, shimmerColor, shimmerT * 0.4);
        } else {
          // Bright white shimmer
          color = lerpColor(color, shimmer, shimmerT * 0.5);
        }
      }

      // Apply frost formations
      if (frostDetail > 0.7) {
        const frostT = (frostDetail - 0.7) / 0.3;
        color = lerpColor(color, bright, frostT * 0.3);
      }

      // Crack patterns (Voronoi-like)
      if (crackPattern > 0.75) {
        const crackDepth = (crackPattern - 0.75) / 0.25;
        if (crackDepth > 0.7) {
          // Deep cracks
          color = lerpColor(color, crevasse, crackDepth);
        } else {
          // Surface cracks
          color = lerpColor(color, ice, crackDepth * 0.6);
        }
      }

      // Deep crevasses with subsurface blue glow
      if (deepCrackVal > 0.82) {
        const depth = (deepCrackVal - 0.82) / 0.18;
        const glowColor = lerpColor(crevasse, deepCrevasse, depth);
        // Add blue glow in deep parts
        const glowAmount = depth * 0.8;
        glowColor[2] = Math.min(255, glowColor[2] + glowAmount * 60);
        color = lerpColor(color, glowColor, 0.9);
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
 * Lava flow networks, cooling magma crust, volcanic caldera, dramatic color contrast.
 */
export function createVolcanicTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const darkRock = [20, 18, 18];
  const coolingRock = [40, 35, 30];
  const hotRock = [80, 40, 20];
  const warmCrust = [120, 60, 30];
  const magma = [255, 80, 10];
  const magmaBright = [255, 150, 30];
  const magmaWhite = [255, 220, 100];
  const calderaRim = [180, 90, 40];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Base rock terrain
      const rockVal = (fbm(noise, nx * 6, ny * 6, 5, 2.0, 0.5) + 1) * 0.5;

      // Lava flow networks using ridged noise for connected fissures
      const lavaFlows = ridgedNoise(noise, nx * 8 + 20, ny * 8 + 20, 4, 2.3, 0.55);

      // Cooling magma crust pattern
      const crustPattern = (fbm(noise, nx * 12 + 50, ny * 12 + 50, 4, 2.2, 0.6) + 1) * 0.5;

      // Heat variation (determines cooling vs active)
      const heatVal = (fbm(noise, nx * 4 + 100, ny * 4 + 100, 3, 2.0, 0.5) + 1) * 0.5;

      // Volcanic caldera (circular feature)
      const calderaX = 0.6;
      const calderaY = 0.4;
      const dx = nx - calderaX;
      const dy = ny - calderaY;
      const calderaDist = Math.sqrt(dx * dx + dy * dy);

      let color;

      // Caldera feature
      if (calderaDist < 0.12) {
        if (calderaDist < 0.08) {
          // Active caldera interior - bright magma
          const centerIntensity = 1 - (calderaDist / 0.08);
          color = lerpColor(magma, magmaWhite, centerIntensity * 0.7);
        } else {
          // Caldera rim
          const rimT = (calderaDist - 0.08) / 0.04;
          color = lerpColor(calderaRim, magma, 1 - rimT);
        }
      } else {
        // Base volcanic surface
        if (rockVal > 0.6) {
          // Warmer crust areas
          color = lerpColor(hotRock, warmCrust, (rockVal - 0.6) / 0.4);
        } else if (rockVal > 0.3) {
          color = lerpColor(coolingRock, hotRock, (rockVal - 0.3) / 0.3);
        } else {
          // Cold dark rock
          color = lerpColor(darkRock, coolingRock, rockVal / 0.3);
        }

        // Cooling crust pattern (dark and light patches)
        if (crustPattern > 0.6) {
          const crustT = (crustPattern - 0.6) / 0.4;
          color = lerpColor(color, darkRock, crustT * 0.3);
        } else if (crustPattern < 0.4) {
          const brightT = (0.4 - crustPattern) / 0.4;
          color = lerpColor(color, warmCrust, brightT * 0.2);
        }

        // Lava flow networks (connected fissures)
        if (lavaFlows > 0.78) {
          const flowIntensity = (lavaFlows - 0.78) / 0.22;
          // Heat determines if lava is active or cooling
          if (heatVal > 0.5) {
            // Active flowing lava
            if (flowIntensity > 0.7) {
              color = lerpColor(magmaBright, magmaWhite, (flowIntensity - 0.7) / 0.3);
            } else {
              color = lerpColor(magma, magmaBright, flowIntensity / 0.7);
            }
          } else {
            // Cooling lava
            const coolT = 1 - heatVal * 2;
            const activeLava = lerpColor(magma, magmaBright, flowIntensity);
            color = lerpColor(activeLava, hotRock, coolT * 0.6);
          }
        } else if (lavaFlows > 0.7) {
          // Faint glow around fissures
          const glowT = (lavaFlows - 0.7) / 0.08;
          color = lerpColor(color, magma, glowT * 0.3);
        }
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
 * Earth-like terrain: deep ocean → shallow → beach → lowland → forest → highland → snow caps.
 * Realistic continent shapes with fBm and cloud layers.
 */
export function createGardenTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const deepOcean = [15, 50, 120];
  const ocean = [30, 90, 160];
  const shallowWater = [60, 130, 190];
  const beach = [200, 190, 150];
  const lowland = [50, 140, 60];
  const forest = [40, 110, 50];
  const highland = [80, 160, 80];
  const mountain = [140, 130, 110];
  const snowCap = [240, 245, 250];
  const cloud = [240, 245, 255];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Continental elevation using fBm for realistic landmasses
      const elevation = (fbm(noise, nx * 4, ny * 4, 6, 2.1, 0.52) + 1) * 0.5;

      // Terrain detail variation
      const terrainDetail = (fbm(noise, nx * 10 + 15, ny * 10 + 15, 4, 2.0, 0.55) + 1) * 0.5;

      // Mountain ranges (ridged for peaks)
      const mountainRidges = ridgedNoise(noise, nx * 6 + 50, ny * 6 + 50, 3, 2.2, 0.5);

      // Cloud coverage with realistic patterns
      const cloudBase = (fbm(noise, nx * 5 + 100, ny * 5 + 100, 3, 2.0, 0.6) + 1) * 0.5;
      const cloudDetail = (fbm(noise, nx * 12 + 150, ny * 12 + 150, 2, 2.0, 0.5) + 1) * 0.5;
      const cloudCoverage = cloudBase * 0.7 + cloudDetail * 0.3;

      let color;

      // Terrain bands based on elevation
      if (elevation < 0.35) {
        // Deep ocean
        color = lerpColor(deepOcean, ocean, elevation / 0.35);
      } else if (elevation < 0.42) {
        // Shallow water
        const t = (elevation - 0.35) / 0.07;
        color = lerpColor(ocean, shallowWater, t);
      } else if (elevation < 0.45) {
        // Beach/coastal
        const t = (elevation - 0.42) / 0.03;
        color = lerpColor(shallowWater, beach, t);
      } else if (elevation < 0.52) {
        // Lowland (grassland/plains)
        const t = (elevation - 0.45) / 0.07;
        color = lerpColor(beach, lowland, t);
        // Add terrain variation
        color = lerpColor(color, forest, (terrainDetail - 0.5) * 0.3);
      } else if (elevation < 0.65) {
        // Forest/lowland mix
        const t = (elevation - 0.52) / 0.13;
        color = lerpColor(lowland, forest, terrainDetail * 0.6);
        color = lerpColor(color, highland, t * 0.4);
      } else if (elevation < 0.78) {
        // Highland
        const t = (elevation - 0.65) / 0.13;
        color = lerpColor(highland, mountain, t);
        // Mountain detail
        if (mountainRidges > 0.6) {
          const ridgeT = (mountainRidges - 0.6) / 0.4;
          color = lerpColor(color, mountain, ridgeT * 0.5);
        }
      } else {
        // Mountain peaks with snow caps
        const t = (elevation - 0.78) / 0.22;
        if (elevation > 0.88) {
          // Snow-covered peaks
          const snowT = (elevation - 0.88) / 0.12;
          color = lerpColor(mountain, snowCap, snowT);
        } else {
          color = lerpColor(mountain, mountain, 0); // Keep mountain color
          // Add rocky variation
          if (mountainRidges > 0.7) {
            const rockT = (mountainRidges - 0.7) / 0.3;
            const darkerMountain = [mountain[0] * 0.8, mountain[1] * 0.8, mountain[2] * 0.8];
            color = lerpColor(color, darkerMountain, rockT * 0.4);
          }
        }
      }

      // Realistic cloud coverage
      if (cloudCoverage > 0.58) {
        const cloudT = (cloudCoverage - 0.58) / 0.42;
        // Denser clouds over ocean, lighter over land
        const cloudDensity = elevation < 0.45 ? 0.7 : 0.55;
        color = lerpColor(color, cloud, cloudT * cloudDensity);
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
 * Multiple atmospheric bands with turbulence, storm eyes at different sizes,
 * subtle color variation within bands, shadow/depth between bands.
 */
export function createGasGiantTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const band1Dark = [170, 60, 100];
  const band1 = [200, 80, 120];
  const band1Light = [220, 100, 135];
  const band2Dark = [230, 120, 160];
  const band2 = [255, 140, 180];
  const band2Light = [255, 165, 200];
  const band3Dark = [150, 45, 85];
  const band3 = [180, 60, 100];
  const band3Light = [200, 75, 115];
  const storm = [255, 200, 220];
  const stormDark = [220, 160, 180];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  // Storm positions [x, y, radius]
  const storms = [
    [0.4, 0.5, 0.08], // Large storm
    [0.7, 0.25, 0.05], // Medium storm
    [0.15, 0.7, 0.04], // Small storm
    [0.85, 0.6, 0.035], // Tiny storm
  ];

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Horizontal bands (dominant latitude pattern) - more bands
      const bandVal = Math.sin(ny * Math.PI * 12) * 0.5 + 0.5;

      // Multi-scale turbulence at band boundaries
      const largeTurbulence = fbm(noise, nx * 6, ny * 1.5, 3, 2.0, 0.55) * 0.12;
      const smallTurbulence = fbm(noise, nx * 15, ny * 4 + 20, 2, 2.2, 0.6) * 0.08;
      const turbulence = largeTurbulence + smallTurbulence;

      // Color variation within bands
      const bandColorVar = (fbm(noise, nx * 10 + 50, ny * 8 + 50, 3, 2.0, 0.5) + 1) * 0.5;

      // Shadow/depth between bands (using derivative of band pattern)
      const bandDerivative = Math.abs(Math.cos(ny * Math.PI * 12)) * 0.3;

      const combined = Math.max(0, Math.min(1, bandVal + turbulence));

      let color;

      // Select base band color with more variety
      if (combined < 0.25) {
        color = lerpColor(band3Dark, band3, combined / 0.25);
      } else if (combined < 0.4) {
        const t = (combined - 0.25) / 0.15;
        color = lerpColor(band3, band1Dark, t);
      } else if (combined < 0.55) {
        const t = (combined - 0.4) / 0.15;
        color = lerpColor(band1Dark, band1, t);
      } else if (combined < 0.7) {
        const t = (combined - 0.55) / 0.15;
        color = lerpColor(band1, band2Dark, t);
      } else if (combined < 0.85) {
        const t = (combined - 0.7) / 0.15;
        color = lerpColor(band2Dark, band2, t);
      } else {
        const t = (combined - 0.85) / 0.15;
        color = lerpColor(band2, band2Light, t);
      }

      // Apply color variation within each band
      if (bandColorVar > 0.55) {
        const varT = (bandColorVar - 0.55) / 0.45;
        const lighterColor = [
          Math.min(255, color[0] * 1.1),
          Math.min(255, color[1] * 1.1),
          Math.min(255, color[2] * 1.1)
        ];
        color = lerpColor(color, lighterColor, varT * 0.3);
      } else if (bandColorVar < 0.45) {
        const varT = (0.45 - bandColorVar) / 0.45;
        const darkerColor = [
          color[0] * 0.85,
          color[1] * 0.85,
          color[2] * 0.85
        ];
        color = lerpColor(color, darkerColor, varT * 0.3);
      }

      // Add shadow/depth at band boundaries
      color = [
        color[0] * (1 - bandDerivative * 0.4),
        color[1] * (1 - bandDerivative * 0.4),
        color[2] * (1 - bandDerivative * 0.4)
      ];

      // Multiple storm eyes
      for (const [stormX, stormY, stormRadius] of storms) {
        const dx = nx - stormX;
        const dy = ny - stormY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < stormRadius) {
          const stormT = 1 - dist / stormRadius;
          // Eye wall (darker ring)
          if (dist > stormRadius * 0.4 && dist < stormRadius * 0.65) {
            const wallT = Math.sin((dist - stormRadius * 0.4) / (stormRadius * 0.25) * Math.PI);
            color = lerpColor(color, stormDark, wallT * 0.6);
          }
          // Bright storm center
          if (dist < stormRadius * 0.5) {
            const centerT = 1 - (dist / (stormRadius * 0.5));
            color = lerpColor(color, storm, centerT * 0.9);
          }
          // Storm influence on surrounding area
          const influenceT = Math.pow(stormT, 2) * 0.5;
          color = lerpColor(color, storm, influenceT);
        }
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
 * Granulation patterns with convection cells, bright faculae regions, chromatic variation.
 */
export function createStarTexture() {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const coreOrange = [255, 180, 80];
  const core = [255, 200, 100];
  const bright = [255, 240, 200];
  const brightWhite = [255, 250, 230];
  const faculae = [255, 245, 220];
  const spot = [200, 140, 60];
  const darkSpot = [180, 120, 50];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Granulation pattern (convection cells) using high-frequency fBm
      const granulation = (fbm(noise, nx * 15, ny * 15, 5, 2.1, 0.55) + 1) * 0.5;

      // Large-scale convection cells
      const largeCells = (fbm(noise, nx * 6, ny * 6, 4, 2.0, 0.5) + 1) * 0.5;

      // Bright faculae regions (active areas)
      const faculaeVal = (fbm(noise, nx * 8 + 30, ny * 8 + 30, 3, 2.2, 0.6) + 1) * 0.5;

      // Chromatic variation (orange to yellow gradient)
      const chromaticVar = (fbm(noise, nx * 4 + 100, ny * 4 + 100, 3, 2.0, 0.5) + 1) * 0.5;

      // Sunspot regions
      const sunspotVal = (fbm(noise, nx * 5 + 200, ny * 5 + 200, 4, 2.0, 0.5) + 1) * 0.5;

      let color;

      // Base color with chromatic variation (orange-yellow gradient)
      if (chromaticVar > 0.6) {
        color = lerpColor(core, bright, (chromaticVar - 0.6) / 0.4);
      } else if (chromaticVar > 0.4) {
        color = core;
      } else {
        color = lerpColor(coreOrange, core, chromaticVar / 0.4);
      }

      // Apply granulation pattern (convection cell texture)
      if (granulation > 0.55) {
        const granT = (granulation - 0.55) / 0.45;
        color = lerpColor(color, bright, granT * 0.4);
      } else if (granulation < 0.45) {
        const darkT = (0.45 - granulation) / 0.45;
        const darkerColor = [color[0] * 0.9, color[1] * 0.9, color[2] * 0.9];
        color = lerpColor(color, darkerColor, darkT * 0.3);
      }

      // Large convection cells (subtle variation)
      if (largeCells > 0.6) {
        const cellT = (largeCells - 0.6) / 0.4;
        color = lerpColor(color, brightWhite, cellT * 0.25);
      }

      // Bright faculae regions (very bright active areas)
      if (faculaeVal > 0.72) {
        const faculaeT = (faculaeVal - 0.72) / 0.28;
        if (faculaeT > 0.6) {
          color = lerpColor(color, brightWhite, (faculaeT - 0.6) / 0.4 * 0.7);
        } else {
          color = lerpColor(color, faculae, faculaeT / 0.6 * 0.5);
        }
      }

      // Sunspots (darker magnetic regions)
      if (sunspotVal < 0.15) {
        const spotT = (0.15 - sunspotVal) / 0.15;
        if (spotT > 0.7) {
          // Dark umbra (center)
          color = lerpColor(color, darkSpot, (spotT - 0.7) / 0.3);
        } else {
          // Lighter penumbra (surrounding)
          color = lerpColor(color, spot, spotT / 0.7 * 0.7);
        }
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
 * Generate a moon texture with multi-octave terrain and distinct crater shapes.
 * Grey cratered surface with better crater detail (circular craters with bright rims).
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
  const brightRim = [180, 180, 190];
  const tint = [
    (baseGrey[0] + r) / 2,
    (baseGrey[1] + g) / 2,
    (baseGrey[2] + b) / 2,
  ];

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  // Define crater positions [x, y, radius]
  const craters = [
    [0.3, 0.4, 0.12],
    [0.7, 0.3, 0.09],
    [0.5, 0.7, 0.08],
    [0.15, 0.65, 0.06],
    [0.85, 0.6, 0.055],
    [0.6, 0.5, 0.07],
    [0.2, 0.2, 0.05],
    [0.75, 0.75, 0.045],
  ];

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      // Multi-octave terrain for realistic lunar surface
      const terrain = (fbm(noise, nx * 6, ny * 6, 5, 2.0, 0.52) + 1) * 0.5;

      // Fine detail (smaller features)
      const detail = (fbm(noise, nx * 15 + 10, ny * 15 + 10, 3, 2.2, 0.55) + 1) * 0.5;

      // Base lunar color with terrain variation
      let color = lerpColor(darkGrey, tint, terrain * 0.7 + detail * 0.3);

      // Apply distinct circular craters
      let craterInfluence = 0;
      for (const [craterX, craterY, craterRadius] of craters) {
        const dx = nx - craterX;
        const dy = ny - craterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < craterRadius) {
          // Inside crater
          const normalizedDist = dist / craterRadius;

          if (normalizedDist < 0.85) {
            // Crater floor (dark)
            const floorDepth = 1 - (normalizedDist / 0.85);
            const craterFloor = lerpColor(color, darkGrey, floorDepth * 0.7);
            color = craterFloor;
            craterInfluence = Math.max(craterInfluence, floorDepth * 0.7);
          } else {
            // Bright crater rim
            const rimT = (normalizedDist - 0.85) / 0.15;
            const rimBrightness = Math.sin(rimT * Math.PI); // Peaks at middle of rim
            color = lerpColor(color, brightRim, rimBrightness * 0.8);
            craterInfluence = Math.max(craterInfluence, rimBrightness * 0.8);
          }
        } else if (dist < craterRadius * 1.15) {
          // Ejecta field around crater
          const ejectaDist = (dist - craterRadius) / (craterRadius * 0.15);
          const ejectaT = 1 - ejectaDist;
          const ejectaColor = lerpColor(color, baseGrey, ejectaT * 0.3);
          color = ejectaColor;
        }
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
 * Generate a bump/height map texture for a biome.
 * Returns a grayscale canvas that can be used as a bumpMap on the planet material.
 * @param {string} biome - The biome name (ocean, desert, crystal, volcanic, garden, gasGiant)
 * @returns {HTMLCanvasElement} - Grayscale heightmap canvas
 */
export function createBumpTexture(biome) {
  const { canvas, ctx } = createCanvas();
  const noise = createNoise2D();

  const imageData = ctx.createImageData(TEX_SIZE, TEX_SIZE);
  const data = imageData.data;

  for (let y = 0; y < TEX_SIZE; y++) {
    for (let x = 0; x < TEX_SIZE; x++) {
      const nx = x / TEX_SIZE;
      const ny = y / TEX_SIZE;
      const i = (y * TEX_SIZE + x) * 4;

      let height = 0.5; // Default mid-level

      switch (biome) {
        case 'ocean':
          // Elevation: continents high, ocean low, ice caps medium
          const continentHeight = (fbm(noise, nx * 3 + 10, ny * 3 + 10, 5, 2.0, 0.5) + 1) * 0.5;
          const oceanDepth = (fbm(noise, nx * 4, ny * 4, 4, 2.2, 0.55) + 1) * 0.5;
          const poleDistance = Math.min(ny, 1 - ny) * 2;
          const iceCapHeight = Math.max(0, 1 - poleDistance * 1.8) * 0.3;

          if (continentHeight > 0.58) {
            height = 0.6 + (continentHeight - 0.58) * 0.5; // Land is elevated
          } else {
            height = 0.2 + oceanDepth * 0.3; // Ocean depth variation
          }
          height = Math.min(1, height + iceCapHeight);
          break;

        case 'desert':
          // Dune ridges and mesas
          const largeDunes = (fbm(noise, nx * 3, ny * 1.5, 4, 2.0, 0.5) + 1) * 0.5;
          const medDunes = (fbm(noise, nx * 8, ny * 3 + 20, 3, 2.2, 0.55) + 1) * 0.5;
          const rockHeight = (fbm(noise, nx * 2.5 + 40, ny * 2.5 + 40, 4, 2.0, 0.5) + 1) * 0.5;

          if (rockHeight > 0.72) {
            height = 0.7 + (rockHeight - 0.72) * 0.8; // Mesas are high
          } else {
            height = 0.3 + largeDunes * 0.4 + medDunes * 0.2;
          }
          break;

        case 'crystal':
          // Ice terrain with crevasses
          const iceHeight = (fbm(noise, nx * 5, ny * 5, 5, 2.0, 0.5) + 1) * 0.5;
          const crackDepth = ridgedNoise(noise, nx * 10 + 60, ny * 10 + 60, 4, 2.5, 0.6);
          const deepCrack = ridgedNoise(noise, nx * 6 + 200, ny * 6 + 200, 3, 2.3, 0.55);

          height = 0.4 + iceHeight * 0.4;
          if (crackDepth > 0.75) {
            height *= 0.5; // Cracks are low
          }
          if (deepCrack > 0.82) {
            height *= 0.3; // Deep crevasses
          }
          break;

        case 'volcanic':
          // Lava flows and caldera
          const rockHeight2 = (fbm(noise, nx * 6, ny * 6, 5, 2.0, 0.5) + 1) * 0.5;
          const lavaFlows = ridgedNoise(noise, nx * 8 + 20, ny * 8 + 20, 4, 2.3, 0.55);

          // Caldera depression
          const calderaX = 0.6;
          const calderaY = 0.4;
          const dx = nx - calderaX;
          const dy = ny - calderaY;
          const calderaDist = Math.sqrt(dx * dx + dy * dy);

          if (calderaDist < 0.08) {
            height = 0.2; // Deep caldera
          } else if (calderaDist < 0.12) {
            const rimT = (calderaDist - 0.08) / 0.04;
            height = 0.2 + rimT * 0.6; // Raised rim
          } else {
            height = 0.4 + rockHeight2 * 0.3;
            if (lavaFlows > 0.78) {
              height = 0.35; // Lava flows are slightly depressed
            }
          }
          break;

        case 'garden':
          // Elevation bands
          const elevation = (fbm(noise, nx * 4, ny * 4, 6, 2.1, 0.52) + 1) * 0.5;
          const mountainRidges = ridgedNoise(noise, nx * 6 + 50, ny * 6 + 50, 3, 2.2, 0.5);

          if (elevation < 0.35) {
            height = 0.1 + elevation * 0.3; // Ocean depth
          } else if (elevation < 0.45) {
            height = 0.45 + (elevation - 0.35) * 0.5; // Coastal
          } else if (elevation < 0.78) {
            height = 0.5 + (elevation - 0.45) * 0.6; // Land
          } else {
            height = 0.7 + (elevation - 0.78) * 1.2; // Mountains
            if (mountainRidges > 0.7) {
              height = Math.min(1, height + (mountainRidges - 0.7) * 0.5);
            }
          }
          break;

        case 'gasGiant':
          // Gas giants have subtle elevation in bands
          const bandVal = Math.sin(ny * Math.PI * 12) * 0.5 + 0.5;
          const turbulence = fbm(noise, nx * 6, ny * 1.5, 3, 2.0, 0.55) * 0.1;
          height = 0.45 + (bandVal + turbulence) * 0.1; // Very subtle
          break;

        default:
          height = 0.5;
      }

      // Clamp and convert to grayscale
      const heightValue = Math.max(0, Math.min(1, height)) * 255;
      data[i] = heightValue;
      data[i + 1] = heightValue;
      data[i + 2] = heightValue;
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
