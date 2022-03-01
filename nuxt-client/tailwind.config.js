const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    colors: {
      blue: colors.blue,
      gray: colors.slate,
      green: colors.green,
      primary: colors.blue,
      red: colors.red,
      secondary: colors.teal,
      teal: colors.teal,
      transparent: colors.transparent,
      white: colors.white,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
        sm: '1.5rem',
      },
      screens: {
        lg: '1024px',
        md: '768px',
        sm: '640px',
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
