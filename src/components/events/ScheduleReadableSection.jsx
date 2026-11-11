import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Coffee, 
  Flame, 
  Gamepad2, 
  ShieldAlert, 
  Zap, 
  Code2, 
  Gift 
} from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function ScheduleReadableSection() {
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  const day1Milestones = [
    {
      id: 'd1-1',
      time: '09:30 AM',
      title: 'Badge Check In & Swag Kit Drop',
      icon: Gift,
      accent: '#73ba25',
      tag: 'REG',
    },
    {
      id: 'd1-2',
      time: '11:00 AM',
      title: 'Opening Keynote & 6 Tracks Briefing',
      icon: Zap,
      accent: '#8ee631',
      tag: 'KEYNOTE',
    },
    {
      id: 'd1-3',
      time: '02:30 PM',
      title: '20h Geeko Buildathon Begins',
      icon: Code2,
      accent: '#38bdf8',
      tag: 'SPRINT',
      highlight: true,
    },
    {
      id: 'd1-4',
      time: '11:00 PM',
      title: 'Midnight Hot Dum Biryani & Red Bull',
      icon: Flame,
      accent: '#f59e0b',
      tag: 'FUEL',
    },
  ];

  const day2Milestones = [
    {
      id: 'd2-1',
      time: '01:00 AM',
      title: 'Midnight Bug Hunt & PS5 Arcade',
      icon: Gamepad2,
      accent: '#a855f7',
      tag: 'ARCADE',
    },
    {
      id: 'd2-2',
      time: '08:00 AM',
      title: 'South Indian Filter Coffee & Breakfast',
      icon: Coffee,
      accent: '#fbbf24',
      tag: 'RECHARGE',
    },
    {
      id: 'd2-3',
      time: '10:30 AM',
      title: 'Strict Buildathon Code Freeze',
      icon: ShieldAlert,
      accent: '#ef4444',
      tag: 'DEADLINE',
      highlight: true,
    },
    {
      id: 'd2-4',
      time: '11:00 AM',
      title: 'Top 6 Live Demos & ₹50,000 Podium',
      icon: Trophy,
      accent: '#eab308',
      tag: 'PODIUM',
      highlight: true,
    },
  ];

  return (
    <section
      id="schedule"
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto border-b border-[#173f35]/50 overflow-hidden select-none home-snap-section"
    >
      {/* Dynamic Cyber Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[400px] bg-[#73ba25]/[0.02] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[400px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none rounded-full" />

      {/* Vertically Centered Content Container */}
      <div className="relative z-10 flex flex-col justify-center my-auto w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
            <span>// 2 DAY TIMELINE &amp; FLIGHT MANIFEST //</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] text-white select-none mb-2"
            style={{
              textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
            }}
          >
            <span className="text-white">SUMMIT </span>
            <span className="text-[#73ba25]">DISPATCH</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
            Dual day schedule matrix at NST S VYASA campus from badge pickup to the ₹50,000 grand awards podium.
          </p>
        </div>

      {/* Dual Cyber Dispatch Consoles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative z-10 mb-6 max-w-5xl mx-auto items-stretch">

        {/* ===================================================================== */}
        {/* DAY 1 DISPATCH CONSOLE                                                */}
        {/* ===================================================================== */}
        <div 
          className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(115,186,37,0.18)] transition-all duration-300"
        >
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

          {/* 4 Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div>
            {/* Console Header Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-[#173f35]/60 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#73ba25] shadow-[0_0_10px_#73ba25] animate-pulse" />
                <span className="font-pixel text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  DAY 01 · SATURDAY, JAN 23
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#73ba25]/15 border border-[#73ba25]/30 text-[#8ee631] font-mono text-[9px] font-bold uppercase tracking-wider">
                09:30 AM DEPLOY
              </span>
            </div>

            {/* Title & Mission Callout */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-black text-white text-sm sm:text-base tracking-tight group-hover:text-[#a3e635] transition-colors">
                  Kickoff &amp; 20h Buildathon
                </h3>
                <span className="text-[9.5px] font-mono text-[#73ba25] font-semibold">
                  Phase 01 // INITIATE
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[10.5px] leading-relaxed mt-0.5">
                Arrival, track briefings, team formation, and the 20 hour overnight sprint lock in.
              </p>
            </div>

            {/* Vertical Cyber Timeline Track */}
            <div className="relative pl-5 space-y-2 my-2.5">
              {/* Vertical Laser Rail Line */}
              <div className="absolute left-[9px] top-2.5 bottom-2.5 w-[2px] bg-gradient-to-b from-[#73ba25] via-[#73ba25]/50 to-[#73ba25]/20 pointer-events-none" />

              {day1Milestones.map((m) => {
                const IconComponent = m.icon;
                const isHovered = hoveredMilestone === m.id;

                return (
                  <div
                    key={m.id}
                    onMouseEnter={() => {
                      sounds.hover?.();
                      setHoveredMilestone(m.id);
                    }}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className={`relative px-2.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      m.highlight
                        ? 'bg-gradient-to-r from-[#0d2616] via-[#091b10] to-black/70 border-[#73ba25]/50 shadow-[0_4px_18px_rgba(115,186,37,0.15)]'
                        : isHovered
                        ? 'bg-black/80 border-[#73ba25]/50 shadow-md -translate-x-0.5'
                        : 'bg-black/45 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {/* Node on Rail */}
                    <div 
                      className={`absolute -left-[18px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                        m.highlight || isHovered
                          ? 'bg-[#73ba25] border-white shadow-[0_0_8px_#73ba25] scale-110'
                          : 'bg-[#040806] border-[#73ba25]/60'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-black" />
                    </div>

                    {/* Left: Icon, Tag & Title */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div 
                        className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 shadow-inner"
                        style={{
                          backgroundColor: `${m.accent}15`,
                          borderColor: `${m.accent}40`,
                          color: m.accent
                        }}
                      >
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <span 
                        className="px-1.5 py-0.5 rounded font-mono text-[7.5px] font-extrabold uppercase tracking-wider shrink-0"
                        style={{
                          backgroundColor: `${m.accent}20`,
                          color: m.accent,
                          border: `1px solid ${m.accent}35`
                        }}
                      >
                        {m.tag}
                      </span>
                      <span className="font-heading font-bold text-white text-[11px] sm:text-xs tracking-tight truncate">
                        {m.title}
                      </span>
                    </div>

                    {/* Right: Time Pill */}
                    <span 
                      className="px-2 py-0.5 rounded font-mono text-[9.5px] font-bold shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${m.accent}18`,
                        border: `1px solid ${m.accent}35`,
                        color: m.accent
                      }}
                    >
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Console Telemetry Footer */}
          <div className="pt-2.5 mt-2 border-t border-[#173f35]/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25]" />
              <strong className="text-white">8 Sessions</strong> Manifest
            </span>
            <span className="px-2 py-0.5 rounded bg-[#73ba25]/15 border border-[#73ba25]/30 text-[#8ee631] font-semibold text-[8.5px] uppercase tracking-wider">
              Overnight Facilities Verified
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* DAY 2 DISPATCH CONSOLE                                                */}
        {/* ===================================================================== */}
        <div 
          className="group relative rounded-2xl bg-gradient-to-br from-[#07151f]/95 via-[#040e16]/95 to-[#020508]/95 backdrop-blur-2xl border border-cyan-500/35 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] transition-all duration-300"
        >
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

          {/* 4 Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          <div>
            {/* Console Header Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-cyan-900/50 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                <span className="font-pixel text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  DAY 02 · SUNDAY, JAN 24
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                UNTIL 02:00 PM
              </span>
            </div>

            {/* Title & Mission Callout */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-black text-white text-sm sm:text-base tracking-tight group-hover:text-cyan-300 transition-colors">
                  Code Freeze &amp; ₹50,000 Podium
                </h3>
                <span className="text-[9.5px] font-mono text-cyan-400 font-semibold">
                  Phase 02 // FINALE
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[10.5px] leading-relaxed mt-0.5">
                Bug triage, breakfast, final commit rush, top 6 live pitches, and trophies.
              </p>
            </div>

            {/* Vertical Cyber Timeline Track */}
            <div className="relative pl-5 space-y-2 my-2.5">
              {/* Vertical Laser Rail Line */}
              <div className="absolute left-[9px] top-2.5 bottom-2.5 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-amber-400/30 pointer-events-none" />

              {day2Milestones.map((m) => {
                const IconComponent = m.icon;
                const isHovered = hoveredMilestone === m.id;

                return (
                  <div
                    key={m.id}
                    onMouseEnter={() => {
                      sounds.hover?.();
                      setHoveredMilestone(m.id);
                    }}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className={`relative px-2.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      m.highlight
                        ? 'bg-gradient-to-r from-[#061824] via-[#05131d] to-black/70 border-cyan-500/40 shadow-[0_4px_18px_rgba(6,182,212,0.15)]'
                        : isHovered
                        ? 'bg-black/80 border-cyan-400/50 shadow-md -translate-x-0.5'
                        : 'bg-black/45 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {/* Node on Rail */}
                    <div 
                      className={`absolute -left-[18px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                        m.highlight || isHovered
                          ? 'bg-cyan-400 border-white shadow-[0_0_8px_#22d3ee] scale-110'
                          : 'bg-[#020508] border-cyan-400/60'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-black" />
                    </div>

                    {/* Left: Icon, Tag & Title */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div 
                        className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 shadow-inner"
                        style={{
                          backgroundColor: `${m.accent}15`,
                          borderColor: `${m.accent}40`,
                          color: m.accent
                        }}
                      >
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <span 
                        className="px-1.5 py-0.5 rounded font-mono text-[7.5px] font-extrabold uppercase tracking-wider shrink-0"
                        style={{
                          backgroundColor: `${m.accent}20`,
                          color: m.accent,
                          border: `1px solid ${m.accent}35`
                        }}
                      >
                        {m.tag}
                      </span>
                      <span className="font-heading font-bold text-white text-[11px] sm:text-xs tracking-tight truncate">
                        {m.title}
                      </span>
                    </div>

                    {/* Right: Time Pill */}
                    <span 
                      className="px-2 py-0.5 rounded font-mono text-[9.5px] font-bold shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${m.accent}18`,
                        border: `1px solid ${m.accent}35`,
                        color: m.accent
                      }}
                    >
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Console Telemetry Footer */}
          <div className="pt-2.5 mt-2 border-t border-cyan-900/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <strong className="text-white">6 Sessions</strong> Manifest
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold text-[8.5px] uppercase tracking-wider flex items-center gap-1">
              <span>🏆</span>
              <span>₹50,000 Cash Pool</span>
            </span>
          </div>
        </div>

      </div>

        {/* Cyber CTA Button */}
        <div className="text-center pt-1 relative z-10">
          <Link
            to="/schedule"
            onClick={() => sounds.click?.()}
            onMouseEnter={() => sounds.hover?.()}
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-[#040807] font-mono font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(115,186,37,0.35)] transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Full Interactive Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-[10px] text-slate-400 font-mono mt-2 flex items-center justify-center gap-2">
            <span>Explore 22 missions</span>
            <span className="text-slate-600">•</span>
            <span>6 tracks</span>
            <span className="text-slate-600">•</span>
            <span>Google Calendar export</span>
          </div>
        </div>
      </div>
    </section>
  );
}
