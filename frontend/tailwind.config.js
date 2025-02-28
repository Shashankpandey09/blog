/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'],
      },
      textShadow: {
        'neon': '0 0 8px #d4a373, 0 0 16px #d4a373',
        'pixel': '2px 2px 0 #404040'
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'typewriter': 'typewriter 1.5s steps(40) forwards'
      }
    },
  },
  plugins: [],
}