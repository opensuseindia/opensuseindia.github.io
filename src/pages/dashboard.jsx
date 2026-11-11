import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  User,
  QrCode,
  Users,
  GitBranch,
  CheckCircle2,
  Lock,
  Utensils,
  Award,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Shield,
  Coffee,
  LogOut,
  Moon,
  Copy,
  Check,
  Zap,
  Terminal,
  Calendar,
  Layers,
  MapPin,
  Unlock,
  Printer,
  Share2,
  KeyRound,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { user, token, updateUser, logout } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('pass');
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [projectForm, setProjectForm] = useState({
    projectTitle: '',
    projectDescription: '',
    repoUrl: '',
    commitHash: '',
    aiAssistanceDeclared: false,
    trackId: user?.trackId || 'track-1',
  });
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [submittedTeam, setSubmittedTeam] = useState(null);
  const [isCertUnlocked, setIsCertUnlocked] = useState(() => {
    return localStorage.getItem('geeko_cert_unlocked') === 'true';
  });

  useEffect(() => {
    const handleLockSync = () => {
      setIsCertUnlocked(localStorage.getItem('geeko_cert_unlocked') === 'true');
    };
    window.addEventListener('geeko_cert_unlock_changed', handleLockSync);
    window.addEventListener('storage', handleLockSync);
    return () => {
      window.removeEventListener('geeko_cert_unlock_changed', handleLockSync);
      window.removeEventListener('storage', handleLockSync);
    };
  }, []);

  const toggleCertLock = () => {
    const nextState = !isCertUnlocked;
    setIsCertUnlocked(nextState);
    localStorage.setItem('geeko_cert_unlocked', String(nextState));
    window.dispatchEvent(new Event('geeko_cert_unlock_changed'));
    if (nextState) {
      sounds.success?.();
      confetti({ particleCount: 75, spread: 70 });
      toast('Certificate released! Cryptographic credential is now unlocked.', 'success');
    } else {
      sounds.click?.();
      toast('Certificate returned to air gapped cryptographic cold vault.', 'info');
    }
  };

  const handlePrintCertificate = () => {
    sounds.click?.();
    window.print();
  };

  const handleCopyVerificationLink = () => {
    sounds.click?.();
    const link = `https://opensuse-india.org/verify/${user?.ticketId || 'GEEKO-2027-BLR-042'}`;
    navigator.clipboard.writeText(link);
    toast('Verification URL copied to clipboard!', 'info');
  };

  useEffect(() => {
    if (user?.teamId) {
      fetch('/api/demo-arena')
        .then((r) => r.json())
        .then((data) => {
          const found = data.teams?.find((t) => t.id === user.teamId);
          if (found) {
            setSubmittedTeam(found);
            setProjectForm({
              projectTitle: found.projectTitle || '',
              projectDescription: found.projectDescription || '',
              repoUrl: found.repoUrl || '',
              commitHash: found.commitHash || '',
              aiAssistanceDeclared: found.aiAssistanceDeclared || false,
              trackId: found.trackId || user?.trackId || 'track-1',
            });
          }
        })
        .catch(console.error);
    }
  }, [user]);

  const handleCopyTicket = () => {
    sounds.click?.();
    navigator.clipboard.writeText(user?.ticketId || 'GEEKO-2027-BLR-042');
    setCopiedTicket(true);
    toast('Ticket ID copied to clipboard!', 'info');
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProject(true);
    sounds.click();

    try {
      const res = await fetch('/api/projects/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectForm),
      });

      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Failed to submit project', 'error');
        return;
      }

      sounds.success();
      confetti({ particleCount: 75, spread: 60 });
      toast('Repository and frozen commit locked successfully!', 'success');
      setSubmittedTeam(data.team);
      updateUser({ teamId: data.team.id, teamName: data.team.name });
    } catch {
      toast('Network error saving submission', 'error');
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const downloadCertificate = () => {
    sounds.success();
    confetti({ particleCount: 50, spread: 60 });
    const svgElement = document.getElementById('geeko-certificate');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `openSUSE-Certificate-${user?.name?.replace(/\s+/g, '_') || 'Participant'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast('Certificate downloaded successfully!', 'success');
  };

  const mealList = [
    { key: 'd1_welcome', label: 'Day 1 Welcome Tea & Refreshments', time: '09:00 IST', icon: Coffee },
    { key: 'd1_lunch', label: 'Day 1 Campus Lunch (280 Servings)', time: '13:00 IST', icon: Utensils },
    { key: 'd1_tea', label: 'Day 1 Evening Chai & Savory Snacks', time: '17:00 IST', icon: Coffee },
    { key: 'd1_dinner', label: 'Day 1 Overnight Hot Dinner', time: '18:30 IST', icon: Utensils },
    { key: 'd1_late_snack', label: 'Day 1 Midnight Dum Biryani & Drinks', time: '23:00 IST', icon: Sparkles },
    { key: 'd2_breakfast', label: 'Day 2 South Indian Breakfast', time: '06:30 IST', icon: Coffee },
  ];

  const vouchers = user?.mealVouchers || {};

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Glowing Backdrops */}
      <div className="absolute top-20 left-1/4 -translate-y-1/2 w-[550px] h-[450px] bg-[#73ba25]/[0.035] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-cyan-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* =================================================================== */}
      {/* 1. PARTICIPANT COMMAND HEADER & CREDENTIAL BAR                      */}
      {/* =================================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-[#020503]/95 border border-[#73ba25]/30 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] mb-8 overflow-hidden backdrop-blur-2xl">
        {/* Specular Emerald Horizon Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#73ba25]/90 to-transparent pointer-events-none" />
        
        {/* Corner Cyber Chamfer Brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
              <span>OFFICIAL PARTICIPANT HUB // OPENSUSE CONNECT '27</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
            </div>

            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none"
            >
              <span 
                className="text-white block mb-1"
                style={{ textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910' }}
              >
                WELCOME,
              </span>
              <span 
                className="block tracking-tight py-0.5"
                style={{ 
                  background: 'linear-gradient(180deg, #fffbeb 0%, #fbbf24 35%, #f59e0b 70%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(2px 2px 0px #000000) drop-shadow(0 0 22px rgba(245, 158, 11, 0.6))'
                }}
              >
                {user?.name || 'AARAV SHARMA'}
              </span>
            </h1>

            {/* Attendee Credentials Bar */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs mt-3 text-slate-300">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">Pass ID:</span>
                <strong className="text-white font-bold tracking-wider">{user?.ticketId || 'GEEKO-2027-BLR-042'}</strong>
                <button
                  onClick={handleCopyTicket}
                  className="text-slate-400 hover:text-white transition-colors ml-1 cursor-pointer"
                  title="Copy Ticket ID"
                >
                  {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <span className="text-slate-500 text-xs hidden sm:inline">•</span>

              <span className="text-slate-400">
                Newton School of Technology <span className="text-slate-600">·</span> Sattva Global City
              </span>

              <button
                onClick={() => {
                  sounds.click();
                  logout();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-rose-200 transition-all font-mono text-[11px] font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Telemetry Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-black/70 border border-[#73ba25]/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">GATE STATUS</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                {user?.checkedIn ? 'CHECKED IN ✓' : 'PASS READY'}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/70 border border-cyan-500/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">OVERNIGHT</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">
                {user?.isOvernight ? '18+ VERIFIED' : 'DAY ONLY'}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 px-3.5 py-2 rounded-xl bg-black/70 border border-amber-500/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">MEAL TOKENS</span>
              <span className="text-xs font-bold text-amber-400 font-mono">6 Vouchers</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SLEEK NAVIGATION CARTRIDGE                                          */}
        {/* =================================================================== */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs relative z-10">
          {[
            { id: 'pass', label: 'QR Digital Pass', icon: QrCode },
            { id: 'team', label: 'Team & Code Freeze', icon: GitBranch },
            { id: 'meals', label: 'Meal Vouchers (6)', icon: Utensils },
            { id: 'cert', label: 'Verifiable Certificate', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  sounds.click();
                }}
                onMouseEnter={() => sounds.hover?.()}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 font-bold uppercase tracking-wider cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#73ba25] via-[#8ee631] to-[#73ba25] text-black shadow-[0_0_20px_rgba(115,186,37,0.45)] scale-[1.02]'
                    : 'bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. TAB 1: HOLOGRAPHIC DIGITAL BOARDING PASS                         */}
      {/* =================================================================== */}
      {activeTab === 'pass' && (
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl">
            {/* Top Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#73ba25]/90 to-transparent pointer-events-none" />

            {/* 4 Corner Chamfers */}
            <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

            {/* Pass Top Branding Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#173f35]/70 mb-6">
              <div className="flex items-center gap-3">
                <img src={`${import.meta.env.BASE_URL}opensuse-logo.png`} alt="openSUSE" className="w-10 h-10 rounded-full shrink-0 shadow-[0_0_15px_rgba(115,186,37,0.3)]" />
                <div>
                  <div className="text-xs font-pixel uppercase font-bold text-white tracking-wider">
                    openSUSE India · Bengaluru Connect 2027
                  </div>
                  <div className="text-[10.5px] font-mono text-[#8ee631] font-semibold">
                    Official Attendee Credential &amp; Overnight Security Pass
                  </div>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-extrabold border border-emerald-500/40 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {user?.checkedIn ? 'CHECKED IN ✓' : 'PASS READY'}
              </span>
            </div>

            {/* Pass Split: Holographic QR Bay (Left) & Attendee Dossier (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 mb-6 items-center">
              {/* Left Column: QR Code Bay */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-black/70 border border-white/10 relative shadow-inner">
                <div className="p-3.5 rounded-xl bg-white border-4 border-[#73ba25] shadow-2xl relative">
                  <QRCodeSVG
                    value={`GEEKO-BLR-2027|${user?.ticketId || 'GEEKO-2027-BLR-042'}|${user?.email || 'aarav@example.com'}`}
                    size={165}
                    level="H"
                    includeMargin={false}
                  />
                  {/* Glowing Corner Accents */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#73ba25]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#73ba25]" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#73ba25]" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#73ba25]" />
                </div>

                <div className="mt-3.5 text-center font-mono text-[10px] text-slate-400">
                  <div className="text-white font-bold tracking-wider">SHA-256 // ENCRYPTED TOKEN</div>
                  <div className="text-slate-500 text-[9px] mt-0.5">Scan at NST Main Gate &amp; Meals</div>
                </div>
              </div>

              {/* Right Column: Attendee Dossier */}
              <div className="md:col-span-7 space-y-3.5 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                    Attendee Name
                  </span>
                  <div className="text-2xl font-heading font-black text-white tracking-tight">
                    {user?.name || 'Aarav Sharma'}
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px] capitalize font-semibold">
                    {user?.role || 'participant'} · {user?.trackId ? 'Track Selected' : 'General Attendee'}
                  </span>
                </div>

                {/* 4 Metadata Tiles */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Ticket ID</span>
                    <strong className="text-[#8ee631] font-bold text-xs">{user?.ticketId || 'GEEKO-2027-BLR-042'}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Overnight Stay</span>
                    <strong className="text-emerald-400 font-bold text-xs">
                      {user?.isOvernight ? '18+ Verified' : 'Daytime Only'}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Diet Catering</span>
                    <strong className="text-white font-bold text-xs">{user?.diet || 'Vegetarian'}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Assigned Team</span>
                    <strong className="text-cyan-300 font-bold text-xs truncate block">
                      {user?.teamName || submittedTeam?.name || 'Kernel Knights'}
                    </strong>
                  </div>
                </div>

                {/* Campus Check-In Notice */}
                <div className="p-2.5 rounded-xl bg-[#081510] border border-[#73ba25]/30 flex items-center gap-2 text-[10.5px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#73ba25] shrink-0" />
                  <span>Newton School of Technology, S-VYASA Campus, Bengaluru</span>
                </div>
              </div>
            </div>

            {/* Pass Security Watermark Strip */}
            <div className="pt-3.5 border-t border-[#173f35]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#73ba25] shrink-0" />
                <span>Present this credential at Newton School of Technology entrance gate.</span>
              </div>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                NON-TRANSFERABLE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. TAB 2: TEAM OPERATIONS & CODE FREEZE                             */}
      {/* =================================================================== */}
      {activeTab === 'team' && (
        <div className="space-y-6 font-mono text-xs animate-fade-in">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-black/95 border border-[#73ba25]/35 p-6 sm:p-7 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-[#8ee631] uppercase font-bold tracking-wider">
                  Team Operations (3 to 4 Builders)
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                  {submittedTeam?.name || user?.teamName || 'Kernel Knights'}
                </h2>
              </div>
              {submittedTeam && (
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/15 text-slate-300">
                    Table #{submittedTeam.tableNumber || 12}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#73ba25]/20 text-[#8ee631] border border-[#73ba25]/40 font-bold">
                    Judging Lane {submittedTeam.laneNumber || 2}
                  </span>
                </div>
              )}
            </div>

            {/* Team Members Roster */}
            <div className="mb-7">
              <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#8ee631]" />
                <span>Active Team Roster ({submittedTeam?.members?.length || 1} of 4 Builders)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(submittedTeam?.members || [
                  { name: user?.name || 'Aarav Sharma', email: user?.email || 'aarav@example.com', github: 'aarav-kernel', role: 'Team Lead' },
                  { name: 'Priya Nair', email: 'priya@example.com', github: 'priya-linux', role: 'Builder' },
                  { name: 'Kavya S', email: 'kavya@example.com', github: 'kavya-dev', role: 'Builder' }
                ]).map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 transition-colors shadow-inner">
                    <div className="font-heading font-bold text-white text-xs">{m.name}</div>
                    <div className="text-[10px] text-[#8ee631] font-semibold mt-0.5">{m.role}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{m.email}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Freeze Warning Notice */}
            <div className="p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-3.5 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-amber-300 block mb-0.5 font-bold uppercase tracking-wider">
                  Mandatory Buildathon Code Freeze Rule:
                </strong>
                Submit README, open source license, public Git repository, and frozen commit SHA by <strong>Day 2, 10:30 IST</strong>. Upstream merge is not required. Pre existing code and AI assistance must be declared.
              </div>
            </div>

            {/* Project Submission Form */}
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.projectTitle}
                  onChange={(e) => setProjectForm({ ...projectForm, projectTitle: e.target.value })}
                  placeholder="e.g. ZypSnap: Snapshot-Aware Zypper Assistant"
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors shadow-inner"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                  Project Description &amp; Scope *
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.projectDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })}
                  placeholder="Describe the problem, solution, openSUSE tool integration, and future potential..."
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                    Public Git Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={projectForm.repoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                    placeholder="https://github.com/org/project"
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors shadow-inner"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                    Frozen Commit Hash (SHA-1) *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.commitHash}
                    onChange={(e) => setProjectForm({ ...projectForm, commitHash: e.target.value })}
                    placeholder="e.g. 7f4c9a1b8e23f044d67901"
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors shadow-inner"
                  />
                </div>
              </div>

              <label className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-start gap-3 cursor-pointer hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  checked={projectForm.aiAssistanceDeclared}
                  onChange={(e) => setProjectForm({ ...projectForm, aiAssistanceDeclared: e.target.checked })}
                  className="mt-1 rounded bg-black border-white/20 text-[#73ba25] cursor-pointer"
                />
                <span className="text-[11px] text-slate-300 leading-snug">
                  I hereby declare that all pre existing libraries, external assets, and AI code generation tools have been transparently documented in the project repository README.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmittingProject}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-extrabold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(115,186,37,0.4)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmittingProject ? 'Locking Submission...' : 'Lock Project & Freeze Commit'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. TAB 3: MEAL VOUCHER TOKENS                                       */}
      {/* =================================================================== */}
      {activeTab === 'meals' && (
        <div className="space-y-6 font-mono text-xs animate-fade-in">
          {/* Day 2 Lunch Notice */}
          <div className="p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-3 text-slate-300">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold uppercase tracking-wider">
                Catering Logistics Notice:
              </strong>
              Day 2 lunch is not provided in the catering plan. South Indian breakfast is provided for the overnight builders; college campus cafes will be available during the Demo Arena.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealList.map((meal) => {
              const isClaimed = vouchers[meal.key]?.claimed;
              const IconComponent = meal.icon;

              return (
                <div
                  key={meal.key}
                  className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-200 ${
                    isClaimed
                      ? 'bg-black/50 border-white/[0.08] opacity-75'
                      : 'bg-gradient-to-br from-[#0c1811]/95 to-black/95 border-[#73ba25]/35 hover:border-[#73ba25]/70 shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isClaimed
                        ? 'bg-white/5 border-white/10 text-slate-400'
                        : 'bg-[#73ba25]/20 border-[#73ba25]/40 text-[#8ee631]'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-bold">{meal.time}</span>
                      </div>
                      <h4 className="font-heading font-bold text-white text-sm">
                        {meal.label}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        Entitlement: 1 Serving with badge QR
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isClaimed ? (
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold">
                        REDEEMED ✓
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-[#73ba25]/20 text-[#8ee631] border border-[#73ba25]/40 text-[10px] font-bold">
                        READY TO SCAN
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TAB 4: VERIFIABLE DIGITAL CERTIFICATE                            */}
      {/* =================================================================== */}
      {activeTab === 'cert' && (
        <div className="space-y-6 font-mono text-xs animate-fade-in">
          {!isCertUnlocked ? (
            /* =============================================================== */
            /* STATE A: COLD STORAGE AIR-GAPPED CRYPTOGRAPHIC LOCKDOWN ("LOCKED AS HELL") */
            /* =============================================================== */
            <div className="space-y-6">
              {/* Cold Vault Security HUD */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#180808]/95 via-[#0b0404]/95 to-[#020101]/95 border border-rose-500/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(225,29,72,0.2)] overflow-hidden backdrop-blur-2xl">
                {/* Specular Crimson Security Rail */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/90 to-transparent pointer-events-none" />

                {/* 4 Cyber Corner Chamfers in Crimson */}
                <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-rose-500 pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-rose-500 pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-rose-500 pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-rose-500 pointer-events-none" />

                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[350px] bg-rose-600/[0.05] blur-[150px] pointer-events-none rounded-full" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    {/* Security Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e0707] border border-rose-500/50 text-rose-400 font-pixel text-[8px] uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      <span>// LEVEL 5 CRYPTOGRAPHIC AIR GAP LOCKDOWN ACTIVE //</span>
                    </div>

                    <h2 
                      className="text-2xl sm:text-3xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] text-white select-none mb-2"
                      style={{ textShadow: '2px 2px 0 #3b0707, 4px 4px 0 #180303' }}
                    >
                      <span className="text-white">CREDENTIAL </span>
                      <span className="text-rose-500">SEALED IN VAULT</span>
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mb-4">
                      Official Digital Certificates of Technical Excellence are securely sealed in cold storage and cryptographically signed via GPG only after the Strict Buildathon Code Freeze, Upstream Code Verification, and the Grand Awards Podium ceremony.
                    </p>

                    {/* Security Telemetry Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-[11px] mb-2">
                      <div className="p-2.5 rounded-xl bg-black/70 border border-rose-500/25">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">VAULT ENCLAVE</span>
                        <span className="text-rose-400 font-bold">Air Gapped</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/70 border border-amber-500/25">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">RELEASE TARGET</span>
                        <span className="text-amber-300 font-bold">Jan 24 · 14:00</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/25">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">GPG SIGNATURES</span>
                        <span className="text-cyan-300 font-bold">3 Keys Required</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/70 border border-emerald-500/25">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">ATTENDEE STATUS</span>
                        <span className="text-emerald-400 font-bold">Verified Cap</span>
                      </div>
                    </div>
                  </div>

                  {/* Vault Lock Visual HUD & Action Buttons */}
                  <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-[#200808] border border-rose-500/50 flex items-center justify-center text-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.35)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent animate-pulse" />
                      <Lock className="w-9 h-9 text-rose-400 relative z-10" />
                    </div>

                    <button
                      disabled
                      className="px-5 py-2.5 rounded-xl bg-black/70 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-not-allowed opacity-75 shadow-inner"
                    >
                      <Lock className="w-4 h-4 text-rose-400" />
                      <span>Encrypted &amp; Sealed</span>
                    </button>

                    {/* Organizer Simulation Override Button */}
                    <button
                      onClick={toggleCertLock}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                      title="Organizer / Evaluator Test Mode"
                    >
                      <Unlock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Simulate Post Event Release (Unlock)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Blinded Watermark Enclave Preview */}
              <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 p-6 bg-[#030604] shadow-2xl">
                {/* Impenetrable Security Lockdown Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/75 backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-[#1f0909] border border-rose-500/60 flex items-center justify-center text-rose-500 mb-3 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                    <ShieldAlert className="w-8 h-8 text-rose-400" />
                  </div>
                  <div className="font-pixel text-sm text-white uppercase tracking-wider mb-1">
                    ACCESS RESTRICTED // COLD VAULT TIMELOCK ACTIVE
                  </div>
                  <div className="font-mono text-xs text-slate-300 max-w-md leading-relaxed mb-3">
                    Payload encrypted with SHA-256 and multi-signature authorization. Unlocks automatically upon closing valedictory podium ceremony at Newton School of Technology.
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>TIMELOCK COUNTDOWN: PODIUM FINALE · JAN 24, 2027 · 14:00 IST</span>
                  </div>
                </div>

                {/* Silhouette Blinded Preview with Heavy Filter */}
                <div className="filter blur-xl opacity-20 pointer-events-none select-none">
                  <div className="w-full h-96 bg-gradient-to-r from-emerald-950/40 via-black to-emerald-950/40 rounded-2xl border border-white/10 p-8 flex flex-col justify-between">
                    <div className="h-8 w-48 bg-white/20 rounded" />
                    <div className="h-16 w-96 bg-white/20 rounded mx-auto" />
                    <div className="h-6 w-72 bg-white/20 rounded mx-auto" />
                    <div className="h-10 w-full bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* STATE B: POST-EVENT UNLOCKED MASTERPIECE CERTIFICATE              */
            /* =============================================================== */
            <div className="space-y-6">
              {/* Unlocked Command Control Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c180e]/95 via-[#061108]/95 to-[#020703]/95 border border-[#73ba25]/40 shadow-[0_20px_50px_rgba(115,186,37,0.2)]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(115,186,37,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
                    <span>// OFFICIAL POST EVENT CREDENTIAL RELEASED //</span>
                  </div>
                  <h2 className="text-xl font-heading font-black text-white">
                    Official Digital Certificate of Technical Excellence
                  </h2>
                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                    <span>Cryptographic Verification Fingerprint:</span>
                    <strong className="text-[#8ee631] font-mono">SHA256: 8f4a1c02e5b98d3f7e6a5b4c1d2e3f4a</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={downloadCertificate}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-[#040807] font-mono text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(115,186,37,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download High Resolution SVG</span>
                  </button>

                  <button
                    onClick={handlePrintCertificate}
                    className="px-3.5 py-2.5 rounded-xl bg-black/70 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                    title="Print or Save as PDF"
                  >
                    <Printer className="w-4 h-4 text-slate-300" />
                    <span>Print PDF</span>
                  </button>

                  <button
                    onClick={handleCopyVerificationLink}
                    className="px-3.5 py-2.5 rounded-xl bg-black/70 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                    title="Copy Verification Link"
                  >
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    <span>Copy Link</span>
                  </button>

                  <button
                    onClick={toggleCertLock}
                    className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                    title="Re-seal Certificate Vault (Organizer Test)"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Re-lock Vault</span>
                  </button>
                </div>
              </div>

              {/* Masterpiece SVG Certificate Canvas */}
              <div className="border-2 border-[#73ba25]/45 rounded-3xl p-4 sm:p-6 bg-[#020503] flex justify-center shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-x-auto">
                <svg
                  id="geeko-certificate"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 700"
                  className="w-full max-w-[920px] h-auto rounded-2xl text-white font-sans shadow-2xl"
                  style={{ background: '#030805' }}
                >
                  <defs>
                    {/* Gradients */}
                    <radialGradient id="cert-radial-glow" cx="50%" cy="45%" r="65%">
                      <stop offset="0%" stopColor="#0b2416" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#05120b" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#020503" stopOpacity="1" />
                    </radialGradient>

                    <linearGradient id="gold-linear" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="35%" stopColor="#eab308" />
                      <stop offset="70%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#a16207" />
                    </linearGradient>

                    <linearGradient id="emerald-linear" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8ee631" />
                      <stop offset="50%" stopColor="#73ba25" />
                      <stop offset="100%" stopColor="#1e5414" />
                    </linearGradient>

                    <linearGradient id="cyan-linear" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>

                    {/* Fine Security Dot Pattern */}
                    <pattern id="cert-dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.75" fill="#73ba25" opacity="0.15" />
                    </pattern>
                  </defs>

                  {/* Main Rich Obsidian Background */}
                  <rect x="0" y="0" width="1000" height="700" rx="16" fill="url(#cert-radial-glow)" />
                  <rect x="0" y="0" width="1000" height="700" rx="16" fill="url(#cert-dot-grid)" opacity="0.8" />

                  {/* Harmonic Guilloche Security Sine Wave Curves */}
                  <g opacity="0.08" stroke="#73ba25" fill="none" strokeWidth="1">
                    <path d="M 50 150 Q 250 80, 500 150 T 950 150" />
                    <path d="M 50 180 Q 250 110, 500 180 T 950 180" />
                    <path d="M 50 210 Q 250 140, 500 210 T 950 210" />
                    <path d="M 50 490 Q 250 560, 500 490 T 950 490" />
                    <path d="M 50 520 Q 250 590, 500 520 T 950 520" />
                    <path d="M 50 550 Q 250 620, 500 550 T 950 550" />
                  </g>

                  {/* Outer Cyber Emerald Border */}
                  <rect x="18" y="18" width="964" height="664" rx="12" fill="none" stroke="url(#emerald-linear)" strokeWidth="2.5" opacity="0.9" />

                  {/* Inner 24K Gold Foil Dashed Border */}
                  <rect x="26" y="26" width="948" height="648" rx="8" fill="none" stroke="url(#gold-linear)" strokeWidth="1" strokeDasharray="16 4 4 4" opacity="0.85" />

                  {/* Third Hairline Enclave Border */}
                  <rect x="34" y="34" width="932" height="632" rx="6" fill="none" stroke="#16382c" strokeWidth="0.8" opacity="0.7" />

                  {/* 4 Ornate Cyber Corner Chamfer Brackets */}
                  <g fill="none" stroke="url(#emerald-linear)" strokeWidth="2.5">
                    {/* Top-Left */}
                    <path d="M 18 55 L 55 18 M 18 40 L 40 18 M 18 70 L 18 18 L 70 18" />
                    <circle cx="58" cy="58" r="3" fill="#8ee631" />
                    {/* Top-Right */}
                    <path d="M 982 55 L 945 18 M 982 40 L 960 18 M 982 70 L 982 18 L 930 18" />
                    <circle cx="942" cy="58" r="3" fill="#8ee631" />
                    {/* Bottom-Left */}
                    <path d="M 18 645 L 55 682 M 18 660 L 40 682 M 18 630 L 18 682 L 70 682" />
                    <circle cx="58" cy="642" r="3" fill="#8ee631" />
                    {/* Bottom-Right */}
                    <path d="M 982 645 L 945 682 M 982 660 L 960 682 M 982 630 L 982 682 L 930 682" />
                    <circle cx="942" cy="642" r="3" fill="#8ee631" />
                  </g>

                  {/* Corner Institutional Stamp Markers */}
                  <text x="65" y="44" fill="#94a3b8" fontSize="8" fontFamily="monospace" letterSpacing="1">NST S-VYASA CAMPUS · BENGALURU</text>
                  <text x="935" y="44" textAnchor="end" fill="#94a3b8" fontSize="8" fontFamily="monospace" letterSpacing="1">20H BUILDATHON · JAN 2027</text>
                  <text x="65" y="664" fill="#64748b" fontSize="8" fontFamily="monospace" letterSpacing="1">LAT 12.894° N, LNG 77.498° E</text>
                  <text x="935" y="664" textAnchor="end" fill="#64748b" fontSize="8" fontFamily="monospace" letterSpacing="1">openSUSE LINUX UPSTREAM</text>

                  {/* ========================================================= */}
                  {/* CENTRAL CREST: OFFICIAL VECTOR OPENSUSE GEEKO CHAMELEON   */}
                  {/* ========================================================= */}
                  <g transform="translate(500, 100)">
                    {/* Outer Heraldic Laurel Branches (Gold) */}
                    <g fill="none" stroke="url(#gold-linear)" strokeWidth="1.5" opacity="0.85">
                      <path d="M -50 0 C -60 -25, -60 -50, -40 -70 C -45 -55, -45 -40, -35 -25" />
                      <path d="M 50 0 C 60 -25, 60 -50, 40 -70 C 45 -55, 45 -40, 35 -25" />
                      <circle cx="-42" cy="-45" r="2.5" fill="#eab308" />
                      <circle cx="42" cy="-45" r="2.5" fill="#eab308" />
                      <circle cx="-50" cy="-25" r="2.5" fill="#eab308" />
                      <circle cx="50" cy="-25" r="2.5" fill="#eab308" />
                    </g>

                    {/* Emblem Halo & Circular Bezel */}
                    <circle cx="0" cy="-35" r="32" fill="#06160d" stroke="url(#emerald-linear)" strokeWidth="2" />
                    <circle cx="0" cy="-35" r="28" fill="none" stroke="url(#gold-linear)" strokeWidth="0.75" strokeDasharray="3 2" />

                    {/* Vector openSUSE Chameleon Head Profile & Eye */}
                    <path
                      d="M -12 -38 C -12 -48 -2 -54 8 -54 C 18 -54 24 -46 24 -38 C 24 -28 17 -22 8 -22 C 0 -22 -6 -26 -6 -32 C -6 -36 -2 -38 2 -38 C 5 -38 7 -36 7 -34"
                      fill="none"
                      stroke="#8ee631"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="-42" r="3.5" fill="#8ee631" />
                    <circle cx="10" cy="-42" r="1.5" fill="#040a06" />
                    <path d="M -8 -30 C -14 -28 -18 -22 -14 -18 C -10 -14 -4 -18 -6 -24" fill="none" stroke="#73ba25" strokeWidth="2" />
                  </g>

                  {/* Institutional Header Banner Text */}
                  <text x="500" y="152" textAnchor="middle" fill="url(#gold-linear)" fontSize="9.5" fontFamily="monospace" fontWeight="bold" letterSpacing="4">
                    openSUSE PROJECT · INTERNATIONAL OPEN SOURCE FOUNDATION
                  </text>
                  <text x="500" y="168" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" letterSpacing="3">
                    NEWTON SCHOOL OF TECHNOLOGY · S-VYASA UNIVERSITY CAMPUS, BENGALURU
                  </text>

                  {/* Main Certificate Title */}
                  <text
                    x="500"
                    y="208"
                    textAnchor="middle"
                    fill="url(#gold-linear)"
                    fontSize="23"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="3"
                  >
                    CERTIFICATE OF TECHNICAL EXCELLENCE
                  </text>
                  <text
                    x="500"
                    y="228"
                    textAnchor="middle"
                    fill="#8ee631"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="3"
                  >
                    &amp; UPSTREAM OPEN SOURCE MERIT
                  </text>
                  <text
                    x="500"
                    y="248"
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="11"
                    fontFamily="monospace"
                    letterSpacing="2"
                  >
                    20 Hour Flagship Geeko Buildathon · Bengaluru Connect 2027
                  </text>

                  {/* Conferred Lead */}
                  <text x="500" y="295" textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace" letterSpacing="3">
                    THIS OFFICIAL DIPLOMA OF RECOGNITION IS CONFERRED UPON
                  </text>

                  {/* Recipient Name in Signature Typography */}
                  <text
                    x="500"
                    y="348"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="32"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    letterSpacing="1"
                  >
                    {user?.name || 'Aarav Sharma'}
                  </text>

                  {/* Luxurious Gold Accent Line with Center Diamond */}
                  <line x1="240" y1="362" x2="760" y2="362" stroke="url(#gold-linear)" strokeWidth="1.2" opacity="0.85" />
                  <polygon points="500,358 505,362 500,366 495,362" fill="#eab308" />

                  {/* Attendee Credentials Bar */}
                  <text x="500" y="384" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" letterSpacing="1">
                    CREDENTIAL ID: {user?.ticketId || 'GEEKO-2027-BLR-042'}  ·  TEAM: {user?.teamName || submittedTeam?.name || 'KERNEL KNIGHTS'}  ·  TRACK: 01 (KERNEL &amp; SYSTEMS)
                  </text>

                  {/* Official Citation Text */}
                  <text x="500" y="420" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                    In formal recognition of technical proficiency, continuous upstream open source contribution, and
                  </text>
                  <text x="500" y="438" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                    collaborative engineering excellence demonstrated during the 20 hour intensive hackathon at Newton School of Technology.
                  </text>

                  {/* ========================================================= */}
                  {/* TRIPLE SIGNATORY AUTHORITY BLOCKS                         */}
                  {/* ========================================================= */}
                  {/* Signatory 1: Divyanshu Prakash (General Chair) */}
                  <g transform="translate(190, 520)">
                    {/* Realistic Vector Signature Line */}
                    <path d="M -45 -14 Q -20 -28, 5 -12 T 35 -18 T 55 -8" fill="none" stroke="#8ee631" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                    <line x1="-70" y1="0" x2="70" y2="0" stroke="url(#emerald-linear)" strokeWidth="1" />
                    <text x="0" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Divyanshu Prakash</text>
                    <text x="0" y="29" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">General Chair &amp; Core Lead</text>
                    <text x="0" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="monospace">openSUSE India</text>
                  </g>

                  {/* Signatory 2: Dushyant Acharya (Operations Lead) */}
                  <g transform="translate(500, 520)">
                    {/* Realistic Vector Signature Line */}
                    <path d="M -45 -12 Q -15 -30, 10 -10 T 35 -20 T 55 -6" fill="none" stroke="#8ee631" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                    <line x1="-70" y1="0" x2="70" y2="0" stroke="url(#emerald-linear)" strokeWidth="1" />
                    <text x="0" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Dushyant Acharya</text>
                    <text x="0" y="29" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">Operations &amp; Logistics Lead</text>
                    <text x="0" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="monospace">openSUSE India</text>
                  </g>

                  {/* Signatory 3: Rithull Raj Kallat (Upstream Lead) */}
                  <g transform="translate(810, 520)">
                    {/* Realistic Vector Signature Line */}
                    <path d="M -45 -10 Q -25 -25, 0 -12 T 30 -22 T 55 -8" fill="none" stroke="#8ee631" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                    <line x1="-70" y1="0" x2="70" y2="0" stroke="url(#emerald-linear)" strokeWidth="1" />
                    <text x="0" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Rithull Raj Kallat</text>
                    <text x="0" y="29" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">Program &amp; Judging Lead</text>
                    <text x="0" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="monospace">openSUSE India</text>
                  </g>

                  {/* ========================================================= */}
                  {/* EMBOSSED 24-POINT GOLD STARBURST MEDALLION SEAL           */}
                  {/* ========================================================= */}
                  <g transform="translate(870, 420)">
                    {/* Double Emerald Ribbon Tails */}
                    <polygon points="-8,25 -22,70 -8,60 0,68" fill="#143d22" stroke="url(#gold-linear)" strokeWidth="0.8" />
                    <polygon points="8,25 22,70 8,60 0,68" fill="#143d22" stroke="url(#gold-linear)" strokeWidth="0.8" />

                    {/* 24-Point Gold Starburst Polygon */}
                    <path
                      d="M 0 -34 L 7 -27 L 17 -30 L 21 -20 L 31 -18 L 30 -8 L 36 0 L 30 8 L 31 18 L 21 20 L 17 30 L 7 27 L 0 34 L -7 27 L -17 30 L -21 20 L -31 18 L -30 8 L -36 0 L -30 -8 L -31 -18 L -21 -20 L -17 -30 L -7 -27 Z"
                      fill="url(#gold-linear)"
                      stroke="#854d0e"
                      strokeWidth="1"
                    />
                    <circle cx="0" cy="0" r="23" fill="#081d11" stroke="#facc15" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="19" fill="none" stroke="#73ba25" strokeWidth="0.8" strokeDasharray="3 2" />
                    <text x="0" y="-8" textAnchor="middle" fill="#facc15" fontSize="5.5" fontFamily="monospace" fontWeight="bold">OFFICIAL</text>
                    <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fontWeight="bold">2027</text>
                    <text x="0" y="10" textAnchor="middle" fill="#8ee631" fontSize="5" fontFamily="monospace" fontWeight="bold">SEAL</text>
                  </g>

                  {/* ========================================================= */}
                  {/* VECTOR QR CODE & CRYPTOGRAPHIC LEDGER PROOF              */}
                  {/* ========================================================= */}
                  <g transform="translate(100, 400)">
                    {/* QR Frame */}
                    <rect x="-24" y="-24" width="48" height="48" rx="6" fill="#040b07" stroke="url(#emerald-linear)" strokeWidth="1.2" />
                    {/* Simulated Authentic Vector QR Grid Modules */}
                    <rect x="-18" y="-18" width="14" height="14" fill="#8ee631" />
                    <rect x="-16" y="-16" width="10" height="10" fill="#040b07" />
                    <rect x="-14" y="-14" width="6" height="6" fill="#8ee631" />

                    <rect x="4" y="-18" width="14" height="14" fill="#8ee631" />
                    <rect x="6" y="-16" width="10" height="10" fill="#040b07" />
                    <rect x="8" y="-14" width="6" height="6" fill="#8ee631" />

                    <rect x="-18" y="4" width="14" height="14" fill="#8ee631" />
                    <rect x="-16" y="6" width="10" height="10" fill="#040b07" />
                    <rect x="-14" y="8" width="6" height="6" fill="#8ee631" />

                    <rect x="-2" y="-2" width="4" height="4" fill="#8ee631" />
                    <rect x="6" y="6" width="4" height="4" fill="#8ee631" />
                    <rect x="12" y="12" width="4" height="4" fill="#8ee631" />
                    <rect x="-2" y="10" width="4" height="4" fill="#8ee631" />

                    <text x="0" y="34" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" letterSpacing="0.5">SCAN TO VERIFY</text>
                  </g>

                  {/* Central Cryptographic Footprint Bar */}
                  <text x="500" y="618" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">
                    VERIFIED REGISTRY RECORD: SHA-256(openSUSE-CONNECT-2027-{user?.ticketId || 'GEEKO-BLR-042'}-VALIDATED)
                  </text>
                  <text x="500" y="632" textAnchor="middle" fill="#334155" fontSize="7.5" fontFamily="monospace">
                    IMMUTABLE LEDGER · LICENSED UNDER GNU GPLv3 &amp; CREATIVE COMMONS ATTRIBUTION 4.0 INTERNATIONAL
                  </text>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
