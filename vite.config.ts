import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [tsconfigPaths()],
      build: {
        lib: {
          entry: 'src/components/RatingBlock.ts',
          name: 'StarRatingBlock',
          formats: ['es'],
          fileName: (format) => `star-rating-block.${format}.js`
        },
        outDir: 'dist',
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        }
      }
    };
  } else {
    // Demo build configuration
    return {
      plugins: [tsconfigPaths()],
      base: '/star-rating-block/',
      build: {
        outDir: 'dist/demo',
        rollupOptions: {
          input: {
            main: 'index.html'
          },
          external: ['/dist/star-rating-block.es.js'],
          preserveEntrySignatures: 'strict'
        }
      }
    };
  }
});