import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // чтобы пути были относительные
  build: {
    outDir: "dist", // папка сборки (по умолчанию dist)
  },
});
