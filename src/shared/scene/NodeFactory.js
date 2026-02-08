/**
 * Node Factory Module
 * Creates and manages 3D nodes for the mind map visualization.
 *
 * When planetary mode is enabled (via setPlanetaryMode), delegates to
 * PlanetFactory for visually rich celestial bodies. Otherwise falls back
 * to the original glowing-sphere style.
 */
import * as THREE from 'three';
import mindMapData from '@shared/mindMapData';
import { COLORS, MEDIA_COLORS, SCENE_CONFIG, MATERIAL_DEFAULTS } from '@shared/constants';
import { BIOME_MAP, PLANET_CONFIG } from '@planetary/constants';
import { createConnection } from './ConnectionManager';
import { createStar, createPlanet, createMoon, createStation } from '@planetary/scene/PlanetFactory';
import { createPlanetLOD } from '@planetary/scene/PlanetLOD';
import { createAsteroidBelt } from '@planetary/scene/AsteroidBelt';

// Module-level flag — set by useThreeScene after renderer init
let usePlanetary = false;

// Active asteroid belts — each { mesh, update(time) }; updated by animation loop
const asteroidBelts = [];

/**
 * Enable or disable planetary node rendering.
 * Call with `true` after confirming the renderer supports it.
 */
export function setPlanetaryMode(enabled) {
  usePlanetary = enabled;
  if (!enabled) asteroidBelts.length = 0;
}

/**
 * Get active asteroid belts for animation loop updates.
 * @returns {{ mesh: THREE.InstancedMesh, update: (time: number) => void }[]}
 */
export function getAsteroidBelts() {
  return asteroidBelts;
}

/**
 * Create a node with glow effects (legacy fallback style)
 * @param {Object} params - Node parameters
 * @returns {THREE.Mesh} The created node mesh
 */
function createNodeMesh({ color, size, materialDefaults, position, userData }) {
  // Main sphere - glass-like with emissive glow
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: materialDefaults.emissiveIntensity,
    roughness: materialDefaults.roughness,
    metalness: materialDefaults.metalness,
    transparent: true,
    opacity: materialDefaults.opacity,
  });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(position);
  sphere.userData = userData;
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.originalY = position.y;

  // Inner bright core (energy center)
  const coreSize = size * 0.6;
  const coreGeometry = new THREE.SphereGeometry(coreSize, 16, 16);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  sphere.add(core);

  // Inner glow layer (fresnel-like effect)
  const innerGlowSize = size * 0.97;
  const innerGlowGeometry = new THREE.SphereGeometry(innerGlowSize, 32, 32);
  const innerGlowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.25,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
  sphere.add(innerGlow);

  // Outer glow effect (larger, more diffuse)
  const outerGlowSize = size * 1.4;
  const glowGeometry = new THREE.SphereGeometry(outerGlowSize, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sphere.add(glow);

  return sphere;
}

/**
 * Create the center node (Level 0)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Mesh[]} nodesRef - Array to store node references
 */
export function createCenterNode(scene, nodesRef) {
  const { center } = mindMapData;
  const position = new THREE.Vector3(0, 0, 0);

  let node;
  if (usePlanetary) {
    node = createStar({ color: center.color, position, userData: center });
  } else {
    node = createNodeMesh({
      color: center.color,
      size: SCENE_CONFIG.centerNodeSize,
      materialDefaults: MATERIAL_DEFAULTS.center,
      position,
      userData: center,
    });
    node.children[0].material.opacity = 0.6;
    node.children[1].material.opacity = 0.3;
    node.children[2].material.opacity = 0.15;
  }

  scene.add(node);
  nodesRef.push(node);
}

/**
 * Create Level 1 Nodes (Six Pillars)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Mesh[]} nodesRef - Array to store node references
 * @param {THREE.Line[]} connectionsRef - Array to store connection references
 */
export function createLevel1Nodes(scene, nodesRef, connectionsRef) {
  const { level1 } = mindMapData;
  const radius = SCENE_CONFIG.level1Radius;
  const angleStep = (Math.PI * 2) / level1.length;

  level1.forEach((pillar, index) => {
    const angle = index * angleStep;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0;
    const position = new THREE.Vector3(x, y, z);

    let node;
    if (usePlanetary) {
      const biome = pillar.biome || BIOME_MAP[pillar.id] || 'ocean';
      node = createPlanetLOD({ color: pillar.color, biome, position, userData: pillar });

      // Attach asteroid belt to the LOD group
      const belt = createAsteroidBelt(node, {
        count: 200,
        innerRadius: PLANET_CONFIG.planet.size * 2.5,
        outerRadius: PLANET_CONFIG.planet.size * 3.5,
        color: new THREE.Color(pillar.color).lerp(new THREE.Color(0x888888), 0.6).getHex(),
      });
      asteroidBelts.push(belt);
    } else {
      node = createNodeMesh({
        color: pillar.color,
        size: SCENE_CONFIG.level1NodeSize,
        materialDefaults: MATERIAL_DEFAULTS.level1,
        position,
        userData: pillar,
      });
    }

    scene.add(node);
    nodesRef.push(node);

    // Create connection to center
    createConnection(
      scene,
      new THREE.Vector3(0, 0, 0),
      position,
      pillar.color,
      0.3,
      'strategic-foresight',
      pillar.id,
      connectionsRef
    );
  });
}

