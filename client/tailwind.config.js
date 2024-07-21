module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '7/20': '35%',
        '13/20': '65%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
