import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingShape() {
  const groupRef = useRef(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.08
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })

  const vertices = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(3.2, 1)
    const pos = geometry.attributes.position
    const seen = new Set()
    const verts = []
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i).toFixed(3)
      const y = pos.getY(i).toFixed(3)
      const z = pos.getZ(i).toFixed(3)
      const key = `${x},${y},${z}`
      
      if (!seen.has(key)) {
        seen.add(key)
        verts.push(new THREE.Vector3(parseFloat(x), parseFloat(y), parseFloat(z)))
      }
    }
    return verts
  }, [])

  return (
    <group ref={groupRef} position={[0.4, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[5, 1]} />
        <meshStandardMaterial 
          color="#c9a96e" 
          wireframe 
          transparent 
          opacity={0.5}
          emissive="#b8956a"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial 
          color="#d4af37" 
          wireframe 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {vertices.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.95} />
        </mesh>
      ))}
      
      <pointLight intensity={2} distance={10} color="#e2c49b" />
    </group>
  )
}

function Particles({ bgColor }) {
  const pointsRef = useRef()
  const count = 300
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008
    }
  })
  
  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.035} // stars size
        color="#e2c49b"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function Hero3D({ bgColor = '#000000' }) {
  return (
    <div className="relative w-[800px] h-[400px] overflow-hidden"> 
      <Canvas 
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 15], fov: 50 }} // camera size and height & width in 117 line
        dpr={[1, 2]}
        className="absolute inset-0"
      >
        <fog attach="fog" args={[bgColor, 10, 5]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color='#e2c49b' />
        <pointLight position={[-16, -8, 10]} intensity={1.2} color='#d4af37' />
        <pointLight position={[8, 12, -8]} intensity={0.6} color='#fff5e6' />
        
        <FloatingShape />
        <Particles />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}