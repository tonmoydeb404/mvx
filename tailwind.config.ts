import tailwindCssForms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

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
        // theme color
        background: {
          base: "#0f172a",
          dark: "#020617",
          light: "#1e293b",
          content: "#f8fafc",
          "content-muted": "#94a3b8",
        },

        // main colors
        primary: {
          base: "#dc2626",
          dark: "#b21d1d",
          light: "#e55656",
          content: "#fff",
        },
        secondary: {
          base: "#374151",
          dark: "#1f2937",
          light: "#4b5563",
          content: "#fff",
        },

        // action colors
        success: {
          base: "#16a34a",
          dark: "#107636",
          light: "#3be479",
          content: "#fff",
        },
        error: {
          base: "#b91c1c",
          dark: "#8d1515",
          light: "#e55656",
          content: "#fff",
        },
        warning: {
          base: "#eab308",
          dark: "#b98d06",
          light: "#fad45e",
          content: "#111",
        },
        info: {
          base: "#2563eb",
          dark: "#134cca",
          light: "#82a6f4",
          content: "#fff",
        },
      },
    },
  },
  plugins: [tailwindCssForms({ strategy: "class" })],
} satisfies Config;
