/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', 'class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
      cursor: {
        custom: "url('./public/cursours/icons8-select-cursor-30.png'), auto",
        pointer: "url('./public/cursours/icons8-hand-cursor-30.png'), auto",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
