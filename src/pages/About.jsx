import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Shield,
  Heart,
  Github,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  Terminal,
  Cpu,
  CheckCircle2,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  Compass,
  Laptop,
  Wifi,
  Zap,
  Building2,
  FileCode,
  ShieldCheck,
  Check,
  ChevronRight,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function About() {
  const [activeTab, setActiveTab] = useState('all');

  const organizers = [
    {
      id: '01',
      name: 'Divyanshu Prakash',
      role: 'Core Organizer & Coordination Lead',
      tag: 'COORDINATION & FUNDING',
      duty: 'Overall event coordination, community liaison, funder communications, website architecture, and budget registers.',
      github: 'divyanshuprakas-h',
      email: 'divyanshu@opensuse.org',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      skills: ['Community Leadership', 'Finance Register', 'Web Architecture', 'Sponsor Relations'],
    },
    {
      id: '02',
      name: 'Dushyant Acharya',
      role: 'Operations & Logistics Lead',
      tag: 'VENUE & OPERATIONS',
      duty: 'Campus venue coordination, volunteer shift rosters, catering logistics, technical operations, and safety readiness.',
      github: 'dushyant-acharya',
      email: 'dushyant@opensuse.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skills: ['Venue Operations', '20h Overnight Logistics', 'Power & WiFi Infra', 'Volunteer Operations'],
    },
    {
      id: '03',
      name: 'Rithull Raj Kallat',
      role: 'Program & Judging Lead',
      tag: 'PROGRAM & JUDGING',
      duty: 'Summit agenda design, speaker curation, mentor coordination, Buildathon track rules, and final judging moderation.',
      github: 'rithull-raj',
      email: 'rithull@opensuse.org',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      skills: ['Track Curation', 'Judging Rubric', 'Upstream Mentoring', 'Speaker Program'],
    },
  ];

  const rosterFunctions = [
    {
      category: 'core',
      role: 'Core Organizers',
      count: 3,
      tag: 'Leadership',
      notes: 'Named decision owners, budget stewards, and primary escalation leads.',
      focus: ['Overall coordination', 'MoU enforcement', 'Budget execution'],
    },
    {
      category: 'volunteers',
      role: 'Student Operations Volunteers',
      count: 12,
      tag: 'Ground Ops',
      notes: 'Registration & badges (4), Room & AV control (2), Food & hydration (2), Expo area (2), Float support (2).',
      focus: ['Badge check in', 'Catering drops', 'Participant guidance'],
    },
    {
      category: 'mentors',
      role: 'Technical Mentors & Lab Facilitators',
      count: 6,
      tag: 'Engineering',
      notes: 'Starter lab guides, packaging experts, git masters, and rotating overnight debugging mentors.',
      focus: ['openSUSE MicroOS', 'Packaging & OBS', 'Architecture reviews'],
    },
    {
      category: 'media',
      role: 'Media & Documentation Team',
      count: 2,
      tag: 'Creative',
      notes: 'Pre cleared photo capture, livestreaming, and recap video production by 14:00 Sunday.',
      focus: ['Photo reconnaissance', 'Highlight reels', 'Social broadcasts'],
    },
    {
      category: 'speakers',
      role: 'Speakers & Visiting Evaluators',
      count: 3,
      tag: 'Advisory',
      notes: 'Keynote speakers, workshop leaders, and independent industry judges for the final demo sprint.',
      focus: ['Keynote addresses', 'Project evaluation', 'Podium ranking'],
    },
    {
      category: 'safety',
      role: 'Safety & Venue Marshals',
      count: 4,
      tag: 'Security & Medical',
      notes: 'Shift oversight, rest area security, badge verification, and 24/7 first aid station support.',
      focus: ['24/7 First Aid', 'Overnight check in', 'Incident response'],
    },
  ];

  const filteredRoster = activeTab === 'all'
    ? rosterFunctions
    : rosterFunctions.filter(rf => rf.category === activeTab);

  return (
    <div className="min-h-screen bg-[#030806] text-slate-300 font-mono select-none pt-24 sm:pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-[#73ba25]/[0.03] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-32 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-cyan-500/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* HEADER & SIGNATURE WEBSITE LOCKUP                                        */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Pulsing Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
            <span>// COMMUNITY DIRECTORY &amp; SUMMIT DOSSIER // OPENSUSE CONNECT '27</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
          </div>

          {/* 2-Tone Pixel Headline */}
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
            style={{
              textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
            }}
          >
            <span className="text-white">ABOUT </span>
            <span className="text-[#73ba25]">CONNECT '27</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
            A dedicated community driven open source summit uniting 250 students, developers, and Linux contributors at Newton School of Technology, S-VYASA University campus.
          </p>

          {/* Telemetry Counter Ribbon: Classy Obsidian Glass */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
              <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-white font-mono font-bold text-sm sm:text-base">250 Builders</div>
                <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">Accepted Cap</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-white font-mono font-bold text-sm sm:text-base">20h Sprint</div>
                <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">Overnight Lock In</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-white font-mono font-bold text-sm sm:text-base">₹50,000 Cash</div>
                <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">Bounty Vault</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-white font-mono font-bold text-sm sm:text-base">30 Crew</div>
                <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">Staff &amp; Mentors</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE PILLARS: MISSION & COLLEGE COLLABORATION                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Pillar 1: Mission */}
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(115,186,37,0.18)] transition-all duration-300">
            {/* Top Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

            {/* 4 Corner Cyber Brackets */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#173f35]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#73ba25]" />
                  <span className="font-pixel text-[8px] text-white uppercase tracking-wider">
                    01 // OUR MISSION &amp; PHILOSOPHY
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[8px] font-pixel text-[#8ee631] bg-[#73ba25]/15 border border-[#73ba25]/30 rounded-full">
                  FOSS FIRST
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide mb-1">
                  Learn. Build. Contribute.
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-mono mt-2">
                  openSUSE India · Bengaluru Connect 2027 creates an open, welcoming, and high impact environment for everyone from curious first year computer science students to seasoned Linux kernel, packaging, and infrastructure engineers.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 rounded-xl bg-black/60 border border-[#173f35] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white font-semibold block">Introduce Linux &amp; openSUSE to 250 curious builders</span>
                    <span className="text-[11px] text-slate-400 leading-normal">Hands on installations with Tumbleweed, MicroOS, and modern container workflows.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-[#173f35] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white font-semibold block">Target 60+ valid open source project submissions</span>
                    <span className="text-[11px] text-slate-400 leading-normal">Real working software prototypes built during the 20 hour hackathon sprint.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-[#173f35] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white font-semibold block">Target 10 documented upstream contributions</span>
                    <span className="text-[11px] text-slate-400 leading-normal">Direct pull requests into upstream repositories, openSUSE OBS packages, or kernel tooling.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-[#173f35] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white font-semibold block">30 Day post summit contributor follow up pipeline</span>
                    <span className="text-[11px] text-slate-400 leading-normal">Active mentorship channel to convert weekend hackathon projects into production open source tools.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#173f35]/60 flex items-center justify-between text-[11px] text-[#73ba25]">
              <span className="font-pixel text-[8px] text-slate-400">COMMUNITY ETHOS</span>
              <span className="font-mono text-[#8ee631] font-bold">100% Free · Zero Paywalls</span>
            </div>
          </div>

          {/* Pillar 2: College Collaboration */}
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-cyan-500/35 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] transition-all duration-300">
            {/* Top Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

            {/* 4 Corner Cyber Brackets */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#173f35]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-pixel text-[8px] text-white uppercase tracking-wider">
                    02 // INSTITUTIONAL COLLABORATION
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[8px] font-pixel text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-full">
                  OVERNIGHT MOU ACTIVE
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide mb-1">
                  Newton School of Technology
                </h2>
                <div className="text-xs text-cyan-400 font-semibold mt-0.5">
                  S-VYASA Deemed to be University · Sattva Global City Campus
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-mono mt-2">
                  Hosted in official institutional collaboration with Newton School of Technology (NST) at S-VYASA Deemed to be University, Mysore Road, Bengaluru. The university provides state of the art facilities at zero financial cost to the community.
                </p>
              </div>

              {/* In-Kind Contribution Matrix */}
              <div className="p-4 rounded-xl bg-black/60 border border-[#173f35] space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#173f35]/60 text-slate-300">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>250 Seat Main Auditorium &amp; Labs</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">Free Institutional Support</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#173f35]/60 text-slate-300">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dual Diesel Generator Backup (350+ rigs)</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">100% Power Redundancy</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#173f35]/60 text-slate-300">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Gigabit Fiber WiFi &amp; Local Package Mirrors</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">Dual ISP Mesh</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>20 Hour Overnight Stay Clearance</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">Fully Sanctioned</span>
                </div>
              </div>

              {/* Location Badge */}
              <div className="p-3.5 rounded-xl bg-[#091a13] border border-[#73ba25]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#73ba25] shrink-0" />
                  <div className="text-[11px] text-slate-200">
                    <strong className="text-white">Sattva Global City</strong>, Mysore Road, Bengaluru
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/T5t2S26jU8jeWt11A"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.click()}
                  className="text-[10px] font-pixel text-[#73ba25] hover:text-white flex items-center gap-1 underline shrink-0 transition-colors"
                >
                  <span>Google Maps &rarr;</span>
                </a>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#173f35]/60 flex items-center justify-between text-[11px]">
              <span className="font-pixel text-[8px] text-slate-400">VENUE SPECS</span>
              <Link
                to="/#venue"
                onClick={() => sounds.click()}
                className="text-[#73ba25] hover:text-white flex items-center gap-1 font-mono transition-colors font-bold"
              >
                <span>Explore Interactive Venue Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE LEADERSHIP TEAM DOSSIER                                             */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider">
              <span>// LEADERSHIP DOSSIER // ORGANIZING COMMITTEE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide">
              Core Leadership Team
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Named decision owners, track curators, budget stewards, and safety contacts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {organizers.map((org) => (
              <div
                key={org.id}
                className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(115,186,37,0.18)] transition-all duration-300"
              >
                {/* Top Specular Line */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

                {/* 4 Corner Cyber Brackets */}
                <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[8px] font-pixel bg-[#73ba25]/15 border border-[#73ba25]/30 text-[#8ee631] uppercase">
                      {org.tag}
                    </span>
                    <span className="font-pixel text-[8px] text-slate-500">
                      LEAD #{org.id}
                    </span>
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border-2 border-[#73ba25]/40 shadow-[0_0_15px_rgba(115,186,37,0.2)] shrink-0 group-hover:border-[#73ba25] transition-colors">
                      <img
                        src={org.avatar}
                        alt={org.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h3 className="font-heading font-black text-lg text-white group-hover:text-[#8ee631] transition-colors leading-snug">
                        {org.name}
                      </h3>
                      <div className="text-[11px] font-mono text-[#8ee631] font-semibold mt-0.5">
                        {org.role}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Active Lead on Duty</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Duty */}
                  <p className="text-xs text-slate-300 leading-relaxed font-mono mb-4">
                    {org.duty}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {org.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 text-slate-300 border border-[#173f35]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-3 border-t border-[#173f35]/60 flex items-center justify-between text-xs font-mono">
                  <a
                    href={`https://github.com/${org.github}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.hover()}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{org.github}</span>
                  </a>

                  <a
                    href={`mailto:${org.email}`}
                    onClick={() => sounds.click()}
                    className="flex items-center gap-1 text-[#73ba25] hover:text-[#8ee631] transition-colors text-[11px] font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 30 PERSON WORKING ROSTER & SAFETY MATRIX                                  */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 space-y-6 shadow-xl overflow-hidden">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#173f35]/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2">
                <span>SUMMIT OPERATIONS ALLOWANCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                30 Person Support &amp; Safety Roster
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Total Sanctioned Site Headcount: 280 (250 Hackathon Builders + 30 Operations Crew)
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
              {['all', 'core', 'volunteers', 'mentors', 'safety'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    sounds.click();
                    setActiveTab(tab);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors uppercase font-pixel text-[8px] cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#73ba25] text-black font-bold shadow-[0_0_10px_rgba(115,186,37,0.4)]'
                      : 'bg-black/60 text-slate-400 border border-[#173f35] hover:text-white hover:border-[#73ba25]/40'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Roster Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {filteredRoster.map((rf, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/60 border border-[#173f35] hover:border-[#73ba25]/50 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xs">{rf.role}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#73ba25]/20 text-[#8ee631] font-pixel text-[8px] border border-[#73ba25]/40">
                    {rf.count} CREW
                  </span>
                </div>

                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {rf.notes}
                </p>

                <div className="pt-2 border-t border-[#173f35]/50 flex flex-wrap gap-1">
                  {rf.focus.map((f, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded text-[9.5px] bg-[#071710] text-[#8ee631] border border-[#173f35]"
                    >
                      • {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Night Shift Policy Bar */}
          <div className="p-4 rounded-xl bg-[#091a13] border border-[#73ba25]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#73ba25] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Protected Night Shifts &amp; Safety Rotations:</strong>
                <span className="text-slate-300 text-[11px] leading-relaxed">
                  Overnight hours are divided into 4 hour shifts (22:00 to 02:00, 02:00 to 06:00, and 06:00 to 10:00). Each shift includes an assigned duty lead, two volunteers, and a technical mentor. No staff member is permitted to work uninterrupted 30 hour shifts.
                </span>
              </div>
            </div>
            <span className="shrink-0 px-3 py-1 rounded-full bg-black/60 text-[#8ee631] border border-[#73ba25]/40 text-[9px] font-pixel">
              MOU COMPLIANT
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CODE OF CONDUCT & 24/7 INCIDENT ESCALATION                               */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 space-y-5 shadow-xl overflow-hidden">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#73ba25]/15 border border-[#73ba25]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(115,186,37,0.15)] text-[#73ba25]">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[8px] uppercase tracking-wider text-[#73ba25]">
                  PARTICIPANT SAFEGUARDING &amp; ETHICS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[9px] font-mono">
                  24/7 ON CALL
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                Code of Conduct &amp; Safety Commitment
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 font-mono leading-relaxed">
                openSUSE India is committed to providing a safe, respectful, harassment free experience for all attendees, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
              <strong className="text-white block font-semibold mb-1">Overnight Age Clearance:</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Strictly 18+ for overnight hackathon participation unless separately pre cleared with institutional guardian safeguarding.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
              <strong className="text-white block font-semibold mb-1">Confidential Escalation:</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Two dedicated organizers maintain 24/7 emergency availability on ground. All reports are handled with complete confidentiality and immediate action.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
              <strong className="text-white block font-semibold mb-1">Zero Tolerance Policy:</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Violations of community safety result in immediate badge revocation, removal from campus grounds, and upstream banishment.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#173f35]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span>Need immediate organizer contact during event hours?</span>
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@opensuse.org"
                onClick={() => sounds.click()}
                className="text-[#73ba25] hover:text-[#8ee631] underline font-bold"
              >
                contact@opensuse.org
              </a>
              <span>·</span>
              <Link
                to="/#contact-us"
                onClick={() => sounds.click()}
                className="text-[#73ba25] hover:text-[#8ee631] underline font-bold"
              >
                Open Dispatch Terminal &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
