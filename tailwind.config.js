/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-family)']
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-neutral)',
      }
    },
  },
  plugins: [],
}
