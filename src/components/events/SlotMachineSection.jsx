import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { sounds } from '../../lib/sound';
import { allEvents } from '../../data/events';

export default function SlotMachineSection({ onSelectEvent }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [jackpot, setJackpot] = useState(false);

  // Drum Rotations in degrees around X axis
  const [rotations, setRotations] = useState([0, 0, 0]);
  const rotationsRef = useRef([0, 0, 0]);

  // Cylinder parameters
  const NUM_FACES = 8;
  const ANGLE_PER_FACE = 360 / NUM_FACES; // 45 deg
  const RADIUS = 270; // 3D cylinder radius in px

  // 3 Distinct Drum Event Streams (Matching Day 1, Day 2, Day 3 / Tracks from reference image)
  const drum1Events = [
    allEvents.find((e) => e.id === 'evt-talk-1') || allEvents[0],
    allEvents.find((e) => e.id === 'evt-ws-1') || allEvents[1],
    allEvents.find((e) => e.id === 'evt-talk-2') || allEvents[2],
    allEvents.find((e) => e.id === 'evt-ws-2') || allEvents[3],
    allEvents.find((e) => e.id === 'evt-talk-3') || allEvents[4],
    allEvents.find((e) => e.id === 'evt-arcade-1') || allEvents[5],
    allEvents.find((e) => e.id === 'evt-quest') || allEvents[6],
    allEvents.find((e) => e.id === 'evt-bughunt') || allEvents[7],
  ];

  const drum2Events = [
    allEvents.find((e) => e.id === 'evt-buildathon') || allEvents[0],
    allEvents.find((e) => e.id === 'evt-track-1') || allEvents[1],
    allEvents.find((e) => e.id === 'evt-track-2') || allEvents[2],
    allEvents.find((e) => e.id === 'evt-track-3') || allEvents[3],
    allEvents.find((e) => e.id === 'evt-track-4') || allEvents[4],
    allEvents.find((e) => e.id === 'evt-track-5') || allEvents[5],
    allEvents.find((e) => e.id === 'evt-track-6') || allEvents[6],
    allEvents.find((e) => e.id === 'evt-demo') || allEvents[7],
  ];

  const drum3Events = [
    allEvents.find((e) => e.id === 'evt-finale') || allEvents[0],
    allEvents.find((e) => e.id === 'evt-arcade-2') || allEvents[1],
    allEvents.find((e) => e.id === 'evt-arcade-3') || allEvents[2],
    allEvents.find((e) => e.id === 'evt-arcade-4') || allEvents[3],
    allEvents.find((e) => e.id === 'evt-quest') || allEvents[4],
    allEvents.find((e) => e.id === 'evt-bughunt') || allEvents[5],
    allEvents.find((e) => e.id === 'evt-buildathon') || allEvents[6],
    allEvents.find((e) => e.id === 'evt-ws-1') || allEvents[7],
  ];

  const drumsData = [drum1Events, drum2Events, drum3Events];

  // Mouse wheel scroll handler on individual drums
  const handleWheel = (drumIdx, deltaY) => {
    if (isSpinning) return;
    const step = deltaY > 0 ? -ANGLE_PER_FACE : ANGLE_PER_FACE;
    sounds.tick();
    const newRotations = [...rotationsRef.current];
    newRotations[drumIdx] += step;
    rotationsRef.current = newRotations;
    setRotations([...newRotations]);
  };

  // Pull Lever & Spin All 3 Drums
  const handleSpin = () => {
    if (isSpinning) return;

    sounds.leverPull();
    setLeverPulled(true);
    setIsSpinning(true);
    setJackpot(false);

    // Spring lever back smoothly after mechanical pull
    setTimeout(() => {
      setLeverPulled(false);
    }, 280);

    // Multi-turn rotational values for dramatic arcade spin
    const spinRotations = [
      rotationsRef.current[0] + (360 * 3 + Math.floor(Math.random() * NUM_FACES) * ANGLE_PER_FACE),
      rotationsRef.current[1] + (360 * 4 + Math.floor(Math.random() * NUM_FACES) * ANGLE_PER_FACE),
      rotationsRef.current[2] + (360 * 5 + Math.floor(Math.random() * NUM_FACES) * ANGLE_PER_FACE),
    ];

    // Rapid mechanical ticks audio
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      sounds.tick();
      if (tickCount > 24) clearInterval(tickInterval);
    }, 75);

    // Drum 1 deceleration lock
    setTimeout(() => {
      rotationsRef.current[0] = spinRotations[0];
      setRotations([spinRotations[0], rotationsRef.current[1], rotationsRef.current[2]]);
      sounds.click();
    }, 950);

    // Drum 2 deceleration lock
    setTimeout(() => {
      rotationsRef.current[1] = spinRotations[1];
      setRotations([spinRotations[0], spinRotations[1], rotationsRef.current[2]]);
      sounds.click();
    }, 1500);

    // Drum 3 deceleration lock & evaluation
    setTimeout(() => {
      rotationsRef.current[2] = spinRotations[2];
      setRotations([...spinRotations]);
      setIsSpinning(false);
      sounds.click();

      // Check for match
      const idx1 = Math.round(Math.abs(spinRotations[0] / ANGLE_PER_FACE)) % NUM_FACES;
      const idx2 = Math.round(Math.abs(spinRotations[1] / ANGLE_PER_FACE)) % NUM_FACES;
      const idx3 = Math.round(Math.abs(spinRotations[2] / ANGLE_PER_FACE)) % NUM_FACES;

      if (idx1 === idx2 || idx2 === idx3 || Math.random() < 0.4) {
        setJackpot(true);
        sounds.success();
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.52 },
          colors: ['#ff007f', '#00f0ff', '#eab308', '#73ba25', '#ffffff'],
        });
      }
    }, 2150);
  };

  const handleExploreAllEvents = () => {
    sounds.click();
    window.dispatchEvent(new CustomEvent('open-all-events'));
    const stage = document.getElementById('events-stage');
    if (stage) {
      const yOffset = -60;
      const y = stage.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="slot-machine"
      className="relative w-full min-h-screen py-14 px-3 sm:px-6 bg-[#080312] overflow-hidden flex flex-col justify-between items-center select-none"
    >
      {/* ========================================================================= */}
      {/* 1. RETRO SPACE CELESTIAL BACKGROUND & PIXEL ART SCENERY                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep starry space gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a0e4a] via-[#100522] to-[#05010a]" />

        {/* Twinkling Pixel Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1.5px,transparent_1.5px)] [background-size:56px_56px] opacity-20" />

        {/* Giant Red Cratered Pixel Planet (Top Right - Matching Reference Image) */}
        <div className="absolute -top-8 sm:top-4 right-1 sm:right-10 w-52 sm:w-80 h-52 sm:h-80 rounded-full bg-gradient-to-br from-[#c2410c] via-[#9a3412] to-[#431407] border-4 border-[#ea580c]/70 shadow-[0_0_70px_rgba(194,65,12,0.45)] opacity-90 overflow-hidden">
          {/* Pixel Craters with shadows */}
          <div className="absolute top-12 left-14 w-14 h-9 rounded-full bg-[#7c2d12] border-2 border-[#431407] shadow-inner opacity-80" />
          <div className="absolute top-28 left-36 w-18 h-12 rounded-full bg-[#7c2d12] border-2 border-[#431407] shadow-inner opacity-80" />
          <div className="absolute bottom-16 left-16 w-24 h-14 rounded-full bg-[#7c2d12] border-2 border-[#431407] shadow-inner opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.45)_2px,transparent_2px)] [background-size:8px_8px] opacity-40" />
        </div>

        {/* Small Distant Purple Pixel Planet (Left) */}
        <div className="absolute top-20 left-3 sm:left-14 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-gradient-to-br from-[#a855f7] via-[#7e22ce] to-[#3b0764] border-2 border-[#c084fc]/50 shadow-[0_0_30px_rgba(168,85,247,0.35)] opacity-80" />

        {/* Pixel Sprite: 8-bit Space Invader (Right) */}
        <div className="absolute top-44 right-16 sm:right-32 text-2xl filter drop-shadow-[0_0_10px_#00f0ff] animate-bounce">
          🛸
        </div>

        {/* Pixel Sprite: 8-bit Mushroom (Left) */}
        <div className="absolute bottom-36 left-6 sm:left-16 text-2xl filter drop-shadow-[0_0_8px_#ef4444]">
          🍄
        </div>

        {/* Pixel Sprite: Floating Pixel Heart */}
        <div className="absolute top-2/3 right-8 sm:right-24 text-xl filter drop-shadow-[0_0_10px_#ec4899] animate-pulse">
          💖
        </div>

        {/* Pixel Sprite: Floating Gold Coin */}
        <div className="absolute bottom-28 right-12 sm:right-36 text-xl filter drop-shadow-[0_0_10px_#eab308]">
          🪙
        </div>

        {/* Red Jagged Pixel Rocky Mountains (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-52 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 240 L0 180 L40 160 L80 190 L130 140 L180 180 L230 130 L270 170 L330 110 L380 160 L440 90 L500 150 L560 110 L620 170 L680 100 L740 160 L800 80 L860 150 L920 110 L980 170 L1040 120 L1100 160 L1160 130 L1200 170 L1200 240 Z"
              fill="#52141d"
            />
            <path
              d="M0 240 L0 200 L60 170 L120 210 L180 160 L240 190 L300 150 L360 200 L420 140 L480 190 L540 150 L600 200 L660 140 L720 190 L780 130 L840 180 L900 140 L960 190 L1020 150 L1080 190 L1140 160 L1200 190 L1200 240 Z"
              fill="#3a0d14"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION HEADER (Extruded 3D Pixel Metallic Typography)                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-1 mb-5">
        {/* Instruction Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/75 border border-[#eab308]/60 text-slate-200 font-pixel text-[8.5px] uppercase tracking-wider mb-3 shadow-[0_2px_0_#000]">
          <span className="text-amber-400">▸</span>
          <span>HOVER A DRUM AND SCROLL · CLICK A POSTER FOR DETAILS</span>
          <span className="text-amber-400">◂</span>
        </div>

        {/* Huge Extruded 3D Pixel EVENTS Title */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-pixel uppercase tracking-wide text-slate-100 select-none leading-none"
          style={{
            textShadow: `
              0 1px 0 #e2e8f0,
              0 2px 0 #cbd5e1,
              0 3px 0 #94a3b8,
              0 4px 0 #64748b,
              0 5px 0 #475569,
              0 6px 0 #334155,
              0 7px 0 #1e293b,
              0 8px 0 #0f172a,
              0 14px 28px rgba(0,0,0,0.95),
              0 0 35px rgba(255,255,255,0.3)
            `,
          }}
        >
          EVENTS
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE 3D PURPLE ARCADE CABINET & CYLINDRICAL DRUM REELS                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-center my-auto">
        {/* 3D Isometric Side Extrusion Wings (Matches Reference Image Depth) */}
        <div
          className="absolute -left-3 top-3 bottom-3 w-5 bg-[#1b0833] border-l-2 border-t-2 border-b-2 border-black -skew-y-12 pointer-events-none"
          style={{ transformOrigin: 'right center' }}
        />
        <div
          className="absolute -right-3 top-3 bottom-3 w-5 bg-[#1b0833] border-r-2 border-t-2 border-b-2 border-black skew-y-12 pointer-events-none"
          style={{ transformOrigin: 'left center' }}
        />

        {/* Outer Purple 3D Arcade Cabinet */}
        <div
          className="relative w-full p-3.5 sm:p-5 border-4 border-[#eab308] shadow-[0_12px_45px_rgba(0,0,0,0.95),0_0_60px_rgba(147,51,234,0.35)]"
          style={{
            clipPath:
              'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
            background:
              'linear-gradient(135deg, #3d1666 0%, #240c42 45%, #18072e 100%)',
          }}
        >
          {/* Top Marquee Plates (Day 1, Day 2, Day 3 Gold Cartridges) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-3.5">
            {[
              { label: 'DAY 1', color: '#00f0ff', barColor: 'bg-[#00f0ff]' },
              { label: 'DAY 2', color: '#ff007f', barColor: 'bg-[#ff007f]' },
              { label: 'DAY 3', color: '#eab308', barColor: 'bg-[#eab308]' },
            ].map((plate, idx) => (
              <div
                key={idx}
                className="relative p-2 rounded-xs border-2 border-black flex flex-col items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_0_#000]"
                style={{
                  background: 'linear-gradient(to bottom, #d4af37, #996515)',
                }}
              >
                {/* Corner Rivet Screws */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-black/70 shadow-inner" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-black/70 shadow-inner" />

                <div className="font-pixel text-[9.5px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider">
                  {plate.label}
                </div>

                {/* Progress Blocks Meter Bar */}
                <div className="w-full h-1.5 bg-black/85 rounded-xs mt-1 px-0.5 flex items-center justify-between gap-0.5 overflow-hidden">
                  {Array.from({ length: 9 }).map((_, bIdx) => (
                    <div
                      key={bIdx}
                      className={`h-1 flex-1 rounded-xs ${plate.barColor}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* THE 3 CYLINDRICAL 3D DRUMS VIEWPORT */}
          <div className="relative grid grid-cols-3 gap-2.5 sm:gap-3.5 bg-black border-4 border-black p-2 sm:p-3 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,1)]">
            {[0, 1, 2].map((drumIdx) => {
              const drumEvents = drumsData[drumIdx];
              return (
                <div
                  key={drumIdx}
                  onWheel={(e) => handleWheel(drumIdx, e.deltaY)}
                  className="relative h-[290px] sm:h-[330px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
                  style={{
                    perspective: '1000px',
                    perspectiveOrigin: '50% 50%',
                  }}
                  title="Hover and scroll to rotate this drum"
                >
                  {/* Top Ambient Shadow Overlay (Creates 3D Cylinder Curvature) */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-20" />

                  {/* Bottom Ambient Shadow Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-20" />

                  {/* Specular Center Reflection Sheen */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none z-20" />

                  {/* 3D Rotating Drum Cylinder */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(${rotations[drumIdx]}deg)`,
                      transition: isSpinning
                        ? 'none'
                        : 'transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1)',
                    }}
                  >
                    {drumEvents.map((evt, faceIdx) => {
                      const angle = faceIdx * ANGLE_PER_FACE;
                      return (
                        <div
                          key={`${evt.id}-face-${faceIdx}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectEvent) onSelectEvent(evt);
                          }}
                          className="absolute left-1 right-1 h-[210px] top-1/2 -mt-[105px] p-2.5 rounded-xs border-2 border-[#73ba25]/80 bg-gradient-to-b from-[#0e2c1c] via-[#05140d] to-[#040d08] flex flex-col justify-between overflow-hidden cursor-pointer group shadow-[0_0_18px_rgba(115,186,37,0.3)] hover:border-[#00f0ff] transition-colors"
                          style={{
                            transform: `rotateX(${angle}deg) translateZ(${RADIUS}px)`,
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Top Gold / Amber Marquee Bar */}
                          <div className="px-1.5 py-0.5 bg-[#eab308]/20 border border-[#eab308]/60 text-amber-300 font-pixel text-[8px] uppercase tracking-wider text-center truncate">
                            {evt.prizeAmountINR
                              ? `PRIZE POOL : ₹${evt.prizeAmountINR.toLocaleString('en-IN')}`
                              : 'KNOWLEDGE SHARING'}
                          </div>

                          {/* Radar Artwork & Event Title */}
                          <div className="flex-1 my-1.5 flex flex-col items-center justify-center text-center px-1">
                            {/* Vector Radar Wireframe Graphic */}
                            <div className="w-14 h-14 rounded-full border border-[#73ba25]/45 flex items-center justify-center relative mb-1.5 group-hover:border-[#00f0ff] transition-colors shadow-[0_0_10px_rgba(115,186,37,0.2)]">
                              <div className="w-9 h-9 rounded-full border border-dashed border-[#73ba25]/60" />
                              <div className="absolute w-full h-[1px] bg-[#73ba25]/45" />
                              <div className="absolute h-full w-[1px] bg-[#73ba25]/45" />
                              <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_6px_#73ba25]">
                                {evt.category === 'Hackathon'
                                  ? '⚡'
                                  : evt.category === 'Workshops'
                                  ? '🛠️'
                                  : evt.category === 'Arcade'
                                  ? '🕹️'
                                  : '💻'}
                              </span>
                            </div>

                            <h4
                              className="font-pixel text-[9.5px] sm:text-[10.5px] text-white uppercase tracking-wider line-clamp-2 leading-snug group-hover:text-[#00f0ff] transition-colors"
                              style={{
                                textShadow: '1px 1px 0 #000, 0 0 10px rgba(115,186,37,0.45)',
                              }}
                            >
                              {evt.name}
                            </h4>

                            <div className="text-[8.5px] font-mono text-[#a3e635] truncate mt-0.5 font-semibold">
                              {evt.type || evt.badge}
                            </div>
                          </div>

                          {/* Bottom Card Footer */}
                          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-slate-300">
                            <span className="truncate">
                              {evt.days ? evt.days[0] : 'DAY 1'}
                            </span>
                            <span className="text-[#00f0ff] font-pixel text-[7.5px] group-hover:translate-x-0.5 transition-transform">
                              [EXEC ↵]
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flashing Jackpot Banner */}
          {jackpot && (
            <div className="mt-3 py-1.5 px-3 bg-gradient-to-r from-amber-500/30 via-yellow-400/40 to-amber-500/30 border-2 border-amber-300 text-center font-pixel text-[9.5px] text-amber-200 uppercase tracking-widest animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              ★ 3-OF-A-KIND JACKPOT! GEEKO CHAMPION! ★
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. MECHANICAL PULL LEVER WITH "CLICK ME" PIXEL SPEECH BADGE               */}
        {/* ========================================================================= */}
        <div
          onClick={handleSpin}
          className="absolute -right-8 sm:-right-20 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-40 group"
          title="Pull lever to spin the slot machine!"
        >
          {/* Magenta / Pink "CLICK ME" Pixel Speech Box */}
          <div className="relative -top-3 -left-8 sm:-left-12 px-3 py-1.5 bg-[#ff007f] border-2 border-black text-white font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider shadow-[3px_3px_0_#000] animate-bounce whitespace-nowrap">
            <span>CLICK ME</span>
            {/* Pointer arrow triangle */}
            <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
          </div>

          {/* 8-bit Hand Cursor pointing to the red knob */}
          <div className="absolute top-6 -left-6 sm:-left-8 text-2xl filter drop-shadow-[2px_2px_0_#000] -rotate-45 pointer-events-none animate-pulse">
            👆
          </div>

          {/* The Mechanical Shaft & Knob */}
          <div className="relative flex flex-col items-center">
            {/* Motion Pivot: Angled upward-right matching reference image */}
            <motion.div
              animate={{
                rotate: leverPulled ? 32 : -12,
                y: leverPulled ? 26 : 0,
              }}
              transition={{ duration: 0.16, ease: 'easeInOut' }}
              className="origin-bottom flex flex-col items-center"
            >
              {/* Faceted Red Sphere Knob */}
              <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#7f1d1d] border-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.85),inset_0_2px_5px_rgba(255,255,255,0.7)] group-hover:scale-110 transition-transform" />

              {/* Chrome Metallic Rod */}
              <div className="w-2.5 sm:w-3.5 h-32 sm:h-40 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600 border border-black shadow-[2px_2px_5px_rgba(0,0,0,0.75)]" />
            </motion.div>

            {/* Base Cabinet Mount Pivot */}
            <div className="w-8 h-12 bg-gradient-to-r from-neutral-800 via-neutral-900 to-black border-2 border-black rounded-r-md shadow-xl" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM ACTION BUTTON & QUICK NAV                                       */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center gap-2 mt-7">
        {/* Hot Pink / Magenta Pixel "* EXPLORE ALL EVENTS *" Button */}
        <button
          onClick={handleExploreAllEvents}
          className="px-7 sm:px-9 py-3.5 bg-[#140622] hover:bg-[#ff007f] text-[#ff007f] hover:text-white border-2 border-[#ff007f] font-pixel text-[10.5px] sm:text-[11.5px] uppercase tracking-widest shadow-[0_4px_0_#5a002c,0_0_24px_rgba(255,0,127,0.45)] hover:shadow-[0_4px_0_#5a002c,0_0_38px_rgba(255,0,127,0.85)] active:translate-y-1 transition-all cursor-pointer select-none"
        >
          * EXPLORE ALL EVENTS *
        </button>

        <div className="font-mono text-[10px] text-slate-400 mt-1">
          Scroll drums or pull the lever to discover openSUSE Connect missions!
        </div>
      </div>

      {/* Top Return Quick Pill (Bottom Right - Matching Reference Image) */}
      <button
        onClick={() => {
          sounds.click();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-4 right-4 p-2 bg-[#1b0833] border-2 border-[#ff007f] text-[#ff007f] font-pixel text-[8px] flex flex-col items-center gap-0.5 shadow-[2px_2px_0_#000] hover:bg-[#ff007f] hover:text-white transition-colors cursor-pointer z-50"
        title="Return to Top"
      >
        <span>↑</span>
        <span className="text-[7px]">TOP</span>
      </button>
    </section>
  );
}
