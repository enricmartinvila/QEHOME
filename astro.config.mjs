import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"

export default defineConfig({
	site: "https://qehomemanresa.com",
	trailingSlash: "always",
	integrations: [tailwind()],
	build: {
		format: "directory",
	},
})
