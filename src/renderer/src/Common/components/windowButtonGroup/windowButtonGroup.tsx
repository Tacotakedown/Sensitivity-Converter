import WindowControlButton from '../windowControlButton/windowControlButton';
import './windowButtonGroup.scss';

const WindowButtonGroup = (props) => {
	const ipcRenderer = window.require('electron').ipcRenderer;
	const handleMinimize = () => {
		ipcRenderer.invoke('minimize-event');
	};
	const handleMaximize = () => {
		ipcRenderer.invoke('maximize-event');
	};

	const handleClose = () => {
		ipcRenderer.invoke('close-event');
	};
	return (
		<div className="ctlBtnGroup space-x-4  flex justify-center align-center flex-row">
			<WindowControlButton onClick={handleMinimize}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95">
					<rect
						fill="white"
						x="9"
						y="85.9"
						width="75.32"
						height="5.1"
						rx="2.55"
					/>
				</svg>
			</WindowControlButton>
			<WindowControlButton onClick={handleMaximize}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95">
					<rect
						fill="none"
						stroke="white"
						stroke-miterlimit="10"
						stroke-width="5"
						x="7.5"
						y="13.5"
						width="80"
						height="75"
						rx="6.5"
					/>
				</svg>
			</WindowControlButton>
			<WindowControlButton onClick={handleClose}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95">
					<rect
						fill="white"
						x="-4.01"
						y="44.32"
						width="102.24"
						height="9.33"
						rx="4"
						transform="translate(-20.84 47.66) rotate(-45)"
					/>
					<rect
						fill="white"
						x="-3.95"
						y="43.79"
						width="102.24"
						height="9.33"
						rx="4"
						transform="translate(48.08 -19.16) rotate(45)"
					/>
				</svg>
			</WindowControlButton>
		</div>
	);
};

export default WindowButtonGroup;
