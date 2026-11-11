import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  Trophy,
  DollarSign,
  Utensils,
  Megaphone,
  Trash2,
  Building,
  Check,
  X,
  Clock,
  Sparkles,
  LogOut,
  Moon,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  Award,
  Radio,
  Copy,
  ExternalLink,
  ChevronRight,
  Filter,
  Lock,
  Unlock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Admin() {
  const { user, token, logout } = useAuth();
  const { toast } = useToast();

  const [overview, setOverview] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('metrics');
  const [statusFilter, setStatusFilter] = useState('all');

  // Scanner state
  const [scanTicketId, setScanTicketId] = useState('GEEKO-2027-BLR-042');
  const [scanMealType, setScanMealType] = useState('d1_welcome');
  const [scanResult, setScanResult] = useState(null);

  // Announcement state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState('medium');
  const [announcements, setAnnouncements] = useState([]);

  // Certificate Global Vault Release State
  const [isCertUnlocked, setIsCertUnlocked] = useState(() => {
    return localStorage.getItem('geeko_cert_unlocked') === 'true';
  });

  const toggleAdminCertLock = () => {
    const nextState = !isCertUnlocked;
    setIsCertUnlocked(nextState);
    localStorage.setItem('geeko_cert_unlocked', String(nextState));
    window.dispatchEvent(new Event('geeko_cert_unlock_changed'));
    if (nextState) {
      sounds.success?.();
      confetti({ particleCount: 75, spread: 70 });
      toast('Certificates released! All participants can now download and view.', 'success');
    } else {
      sounds.click?.();
      toast('Certificates re-sealed into air gapped cryptographic cold vault.', 'info');
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    if (!token) return;

    fetch('/api/admin/overview', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setOverview)
      .catch(console.error);

    fetch('/api/admin/attendees', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setAttendees)
      .catch(console.error);

    fetch('/api/announcements')
      .then((r) => r.json())
      .then(setAnnouncements)
      .catch(console.error);
  };

  const handleCheckIn = async (e, manualTicketId = null) => {
    if (e) e.preventDefault();
    const targetTicket = manualTicketId || scanTicketId;
    if (!targetTicket?.trim()) return;

    sounds.click();
    try {
      const res = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketId: targetTicket }),
      });

      const data = await res.json();
      setScanResult(data);

      if (data.success) {
        sounds.success();
        confetti({ particleCount: 35, spread: 50 });
        toast(data.message, 'success');
        fetchData();
      } else {
        toast(data.error || 'Check-in failed', 'error');
      }
    } catch {
      toast('Network error verifying badge', 'error');
    }
  };

  const handleMealRedeem = async () => {
    if (!scanTicketId.trim()) return;
    sounds.click();

    try {
      const res = await fetch('/api/admin/claim-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketId: scanTicketId, mealType: scanMealType }),
      });

      const data = await res.json();
      if (data.success) {
        sounds.success();
        confetti({ particleCount: 25, spread: 40 });
        toast(data.message, 'success');
        fetchData();
      } else {
        toast(data.error || 'Meal redeem failed', 'error');
      }
    } catch {
      toast('Network error redeeming meal token', 'error');
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: annTitle, content: annContent, priority: annPriority }),
      });

      const data = await res.json();
      if (data.success) {
        sounds.success();
        toast('Announcement broadcast published to site banner!', 'success');
        setAnnTitle('');
        setAnnContent('');
        fetchData();
      }
    } catch {
      toast('Failed to post announcement', 'error');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await fetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      sounds.click();
      toast('Announcement removed', 'info');
      fetchData();
    } catch {
      toast('Error deleting announcement', 'error');
    }
  };

  const handleScoreTeam = async (teamId, score, isFinalist) => {
    try {
      const res = await fetch('/api/admin/teams/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamId, score, isFinalist }),
      });

      const data = await res.json();
      if (data.success) {
        sounds.success();
        toast(`Updated ${data.team.name} score to ${score}`, 'success');
        fetchData();
      }
    } catch {
      toast('Error scoring team', 'error');
    }
  };

  const exportAttendeesCsv = () => {
    sounds.click();
    const headers = ['TicketID', 'Name', 'Email', 'Role', 'Team', 'Overnight', 'Diet', 'CheckedIn'];
    const rows = attendees.map((a) => [
      a.ticketId,
      `"${a.name}"`,
      a.email,
      a.role,
      `"${a.teamName || 'None'}"`,
      a.isOvernight ? 'YES' : 'NO',
      a.diet,
      a.checkedIn ? 'YES' : 'NO',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'openSUSE_Bengaluru_2027_Attendees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast('Attendee roster CSV downloaded!', 'success');
  };

  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.teamName && a.teamName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter === 'checkedIn') return a.checkedIn;
    if (statusFilter === 'pending') return !a.checkedIn;
    if (statusFilter === 'overnight') return a.isOvernight;
    return true;
  });

  const totalRegistered = overview?.metrics?.totalRegistered || attendees.length || 172;
  const checkedInCount = overview?.metrics?.checkedIn || attendees.filter(a => a.checkedIn).length || 4;
  const overnightCount = overview?.metrics?.overnightBuilders || attendees.filter(a => a.isOvernight).length || 5;
  const teamsCount = overview?.metrics?.totalTeams || 8;
  const finalistsCount = overview?.metrics?.finalistsCount || 6;
  const capPercentage = Math.round((totalRegistered / 250) * 100);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-20 left-1/4 -translate-y-1/2 w-[550px] h-[450px] bg-amber-500/[0.035] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-[#73ba25]/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* =================================================================== */}
      {/* 1. EXECUTIVE COMMAND HEADER & OFFICER DOSSIER                       */}
      {/* =================================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0c130d]/95 via-[#060b07]/95 to-[#020503]/95 border border-amber-500/30 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] mb-8 overflow-hidden backdrop-blur-2xl">
        {/* Specular Amber Horizon Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent pointer-events-none" />
        
        {/* Corner Cyber Chamfer Brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            {/* Mission Identifier Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#130d04] border border-amber-500/40 text-amber-400 font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>AUTHORIZED ORGANIZER PORTAL // COMMAND &amp; TELEMETRY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            </div>

            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] text-white select-none"
              style={{ textShadow: '2px 2px 0 #2b1b04, 4px 4px 0 #0f0a02' }}
            >
              <span>OPERATIONS &amp; </span>
              <span className="text-amber-400">CONTROL CONSOLE</span>
            </h1>

            {/* Officer Info Strip */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs mt-3 text-slate-300">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">Officer:</span>
                <strong className="text-white font-bold">{user?.name || 'Divyanshu Prakash'}</strong>
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] uppercase font-bold border border-amber-400/40">
                  {user?.role || 'admin'}
                </span>
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

          {/* Quick Stats Pill Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-black/70 border border-amber-500/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">CAP FILLED</span>
              <span className="text-base font-bold text-amber-400 font-heading">{capPercentage}%</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/70 border border-emerald-500/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">ACTIVE SCANS</span>
              <span className="text-base font-bold text-emerald-400 font-heading">{checkedInCount} Live</span>
            </div>
            <div className="col-span-2 sm:col-span-1 px-3.5 py-2 rounded-xl bg-black/70 border border-cyan-500/30 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">TEAMS FLAG</span>
              <span className="text-base font-bold text-cyan-400 font-heading">{finalistsCount} Final</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SLEEK NAVIGATION CARTRIDGE                                          */}
        {/* =================================================================== */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs relative z-10">
          {[
            { id: 'metrics', label: 'Telemetry & Budget', icon: Activity },
            { id: 'scanner', label: 'Door & Meal Scanner', icon: QrCode },
            { id: 'attendees', label: `Attendee Roster (${attendees.length || 172})`, icon: Users },
            { id: 'judging', label: 'Judging & Pitches', icon: Trophy },
            { id: 'broadcast', label: 'Live Broadcasts', icon: Megaphone },
            { id: 'sponsors', label: 'Partner Inquiries', icon: Building },
          ].map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  sounds.click();
                }}
                onMouseEnter={() => sounds.hover?.()}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 font-bold uppercase tracking-wider cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.45)] scale-[1.02]'
                    : 'bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span className="text-[11px]">{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. TAB 1: METRICS & TELEMETRY OVERVIEW                              */}
      {/* =================================================================== */}
      {activeSection === 'metrics' && (
        <div className="space-y-6 font-mono text-xs animate-fade-in">
          {/* 4 Heroic Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Total Registrations */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-[#120d05]/95 via-[#090703]/95 to-black/95 border border-amber-500/35 p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:border-amber-400/70 transition-all hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Registration Quota
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
                  {totalRegistered} <span className="text-slate-500 text-lg font-mono">/ 250</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700 shadow-[0_0_10px_#f59e0b]"
                    style={{ width: `${Math.min(100, capPercentage)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-amber-300 pt-2 border-t border-amber-500/20">
                <span>{capPercentage}% Cap Claimed</span>
                <span className="text-slate-400">{250 - totalRegistered} Seats Open</span>
              </div>
            </div>

            {/* Card 2: Checked-In Attendees */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-[#06151f]/95 via-[#030c12]/95 to-black/95 border border-cyan-500/35 p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:border-cyan-400/70 transition-all hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Live Gate Check-Ins
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-heading tracking-tight mb-2">
                  {checkedInCount}
                </div>
                <div className="text-slate-400 text-[11px] leading-snug">
                  Active QR badge scans at NST main entrance gate.
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 pt-2 border-t border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Door Terminal Ready</span>
              </div>
            </div>

            {/* Card 3: Overnight Builders */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-[#081a10]/95 via-[#040e08]/95 to-black/95 border border-[#73ba25]/35 p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:border-[#73ba25]/70 transition-all hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Overnight Stayers
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#73ba25]/20 border border-[#73ba25]/40 flex items-center justify-center text-[#8ee631]">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#8ee631] font-heading tracking-tight mb-2">
                  {overnightCount}
                </div>
                <div className="text-slate-400 text-[11px] leading-snug">
                  18+ legal consent &amp; overnight dorm wristbands issued.
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 pt-2 border-t border-[#73ba25]/20">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Campus MoU Safe</span>
              </div>
            </div>

            {/* Card 4: Teams & Finalists */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-[#170e05]/95 via-[#0c0702]/95 to-black/95 border border-yellow-500/35 p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:border-yellow-400/70 transition-all hover:-translate-y-0.5">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Buildathon Teams
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400 font-heading tracking-tight mb-2">
                  {teamsCount} <span className="text-slate-500 text-lg font-mono">/ 83</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-snug">
                  {finalistsCount} Top Finalists flagged for main auditorium pitch.
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-yellow-300 pt-2 border-t border-yellow-500/20">
                <span>⭐ {finalistsCount} Finalists</span>
                <span className="text-slate-400">6 Tracks</span>
              </div>
            </div>
          </div>

          {/* Operational Headcount & Budget Ledger Deck */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-[#020503]/95 border border-white/10 p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.85)] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9.5px] font-bold uppercase tracking-wider mb-1">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span>Proposal Documentation (pp. 14 to 16)</span>
                </div>
                <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                  Operational Headcount &amp; Budget Ledger
                </h3>
              </div>
              <span className="text-slate-400 text-[11px] font-mono">
                Approved by openSUSE India &amp; NST Faculty
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Box 1: Catering */}
              <div className="p-4.5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden group hover:border-[#73ba25]/40 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-400 text-[11px] font-bold uppercase">
                  <Utensils className="w-3.5 h-3.5 text-[#8ee631]" />
                  <span>Site Headcount Allocation</span>
                </div>
                <div className="text-2xl font-black text-white font-heading mb-1">
                  280 Servings
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  250 Builders + 30 Organizers/Crew. Full catering coverage including biryani feast &amp; breakfast.
                </p>
              </div>

              {/* Box 2: Total Budget */}
              <div className="p-4.5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-400 text-[11px] font-bold uppercase">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Operational Event Budget</span>
                </div>
                <div className="text-2xl font-black text-white font-heading mb-1">
                  ₹2,50,000
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Covers dual generator power, gigabit network switches, catering, merch kits &amp; speaker logistics.
                </p>
              </div>

              {/* Box 3: Cash Prizes */}
              <div className="p-4.5 rounded-2xl bg-black/60 border border-amber-500/25 relative overflow-hidden group hover:border-amber-400/60 transition-colors bg-gradient-to-br from-amber-500/[0.04] to-transparent">
                <div className="flex items-center gap-2 mb-2 text-amber-300 text-[11px] font-bold uppercase">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Podium Cash Allocation</span>
                </div>
                <div className="text-2xl font-black text-amber-400 font-heading mb-1">
                  ₹50,000
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Guaranteed prize money reserved in escrow for the top 6 track champions &amp; grand buildathon podium.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Release Authority Deck */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0e1610]/95 via-[#07100a]/95 to-[#020503]/95 border border-[#73ba25]/30 p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.85)] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#73ba25]/15 border border-[#73ba25]/30 text-[#8ee631] text-[9.5px] font-bold uppercase tracking-wider mb-1">
                  <Award className="w-3 h-3 text-[#8ee631]" />
                  <span>Credential Distribution Authority</span>
                </div>
                <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                  Participant Certificate Release Vault
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  isCertUnlocked
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                }`}>
                  {isCertUnlocked ? '● Live Released to Attendees' : '● Air Gapped Cold Storage (Locked)'}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-4.5 rounded-2xl bg-black/60 border border-white/10">
              <div className="space-y-1 max-w-xl">
                <div className="font-bold text-white text-xs">
                  Global Release Condition: Code Freeze &amp; Podium Signoff
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  By default, all digital participation and excellence certificates are strictly locked in cold storage until the Grand Awards ceremony on Sunday, Jan 24 at 14:00 IST. Toggle below to release or re-seal certificates across all participant dashboards.
                </p>
              </div>

              <button
                onClick={toggleAdminCertLock}
                className={`px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg ${
                  isCertUnlocked
                    ? 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300'
                    : 'bg-gradient-to-r from-[#73ba25] via-[#8ee631] to-[#73ba25] text-black shadow-[0_0_20px_rgba(115,186,37,0.4)] hover:scale-[1.02]'
                }`}
              >
                {isCertUnlocked ? (
                  <>
                    <Lock className="w-4 h-4 text-rose-400" />
                    <span>Seal Certificates Into Vault</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-black" />
                    <span>Release Certificates Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. TAB 2: QR DOOR CHECK-IN & MEAL REDEEMER                          */}
      {/* =================================================================== */}
      {activeSection === 'scanner' && (
        <div className="max-w-3xl mx-auto space-y-6 font-mono text-xs animate-fade-in">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-black/95 border border-amber-500/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Top Highlight Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-heading font-black text-white tracking-tight">
                  Door Check-in &amp; SPOC Terminal
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Verify attendee credentials, issue overnight wristbands &amp; punch meal vouchers.
                </p>
              </div>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="my-4 p-3 rounded-xl bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-400 font-semibold">Test Roster Credentials:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScanTicketId('GEEKO-2027-BLR-042')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all text-[10px]"
                >
                  Aarav (BLR-042)
                </button>
                <button
                  type="button"
                  onClick={() => setScanTicketId('GEEKO-2027-BLR-001')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all text-[10px]"
                >
                  Neha (BLR-001)
                </button>
                <button
                  type="button"
                  onClick={() => setScanTicketId('GEEKO-2027-BLR-015')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all text-[10px]"
                >
                  Kavya (BLR-015)
                </button>
              </div>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div>
                <label className="text-slate-300 block mb-1.5 font-bold uppercase text-[10.5px]">
                  Scan Pass Barcode or Enter Ticket ID *
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    required
                    value={scanTicketId}
                    onChange={(e) => setScanTicketId(e.target.value)}
                    placeholder="e.g. GEEKO-2027-BLR-042"
                    className="flex-1 bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400 font-mono tracking-wider transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Verify &amp; Check In
                  </button>
                </div>
              </div>
            </form>

            {/* Meal Voucher Punch Section */}
            <div className="mt-7 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 text-white font-bold text-sm font-heading">
                <Utensils className="w-4 h-4 text-[#8ee631]" />
                <span>Punch Attendee Catering Token</span>
              </div>
              <p className="text-slate-400 text-[11px] mb-3">
                Select meal entitlement for the currently loaded ticket to punch voucher.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <select
                  value={scanMealType}
                  onChange={(e) => setScanMealType(e.target.value)}
                  className="flex-1 bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono cursor-pointer"
                >
                  <option value="d1_welcome">Day 1 Welcome Tea &amp; Refreshments</option>
                  <option value="d1_lunch">Day 1 Campus Lunch (280 Servings)</option>
                  <option value="d1_tea">Day 1 Evening Chai &amp; Snacks</option>
                  <option value="d1_dinner">Day 1 Overnight Hot Dinner</option>
                  <option value="d1_late_snack">Day 1 Midnight Snacks &amp; Red Bull</option>
                  <option value="d2_breakfast">Day 2 South Indian Breakfast</option>
                </select>
                <button
                  onClick={handleMealRedeem}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#73ba25] to-[#8ee631] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-extrabold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(115,186,37,0.3)] cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Punch Token
                </button>
              </div>
            </div>

            {/* Scan Result Feedback Card */}
            {scanResult && (
              <div
                className={`mt-6 p-5 rounded-2xl border transition-all ${
                  scanResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/35 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                  {scanResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span>{scanResult.message}</span>
                </div>

                {scanResult.user && (
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-[11px] text-slate-300 space-y-1 mt-2 font-mono">
                    <div className="text-white font-bold text-xs">{scanResult.user.name} ({scanResult.user.email})</div>
                    <div className="flex items-center gap-3 pt-1">
                      <span>Overnight: <strong className={scanResult.user.isOvernight ? 'text-emerald-400' : 'text-slate-400'}>{scanResult.user.isOvernight ? 'YES (18+ Verified)' : 'Daytime Only'}</strong></span>
                      <span>•</span>
                      <span>Diet: <strong className="text-white">{scanResult.user.diet}</strong></span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. TAB 3: ATTENDEE ROSTER (250 CAP)                                 */}
      {/* =================================================================== */}
      {activeSection === 'attendees' && (
        <div className="space-y-5 font-mono text-xs animate-fade-in">
          {/* Search, Filter & Export Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, ticket ID, or team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#040806] border border-white/15 text-white text-xs outline-none focus:border-amber-400 transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[10.5px]">
                {[
                  { id: 'all', label: `All (${attendees.length})` },
                  { id: 'checkedIn', label: `Checked In (${attendees.filter(a => a.checkedIn).length})` },
                  { id: 'pending', label: `Pending (${attendees.filter(a => !a.checkedIn).length})` },
                  { id: 'overnight', label: `Overnight (${attendees.filter(a => a.isOvernight).length})` },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setStatusFilter(f.id);
                      sounds.click();
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer shrink-0 ${
                      statusFilter === f.id
                        ? 'bg-amber-400 text-black'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={exportAttendeesCsv}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#73ba25]/20 hover:bg-[#73ba25] text-[#8ee631] hover:text-black border border-[#73ba25]/50 font-bold transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(115,186,37,0.2)]"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster CSV</span>
            </button>
          </div>

          {/* Attendee Data Table */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#070e0a]/90 to-black/90 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/80 text-slate-400 text-[10.5px] border-b border-white/10 uppercase tracking-wider font-pixel">
                  <tr>
                    <th className="p-3.5 pl-5">Ticket ID</th>
                    <th className="p-3.5">Attendee</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Team</th>
                    <th className="p-3.5">Overnight</th>
                    <th className="p-3.5">Diet</th>
                    <th className="p-3.5">Gate Status</th>
                    <th className="p-3.5 pr-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-slate-300">
                  {filteredAttendees.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400 font-pixel text-xs">
                        NO ATTENDEES MATCH "{searchTerm.toUpperCase()}".
                      </td>
                    </tr>
                  ) : (
                    filteredAttendees.map((att) => (
                      <tr key={att.id} className="hover:bg-white/[0.04] transition-colors group">
                        <td className="p-3.5 pl-5 font-bold text-amber-400 font-mono text-xs">
                          {att.ticketId}
                        </td>
                        <td className="p-3.5">
                          <div className="font-heading font-bold text-white text-xs">{att.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{att.email}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px] capitalize font-semibold">
                            {att.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-xs text-slate-200">
                          {att.teamName ? (
                            <span className="text-[#8ee631] font-semibold">{att.teamName}</span>
                          ) : (
                            <span className="text-slate-500">Unassigned</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {att.isOvernight ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                              18+ Verified
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Daytime</span>
                          )}
                        </td>
                        <td className="p-3.5 text-xs text-slate-300">{att.diet}</td>
                        <td className="p-3.5">
                          {att.checkedIn ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              CHECKED IN
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-400 text-[10px] border border-white/10">
                              PENDING
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          {!att.checkedIn ? (
                            <button
                              onClick={() => handleCheckIn(null, att.ticketId)}
                              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-500/40 text-[10px] font-bold transition-all cursor-pointer"
                            >
                              Check In
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[10px] font-mono">Checked ✓</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TAB 4: JUDGING & LANE SCORING (83 TEAMS)                         */}
      {/* =================================================================== */}
      {activeSection === 'judging' && (
        <div className="space-y-6 font-mono text-xs animate-fade-in">
          {/* Judging Rubric Bar */}
          <div className="p-4.5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-300">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
              <span><strong>6 Parallel Lanes</strong> · 12 Judges · 5-Point Rubric (25 / 25 / 20 / 15 / 15)</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 font-bold text-[10.5px]">
              Top 6 Advance to Auditorium Main Stage
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {(overview?.teams || []).map((team) => (
              <div
                key={team.id}
                className={`p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                  team.isFinalist
                    ? 'bg-gradient-to-br from-[#1c1204]/95 to-black/95 border-amber-500/50 shadow-[0_8px_25px_rgba(245,158,11,0.2)]'
                    : 'bg-black/60 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 font-bold text-[10px]">
                    Table #{team.tableNumber} · Lane {team.laneNumber}
                  </span>
                  <span className="text-slate-400 text-[10px]">{team.trackName}</span>
                </div>

                <h4 className="font-heading font-black text-white text-base tracking-tight mb-1">
                  {team.projectTitle || team.name}
                </h4>
                <div className="text-[11px] text-slate-400 mb-3">Team: <strong className="text-white">{team.name}</strong></div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Score:</span>
                    <input
                      type="number"
                      defaultValue={team.score}
                      onBlur={(e) =>
                        handleScoreTeam(team.id, parseFloat(e.target.value), team.isFinalist)
                      }
                      className="w-16 bg-black border border-white/20 rounded-lg px-2.5 py-1 text-white font-bold text-center outline-none focus:border-amber-400"
                    />
                    <span className="text-slate-500">/ 100</span>
                  </div>

                  <button
                    onClick={() => handleScoreTeam(team.id, team.score, !team.isFinalist)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      team.isFinalist
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15'
                    }`}
                  >
                    <span>{team.isFinalist ? '⭐ Finalist Active' : 'Flag as Finalist'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 6. TAB 5: BROADCAST ANNOUNCEMENTS                                   */}
      {/* =================================================================== */}
      {activeSection === 'broadcast' && (
        <div className="max-w-3xl mx-auto space-y-6 font-mono text-xs animate-fade-in">
          <div className="rounded-3xl bg-gradient-to-br from-[#0c140e]/95 via-[#060c08]/95 to-black/95 border border-[#73ba25]/40 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#73ba25]/20 border border-[#73ba25]/40 flex items-center justify-center text-[#8ee631] shadow-[0_0_15px_rgba(115,186,37,0.2)]">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-heading font-black text-white tracking-tight">
                  Broadcast Live Website Announcement
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Pushes urgent alerts to the floating notification ticker visible to all builders.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                  Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. First Commit Ceremony Commencing in 15 Minutes!"
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold text-[10.5px] uppercase">
                  Message Content *
                </label>
                <textarea
                  rows={2}
                  required
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="All teams assemble at Main Build Hall with repository initial commits prepared..."
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <select
                  value={annPriority}
                  onChange={(e) => setAnnPriority(e.target.value)}
                  className="bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#73ba25] font-mono cursor-pointer"
                >
                  <option value="high">Priority: High (Red / Alert)</option>
                  <option value="medium">Priority: Medium (Geeko Green)</option>
                  <option value="info">Priority: Informational</option>
                </select>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#73ba25] to-[#8ee631] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-extrabold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(115,186,37,0.3)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>

          {/* Active Broadcasts */}
          <div className="space-y-3">
            <h4 className="text-slate-400 uppercase font-bold text-xs tracking-wider flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active Broadcast Feed</span>
            </h4>
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4.5 rounded-2xl bg-black/60 border border-white/10 flex items-start justify-between gap-4 shadow-lg hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-white text-sm">{ann.title}</span>
                    <span className={`px-2 py-0.2 rounded text-[8.5px] uppercase font-bold border ${
                      ann.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {ann.priority}
                    </span>
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed">{ann.content}</div>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(ann.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 7. TAB 6: SPONSORSHIP INQUIRIES                                     */}
      {/* =================================================================== */}
      {activeSection === 'sponsors' && (
        <div className="space-y-4 font-mono text-xs animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-heading font-black text-base text-white">
              Corporate &amp; Community Inquiries (Outreach Pipeline)
            </h3>
            <span className="text-slate-400">{overview?.inquiries?.length || 0} Inquiries</span>
          </div>

          <div className="space-y-3.5">
            {(overview?.inquiries || []).map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-white text-base">{inq.companyName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Contact: <strong className="text-white">{inq.contactName}</strong> ({inq.email}) · Date: {inq.date}
                  </div>
                  <div className="text-amber-400 text-xs mt-1 font-semibold">
                    Requested Tier: {inq.tier}
                  </div>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">{inq.message}</p>
                </div>

                <a
                  href={`mailto:${inq.email}?subject=openSUSE India 2027 Sponsorship Follow-up`}
                  className="px-5 py-2.5 rounded-xl bg-[#73ba25]/20 hover:bg-[#73ba25] text-[#8ee631] hover:text-black border border-[#73ba25]/40 font-bold shrink-0 text-center transition-all cursor-pointer shadow-[0_0_15px_rgba(115,186,37,0.2)]"
                >
                  Reply via Email
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
