/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#f0f1fa",
        "dark-white": "#e4e6ef",
        "gray-blue": "#2b2e3a",
        "dark-blue": "#0a21c0"
      }
    }
  },
  plugins: []
};
