import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

const webRoot = fileURLToPath(new URL('.', import.meta.url));
const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url));
const legacySourceRoot = fileURLToPath(new URL('../../src', import.meta.url));

export default defineConfig({
  root: webRoot,
  publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
  resolve: {
    alias: {
      '@': legacySourceRoot,
    },
  },
  server: {
    fs: {
      allow: [workspaceRoot],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/actuator': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
    emptyOutDir: true,
  },
});
