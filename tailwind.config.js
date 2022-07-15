module.exports = {
	content: [
		'./src/renderer/index.html',
		'./src/renderer/src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
			},
			colors: {
				'top-bar-yellow': '#e5b773',
				'top-bar-green': '#a9d676',
				'top-bar-red': '#f98299',
				'button-bg-purple': 'rgba(50, 31, 142, 0.3)',
				frosted: 'rgba(255, 255, 255, 0.15)',
			},
			height: {
				124: '44rem',
				128: '48rem',
			},
			width: {
				124: '40rem',
				128: '45rem',
			},
			boxShadow: {
				md: '0px 0px 14px rgba( 255, 255, 255, 1)',
				img: '0px 0px 5px rgba( 255, 255, 255, 1)',
			},
		},
	},
	plugins: [],
};
