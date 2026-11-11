import React, { useState } from 'react';
import {
  Mic,
  Clock,
  BookOpen,
  MapPin,
  ExternalLink,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  Terminal,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useToast } from '../context/ToastContext';

export default function Speakers() {
  const [proposal, setProposal] = useState({
    name: '',
    email: '',
    role: '',
    title: '',
    abstract: '',
    track: 'Systems & Architecture',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const talks = [
    {
      num: '01',
      slot: '10:05 to 10:45 IST (40 min)',
      title: 'State of openSUSE: From Desktop to Edge and Enterprise',
      speaker: 'Featured openSUSE Community Contributor',
      type: 'Keynote Address',
      desc: 'An exploration of the current openSUSE landscape: Tumbleweed for rolling-release workstations, Leap for predictable deployments, MicroOS / Aeon for immutable containerized hosts, and the openSUSE Build Service (OBS) ecosystem.',
      takeaways: [
        'How transactional updates work in immutable MicroOS systems',
        'Package lifecycle and repository branching in OBS',
        'Getting involved in openSUSE governance and global community initiatives',
      ],
    },
    {
      num: '02',
      slot: '10:45 to 11:25 IST (40 min)',
      title: 'Packaging for Linux: From Source Tarball to Zypper Install',
      speaker: 'Senior Distribution Packager & Maintainer',
      type: 'Architecture Deep Dive',
      desc: 'A practical, technical walkthrough of creating, maintaining, and automating distribution packages. Deconstructing .spec files, patch management, build dependency trees, and using OBS automated build matrices.',
      takeaways: [
        'Writing clean, reproducible RPM spec files from scratch',
        'Handling upstream dependencies and cross-compilation targets',
        'Leveraging Open Build Service command line client (osc)',
      ],
    },
    {
      num: '03',
      slot: '11:25 to 12:05 IST (40 min)',
      title: 'Building Production Infrastructure with MicroOS, Podman & SELinux',
      speaker: 'DevOps & Systems Engineering Specialist',
      type: 'Systems & Security',
      desc: 'Architecting resilient, container-native Linux servers. Explores rootless Podman containers, SELinux policy enforcement, healthchecks, and auto-rollback mechanics using transactional btrfs snapshots.',
      takeaways: [
        'Running rootless containers securely with Quadlet systemd integration',
        'Configuring SELinux booleans without disabling security features',
        'Automated rollbacks on boot failure using snapper & btrfs',
      ],
    },
  ];

  const labs = [
    {
      num: 'LAB A',
      slot: '12:05 to 12:50 IST (45 min)',
      title: 'openSUSE Starter Lab: Shell, Tools & Workflows',
      room: 'Computer Lab 1 (Newton Campus)',
      mentor: 'Volunteer Engineering Team',
      desc: 'Hands on beginner workshop. Learn command line navigation, file permissions, Zypper package installations, and basic shell scripting in a prepared sandbox. Never requires a risky OS reinstall.',
      tools: ['Zypper Package Manager', 'Bash Shell Scripting', 'Virtual Machine Sandbox', 'YaST Configuration Center'],
    },
    {
      num: 'LAB B',
      slot: '12:05 to 12:50 IST (45 min)',
      title: 'OBS Packaging Lab: Spec Files, Patches & Builds',
      room: 'Computer Lab 2 (Newton Campus)',
      mentor: 'Upstream Packaging Specialists',
      desc: 'Hands on intermediate lab for builders targeting Track 5 (Upstream Contribution). Create an openSUSE Build Service account, branch an open repository, author a spec file, and trigger an automated build.',
      tools: ['osc (OBS CLI)', 'RPM Spec Files', 'Git Patch Workflow', 'Factory Submissions'],
    },
  ];

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!proposal.name || !proposal.email || !proposal.title) {
      toast('Please fill all required proposal fields', 'error');
      return;
    }

    sounds.success();
    confetti({ particleCount: 70, spread: 60 });
    setIsSubmitted(true);
    toast('Speaker proposal submitted to Rithull Raj Kallat and the program team!', 'success');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-[#73ba25]/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SIGNATURE HEADER LOCKUP                                   */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
          <span>// CONFERENCE CURRICULUM &amp; WORKSHOPS // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">TECHNICAL </span>
          <span className="text-[#73ba25]">SESSIONS</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Three foundational technical talks followed by two 45 minute parallel hands on workshops prepare builders for the 20 hour Geeko Buildathon.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">3 Main Talks</div>
            <div className="text-slate-400 text-[10px] font-mono">Expert Keynotes</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">2 Hands On Labs</div>
            <div className="text-slate-400 text-[10px] font-mono">Parallel Sandboxes</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">250 Capacity</div>
            <div className="text-slate-400 text-[10px] font-mono">Auditorium Seats</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">100% Free</div>
            <div className="text-slate-400 text-[10px] font-mono">Open Community</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TALKS SECTION: SIGNATURE CYBER CARDS                      */}
      {/* ========================================================= */}
      <div className="mb-16 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/30">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="font-pixel text-[8px] text-[#73ba25] uppercase tracking-wider">DAY 1 MORNING SCHEDULE</div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Confirmed Keynotes &amp; Technical Talks
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {talks.map((talk) => (
            <div
              key={talk.num}
              className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 sm:p-8 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(115,186,37,0.18)] transition-all duration-300"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

              {/* 4 Corner Cyber Brackets */}
              <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] text-[#8ee631] uppercase">
                    TALK {talk.num}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#73ba25]" />
                    {talk.slot}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 w-fit">
                  {talk.type}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-1.5 tracking-wide">
                {talk.title}
              </h3>
              <div className="text-xs font-mono text-amber-400 font-semibold mb-4">
                Speaker: {talk.speaker}
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mb-6">
                {talk.desc}
              </p>

              <div className="pt-4 border-t border-[#173f35]/60">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                  Core Learning Outcomes
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {talk.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/60 border border-[#173f35] text-xs font-mono text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PARALLEL LABS: 2 COLUMN CYBER HUD                         */}
      {/* ========================================================= */}
      <div className="mb-16 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-pixel text-[8px] text-cyan-400 uppercase tracking-wider">DAY 1 HANDS ON WORKSHOPS</div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Parallel Interactive Computer Labs (12:05 to 12:50 IST)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labs.map((lab) => (
            <div
              key={lab.num}
              className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-cyan-500/35 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] transition-all duration-300"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

              {/* 4 Corner Cyber Brackets */}
              <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-pixel text-[8px] uppercase tracking-wider border border-cyan-500/35">
                    {lab.num}
                  </span>
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {lab.slot}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-2 tracking-wide">
                  {lab.title}
                </h3>

                <div className="space-y-1 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Venue: <strong className="text-slate-200">{lab.room}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users className="w-3.5 h-3.5 text-[#73ba25]" />
                    <span>Lead Facilitator: <strong className="text-slate-200">{lab.mentor}</strong></span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs font-mono leading-relaxed mb-6">
                  {lab.desc}
                </p>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Lab Environment &amp; Tooling
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/60 border border-[#173f35] text-cyan-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#173f35]/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Free for all registered participants</span>
                <span className="text-cyan-400 font-bold">Bring Laptop</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* CFP PROPOSAL BANNER                                       */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 shadow-xl overflow-hidden relative z-10">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5">
            <span>CALL FOR COMMUNITY SESSIONS &amp; WORKSHOPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            Propose a Lightning Talk or Mentor a Lab
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono mt-2 leading-relaxed">
            Have expertise in the Linux kernel, openSUSE packaging, distributed systems, or developer tooling? Submit your proposal to the organizing team.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-xl bg-black/60 border border-[#73ba25]/50 text-center max-w-xl mx-auto">
            <CheckCircle2 className="w-12 h-12 text-[#73ba25] mx-auto mb-3" />
            <h3 className="font-heading font-black text-xl text-white mb-2">Proposal Received!</h3>
            <p className="text-slate-300 text-xs font-mono leading-relaxed mb-4">
              Thank you for contributing to openSUSE Connect '27. The program committee will review your abstract and get in touch via email.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setProposal({ name: '', email: '', role: '', title: '', abstract: '', track: 'Systems & Architecture' });
              }}
              className="px-4 py-2 rounded-lg bg-[#73ba25] text-black font-mono text-xs font-bold hover:bg-[#8ee631] transition-colors cursor-pointer"
            >
              Submit Another Topic
            </button>
          </div>
        ) : (
          <form onSubmit={handleProposalSubmit} className="max-w-xl mx-auto space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={proposal.name}
                  onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                  placeholder="e.g. Priyanshu Mehta"
                  className="w-full bg-black/70 border border-[#173f35] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#73ba25]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={proposal.email}
                  onChange={(e) => setProposal({ ...proposal, email: e.target.value })}
                  placeholder="e.g. dev@example.com"
                  className="w-full bg-black/70 border border-[#173f35] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#73ba25]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Session Title *</label>
              <input
                type="text"
                required
                value={proposal.title}
                onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                placeholder="e.g. Practical Kernel Module Debugging on openSUSE"
                className="w-full bg-black/70 border border-[#173f35] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#73ba25]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Short Abstract &amp; Outline *</label>
              <textarea
                required
                rows={3}
                value={proposal.abstract}
                onChange={(e) => setProposal({ ...proposal, abstract: e.target.value })}
                placeholder="Provide a 2 to 3 sentence description and target audience..."
                className="w-full bg-black/70 border border-[#173f35] rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#73ba25]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(115,186,37,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Speaker Proposal</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
