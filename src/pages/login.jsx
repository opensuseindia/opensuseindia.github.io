import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  User,
  Key,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { sounds } from '../lib/sound';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    sounds.click();

    try {
      const loggedUser = await login(email, password);
      sounds.success();
      toast(`Signed in as ${loggedUser.name} (${loggedUser.role})!`, 'success');
      if (loggedUser.role === 'admin' || loggedUser.role === 'judge') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast(err.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const quickFill = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    sounds.hover();
  };

  return (
    <div className="pt-28 pb-20 max-w-md mx-auto px-4">
      {/* Upper Chameleon Logo & Header */}
      <div className="text-center mb-8">
        <div className="inline-block relative mb-3 group">
          <div className="absolute -inset-1 rounded-full bg-[#73ba25]/30 blur-md group-hover:bg-[#73ba25]/50 transition-all duration-300" />
          <img
            src={`${import.meta.env.BASE_URL}opensuse-logo.png`}
            alt="openSUSE Chameleon"
            className="relative w-14 h-14 rounded-full ring-2 ring-[#73ba25]/70 shadow-[0_0_20px_rgba(115,186,37,0.4)] mx-auto object-cover"
          />
        </div>

        <h1 className="font-pixel text-xl sm:text-2xl text-white tracking-wider drop-shadow-[0_0_15px_rgba(115,186,37,0.3)]">
          PORTAL SIGN IN
        </h1>
        <p className="text-slate-400 text-xs font-mono mt-1.5">
          Access your Digital Event Pass, Team Hub, or Admin Operations.
        </p>
      </div>

      {/* Already Logged In Banner */}
      {isAuthenticated && (
        <div className="mb-6 p-4 rounded-2xl bg-[#081710] border border-[#73ba25]/40 text-xs font-mono shadow-[0_0_20px_rgba(115,186,37,0.15)]">
          <div className="flex items-center gap-2 text-geeko-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Signed in as <strong className="text-white">{user?.name}</strong> ({user?.role})
            </span>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-[#173f35]">
            <Link
              to={user?.role === 'admin' || user?.role === 'judge' ? '/admin' : '/dashboard'}
              className="flex-1 py-2 text-center rounded-lg bg-[#73ba25] text-black font-bold text-xs hover:bg-[#85d82c] transition-colors"
            >
              Open My Portal →
            </Link>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                logout();
              }}
              className="px-3 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Sign In Card */}
      <div className="bg-[#050d09]/95 border border-[#173f35] rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl font-mono text-xs">
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com or admin@opensuse.org"
                className="w-full bg-[#040806] border border-[#173f35] focus:border-cyan-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-slate-300 text-xs font-mono font-medium block mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Password
              </span>
              <span className="text-[10px] text-slate-500">Default: admin2027</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#040806] border border-[#173f35] focus:border-amber-400 hover:border-[#1e5043] rounded-xl px-4 py-2.5 pr-10 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all focus:ring-1 focus:ring-amber-400/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#73ba25] hover:bg-[#85d82c] border border-[#a3e635] text-[#040807] font-pixel text-[10px] sm:text-[10.5px] font-bold tracking-wider transition-all shadow-[0_3px_0_#2b5714,0_0_20px_rgba(115,186,37,0.4)] active:translate-y-1 active:shadow-[0_1px_0_#2b5714] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isLoading ? 'AUTHENTICATING...' : '⚡ SIGN IN TO PORTAL'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Instant Demo Role Switcher */}
        <div className="mt-7 pt-5 border-t border-[#173f35]">
          <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block mb-2.5 text-center tracking-wider">
            ⚡ Quick 1-Click Role Testing:
          </span>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => quickFill('aarav@example.com', 'admin2027')}
              className="w-full p-2.5 rounded-xl bg-[#040806] border border-[#173f35] hover:border-[#73ba25]/50 text-left flex items-center justify-between text-[11px] text-slate-300 hover:text-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#73ba25]/20 flex items-center justify-center text-[#73ba25]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-[#73ba25] transition-colors">
                    Aarav Sharma
                  </div>
                  <div className="text-[9.5px] text-slate-500">Participant · Newton School of Tech</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#73ba25]/15 border border-[#73ba25]/40 text-[#a3e635] font-mono text-[10px] font-bold">
                Auto-fill
              </span>
            </button>

            <button
              type="button"
              onClick={() => quickFill('admin@opensuse.org', 'admin2027')}
              className="w-full p-2.5 rounded-xl bg-[#040806] border border-[#173f35] hover:border-amber-500/50 text-left flex items-center justify-between text-[11px] text-slate-300 hover:text-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                    Divyanshu Prakash
                  </div>
                  <div className="text-[9.5px] text-slate-500">Organizer / Admin Console</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                Auto-fill
              </span>
            </button>

            <button
              type="button"
              onClick={() => quickFill('judge@opensuse.org', 'admin2027')}
              className="w-full p-2.5 rounded-xl bg-[#040806] border border-[#173f35] hover:border-cyan-500/50 text-left flex items-center justify-between text-[11px] text-slate-300 hover:text-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Rithull Raj Kallat
                  </div>
                  <div className="text-[9.5px] text-slate-500">Judge / Buildathon Scoring</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold">
                Auto-fill
              </span>
            </button>
          </div>
        </div>

        {/* Link to Register */}
        <div className="mt-5 text-center text-slate-400 text-[11px] font-mono">
          Don't have a builder pass?{' '}
          <Link to="/register" className="text-[#73ba25] hover:underline font-semibold">
            Apply for Free (250 Cap) →
          </Link>
        </div>
      </div>
    </div>
  );
}
