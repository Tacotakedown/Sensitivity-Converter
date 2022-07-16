import WindowControlButton from '../windowControlButton/windowControlButton';
import './windowButtonGroup.scss';
import Electron from 'electron';

const ipcRenderer = Electron.ipcRenderer;

const WindowButtonGroup = (props: any) => {
	const handleMinimize = () => {
		ipcRenderer.send('minimize-event');
	};
	const handleMaximize = () => {
		ipcRenderer.send('maximize-event');
	};

	const handleClose = () => {
		ipcRenderer.send('close-event');
	};
	return (
		<div class="ctlBtnGroup space-x-4  flex justify-center align-center flex-row">
			<WindowControlButton onClick={handleMinimize} color="yellow" />

			<WindowControlButton onClick={handleMaximize} color="green" />

			<WindowControlButton onClick={handleClose} color="red" />
		</div>
	);
};

export default WindowButtonGroup;
