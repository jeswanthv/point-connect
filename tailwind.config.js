module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#EC5F5F",
        secondary: "#fff",
        accent: "#f00",
        background: "#f0f0f0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
