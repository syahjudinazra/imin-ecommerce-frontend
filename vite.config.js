import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9a9a9a",
        secondary: "#000000",
        background: "#9a9a9a",
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
