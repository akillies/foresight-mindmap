/**
 * Particle System Module
 * Handles starfield, nebulas, and distant galaxies for cosmic background
 */
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { SCENE_CONFIG } from '../constants';

/**
 * Create enhanced starfield with variable sizes and LCARS color palette
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Points} The particle system for animation
 */
export function createStarfield(scene) {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = SCENE_CONFIG.starfieldCount;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const sizes = new Float32Array(particlesCount);
  const velocities = new Float32Array(particlesCount * 3);

  const lcarBlue = new THREE.Color(0x5C88DA);
  const lcarAmber = new THREE.Color(0xFFCC66);
  const lcarPink = new THREE.Color(0xFF6B9D);
  const white = new THREE.Color(0xFFFFFF);

  // Dead zone radius: no stars within this distance of origin (where planets live)
  const DEAD_ZONE = 80;

  for (let i = 0; i < particlesCount; i++) {
    // Position in 3D space — enforce dead zone around planet system
    let x, y, z, dist;
    do {
      x = (Math.random() - 0.5) * 500;
      y = (Math.random() - 0.5) * 500;
      z = (Math.random() - 0.5) * 500;
      dist = Math.sqrt(x * x + y * y + z * z);
    } while (dist < DEAD_ZONE);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Color variation with LCARS palette — bias toward cool/dim stars
    const colorChoice = Math.random();
    const color = colorChoice < 0.5 ? lcarBlue :
                  colorChoice < 0.7 ? white :
                  colorChoice < 0.85 ? lcarAmber : lcarPink;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Star size — mostly tiny pinpoints, a few brighter ones
    const distFactor = Math.min(dist / 250, 1);
    sizes[i] = 0.1 + distFactor * 0.35;

    // Slow rotation velocities
    velocities[i * 3] = (Math.random() - 0.5) * 0.0001;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0001;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0001;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Store velocities for rotation animation
  particlesGeometry.userData = { velocities };

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.4,
    vertexColors: true,
    opacity: 0.45,
    transparent: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Add distant galaxy sprites for depth
  createDistantGalaxies(scene);

  return particles;
}

/**
 * Create subtle distant galaxy sprites for atmospheric depth
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function createDistantGalaxies(scene) {
  const galaxyCount = SCENE_CONFIG.galaxyCount;
  const lcarColors = [0x5C88DA, 0xCC99CC, 0x99CCFF, 0xFFCC66];

  for (let i = 0; i < galaxyCount; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Create radial gradient for galaxy glow — with more color depth
    const color = lcarColors[i % lcarColors.length];
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;

    // Two-pass: outer haze + inner core
    const outerGlow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    outerGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
    outerGlow.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.06)`);
    outerGlow.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.02)`);
    outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = outerGlow;
    ctx.fillRect(0, 0, 128, 128);

    // Bright core
    const core = ctx.createRadialGradient(64, 64, 0, 64, 64, 16);
    core.addColorStop(0, `rgba(255, 255, 255, 0.15)`);
    core.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.15,
      blending: THREE.AdditiveBlending,
    });

    const sprite = new THREE.Sprite(material);
    const angle = (i / galaxyCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 180 + Math.random() * 60;
    sprite.position.set(
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 100,
      Math.sin(angle) * distance
    );
    // Varied sizes: a few large dramatic ones, most medium
    const baseSize = i < 3 ? 50 + Math.random() * 30 : 25 + Math.random() * 20;
    sprite.scale.set(baseSize, baseSize * (0.5 + Math.random() * 0.5), 1);

    scene.add(sprite);
  }
}

/**
 * Create organic cloud texture using multi-octave noise
 * @param {number[]} primaryColor - RGB array [r, g, b]
 * @param {number[]} secondaryColor - RGB array [r, g, b]
 * @param {number} seed - Noise offset for variation
 * @returns {THREE.CanvasTexture} Procedural cloud texture
 */
function createNebulaCloudTexture(primaryColor, secondaryColor, seed) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(512, 512);
  const data = imageData.data;

  // Initialize noise generator
  const noise2D = createNoise2D();

  // Process each pixel
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const i = (y * 512 + x) * 4;

      // Normalized coordinates [-1, 1]
      const nx = (x / 512) * 2 - 1;
      const ny = (y / 512) * 2 - 1;

      // Multi-octave noise (fBm with 4 octaves)
      let cloudDensity = 0;
      let amplitude = 1.0;
      let frequency = 2.0;
      for (let octave = 0; octave < 4; octave++) {
        cloudDensity += amplitude * noise2D(
          (nx * frequency) + seed,
          (ny * frequency) + seed
        );
        amplitude *= 0.5;
        frequency *= 2.0;
      }

      // Normalize to [0, 1]
      cloudDensity = (cloudDensity + 1) * 0.5;

      // Apply soft radial falloff for edge transparency
      const distFromCenter = Math.sqrt(nx * nx + ny * ny);
      const radialFalloff = Math.max(0, 1 - Math.pow(distFromCenter / 1.0, 1.5));

      // Combine density with falloff
      const finalDensity = cloudDensity * radialFalloff;

      // Blend between primary and secondary colors based on density
      const colorMix = Math.pow(cloudDensity, 0.7);
      const r = primaryColor[0] * colorMix + secondaryColor[0] * (1 - colorMix);
      const g = primaryColor[1] * colorMix + secondaryColor[1] * (1 - colorMix);
      const b = primaryColor[2] * colorMix + secondaryColor[2] * (1 - colorMix);

      // Write RGBA
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = finalDensity * 255; // Alpha based on final density
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Create layered volumetric nebula backgrounds
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Mesh[]} Array of nebula meshes for animation
 */
