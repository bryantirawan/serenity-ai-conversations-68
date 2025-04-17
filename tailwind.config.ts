
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors for the Skyhug app
				skyhug: {
					50: '#e6f0ff',
					100: '#cce0ff',
					200: '#99c2ff',
					300: '#66a3ff',
					400: '#3385ff',
					500: '#2563eb', // Main blue from the image
					600: '#1d4ed8',
					700: '#1e40af',
					800: '#1e3a8a',
					900: '#172554',
					950: '#0f172a',
				},
				cloud: {
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
					950: '#020617',
				},
				serenity: {
					50: '#f0f4ff',
					100: '#e0e9fd',
					200: '#c7d7fc',
					300: '#a4bcf9',
					400: '#809af4',
					500: '#6379ed',
					600: '#4f5ee1',
					700: '#414bc8',
					800: '#3540a2',
					900: '#303b81',
					950: '#1e224a',
				},
				lavender: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065',
				},
				blush: {
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#ec4899',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843',
					950: '#500724',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'float-cloud': {
					'0%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(10px)' },
					'100%': { transform: 'translateX(0)' },
				},
				'wave': {
					'0%': { transform: 'scaleY(0.3)' },
					'50%': { transform: 'scaleY(1)' },
					'100%': { transform: 'scaleY(0.3)' },
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'scale-down': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' },
				},
				'drift-x': {
					'0%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(20px)' },
					'100%': { transform: 'translateX(0)' },
				},
				'drift-y': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(10px)' },
					'100%': { transform: 'translateY(0)' },
				},
				'pulse-wave': {
					'0%, 100%': { transform: 'scaleY(0.3)' },
					'50%': { transform: 'scaleY(1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-in',
				'float': 'float 6s ease-in-out infinite',
				'float-cloud': 'float-cloud 8s ease-in-out infinite',
				'wave': 'wave 1.2s ease-in-out infinite',
				'scale-up': 'scale-up 0.3s ease-out',
				'scale-down': 'scale-down 0.3s ease-out',
				'drift-x': 'drift-x 15s ease-in-out infinite',
				'drift-y': 'drift-y 12s ease-in-out infinite',
				'pulse-wave': 'pulse-wave 1.5s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'therapy-gradient': 'linear-gradient(to right, #2563eb, #3b82f6, #60a5fa)',
				'blue-sky': 'linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)',
				'lavender-blush': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
				'soft-gradient': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
			},
			boxShadow: {
				'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
				'elevation': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
				'card': '0 2px 10px rgba(0, 0, 0, 0.08)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
