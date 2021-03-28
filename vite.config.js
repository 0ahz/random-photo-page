import { defineConfig, loadEnv } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';
import html from 'vite-plugin-html';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  Object.keys(env).forEach((key) => {
    env[key] = decodeURIComponent(env[key] || '');
  });

  return defineConfig({
    plugins: [
      svelte(),
      html({
        inject: {
          injectData: { ...env },
        },
        minify: true,
      }),
    ],
  });
};
