// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
    watch: {
      ignored: ["**/build/**", "**/dist/**", ".netlify/**", ".vscode/**"],
    },
  },
  dev: {
    sourcemap: true,
  },
  plugins: [
    tanstackStart({ customViteReactPlugin: true }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
  ],
});
