import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Award, Heart, GitBranch } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function AboutStorySection() {
  const organizers = [
    {
      name: 'Divyanshu Prakash',
      role: 'Core Organizer',
      duty: 'Event coordination, community/funder liaison, website architecture, and budget register.',
      tag: 'COORDINATION',
    },
    {
      name: 'Dushyant Acharya',
      role: 'Core Organizer',
      duty: 'Venue liaison, volunteer rosters, catering oversight, technical operations, and safety readiness.',
      tag: 'OPERATIONS & SAFETY',
    },
    {
      name: 'Rithull Raj Kallat',
      role: 'Core Organizer',
      duty: 'Program design, speaker/mentor scheduling, Buildathon competition rules, and judging.',
      tag: 'PROGRAM & RULES',
    },
  ];

  const metrics = [
    { label: 'PARTICIPANTS CAP', val: '250', desc: 'Single pool; all may stay overnight', icon: Users },
    { label: 'BUILDATHON CLOCK', val: '20h', desc: 'Day 1 14:30 to Day 2 10:30 IST', icon: Clock },
    { label: 'MAX TEAMS', val: '83', desc: '3 to 4 builders across 6 tracks', icon: GitBranch },
    { label: 'CASH PRIZE POOL', val: '₹50,000', desc: 'Win up to ₹50,000 & arcade tournament bounties', icon: Award },
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-[calc(100svh-4rem)] lg:h-[calc(100vh-4rem)] snap-start snap-always overflow-y-auto lg:overflow-hidden border-b-4 border-[#173f35] bg-[#040807] px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between select-none"
    >
      <div className="max-w-5xl mx-auto w-full pt-1">
        {/* Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-3">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#081510] border border-geeko-500/40 text-geeko-400 font-pixel text-[8px] mb-1">
            <Heart className="w-3 h-3 text-geeko-400" />
            <span>COMMUNITY PHILOSOPHY & METRICS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white uppercase tracking-wider">
            Learn. Build. Contribute.
          </h2>
          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
            Two days of open source mastery at Newton School of Technology, Bengaluru.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-3 bg-[#081510] border-2 border-black shadow-[inset_-2px_-2px_0_0_#173f35] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-[7px] text-slate-400">{m.label}</span>
                  <Icon className="w-3.5 h-3.5 text-geeko-400" />
                </div>
                <div className="font-pixel text-xl sm:text-2xl text-white font-bold my-1">
                  {m.val}
                </div>
                <p className="font-mono text-[9px] text-slate-400 line-clamp-1">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* The 3 Core Organizers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {organizers.map((org, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#081510] border-2 border-black shadow-[inset_-2px_-2px_0_0_#173f35] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-pixel text-[7px] text-geeko-400">{org.tag}</span>
                  <span className="font-pixel text-[7px] text-slate-500">0{idx + 1}</span>
                </div>
                <h4 className="font-pixel text-xs text-white uppercase mb-0.5">
                  {org.name}
                </h4>
                <div className="font-mono text-[9px] text-[#00f0ff] mb-1.5">
                  {org.role}
                </div>
                <p className="font-mono text-[10px] text-slate-300 leading-snug">
                  {org.duty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="text-center">
          <Link
            to="/about"
            onClick={() => sounds.click()}
            className="px-4 py-2 btn-pixel-dark text-[9px] inline-flex items-center gap-1.5"
          >
            <span>VIEW 30 PERSON SUPPORT ROSTER & TIMELINE →</span>
          </Link>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-[8px] font-pixel text-slate-500 pb-2">
        <span>30 PERSON SUPPORT ROSTER · VOLUNTEERS & MENTORS</span>
        <span className="text-geeko-400">GNU GPLv3 & CC-BY-SA 4.0</span>
      </div>
    </section>
  );
}
