import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    extensions: ['.ts', '.js']  // Fixed: 'extension' -> 'extensions'
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    }
  },
  css: {
    modules: false,
    preprocessorOptions: {
      scss: {}
    }
  }
});