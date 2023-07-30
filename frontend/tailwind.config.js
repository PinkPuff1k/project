module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: { 300: "#e5dfdf", 500: "#959595" },
        black: { 900: "#000000", "900_33": "#00000033", "900_70": "#00000070" },
        blue_gray: { 400: "#6ba8a9", 600: "#357376", 800: "#1d4d4f" },
        red: { 200: "#d99898" },
        white: { A700: "#ffffff" },
      },
      fontFamily: { inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
