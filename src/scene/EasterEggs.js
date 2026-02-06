/**
 * Easter Eggs Module
 * Contains rare visual surprises that occasionally appear in the mind map
 */
import * as THREE from 'three';
import { SCENE_CONFIG } from '../constants';

/**
 * Easter Egg: Glass-like Black Swan (super rare - Taleb's Black Swan concept)
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Group} The Black Swan group
 */
export function createBlackSwan(scene) {
  const swan = new THREE.Group();

  // Swan body - elongated sphere
  const bodyGeometry = new THREE.SphereGeometry(1.2, 16, 16);
  bodyGeometry.scale(1.4, 1, 0.8);
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.4,
    transmission: 0.95,
    thickness: 0.5,
    envMapIntensity: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    ior: 1.5,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  swan.add(body);

  // Swan neck - curved
  const neckCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.8, 0, 0),
    new THREE.Vector3(1.2, 1.5, 0),
    new THREE.Vector3(0.8, 2.5, 0)
  );
  const neckGeometry = new THREE.TubeGeometry(neckCurve, 12, 0.3, 8, false);
  const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
  swan.add(neck);

  // Swan head - small sphere
  const headGeometry = new THREE.SphereGeometry(0.4, 12, 12);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(0.8, 2.8, 0);
  swan.add(head);

  // Wings - flat ellipsoids
  const wingGeometry = new THREE.SphereGeometry(1.5, 12, 12);
  wingGeometry.scale(0.3, 1.2, 1.8);

  const leftWing = new THREE.Mesh(wingGeometry, bodyMaterial);
  leftWing.position.set(0, 0.5, 1.0);
  leftWing.rotation.z = -0.3;
  swan.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeometry, bodyMaterial);
  rightWing.position.set(0, 0.5, -1.0);
  rightWing.rotation.z = 0.3;
  swan.add(rightWing);

  // Subtle glow around the swan (ghost-like)
  const glowGeometry = new THREE.SphereGeometry(2.5, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x6666aa,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  swan.add(glow);

  // Random spawn position at edge of view
  const edge = Math.floor(Math.random() * 4);
  const spawnDistance = 200;

  switch(edge) {
    case 0: swan.position.set(-spawnDistance, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100); break;
    case 1: swan.position.set(spawnDistance, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100); break;
    case 2: swan.position.set((Math.random() - 0.5) * 100, spawnDistance, (Math.random() - 0.5) * 100); break;
    case 3: swan.position.set((Math.random() - 0.5) * 100, -spawnDistance, (Math.random() - 0.5) * 100); break;
  }

  // Set velocity to drift across scene
  const target = new THREE.Vector3(
    -swan.position.x * 0.4,
    -swan.position.y * 0.4,
    -swan.position.z * 0.4
  );
  swan.userData.velocity = target.sub(swan.position).normalize().multiplyScalar(0.15);
  swan.userData.rotationSpeed = (Math.random() - 0.5) * 0.002;
  swan.userData.type = 'blackswan';
  swan.userData.bobPhase = Math.random() * Math.PI * 2;

  scene.add(swan);
  return swan;
}

/**
 * Easter Egg: USS Enterprise-D (less rare - TNG homage)
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Group} The Enterprise-D group
 */
