/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#7D9E6A',
        'gold-light': '#B2C9A0',
        'gold-dark': '#4A6B3C',
        'dark': '#0B0F08',
        'dark-card': '#101509',
        'dark-card-hover': '#161D0F',
        'dark-border': '#243020',
        'dark-border-hover': '#3A4E2E',
        'cream': '#ECE8D5',
        'cream-muted': '#8A9678',
        'luxury-red': '#7B4A2A',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #7D9E6A 0%, #B2C9A0 50%, #7D9E6A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B0F08 0%, #101509 100%)',
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
