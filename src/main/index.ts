import { app, shell, ipcMain } from 'electron';
import { BrowserWindow } from 'electron-acrylic-window';
import { release, os } from 'os';
import { join } from 'path';

import './samples/electron-store';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
	let vibrancy = {
		theme: 'dark',
		effect: 'acrylic',
		useCustomWindowRefreshMethod: true,
		disableOnBlur: false,
		debug: false,
	};

	win = new BrowserWindow({
		title: 'Main window',
		width: 1400,
		minWidth: 1400,
		height: 800,
		minHeight: 800,
		titleBarStyle: 'hidden',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		vibrancy: vibrancy,
	});

	if (app.isPackaged) {
		win.loadFile(join(__dirname, '../renderer/index.html'));
		win.setMenuBarVisibility(false);
	} else {
		// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
		const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

		win.loadURL(url);
		win.webContents.openDevTools();
	}

	// Test active push message to Renderer-process
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		);
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url);
		return { action: 'deny' };
	});
}

ipcMain.handle('minimize-event', () => {
	win?.minimize();
});
ipcMain.handle('maximize-event', () => {
	win?.maximize();
});
ipcMain.handle('close-event', () => {
	app.quit();
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
