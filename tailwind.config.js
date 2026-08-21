/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          ivory: "#F5F3EE",
          surface: "#FFFFFF",
          muted: "#EFECE6",
          dark: "#141416"
        },
        text: {
          charcoal: "#111111",
          muted: "#6F6F6A",
          light: "#F5F3EE"
        },
        accent: {
          cobalt: "#2457FF",
          terracotta: "#E06D53",
          sage: "#5B8266",
          amber: "#D97706"
        },
        border: {
          light: "rgba(17, 17, 17, 0.12)",
          subtle: "rgba(17, 17, 17, 0.06)",
          dark: "rgba(255, 255, 255, 0.12)"
        }
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Clash Display', 'sans-serif'],
        mono: ['Clash Display', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
