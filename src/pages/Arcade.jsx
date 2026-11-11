import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Terminal,
  HelpCircle,
  Link as LinkIcon,
  Search,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Award,
  ArrowRight,
  Flame,
  Tv,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useToast } from '../context/ToastContext';

export default function Arcade() {
  const [selectedGame, setSelectedGame] = useState('terminal-escape');
  const [games, setGames] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/arcade/games')
      .then((r) => r.json())
      .then(setGames)
      .catch((err) => console.error('Failed to load arcade games:', err));
  }, []);

  // -------------------------------------------------------------
  // GAME 1: TERMINAL ESCAPE
  // -------------------------------------------------------------
  const [terminalHistory, setTerminalHistory] = useState([
    'ROOM STATUS: LOCKED. Find the escape key and execute the release script.',
    'Type "help" or run standard Linux commands to inspect files.',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalProgress, setTerminalProgress] = useState({
    foundFile: false,
    chmodDone: false,
    escaped: false,
  });

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    sounds.terminalBeep();
    const nextHist = [...terminalHistory, `$ ${cmd}`];
    const parts = cmd.split(' ');
    const base = parts[0].toLowerCase();

    switch (base) {
      case 'help':
        nextHist.push('Available commands: ls, cat, chmod, ./unlock_gate.sh, clear, pwd');
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'pwd':
        nextHist.push('/home/geeko/escape_room');
        break;
      case 'ls':
        if (cmd === 'ls -la' || cmd === 'ls -a' || cmd === 'ls -l') {
          nextHist.push('-rw-r--r-- 1 geeko geeko   42 Jan 16 09:00 .secret_key');
          nextHist.push(
            terminalProgress.chmodDone
              ? '-rwxr-xr-x 1 geeko geeko 1024 Jan 16 09:00 unlock_gate.sh'
              : '-rw-r--r-- 1 geeko geeko 1024 Jan 16 09:00 unlock_gate.sh'
          );
        } else {
          nextHist.push('unlock_gate.sh');
          nextHist.push('(Hint: there may be hidden files. Try "ls -la")');
        }
        break;
      case 'cat':
        if (parts[1] === '.secret_key') {
          setTerminalProgress((p) => ({ ...p, foundFile: true }));
          nextHist.push('KEY FOUND: [GEEKO_OPEN_SOURCE_2027]');
          nextHist.push('Next step: Make "unlock_gate.sh" executable with chmod.');
        } else if (parts[1] === 'unlock_gate.sh') {
          nextHist.push('#!/bin/bash\n# Gatekeeper script\nif [ "$PERM" = "ok" ]; then open_gate; fi');
        } else {
          nextHist.push(`cat: ${parts[1] || 'missing file'}: No such file or directory`);
        }
        break;
      case 'chmod':
        if (parts.includes('+x') || parts.includes('755') || parts.includes('a+x')) {
          setTerminalProgress((p) => ({ ...p, chmodDone: true }));
          nextHist.push('chmod: Execution permissions granted on unlock_gate.sh!');
          nextHist.push('Now run: ./unlock_gate.sh');
        } else {
          nextHist.push('Usage: chmod +x unlock_gate.sh');
        }
        break;
      case './unlock_gate.sh':
      case 'bash':
        if (terminalProgress.chmodDone) {
          setTerminalProgress((p) => ({ ...p, escaped: true }));
          nextHist.push('=============================================');
          nextHist.push('🎉 ESCAPE SUCCESSFUL! The chamber opens!');
          nextHist.push('Score Awarded: 1000 XP · Shell Master badge unlocked');
          nextHist.push('=============================================');
          confetti({ particleCount: 70, spread: 60 });
          toast('Terminal Escape Solved! +1000 XP', 'success');
          fetch('/api/arcade/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: 'terminal-escape', score: 1000, playerName: 'Terminal Hacker' }),
          }).catch(() => {});
        } else {
          nextHist.push('bash: ./unlock_gate.sh: Permission denied (Did you chmod +x?)');
        }
        break;
      default:
        nextHist.push(`bash: ${base}: command not found. Try 'help'.`);
    }

    setTerminalHistory(nextHist);
    setTerminalInput('');
  };

  // -------------------------------------------------------------
  // GAME 2: LINUX TRIVIA BLITZ
  // -------------------------------------------------------------
  const triviaQuestions = [
    {
      q: 'What is the rolling release distribution of openSUSE called?',
      opts: ['Leap', 'Tumbleweed', 'MicroOS', 'Aeon'],
      answer: 1,
    },
    {
      q: 'Which tool serves as openSUSE comprehensive setup and control center?',
      opts: ['YaST', 'Snapper', 'Zypper', 'RPM'],
      answer: 0,
    },
    {
      q: 'What is the official CLI package manager command in openSUSE?',
      opts: ['apt', 'dnf', 'zypper', 'pacman'],
      answer: 2,
    },
    {
      q: 'Which automated testing tool is famous for whole OS screen and OCR validation in openSUSE?',
      opts: ['Selenium', 'openQA', 'Cypress', 'PyTest'],
      answer: 1,
    },
    {
      q: 'What animal is Geeko, the openSUSE mascot?',
      opts: ['Gecko / Chameleon', 'Penguin', 'Fox', 'Dragon'],
      answer: 0,
    },
  ];

  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [triviaSelected, setTriviaSelected] = useState(null);

  const handleTriviaAnswer = (optIdx) => {
    if (triviaSelected !== null) return;
    setTriviaSelected(optIdx);

    const isCorrect = optIdx === triviaQuestions[triviaIndex].answer;
    if (isCorrect) {
      sounds.success();
      setTriviaScore((s) => s + 200);
    } else {
      sounds.click();
    }

    setTimeout(() => {
      setTriviaSelected(null);
      if (triviaIndex + 1 < triviaQuestions.length) {
        setTriviaIndex((i) => i + 1);
      } else {
        setTriviaFinished(true);
        confetti({ particleCount: 50, spread: 50 });
        toast(`Trivia Blitz Finished! Score: ${triviaScore + (isCorrect ? 200 : 0)}`, 'success');
        fetch('/api/arcade/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: 'linux-trivia-blitz', score: triviaScore + (isCorrect ? 200 : 0), playerName: 'Trivia Sage' }),
        }).catch(() => {});
      }
    }, 1200);
  };

  const resetTrivia = () => {
    setTriviaIndex(0);
    setTriviaScore(0);
    setTriviaFinished(false);
    setTriviaSelected(null);
  };

  // -------------------------------------------------------------
  // GAME 3: COMMAND MATCH
  // -------------------------------------------------------------
  const matchPairs = [
    { cmd: 'zypper dup', desc: 'Upgrade openSUSE Tumbleweed to latest packages' },
    { cmd: 'systemctl status', desc: 'Inspect active state of systemd service' },
    { cmd: 'journalctl -xe', desc: 'Query system log events with explanation hints' },
    { cmd: 'snapper rollback', desc: 'Restore previous root filesystem Btrfs snapshot' },
  ];

  const [selectedCmd, setSelectedCmd] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [matchScore, setMatchScore] = useState(0);

  const handleCmdClick = (cmd) => {
    sounds.hover();
    setSelectedCmd(cmd);
  };

  const handleDescClick = (pair) => {
    if (!selectedCmd) return;
    if (selectedCmd === pair.cmd) {
      sounds.success();
      setMatchedPairs((m) => [...m, pair.cmd]);
      setMatchScore((s) => s + 250);
      setSelectedCmd(null);
      toast(`Correct match: ${pair.cmd}`, 'success');
      if (matchedPairs.length + 1 === matchPairs.length) {
        confetti({ particleCount: 80, spread: 70 });
      }
    } else {
      sounds.click();
      toast('Not quite right, try another command!', 'error');
      setSelectedCmd(null);
    }
  };

  // -------------------------------------------------------------
  // GAME 4: FIND THE GEEKO (QR CLUE TRAIL)
  // -------------------------------------------------------------
  const clues = [
    {
      num: 1,
      hint: 'Near the load tested power circuits where 250 laptops roar and the first commit was pushed.',
      answer: 'Main Buildathon Hall',
      secretCode: 'BUILD-HALL-77',
    },
    {
      num: 2,
      hint: 'Where steaming hot south Indian idlis and midnight tea keep overnight builders alert.',
      answer: 'Dining & Refreshment Corridor',
      secretCode: 'CHAI-POINT-09',
    },
    {
      num: 3,
      hint: 'Where 6 parallel lanes and 12 judges evaluate repository freezes and upstream pull requests.',
      answer: 'Demo Arena (83 Spaces)',
      secretCode: 'DEMO-LANE-42',
    },
    {
      num: 4,
      hint: 'Where the top six finalists deliver their 7 minute pitches and champion trophies are presented.',
      answer: 'Auditorium Main Stage',
      secretCode: 'STAGE-FINALE-01',
    },
  ];

  const [unlockedClues, setUnlockedClues] = useState([]);
  const [clueInput, setClueInput] = useState('');

  const handleClueSubmit = (clue) => {
    if (clueInput.trim().toUpperCase() === clue.secretCode) {
      sounds.success();
      setUnlockedClues((u) => [...u, clue.num]);
      setClueInput('');
      toast(`Checkpoint ${clue.num} decoded: ${clue.answer}!`, 'success');
      if (unlockedClues.length + 1 === clues.length) {
        confetti({ particleCount: 100, spread: 80 });
      }
    } else {
      sounds.click();
      toast('Incorrect verification code. Inspect the venue clue carefully!', 'error');
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Atmospheric Ambient Purple Glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-purple-600/[0.04] blur-[160px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SECTION HEADER: WEBSITE SIGNATURE PIXEL & THEME LOCKUP    */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        {/* Pulsing Cyber Pill Badge (Purple Theme) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#120a1f] border border-purple-500/40 text-purple-400 font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>// RETRO CYBER CABIN &amp; PS5 ARENA // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
        </div>

        {/* 2-Tone Pixel Headline */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #3b0764, 4px 4px 0 #1e053a',
          }}
        >
          <span className="text-white">GEEKO </span>
          <span className="text-purple-400">ARCADE</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Play 4 interactive Linux hacker minigames below or battle in the competitive PS5 4K 120Hz midnight arena.
        </p>
      </div>

      {/* ========================================================= */}
      {/* ARCADE TELEMETRY RIBBON: PURPLE CYBER THEME               */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 relative z-10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#160d26]/90 via-[#0e071a]/90 to-[#07030e]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">4 Minigames</div>
            <div className="text-slate-400 text-[10px] font-mono">Interactive Web Puzzles</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#160d26]/90 via-[#0e071a]/90 to-[#07030e]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">PS5 4K 120Hz</div>
            <div className="text-slate-400 text-[10px] font-mono">Tekken &amp; Mortal Kombat</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#160d26]/90 via-[#0e071a]/90 to-[#07030e]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">₹2,500 Cash</div>
            <div className="text-slate-400 text-[10px] font-mono">Arcade Leaderboard Pool</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-[#160d26]/90 via-[#0e071a]/90 to-[#07030e]/90 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">4 Winner Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Champion Reward Merch</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GAME SELECTOR CARTRIDGES: WEBSITE SIGNATURE CARD THEME     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10 relative z-10">
        {[
          { id: 'terminal-escape', label: 'Terminal Escape', icon: Terminal, desc: '5 to 10 min Bash puzzle' },
          { id: 'linux-trivia', label: 'Linux Trivia Blitz', icon: HelpCircle, desc: '3 to 5 min timed quiz' },
          { id: 'command-match', label: 'Command Match', icon: LinkIcon, desc: '3 to 5 min matching game' },
          { id: 'find-geeko', label: 'Find the Geeko', icon: Search, desc: 'QR venue clue trail' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedGame === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedGame(tab.id);
                sounds.click();
              }}
              className={`group relative rounded-xl p-4 text-left border transition-all duration-300 overflow-hidden cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-[#1b0d2e]/95 via-[#0e0717]/95 to-[#050208]/95 border-purple-500 shadow-[0_10px_30px_rgba(168,85,247,0.25)] text-white'
                  : 'bg-gradient-to-br from-[#0e0817]/90 via-[#07040d]/90 to-[#030105]/90 border-purple-900/40 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-[#130b20]'
              }`}
            >
              {/* Top Specular Line on active */}
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
              )}
              {/* Cyber Chamfer Brackets */}
              <span className={`absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l pointer-events-none ${isSelected ? 'border-purple-400' : 'border-purple-900/40'}`} />
              <span className={`absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r pointer-events-none ${isSelected ? 'border-purple-400' : 'border-purple-900/40'}`} />

              <div className="flex items-center gap-2.5 mb-1.5 relative z-10">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="font-heading font-black text-sm text-white">
                  {tab.label}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block relative z-10">
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* ACTIVE GAME WINDOW: CYBER THEMED (PURPLE CHASSIS)         */}
      {/* ========================================================= */}
      <div className="mb-12 relative z-10">
        {/* GAME 1: TERMINAL ESCAPE */}
        {selectedGame === 'terminal-escape' && (
          <div className="relative rounded-2xl bg-[#06040a] border border-purple-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden font-mono">
            {/* Top Specular Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-purple-400 pointer-events-none" />

            {/* Titlebar */}
            <div className="px-4 py-3 bg-[#0f091a] border-b border-purple-900/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-[#73ba25]" />
                <span className="text-white font-bold ml-2 font-mono text-[11px]">Terminal Escape : bash session #1024</span>
              </div>
              <span className={`font-mono text-[11px] font-bold ${terminalProgress.escaped ? 'text-[#8ee631]' : 'text-purple-400'}`}>
                Status: {terminalProgress.escaped ? 'ESCAPED 🏆' : 'LOCKED IN'}
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 bg-black/95 text-xs text-[#8ee631] min-h-[320px] max-h-[420px] overflow-y-auto space-y-2 select-text font-mono">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </div>
              ))}
            </div>

            {/* Input Line */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 px-4 py-3 bg-[#0f091a] border-t border-purple-900/50">
              <span className="text-purple-400 font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type a command (try 'ls -la', 'cat .secret_key', 'chmod +x unlock_gate.sh')..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
              >
                Execute
              </button>
            </form>

            {/* Cheatsheet / Objective */}
            <div className="p-4 bg-black/60 text-[11px] text-slate-400 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong>Steps:</strong> 1. Find key (<code className="text-purple-300">ls -la</code>, <code className="text-purple-300">cat .secret_key</code>) → 2. Permissions (<code className="text-purple-300">chmod +x unlock_gate.sh</code>) → 3. Run (<code className="text-purple-300">./unlock_gate.sh</code>)
              </div>
              <button
                type="button"
                onClick={() => {
                  sounds.click();
                  setTerminalHistory(['Resetting terminal session... Type "help"']);
                  setTerminalProgress({ foundFile: false, chmodDone: false, escaped: false });
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* GAME 2: LINUX TRIVIA BLITZ */}
        {selectedGame === 'linux-trivia' && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#120a1c] via-[#090510] to-[#040207] border border-purple-500/40 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
            {!triviaFinished ? (
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-purple-900/50">
                  <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
                    Question {triviaIndex + 1} of {triviaQuestions.length}
                  </span>
                  <div className="font-mono text-xs text-white">
                    Score: <strong className="text-purple-300">{triviaScore} XP</strong>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-black text-white mb-6">
                  {triviaQuestions[triviaIndex].q}
                </h3>

                <div className="space-y-3 mb-6">
                  {triviaQuestions[triviaIndex].opts.map((opt, oIdx) => {
                    const isSelected = triviaSelected === oIdx;
                    const isCorrect = oIdx === triviaQuestions[triviaIndex].answer;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleTriviaAnswer(oIdx)}
                        className={`w-full p-4 rounded-xl text-left font-mono text-xs transition-all border cursor-pointer ${
                          triviaSelected !== null
                            ? isCorrect
                              ? 'bg-purple-600/30 border-purple-400 text-purple-200 font-bold'
                              : isSelected
                              ? 'bg-red-500/20 border-red-400 text-red-300'
                              : 'bg-black/50 border-purple-900/30 text-slate-500'
                            : 'bg-black/60 border-purple-900/40 text-slate-200 hover:border-purple-400 hover:bg-purple-600/10'
                        }`}
                      >
                        <span className="mr-3 font-bold text-purple-400">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-heading font-black text-white mb-2">
                  Blitz Completed!
                </h3>
                <p className="text-slate-400 text-sm mb-6 font-mono">
                  Final Score: <strong className="text-purple-300 text-xl font-mono">{triviaScore}</strong> / 1000 XP
                </p>
                <button
                  onClick={resetTrivia}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: COMMAND MATCH */}
        {selectedGame === 'command-match' && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#120a1c] via-[#090510] to-[#040207] border border-purple-500/40 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-purple-900/50">
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  Match Linux Commands to Their Purpose
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Click a command on the left, then click its matching description on the right!
                </span>
              </div>
              <div className="font-mono text-xs text-white">
                Matched: <strong className="text-purple-300">{matchedPairs.length} / {matchPairs.length}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Commands List */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-purple-400 uppercase font-bold tracking-wider">Commands</div>
                {matchPairs.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.cmd);
                  const isSelected = selectedCmd === pair.cmd;
                  return (
                    <button
                      key={pair.cmd}
                      disabled={isMatched}
                      onClick={() => handleCmdClick(pair.cmd)}
                      className={`w-full p-3.5 rounded-xl text-left font-mono text-xs border transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-purple-950/20 border-purple-900/30 text-purple-400/50 line-through opacity-60'
                          : isSelected
                          ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-md'
                          : 'bg-black/60 border-purple-900/40 text-slate-200 hover:border-purple-400'
                      }`}
                    >
                      $ {pair.cmd}
                    </button>
                  );
                })}
              </div>

              {/* Descriptions List */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-purple-400 uppercase font-bold tracking-wider">Descriptions</div>
                {matchPairs.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.cmd);
                  return (
                    <button
                      key={pair.desc}
                      disabled={isMatched}
                      onClick={() => handleDescClick(pair)}
                      className={`w-full p-3.5 rounded-xl text-left font-mono text-xs border transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-purple-950/20 border-purple-900/30 text-purple-400/50 opacity-60'
                          : 'bg-black/60 border-purple-900/40 text-slate-300 hover:border-purple-400 hover:bg-purple-600/10'
                      }`}
                    >
                      {pair.desc}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GAME 4: FIND THE GEEKO (QR CLUE TRAIL) */}
        {selectedGame === 'find-geeko' && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#120a1c] via-[#090510] to-[#040207] border border-purple-500/40 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
            <div className="mb-6 pb-3 border-b border-purple-900/50">
              <h3 className="font-heading font-black text-xl text-white mb-1">
                Find the Geeko: Campus QR Trail
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Explore approved open event spaces across Newton School of Technology at S-VYASA campus to decode physical checkpoints and unlock bounties!
              </p>
            </div>

            <div className="space-y-4">
              {clues.map((clue) => {
                const isUnlocked = unlockedClues.includes(clue.num);
                return (
                  <div
                    key={clue.num}
                    className={`p-4 rounded-xl border transition-all ${
                      isUnlocked
                        ? 'bg-purple-600/20 border-purple-500/50'
                        : 'bg-black/60 border-purple-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-purple-400">
                        CLUE #{clue.num}
                      </span>
                      {isUnlocked ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/40">
                          ✓ CHECKPOINT FOUND: {clue.answer}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">LOCKED</span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs font-mono mb-3">
                      "{clue.hint}"
                    </p>

                    {!isUnlocked && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Enter clue code (Hint: ${clue.secretCode})`}
                          value={clueInput}
                          onChange={(e) => setClueInput(e.target.value)}
                          className="flex-1 bg-black/80 border border-purple-900/50 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder:text-slate-600 outline-none focus:border-purple-400"
                        />
                        <button
                          onClick={() => handleClueSubmit(clue)}
                          className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold cursor-pointer"
                        >
                          Verify Checkpoint
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PS5 ARENA & REWARDS CALLOUT: PURPLE THEMED                */}
      {/* ========================================================= */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120a1c] via-[#090510] to-[#040207] border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-purple-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-purple-400 pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-purple-400 pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0 border border-purple-500/30">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-white block mb-0.5">PlayStation 5 Tournament Arena:</strong>
            <span>Tekken 8 Knockout Cup, Mortal Kombat 1v1 Arena, and racing lounge running during Day 1 overnight downtime. Cash rewards &amp; 4 winner jerseys!</span>
          </div>
        </div>
        <Link
          to="/prizes"
          onClick={() => sounds.click()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <span>View Prizes &amp; Bounties</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
