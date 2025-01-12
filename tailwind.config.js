/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sf: ["'San Francisco'", "sans-serif"],
      },
      colors: {
        "accent-1": "#c4f85c",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "to": { transform: "translateX(calc(-100% - 2rem))" },
        },
      },
    },
  },
  plugins: [],
};
