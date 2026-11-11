import React, { useRef, useState, useEffect, useMemo, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import SynergyCardMesh from './SynergyCardMesh';

// Safe Error Boundary
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn('WebGL Stream fallback active:', err);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Staggered non-repeating event assignment algorithm
function buildDistributedColumns(events, numColumns = 6, cardsPerColumn = 12) {
  if (!events || events.length === 0) return Array.from({ length: numColumns }, () => []);
  const N = events.length;
  const columns = Array.from({ length: numColumns }, () => []);

  // Distinct coprime strides and initial offsets ensure events never cluster together
  const strides = [5, 13, 7, 17, 3, 11];
  const startOffsets = [0, 7, 14, 3, 10, 18];

  for (let c = 0; c < numColumns; c++) {
    const stride = strides[c % strides.length];
    const offset = startOffsets[c % startOffsets.length];

    for (let i = 0; i < cardsPerColumn; i++) {
      const eventIndex = (offset + i * stride) % N;
      columns[c].push(events[eventIndex]);
    }
  }

  return columns;
}

// Individual 3D Drifting Vertical Column
function DriftColumn({
  events,
  x,
  zOffset = 0,
  rotation = [0, 0, 0],
  curvature = 22.0,
  direction = 'up',
  speed = 70,
  manualVelocityRef,
  onSelectEvent,
}) {
  const groupRef = useRef();
  const yOffsetRef = useRef(0);
  const cardSpacing = 420;
  const count = events.length;
  const totalSpan = Math.max(count * cardSpacing, 4200);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dirFactor = direction === 'up' ? 1 : -1;
    const scrollBoost = manualVelocityRef.current || 0;
    yOffsetRef.current += (dirFactor * speed + scrollBoost) * delta;

    const currentOffset = yOffsetRef.current;
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const rawY = i * cardSpacing + currentOffset;
      const wrappedY = (((rawY % totalSpan) + totalSpan) % totalSpan) - totalSpan / 2;
      child.position.y = wrappedY;
    }
  });

  return (
    <group ref={groupRef} position={[x, 0, zOffset]} rotation={rotation}>
      {events.map((evt, idx) => (
        <SynergyCardMesh
          key={`${evt.id}-c-${x.toFixed(0)}-${idx}`}
          event={evt}
          position={[0, idx * cardSpacing - totalSpan / 2, 0]}
          curvature={curvature}
          onSelect={onSelectEvent}
        />
      ))}
    </group>
  );
}

// Mobile 2-Row Horizontal Stream
function DriftRow({
  events,
  y,
  zOffset = 0,
  direction = 'left',
  speed = 60,
  manualVelocityRef,
  onSelectEvent,
}) {
  const groupRef = useRef();
  const xOffsetRef = useRef(0);
  const cardSpacing = 310;
  const count = events.length;
  const totalSpan = Math.max(count * cardSpacing, 3100);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dirFactor = direction === 'left' ? -1 : 1;
    const scrollBoost = manualVelocityRef.current || 0;
    xOffsetRef.current += (dirFactor * speed + scrollBoost) * delta;

    const currentOffset = xOffsetRef.current;
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const rawX = i * cardSpacing + currentOffset;
      const wrappedX = (((rawX % totalSpan) + totalSpan) % totalSpan) - totalSpan / 2;
      child.position.x = wrappedX;
    }
  });

  return (
    <group ref={groupRef} position={[0, y, zOffset]}>
      {events.map((evt, idx) => (
        <SynergyCardMesh
          key={`${evt.id}-r-${idx}`}
          event={evt}
          position={[idx * cardSpacing - totalSpan / 2, 0, 0]}
          rotation={[0.12, 0.15, 0.05]}
          curvature={18}
          onSelect={onSelectEvent}
        />
      ))}
    </group>
  );
}

