import React, { useEffect, useLayoutEffect, useRef, useState, Component, lazy, Suspense } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import mindMapData from './mindMapData';
import { audioManager } from './AudioManager';
import { tourManager, TOUR_STATES } from './TourManager';
import { getTour } from './tourData';

// Lazy load heavy components - only load when user needs them (~70 KB savings)
const TimelineView = lazy(() => import('./TimelineView'));
const TourSelectionModal = lazy(() => import('./TourUI').then(m => ({ default: m.TourSelectionModal })));
const TourHUD = lazy(() => import('./TourUI').then(m => ({ default: m.TourHUD })));

// Error Boundary to catch React render crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught error:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000',
          color: '#5C88DA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'monospace',
          padding: '40px'
        }}>
          <h1 style={{ color: '#FF6B9D', marginBottom: '20px' }}>SYSTEM ERROR</h1>
          <p style={{ maxWidth: '600px', lineHeight: '1.6', marginBottom: '20px' }}>
            A critical rendering error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#5C88DA',
              color: '#000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'monospace'
            }}
          >
            RELOAD APPLICATION
          </button>
          <details style={{ marginTop: '40px', maxWidth: '800px' }}>
            <summary style={{ cursor: 'pointer', color: '#FFCC66' }}>Technical Details</summary>
            <pre style={{
              background: '#111',
              padding: '20px',
              borderRadius: '10px',
              overflow: 'auto',
              marginTop: '10px',
              fontSize: '12px'
            }}>
              {this.state.error && this.state.error.toString()}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const ForesightMindMap = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const crossPillarConnectionsRef = useRef([]);
  const particlesRef = useRef(null);
  const nebulasRef = useRef([]);
  const easterEggRef = useRef(null); // Track active easter egg (only one at a time)
  const lastEasterEggCheckRef = useRef(0); // Track last spawn check time
  const expandedNodesRef = useRef(new Set());
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Immediate input value
  const searchDebounceRef = useRef(null); // Debounce timeout
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState(1);
  const [showRelationships, setShowRelationships] = useState(false);

  // Tour audio state
  const [tourMusicVolume, setTourMusicVolume] = useState(30);
  const [tourNarrationVolume, setTourNarrationVolume] = useState(100);
  const [tourAudioMuted, setTourAudioMuted] = useState(false);

  // Tour UI state
  const [showTourSelection, setShowTourSelection] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const controlsRef = useRef(null);

  // Mobile responsiveness
  const [controlPanelOpen, setControlPanelOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);

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

  // Audio presets - optimized binaural frequencies for brain repair, focus, and deep relaxation
  // Research: Theta (4-8Hz) for healing/creativity, Alpha (8-12Hz) for relaxed focus, Delta (1-4Hz) for deep rest
  const AUDIO_PRESETS = {
    1: { type: 'generative', baseFreq: 256, binauralBeat: 7.83, label: 'BRAIN REPAIR (256Hz + 7.83Hz Schumann)', harmonics: false },    // Schumann resonance for grounding & healing
    2: { type: 'generative', baseFreq: 432, binauralBeat: 8, label: 'CALM FOCUS (432Hz + 8Hz Alpha)', harmonics: false },      // Alpha waves for relaxed concentration
    3: { type: 'generative', baseFreq: 174, binauralBeat: 3, label: 'WARP CORE (174Hz + 3Hz Delta)', harmonics: true }         // Deep ambient regeneration
  };

  // CRITICAL FIX: Reusable Vector3 objects to prevent memory leak in animation loop
  // Creating new Vector3 every frame (60 FPS × nodes) causes browser crashes
  const SCALE_SELECTED = new THREE.Vector3(1.4, 1.4, 1.4);
  const SCALE_NORMAL = new THREE.Vector3(1, 1, 1);

  // Debounced search handler - waits 300ms after user stops typing
  const handleSearchInput = (value) => {
    setSearchInput(value); // Update input immediately for responsive UI

    // Clear previous timeout
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Set new timeout to update search query
    searchDebounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  // Keep expandedNodesRef in sync with expandedNodes state (fixes stale closure in event handlers)
  useEffect(() => {
    expandedNodesRef.current = expandedNodes;
  }, [expandedNodes]);

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
        const baseVolume = 0.056; // Reduced 25% from 0.075 for subtler ambience
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
    // Enhanced graphics quality (THREE.js r152+ API)
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize OrbitControls for camera rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 200;
    controls.maxPolarAngle = Math.PI; // Allow full rotation including looking from above
    controls.minPolarAngle = 0;
    controls.enablePan = false; // Disable panning to keep focus on center
    controlsRef.current = controls;

    // Initialize TourManager with camera and controls
    tourManager.initialize(camera, controls);

    // Post-Processing: Bloom Effect for Cinematic Glow
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

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

    // Create Animated Nebulas
    createNebulas(scene);

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
        const isSelected = selectedNode && node.userData.id === selectedNode.id;

        // Floating motion
        if (node.originalY !== undefined) {
          node.position.y = node.originalY + Math.sin(Date.now() * 0.0008 + index) * 0.3;
        }

        // Pulse effect - enhanced for selected node
        if (node.material && node.material.emissive) {
          let baseIntensity;
          let pulseAmplitude;

          if (isSelected) {
            baseIntensity = 0.9;  // Much brighter for selected node
            pulseAmplitude = 0.2;  // Stronger pulse for selected
          } else if (node.isHovered) {
            baseIntensity = 0.6;
            pulseAmplitude = 0.1;
          } else {
            baseIntensity = 0.3;
            pulseAmplitude = 0.1;
          }

          node.material.emissiveIntensity = baseIntensity + Math.sin(Date.now() * 0.002 + index) * pulseAmplitude;
        }

        // Scale effect for selected node (using reusable Vector3 to prevent memory leak)
        if (isSelected) {
          node.scale.lerp(SCALE_SELECTED, 0.15);
        } else if (!node.isHovered && node.scale.x > 1.0) {
          // Reset scale for non-selected, non-hovered nodes
          node.scale.lerp(SCALE_NORMAL, 0.1);
        }
      });

      // Animate connections based on selection AND move energy particles
      connectionsRef.current.forEach((conn) => {
        const { parentId, childId, baseOpacity, curve, particles, particleProgress, particleSpeed } = conn.userData;
        const isRelated = selectedNode && (selectedNode.id === parentId || selectedNode.id === childId);
        const targetOpacity = isRelated ? 0.7 : (baseOpacity || 0.3);

        // Smooth lerp to target opacity for base line
        if (conn.material.opacity !== targetOpacity) {
          conn.material.opacity += (targetOpacity - conn.material.opacity) * 0.1;
        }

        // Animate energy particles along the curve
        if (particles && curve && particleProgress) {
          const positions = particles.geometry.attributes.position.array;

          for (let i = 0; i < particleProgress.length; i++) {
            // Move particle along curve
            particleProgress[i] += particleSpeed;
            if (particleProgress[i] > 1) particleProgress[i] = 0; // Loop back to start

            // Get position on curve
            const point = curve.getPoint(particleProgress[i]);
            positions[i * 3] = point.x;
            positions[i * 3 + 1] = point.y;
            positions[i * 3 + 2] = point.z;
          }

          particles.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Animate enhanced starfield (twinkling, drift, and rotation)
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.geometry.userData.velocities;
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

        particlesRef.current.geometry.attributes.position.needsUpdate = true;

        // Twinkling effect via opacity
        const baseOpacity = 0.8;
        const twinkle = Math.sin(time * 2) * 0.2;
        particlesRef.current.material.opacity = baseOpacity + twinkle;
      }

      // Animate nebulas (slow rotation)
      nebulasRef.current.forEach((nebula) => {
        nebula.rotation.z += nebula.userData.rotationSpeed;
      });

      // Easter Egg spawn system (check every 10 seconds)
      const currentTime = Date.now();
      if (currentTime - lastEasterEggCheckRef.current > 10000) {
        lastEasterEggCheckRef.current = currentTime;

        // Only spawn if no active easter egg
        if (!easterEggRef.current) {
          const roll = Math.random();

          // Black Swan: 0.05% chance per check = ~0.3% per minute = ~once per 5.5 hours (super rare!)
          if (roll < 0.0005) {
            easterEggRef.current = createBlackSwan(scene);
          }
          // USS Enterprise-D: 0.17% chance per check = ~1% per minute = ~once per 100 minutes (rare)
          else if (roll < 0.0017) {
            easterEggRef.current = createEnterpriseD(scene);
          }
        }
      }

      // Animate active easter egg
      if (easterEggRef.current) {
        const egg = easterEggRef.current;
        const { velocity, rotationSpeed, type } = egg.userData;

        // Move easter egg
        egg.position.add(velocity);

        // Rotate gently
        egg.rotation.y += rotationSpeed;

        // Type-specific animations
        if (type === 'blackswan') {
          // Gentle bobbing motion (swan floating on water, but in space!)
          egg.userData.bobPhase += 0.01;
          egg.position.y += Math.sin(egg.userData.bobPhase) * 0.02;

          // Subtle wing flapping
          const wingFlap = Math.sin(currentTime * 0.002) * 0.1;
          egg.children.forEach(child => {
            if (child.position.z !== 0) { // Wings are offset on z-axis
              child.rotation.x = wingFlap * (child.position.z > 0 ? 1 : -1);
            }
          });
        } else if (type === 'enterprise') {
          // Pulse warp nacelles and bussard collectors
          egg.userData.pulsePhase += 0.03;
          const pulse = 0.5 + Math.sin(egg.userData.pulsePhase) * 0.3;

          if (egg.userData.bussards) {
            egg.userData.bussards.forEach(bussard => {
              bussard.material.opacity = 0.6 + pulse * 0.3;
            });
          }

          if (egg.userData.warpGlows) {
            egg.userData.warpGlows.forEach(glow => {
              glow.material.opacity = 0.2 + pulse * 0.2;
            });
          }
        }

        // Remove if too far from origin (exited scene)
        const distanceFromOrigin = egg.position.length();
        if (distanceFromOrigin > 250) {
          scene.remove(egg);
          easterEggRef.current = null;
        }
      }

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

      // Update OrbitControls
      controls.update();

      // Render with bloom post-processing
      composerRef.current.render();
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
      composerRef.current.setSize(width, height);
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

      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  // Create Enhanced Starfield (4000 particles with size variation and subtle galaxies)
  const createStarfield = (scene) => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 4000; // Balanced density - enhanced but not overwhelming
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount); // Variable star sizes
    const velocities = new Float32Array(particlesCount * 3); // For rotation animation

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
      size: 1.0, // Base size (will be multiplied by size attribute)
      vertexColors: true,
      opacity: 0.8,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true, // Makes distant stars smaller
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Store for animation
    particlesRef.current = particles;

    // Add distant galaxy sprites for depth
    createDistantGalaxies(scene);
  };

  // Create subtle distant galaxy sprites for atmospheric depth (don't compete with nodes)
  const createDistantGalaxies = (scene) => {
    const galaxyCount = 4; // Reduced from 8 for subtlety
    const lcarColors = [0x5C88DA, 0xCC99CC];

    for (let i = 0; i < galaxyCount; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Create radial gradient for galaxy glow (more subtle)
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      const color = lcarColors[i % lcarColors.length];
      const r = (color >> 16) & 255;
      const g = (color >> 8) & 255;
      const b = color & 255;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`); // Reduced from 0.3
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.05)`); // Reduced from 0.1
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.35, // Reduced from 0.6 for subtlety
        blending: THREE.AdditiveBlending,
      });

      const sprite = new THREE.Sprite(material);
      const angle = (i / galaxyCount) * Math.PI * 2;
      const distance = 220 + Math.random() * 30; // Further away
      sprite.position.set(
        Math.cos(angle) * distance,
        (Math.random() - 0.5) * 80,
        Math.sin(angle) * distance
      );
      sprite.scale.set(30 + Math.random() * 15, 30 + Math.random() * 15, 1); // Smaller

      scene.add(sprite);
    }
  };

  // Create Animated Nebula Backgrounds
  const createNebulas = (scene) => {
    const nebulaCount = 3;
    const nebulaColors = [
      { primary: [92, 136, 218], secondary: [204, 153, 204] },  // Blue to Purple
      { primary: [255, 107, 157], secondary: [153, 78, 221] },  // Pink to Purple
      { primary: [99, 204, 153], secondary: [92, 136, 218] }    // Teal to Blue
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Create complex nebula with multiple gradients and noise
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
      nebulasRef.current.push(nebula);
    }
  };

  // Easter Egg: Glass-like Black Swan (super rare - Taleb's Black Swan concept)
  const createBlackSwan = (scene) => {
    const swan = new THREE.Group();

    // Swan body - elongated sphere
    const bodyGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    bodyGeometry.scale(1.4, 1, 0.8); // Elongate
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.4,
      transmission: 0.95, // Glass-like transmission
      thickness: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.5, // Index of refraction for glass
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
    const edge = Math.floor(Math.random() * 4); // 0=left, 1=right, 2=top, 3=bottom
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
  };

  // Easter Egg: USS Enterprise-D (less rare - TNG homage)
  const createEnterpriseD = (scene) => {
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
    const edge = Math.floor(Math.random() * 4); // 0=left, 1=right, 2=top, 3=bottom
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
    ship.userData.bussards = [leftBussard, rightBussard]; // For pulsing animation
    ship.userData.warpGlows = [leftWarpGlow, rightWarpGlow]; // For pulsing animation

    // Point ship in direction of travel
    ship.lookAt(target.add(ship.position));

    scene.add(ship);
    return ship;
  };

  // Create Center Node (Level 0)
  const createCenterNode = (scene) => {
    const { center } = mindMapData;

    // Main sphere - glass-like with higher emissive
    const geometry = new THREE.SphereGeometry(2.0, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(center.color),
      emissive: new THREE.Color(center.color),
      emissiveIntensity: 0.8,
      roughness: 0.1,  // Much smoother/glossier
      metalness: 0.6,  // More metallic/reflective
      transparent: true,
      opacity: 0.85,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.userData = center;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.originalY = 0;

    // Inner bright core (energy center)
    const coreGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(center.color),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sphere.add(core);

    // Inner glow layer (fresnel-like effect)
    const innerGlowGeometry = new THREE.SphereGeometry(1.95, 32, 32);
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(center.color),
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    sphere.add(innerGlow);

    // Outer glow effect (larger, more diffuse)
    const glowGeometry = new THREE.SphereGeometry(2.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(center.color),
      transparent: true,
      opacity: 0.15,
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
    const radius = 25;
    const angleStep = (Math.PI * 2) / level1.length;

    level1.forEach((pillar, index) => {
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0;

      // Main sphere - glass-like with higher emissive
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(pillar.color),
        emissive: new THREE.Color(pillar.color),
        emissiveIntensity: 0.7,
        roughness: 0.15,  // Smoother/glossier
        metalness: 0.5,   // More metallic/reflective
        transparent: true,
        opacity: 0.85,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = pillar;
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      // Inner bright core (energy center)
      const coreGeometry = new THREE.SphereGeometry(0.9, 16, 16);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      sphere.add(core);

      // Inner glow layer (fresnel-like effect)
      const innerGlowGeometry = new THREE.SphereGeometry(1.45, 32, 32);
      const innerGlowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        transparent: true,
        opacity: 0.25,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
      sphere.add(innerGlow);

      // Outer glow effect (larger, more diffuse)
      const glowGeometry = new THREE.SphereGeometry(2.1, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillar.color),
        transparent: true,
        opacity: 0.12,
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

    // No node limit - memory leak fixed, all content accessible
    // Previous limit was blocking users from exploring full knowledge base

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

      // Main sphere - glass-like with higher emissive
      const geometry = new THREE.SphereGeometry(1.2, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(child.color),
        emissive: new THREE.Color(child.color),
        emissiveIntensity: 0.6,
        roughness: 0.2,  // Smoother/glossier
        metalness: 0.4,  // More metallic/reflective
        transparent: true,
        opacity: 0.85,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = {
        ...child,
        parent: parent.id
      };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.originalY = y;

      // Inner bright core (energy center)
      const coreGeometry = new THREE.SphereGeometry(0.7, 16, 16);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(child.color),
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      sphere.add(core);

      // Inner glow layer (fresnel-like effect)
      const innerGlowGeometry = new THREE.SphereGeometry(1.15, 32, 32);
      const innerGlowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(child.color),
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
      sphere.add(innerGlow);

      // Outer glow effect (larger, more diffuse)
      const glowGeometry = new THREE.SphereGeometry(1.7, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(child.color),
        transparent: true,
        opacity: 0.1,
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

    // No node limit - memory leak fixed, all content accessible

    const parentPos = parentNode.position;
    const radius = 8;

    // No limit - memory leak fixed via reusable Vector3 constants (lines 84-85)
    // All media items now rendered for complete knowledge base access
    const angleStep = (Math.PI * 2) / parent.media.length;

    parent.media.forEach((mediaItem, index) => {
      try {
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

      // Single optimized sphere - reduced from 3 meshes to 1 for performance
      // Reduced segments from 16 to 8 (75% fewer polygons)
      const geometry = new THREE.SphereGeometry(0.8, 8, 8);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(mediaColor),
        emissive: new THREE.Color(mediaColor),
        emissiveIntensity: 0.8, // Increased from 0.6 to compensate for removed glow
        roughness: 0.1,          // More glossy (was 0.2)
        metalness: 0.6,          // More metallic (was 0.4)
        transparent: true,
        opacity: 0.9,            // Slightly more opaque
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

      // Removed inner core and outer glow child meshes
      // Visual quality maintained through enhanced material properties
      // Performance improvement: 354 mesh objects → 118 (66% reduction)

      scene.add(sphere);
      nodesRef.current.push(sphere);

      // Create connection to parent
      createConnection(scene, parentPos, new THREE.Vector3(x, y, z), mediaColor, 0.2, parent.id, mediaId);
      } catch (error) {
        console.error('createMediaNodes: Failed to create media node', {
          error: error.message,
          parentId: parent.id,
          mediaIndex: index,
          mediaTitle: mediaItem?.title
        });
        // Continue to next media item - don't let one failure kill all media
      }
    });
  };

  // Remove Child Nodes (including their children and media)
  const removeChildNodes = (scene, parentNode) => {
    const parent = parentNode.userData;

    // Find all child nodes and media nodes
    const nodesToRemove = nodesRef.current.filter(node => {
      return node.userData.parent === parent.id ||
             node.userData.parentId === parent.id ||
             node.userData.isMedia && node.userData.parentNodeId === parent.id;
    });

    // Also remove children of children recursively
    const getDescendants = (parentId) => {
      return nodesRef.current.filter(node =>
        node.userData.parent === parentId || node.userData.parentId === parentId
      );
    };

    // Collect all descendants
    const allNodesToRemove = [...nodesToRemove];
    nodesToRemove.forEach(node => {
      const descendants = getDescendants(node.userData.id);
      allNodesToRemove.push(...descendants);
    });

    // Remove duplicates
    const uniqueNodesToRemove = [...new Set(allNodesToRemove)];

    uniqueNodesToRemove.forEach(node => {
      scene.remove(node);
      if (node.geometry) node.geometry.dispose();
      if (node.material) node.material.dispose();
    });

    nodesRef.current = nodesRef.current.filter(node => !uniqueNodesToRemove.includes(node));

    // Remove connections by checking node IDs instead of positions
    const removedNodeIds = new Set(uniqueNodesToRemove.map(node => node.userData.id));
    const connectionsToRemove = connectionsRef.current.filter(conn => {
      const { parentId, childId } = conn.userData;
      // Remove connection if either endpoint node is being removed
      return removedNodeIds.has(parentId) || removedNodeIds.has(childId);
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

    connectionsRef.current = connectionsRef.current.filter(conn => !connectionsToRemove.includes(conn));
  };

  // Create Connection (curved line with energy particles)
  const createConnection = (scene, start, end, color, opacity = 0.3, parentId = null, childId = null) => {
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
      opacity: opacity * 0.3, // Much dimmer
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
      particleProgress: Array(particleCount).fill(0).map((_, i) => i / particleCount), // Track each particle's progress
      particleSpeed: 0.003 + Math.random() * 0.002 // Slight speed variation
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
  // Helper to get all descendant node IDs recursively
  const getDescendantIds = (nodeId) => {
    const descendantIds = [];
    const collectDescendants = (parentId) => {
      nodesRef.current.forEach(node => {
        const data = node.userData;
        if (data.parent === parentId || data.parentId === parentId) {
          descendantIds.push(data.id);
          // Recursively collect this node's descendants
          collectDescendants(data.id);
        }
      });
    };
    collectDescendants(nodeId);
    return descendantIds;
  };

  const handleNodeClick = (node) => {
    try {
      // DEFENSIVE: Guard against null/undefined
      if (!node || !node.userData) {
        console.warn('handleNodeClick: Invalid node', node);
        return;
      }

      const nodeData = node.userData;

      // Handle media click FIRST (media nodes use mediaId, not id)
      if (nodeData.isMedia) {
        setImageError(false); // Reset error state for new media
        setSelectedMedia(nodeData);
        return;
      }

    // DEFENSIVE: Guard against missing ID (for regular nodes)
    if (!nodeData.id) {
      console.warn('handleNodeClick: Node missing ID', nodeData);
      return;
    }

    // Handle regular node click
    setSelectedNode(nodeData);

    const nodeId = nodeData.id;
    const isExpanded = expandedNodesRef.current.has(nodeId);

    // DEFENSIVE: Guard against missing scene
    if (!sceneRef.current) {
      console.warn('handleNodeClick: Scene not ready');
      return;
    }

    if (isExpanded) {
      // Collapse - also remove all descendant IDs from expandedNodes
      const descendantIds = getDescendantIds(nodeId);
      removeChildNodes(sceneRef.current, node);
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        // Remove all descendants from expanded tracking
        descendantIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    } else {
      // Expand
      let hasExpanded = false;

      // DEFENSIVE: Check children exists and is array before accessing
      if (Array.isArray(nodeData.children) && nodeData.children.length > 0) {
        createChildNodes(sceneRef.current, node);
        hasExpanded = true;
      }

      // DEFENSIVE: Check media exists and is array before accessing
      if (Array.isArray(nodeData.media) && nodeData.media.length > 0) {
        createMediaNodes(sceneRef.current, node);
        hasExpanded = true;
      }

      // Add to expanded nodes if anything was created
      if (hasExpanded) {
        setExpandedNodes(prev => new Set(prev).add(nodeId));
      }
    }
    } catch (error) {
      console.error('handleNodeClick: Error occurred', {
        error: error.message,
        stack: error.stack,
        nodeId: node?.userData?.id,
        nodeLabel: node?.userData?.label
      });
      // Graceful degradation - show error to user but don't crash
      alert(`Unable to open node: ${node?.userData?.label || 'Unknown'}. Error: ${error.message}`);
    }
  };

  // Search filter
  // Enhanced Search: Search all data, auto-expand parents when matches found
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Reset opacity if no search query
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

    // COMPREHENSIVE SEARCH: Search ALL text fields in methodologies
    const matchingMethodologies = mindMapData.methodologies.filter(method => {
      // Basic fields
      if (method.label?.toLowerCase().includes(query)) return true;
      if (method.description?.toLowerCase().includes(query)) return true;
      if (method.id?.toLowerCase().includes(query)) return true;

      // Historical context
      if (method.historicalContext?.toLowerCase().includes(query)) return true;

      // Media items (titles, descriptions, sources, organizations)
      if (method.media?.some(m =>
        m.title?.toLowerCase().includes(query) ||
        m.description?.toLowerCase().includes(query) ||
        m.source?.toLowerCase().includes(query) ||
        m.organization?.toLowerCase().includes(query) ||
        m.author?.toLowerCase().includes(query)
      )) return true;

      // Process guide steps
      if (method.processGuide?.steps?.some(s =>
        s.name?.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query)
      )) return true;

      // Case studies
      if (method.caseStudies?.some(cs =>
        cs.title?.toLowerCase().includes(query) ||
        cs.organization?.toLowerCase().includes(query) ||
        cs.challenge?.toLowerCase().includes(query) ||
        cs.approach?.toLowerCase().includes(query) ||
        cs.outcome?.toLowerCase().includes(query)
      )) return true;

      // Pioneers
      if (method.pioneers?.some(p => p.toLowerCase().includes(query))) return true;

      // Related pillars
      if (method.relatedPillars?.some(rp =>
        rp.pillar?.toLowerCase().includes(query) ||
        rp.relationship?.toLowerCase().includes(query)
      )) return true;

      // Common pitfalls
      if (method.metadata?.commonPitfalls?.some(p => p.toLowerCase().includes(query))) return true;

      // Best for / sectors
      if (method.metadata?.bestFor?.some(b => b.toLowerCase().includes(query))) return true;
      if (method.metadata?.sectors?.some(s => s.toLowerCase().includes(query))) return true;

      return false;
    });

    // Auto-expand parent pillars if methodologies match but aren't visible
    // BUG FIX: Use expandedNodesRef instead of expandedNodes to prevent infinite loop
    matchingMethodologies.forEach(method => {
      const parentPillarId = method.pillar;
      const parentPillar = nodesRef.current.find(n => n.userData.id === parentPillarId);

      if (parentPillar && !expandedNodesRef.current.has(parentPillarId)) {
        // Auto-expand parent to reveal matched methodology
        setExpandedNodes(prev => new Set([...prev, parentPillarId]));
      }
    });

    // Highlight matching nodes (enhanced with deep search)
    nodesRef.current.forEach(node => {
      const data = node.userData;

      // Basic text match
      let matches =
        (data.label && data.label.toLowerCase().includes(query)) ||
        (data.description && data.description.toLowerCase().includes(query)) ||
        (data.title && data.title.toLowerCase().includes(query)) ||
        (data.id && data.id.toLowerCase().includes(query));

      // Check if this is a media node - search its content
      if (data.isMedia && data.mediaData) {
        matches = matches ||
          (data.mediaData.title && data.mediaData.title.toLowerCase().includes(query)) ||
          (data.mediaData.description && data.mediaData.description.toLowerCase().includes(query)) ||
          (data.mediaData.source && data.mediaData.source.toLowerCase().includes(query)) ||
          (data.mediaData.organization && data.mediaData.organization.toLowerCase().includes(query));
      }

      // Check if this is a methodology node - search deep fields
      if (data.level === 2) {
        const methodology = mindMapData.methodologies.find(m => m.id === data.id);
        if (methodology) {
          // Already checked in matchingMethodologies, but also highlight the node
          matches = matches || matchingMethodologies.includes(methodology);
        }
      }

      if (node.material) {
        node.material.opacity = matches ? 1.0 : 0.2;
        node.material.emissiveIntensity = matches ? 0.7 : 0.1;
      }
    });
  }, [searchQuery]); // CRITICAL FIX: Removed expandedNodes from deps - was causing infinite loop!

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

  // Tour: Auto-open nodes when segment changes
  useEffect(() => {
    const handleSegment = ({ segment }) => {
      if (!segment.nodeId || !sceneRef.current) return;

      // Find the node in the scene by its ID
      let targetNode = null;
      sceneRef.current.traverse((obj) => {
        if (obj.userData && obj.userData.id === segment.nodeId) {
          targetNode = obj;
        }
      });

      if (targetNode) {
        const isExpanded = expandedNodesRef.current.has(segment.nodeId);

        if (!isExpanded) {
          // Expand the node
          handleNodeClick(targetNode);
        } else {
          // Already expanded, just set as selected to show info panel
          setSelectedNode(targetNode.userData);
        }
      }
    };

    // Register tour event listener
    const unsubscribe = tourManager.on('segment', handleSegment);

    // Cleanup on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [expandedNodes]); // Re-run if expandedNodes changes

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* SEO H1 Tag - Visually Hidden */}
      <h1 style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}>
        Strategic Foresight Mind Map - Interactive 3D Educational Visualization of Futures Thinking Methodologies
      </h1>

      {/* 3D Canvas Container - Main Visualization */}
      <main
        ref={containerRef}
        role="main"
        aria-label="Interactive 3D mind map visualization of Strategic Foresight methodologies"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          background: '#000000',
        }}
      />

      {/* LCARS Search Box */}
      <nav
        role="search"
        aria-label="Search foresight methodologies and content"
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,  // Higher than control panel (10) to prevent overlap on mobile
          display: 'flex',
          alignItems: 'center',
          gap: '0',
        }}
      >
        <div style={{
          background: COLORS.secondary,
          padding: '14px 20px',
          borderRadius: '20px 0 0 20px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#000000',
          letterSpacing: '2px',
          fontFamily: 'monospace',
        }}
        aria-hidden="true"
        >
          SEARCH
        </div>
        <input
          type="search"
          placeholder="ENTER QUERY..."
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
          aria-label="Search for Strategic Foresight pillars, methodologies, and educational resources"
          aria-describedby="search-results-status"
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
        {/* Screen reader announcement for search results */}
        <div
          id="search-results-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          {searchQuery && `Filtering results for: ${searchQuery}`}
        </div>
      </nav>

      {/* LCARS Control Panel */}
      <aside
        role="complementary"
        aria-labelledby="control-panel-title"
        aria-label="Navigation controls and interactive features"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '280px',
          zIndex: 10,
        }}
      >
        {/* Header Bar with Toggle */}
        <h1
          id="control-panel-title"
          onClick={() => setControlPanelOpen(!controlPanelOpen)}
          style={{
            background: COLORS.primary,
            padding: '12px 20px',
            borderRadius: controlPanelOpen ? '20px 20px 0 0' : '20px',
            fontSize: '16px',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '3px',
            textAlign: 'center',
            fontFamily: 'monospace',
            margin: 0,
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '20px' }}>{controlPanelOpen ? '▼' : '▶'}</span>
          CONTROLS
        </h1>

        {/* Main Panel */}
        {controlPanelOpen && <div style={{
          background: '#000000',
          border: `4px solid ${COLORS.primary}`,
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '20px',
        }}>
          {/* Tour Launcher Button */}
          <button
            onClick={() => setShowTourSelection(true)}
            aria-label="Start guided tour of Strategic Foresight"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`,
              border: `2px solid ${COLORS.secondary}`,
              color: COLORS.secondary,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '15px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}40 0%, ${COLORS.highlight}40 100%)`;
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.secondary}20 0%, ${COLORS.highlight}20 100%)`;
              e.target.style.transform = 'scale(1)';
            }}
          >
            GUIDED TOUR
          </button>

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
            aria-label={timelineVisible ? 'Close historical timeline view' : 'Open historical timeline view of foresight methodologies'}
            aria-pressed={timelineVisible}
            aria-controls="timeline-panel"
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
            aria-label={showRelationships ? 'Hide cross-pillar methodology relationships' : 'Show cross-pillar methodology relationships'}
            aria-pressed={showRelationships}
            aria-describedby="relationships-description"
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
          <div
            id="relationships-description"
            style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Display connections between methodologies across different strategic foresight pillars
          </div>

          {/* Audio Controls */}
          <section
            role="region"
            aria-labelledby="audio-controls-heading"
            style={{
              background: 'rgba(255, 107, 157, 0.1)',
              border: `2px solid ${COLORS.pink}`,
              borderRadius: '15px',
              padding: '15px',
              marginBottom: '15px',
            }}
          >
            <h2
              id="audio-controls-heading"
              style={{
                color: COLORS.pink,
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontFamily: 'monospace',
                margin: '0 0 12px 0',
              }}
            >
              AMBIENT AUDIO
            </h2>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              aria-label={audioEnabled ? 'Disable ambient background audio' : 'Enable ambient background audio'}
              aria-pressed={audioEnabled}
              aria-describedby="audio-presets-group"
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
            <fieldset
              id="audio-presets-group"
              role="radiogroup"
              aria-label="Select ambient audio preset for focus or relaxation"
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', border: 'none', padding: 0, margin: 0 }}
            >
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
                    aria-label={`${AUDIO_PRESETS[presetNum].label} - ${presetNum === 1 ? 'Beta waves for focused study' : presetNum === 2 ? 'Alpha waves for calm workflow' : 'Deep ambient soundscape'}`}
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
            </fieldset>

            {/* Tour Audio Volume Controls */}
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: `1px solid ${COLORS.pink}40`,
            }}>
              <h3 style={{
                color: COLORS.pink,
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '10px',
                fontFamily: 'monospace',
                margin: '0 0 10px 0',
                opacity: 0.8,
              }}>
                TOUR VOLUME
              </h3>

              {/* Music Volume */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}>
                  <label
                    htmlFor="music-volume"
                    style={{
                      color: COLORS.pink,
                      fontSize: '9px',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      fontFamily: 'monospace',
                    }}
                  >
                    MUSIC
                  </label>
                  <span style={{
                    color: COLORS.pink,
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    opacity: 0.7,
                  }}>
                    {tourMusicVolume}%
                  </span>
                </div>
                <input
                  id="music-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={tourMusicVolume}
                  onChange={(e) => {
                    const vol = parseInt(e.target.value);
                    setTourMusicVolume(vol);
                    audioManager.setMusicVolume(vol / 100);
                  }}
                  style={{
                    width: '100%',
                    height: '4px',
                    borderRadius: '2px',
                    background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourMusicVolume}%, #333 ${tourMusicVolume}%, #333 100%)`,
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Tour background music volume"
                />
              </div>

              {/* Narration Volume */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}>
                  <label
                    htmlFor="narration-volume"
                    style={{
                      color: COLORS.pink,
                      fontSize: '9px',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      fontFamily: 'monospace',
                    }}
                  >
                    NARRATION
                  </label>
                  <span style={{
                    color: COLORS.pink,
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    opacity: 0.7,
                  }}>
                    {tourNarrationVolume}%
                  </span>
                </div>
                <input
                  id="narration-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={tourNarrationVolume}
                  onChange={(e) => {
                    const vol = parseInt(e.target.value);
                    setTourNarrationVolume(vol);
                    audioManager.setNarrationVolume(vol / 100);
                  }}
                  style={{
                    width: '100%',
                    height: '4px',
                    borderRadius: '2px',
                    background: `linear-gradient(to right, ${COLORS.pink} 0%, ${COLORS.pink} ${tourNarrationVolume}%, #333 ${tourNarrationVolume}%, #333 100%)`,
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Tour narration volume"
                />
              </div>

              {/* Mute Toggle */}
              <button
                onClick={() => {
                  const newMuted = !tourAudioMuted;
                  setTourAudioMuted(newMuted);
                  audioManager.setMuted(newMuted);
                }}
                aria-label={tourAudioMuted ? 'Unmute tour audio' : 'Mute tour audio'}
                aria-pressed={tourAudioMuted}
                style={{
                  width: '100%',
                  background: tourAudioMuted ? `${COLORS.pink}30` : 'transparent',
                  border: `1px solid ${COLORS.pink}60`,
                  color: COLORS.pink,
                  padding: '6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                  opacity: tourAudioMuted ? 1 : 0.7,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `${COLORS.pink}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = tourAudioMuted ? `${COLORS.pink}30` : 'transparent';
                }}
              >
                {tourAudioMuted ? 'MUTED' : 'MUTE'}
              </button>
            </div>
          </section>

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
        </div>}
      </aside>

      {/* Info Panel */}
      {selectedNode && (
        <aside
          role="region"
          aria-labelledby="selected-node-title"
          aria-label={`Detailed information about ${selectedNode.label?.replace(/\\n/g, ' ')}`}
          style={{
            position: 'absolute',
            top: '0',
            right: infoPanelOpen ? '0' : '-450px',
            width: '450px',
            height: '100vh',
            background: 'rgba(26, 26, 46, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            overflowY: 'auto',
            borderLeft: `2px solid ${selectedNode.color || COLORS.primary}`,
            color: COLORS.text,
            fontFamily: 'Inter, sans-serif',
            transition: 'right 0.3s ease',
            boxShadow: `-10px 0 40px ${selectedNode.color || COLORS.primary}30`,
          }}
        >
          {/* Collapse toggle button */}
          <button
            onClick={() => setInfoPanelOpen(!infoPanelOpen)}
            aria-label={infoPanelOpen ? 'Close info panel' : 'Open info panel'}
            style={{
              position: 'absolute',
              left: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '80px',
              background: selectedNode.color || COLORS.primary,
              border: 'none',
              borderRadius: '8px 0 0 8px',
              color: '#000',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {infoPanelOpen ? '▶' : '◀'}
          </button>
          {/* Live region for node selection announcements */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Now viewing: {selectedNode.label?.replace(/\\n/g, ' ')}
          </div>

          <button
            onClick={() => setSelectedNode(null)}
            aria-label="Close information panel"
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
              id="selected-node-title"
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
            <section aria-labelledby="pioneers-heading" style={{ marginBottom: '24px' }}>
              <h3
                id="pioneers-heading"
                style={{
                  color: COLORS.secondary,
                  fontSize: '12px',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  margin: '0 0 12px 0',
                }}
              >
                PIONEERS
              </h3>
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
            </section>
          )}

          {selectedNode.historicalContext && (
            <section aria-labelledby="history-heading" style={{ marginBottom: '24px' }}>
              <h3
                id="history-heading"
                style={{
                  color: COLORS.secondary,
                  fontSize: '12px',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  margin: '0 0 12px 0',
                }}
              >
                HISTORY
              </h3>
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
            </section>
          )}

          {selectedNode.application && (
            <section aria-labelledby="application-heading" style={{ marginBottom: '24px' }}>
              <h3
                id="application-heading"
                style={{
                  color: COLORS.accent,
                  fontSize: '12px',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  margin: '0 0 12px 0',
                }}
              >
                HOW TO USE
              </h3>
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
            </section>
          )}

          {selectedNode.famousExample && (
            <section aria-labelledby="example-heading" style={{ marginBottom: '24px' }}>
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
                }}
                aria-hidden="true"
                >
                  ⭐
                </div>
                <h3
                  id="example-heading"
                  style={{
                    color: COLORS.highlight,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    marginBottom: '10px',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                    margin: '0 0 10px 0',
                  }}
                >
                  FAMOUS EXAMPLE
                </h3>
                <div style={{
                  fontSize: '13px',
                  lineHeight: '1.7',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                  {selectedNode.famousExample}
                </div>
              </div>
            </section>
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

          {(() => {
            // Aggregate media from selected node and expanded children
            const mediaByNode = [];

            // Add selected node's media
            if (selectedNode.media && selectedNode.media.length > 0) {
              mediaByNode.push({
                nodeLabel: selectedNode.label,
                nodeColor: selectedNode.color,
                media: selectedNode.media,
                isParent: true
              });
            }

            // Add expanded children's media
            if (selectedNode.children && expandedNodes.has(selectedNode.id)) {
              selectedNode.children.forEach(child => {
                if (child.media && child.media.length > 0) {
                  mediaByNode.push({
                    nodeLabel: child.label,
                    nodeColor: child.color,
                    media: child.media,
                    isParent: false
                  });
                }
              });
            }

            if (mediaByNode.length === 0) return null;

            return (
              <section aria-labelledby="media-library-heading" style={{ marginTop: '24px', marginBottom: '20px' }}>
                <h3
                  id="media-library-heading"
                  style={{
                    color: COLORS.success,
                    fontSize: '12px',
                    letterSpacing: '2px',
                    marginBottom: '12px',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                    margin: '0 0 12px 0',
                  }}
                >
                  MEDIA LIBRARY
                </h3>

                {mediaByNode.map((nodeGroup, idx) => (
                  <div key={idx} style={{ marginBottom: '16px' }}>
                    {/* Node label - only show if there are multiple nodes */}
                    {mediaByNode.length > 1 && (
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: nodeGroup.nodeColor,
                        marginBottom: '8px',
                        paddingLeft: '4px',
                        borderLeft: `3px solid ${nodeGroup.nodeColor}`,
                        paddingTop: '2px',
                        paddingBottom: '2px',
                      }}>
                        {nodeGroup.nodeLabel.replace(/\n/g, ' ')}
                      </div>
                    )}

                    {/* Media counts */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}>
                      {(() => {
                        const mediaCounts = nodeGroup.media.reduce((acc, item) => {
                          acc[item.type] = (acc[item.type] || 0) + 1;
                          return acc;
                        }, {});
                        const mediaTypes = [
                          { type: 'video', icon: '►', label: 'Videos', color: '#FF6B9D' },
                          { type: 'image', icon: '■', label: 'Images', color: '#64c8ff' },
                          { type: 'document', icon: '▬', label: 'Docs', color: '#99CC99' },
                          { type: 'article', icon: '●', label: 'Articles', color: '#FFCC66' },
                        ];
                        return mediaTypes.filter(mt => mediaCounts[mt.type]).map(mt => (
                          <button
                            key={mt.type}
                            onClick={() => {
                              // Find the methodology node in 3D scene
                              const methodNode = nodesRef.current.find(n => n.userData.id === nodeGroup.id);
                              if (methodNode) {
                                // If not expanded, expand it to show media orbs
                                if (!expandedNodesRef.current.has(nodeGroup.id)) {
                                  handleNodeClick(methodNode);
                                }
                              }
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 12px',
                              background: `${mt.color}15`,
                              border: `1px solid ${mt.color}40`,
                              borderRadius: '8px',
                              fontSize: '13px',
                              color: COLORS.text,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = `${mt.color}30`;
                              e.currentTarget.style.borderColor = `${mt.color}80`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = `${mt.color}15`;
                              e.currentTarget.style.borderColor = `${mt.color}40`;
                            }}
                          >
                            <span style={{ fontSize: '16px', color: mt.color }}>{mt.icon}</span>
                            <span style={{ fontWeight: '600' }}>{mediaCounts[mt.type]}</span>
                            <span style={{ opacity: 0.7 }}>{mt.label}</span>
                          </button>
                        ));
                      })()}
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: '10px',
                  fontSize: '11px',
                  color: COLORS.text,
                  opacity: 0.6,
                  fontStyle: 'italic',
                }}>
                  Click badges to expand and view media orbs in 3D space
                </div>
              </section>
            );
          })()}

          {selectedNode.wikipedia && (
            <a
              href={selectedNode.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn more about ${selectedNode.label?.replace(/\\n/g, ' ')} on Wikipedia (opens in new tab)`}
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
        </aside>
      )}

      {/* Media Viewer */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-labelledby="media-viewer-title"
          aria-describedby="media-viewer-description"
          aria-modal="true"
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
          <article
            role="document"
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
              aria-label="Close media viewer"
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

            <h2
              id="media-viewer-title"
              style={{
                color: MEDIA_COLORS[selectedMedia.type],
                marginTop: '0',
                marginBottom: '10px',
                paddingRight: '60px',
                fontFamily: 'Inter'
              }}
            >
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

            <p
              id="media-viewer-description"
              style={{ color: '#b8c5d8', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6', fontFamily: 'Inter' }}
            >
              {selectedMedia.description}
            </p>

            {selectedMedia.type === 'video' && (
              <div>
                {/* Lightweight video preview - no iframe embed to prevent hangs/crashes */}
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(92, 136, 218, 0.1) 100%)',
                  borderRadius: '8px',
                  border: `2px solid ${MEDIA_COLORS.video}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '80%'
                  }}>
                    <div style={{
                      fontSize: '64px',
                      marginBottom: '16px',
                      opacity: 0.8
                    }}>►</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#b8c5d8',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}>
                      VIDEO RESOURCE
                    </div>
                    <a
                      href={selectedMedia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${selectedMedia.title} on YouTube (opens in new tab)`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: MEDIA_COLORS.video,
                        color: '#000',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        transition: 'all 0.2s',
                        fontFamily: 'monospace',
                        boxShadow: `0 4px 12px ${MEDIA_COLORS.video}40`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = `0 6px 16px ${MEDIA_COLORS.video}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = `0 4px 12px ${MEDIA_COLORS.video}40`;
                      }}
                    >
                      ▶ WATCH ON YOUTUBE
                    </a>
                  </div>
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
                  <div style={{ fontSize: '10px', color: '#888' }}>
                    Click thumbnail above to watch externally
                  </div>
                </div>
              </div>
            )}

            {selectedMedia.type === 'image' && (
              <div>
                {!imageError ? (
                  <div>
                    <img
                      src={selectedMedia.url}
                      alt={`${selectedMedia.title} - ${selectedMedia.description}`}
                      onError={() => setImageError(true)}
                      loading="lazy"
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
                        SOURCE: <span style={{ color: MEDIA_COLORS.image }}>
                          {selectedMedia.source || (selectedMedia.url.startsWith('/') ? 'LOCAL DIAGRAM' : new URL(selectedMedia.url).hostname.replace('www.', '').toUpperCase())}
                        </span>
                      </div>
                      <a
                        href={selectedMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View full-size image (opens in new tab)`}
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
                    <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.8, fontFamily: 'Arial', fontWeight: '400' }}>■</div>
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
                    {selectedMedia.type === 'article' ? '●' : '▬'}
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
                    SOURCE: <span style={{ color: MEDIA_COLORS[selectedMedia.type] }}>
                      {selectedMedia.source || (selectedMedia.url.startsWith('/') ? 'LOCAL DIAGRAM' : new URL(selectedMedia.url).hostname.replace('www.', '').toUpperCase())}
                    </span>
                  </div>
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read full ${selectedMedia.type} on ${selectedMedia.source || 'external website'} (opens in new tab)`}
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
          </article>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <div
          role="tooltip"
          aria-live="polite"
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
        <div id="timeline-panel">
          <Suspense fallback={<div style={{ padding: '20px', color: '#fff' }}>Loading timeline...</div>}>
            <TimelineView onClose={() => setTimelineVisible(false)} />
          </Suspense>
        </div>
      )}

      {/* Hidden About Section - Copyright & Attribution */}
      <div
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        role="contentinfo"
        aria-label="Copyright and attribution information"
      >
        <p>Future Studies Explorer - Copyright © 2025 Alexander Kline Consulting. All rights reserved.</p>
        <p>An interactive 3D visualization of strategic foresight methodologies based on the Six Pillars framework by Sohail Inayatullah.</p>
        <p>Developer: Alexander Kline Consulting</p>
        <p>Contact: Alexander Kline Consulting</p>
      </div>

      {/* Tour Selection Modal */}
      <Suspense fallback={null}>
        <TourSelectionModal
          isOpen={showTourSelection}
          onClose={() => setShowTourSelection(false)}
        onSelectTour={async (tourId) => {
          setShowTourSelection(false);
          const tourData = getTour(tourId);
          if (tourData) {
            setTourActive(true);
            try {
              await tourManager.loadTour(tourData);
              await tourManager.start();
            } catch (error) {
              console.error('[Tour] Failed to start:', error);
              alert(`Tour failed to start: ${error.message}\n\nCheck browser console for details.`);
              setTourActive(false);
            }
          }
        }}
      />
      </Suspense>

      {/* Tour HUD - Active during tour */}
      {tourActive && (
        <Suspense fallback={null}>
          <TourHUD
            onClose={() => setTourActive(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

// Wrap component with Error Boundary to catch render crashes
const ForesightMindMapWithErrorBoundary = () => (
  <ErrorBoundary>
    <ForesightMindMap />
  </ErrorBoundary>
);

export default ForesightMindMapWithErrorBoundary;
