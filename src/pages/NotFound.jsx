import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, AlertOctagon } from 'lucide-react';
import { sounds } from '../lib/sound';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 font-mono text-center pt-20">
      <div className="max-w-md p-8 rounded-2xl glass-panel-glow border border-red-500/40 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
          <AlertOctagon className="w-8 h-8 animate-pulse" />
        </div>
        <div className="text-red-400 text-xs font-bold uppercase tracking-widest">
          Kernel Panic: Page Not Found (404)
        </div>
        <h1 className="text-3xl font-heading font-extrabold text-white">
          Missing Inode
        </h1>
        <p className="text-slate-400 text-xs leading-relaxed font-sans">
          The requested system route does not exist in the openSUSE Bengaluru 2027 tree.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            onClick={() => sounds.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-geeko-500 hover:bg-geeko-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(115,186,37,0.3)]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Safe Console (/)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
