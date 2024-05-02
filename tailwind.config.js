/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#633CFF",
        secondary : "#BEADFF",
        background : "#FAFAFA",
        "dark-gray" : "#333333",
        "borders" : "#737373",
        "light-gray" : "#D9D9D9",
        "red" : "#FF3939"
      }
    },
  },
  plugins: [],
};
