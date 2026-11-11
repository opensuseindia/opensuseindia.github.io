import React, { useState, useMemo, useEffect } from 'react';
import {
  Layers,
  LayoutGrid,
  Search,
  Filter,
  Trophy,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Shield,
  Volume2,
  VolumeX,
  Compass,
  Gamepad2,
  Mic,
  BookOpen,
  Terminal,
} from 'lucide-react';
import { allEvents } from '../data/events';
import SynergyThreeStream from '../components/events/SynergyThreeStream';
import EventDetailsModal from '../components/events/EventDetailsModal';
import { sounds } from '../lib/sound';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('ALL'); // 'ALL' | 'Day 1' | 'Day 2'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isMuted, setIsMuted] = useState(() => sounds.isMuted());

  const categories = [
    { key: 'ALL', label: 'ALL EVENTS (22)' },
    { key: 'Buildathon', label: 'BUILDATHON (6)', icon: Layers },
    { key: 'Talks', label: 'KEYNOTES', icon: Mic },
    { key: 'Workshops', label: 'WORKSHOPS', icon: BookOpen },
    { key: 'Arcade', label: 'GEEKO ARCADE', icon: Gamepad2 },
    { key: 'Judging', label: 'DEMO ARENA', icon: Shield },
  ];

  const handleOpenEvent = (event) => {
    sounds.click();
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleToggleSound = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('arcade-event-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      // Day filter
      const matchesDay =
        selectedDay === 'ALL' || item.days.includes(selectedDay);

      // Category filter
      const matchesCategory =
        selectedCategory === 'ALL' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Buildathon' && item.category === 'Hackathon');

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q) ||
        item.spoc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchesDay && matchesCategory && matchesSearch;
    });
  }, [selectedDay, selectedCategory, searchQuery]);

  return (
    <div className="relative w-full min-h-screen bg-[#040807] overflow-hidden flex flex-col pt-16 sm:pt-20">
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#091610_1px,transparent_1px),linear-gradient(to_bottom,#091610_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Floating Retro HUD / Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 pb-2 space-y-4">
        {/* Top Control Bar: Title, Sound, View Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-geeko-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-geeko-400 animate-ping rounded-full" />
            <div>
              <div className="font-pixel text-[11px] sm:text-xs text-geeko-400 tracking-wider flex items-center gap-2">
                <span>openSUSE INDIA // 2027</span>
                <span className="text-slate-500">::</span>
                <span className="text-[#00f0ff]">EVENTS MATRIX</span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5 hidden sm:block">
                Newton School of Technology · 20h Buildathon · Labs · Arcade
              </p>
            </div>
          </div>

          {/* Right Controls: Audio Toggle & Mode Switch */}
          <div className="flex items-center gap-2 font-pixel text-[10px]">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="px-2.5 py-1.5 bg-[#081510] hover:bg-[#0e241b] border border-geeko-500/40 text-geeko-300 pixel-corners-8 transition-colors flex items-center gap-1.5"
              title="Toggle Web Audio Synthesizer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-geeko-400" />}
              <span>{isMuted ? 'SFX: OFF' : 'SFX: ON'}</span>
            </button>

            {/* View Mode Toggle: 3D Stream vs Grid */}
            <div className="flex items-center bg-[#081510] border border-geeko-500/40 p-0.5 pixel-corners-8">
              <button
                onClick={() => {
                  sounds.click();
                  setViewMode('3d');
                }}
                className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-geeko-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>ALL EVENTS (3D)</span>
              </button>

              <button
                onClick={() => {
                  sounds.click();
                  setViewMode('grid');
                }}
                className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-geeko-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>ARCADE GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Arcade Search & Filter Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box with Pixel Borders */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-geeko-400" />
            <input
              id="arcade-event-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH 22 MISSIONS / PRESS [/] TO FOCUS..."
              className="w-full bg-[#06120c] border border-geeko-500/50 focus:border-geeko-400 focus:outline-none focus:ring-1 focus:ring-geeko-400 text-geeko-200 placeholder:text-geeko-600/70 font-mono text-xs pl-10 pr-20 py-2.5 pixel-corners-8"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-pixel text-[9px] text-slate-400 hover:text-white bg-black/40 px-1.5 py-0.5 rounded"
              >
                CLEAR
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-pixel text-[8px] text-slate-500 pointer-events-none">
                [/]
              </span>
            )}
          </div>

          {/* Day Filters: ALL / DAY 1 / DAY 2 */}
          <div className="flex items-center gap-1 font-pixel text-[9px]">
            {['ALL', 'Day 1', 'Day 2'].map((d) => (
              <button
                key={d}
                onClick={() => {
                  sounds.click();
                  setSelectedDay(d);
                }}
                className={`px-3 py-2 border pixel-corners-8 transition-colors ${
                  selectedDay === d
                    ? 'bg-[#00f0ff] border-[#00f0ff] text-black font-bold'
                    : 'bg-[#081510] border-geeko-500/30 text-slate-300 hover:border-geeko-400'
                }`}
              >
                {d === 'ALL' ? 'ALL DAYS' : d.toUpperCase()}
              </button>
            ))}

            {/* Results Pill */}
            <div className="ml-auto lg:ml-2 px-3 py-2 bg-[#050f0a] border border-geeko-500/40 text-geeko-400 font-pixel text-[9px]">
              MATCHED: [{filteredEvents.length}]
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-pixel text-[9px]">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                sounds.click();
                setSelectedCategory(c.key);
              }}
              className={`whitespace-nowrap px-3 py-1.5 border pixel-corners-8 transition-colors ${
                selectedCategory === c.key
                  ? 'bg-geeko-500 border-geeko-500 text-black font-bold shadow-[0_0_12px_rgba(115,186,37,0.4)]'
                  : 'bg-[#07130d] border-white/10 text-slate-400 hover:text-white hover:border-geeko-500/50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: 3D Stream View vs Arcade Grid View */}
      <div className="relative flex-1 w-full min-h-[640px] flex flex-col">
        {viewMode === '3d' ? (
          <div className="relative flex-1 w-full h-[calc(100vh-210px)] min-h-[600px]">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Terminal className="w-12 h-12 text-geeko-500/50 mb-3" />
                <div className="font-pixel text-xs text-geeko-400">NO MISSIONS FOUND IN SECTOR</div>
                <p className="font-mono text-xs text-slate-400 mt-2">Adjust your search query or filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                    setSelectedDay('ALL');
                  }}
                  className="mt-4 px-4 py-2 bg-geeko-500 text-black font-pixel text-[10px] pixel-corners-8"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <>
                {/* Full-bleed Three.js WebGL Stream (Identical to Synergy /events) */}
                <SynergyThreeStream
                  events={filteredEvents}
                  onSelectEvent={handleOpenEvent}
                />

                {/* Bottom Interactive HUD Instructions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 bg-black/70 border border-geeko-500/40 font-pixel text-[9px] text-geeko-400 tracking-wider pixel-corners-8 shadow-lg hidden sm:flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-pulse" />
                  <span>◄ DRAG OR SCROLL TO DRIFT STREAM · HOVER FOR 3D POP · CLICK TO INSPECT ►</span>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Arcade Grid View */
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 font-mono text-xs text-slate-400">
                <p className="font-pixel text-geeko-400 mb-2">ZERO RESULTS</p>
                No activities match "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => handleOpenEvent(evt)}
                    onMouseEnter={() => sounds.hover()}
                    className="group relative bg-[#06110b] border-2 border-geeko-500/30 hover:border-geeko-400 pixel-corners-12 p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(115,186,37,0.3)] flex flex-col justify-between"
                  >
                    {/* Retro Corner Accents */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-geeko-400" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-geeko-400" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-geeko-400" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-geeko-400" />

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-pixel text-[8px] uppercase px-2 py-0.5 bg-geeko-500/20 text-geeko-300 border border-geeko-500/40">
                          {evt.category}
                        </span>
                        <span className="font-pixel text-[8px] uppercase px-2 py-0.5 bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40">
                          {evt.days ? evt.days.join(' & ') : 'DAY 1'}
                        </span>
                      </div>

                      {/* Poster Art / Thumbnail */}
                      <div className="relative h-36 bg-black overflow-hidden mb-3 border border-white/10 group-hover:border-geeko-500/50 transition-colors">
                        {evt.poster && (
                          <img
                            src={evt.poster}
                            alt={evt.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06110b] via-transparent to-transparent" />
                        
                        {evt.badge && (
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 border border-amber-400/80 text-amber-300 font-pixel text-[8px]">
                            ★ {evt.badge}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-white text-base group-hover:text-geeko-400 transition-colors mb-2 leading-snug">
                        {evt.name}
                      </h3>

                      {/* Description preview */}
                      <p className="font-mono text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {evt.description}
                      </p>
                    </div>

                    <div>
                      {/* Prize / Venue Pill */}
                      {evt.prize && (
                        <div className="mb-3 px-2 py-1 bg-amber-500/10 border border-amber-500/30 font-pixel text-[8px] text-amber-300 flex items-center gap-1.5">
                          <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{evt.prize}</span>
                        </div>
                      )}

                      {/* Venue & SPOC */}
                      <div className="space-y-1 font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2 mb-3">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-geeko-500 shrink-0" />
                          <span className="truncate">{evt.venue}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Clock className="w-3 h-3 text-[#00f0ff] shrink-0" />
                          <span className="truncate">{evt.dayDisplay || 'Day 1 & Day 2'}</span>
                        </div>
                      </div>

                      {/* Inspect Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEvent(evt);
                        }}
                        className="w-full py-2 bg-geeko-500/20 hover:bg-geeko-500 text-geeko-300 hover:text-black font-pixel text-[9px] border border-geeko-500 transition-colors flex items-center justify-center gap-1.5 pixel-corners-8"
                      >
                        <span>INSPECT MISSION</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cyberpunk Arcade Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
