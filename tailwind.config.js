/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				slate: {
					100: "#0a0a0a",
					200: "#131313",
				}
			},
		},
	},
	plugins: [],
}
