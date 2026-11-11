import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Heart, ExternalLink, Github, Mail, MapPin, ArrowUp, Users } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function Footer() {
  const scrollToTop = () => {
    sounds.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="border-t-2 border-black bg-[#030806] relative overflow-hidden font-mono text-xs text-slate-400 select-none home-snap-footer"
    >
      {/* Background ambient phosphor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-geeko-500/10 blur-[100px] pointer-events-none" />

      {/* Top Ticker Bar */}
      <div className="w-full bg-[#081510] border-y border-[#173f35] py-2 overflow-hidden shadow-sm">
        <div className="animate-ticker text-[10px] font-pixel tracking-widest text-slate-400">
          <span className="mx-6 text-geeko-400">★ openSUSE INDIA · BENGALURU CONNECT 2027 ★</span>
          <span className="mx-6 text-white">NEWTON SCHOOL OF TECHNOLOGY</span>
          <span className="mx-6 text-[#00f0ff]">20 HOUR GEEKO BUILDATHON</span>
          <span className="mx-6 text-amber-300">RS. 50,000 PRIZE POOL</span>
          <span className="mx-6 text-emerald-400">LEARN. BUILD. CONTRIBUTE.</span>
          {/* Duplicate loop */}
          <span className="mx-6 text-geeko-400">★ openSUSE INDIA · BENGALURU CONNECT 2027 ★</span>
          <span className="mx-6 text-white">NEWTON SCHOOL OF TECHNOLOGY</span>
          <span className="mx-6 text-[#00f0ff]">20 HOUR GEEKO BUILDATHON</span>
          <span className="mx-6 text-amber-300">RS. 50,000 PRIZE POOL</span>
          <span className="mx-6 text-emerald-400">LEARN. BUILD. CONTRIBUTE.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src={`${import.meta.env.BASE_URL}opensuse-logo.png`} alt="openSUSE" className="w-8 h-8 rounded-full" />
              <span className="font-pixel text-white text-xs uppercase tracking-wider">
                openSUSE '27
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Bengaluru Connect 2027 brings students, developers, and upstream contributors together for two days of deep Linux exploration and the 20 hour Geeko Buildathon at Newton School of Technology.
            </p>
            <div className="flex items-center gap-2 text-geeko-400 text-[10px] font-pixel">
              <span className="w-2 h-2 bg-geeko-400 rounded-none animate-ping" />
              <span>Learn. Build. Contribute.</span>
            </div>
          </div>

          {/* Event Directory */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-pixel uppercase tracking-wider border-b border-[#173f35] pb-1.5">
              Event Directory
            </h4>
            <ul className="space-y-2 text-[11px] font-mono">
              <li>
                <Link to="/tracks" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • 6 Buildathon Tracks
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • 2 Day Agenda & Timeline
                </Link>
              </li>
              <li>
                <Link to="/arcade" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • Geeko Arcade (4 Games)
                </Link>
              </li>
              <li>
                <Link to="/quest" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • QR Digital Passport
                </Link>
              </li>
              <li>
                <Link to="/bug-hunt" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • Midnight Bug Hunt
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational & Budget Transparency */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-pixel uppercase tracking-wider border-b border-[#173f35] pb-1.5">
              Transparency
            </h4>
            <ul className="space-y-2 text-[11px] font-mono">
              <li>
                <Link to="/prizes" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • ₹50,000 Prize Pool
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • Sponsor Prospectus Tiers
                </Link>
              </li>
              <li>
                <Link to="/demo-arena" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • 83 Team Demo Arena
                </Link>
              </li>
              <li>
                <Link to="/venue" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • Newton School of Technology
                </Link>
              </li>
              <li>
                <Link to="/merch" className="hover:text-geeko-300 transition-colors" onClick={() => sounds.hover()}>
                  • Reward T Shirt Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal, Safety & Organizers */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-pixel uppercase tracking-wider border-b border-[#173f35] pb-1.5">
              Safety & Sign Off
            </h4>
            <div className="text-[11px] space-y-2 text-slate-400">
              <div className="text-slate-300 font-semibold">Core Leadership:</div>
              <div className="text-slate-300 leading-snug">
                Divyanshu Prakash · Dushyant Acharya · Rithull Raj Kallat
              </div>
              <div className="pt-1.5 flex flex-col gap-2">
                <Link
                  to="/about"
                  onClick={() => sounds.click()}
                  className="w-full px-2.5 py-1.5 bg-[#081912] hover:bg-[#0e271d] border border-geeko-500/40 hover:border-geeko-400 rounded text-[10px] text-geeko-300 hover:text-white flex items-center justify-between font-mono transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-geeko-400 group-hover:scale-110 transition-transform" />
                    <span>Meet Core Organizers</span>
                  </span>
                  <span className="text-geeko-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
                <button
                  onClick={scrollToTop}
                  className="px-3 py-1.5 btn-pixel-dark text-[9px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>JUMP TO TOP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#173f35] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-pixel text-slate-500">
          <div>
            &copy; 2027 openSUSE INDIA · BENGALURU CONNECT · ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-4 text-geeko-400">
            <span>LICENSED UNDER GNU GPLv3 &amp; CC BY SA 4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
