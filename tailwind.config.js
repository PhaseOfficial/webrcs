/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			montserrat: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		animation: {
  			marquee: 'marquee 10s linear infinite'
  		},
  		keyframes: {
  			marquee: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			}
  		},
  		colors: {
  			brand: {
  				light: '#ef4444',
  				DEFAULT: '#dc2626',
  				dark: '#b91c1c'
  			},
  			accent: {
  				light: '#f87171',
  				DEFAULT: 'hsl(var(--accent))',
  				dark: '#dc2626',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a'
  			},
  			success: {
  				light: '#22c55e',
  				DEFAULT: '#16a34a',
  				dark: '#15803d'
  			},
  			warning: {
  				light: '#facc15',
  				DEFAULT: '#eab308',
  				dark: '#ca8a04'
  			},
  			danger: {
  				light: '#ef4444',
  				DEFAULT: '#dc2626',
  				dark: '#b91c1c'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': '#FFFFFF',
  			navigation: '#dfe0db',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
      require("tailwindcss-animate")
],
};
