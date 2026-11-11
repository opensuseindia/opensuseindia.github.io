// Web Audio API Synthesizer - Exact Reproduction of Synergy Sound System
// Sine clicks, Sawtooth glitches, Square arpeggios, CRT hum, Slot machine reels & fanfares

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = typeof window !== 'undefined' ? localStorage.getItem('geeko_sound_muted') === 'true' : false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('geeko_sound_muted', String(this.muted));
    }
    return this.muted;
  }

  // Synergy click: Sine wave @ 600Hz decaying in 0.08s
  click() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t.currentTime);
      gain.gain.setValueAtTime(0.04, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, t.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.08);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  // Synergy glitch: Sawtooth wave dropping from 800Hz to 100Hz in 0.18s
  glitch() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, t.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, t.currentTime + 0.18);
      gain.gain.setValueAtTime(0.03, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, t.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.18);
    } catch {
      // ignore
    }
  }

  // Synergy success fanfare: Square wave arpeggio [261.63, 329.63, 392, 523.25]
  success() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const chord = [261.63, 329.63, 392, 523.25]; // C4, E4, G4, C5
      chord.forEach((freq, idx) => {
        const osc = t.createOscillator();
        const gain = t.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.025, t.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t.currentTime + idx * 0.06 + 0.14);
        osc.connect(gain);
        gain.connect(t.destination);
        osc.start(t.currentTime + idx * 0.06);
        osc.stop(t.currentTime + idx * 0.06 + 0.14);
      });
    } catch {
      // ignore
    }
  }

  // Synergy CRT hum: Low sine wave @ 150Hz
  crt() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t.currentTime);
      gain.gain.setValueAtTime(0.05, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, t.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.25);
    } catch {
      // ignore
    }
  }

  // Slot machine mechanical reel tick
  tick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950 + Math.random() * 200, t.currentTime);
      gain.gain.setValueAtTime(0.03, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, t.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.035);
    } catch {
      // ignore
    }
  }

  // Slot machine lever pull sound
  leverPull() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, t.currentTime + 0.12);
      gain.gain.setValueAtTime(0.035, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, t.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Subtle hover chirp
  hover() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, t.currentTime + 0.04);
      gain.gain.setValueAtTime(0.015, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, t.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.04);
    } catch {
      // ignore
    }
  }

  // Terminal keystroke / beep
  terminalBeep() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx;
      const osc = t.createOscillator();
      const gain = t.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(820, t.currentTime);
      gain.gain.setValueAtTime(0.02, t.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, t.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(t.destination);
      osc.start();
      osc.stop(t.currentTime + 0.04);
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundController();
