/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#4f46e5",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: false,
    logs: false,
    utils: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
