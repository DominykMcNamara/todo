/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "0px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1200px",
    },
    colors: {
      veryLight: "#FFF5E4",
      light: "#FFC4C4",
      medium: "#EE6983",
      dark: "#850E35",
      textReg: "#495464"
      
    },
    extend: {},
  },
  plugins: [],
}
