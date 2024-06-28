import { defineConfig } from "vite"
import path from "path"
import glsl from "vite-plugin-glsl"

export default defineConfig({
	base: "./", // use relative path for base
	root: path.join(__dirname, "src"), // root where index.html is located
	publicDir: "../public", //relative to root src
	server: {
		// host: 'localhost',
		host: "0.0.0.0", // listen to network via ip address
		port: 3000,
		strictPort: true,
		open: true,
	},
	resolve: {
		alias: {
			// import modules from the src directory using '@'
			"@": path.resolve(__dirname, "./src"),
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@shaders": path.resolve(__dirname, "./src/shaders"),
		},
	},
	build: {
		outDir: "../dist",
		assetsDir: "assets",
		minify: "terser",
		sourcemap: true,
		rollupOptions: {
			output: {
				// config output asset file names
				entryFileNames: "js/[name]-[hash].js",
				chunkFileNames: "js/[name]-[hash].js",
				assetFileNames: "[ext]/[name]-[hash].[ext]",
			},
			input: "src/index.html",
		},
	},
	plugins: [glsl()],
})
