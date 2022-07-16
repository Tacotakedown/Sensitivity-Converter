const WindowControlButton = (props: any) => {
	let propColor;
	if (props.color === 'yellow') {
		propColor = 'bg-top-bar-yellow';
	} else if (props.color === 'green') {
		propColor = 'bg-top-bar-green';
	} else if (props.color === 'red') {
		propColor = 'bg-top-bar-red';
	}
	return (
		<div
			class={`w-4 h-4 ${propColor} rounded-full ease-in-out hover:scale-110`}
			onclick={props.onClick}
		></div>
	);
};
export default WindowControlButton;
