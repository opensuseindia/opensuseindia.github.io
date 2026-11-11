import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Send,
  ArrowRight,
} from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function ModernGlassFAQSection({ isPage = false }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'General Query',
    message: '',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    sounds.success?.();
    setIsSent(true);
  };

  const faqs = [
    {
      category: 'GENERAL',
      q: 'WHAT IS openSUSE BENGALURU CONNECT 2027?',
      a: 'openSUSE Bengaluru Connect 2027 is a two day gathering of Linux developers, open source contributors, and engineering students at Newton School of Technology, Bengaluru. It features three tech talks, two hands on workshop labs, and a mentored 20 hour Geeko Buildathon with ₹50,000 in grand cash prizes.',
      highlights: ['Two Days of In Person Building', 'Newton School of Technology Campus', 'Mentored Overnight Hackathon'],
    },
    {
      category: 'REGISTRATION',
      q: 'IS THERE ANY REGISTRATION OR ENTRY FEE?',
      a: 'Zero registration fee. The entire event, including workshops, hackathon participation, meals, and overnight stay, is 100% free for all accepted builders. Total capacity is strictly capped at 250 builders to ensure maximum mentor attention and high quality campus accommodations.',
      highlights: ['100% Free Admission', 'Strict 250 Capacity Cap', 'No Hidden Charges'],
    },
    {
      category: 'TEAMS',
      q: 'WHO CAN PARTICIPATE AND CAN WE FORM TEAMS?',
      a: 'Undergraduate and postgraduate students, working software engineers, DevOps practitioners, and open source enthusiasts are all welcome. You can register solo or as a team of 3 to 4 members. Solo registrants will receive guided team matching before the Buildathon kicks off.',
      highlights: ['Teams of 3 to 4 Builders', 'Solo Registrants Matched On Site', 'All Skill Levels Welcome'],
    },
    {
      category: 'OVERNIGHT',
      q: 'WHAT ARE THE OVERNIGHT STAY AND REST LOGISTICS?',
      a: 'All 250 registered participants are permitted to stay overnight at the Newton School campus. Recommended overnight eligibility is 18+. The venue provides dedicated quiet rest zones, separate gender facilities, 24/7 security guard shifts, first aid medical coverage, and round the clock mentor desks.',
      highlights: ['Overnight Hacking Permitted', 'Dedicated Quiet Rest Areas', '24/7 Campus Security & First Aid'],
    },
    {
      category: 'MEALS',
      q: 'WHAT MEALS AND REFRESHMENTS ARE PROVIDED?',
      a: 'Day 1 welcome drinks, vegetarian buffet lunch, evening high tea with snacks, dinner, and midnight coffee are fully provided. Day 2 morning breakfast and south Indian filter coffee are included. Please note that Day 2 post event lunch is not provided following the 14:00 conclusion as attendees disperse.',
      highlights: ['Day 1 Lunch, High Tea & Dinner Provided', 'Day 2 Breakfast & Coffee Included', 'Day 2 Post Event Lunch Not Provided'],
    },
    {
      category: 'PRIZES',
      q: 'WHAT ARE THE PRIZES AND WINNER REWARDS?',
      a: 'The grand prize pool features win up to ₹50,000 in cash awards alongside exciting arcade tournament bounties. Winners receive official openSUSE trophies, verified certificates, and custom printed champion jerseys. In addition, 25 limited edition contributor jerseys are distributed.',
      highlights: ['Win Up to ₹50,000 Cash Pool', 'Arcade Tournament Bounties', 'Champion Trophies & Jerseys'],
    },
    {
      category: 'HARDWARE',
      q: 'DO I NEED TO REINSTALL LINUX ON MY PERSONAL LAPTOP?',
      a: 'No. Never perform a risky operating system reinstall. All workshop exercises and Buildathon tracks work seamlessly with containerized toolchains (Podman, Docker), virtual machines, live boot USB media, or cloud sandbox environments provided by mentors.',
      highlights: ['No OS Reinstall Required', 'Pre Configured Virtual Machines Available', 'Cloud Sandboxes Supported'],
    },
    {
      category: 'ORGANIZERS',
      q: 'WHO ORGANIZES AND LEADS THIS INITIATIVE?',
      a: 'The event is organized by openSUSE India in collaboration with Newton School of Technology faculty and student leaders. Key leadership includes Divyanshu Prakash (Lead Coordination), Rithull Raj Kallat (Technical Program & Rubric), and Dushyant Acharya (Venue Operations & Safety).',
      highlights: ['Official openSUSE India Community', 'Newton School of Technology Faculty Host', 'Student Community Volunteers'],
    },
  ];

  const categories = [
    { key: 'ALL', label: 'All Questions (8)' },
    { key: 'GENERAL', label: 'General Info' },
    { key: 'REGISTRATION', label: 'Registration & Entry' },
    { key: 'TEAMS', label: 'Teams & Hackathon' },
    { key: 'OVERNIGHT', label: 'Overnight & Safety' },
    { key: 'MEALS', label: 'Meals & Catering' },
    { key: 'PRIZES', label: 'Prizes & Rewards' },
    { key: 'HARDWARE', label: 'Hardware & OS' },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === 'ALL' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleFAQ = (idx) => {
    sounds.click?.();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      className={`${
        isPage ? 'pt-24 sm:pt-28 pb-24 min-h-[calc(100vh-4rem)]' : 'py-20 border-b border-[#173f35]/50'
      } px-4 sm:px-6 max-w-5xl mx-auto select-none relative`}
    >
      <span id="contact-us" className="absolute -top-24 pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
          <span>// PROTOCOLS &amp; ANSWERS // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>
        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">SUMMIT </span>
          <span className="text-[#73ba25]">FAQ</span>
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Everything you need to know about attendance, hardware, rules, food, and the 20 hour buildathon.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords: prizes, wifi, teams, sleep, meals..."
            className="w-full bg-[#081510] border border-[#173f35] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-geeko-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                sounds.click?.();
                setSelectedCategory(c.key);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors shrink-0 cursor-pointer ${
                selectedCategory === c.key
                  ? 'bg-geeko-500 text-black font-semibold'
                  : 'bg-[#081510] text-slate-400 hover:text-white border border-[#173f35]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#081510] border border-[#173f35] text-center text-slate-400 font-mono text-xs">
            No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-[#173f35] bg-[#06140e] overflow-hidden transition-colors hover:border-geeko-500/40"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-geeko-400 shrink-0" />
                    <span className="font-pixel text-xs sm:text-sm text-white uppercase tracking-tight">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-geeko-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 sm:px-5 pb-5 text-slate-300 font-mono text-xs leading-relaxed border-t border-[#173f35]/50 pt-3 space-y-3"
                    >
                      <p>{faq.a}</p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {faq.highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 border border-geeko-500/30 text-[10px] text-geeko-300 font-mono"
                          >
                            <span className="w-1 h-1 rounded-full bg-geeko-400" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box with Modal Trigger */}
      <div className="mt-8 p-5 rounded-xl bg-[#06100a] border border-[#173f35] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-[#73ba25] shrink-0 hidden sm:block" />
          <div>
            <div className="text-white font-semibold text-xs sm:text-sm">
              Still have questions not covered here?
            </div>
            <div className="text-slate-400 font-mono text-xs mt-0.5">
              Send a direct dispatch message to the core organizing leadership.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.click?.();
            setIsContactModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-lg bg-[#73ba25] hover:bg-[#8ee631] text-black font-pixel text-xs transition-all shrink-0 cursor-pointer font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Contact Organizers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cool Contact Organizers Popup Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div
            onClick={() => setIsContactModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#06140e] border border-[#173f35] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col font-mono text-sm relative"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#73ba25] to-transparent pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#173f35]/80 bg-[#040c08] select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#73ba25] animate-pulse" />
                  <span className="font-pixel text-xs text-white uppercase tracking-wider">
                    CONTACT ORGANIZERS
                  </span>
                </div>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Core Leads Preview Chips */}
                <div className="p-3 rounded-xl bg-black/50 border border-[#173f35] space-y-2">
                  <div className="text-[9px] font-pixel text-geeko-400 uppercase tracking-wider flex items-center justify-between">
                    <span>DIRECT LEAD CONTACTS</span>
                    <span className="text-[9px] font-mono text-slate-500">24/7 ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10.5px]">
                    <div className="p-1.5 rounded-lg bg-[#081812] border border-[#173f35]/60">
                      <div className="text-white font-bold truncate">Divyanshu Prakash</div>
                      <div className="text-[9px] text-[#73ba25] truncate">Coordination &amp; Funding</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#081812] border border-[#173f35]/60">
                      <div className="text-white font-bold truncate">Dushyant Acharya</div>
                      <div className="text-[9px] text-[#73ba25] truncate">Venue &amp; Operations</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#081812] border border-[#173f35]/60">
                      <div className="text-white font-bold truncate">Rithull Raj Kallat</div>
                      <div className="text-[9px] text-[#73ba25] truncate">Program &amp; Judging</div>
                    </div>
                  </div>
                </div>

                {/* Form or Sent State */}
                {isSent ? (
                  <div className="p-6 rounded-xl bg-[#081f15] border border-[#73ba25] text-center space-y-2 my-2">
                    <CheckCircle2 className="w-8 h-8 text-[#73ba25] mx-auto mb-1 animate-bounce" />
                    <div className="font-pixel text-xs text-white uppercase">
                      Transmission Dispatched!
                    </div>
                    <p className="font-mono text-xs text-slate-300">
                      Your query has been logged. The organizing team will respond to your email shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setIsContactModalOpen(false);
                      }}
                      className="mt-3 px-4 py-1.5 rounded-lg bg-[#73ba25] text-black font-pixel text-[10px] uppercase font-bold cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1 text-[9px] font-pixel">YOUR NAME:</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-black/60 border border-[#173f35] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#73ba25] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1 text-[9px] font-pixel">EMAIL ADDRESS:</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full bg-black/60 border border-[#173f35] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#73ba25] text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 text-[9px] font-pixel">QUERY TOPIC:</label>
                      <select
                        value={contactForm.topic}
                        onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                        className="w-full bg-black/60 border border-[#173f35] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#73ba25] text-xs font-mono"
                      >
                        <option value="General Query">General Summit Query</option>
                        <option value="Buildathon Rules">Buildathon &amp; Rules</option>
                        <option value="Overnight Stay">Overnight Stay &amp; Safety</option>
                        <option value="Travel &amp; Venue">Travel &amp; Venue Guidance</option>
                        <option value="Sponsorship">Sponsorship &amp; Alliance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 text-[9px] font-pixel">MESSAGE / QUERY:</label>
                      <textarea
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Type your question or query for the organizing team..."
                        className="w-full bg-black/60 border border-[#173f35] rounded-lg p-3 text-white focus:outline-none focus:border-[#73ba25] text-xs font-mono resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#73ba25] hover:bg-[#8ee631] text-black font-pixel text-xs uppercase tracking-wider transition-all duration-200 shadow-md font-bold cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Dispatch Message</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
