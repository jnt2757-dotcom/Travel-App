/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#C09A6A',
        'gold-light': '#DCBF90',
        'gold-dark': '#8C6035',
        'dark': '#0D0A08',
        'dark-card': '#141210',
        'dark-card-hover': '#1B1714',
        'dark-border': '#2E2318',
        'dark-border-hover': '#483820',
        'cream': '#F2EDE0',
        'cream-muted': '#9A9080',
        'luxury-red': '#8B2A18',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C09A6A 0%, #DCBF90 50%, #C09A6A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0D0A08 0%, #141210 100%)',
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
