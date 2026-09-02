/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#ca9b2c",
					cta: "#ECB434",
					ctaHover: "#d3a32e",
				},
			},
			fontFamily: {
				sans: ['"Fira Sans"', "Roboto", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
}
