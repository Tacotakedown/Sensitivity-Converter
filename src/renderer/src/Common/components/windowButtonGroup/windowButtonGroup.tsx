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
			<WindowControlButton onClick={handleMinimize} color="yellow" />

			<WindowControlButton onClick={handleMaximize} color="green" />

			<WindowControlButton onClick={handleClose} color="red" />
		</div>
	);
};

export default WindowButtonGroup;
