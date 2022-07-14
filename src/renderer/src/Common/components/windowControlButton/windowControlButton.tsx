const WindowControlButton = (props) => {
	return (
		<div
			className="w-4 h-4 ease-in-out hover:scale-110  "
			onclick={props.onClick}
		>
			{props.children}
		</div>
	);
};
export default WindowControlButton;
