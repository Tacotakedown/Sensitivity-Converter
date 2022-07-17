import { createStore } from 'solid-js/store';
import './onOffButton.scss';

export const OnOffButton = () => {
	let [isOn, setIsOn] = createStore({ state: false });
	let onOffColor;
	if (isOn.state == false) {
		onOffColor == 'fill-red-600';
	} else {
		onOffColor == 'fill-green-400';
	}

	const handleClick = () => {
		console.log(isOn.state);
		setIsOn((isOn) => ({ state: !isOn.state }));
	};

	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				fill="currentColor"
				viewBox="0 0 16 16"
				class={`powerButton duration-300  hover:ease-in-out ${
					isOn.state ? 'fill-green-400' : 'fill-red-600'
				} `}
				onclick={handleClick}
			>
				<path d="M7.5 1v7h1V1h-1z" />
				<path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
			</svg>
		</div>
	);
};
