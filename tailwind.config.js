/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans SolidJS components
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")], // Enable DaisyUI
	daisyui: {
		themes: ["light", "dark", "cupcake"], // Choose themes (customizable)
	},
};
