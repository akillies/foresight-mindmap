/**
 * Connection Manager Module
 * Handles creation and animation of connections between nodes
 */
import * as THREE from 'three';
import mindMapData from '../mindMapData';
import { ANIMATION_CONFIG } from '../constants';

/**
 * Create Connection (curved line with energy particles)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Vector3} start - Start position
 * @param {THREE.Vector3} end - End position
 * @param {string} color - Connection color (hex string)
 * @param {number} opacity - Base opacity (0-1)
 * @param {string} parentId - Parent node ID
 * @param {string} childId - Child node ID
 * @param {THREE.Line[]} connectionsRef - Array to store connection references
 */
export function createConnection(scene, start, end, color, opacity = 0.3, parentId = null, childId = null, connectionsRef) {
  const midPoint = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2 + 5,
    (start.z + end.z) / 2
  );

  const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
  const points = curve.getPoints(50);

  // Dimmer base line (static)
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    opacity: opacity * 0.3,
    transparent: true,
  });

  const line = new THREE.Line(geometry, material);

  // Create energy particles along the curve (3-5 particles per connection)
  const particleCount = 4;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  const particleColor = new THREE.Color(color);

  for (let i = 0; i < particleCount; i++) {
    // Initial positions evenly spaced along curve
    const t = i / particleCount;
    const point = curve.getPoint(t);

    particlePositions[i * 3] = point.x;
    particlePositions[i * 3 + 1] = point.y;
    particlePositions[i * 3 + 2] = point.z;

    particleColors[i * 3] = particleColor.r;
    particleColors[i * 3 + 1] = particleColor.g;
    particleColors[i * 3 + 2] = particleColor.b;

    particleSizes[i] = 0.2;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  line.userData = {
    startPos: start,
    endPos: end,
    parentId,
    childId,
    baseOpacity: opacity,
    baseColor: color,
    curve: curve,
    particles: particles,
    particleProgress: Array(particleCount).fill(0).map((_, i) => i / particleCount),
    particleSpeed: ANIMATION_CONFIG.particleSpeed + Math.random() * ANIMATION_CONFIG.particleSpeedVariation,
  };

  scene.add(line);
  connectionsRef.push(line);
}

/**
 * Create Cross-Pillar Relationship Connections
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {Object} activeNode - The currently selected/hovered node
 * @param {THREE.Mesh[]} nodesRef - Array of node references
 * @param {THREE.Line[]} crossPillarConnectionsRef - Array to store cross-pillar connection references
 */
export function createCrossPillarConnections(scene, activeNode, nodesRef, crossPillarConnectionsRef) {
  if (!activeNode || !activeNode.relatedMethodologies) return;

  activeNode.relatedMethodologies.forEach(rel => {
    // Find both nodes in the scene
    const sourceNode = nodesRef.find(n => n.userData.id === activeNode.id);
    const targetNode = nodesRef.find(n => n.userData.id === rel.id);

    if (!sourceNode || !targetNode) return;

    const sourcePos = sourceNode.position;
    const targetPos = targetNode.position;

    // Create dashed line
    const midPoint = new THREE.Vector3(
      (sourcePos.x + targetPos.x) / 2,
      (sourcePos.y + targetPos.y) / 2 + 3,
      (sourcePos.z + targetPos.z) / 2
    );

    const curve = new THREE.CatmullRomCurve3([sourcePos, midPoint, targetPos]);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color('#CCCCCC'),
      opacity: 0.15,
      transparent: true,
      dashSize: 2,
      gapSize: 1,
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances(); // Required for dashed lines
    line.userData = {
      isCrossPillar: true,
      sourceId: activeNode.id,
      targetId: rel.id,
      relationshipType: rel.type,
    };

    scene.add(line);
    crossPillarConnectionsRef.push(line);
  });
}

/**
 * Remove Cross-Pillar Connections
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Line[]} crossPillarConnectionsRef - Array of cross-pillar connection references
 */
export function removeCrossPillarConnections(scene, crossPillarConnectionsRef) {
  crossPillarConnectionsRef.forEach(conn => {
    scene.remove(conn);
    conn.geometry.dispose();
    conn.material.dispose();
  });
  crossPillarConnectionsRef.length = 0;
}

/**
 * Animate connections (opacity changes and particle movement)
 * @param {THREE.Line[]} connectionsRef - Array of connection references
 * @param {Object|null} selectedNode - Currently selected node
 */
export function animateConnections(connectionsRef, selectedNode) {
  connectionsRef.forEach((conn) => {
    const { parentId, childId, baseOpacity, curve, particles, particleProgress, particleSpeed } = conn.userData;
    const isRelated = selectedNode && (selectedNode.id === parentId || selectedNode.id === childId);
    const targetOpacity = isRelated ? 0.7 : (baseOpacity || 0.3);

    // Smooth lerp to target opacity for base line
    if (conn.material.opacity !== targetOpacity) {
      conn.material.opacity += (targetOpacity - conn.material.opacity) * ANIMATION_CONFIG.connectionOpacityLerp;
    }

    // Animate energy particles along the curve
    if (particles && curve && particleProgress) {
      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < particleProgress.length; i++) {
        // Move particle along curve
        particleProgress[i] += particleSpeed;
        if (particleProgress[i] > 1) particleProgress[i] = 0;

        // Get position on curve
        const point = curve.getPoint(particleProgress[i]);
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }
  });
}
