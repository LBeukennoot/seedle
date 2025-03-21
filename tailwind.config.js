/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  
    safelist: [
      'text-xl',
      'text-2xl',
      'text-3xl',
      'text-4xl',
      'text-5xl',
      'text-blue',
      'text-red',
      'text-green',
    ],
  
    theme: {
      colors: {
        'red': {
          DEFAULT: '#dd9787'
        },
        'green': {
          DEFAULT: '#678d58'
        },
        'light-green': '#a6c48a',
        'blue': {
          DEFAULT: '#80a1c1'
        },
        'champagne': '#f6e7cb'
      },
  
  
      extend: {
        fontFamily: {
          sans: ['Lexend', 'sans-serif'],
          serif: ['Georgia', 'serif'],
        },
        borderRadius: {
          'full': '1000px',
          'normal': '0.8rem'
        },
        spacing: {
          '120': '30rem',
          '140': '35rem',
          '160': '40rem',
          '180': '45rem',
        },
        dropShadow: {
          'sm': '0px 0px 3px black',
          '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
          ]
        },
        maxWidth: {
          '8xl': '95rem'
        },
        width: {
          '8xl': '95rem'
        },
  
        minHeight: {
          '180': '45rem',
        },
  
        keyframes: {
          bounceleft: {
            '0%, 100%': { transform: 'translateX(-3%)' },
            '50%': { transform: 'none' },
          },
          bounceright: {
            '0%, 100%': { transform: 'translateX(3%)' },
            '50%': { transform: 'none' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(12%)' },
            '50%': { transform: 'none' },
          },
          zoompulse: {
            '0%, 100%': {scale: "70%"},
            '50%': {scale: "100%"}
          }
        },
        animation: {
          'bounce-left': 'bounceleft 1s ease-in-out infinite',
          'bounce-right': 'bounceright 1s ease-in-out infinite',
          'float': 'float 4s ease-in-out infinite',
          'zoom-pulse': 'zoompulse 2s ease-in-out infinite'
        },
      },
    },
    plugins: [],
  }