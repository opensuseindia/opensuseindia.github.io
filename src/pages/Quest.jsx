import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  Award,
  Terminal,
  Cpu,
  Users,
  HeartHandshake,
  QrCode,
  Sparkles,
  Share2,
  Shirt,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Quest() {
  const [missions, setMissions] = useState([]);
  const [wallOfFame, setWallOfFame] = useState([
    { name: 'Aarav Sharma', xp: 700, badge: 'Terminal Initiate', time: '10 mins ago' },
    { name: 'Siddharth Verma', xp: 600, badge: 'Geeko Explorer', time: '25 mins ago' },
    { name: 'Pooja Hegde', xp: 450, badge: 'Community Bridge', time: '40 mins ago' },
    { name: 'Neha Patil', xp: 300, badge: 'Spirit of FOSS', time: '1 hour ago' },
  ]);
  const [optInWall, setOptInWall] = useState(true);
  const { user, token, updateUser, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/quest/missions')
      .then((r) => r.json())
      .then(setMissions)
      .catch((err) => console.error('Failed to load missions:', err));
  }, []);

  const getMissionIcon = (iconName) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'Users': return Users;
      case 'HeartHandshake': return HeartHandshake;
      default: return Compass;
    }
  };

  const handleClaimMission = async (mission) => {
    if (!isAuthenticated) {
      toast('Please sign in or register to claim quest missions!', 'warning');
      return;
    }

    try {
      const res = await fetch('/api/quest/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ missionId: mission.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Claim failed', 'error');
        return;
      }

      sounds.success();
      confetti({ particleCount: 60, spread: 50 });
      toast(data.message, 'success');
      updateUser({
        questXp: data.questXp,
        completedMissions: data.completedMissions,
      });

      if (optInWall) {
        setWallOfFame((prev) => [
          { name: user.name, xp: data.questXp, badge: mission.badge, time: 'Just now' },
          ...prev,
        ]);
      }
    } catch (err) {
      toast('Network error claiming mission', 'error');
    }
  };

  const completedList = user?.completedMissions || ['quest-1', 'quest-2'];
  const userXp = user?.questXp || 400;

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SIGNATURE HEADER LOCKUP                                   */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-blue-500/40 text-blue-400 font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>// CAMPUS EXPEDITION &amp; DIGITAL PASSPORT // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #1e3a8a, 4px 4px 0 #0f172a',
          }}
        >
          <span className="text-white">GEEKO </span>
          <span className="text-blue-400">QUEST</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          A mobile friendly digital passport opening directly from registration QR access. Complete optional missions to meet contributors, run terminal commands, and help fellow builders.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-blue-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/25">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">4 Core Missions</div>
            <div className="text-slate-400 text-[10px] font-mono">Campus Challenges</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-blue-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">1,000 XP Cap</div>
            <div className="text-slate-400 text-[10px] font-mono">Passport Progression</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-blue-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/25">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">2 Reward Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Top Achievers</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Instant Badges</div>
            <div className="text-slate-400 text-[10px] font-mono">On Chain Ledger</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PARTICIPANT DIGITAL PASSPORT CARD                         */}
      {/* ========================================================= */}
      <div className="group relative rounded-2xl bg-gradient-to-br from-[#0a1324]/95 via-[#060c18]/95 to-[#02040a]/95 backdrop-blur-2xl border border-blue-500/35 p-6 sm:p-8 mb-12 max-w-2xl mx-auto shadow-[0_16px_40px_rgba(0,0,0,0.85)] relative z-10 overflow-hidden">
        {/* Top Specular Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent pointer-events-none" />

        {/* 4 Corner Cyber Brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-blue-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-blue-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-blue-400 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-blue-900/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase font-bold">
                Digital Pass # {user?.ticketId || 'GEEKO-2027-BLR-042'}
              </div>
              <h2 className="text-2xl font-heading font-black text-white">
                {user?.name || 'Aarav Sharma'}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                openSUSE Bengaluru 2027 Builder
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-3xl font-black font-heading text-blue-400">
              {userXp} <span className="text-sm font-mono text-slate-400">XP</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {completedList.length} of 4 Missions Completed
            </span>
          </div>
        </div>

        {/* Badges Earned Ribbon */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-white font-semibold">Unlocked Badges:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px]">
              Terminal Initiate
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px]">
              Geeko Explorer
            </span>
          </div>

          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={optInWall}
              onChange={(e) => setOptInWall(e.target.checked)}
              className="rounded bg-black border-blue-900/50 text-blue-500"
            />
            <span className="text-[11px]">Opt In Wall of Fame</span>
          </label>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CORE MISSIONS                                             */}
      {/* ========================================================= */}
      <div className="mb-16 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-pixel text-[8px] text-blue-400 uppercase tracking-wider">OFFICIAL EXPEDITIONS</div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Core Quest Missions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission) => {
            const Icon = getMissionIcon(mission.icon);
            const isCompleted = completedList.includes(mission.id);

            return (
              <div
                key={mission.id}
                className={`group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 overflow-hidden shadow-xl ${
                  isCompleted
                    ? 'bg-gradient-to-br from-[#0c1b2f]/95 via-[#071220]/95 to-[#03070f]/95 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                    : 'bg-gradient-to-br from-[#0a101f]/90 via-[#060a14]/90 to-[#020408]/90 border-blue-900/40 hover:border-blue-500/40'
                }`}
              >
                {/* Top Specular Line */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent pointer-events-none" />
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-blue-400 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-pixel text-[8px] text-blue-400 uppercase tracking-wider">
                      {mission.code}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      +{mission.xp} XP
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className={`p-3 rounded-xl ${
                        isCompleted
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-black text-white">
                        {mission.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                        Badge: <strong className="text-blue-300">{mission.badge}</strong>
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mb-4">
                    {mission.description}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-blue-950 text-[11px] font-mono text-slate-300 mb-6 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Verification: <strong className="text-white">{mission.verificationMethod}</strong></span>
                  </div>
                </div>

                <button
                  disabled={isCompleted}
                  onClick={() => handleClaimMission(mission)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Mission Verified &amp; Claimed</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Claim Verification (+{mission.xp} XP)</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PUBLIC WALL OF FAME                                       */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0a1324]/95 via-[#060c18]/95 to-[#02040a]/95 border border-blue-500/35 p-6 sm:p-8 shadow-xl overflow-hidden relative z-10">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-blue-400 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-900/50">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-pixel text-[8px] uppercase tracking-wider mb-1.5">
              <span>COMMUNITY LEADERBOARD</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              Public Wall of Fame
            </h3>
            <span className="text-xs font-mono text-slate-400 block mt-0.5">
              Quest points celebrate community involvement and never affect Buildathon hackathon scores.
            </span>
          </div>
          <div className="text-xs font-mono text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/30 shrink-0">
            Side Pool: ₹1,500 + 2 Reward Jerseys
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wallOfFame.map((entry, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/60 border border-blue-900/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-xs font-heading">{entry.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">{entry.time}</span>
              </div>
              <div className="text-base font-bold font-mono text-blue-400 mb-1">
                {entry.xp} XP
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                🏅 {entry.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
