import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //Correção de import do path -> npm i @types/node -D
      // Define um alias para caminho absoluto
      "#": path.resolve(__dirname, "node_modules"),
    },
  },
});
