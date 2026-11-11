import React, { useState } from 'react';
import {
  Shield,
  Award,
  Users,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Trophy,
  Coffee,
  Shirt,
  DollarSign,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function Sponsors() {
  const [selectedTier, setSelectedTier] = useState('ALL');

  const tiers = [
    {
      id: 'title',
      name: 'Chameleon Title & Prize Partner',
      badge: 'Tier 01 · Title Sponsor',
      amount: '₹50,000+',
      color: 'border-amber-500/60 bg-amber-500/10 text-amber-400',
      tagColor: 'text-amber-400',
      desc: 'Exclusive co branding on the ₹50,000 cash prizes, main stage keynotes, and overall festival naming.',
      benefits: [
        'Exclusive naming on the grand cash prize pool, arcade bounties, and trophies',
        'Company logo prominently displayed on main stage backdrops, posters, and certificates',
        '5 minute keynote address on main stage prior to Finalist Pitches',
        'Dedicated showcase demo booth in the Demo Arena Expo Hall',
        'Recognition in all national and global openSUSE announcements and press releases',
        'Direct recruitment & resume access for 250 participating developers',
      ],
    },
    {
      id: 'track',
      name: 'Buildathon Track Partner',
      badge: 'Tier 02 · 6 Slots Available',
      amount: '₹25,000',
      color: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400',
      tagColor: 'text-emerald-400',
      desc: 'Sponsor one of the 6 official Buildathon tracks (CLI, Security, DevOps, Desktop UX, Upstream, Impact).',
      benefits: [
        'Exclusive track naming rights and custom challenge problem prompt',
        'Dedicated technical mentor slot to guide 10 to 15 teams during the 20 hour sprint',
        'Seat on the track evaluation and grand finalist judging panel',
        'Prominent logo placement on track digital badges, repository templates, and portal',
        'Dedicated social media spotlight and track winner award presentation',
      ],
    },
    {
      id: 'hospitality',
      name: 'Builder Hospitality Partner',
      badge: 'Tier 03 · Catering & Fuel',
      amount: '₹35,000',
      color: 'border-blue-500/60 bg-blue-500/10 text-blue-400',
      tagColor: 'text-blue-400',
      desc: 'Nourish 250 builders, mentors, and jury with high tea, dinner, midnight coffee, and breakfast.',
      benefits: [
        'Prominent banner placement in central campus dining and refreshment areas',
        'Official stage announcements during midnight hacking feasts and breakfast',
        'Branded digital meal tokens on participant QR passports',
        'Logo placement on official physical event schedules and volunteer shirts',
      ],
    },
    {
      id: 'swag',
      name: 'Champion Swag Partner',
      badge: 'Tier 04 · Exclusive Merch',
      amount: '₹15,000',
      color: 'border-purple-500/60 bg-purple-500/10 text-purple-400',
      tagColor: 'text-purple-400',
      desc: 'Co sponsor the limited edition 25 printed reward jerseys reserved for champions and top contributors.',
      benefits: [
        'Sponsor logo printed on all official champion reward jerseys',
        'Branded promotional collateral included in physical participant kits',
        'Special acknowledgment during the Grand Farewell & Awards ceremony',
      ],
    },
    {
      id: 'community',
      name: 'Community & Ecosystem Partner',
      badge: 'Tier 05 · FOSS Outreach',
      amount: 'In-Kind / Outreach',
      color: 'border-geeko-500/60 bg-geeko-500/10 text-geeko-400',
      tagColor: 'text-geeko-400',
      desc: 'Developer communities, open source foundations, and student clubs joining forces with openSUSE.',
      benefits: [
        'Dedicated exhibition desk in the Demo Arena Expo Hall',
        'Cross promotional features across openSUSE India channels',
        'Lightning talk slot during day 1 community breakout sessions',
      ],
    },
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
          <span>// PARTNERSHIP PROSPECTUS &amp; SPONSORS // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">SUMMIT </span>
          <span className="text-[#73ba25]">SPONSORS</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Partner with openSUSE India · Bengaluru Connect 2027 to connect directly with 250 top Linux builders, student engineers, and open source contributors at Newton School of Technology.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">₹50,000+ Title</div>
            <div className="text-slate-400 text-[10px] font-mono">Grand Naming Partner</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">6 Track Slots</div>
            <div className="text-slate-400 text-[10px] font-mono">Domain Challenges</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">250 Builders</div>
            <div className="text-slate-400 text-[10px] font-mono">Talent Recruiting</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">25 Reward Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Champion Swag</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONFIRMED HOSTS SHOWCASE                                  */}
      {/* ========================================================= */}
      <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 backdrop-blur-2xl border border-[#73ba25]/35 p-6 sm:p-8 mb-14 shadow-xl relative z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <div className="text-center mb-6">
          <span className="font-pixel text-[8px] text-[#73ba25] uppercase tracking-wider block mb-1">
            CONFIRMED EVENT HOSTS &amp; COMMUNITY ORGANIZERS
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            Powered By Open Source Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-black/60 border border-[#173f35] text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#73ba25]/15 border border-[#73ba25]/40 flex items-center justify-center text-[#73ba25] mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-base text-white">openSUSE Project</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Official openSUSE community sponsorship &amp; global mentorship support.
              </p>
            </div>
            <span className="mt-4 px-2.5 py-0.5 rounded-full bg-[#73ba25]/10 border border-[#73ba25]/30 text-[#8ee631] text-[10px]">
              Global FOSS Host
            </span>
          </div>

          <div className="p-5 rounded-xl bg-black/60 border border-[#173f35] text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-base text-white">Newton School of Technology</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Institutional host providing campus facilities, power redundancy, and high speed network.
              </p>
            </div>
            <span className="mt-4 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px]">
              Institutional Partner
            </span>
          </div>

          <div className="p-5 rounded-xl bg-black/60 border border-[#173f35] text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-base text-white">openSUSE Asia Community</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Regional collaboration, judging jury members, and upstream code verification.
              </p>
            </div>
            <span className="mt-4 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px]">
              Regional Ecosystem
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PARTNERSHIP TIERS GRID                                    */}
      {/* ========================================================= */}
      <div className="mb-14 relative z-10">
        <h2 className="text-2xl font-heading font-black text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#73ba25]" />
          <span>Sponsorship Tiers &amp; Deliverables</span>
        </h2>

        <div className="space-y-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#173f35] hover:border-[#73ba25]/50 p-6 sm:p-8 overflow-hidden shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/60 to-transparent pointer-events-none" />
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#173f35]/60">
                <div>
                  <span className="font-pixel text-[8px] text-[#8ee631] uppercase tracking-wider block mb-1">
                    {tier.badge}
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                    {tier.name}
                  </h3>
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-[#8ee631]">
                  {tier.amount}
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mb-6">
                {tier.desc}
              </p>

              <div className="space-y-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Sponsorship Deliverables:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
                  {tier.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/60 border border-[#173f35] text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#73ba25] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PARTNER CONTACT CALLOUT                                   */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 sm:p-8 text-center shadow-xl relative z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
          Ready to Partner with openSUSE Connect '27?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm font-mono max-w-xl mx-auto mb-6 leading-relaxed">
          Gain unmatched visibility among 250 passionate developers, host custom engineering challenges, and demonstrate your commitment to open source innovation.
        </p>

        <a
          href="mailto:contact@opensuse.org?subject=openSUSE%20Bengaluru%20Connect%202027%20Sponsorship"
          onClick={() => sounds.click()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-mono font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(115,186,37,0.3)] transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Request Sponsorship Prospectus</span>
        </a>
      </div>
    </div>
  );
}
