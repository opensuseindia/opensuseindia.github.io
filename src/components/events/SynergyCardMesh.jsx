import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOrCreateCardTexture } from './cardTextureCache';
import { sounds } from '../../lib/sound';

const vertexShader = `
  uniform float uCurvature;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    
    // Cylindrical curved poster bend (matches Synergy '26 flexible poster curve)
    float bendX = sin(uv.x * 3.14159265);
    transformed.z += bendX * uCurvature;

    // Mild vertical arc
    float bendY = sin(uv.y * 3.14159265);
    transformed.z += bendY * (uCurvature * 0.25);

    // Hover pop: pull closer to camera
    transformed.z += uHover * 30.0;

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Subtle poster bevel / edge rim (clean dark glass edge, NOT flashy neon!)
    float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float rim = 1.0 - smoothstep(0.001, 0.016, edgeDist);

    // Subtle neutral rim by default, gentle glow on hover
    vec3 neutralEdge = vec3(0.16, 0.20, 0.22);
    vec3 hoverEdge   = vec3(0.45, 0.75, 0.45);
    vec3 edgeColor   = mix(neutralEdge, hoverEdge, uHover);

    vec3 color = mix(texColor.rgb, edgeColor, rim * (0.35 + 0.65 * uHover));

    // Gentle hover lift
    color += uHover * vec3(0.07, 0.08, 0.07);

    gl_FragColor = vec4(color, texColor.a);
  }
`;

export default function SynergyCardMesh({
  event,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  curvature = 22.0,
  onSelect,
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => {
    return getOrCreateCardTexture(event);
  }, [event]);

  const uniforms = useMemo(() => {
    return {
      uTexture: { value: texture },
      uCurvature: { value: curvature },
      uHover: { value: 0.0 },
    };
  }, [texture, curvature]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    if (mat && mat.uniforms) {
      const targetHover = hovered ? 1.0 : 0.0;
      mat.uniforms.uHover.value = THREE.MathUtils.lerp(
        mat.uniforms.uHover.value,
        targetHover,
        0.18
      );
    }

    // Subtle responsive tilt toward cursor when hovered
    if (hovered) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation[0] + state.pointer.y * 0.08,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1] + state.pointer.x * 0.08,
        0.1
      );
    } else {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation[0],
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1],
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        sounds.hover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        sounds.click();
        if (onSelect) onSelect(event);
      }}
    >
      {/* 260 x 375 matches the 500 x 720 canvas aspect ratio */}
      <planeGeometry args={[260, 375, 24, 24]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={true}
      />
    </mesh>
  );
}
