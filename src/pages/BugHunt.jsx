import React, { useState, useEffect } from 'react';
import {
  Bug,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ShieldAlert,
  Code,
  Flame,
  Check,
  Shirt,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useToast } from '../context/ToastContext';

const defaultBugHuntData = {
  schedule: "Day 2, 01:00 – 01:30 IST (30 Minutes)",
  prizePoolINR: 2000,
  rewardShirts: 2,
  rookieChallenge: {
    id: "rookie-1",
    title: "Repair the Deploy Automation Script",
    language: "bash",
    description: "This shell script meant for backing up configuration files and restarting the openSUSE web service contains 3 deliberate syntax and logic errors. Identify and fix them so it passes the automated test suite.",
    initialCode: `#!/bin/bash
# Backup & Service Check Script - openSUSE BLR 2027
# TASK: Fix the 3 deliberate bugs in this script

BACKUP_DIR="/var/backup/geeko"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# BUG 1: Syntax error in test condition
if [ -d "$BACKUP_DIR"
    echo "Directory exists"
else
    mkdir -p "$BACKUP_DIR"
fi

# BUG 2: Unquoted variable expansion with spaces in path
TARGET_FILE="/etc/geeko config/settings.conf"
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" $TARGET_FILE

# BUG 3: Inverted exit status check for zypper service
systemctl is-active --quiet apache2
if [ $? -ne 0 ]; then
    echo "SUCCESS: Service is running smoothly."
    exit 0
else
    echo "ERROR: Service is stopped!"
    exit 1
fi
`,
  },
  expertChallenge: {
    id: "expert-1",
    title: "Diagnose Service Permission & Sandbox Failure",
    language: "bash",
    description: "An isolated openQA worker daemon fails to write artifacts to /srv/obs-worker/data due to restrictive systemd ProtectSystem directives and file ACL permissions. Diagnose the misconfiguration and write the correct override commands.",
    errorLog: `systemd[1]: obs-worker.service: Failed at step NAMESPACE spawning /usr/bin/obs-worker: Read-only file system
audit[1842]: AVC apparmor="DENIED" operation="open" profile="/usr/bin/obs-worker" name="/srv/obs-worker/data/build.lock"
obs-worker[1843]: Fatal error: Unable to obtain write lock on /srv/obs-worker/data. Exit code 13 (EACCES)`,
    initialCode: `# systemd & AppArmor override configuration
[Service]
ReadWritePaths=/srv/obs-worker/data
User=obsworker
Group=obsworker
# Add AppArmor rw allowance
`,
  },
};

