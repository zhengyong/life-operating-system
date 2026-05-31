import type {Config} from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#171717',
        muted: '#5F6368',
        line: '#E8EAED',
        paper: '#FFFFFF',
        soft: '#F7F8FA',
        accent: '#0F766E',
        gold: '#B7791F'
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans SC',
          'Microsoft YaHei',
          'Arial',
          'sans-serif'
        ],
        serif: ['Georgia', 'Noto Serif SC', 'SimSun', 'serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(23, 23, 23, 0.08)'
      }
    }
  },
  plugins: [typography]
};

export default config;
