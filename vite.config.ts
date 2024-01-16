import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
    // include this when using react
    // plugins: [
    //     // react()
    // ],
    // root: '/src',
    // publicDir: '/public',
    // base: './',
    // server: {
    //     host: true, // open to local network and display URL
    //     port: 3000,
    //     open: !(
    //         'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env
    //     ), // open if not codesandbox
    // },
    // build: {
    //     rollupOptions: {
    //         input: '/path/to/main.ts',
    //     },
    //     outDir: 'dist', // output in the dist folder
    //     emptyOutDir: true,
    //     assetsDir: 'assets',
    //     sourcemap: true,
    //     minify: 'terser', // Minify the code (options: 'terser', 'esbuild', or false)
    //     chunkSizeWarningLimit: 500, // warn if the size exceeds this lime in kb
    // },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './scr/'), // alias for src
            '@components': path.resolve(__dirname, './src/components'),
            '@three': path.resolve(__dirname, 'src/three'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@types': path.resolve(__dirname, './src/types'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
})
