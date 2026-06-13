import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './components/**/*.{vue,js}',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [typography],
}
