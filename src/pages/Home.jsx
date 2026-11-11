import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SynergyHero from '../components/3d/SynergyHero';
import SynergyThreeStream from '../components/events/SynergyThreeStream';
import ScheduleReadableSection from '../components/events/ScheduleReadableSection';
import VenueHubSection from '../components/events/VenueHubSection';
import SponsorsSynergyShowcase from '../components/events/SponsorsSynergyShowcase';
import EventDetailsModal from '../components/events/EventDetailsModal';
import { allEvents } from '../data/events';
import {
  Sparkles,
  Layers,
  Mic,
  BookOpen,
  Gamepad2,
  ChevronDown,
  Shield,
  MapPin,
  Clock,
  Users,
  Trophy,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cpu,
  Monitor,
  GitPullRequest,
  Calendar,
  Search,
  X,
  List,
  Compass,
  Wifi,
  Utensils,
  Award,
  Zap,
} from 'lucide-react';
import { sounds } from '../lib/sound';

export default function Home() {
  const location = useLocation();
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('hero');

  useEffect(() => {
    // 1. Intersection Observer for floating cyber nav dock
    const sectionIds = ['hero', 'all-events', 'highlights', 'venue', 'schedule', 'sponsors'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const scrollToEvents = () => {
      const stage = document.getElementById('events-stage') || document.getElementById('all-events');
      if (stage) {
        const navbarHeight = 64;
        const rect = stage.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - navbarHeight;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    };

    const handleScrollToEvents = () => {
      setSelectedCategory('ALL');
      setSearchQuery('');
      requestAnimationFrame(scrollToEvents);
    };

    window.addEventListener('open-all-events', handleScrollToEvents);

    if (location.hash === '#all-events' || location.state?.scrollToEvents) {
      setTimeout(handleScrollToEvents, 120);
    } else if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const navbarHeight = 64;
          const rect = el.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - navbarHeight;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }, 120);
      }
    }

    // Passive, fluid on-scroll guide: smoothly lands at each key section
    // (Hero <-> All Events <-> Highlights <-> Venue <-> Schedule <-> Sponsors <-> Footer)
    let lastScrollY = window.scrollY;
    let isAutoScrolling = false;
    let autoScrollTimer = null;

    const onScroll = () => {
      // Don't auto-scroll if user is interacting with the map
      if (window.__isMapHovered) return;
      if (isAutoScrolling) return;

      const scrollY = window.scrollY;
      const isDown = scrollY > lastScrollY;
      lastScrollY = scrollY;

      const navbarHeight = 64;
      const allEventsSection = document.getElementById('all-events');
      const highlights = document.getElementById('highlights');
      const venue = document.getElementById('venue');
      const schedule = document.getElementById('schedule');
      const sponsors = document.getElementById('sponsors');
      if (!allEventsSection || !highlights) return;

      const eventsY = Math.max(0, allEventsSection.offsetTop - navbarHeight);
      const highlightsY = Math.max(0, highlights.offsetTop - navbarHeight);
      const venueY = venue ? Math.max(0, venue.offsetTop - navbarHeight) : null;
      const scheduleY = schedule ? Math.max(0, schedule.offsetTop - navbarHeight) : null;
      const sponsorsY = sponsors ? Math.max(0, sponsors.offsetTop - navbarHeight) : null;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      const triggerGlide = (targetY) => {
        isAutoScrolling = true;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        clearTimeout(autoScrollTimer);
        const onScrollEnd = () => {
          isAutoScrolling = false;
          lastScrollY = window.scrollY;
          window.removeEventListener('scrollend', onScrollEnd);
        };
        window.addEventListener('scrollend', onScrollEnd, { once: true });
        autoScrollTimer = setTimeout(() => {
          isAutoScrolling = false;
          lastScrollY = window.scrollY;
          window.removeEventListener('scrollend', onScrollEnd);
        }, 450);
      };

      // 1. Hero -> Events (Down)
      if (isDown && scrollY > 20 && scrollY < eventsY - 80) {
        triggerGlide(eventsY);
        return;
      }
      // 2. Events -> Hero (Up)
      if (!isDown && scrollY < eventsY - 20 && scrollY > 0 && scrollY < eventsY) {
        triggerGlide(0);
        return;
      }
      // 3. Events -> Highlights (Down)
      if (isDown && highlightsY && scrollY > eventsY + 30 && scrollY < highlightsY - 80) {
        triggerGlide(highlightsY);
        return;
      }
      // 4. Highlights -> Events (Up)
      if (!isDown && highlightsY && scrollY < highlightsY - 20 && scrollY > eventsY && scrollY < highlightsY) {
        triggerGlide(eventsY);
        return;
      }
      // 5. Highlights -> Venue (Down)
      if (isDown && venueY && scrollY > highlightsY + 25 && scrollY < venueY - 80) {
        triggerGlide(venueY);
        return;
      }
      // 6. Venue -> Highlights (Up)
      if (!isDown && venueY && scrollY < venueY - 25 && scrollY > highlightsY && scrollY < venueY) {
        triggerGlide(highlightsY);
        return;
      }
      // 7. Venue -> Schedule (Down)
      if (isDown && scheduleY && scrollY > venueY + 25 && scrollY < scheduleY - 80) {
        triggerGlide(scheduleY);
        return;
      }
      // 8. Schedule -> Venue (Up)
      if (!isDown && scheduleY && scrollY < scheduleY - 25 && scrollY > venueY && scrollY < scheduleY) {
        triggerGlide(venueY);
        return;
      }
      // 9. Schedule -> Sponsors (Down)
      if (isDown && sponsorsY && scrollY > scheduleY + 25 && scrollY < sponsorsY - 80) {
        triggerGlide(sponsorsY);
        return;
      }
      // 10. Sponsors -> Schedule (Up)
      if (!isDown && sponsorsY && scrollY < sponsorsY - 25 && scrollY > scheduleY && scrollY < sponsorsY) {
        triggerGlide(scheduleY);
        return;
      }
      // 11. Sponsors -> Footer (Down)
      if (isDown && sponsorsY && scrollY > sponsorsY + 25 && scrollY < maxScroll - 60) {
        triggerGlide(maxScroll);
        return;
      }
      // 12. Footer -> Sponsors (Up)
      if (!isDown && sponsorsY && scrollY < maxScroll - 30 && scrollY > sponsorsY + 60) {
        triggerGlide(sponsorsY);
        return;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('open-all-events', handleScrollToEvents);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(autoScrollTimer);
    };
  }, [location.hash, location.state]);

  const categories = [
    { key: 'ALL', label: 'ALL (22)' },
    { key: 'Buildathon', label: '6 TRACKS', icon: Layers },
    { key: 'Talks', label: 'KEYNOTES', icon: Mic },
    { key: 'Workshops', label: 'WORKSHOPS', icon: BookOpen },
    { key: 'Arcade', label: 'ARCADE', icon: Gamepad2 },
  ];

  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      let matchesCategory = true;
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'Buildathon') {
          matchesCategory =
            item.category?.toLowerCase() === 'buildathon' ||
            item.category?.toLowerCase() === 'hackathon' ||
            item.category?.toLowerCase() === 'track';
        } else if (selectedCategory === 'Arcade') {
          matchesCategory =
            item.category?.toLowerCase() === 'arcade' ||
            item.category?.toLowerCase() === 'competitions' ||
            item.category?.toLowerCase() === 'community';
        } else {
          matchesCategory =
            item.category?.toLowerCase() === selectedCategory.toLowerCase();
        }
      }

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.type?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.spoc?.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenEventModal = (event) => {
    sounds.click();
    setSelectedModalEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen text-slate-100 bg-[#040807] overflow-x-clip">
      {/* ========================================================================= */}
      {/* 1. SYNERGY HERO (3D Flying Glider, Live Countdown, Minecraft Splash)      */}
      {/* ========================================================================= */}
      <SynergyHero />

      {/* ========================================================================= */}
      {/* 2. ALL EVENTS (22): 3D PERSPECTIVE STREAM + CENTRAL EVENT FINDER HUD      */}
      {/* ========================================================================= */}
      <section
        id="all-events"
        className="relative w-full bg-[#020504] overflow-hidden select-none home-snap-section"
      >
        <span id="stream" className="absolute -top-24 pointer-events-none" />

        {/* The 3D Stream Stage Container (Seamless Cinematic Continuation from Hero) */}
        <div id="events-stage" className="relative w-full h-[760px] sm:h-[820px] bg-[#020504] border-b border-[#173f35]/50 overflow-hidden flex items-center justify-center">
          {/* Background Three.js 3D Floating Perspective Stream */}
          <div className="absolute inset-0 z-0">
            <SynergyThreeStream
              events={filteredEvents}
              onSelectEvent={handleOpenEventModal}
            />
          </div>

          {/* Vignette Gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#020504] via-[#020504]/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#040807] to-transparent" />

          {/* FOREGROUND: Central Event Finder HUD Panel (Dark Obsidian Glass Chassis) */}
          <div className="relative z-20 w-[min(92vw,560px)] bg-[rgba(3,6,4,0.78)] backdrop-blur-2xl border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(115,186,37,0.12)] p-4 sm:p-6 flex flex-col max-h-[520px] sm:max-h-[560px] relative animate-fade-in overflow-hidden">
            
            {/* Specular Top Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* 4 Corner Tactical Cyber Brackets (openSUSE Green) */}
            <span className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#73ba25] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-[#73ba25] pointer-events-none" />

            {/* HUD Header */}
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/15 text-slate-300 font-mono text-[9px] uppercase tracking-widest mb-2 shadow-sm">
                  <span>2 DAY CONNECT SCHEDULE</span>
                </div>
                <h3
                  className="font-pixel text-2xl sm:text-3xl text-white tracking-wide mt-1 mb-2 select-none"
                  style={{
                    textShadow: '3px 3px 0 #0d3824, 6px 6px 0 #051910, 8px 8px 0 #020d08, 0 10px 20px rgba(0,0,0,0.85)',
                  }}
                >
                  EVENTS
                </h3>
                {/* Dotted Divider Line */}
                <div className="border-b border-dashed border-white/12 mx-3 mb-2.5" />
              </div>

              {/* Category Filter Buttons */}
              <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1.5 mb-2.5 scrollbar-none no-scrollbar">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      sounds.click();
                      setSelectedCategory(c.key);
                    }}
                    className={`px-3 py-1.5 font-pixel text-[7.5px] sm:text-[8px] uppercase tracking-wider transition-all whitespace-nowrap ${
                      selectedCategory === c.key
                        ? 'bg-[#73ba25] text-[#030805] font-bold shadow-[0_0_16px_rgba(115,186,37,0.35)] border border-[#a3e635]'
                        : 'bg-black/60 border border-white/12 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Real-Time Search Bar */}
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH EVENTS..."
                  className="w-full py-2 pl-9 pr-8 bg-black/70 border border-white/12 focus:border-[#73ba25] font-pixel text-[8px] text-white placeholder-slate-500 uppercase tracking-wider focus:outline-none focus:shadow-[0_0_16px_rgba(115,186,37,0.2)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Counter & Instruction Strip */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2 font-pixel text-[7.5px] text-slate-400">
                <span className="text-white">{filteredEvents.length} MISSIONS</span>
                <span className="text-slate-400 font-mono tracking-wider">▲▼ BROWSE <span className="text-slate-600">•</span> ENTER OPENS</span>
              </div>

              {/* Scrollable Event List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[250px] custom-scrollbar">
                {filteredEvents.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-pixel text-[9px]">
                    NO EVENTS MATCH "{searchQuery.toUpperCase()}".
                  </div>
                ) : (
                  filteredEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => handleOpenEventModal(evt)}
                      className="p-2.5 rounded-lg bg-black/40 hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Mini Poster Thumbnail */}
                        <div className="w-9 h-9 overflow-hidden bg-black border border-white/10 shrink-0 relative">
                          {evt.poster ? (
                            <img
                              src={evt.poster}
                              alt={evt.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Event Info */}
                        <div className="min-w-0">
                          <div className="font-pixel text-[8.5px] text-white group-hover:text-[#a3e635] transition-colors truncate">
                            {evt.name}
                          </div>
                          <div className="font-pixel text-[7.5px] text-slate-400 mt-1 truncate">
                            {evt.prize ? (
                              <span>PRIZE <strong className="text-[#fbbf24] font-normal">{evt.prize}</strong></span>
                            ) : (
                              <span className="text-slate-400">KEYNOTE SESSION · OPEN TO ALL</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right-aligned Tactical Category & Day Badges */}
                      <div className="flex items-center gap-2 shrink-0">
                        {(() => {
                          const cat = (evt.category || '').toLowerCase();
                          let badgeLabel = evt.category ? evt.category.toUpperCase().slice(0, 10) : 'MISSION';
                          let badgeStyle = 'bg-white/5 text-slate-300 border-white/10';

                          if (cat.includes('talk') || cat.includes('keynote')) {
                            badgeLabel = 'TALK';
                            badgeStyle = 'bg-sky-950/40 text-sky-300 border-sky-500/30';
                          } else if (cat.includes('workshop')) {
                            badgeLabel = 'WORKSHOP';
                            badgeStyle = 'bg-purple-950/40 text-purple-300 border-purple-500/30';
                          } else if (cat.includes('arcade')) {
                            badgeLabel = 'ARCADE';
                            badgeStyle = 'bg-amber-950/40 text-amber-300 border-amber-500/30';
                          } else if (cat.includes('quest') || cat.includes('community')) {
                            badgeLabel = 'QUEST';
                            badgeStyle = 'bg-orange-950/40 text-orange-300 border-orange-500/30';
                          } else if (cat.includes('compet') || evt.name.toLowerCase().includes('bug')) {
                            badgeLabel = 'BUG HUNT';
                            badgeStyle = 'bg-yellow-950/40 text-yellow-300 border-yellow-500/30';
                          } else if (cat === 'hackathon' || (cat.includes('hack') && !cat.includes('build'))) {
                            badgeLabel = 'HACKATHON';
                            badgeStyle = 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
                          } else if (cat.includes('build') || cat.includes('track')) {
                            badgeLabel = 'BUILDATHON';
                            badgeStyle = 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30';
                          } else if (cat.includes('judg') || cat.includes('demo')) {
                            badgeLabel = 'FINALE';
                            badgeStyle = 'bg-rose-950/40 text-rose-300 border-rose-500/30';
                          }

                          return (
                            <span className={`px-2 py-0.5 font-pixel text-[7px] uppercase tracking-wider rounded border ${badgeStyle}`}>
                              {badgeLabel}
                            </span>
                          );
                        })()}
                        <span className="px-2 py-0.5 bg-black/70 border border-white/10 font-pixel text-[7px] text-slate-400">
                          {evt.days ? evt.days[0] : 'DAY 1'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#73ba25] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* HUD Footer Status */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[7.5px] font-pixel text-slate-400">
                <span>TOTAL: {filteredEvents.length} MISSIONS</span>
                <span className="text-slate-400">CLICK ANY ROW OR 3D POSTER TO INSPECT</span>
              </div>
            </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE BUILDER EXPERIENCE: HIGH-ENERGY HIGHLIGHTS & PERKS                 */}
      {/* ========================================================================= */}
      <section
        id="highlights"
        className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between pt-10 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 max-w-7xl mx-auto border-b border-[#173f35]/50 overflow-hidden select-none home-snap-section"
      >
        <span id="overview" className="absolute -top-24 pointer-events-none" />

        {/* Dynamic Multi-Color Ambient Glows for Depth */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#73ba25]/[0.015] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 -translate-y-1/2 w-[450px] h-[450px] bg-purple-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col justify-between flex-1">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
              <span>THE 250 BUILDER EXPERIENCE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] text-white select-none mb-2.5"
              style={{
                textShadow: "2px 2px 0 #0d3824, 4px 4px 0 #051910",
              }}
            >
              <span className="text-white">WHY ATTEND </span>
              <span className="text-[#73ba25]">CONNECT '27</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
              ₹50,000 in grand cash bounties, competitive PS5 tournaments, midnight hot biryani, and 20 hours of overnight building. 100% free.
            </p>
          </div>

          {/* Previous Design: Impactful Full-Size 4 Columns Cyber Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 relative z-10 mb-4 sm:mb-5">
            
            {/* Card 1: 🏆 GRAND REWARDS */}
            <div
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="group relative rounded-xl bg-gradient-to-br from-[#0c140a]/95 via-[#070d06]/95 to-[#020503]/95 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400/80 p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.2)] cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>01 // REWARDS</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-amber-300/90 font-bold">
                    Win Up to ₹50,000
                  </span>
                </div>

                {/* Framed Photo Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-amber-500/25 mb-3 bg-[#040804] group-hover/img:scale-[1.02] transition-transform">
                  <img
                    src={`${import.meta.env.BASE_URL}overview/trophy.jpg`}
                    alt="Trophies and Cash Awards"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d06] via-[#070d06]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-mono font-black text-[9px] uppercase tracking-wider shadow">
                      Podium Vault
                    </span>
                  </div>
                </div>

                {/* Title & Micro Summary */}
                <h3 className="font-heading font-black text-white text-sm tracking-wide mb-1 group-hover:text-amber-200 transition-colors">
                  Win Up to ₹50k &amp; Arcade Loot
                </h3>
                <p className="font-mono text-[10.5px] text-slate-400 leading-snug mb-3">
                  Buildathon cash prizes, gold trophies, arcade tournament bounties &amp; contributor gear.
                </p>
              </div>

              {/* Tactical Chips */}
              <div className="relative z-10 flex flex-col gap-1.5 font-mono text-[10px]">
                <div className="p-2 rounded bg-black/60 border border-amber-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-amber-300">🏆 Buildathon Podium</span>
                  <span>Win Up to ₹50,000</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-amber-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-[#8ee631]">🎮 Arcade Tournaments</span>
                  <span>PS5 &amp; Cash Bounties</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-amber-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-slate-200">🎖️ Champion Trophies</span>
                  <span>Gold Trophies &amp; Swag</span>
                </div>
              </div>
            </div>

            {/* Card 2: 🎮 AFTER-HOURS ARCADE */}
            <div
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="group relative rounded-xl bg-gradient-to-br from-[#13071f]/95 via-[#0a0312]/95 to-[#030107]/95 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/80 p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.2)] cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent pointer-events-none" />
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400/80 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400/80 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Gamepad2 className="w-3 h-3 text-purple-400" />
                    <span>02 // ARCADE</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-purple-300/90 font-bold">
                    PS5™ 4K 120Hz
                  </span>
                </div>

                {/* Framed Photo Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-purple-500/25 mb-3 bg-[#08020d] group-hover/img:scale-[1.02] transition-transform">
                  <img
                    src={`${import.meta.env.BASE_URL}overview/gaming-ps5.jpg`}
                    alt="PS5 Gaming Lounge Arena"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0312] via-[#0a0312]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-purple-500 text-white font-mono font-black text-[9px] uppercase tracking-wider shadow">
                      Tekken &amp; GTA 6
                    </span>
                  </div>
                </div>

                {/* Title & Micro Summary */}
                <h3 className="font-heading font-black text-white text-sm tracking-wide mb-1 group-hover:text-purple-200 transition-colors">
                  Tekken, Mortal &amp; GTA 6
                </h3>
                <p className="font-mono text-[10.5px] text-slate-400 leading-snug mb-3">
                  Midnight fighting tournaments, 1v1 showdowns, and open world PS5 driving.
                </p>
              </div>

              {/* Tactical Chips */}
              <div className="relative z-10 flex flex-col gap-1.5 font-mono text-[10px]">
                <div className="p-2 rounded bg-black/60 border border-purple-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-purple-300">🥊 Tekken 8</span>
                  <span>Midnight Knockout Cup</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-purple-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-pink-300">🥋 Mortal Kombat</span>
                  <span>1v1 Fatalities Arena</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-purple-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-violet-300">🚗 GTA 6 Lounge</span>
                  <span>PlayStation 5 Showcase</span>
                </div>
              </div>
            </div>

            {/* Card 3: 🍛 100% FREE VIP FUEL */}
            <div
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="group relative rounded-xl bg-gradient-to-br from-[#101408]/95 via-[#080d05]/95 to-[#020502]/95 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400/80 p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent pointer-events-none" />
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Utensils className="w-3 h-3 text-emerald-400" />
                    <span>03 // FUEL</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-300/90 font-bold">
                    100% Free VIP
                  </span>
                </div>

                {/* Framed Photo Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-emerald-500/25 mb-3 bg-[#040804] group-hover/img:scale-[1.02] transition-transform">
                  <img
                    src={`${import.meta.env.BASE_URL}overview/biryani.jpg`}
                    alt="Steaming Hot Dum Biryani"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d05] via-[#080d05]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-mono font-black text-[9px] uppercase tracking-wider shadow">
                      1:00 AM Drop
                    </span>
                  </div>
                </div>

                {/* Title & Micro Summary */}
                <h3 className="font-heading font-black text-white text-sm tracking-wide mb-1 group-hover:text-emerald-200 transition-colors">
                  Midnight Biryani &amp; Drinks
                </h3>
                <p className="font-mono text-[10.5px] text-slate-400 leading-snug mb-3">
                  Steaming hot biryani feast, chilled Red Bull on ice, 24/7 chai, and 4 meals.
                </p>
              </div>

              {/* Tactical Chips */}
              <div className="relative z-10 flex flex-col gap-1.5 font-mono text-[10px]">
                <div className="p-2 rounded bg-black/60 border border-emerald-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-emerald-300">🍛 Hot Biryani</span>
                  <span>Midnight Dum Feast</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-emerald-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-amber-300">⚡ Chilled Fuel</span>
                  <span>Red Bull Cans on Ice</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-emerald-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-[#8ee631]">☕ 24/7 Chai</span>
                  <span>4 Catered Full Meals</span>
                </div>
              </div>
            </div>

            {/* Card 4: ⚡ 20H OVERNIGHT SPRINT */}
            <div
              onClick={() => sounds.click()}
              onMouseEnter={() => sounds.hover()}
              className="group relative rounded-xl bg-gradient-to-br from-[#06141c]/95 via-[#030d13]/95 to-[#010609]/95 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/80 p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_40px_rgba(6,182,212,0.2)] cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>04 // SPRINT</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-cyan-300/90 font-bold">
                    Strict 250 Cap
                  </span>
                </div>

                {/* Framed Photo Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-cyan-500/25 mb-3 bg-[#02080c] group-hover/img:scale-[1.02] transition-transform">
                  <img
                    src={`${import.meta.env.BASE_URL}overview/team-hack.jpg`}
                    alt="Overnight Hackathon Sprint"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030d13] via-[#030d13]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-cyan-500 text-black font-mono font-black text-[9px] uppercase tracking-wider shadow">
                      Newton Tech
                    </span>
                  </div>
                </div>

                {/* Title & Micro Summary */}
                <h3 className="font-heading font-black text-white text-sm tracking-wide mb-1 group-hover:text-cyan-200 transition-colors">
                  20 Hour Overnight Hack
                </h3>
                <p className="font-mono text-[10.5px] text-slate-400 leading-snug mb-3">
                  Newton School of Technology campus, 6 tracks, live mentors, and rest pods.
                </p>
              </div>

              {/* Tactical Chips */}
              <div className="relative z-10 flex flex-col gap-1.5 font-mono text-[10px]">
                <div className="p-2 rounded bg-black/60 border border-cyan-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-cyan-300">💻 6 Tracks</span>
                  <span>Kernel, AI, Cloud, Desktop</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-cyan-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-slate-300">🧠 1:1 Mentors</span>
                  <span>openSUSE Maintainers</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-cyan-500/25 flex items-center justify-between text-slate-200 shadow-inner">
                  <span className="font-bold text-[#8ee631]">📶 Gigabit WiFi</span>
                  <span>Dual Genset &amp; Rest Pods</span>
                </div>
              </div>
            </div>

          </div>

          {/* Builder Guarantee Banner (Sleek Proportions with Clean Space Below) */}
          <div className="relative rounded-xl bg-gradient-to-r from-[#040907] via-[#09150e] to-[#040907] border border-white/[0.12] hover:border-[#73ba25]/60 py-3 sm:py-3.5 px-5 sm:px-6 shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#73ba25]/15 border border-[#73ba25]/40 flex items-center justify-center text-[#73ba25] shrink-0 shadow-[0_0_18px_rgba(115,186,37,0.2)]">
                <Sparkles className="w-5 h-5 text-[#8ee631]" />
              </div>
              <div>
                <div className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                  100% Free For All 250 Accepted Builders
                </div>
                <div className="font-mono text-xs text-slate-400 mt-0.5">
                  Zero registration fees. Full access to catered meals, high speed internet, rest pods, and arcade lounge.
                </div>
              </div>
            </div>

            <Link
              to="/register"
              onClick={() => sounds.click()}
              className="shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-[#040807] font-mono font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(115,186,37,0.4)] transition-all flex items-center gap-2 hover:scale-[1.03] cursor-pointer"
            >
              <span>Get Your Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DEDICATED VENUE HUB & LIVE INTERACTIVE SATELLITE MAP                   */}
      {/* ========================================================================= */}
      <VenueHubSection />

      {/* ========================================================================= */}
      {/* 5. HIGH-READABILITY 2-DAY SCHEDULE & TIMELINE                             */}
      {/* ========================================================================= */}
      <ScheduleReadableSection />

      {/* ========================================================================= */}
      {/* 5. SYNERGY-STYLE FEATURED SPONSORS & HOSTS SHOWCASE                      */}
      {/* ========================================================================= */}
      <SponsorsSynergyShowcase />

      {/* ========================================================================= */}
      {/* FLOATING CYBER SECTION NAVIGATION DOCK (DESKTOP ONLY)                     */}
      {/* ========================================================================= */}
      <aside
        aria-label="Section Navigation"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
      >
        {[
          { id: 'hero', label: 'HERO' },
          { id: 'all-events', label: 'EVENTS' },
          { id: 'highlights', label: 'PERKS' },
          { id: 'venue', label: 'VENUE' },
          { id: 'schedule', label: 'SCHEDULE' },
          { id: 'sponsors', label: 'SPONSORS' },
        ].map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                sounds.click();
                const el = document.getElementById(sec.id);
                if (el) {
                  const navbarHeight = 64;
                  const rect = el.getBoundingClientRect();
                  const targetY = rect.top + window.scrollY - navbarHeight;
                  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
                }
              }}
              title={sec.label}
              className="group relative flex items-center justify-center w-6 h-6 rounded-full transition-all cursor-pointer"
            >
              <span className="absolute right-8 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[#73ba25] font-mono text-[9px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {sec.label}
              </span>
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-[#73ba25] shadow-[0_0_12px_#73ba25]'
                    : 'w-2 h-2 bg-white/25 group-hover:bg-white/60 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* ========================================================================= */}
      {/* EVENT DETAILS POPUP MODAL (TRIGGERED FROM 3D STREAM / CARDS)              */}
      {/* ========================================================================= */}
      {selectedModalEvent && (
        <EventDetailsModal
          event={selectedModalEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
