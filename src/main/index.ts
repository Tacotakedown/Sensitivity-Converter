import Electron from 'electron';
import { app, shell, Tray, Menu, nativeImage } from 'electron';
import { BrowserWindow } from 'electron-acrylic-window';
import { release } from 'os';
import { join } from 'path';
import { async } from 'walkdir';
import rpc from 'discord-rpc';
import settings from './discord-rpc/settings.json';
import ElectronStore from 'electron-store';

ElectronStore.initRenderer();

const ipcMain = Electron.ipcMain;
let tray = null;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

let win: BrowserWindow | null = null;

const createWindow = async () => {
	let vibrancy = {
		theme: '#1b0c6699',
		effect: 'acrylic',
		useCustomWindowRefreshMethod: true,
		disableOnBlur: false,
		debug: false,
	};

	win = new BrowserWindow({
		title: 'Govee RGB Hub',
		maxWidth: 700,
		minWidth: 700,
		maxHeight: 800,
		minHeight: 800,
		titleBarStyle: 'hidden',
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			// devTools: false,
		},
		//@ts-ignore
		vibrancy: vibrancy,
		icon: join(__dirname, 'build/icon.ico'),
	});

	if (app.isPackaged) {
		win.loadFile(join(__dirname, '../renderer/index.html'));
		win.setMenuBarVisibility(false);
	} else {
		const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

		win.loadURL(url);
		win.webContents.openDevTools();
	}
	const iconPath = join(__dirname, 'test.ico');
	tray = new Tray(nativeImage.createFromPath(iconPath));
	tray.setToolTip('Govee Home');
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'restore window',
			click: () => {
				win?.show();
				// win?.focus();
			},
		},
		{ label: 'Turn lights off' },
		{ label: 'Close Govee Home', click: () => app.quit() },
	]);
	tray.setContextMenu(contextMenu);
	// Test active push message to Renderer-process
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		);
	});

	// Make all links open with the browser, not with the application
	win.webContents.on('new-window', (e, url) => {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	});
};

const client = new rpc.Client({ transport: 'ipc' });

client.login({ clientId: settings.ClientID }).catch(console.error);

ipcMain.on('discord-rpc', (_, arg: boolean) => {
	if (arg) {
		client.setActivity({
			state: settings.State,
			largeImageKey: settings.LargeImage,
		});
	} else {
		client.clearActivity();
	}
});

ipcMain.on('minimize-event', () => {
	win?.minimize();
});
ipcMain.on('maximize-event', () => {
	win?.maximize();
});
ipcMain.on('close-event', () => {
	win?.hide();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	win = null;
	if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});
