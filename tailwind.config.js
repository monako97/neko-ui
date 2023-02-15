/* eslint-disable @typescript-eslint/no-var-requires */
// const plugin = require('tailwindcss/plugin');

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
        primary: 'var(--primary-color, #5794ff)',
        primaryBg: 'var(--primary-color-bg, #f0f8ff)',
        primaryBorder: 'var(--primary-color-border, #d1e7ff)',
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
  // plugins: [
  //   plugin(function ({ addUtilities }) {
  //     addUtilities({
  //       '.transition-basic': {
  //         transitionDuration: 'var(--transition-duration)',
  //         transitionTimingFunction: 'var(--transition-timing-function)',
  //       },
  //     });
  //   }),
  // ],
};

module.exports = conf;
