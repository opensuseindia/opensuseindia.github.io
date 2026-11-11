import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function PixelPlankFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'WHAT IS openSUSE BENGALURU CONNECT 2027?',
      a: 'Two days of open source learning, collaboration, and building at Newton School of Technology, Bengaluru. Three talks and two parallel labs lead into a mentored 20 hour Geeko Buildathon.',
    },
    {
      q: 'IS THERE ANY ENTRY OR REGISTRATION FEE?',
      a: 'Zero registration fee. The event is completely free for all accepted builders and attendees. Admission is managed under one unified pool strictly capped at 250 participants.',
    },
    {
      q: 'WHO CAN PARTICIPATE AND CAN WE FORM TEAMS?',
      a: 'College students, working developers, Linux enthusiasts, and existing contributors. Teams of 3 to 4 members are standard (capped at 83 teams in the base case).',
    },
    {
      q: 'WHAT ARE THE OVERNIGHT STAY LOGISTICS?',
      a: 'All 250 registered participants may stay overnight. Proposed overnight eligibility is 18+. Designated quiet rest spaces, 24/7 security guard shifts, first-aid response cover, and rotating night mentors are staffed.',
    },
    {
      q: 'WHAT MEALS AND CATERING ARE PROVIDED?',
      a: 'Day 1 welcome drinks, lunch, evening snacks, dinner, and late snacks. Day 2 breakfast included. IMPORTANT: Day 2 lunch is NOT provided; nearby campus dining options are accessible.',
    },
    {
      q: 'WHAT ARE THE PRIZES AND MERCHANDISE POLICIES?',
      a: 'Teams can win up to ₹50,000 in grand cash awards alongside exciting arcade tournament bounties, official openSUSE trophies, and winner certificates. Exactly 25 printed reward jerseys are budgeted for winners.',
    },
    {
      q: 'DO I NEED TO REINSTALL MY LAPTOP OS?',
      a: 'NO. Never perform a risky OS reinstall. The workshops use pre-configured Virtual Machines (VMs), live boot media, containerized toolchains, and cloud sandboxes.',
    },
    {
      q: 'WHO ARE THE CORE ORGANIZERS?',
      a: 'Divyanshu Prakash (Coordination & Website), Rithull Raj Kallat (Program & Buildathon Rules), and Dushyant Acharya (Venue, Logistics & Safety Readiness).',
    },
  ];

  const toggleFAQ = (idx) => {
    sounds.click();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      className="faq-mc-section relative w-full min-h-[calc(100svh-4rem)] lg:h-[calc(100vh-4rem)] snap-start snap-always overflow-y-auto lg:overflow-hidden border-b-4 border-[#173f35] bg-[#071610] px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between select-none"
    >
      <div className="max-w-3xl mx-auto w-full pt-1">
        {/* Signboard Header with Pixel Moss & Leaves */}
        <div className="relative text-center max-w-md mx-auto mb-4">
          <div className="faq-mc-moss left" />
          <div className="faq-mc-moss right" />
          <div className="faq-mc-moss mid" />
          <div className="faq-mc-leaves left" />
          <div className="faq-mc-leaves right" />

          <div className="faq-mc-plank p-3 sm:p-4">
            <div className="font-pixel text-[8px] text-geeko-300 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3 h-3 text-geeko-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="faq-mc-text font-pixel text-lg sm:text-xl text-white uppercase tracking-wider">
              Knowledge Base
            </h2>
          </div>
        </div>

        {/* Chipped Wood Plank Accordion Grid */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="faq-mc-plank transition-all duration-150 cursor-pointer"
                onClick={() => toggleFAQ(idx)}
              >
                <div className="p-2.5 sm:p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[9px] text-geeko-400">
                      [0{idx + 1}]
                    </span>
                    <h3 className="faq-mc-text font-pixel text-[9px] sm:text-[10px] text-left leading-relaxed">
                      {faq.q}
                    </h3>
                  </div>

                  <div className="p-0.5 bg-black/40 border border-[#173f35] shrink-0 text-geeko-300">
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00f0ff]' : ''
                      }`}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 pt-1 border-t border-black/40 font-mono text-[11px] text-slate-200 leading-relaxed bg-black/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between text-[8px] font-pixel text-slate-500 pb-2">
        <span>NEWTON SCHOOL OF TECHNOLOGY · BENGALURU</span>
        <span className="text-geeko-400">DECISION-READY PROPOSAL</span>
      </div>
    </section>
  );
}
