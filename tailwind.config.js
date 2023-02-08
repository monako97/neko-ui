/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const conf = {
  content: {
    relative: true,
    files: [
      './node_modules/@moneko/core/template/index.html',
      './site/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx,mdx}',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
  },
  prefix: 'n-',
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primaryBase: '#1890ff',
        primary: 'var(--primary-color)',
        primaryDeprecatedBg: 'var(--primary-color-deprecated-bg)',
        primaryDeprecatedBorder: 'var(--primary-color-deprecated-border)',
        secondary: 'var(--text-color-secondary)',
        component: 'var(--component-background, rgba(255,255,255,0.8))',
        borderColor: 'var(--border-color-base, #d9d9d9)',
        current: 'currentColor',
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        DEFAULT: 'var(--border-radius-base)',
      },
      transitionProperty: {
        // 'bg-transform': 'background-color, transform',
      },
      transitionTimingFunction: {
        normal: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      animation: {
        'silde-in': 'silde-in var(--transition-duration) var(--transition-timing-function)',
      },
      keyframes: {
        'silde-in': {
          '0%': { opacity: '0.2', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
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
        '[data-theme=dark]': {
          ...rootStatusColorDark,
          '--component-background': 'rgba(20, 20, 20, 0.8);',
          '--readme-bg': '#171717',
          '--footer-bg': '#000',
        },
        body: {
          overflowY: 'hidden',
        },
        'body,html': {
          userSelect: 'auto',
        },
        '#doc-body::-webkit-scrollbar': {
          display: 'none',
        },
      });

      const transitionBasic = {
        transitionDuration: 'var(--transition-duration)',
        transitionTimingFunction: 'var(--transition-timing-function)',
      };

      addUtilities({
        '.border-base': {
          border: '1px solid var(--border-color-base, #d9d9d9)',
        },
        '.transition-basic': transitionBasic,
        '.transition-s-bg-b': {
          transitionProperty: 'box-shadow, background-color, border-color',
          ...transitionBasic,
        },
        '.transition-bg-transform': {
          transitionProperty: 'background-color, transform',
          ...transitionBasic,
        },
        '.transition-bg-c': {
          transitionProperty: 'background-color, color',
          ...transitionBasic,
        },
        '.transition-coverage': {
          transitionProperty: 'box-shadow, background-color, border-color, color',
          ...transitionBasic,
        },
        '.transition-snapshot': {
          transitionProperty: 'border-color, background-color, box-shadow, padding, height',
          ...transitionBasic,
        },
        '.transition-bg': {
          transitionProperty: 'background-color',
          ...transitionBasic,
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
