/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#c48f12",
					cta: "#ECB434",
					ctaHover: "#f6c452",
				},
				night: {
					DEFAULT: "#15181d",
					2: "#1f242b",
				},
				paper: "#faf9f7",
				sand: "#f0ece4",
				ink: "#1b1e24",
			},
			fontFamily: {
				sans: ['"Fira Sans"', "system-ui", "sans-serif"],
				serif: ['"DM Serif Display"', "Georgia", "serif"],
			},
		},
	},
	plugins: [],
}
