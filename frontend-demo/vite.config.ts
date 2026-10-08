import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
  ],
  // Mock-data build: no backend is needed, so there is no dev proxy.
  // Product/rating images are served from `public/images`.
  build: {
    outDir: "dist",
  },
});
