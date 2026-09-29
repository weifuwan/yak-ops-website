/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/web/**/*.{js,jsx,ts,tsx}', './packages/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'yak-brand': 'var(--yak-brand-color)',
        'yak-brand-hover': 'var(--yak-brand-color-hover)',
        'yak-brand-soft': 'var(--yak-brand-color-soft)',
        'yak-page': 'var(--yak-page-background)',
        'yak-text': 'var(--yak-text-primary)',
        'yak-muted': 'var(--yak-text-secondary)',
        'yak-border': 'var(--yak-border-color)',
      },
      fontFamily: {
        sans: ['var(--yak-font-sans)'],
        serif: ['var(--yak-font-serif)'],
        mono: ['var(--yak-font-mono)'],
        yak: ['var(--yak-font-sans)'],
        'yak-serif': ['var(--yak-font-serif)'],
        'yak-mono': ['var(--yak-font-mono)'],
      },
    },
  },
};
