import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  Object.keys(env).forEach((key) => {
    env[key] = decodeURIComponent(env[key] || "");
  });

  return defineConfig({
    server: {
      port: 3001,
    },
    plugins: [
      svelte(),
      createHtmlPlugin({
        inject: {
          injectData: { ...env },
        },
        minify: true,
      }),
    ],
  });
};
