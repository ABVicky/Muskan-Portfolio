'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Float, Sparkles, MeshReflectorMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

// --- COMPONENTS ---

function Taxi({ speed, initialZ, lateralOffset }: { speed: number, initialZ: number, lateralOffset: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [phase] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      // Move taxi forward
      meshRef.current.position.z += speed;
      // Loop taxi
      if (meshRef.current.position.z > 50) {
        meshRef.current.position.z = -250;
      }
      // Subtle wobble
      meshRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 6 + phase) * 0.02;
    }
  });

  return (
    <group ref={meshRef} position={[lateralOffset, 0.45, initialZ]}>
      {/* Main Body - Iconic Ambassador rounded look */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Top Cabin */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[1.5, 0.6, 2.2]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[1.55, 0.4, 1.8]} />
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Headlights (Glow) */}
      <pointLight position={[0.6, 0.1, 2.1]} intensity={5} color="#fff1ab" distance={5} />
      <pointLight position={[-0.6, 0.1, 2.1]} intensity={5} color="#fff1ab" distance={5} />
      <mesh position={[0.6, 0.1, 2.05]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#fff1ab" />
      </mesh>
      <mesh position={[-0.6, 0.1, 2.05]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#fff1ab" />
      </mesh>
      {/* Tail Lights */}
      <mesh position={[0.7, 0.1, -2.05]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[-0.7, 0.1, -2.05]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  );
}

function HowrahBridge() {
  return (
    <group position={[0, 0, -350]} scale={[2.5, 2.5, 2.5]}>
      {/* The iconic massive structure silhouette */}
      <mesh position={[18, 15, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1, 30, 1]} />
        <meshStandardMaterial color="#444" metalness={0.9} />
      </mesh>
      <mesh position={[-18, 15, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1, 30, 1]} />
        <meshStandardMaterial color="#444" metalness={0.9} />
      </mesh>
      {/* Truss-like structures */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[0, 25, (i - 5) * 6]}>
           <mesh rotation={[Math.PI/4, 0, 0]}>
             <boxGeometry args={[40, 0.3, 0.3]} />
             <meshStandardMaterial color="#222" />
           </mesh>
           <mesh rotation={[-Math.PI/4, 0, 0]}>
             <boxGeometry args={[40, 0.3, 0.3]} />
             <meshStandardMaterial color="#222" />
           </mesh>
        </group>
      ))}
      {/* Glow highlight */}
      <pointLight position={[0, 20, 0]} intensity={20} color="#ff44aa" distance={100} />
    </group>
  );
}

function Building({ position, scale, color, neonColor }: { position: [number, number, number]; scale: [number, number, number]; color: string; neonColor?: string }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={scale} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Visual Windows */}
      <mesh position={[0, 0, scale[2] / 2 + 0.05]}>
        <planeGeometry args={[scale[0] * 0.7, scale[1] * 0.9]} />
        <meshBasicMaterial color="#ffffff" opacity={0.03} transparent />
      </mesh>
      {/* Subtle Neon Strip */}
      {neonColor && (
        <mesh position={[0, scale[1]/2, scale[2]/2 + 0.1]}>
           <boxGeometry args={[scale[0] * 0.5, 0.2, 0.1]} />
           <meshBasicMaterial color={neonColor} toneMapped={false} />
           <pointLight intensity={0.5} color={neonColor} distance={5} />
        </mesh>
      )}
    </group>
  );
}

function FloatingGraphics() {
  const group = useRef<THREE.Group>(null);
  const elements = useMemo(() => [...Array(25)].map((_, i) => ({
      pos: [(Math.random() - 0.5) * 120, Math.random() * 60, -Math.random() * 800] as [number, number, number],
      color: ['#ff0055', '#00ffee', '#ffffff'][Math.floor(Math.random() * 3)],
      speed: 0.1 + Math.random() * 0.4
  })), []);

  useFrame((state) => {
    if (group.current) {
        group.current.children.forEach((child, i) => {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
            child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01;
        });
    }
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.pos}>
           <octahedronGeometry args={[1]} />
           <meshStandardMaterial color={el.color} wireframe emissive={el.color} emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

function CityContent({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const buildings = useMemo(() => {
    const temp = [];
    const neonColors = ['#ff0055', '#00ffee', '#ffff00'];
    for (let i = 0; i < 200; i++) {
      const initialZ = -Math.random() * 800;
      const x = (Math.random() - 0.5) * 160;
      if (Math.abs(x) < 25) continue;
      const h = 20 + Math.random() * 70;
      const neonColor = Math.random() > 0.7 ? neonColors[Math.floor(Math.random() * 3)] : undefined;
      temp.push({ id: i, x, y: h / 2, initialZ, scale: [5 + Math.random() * 10, h, 6 + Math.random() * 10] as [number, number, number], neonColor });
    }
    return temp;
  }, []);

  const taxis = useMemo(() => [...Array(20)].map((_, i) => ({
      id: i,
      speed: 1 + Math.random() * 2,
      initialZ: -Math.random() * 800,
      offset: (Math.random() > 0.5 ? 9 : -9) + (Math.random() - 0.5) * 4
  })), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.08) * 3;
    state.camera.position.y = 6 + Math.sin(time * 0.2) * 0.5;
    state.camera.lookAt(0, 5, -120);

    if (groupRef.current) {
        groupRef.current.children.forEach((child: any) => {
            if (child.userData.type === 'layer') {
                const range = 800;
                let z = (child.userData.initialZ + scrollRef.current * 0.18) % range;
                if (z > 0) z -= range;
                child.position.z = z;
                child.visible = z > -range + 50 && z < -10;
            }
        });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Reflection Floor (Optimized) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -400]}>
        <planeGeometry args={[500, 1000]} />
        <MeshReflectorMaterial
           blur={[200, 100]}
           resolution={512}
           mixBlur={1}
           mixStrength={50}
           roughness={1}
           depthScale={1}
           minDepthThreshold={0.4}
           maxDepthThreshold={1.4}
           color="#050508"
           metalness={0.8}
        />
      </mesh>

      {buildings.map((b) => (
        <group key={b.id} userData={{ type: 'layer', initialZ: b.initialZ }}>
           <Building position={[b.x, b.y, 0]} scale={b.scale} color="#080808" neonColor={b.neonColor} />
        </group>
      ))}

      {taxis.map((t) => (
        <group key={t.id} userData={{ type: 'layer', initialZ: t.initialZ }}>
           <Taxi speed={t.speed} initialZ={0} lateralOffset={t.offset} />
        </group>
      ))}

      <HowrahBridge />
      <FloatingGraphics />
      <Sparkles count={1500} scale={400} size={1} speed={0.4} color="#ffffff" opacity={0.2} />
    </group>
  );
}

export default function City3D() {
  const scrollRef = useRef(0);
  useLenis(({ scroll }) => { scrollRef.current = scroll; });

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden">
      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 6, 30]} fov={50} />
        <fog attach="fog" args={['#000', 40, 350]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 15, 20]} intensity={2.5} color="#ffffff" />
        <spotLight position={[0, 150, -150]} intensity={4} angle={0.6} penumbra={1} color="#44aaff" />
        <pointLight position={[60, 40, 50]} intensity={1.5} color="#ff0088" />
        <pointLight position={[-60, 40, -50]} intensity={1.5} color="#00ffcc" />
        <Stars radius={200} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
        <CityContent scrollRef={scrollRef} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />
    </div>
  );
}







