import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'concrete': '#CBD5E1',
        'steel': '#475569',
        'raw': '#1E293B',
        'accent': '#F1F5F9',
        'dark': '#0F172A',
      },
      animation: {
        'flicker': 'flicker 2s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      cursor: {
        'crosshair': 'crosshair',
      },
    },
  },
  plugins: [],
}

export default config;
