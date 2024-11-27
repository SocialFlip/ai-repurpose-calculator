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
        primary: {
          start: '#9D5CFF',
          mid: '#4B9EFF',
          end: '#4B9EFF',
          DEFAULT: '#4B9EFF',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9D5CFF 0%, #4B9EFF 100%)',
        'gradient-text': 'linear-gradient(135deg, #9D5CFF 0%, #4B9EFF 100%)',
      }
    },
  },
  plugins: [],
}