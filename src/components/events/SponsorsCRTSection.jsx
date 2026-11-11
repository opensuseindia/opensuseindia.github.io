import React, { useState } from 'react';
import { Shield, CheckCircle2, Award, Users, HeartHandshake, Building2 } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function SponsorsCRTSection() {
  const [activeTier, setActiveTier] = useState('title');

  const tiers = [
    {
      id: 'title',
      title: 'CHAMELEON TITLE & PRIZE PARTNER',
      code: 'TIER_01',
      ask: '₹50,000+',
      status: 'AVAILABLE',
      icon: Award,
      desc: 'Directly powers the grand win up to ₹50,000 cash prize pool, arcade tournament bounties, and main stage trophy awards. Highest visibility across all keynote sessions.',
      deliverables: [
        'Exclusive co-branding on grand cash awards, arcade bounties & trophies',
        'Company logo prominently displayed on main stage backdrops and certificates',
        '5 minute keynote address on main stage prior to Finalist Pitches',
        'Featured booth / demo table in the interactive Demo Arena',
        'Dedicated shoutouts in global openSUSE recap communications',
      ],
      color: 'text-amber-400',
    },
    {
      id: 'tracks',
      title: 'BUILDATHON TRACK PARTNER',
      code: 'TIER_02',
      ask: '₹25,000',
      status: '6 SLOTS (1 PER TRACK)',
      icon: Shield,
      desc: 'Sponsor one of the 6 official Buildathon tracks (Terminal Titans, Root Access, GeekoOps, Desktop Reboot, Upstream Heroes, Next Linux Need).',
      deliverables: [
        'Exclusive track naming rights and custom challenge problem prompt',
        'Dedicated mentor slot to guide 10-15 teams during the 20 hour sprint',
        'Seat on the track evaluation & judging panel',
        'Logo placement across track materials, website, and digital certificates',
      ],
      color: 'text-emerald-400',
    },
    {
      id: 'hospitality',
      title: 'BUILDER HOSPITALITY PARTNER',
      code: 'TIER_03',
      ask: '₹35,000',
      status: 'AVAILABLE',
      icon: Users,
      desc: 'Fuel 250 verified builders with meals, midnight coffee, energy refreshments, and breakfast throughout the 20 hour overnight hackathon.',
      deliverables: [
        'Prominent banner placement in central campus dining & night snack zones',
        'Stage announcements during midnight meal and breakfast distributions',
        'Branded digital meal tokens on participant QR passports',
        'Brand recognition on official event website and printed schedules',
      ],
      color: 'text-blue-400',
    },
    {
      id: 'swag',
      title: 'SWAG & REWARD SHIRT PARTNER',
      code: 'TIER_04',
      ask: '₹15,000',
      status: 'AVAILABLE',
      icon: Award,
      desc: 'Co sponsor the limited edition, high quality reward T-shirts reserved for the top contributors, challenge champions, and quest winners.',
      deliverables: [
        'Sponsor logo printed on all official champion reward jerseys',
        'Logo in the physical participant kits and sticker packages',
        'Special acknowledgment during the Grand Farewell & Awards ceremony',
      ],
      color: 'text-purple-400',
    },
    {
      id: 'host',
      title: 'ACADEMIC & VENUE HOST',
      code: 'HOST_PARTNER',
      ask: 'CAMPUS HOST',
      status: 'CONFIRMED',
      icon: Building2,
      desc: 'Newton School of Technology, Bengaluru provides state of the art campus facilities, load tested power backup, and 350+ device high density Wi-Fi.',
      deliverables: [
        'Main auditorium with 250+ capacity and surround sound AV',
        '3 breakout lab rooms for hands on mentoring & workshops',
        '24 hour campus security, dedicated quiet rest zones, and first aid desk',
        'Co host recognition across all national and regional press releases',
      ],
      color: 'text-cyan-400',
    },
    {
      id: 'community',
      title: 'COMMUNITY & OUTREACH PARTNERS',
      code: 'COMMUNITY_TIER',
      ask: 'IN-KIND / OUTREACH',
      status: 'OPEN COLLABORATION',
      icon: HeartHandshake,
      desc: 'Partner with openSUSE India to promote open source adoption, Linux kernel education, and developer opportunities across India.',
      deliverables: [
        'Showcase table in the Demo Arena Expo hall',
        'Cross-promotion across openSUSE India community social channels',
        'Community badge feature on website and registration portal',
        'Opportunity to conduct lightning talks during day 1 breakout sessions',
      ],
      color: 'text-geeko-400',
    },
  ];

  const current = tiers.find((t) => t.id === activeTier) || tiers[0];

  return (
    <section id="sponsors" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-geeko-400 font-mono text-xs uppercase tracking-widest block mb-2">
          Partnership Opportunities
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Sponsors & Community Partners
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed font-sans">
          Support 250 top student developers and open source engineers building Linux solutions in Bengaluru.
        </p>
      </div>

      {/* Phosphor CRT Monitor Housing */}
      <div className="relative mx-auto max-w-5xl rounded-3xl p-4 sm:p-8 bg-[#030a07] border-4 border-[#173f35] shadow-[0_0_60px_rgba(115,186,37,0.25)]">
        {/* CRT Glass Reflection & Bezel details */}
        <div className="absolute top-2 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#73ba25]/30 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#173f35] text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-geeko-400 font-bold">GEEKO_SPONSOR_TERMINAL :: VT-100</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px]">
            <span>BAUD: 9600</span>
            <span>HOST: NEWTON SCHOOL OF TECH</span>
            <span className="text-[#00f0ff]">STATUS: OPEN</span>
          </div>
        </div>

        {/* 6 Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {tiers.map((t) => {
            const IconComp = t.icon;
            const isActive = activeTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  sounds.click();
                  setActiveTier(t.id);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all font-mono ${
                  isActive
                    ? 'bg-geeko-500/15 border-geeko-500 text-white shadow-[0_0_15px_rgba(115,186,37,0.3)]'
                    : 'bg-black/60 border-cyber-border text-slate-400 hover:text-white hover:border-[#173f35]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? t.color : 'text-slate-500'}`} />
                  <span className="text-[9px] font-pixel text-geeko-400">{t.code}</span>
                </div>
                <div className="font-bold text-[11px] truncate leading-tight">{t.title.split(' ')[0]}</div>
                <div className={`text-[10px] mt-0.5 font-semibold ${t.color}`}>{t.ask}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Screen Display */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-black/90 border-2 border-[#173f35] min-h-[300px] flex flex-col justify-between overflow-hidden">
          {/* Subtle phosphor scanlines inside the screen */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-10" />

          <div className="relative z-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#173f35] mb-4">
              <div>
                <div className="font-pixel text-[9px] text-[#00f0ff] uppercase tracking-wider mb-1">
                  PARTNERSHIP TIER // {current.code}
                </div>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {current.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-pixel text-lg sm:text-xl font-bold ${current.color}`}>
                  {current.ask}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#081a14] border border-[#173f35] font-mono text-[10px] text-geeko-400">
                  {current.status}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
              {current.desc}
            </p>

            <div>
              <div className="font-mono text-xs text-geeko-400 font-bold uppercase tracking-wider mb-3">
                Key Sponsor Deliverables & Rights:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {current.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-[#081510] border border-[#173f35]/60 text-xs text-slate-200"
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${current.color}`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-20 mt-8 pt-4 border-t border-[#173f35] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-slate-400">
              Inquiries: <span className="text-geeko-400">partnerships@opensuse.org</span> · SPOC: Divyanshu Prakash
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:partnerships@opensuse.org?subject=openSUSE%20Bengaluru%20Connect%20Sponsorship"
                onClick={() => sounds.click()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-geeko-400 to-[#73ba25] hover:from-geeko-300 hover:to-geeko-400 text-black font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>BECOME A PARTNER</span>
              </a>
            </div>
          </div>
        </div>

        {/* CRT Bottom Label Bar */}
        <div className="mt-3 flex items-center justify-between text-[9px] font-pixel text-slate-500 px-2">
          <span>HOST: NEWTON SCHOOL OF TECHNOLOGY · BENGALURU</span>
          <span>SUPPORTING 250 LINUX BUILDERS · JAN 2027</span>
        </div>
      </div>
    </section>
  );
}
