import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'retro-black': '#0a0a0a',
        'retro-dark': '#1a1a1a',
        'retro-gray': '#2a2a2a',
      },
      boxShadow: {
        'neon': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14',
        'neon-sm': '0 0 3px #39FF14, 0 0 6px #39FF14',
        'neon-lg': '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14',
            textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14'
          },
          '50%': { 
            boxShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14',
            textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14'
          },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
          },
          '20%, 24%, 55%': {
            opacity: '0.8',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