export function createEnterpriseD(scene) {
  const ship = new THREE.Group();

  // Ship color - light gray
  const hullColor = 0xcccccc;
  const hullMaterial = new THREE.MeshStandardMaterial({
    color: hullColor,
    metalness: 0.6,
    roughness: 0.3,
    emissive: hullColor,
    emissiveIntensity: 0.1,
  });

  // Saucer section (main disk)
  const saucerGeometry = new THREE.CylinderGeometry(3, 3.5, 0.8, 32);
  const saucer = new THREE.Mesh(saucerGeometry, hullMaterial);
  saucer.rotation.x = Math.PI / 2;
  ship.add(saucer);

  // Bridge dome
  const bridgeGeometry = new THREE.SphereGeometry(0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const bridge = new THREE.Mesh(bridgeGeometry, hullMaterial);
  bridge.position.set(0, 0, 0.4);
  ship.add(bridge);

  // Engineering hull (secondary hull)
  const engineeringGeometry = new THREE.CylinderGeometry(0.8, 1.2, 4, 16);
  const engineering = new THREE.Mesh(engineeringGeometry, hullMaterial);
  engineering.position.set(0, -3, -1);
  ship.add(engineering);

  // Neck connecting saucer to engineering
  const neckGeometry = new THREE.BoxGeometry(1, 2, 0.5);
  const neck = new THREE.Mesh(neckGeometry, hullMaterial);
  neck.position.set(0, -1, -0.3);
  ship.add(neck);

  // Warp nacelles (left and right)
  const nacelleGeometry = new THREE.CylinderGeometry(0.4, 0.5, 5, 12);

  const leftNacelle = new THREE.Mesh(nacelleGeometry, hullMaterial);
  leftNacelle.position.set(-4, -2.5, -0.5);
  leftNacelle.rotation.z = Math.PI / 2;
  ship.add(leftNacelle);

  const rightNacelle = new THREE.Mesh(nacelleGeometry, hullMaterial);
  rightNacelle.position.set(4, -2.5, -0.5);
  rightNacelle.rotation.z = Math.PI / 2;
  ship.add(rightNacelle);

  // Nacelle pylons
  const pylonGeometry = new THREE.BoxGeometry(0.3, 2.5, 0.3);

  const leftPylon = new THREE.Mesh(pylonGeometry, hullMaterial);
  leftPylon.position.set(-3, -1, -0.5);
  leftPylon.rotation.z = -0.3;
  ship.add(leftPylon);

  const rightPylon = new THREE.Mesh(pylonGeometry, hullMaterial);
  rightPylon.position.set(3, -1, -0.5);
  rightPylon.rotation.z = 0.3;
  ship.add(rightPylon);

  // Bussard collectors (glowing red caps on nacelles)
  const bussardGeometry = new THREE.SphereGeometry(0.5, 12, 12);
  const bussardMaterial = new THREE.MeshBasicMaterial({
    color: 0xff3333,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const leftBussard = new THREE.Mesh(bussardGeometry, bussardMaterial);
  leftBussard.position.set(-6.5, -2.5, -0.5);
  ship.add(leftBussard);

  const rightBussard = new THREE.Mesh(bussardGeometry, bussardMaterial);
  rightBussard.position.set(6.5, -2.5, -0.5);
  ship.add(rightBussard);

  // Navigation lights
  const navLightGeometry = new THREE.SphereGeometry(0.15, 8, 8);

  const redLight = new THREE.Mesh(navLightGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  redLight.position.set(-3.5, 0, 0.3);
  ship.add(redLight);

  const greenLight = new THREE.Mesh(navLightGeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  greenLight.position.set(3.5, 0, 0.3);
  ship.add(greenLight);

  // Warp nacelle glow (blue)
  const warpGlowGeometry = new THREE.CylinderGeometry(0.5, 0.6, 4.8, 12);
  const warpGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x4444ff,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });

  const leftWarpGlow = new THREE.Mesh(warpGlowGeometry, warpGlowMaterial);
  leftWarpGlow.position.set(-4, -2.5, -0.5);
  leftWarpGlow.rotation.z = Math.PI / 2;
  ship.add(leftWarpGlow);

  const rightWarpGlow = new THREE.Mesh(warpGlowGeometry, warpGlowMaterial);
  rightWarpGlow.position.set(4, -2.5, -0.5);
  rightWarpGlow.rotation.z = Math.PI / 2;
  ship.add(rightWarpGlow);

  // Random spawn position at edge of view
  const edge = Math.floor(Math.random() * 4);
  const spawnDistance = 200;

  switch(edge) {
    case 0: ship.position.set(-spawnDistance, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100); break;
    case 1: ship.position.set(spawnDistance, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100); break;
    case 2: ship.position.set((Math.random() - 0.5) * 100, spawnDistance, (Math.random() - 0.5) * 100); break;
    case 3: ship.position.set((Math.random() - 0.5) * 100, -spawnDistance, (Math.random() - 0.5) * 100); break;
  }

  // Set velocity to drift across scene
  const target = new THREE.Vector3(
    -ship.position.x * 0.4,
    -ship.position.y * 0.4,
    -ship.position.z * 0.4
  );
  ship.userData.velocity = target.sub(ship.position).normalize().multiplyScalar(0.25);
  ship.userData.rotationSpeed = (Math.random() - 0.5) * 0.001;
  ship.userData.type = 'enterprise';
  ship.userData.pulsePhase = Math.random() * Math.PI * 2;
  ship.userData.bussards = [leftBussard, rightBussard];
  ship.userData.warpGlows = [leftWarpGlow, rightWarpGlow];

  // Point ship in direction of travel
  ship.lookAt(target.add(ship.position));

  scene.add(ship);
  return ship;
}

/**
 * Check if an easter egg should spawn (called periodically from animation loop)
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {Object|null} currentEasterEgg - Currently active easter egg, if any
 * @returns {THREE.Group|null} New easter egg if spawned, null otherwise
 */
export function checkEasterEggSpawn(scene, currentEasterEgg) {
  // Only spawn if no active easter egg
  if (currentEasterEgg) return null;

  const roll = Math.random();

  // Black Swan: 0.05% chance per check = ~0.3% per minute = ~once per 5.5 hours
  if (roll < SCENE_CONFIG.blackSwanSpawnChance) {
    return createBlackSwan(scene);
  }
  // USS Enterprise-D: 0.17% chance per check = ~1% per minute = ~once per 100 minutes
  else if (roll < SCENE_CONFIG.enterpriseSpawnChance) {
    return createEnterpriseD(scene);
  }

  return null;
}

/**
 * Animate active easter egg
 * @param {THREE.Group} easterEgg - The easter egg to animate
 * @param {THREE.Scene} scene - The scene (for removal when exiting)
 * @returns {boolean} True if easter egg is still active, false if removed
 */
export function animateEasterEgg(easterEgg, scene) {
  if (!easterEgg) return false;

  const { velocity, rotationSpeed, type } = easterEgg.userData;
  const currentTime = Date.now();

  // Move easter egg
  easterEgg.position.add(velocity);

  // Rotate gently
  easterEgg.rotation.y += rotationSpeed;

  // Type-specific animations
  if (type === 'blackswan') {
    // Gentle bobbing motion (swan floating on water, but in space!)
    easterEgg.userData.bobPhase += 0.01;
    easterEgg.position.y += Math.sin(easterEgg.userData.bobPhase) * 0.02;

    // Subtle wing flapping
    const wingFlap = Math.sin(currentTime * 0.002) * 0.1;
    easterEgg.children.forEach(child => {
      if (child.position.z !== 0) {
        child.rotation.x = wingFlap * (child.position.z > 0 ? 1 : -1);
      }
    });
  } else if (type === 'enterprise') {
    // Pulse warp nacelles and bussard collectors
    easterEgg.userData.pulsePhase += 0.03;
    const pulse = 0.5 + Math.sin(easterEgg.userData.pulsePhase) * 0.3;

    if (easterEgg.userData.bussards) {
      easterEgg.userData.bussards.forEach(bussard => {
        bussard.material.opacity = 0.6 + pulse * 0.3;
      });
    }

    if (easterEgg.userData.warpGlows) {
      easterEgg.userData.warpGlows.forEach(glow => {
        glow.material.opacity = 0.2 + pulse * 0.2;
      });
    }
  }

  // Remove if too far from origin (exited scene)
  const distanceFromOrigin = easterEgg.position.length();
  if (distanceFromOrigin > 250) {
    scene.remove(easterEgg);
    return false;
  }

  return true;
}
