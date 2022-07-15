module.exports = {
	content: [
		'./src/renderer/index.html',
		'./src/renderer/src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'top-bar-yellow': '#e5b773',
				'top-bar-green': '#a9d676',
				'top-bar-red': '#f98299',
				'button-bg-purple': 'rgba(50, 31, 142, 0.6)',
			},
		},
	},
	plugins: [],
};
