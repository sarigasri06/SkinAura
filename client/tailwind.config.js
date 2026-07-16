/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Korean Skincare — Cream + Chocolate Brown Palette
        // Cream #F8F5F0 → Warm Beige #E8D8C4 → Chocolate Brown #6F4E37 → Dark Brown #3E2723
        rose: {
          50:  '#F8F5F0',  // Cream — main background
          100: '#E8D8C4',  // Warm Beige — cards, sections
          200: '#D9C3A8',  // Warm Beige border
          300: '#C4A882',  // Transition
          400: '#9A7B5A',  // Muted chocolate
          500: '#6F4E37',  // Chocolate Brown — navbar, buttons, icons, links, accents
          600: '#5E3F2B',  // Dark chocolate hover
          700: '#4D3422',  // Semi-dark — labels
          800: '#3E2723',  // Dark Brown — headings, body text
          900: '#2E1B18',  // Darkest — footer
          950: '#1E100E',  // Deepest accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
