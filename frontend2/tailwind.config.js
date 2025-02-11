/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // Isso garante que o modo escuro funcione corretamente
  plugins: [],
};
