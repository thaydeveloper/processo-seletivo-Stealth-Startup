import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Adicione o plugin CommonJS
  ],
});
