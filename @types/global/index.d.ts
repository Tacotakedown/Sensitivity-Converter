export {};
declare global {
	interface Window {
		ipcRenderer: any;
	}
	interface Client {
		request: any;
	}
}