/**
 * Create Child Nodes (Level 2)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Mesh} parentNode - The parent node
 * @param {THREE.Mesh[]} nodesRef - Array to store node references
 * @param {THREE.Line[]} connectionsRef - Array to store connection references
 */
export function createChildNodes(scene, parentNode, nodesRef, connectionsRef) {
  const parent = parentNode.userData;
  if (!parent.children) return;

  const { methodologies } = mindMapData;
  const children = methodologies.filter(m => parent.children.includes(m.id));

  const parentPos = parentNode.position;
  const radius = SCENE_CONFIG.level2Radius;
  const angleStep = (Math.PI * 2) / children.length;

  children.forEach((child, index) => {
    // Check if already exists
    const existing = nodesRef.find(n => n.userData.id === child.id);
    if (existing) return;

    const angle = index * angleStep;
    const localX = Math.cos(angle) * radius;
    const localZ = Math.sin(angle) * radius;
    const x = parentPos.x + localX;
    const z = parentPos.z + localZ;
    const y = parentPos.y;
    const position = new THREE.Vector3(x, y, z);

    const childData = { ...child, parent: parent.id };

    let node;
    if (usePlanetary) {
      node = createMoon({ color: child.color, position, userData: childData });
    } else {
      node = createNodeMesh({
        color: child.color,
        size: SCENE_CONFIG.level2NodeSize,
        materialDefaults: MATERIAL_DEFAULTS.level2,
        position,
        userData: childData,
      });
      node.children[0].material.opacity = 0.4;
      node.children[1].material.opacity = 0.2;
      node.children[2].material.opacity = 0.1;
    }

    scene.add(node);
    nodesRef.push(node);

    // Create connection to parent
    createConnection(
      scene,
      parentPos,
      position,
      child.color,
      0.3,
      parent.id,
      child.id,
      connectionsRef
    );
  });
}

/**
 * Create Media Nodes (Level 3)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Mesh} parentNode - The parent node
 * @param {THREE.Mesh[]} nodesRef - Array to store node references
 * @param {THREE.Line[]} connectionsRef - Array to store connection references
 */
export function createMediaNodes(scene, parentNode, nodesRef, connectionsRef) {
  const parent = parentNode.userData;
  if (!parent.media || parent.media.length === 0) return;

  const parentPos = parentNode.position;
  const radius = SCENE_CONFIG.level3Radius;
  const angleStep = (Math.PI * 2) / parent.media.length;

  parent.media.forEach((mediaItem, index) => {
    try {
      // Check if already exists
      const mediaId = `${parent.id}-media-${index}`;
      const existing = nodesRef.find(n => n.userData.mediaId === mediaId);
      if (existing) return;

      const angle = index * angleStep;
      const localX = Math.cos(angle) * radius;
      const localZ = Math.sin(angle) * radius;
      const x = parentPos.x + localX;
      const z = parentPos.z + localZ;
      const y = parentPos.y;
      const position = new THREE.Vector3(x, y, z);

      const mediaColor = MEDIA_COLORS[mediaItem.type] || COLORS.primary;
      const mediaData = {
        ...mediaItem,
        mediaId,
        isMedia: true,
        parentId: parent.id,
      };

      let node;
      if (usePlanetary) {
        node = createStation({
          color: mediaColor,
          mediaType: mediaItem.type,
          position,
          userData: mediaData,
        });
      } else {
        // Single optimized sphere for legacy mode
        const geometry = new THREE.SphereGeometry(SCENE_CONFIG.mediaNodeSize, 8, 8);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(mediaColor),
          emissive: new THREE.Color(mediaColor),
          emissiveIntensity: MATERIAL_DEFAULTS.media.emissiveIntensity,
          roughness: MATERIAL_DEFAULTS.media.roughness,
          metalness: MATERIAL_DEFAULTS.media.metalness,
          transparent: true,
          opacity: MATERIAL_DEFAULTS.media.opacity,
        });
        node = new THREE.Mesh(geometry, material);
        node.position.copy(position);
        node.userData = mediaData;
        node.castShadow = true;
        node.receiveShadow = true;
        node.originalY = y;
      }

      scene.add(node);
      nodesRef.push(node);

      // Create connection to parent
      createConnection(
        scene,
        parentPos,
        position,
        mediaColor,
        0.2,
        parent.id,
        mediaId,
        connectionsRef
      );
    } catch (error) {
      console.error('createMediaNodes: Failed to create media node', {
        error: error.message,
        parentId: parent.id,
        mediaIndex: index,
        mediaTitle: mediaItem?.title,
      });
    }
  });
}

