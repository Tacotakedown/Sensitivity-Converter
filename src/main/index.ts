import Electron from 'electron';
import { app, shell, Tray, Menu, nativeImage, BrowserWindow } from 'electron';

import { release } from 'os';
import { join } from 'path';
import { async } from 'walkdir';
import rpc from 'discord-rpc';
import settings from './discord-rpc/settings.json';
import ElectronStore from 'electron-store';
import request from 'superagent';

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
	win = new BrowserWindow({
		title: 'Govee RGB Hub',
		maxWidth: 900,
		minWidth: 900,
		maxHeight: 500,
		minHeight: 500,
		frame: true,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: false,
		},
		//@ts-ignore
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

ipcMain.on('minimize-event', () => {
	win?.minimize();
});
ipcMain.on('maximize-event', () => {
	win?.maximize();
});
ipcMain.on('close-event', () => {
	win?.close();
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
