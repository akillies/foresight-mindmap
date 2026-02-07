# Phase 4: GPU Compute Particle System — Implementation Plan

> **Status**: Research complete, ready for implementation
> **Three.js version**: 0.182.0
> **Browser target**: Chrome 113+, Edge 113+, Safari 26+, Firefox (behind flag)
> **Fallback**: Existing CPU `animateStarfield()` on WebGL

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [File Structure](#2-file-structure)
3. [GPU Starfield (100K+ particles)](#3-gpu-starfield-100k-particles)
4. [WGSL Shader Reference](#4-wgsl-shader-reference)
5. [Raymarched Volumetric Nebula](#5-raymarched-volumetric-nebula)
6. [GPU-Instanced Asteroid Belts](#6-gpu-instanced-asteroid-belts)
7. [LOD System for Planets](#7-lod-system-for-planets)
8. [Dual-Path Architecture](#8-dual-path-architecture)
9. [Performance Budget](#9-performance-budget)
10. [Migration Strategy](#10-migration-strategy)
11. [Sources](#11-sources)

---

## 1. Architecture Overview

The current `ParticleSystem.js` drives 4000 particles with per-frame CPU loops
(`animateStarfield()` iterates all positions in JS). Phase 4 replaces this with
GPU compute shaders on WebGPU, keeping the CPU path as a fallback.

```
┌──────────────────────────────────────────────────┐
│                   useThreeScene                  │
│                                                  │
│  ┌────────────┐   capabilities.compute?          │
│  │ SceneSetup │──────────┐                       │
│  └────────────┘    yes   │   no                  │
│                    ▼     ▼                       │
│          ┌──────────┐ ┌───────────────────┐      │
│          │ GPUStars │ │ ParticleSystem.js  │      │
│          │  .js     │ │ (existing CPU)     │      │
│          └──────────┘ └───────────────────┘      │
│          100K pts     4K pts                     │
│          0% CPU/frame JS loop/frame              │
│                                                  │
│  ┌────────────────┐  ┌────────────────────┐      │
│  │ NebulaVolume   │  │ AsteroidBelt       │      │
│  │ (raymarched)   │  │ (InstancedMesh)    │      │
│  └────────────────┘  └────────────────────┘      │
│  quarter-res RT       200-500 instances/belt     │
│                                                  │
│  ┌────────────────┐                              │
│  │ PlanetLOD      │                              │
│  │ (THREE.LOD)    │                              │
│  └────────────────┘                              │
│  3-tier distance switching                       │
└──────────────────────────────────────────────────┘
```

---

## 2. File Structure

New files (all under `src/scene/`):

```
src/scene/
├── ParticleSystem.js          # Existing — untouched, becomes WebGL fallback
├── GPUStarfield.js            # NEW — GPU compute starfield (100K+)
├── NebulaVolume.js            # NEW — Raymarched volumetric nebula
├── AsteroidBelt.js            # NEW — GPU-instanced asteroid ring
├── PlanetLOD.js               # NEW — LOD wrapper for planet nodes
└── materials/
    └── BiomeTextures.js       # Existing — untouched
```

Modifications:
- `useThreeScene.js` — branch on `capabilities.compute` to pick GPU vs CPU path
- `constants.js` — add `GPU_PARTICLE_CONFIG` constants
- `index.js` — export new modules

---

## 3. GPU Starfield (100K+ particles)

### 3.1 Import Pattern

All TSL/WebGPU imports MUST be dynamic to avoid breaking jsdom tests:

```javascript
// GPUStarfield.js
export async function createGPUStarfield(scene, renderer) {
  const THREE_GPU = await import('three/webgpu');
  const {
    Fn, instancedArray, instanceIndex, float, vec3, vec4,
    sin, cos, hash, deltaTime, uniform, mix, smoothstep,
    billboarding, uv, If,
  } = await import('three/tsl');

  // ... setup below
}
```

### 3.2 Storage Buffers

Three persistent GPU buffers store the full particle state:

```javascript
const PARTICLE_COUNT = 100_000;

// 3 floats per particle: x, y, z
const positionBuffer  = instancedArray(PARTICLE_COUNT, 'vec3');
// 3 floats per particle: vx, vy, vz
const velocityBuffer  = instancedArray(PARTICLE_COUNT, 'vec3');
// 4 floats per particle: brightness, phase, colorIndex, size
const attribBuffer    = instancedArray(PARTICLE_COUNT, 'vec4');
```

**Memory**: 100K * (3+3+4) * 4 bytes = **4 MB** GPU-side. Trivial.

### 3.3 Compute Init (runs once)

```javascript
const computeInit = Fn(() => {
  const idx = instanceIndex;
  const seed = float(idx);

  // Distribute in a 500x500x500 cube (matches current SCENE_CONFIG)
  const px = hash(seed.add(0.0)).sub(0.5).mul(500.0);
  const py = hash(seed.add(1.0)).sub(0.5).mul(500.0);
  const pz = hash(seed.add(2.0)).sub(0.5).mul(500.0);
  positionBuffer.element(idx).assign(vec3(px, py, pz));

  // Slow drift velocities (matches current 0.0001 range)
  const vx = hash(seed.add(3.0)).sub(0.5).mul(0.001);
  const vy = hash(seed.add(4.0)).sub(0.5).mul(0.001);
  const vz = hash(seed.add(5.0)).sub(0.5).mul(0.001);
  velocityBuffer.element(idx).assign(vec3(vx, vy, vz));

  // Attributes: brightness(0-1), phase(0-2PI), colorIndex(0-3), size(0.3-1.5)
  const brightness = hash(seed.add(6.0));
  const phase = hash(seed.add(7.0)).mul(6.28318);
  const colorIdx = hash(seed.add(8.0)).mul(4.0).floor();
  const size = hash(seed.add(9.0)).mul(1.2).add(0.3);
  attribBuffer.element(idx).assign(vec4(brightness, phase, colorIdx, size));
})().compute(PARTICLE_COUNT);
```

### 3.4 Compute Update (runs every frame)

```javascript
const timeUniform = uniform(0.0);

const computeUpdate = Fn(() => {
  const idx = instanceIndex;
  const pos = positionBuffer.element(idx).toVar();
  const vel = velocityBuffer.element(idx).toVar();
  const attr = attribBuffer.element(idx).toVar();

  // --- Position drift ---
  pos.addAssign(vel.mul(10.0)); // scale factor matches current *10

  // --- Gentle sine-wave vertical drift (every 10th particle) ---
  // GPU equivalent: modulate Y for all particles with small amplitude
  const yDrift = sin(timeUniform.mul(0.5).add(float(idx))).mul(0.002);
  pos.y.addAssign(yDrift);

  // --- Twinkle (brightness oscillation) ---
  const twinkle = sin(timeUniform.mul(2.0).add(attr.y)).mul(0.3).add(0.7);
  attr.x.assign(twinkle);

  // --- Orbital rotation around origin (slow) ---
  const angle = deltaTime.mul(0.0003);
  const newX = pos.x.mul(cos(angle)).sub(pos.z.mul(sin(angle)));
  const newZ = pos.x.mul(sin(angle)).add(pos.z.mul(cos(angle)));
  pos.x.assign(newX);
  pos.z.assign(newZ);

  // --- Reset particles that drift too far (beyond 300 units) ---
  const dist = pos.length();
  If(dist.greaterThan(300.0), () => {
    const seed = float(idx).add(timeUniform);
    pos.x.assign(hash(seed.add(0.0)).sub(0.5).mul(500.0));
    pos.y.assign(hash(seed.add(1.0)).sub(0.5).mul(500.0));
    pos.z.assign(hash(seed.add(2.0)).sub(0.5).mul(500.0));
  });

  positionBuffer.element(idx).assign(pos);
  attribBuffer.element(idx).assign(attr);
})().compute(PARTICLE_COUNT);
```

### 3.5 Rendering (SpriteNodeMaterial from storage buffers)

```javascript
// Convert storage buffers to vertex attributes (zero-copy GPU read)
const starPos = positionBuffer.toAttribute();
const starAttr = attribBuffer.toAttribute();

const material = new THREE_GPU.SpriteNodeMaterial();

// Procedural circle shape (soft dot)
const dist = uv().sub(0.5).length().mul(2.0);
const circleShape = smoothstep(float(1.0), float(0.4), dist);

// LCARS color palette (matches constants.js)
const lcarBlue   = vec3(0.361, 0.533, 0.855);  // #5C88DA
const lcarAmber  = vec3(1.0,   0.8,   0.4);    // #FFCC66
const lcarWhite  = vec3(1.0,   1.0,   1.0);    // #FFFFFF
const lcarPink   = vec3(1.0,   0.42,  0.616);  // #FF6B9D

// Select color by index (0=blue 40%, 1=amber 20%, 2=white 15%, 3=pink 25%)
const colorIdx = starAttr.z;  // colorIndex stored in attrib.z
const starColor = mix(lcarBlue, lcarAmber, smoothstep(float(0.5), float(1.5), colorIdx));
// Layer in white and pink at higher indices
const starColor2 = mix(starColor, lcarWhite, smoothstep(float(1.5), float(2.5), colorIdx));
const finalColor = mix(starColor2, lcarPink, smoothstep(float(2.5), float(3.5), colorIdx));

// Apply brightness (twinkle) from compute shader
const brightness = starAttr.x;

material.positionNode = starPos;
material.colorNode = finalColor.mul(brightness);
material.opacityNode = circleShape.mul(0.8);
material.scaleNode = starAttr.w;  // per-particle size
material.blending = THREE_GPU.AdditiveBlending;
material.transparent = true;
material.depthWrite = false;

// Create mesh with SpriteGeometry (auto-billboard quads)
const starMesh = new THREE_GPU.Mesh(
  new THREE_GPU.PlaneGeometry(1, 1),
  material
);
starMesh.count = PARTICLE_COUNT;
starMesh.frustumCulled = false; // stars are everywhere
scene.add(starMesh);
```

### 3.6 Animation Loop Integration

In `useThreeScene.js`, the animation loop calls:

```javascript
// Inside animate():
if (gpuStarfield) {
  timeUniform.value = Date.now() * 0.001;
  renderer.compute(computeUpdate);  // synchronous dispatch
}
// Then render as normal via postProcessing.render()
```

**Key detail**: Use `renderer.compute()` (synchronous), not
`renderer.computeAsync()`. The synchronous version ensures the compute
pass completes before the render pass reads the buffers. Async is only
needed when you want to overlap compute with other CPU work.

### 3.7 Workgroup Size

Default workgroup size is `[64]`. For 100K particles:
- Dispatch count: `ceil(100000 / 64) = 1563` workgroups
- Well within GPU limits (max 65535 per dimension)
- No need to customize workgroup size

To explicitly set it:
```javascript
computeUpdate().compute(PARTICLE_COUNT, [64]);
```

---

## 4. WGSL Shader Reference

While TSL compiles to WGSL automatically, here is the equivalent raw WGSL
for the particle update, useful as a reference or if `wgslFn()` is ever needed:

```wgsl
struct Particle {
  position: vec3<f32>,
  velocity: vec3<f32>,
  brightness: f32,
  phase: f32,
  colorIndex: f32,
  size: f32,
};

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> time: f32;
@group(0) @binding(2) var<uniform> dt: f32;

// Simple hash function
fn hash11(p: f32) -> f32 {
  var x = fract(p * 0.1031);
  x *= x + 33.33;
  x *= x + x;
  return fract(x);
}

@compute @workgroup_size(64)
fn updateParticles(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  let count = arrayLength(&particles);
  if (idx >= count) { return; }

  var p = particles[idx];

  // Position drift
  p.position += p.velocity * 10.0;

  // Vertical sine drift
  let yDrift = sin(time * 0.5 + f32(idx)) * 0.002;
  p.position.y += yDrift;

  // Twinkle
  p.brightness = sin(time * 2.0 + p.phase) * 0.3 + 0.7;

  // Orbital rotation
  let angle = dt * 0.0003;
  let cosA = cos(angle);
  let sinA = sin(angle);
  let newX = p.position.x * cosA - p.position.z * sinA;
  let newZ = p.position.x * sinA + p.position.z * cosA;
  p.position.x = newX;
  p.position.z = newZ;

  // Reset far particles
  let dist = length(p.position);
  if (dist > 300.0) {
    let seed = f32(idx) + time;
    p.position = vec3<f32>(
      (hash11(seed + 0.0) - 0.5) * 500.0,
      (hash11(seed + 1.0) - 0.5) * 500.0,
      (hash11(seed + 2.0) - 0.5) * 500.0
    );
  }

  particles[idx] = p;
}
```

**Note**: In practice, TSL handles WGSL generation. This shader is provided
as a specification reference only. The TSL `Fn()` approach from Section 3.4
is the recommended implementation path.

---

## 5. Raymarched Volumetric Nebula

### 5.1 Approach

Replace the current 3-plane nebula sprites with a single full-screen quad
that raymarches through 3D noise volumes. Render at quarter resolution
(0.25x) to keep the fill rate manageable.

### 5.2 Quarter-Resolution Pipeline

```javascript
export async function createNebulaVolume(renderer, scene, camera) {
  const THREE_GPU = await import('three/webgpu');
  const { Fn, uniform, uv, vec2, vec3, vec4, float,
          sin, cos, length, smoothstep, mix, fract,
          dot, abs, floor, clamp, texture, pass } = await import('three/tsl');

  // Quarter-res render target
  const w = Math.floor(window.innerWidth / 4);
  const h = Math.floor(window.innerHeight / 4);
  const nebulaRT = new THREE_GPU.RenderTarget(w, h, {
    type: THREE_GPU.HalfFloatType,
    magFilter: THREE_GPU.LinearFilter,
    minFilter: THREE_GPU.LinearFilter,
  });

  // Nebula scene (single full-screen quad)
  const nebulaScene = new THREE_GPU.Scene();
  const nebulaCamera = new THREE_GPU.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Raymarching material using MeshBasicNodeMaterial
  const nebulaMaterial = new THREE_GPU.MeshBasicNodeMaterial();
  nebulaMaterial.transparent = true;
  nebulaMaterial.blending = THREE_GPU.AdditiveBlending;
  nebulaMaterial.depthWrite = false;

  // TSL raymarching shader for the nebula
  // (simplified 3D noise with octave layering)
  const timeU = uniform(0.0);
  const cameraPos = uniform(new THREE_GPU.Vector3());
  const cameraDir = uniform(new THREE_GPU.Vector3());

  nebulaMaterial.colorNode = Fn(() => {
    // Raymarching through noise volumes
    // Each step samples 3D simplex noise, accumulates color+opacity
    // Color palette: blue-to-purple and pink-to-purple (from current nebula colors)
    // 16-32 steps sufficient at quarter res
    // Return vec4(color.rgb, alpha)
    return vec4(0.0, 0.0, 0.0, 0.0); // placeholder — full shader TBD
  })();

  const quad = new THREE_GPU.Mesh(
    new THREE_GPU.PlaneGeometry(2, 2),
    nebulaMaterial
  );
  nebulaScene.add(quad);

  return {
    renderTarget: nebulaRT,
    nebulaScene,
    nebulaCamera,
    timeUniform: timeU,
    cameraPosUniform: cameraPos,
    cameraDirUniform: cameraDir,
    resize(width, height) {
      nebulaRT.setSize(Math.floor(width / 4), Math.floor(height / 4));
    },
  };
}
```

### 5.3 Compositing

In the post-processing pipeline, the quarter-res nebula texture is
composited onto the main scene pass:

```javascript
// In PostProcessingSetup.js (modified)
const scenePass = pass(scene, camera);
const sceneColor = scenePass.getTextureNode('output');
const bloomPass = bloom(sceneColor);
const nebulaTexture = texture(nebulaRT.texture);

// Additive composite: scene + bloom + nebula
postProcessing.outputNode = sceneColor.add(bloomPass).add(nebulaTexture);
```

### 5.4 Recommendation

The raymarched nebula is the most complex sub-feature. **Recommendation**:
implement Phases 3.1-3.4 (GPU starfield, asteroid belts, LOD) first, then
tackle the volumetric nebula as a separate PR. The current sprite-based
nebulas look good and have near-zero cost.

---

## 6. GPU-Instanced Asteroid Belts

### 6.1 Concept

Each Level-1 planet can optionally have an asteroid belt rendered as a single
`InstancedMesh` with 200-500 deformed icosahedrons.

### 6.2 Implementation

```javascript
// AsteroidBelt.js
import * as THREE from 'three';

/**
 * Create an asteroid belt around a planet node.
 * Single draw call for all asteroids via InstancedMesh.
 *
 * @param {THREE.Object3D} planet - The planet to orbit
 * @param {object} options
 * @param {number} options.count - Number of asteroids (200-500)
 * @param {number} options.innerRadius - Inner ring radius
 * @param {number} options.outerRadius - Outer ring radius
 * @param {number} options.color - Belt color (hex)
 * @returns {{ mesh: THREE.InstancedMesh, update: (time: number) => void }}
 */
export function createAsteroidBelt(planet, {
  count = 300,
  innerRadius = 4.0,
  outerRadius = 6.0,
  color = 0x888888,
} = {}) {
  // Deformed icosahedron (detail level 0 = 12 faces, very cheap)
  const baseGeo = new THREE.IcosahedronGeometry(0.15, 0);

  // Deform vertices for rocky appearance (done once on geometry)
  const posAttr = baseGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const scale = 0.7 + Math.random() * 0.6; // 0.7-1.3x deformation
    posAttr.setXYZ(i, x * scale, y * scale, z * scale);
  }
  baseGeo.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true,
  });

  const mesh = new THREE.InstancedMesh(baseGeo, material, count);

  // Pre-compute orbital parameters per asteroid
  const dummy = new THREE.Object3D();
  const angles = new Float32Array(count);
  const radii = new Float32Array(count);
  const speeds = new Float32Array(count);
  const tilts = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const speed = 0.0001 + Math.random() * 0.0002; // slow orbital speed
    const tilt = (Math.random() - 0.5) * 0.3;      // slight Y offset

    angles[i] = angle;
    radii[i] = radius;
    speeds[i] = speed;
    tilts[i] = tilt;

    // Initial transform
    dummy.position.set(
      Math.cos(angle) * radius,
      tilt,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    dummy.scale.setScalar(0.5 + Math.random() * 1.0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  // Attach to planet as child so it inherits planet position
  planet.add(mesh);

  // Animate: slow orbital rotation
  const update = (time) => {
    for (let i = 0; i < count; i++) {
      const a = angles[i] + time * speeds[i];
      dummy.position.set(
        Math.cos(a) * radii[i],
        tilts[i],
        Math.sin(a) * radii[i]
      );
      // Slow tumble
      dummy.rotation.x += speeds[i] * 0.5;
      dummy.rotation.y += speeds[i] * 0.3;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  return { mesh, update };
}
```

### 6.3 Performance

- 300 asteroids = 1 draw call (vs 300 for individual meshes)
- 12 triangles per asteroid * 300 = 3600 triangles total (trivial)
- Matrix update is ~300 matrix multiplications per frame (< 0.1ms)
- Can go up to 500 without concern

### 6.4 GPU-Driven Alternative (Future)

For 10K+ asteroids, replace `setMatrixAt` loop with a TSL compute shader
that updates the instance matrices on GPU. Not needed at 200-500 scale.

---

## 7. LOD System for Planets

### 7.1 Three.js LOD API

```javascript
const lod = new THREE.LOD();

// Level 0 (close): Full procedural surface + atmosphere + clouds
lod.addLevel(fullPlanetMesh, 0);

// Level 1 (mid): Simplified surface + atmosphere, no clouds
lod.addLevel(simplePlanetMesh, 30);

// Level 2 (far): Current colored sphere with glow
lod.addLevel(simpleSphere, 80);

scene.add(lod);
// LOD.autoUpdate = true by default — uses camera distance
```

### 7.2 PlanetLOD Wrapper

```javascript
// PlanetLOD.js
import * as THREE from 'three';
import { createPlanet } from './PlanetFactory';
import { PLANET_CONFIG } from '../constants';

/**
 * LOD thresholds (world units from camera)
 */
const LOD_DISTANCES = {
  HIGH: 0,    // < 30 units: full detail
  MED: 30,    // 30-80 units: simplified
  LOW: 80,    // 80+ units: colored sphere
};

/**
 * Create a LOD-enabled planet node.
 * @param {object} params - Same params as createPlanet
 * @returns {THREE.LOD}
 */
export function createPlanetLOD(params) {
  const { color, biome, position, userData } = params;
  const planetColor = new THREE.Color(color);
  const lod = new THREE.LOD();

  // HIGH: Full planet from PlanetFactory (48-segment sphere + atmosphere + glow)
  const highDetail = createPlanet(params);
  // Remove from scene if it was added — we manage it via LOD
  lod.addLevel(highDetail, LOD_DISTANCES.HIGH);

  // MED: 24-segment sphere + atmosphere, no outer glow
  const medGeo = new THREE.SphereGeometry(PLANET_CONFIG.planet.size, 24, 24);
  const medMat = new THREE.MeshStandardMaterial({
    color: planetColor,
    emissive: planetColor,
    emissiveIntensity: 0.15,
    roughness: 0.7,
    metalness: 0.1,
  });
  const medMesh = new THREE.Mesh(medGeo, medMat);
  medMesh.userData = { ...userData, celestialType: 'planet', biome };
  medMesh.originalY = position.y;
  // Add thin atmosphere
  const medAtmo = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 1.1, 16, 16),
    new THREE.MeshBasicMaterial({
      color: planetColor,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  medMesh.add(medAtmo);
  lod.addLevel(medMesh, LOD_DISTANCES.MED);

  // LOW: 12-segment sphere with glow (current pre-planetary style)
  const lowGeo = new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 0.8, 12, 12);
  const lowMat = new THREE.MeshBasicMaterial({
    color: planetColor,
    transparent: true,
    opacity: 0.85,
  });
  const lowMesh = new THREE.Mesh(lowGeo, lowMat);
  lowMesh.userData = { ...userData, celestialType: 'planet', biome };
  lowMesh.originalY = position.y;
  // Glow
  const lowGlow = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_CONFIG.planet.size * 1.5, 8, 8),
    new THREE.MeshBasicMaterial({
      color: planetColor,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
  );
  lowMesh.add(lowGlow);
  lod.addLevel(lowMesh, LOD_DISTANCES.LOW);

  // Position the LOD group
  lod.position.copy(position);
  lod.userData = { ...userData, celestialType: 'planet', biome };

  return lod;
}
```

### 7.3 LOD Update

`THREE.LOD` has `autoUpdate = true` by default. When using
`WebGPURenderer`, the update happens automatically during
`renderer.render()`. No manual `lod.update(camera)` call is needed
unless `autoUpdate` is set to `false`.

### 7.4 Vertex Count Savings

| Level | Segments | Vertices | When |
|-------|----------|----------|------|
| HIGH  | 48x48    | ~2,352   | < 30 units |
| MED   | 24x24    | ~600     | 30-80 units |
| LOW   | 12x12    | ~156     | 80+ units |

For 6 planets: worst case 6*2352 = 14K verts (close), typical 6*156 = ~1K verts (far).

---

## 8. Dual-Path Architecture

### 8.1 Detection

The capability is already exposed by `RendererFactory.js`:

```javascript
const { renderer, isWebGPU, capabilities } = await createRenderer(container);
// capabilities.compute === true  → WebGPU with compute shaders
// capabilities.compute === false → WebGL fallback
```

### 8.2 Branching in useThreeScene.js

```javascript
// In the async IIFE:
let gpuStarfield = null;
let cpuParticles = null;

if (capabilities.compute) {
  // GPU path: 100K particles, zero CPU per frame
  gpuStarfield = await createGPUStarfield(scene, renderer);
} else {
  // CPU fallback: existing 4K particles
  cpuParticles = createStarfield(scene);
}

// Nebulas: keep existing sprite-based for now (both paths)
const nebulas = createNebulas(scene);

// In animate():
if (gpuStarfield) {
  gpuStarfield.timeUniform.value = Date.now() * 0.001;
  renderer.compute(gpuStarfield.computeUpdate);
} else {
  animateStarfield(cpuParticles);
}
animateNebulas(nebulas);
```

### 8.3 Visual Parity

Both paths produce the same output:
- Same color palette (LCARS blue, amber, white, pink)
- Same spatial distribution (500x500x500 cube)
- Same additive blending with transparency
- Same twinkle/drift behavior

The GPU path simply does it with 25x more particles and 0% CPU cost.

### 8.4 Disposal

```javascript
// GPU path cleanup
if (gpuStarfield) {
  scene.remove(gpuStarfield.mesh);
  gpuStarfield.mesh.geometry.dispose();
  gpuStarfield.mesh.material.dispose();
  // Storage buffers are garbage collected with the renderer
}
```

---

## 9. Performance Budget

### 9.1 GPU Frame Budget (target: < 8ms at 120 FPS)

| Component | Draw Calls | GPU Time (est.) | Notes |
|-----------|-----------|----------------|-------|
| Starfield compute | 0 DC, 1 dispatch | ~0.3ms | 100K particles, 64 threads/WG |
| Starfield render | 1 DC | ~0.5ms | 100K sprites, additive blend |
| Nebula sprites (existing) | 3 DC | ~0.1ms | Simple textured planes |
| Asteroid belts (3) | 3 DC | ~0.2ms | 300 instances each, 12 tri/inst |
| Planets (6 LOD) | 6 DC | ~0.3ms | LOD reduces to 156 verts at distance |
| Connections | ~15 DC | ~0.2ms | Tube geometries |
| Post-processing | 2 passes | ~1.0ms | Bloom (threshold + blur) |
| **Total** | **~30 DC** | **~2.6ms** | Well under 8ms budget |

### 9.2 CPU Frame Budget (target: < 2ms)

| Component | CPU Time (est.) | Notes |
|-----------|----------------|-------|
| Starfield (GPU) | 0ms | Compute shader, no JS loop |
| Asteroid belt matrix update | ~0.1ms | 900 matrix ops (3 belts * 300) |
| Node animation (20 nodes) | ~0.1ms | Float/pulse/scale lerp |
| Raycasting | ~0.2ms | Against ~20 nodes |
| Controls update | ~0.1ms | camera-controls dampening |
| **Total** | **~0.5ms** | Well under 2ms budget |

### 9.3 Memory Budget

| Component | GPU Memory | Notes |
|-----------|-----------|-------|
| Starfield buffers | 4 MB | 100K * 10 floats * 4 bytes |
| Asteroid instances | ~0.3 MB | 900 matrices (64 bytes each) |
| Planet textures (cached) | ~6 MB | 6 biome textures @ 512x512 |
| Bloom render targets | ~8 MB | 2 full-res RGBA16F |
| **Total** | **~18 MB** | Modest for modern GPUs |

---

## 10. Migration Strategy

### Phase 4a: GPU Starfield (1-2 sessions)
1. Create `src/scene/GPUStarfield.js` with all code from Section 3
2. Add `GPU_PARTICLE_CONFIG` to `constants.js`
3. Modify `useThreeScene.js` to branch on `capabilities.compute`
4. Test: `?forceWebGL` should use CPU path, default should use GPU path
5. Verify visual parity with existing starfield

### Phase 4b: Asteroid Belts (1 session)
1. Create `src/scene/AsteroidBelt.js` per Section 6
2. Integrate in `NodeFactory.js` or `PlanetFactory.js` — call `createAsteroidBelt`
   when creating Level-1 planets
3. Add belt toggle to constants (optional per-planet)

### Phase 4c: Planet LOD (1 session)
1. Create `src/scene/PlanetLOD.js` per Section 7
2. Replace `createPlanet()` calls with `createPlanetLOD()` in NodeFactory
3. Verify raycasting still works (LOD children are raycasted automatically)
4. Test at various zoom levels

### Phase 4d: Volumetric Nebula (optional, 2+ sessions)
1. Create `src/scene/NebulaVolume.js` per Section 5
2. Implement 3D noise function in TSL (Simplex or Value noise)
3. Integrate quarter-res RT into post-processing pipeline
4. This is optional — current sprite nebulas are visually fine

### Testing Strategy
- All existing 31 tests must pass (no Three.js imports in test code)
- Manual testing:
  - Default URL: WebGPU path with 100K particles
  - `?forceWebGL`: CPU fallback with 4K particles
  - Verify LCARS colors match in both paths
  - Verify performance with browser DevTools GPU profiler
  - Test on Safari 26+ (WebGPU) and older browsers (WebGL fallback)

---

## 11. Sources

- [Three.js TSL Documentation](https://threejs.org/docs/pages/TSL.html) — Compute, storage, instancedArray, all TSL nodes
- [Three.js StorageBufferAttribute Documentation](https://threejs.org/docs/pages/StorageBufferAttribute.html) — GPU storage buffer API
- [Three.js LOD Documentation](https://threejs.org/docs/pages/LOD.html) — Level of detail API
- [Three.js InstancedMesh Documentation](https://threejs.org/docs/pages/InstancedMesh.html) — GPU instancing API
- [Three.js WebGPU Particles Example](https://github.com/mrdoob/three.js/blob/master/examples/webgpu_particles.html) — Official SpriteNodeMaterial example
- [Galaxy Simulation with WebGPU Compute Shaders](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders) — 1M particle galaxy with instancedArray, computeAsync, SpriteNodeMaterial
- [Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/) — Comprehensive TSL tutorial
- [GPGPU Particles with TSL & WebGPU (Wawa Sensei)](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu) — React Three Fiber GPGPU tutorial
- [WebGPU Compute Shaders Fundamentals](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html) — WGSL workgroup size and dispatch patterns
- [Three.js Compute Particles Rain Example](https://github.com/mrdoob/three.js/blob/master/examples/webgpu_compute_particles_rain.html) — instancedArray + compute + billboarding

