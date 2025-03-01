import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000", //Most black, for larger background and text
          1: "#343434", //For border
          2: "rgb(14, 17, 22)" //For background
        },
        white: {
          DEFAULT: "#ffffff", //Most white, for text and  background
          1: '#e5e5e5', //For border
          2: "#fafafa", //For larger background
        },
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
          1000: "#303136",
        },
        zinc: "#101010",
      },
      padding: {
        0.5: "0.125rem",
        4.5: "1.125rem",
      },
      transitionDuration: {
        400: "400ms",
      },
      boxShadow: {
        theme: 'inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb',
      },
      fontFamily: {
        sans: ["Time News Roman", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
  
} satisfies Config;