// 3D Scene Assembly (Perspective Camera with Cylindrical Arena Layout)
function SceneContent({ events, isMobile, manualVelocityRef, onSelectEvent }) {
  const { size } = useThree();

  // Dampen manual drag velocity gradually
  useFrame((_, delta) => {
    if (manualVelocityRef.current !== 0) {
      manualVelocityRef.current *= Math.pow(0.86, delta * 60);
      if (Math.abs(manualVelocityRef.current) < 0.1) {
        manualVelocityRef.current = 0;
      }
    }
  });

  // Mobile layout
  if (isMobile) {
    const partitionedMobile = useMemo(() => {
      return buildDistributedColumns(events, 2, 12);
    }, [events]);

    return (
      <>
        <ambientLight intensity={1.4} />
        <directionalLight position={[0, 200, 400]} intensity={1.6} color="#ffffff" />
        <DriftRow
          events={partitionedMobile[0]}
          y={140}
          zOffset={0}
          direction="left"
          speed={65}
          manualVelocityRef={manualVelocityRef}
          onSelectEvent={onSelectEvent}
        />
        <DriftRow
          events={partitionedMobile[1]}
          y={-140}
          zOffset={-50}
          direction="right"
          speed={55}
          manualVelocityRef={manualVelocityRef}
          onSelectEvent={onSelectEvent}
        />
      </>
    );
  }

  // Desktop: 6 Staggered Columns forming a 3D Cylindrical Arena around HUD
  const distributed = useMemo(() => {
    return buildDistributedColumns(events, 6, 12);
  }, [events]);

  // Dynamic responsive spacing across screen widths
  const baseSpacing = Math.min(Math.max(size.width / 5.2, 230), 280);

  return (
    <>
      {/* Neutral Clean Studio Lighting (No harsh green pointlight tint!) */}
      <ambientLight intensity={1.35} />
      <directionalLight position={[0, 400, 600]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[0, -250, 400]} intensity={0.5} color="#e2e8f0" />

      {/* Column 0: Far Left - Angled Inward */}
      <DriftColumn
        events={distributed[0]}
        x={-baseSpacing * 2.25}
        zOffset={-70}
        rotation={[0.08, 0.46, -0.05]}
        curvature={24}
        direction="up"
        speed={65}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />

      {/* Column 1: Mid Left (Foreground, Framing HUD left edge) */}
      <DriftColumn
        events={distributed[1]}
        x={-baseSpacing * 1.25}
        zOffset={35}
        rotation={[-0.04, 0.28, 0.03]}
        curvature={20}
        direction="down"
        speed={85}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />

      {/* Column 2: Center Left (Behind HUD, visible top & bottom) */}
      <DriftColumn
        events={distributed[2]}
        x={-baseSpacing * 0.42}
        zOffset={-140}
        rotation={[0.04, 0.08, 0.0]}
        curvature={16}
        direction="up"
        speed={55}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />

      {/* Column 3: Center Right (Behind HUD, visible top & bottom) */}
      <DriftColumn
        events={distributed[3]}
        x={baseSpacing * 0.42}
        zOffset={-140}
        rotation={[0.04, -0.08, 0.0]}
        curvature={16}
        direction="down"
        speed={60}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />

      {/* Column 4: Mid Right (Foreground, Framing HUD right edge, curved inward) */}
      <DriftColumn
        events={distributed[4]}
        x={baseSpacing * 1.25}
        zOffset={35}
        rotation={[-0.04, -0.28, -0.03]}
        curvature={22}
        direction="up"
        speed={80}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />

      {/* Column 5: Far Right - Angled Inward */}
      <DriftColumn
        events={distributed[5]}
        x={baseSpacing * 2.25}
        zOffset={-70}
        rotation={[0.08, -0.46, 0.05]}
        curvature={26}
        direction="down"
        speed={70}
        manualVelocityRef={manualVelocityRef}
        onSelectEvent={onSelectEvent}
      />
    </>
  );
}

// Fallback 2D CSS Matrix Stream if WebGL fails
function FallbackCSSStream({ events, onSelectEvent }) {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 filter blur-[0.5px]">
        {events.slice(0, 8).map((evt, idx) => (
          <div
            key={evt.id + idx}
            onClick={() => onSelectEvent(evt)}
            className="p-4 rounded-xl bg-black/60 border border-geeko-500/40 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
          >
            <div className="text-[10px] font-pixel text-geeko-400 mb-1">{evt.category}</div>
            <div className="text-xs font-bold text-white truncate">{evt.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SynergyThreeStream({
  events = [],
  onSelectEvent,
  interactive = true,
  className = '',
  hideVignette = false,
}) {
  const containerRef = useRef(null);
  const manualVelocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause rendering when off-screen (saves 80%+ GPU)
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = (e) => {
    manualVelocityRef.current += e.deltaY * 0.45;
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - lastPointerPosRef.current.y;
    const deltaX = e.clientX - lastPointerPosRef.current.x;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

    if (isMobile) {
      manualVelocityRef.current += deltaX * 1.2;
    } else {
      manualVelocityRef.current -= deltaY * 1.5;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${
        interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      } bg-[#030705] ${className}`}
      onWheel={interactive ? handleWheel : undefined}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? handlePointerUp : undefined}
      onPointerLeave={interactive ? handlePointerUp : undefined}
    >
      {/* Top & Bottom Vignette Overlays for deep atmospheric depth */}
      {!hideVignette && (
        <>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#040807] via-[#040807]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040807] via-[#040807]/70 to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Subtle edge neon lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-geeko-500/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent z-10 pointer-events-none" />

      {/* R3F WebGL Canvas with Perspective Camera */}
      {hasWebGL ? (
        <WebGLErrorBoundary fallback={<FallbackCSSStream events={events} onSelectEvent={onSelectEvent} />}>
          <Canvas
            frameloop={isInView ? 'always' : 'never'}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            camera={{ position: [0, 0, 780], fov: 48, near: 1, far: 3000 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
            }}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            <SceneContent
              events={events}
              isMobile={isMobile}
              manualVelocityRef={manualVelocityRef}
              onSelectEvent={onSelectEvent}
            />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <FallbackCSSStream events={events} onSelectEvent={onSelectEvent} />
      )}
    </div>
  );
}
