import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [tsconfigPaths()],
      build: {
        lib: {
          entry: 'src/RatingBlock.ts',
          name: 'StarRatingBlock',
          formats: ['es'],
          fileName: (format) => `star-rating-block.${format}.js`
        },
        rollupOptions: {
          // If you have external dependencies, list them here
          external: [],
          output: {
            // Provide globals for UMD build if needed
            globals: {}
          }
        }
      },
      css: {
        modules: false,
        preprocessorOptions: {
          scss: {}
        }
      }
    };
  } else {
    // Demo build configuration
    return {
      plugins: [tsconfigPaths()],
      base: '/star-rating-block/', // This should match your GitHub repo name
      build: {
        outDir: 'dist/demo',
        rollupOptions: {
          input: {
            main: 'index.html' // Your demo page
          }
        }
      },
      css: {
        modules: false,
        preprocessorOptions: {
          scss: {}
        }
      }
    };
  }
});