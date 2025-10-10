import { defineConfig } from "vite";
import htmlInject from "vite-plugin-html-inject";

export default defineConfig({
  base: "./", // чтобы пути были относительные
  build: {
    outDir: "dist", // папка сборки (по умолчанию dist)
  },
  plugins: [htmlInject()],
});
