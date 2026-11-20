import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// One self-contained index.html: it ships inside the iOS bundle and loads with no network.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  resolve: { alias: { '@tower': resolve(__dirname, '../../packages/tower/src/index.ts') } },
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'dist', target: 'safari16', assetsInlineLimit: 100_000_000 },
  server: { host: true },
});
