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
        ink: '#10221C',
        muted: '#51615B',
        line: '#D9DED9',
        paper: '#FFFFFF',
        soft: '#F1F3EF',
        accent: '#245B46',
        gold: '#9A6B25'
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans)',
          'ui-sans-serif',
          'system-ui',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans SC',
          'Microsoft YaHei',
          'Arial',
          'sans-serif'
        ],
        serif: ['var(--font-noto-serif)', 'Noto Serif SC', 'Songti SC', 'SimSun', 'serif']
      },
      boxShadow: {
        soft: '0 2px 8px rgba(16, 34, 28, 0.06)',
        lifted: '0 12px 32px -4px rgba(16, 34, 28, 0.10)'
      }
    }
  },
  plugins: [typography]
};

export default config;
