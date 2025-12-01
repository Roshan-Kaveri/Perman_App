/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray_sm: "#6C757D",
        black: "#000000",
        light: "#E9ECEF",
        white: "#FFFFFF",
        gray_md: "#ADB5BD",
        danger: "#F40303",
        success: "#00FF1E",
        gray_xl: "#212529",
        gray_xs: "#DEE2E6",
      },
    },
  },
  plugins: [],
};
