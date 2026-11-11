import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  ShieldAlert,
  Cpu,
  Monitor,
  GitPullRequest,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  Trophy,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../lib/sound';
import { INITIAL_TRACKS } from '../data/tracksData';

export default function Tracks() {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  useEffect(() => {
    fetch('/api/tracks')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTracks(data);
        }
      })
      .catch((err) => {
        // Fallback is already initialized cleanly with INITIAL_TRACKS
        console.debug('Using verified fallback tracks data:', err);
      });
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Monitor': return Monitor;
      case 'GitPullRequest': return GitPullRequest;
      case 'Sparkles': return Sparkles;
      default: return Terminal;
    }
  };

  const filteredTracks = tracks.filter((t) => {
    if (selectedDifficulty === 'ALL') return true;
    if (selectedDifficulty === 'BEGINNER') return t.difficulty?.toLowerCase().includes('beginner');
    if (selectedDifficulty === 'ADVANCED') return t.difficulty?.toLowerCase().includes('advanced');
    if (selectedDifficulty === 'ALL_LEVELS') return t.difficulty?.toLowerCase().includes('all');
    return true;
  });

  const getDifficultyBadge = (difficulty = '') => {
    const diff = difficulty.toLowerCase();
    if (diff.includes('beginner')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Beginner to Intermediate
        </span>
      );
    }
    if (diff.includes('advanced')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Intermediate to Advanced
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-sky-950/60 border border-sky-500/40 text-sky-400">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        All Experience Levels
      </span>
    );
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Header Section (Matching Summit Dispatch / Timeline Aesthetic) */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071910] border border-[#173f35] text-[#73ba25] font-mono text-[10px] tracking-widest uppercase mb-3.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-ping" />
          • 20 HOUR BUILDATHON DIVISION MATRIX
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-pixel text-white uppercase tracking-wider leading-tight">
          BUILDATHON <span className="text-[#73ba25]" style={{ textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910' }}>TRACKS</span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
          Squads choose one primary track and declare project scope. Dedicated mentors guide builders across a unified judging standard with ₹50,000 cash prizes.
        </p>
      </div>

      {/* 2. Hackathon Telemetry Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
        <div className="p-3 rounded-lg bg-[#040e08]/90 border border-[#173f35] flex items-center gap-3">
          <div className="p-2 rounded bg-[#0b2616] text-[#73ba25]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-sm">6 Official Tracks</div>
            <div className="text-slate-400 text-[10.5px] font-mono">Specialized Domains</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#040e08]/90 border border-[#173f35] flex items-center gap-3">
          <div className="p-2 rounded bg-[#0b2616] text-[#73ba25]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-sm">83 Teams Pool</div>
            <div className="text-slate-400 text-[10.5px] font-mono">3 to 4 Builders / Team</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#040e08]/90 border border-[#173f35] flex items-center gap-3">
          <div className="p-2 rounded bg-[#0b2616] text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-sm">₹50,000 Cash</div>
            <div className="text-slate-400 text-[10.5px] font-mono">Grand Podium Pool</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#040e08]/90 border border-[#173f35] flex items-center gap-3">
          <div className="p-2 rounded bg-[#0b2616] text-emerald-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-sm">20h Overnight</div>
            <div className="text-slate-400 text-[10.5px] font-mono">Continuous Hackathon</div>
          </div>
        </div>
      </div>

      {/* 3. Difficulty Filter Cartridges */}
      <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
        {[
          { key: 'ALL', label: 'All 6 Tracks', count: 6 },
          { key: 'BEGINNER', label: 'Beginner Friendly', count: 1 },
          { key: 'ADVANCED', label: 'Intermediate to Advanced', count: 2 },
          { key: 'ALL_LEVELS', label: 'All Levels', count: 3 },
        ].map((tab) => {
          const isActive = selectedDifficulty === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedDifficulty(tab.key);
                sounds.click();
              }}
              onMouseEnter={() => sounds.hover?.()}
              className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                isActive
                  ? 'bg-gradient-to-b from-[#153e22] via-[#0c2816] to-[#07190e] border border-[#73ba25] text-white shadow-[0_2px_0_#1b4d24,0_0_12px_rgba(115,186,37,0.25)]'
                  : 'bg-[#050e0a]/80 border border-[#173f35] text-slate-400 hover:text-white hover:border-[#2a6857]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-xs text-[9.5px] font-bold ${
                  isActive
                    ? 'bg-black/80 border border-[#73ba25]/60 text-[#a3e635]'
                    : 'bg-black/50 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Tracks Grid (High-Performance Cyber Obsidian Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredTracks.map((t) => {
          const Icon = getIcon(t.icon);
          return (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-xl bg-[#040c07]/90 backdrop-blur-xl border border-[#173f35] hover:border-[#73ba25]/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_20px_rgba(115,186,37,0.18)] hover:-translate-y-1"
            >
              {/* Subtle top edge specular highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Ambient radial green corner glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#73ba25]/8 rounded-full blur-2xl pointer-events-none group-hover:bg-[#73ba25]/16 transition-all duration-300" />

              <div>
                {/* Header: Track Number & Difficulty Tag */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-xs bg-[#0b2616] border border-[#73ba25]/60 text-[#a3e635] font-mono text-[10.5px] font-bold tracking-widest uppercase">
                      TRACK {t.number}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      • NST S VYASA
                    </span>
                  </div>
                  {getDifficultyBadge(t.difficulty)}
                </div>

                {/* Identity: Icon + Name + Theme */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-b from-[#0c2415] to-[#040e08] border border-[#73ba25]/40 flex items-center justify-center text-[#73ba25] group-hover:text-[#a3e635] group-hover:border-[#73ba25] group-hover:scale-105 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.7)] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-pixel text-white group-hover:text-[#a3e635] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {t.name}
                    </h2>
                    <div className="text-xs font-mono text-[#73ba25] font-semibold tracking-wide flex items-center gap-1.5 mt-0.5">
                      <span>•</span>
                      <span>{t.theme}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                  {t.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-xs bg-black/60 border border-[#173f35] text-[10px] font-mono text-slate-400 group-hover:border-[#225749] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Starter Ideas Console Box */}
                <div className="mb-5 bg-[#020704]/90 border border-[#173f35] rounded-lg p-3.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200 mb-2.5 pb-1.5 border-b border-[#173f35]/50">
                    <span className="flex items-center gap-1.5 text-amber-400 text-[10.5px] uppercase tracking-wider font-pixel">
                      <Zap className="w-3.5 h-3.5" />
                      ACTIONABLE STARTER IDEAS
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-500 font-normal">
                      [ 4 SQUAD PROMPTS ]
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono">
                    {t.starterIdeas?.map((idea, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#73ba25] font-bold text-xs shrink-0 select-none">›</span>
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rubric Focus Callout */}
                <div className="px-3.5 py-2.5 rounded-lg bg-[#071910]/70 border border-[#173f35]/70 text-xs font-mono mb-4">
                  <span className="text-[#73ba25] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                    JUDGING RUBRIC FOCUS
                  </span>
                  <span className="text-slate-300 leading-relaxed text-[11.5px]">
                    {t.rubricFocus}
                  </span>
                </div>
              </div>

              {/* Card Footer: Specs & Select CTA Button */}
              <div className="mt-4 pt-4 border-t border-[#173f35]/60 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  3 to 4 builders / squad
                </span>

                <Link
                  to={`/register?track=${t.id}`}
                  onClick={() => sounds.click()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-b from-[#133d20] via-[#0b2413] to-[#040e08] hover:from-[#1b552d] hover:via-[#11381e] hover:to-[#07190e] border border-[#73ba25]/60 hover:border-[#8ee631] text-white font-mono text-xs font-bold transition-all shadow-[0_2px_0_#1b4d24] flex items-center gap-1.5 group/btn"
                >
                  <span>Select Track</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#73ba25] group-hover/btn:text-[#a3e635] group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Official Uniform 5-Point Evaluation Standard */}
      <div className="p-7 sm:p-8 rounded-xl bg-[#040e08]/90 border border-[#173f35] shadow-[0_4px_24px_rgba(0,0,0,0.8)] mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3 pb-4 border-b border-[#173f35]/50">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#73ba25] uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25]" />
              • OFFICIAL UNIFORM EVALUATION RUBRIC
            </div>
            <h2 className="text-xl sm:text-2xl font-pixel text-white">
              UNIFORM 5 POINT SCORING STANDARD
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 max-w-sm">
            Applied identically across all 83 teams in the Demo Arena and 6 finalist stage round.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-lg bg-[#020704]/90 border border-[#173f35] flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mb-1">25%</div>
              <div className="text-xs font-bold font-mono text-white mb-1.5">Real World Problem</div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Usefulness, genuine developer friction addressed, practical utility.
              </p>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden border border-[#173f35]/40">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#020704]/90 border border-[#173f35] flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-mono text-sky-400 mb-1">25%</div>
              <div className="text-xs font-bold font-mono text-white mb-1.5">Technical Execution</div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Code craftsmanship, architecture, error handling, performance.
              </p>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden border border-[#173f35]/40">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#020704]/90 border border-[#173f35] flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-mono text-[#a3e635] mb-1">20%</div>
              <div className="text-xs font-bold font-mono text-white mb-1.5">openSUSE Relevance</div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Integration with Zypper, OBS, YaST, Snapper, MicroOS, or desktop.
              </p>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden border border-[#173f35]/40">
              <div className="h-full bg-[#73ba25] rounded-full" style={{ width: '20%' }} />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#020704]/90 border border-[#173f35] flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-mono text-purple-400 mb-1">15%</div>
              <div className="text-xs font-bold font-mono text-white mb-1.5">Innovation & UX</div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Novelty, standout design, accessible UI, creative problem solving.
              </p>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden border border-[#173f35]/40">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#020704]/90 border border-[#173f35] flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-mono text-amber-400 mb-1">15%</div>
              <div className="text-xs font-bold font-mono text-white mb-1.5">Documentation & Future</div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                README quality, demo readiness, declared open source license.
              </p>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full mt-3 overflow-hidden border border-[#173f35]/40">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Squad Mentor Guidance Callout */}
      <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#0b2416]/70 via-[#07190e]/70 to-[#030d07]/70 border border-[#73ba25]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#0b2616] text-[#73ba25] shrink-0 border border-[#73ba25]/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-sm">Unsure Which Track Fits Your Squad?</div>
            <div className="text-slate-400 text-xs font-mono mt-0.5">
              Mentors on site will help your squad calibrate and lock in your primary track within the first 2 hours.
            </div>
          </div>
        </div>

        <Link
          to="/register"
          onClick={() => sounds.click()}
          className="px-5 py-2.5 rounded-lg bg-[#73ba25] hover:bg-[#8ee631] text-black font-mono text-xs font-bold transition-all shadow-[0_2px_0_#1b4d24] shrink-0 cursor-pointer"
        >
          Register Squad (250 Cap)
        </Link>
      </div>
    </div>
  );
}
