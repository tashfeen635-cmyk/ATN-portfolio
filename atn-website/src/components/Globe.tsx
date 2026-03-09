"use client";

import { useRef, useEffect, useCallback, useMemo, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ---------- Performance monitor ----------
const FRAME_BUDGET_MS = 1000 / 60; // 16.67ms for 60fps

function useAdaptivePerformance() {
  const quality = useRef<"high" | "medium" | "low">("high");
  const frameTimes = useRef<number[]>([]);
  const lastCheck = useRef(performance.now());

  const report = useCallback((delta: number) => {
    frameTimes.current.push(delta);
    const now = performance.now();

    // Check every 2 seconds
    if (now - lastCheck.current > 2000 && frameTimes.current.length > 30) {
      const avg =
        frameTimes.current.reduce((a, b) => a + b, 0) /
        frameTimes.current.length;
      frameTimes.current = [];
      lastCheck.current = now;

      if (avg > FRAME_BUDGET_MS * 2) {
        quality.current = "low";
      } else if (avg > FRAME_BUDGET_MS * 1.3) {
        quality.current = "medium";
      } else {
        quality.current = "high";
      }
    }
  }, []);

  return { quality, report };
}

// ---------- Debounced mouse tracker ----------
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

    const handleMove = (e: MouseEvent) => {
      pendingX = (e.clientX / window.innerWidth) * 2 - 1;
      pendingY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          mouse.current.x = pendingX;
          mouse.current.y = pendingY;
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return mouse;
}

// ---------- Visibility / intersection observer ----------
function useIsVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

// ---------- Texture loader with error handling ----------
function useTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let disposed = false;

    loader.load(
      url,
      (tex) => {
        if (!disposed) {
          tex.colorSpace = THREE.SRGBColorSpace;
          setTexture(tex);
        }
      },
      undefined,
      (err) => {
        if (!disposed) {
          console.warn(`Failed to load texture: ${url}`, err);
        }
      }
    );

    return () => {
      disposed = true;
      if (texture) texture.dispose();
    };
    // Only depend on url; texture dispose is handled by the cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return texture;
}

// ---------- WebGL context loss handler ----------
function ContextLossHandler() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL context lost — will attempt restore");
    };

    const handleRestored = () => {
      console.info("WebGL context restored");
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [gl]);

  return null;
}

// ---------- Scene cleanup on unmount ----------
function SceneCleanup() {
  const { gl, scene } = useThree();

  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);

  return null;
}

// ---------- Day/Night shader ----------
const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    float NdotL = dot(normal, sunDirection);

    // Smooth transition at the terminator
    float blend = smoothstep(-0.1, 0.2, NdotL);

    vec4 dayColor = texture2D(dayMap, vUv);
    vec4 nightColor = texture2D(nightMap, vUv);

    // Day side: standard diffuse lighting
    vec3 litDay = dayColor.rgb * (0.1 + 0.9 * max(NdotL, 0.0));

    // Night side: bright warm city lights with golden tint
    float lightIntensity = nightColor.r * 0.3 + nightColor.g * 0.5 + nightColor.b * 0.2;
    vec3 warmLight = vec3(1.0, 0.85, 0.5) * lightIntensity * 2.0;
    // Add a dim blue ambient to the dark ocean/land areas
    vec3 litNight = warmLight + vec3(0.01, 0.02, 0.04);

    vec3 finalColor = mix(litNight, litDay, blend);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ---------- Earth mesh ----------
interface EarthProps {
  paused: boolean;
  mouse: React.RefObject<{ x: number; y: number }>;
}

const Earth = memo(function Earth({ paused, mouse }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load textures with error handling
  const earthMap = useTexture(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  );
  const nightLights = useTexture(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
  );

  // Memoize geometries so they aren't recreated
  const earthGeo = useMemo(() => new THREE.SphereGeometry(1, 48, 48), []);
  const atmoGeo = useMemo(() => new THREE.SphereGeometry(1.02, 48, 48), []);

  // Sun direction (normalized) — light from the right side so city lights show on front-left
  const sunDir = useMemo(() => new THREE.Vector3(1, 0.3, 0).normalize(), []);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      dayMap: { value: null as THREE.Texture | null },
      nightMap: { value: null as THREE.Texture | null },
      sunDirection: { value: sunDir },
    }),
    [sunDir]
  );

  // Update texture uniforms when loaded
  useEffect(() => {
    if (materialRef.current && earthMap) {
      materialRef.current.uniforms.dayMap.value = earthMap;
      materialRef.current.needsUpdate = true;
    }
  }, [earthMap]);

  useEffect(() => {
    if (materialRef.current && nightLights) {
      materialRef.current.uniforms.nightMap.value = nightLights;
      materialRef.current.needsUpdate = true;
    }
  }, [nightLights]);

  // Dispose geometries on unmount
  useEffect(() => {
    return () => {
      earthGeo.dispose();
      atmoGeo.dispose();
    };
  }, [earthGeo, atmoGeo]);

  const { report } = useAdaptivePerformance();

  useFrame((_state, delta) => {
    report(delta * 1000);

    if (paused) return;

    const mesh = meshRef.current;
    const atmo = atmosphereRef.current;
    if (!mesh) return;

    // Auto-rotation (delta-time based for consistent speed)
    const rotSpeed = 0.15 * delta;
    mesh.rotation.y += rotSpeed;
    if (atmo) atmo.rotation.y += rotSpeed;

    // Smooth mouse tilt (lerp)
    const m = mouse.current;
    mesh.rotation.x += (m.y * 0.1 - mesh.rotation.x) * 0.03;
    mesh.rotation.z += (m.x * 0.1 - mesh.rotation.z) * 0.03;
  });

  // Don't render until at least the day map is ready
  if (!earthMap) return null;

  return (
    <group>
      <mesh ref={meshRef} geometry={earthGeo}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={atmosphereRef} geometry={atmoGeo}>
        <meshPhongMaterial
          color={0x4488ff}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
});

// ---------- Memoized Stars ----------
const StarsBackground = memo(function StarsBackground() {
  return (
    <Stars
      radius={100}
      depth={60}
      count={1500}
      factor={4}
      saturation={0}
      fade
      speed={0.3}
    />
  );
});

// ---------- Static lights (memoized) ----------
const Lights = memo(function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, 0, 5]} intensity={0.5} color={0xffffff} />
    </>
  );
});

// ---------- Main Globe component ----------
function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const mouse = useMousePosition();

  // Canvas GL config — memoized to avoid re-creating
  const glConfig = useMemo(
    () => ({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance" as const,
      failIfMajorPerformanceCaveat: false,
    }),
    []
  );

  const cameraConfig = useMemo(
    () => ({ position: [0, 0.2, 2.5] as [number, number, number], fov: 45 }),
    []
  );

  return (
    <div id="globe-bg" ref={containerRef}>
      <Canvas
        camera={cameraConfig}
        gl={glConfig}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]} // Cap pixel ratio for performance
        frameloop={isVisible ? "always" : "never"} // Pause rendering when off-screen
        performance={{ min: 0.5 }} // Allow R3F to scale down
      >
        <ContextLossHandler />
        <SceneCleanup />
        <Lights />
        <StarsBackground />
        <Earth paused={!isVisible} mouse={mouse} />
      </Canvas>
    </div>
  );
}

export default memo(Globe);
