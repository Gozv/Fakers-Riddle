import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'curious-blue': {

          '50': '#f2f8fd',
          '100': '#e4effa',
          '200': '#c4dff3',
          '300': '#8fc5ea',
          '400': '#54a6dc',
          '500': '#3392d1',
          '600': '#1e6fab',
          '700': '#1a588a',
          '800': '#194c73',
          '900': '#1a4060',
          '950': '#112940',
        },

      }
    },
  },
  plugins: [
    daisyui
  ],
}