/**
 * Remove Child Nodes (including their children and media)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Mesh} parentNode - The parent node whose children to remove
 * @param {THREE.Mesh[]} nodesRef - Array of node references (will be modified)
 * @param {THREE.Line[]} connectionsRef - Array of connection references (will be modified)
 */
export function removeChildNodes(scene, parentNode, nodesRef, connectionsRef) {
  const parent = parentNode.userData;

  // Iteratively collect all descendants (prevents stack overflow on deep trees)
  const idsToRemove = new Set();
  const queue = [parent.id];

  while (queue.length > 0) {
    const currentId = queue.shift();
    for (let i = 0; i < nodesRef.length; i++) {
      const data = nodesRef[i].userData;
      if (data.parent === currentId || data.parentId === currentId) {
        const childId = data.id || data.mediaId;
        if (childId && !idsToRemove.has(childId)) {
          idsToRemove.add(childId);
          queue.push(childId);
        }
      }
    }
  }

  const uniqueNodesToRemove = nodesRef.filter(node => {
    const id = node.userData.id || node.userData.mediaId;
    return idsToRemove.has(id);
  });

  uniqueNodesToRemove.forEach(node => {
    // Remove associated asteroid belts from tracking array
    for (let b = asteroidBelts.length - 1; b >= 0; b--) {
      if (node.children && node.children.includes(asteroidBelts[b].mesh)) {
        asteroidBelts.splice(b, 1);
      }
    }

    // Recursively dispose all descendant meshes (handles LOD levels + their children)
    node.traverse((obj) => {
      if (obj === node) return; // skip root, handled below
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map = null;
        obj.material.dispose();
      }
    });
    scene.remove(node);
    if (node.geometry) node.geometry.dispose();
    if (node.material) {
      if (node.material.map) node.material.map = null; // don't dispose cached textures
      node.material.dispose();
    }
  });

  // Update nodesRef in place
  const nodesToKeep = nodesRef.filter(node => !uniqueNodesToRemove.includes(node));
  nodesRef.length = 0;
  nodesRef.push(...nodesToKeep);

  // Remove connections by checking node IDs (uses idsToRemove which includes mediaIds)
  const connectionsToRemove = connectionsRef.filter(conn => {
    const { parentId, childId } = conn.userData;
    return idsToRemove.has(parentId) || idsToRemove.has(childId);
  });

  connectionsToRemove.forEach(conn => {
    scene.remove(conn);
    conn.geometry.dispose();
    conn.material.dispose();

    if (conn.userData.particles) {
      scene.remove(conn.userData.particles);
      conn.userData.particles.geometry.dispose();
      conn.userData.particles.material.dispose();
    }
  });

  // Update connectionsRef in place
  const connectionsToKeep = connectionsRef.filter(conn => !connectionsToRemove.includes(conn));
  connectionsRef.length = 0;
  connectionsRef.push(...connectionsToKeep);
}

/**
 * Helper to get all descendant node IDs iteratively (prevents stack overflow on deep trees)
 * @param {string} nodeId - The parent node ID
 * @param {THREE.Mesh[]} nodesRef - Array of node references
 * @returns {string[]} Array of descendant IDs
 */
export function getDescendantIds(nodeId, nodesRef) {
  const descendantIds = [];
  const queue = [nodeId];
  const visited = new Set();

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    for (let i = 0; i < nodesRef.length; i++) {
      const data = nodesRef[i].userData;
      const childId = data.id || data.mediaId;
      if ((data.parent === currentId || data.parentId === currentId) && childId && !visited.has(childId)) {
        descendantIds.push(childId);
        queue.push(childId);
      }
    }
  }

  return descendantIds;
}

/**
 * Compute the depth of a node by walking its parent chain.
 * Returns 0 for root/level1, 1 for their children, etc.
 * Uses iterative approach to prevent stack overflow.
 * @param {string} nodeId - Node ID to check
 * @param {THREE.Mesh[]} nodesRef - Array of node references
 * @returns {number} Depth of the node
 */
export function getNodeDepth(nodeId, nodesRef) {
  let depth = 0;
  let currentId = nodeId;
  const visited = new Set();

  while (currentId) {
    if (visited.has(currentId)) break; // circular reference guard
    visited.add(currentId);

    const node = nodesRef.find(n => (n.userData.id === currentId || n.userData.mediaId === currentId));
    if (!node) break;

    const parentId = node.userData.parent || node.userData.parentId;
    if (!parentId) break;

    depth++;
    currentId = parentId;
  }

  return depth;
}
