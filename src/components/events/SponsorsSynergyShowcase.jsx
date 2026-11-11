import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Building2, Shield, HeartHandshake, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function SponsorsSynergyShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimer = useRef(null);

  const sponsors = [
    {
      id: 'opensuse',
      number: '01',
      title: 'openSUSE',
      fullTitle: 'openSUSE PROJECT',
      badge: 'GLOBAL COMMUNITY ECOSYSTEM',
      subtitle: 'International Open Source Project',
      description:
        'The international open source community promoting Linux adoption, contributor growth, and independent tooling. Providing official project recognition, contributor swag, and guidance for upstream package maintainers.',
      impact: 'Official openSUSE Recognition · Champion Jerseys · Global Community Spotlight',
      logo: `${import.meta.env.BASE_URL}sponsors/opensuse.svg`,
      logoAlt: 'openSUSE Project',
      color: '#73ba25',
      accentBorder: 'rgba(115, 186, 37, 0.4)',
      accentBg: 'rgba(115, 186, 37, 0.08)',
      highlights: [
        'Official recognition for top 6 Buildathon finalist projects',
        '25 printed champion reward jerseys and kit swag',
        'Direct pathway to become an official package maintainer',
      ],
    },
    {
      id: 'monster',
      number: '02',
      title: 'MONSTER',
      fullTitle: 'MONSTER ENERGY',
      badge: 'OFFICIAL ENERGY & REFUELING PARTNER',
      subtitle: 'High Octane Fuel for 250 Overnight Hackers',
      description:
        'Fueling 250 developers throughout the 20 hour non stop Geeko Buildathon with ice cold Monster Energy cans, late night gaming lounge refreshments, and high octane bounties in the Geeko Arcade.',
      impact: 'Unlimited Overnight Energy Cans · Tekken 8 Tournament Sponsor · Midnight Refuel Stations',
      logo: `${import.meta.env.BASE_URL}sponsors/monster.svg`,
      logoAlt: 'Monster Energy',
      color: '#48d800',
      accentBorder: 'rgba(72, 216, 0, 0.4)',
      accentBg: 'rgba(72, 216, 0, 0.08)',
      highlights: [
        'Chilled Monster Energy beverage bars throughout the 20 hour overnight sprint',
        'Official sponsor of the Tekken 8 & Mortal Kombat Midnight PS5 Arena',
        'Exclusive Monster energy swag packs and gaming lounge tournament prizes',
      ],
    },
    {
      id: 'geeko',
      number: '03',
      title: 'GEEKO',
      fullTitle: 'THE GEEKO FOUNDATION',
      badge: 'OPEN SOURCE FOUNDATION & GRANTS',
      subtitle: 'Non Profit Community & Fiscal Sponsor',
      description:
        'The independent UK registered non profit organization empowering openSUSE projects worldwide. Providing community grant treasuries, infrastructure stewardship, contributor travel support, and regional event funding.',
      impact: 'Community Event Grants · Contributor Travel Funding · Open Source Stewardship',
      logo: `${import.meta.env.BASE_URL}sponsors/geeko-foundation.svg`,
      logoAlt: 'The Geeko Foundation',
      color: '#84cc16',
      accentBorder: 'rgba(132, 204, 22, 0.4)',
      accentBg: 'rgba(132, 204, 22, 0.08)',
      highlights: [
        'Financial umbrella and grant treasury for open source initiatives',
        'Hardware stewardship and travel sponsorship for contributors',
        'Dedicated support for regional summits and local FOSS gatherings',
      ],
    },
  ];

  // Auto play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    autoPlayTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 6000);
    return () => clearInterval(autoPlayTimer.current);
  }, [isAutoPlay, sponsors.length]);

  const goToSponsor = (index) => {
    sounds.click?.();
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSponsor = () => {
    sounds.click?.();
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    setIsAutoPlay(false);
  };

  const prevSponsor = () => {
    sounds.click?.();
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
    setIsAutoPlay(false);
  };

  const current = sponsors[currentIndex];

  return (
    <section
      id="sponsors"
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto select-none border-b border-[#173f35]/50 overflow-hidden home-snap-section"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: current.color }}
      />

      {/* Vertically Centered Content Container */}
      <div className="relative z-10 flex flex-col justify-center my-auto w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#081510] border border-geeko-500/50 text-geeko-400 font-pixel text-[8.5px] uppercase tracking-wider mb-2.5">
            <span>// INDUSTRY ALLIANCES &amp; HOSTS //</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-pixel uppercase tracking-wider text-white select-none"
            style={{
              textShadow: '3px 3px 0 #12301c, 6px 6px 0 #071712, 0 0 30px rgba(115,186,37,0.4)',
            }}
          >
            OUR SPONSORS
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed font-mono max-w-2xl mx-auto">
            Leading tech enterprises, developer platforms, and academic pioneers powering openSUSE Bengaluru Connect.
          </p>
        </div>

      {/* Main Synergy-Style Showcase Deck */}
      <div
        className="relative rounded-2xl bg-[#050b07]/95 border transition-all duration-500 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        style={{ borderColor: current.accentBorder }}
      >
        {/* Subtle Decorative Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* ========================================================= */}
          {/* LEFT COLUMN: SPONSOR EDITORIAL INFO                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Index & Number Pill */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2.5 h-2.5 rotate-45 transition-colors duration-500 shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: current.color }}
                />
                <span className="font-pixel text-xs tracking-widest text-slate-400">
                  PARTNER {current.number}
                </span>
                <span className="text-slate-600 font-mono text-xs">/</span>
                <span className="font-pixel text-[10px] text-slate-500">
                  0{sponsors.length}
                </span>
              </div>

              {/* Huge Display Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-pixel text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider mb-3 leading-none select-none"
                    style={{
                      textShadow: `2px 2px 0 rgba(0,0,0,0.8), 0 0 35px ${current.color}40`,
                    }}
                  >
                    {current.title}
                  </h3>

                  {/* Synergy-Style Neon Pill Banner */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border font-pixel text-[9px] sm:text-[10px] tracking-wider uppercase mb-5 transition-all duration-500"
                    style={{
                      borderColor: current.color,
                      color: current.color,
                      backgroundColor: current.accentBg,
                      boxShadow: `0 0 16px ${current.color}30`,
                    }}
                  >
                    <span>{current.badge}</span>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed mb-6 max-w-xl">
                    {current.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {current.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 font-mono text-xs text-slate-300">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: current.color }}
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Summary Pill */}
                  <div className="p-3 rounded-lg bg-black/50 border border-white/10 font-mono text-[11px] text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: current.color }} />
                    <span className="text-slate-200">{current.impact}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: ORBITAL LOGO STAGE (SYNERGY INSPIRATION)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col items-center justify-center relative">
            {/* The Framing Box */}
            <div
              className="w-full h-full min-h-[300px] sm:min-h-[360px] rounded-xl relative flex items-center justify-center overflow-hidden border transition-all duration-500 bg-black/60 shadow-inner"
              style={{ borderColor: current.accentBorder }}
            >
              {/* Atmospheric Background within stage */}
              <div
                className="absolute inset-0 opacity-20 transition-colors duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${current.color} 0%, transparent 70%)`,
                }}
              />

              {/* Synergy-Style Elliptical Orbit Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 360"
                fill="none"
              >
                {/* Outer Orbit Ring */}
                <ellipse
                  cx="200"
                  cy="180"
                  rx="155"
                  ry="75"
                  transform="rotate(-24 200 180)"
                  stroke={current.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.45"
                />
                {/* Inner Orbit Ring */}
                <ellipse
                  cx="200"
                  cy="180"
                  rx="125"
                  ry="55"
                  transform="rotate(18 200 180)"
                  stroke={current.color}
                  strokeWidth="1.2"
                  opacity="0.3"
                />
                {/* Floating Orbit Satellite Dot */}
                <circle
                  cx="290"
                  cy="135"
                  r="3.5"
                  fill={current.color}
                  className="animate-ping"
                  opacity="0.75"
                />
                <circle cx="290" cy="135" r="3" fill={current.color} />
              </svg>

              {/* Interactive Floating Rounded White Logo Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 w-64 sm:w-72 h-36 sm:h-40 bg-white rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.2)] p-6 flex items-center justify-center transition-transform hover:scale-105 duration-300 cursor-pointer"
                  onClick={() => sounds.hover?.()}
                  title={`${current.title} Logo`}
                >
                  <img
                    src={current.logo}
                    alt={current.logoAlt}
                    className="max-h-20 max-w-[85%] object-contain filter drop-shadow-sm"
                  />

                  {/* Corner Accent Glow on White Card */}
                  <div
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: current.color }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Cursor / Stage Label (Bottom Right) */}
              <div className="absolute bottom-3 right-4 font-mono text-[9px] text-slate-400 tracking-wider">
                SPONSOR {current.number} / 0{sponsors.length}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM CONTROLS & TIMELINE TRACKER                         */}
        {/* ========================================================= */}
        <div className="border-t border-[#173f35]/70 bg-black/80 px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {/* Partner Quick-Jump Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {sponsors.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSponsor(idx)}
                className={`px-3 py-1.5 rounded-md font-pixel text-[9px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentIndex === idx
                    ? 'text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
                style={currentIndex === idx ? { backgroundColor: s.color } : {}}
              >
                <span>{s.number}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Stepper & Arrows */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Progress line */}
            <div className="w-24 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / sponsors.length) * 100}%`,
                  backgroundColor: current.color,
                }}
              />
            </div>

            <span className="font-pixel text-[10px] text-slate-300">
              {current.number} / 0{sponsors.length}
            </span>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevSponsor}
                className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Previous Sponsor"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSponsor}
                className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Next Sponsor"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
