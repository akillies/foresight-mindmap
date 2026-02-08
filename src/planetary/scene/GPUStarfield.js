/**
 * GPU Compute Starfield — 100K+ particles driven by TSL compute shaders.
 * Replaces CPU ParticleSystem.animateStarfield() on WebGPU-capable browsers.
 *
 * All three/webgpu and three/tsl imports are dynamic to avoid breaking jsdom tests.
 */
import { GPU_PARTICLE_CONFIG } from '@planetary/constants';

const PARTICLE_COUNT = GPU_PARTICLE_CONFIG.count;

/**
 * Create a GPU-driven starfield with compute shaders.
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.WebGPURenderer} renderer - WebGPU renderer instance
 * @returns {Promise<{ mesh, computeInit, computeUpdate, timeUniform, dispose }>}
 */
export async function createGPUStarfield(scene, renderer) {
  const THREE_GPU = await import('three/webgpu');
  const {
    Fn, instancedArray, instanceIndex, float, vec3, vec4,
    sin, cos, hash, deltaTime, uniform, mix, smoothstep,
    uv, If,
  } = await import('three/tsl');

  // --- Storage Buffers ---
  const positionBuffer = instancedArray(PARTICLE_COUNT, 'vec3');
  const velocityBuffer = instancedArray(PARTICLE_COUNT, 'vec3');
  const attribBuffer   = instancedArray(PARTICLE_COUNT, 'vec4');

  // --- Compute Init (runs once) ---
  const deadZone = float(GPU_PARTICLE_CONFIG.deadZone);

  const computeInit = Fn(() => {
    const idx = instanceIndex;
    const seed = float(idx);

    const spaceSize = float(GPU_PARTICLE_CONFIG.spaceSize);

    // Distribute in a spaceSize^3 cube
    const pos = vec3(
      hash(seed.add(0.0)).sub(0.5).mul(spaceSize),
      hash(seed.add(1.0)).sub(0.5).mul(spaceSize),
      hash(seed.add(2.0)).sub(0.5).mul(spaceSize),
    ).toVar();

    // Dead zone: push stars outward if too close to origin (where planets live)
    const dist = pos.length();
    If(dist.lessThan(deadZone), () => {
      const scale = deadZone.div(dist.max(float(0.01)));
      pos.assign(pos.mul(scale));
    });

    positionBuffer.element(idx).assign(pos);

    // Slow drift velocities
    const driftSpeed = float(GPU_PARTICLE_CONFIG.driftSpeed);
    const vx = hash(seed.add(3.0)).sub(0.5).mul(driftSpeed);
    const vy = hash(seed.add(4.0)).sub(0.5).mul(driftSpeed);
    const vz = hash(seed.add(5.0)).sub(0.5).mul(driftSpeed);
    velocityBuffer.element(idx).assign(vec3(vx, vy, vz));

    // Attributes: brightness(0-1), phase(0-2PI), colorIndex(0-3), size
    const brightness = hash(seed.add(6.0));
    const phase = hash(seed.add(7.0)).mul(6.28318);
    const colorIdx = hash(seed.add(8.0)).mul(4.0).floor();
    const sizeRange = float(GPU_PARTICLE_CONFIG.maxStarSize - GPU_PARTICLE_CONFIG.minStarSize);
    const size = hash(seed.add(9.0)).mul(sizeRange).add(float(GPU_PARTICLE_CONFIG.minStarSize));
    attribBuffer.element(idx).assign(vec4(brightness, phase, colorIdx, size));
  })().compute(PARTICLE_COUNT);

  // --- Compute Update (runs every frame) ---
  const timeUniform = uniform(0.0);

  const computeUpdate = Fn(() => {
    const idx = instanceIndex;
    const pos = positionBuffer.element(idx).toVar();
    const vel = velocityBuffer.element(idx).toVar();
    const attr = attribBuffer.element(idx).toVar();

    // Position drift
    pos.addAssign(vel.mul(10.0));

    // Gentle sine-wave vertical drift
    const yDrift = sin(timeUniform.mul(0.5).add(float(idx))).mul(0.002);
    pos.y.addAssign(yDrift);

    // Twinkle (brightness oscillation)
    const twinkleSpeed = float(GPU_PARTICLE_CONFIG.twinkleSpeed);
    const twinkle = sin(timeUniform.mul(twinkleSpeed).add(attr.y)).mul(0.3).add(0.7);
    attr.x.assign(twinkle);

    // Orbital rotation around origin (slow)
    const angle = deltaTime.mul(float(GPU_PARTICLE_CONFIG.orbitalSpeed));
    const newX = pos.x.mul(cos(angle)).sub(pos.z.mul(sin(angle)));
    const newZ = pos.x.mul(sin(angle)).add(pos.z.mul(cos(angle)));
    pos.x.assign(newX);
    pos.z.assign(newZ);

    // Reset particles that drift too far
    const resetDist = float(GPU_PARTICLE_CONFIG.resetDistance);
    const dist = pos.length();
    If(dist.greaterThan(resetDist), () => {
      const seed = float(idx).add(timeUniform);
      const spaceSize = float(GPU_PARTICLE_CONFIG.spaceSize);
      pos.x.assign(hash(seed.add(0.0)).sub(0.5).mul(spaceSize));
      pos.y.assign(hash(seed.add(1.0)).sub(0.5).mul(spaceSize));
      pos.z.assign(hash(seed.add(2.0)).sub(0.5).mul(spaceSize));
    });

    // Dead zone enforcement — keep stars out of the planet system
    const d2 = pos.length();
    If(d2.lessThan(deadZone), () => {
      const pushScale = deadZone.div(d2.max(float(0.01)));
      pos.assign(pos.mul(pushScale));
    });

    positionBuffer.element(idx).assign(pos);
    attribBuffer.element(idx).assign(attr);
  })().compute(PARTICLE_COUNT);

  // --- Rendering ---
  const starPos = positionBuffer.toAttribute();
  const starAttr = attribBuffer.toAttribute();

  const material = new THREE_GPU.SpriteNodeMaterial();

  // Procedural circle shape (soft dot)
  const dist = uv().sub(0.5).length().mul(2.0);
  const circleShape = smoothstep(float(1.0), float(0.4), dist);

  // LCARS color palette
  const lcarBlue  = vec3(0.361, 0.533, 0.855);  // #5C88DA
  const lcarAmber = vec3(1.0,   0.8,   0.4);    // #FFCC66
  const lcarWhite = vec3(1.0,   1.0,   1.0);    // #FFFFFF
  const lcarPink  = vec3(1.0,   0.42,  0.616);  // #FF6B9D

  // Select color by index (0=blue, 1=amber, 2=white, 3=pink)
  const colorIdx = starAttr.z;
  const starColor  = mix(lcarBlue, lcarAmber, smoothstep(float(0.5), float(1.5), colorIdx));
  const starColor2 = mix(starColor, lcarWhite, smoothstep(float(1.5), float(2.5), colorIdx));
  const finalColor = mix(starColor2, lcarPink, smoothstep(float(2.5), float(3.5), colorIdx));

  // Apply brightness (twinkle) from compute shader
  const brightness = starAttr.x;

  material.positionNode = starPos;
  material.colorNode = finalColor.mul(brightness);
  material.opacityNode = circleShape.mul(float(GPU_PARTICLE_CONFIG.baseOpacity));
  material.scaleNode = starAttr.w;
  material.blending = THREE_GPU.AdditiveBlending;
  material.transparent = true;
  material.depthWrite = false;

  // Create mesh
  const mesh = new THREE_GPU.Mesh(
    new THREE_GPU.PlaneGeometry(1, 1),
    material,
  );
  mesh.count = PARTICLE_COUNT;
  mesh.frustumCulled = false;
  scene.add(mesh);

  // Run init compute once
  renderer.compute(computeInit);

  return {
    mesh,
    computeInit,
    computeUpdate,
    timeUniform,
    dispose() {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    },
  };
}
