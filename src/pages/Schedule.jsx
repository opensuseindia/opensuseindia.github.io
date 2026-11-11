import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Download,
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Maximize2,
  Copy,
  Check,
  User,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('day1'); // 'day1', 'day2', 'all'
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [modalSession, setModalSession] = useState(null);
  const [copiedSession, setCopiedSession] = useState(false);
  const scrollContainerRef = useRef(null);

  const scheduleData = useMemo(
    () => [
      // Day 1
      {
        id: 'd1-checkin',
        day: 'day1',
        step: '01',
        dayTitle: 'Saturday, Jan 23',
        time: '09:30 AM to 11:00 AM',
        duration: '90 MIN',
        title: 'Badge Collection & Participant Swag Kit Pickup',
        category: 'CHECK IN',
        venue: 'Main Foyer Desk',
        room: 'Ground Floor, North Gate Entrance',
        lead: 'Dushyant Acharya (Operations Lead)',
        desc: 'Check in with your registration QR pass, collect your NFC badge, stickers, and workstation desk allocation.',
        items: [
          'Bring college student ID and registration confirmation QR code',
          'Workstation desk and power socket assigned upon check in',
        ],
        milestone: false,
      },
      {
        id: 'd1-keynote',
        day: 'day1',
        step: '02',
        dayTitle: 'Saturday, Jan 23',
        time: '11:00 AM to 12:30 PM',
        duration: '90 MIN',
        title: 'Opening Keynote: Future of Linux in India',
        category: 'KEYNOTE',
        venue: 'Main Stage Auditorium',
        room: 'Auditorium Block, Ground Floor',
        lead: 'openSUSE Leadership & NST Faculty',
        desc: 'Official opening ceremony, welcome address, and vision talk on open source development and Linux engineering.',
        items: [
          'Welcome address by openSUSE India and Newton School faculty',
          'Overview of the 6 competitive tracks and judging criteria',
        ],
        milestone: true,
      },
      {
        id: 'd1-lunch',
        day: 'day1',
        step: '03',
        dayTitle: 'Saturday, Jan 23',
        time: '12:30 PM to 02:00 PM',
        duration: '90 MIN',
        title: 'Community Networking & Campus Lunch',
        category: 'MEALS',
        venue: 'Campus Dining Lawn',
        room: 'Dining Pavilion',
        lead: 'Hospitality Team',
        desc: 'Complimentary hot vegetarian buffet lunch for all 250 registered builders, mentors, and guests.',
        items: [
          'Hot vegetarian buffet with rice, dal, rotis, paneer, and sweets',
          '100% free for all registered participants',
        ],
        milestone: false,
      },
      {
        id: 'd1-briefing',
        day: 'day1',
        step: '04',
        dayTitle: 'Saturday, Jan 23',
        time: '02:00 PM to 02:30 PM',
        duration: '30 MIN',
        title: 'Buildathon Briefing: 6 Tracks & 5 Point Rubric',
        category: 'BRIEFING',
        venue: 'Main Stage Auditorium',
        room: 'Main Auditorium',
        lead: 'Rithull Raj Kallat (Program & Judging Lead)',
        desc: 'Orientation on hackathon tracks, repository submission guidelines, and jury scoring criteria.',
        items: [
          'Track problem statements and submission guidelines',
          'Introduction of on floor technical mentors',
        ],
        milestone: false,
      },
      {
        id: 'd1-kickoff',
        day: 'day1',
        step: '05',
        dayTitle: 'Saturday, Jan 23',
        time: '02:30 PM SHARP',
        duration: '20 HOURS',
        title: '20 Hour Geeko Buildathon Begins',
        category: 'MILESTONE',
        venue: 'Buildathon Hall (Lanes 1 to 4)',
        room: 'High Density Hack Hall',
        lead: 'Divyanshu Prakash & Dushyant Acharya',
        desc: 'The 20 hour countdown starts. All 83 teams push initial repository commits and begin collaborative building.',
        items: [
          'Continuous 20 hour build sprint across 6 challenge tracks',
          'Dual diesel generator power backup active for 100% uptime',
        ],
        milestone: true,
      },
      {
        id: 'd1-tea',
        day: 'day1',
        step: '06',
        dayTitle: 'Saturday, Jan 23',
        time: '05:00 PM to 06:00 PM',
        duration: '60 MIN',
        title: 'High Tea, Snacks & Campus Clue Trail',
        category: 'MEALS',
        venue: 'Arcade Lounge & Courtyard',
        room: 'Arcade Corridor',
        lead: 'Student Operations Team',
        desc: 'Fresh hot masala chai, coffee, and evening snacks. QR passport quest checkpoints unlock across campus.',
        items: [
          'Hot chai, coffee, samosas, and biscuits',
          'Digital QR scavenger checkpoints open across campus',
        ],
        milestone: false,
      },
      {
        id: 'd1-dinner',
        day: 'day1',
        step: '07',
        dayTitle: 'Saturday, Jan 23',
        time: '08:30 PM to 10:00 PM',
        duration: '90 MIN',
        title: 'Buffet Dinner & Overnight Shift Handover',
        category: 'MEALS',
        venue: 'Campus Dining Lawn',
        room: 'Dining Pavilion',
        lead: 'Operations & Safety Leads',
        desc: 'Hot dinner buffet. Volunteer shift changeover, overnight security protocol, and rest areas opened.',
        items: [
          'Nutritious dinner spread to sustain builders overnight',
          'Quiet rest pods and emergency first aid station active',
        ],
        milestone: false,
      },
      {
        id: 'd1-biryani',
        day: 'day1',
        step: '08',
        dayTitle: 'Saturday, Jan 23',
        time: '11:00 PM to 11:59 PM',
        duration: '60 MIN',
        title: 'Midnight Hot Biryani Drop & Red Bull Fuel',
        category: 'MEALS',
        venue: 'Buildathon Hall Central Hub',
        room: 'Buildathon Hall',
        lead: 'Core Organizers',
        desc: 'Late night hot Hyderabadi biryani drop and chilled energy drinks served directly to builders at their desks.',
        items: [
          'Hot vegetable biryani with raita and chilled energy drinks',
          'Late night developer fuel drop',
        ],
        milestone: true,
      },
      // Day 2
      {
        id: 'd2-bughunt',
        day: 'day2',
        step: '09',
        dayTitle: 'Sunday, Jan 24',
        time: '01:00 AM to 02:30 AM',
        duration: '90 MIN',
        title: 'Midnight Bug Hunt Debugging Sprint',
        category: 'ARCADE',
        venue: 'Breakout Lab Alpha',
        room: 'Computer Lab Alpha, 2nd Floor',
        lead: 'openSUSE Technical Mentors',
        desc: 'Live vulnerability triage sprint. Participants find and patch security bugs for spot cash bounties.',
        items: [
          'Live upstream bug triage and patch submissions',
          'Spot bounties and swag for accepted bug fixes',
        ],
        milestone: false,
      },
      {
        id: 'd2-arcade',
        day: 'day2',
        step: '10',
        dayTitle: 'Sunday, Jan 24',
        time: '04:00 AM to 05:00 AM',
        duration: '60 MIN',
        title: 'Midnight Arcade Showdown: Tekken 8 & Mortal Kombat',
        category: 'ARCADE',
        venue: 'PS5 Battlestation Lounge',
        room: 'Student Recreation Hub',
        lead: 'Arcade Marshals',
        desc: 'DualSense PS5 midnight tournament. 1v1 knockout brackets in Tekken 8 and Mortal Kombat with tournament cash prizes.',
        items: [
          '1v1 knockout tournament format on PS5 consoles',
          'Tournament cash prizes for finalists',
        ],
        milestone: false,
      },
      {
        id: 'd2-breakfast',
        day: 'day2',
        step: '11',
        dayTitle: 'Sunday, Jan 24',
        time: '08:00 AM to 09:30 AM',
        duration: '90 MIN',
        title: 'Morning Breakfast & Hot South Indian Coffee',
        category: 'MEALS',
        venue: 'Campus Dining Lawn',
        room: 'Dining Pavilion',
        lead: 'Hospitality Team',
        desc: 'Fresh idlis, vadas, dosas, and authentic filter coffee to re energize builders for the final sprint.',
        items: [
          'Unlimited hot breakfast buffet with south Indian delicacies',
          'Authentic filter coffee and fresh juice',
        ],
        milestone: false,
      },
      {
        id: 'd2-freeze',
        day: 'day2',
        step: '12',
        dayTitle: 'Sunday, Jan 24',
        time: '10:30 AM SHARP',
        duration: 'STRICT',
        title: 'Buildathon Code Freeze (Strict Cutoff)',
        category: 'MILESTONE',
        venue: 'Git & OBS Repositories',
        room: 'Buildathon Hall',
        lead: 'Rithull Raj Kallat (Judging Lead)',
        desc: 'All git commits, pull requests, and package submissions are locked. Preliminary jury scoring begins.',
        items: [
          'Strict repository lock; commits after 10:30 AM are not counted',
          'Submission portal closes',
        ],
        milestone: true,
      },
      {
        id: 'd2-demos',
        day: 'day2',
        step: '13',
        dayTitle: 'Sunday, Jan 24',
        time: '11:00 AM to 12:45 PM',
        duration: '105 MIN',
        title: 'Top 6 Finalist Demos & Live Jury Scoring',
        category: 'DEMO',
        venue: 'Main Stage Auditorium',
        room: 'Auditorium Main Stage',
        lead: 'Industry Jury & Mentors',
        desc: 'Top 6 shortlisted teams present 5 minute live technical demos on the main stage followed by 3 minutes of jury Q&A.',
        items: [
          '5 minute live working prototype demo per team',
          '3 minute technical defense and questions from jury',
        ],
        milestone: true,
      },
      {
        id: 'd2-awards',
        day: 'day2',
        step: '14',
        dayTitle: 'Sunday, Jan 24',
        time: '01:00 PM to 02:00 PM',
        duration: '60 MIN',
        title: 'Grand Awards & ₹50,000 Trophy Ceremony',
        category: 'MILESTONE',
        venue: 'Main Stage Auditorium',
        room: 'Auditorium Main Stage',
        lead: 'Divyanshu Prakash, Dushyant Acharya & Faculty',
        desc: 'Podium announcement: Win Up to ₹50,000 grand cash awards, arcade tournament bounties, champion trophies, and certificates.',
        items: [
          'Win Up to ₹50,000 Cash Pool & Gold Trophies',
          'Arcade Tournament Bounties · Contributor Certificates',
        ],
        milestone: true,
      },
    ],
    []
  );

  // Category styling matching the site-wide theme color scheme
  const getCategoryMeta = (item) => {
    if (item.id === 'd2-freeze') {
      return {
        badgeLabel: 'CODE FREEZE',
        badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-500/50',
        nodeClass: 'border-rose-400 bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]',
        timeClass: 'text-rose-400',
        cardClass: 'border-rose-500/40 hover:border-rose-400 bg-[#10070a]',
        spotTag: { label: 'COMMITS LOCK', class: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
      };
    }
    if (item.id === 'd2-awards') {
      return {
        badgeLabel: 'CEREMONY',
        badgeClass: 'bg-yellow-950/60 text-yellow-300 border-yellow-500/50',
        nodeClass: 'border-yellow-400 bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.7)]',
        timeClass: 'text-yellow-400',
        cardClass: 'border-yellow-500/40 hover:border-yellow-400 bg-[#121006]',
        spotTag: { label: '₹50,000 PODIUM', class: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
      };
    }
    if (item.id === 'd1-kickoff') {
      return {
        badgeLabel: 'BUILDATHON',
        badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50',
        nodeClass: 'border-geeko-400 bg-geeko-400 shadow-[0_0_8px_#00f59b]',
        timeClass: 'text-geeko-400',
        cardClass: 'border-geeko-500/50 hover:border-geeko-400 bg-[#061810]',
        spotTag: { label: 'CLOCK STARTS', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      };
    }
    if (item.id === 'd2-bughunt') {
      return {
        badgeLabel: 'BUG HUNT',
        badgeClass: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50',
        nodeClass: 'border-cyan-400 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]',
        timeClass: 'text-cyan-300',
        cardClass: 'border-[#173f35] hover:border-cyan-400/60 bg-[#06140e]',
        spotTag: { label: 'SPOT BOUNTIES', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      };
    }
    if (item.id === 'd2-arcade') {
      return {
        badgeLabel: 'ARCADE',
        badgeClass: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50',
        nodeClass: 'border-cyan-400 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]',
        timeClass: 'text-cyan-300',
        cardClass: 'border-[#173f35] hover:border-cyan-400/60 bg-[#06140e]',
        spotTag: { label: 'PS5 ARENA', class: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      };
    }
    if (item.id === 'd2-demos') {
      return {
        badgeLabel: 'LIVE DEMOS',
        badgeClass: 'bg-blue-950/60 text-blue-300 border-blue-500/50',
        nodeClass: 'border-blue-400 bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.7)]',
        timeClass: 'text-blue-300',
        cardClass: 'border-[#173f35] hover:border-blue-400/60 bg-[#06140e]',
        spotTag: { label: 'TOP 6 TEAMS', class: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
      };
    }
    if (item.id === 'd1-keynote') {
      return {
        badgeLabel: 'KEYNOTE',
        badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-500/50',
        nodeClass: 'border-purple-400 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]',
        timeClass: 'text-purple-300',
        cardClass: 'border-[#173f35] hover:border-purple-400/60 bg-[#06140e]',
        spotTag: { label: 'VISION TALK', class: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      };
    }
    if (item.id === 'd1-briefing') {
      return {
        badgeLabel: 'BRIEFING',
        badgeClass: 'bg-teal-950/60 text-teal-300 border-teal-500/50',
        nodeClass: 'border-teal-400 bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.7)]',
        timeClass: 'text-teal-300',
        cardClass: 'border-[#173f35] hover:border-teal-400/60 bg-[#06140e]',
        spotTag: null,
      };
    }
    if (item.id === 'd1-checkin') {
      return {
        badgeLabel: 'CHECK IN',
        badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50',
        nodeClass: 'border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]',
        timeClass: 'text-emerald-400',
        cardClass: 'border-[#173f35] hover:border-emerald-400/60 bg-[#06140e]',
        spotTag: null,
      };
    }
    if (item.category === 'MEALS') {
      return {
        badgeLabel: 'MEALS',
        badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-500/50',
        nodeClass: 'border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]',
        timeClass: 'text-amber-400',
        cardClass: 'border-[#173f35] hover:border-amber-400/60 bg-[#06140e]',
        spotTag:
          item.id === 'd1-biryani'
            ? { label: 'DEV FUEL', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
            : item.id === 'd2-breakfast'
            ? { label: 'FILTER COFFEE', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' }
            : null,
      };
    }
    return {
      badgeLabel: item.category,
      badgeClass: 'bg-[#06140e] text-slate-300 border-[#173f35]',
      nodeClass: 'border-[#173f35] bg-[#030806]',
      timeClass: 'text-geeko-400',
      cardClass: 'border-[#173f35] hover:border-geeko-500/40 bg-[#06140e]',
      spotTag: null,
    };
  };

  const filteredItems = useMemo(() => {
    return scheduleData.filter((item) => {
      if (activeDay !== 'all' && item.day !== activeDay) return false;
      if (activeCategory === 'MILESTONES' && !item.milestone) return false;
      if (activeCategory === 'KEYNOTE' && item.category !== 'KEYNOTE') return false;
      if (activeCategory === 'MEALS' && item.category !== 'MEALS') return false;
      if (activeCategory === 'ARCADE' && item.category !== 'ARCADE') return false;
      if (activeCategory === 'DEMO' && item.category !== 'DEMO') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchVenue = item.venue.toLowerCase().includes(q);
        const matchDesc = item.desc.toLowerCase().includes(q);
        if (!matchTitle && !matchVenue && !matchDesc) return false;
      }
      return true;
    });
  }, [scheduleData, activeDay, activeCategory, searchQuery]);

  const scrollLeft = () => {
    sounds.click?.();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    sounds.click?.();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const generateIcsCalendar = () => {
    sounds.click?.();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//openSUSE India//Bengaluru Connect 2027//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:openSUSE India · Bengaluru Connect 2027
DESCRIPTION:Two days of open source learning, keynotes, and 20 Hour Geeko Buildathon at Newton School of Technology, S-VYASA University campus, Bengaluru.
LOCATION:Newton School of Technology at S-VYASA University, Mysore Road, Bengaluru
DTSTART:20270123T040000Z
DTEND:20270124T083000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'openSUSE-Bengaluru-Connect-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleItem = (id, e) => {
    if (e) e.stopPropagation();
    sounds.click?.();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    sounds.click?.();
    setExpandedIds(new Set(filteredItems.map((i) => i.id)));
  };

  const collapseAll = () => {
    sounds.click?.();
    setExpandedIds(new Set());
  };

  const generateSingleSessionIcs = (item) => {
    sounds.click?.();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//openSUSE India//Bengaluru Connect 2027//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${item.title}
DESCRIPTION:${item.desc.replace(/\\n/g, ' ')} | Room: ${item.room} | Lead: ${item.lead}
LOCATION:${item.venue}, Newton School of Technology, S-VYASA Campus, Bengaluru
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${item.id}-schedule.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySessionInfo = (item) => {
    sounds.click?.();
    const text = `openSUSE Connect '27 // Session #${item.step}: ${item.title}\nTime: ${item.time} (${item.duration})\nVenue: ${item.venue} (${item.room})\nLead: ${item.lead}\nDetails: ${item.desc}`;
    navigator.clipboard.writeText(text);
    setCopiedSession(true);
    setTimeout(() => setCopiedSession(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030806] text-slate-300 font-mono select-none pt-24 sm:pt-28 pb-20 px-3 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143024] pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
              <span>CHRONOLOGICAL FLIGHT MATRIX</span>
            </div>
            <h1
              className="text-2xl sm:text-4xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none"
              style={{
                textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
              }}
            >
              <span className="text-white">SUMMIT </span>
              <span className="text-[#73ba25]">TIMELINE</span>
            </h1>
            <p className="text-slate-400 font-mono text-xs max-w-xl">
              20 hour continuous hackathon flow from badge check in to ₹50,000 podium.
            </p>
          </div>

          {/* Scroll Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-lg bg-[#06140e] hover:bg-[#0a2217] border border-[#173f35] hover:border-geeko-500/50 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-pixel text-[9px]"
              title="Scroll Left"
            >
              <ArrowLeft className="w-4 h-4 text-[#73ba25]" />
              <span className="hidden sm:inline">PREV</span>
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-lg bg-[#06140e] hover:bg-[#0a2217] border border-[#173f35] hover:border-[#73ba25]/60 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-pixel text-[9px]"
              title="Scroll Right"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ArrowRight className="w-4 h-4 text-[#73ba25]" />
            </button>
          </div>
        </div>

        {/* Compact Toolbar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Day Selector */}
            <div className="flex items-center bg-[#06140e] p-1 rounded-lg border border-[#173f35] font-pixel text-[9px]">
              <button
                onClick={() => {
                  setActiveDay('day1');
                  sounds.click?.();
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeDay === 'day1'
                    ? 'bg-geeko-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DAY 1 · JAN 23
              </button>
              <button
                onClick={() => {
                  setActiveDay('day2');
                  sounds.click?.();
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeDay === 'day2'
                    ? 'bg-geeko-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DAY 2 · JAN 24
              </button>
              <button
                onClick={() => {
                  setActiveDay('all');
                  sounds.click?.();
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeDay === 'all'
                    ? 'bg-geeko-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ALL SESSIONS
              </button>
            </div>

            {/* Search & Export */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter sessions..."
                  className="w-full bg-[#06140e] border border-[#173f35] pl-8 pr-7 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-geeko-500 font-mono placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <button
                onClick={generateIcsCalendar}
                className="px-3 py-1.5 bg-[#06140e] hover:bg-[#0a2217] border border-[#173f35] hover:border-geeko-500/50 text-geeko-400 hover:text-white rounded-lg font-pixel text-[8.5px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3 h-3" />
                <span>EXPORT .ICS</span>
              </button>
            </div>
          </div>

          {/* Category Chips with distinct theme colors */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
              {[
                {
                  key: 'ALL',
                  label: 'All',
                  activeClass: 'bg-geeko-500 text-black border-geeko-400 font-bold',
                  dot: 'bg-geeko-400',
                },
                {
                  key: 'MILESTONES',
                  label: 'Milestones',
                  activeClass: 'bg-emerald-500 text-black border-emerald-400 font-bold',
                  dot: 'bg-emerald-400',
                },
                {
                  key: 'KEYNOTE',
                  label: 'Keynotes',
                  activeClass: 'bg-purple-600 text-white border-purple-400 font-bold',
                  dot: 'bg-purple-400',
                },
                {
                  key: 'MEALS',
                  label: 'Food & Meals',
                  activeClass: 'bg-amber-500 text-black border-amber-400 font-bold',
                  dot: 'bg-amber-400',
                },
                {
                  key: 'ARCADE',
                  label: 'Bug Hunt & Gaming',
                  activeClass: 'bg-cyan-500 text-black border-cyan-400 font-bold',
                  dot: 'bg-[#00f0ff]',
                },
                {
                  key: 'DEMO',
                  label: 'Live Demos',
                  activeClass: 'bg-blue-500 text-white border-blue-400 font-bold',
                  dot: 'bg-blue-400',
                },
              ].map((c) => {
                const isActive = activeCategory === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => {
                      setActiveCategory(c.key);
                      sounds.click?.();
                    }}
                    className={`px-3 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isActive
                        ? c.activeClass
                        : 'bg-[#06140e] text-slate-400 border border-[#173f35]/70 hover:text-white hover:border-[#245b4c]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-black' : c.dot
                      }`}
                    />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {filteredItems.length > 0 && (
                <button
                  type="button"
                  onClick={expandedIds.size === filteredItems.length ? collapseAll : expandAll}
                  className="px-2.5 py-1 rounded bg-[#06140e] border border-[#173f35] hover:border-geeko-500/40 text-[10px] font-mono text-geeko-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  {expandedIds.size === filteredItems.length ? (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      <span>Collapse All</span>
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-3 h-3" />
                      <span>Expand All Specs</span>
                    </>
                  )}
                </button>
              )}
              <span className="text-[11px] font-mono text-slate-500">
                {filteredItems.length} Sessions
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL TIMELINE RAIL & CARDS STREAM                                   */}
        {/* ========================================================================= */}
        <div className="relative pt-4 pb-8">

          {/* Horizontal Connecting Rail Line */}
          <div className="absolute top-[46px] left-0 right-0 h-0.5 bg-[#173f35]/80 pointer-events-none z-0" />

          {/* Scrollable Container with items-start so expanded cards never stretch siblings */}
          <div
            ref={scrollContainerRef}
            className="flex items-start gap-5 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#173f35] scrollbar-track-transparent relative z-10"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#173f35 transparent',
            }}
          >
            {filteredItems.length === 0 ? (
              <div className="w-full p-8 text-center text-slate-500 font-mono text-xs border border-[#173f35] rounded-xl bg-[#06140e]">
                No sessions match your search or filter.
              </div>
            ) : (
              filteredItems.map((item) => {
                const isExpanded = expandedIds.has(item.id);
                const meta = getCategoryMeta(item);

                return (
                  <div
                    key={item.id}
                    className="w-[320px] sm:w-[360px] shrink-0 snap-start flex flex-col"
                  >
                    {/* Top Timeline Node & Timestamp Header */}
                    <div className="flex items-center gap-3 mb-3 pl-1">
                      {/* Node circle styled by category theme */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all ${meta.nodeClass} ${
                          isExpanded ? 'ring-4 ring-[#73ba25]/30 scale-110 shadow-[0_0_12px_#73ba25]' : ''
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </div>

                      {/* Time text & step */}
                      <div className="flex items-center justify-between w-full pr-2 text-xs font-mono">
                        <span className={`font-bold truncate ${meta.timeClass}`}>
                          {item.time}
                        </span>
                        <span className="text-[10px] text-slate-500 font-pixel">
                          #{item.step}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div
                      className={`p-5 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${meta.cardClass} ${
                        isExpanded ? 'border-[#73ba25] shadow-[0_0_20px_rgba(115,186,37,0.2)]' : ''
                      }`}
                    >
                      {/* Top Specular Line on Expanded */}
                      {isExpanded && (
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#73ba25] to-transparent pointer-events-none" />
                      )}

                      <div className="space-y-3">
                        {/* Badges strip with theme color and spot loot tag */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[8px] font-pixel uppercase tracking-wider border ${meta.badgeClass}`}
                            >
                              {meta.badgeLabel}
                            </span>
                            {meta.spotTag && (
                              <span
                                className={`px-1.5 py-0.5 rounded text-[7.5px] font-pixel uppercase tracking-wider border ${meta.spotTag.class}`}
                              >
                                {meta.spotTag.label}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.duration}
                            </span>
                            {/* Quick Dossier Modal Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                sounds.click?.();
                                setModalSession(item);
                              }}
                              className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Open Mission Dossier"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={(e) => toggleItem(item.id, e)}
                          className="text-white font-semibold text-sm leading-snug line-clamp-2 hover:text-[#8ee631] transition-colors cursor-pointer"
                        >
                          {item.title}
                        </h3>

                        {/* Venue tag */}
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{item.venue}</span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 font-mono text-xs leading-relaxed line-clamp-3">
                          {item.desc}
                        </p>
                      </div>

                      {/* Expandable Info Drawer Toggle Button */}
                      <div className="mt-4 pt-3 border-t border-[#173f35]">
                        <button
                          type="button"
                          onClick={(e) => toggleItem(item.id, e)}
                          className="w-full flex items-center justify-between text-xs font-mono text-[#8ee631] hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="text-[11px] font-semibold">
                            {isExpanded ? 'Hide Details' : 'Inspect Room & Specs'}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#8ee631]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-3 pt-3 border-t border-[#173f35]/60 space-y-2 text-xs font-mono overflow-hidden"
                            >
                              <div className="space-y-1 text-[11px]">
                                <div className="text-slate-400">
                                  <span className="text-slate-500 block text-[9.5px] uppercase font-bold">ROOM:</span>
                                  <span className="text-white">{item.room}</span>
                                </div>
                                <div className="text-slate-400 pt-1">
                                  <span className="text-slate-500 block text-[9.5px] uppercase font-bold">LEAD:</span>
                                  <span className="text-[#8ee631]">{item.lead}</span>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#173f35]/40 space-y-1">
                                {item.items.map((it, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                                    <span className="text-[#8ee631] shrink-0">•</span>
                                    <span>{it}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t border-[#173f35]/40 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    generateSingleSessionIcs(item);
                                  }}
                                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Download className="w-3 h-3 text-[#73ba25]" />
                                  <span>Add .ICS</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sounds.click?.();
                                    setModalSession(item);
                                  }}
                                  className="text-[10px] text-[#8ee631] hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-bold"
                                >
                                  <span>Full Dossier</span>
                                  <Maximize2 className="w-3 h-3" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Navigation Tip */}
        <div className="p-4 rounded-xl bg-[#06140e] border border-[#173f35] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-geeko-400 shrink-0" />
            <span>20 Hour hackathon sprint runs continuously from Saturday 14:30 to Sunday 10:30.</span>
          </div>
          <span className="text-geeko-400 font-pixel text-[9px] shrink-0">S VYASA CAMPUS · BENGALURU</span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE MISSION DOSSIER MODAL                         */}
      {/* ========================================================= */}
      <AnimatePresence>
        {modalSession && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => {
              sounds.click?.();
              setModalSession(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-[#07130c] border border-[#73ba25]/50 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(115,186,37,0.2)] overflow-hidden font-mono relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Specular line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#73ba25] to-transparent pointer-events-none" />

              {/* Modal Header */}
              <div className="p-5 bg-[#091810] border-b border-[#173f35] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#73ba25] animate-pulse" />
                  <span className="font-pixel text-[9px] uppercase tracking-wider text-[#8ee631]">
                    SESSION DOSSIER #{modalSession.step}
                  </span>
                </div>
                <button
                  onClick={() => {
                    sounds.click?.();
                    setModalSession(null);
                  }}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#73ba25]/20 text-[#8ee631] font-pixel text-[8px] uppercase tracking-wider border border-[#73ba25]/40">
                      {modalSession.category}
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                      {modalSession.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">
                    {modalSession.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-[#73ba25]" />
                    <span className="text-white font-bold">{modalSession.time}</span>
                    <span>·</span>
                    <span>{modalSession.dayTitle}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Venue &amp; Room</span>
                    <strong className="text-white text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#73ba25] shrink-0" />
                      <span className="truncate">{modalSession.room}</span>
                    </strong>
                    <span className="text-[10px] text-slate-500 block truncate">{modalSession.venue}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Session Lead</span>
                    <strong className="text-[#8ee631] text-xs flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3 shrink-0" />
                      <span className="truncate">{modalSession.lead}</span>
                    </strong>
                    <span className="text-[10px] text-slate-500 block">openSUSE Team</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Overview &amp; Context</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {modalSession.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Key Deliverables &amp; Action Items</span>
                  <div className="space-y-1.5">
                    {modalSession.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-black/30 border border-white/5">
                        <Check className="w-3.5 h-3.5 text-[#73ba25] shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#091810] border-t border-[#173f35] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopySessionInfo(modalSession)}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSession ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSession ? 'Copied!' : 'Copy Info'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => generateSingleSessionIcs(modalSession)}
                    className="px-3.5 py-2 rounded-lg bg-[#06140e] border border-[#173f35] hover:border-geeko-500/50 text-[#8ee631] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalSession(null)}
                    className="px-4 py-2 rounded-lg bg-[#73ba25] hover:bg-[#8ee631] text-black font-pixel text-[10px] uppercase font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(115,186,37,0.3)]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
