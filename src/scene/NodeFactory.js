/**
 * Node Factory Module
 * Creates and manages 3D nodes for the mind map visualization
 */
import * as THREE from 'three';
import mindMapData from '../mindMapData';
import { COLORS, MEDIA_COLORS, SCENE_CONFIG, MATERIAL_DEFAULTS } from '../constants';
import { createConnection } from './ConnectionManager';

/**
 * Create a node with glow effects
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

  const sphere = createNodeMesh({
    color: center.color,
    size: SCENE_CONFIG.centerNodeSize,
    materialDefaults: MATERIAL_DEFAULTS.center,
    position: new THREE.Vector3(0, 0, 0),
    userData: center,
  });

  // Adjust core opacity for center node
  sphere.children[0].material.opacity = 0.6;
  sphere.children[1].material.opacity = 0.3;
  sphere.children[2].material.opacity = 0.15;

  scene.add(sphere);
  nodesRef.push(sphere);
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

    const sphere = createNodeMesh({
      color: pillar.color,
      size: SCENE_CONFIG.level1NodeSize,
      materialDefaults: MATERIAL_DEFAULTS.level1,
      position: new THREE.Vector3(x, y, z),
      userData: pillar,
    });

    scene.add(sphere);
    nodesRef.push(sphere);

    // Create connection to center
    createConnection(
      scene,
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x, y, z),
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

    const sphere = createNodeMesh({
      color: child.color,
      size: SCENE_CONFIG.level2NodeSize,
      materialDefaults: MATERIAL_DEFAULTS.level2,
      position: new THREE.Vector3(x, y, z),
      userData: {
        ...child,
        parent: parent.id,
      },
    });

    // Adjust core opacity for child nodes
    sphere.children[0].material.opacity = 0.4;
    sphere.children[1].material.opacity = 0.2;
    sphere.children[2].material.opacity = 0.1;

    scene.add(sphere);
    nodesRef.push(sphere);

    // Create connection to parent
    createConnection(
      scene,
      parentPos,
      new THREE.Vector3(x, y, z),
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

      const mediaColor = MEDIA_COLORS[mediaItem.type] || COLORS.primary;

      // Single optimized sphere - reduced from 3 meshes to 1 for performance
      // Reduced segments from 16 to 8 (75% fewer polygons)
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

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = {
        ...mediaItem,
        mediaId,
        isMedia: true,
        parentId: parent.id,
      };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      scene.add(sphere);
      nodesRef.push(sphere);

      // Create connection to parent
      createConnection(
        scene,
        parentPos,
        new THREE.Vector3(x, y, z),
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
      // Continue to next media item - don't let one failure kill all media
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
    // Dispose child meshes (core, inner glow, outer glow) before removing parent
    if (node.children && node.children.length > 0) {
      // Iterate in reverse since removal modifies the array
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
        node.remove(child);
      }
    }
    scene.remove(node);
    if (node.geometry) node.geometry.dispose();
    if (node.material) node.material.dispose();
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

    // Also dispose particle systems
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
