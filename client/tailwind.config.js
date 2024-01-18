/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import scrollbarHide from "tailwind-scrollbar-hide";
import tailwindScrollbar from "tailwind-scrollbar";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      screens: {
        "3xl": "1500px",
      },
    },
  },
  plugins: [scrollbarHide, tailwindScrollbar],
  important: true,
});
