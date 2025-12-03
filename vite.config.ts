import { defineConfig  } from "vitest/config";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return defineConfig({
    plugins: [vue()],
    base: env.VITE_BASE_URL,
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./test/setup.ts",
    },
  });
};