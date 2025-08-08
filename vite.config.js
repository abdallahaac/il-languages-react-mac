// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr"; // ← NEW

export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: true, // ← THIS makes `import Foo from "foo.svg"` a component
		}), // ← NEW
	],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "index.js",
				chunkFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
			},
		},
		assetsDir: "./",
	},
	base: "./",
});
