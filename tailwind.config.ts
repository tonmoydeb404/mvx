import tailwindCssForms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import { blue, green, orange, red, slate, yellow } from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "6rem",
          xl: "7rem",
          "2xl": "8rem",
        },
      },
      colors: {
        // main colors
        primary: orange,
        secondary: slate,

        // action colors
        success: green,
        error: red,
        warning: yellow,
        info: blue,
      },
    },
  },
  plugins: [tailwindCssForms({ strategy: "class" })],
} satisfies Config;
