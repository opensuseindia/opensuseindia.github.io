import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv,
  Menu,
  X,
  Sparkles,
  Gamepad2,
  Calendar,
  Layers,
  HelpCircle,
  ChevronDown,
  Terminal,
  Bug,
  Info,
  MapPin,
  Trophy,
  DollarSign,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react';
import { sounds } from '../../lib/sound';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ toggleCrt, isCrtActive }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownTimerRef = useRef(null);

  const handleAllEventsClick = (e) => {
    if (e) e.preventDefault();
    sounds.click();
    closeMenus();

    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('open-all-events'));
      const stage = document.getElementById('events-stage') || document.getElementById('all-events');
      if (stage) {
        const navbarHeight = 60;
        const rect = stage.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - navbarHeight;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
      window.history.pushState(null, '', '#all-events');
    } else {
      navigate('/#all-events', { state: { scrollToEvents: true } });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (name) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setIsMobileOpen(false);
  };

  const openTerminal = () => {
    sounds.click();
    window.dispatchEvent(new CustomEvent('open-terminal-palette'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#040806] border-b border-[#173f35]/80 select-none transition-all shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
      {/* Expanded Container with Relative Positioning for Center Nav */}
      <div className="w-full px-3 sm:px-5 lg:px-6 h-16 relative flex items-center justify-between">
        {/* ========================================================= */}
        {/* 1. BRAND LOGO & TITLE (Enhanced Aesthetic Lockup)         */}
        {/* ========================================================= */}
        <div className="flex items-center shrink-0 z-10">
          <Link
            to="/"
            onClick={() => {
              sounds.click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenus();
            }}
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group pl-0.5 cursor-pointer"
          >
            {/* Chameleon Logo (Proportionally balanced with text cap-height) */}
            <img
              src={`${import.meta.env.BASE_URL}opensuse-logo.png`}
              alt="openSUSE Geeko"
              className="w-6 h-6 sm:w-[26px] sm:h-[26px] object-contain rounded-full shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />

            {/* openSUSE (White -> Green #73ba25) & INDIA (Green #73ba25 -> White) */}
            <div className="flex items-center gap-1.5 sm:gap-2 select-none">
              <span className="font-heading font-extrabold text-white text-[18px] sm:text-[19px] tracking-tight group-hover:text-[#73ba25] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                openSUSE
              </span>
              <span className="font-heading font-extrabold text-[#73ba25] text-[18px] sm:text-[19px] tracking-tight group-hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                INDIA
              </span>
            </div>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* 2. CENTER CLEAN NAVIGATION (Dead-Centered on Screen)      */}
        {/* ========================================================= */}
        <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 font-mono text-xs absolute left-1/2 -translate-x-1/2 z-0">
          {/* ▶ ALL EVENTS [22] ↗ (Compact Sleek Cyber Chamfered Hex Cartridge) */}
          <button
            onClick={handleAllEventsClick}
            onMouseEnter={() => sounds.hover?.()}
            className="group relative p-[1px] font-pixel text-[6.5px] xl:text-[7px] uppercase tracking-wider text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shrink-0 select-none bg-gradient-to-b from-[#73ba25] via-[#529419] to-[#275910] hover:from-[#8ee631] hover:via-[#73ba25] hover:to-[#387a15] shadow-[0_2px_0_#1b4d24,0_0_10px_rgba(115,186,37,0.2)] hover:shadow-[0_3px_0_#1b4d24,0_0_16px_rgba(115,186,37,0.35)] hover:-translate-y-0.5 active:translate-y-0.5"
            style={{
              clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
            }}
          >
            <div
              className="px-2 xl:px-2.5 py-1 flex items-center gap-1.5 bg-gradient-to-b from-[#0e2916] via-[#081a0e] to-[#040c06] group-hover:from-[#153e22] group-hover:via-[#0c2816] group-hover:to-[#07190e] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
              style={{
                clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
              }}
            >
              {/* Soft ambient glass light blooming from top */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-[radial-gradient(ellipse_at_top,rgba(115,186,37,0.22)_0%,transparent_70%)] pointer-events-none" />

              {/* Blinking phosphor play icon */}
              <span className="text-[5.5px] text-[#73ba25] group-hover:text-[#8ee631] group-hover:translate-x-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10">
                ▶
              </span>
              
              {/* Label */}
              <span className="text-white font-pixel text-[6.5px] xl:text-[7px] select-none relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                ALL EVENTS
              </span>
              
              {/* Tactile micro counter badge */}
              <span className="h-3.5 px-1 inline-flex items-center justify-center rounded-[2px] bg-black/85 border border-[#73ba25]/60 group-hover:border-[#8ee631] text-[#a3e635] font-mono text-[6.5px] font-bold leading-none tracking-tight transition-colors duration-300 relative z-10">
                22
              </span>
              
              {/* Dynamic Arrow */}
              <span className="text-[7.5px] font-sans font-bold text-[#73ba25] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10">
                ↗
              </span>
            </div>
          </button>

          {/* 6 Tracks Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('tracks')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/tracks"
              onClick={() => sounds.click()}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                location.pathname === '/tracks'
                  ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>6 Tracks</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </Link>

            <AnimatePresence>
              {activeDropdown === 'tracks' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1.5 w-64 bg-[#060e0a] border border-[#1b4334] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.98),0_0_25px_rgba(0,0,0,0.9)] p-2 font-mono text-xs z-50"
                >
                  <div className="font-pixel text-[8px] text-geeko-400 px-2 py-1 uppercase tracking-wider border-b border-[#173f35] mb-1 flex items-center justify-between">
                    <span>Buildathon Tracks</span>
                    <span className="text-[#00f0ff]">20 Hour</span>
                  </div>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-geeko-300">01: Terminal Titans</div>
                    <div className="text-[10px] text-slate-400">Linux CLI & Productivity</div>
                  </Link>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-amber-300">02: Root Access</div>
                    <div className="text-[10px] text-slate-400">Security, AppArmor & Privacy</div>
                  </Link>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-blue-300">03: GeekoOps</div>
                    <div className="text-[10px] text-slate-400">Automation, DevOps & OBS</div>
                  </Link>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-purple-300">04: Desktop Reboot</div>
                    <div className="text-[10px] text-slate-400">Linux Desktop, Wayland & UX</div>
                  </Link>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-cyan-300">05: Upstream Heroes</div>
                    <div className="text-[10px] text-slate-400">Direct Open-Source PRs</div>
                  </Link>
                  <Link
                    to="/tracks"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white transition-colors"
                  >
                    <div className="font-semibold text-emerald-300">06: Next Linux Need</div>
                    <div className="text-[10px] text-slate-400">Community Innovation & Impact</div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timeline */}
          <Link
            to="/schedule"
            onClick={() => sounds.click()}
            className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/schedule'
                ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Timeline
          </Link>

          {/* Arcade Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('activities')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/arcade"
              onClick={() => sounds.click()}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                location.pathname === '/arcade'
                  ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Arcade</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </Link>

            <AnimatePresence>
              {activeDropdown === 'activities' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1.5 w-60 bg-[#060e0a] border border-[#1b4334] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.98),0_0_25px_rgba(0,0,0,0.9)] p-2 font-mono text-xs z-50"
                >
                  <div className="font-pixel text-[8px] text-geeko-400 px-2 py-1 uppercase tracking-wider border-b border-[#173f35] mb-1">
                    Side Events & Minigames
                  </div>
                  <Link
                    to="/arcade"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white"
                  >
                    <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <Gamepad2 className="w-3.5 h-3.5" />
                      <span>Geeko Arcade (4 Games)</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Terminal Escape, Trivia, Matcher</div>
                  </Link>
                  <Link
                    to="/quest"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white"
                  >
                    <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Geeko Quest Passport</span>
                    </div>
                    <div className="text-[10px] text-slate-400">QR Missions & Wall of Fame</div>
                  </Link>
                  <Link
                    to="/bug-hunt"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white"
                  >
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5" />
                      <span>Midnight Bug Hunt</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Day 2 01:00 Debugging Sprint</div>
                  </Link>
                  <a
                    href="/#slot-machine"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-white"
                  >
                    <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Slot Machine Arcade</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Interactive Track Randomizer</div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prizes & Swag */}
          <Link
            to="/prizes"
            onClick={() => sounds.click()}
            className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/prizes'
                ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Prizes
          </Link>

          {/* Venue (NST) */}
          <Link
            to="/venue"
            onClick={() => sounds.click()}
            className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors hidden xl:block ${
              location.pathname === '/venue'
                ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Venue (NST)
          </Link>

          {/* FAQ */}
          <Link
            to="/faq"
            onClick={() => sounds.click()}
            className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors hidden xl:block ${
              location.pathname === '/faq'
                ? 'text-geeko-400 font-bold bg-white/5 border border-geeko-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            FAQ
          </Link>

          {/* More menu on medium screens */}
          <div
            className="relative xl:hidden"
            onMouseEnter={() => handleMouseEnter('more')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1">
              <span>More</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            <AnimatePresence>
              {activeDropdown === 'more' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full left-0 mt-1.5 w-48 bg-[#060e0a] border border-[#1b4334] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.98),0_0_25px_rgba(0,0,0,0.9)] p-2 font-mono text-xs z-50"
                >
                  <Link
                    to="/venue"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-slate-200"
                  >
                    Venue (NST)
                  </Link>
                  <Link
                    to="/sponsors"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-slate-200"
                  >
                    Sponsors & Partners
                  </Link>
                  <Link
                    to="/faq"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-slate-200"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMenus}
                    className="block px-2 py-1.5 rounded hover:bg-white/5 text-slate-200"
                  >
                    Team & Credits
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ========================================================= */}
        {/* 3. RIGHT TOOLS: CRT, SIGN IN / USER, REGISTER             */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 z-10">
          {/* Retro CRT Toggle */}
          <button
            onClick={() => {
              sounds.click();
              toggleCrt();
            }}
            title={isCrtActive ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`w-8 h-8 rounded-lg border transition-colors flex items-center justify-center ${
              isCrtActive
                ? 'bg-geeko-500/20 border-geeko-500 text-geeko-400 shadow-[0_0_10px_rgba(115,186,37,0.3)]'
                : 'bg-[#081510] hover:bg-[#0e241b] border-cyber-border text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* User Name Pill / Sign In */}
          {isAuthenticated ? (
            <Link
              to={user?.role === 'admin' || user?.role === 'judge' ? '/admin' : '/dashboard'}
              onClick={() => sounds.click()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-geeko-300 hover:text-white hover:bg-geeko-500/15 border border-geeko-500/40 hover:border-geeko-400 transition-all font-semibold shadow-[0_0_10px_rgba(115,186,37,0.15)]"
              title={`Signed in as ${user?.name} · Click to open Portal`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{user?.name?.split(' ')[0] || 'Portal'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => sounds.click()}
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-slate-800 transition-all font-medium"
            >
              Sign In
            </Link>
          )}

          {/* REGISTER 250 CAP (Refined Cyber Pixel Button) */}
          <Link
            to="/register"
            onClick={() => sounds.click()}
            className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#73ba25] hover:bg-[#85d82c] border border-[#a3e635] text-[#040807] font-pixel text-[9px] sm:text-[9.5px] font-bold tracking-wider shadow-[0_2px_0_#2b5714,0_0_15px_rgba(115,186,37,0.35)] hover:shadow-[0_3px_0_#2b5714,0_0_22px_rgba(115,186,37,0.55)] active:translate-y-0.5 active:shadow-[0_1px_0_#2b5714] transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>REGISTER</span>
            <span className="px-1.5 py-0.5 rounded bg-[#040807]/20 text-[#040807] font-mono text-[9px] font-bold">
              250 CAP
            </span>
          </Link>

          {/* Mobile Drawer Menu Toggle */}
          <button
            onClick={() => {
              sounds.click();
              setIsMobileOpen(!isMobileOpen);
            }}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-8 h-8 rounded-lg bg-[#081510] hover:bg-[#0e241b] border border-cyber-border text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. COMPREHENSIVE ORGANIZED MOBILE DRAWER                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060e0a] border-b border-[#1b4334] p-4 font-mono text-xs shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
          >
            {/* Quick Status Bar */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-[#173f35] text-[10px]">
              <span className="text-slate-400">APPLICATIONS ACTIVE</span>
              <span className="text-geeko-400 font-bold">172 / 250 CLAIMED</span>
            </div>

            {/* Core Links */}
            <div>
              <div className="font-pixel text-[8px] text-geeko-400 uppercase tracking-wider mb-2">
                Event Navigation
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAllEventsClick}
                  className="col-span-2 p-2.5 rounded-lg bg-gradient-to-r from-geeko-500/25 via-[#081f14] to-black/80 border border-geeko-500/80 text-white font-semibold flex items-center justify-between shadow-[0_0_16px_rgba(115,186,37,0.3)] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-geeko-400 font-pixel text-[8.5px] animate-pulse">▶</span>
                    <span className="font-pixel text-[9px] uppercase tracking-wider text-white">ALL EVENTS</span>
                    <span className="px-1.5 py-0.5 rounded-sm bg-black/70 border border-geeko-500/60 text-[#a3e635] font-mono text-[8px] font-bold">22</span>
                  </div>
                  <span className="text-xs text-geeko-400 font-sans font-bold">↗</span>
                </button>

                <Link
                  to="/tracks"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-geeko-400 text-white font-semibold flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>6 Tracks</span>
                </Link>

                <Link
                  to="/schedule"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-geeko-400 text-white font-semibold flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Timeline</span>
                </Link>

                <Link
                  to="/arcade"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-geeko-400 text-white font-semibold flex items-center gap-2"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Arcade (4 Games)</span>
                </Link>

                <Link
                  to="/prizes"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-geeko-400 text-white font-semibold flex items-center gap-2"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>₹50k Prizes</span>
                </Link>
              </div>
            </div>

            {/* Logistics */}
            <div>
              <div className="font-pixel text-[8px] text-slate-400 uppercase tracking-wider mb-2">
                Venue & Logistics
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/venue"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-black/40 border border-[#173f35] text-slate-300 flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Venue (NST)</span>
                </Link>

                <Link
                  to="/sponsors"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-black/40 border border-[#173f35] text-slate-300 flex items-center gap-2"
                >
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sponsors & Tiers</span>
                </Link>

                <Link
                  to="/faq"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-black/40 border border-[#173f35] text-slate-300 flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-geeko-400" />
                  <span>FAQ</span>
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenus}
                  className="p-2.5 rounded-lg bg-black/40 border border-[#173f35] text-slate-300 flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5 text-purple-400" />
                  <span>Team Credits</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-[#173f35] flex items-center justify-between">
              <button
                onClick={() => {
                  closeMenus();
                  openTerminal();
                }}
                className="flex items-center gap-1.5 text-geeko-400 hover:text-white"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch CLI (⌘K)</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="text-geeko-300 hover:text-white flex items-center gap-1.5"
                  >
                    <span>👤 {user?.name?.split(' ')[0]} (Portal)</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenus();
                    }}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="text-slate-300 hover:text-white"
                >
                  Sign In / Portal →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
