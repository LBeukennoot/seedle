/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  
    safelist: [
      // 'text-xl',
      // 'text-2xl',
      // 'text-3xl',
      // 'text-4xl',
      // 'text-5xl',
      // 'text-blue',
      // 'text-red',
      // 'text-green',
    ],
  
    theme: {
      // colors: {
      //   'red': {
      //     DEFAULT: '#dd9787'
      //   },
      //   'green': {
      //     DEFAULT: '#678d58'
      //   },
      //   'light-green': '#a6c48a',
      //   'blue': {
      //     DEFAULT: '#80a1c1'
      //   },
      //   'champagne': '#f6e7cb'
      // },
  
  
      extend: {
        fontFamily: {
          sans: ['Lexend', 'sans-serif'],
          serif: ['Georgia', 'serif'],
        },
      },
    },
    plugins: [],
  }