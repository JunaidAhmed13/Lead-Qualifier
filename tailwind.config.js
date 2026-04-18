/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        'bg-base': '#080810',
        'bg-surface': '#0f0f1a',
        'bg-elevated': '#16162a',
        border: '#1e1e35',
        'border-bright': '#2d2d50',
        'accent-primary': '#4f6ef7',
        'accent-secondary': '#e8612a',
        'text-primary': '#f2f2f8',
        'text-secondary': '#8888aa',
        'text-muted': '#44445a',
        success: '#22d37a',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      animation: {
        'blob-slow': 'blob 20s infinite ease-in-out',
        'shimmer': 'shimmer 1.5s infinite',
        'draw': 'draw 0.8s ease forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 50px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(79, 110, 247, 0.3)',
        'glow-sm': '0 0 10px rgba(79, 110, 247, 0.2)',
        'glow-orange': '0 0 20px rgba(232, 97, 42, 0.3)',
      },
    },
  },
  plugins: [],
}
