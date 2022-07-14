const WindowControlButton = (props) => {
	let propColor;
	if (props.color === 'yellow') {
		propColor = 'bg-yellow-400';
	} else if (props.color === 'green') {
		propColor = 'bg-green-400';
	} else if (props.color === 'red') {
		propColor = 'bg-red-400';
	}
	return (
		<div
			className={`w-4 h-4 ${propColor} rounded-full ease-in-out hover:scale-110`}
			onclick={props.onClick}
			style={{ backgroundColor: props.color }}
		></div>
	);
};
export default WindowControlButton;
