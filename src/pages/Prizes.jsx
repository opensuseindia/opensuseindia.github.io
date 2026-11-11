import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  Shirt,
  CheckCircle2,
  FileText,
  ShoppingBag,
  ArrowRight,
  Gamepad2,
  Bug,
  Compass,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function Prizes() {
  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-16 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-24 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-purple-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* HEADER: WEBSITE SIGNATURE PIXEL & THEME LOCKUP            */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        {/* Pulsing Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#130d06] border border-amber-500/40 text-amber-400 font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>// OFFICIAL AWARDS &amp; BOUNTY VAULT // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
        </div>

        {/* 2-Tone Pixel Headline */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #78350f, 4px 4px 0 #451a03',
          }}
        >
          <span className="text-white">SUMMIT </span>
          <span className="text-amber-400">PRIZES</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Grand cash bounties, bespoke openSUSE champion trophies, official 2027 winner jerseys, and verifiable cryptographic certificates.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY RIBBON: 4 CORE HONORS                          */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">₹50,000 Cash</div>
            <div className="text-slate-400 text-[10px] font-mono">Podium Pool</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">3 Custom Gold</div>
            <div className="text-slate-400 text-[10px] font-mono">Champion Trophies</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#160d26]/90 via-[#0e071a]/90 to-[#07030e]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">₹6,000 Cash</div>
            <div className="text-slate-400 text-[10px] font-mono">Side Bounties Pool</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">25 Reward Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Official Merch Honors</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN AWARDS: 3 SIGNATURE CYBER CARDS                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10 items-stretch">
        {/* 01: Buildathon Podium (Amber / Gold) */}
        <div className="group relative rounded-2xl bg-gradient-to-br from-[#140e06]/95 via-[#0a0703]/95 to-[#040301]/95 backdrop-blur-2xl border border-amber-500/35 p-6 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] transition-all duration-300">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />

          {/* 4 Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-pixel text-[8px] uppercase tracking-wider border border-amber-500/35">
                01 // BUILDATHON PODIUM
              </span>
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide mb-1">
              Win Up to ₹50,000
            </h3>
            <span className="text-xs font-mono text-slate-400 block mb-5 leading-relaxed">
              Grand Cash Pool for Champion Buildathon Squads
            </span>

            <ul className="space-y-3 font-mono text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">1st Place Grand Champions:</strong> Top cash prize, Gold openSUSE Trophy, upstream incubation</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">2nd Place Runners Up:</strong> Cash bounty, Silver openSUSE Trophy &amp; community spotlight</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">3rd Place Bronze Squad:</strong> Cash bounty, Bronze openSUSE Trophy &amp; contributor gear</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">All Podium Members:</strong> Official printed openSUSE champion reward jerseys</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3.5 border-t border-amber-500/30 flex items-center justify-between text-[11px] font-mono text-amber-300">
            <span>Day 2 Grand Finale (14:35 IST)</span>
            <span className="font-bold">Main Stage</span>
          </div>
        </div>

        {/* 02: Arcade & Gaming Bounties (Purple) */}
        <div className="group relative rounded-2xl bg-gradient-to-br from-[#140b22]/95 via-[#0b0513]/95 to-[#040207]/95 backdrop-blur-2xl border border-purple-500/35 p-6 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.18)] transition-all duration-300">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent pointer-events-none" />

          {/* 4 Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-purple-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-purple-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-purple-400 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-pixel text-[8px] uppercase tracking-wider border border-purple-500/35">
                02 // PS5 ARCADE TOURNAMENTS
              </span>
              <Gamepad2 className="w-5 h-5 text-purple-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide mb-1">
              Arcade Bounties
            </h3>
            <span className="text-xs font-mono text-slate-400 block mb-5 leading-relaxed">
              Competitive PS5 4K 120Hz Tournament Cash &amp; Prizes
            </span>

            <ul className="space-y-3 font-mono text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Tekken 8 Midnight Cup:</strong> Single elimination knockout tournament cash bounty</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Mortal Kombat 1v1 Arena:</strong> Best of 3 fatalities bracket winner bounties</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">4 Retro Minigames:</strong> Instant XP &amp; cash bounties on the live leaderboard</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Arcade Champions:</strong> 4 Exclusive winner reward jerseys</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3.5 border-t border-purple-500/30 flex items-center justify-between text-[11px] font-mono text-purple-300">
            <span>Saturday Midnight Downtime</span>
            <span className="font-bold">Arcade Lounge</span>
          </div>
        </div>

        {/* 03: Contributor Gear (openSUSE Green) */}
        <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(115,186,37,0.18)] transition-all duration-300">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

          {/* 4 Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-[#73ba25]/20 text-[#a3e635] font-pixel text-[8px] uppercase tracking-wider border border-[#73ba25]/35">
                03 // CHAMPION REWARD GEAR
              </span>
              <Award className="w-5 h-5 text-[#73ba25]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide mb-1">
              25 Reward Jerseys
            </h3>
            <span className="text-xs font-mono text-slate-400 block mb-5 leading-relaxed">
              Limited Edition openSUSE Bengaluru Connect 2027 Merch
            </span>

            <ul className="space-y-3 font-mono text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                <span><strong className="text-white">Custom Champion Print:</strong> High quality breathable dry fit competition jersey</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                <span><strong className="text-white">NFC Smart Event Badge:</strong> Encrypted RFID pass for meal tokens &amp; venue access</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                <span><strong className="text-white">Cyber Stickers &amp; Swag Kit:</strong> Premium holographic laptop decals &amp; lanyard</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                <span><strong className="text-white">Verifiable Contributor Hash:</strong> Cryptographically proven summit credentials</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3.5 border-t border-[#73ba25]/30 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Badge Check In &amp; Ceremony</span>
            <span className="font-bold text-[#73ba25]">All Builders</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FINALISTS & CERTIFICATES: 2 COLUMN CYBER HUD              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative z-10">
        {/* Top 6 Finalists */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#120a1c]/90 via-[#0a0510]/90 to-[#040207]/90 border border-purple-500/30 p-6 shadow-xl overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent pointer-events-none" />
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400 pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400 pointer-events-none" />

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-pixel text-[8px] text-purple-400 uppercase tracking-wider">PODIUM PITCH PRIVILEGE</div>
              <h3 className="font-heading font-black text-white text-lg sm:text-xl">
                Top 6 Grand Finalists
              </h3>
            </div>
          </div>
          <p className="text-slate-300 text-xs font-mono leading-relaxed mb-3">
            Finalist squads earn a dedicated 7 minute live pitch slot on the main auditorium stage before international judges and attendees, plus official finalist recognition.
          </p>
          <div className="pt-2 border-t border-purple-900/40 text-[11px] font-mono text-purple-300/80">
            Official recognition documented in openSUSE summit records.
          </div>
        </div>

        {/* All 250 Accepted Builders */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 p-6 shadow-xl overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/70 to-transparent pointer-events-none" />
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#73ba25]/20 text-[#73ba25] border border-[#73ba25]/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-pixel text-[8px] text-[#73ba25] uppercase tracking-wider">CRYPTOGRAPHIC CREDENTIAL</div>
              <h3 className="font-heading font-black text-white text-lg sm:text-xl">
                All 250 Accepted Builders
              </h3>
            </div>
          </div>
          <p className="text-slate-300 text-xs font-mono leading-relaxed mb-3">
            Verifiable digital participation certificates issued after valid submission, attendance, and code verification checks on the openSUSE ledger.
          </p>
          <div className="pt-2 border-t border-[#73ba25]/20 text-[11px] font-mono text-[#8ee631]/80">
            Includes verifiable cryptographic hash and high resolution vector download.
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SIDE ACTIVITIES CASH POOL: CYBER CARD                     */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-[#020503]/95 border border-[#173f35] p-6 sm:p-8 mb-12 shadow-xl overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/50 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25]/70 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25]/70 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#173f35]/60">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
              <span>// EXTRA BOUNTIES // SIDE ACTIVITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              ₹6,000 Rewards Pool
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Allocated across Bug Hunt, Arcade &amp; Quest challenges
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 font-bold text-base">₹2,000</span>
              <Bug className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-white font-bold mb-1">Midnight Bug Hunt</div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              Rookie &amp; Expert top solutions + 2 Reward Jerseys
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 font-bold text-base">₹2,500</span>
              <Gamepad2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-white font-bold mb-1">Geeko Arcade</div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              Terminal Escape, Trivia, Match, Find the Geeko + 4 Reward Jerseys
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-bold text-base">₹1,500</span>
              <Compass className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-white font-bold mb-1">Geeko Quest</div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              Top verified quest passport achievers + 2 Reward Jerseys
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 25 REWARD JERSEYS BREAKDOWN: SIGNATURE ALLOCATION CARD    */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 mb-12 shadow-xl overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="flex items-start gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-[#73ba25]/20 text-[#73ba25] shrink-0 border border-[#73ba25]/30">
            <Shirt className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2">
              <span>OFFICIAL COMPETITION HONORS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Official Reward Jersey Allocation
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mt-2 max-w-2xl">
              Exactly 25 custom printed openSUSE Bengaluru Connect 2027 reward jerseys are reserved exclusively as competition awards for top builders and contributors:
            </p>
          </div>
        </div>

        {/* 25 Jerseys Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs mb-8">
          <div className="p-3.5 rounded-xl bg-black/60 border border-[#73ba25]/20 text-center">
            <div className="text-xl font-bold text-[#8ee631] mb-0.5">12</div>
            <div className="text-[11px] text-white">Podium Squads</div>
            <div className="text-[10px] text-slate-500">4 per team max</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 text-center">
            <div className="text-xl font-bold text-amber-400 mb-0.5">2</div>
            <div className="text-[11px] text-white">Bug Hunt</div>
            <div className="text-[10px] text-slate-500">Rookie &amp; Expert</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/20 text-center">
            <div className="text-xl font-bold text-purple-400 mb-0.5">4</div>
            <div className="text-[11px] text-white">Arcade Games</div>
            <div className="text-[10px] text-slate-500">4 game winners</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-blue-500/20 text-center">
            <div className="text-xl font-bold text-blue-400 mb-0.5">2</div>
            <div className="text-[11px] text-white">Quest Passport</div>
            <div className="text-[10px] text-slate-500">Top achievers</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-center">
            <div className="text-xl font-bold text-slate-300 mb-0.5">5</div>
            <div className="text-[11px] text-white">Community Buffer</div>
            <div className="text-[10px] text-slate-500">Special honors</div>
          </div>
        </div>

        {/* Merch Store Callout */}
        <div className="p-4 rounded-xl bg-black/70 border border-[#73ba25]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-300">
            Want an official openSUSE Bengaluru Connect 2027 Jersey? Pre order yours today in the official Merch Store!
          </div>
          <Link
            to="/merch"
            onClick={() => sounds.click()}
            className="px-5 py-2.5 rounded-xl bg-[#73ba25] hover:bg-[#8ee631] text-black font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(115,186,37,0.3)]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pre order Official Merchandise</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
