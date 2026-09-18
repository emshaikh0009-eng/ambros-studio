import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  scrollY?: number;
}

export default function ThreeHeroCanvas({ scrollY = 0 }: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollY);
  scrollRef.current = scrollY;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    // Renderer (cap DPR at 1.5 for performance)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for objects
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Brand Colors
    const slateColor = new THREE.Color(0x6d8196);
    const creamColor = new THREE.Color(0xffffe3);
    const darkBase = new THREE.Color(0x181a1d);

    // Lighting setup for luxury chrome & glass aesthetic
    const ambientLight = new THREE.AmbientLight(0x0f1318, 1.8);
    scene.add(ambientLight);

    // Key Slate Blue Rim Light
    const slateRimLight = new THREE.PointLight(slateColor, 8.5, 30);
    slateRimLight.position.set(-6, 5, 4);
    scene.add(slateRimLight);

    // Fill Cream Accent Light
    const creamAccentLight = new THREE.PointLight(creamColor, 6.0, 30);
    creamAccentLight.position.set(7, -4, 5);
    scene.add(creamAccentLight);

    // Back rim light
    const backRimLight = new THREE.DirectionalLight(0x6d8196, 2.5);
    backRimLight.position.set(0, 10, -8);
    scene.add(backRimLight);

    // Materials: luxury metallic chrome & frosted glass finish
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1d22,
      emissive: 0x06090e,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });

    const slateGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: slateColor,
      roughness: 0.25,
      metalness: 0.4,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      ior: 1.5,
    });

    const creamShimmerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2228,
      roughness: 0.35,
      metalness: 0.85,
    });

    // Geometries
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.6, 0.42, 120, 24, 2, 3);
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const sphereGeo = new THREE.SphereGeometry(0.85, 36, 36);
    const smallShardGeo = new THREE.TetrahedronGeometry(0.7, 0);
    const ringGeo = new THREE.TorusGeometry(2.4, 0.08, 16, 80);

    // Main central hero sculpture: Chrome Torus Knot
    const mainTorus = new THREE.Mesh(torusKnotGeo, chromeMaterial);
    mainTorus.position.set(2.5, 0.4, 0);
    objectsGroup.add(mainTorus);

    // Floating Ring orbiting central sculpture
    const luxuryRing = new THREE.Mesh(ringGeo, slateGlassMaterial);
    luxuryRing.position.set(2.5, 0.4, -0.5);
    luxuryRing.rotation.x = Math.PI / 3;
    objectsGroup.add(luxuryRing);

    // Secondary items around
    interface FloatingItem {
      mesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
      orbitSpeed: number;
      orbitRadius: number;
      orbitAngle: number;
      floatSpeed: number;
      floatPhase: number;
    }

    const floatingItems: FloatingItem[] = [];

    // Glass Sphere
    const glassSphere = new THREE.Mesh(sphereGeo, slateGlassMaterial);
    glassSphere.position.set(-3.2, 1.8, 1.2);
    objectsGroup.add(glassSphere);
    floatingItems.push({
      mesh: glassSphere,
      initialPos: glassSphere.position.clone(),
      rotSpeed: { x: 0.008, y: 0.012, z: 0.005 },
      orbitSpeed: 0.004,
      orbitRadius: 4.2,
      orbitAngle: Math.PI * 0.4,
      floatSpeed: 0.0018,
      floatPhase: 0,
    });

    // Low-poly Crystal Shard (Cream highlight)
    const crystalShard = new THREE.Mesh(icosahedronGeo, creamShimmerMaterial);
    crystalShard.position.set(-1.8, -2.4, 2.0);
    objectsGroup.add(crystalShard);
    floatingItems.push({
      mesh: crystalShard,
      initialPos: crystalShard.position.clone(),
      rotSpeed: { x: 0.014, y: 0.018, z: 0.01 },
      orbitSpeed: 0.006,
      orbitRadius: 3.5,
      orbitAngle: Math.PI * 1.2,
      floatSpeed: 0.0022,
      floatPhase: 1.4,
    });

    // Orbiting mini shards
    for (let i = 0; i < 7; i++) {
      const isChrome = i % 2 === 0;
      const shard = new THREE.Mesh(
        smallShardGeo,
        isChrome ? chromeMaterial : slateGlassMaterial
      );
      const angle = (i / 7) * Math.PI * 2;
      const radius = 5.2 + Math.random() * 2.5;
      const zPos = -1.5 + Math.random() * 4.0;
      const yOffset = (Math.random() - 0.5) * 4;

      shard.position.set(
        Math.cos(angle) * radius + 1.5,
        Math.sin(angle) * radius * 0.4 + yOffset,
        zPos
      );
      shard.scale.setScalar(0.5 + Math.random() * 0.65);
      objectsGroup.add(shard);

      floatingItems.push({
        mesh: shard,
        initialPos: shard.position.clone(),
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.025,
          y: (Math.random() - 0.5) * 0.025,
          z: (Math.random() - 0.5) * 0.025,
        },
        orbitSpeed: 0.003 + Math.random() * 0.004,
        orbitRadius: radius,
        orbitAngle: angle,
        floatSpeed: 0.0015 + Math.random() * 0.0015,
        floatPhase: Math.random() * Math.PI * 2,
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
      targetX = (e.clientX - windowHalfX) * 0.0012;
      targetY = (e.clientY - windowHalfY) * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Camera dolly and object dispersion based on scroll
      const currentScroll = scrollRef.current;
      const scrollProgress = Math.min(currentScroll / 800, 1.5);

      // Camera parallax + dolly
      camera.position.x = mouseX * 3.5;
      camera.position.y = -mouseY * 2.5;
      camera.position.z = 14 - scrollProgress * 4.5;
      camera.lookAt(0, 0, 0);

      // Main Torus Knot rotation
      mainTorus.rotation.x = elapsedTime * 0.22 + mouseY * 0.5;
      mainTorus.rotation.y = elapsedTime * 0.35 + mouseX * 0.8;
      mainTorus.position.y = 0.4 + Math.sin(elapsedTime * 0.8) * 0.18;

      // Outer ring rotation
      luxuryRing.rotation.z = -elapsedTime * 0.15;
      luxuryRing.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.15;

      // Animate floating items
      floatingItems.forEach((item, index) => {
        // Individual rotation
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        // Floating bounce
        const floatY = Math.sin(elapsedTime * 1.5 + item.floatPhase) * 0.25;

        // Scroll dispersion: objects push outward radially as user scrolls
        const dispersion = 1 + scrollProgress * 0.85;

        item.mesh.position.x =
          (item.initialPos.x + Math.sin(elapsedTime * 0.4 + index) * 0.3) *
          dispersion;
        item.mesh.position.y =
          item.initialPos.y + floatY + mouseY * 0.5;
        item.mesh.position.z =
          item.initialPos.z + Math.cos(elapsedTime * 0.3 + index) * 0.2 -
          scrollProgress * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusKnotGeo.dispose();
      icosahedronGeo.dispose();
      sphereGeo.dispose();
      smallShardGeo.dispose();
      ringGeo.dispose();
      chromeMaterial.dispose();
      slateGlassMaterial.dispose();
      creamShimmerMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-hero-container"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
