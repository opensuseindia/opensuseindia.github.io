import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Shield, MessageSquare, Send, CheckCircle2, Users } from 'lucide-react';
import { sounds } from '../../lib/sound';

export default function ContactTerminalSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.success();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: 'general', msg: '' });
    }, 4000);
  };

  return (
    <section
      id="contact-us"
      className="relative w-full min-h-[calc(100svh-4rem)] lg:h-[calc(100vh-4rem)] snap-start snap-always overflow-y-auto lg:overflow-hidden border-b-4 border-[#173f35] bg-[#050e0b] px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between select-none"
    >
      <div className="max-w-5xl mx-auto w-full pt-1">
        {/* Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-3">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#081510] border border-geeko-500/40 text-geeko-400 font-pixel text-[8px] mb-1">
            <MessageSquare className="w-3 h-3" />
            <span>DISPATCH &amp; EMERGENCY COMMS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white uppercase tracking-wider">
            Organizing Team &amp; Dispatch
          </h2>
          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
            Reach the organizing team or review on-site emergency escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-auto">
          {/* Left: Contact Info */}
          <div className="space-y-3">
            <div className="p-3.5 bg-[#081510] border-2 border-black shadow-[inset_-2px_-2px_0_0_#173f35]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-geeko-400" />
                  <h3 className="font-pixel text-xs text-white uppercase">
                    Newton School of Technology
                  </h3>
                </div>
                <a
                  href="#venue"
                  onClick={() => sounds.click()}
                  className="text-[9.5px] font-mono text-geeko-400 hover:underline flex items-center gap-1"
                >
                  <span>Interactive Map &uarr;</span>
                </a>
              </div>
              <p className="font-mono text-[11px] text-slate-300 leading-snug">
                S-VYASA Sattva Global City Campus, Mysore Road, Bengaluru.
              </p>
              <div className="font-mono text-[10px] text-slate-400 space-y-0.5 mt-1.5">
                <div>• Load tested power circuits &amp; WiFi for 350+ devices</div>
                <div>• Overnight building permission secured under college MoU</div>
              </div>
            </div>

            <div className="p-3.5 bg-[#081510] border-2 border-black shadow-[inset_-2px_-2px_0_0_#173f35]">
              <div className="font-pixel text-[10px] text-white uppercase mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>Direct Lead Dispatch</span>
                </span>
                <Link
                  to="/about"
                  onClick={() => sounds.click()}
                  className="text-[9px] font-mono text-geeko-400 hover:text-white flex items-center gap-1 underline transition-colors"
                >
                  <Users className="w-3 h-3" />
                  <span>Know More &rarr;</span>
                </Link>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-[#173f35] pb-1">
                  <span className="text-white">Divyanshu Prakash</span>
                  <span className="text-geeko-400">Coordination & Funding</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#173f35] pb-1">
                  <span className="text-white">Dushyant Acharya</span>
                  <span className="text-geeko-400">Venue & Safety</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Rithull Raj Kallat</span>
                  <span className="text-geeko-400">Program & Rules</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/60 border border-amber-500/40 text-[10px] font-mono text-slate-300 flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Safety & Incident Escalation:</strong> Two dedicated safety contacts on duty 24/7 during overnight hours (22:00 to 06:00).
              </div>
            </div>
          </div>

          {/* Right: Dispatch Terminal */}
          <div className="p-4 bg-[#0a1813] border-3 border-black shadow-[inset_-3px_-3px_0_0_#173f35,inset_3px_3px_0_0_#3f7322] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#173f35] pb-1.5 mb-3 font-pixel text-[8px]">
                <span className="text-geeko-400">DISPATCH TERMINAL [ONLINE]</span>
                <span className="text-[#00f0ff]">TLS 1.3 ENCRYPTED</span>
              </div>

              {sent ? (
                <div className="p-4 bg-black/80 border border-geeko-500 text-center my-4">
                  <CheckCircle2 className="w-6 h-6 text-geeko-400 mx-auto mb-1.5" />
                  <div className="font-pixel text-xs text-white uppercase mb-1">
                    Transmission Dispatched!
                  </div>
                  <p className="font-mono text-[10px] text-slate-300">
                    Your dispatch has been logged. The team will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 font-mono text-[11px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-0.5 text-[9px] font-pixel">NAME:</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-[#040a08] border border-[#173f35] p-1.5 text-white focus:outline-none focus:border-geeko-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-0.5 text-[9px] font-pixel">EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@opensuse.org"
                        className="w-full bg-[#040a08] border border-[#173f35] p-1.5 text-white focus:outline-none focus:border-geeko-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-0.5 text-[9px] font-pixel">MESSAGE / QUERY:</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      placeholder="Your question or partnership note..."
                      className="w-full bg-[#040a08] border border-[#173f35] p-1.5 text-white focus:outline-none focus:border-geeko-500 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 btn-pixel-green text-[9px] flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND DISPATCH MESSAGE</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2 mt-3 border-t border-[#173f35] flex items-center justify-between text-[8px] font-pixel text-slate-500">
              <span>openSUSE INDIA</span>
              <span>GITHUB: opensuse-event-blr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-[8px] font-pixel text-slate-500 pb-2">
        <span>NEWTON SCHOOL OF TECHNOLOGY · BENGALURU</span>
        <span className="text-geeko-400">DISPATCH READY</span>
      </div>
    </section>
  );
}
