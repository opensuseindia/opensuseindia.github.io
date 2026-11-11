import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Heart,
  Terminal,
  User,
  Mail,
  Phone,
  Github,
  Building2,
  Layers,
  LogOut,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialTrack = searchParams.get('track') || 'track-1';
  const navigate = useNavigate();
  const { register, user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    github: user?.github || '',
    phone: '',
    college: 'Newton School of Technology',
    trackId: initialTrack,
    teamMode: 'create_team', // 'create_team' | 'join_team'
    teamName: '',
    teamCode: '',
    isOvernight: true,
    is18Plus: false,
    emergencyContact: '',
    diet: 'Vegetarian (Campus Standard)',
    accessibility: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState(78);

  useEffect(() => {
    fetch('/api/tracks')
      .then((r) => r.json())
      .then(setTracks)
      .catch((err) => console.error('Failed to load tracks:', err));

    fetch('/api/event')
      .then((r) => r.json())
      .then((d) => {
        if (d.stats) setRemainingSeats(d.stats.remainingSeats);
      })
      .catch((err) => console.error('Failed to load event stats:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.isOvernight && !formData.is18Plus) {
      toast('Overnight building requires 18+ consent according to safety regulations.', 'error');
      return;
    }

    if (formData.isOvernight && !formData.emergencyContact.trim()) {
      toast('Please provide a valid emergency contact for overnight stay.', 'error');
      return;
    }

    if (formData.teamMode === 'create_team' && !formData.teamName.trim()) {
      toast('Please enter a team name (teams are 3 to 4 members).', 'warning');
      return;
    }

    setIsSubmitting(true);
    sounds.click();

    try {
      const regUser = await register(formData);
      sounds.success();
      confetti({ particleCount: 100, spread: 80 });
      toast(`Registration Successful! Welcome, ${regUser.name}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      toast(err.message || 'Registration failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      {/* Upper Section: Chameleon Logo & Sleek Header */}
      <div className="text-center mb-8">
        <div className="inline-block relative mb-3 group">
          <div className="absolute -inset-1 rounded-full bg-[#73ba25]/30 blur-md group-hover:bg-[#73ba25]/50 transition-all duration-300" />
          <img
            src={`${import.meta.env.BASE_URL}opensuse-logo.png`}
            alt="openSUSE Chameleon"
            className="relative w-14 h-14 rounded-full ring-2 ring-[#73ba25]/70 shadow-[0_0_20px_rgba(115,186,37,0.4)] mx-auto object-cover"
          />
        </div>

        <h1 className="font-pixel text-2xl sm:text-3xl text-white tracking-wider drop-shadow-[0_0_15px_rgba(115,186,37,0.3)]">
          APPLY FOR BLR '27
        </h1>

        {/* Live Capacity & Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 font-mono text-[11px]">
          <span className="px-3 py-1 rounded-full bg-[#73ba25]/15 border border-[#73ba25]/40 text-[#a3e635] flex items-center gap-1.5 shadow-[0_0_10px_rgba(115,186,37,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-ping" />
            <strong>{remainingSeats} OF 250 SPOTS REMAINING</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
            ⚡ 100% FREE ADMISSION
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            Newton School of Tech, Bengaluru
          </span>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mt-3.5 max-w-xl mx-auto leading-relaxed font-sans">
          Join 250 Linux builders and student hackers for 2 days of upstream workshops and the 20 hour Geeko Buildathon.
        </p>
      </div>

      {/* Authenticated User Status Bar */}
      {isAuthenticated && (
        <div className="mb-6 p-3.5 rounded-xl bg-[#081710] border border-[#73ba25]/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <div className="flex items-center gap-2 text-geeko-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Signed in as <strong className="text-white">{user?.name}</strong> ({user?.email})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-white hover:text-geeko-300 underline font-semibold flex items-center gap-1"
            >
              <span>View My Pass</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                logout();
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* 3-Step High-Tech Progress Ribbon */}
      <div className="grid grid-cols-3 gap-2 mb-6 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] shadow-[0_0_10px_rgba(115,186,37,0.1)]">
          <span className="w-5 h-5 rounded-lg bg-[#73ba25]/20 flex items-center justify-center font-bold text-[10px] text-[#73ba25]">
            01
          </span>
          <span className="font-semibold truncate">Identity</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#081510] border border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.1)]">
          <span className="w-5 h-5 rounded-lg bg-[#00f0ff]/20 flex items-center justify-center font-bold text-[10px] text-[#00f0ff]">
            02
          </span>
          <span className="font-semibold truncate">Track & Squad</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#081510] border border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
          <span className="w-5 h-5 rounded-lg bg-amber-400/20 flex items-center justify-center font-bold text-[10px] text-amber-400">
            03
          </span>
          <span className="font-semibold truncate">Safety & Pass</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-[#050d09]/95 border border-[#173f35] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl font-mono text-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========================================================= */}
          {/* SECTION 1: PARTICIPANT IDENTITY                           */}
          {/* ========================================================= */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#173f35] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#73ba25] shadow-[0_0_8px_#73ba25]" />
                <h3 className="font-pixel text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  1. Participant Information
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">* Required fields</span>
            </div>

            <div className="space-y-4">
              {/* Full Legal Name */}
              <div>
                <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#73ba25]" />
                    Full Legal Name *
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">Appears on Digital Pass & Certificate</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-[#73ba25]/40"
                />
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@example.com"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-cyan-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create secure portal password"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-amber-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-amber-400/40"
                  />
                </div>
              </div>

              {/* GitHub & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      GitHub Username
                    </span>
                    <span className="text-[10px] text-slate-500">Auto-pulls avatar</span>
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="e.g. aarav-codes"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-[#73ba25]/40"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#73ba25]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-[#73ba25]/40"
                  />
                </div>
              </div>

              {/* College / Institution */}
              <div>
                <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  College / Institution
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="Newton School of Technology, Bengaluru"
                  className="w-full bg-[#040806] border border-[#173f35] focus:border-cyan-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: TRACK & TEAM SELECTION                         */}
          {/* ========================================================= */}
          <div className="pt-5 border-t border-[#173f35]">
            <div className="flex items-center justify-between pb-3 border-b border-[#173f35] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                <h3 className="font-pixel text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  2. Track & Squad Selection
                </h3>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">3 to 4 Builders Per Team</span>
            </div>

            <div className="space-y-4">
              {/* Primary Track Selection */}
              <div>
                <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Select Primary Buildathon Track
                </label>
                <select
                  value={formData.trackId}
                  onChange={(e) => setFormData({ ...formData, trackId: e.target.value })}
                  className="w-full bg-[#040806] border border-[#173f35] focus:border-cyan-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id} className="bg-[#081510] text-white">
                      Track {t.number}: {t.name} ({t.theme})
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Mode Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, teamMode: 'create_team' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    formData.teamMode === 'create_team'
                      ? 'bg-[#73ba25]/15 border-[#73ba25] text-white shadow-[0_0_15px_rgba(115,186,37,0.2)]'
                      : 'bg-[#040806] border-[#173f35] text-slate-400 hover:border-[#73ba25]/40 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#73ba25]" />
                      Create New Team
                    </span>
                    {formData.teamMode === 'create_team' && (
                      <span className="w-2 h-2 rounded-full bg-[#73ba25] animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    Act as Team Lead · generate shareable 6-digit squad code
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, teamMode: 'join_team' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    formData.teamMode === 'join_team'
                      ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-[#040806] border-[#173f35] text-slate-400 hover:border-[#00f0ff]/40 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                      Join Existing Team
                    </span>
                    {formData.teamMode === 'join_team' && (
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    Enter squad invite code shared by your Team Lead
                  </div>
                </button>
              </div>

              {formData.teamMode === 'create_team' && (
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5">
                    Team / Squad Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. Kernel Knights"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all"
                  />
                </div>
              )}

              {formData.teamMode === 'join_team' && (
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5">
                    Team Code or Exact Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamCode}
                    onChange={(e) => setFormData({ ...formData, teamCode: e.target.value })}
                    placeholder="e.g. team-101 or Kernel Knights"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#00f0ff] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 3: OVERNIGHT & SAFETY (Kept Exactly as Desired)    */}
          {/* ========================================================= */}
          <div className="pt-5 border-t border-[#173f35]">
            <div className="flex items-center justify-between pb-3 border-b border-[#173f35] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <h3 className="font-pixel text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  3. Overnight Attendance & Safety Readiness
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <label className="p-3.5 rounded-xl bg-[#040806] border border-[#173f35] hover:border-[#1e5043] flex items-start gap-3 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isOvernight}
                  onChange={(e) => setFormData({ ...formData, isOvernight: e.target.checked })}
                  className="mt-1 rounded bg-black border-[#173f35] text-[#73ba25] focus:ring-0"
                />
                <div>
                  <span className="font-bold text-white block text-xs">
                    I intend to stay overnight for the 20 hour Buildathon
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans block mt-0.5 leading-relaxed">
                    All 250 participants may stay overnight. Food, tea, late-night snacks, quiet rest rooms, and security shifts are provided.
                  </span>
                </div>
              </label>

              {formData.isOvernight && (
                <>
                  <div>
                    <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5">
                      Emergency Contact Name & Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="Parent / Guardian Name (+91 XXXXX XXXXX)"
                      className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                    />
                  </div>

                  {/* Overnight 18+ Safety Confirmation Box (Cleaned: no page leaks) */}
                  <label className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.is18Plus}
                      onChange={(e) => setFormData({ ...formData, is18Plus: e.target.checked })}
                      className="mt-1 rounded bg-black border-amber-500 text-amber-500 focus:ring-0"
                    />
                    <div className="text-amber-200 text-[11px] leading-relaxed">
                      <strong className="block text-amber-300 font-bold mb-0.5">
                        Overnight 18+ Safety Confirmation:
                      </strong>
                      I confirm I am 18 years of age or older as per event safety regulations and agree to venue security protocols.
                    </div>
                  </label>
                </>
              )}

              {/* Dietary Requirement & Accessibility Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5">
                    Dietary Requirement
                  </label>
                  <select
                    value={formData.diet}
                    onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                  >
                    <option className="bg-[#081510]">Vegetarian (Campus Standard)</option>
                    <option className="bg-[#081510]">Jain Vegetarian</option>
                    <option className="bg-[#081510]">Vegan</option>
                    <option className="bg-[#081510]">Specific Food Allergies</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5">
                    Accessibility Support (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.accessibility}
                    onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
                    placeholder="e.g. Wheelchair access, screen reader"
                    className="w-full bg-[#040806] border border-[#173f35] focus:border-[#73ba25] rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SUBMIT BUTTON (The Giant Green Button User Approved)      */}
          {/* ========================================================= */}
          <div className="pt-5 border-t border-[#173f35]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-geeko-500 hover:bg-geeko-400 text-black font-heading font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(115,186,37,0.5)] flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
            >
              <span>{isSubmitting ? 'Activating Pass...' : 'Confirm Registration & Activate Pass'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-2 font-sans">
              By registering, you agree to the openSUSE Community Code of Conduct. No registration fee is charged.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
