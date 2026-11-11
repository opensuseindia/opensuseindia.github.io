import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Sparkles } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function RetroGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: 'Newton School of Tech',
      subtitle: 'Venue & Facilities',
      desc: 'Bengaluru modern campus with load-tested power circuits, Wi-Fi for 350+ devices, and multi-lane expo hall.',
      tag: 'VENUE',
      color: 'from-emerald-900/60 to-geeko-950/80',
      badge: 'BLR CAMPUS',
    },
    {
      id: 2,
      title: 'First Commit Ceremony',
      subtitle: 'Day 1 · 14:30 IST',
      desc: 'The official 20 hour hackathon countdown ends and 83 teams push their initial branch commit simultaneously.',
      tag: 'CEREMONY',
      color: 'from-blue-900/60 to-slate-950/80',
      badge: 'BUILD START',
    },
    {
      id: 3,
      title: '20h Geeko Buildathon',
      subtitle: 'Overnight Collaboration',
      desc: '250 builders tackling Linux CLI, kernel security, desktop UX, DevOps, and upstream contributions.',
      tag: 'HACKATHON',
      color: 'from-geeko-900/60 to-emerald-950/80',
      badge: '20 HOURS',
    },
    {
      id: 4,
      title: 'Midnight Bug Hunt',
      subtitle: 'Day 2 · 01:00 IST',
      desc: 'Optional 30 minute rapid debugging sprint: Rookie shell script fix and Expert AppArmor/systemd sandbox triage.',
      tag: 'SIDE QUEST',
      color: 'from-amber-900/60 to-slate-950/80',
      badge: '₹2,000 REWARD',
    },
    {
      id: 5,
      title: 'Starter & CI/CD Labs',
      subtitle: 'Day 1 · 11:50 IST',
      desc: 'Hands on parallel technical labs: Linux & openSUSE basics in Starter Lab, and tests, builds & deployment in CI/CD.',
      tag: 'WORKSHOPS',
      color: 'from-cyan-900/60 to-slate-950/80',
      badge: 'PARALLEL LABS',
    },
    {
      id: 6,
      title: 'Demo Arena & Pitches',
      subtitle: 'Day 2 · 11:00 IST',
      desc: 'Every team presents in 6 parallel judging lanes; top 6 finalists pitch on main stage with 7m demo + 3m Q&A.',
      tag: 'FINALS',
      color: 'from-purple-900/60 to-slate-950/80',
      badge: 'STAGE PITCH',
    },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full min-h-[calc(100svh-4rem)] lg:h-[calc(100vh-4rem)] snap-start snap-always overflow-y-auto lg:overflow-hidden border-b-4 border-[#173f35] bg-[#050e0b] px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between select-none"
    >
      <div className="max-w-7xl mx-auto w-full pt-1">
        {/* Compact Section Header */}
        <div className="text-center max-w-xl mx-auto mb-4">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#081510] border border-geeko-500/40 text-geeko-400 font-pixel text-[8px] mb-1">
            <Camera className="w-3 h-3" />
            <span>CAMPUS & COMMUNITY SNAPSHOTS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white uppercase tracking-wider">
            Event Gallery
          </h2>
          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
            Newton School of Technology campus, 20h Buildathon hall, and milestones.
          </p>
        </div>

        {/* Polaroid Filmstrip Grid (Crisp Sizing) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto w-full my-auto">
          {photos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                sounds.click();
                setSelectedPhoto(item);
              }}
              className="group cursor-pointer bg-[#0a1813] border-2 border-black p-2 shadow-[inset_-2px_-2px_0_0_#173f35] hover:shadow-[0_0_20px_rgba(115,186,37,0.3)] transition-all duration-150 hover:-translate-y-1"
            >
              {/* Adhesive tape at top */}
              <div className="w-10 h-2.5 bg-white/20 border border-white/30 mx-auto -mt-3 mb-1.5 rotate-[-2deg]" />

              {/* Photo Area */}
              <div
                className={`relative w-full h-32 sm:h-36 bg-gradient-to-br ${item.color} border border-[#173f35] overflow-hidden flex flex-col justify-between p-2 group-hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between text-[7px] font-pixel">
                  <span className="px-1 py-0.5 bg-black/80 text-geeko-300">
                    {item.badge}
                  </span>
                  <span className="text-[#00f0ff]">0{idx + 1}</span>
                </div>

                <div className="my-auto text-center">
                  <Sparkles className="w-5 h-5 text-geeko-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <div className="font-pixel text-[9px] text-white uppercase line-clamp-1">
                    {item.title}
                  </div>
                </div>

                <div className="font-mono text-[8px] text-slate-400 text-center bg-black/60 py-0.5">
                  CLICK TO ZOOM
                </div>
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="pt-2 pb-0.5 px-0.5 text-center">
                <div className="font-pixel text-[8px] text-geeko-300 truncate">
                  {item.title}
                </div>
                <div className="font-mono text-[8px] text-slate-500">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[8px] font-pixel text-slate-500 pb-2">
        <span>NEWTON SCHOOL OF TECHNOLOGY · BENGALURU</span>
        <span className="text-geeko-400">TWO DAYS OF BUILDING</span>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#081510] border-2 border-geeko-500 p-5 shadow-[0_0_35px_rgba(115,186,37,0.4)]"
            >
              <button
                onClick={() => {
                  sounds.click();
                  setSelectedPhoto(null);
                }}
                className="absolute top-3 right-3 p-1 bg-[#173f35] hover:bg-geeko-500 text-white hover:text-black font-pixel text-[10px]"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="font-pixel text-[8px] text-geeko-400 mb-2">
                {selectedPhoto.tag} · {selectedPhoto.badge}
              </div>

              <h3 className="font-pixel text-base text-white mb-1 uppercase">
                {selectedPhoto.title}
              </h3>
              <div className="font-mono text-xs text-[#00f0ff] mb-3">
                {selectedPhoto.subtitle}
              </div>

              <div className={`w-full h-44 bg-gradient-to-br ${selectedPhoto.color} border border-[#173f35] flex items-center justify-center mb-4 p-4 text-center`}>
                <div>
                  <Sparkles className="w-8 h-8 text-geeko-400 mx-auto mb-2" />
                  <p className="font-mono text-xs text-slate-200 max-w-sm">
                    {selectedPhoto.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between font-pixel text-[9px] text-slate-400">
                <span>NEWTON SCHOOL OF TECHNOLOGY</span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-3 py-1.5 btn-pixel-green text-[9px]"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
