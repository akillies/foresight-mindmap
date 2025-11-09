import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import mindMapData from './mindMapData';
import TimelineView from './TimelineView';

const ForesightMindMap = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const crossPillarConnectionsRef = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState(1);
  const [showRelationships, setShowRelationships] = useState(false);

  // Ref to avoid stale closures in animation loop
  const hoveredNodeRef = useRef(null);

  // Audio refs
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null); // For both file playback and oscillators
  const gainNodeRef = useRef(null);
  const audioBuffersRef = useRef({}); // Cache loaded audio buffers

  // LCARS Color Palette
  const COLORS = {
    primary: '#5C88DA',
    secondary: '#FFCC66',
    accent: '#CC99CC',
    highlight: '#FF9966',
    success: '#99CC99',
    pink: '#FF6B9D',
    background: '#000000',
    panel: '#1a1a2e',
    text: '#E8F1FF',
  };

  // Media type colors
  const MEDIA_COLORS = {
    video: '#FF6B9D',
    image: '#64c8ff',
    article: '#FFCC66',
    document: '#99CC99'
  };

  // Audio presets - all generative for now
  const AUDIO_PRESETS = {
    1: { type: 'generative', baseFreq: 528, binauralBeat: 14, label: 'STUDY FOCUS', harmonics: false },    // Beta waves for focus
    2: { type: 'generative', baseFreq: 432, binauralBeat: 10, label: 'CALM FLOW', harmonics: false },      // Alpha waves for flow
    3: { type: 'generative', baseFreq: 174, binauralBeat: 3, label: 'WARP CORE', harmonics: true }         // Deep ambient
  };

  // Audio engine with Web Audio API - supports both file playback and generative
  useEffect(() => {
    const oscillatorsRef = []; // Track all oscillators for proper cleanup

    const stopAudio = () => {
      // Stop all oscillators
      oscillatorsRef.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Already stopped
        }
      });
      oscillatorsRef.length = 0;

      // Stop audio source
      if (audioSourceRef.current) {
        try {
          if (audioSourceRef.current.stop) {
            audioSourceRef.current.stop();
          }
          if (audioSourceRef.current.disconnect) {
            audioSourceRef.current.disconnect();
          }
        } catch (e) {
          // Already stopped
        }
        audioSourceRef.current = null;
      }

      // Disconnect gain node
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.disconnect();
        } catch (e) {
          // Already disconnected
        }
        gainNodeRef.current = null;
      }
    };

    const playGenerativeAudio = async (ctx, preset, gainNode, baseVolume) => {
      // Create stereo panners for binaural effect
      const pannerLeft = ctx.createStereoPanner();
      pannerLeft.pan.value = -1;
      const pannerRight = ctx.createStereoPanner();
      pannerRight.pan.value = 1;

      // Main binaural oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(preset.baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(preset.baseFreq + preset.binauralBeat, ctx.currentTime);

      osc1.connect(pannerLeft);
      pannerLeft.connect(gainNode);
      osc2.connect(pannerRight);
      pannerRight.connect(gainNode);

      oscillatorsRef.push(osc1, osc2);

      // Add harmonics for WARP CORE
      if (preset.harmonics) {
        const harmonics = [preset.baseFreq * 2, preset.baseFreq * 1.5, preset.baseFreq * 0.5];
        harmonics.forEach((freq, idx) => {
          const harmOsc = ctx.createOscillator();
          harmOsc.type = 'sine';
          harmOsc.frequency.setValueAtTime(freq, ctx.currentTime);

          const harmGain = ctx.createGain();
          harmGain.gain.setValueAtTime(0, ctx.currentTime);
          harmGain.gain.linearRampToValueAtTime(baseVolume * (0.3 / (idx + 1)), ctx.currentTime + 2);

          harmOsc.connect(harmGain);
          harmGain.connect(ctx.destination);
          harmOsc.start();
          oscillatorsRef.push(harmOsc);
        });
      }

      osc1.start();
      osc2.start();
      audioSourceRef.current = { stop: () => {}, disconnect: () => {} }; // Cleanup handled by oscillatorsRef
    };

    const playFileAudio = async (ctx, preset, gainNode) => {
      // Check if buffer is cached
      if (!audioBuffersRef.current[preset.file]) {
        try {
          const response = await fetch(preset.file);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          audioBuffersRef.current[preset.file] = audioBuffer;
        } catch (error) {
          console.error('Error loading audio file:', error);
          return;
        }
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffersRef.current[preset.file];
      source.loop = true; // Seamless looping
      source.connect(gainNode);
      source.start(0);
      audioSourceRef.current = source;
    };

    if (audioEnabled) {
      (async () => {
        // Initialize AudioContext
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        const preset = AUDIO_PRESETS[audioPreset];

        // Stop any existing audio
        stopAudio();

        // Create gain node with fade in
        const gainNode = ctx.createGain();
        const baseVolume = 0.075; // Reduced from 0.15 - more comfortable default volume
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(baseVolume, ctx.currentTime + 2);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Play based on preset type
        if (preset.type === 'file') {
          await playFileAudio(ctx, preset, gainNode);
        } else if (preset.type === 'generative') {
          await playGenerativeAudio(ctx, preset, gainNode, baseVolume);
        }
      })();
    } else {
      // Fade out before stopping
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(stopAudio, 1000);
      } else {
        stopAudio();
      }
    }

    // Cleanup on unmount or any change
    return () => {
      stopAudio();
    };
  }, [audioEnabled, audioPreset]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.rotation.y = 0;
    sceneRef.current = scene;

    // Initialize Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 50);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Enhanced graphics quality
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting Setup - Enhanced for better visibility
    const ambientLight = new THREE.AmbientLight(0x505070, 0.7); // Brighter ambient (was 0x404060, 0.4)
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x5C88DA, 1.2);
    keyLight.position.set(50, 50, 50);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096; // Higher quality shadows (was 2048)
    keyLight.shadow.mapSize.height = 4096;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xFFCC66, 0.8, 100);
    fillLight.position.set(-30, 20, 40);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xCC99CC, 0.6, 100);
    rimLight.position.set(0, -30, -50);
    scene.add(rimLight);

    // Create Starfield Background
    createStarfield(scene);

    // Create Nodes
    createCenterNode(scene);
    createLevel1Nodes(scene);

    // Animation Loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Gentle scene rotation
      scene.rotation.y += 0.0003;

      // Animate nodes
      nodesRef.current.forEach((node, index) => {
        // Floating motion
        if (node.originalY !== undefined) {
          node.position.y = node.originalY + Math.sin(Date.now() * 0.0008 + index) * 0.3;
        }

        // Pulse effect
        if (node.material && node.material.emissive) {
          const baseIntensity = node.isHovered ? 0.6 : 0.3;
          node.material.emissiveIntensity = baseIntensity + Math.sin(Date.now() * 0.002 + index) * 0.1;
        }

        // Reset scale for non-hovered nodes
        if (!node.isHovered && node.scale.x > 1.0) {
          node.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Animate connections based on selection
      connectionsRef.current.forEach((conn) => {
        const { parentId, childId, baseOpacity } = conn.userData;
        const isRelated = selectedNode && (selectedNode.id === parentId || selectedNode.id === childId);
        const targetOpacity = isRelated ? 0.7 : (baseOpacity || 0.3);

        // Smooth lerp to target opacity
        if (conn.material.opacity !== targetOpacity) {
          conn.material.opacity += (targetOpacity - conn.material.opacity) * 0.1;
        }
      });

      // Raycasting for hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(nodesRef.current, false);

      // Reset all hover states
      nodesRef.current.forEach(node => {
        node.isHovered = false;
      });

      if (intersects.length > 0) {
        const hoveredObj = intersects[0].object;
        hoveredObj.isHovered = true;
        hoveredObj.scale.setScalar(1.1);
        // Use ref to avoid stale closure - update state only when changed
        if (hoveredNodeRef.current !== hoveredObj.userData) {
          hoveredNodeRef.current = hoveredObj.userData;
          setHoveredNode(hoveredObj.userData);
        }
      } else {
        if (hoveredNodeRef.current !== null) {
          hoveredNodeRef.current = null;
          setHoveredNode(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Event Listeners
    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = event.clientX - previousMouseRef.current.x;
        const deltaY = event.clientY - previousMouseRef.current.y;

        scene.rotation.y += deltaX * 0.005;
        camera.position.y -= deltaY * 0.1;

        previousMouseRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseDown = (event) => {
      isDraggingRef.current = true;
      previousMouseRef.current = { x: event.clientX, y: event.clientY };
      containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      containerRef.current.style.cursor = 'grab';
    };

    const handleClick = (event) => {
      if (isDraggingRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera({ x, y }, camera);
      const intersects = raycasterRef.current.intersectObjects(nodesRef.current, false);

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
        handleNodeClick(clickedNode);
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      const direction = event.deltaY > 0 ? 1 : -1;
      const scaleFactor = 1 + direction * zoomSpeed;

      camera.position.multiplyScalar(scaleFactor);

      const distance = camera.position.length();
      if (distance < 10) camera.position.setLength(10);
      if (distance > 200) camera.position.setLength(200);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Store container ref for reliable cleanup
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleClick);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      // Use stored container ref for reliable cleanup
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  // Create Starfield
  const createStarfield = (scene) => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const lcarBlue = new THREE.Color(0x5C88DA);
    const lcarAmber = new THREE.Color(0xFFCC66);
    const white = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? lcarBlue : colorChoice < 0.75 ? lcarAmber : white;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      opacity: 0.8,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
  };

  // Create Center Node (Level 0)
  const createCenterNode = (scene) => {
    const { center } = mindMapData;
    const geometry = new THREE.SphereGeometry(2.0, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(center.color),
      emissive: new THREE.Color(center.color),
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.userData = center;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.originalY = 0;

    // Glow effect
    const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(center.color),
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sphere.add(glow);

    scene.add(sphere);
    nodesRef.current.push(sphere);
  };

  // Create Level 1 Nodes (Six Pillars)
  const createLevel1Nodes = (scene) => {
    const { level1 } = mindMapData;
    const radius = 20;
    const angleStep = (Math.PI * 2) / level1.length;

    level1.forEach((pillar, index) => {
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0;

      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(pillar.color),
        emissive: new THREE.Color(pillar.color),
        emissiveIntensity: 0.3,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity: 0.9,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = pillar;
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(2.0, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glow);

      scene.add(sphere);
      nodesRef.current.push(sphere);

      // Create connection to center
      createConnection(scene, new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z), pillar.color, 0.3, 'strategic-foresight', pillar.id);
    });
  };

  // Create Child Nodes (Level 2)
  const createChildNodes = (scene, parentNode) => {
    const parent = parentNode.userData;
    if (!parent.children) return;

    const { methodologies } = mindMapData;
    const children = methodologies.filter(m => parent.children.includes(m.id));

    const parentPos = parentNode.position;
    const radius = 10;
    const angleStep = (Math.PI * 2) / children.length;

    children.forEach((child, index) => {
      // Check if already exists
      const existing = nodesRef.current.find(n => n.userData.id === child.id);
      if (existing) return;

      const angle = index * angleStep;
      const localX = Math.cos(angle) * radius;
      const localZ = Math.sin(angle) * radius;
      const x = parentPos.x + localX;
      const z = parentPos.z + localZ;
      const y = parentPos.y;

      const geometry = new THREE.SphereGeometry(1.2, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(child.color),
        emissive: new THREE.Color(child.color),
        emissiveIntensity: 0.3,
        roughness: 0.4,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = child;
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(child.color),
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glow);

      scene.add(sphere);
      nodesRef.current.push(sphere);

      // Create connection to parent
      createConnection(scene, parentPos, new THREE.Vector3(x, y, z), child.color, 0.3, parent.id, child.id);
    });
  };

  // Create Media Nodes (Level 3)
  const createMediaNodes = (scene, parentNode) => {
    const parent = parentNode.userData;
    if (!parent.media || parent.media.length === 0) return;

    const parentPos = parentNode.position;
    const radius = 8;
    const angleStep = (Math.PI * 2) / parent.media.length;

    parent.media.forEach((mediaItem, index) => {
      // Check if already exists
      const mediaId = `${parent.id}-media-${index}`;
      const existing = nodesRef.current.find(n => n.userData.mediaId === mediaId);
      if (existing) return;

      const angle = index * angleStep;
      const localX = Math.cos(angle) * radius;
      const localZ = Math.sin(angle) * radius;
      const x = parentPos.x + localX;
      const z = parentPos.z + localZ;
      const y = parentPos.y;

      const mediaColor = MEDIA_COLORS[mediaItem.type] || COLORS.primary;
      const geometry = new THREE.SphereGeometry(0.8, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(mediaColor),
        emissive: new THREE.Color(mediaColor),
        emissiveIntensity: 0.4,
        roughness: 0.25,
        metalness: 0.3,
        transparent: true,
        opacity: 0.85,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = {
        ...mediaItem,
        mediaId,
        isMedia: true,
        parentId: parent.id
      };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(1.1, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(mediaColor),
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glow);

      scene.add(sphere);
      nodesRef.current.push(sphere);

      // Create connection to parent
      createConnection(scene, parentPos, new THREE.Vector3(x, y, z), mediaColor, 0.2, parent.id, mediaId);
    });
  };

  // Remove Child Nodes
  const removeChildNodes = (scene, parentNode) => {
    const parent = parentNode.userData;
    const nodesToRemove = nodesRef.current.filter(node => {
      return node.userData.parent === parent.id || node.userData.parentId === parent.id;
    });

    nodesToRemove.forEach(node => {
      scene.remove(node);
      node.geometry.dispose();
      node.material.dispose();
    });

    nodesRef.current = nodesRef.current.filter(node => !nodesToRemove.includes(node));

    // Remove connections
    const connectionsToRemove = connectionsRef.current.filter(conn => {
      return nodesToRemove.some(node =>
        node.position.equals(conn.userData.endPos) ||
        node.position.equals(conn.userData.startPos)
      );
    });

    connectionsToRemove.forEach(conn => {
      scene.remove(conn);
      conn.geometry.dispose();
      conn.material.dispose();
    });

    connectionsRef.current = connectionsRef.current.filter(conn => !connectionsToRemove.includes(conn));
  };

  // Create Connection (curved line between nodes)
  const createConnection = (scene, start, end, color, opacity = 0.3, parentId = null, childId = null) => {
    const midPoint = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + 5,
      (start.z + end.z) / 2
    );

    const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      opacity: opacity,
      transparent: true,
    });

    const line = new THREE.Line(geometry, material);
    line.userData = {
      startPos: start,
      endPos: end,
      parentId,
      childId,
      baseOpacity: opacity,
      baseColor: color
    };
    scene.add(line);
    connectionsRef.current.push(line);
  };

  // Create Cross-Pillar Relationship Connections
  const createCrossPillarConnections = (scene) => {
    if (!showRelationships) return;
    if (!selectedNode && !hoveredNode) return;

    const activeNode = selectedNode || hoveredNode;
    if (!activeNode || !activeNode.relatedMethodologies) return;

    const { methodologies } = mindMapData;

    activeNode.relatedMethodologies.forEach(rel => {
      // Find both nodes in the scene
      const sourceNode = nodesRef.current.find(n => n.userData.id === activeNode.id);
      const targetNode = nodesRef.current.find(n => n.userData.id === rel.id);

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
        relationshipType: rel.type
      };

      scene.add(line);
      crossPillarConnectionsRef.current.push(line);
    });
  };

  // Remove Cross-Pillar Connections
  const removeCrossPillarConnections = (scene) => {
    crossPillarConnectionsRef.current.forEach(conn => {
      scene.remove(conn);
      conn.geometry.dispose();
      conn.material.dispose();
    });
    crossPillarConnectionsRef.current = [];
  };

  // Handle Node Click
  const handleNodeClick = (node) => {
    const nodeData = node.userData;

    // Handle media click
    if (nodeData.isMedia) {
      setImageError(false); // Reset error state for new media
      setSelectedMedia(nodeData);
      return;
    }

    // Handle regular node click
    setSelectedNode(nodeData);

    const nodeId = nodeData.id;
    const isExpanded = expandedNodes.has(nodeId);

    if (isExpanded) {
      // Collapse
      removeChildNodes(sceneRef.current, node);
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
    } else {
      // Expand
      if (nodeData.children && nodeData.children.length > 0) {
        createChildNodes(sceneRef.current, node);
        setExpandedNodes(prev => new Set(prev).add(nodeId));
      }

      // Show media if available
      if (nodeData.media && nodeData.media.length > 0) {
        createMediaNodes(sceneRef.current, node);
      }
    }
  };

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      nodesRef.current.forEach(node => {
        if (node.material) {
          node.material.opacity = 0.9;
          node.material.emissiveIntensity = 0.3;
        }
      });
      return;
    }

    const query = searchQuery.toLowerCase();
    nodesRef.current.forEach(node => {
      const data = node.userData;
      const matches =
        (data.label && data.label.toLowerCase().includes(query)) ||
        (data.description && data.description.toLowerCase().includes(query)) ||
        (data.title && data.title.toLowerCase().includes(query));

      if (node.material) {
        node.material.opacity = matches ? 1.0 : 0.2;
        node.material.emissiveIntensity = matches ? 0.6 : 0.1;
      }
    });
  }, [searchQuery]);

  // Cross-Pillar Relationship Connections
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing cross-pillar connections
    removeCrossPillarConnections(scene);

    // Create new connections if conditions are met
    if (showRelationships && (selectedNode || hoveredNode)) {
      createCrossPillarConnections(scene);
    }

    // Cleanup on unmount
    return () => {
      if (scene) {
        removeCrossPillarConnections(scene);
      }
    };
  }, [showRelationships, selectedNode, hoveredNode]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          background: '#000000',
        }}
      />

      {/* LCARS Search Box */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
      }}>
        <div style={{
          background: COLORS.secondary,
          padding: '14px 20px',
          borderRadius: '20px 0 0 20px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#000000',
          letterSpacing: '2px',
          fontFamily: 'monospace',
        }}>
          SEARCH
        </div>
        <input
          type="text"
          placeholder="ENTER QUERY..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '14px 24px',
            fontSize: '14px',
            fontWeight: '600',
            border: `3px solid ${COLORS.primary}`,
            borderLeft: 'none',
            borderRadius: '0 20px 20px 0',
            background: '#000000',
            color: COLORS.secondary,
            width: '300px',
            outline: 'none',
            fontFamily: 'monospace',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        />
      </div>

      {/* LCARS Control Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '280px',
        zIndex: 10,
      }}>
        {/* Header Bar */}
        <div style={{
          background: COLORS.primary,
          padding: '12px 20px',
          borderRadius: '20px 20px 0 0',
          fontSize: '16px',
          fontWeight: '700',
          color: '#000000',
          letterSpacing: '3px',
          textAlign: 'center',
          fontFamily: 'monospace',
        }}>
          LCARS 47
        </div>

        {/* Main Panel */}
        <div style={{
          background: '#000000',
          border: `4px solid ${COLORS.primary}`,
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '20px',
        }}>
          {/* Status Bars */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: COLORS.highlight,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              DRAG TO ORBIT
            </div>
            <div style={{
              background: COLORS.accent,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              SCROLL TO ZOOM
            </div>
            <div style={{
              background: COLORS.pink,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              marginBottom: '6px',
              fontFamily: 'monospace',
            }}>
              CLICK TO EXPAND
            </div>
            <div style={{
              background: COLORS.success,
              padding: '8px 12px',
              borderRadius: '15px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}>
              CLICK ORBS FOR MEDIA
            </div>
          </div>

          {/* Timeline Toggle Button */}
          <button
            onClick={() => setTimelineVisible(!timelineVisible)}
            style={{
              width: '100%',
              background: timelineVisible ? COLORS.accent : 'transparent',
              border: `3px solid ${COLORS.accent}`,
              color: timelineVisible ? '#000000' : COLORS.accent,
              padding: '12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginBottom: '15px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!timelineVisible) {
                e.target.style.background = `${COLORS.accent}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (!timelineVisible) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {timelineVisible ? '◀ CLOSE TIMELINE' : 'TIMELINE VIEW ▶'}
          </button>

          {/* Relationships Toggle */}
          <button
            onClick={() => setShowRelationships(!showRelationships)}
            style={{
              width: '100%',
              background: showRelationships ? COLORS.success : 'transparent',
              border: `3px solid ${COLORS.success}`,
              color: showRelationships ? '#000000' : COLORS.success,
              padding: '12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginBottom: '15px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!showRelationships) {
                e.target.style.background = `${COLORS.success}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (!showRelationships) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {showRelationships ? '✓ RELATIONSHIPS ON' : '○ SHOW RELATIONSHIPS'}
          </button>

          {/* Audio Controls */}
          <div style={{
            background: 'rgba(255, 107, 157, 0.1)',
            border: `2px solid ${COLORS.pink}`,
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '15px',
          }}>
            <div style={{
              color: COLORS.pink,
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontFamily: 'monospace',
            }}>
              AMBIENT AUDIO
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              style={{
                width: '100%',
                background: audioEnabled ? COLORS.pink : 'transparent',
                border: `2px solid ${COLORS.pink}`,
                color: audioEnabled ? '#000000' : COLORS.pink,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                marginBottom: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!audioEnabled) {
                  e.target.style.background = `${COLORS.pink}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (!audioEnabled) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {audioEnabled ? '■ AUDIO ON' : '▶ AUDIO OFF'}
            </button>

            {/* Preset Radio Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[1, 2, 3].map(presetNum => (
                <label
                  key={presetNum}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    background: audioEnabled && audioPreset === presetNum ? `${COLORS.pink}20` : 'transparent',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (audioEnabled) {
                      e.currentTarget.style.background = `${COLORS.pink}15`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = audioEnabled && audioPreset === presetNum ? `${COLORS.pink}20` : 'transparent';
                  }}
                >
                  <input
                    type="radio"
                    name="audioPreset"
                    value={presetNum}
                    checked={audioPreset === presetNum}
                    onChange={() => setAudioPreset(presetNum)}
                    disabled={!audioEnabled}
                    style={{
                      width: '14px',
                      height: '14px',
                      cursor: audioEnabled ? 'pointer' : 'not-allowed',
                      accentColor: COLORS.pink,
                    }}
                  />
                  <span style={{
                    color: audioEnabled ? COLORS.pink : '#666',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    fontFamily: 'monospace',
                  }}>
                    MUSIC {presetNum}: {AUDIO_PRESETS[presetNum].label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* System Status Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            background: 'rgba(92, 136, 218, 0.1)',
            borderRadius: '10px',
            border: `1px solid ${COLORS.primary}`,
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: COLORS.success,
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              color: COLORS.success,
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}>
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '450px',
            height: '100vh',
            background: 'rgba(26, 26, 46, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            overflowY: 'auto',
            borderLeft: `2px solid ${selectedNode.color || COLORS.primary}`,
            color: COLORS.text,
            fontFamily: 'Inter, sans-serif',
            animation: 'slideIn 0.3s ease',
            boxShadow: `-10px 0 40px ${selectedNode.color || COLORS.primary}30`,
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: `2px solid ${COLORS.text}`,
              color: COLORS.text,
              fontSize: '20px',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = COLORS.text;
              e.target.style.color = COLORS.panel;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = COLORS.text;
            }}
          >
            ×
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <h2
              style={{
                margin: '0',
                fontSize: '24px',
                color: selectedNode.color || COLORS.primary,
                letterSpacing: '1px',
              }}
            >
              {selectedNode.label?.replace(/\\n/g, ' ')}
            </h2>
            {selectedNode.yearIntroduced && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: `${selectedNode.color || COLORS.primary}20`,
                  border: `1px solid ${selectedNode.color || COLORS.primary}`,
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: selectedNode.color || COLORS.primary,
                  letterSpacing: '1px',
                  fontFamily: 'monospace',
                }}
              >
                {selectedNode.yearIntroduced}
              </span>
            )}
          </div>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#b8c5d8',
              marginBottom: '20px',
            }}
          >
            {selectedNode.description}
          </p>

          {selectedNode.pioneers && selectedNode.pioneers.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                color: COLORS.secondary,
                fontSize: '12px',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}>
                PIONEERS
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedNode.pioneers.map((pioneer, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: `${selectedNode.color || COLORS.primary}10`,
                      border: `1px solid ${selectedNode.color || COLORS.primary}40`,
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                  >
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: selectedNode.color || COLORS.primary,
                      marginBottom: '4px',
                    }}>
                      {pioneer.name}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: COLORS.secondary,
                      marginBottom: '6px',
                      fontStyle: 'italic',
                    }}>
                      {pioneer.role} • {pioneer.organization}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#b8c5d8',
                      lineHeight: '1.5',
                    }}>
                      {pioneer.contribution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedNode.historicalContext && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                color: COLORS.secondary,
                fontSize: '12px',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}>
                HISTORY
              </h4>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.7',
                color: '#d0d8e8',
                background: `${selectedNode.color || COLORS.primary}08`,
                padding: '14px',
                borderRadius: '8px',
                borderLeft: `3px solid ${selectedNode.color || COLORS.primary}`,
              }}>
                {selectedNode.historicalContext}
              </p>
            </div>
          )}

          {selectedNode.application && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                color: COLORS.accent,
                fontSize: '12px',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}>
                HOW TO USE
              </h4>
              <div style={{
                fontSize: '13px',
                lineHeight: '1.7',
                color: '#d0d8e8',
                background: `${COLORS.accent}12`,
                padding: '14px',
                borderRadius: '8px',
                border: `1px solid ${COLORS.accent}40`,
              }}>
                {selectedNode.application}
              </div>
            </div>
          )}

          {selectedNode.famousExample && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.highlight}25, ${COLORS.pink}25)`,
                border: `2px solid ${COLORS.highlight}`,
                borderRadius: '10px',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '24px',
                  opacity: 0.3,
                }}>
                  ⭐
                </div>
                <h4 style={{
                  color: COLORS.highlight,
                  fontSize: '12px',
                  letterSpacing: '2px',
                  marginBottom: '10px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                }}>
                  FAMOUS EXAMPLE
                </h4>
                <div style={{
                  fontSize: '13px',
                  lineHeight: '1.7',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                  {selectedNode.famousExample}
                </div>
              </div>
            </div>
          )}

          {(selectedNode.types || selectedNode.modes || selectedNode.archetypes) && (
            <div style={{ marginBottom: '24px' }}>
              {selectedNode.types && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    color: selectedNode.color || COLORS.primary,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    marginBottom: '10px',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                  }}>
                    TYPES
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedNode.types.map((type, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          background: `${selectedNode.color || COLORS.primary}20`,
                          border: `1px solid ${selectedNode.color || COLORS.primary}60`,
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: COLORS.text,
                          fontWeight: '500',
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedNode.modes && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    color: selectedNode.color || COLORS.primary,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    marginBottom: '10px',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                  }}>
                    MODES
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedNode.modes.map((mode, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          background: `${selectedNode.color || COLORS.primary}20`,
                          border: `1px solid ${selectedNode.color || COLORS.primary}60`,
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: COLORS.text,
                          fontWeight: '500',
                        }}
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedNode.archetypes && (
                <div>
                  <h4 style={{
                    color: selectedNode.color || COLORS.primary,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    marginBottom: '10px',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                  }}>
                    ARCHETYPES
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedNode.archetypes.map((archetype, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          background: `${selectedNode.color || COLORS.primary}20`,
                          border: `1px solid ${selectedNode.color || COLORS.primary}60`,
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: COLORS.text,
                          fontWeight: '500',
                        }}
                      >
                        {archetype}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedNode.details && (
            <div style={{ marginTop: '20px' }}>
              {typeof selectedNode.details === 'string' ? (
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#d0d8e8' }}>
                  {selectedNode.details}
                </p>
              ) : (
                <div>
                  {selectedNode.details.overview && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: COLORS.secondary, fontSize: '14px', letterSpacing: '1px', marginBottom: '10px' }}>
                        OVERVIEW
                      </h4>
                      <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#d0d8e8' }}>
                        {selectedNode.details.overview}
                      </p>
                    </div>
                  )}

                  {selectedNode.details.components && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: COLORS.secondary, fontSize: '14px', letterSpacing: '1px', marginBottom: '10px' }}>
                        COMPONENTS
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#d0d8e8', lineHeight: '1.8' }}>
                        {selectedNode.details.components.map((item, i) => (
                          <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.details.layers && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: COLORS.secondary, fontSize: '14px', letterSpacing: '1px', marginBottom: '10px' }}>
                        LAYERS
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#d0d8e8', lineHeight: '1.8' }}>
                        {selectedNode.details.layers.map((item, i) => (
                          <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.details.philosophy && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: COLORS.secondary, fontSize: '14px', letterSpacing: '1px', marginBottom: '10px' }}>
                        PHILOSOPHY
                      </h4>
                      {Array.isArray(selectedNode.details.philosophy) ? (
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#d0d8e8', lineHeight: '1.8' }}>
                          {selectedNode.details.philosophy.map((item, i) => (
                            <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#d0d8e8' }}>
                          {selectedNode.details.philosophy}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedNode.media && selectedNode.media.length > 0 && (
            <div style={{ marginTop: '24px', marginBottom: '20px' }}>
              <h4 style={{
                color: COLORS.success,
                fontSize: '12px',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}>
                MEDIA LIBRARY
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {(() => {
                  const mediaCounts = selectedNode.media.reduce((acc, item) => {
                    acc[item.type] = (acc[item.type] || 0) + 1;
                    return acc;
                  }, {});
                  const mediaTypes = [
                    { type: 'video', icon: '📺', label: 'Videos' },
                    { type: 'image', icon: '🖼️', label: 'Images' },
                    { type: 'document', icon: '📄', label: 'Docs' },
                    { type: 'article', icon: '📚', label: 'Articles' },
                  ];
                  return mediaTypes.filter(mt => mediaCounts[mt.type]).map(mt => (
                    <div
                      key={mt.type}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        background: `${COLORS.success}15`,
                        border: `1px solid ${COLORS.success}40`,
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: COLORS.text,
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{mt.icon}</span>
                      <span style={{ fontWeight: '600' }}>{mediaCounts[mt.type]}</span>
                      <span style={{ opacity: 0.7 }}>{mt.label}</span>
                    </div>
                  ));
                })()}
              </div>
              <div style={{
                marginTop: '10px',
                fontSize: '11px',
                color: COLORS.text,
                opacity: 0.6,
                fontStyle: 'italic',
              }}>
                Click nodes in the 3D view to explore media
              </div>
            </div>
          )}

          {selectedNode.wikipedia && (
            <a
              href={selectedNode.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '12px 24px',
                background: COLORS.primary,
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '1px',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.secondary;
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 12px ${COLORS.primary}60`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = COLORS.primary;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Read More on Wikipedia
            </a>
          )}
        </div>
      )}

      {/* Media Viewer */}
      {selectedMedia && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
          onClick={() => {
            setSelectedMedia(null);
            setImageError(false);
          }}
        >
          <div
            style={{
              background: COLORS.panel,
              borderRadius: '12px',
              border: `2px solid ${MEDIA_COLORS[selectedMedia.type]}`,
              padding: '30px',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: `0 0 60px ${MEDIA_COLORS[selectedMedia.type]}80`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
            setSelectedMedia(null);
            setImageError(false);
          }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: `2px solid ${COLORS.text}`,
                color: COLORS.text,
                fontSize: '24px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              ×
            </button>

            <h2 style={{
              color: MEDIA_COLORS[selectedMedia.type],
              marginTop: '0',
              marginBottom: '10px',
              paddingRight: '60px',
              fontFamily: 'Inter'
            }}>
              {selectedMedia.title}
            </h2>

            {selectedMedia.year && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: MEDIA_COLORS[selectedMedia.type],
                  color: '#000',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                {selectedMedia.year}
              </span>
            )}

            <p style={{ color: '#b8c5d8', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6', fontFamily: 'Inter' }}>
              {selectedMedia.description}
            </p>

            {selectedMedia.type === 'video' && (
              <div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: '20px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedMedia.url.split('v=')[1]?.split('&')[0] || selectedMedia.url.split('/').pop()}?origin=${window.location.origin}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                    }}
                  ></iframe>
                </div>

                {/* Reference Footer */}
                <div style={{
                  borderTop: `1px solid ${MEDIA_COLORS.video}40`,
                  paddingTop: '15px',
                  marginTop: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'monospace'
                }}>
                  <div style={{ fontSize: '10px', letterSpacing: '1px', color: '#666', fontWeight: '600' }}>
                    SOURCE: <span style={{ color: MEDIA_COLORS.video }}>{selectedMedia.source || 'YouTube'}</span>
                  </div>
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: `${MEDIA_COLORS.video}15`,
                      border: `1px solid ${MEDIA_COLORS.video}`,
                      color: MEDIA_COLORS.video,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      transition: 'all 0.2s',
                      fontFamily: 'monospace',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = MEDIA_COLORS.video;
                      e.target.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${MEDIA_COLORS.video}15`;
                      e.target.style.color = MEDIA_COLORS.video;
                    }}
                  >
                    VIEW ORIGINAL →
                  </a>
                </div>
              </div>
            )}

            {selectedMedia.type === 'image' && (
              <div>
                {!imageError ? (
                  <div>
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      onError={() => setImageError(true)}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '60vh',
                        height: 'auto',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto 20px',
                        border: '2px solid rgba(92, 136, 218, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '4px',
                      }}
                    />

                    {/* Reference Footer */}
                    <div style={{
                      borderTop: `1px solid ${MEDIA_COLORS.image}40`,
                      paddingTop: '15px',
                      marginTop: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'monospace'
                    }}>
                      <div style={{ fontSize: '10px', letterSpacing: '1px', color: '#666', fontWeight: '600' }}>
                        SOURCE: <span style={{ color: MEDIA_COLORS.image }}>{selectedMedia.source || new URL(selectedMedia.url).hostname.replace('www.', '').toUpperCase()}</span>
                      </div>
                      <a
                        href={selectedMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          background: `${MEDIA_COLORS.image}15`,
                          border: `1px solid ${MEDIA_COLORS.image}`,
                          color: MEDIA_COLORS.image,
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          letterSpacing: '1px',
                          transition: 'all 0.2s',
                          fontFamily: 'monospace',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = MEDIA_COLORS.image;
                          e.target.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = `${MEDIA_COLORS.image}15`;
                          e.target.style.color = MEDIA_COLORS.image;
                        }}
                      >
                        VIEW ORIGINAL →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(92, 136, 218, 0.1)',
                    border: '2px dashed rgba(92, 136, 218, 0.4)',
                    borderRadius: '12px',
                    padding: '30px',
                    textAlign: 'center',
                    color: COLORS.text
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}>🖼️</div>
                    <div style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '20px',
                      fontFamily: 'Inter',
                      color: '#b8c5d8'
                    }}>
                      {selectedMedia.description || 'Image not available'}
                    </div>
                    {selectedNode?.grokipedia && (
                      <a
                        href={selectedNode.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          background: COLORS.primary,
                          color: '#000',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          fontFamily: 'Inter',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = `0 4px 12px ${COLORS.primary}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        📖 Learn More
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {(selectedMedia.type === 'article' || selectedMedia.type === 'document') && (
              <div>
                {/* Preview Box */}
                <div style={{
                  background: `${MEDIA_COLORS[selectedMedia.type]}08`,
                  border: `2px dashed ${MEDIA_COLORS[selectedMedia.type]}40`,
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.6 }}>
                    {selectedMedia.type === 'article' ? '📄' : '📚'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#b8c5d8',
                    lineHeight: '1.6',
                    fontFamily: 'Inter'
                  }}>
                    Click "View Original" below to read the full {selectedMedia.type}
                  </div>
                </div>

                {/* Reference Footer */}
                <div style={{
                  borderTop: `1px solid ${MEDIA_COLORS[selectedMedia.type]}40`,
                  paddingTop: '15px',
                  marginTop: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'monospace'
                }}>
                  <div style={{ fontSize: '10px', letterSpacing: '1px', color: '#666', fontWeight: '600' }}>
                    SOURCE: <span style={{ color: MEDIA_COLORS[selectedMedia.type] }}>{selectedMedia.source || new URL(selectedMedia.url).hostname.replace('www.', '').toUpperCase()}</span>
                  </div>
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: `${MEDIA_COLORS[selectedMedia.type]}15`,
                      border: `1px solid ${MEDIA_COLORS[selectedMedia.type]}`,
                      color: MEDIA_COLORS[selectedMedia.type],
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      transition: 'all 0.2s',
                      fontFamily: 'monospace',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = MEDIA_COLORS[selectedMedia.type];
                      e.target.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${MEDIA_COLORS[selectedMedia.type]}15`;
                      e.target.style.color = MEDIA_COLORS[selectedMedia.type];
                    }}
                  >
                    VIEW ORIGINAL →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(26, 26, 46, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '15px 25px',
            borderRadius: '8px',
            border: `1px solid ${hoveredNode.color || COLORS.primary}`,
            color: COLORS.text,
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            maxWidth: '400px',
            textAlign: 'center',
            pointerEvents: 'none',
            boxShadow: `0 0 20px ${hoveredNode.color || COLORS.primary}40`,
          }}
        >
          <strong>{hoveredNode.title || hoveredNode.label?.replace(/\\n/g, ' ')}</strong>
          {hoveredNode.description && (
            <div style={{ fontSize: '12px', marginTop: '5px', color: '#b8c5d8' }}>
              {hoveredNode.description}
            </div>
          )}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            right: -450px;
            opacity: 0;
          }
          to {
            right: 0;
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(26, 26, 46, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: ${COLORS.primary};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${COLORS.secondary};
        }
      `}</style>

      {/* Timeline View */}
      {timelineVisible && (
        <TimelineView onClose={() => setTimelineVisible(false)} />
      )}
    </div>
  );
};

export default ForesightMindMap;
