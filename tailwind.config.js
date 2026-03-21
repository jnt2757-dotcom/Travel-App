/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gold — deeper bronze for strong contrast on tan backgrounds
        'gold': '#8A5E1C',
        'gold-light': '#A87828',
        'gold-dark': '#5A3C10',
        // Tan / parchment palette — warm luxury, not dark
        'dark': '#EDE0C8',          // Main background: warm tan parchment
        'dark-card': '#F5EAD8',     // Card surface: lighter parchment
        'dark-card-hover': '#FBF4EC', // Hover: near-white parchment
        'dark-border': '#D4BFA8',   // Borders: warm tan
        'dark-border-hover': '#C4A888', // Border hover: deeper tan
        // Text — espresso on parchment
        'cream': '#1C120A',         // Main text: rich espresso
        'cream-muted': '#7A6248',   // Muted text: warm brown
        'luxury-red': '#8B2A18',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8A5E1C 0%, #A87828 50%, #8A5E1C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #EDE0C8 0%, #F5EAD8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
