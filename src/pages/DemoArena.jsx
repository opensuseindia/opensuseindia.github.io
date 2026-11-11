import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Users,
  Search,
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  Filter,
  Layers,
  Sparkles,
  Award,
  Video,
  ThumbsUp,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function DemoArena() {
  const [arenaData, setArenaData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLane, setSelectedLane] = useState('ALL');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [userVotes, setUserVotes] = useState({});
  const { user, token, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/demo-arena')
      .then((r) => r.json())
      .then((d) => {
        setArenaData(d);
        if (d.userVotedTeamId) {
          setUserVotes({ [d.userVotedTeamId]: true });
        }
      })
      .catch((err) => console.error('Failed to load demo arena:', err));
  }, []);

  const handleVote = async (teamId) => {
    if (!isAuthenticated) {
      toast('Please sign in or register to cast your People Choice vote!', 'warning');
      return;
    }

    if (userVotes[teamId]) {
      toast('You have already voted for this project!', 'info');
      return;
    }

    sounds.success();
    confetti({ particleCount: 50, spread: 45 });

    try {
      const res = await fetch('/api/demo-arena/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamId }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Vote failed', 'error');
        return;
      }

      toast(data.message || 'Vote registered for People Choice Award!', 'success');
      setUserVotes({ [teamId]: true });
      setArenaData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          teams: prev.teams.map((t) =>
            t.id === teamId ? { ...t, votesCount: (t.votesCount || 0) + 1 } : t
          ),
        };
      });
    } catch {
      toast('Error submitting vote', 'error');
    }
  };

  const teams = arenaData?.teams || [];

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.trackName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLane =
      selectedLane === 'ALL' || t.laneNumber === parseInt(selectedLane, 10);

    return matchesSearch && matchesLane;
  });

  const finalists = teams.filter((t) => t.isFinalist);

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SIGNATURE HEADER LOCKUP                                   */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-emerald-500/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
          <span>// 83 EXHIBITION TABLES &amp; TOP 6 DEMO ARENA // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">DEMO </span>
          <span className="text-emerald-400">ARENA</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Day 2, 11:00 to 13:00 IST. Six parallel judging lanes with 2 judges per panel. Every valid submitting team receives an exhibition table, project label, and repository QR.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">83 Team Tables</div>
            <div className="text-slate-400 text-[10px] font-mono">Exhibition Space</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">6 Judging Lanes</div>
            <div className="text-slate-400 text-[10px] font-mono">Parallel Evaluation</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Top 6 Finalists</div>
            <div className="text-slate-400 text-[10px] font-mono">Stage Pitch Privileges</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">People Choice</div>
            <div className="text-slate-400 text-[10px] font-mono">Live Attendee Voting</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TOP 6 FINALISTS STAGE BANNER                              */}
      {/* ========================================================= */}
      <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-emerald-500/40 p-6 sm:p-8 mb-12 shadow-[0_16px_40px_rgba(0,0,0,0.85)] relative z-10 overflow-hidden">
        {/* Top Specular Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent pointer-events-none" />

        {/* 4 Corner Cyber Brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#73ba25] text-xs font-mono font-semibold uppercase">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Auditorium Stage Pitch · 13:15 to 14:15 IST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              Top Six Overall Finalists
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Selected through normalized lane scores. Each finalist receives 7 minutes of demo + 3 minutes of Q&amp;A.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-pixel text-[8px] uppercase tracking-wider border border-amber-500/35 shrink-0">
            6 Finalists Overall
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {finalists.map((f, idx) => (
            <div
              key={f.id}
              className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                #{idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{f.name}</h3>
                  <span className="text-[10px] text-amber-400 font-semibold">
                    Lane {f.laneNumber}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-semibold mt-0.5">
                  {f.projectTitle}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Track: {f.trackName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* FILTER & SEARCH BAR                                       */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 font-mono text-xs relative z-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
          <span className="text-slate-500 text-[10px] uppercase font-bold shrink-0">Lanes:</span>
          {['ALL', '1', '2', '3', '4', '5', '6'].map((lane) => (
            <button
              key={lane}
              onClick={() => setSelectedLane(lane)}
              className={`px-3 py-1 rounded-lg transition-colors shrink-0 font-pixel text-[8px] ${
                selectedLane === lane
                  ? 'bg-[#73ba25] text-black font-bold'
                  : 'bg-black/60 border border-[#173f35] text-slate-400 hover:text-white'
              }`}
            >
              {lane === 'ALL' ? 'All Lanes' : `Lane ${lane}`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teams, tracks..."
            className="w-full bg-black/60 border border-[#173f35] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#73ba25]"
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* TEAMS EXHIBITION CARDS                                    */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative z-10">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className={`group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 ${
              team.isFinalist
                ? 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                : 'border-[#173f35] hover:border-[#73ba25]/50'
            }`}
          >
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/60 to-transparent pointer-events-none" />
            <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[8px] font-pixel bg-white/5 border border-white/10 text-slate-300">
                  TABLE #{team.tableNumber} · LANE {team.laneNumber}
                </span>
                {team.isFinalist && (
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-pixel bg-amber-500/20 text-amber-300 border border-amber-500/35">
                    FINALIST
                  </span>
                )}
              </div>

              <h3 className="font-heading font-black text-xl text-white mb-1">
                {team.projectTitle || 'Untitled Project'}
              </h3>
              <div className="text-xs font-mono text-[#8ee631] font-bold mb-3">
                Team: {team.name}
              </div>

              <p className="text-slate-300 text-xs font-mono leading-relaxed mb-4">
                {team.description || 'Open source project built during the 20 hour sprint.'}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#173f35]/60 text-[11px] font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Track:</span>
                  <span className="text-slate-200 font-semibold">{team.trackName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Repo:</span>
                  <span className="text-[#73ba25]">{team.repoName || 'git.opensuse.org/team'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#173f35]/60 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                <strong className="text-white">{team.votesCount || 0}</strong> votes
              </div>
              <button
                onClick={() => handleVote(team.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  userVotes[team.id]
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-default'
                    : 'bg-[#73ba25] hover:bg-[#8ee631] text-black shadow-md'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{userVotes[team.id] ? 'Voted' : 'Vote'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* RULES & FRAUD PREVENTION NOTE                             */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-[#091a13] border border-[#73ba25]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300 shadow-xl relative z-10">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#73ba25] shrink-0" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">Fair Play &amp; Transparent Scoring:</strong>
            <span>All 83 projects undergo normalized jury evaluation across a 5 point rubric. People Choice voting is authenticated by unique cryptographic ticket hashes to prevent ballot stuffing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
