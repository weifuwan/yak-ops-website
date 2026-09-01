/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        yak: ['var(--yak-font-family)'],
      },
    },
  },
};
