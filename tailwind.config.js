/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        geeko: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#73ba25', // openSUSE primary green
          600: '#5ea01c',
          700: '#173f35', // openSUSE dark forest
          800: '#0f2922',
          900: '#0a1d18',
          950: '#050f0c',
        },
        cyber: {
          black: '#040807',
          darker: '#080e0c',
          card: '#0c1613',
          border: '#162e24',
          hover: '#1b382c',
          neon: '#00ff88',
          emerald: '#10b981',
          lime: '#a3e635',
          gold: '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(115, 186, 37, 0.3)' },
          'to': { boxShadow: '0 0 25px rgba(115, 186, 37, 0.7)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
