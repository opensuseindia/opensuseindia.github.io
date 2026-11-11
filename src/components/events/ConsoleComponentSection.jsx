import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
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

export default function ConsoleComponentSection() {
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'openSUSE Tumbleweed 2027.01 (Linux 6.12.0-geeko)', type: 'system' },
    { text: 'Type "help", "tracks", "zypper in geeko", or "escape".', type: 'info' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [activeTab, setActiveTab] = useState('cli');
  const [secretPending, setSecretPending] = useState(false);
  const [gameState, setGameState] = useState({
    step: 1,
    solved: false,
    msg: 'ROOM 01: You are in /root without sudo privileges. Find the secret key file permissions.',
  });
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommand = (cmdStr) => {
    const cmd = (cmdStr || inputVal).trim();
    if (!cmd) return;

    sounds.terminalBeep();
    const newHistory = [...terminalHistory, { text: `geeko@nst-bengaluru:~$ ${cmd}`, type: 'user' }];

    const lower = cmd.toLowerCase();
    const normalized = lower.replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

    if (secretPending) {
      if (lower === 'cancel' || lower === 'exit' || lower === 'quit') {
        newHistory.push({ text: 'Secret query cancelled.', type: 'info' });
        setSecretPending(false);
      } else {
        const revealed = resolveSecretNames(cmd);
        if (revealed) {
          newHistory.push({ text: revealed, type: 'success' });
          setSecretPending(false);
        } else {
          newHistory.push({
            text: 'Which one? All names are hidden. Select an option (1 to 4):\n  1 : ********** [HIDDEN]\n  2 : ********** [HIDDEN]\n  3 : ********** [HIDDEN]\n  4 : ********** [HIDDEN]\nEnter 1, 2, 3, 4, combo like 1,2 or 2,1, or 1234 for all (or "cancel" to exit).',
            type: 'warning',
          });
        }
      }
      setTerminalHistory(newHistory);
      setInputVal('');
      return;
    }

    if (normalized === 'apish ke papa' || normalized === 'apish') {
      newHistory.push({
        text: 'Which one? All names are hidden. Select an option (1 to 4):\n  1 : ********** [HIDDEN]\n  2 : ********** [HIDDEN]\n  3 : ********** [HIDDEN]\n  4 : ********** [HIDDEN]\n\nEnter number (1, 2, 3, 4), combo (e.g. 1,2 or 2,1), or 1234 for all:',
        type: 'warning',
      });
      setSecretPending(true);
      setTerminalHistory(newHistory);
      setInputVal('');
      return;
    }

    if (normalized.startsWith('apish ke papa ') || normalized.startsWith('apish ')) {
      const remainder = normalized.replace(/^apish ke papa\s+|^apish\s+/, '').trim();
      const directRevealed = resolveSecretNames(remainder);
      if (directRevealed) {
        newHistory.push({ text: directRevealed, type: 'success' });
        setTerminalHistory(newHistory);
        setInputVal('');
        return;
      }
    }

    if (lower === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      newHistory.push(
        { text: 'COMMANDS: tracks, zypper refresh, zypper in geeko, uname -a, cat proposal, escape, clear', type: 'system' }
      );
    } else if (lower === 'tracks') {
      newHistory.push(
        { text: '01: Terminal Titans (CLI) | 02: Root Access (Security) | 03: GeekoOps (DevOps)', type: 'output' },
        { text: '04: Desktop Reboot (UX) | 05: Upstream Heroes (PRs) | 06: Next Linux Need (Impact)', type: 'output' }
      );
    } else if (lower.includes('zypper')) {
      newHistory.push(
        { text: 'Repository "openSUSE-Tumbleweed-Oss" refreshed [done]', type: 'system' },
        { text: 'Installed: buildathon-suite, obs-client, openqa-runner-v2 [done]', type: 'success' }
      );
    } else if (lower === 'uname -a' || lower === 'uname') {
      newHistory.push({
        text: 'Linux nst-bengaluru 6.12.0-geeko-smp x86_64 GNU/Linux',
        type: 'output',
      });
    } else if (lower.includes('cat')) {
      newHistory.push(
        { text: 'DOCUMENT: openSUSE Bengaluru Connect 2027 | 250 Builders | 20h Clock | Newton School of Tech', type: 'system' }
      );
    } else if (lower === 'escape') {
      setActiveTab('escape');
    } else {
      newHistory.push({
        text: `bash: ${cmd}: command not found. Try "help".`,
        type: 'error',
      });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const handleGameAction = (action) => {
    sounds.click();
    if (gameState.step === 1 && action === 'ls -la') {
      setGameState({
        step: 2,
        solved: false,
        msg: 'Found: -r-------- 1 root root key.pem. Grant group read access.',
      });
    } else if (gameState.step === 2 && action === 'chmod 640 key.pem') {
      setGameState({
        step: 3,
        solved: true,
        msg: '🎉 SUCCESS! File unlocked. You escaped the terminal room with the key! +100 Quest XP.',
      });
      sounds.success();
    } else {
      sounds.glitch();
    }
  };

  return (
    <section
      id="console"
      className="relative w-full min-h-[calc(100svh-4rem)] lg:h-[calc(100vh-4rem)] snap-start snap-always overflow-y-auto lg:overflow-hidden border-b-4 border-[#173f35] bg-[#040807] px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between select-none"
    >
      <div className="max-w-4xl mx-auto w-full pt-1">
        {/* Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-3">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#081510] border border-geeko-500/40 text-geeko-400 font-pixel text-[8px] mb-1">
            <Terminal className="w-3 h-3" />
            <span>INTERACTIVE CYBERPUNK CONSOLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white uppercase tracking-wider">
            Geeko Handheld Console
          </h2>
          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
            Test live Zypper package commands or solve the Terminal Escape challenge.
          </p>
        </div>

        {/* Handheld Chassis (Crisp Sizing) */}
        <div className="max-w-2xl mx-auto bg-[#0a1f18] border-3 border-black p-4 sm:p-5 rounded-xl shadow-[inset_-3px_-3px_0_0_#071410,inset_3px_3px_0_0_#173f35] my-auto">
          {/* Top Chassis Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-[#173f35] mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse border border-black shadow-[0_0_6px_#ef4444]" />
              <span className="font-pixel text-[7px] text-slate-400 uppercase tracking-widest">
                BATTERY [OK]
              </span>
            </div>
            <div className="font-pixel text-[8px] text-geeko-400 tracking-wider">
              GEEKO-BOY 2027
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-black/60 rounded-full" />
              <div className="w-1 h-3 bg-black/60 rounded-full" />
              <div className="w-1 h-3 bg-black/60 rounded-full" />
            </div>
          </div>

          {/* CRT Screen */}
          <div className="crt-monitor bg-[#040a08] border-3 border-[#0e271f] p-3 mb-3 min-h-[220px] max-h-[240px] flex flex-col justify-between font-mono text-[11px]">
            <div className="flex items-center justify-between border-b border-[#173f35]/80 pb-1.5 mb-2 font-pixel text-[8px]">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    sounds.click();
                    setActiveTab('cli');
                  }}
                  className={`${activeTab === 'cli' ? 'text-geeko-400 underline' : 'text-slate-500'} uppercase`}
                >
                  [1] ZYPPER TERMINAL
                </button>
                <button
                  onClick={() => {
                    sounds.click();
                    setActiveTab('escape');
                  }}
                  className={`${activeTab === 'escape' ? 'text-amber-400 underline' : 'text-slate-500'} uppercase`}
                >
                  [2] TERMINAL ESCAPE
                </button>
              </div>
              <span className="text-[#00f0ff]">TTY1</span>
            </div>

            {activeTab === 'cli' ? (
              <div className="flex-1 overflow-y-auto max-h-[140px] space-y-1 text-[10px] pr-1">
                {terminalHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${
                      item.type === 'user'
                        ? 'text-white font-bold'
                        : item.type === 'system'
                        ? 'text-geeko-400'
                        : item.type === 'success'
                        ? 'text-[#00f0ff]'
                        : item.type === 'error'
                        ? 'text-red-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between py-1 text-[10px]">
                <div className="p-2 bg-black/60 border border-amber-500/40 text-amber-200 mb-2">
                  <div className="font-pixel text-[8px] text-amber-400 mb-0.5">
                    STEP {gameState.step}/2
                  </div>
                  <div>{gameState.msg}</div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-auto">
                  {gameState.step === 1 && (
                    <>
                      <button
                        onClick={() => handleGameAction('ls -la')}
                        className="p-1.5 bg-[#081510] border border-geeko-500 text-geeko-300 hover:bg-geeko-500 hover:text-black font-mono text-[9px] text-left"
                      >
                        &gt; ls -la
                      </button>
                      <button
                        onClick={() => handleGameAction('cat /etc/passwd')}
                        className="p-1.5 bg-[#081510] border border-geeko-500 text-geeko-300 hover:bg-geeko-500 hover:text-black font-mono text-[9px] text-left"
                      >
                        &gt; cat /etc/passwd
                      </button>
                    </>
                  )}

                  {gameState.step === 2 && !gameState.solved && (
                    <button
                      onClick={() => handleGameAction('chmod 640 key.pem')}
                      className="col-span-2 p-1.5 bg-[#081510] border border-geeko-500 text-geeko-300 hover:bg-geeko-500 hover:text-black font-mono text-[9px] text-left"
                    >
                      &gt; chmod 640 key.pem
                    </button>
                  )}

                  {gameState.solved && (
                    <button
                      onClick={() => {
                        sounds.click();
                        setGameState({
                          step: 1,
                          solved: false,
                          msg: 'ROOM 01: You are in /root without sudo privileges. Find the secret key file permissions.',
                        });
                      }}
                      className="col-span-2 p-1.5 btn-pixel-green text-[8px] text-center"
                    >
                      RESET GAME
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'cli' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand();
                }}
                className="flex items-center gap-1.5 pt-1.5 border-t border-[#173f35]/80 mt-1"
              >
                <span className="text-geeko-400 font-bold shrink-0">&gt;</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    secretPending
                      ? "Which one? Enter 1, 2, 3, 4, combo (1,2 / 2,1), or 1234..."
                      : "Type a command ('tracks', 'help', 'uname')..."
                  }
                  className="w-full bg-transparent border-none text-white focus:outline-none font-mono text-[10px]"
                />
                <button type="submit" className="px-2 py-0.5 btn-pixel-dark text-[8px] shrink-0">
                  EXEC
                </button>
              </form>
            )}
          </div>

          {/* Controls: D-PAD & Buttons */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="relative w-20 h-20">
              <button
                onClick={() => handleCommand('help')}
                className="absolute top-0 left-7 w-6 h-6 bg-neutral-900 border border-black hover:bg-neutral-800 font-pixel text-[7px] text-slate-400 flex items-center justify-center"
              >
                ▲
              </button>
              <button
                onClick={() => handleCommand('tracks')}
                className="absolute bottom-0 left-7 w-6 h-6 bg-neutral-900 border border-black hover:bg-neutral-800 font-pixel text-[7px] text-slate-400 flex items-center justify-center"
              >
                ▼
              </button>
              <button
                onClick={() => handleCommand('whoami')}
                className="absolute top-7 left-0 w-6 h-6 bg-neutral-900 border border-black hover:bg-neutral-800 font-pixel text-[7px] text-slate-400 flex items-center justify-center"
              >
                ◀
              </button>
              <button
                onClick={() => handleCommand('zypper refresh')}
                className="absolute top-7 right-0 w-6 h-6 bg-neutral-900 border border-black hover:bg-neutral-800 font-pixel text-[7px] text-slate-400 flex items-center justify-center"
              >
                ▶
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCommand('clear')}
                className="px-2 py-0.5 bg-neutral-800 border border-black rotate-[-20deg] font-pixel text-[7px] text-slate-400"
              >
                SELECT
              </button>
              <button
                onClick={() => handleCommand('escape')}
                className="px-2 py-0.5 bg-neutral-800 border border-black rotate-[-20deg] font-pixel text-[7px] text-geeko-400"
              >
                START
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCommand('zypper in geeko')}
                className="w-9 h-9 rounded-full bg-red-600 border-2 border-black font-pixel text-[9px] text-white flex items-center justify-center active:scale-95"
              >
                B
              </button>
              <button
                onClick={() => handleCommand('tracks')}
                className="w-9 h-9 rounded-full bg-geeko-500 border-2 border-black font-pixel text-[9px] text-black font-bold flex items-center justify-center active:scale-95 -mt-2"
              >
                A
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between text-[8px] font-pixel text-slate-500 pb-2">
        <span>NEWTON SCHOOL OF TECHNOLOGY · BENGALURU</span>
        <span className="text-geeko-400">GNU / LINUX 6.12 GEEKO</span>
      </div>
    </section>
  );
}
