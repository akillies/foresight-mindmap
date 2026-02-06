/**
 * Particle System Module
 * Handles starfield, nebulas, and distant galaxies for cosmic background
 */
import * as THREE from 'three';
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

  for (let i = 0; i < particlesCount; i++) {
    // Position in 3D space (larger area for depth)
    positions[i * 3] = (Math.random() - 0.5) * 500;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

    // Color variation with LCARS palette
    const colorChoice = Math.random();
    const color = colorChoice < 0.4 ? lcarBlue :
                  colorChoice < 0.6 ? lcarAmber :
                  colorChoice < 0.75 ? white : lcarPink;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Variable star sizes (0.3 to 1.5) - some stars brighter/closer
    sizes[i] = Math.random() * 1.2 + 0.3;

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
    size: 1.0,
    vertexColors: true,
    opacity: 0.8,
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
  const lcarColors = [0x5C88DA, 0xCC99CC];

  for (let i = 0; i < galaxyCount; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Create radial gradient for galaxy glow
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    const color = lcarColors[i % lcarColors.length];
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.05)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const sprite = new THREE.Sprite(material);
    const angle = (i / galaxyCount) * Math.PI * 2;
    const distance = 220 + Math.random() * 30;
    sprite.position.set(
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 80,
      Math.sin(angle) * distance
    );
    sprite.scale.set(30 + Math.random() * 15, 30 + Math.random() * 15, 1);

    scene.add(sprite);
  }
}

/**
 * Create animated nebula backgrounds
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Mesh[]} Array of nebula meshes for animation
 */
export function createNebulas(scene) {
  const nebulaCount = SCENE_CONFIG.nebulaCount;
  const nebulas = [];
  const nebulaColors = [
    { primary: [92, 136, 218], secondary: [204, 153, 204] },   // Blue to Purple
    { primary: [255, 107, 157], secondary: [153, 78, 221] },   // Pink to Purple
    { primary: [99, 204, 153], secondary: [92, 136, 218] }     // Teal to Blue
  ];

  for (let i = 0; i < nebulaCount; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create complex nebula with multiple gradients
    const colors = nebulaColors[i];

    // Background radial gradient
    const gradient1 = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient1.addColorStop(0, `rgba(${colors.primary[0]}, ${colors.primary[1]}, ${colors.primary[2]}, 0.08)`);
    gradient1.addColorStop(0.4, `rgba(${colors.secondary[0]}, ${colors.secondary[1]}, ${colors.secondary[2]}, 0.04)`);
    gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, 512, 512);

    // Add second offset gradient for depth
    const gradient2 = ctx.createRadialGradient(
      256 + Math.random() * 100 - 50,
      256 + Math.random() * 100 - 50,
      0,
      256,
      256,
      200
    );
    gradient2.addColorStop(0, `rgba(${colors.secondary[0]}, ${colors.secondary[1]}, ${colors.secondary[2]}, 0.06)`);
    gradient2.addColorStop(0.5, `rgba(${colors.primary[0]}, ${colors.primary[1]}, ${colors.primary[2]}, 0.03)`);
    gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, 512, 512);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Create large plane for nebula
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const nebula = new THREE.Mesh(geometry, material);

    // Position nebulas at different depths and angles
    const angle = (i / nebulaCount) * Math.PI * 2;
    const distance = 180 + i * 20;
    nebula.position.set(
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 60,
      Math.sin(angle) * distance
    );

    // Random rotation for variety
    nebula.rotation.z = Math.random() * Math.PI * 2;

    // Store rotation speed for animation
    nebula.userData.rotationSpeed = (Math.random() - 0.5) * 0.0002;

    scene.add(nebula);
    nebulas.push(nebula);
  }

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
 * Animate nebulas (slow rotation)
 * @param {THREE.Mesh[]} nebulas - Array of nebula meshes
 */
export function animateNebulas(nebulas) {
  nebulas.forEach((nebula) => {
    nebula.rotation.z += nebula.userData.rotationSpeed;
  });
}
