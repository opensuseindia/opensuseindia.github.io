import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Shield,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Terminal,
  Zap,
  Info,
  Layers,
  Award,
  Share2,
  Gamepad2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sounds } from '../../lib/sound';

export default function EventDetailsModal({ event, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sounds.click();
        onClose();
      }
    };
    if (isOpen) {
      sounds.terminalBeep();
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const isBuildathon =
    event.category?.toLowerCase() === 'hackathon' ||
    event.category?.toLowerCase() === 'buildathon' ||
    event.name?.toLowerCase().includes('buildathon') ||
    event.name?.toLowerCase().includes('track');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#020504]/94 backdrop-blur-2xl border border-white/12 shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.15)] overflow-hidden flex flex-col my-auto max-h-[94vh]"
          style={{
            clipPath:
              'polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)',
          }}
        >
          {/* Specular Top Line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30" />
          {/* 4 Cyber Corner Reticles */}
          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none z-30" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none z-30" />
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#73ba25] pointer-events-none z-30" />
          <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#73ba25] pointer-events-none z-30" />

          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-25" />

          {/* 1. TOP TERMINAL MISSION HEADER BAR */}
          <div className="relative px-4 sm:px-6 py-2.5 bg-[#020403]/90 border-b border-white/10 flex items-center justify-between font-mono text-[11px] z-30">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-xs bg-[#73ba25] animate-pulse" />
              <span className="font-pixel text-[8.5px] text-[#73ba25] uppercase tracking-wider">
                MISSION DOSSIER
              </span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400 font-mono text-[10px]">
                SYS.ID: {event.id ? event.id.toUpperCase() : 'EVT-OP-2027'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#05180f] border border-[#73ba25]/40 text-[9px] text-[#73ba25] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>STATUS: ACTIVE ENROLLMENT</span>
              </div>

              {/* Tactile Close Key */}
              <button
                onClick={() => {
                  sounds.click();
                  onClose();
                }}
                className="group px-2.5 py-1 rounded-xs bg-black/80 hover:bg-[#73ba25] text-slate-300 hover:text-black border border-[#173f35] hover:border-[#73ba25] transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                title="Close Dossier (ESC)"
              >
                <span className="font-pixel text-[8px]">ESC</span>
                <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* 2. EVENT HERO DOSSIER BANNER */}
          <div className="relative p-5 sm:p-7 border-b border-[#173f35] bg-gradient-to-r from-[#0d271c] via-[#071912] to-[#040a08] z-30">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-xs bg-[#73ba25]/20 border border-[#73ba25] text-[#a3e635] font-pixel text-[8.5px] uppercase tracking-wider shadow-[0_0_8px_rgba(115,186,37,0.3)]">
                [ {event.badge || event.category.toUpperCase()} ]
              </span>
              <span className="px-2.5 py-0.5 rounded-xs bg-[#00f0ff]/15 border border-[#00f0ff]/70 text-[#00f0ff] font-pixel text-[8.5px] uppercase tracking-wider shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                [ {event.days ? event.days.join(' & ') : 'DAY 1'} ]
              </span>
              <span className="px-2.5 py-0.5 rounded-xs bg-white/5 border border-white/15 text-slate-300 font-mono text-[9.5px]">
                {event.type}
              </span>
            </div>

            {/* Main Title & Venue */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-pixel text-white leading-tight max-w-3xl"
              style={{
                textShadow: '2px 2px 0 #05140b, 0 0 20px rgba(115,186,37,0.35)',
              }}
            >
              {event.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                <span>{event.venue || 'Newton School of Technology, Bengaluru'}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Host: openSUSE India & NST</span>
            </div>

            {/* 3. KEY METRICS BAR (Balanced, No Overflow, Generous Spacing) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-5 font-mono text-xs">
              {/* Metric 1: TEAM SIZE */}
              <div
                className="relative p-2.5 sm:p-3 bg-[#030d08]/90 border border-[#1b4d2e] flex items-center gap-2.5 overflow-hidden group hover:border-[#73ba25] transition-colors"
                style={{
                  clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
                }}
              >
                <div className="p-2 rounded-xs bg-[#73ba25]/15 border border-[#73ba25]/40 text-[#73ba25] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] text-slate-400 font-pixel tracking-wider">TEAM SIZE</div>
                  <div className="text-white font-bold text-xs truncate mt-0.5">
                    {isBuildathon ? '1 to 4 Members' : 'Individual'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">Solo or Squad</div>
                </div>
              </div>

              {/* Metric 2: SCHEDULE */}
              <div
                className="relative p-2.5 sm:p-3 bg-[#030d08]/90 border border-[#1b4d2e] flex items-center gap-2.5 overflow-hidden group hover:border-[#00f0ff] transition-colors"
                style={{
                  clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
                }}
              >
                <div className="p-2 rounded-xs bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] text-slate-400 font-pixel tracking-wider">SCHEDULE</div>
                  <div className="text-[#00f0ff] font-bold text-xs truncate mt-0.5">
                    {event.days ? event.days.join(' & ') : 'Day 1'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {isBuildathon ? 'Overnight Sprint' : 'Auditorium Track'}
                  </div>
                </div>
              </div>

              {/* Metric 3: PRIZE POOL */}
              <div
                className="relative p-2.5 sm:p-3 bg-[#030d08]/90 border border-[#1b4d2e] flex items-center gap-2.5 overflow-hidden group hover:border-amber-400 transition-colors"
                style={{
                  clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
                }}
              >
                <div className="p-2 rounded-xs bg-amber-500/15 border border-amber-500/40 text-amber-400 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] text-slate-400 font-pixel tracking-wider">PRIZE REWARD</div>
                  <div className="text-amber-300 font-bold text-xs truncate mt-0.5">
                    {event.prizeAmountINR ? `₹${event.prizeAmountINR.toLocaleString('en-IN')} Pool` : (event.prize || 'Knowledge Sharing')}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {event.prizeAmountINR ? '+ Trophies & Swag' : 'Exclusive Badges'}
                  </div>
                </div>
              </div>

              {/* Metric 4: ELIGIBILITY */}
              <div
                className="relative p-2.5 sm:p-3 bg-[#030d08]/90 border border-[#1b4d2e] flex items-center gap-2.5 overflow-hidden group hover:border-purple-400 transition-colors"
                style={{
                  clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
                }}
              >
                <div className="p-2 rounded-xs bg-purple-500/15 border border-purple-500/40 text-purple-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] text-slate-400 font-pixel tracking-wider">ELIGIBILITY</div>
                  <div className="text-white font-bold text-xs truncate mt-0.5">Open to All</div>
                  <div className="text-[10px] text-slate-400 truncate">Students & Devs</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. ARCADE FUNCTION TABS [ F1 - F4 ] */}
          <div className="flex items-center gap-2 px-4 sm:px-6 pt-2.5 pb-2 border-b border-[#173f35] bg-[#020704] font-mono text-xs overflow-x-auto select-none z-30">
            {[
              { id: 'overview', keyLabel: 'F1', label: 'OVERVIEW' },
              { id: 'timeline', keyLabel: 'F2', label: 'TIMELINE' },
              { id: 'eligibility', keyLabel: 'F3', label: 'RULES' },
              { id: 'prizes', keyLabel: 'F4', label: 'PRIZES & SWAG' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.click();
                  setActiveTab(tab.id);
                }}
                className={`relative px-3 py-1.5 font-pixel text-[9px] uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-[#0d2a1c] to-[#04140c] border-[#73ba25] text-[#73ba25] shadow-[0_0_12px_rgba(115,186,37,0.3)]'
                    : 'bg-black/50 border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                }}
              >
                <span className="font-mono text-[8px] px-1 py-0.5 rounded-xs bg-black/60 border border-current text-slate-400">
                  {tab.keyLabel}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 5. TAB CONTENT BODY */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-5 font-mono text-xs text-slate-200 flex-1 z-30">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-4 font-sans text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xs bg-black/40 border border-[#173f35]">
                  <div className="font-pixel text-[9px] text-[#73ba25] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>// 01. MISSION BRIEFING & OBJECTIVES</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans text-sm">
                    {event.description}
                  </p>
                </div>

                {isBuildathon && (
                  <div className="p-4 rounded-xs bg-[#061910] border border-[#173f35] font-mono text-xs space-y-2.5">
                    <div className="font-pixel text-[9px] text-geeko-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>// 02. BUILDATHON TRACK ARCHITECTURE & SCOPE</span>
                    </div>
                    <p className="text-slate-300 font-sans leading-relaxed">
                      Builders choose one primary track and declare their project scope. Up to 83 teams of 3 to 4 builders compete across a unified judging standard with technical mentors on standby.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="px-2.5 py-1 rounded-xs bg-black/70 border border-[#73ba25]/60 text-geeko-300 font-mono font-bold text-[10px]">
                        Unified 5 Point Rubric
                      </span>
                      <span className="px-2.5 py-1 rounded-xs bg-black/70 border border-[#00f0ff]/60 text-[#00f0ff] font-mono font-bold text-[10px]">
                        Top 6 Grand Finalists
                      </span>
                      <span className="px-2.5 py-1 rounded-xs bg-black/70 border border-amber-500/60 text-amber-300 font-mono font-bold text-[10px]">
                        ₹50,000 Cash Pool
                      </span>
                    </div>
                  </div>
                )}

                {/* Organizer SPOC */}
                {event.spoc && (
                  <div className="p-3.5 rounded-xs bg-black/50 border border-[#173f35] flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00f0ff]">&gt;_</span>
                      <span className="text-slate-400">Track SPOC / Coordinator:</span>
                    </div>
                    <span className="text-[#a3e635] font-bold">{event.spoc}</span>
                  </div>
                )}
              </div>
            )}

            {/* 2. STAGES & TIMELINE TAB */}
            {activeTab === 'timeline' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="font-pixel text-[9px] text-[#73ba25] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>// EVENT FLOW & CRITICAL MILESTONES</span>
                </div>
                {[
                  {
                    stage: 'Stage 01: Application & Team Confirmation',
                    time: 'Pre Event · Limited to 250 Participants',
                    desc: 'Submit project intent and team details. Rolling verification until 250 verified participant places are filled.',
                    status: 'ACTIVE NOW',
                    color: 'text-geeko-400 border-geeko-500/60 bg-geeko-500/10',
                  },
                  {
                    stage: 'Stage 02: Campus Check In & Badge Collection',
                    time: 'Day 1 · 09:30 to 11:00 IST',
                    desc: 'Check in at Newton School of Technology, pick up your hacker kit, Wi-Fi credentials, and configure your dev environment.',
                    status: 'UPCOMING',
                    color: 'text-[#00f0ff] border-[#00f0ff]/60 bg-[#00f0ff]/10',
                  },
                  {
                    stage: 'Stage 03: 20 Hour Buildathon Hackathon Sprint',
                    time: 'Day 1 14:30 to Day 2 10:30 IST',
                    desc: 'Continuous overnight building. Mentors review code, high tea, dinner, and midnight snacks provided. Quiet rest zones open.',
                    status: 'FLAGSHIP',
                    color: 'text-amber-400 border-amber-500/60 bg-amber-500/10',
                  },
                  {
                    stage: 'Stage 04: Code Freeze & Final Project Submissions',
                    time: 'Day 2 · 10:30 IST Sharp',
                    desc: 'Strict cutoff for Git repositories, OBS packages, and demo videos. Preliminary scores computed under the unified 5 point rubric.',
                    status: 'DEADLINE',
                    color: 'text-red-400 border-red-500/60 bg-red-500/10',
                  },
                  {
                    stage: 'Stage 05: Top 6 Stage Pitches & Grand Awards',
                    time: 'Day 2 · 11:00 to 14:00 IST',
                    desc: 'Top 6 finalist stage pitches in Main Auditorium, followed by grand awards ceremony (₹50k cash prizes, trophies, and 25 reward T-shirts).',
                    status: 'FINALE',
                    color: 'text-emerald-400 border-emerald-500/60 bg-emerald-500/10',
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xs bg-black/60 border border-[#173f35] flex items-start justify-between gap-3 hover:border-[#73ba25]/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-white text-xs">{s.stage}</div>
                      <div className="text-[11px] text-slate-300 font-sans leading-relaxed">{s.desc}</div>
                      <div className="text-[10px] font-mono text-slate-400">{s.time}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-xs text-[8.5px] font-pixel border shrink-0 ${s.color}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 3. ELIGIBILITY & RULES TAB */}
            {activeTab === 'eligibility' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="font-pixel text-[9px] text-[#73ba25] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>// WHO CAN PARTICIPATE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 font-sans text-xs">
                    <div className="p-2.5 rounded-xs bg-black/50 border border-[#173f35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0" />
                      <span>Undergraduate & Postgraduate Students</span>
                    </div>
                    <div className="p-2.5 rounded-xs bg-black/50 border border-[#173f35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0" />
                      <span>Engineering & Computer Science Students</span>
                    </div>
                    <div className="p-2.5 rounded-xs bg-black/50 border border-[#173f35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0" />
                      <span>Open Source Developers & Sysadmins</span>
                    </div>
                    <div className="p-2.5 rounded-xs bg-black/50 border border-[#173f35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0" />
                      <span>Freshers & Working Professionals</span>
                    </div>
                  </div>
                </div>

                {event.rules && event.rules.length > 0 && (
                  <div className="border border-geeko-500/40 bg-[#020704] p-4 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-geeko-400 font-pixel text-[9px]">
                      <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>TRACK GUIDELINES & SPECIFICATIONS</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                      {event.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-geeko-400 font-mono text-[10px] mt-0.5">[{idx + 1}]</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3.5 rounded-xs bg-black/60 border border-[#173f35] font-sans text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white mb-1">Campus Logistics & Facilities:</div>
                  <div>• Campus Wi-Fi load tested for 350+ concurrent devices.</div>
                  <div>• Power sockets and backup generators active throughout the 20 hours.</div>
                  <div>• Quiet overnight rest zones with bean bags available for all 250 participants.</div>
                  <div>• Subsidized high tea, dinner, midnight snacks, and breakfast provided.</div>
                </div>
              </div>
            )}

            {/* 4. PRIZES & SWAG TAB */}
            {activeTab === 'prizes' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="font-pixel text-[9px] text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>// BOUNTY & REWARDS SPECIFICATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xs bg-gradient-to-b from-amber-500/20 to-black/70 border border-amber-500/60 text-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="font-pixel text-[9px] text-amber-400">BUILDATHON PODIUM</div>
                    <div className="text-lg font-extrabold text-white mt-1">Win Up to ₹50,000</div>
                    <div className="text-[10px] text-slate-300 mt-1">Gold Chameleon Trophies + Swag</div>
                  </div>

                  <div className="p-4 rounded-xs bg-gradient-to-b from-purple-500/20 to-black/70 border border-purple-500/60 text-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="font-pixel text-[9px] text-purple-300">ARCADE TOURNAMENTS</div>
                    <div className="text-lg font-extrabold text-white mt-1">Arcade Bounties</div>
                    <div className="text-[10px] text-slate-300 mt-1">Tekken 8 &amp; Mortal Kombat Cash</div>
                  </div>

                  <div className="p-4 rounded-xs bg-gradient-to-b from-[#73ba25]/20 to-black/70 border border-[#73ba25]/60 text-center shadow-[0_0_15px_rgba(115,186,37,0.2)]">
                    <Award className="w-8 h-8 text-[#a3e635] mx-auto mb-2" />
                    <div className="font-pixel text-[9px] text-[#a3e635]">CONTRIBUTOR GEAR</div>
                    <div className="text-lg font-extrabold text-white mt-1">25 Reward Jerseys</div>
                    <div className="text-[10px] text-slate-300 mt-1">Limited Edition openSUSE Kits</div>
                  </div>
                </div>

                <div className="p-4 rounded-xs bg-[#06180f] border border-[#173f35] flex items-center justify-between gap-4 font-sans text-xs">
                  <div>
                    <div className="font-bold text-white mb-1">25 Exclusive Contributor Reward Jerseys</div>
                    <div className="text-slate-300">
                      Reserved strictly for top finalist teams, side quest champions, and outstanding pull request authors.
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-geeko-400 shrink-0" />
                </div>
              </div>
            )}
          </div>

          {/* 6. FOOTER ACTION BAR (Unstop CTA Match) */}
          <div className="p-4 sm:p-5 border-t border-[#173f35] bg-[#020704] flex flex-col sm:flex-row items-center justify-between gap-3 z-30">
            {/* Left: Registration Telemetry Radar */}
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-slate-400 font-pixel text-[8.5px]">REGISTRATION RADAR:</span>
                <span className="text-[#a3e635] font-bold font-mono">172 / 250 Places Claimed</span>
              </div>
              <div className="w-full sm:w-56 h-1.5 bg-black/80 rounded-full border border-[#173f35] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#73ba25] via-emerald-400 to-[#00f0ff] w-[68%]" />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to={event.actionLink || '/register'}
                onClick={() => {
                  sounds.success();
                  onClose();
                }}
                className="group relative flex-1 sm:flex-none px-6 py-3 inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer overflow-hidden border border-[#a3e635] bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#73ba25] hover:from-[#82cf2d] hover:to-[#95e638] text-[#040807] font-pixel text-[9.5px] font-bold tracking-wider shadow-[0_3px_0_#2b5714,0_0_24px_rgba(115,186,37,0.5)] hover:shadow-[0_3px_0_#2b5714,0_0_35px_rgba(115,186,37,0.75)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#2b5714] whitespace-nowrap select-none"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                <span>⚡</span>
                <span>APPLY / REGISTER NOW</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => {
                  sounds.click();
                  onClose();
                }}
                className="px-4 py-3 bg-[#06140e] hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs border border-[#173f35] hover:border-[#73ba25]/70 transition-colors cursor-pointer shadow-[0_2px_0_#0a2216]"
                style={{
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
