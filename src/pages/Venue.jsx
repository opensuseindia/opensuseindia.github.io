import React from 'react';
import {
  MapPin,
  Wifi,
  Zap,
  ShieldCheck,
  Moon,
  Laptop,
  CheckCircle2,
  ExternalLink,
  Car,
  Train,
  Bus,
  Building2,
  Clock,
  Compass,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function Venue() {
  const checklists = [
    { item: 'Participant owned laptop & charger (USB-C / power brick)', must: true },
    { item: 'Government issued photo ID (Required for 18+ overnight security badge check)', must: true },
    { item: 'Pre installed Linux distribution or VM / WSL2 environment', must: false },
    { item: 'Personal jacket or hoodie (Overnight build spaces are air conditioned)', must: false },
    { item: 'Reusable water bottle (College filtered drinking water available free throughout)', must: false },
    { item: 'Sleeping bag or travel pillow (for quiet rest rooms)', must: false },
  ];

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
          <span>// CAMPUS SPECIFICATIONS &amp; TRANSIT DOSSIER // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">VENUE </span>
          <span className="text-[#73ba25]">GUIDE</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Newton School of Technology at S-VYASA Deemed to be University, Sattva Global City Campus, Mysore Road, Bengaluru. State of the art facilities at zero financial cost to the community.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">250 Seats</div>
            <div className="text-slate-400 text-[10px] font-mono">Main Auditorium</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Gigabit Fiber</div>
            <div className="text-slate-400 text-[10px] font-mono">Dual ISP Mesh WiFi</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Dual Generators</div>
            <div className="text-slate-400 text-[10px] font-mono">100% Power Uptime</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">20h Overnight</div>
            <div className="text-slate-400 text-[10px] font-mono">MOU Sanctioned</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN CAMPUS LOCATION BANNER                               */}
      {/* ========================================================= */}
      <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 sm:p-8 mb-12 shadow-xl relative z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#173f35]/60">
          <div>
            <div className="flex items-center gap-2 text-[#73ba25] font-mono text-xs font-semibold uppercase mb-1">
              <MapPin className="w-4 h-4" />
              <span>Campus Location</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Newton School of Technology · S-VYASA Campus
            </h2>
            <p className="text-slate-300 text-sm font-mono mt-1">
              Sattva Global City, Mysore Road, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/T5t2S26jU8jeWt11A"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#73ba25] hover:bg-[#8ee631] text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(115,186,37,0.3)] shrink-0 cursor-pointer"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
            <Wifi className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-white font-bold mb-1">WiFi for 350+ Devices</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              High capacity campus wireless network with backup local mirror &amp; cached packages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
            <Zap className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-white font-bold mb-1">Load Tested Power</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Heavy duty circuits, safe extension boards, cable protectors, and generator backup.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
            <Moon className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-white font-bold mb-1">Quiet Rest Spaces</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Designated quiet sleeping rest zones for overnight builders with shift supervision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-[#173f35]">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-white font-bold mb-1">24/7 Security &amp; First Aid</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Logged entry exit boundaries, staffed security shifts, and emergency medical response.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TRANSIT & COMMUTE OPTIONS                                 */}
      {/* ========================================================= */}
      <div className="mb-14 relative z-10">
        <h2 className="text-2xl font-heading font-black text-white mb-6">
          How to Reach the Venue
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#173f35] p-6 shadow-xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent pointer-events-none" />
            <Train className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="font-heading font-black text-white text-base mb-1">
              Bengaluru Namma Metro
            </h3>
            <p className="text-slate-300 leading-relaxed font-mono text-xs">
              Take the Purple Line towards Mysore Road, Rajarajeshwari Nagar, or Kengeri Metro Station. Direct feeder autos connect to Sattva Global City campus gates.
            </p>
          </div>

          <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#173f35] p-6 shadow-xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent pointer-events-none" />
            <Bus className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-heading font-black text-white text-base mb-1">
              BMTC Public Bus
            </h3>
            <p className="text-slate-300 leading-relaxed font-mono text-xs">
              Frequent Volvo and regular BMTC buses along Mysore Road and RVCE stop directly outside Sattva Global City tech campus.
            </p>
          </div>

          <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#173f35] p-6 shadow-xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none" />
            <Car className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-heading font-black text-white text-base mb-1">
              Cab &amp; Rideshare Drop Off
            </h3>
            <p className="text-slate-300 leading-relaxed font-mono text-xs">
              Designated drop point at S-VYASA University Sattva Global City Main Gate. Campus visitor parking is available upon presenting your event pass.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ATTENDEE PACKING CHECKLIST                                */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 shadow-xl relative z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <Laptop className="w-5 h-5 text-[#73ba25]" />
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            What to Bring (Packing Checklist)
          </h2>
        </div>
        <p className="text-slate-400 text-xs font-mono mb-6">
          Check off items before leaving for Newton School of Technology S-VYASA Campus:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
          {checklists.map((c, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-black/60 border border-[#173f35] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${c.must ? 'text-[#73ba25]' : 'text-slate-500'}`} />
                <span className="text-slate-200">{c.item}</span>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-pixel uppercase shrink-0 ${
                  c.must
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-white/5 text-slate-400'
                }`}
              >
                {c.must ? 'MANDATORY' : 'RECOMMENDED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
