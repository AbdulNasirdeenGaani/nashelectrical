/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [flowbite.content(), "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};