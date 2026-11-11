import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../lib/sound';

export default function Preloader({ onComplete }) {
  // Clear any legacy persistent flags so refresh always shows the boot loader
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('geeko_booted');
      sessionStorage.removeItem('geeko_booted');
    } catch {
      // ignore storage access errors
    }
  }

  const [isDone, setIsDone] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('noboot=true')) {
        return true;
      }
    }
    return false;
  });

  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const startTime = useRef(performance.now());
  const lastLoggedCheckpoint = useRef(0);

  const bootSteps = [
    { tag: 'BOOT', desc: 'openSUSE Tumbleweed Kernel 6.12 x86_64 initialized' },
    { tag: 'OK', desc: 'Mounted Geeko Virtual Filesystem /dev/geeko-storage' },
    { tag: 'OK', desc: 'Initialized 20 Hour Buildathon Scheduler & Timers' },
    { tag: 'OK', desc: 'Synced Newton School of Technology campus network' },
    { tag: 'OK', desc: 'Calibrated 6 Buildathon Tracks & 83 Live Demo Lanes' },
    { tag: 'OK', desc: 'Loaded Web Audio Engine & 3D Matrix Stream' },
    { tag: 'READY', desc: 'All systems nominal. Welcome to openSUSE Connect 2027.' },
  ];

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (isDone) return;

    // Press any key to skip / enter immediately
    const handleKeyDown = () => {
      handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);

    let animFrame;
    const duration = 1450; // ms

    const updateProgress = () => {
      const elapsed = performance.now() - startTime.current;
      const linearRatio = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out for liquid-smooth progression
      const easedRatio = 1 - Math.pow(1 - linearRatio, 2.6);
      const target = Math.min(100, Math.floor(easedRatio * 100));
      setProgress(target);

      const nextLog = Math.min(bootSteps.length - 1, Math.floor((target / 100) * bootSteps.length));
      setLogIndex(nextLog);

      // Subtle audio feedback at 25%, 50%, 75%
      const checkpoint = Math.floor(target / 25);
      if (checkpoint > lastLoggedCheckpoint.current && checkpoint < 4) {
        lastLoggedCheckpoint.current = checkpoint;
        sounds.hover?.();
      }

      if (linearRatio < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        sounds.success();
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 320);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    // Fallback timer if rAF is throttled in background tab
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animFrame);
      clearTimeout(fallbackTimer);
    };
  }, [isDone, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <motion.div
          key="geeko-boot-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.025,
            filter: 'blur(8px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-[#020503] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
          title="Click or press any key to enter"
        >
          {/* Subtle Atmospheric Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
              backgroundSize: '100% 3px',
            }}
          />

          <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
            {/* Precision Geeko Emblem */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 mb-4 relative"
            >
              <img
                src={`${import.meta.env.BASE_URL}opensuse-logo.png`}
                alt="openSUSE Geeko"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] drop-shadow-[0_0_12px_rgba(115,186,37,0.35)]"
              />
            </motion.div>

            {/* Typography */}
            <div className="font-pixel text-xs sm:text-sm text-white uppercase tracking-widest mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              openSUSE INDIA <span className="text-[#73ba25]">·</span> BENGALURU CONNECT 2027
            </div>
            <div className="font-mono text-[11px] text-slate-400 mb-6 tracking-wide">
              Newton School of Technology <span className="text-slate-600">·</span> Two Days of Open Source
            </div>

            {/* Metrics HUD Header */}
            <div className="flex items-center justify-between w-full font-mono text-xs mb-2">
              <span className="font-pixel text-[10px] tracking-wider text-[#73ba25] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-ping" />
                {progress === 100 ? 'SYSTEM READY' : 'BOOT SEQUENCE IN PROGRESS'}
              </span>
              <span className="font-mono text-xs font-bold tracking-tight">
                <span className="text-slate-500">[ </span>
                <span className="text-[#a3e635] drop-shadow-[0_0_6px_rgba(115,186,37,0.4)]">{progress}%</span>
                <span className="text-slate-500"> ]</span>
              </span>
            </div>

            {/* Precision OpenSUSE Progress Bar */}
            <div className="w-full bg-[#040e08] border border-[#173f35] p-[2px] mb-4 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.8),inset_0_1px_4px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="h-3 bg-[#07190e] rounded-xs relative overflow-hidden">
                {/* Micro telemetry notches */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #73ba25 1px, transparent 1px)',
                    backgroundSize: '14px 100%',
                  }}
                />

                {/* Saturated openSUSE green progress stream (zero cyan, zero muddy brown) */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#133816] via-[#4d8f16] to-[#73ba25] relative overflow-hidden rounded-xs"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.15 }}
                >
                  {/* Leading edge laser specular gleam */}
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white shadow-[0_0_6px_#ffffff,0_0_10px_#73ba25]" />
                  {/* Subtle top glass hairline */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white/35" />
                </motion.div>
              </div>
            </div>

            {/* Linux Systemd Boot Terminal Stream */}
            <div className="w-full bg-[#030906]/95 border border-[#173f35] px-3.5 py-2.5 text-left font-mono text-[11px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden min-h-[46px] flex items-center">
              <div className="flex items-center gap-2.5 w-full">
                <span className="px-1.5 py-0.5 rounded-xs bg-[#0b2416] border border-[#73ba25]/50 text-[#a3e635] font-mono text-[9.5px] font-bold tracking-tight shrink-0 shadow-sm">
                  [ {bootSteps[logIndex]?.tag || 'OK'} ]
                </span>
                <span className="text-slate-200 truncate font-mono text-[11px]">
                  {bootSteps[logIndex]?.desc || 'Initializing kernel subsystems...'}
                </span>
              </div>
            </div>

            <div className="mt-5 font-mono text-[10px] text-slate-500 tracking-wider hover:text-slate-300 transition-colors">
              [ PRESS ANY KEY OR CLICK TO ENTER ]
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