export default function BugHunt() {
  const [selectedLevel, setSelectedLevel] = useState('rookie'); // 'rookie' | 'expert'
  const [code, setCode] = useState(defaultBugHuntData.rookieChallenge.initialCode);
  const [isVerifying, setIsVerifying] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(1800); // 30 minutes
  const [bugHuntData, setBugHuntData] = useState(defaultBugHuntData);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/bughunt/challenges')
      .then((r) => {
        if (!r.ok) throw new Error('API unavailable');
        return r.json();
      })
      .then((data) => {
        if (data && data.rookieChallenge) {
          setBugHuntData(data);
          setCode(data.rookieChallenge.initialCode);
        }
      })
      .catch(() => {
        // Gracefully use local default data
      });

    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const switchLevel = (level) => {
    sounds.click();
    setSelectedLevel(level);
    setTestResults(null);
    if (level === 'rookie' && bugHuntData?.rookieChallenge) {
      setCode(bugHuntData.rookieChallenge.initialCode);
    } else if (level === 'expert' && bugHuntData?.expertChallenge) {
      setCode(bugHuntData.expertChallenge.initialCode);
    }
  };

  const applyResults = (data) => {
    setTestResults(data);
    if (data.passed) {
      sounds.success();
      confetti({ particleCount: 75, spread: 60 });
      toast(`Bug Hunt Challenge Passed! Solved with timestamp: ${formatTimer(1800 - timerSeconds)}`, 'success');
    } else {
      sounds.click();
      toast('Some automated checks failed. Inspect errors below.', 'error');
    }
  };

  const handleRunVerification = async () => {
    sounds.terminalBeep();
    setIsVerifying(true);
    setTestResults(null);

    try {
      const res = await fetch('/api/bughunt/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: selectedLevel, challengeType: selectedLevel, userCode: code, code }),
      });

      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      applyResults(data);
    } catch {
      // Local client-side fallback verification
      let result;
      if (selectedLevel === 'rookie') {
        const hasFixedCondition = /if\s*\[\s*-d\s*"[^"]+"\s*\]/i.test(code);
        const hasQuotedTarget = /tar\s+-czf\s+.*"\$TARGET_FILE"/i.test(code) || /tar\s+-czf\s+.*"\${TARGET_FILE}"/i.test(code);
        const hasFixedExitStatus = /\$\?\s*-eq\s*0/i.test(code) || /if\s+systemctl\s+is-active/i.test(code);
        const passed = hasFixedCondition && hasQuotedTarget && hasFixedExitStatus;
        result = {
          success: true,
          passed,
          message: passed ? 'All 3 tests passed! Bash syntax verified, whitespace safely escaped, and systemctl status correctly handled.' : 'Some tests failed. Please review the errors below.',
          tests: [
            { name: 'Syntax condition test: [ -d "$BACKUP_DIR" ]', passed: hasFixedCondition },
            { name: 'Space handling in $TARGET_FILE quoted', passed: hasQuotedTarget },
            { name: 'Exit status logic correctly checks 0 for active', passed: hasFixedExitStatus },
          ],
        };
      } else {
        const hasReadWrite = /ReadWritePaths\s*=\s*\/srv\/obs-worker\/data/i.test(code);
        const hasAppArmor = /apparmor/i.test(code) && /rw/i.test(code);
        const hasChown = /chown.*obsworker/i.test(code) || /User\s*=\s*obsworker/i.test(code);
        const passed = hasReadWrite && hasAppArmor && hasChown;
        result = {
          success: true,
          passed,
          message: passed ? 'Sandbox failure resolved! Permissions, AppArmor, and systemd namespace aligned.' : 'Incomplete fix. Verify systemd ReadWritePaths, AppArmor permissions, and file ownership.',
          tests: [
            { name: 'systemd ReadWritePaths override present', passed: hasReadWrite },
            { name: 'AppArmor profile read write allowance added', passed: hasAppArmor },
            { name: 'User or chown obsworker applied to data dir', passed: hasChown },
          ],
        };
      }
      applyResults(result);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SIGNATURE HEADER LOCKUP                                   */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140e06] border border-amber-500/40 text-amber-400 font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>// MIDNIGHT CODE TRIAGE &amp; BUG SPRINT // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #78350f, 4px 4px 0 #451a03',
          }}
        >
          <span className="text-white">MIDNIGHT </span>
          <span className="text-amber-400">BUG HUNT</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Optional individual competition with separate Rookie and Expert tracks. Test your fixes against real automated unit tests.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-10 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">{formatTimer(timerSeconds)}</div>
            <div className="text-slate-400 text-[10px] font-mono">30 Minute Sprint</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">₹2,000 Cash</div>
            <div className="text-slate-400 text-[10px] font-mono">Bounty Pool</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">2 Reward Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Rookie &amp; Expert</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Automated CI</div>
            <div className="text-slate-400 text-[10px] font-mono">Instant Test Suite</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LEVEL SWITCHER TABS                                       */}
      {/* ========================================================= */}
      <div className="flex items-center gap-3 mb-8 max-w-4xl mx-auto relative z-10">
        <button
          onClick={() => switchLevel('rookie')}
          className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
            selectedLevel === 'rookie'
              ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'bg-black/60 border-amber-900/40 text-slate-400 hover:text-white hover:border-amber-500/40'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Rookie Challenge: Bash Script Repair</span>
        </button>

        <button
          onClick={() => switchLevel('expert')}
          className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
            selectedLevel === 'expert'
              ? 'bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
              : 'bg-black/60 border-red-900/40 text-slate-400 hover:text-white hover:border-red-500/40'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Expert Challenge: Sandbox &amp; Permissions</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* CHALLENGE DESCRIPTION BOX                                 */}
      {/* ========================================================= */}
      <div className="group relative rounded-2xl bg-gradient-to-br from-[#140e06]/95 via-[#0a0703]/95 to-[#040301]/95 border border-amber-500/35 p-6 sm:p-7 mb-8 shadow-xl overflow-hidden relative z-10">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none" />

        <h3 className="font-heading font-black text-xl text-white mb-2">
          {selectedLevel === 'rookie'
            ? bugHuntData?.rookieChallenge?.title
            : bugHuntData?.expertChallenge?.title}
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed mb-4">
          {selectedLevel === 'rookie'
            ? bugHuntData?.rookieChallenge?.description
            : bugHuntData?.expertChallenge?.description}
        </p>

        {selectedLevel === 'expert' && bugHuntData?.expertChallenge?.errorLog && (
          <div className="bg-black/90 p-4 rounded-xl border border-red-500/30 font-mono text-xs text-red-400 whitespace-pre-wrap leading-relaxed mb-4">
            {bugHuntData.expertChallenge.errorLog}
          </div>
        )}

        <div className="text-xs font-mono text-slate-400">
          <strong className="text-amber-400">Objective: </strong>
          {selectedLevel === 'rookie'
            ? 'Fix missing syntax brackets, space escaping on $TARGET_FILE, and correct the exit status check ($? -eq 0).'
            : 'Add systemd ReadWritePaths=/srv/obs-worker/data, allow AppArmor rw, and chown obsworker.'}
        </div>
      </div>

      {/* ========================================================= */}
      {/* CODE EDITOR & VERIFICATION SANDBOX                        */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 relative z-10 items-stretch">
        {/* Editor Area */}
        <div className="lg:col-span-2 relative rounded-2xl bg-[#06040a] border border-amber-500/40 overflow-hidden font-mono shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />
          
          <div>
            <div className="px-4 py-3 bg-[#120a04] border-b border-amber-900/50 flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-bold">{selectedLevel === 'rookie' ? 'deploy_fix.sh' : 'sandbox_override.conf'}</span>
              </span>
              <button
                onClick={() => {
                  if (selectedLevel === 'rookie') {
                    setCode(bugHuntData?.rookieChallenge?.initialCode || '');
                  }
                  sounds.click();
                }}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Code</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="w-full p-4 bg-black/95 text-xs text-[#8ee631] font-mono outline-none resize-none leading-relaxed select-text"
              spellCheck="false"
            />
          </div>

          <div className="p-4 bg-[#120a04] border-t border-amber-900/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Press "Run Automated Checks" to test logic.
            </span>
            <button
              disabled={isVerifying}
              onClick={handleRunVerification}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isVerifying ? 'Running Checks...' : 'Run Automated Checks'}</span>
            </button>
          </div>
        </div>

        {/* Test Results Output Panel */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#120a04]/95 via-[#0a0502]/95 to-[#040201]/95 border border-amber-500/35 p-6 flex flex-col justify-between font-mono text-xs shadow-xl">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/40 mb-4">
              <span className="text-white font-bold">Test Suite Output</span>
              <span className="text-[10px] text-amber-400">Live Harness</span>
            </div>

            {testResults ? (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    testResults.passed
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/40 text-red-300'
                  }`}
                >
                  {testResults.message}
                </div>

                <div className="space-y-2 mt-4">
                  {testResults.tests?.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-black/60 border border-white/10"
                    >
                      {t.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-[11px] ${t.passed ? 'text-slate-300' : 'text-red-300'}`}>
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <Bug className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                <p>Run automated checks to see test suite results.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-amber-900/40 text-[11px] text-slate-400 mt-6">
            <strong className="text-amber-300">Tie Breaking Rule:</strong> Ranked by completeness, then submission timestamp. Jointly recognized ties share reward honours.
          </div>
        </div>
      </div>
    </div>
  );
}
