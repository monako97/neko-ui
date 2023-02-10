/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
const conf = {
  content: {
    relative: true,
    files: ['./site/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx,mdx}'],
  },
  prefix: 'n-',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        primaryDeprecatedBg: 'var(--primary-color-deprecated-bg)',
        primaryDeprecatedBorder: 'var(--primary-color-deprecated-border)',
        secondary: 'var(--text-color-secondary)',
        component: 'var(--component-background, rgba(255,255,255,0.8))',
        borderColor: 'var(--border-color-base, #d9d9d9)',
        current: 'currentColor',
        color: 'var(--text-color,rgba(0,0,0,0.65))',
        header: 'var(--header-bg,rgba(255,255,255,0.8))',
        heading: 'var(--heading-color,rgba(255,255,255,0.85))',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius-base)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { rootStatusColor, rootStatusColorDark } = require('@moneko/core/build/variables');

      addBase({
        ':root': {
          '--component-background': 'rgba(255,255,255,0.8)',
          '--border-radius-base': '4px',
          ...rootStatusColor,
        },
        '[data-theme="dark"]': {
          '--component-background': 'rgba(20, 20, 20, 0.8)',
          '--readme-bg': '#171717',
          '--footer-bg': '#000000',
          ...rootStatusColorDark,
        },
        '.before-content-empty::before': {
          display: 'block',
          content: '"" !important',
        },
        '.after-content-empty::after': {
          display: 'block',
          content: '"" !important',
        },
      });

      const transitionBasic = {
        transitionDuration: 'var(--transition-duration)',
        transitionTimingFunction: 'var(--transition-timing-function)',
      };

      addUtilities({
        '.backdrop-blur': {
          backdropFilter: 'blur(16px)',
        },
        '.border-base': {
          border: '1px solid var(--border-color-base, #d9d9d9)',
        },
        '.transition-s-bg-b': {
          ...transitionBasic,
          transitionProperty: 'box-shadow, background-color, border-color',
        },
        '.transition-bg-transform': {
          ...transitionBasic,
          transitionProperty: 'background-color, transform',
        },
        '.transition-bg-c': {
          ...transitionBasic,
          transitionProperty: 'background-color, color',
        },
        '.transition-coverage': {
          ...transitionBasic,
          transitionProperty: 'box-shadow, background-color, border-color, color',
        },
        '.transition-border': {
          ...transitionBasic,
          transitionProperty: 'border-color',
        },
        '.transition-bg': {
          ...transitionBasic,
          transitionProperty: 'background-color',
        },
        '.text-shadow': {
          textShadow: '2px 2px 2px var(--text-shadow-color)',
        },
        '.shadow-small': {
          boxShadow: 'var(--box-shadow-small)',
        },
      });
    }),
  ],
};

module.exports = conf;
