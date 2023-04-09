const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: colors.white,
        main: colors.lime,
        accent: colors.green,
        gray: colors.gray,
        error: colors.red,
      },
      gridTemplateColumns: {
        indexTable: "auto 1fr",
      },
    },
  },
  plugins: [],
};
