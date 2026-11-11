import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 180 }) {
  const points = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#73ba25'); // openSUSE green
    const colorB = new THREE.Color('#38bdf8'); // sky blue
    const colorC = new THREE.Color('#10b981'); // emerald

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 8;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);

      const mixed = Math.random() > 0.6 ? colorA : Math.random() > 0.3 ? colorC : colorB;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.08;
      points.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GeekoCore() {
  const outerRing = useRef();
  const innerRing = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (outerRing.current) {
      outerRing.current.rotation.z += delta * 0.2;
      outerRing.current.rotation.x += delta * 0.15;
    }
    if (innerRing.current) {
      innerRing.current.rotation.y += delta * -0.25;
      innerRing.current.rotation.z += delta * -0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Pulsing Distorted Core */}
      <Sphere ref={coreRef} args={[1.4, 32, 32]}>
        <MeshDistortMaterial
          color="#73ba25"
          emissive="#173f35"
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
          wireframe={true}
        />
      </Sphere>

      {/* Futuristic Orbit Ring 1 */}
      <mesh ref={outerRing}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#86efac"
          emissive="#73ba25"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbit Ring 2 */}
      <mesh ref={innerRing} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-80 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#73ba25" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#38bdf8" />

        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <GeekoCore />
        </Float>

        <ParticleField count={220} />
      </Canvas>
    </div>
  );
}
