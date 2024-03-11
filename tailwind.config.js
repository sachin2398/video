/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#04152d",
      },
      width: {
        thirtyPercent: "30%",
        seventyPercent: "70%",
      },
      height: {
        eightyView: "80vh",
      },
      backgroundColor: {
        customBlack: "#020c1b",
      },
    },
  },
  plugins: [],
};
