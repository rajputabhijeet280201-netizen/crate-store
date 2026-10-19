import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#10201C',
        surface: '#F6F7F2',
        accent: {
          DEFAULT: '#C2410C',
          hover: '#9A3412',
          light: '#FFEDD5',
        },
        highlight: {
          DEFAULT: '#E8683A',
          hover: '#C2410C',
        },
        muted: {
          DEFAULT: '#52605B',
          light: '#E2E6DF',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
