import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '../../lib/sound';

const SECRET_MAP = {
  1: '1 : unkown',
  2: '2 : jagmohan',
  3: '3 : ayush pro',
  4: '4 : divyanshu',
};

const resolveSecretNames = (rawStr) => {
  if (!rawStr) return null;
  const trimmed = rawStr.trim().toLowerCase();
  if (trimmed === 'all' || trimmed === '1234' || trimmed === '1,2,3,4' || trimmed === '1 2 3 4') {
    return 'All options revealed:\n>> 1 : unkown\n>> 2 : jagmohan\n>> 3 : ayush pro\n>> 4 : divyanshu';
  }

  const matches = trimmed.match(/[1-4]/g);
  if (matches && matches.length > 0) {
    const unique = Array.from(new Set(matches));
    const lines = unique.map((n) => `>> ${SECRET_MAP[n]}`);
    if (unique.length === 1) {
      return `Option ${unique[0]} revealed:\n${lines[0]}`;
    } else if (unique.length === 4) {
      return `All options revealed:\n${lines.join('\n')}`;
    } else {
      return `Revealed options (${unique.join(', ')}):\n${lines.join('\n')}`;
    }
  }

  if (trimmed === 'one') return 'Option 1 revealed:\n>> 1 : unkown';
  if (trimmed === 'two') return 'Option 2 revealed:\n>> 2 : jagmohan';
  if (trimmed === 'three') return 'Option 3 revealed:\n>> 3 : ayush pro';
  if (trimmed === 'four') return 'Option 4 revealed:\n>> 4 : divyanshu';

  return null;
};

