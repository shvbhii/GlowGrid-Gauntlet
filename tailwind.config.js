// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables the dark mode toggle
  theme: {
    extend: {
      colors: {
        'neon-pink': '#F50057',
        'neon-blue': '#00B0FF',
        'dark-bg': '#121212',
        'light-bg': '#F5F5F5',
      },
      fontFamily: {
        'sans': ['"Orbitron"', 'sans-serif'], // A futuristic font
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00B0FF, 0 0 20px #00B0FF, 0 0 30px #00B0FF',
        'neon-pink': '0 0 5px #F50057, 0 0 20px #F50057, 0 0 30px #F50057',
        'glow': '0 0 15px rgba(255, 255, 255, 0.2)',
      },
      textShadow: {
        'neon-blue': '0 0 5px #00B0FF, 0 0 10px #00B0FF',
        'neon-pink': '0 0 5px #F50057, 0 0 10px #F50057',
      }
    },
  },
  plugins: [
    // A simple plugin to add text-shadow utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {}
      Object.entries(theme('textShadow')).forEach(([name, value]) => {
        newUtilities[`.text-shadow-${name}`] = { textShadow: value }
      })
      addUtilities(newUtilities)
    }
  ],
}