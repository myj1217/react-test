/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./images/main.png')",
        sub: "url('./images/sub.png')",
      },
    },
  },
  plugins: [],
};
