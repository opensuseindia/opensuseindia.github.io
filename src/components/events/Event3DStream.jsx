import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function Event3DStream({ events, onSelectEvent }) {
  const [isPaused, setIsPaused] = useState(false);

  // Divide events into 3 staggered streams for the multi-column perspective stream
  const col1 = events.filter((_, i) => i % 3 === 0);
  const col2 = events.filter((_, i) => i % 3 === 1);
  const col3 = events.filter((_, i) => i % 3 === 2);

  // Duplicate for seamless infinite loop effect
  const stream1 = [...col1, ...col1];
  const stream2 = [...col2, ...col2];
  const stream3 = [...col3, ...col3];

  return (
    <div
      className="relative w-full h-[680px] overflow-hidden rounded-3xl border border-geeko-500/30 bg-[#040907] perspective-[1200px] select-none shadow-[0_0_50px_rgba(115,186,37,0.15)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top & Bottom Gradient Shadows for Cinematic Depth */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyber-black via-cyber-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-black via-cyber-black/80 to-transparent z-20 pointer-events-none" />

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-geeko-500/5 via-transparent to-transparent pointer-events-none" />

      {/* 3D Tilted Grid Stage */}
      <div
        className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-6 px-6 sm:px-10"
        style={{
          transform: 'rotateX(8deg) rotateY(-2deg) scale(0.96)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Stream Column 1: Drifting Upwards */}
        <div className="relative overflow-hidden h-full flex flex-col">
          <motion.div
            className="flex flex-col gap-6"
            animate={isPaused ? {} : { y: ['0%', '-50%'] }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {stream1.map((item, idx) => (
              <EventPosterCard
                key={`${item.id}-${idx}`}
                event={item}
                onSelect={() => onSelectEvent(item)}
              />
            ))}
          </motion.div>
        </div>

        {/* Stream Column 2: Drifting Downwards (Opposite Direction) */}
        <div className="relative overflow-hidden h-full hidden sm:flex flex-col">
          <motion.div
            className="flex flex-col gap-6"
            animate={isPaused ? {} : { y: ['-50%', '0%'] }}
            transition={{
              duration: 44,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {stream2.map((item, idx) => (
              <EventPosterCard
                key={`${item.id}-${idx}`}
                event={item}
                onSelect={() => onSelectEvent(item)}
              />
            ))}
          </motion.div>
        </div>

        {/* Stream Column 3: Drifting Upwards (Offset Speed) */}
        <div className="relative overflow-hidden h-full hidden lg:flex flex-col">
          <motion.div
            className="flex flex-col gap-6"
            animate={isPaused ? {} : { y: ['0%', '-50%'] }}
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {stream3.map((item, idx) => (
              <EventPosterCard
                key={`${item.id}-${idx}`}
                event={item}
                onSelect={() => onSelectEvent(item)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive Hint Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="px-4 py-1.5 rounded-full glass-panel-glow border border-geeko-500/40 text-geeko-300 font-mono text-[11px] shadow-xl flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-geeko-400" />
          <span>Hover to Pause Stream · Click any Poster for Full Details</span>
        </div>
      </div>
    </div>
  );
}

function EventPosterCard({ event, onSelect }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onClick={() => {
        sounds.click();
        onSelect();
      }}
      onMouseEnter={() => sounds.hover()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04, zIndex: 40 }}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="cursor-pointer group relative w-full h-[360px] rounded-2xl overflow-hidden border border-cyber-border/80 hover:border-geeko-400 bg-cyber-card shadow-2xl transition-all duration-200 shrink-0"
    >
      {/* Background Poster Image */}
      <img
        src={event.poster}
        alt={event.name}
        className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-75 group-hover:brightness-95 group-hover:scale-105 transition-all duration-500"
      />

      {/* Holographic Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-75 mix-blend-multiply`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95" />

      {/* Retro Scanline Ripple on Poster */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />

      {/* Glowing Border Sheen */}
      <div className="absolute inset-0 rounded-2xl border border-geeko-500/0 group-hover:border-geeko-400/80 group-hover:shadow-[inset_0_0_20px_rgba(115,186,37,0.3)] transition-all pointer-events-none" />

      {/* Card Header Badges */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-geeko-500/40 text-geeko-300 font-mono text-[10px] font-bold uppercase tracking-wider">
          {event.category}
        </span>
        {event.prizeAmountINR > 0 && (
          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>₹{event.prizeAmountINR.toLocaleString('en-IN')}</span>
          </span>
        )}
      </div>

      {/* Card Bottom Information */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-2">
        <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[10px]">
          <Clock className="w-3 h-3 text-geeko-400" />
          <span>{event.dayDisplay}</span>
        </div>

        <h3 className="font-heading font-extrabold text-white text-lg leading-tight group-hover:text-geeko-300 transition-colors">
          {event.name}
        </h3>

        <p className="text-slate-300 text-xs font-sans line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-geeko-400 font-semibold group-hover:translate-x-1 transition-transform">
          <span>View Rules & Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}
