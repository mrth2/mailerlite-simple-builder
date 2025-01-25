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
        primary: '#2a2a2b',
        accent: '#09c269',
        neutral: '#f4f7fa',
      }
    },
  },
  plugins: [],
}