export default function TerminalPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [secretPending, setSecretPending] = useState(false);
  const [history, setHistory] = useState([
    { text: 'openSUSE India · Bengaluru Connect 2027 Kernel Terminal v2.7.0', type: 'system' },
    { text: 'Type "help" for a list of available CLI commands or navigate directly.', type: 'info' },
  ]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', handleToggle);
    window.addEventListener('open-terminal-palette', handleToggle);
    window.addEventListener('open-terminal', handleOpen);
    window.addEventListener('close-terminal', handleClose);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', handleToggle);
      window.removeEventListener('open-terminal-palette', handleToggle);
      window.removeEventListener('open-terminal', handleOpen);
      window.removeEventListener('close-terminal', handleClose);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      sounds.terminalBeep();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    sounds.click();
    const newEntry = { text: `$ ${input}`, type: 'user' };
    const nextHistory = [...history, newEntry];
    const cmd = rawCmd.toLowerCase();
    const normalized = cmd.replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

    // Check if in secret "apish ke papa" pending choice mode
    if (secretPending) {
      if (cmd === 'cancel' || cmd === 'exit' || cmd === 'quit') {
        nextHistory.push({
          type: 'info',
          text: 'Secret query cancelled.',
        });
        setSecretPending(false);
      } else {
        const revealed = resolveSecretNames(cmd);
        if (revealed) {
          nextHistory.push({
            type: 'success',
            text: revealed,
          });
          setSecretPending(false);
        } else {
          nextHistory.push({
            type: 'warning',
            text: 'Which one? All names are hidden. Select an option (1 to 4):\n  1 : ********** [HIDDEN]\n  2 : ********** [HIDDEN]\n  3 : ********** [HIDDEN]\n  4 : ********** [HIDDEN]\nEnter 1, 2, 3, 4, combo like 1,2 or 2,1, or 1234 for all (or "cancel" to exit).',
          });
        }
      }
      setHistory(nextHistory);
      setInput('');
      return;
    }

    // Check for "apish ke papa" or "apish"
    if (normalized === 'apish ke papa' || normalized === 'apish') {
      nextHistory.push({
        type: 'warning',
        text: 'Which one? All names are hidden. Select an option (1 to 4):\n  1 : ********** [HIDDEN]\n  2 : ********** [HIDDEN]\n  3 : ********** [HIDDEN]\n  4 : ********** [HIDDEN]\n\nEnter number (1, 2, 3, 4), combo (e.g. 1,2 or 2,1), or 1234 for all:',
      });
      setSecretPending(true);
      setHistory(nextHistory);
      setInput('');
      return;
    }

    // Direct access shortcuts
    if (normalized.startsWith('apish ke papa ') || normalized.startsWith('apish ')) {
      const remainder = normalized.replace(/^apish ke papa\s+|^apish\s+/, '').trim();
      const directRevealed = resolveSecretNames(remainder);
      if (directRevealed) {
        nextHistory.push({ type: 'success', text: directRevealed });
        setHistory(nextHistory);
        setInput('');
        return;
      }
    }

    const args = cmd.split(' ');
    const main = args[0];

    switch (main) {
      case 'help':
        nextHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  events      : All Events catalog & interactive drift of all 22 confirmed activities
  schedule    : View Day 1 & Day 2 interactive timetable
  tracks      : Explore the 6 Geeko Buildathon tracks
  arcade      : Launch Geeko Arcade (4 playable games)
  quest       : Open QR Digital Passport & missions
  bughunt     : Midnight Bug Hunt code debug arena
  demo        : Demo Arena floorplan & People's Choice voting
  prizes      : View cash prizes, trophies & T-shirt policy
  sponsors    : Explore sponsorship tiers & funding gap
  merch       : View official merchandise & preorders
  venue       : Newton School of Technology directions & Wi-Fi
  register    : Apply for Buildathon (250 capacity cap)
  about       : Event vision, organizers & team
  faq         : Frequently Asked Questions
  clear       : Clear terminal window
  exit        : Close terminal
  sudo        : Try administrative superuser override`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        setIsOpen(false);
        setInput('');
        return;

      case 'events':
        nextHistory.push({ type: 'output', text: 'Navigating to /events...' });
        navigate('/events');
        setIsOpen(false);
        break;

      case 'schedule':
        nextHistory.push({ type: 'output', text: 'Navigating to /schedule...' });
        navigate('/schedule');
        setIsOpen(false);
        break;

      case 'tracks':
        nextHistory.push({ type: 'output', text: 'Navigating to /tracks...' });
        navigate('/tracks');
        setIsOpen(false);
        break;

      case 'arcade':
        nextHistory.push({ type: 'output', text: 'Navigating to /arcade...' });
        navigate('/arcade');
        setIsOpen(false);
        break;

      case 'quest':
        nextHistory.push({ type: 'output', text: 'Navigating to /quest...' });
        navigate('/quest');
        setIsOpen(false);
        break;

      case 'bughunt':
        nextHistory.push({ type: 'output', text: 'Navigating to /bug-hunt...' });
        navigate('/bug-hunt');
        setIsOpen(false);
        break;

      case 'demo':
      case 'voting':
        nextHistory.push({ type: 'output', text: 'Navigating to /demo-arena...' });
        navigate('/demo-arena');
        setIsOpen(false);
        break;

      case 'prizes':
        nextHistory.push({ type: 'output', text: 'Navigating to /prizes...' });
        navigate('/prizes');
        setIsOpen(false);
        break;

      case 'sponsors':
      case 'budget':
        nextHistory.push({ type: 'output', text: 'Navigating to /sponsors...' });
        navigate('/sponsors');
        setIsOpen(false);
        break;

      case 'merch':
        nextHistory.push({ type: 'output', text: 'Navigating to /merch...' });
        navigate('/merch');
        setIsOpen(false);
        break;

      case 'venue':
        nextHistory.push({ type: 'output', text: 'Navigating to /venue...' });
        navigate('/venue');
        setIsOpen(false);
        break;

      case 'register':
        nextHistory.push({ type: 'output', text: 'Navigating to /register...' });
        navigate('/register');
        setIsOpen(false);
        break;

      case 'about':
        nextHistory.push({ type: 'output', text: 'Navigating to /about...' });
        navigate('/about');
        setIsOpen(false);
        break;

      case 'faq':
        nextHistory.push({ type: 'output', text: 'Navigating to /faq...' });
        navigate('/faq');
        setIsOpen(false);
        break;

      case 'sudo':
        nextHistory.push({
          type: 'warning',
          text: 'Permission denied: User is not in sudoers file. This incident will be reported to Divyanshu & Rithull.',
        });
        break;

      case 'zypper':
        nextHistory.push({
          type: 'success',
          text: `Retrieving repository 'openSUSE-Bengaluru-2027'...
Loading repository data...
Reading installed packages...
Package 'geeko-buildathon-passion' is already at latest version (2027.01-1).`,
        });
        break;

      default:
        nextHistory.push({
          type: 'error',
          text: `bash: command not found: ${main}. Type "help" for valid commands.`,
        });
    }

    setHistory(nextHistory);
    setInput('');
  };

  return (
    <>
      {/* Floating CLI Pill trigger - Translucent glass resting state, ALL EVENTS cartridge color scheme on hover */}
      <button
        onClick={() => {
          sounds.click();
          setIsOpen((prev) => !prev);
        }}
        onMouseEnter={() => sounds.hover?.()}
        className="hidden md:block fixed bottom-6 left-6 z-40 group p-[1px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none bg-[#173f35]/60 hover:bg-gradient-to-b hover:from-[#73ba25] hover:via-[#529419] hover:to-[#275910] shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:shadow-[0_2px_0_#1b4d24,0_2px_8px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 opacity-85 hover:opacity-100"
        title="Open Geeko Linux CLI (⌘K)"
      >
        <div className="px-3.5 py-1.5 rounded-full flex items-center gap-2 bg-[rgba(4,10,7,0.72)] backdrop-blur-md group-hover:bg-gradient-to-b group-hover:from-[#0e2916] group-hover:via-[#081a0e] group-hover:to-[#040c06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Phosphor Prompt >_ */}
          <span className="text-[#73ba25] font-bold font-mono text-xs tracking-tight">
            &gt;_
          </span>

          {/* Label */}
          <span className="font-semibold text-xs font-mono text-slate-300 group-hover:text-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-colors duration-300">
            CLI
          </span>

          {/* Micro tactile badge matching [22] badge in ALL EVENTS default */}
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-black/60 group-hover:bg-black/80 border border-[#173f35]/70 group-hover:border-[#73ba25]/60 font-mono transition-all duration-300">
            <span className="text-[10px] leading-none text-slate-400 group-hover:text-[#a3e635] transition-colors duration-300">⌘</span>
            <span className="text-[8.5px] leading-none text-slate-400 group-hover:text-[#a3e635] font-bold transition-colors duration-300">K</span>
          </kbd>
        </div>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-[#020503]/92 backdrop-blur-2xl border border-white/12 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col font-mono text-sm max-h-[80vh]"
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-cyber-darker border-b border-cyber-border select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-geeko-500/80" />
                  <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-geeko-400" />
                    geeko@opensuse-blr: ~ (v2027)
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Output Body */}
              <div className="p-4 overflow-y-auto space-y-2 text-xs flex-1 min-h-[260px] bg-cyber-black/95 select-text">
                {history.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap leading-relaxed ${
                      line.type === 'user'
                        ? 'text-geeko-300 font-bold'
                        : line.type === 'system'
                        ? 'text-geeko-400 font-semibold'
                        : line.type === 'info'
                        ? 'text-slate-400'
                        : line.type === 'warning'
                        ? 'text-amber-400'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal Input Bar */}
              <form
                onSubmit={handleCommand}
                className="flex items-center gap-2 px-4 py-3 bg-cyber-darker border-t border-cyber-border"
              >
                <span className="text-geeko-400 font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    secretPending
                      ? "Which one? Enter 1, 2, 3, 4, combo (1,2 / 2,1), or 1234..."
                      : "Type a command (try 'tracks', 'schedule', 'arcade', or 'help')..."
                  }
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="p-1.5 text-geeko-400 hover:text-geeko-300 hover:bg-geeko-500/10 rounded transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick links footer */}
              <div className="px-4 py-2 bg-cyber-black border-t border-cyber-border/60 text-[10px] text-slate-400 flex items-center justify-between overflow-x-auto gap-3">
                <span className="text-slate-500">Quick Shortcuts:</span>
                <div className="flex items-center gap-2">
                  {['schedule', 'tracks', 'arcade', 'quest', 'prizes', 'register'].map((btn) => (
                    <button
                      key={btn}
                      type="button"
                      onClick={() => {
                        setInput(btn);
                        sounds.hover();
                      }}
                      className="px-2 py-0.5 rounded bg-cyber-border/40 hover:bg-geeko-500/20 hover:text-geeko-300 transition-colors"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