export function createNebulas(scene) {
  const nebulas = [];

  // Define 5 nebula clusters with position and depth characteristics
  const nebulaConfigs = [
    // Large background nebulae (dramatic backdrop)
    {
      position: { angle: 0.2, distance: 180, height: 40 },
      size: 160,
      layers: 6,
      depthSpread: 15,
      primaryColor: [92, 136, 218],    // Blue
      secondaryColor: [140, 100, 180],  // Purple
      baseOpacity: 0.25,
    },
    {
      position: { angle: 3.5, distance: 200, height: -30 },
      size: 180,
      layers: 6,
      depthSpread: 12,
      primaryColor: [255, 200, 100],    // Amber
      secondaryColor: [200, 140, 60],   // Gold
      baseOpacity: 0.18, // Subtle warm glow
    },
    // Medium nebulae (mid-ground depth)
    {
      position: { angle: 1.8, distance: 120, height: -20 },
      size: 100,
      layers: 5,
      depthSpread: 10,
      primaryColor: [255, 107, 157],    // Pink
      secondaryColor: [180, 60, 120],   // Magenta
      baseOpacity: 0.28,
    },
    {
      position: { angle: 4.7, distance: 140, height: 25 },
      size: 110,
      layers: 5,
      depthSpread: 12,
      primaryColor: [99, 204, 153],     // Teal
      secondaryColor: [60, 120, 180],   // Blue
      baseOpacity: 0.26,
    },
    // Close wispy nebula (foreground atmosphere) — pushed further out
    {
      position: { angle: 2.5, distance: 100, height: 10 },
      size: 80,
      layers: 3,
      depthSpread: 8,
      primaryColor: [140, 100, 180],    // Purple
      secondaryColor: [92, 136, 218],   // Blue
      baseOpacity: 0.10, // Very transparent — shouldn't compete with planets
    },
  ];

  nebulaConfigs.forEach((config, clusterIndex) => {
    // Create multiple layered planes for each cluster
    for (let layer = 0; layer < config.layers; layer++) {
      // Generate unique cloud texture for this layer
      const seed = clusterIndex * 100 + layer * 10;
      const texture = createNebulaCloudTexture(
        config.primaryColor,
        config.secondaryColor,
        seed
      );

      // Create plane geometry
      const geometry = new THREE.PlaneGeometry(config.size, config.size);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: config.baseOpacity * (1 - layer * 0.12), // Layers fade slightly
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);

      // Position layer with depth offset along view direction
      const baseX = Math.cos(config.position.angle) * config.position.distance;
      const baseZ = Math.sin(config.position.angle) * config.position.distance;
      const baseY = config.position.height;

      // Offset each layer slightly in depth
      const depthOffset = (layer - config.layers / 2) * config.depthSpread;
      const offsetAngle = config.position.angle + Math.PI; // Offset towards camera
      nebula.position.set(
        baseX + Math.cos(offsetAngle) * depthOffset,
        baseY + (Math.random() - 0.5) * 8,
        baseZ + Math.sin(offsetAngle) * depthOffset
      );

      // Slight rotation variation for parallax effect
      nebula.rotation.x = (Math.random() - 0.5) * 0.3;
      nebula.rotation.y = (Math.random() - 0.5) * 0.3;
      nebula.rotation.z = Math.random() * Math.PI * 2;

      // Store animation data
      nebula.userData.rotationSpeed = (Math.random() - 0.5) * 0.00015;
      nebula.userData.baseOpacity = material.opacity;
      nebula.userData.isCloseLayer = (clusterIndex === 4 && layer < 2); // Foreground layers

      scene.add(nebula);
      nebulas.push(nebula);
    }
  });

  return nebulas;
}

/**
 * Animate starfield particles (twinkling, drift, and rotation)
 * @param {THREE.Points} particles - The starfield particle system
 */
export function animateStarfield(particles) {
  if (!particles) return;

  const positions = particles.geometry.attributes.position.array;
  const velocities = particles.geometry.userData.velocities;
  const time = Date.now() * 0.001;

  for (let i = 0; i < positions.length / 3; i++) {
    const i3 = i * 3;

    // Gentle vertical drift (sine wave) - only for some particles
    if (i % 10 === 0) {
      positions[i3 + 1] += Math.sin(time * 0.5 + i) * 0.01;
    }

    // Slow orbital rotation using stored velocities
    if (velocities) {
      positions[i3] += velocities[i3] * 10;
      positions[i3 + 1] += velocities[i3 + 1] * 10;
      positions[i3 + 2] += velocities[i3 + 2] * 10;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;

  // Twinkling effect via opacity
  const baseOpacity = 0.8;
  const twinkle = Math.sin(time * 2) * 0.2;
  particles.material.opacity = baseOpacity + twinkle;
}

/**
 * Animate nebulas (slow rotation and subtle opacity pulsing)
 * @param {THREE.Mesh[]} nebulas - Array of nebula meshes
 */
export function animateNebulas(nebulas) {
  const time = Date.now() * 0.001;

  nebulas.forEach((nebula, index) => {
    // Slow rotation at varying speeds for volumetric effect
    nebula.rotation.z += nebula.userData.rotationSpeed;
    nebula.rotation.x += nebula.userData.rotationSpeed * 0.3;
    nebula.rotation.y += nebula.userData.rotationSpeed * 0.15;

    // Breathing effect on close foreground layers
    if (nebula.userData.isCloseLayer) {
      const breathPhase = time * 0.3 + index * 0.5;
      const breathe = Math.sin(breathPhase) * 0.15 + 1.0; // [0.85, 1.15]
      nebula.material.opacity = nebula.userData.baseOpacity * breathe;
    }
  });
}
