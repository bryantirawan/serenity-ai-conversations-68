
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
				// Custom colors for the therapist app
				serenity: {
					50: '#f2f1ff',
					100: '#e6e3ff',
					200: '#d0ceff',
					300: '#b0a8ff',
					400: '#8b7af9',
					500: '#7a5eff',
					600: '#653cec',
					700: '#5a2bd1',
					800: '#4b25ab',
					900: '#3e218c',
					950: '#27154d',
				},
				calm: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#b9e6fe',
					300: '#7cd4fd',
					400: '#36bffa',
					500: '#0ca6f1',
					600: '#0284ce',
					700: '#026aa7',
					800: '#065986',
					900: '#0b4a6e',
					950: '#082f49',
				},
				warmth: {
					50: '#fff8ed',
					100: '#ffefd4',
					200: '#ffdba8',
					300: '#ffc170',
					400: '#ff9d3b',
					500: '#ff7a15',
					600: '#ee5d08',
					700: '#c54509',
					800: '#9d3710',
					900: '#7f2f10',
					950: '#451604',
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
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-in',
				'float': 'float 6s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'therapy-gradient': 'linear-gradient(to right bottom, rgb(120, 119, 198), rgb(171, 144, 195))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
