import { useEffect, useRef, useState, memo } from 'react';
import type * as THREE from 'three';
import AmbrosLogo from './AmbrosLogo';

interface ThreeHeroCanvasProps {
  scrollY?: number;
  canStart?: boolean;
}

export default memo(function ThreeHeroCanvas({
  scrollY = 0,
  canStart = true,
}: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollY);
  scrollRef.current = scrollY;

  // Check for mobile (screen width < 768px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 1. If on mobile, 3D is completely disabled
    if (isMobile) return;

    // 2. Wait until idle / canStart
    if (!canStart) return;

    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let animationFrameId: number | null = null;
    let observer: IntersectionObserver | null = null;
    let isVisible = true;

    // Cleaners bag
    let cleanupFn: (() => void) | null = null;

    // Dynamically import Three.js only on desktop when idle & ready
    const initThreeScene = async () => {
      try {
        const THREE = await import('three');
        if (isDisposed || !container) return;

        // Dimensions
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        // Scene & Fog (no post-processing or bloom)
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.045);

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 14);

        // Renderer (capped DPR at 1.5 max)
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        container.appendChild(renderer.domElement);

        // Group for objects
        const objectsGroup = new THREE.Group();
        scene.add(objectsGroup);

        // Brand Colors
        const slateColor = new THREE.Color(0x6d8196);
        const creamColor = new THREE.Color(0xffffe3);

        // Optimized Lights (no heavy shadow computation)
        const ambientLight = new THREE.AmbientLight(0x0f1318, 2.0);
        scene.add(ambientLight);

        const slateRimLight = new THREE.PointLight(slateColor, 7.0, 28);
        slateRimLight.position.set(-6, 5, 4);
        scene.add(slateRimLight);

        const creamAccentLight = new THREE.PointLight(creamColor, 5.0, 28);
        creamAccentLight.position.set(7, -4, 5);
        scene.add(creamAccentLight);

        // Lightweight Standard Materials (GPU friendly, zero transmission multi-pass overhead)
        const chromeMaterial = new THREE.MeshStandardMaterial({
          color: 0x1c2026,
          roughness: 0.18,
          metalness: 0.92,
        });

        const slateMaterial = new THREE.MeshStandardMaterial({
          color: slateColor,
          roughness: 0.3,
          metalness: 0.6,
          transparent: true,
          opacity: 0.85,
        });

        const creamMaterial = new THREE.MeshStandardMaterial({
          color: 0x22262d,
          roughness: 0.35,
          metalness: 0.8,
        });

        // 50% Reduced Polygon Geometries (low-poly specification)
        // Torus knot: 60 x 12 (halved from 120 x 24)
        const torusKnotGeo = new THREE.TorusKnotGeometry(1.6, 0.42, 60, 12, 2, 3);
        // Ring: 8 x 40 (halved from 16 x 80)
        const ringGeo = new THREE.TorusGeometry(2.4, 0.08, 8, 40);
        // Sphere: 18 x 18 (halved from 36 x 36)
        const sphereGeo = new THREE.SphereGeometry(0.85, 18, 18);
        const icosahedronGeo = new THREE.IcosahedronGeometry(1.1, 0);
        const smallShardGeo = new THREE.TetrahedronGeometry(0.7, 0);

        // Main central hero sculpture: Chrome Torus Knot
        const mainTorus = new THREE.Mesh(torusKnotGeo, chromeMaterial);
        mainTorus.position.set(2.5, 0.4, 0);
        objectsGroup.add(mainTorus);

        // Orbiting Ring
        const luxuryRing = new THREE.Mesh(ringGeo, slateMaterial);
        luxuryRing.position.set(2.5, 0.4, -0.5);
        luxuryRing.rotation.x = Math.PI / 3;
        objectsGroup.add(luxuryRing);

        interface FloatingItem {
          mesh: THREE.Mesh;
          initialPos: THREE.Vector3;
          rotSpeed: { x: number; y: number; z: number };
          floatPhase: number;
        }

        const floatingItems: FloatingItem[] = [];

        // Glass-style Sphere
        const glassSphere = new THREE.Mesh(sphereGeo, slateMaterial);
        glassSphere.position.set(-3.2, 1.8, 1.2);
        objectsGroup.add(glassSphere);
        floatingItems.push({
          mesh: glassSphere,
          initialPos: glassSphere.position.clone(),
          rotSpeed: { x: 0.008, y: 0.012, z: 0.005 },
          floatPhase: 0,
        });

        // Low-poly Crystal Shard
        const crystalShard = new THREE.Mesh(icosahedronGeo, creamMaterial);
        crystalShard.position.set(-1.8, -2.4, 2.0);
        objectsGroup.add(crystalShard);
        floatingItems.push({
          mesh: crystalShard,
          initialPos: crystalShard.position.clone(),
          rotSpeed: { x: 0.012, y: 0.015, z: 0.008 },
          floatPhase: 1.4,
        });

        // Orbiting mini shards: Reduced to 4 items (down from 7)
        for (let i = 0; i < 4; i++) {
          const isChrome = i % 2 === 0;
          const shard = new THREE.Mesh(
            smallShardGeo,
            isChrome ? chromeMaterial : slateMaterial
          );
          const angle = (i / 4) * Math.PI * 2;
          const radius = 5.2 + i * 0.8;
          const zPos = -1.0 + i * 0.9;
          const yOffset = (i % 2 === 0 ? 1 : -1) * 1.5;

          shard.position.set(
            Math.cos(angle) * radius + 1.5,
            Math.sin(angle) * radius * 0.4 + yOffset,
            zPos
          );
          shard.scale.setScalar(0.55);
          objectsGroup.add(shard);

          floatingItems.push({
            mesh: shard,
            initialPos: shard.position.clone(),
            rotSpeed: { x: 0.01, y: 0.012, z: 0.008 },
            floatPhase: i * 1.2,
          });
        }

        // Subtle Mouse Parallax
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
          const windowHalfX = window.innerWidth / 2;
          const windowHalfY = window.innerHeight / 2;
          targetX = (e.clientX - windowHalfX) * 0.001;
          targetY = (e.clientY - windowHalfY) * 0.001;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Resize handler
        const handleResize = () => {
          if (!container) return;
          const w = container.clientWidth || window.innerWidth;
          const h = container.clientHeight || window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize, { passive: true });

        // Viewport IntersectionObserver: Only render when visible in viewport
        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            isVisible = entry.isIntersecting;
            if (isVisible && !animationFrameId) {
              lastTime = performance.now();
              renderLoop();
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(container);

        // Animation Loop with visibility check & delta capping
        let clock = new THREE.Clock();
        let lastTime = performance.now();

        const renderLoop = () => {
          if (isDisposed || !isVisible) {
            animationFrameId = null;
            return;
          }

          animationFrameId = requestAnimationFrame(renderLoop);

          const elapsedTime = clock.getElapsedTime();

          // Smooth mouse lerp
          mouseX += (targetX - mouseX) * 0.05;
          mouseY += (targetY - mouseY) * 0.05;

          // Camera & scroll calculation
          const currentScroll = scrollRef.current;
          const scrollProgress = Math.min(currentScroll / 800, 1.5);

          camera.position.x = mouseX * 3.2;
          camera.position.y = -mouseY * 2.2;
          camera.position.z = 14 - scrollProgress * 4.0;
          camera.lookAt(0, 0, 0);

          // Central sculpture rotation
          mainTorus.rotation.x = elapsedTime * 0.2 + mouseY * 0.4;
          mainTorus.rotation.y = elapsedTime * 0.3 + mouseX * 0.7;
          mainTorus.position.y = 0.4 + Math.sin(elapsedTime * 0.7) * 0.15;

          // Outer ring
          luxuryRing.rotation.z = -elapsedTime * 0.12;
          luxuryRing.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.4) * 0.12;

          // Floating items
          floatingItems.forEach((item, index) => {
            item.mesh.rotation.x += item.rotSpeed.x;
            item.mesh.rotation.y += item.rotSpeed.y;
            item.mesh.rotation.z += item.rotSpeed.z;

            const floatY = Math.sin(elapsedTime * 1.2 + item.floatPhase) * 0.2;
            const dispersion = 1 + scrollProgress * 0.6;

            item.mesh.position.x =
              (item.initialPos.x + Math.sin(elapsedTime * 0.3 + index) * 0.2) * dispersion;
            item.mesh.position.y = item.initialPos.y + floatY + mouseY * 0.4;
            item.mesh.position.z =
              item.initialPos.z + Math.cos(elapsedTime * 0.3 + index) * 0.15 - scrollProgress * 1.8;
          });

          renderer.render(scene, camera);
        };

        // Start render loop
        renderLoop();

        cleanupFn = () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
          if (observer) {
            observer.disconnect();
          }
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);

          if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
          torusKnotGeo.dispose();
          ringGeo.dispose();
          sphereGeo.dispose();
          icosahedronGeo.dispose();
          smallShardGeo.dispose();
          chromeMaterial.dispose();
          slateMaterial.dispose();
          creamMaterial.dispose();
        };
      } catch (err) {
        console.warn('Three.js scene initialization skipped or failed:', err);
      }
    };

    // Execute via requestIdleCallback if available, or fallback to setTimeout
    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => {
          if (!isDisposed) initThreeScene();
        },
        { timeout: 1200 }
      );
      return () => {
        isDisposed = true;
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
        if (cleanupFn) cleanupFn();
      };
    } else {
      const timeoutId = setTimeout(() => {
        if (!isDisposed) initThreeScene();
      }, 300);
      return () => {
        isDisposed = true;
        clearTimeout(timeoutId);
        if (cleanupFn) cleanupFn();
      };
    }
  }, [isMobile, canStart]);

  // Mobile Replacement: Static slate-blue radial gradient + grain (Zero 3D overhead)
  if (isMobile) {
    return (
      <div
        id="hero-mobile-visual"
        className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Static slate-blue radial gradient + subtle grain */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12161c]/60 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-radial from-[#6d8196]/25 via-[#6d8196]/05 to-transparent blur-3xl opacity-75" />
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      </div>
    );
  }

  // Desktop 3D Canvas Mount Point
  return (
    <div
      ref={containerRef}
      id="three-hero-container"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
});


