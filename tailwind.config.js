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
        studio: {
          bg: '#0A0A0A',
          card: '#121212',
          cardHover: '#181818',
          border: '#232323',
          borderLight: '#323232',
          red: '#8B0000', // TRA Studio primary brand red (deep red) #8B0000
          redHover: '#A00000', // Hover / pressed shade of the brand red
          burgundy: '#8B0000',
          burgundyLight: '#A00000',
          burgundyDark: '#5C0000',
          muted: '#8E8E93',
          subtle: '#5A5A60',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
