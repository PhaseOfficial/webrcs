/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        brand: {
          light: '#ef4444', // red-500
          DEFAULT: '#dc2626', // red-600
          dark: '#b91c1c', // red-700
        },
        accent: {
          light: '#f87171', // red-400
          DEFAULT: '#ef4444', // red-500
          dark: '#dc2626', // red-600
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          light: '#22c55e',
          DEFAULT: '#16a34a',
          dark: '#15803d',
        },
        warning: {
          light: '#facc15',
          DEFAULT: '#eab308',
          dark: '#ca8a04',
        },
        danger: {
          light: '#ef4444',
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
        },
        primary: '#1b2121',  // Replace with your actual color value
        'primary-foreground': '#FFFFFF',  // Replace with your actual color value
        navigation: '#dfe0db',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      // Example custom utility
      addUtilities({
        '.custom-utility': {
          display: 'inline-block',
          padding: '0.5rem',
          backgroundColor: '#1b2121',
        },
      });
    }),
  ],
};
