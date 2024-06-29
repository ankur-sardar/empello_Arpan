import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT_SERVER || 5080;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: `http://localhost:${port}`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
				secure: false,
			},
		},
	},
	build: {
		outDir: "dist/app",
	},
});
