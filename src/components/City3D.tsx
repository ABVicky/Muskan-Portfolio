'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sparkles, MeshReflectorMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useLenis } from '@studio-freight/react-lenis';

function Taxi({ speed, initialZ, lateralOffset }: { speed: number, initialZ: number, lateralOffset: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [phase] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z += speed;
      if (meshRef.current.position.z > 50) meshRef.current.position.z = -250;
      meshRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 6 + phase) * 0.02;
    }
  });

  return (
    <group ref={meshRef} position={[lateralOffset, 0.45, initialZ]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial color="#d9a406" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[1.5, 0.6, 2.2]} />
        <meshStandardMaterial color="#d9a406" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[1.55, 0.4, 1.8]} />
        <meshStandardMaterial color="#000" metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[0.6, 0.1, 2.05]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#fff1ab" />
      </mesh>
      <mesh position={[-0.6, 0.1, 2.05]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#fff1ab" />
      </mesh>
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

function Building({ position, scale, color, neonColor }: { position: [number, number, number]; scale: [number, number, number]; color: string; neonColor?: string }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={scale} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, scale[2] / 2 + 0.05]}>
        <planeGeometry args={[scale[0] * 0.7, scale[1] * 0.9]} />
        <meshBasicMaterial color="#ffffff" opacity={0.06} transparent />
      </mesh>
      {neonColor && (
        <mesh position={[0, scale[1]/2 - 1, scale[2]/2 + 0.1]}>
           <boxGeometry args={[scale[0] * 0.7, 0.6, 0.1]} />
           <meshBasicMaterial color={neonColor} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function FloatingGraphics() {
  const group = useRef<THREE.Group>(null);
  const elements = useMemo(() => [...Array(15)].map((_, i) => ({
      pos: [(Math.random() - 0.5) * 120, Math.random() * 40, -Math.random() * 600] as [number, number, number],
      color: ['#ff0055', '#00ffee', '#ffffff'][Math.floor(Math.random() * 3)]
  })), []);

  useFrame((state) => {
    if (group.current) {
        group.current.children.forEach((child, i) => {
            child.rotation.x += 0.01;
            child.rotation.y += 0.005;
            child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.005;
        });
    }
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.pos}>
           <octahedronGeometry args={[0.8]} />
           <meshStandardMaterial color={el.color} wireframe emissive={el.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function HowrahBridge() {
  return (
    <group position={[0, -1, -300]} scale={[3, 3, 3]}>
      <mesh position={[20, 15, 0]}>
        <boxGeometry args={[1.5, 30, 1.5]} />
        <meshStandardMaterial color="#222" metalness={0.9} />
      </mesh>
      <mesh position={[-20, 15, 0]}>
        <boxGeometry args={[1.5, 30, 1.5]} />
        <meshStandardMaterial color="#222" metalness={0.9} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <group key={i} position={[0, 22, (i - 4) * 8]}>
           <mesh rotation={[Math.PI / 4, 0, 0]}>
             <boxGeometry args={[42, 0.4, 0.4]} />
             <meshStandardMaterial color="#111" />
           </mesh>
           <mesh rotation={[-Math.PI / 4, 0, 0]}>
             <boxGeometry args={[42, 0.4, 0.4]} />
             <meshStandardMaterial color="#111" />
           </mesh>
        </group>
      ))}
      <mesh position={[0, 25, 0]}>
         <sphereGeometry args={[2, 16, 16]} />
         <meshBasicMaterial color="#ff00cc" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function CityContent({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const buildings = useMemo(() => {
    const temp = [];
    const neonColors = ['#ff0055', '#00ffee', '#ffff00'];
    for (let i = 0; i < 110; i++) {
      const initialZ = -Math.random() * 800;
      const x = (Math.random() - 0.5) * 180;
      if (Math.abs(x) < 30) continue;
      const h = 25 + Math.random() * 85;
      const neonColor = Math.random() > 0.6 ? neonColors[Math.floor(Math.random() * 3)] : undefined;
      temp.push({ id: i, x, y: h / 2, initialZ, scale: [8 + Math.random() * 12, h, 8 + Math.random() * 12] as [number, number, number], neonColor });
    }
    return temp;
  }, []);

  const taxis = useMemo(() => [...Array(12)].map((_, i) => ({
      id: i,
      speed: 1.5 + Math.random() * 3,
      initialZ: -Math.random() * 800,
      offset: (Math.random() > 0.5 ? 10 : -10) + (Math.random() - 0.5) * 5
  })), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.04) * 5;
    state.camera.position.y = 8 + Math.sin(time * 0.1) * 0.5;
    state.camera.lookAt(0, 8, -150);

    if (groupRef.current) {
        groupRef.current.children.forEach((child: any) => {
            if (child.userData.type === 'layer') {
                const range = 800;
                // Increased scroll factor from 0.22 to 0.45 for more dramatic movement
                let z = (child.userData.initialZ + scrollRef.current * 0.45) % range;
                if (z > 0) z -= range;
                child.position.z = z;
                child.visible = z > -range + 10 && z < -5;
            }
        });
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -400]}>
        <planeGeometry args={[600, 1000]} />
        <MeshReflectorMaterial
           blur={[150, 50]}
           resolution={256}
           mixBlur={1}
           mixStrength={60}
           roughness={1}
           depthScale={0.8}
           minDepthThreshold={0.5}
           maxDepthThreshold={1.8}
           color="#0a0a18"
           metalness={0.8}
        />
      </mesh>

      {buildings.map((b) => (
        <group key={b.id} userData={{ type: 'layer', initialZ: b.initialZ }}>
           <Building position={[b.x, b.y, 0]} scale={b.scale} color="#1a1a1a" neonColor={b.neonColor} />
        </group>
      ))}

      {taxis.map((t) => (
        <group key={t.id} userData={{ type: 'layer', initialZ: t.initialZ }}>
           <Taxi speed={t.speed} initialZ={0} lateralOffset={t.offset} />
        </group>
      ))}

      <HowrahBridge />
      <FloatingGraphics />
      <Sparkles count={1200} scale={500} size={1} speed={0.5} color="#ffffff" opacity={0.25} />
    </group>
  );
}

export default function City3D() {
  const scrollRef = useRef(0);
  useLenis(({ scroll }) => { scrollRef.current = scroll; });

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden">
      <Canvas shadows={false} dpr={[1, 1.2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 40]} fov={55} />
        <fog attach="fog" args={['#000', 100, 500]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 40, 20]} intensity={5} color="#ffffff" distance={300} />
        <spotLight position={[0, 150, -200]} intensity={10} angle={0.6} penumbra={1} color="#44aaff" />
        <pointLight position={[120, 60, 50]} intensity={4} color="#ff0088" distance={400} />
        <pointLight position={[-120, 60, -50]} intensity={4} color="#00ffcc" distance={400} />
        <Stars radius={300} depth={50} count={3500} factor={4} saturation={0} fade speed={1.2} />
        <CityContent scrollRef={scrollRef} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />
    </div>
  );
}
