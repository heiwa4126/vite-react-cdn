import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import cdn from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		cdn({
			modules: [
				"react",
				"react-dom",
				{
					name: "cowsay",
					var: "cowsay",
					path: "build/cowsay.umd.min.js",
				},
			],
		}),
	],
});
