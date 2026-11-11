import React, { useState } from 'react';
import {
  MapPin,
  Wifi,
  Zap,
  Shield,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Train,
  Bus,
  Car,
  Sparkles,
  Navigation,
} from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function VenueHubSection() {
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState('campus');
  const [isMapActive, setIsMapActive] = useState(false);
  const [mapTheme, setMapTheme] = useState('dark');

  const photos = {
    campus: {
      url: `${import.meta.env.BASE_URL}overview/svyasa-campus.jpg`,
      title: 'S-VYASA University · Sattva Global City',
      desc: 'Lush green university campus and modern academic buildings on Mysore Road, Bengaluru.',
      tag: 'S-VYASA CAMPUS GROUNDS',
    },
    auditorium: {
      url: `${import.meta.env.BASE_URL}overview/bangalore-campus.jpg`,
      title: 'Main Keynote Auditorium',
      desc: '250 seat tiered lecture theater with dual projectors & high density power sockets.',
      tag: 'TIERED KEYNOTE HALL',
    },
    buildathon: {
      url: `${import.meta.env.BASE_URL}overview/hackathon.jpg`,
      title: 'Buildathon Engineering Hall',
      desc: 'Spacious collaborative workspace equipped with dual ISP fiber and power grids.',
      tag: '20H HACKATHON ARENA',
    },
  };

  const copyAddress = () => {
    sounds.click();
    navigator.clipboard.writeText(
      'Newton School of Technology, S-VYASA Deemed to be University, Sattva Global City Campus, Mysore Road, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="venue"
      className="relative pt-6 sm:pt-8 pb-10 sm:pb-12 px-4 sm:px-6 max-w-7xl mx-auto border-b border-[#173f35]/50 overflow-hidden home-snap-section"
    >
      <span id="venue-anchor" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#73ba25]/[0.015] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none rounded-full" />

      {/* Section Header: Compact & Unique Title */}
      <div className="text-center max-w-3xl mx-auto mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
          <span>OFFICIAL HOST CAMPUS &amp; VENUE HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] text-white select-none mb-2"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">VENUE </span>
          <span className="text-[#73ba25]">BASECAMP</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-xl mx-auto">
          Newton School of Technology at S-VYASA University Sattva Global City campus. 250 builder overnight hackathon summit.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* Top Split Row: Equal-Sized Div Boxes with High-Fidelity Proportions    */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative z-10 mb-6 items-stretch">
        
        {/* Left Box: Campus Specs & Commute (Equal 50% width) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c140e]/95 via-[#060d08]/95 to-[#020503]/95 backdrop-blur-2xl border border-[#73ba25]/30 p-5 sm:p-5.5 flex flex-col justify-between relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] h-full">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

          {/* Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <div className="relative z-10">
            {/* Campus Header Badge */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#73ba25]/15 border border-[#73ba25]/35 text-[#8ee631] font-mono text-[10px] font-bold uppercase tracking-wider">
                <MapPin className="w-3 h-3 text-[#73ba25]" />
                <span>S-VYASA CAMPUS COLLABORATION</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9.5px] font-mono text-emerald-300 uppercase font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Overnight MoU Active
              </span>
            </div>

            {/* Campus Title */}
            <div className="mb-3">
              <h3 className="font-heading font-black text-white text-lg sm:text-xl tracking-tight">
                Newton School of Technology (NST)
              </h3>
              <p className="text-[11px] font-mono text-[#8ee631] font-semibold mt-0.5">
                S-VYASA Deemed to be University · Sattva Global City, Bengaluru
              </p>
            </div>

            {/* Core Facilities Grid: 2x2 Tactical Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[10.5px] mb-3.5">
              <div className="p-2.5 rounded-xl bg-black/60 border border-[#173f35] flex items-center gap-2.5 text-slate-200 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">Dual Genset Power</span>
                  <span className="text-[9.5px] text-slate-400 block truncate">100% backup for 350+ rigs</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-[#173f35] flex items-center gap-2.5 text-slate-200 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">Gigabit Fiber WiFi</span>
                  <span className="text-[9.5px] text-slate-400 block truncate">Dual ISP local mirrors</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-[#173f35] flex items-center gap-2.5 text-slate-200 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-[#73ba25]/15 border border-[#73ba25]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#8ee631]" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">20h Overnight Stay</span>
                  <span className="text-[9.5px] text-slate-400 block truncate">Rest pods &amp; beanbags</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-[#173f35] flex items-center gap-2.5 text-slate-200 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">24/7 Campus Security</span>
                  <span className="text-[9.5px] text-slate-400 block truncate">RFID badges &amp; first aid</span>
                </div>
              </div>
            </div>

            {/* Commute Guide Row */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 mb-3 text-[10px] font-mono flex flex-wrap items-center justify-between gap-2 text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-200">
                <Train className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span><strong>Metro:</strong> Purple Line</span>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <Bus className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span><strong>Bus:</strong> Mysore Rd / RVCE</span>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <Car className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Cabs:</strong> Global City Gate</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.08] min-h-[46px]">
            <a
              href="https://maps.app.goo.gl/T5t2S26jU8jeWt11A"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.click()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#73ba25] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(115,186,37,0.3)] hover:scale-[1.02]"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={copyAddress}
              className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 hover:border-white/30 text-slate-200 font-mono text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#8ee631]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Address Copied!' : 'Copy Campus Address'}</span>
            </button>
          </div>
        </div>

        {/* Right Box: Rectangular Framed Venue Photo (Proper Height & No Stretch) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c140e]/95 via-[#060d08]/95 to-[#020503]/95 backdrop-blur-2xl border border-white/15 hover:border-cyan-400/40 p-5 sm:p-5.5 flex flex-col justify-between relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.85)] h-full transition-colors">
          {/* Top Specular Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

          {/* Corner Cyber Brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          <div className="relative z-10 flex flex-col flex-1">
            {/* Interactive Photo Tabs Header */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="inline-flex items-center gap-1.5 text-cyan-300 font-mono text-[10px] uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>VENUE VISUAL RECON</span>
              </div>
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => { sounds.click(); setActivePhoto('campus'); }}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activePhoto === 'campus'
                      ? 'bg-[#73ba25] text-black font-bold shadow-[0_0_10px_rgba(115,186,37,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Campus (S-VYASA)
                </button>
                <button
                  type="button"
                  onClick={() => { sounds.click(); setActivePhoto('auditorium'); }}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activePhoto === 'auditorium'
                      ? 'bg-[#73ba25] text-black font-bold shadow-[0_0_10px_rgba(115,186,37,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Auditorium
                </button>
                <button
                  type="button"
                  onClick={() => { sounds.click(); setActivePhoto('buildathon'); }}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activePhoto === 'buildathon'
                      ? 'bg-[#73ba25] text-black font-bold shadow-[0_0_10px_rgba(115,186,37,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hack Hall
                </button>
              </div>
            </div>

            {/* The Framed Photo: High-Fidelity Aspect Ratio (~215px tall, no squishing) */}
            <div className="relative w-full h-[215px] sm:h-[225px] rounded-xl overflow-hidden border border-white/20 bg-black/80 shadow-2xl group mb-1">
              <img
                src={photos[activePhoto].url}
                alt={photos[activePhoto].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

              {/* Floating Top Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-cyan-400/50 text-cyan-300 font-mono text-[9.5px] font-bold uppercase tracking-wider shadow">
                  {photos[activePhoto].tag}
                </span>
              </div>

              {/* Integrated Bottom Legend Overlay */}
              <div className="absolute bottom-3 inset-x-3 z-10">
                <div className="text-white font-heading font-black text-sm sm:text-base tracking-wide drop-shadow-md">
                  {photos[activePhoto].title}
                </div>
                <div className="text-slate-300 font-mono text-[10.5px] mt-0.5 leading-snug drop-shadow-md">
                  {photos[activePhoto].desc}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-300 min-h-[46px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8ee631] animate-pulse" />
              <span className="text-slate-300 font-medium">S-VYASA Sattva Global City Verified</span>
            </div>
            <a
              href="https://maps.app.goo.gl/T5t2S26jU8jeWt11A"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.click()}
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-white/10 border border-white/15 text-[#8ee631] font-mono text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>MoU Approved · Live Pin</span>
              <ExternalLink className="w-3 h-3 text-[#8ee631]" />
            </a>
          </div>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* Bottom Full-Width: Live Interactive Sexy Cyber Map Chassis            */}
      {/* ===================================================================== */}
      <div className="relative z-10 rounded-2xl bg-gradient-to-br from-[#0c140e]/95 via-[#060d08]/95 to-[#020503]/95 backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
        {/* Top Specular Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />

        {/* Map Header HUD Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-black/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#73ba25] animate-ping" />
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>LIVE TACTICAL RADAR &amp; MAP</span>
                <span className="px-2 py-0.5 rounded bg-[#73ba25]/20 text-[#8ee631] text-[9px] font-mono border border-[#73ba25]/30">
                  ONLINE GPS
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                12.9198° N, 77.5041° E · Mysore Road / Rajarajeshwari Nagar Corridor, Bengaluru
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Interactive Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setIsMapActive(!isMapActive);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isMapActive
                  ? 'bg-[#73ba25] text-black shadow-[0_0_12px_rgba(115,186,37,0.45)]'
                  : 'bg-black/70 border border-white/20 text-slate-300 hover:text-white hover:border-[#73ba25]/50'
              }`}
            >
              <Navigation className="w-3 h-3 text-current" />
              <span>{isMapActive ? 'Map Scroll & Zoom: ON' : 'Map Scroll & Zoom: OFF'}</span>
            </button>

            {/* Map Theme Toggle: Cyber Dark vs Standard Color */}
            <div className="flex items-center bg-black/70 p-0.5 rounded-lg border border-white/10 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => { sounds.click(); setMapTheme('dark'); }}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  mapTheme === 'dark'
                    ? 'bg-[#73ba25] text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber Dark
              </button>
              <button
                type="button"
                onClick={() => { sounds.click(); setMapTheme('standard'); }}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  mapTheme === 'standard'
                    ? 'bg-[#73ba25] text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Color
              </button>
            </div>

            <a
              href="https://maps.app.goo.gl/T5t2S26jU8jeWt11A"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.click()}
              className="px-3 py-1.5 rounded-lg bg-[#73ba25]/15 hover:bg-[#73ba25]/30 border border-[#73ba25]/40 text-[#8ee631] font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Live Interactive Map Viewport with Protected Scroll Shield */}
        <div
          id="venue-map-chassis"
          onMouseEnter={() => { window.__isMapHovered = true; }}
          onMouseLeave={() => { window.__isMapHovered = false; }}
          className="relative w-full h-[300px] sm:h-[400px] bg-[#050a08] overflow-hidden group rounded-b-xl"
        >
          <iframe
            title="S-VYASA Sattva Global City Map"
            src="https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sS-VYASA+Deemed+to+be+University+Sattva+Global+City+Campus+Bengaluru!5e0!6i15"
            className={`w-full h-full border-0 select-none ${isMapActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
              filter: mapTheme === 'dark'
                ? 'invert(90%) hue-rotate(180deg) contrast(125%) brightness(95%)'
                : 'none',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Interactive Shield overlay when not active */}
          {!isMapActive && (
            <div
              onClick={() => { sounds.click(); setIsMapActive(true); }}
              className="absolute inset-0 bg-transparent flex items-center justify-center cursor-pointer z-10"
            >
              <div className="px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 hover:border-[#73ba25] text-slate-200 hover:text-white font-mono text-xs shadow-2xl transition-all flex items-center gap-2 hover:scale-105">
                <Navigation className="w-3.5 h-3.5 text-[#73ba25] animate-pulse" />
                <span>Click to Pan &amp; Zoom Map</span>
              </div>
            </div>
          )}

          {/* Active Status Badge & Lock Button */}
          {isMapActive && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <div className="px-3 py-1 rounded-lg bg-black/90 border border-[#73ba25]/60 text-[#8ee631] font-mono text-[10px] hidden sm:flex items-center gap-1.5 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-ping" />
                <span>Scroll Zooms Map · Drag Pans</span>
              </div>
              <button
                type="button"
                onClick={() => { sounds.click(); setIsMapActive(false); }}
                className="px-3 py-1 rounded-lg bg-black/90 hover:bg-black border border-white/25 text-slate-200 hover:text-white font-mono text-[10px] transition-all flex items-center gap-1.5 shadow-xl cursor-pointer hover:border-red-400"
              >
                <span>Lock Map Scroll</span>
              </button>
            </div>
          )}

          {/* Cyber Vignette Overlay so map edges melt into the container */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] border border-white/[0.08]" />

          {/* Floating On-Map Tactical Overlay HUD (Bottom Left) */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden sm:block">
            <div className="px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-[#73ba25]/40 font-mono text-[10.5px] text-slate-200 shadow-xl space-y-0.5">
              <div className="text-[#8ee631] font-bold flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#73ba25]" />
                S-VYASA University (Sattva Global City)
              </div>
              <div className="text-slate-400 text-[9.5px]">Bengaluru, Karnataka · Strict 250 Cap Gate Entry</div>
            </div>
          </div>
        </div>

        {/* Map Footer Bar with Full Address and Transit Info */}
        <div className="px-4 sm:px-6 py-3 bg-black/75 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#73ba25] shrink-0" />
            <span>S-VYASA University, Sattva Global City Campus, Mysore Road, Bengaluru 560098</span>
          </div>
          <div className="text-slate-400">
            Interactive map: Drag to explore · Scroll to zoom
          </div>
        </div>
      </div>
    </section>
  );
}
