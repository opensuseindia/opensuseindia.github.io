import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Trophy,
  MapPin,
  ChevronDown,
  Layers,
  Gamepad2,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../../lib/sound';
import { allEvents } from '../../data/events';
import MatrixRainBackground from './MatrixRainBackground';

export default function SynergyHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: 54, hours: 14, mins: 28, secs: 40 });
  const [splashIdx, setSplashIdx] = useState(0);
  const heroRef = useRef(null);
  const rafId = useRef(null);

  const splashes = [
    '20H OVERNIGHT BUILDATHON!',
    '₹50,000 CASH POOL + ARCADE BOUNTIES!',
    'LEARN. BUILD. CONTRIBUTE.',
    '6 BUILDATHON TRACKS!',
    'NEWTON SCHOOL OF TECHNOLOGY!',
    'ZERO REGISTRATION FEE!',
    'STRICT 250 BUILDERS CAP!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, mins: 59, secs: 59 };
      });
    }, 1000);

    const splashInterval = setInterval(() => {
      setSplashIdx((prev) => (prev + 1) % splashes.length);
    }, 3800);

    return () => {
      clearInterval(timer);
      clearInterval(splashInterval);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current || rafId.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
      setTilt({
        x: -y * 8,
        y: x * 10,
      });
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setMousePos({ x: 0, y: 0 });
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    sounds.click();
    if (id === 'all-events') {
      window.dispatchEvent(new CustomEvent('open-all-events'));
      const stage = document.getElementById('events-stage');
      if (stage) {
        const yOffset = -60;
        const y = stage.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[94vh] pt-28 sm:pt-32 lg:pt-36 pb-8 bg-[#020504] overflow-hidden flex flex-col justify-between items-center select-none text-white px-4 home-snap-section"
    >
      {/* ===================================================================== */}
      {/* 1. ULTRA-SMOOTH CYBER MATRIX & HORIZON BACKGROUND (Zero WebGL Lag)    */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Authentic 3D Depth-of-Field Matrix Cyber Interface */}
        <MatrixRainBackground />

        {/* Ambient Top Glows matching mouse parallax */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-b from-[#73ba25]/16 via-[#00f0ff]/8 to-transparent blur-3xl rounded-full transition-transform duration-500 pointer-events-none"
          style={{
            transform: `translate3d(calc(-50% + ${mousePos.x * 25}px), ${mousePos.y * 15}px, 0)`,
          }}
        />

        {/* 3D Horizon Ground Wireframe Grid */}
        <div
          className="absolute inset-x-0 bottom-0 h-[35%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(115, 186, 37, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(115, 186, 37, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(400px) rotateX(65deg) translateY(20px)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Subtle Scanline CRT Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
      </div>

      {/* ===================================================================== */}
      {/* 2. TOP TICKER BAR - Sleek Dark Obsidian Glass Ribbon (Zero Hyphens)    */}
      {/* ===================================================================== */}
      <div
        className="relative w-full max-w-5xl mx-auto bg-[#020503]/75 backdrop-blur-2xl border border-white/[0.08] py-2 px-4 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_10px_35px_rgba(0,0,0,0.85)] z-10 shrink-0 mt-2 sm:mt-3 mb-4 sm:mb-6"
        style={{
          clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        }}
      >
        {/* Delicate Top Specular Light Refraction Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="animate-ticker text-[9px] sm:text-[9.5px] font-pixel tracking-widest text-[#73ba25] whitespace-nowrap">
          <span className="mx-4 text-emerald-400">★ 20 HOUR GEEKO BUILDATHON ★</span>
          <span className="mx-4 text-white">NEWTON SCHOOL OF TECHNOLOGY, BENGALURU</span>
          <span className="mx-4 text-[#00f0ff]">★ ₹50,000 CASH PRIZE POOL ★</span>
          <span className="mx-4 text-geeko-300">LEARN. BUILD. CONTRIBUTE.</span>
          <span className="mx-4 text-amber-300">★ 6 BUILDATHON TRACKS ★</span>
          <span className="mx-4 text-emerald-300">JANUARY 2027 · FREE PARTICIPANT REGISTRATION</span>
          {/* Loop duplicate */}
          <span className="mx-4 text-emerald-400">★ 20 HOUR GEEKO BUILDATHON ★</span>
          <span className="mx-4 text-white">NEWTON SCHOOL OF TECHNOLOGY, BENGALURU</span>
          <span className="mx-4 text-[#00f0ff]">★ ₹50,000 CASH PRIZE POOL ★</span>
          <span className="mx-4 text-geeko-300">LEARN. BUILD. CONTRIBUTE.</span>
          <span className="mx-4 text-amber-300">★ 6 BUILDATHON TRACKS ★</span>
          <span className="mx-4 text-emerald-300">JANUARY 2027 · FREE PARTICIPANT REGISTRATION</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. HERO CENTERPIECE (Clean, Iconic, Perfectly Proportioned)           */}
      {/* ===================================================================== */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto w-full max-w-4xl px-2">
        {/* 3D Tiltable Marquee Container */}
        <div
          className="relative inline-flex flex-col items-center justify-center cursor-pointer transition-transform duration-150 py-3 px-1 sm:p-6"
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
          onClick={() => sounds.click()}
        >
          {/* Primary Logo Title */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            <span
              className="text-[22px] sm:text-5xl md:text-6xl lg:text-7xl font-pixel font-bold text-white tracking-normal select-none"
              style={{
                textShadow:
                  '3px 3px 0 #0d3824, 6px 6px 0 #051910, 8px 8px 0 #020d08, 0 10px 30px rgba(0,0,0,0.85), 0 0 35px rgba(115,186,37,0.45)',
              }}
            >
              openSUSE
            </span>
            <span
              className="text-[22px] sm:text-5xl md:text-6xl lg:text-7xl font-pixel font-bold text-[#73ba25] tracking-normal select-none"
              style={{
                textShadow:
                  '3px 3px 0 #2b5714, 6px 6px 0 #051910, 8px 8px 0 #020d08, 0 10px 30px rgba(0,0,0,0.85), 0 0 35px rgba(0,240,255,0.5)',
              }}
            >
              '27
            </span>
          </div>

          {/* Subtitle Ribbon */}
          <div className="font-pixel text-[10px] sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.28em] text-[#00f0ff] uppercase mt-2.5 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
            BENGALURU CONNECT
          </div>

          {/* Minecraft Splash Bouncing Tag */}
          <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-6 md:bottom-7 sm:-right-8 md:-right-16 z-20 pointer-events-none">
            <div className="mc-splash text-[6.5px] sm:text-[7.5px] md:text-[8px]">
              {splashes[splashIdx]}
            </div>
          </div>
        </div>

        {/* Tagline Paragraph (Clean, balanced 2 lines with zero orphans) */}
        <p className="text-slate-100 text-xs sm:text-[13.5px] md:text-[14px] max-w-3xl mx-auto mt-4 sm:mt-7 font-sans leading-relaxed text-center px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span className="sm:block font-medium">
            The flagship gathering of Linux builders, open source engineers, and student hackers in India.
          </span>
          {' '}
          <span className="sm:block text-slate-300">
            20 hours of overnight building, ₹50,000 in grand cash prizes, and zero registration fees.
          </span>
        </p>

        {/* ===================================================================== */}
        {/* 4. HIGH-IMPACT PRIMARY ACTION DECK (Twin Cyber Chamfered Cartridges) */}
        {/* ===================================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-7 w-full max-w-xl">
          {/* PRIMARY: ⚡ GET YOUR PASS ↗ (Vibrant Chamfered Cyber Cartridge) */}
          <Link
            to="/register"
            onClick={() => sounds.click()}
            className="group relative w-full sm:w-auto flex-1 p-[1.5px] shadow-[0_3px_0_#2b5714,0_2px_8px_rgba(0,0,0,0.6),0_0_20px_rgba(115,186,37,0.35)] hover:shadow-[0_5px_0_#2b5714,0_10px_24px_rgba(0,0,0,0.7),0_0_30px_rgba(115,186,37,0.55)] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_1px_0_#2b5714] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none"
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              background: 'linear-gradient(135deg, #a3e635 0%, #86efac 50%, #a3e635 100%)',
            }}
          >
            <div
              className="py-3 sm:py-3.5 px-5 sm:px-6 inline-flex items-center justify-center gap-2 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden text-[#040807] group-hover:brightness-[1.06]"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                background: 'linear-gradient(90deg, #73ba25 0%, #86d92e 50%, #73ba25 100%)',
              }}
            >
              {/* Fine top hairline reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <span className="text-[11px] group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">⚡</span>
              <span className="font-pixel text-[9.5px] sm:text-[10px] font-bold tracking-wider select-none">
                GET YOUR PASS
              </span>
              <span className="text-xs font-sans font-bold group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                ↗
              </span>
            </div>
          </Link>

          {/* SECONDARY: ▶ ALL EVENTS [22] ↗ (Matching Precision Laser Chamfer Cartridge) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              sounds.click();
              window.dispatchEvent(new CustomEvent('open-all-events'));
              const stage = document.getElementById('events-stage');
              if (stage) {
                const yOffset = -60;
                const y = stage.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => sounds.hover?.()}
            className="group relative w-full sm:w-auto flex-1 p-[1.5px] shadow-[0_3px_0_#1b4d24,0_2px_8px_rgba(0,0,0,0.6)] hover:shadow-[0_5px_0_#1b4d24,0_10px_24px_rgba(0,0,0,0.7),0_0_20px_rgba(115,186,37,0.25)] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_1px_0_#1b4d24] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none bg-gradient-to-b from-[#73ba25] via-[#529419] to-[#275910] hover:from-[#8ee631] hover:via-[#73ba25] hover:to-[#387a15]"
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
            title="Jump directly to 3D Event Stream & Central Finder"
            aria-label="All Events Stream & Central Finder"
          >
            <div
              className="py-3 sm:py-3.5 px-5 sm:px-6 inline-flex items-center justify-center gap-2.5 w-full bg-gradient-to-b from-[#0e2916] via-[#081a0e] to-[#040c06] group-hover:from-[#153e22] group-hover:via-[#0c2816] group-hover:to-[#07190e] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              {/* Soft ambient glass light blooming from top */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-[radial-gradient(ellipse_at_top,rgba(115,186,37,0.22)_0%,transparent_70%)] pointer-events-none" />

              {/* Silky 1px top highlight hairline */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8ee631]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Phosphor Play Icon */}
              <span className="text-[8.5px] text-[#73ba25] group-hover:text-[#8ee631] group-hover:translate-x-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10">
                ▶
              </span>

              {/* Crisp Razor-Sharp White Pixel Typography (Zero Blur, 100% Contrast) */}
              <span
                className="font-pixel text-[9.5px] sm:text-[10px] uppercase tracking-wider text-white relative z-10 select-none"
                style={{
                  textShadow: '1px 1px 0 #000, 0 1px 4px rgba(0,0,0,0.8)',
                }}
              >
                ALL EVENTS
              </span>

              {/* Tactical Micro Badge */}
              <span className="px-1.5 py-0.5 rounded-sm bg-black/80 border border-[#73ba25]/60 group-hover:border-[#8ee631] group-hover:bg-[#73ba25]/20 text-[#a3e635] font-mono text-[8.5px] font-bold tracking-tight transition-all duration-300 ease-out relative z-10">
                22
              </span>

              {/* Dynamic Arrow */}
              <span className="text-[12px] font-sans font-bold text-[#73ba25] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10">
                ↗
              </span>
            </div>
          </button>
        </div>

        {/* QUICK JUMP CHIPS - High-Contrast Dark Glass Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-[11px] font-mono text-slate-200">
          <button
            onClick={() => scrollToSection('tracks')}
            className="px-3 py-1.5 rounded-lg bg-[#030805]/92 backdrop-blur-2xl border border-white/[0.12] hover:border-emerald-400/60 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.7)] text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>6 Tracks</span>
          </button>
          <button
            onClick={() => scrollToSection('schedule')}
            className="px-3 py-1.5 rounded-lg bg-[#030805]/92 backdrop-blur-2xl border border-white/[0.12] hover:border-blue-400/60 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.7)] text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Timeline</span>
          </button>
          <button
            onClick={() => scrollToSection('slot-machine')}
            className="px-3 py-1.5 rounded-lg bg-[#030805]/92 backdrop-blur-2xl border border-white/[0.12] hover:border-purple-400/60 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.7)] text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Arcade</span>
          </button>
          <button
            onClick={() => scrollToSection('venue')}
            className="px-3 py-1.5 rounded-lg bg-[#030805]/92 backdrop-blur-2xl border border-white/[0.12] hover:border-cyan-400/60 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.7)] text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Venue (NST)</span>
          </button>
          <Link
            to="/faq"
            onClick={() => sounds.click?.()}
            className="px-3 py-1.5 rounded-lg bg-[#030805]/92 backdrop-blur-2xl border border-white/[0.12] hover:border-geeko-400/60 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.7)] text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-geeko-400" />
            <span>FAQ</span>
          </Link>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. TELEMETRY CARDS DECK (Sleek Obsidian Cyber Glass, Zero Dots)       */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-6 mb-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Prize Pool */}
          <div className="group relative rounded-2xl bg-[#040805]/90 backdrop-blur-2xl border border-white/[0.10] hover:border-amber-400/50 p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.12),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center gap-4 overflow-hidden">
            {/* Top Amber Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent pointer-events-none" />

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_16px_rgba(245,158,11,0.2)] group-hover:scale-105 group-hover:border-amber-400/60 group-hover:shadow-[0_0_22px_rgba(245,158,11,0.35)] transition-all">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-amber-400/90 font-semibold tracking-widest uppercase mb-1">
                PRIZE POOL &amp; ARCADE
              </div>
              <div className="font-heading font-bold text-[13px] sm:text-[14px] text-white tracking-tight leading-snug whitespace-nowrap">
                ₹50,000 Cash + Arcade Bounties
              </div>
              <div className="font-mono text-[11px] text-slate-400 mt-0.5 truncate">
                PS5 Gaming &amp; Contributor Kits
              </div>
            </div>
          </div>

          {/* Card 2: Live Countdown */}
          <div className="group relative rounded-2xl bg-[#040805]/90 backdrop-blur-2xl border border-white/[0.10] hover:border-emerald-400/50 p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:shadow-[0_16px_40px_rgba(115,186,37,0.15),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Emerald Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#73ba25]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#73ba25]/[0.03] to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#73ba25]" />
                <span className="font-mono text-[10px] text-[#73ba25] font-semibold tracking-widest uppercase">
                  EVENT COUNTDOWN
                </span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wider uppercase">
                JANUARY 2027
              </span>
            </div>

            {/* Cohesive Segmented Digits */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg py-1.5 px-1 shadow-inner">
                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wider leading-tight">
                  {countdown.days}
                </div>
                <div className="text-[8px] font-mono text-slate-400 font-medium tracking-wider mt-0.5">
                  DAYS
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg py-1.5 px-1 shadow-inner">
                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wider leading-tight">
                  {countdown.hours}
                </div>
                <div className="text-[8px] font-mono text-slate-400 font-medium tracking-wider mt-0.5">
                  HRS
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg py-1.5 px-1 shadow-inner">
                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wider leading-tight">
                  {countdown.mins}
                </div>
                <div className="text-[8px] font-mono text-slate-400 font-medium tracking-wider mt-0.5">
                  MINS
                </div>
              </div>
              <div className="bg-emerald-500/[0.05] border border-emerald-500/30 rounded-lg py-1.5 px-1 shadow-inner">
                <div className="font-mono text-sm sm:text-base font-bold text-emerald-400 tracking-wider leading-tight">
                  {countdown.secs}
                </div>
                <div className="text-[8px] font-mono text-emerald-400/80 font-medium tracking-wider mt-0.5">
                  SECS
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Venue & Headcount */}
          <div
            onClick={() => scrollToSection('venue')}
            className="group relative rounded-2xl bg-[#040805]/90 backdrop-blur-2xl border border-white/[0.10] hover:border-cyan-400/50 p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:shadow-[0_16px_40px_rgba(0,240,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center gap-4 overflow-hidden cursor-pointer"
          >
            {/* Top Cyan Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent pointer-events-none" />

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_16px_rgba(0,240,255,0.2)] group-hover:scale-105 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_22px_rgba(0,240,255,0.35)] transition-all">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-cyan-400/90 font-semibold tracking-widest uppercase mb-1">
                VENUE & CAPACITY
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-white tracking-tight truncate">
                Newton School of Technology
              </div>
              <div className="font-mono text-[11px] text-slate-400 mt-0.5 truncate">
                S-VYASA Campus · 250 Builders Cap · Overnight Permitted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Cue to All Events */}
      <button
        onClick={() => scrollToSection('all-events')}
        className="mt-1 text-slate-400 hover:text-white flex items-center gap-1.5 font-mono text-xs transition-colors z-10 cursor-pointer"
      >
        <span>Scroll to Explore All Events (22)</span>
        <ChevronDown className="w-4 h-4 text-geeko-400 animate-bounce" />
      </button>
    </section>
  );
}
