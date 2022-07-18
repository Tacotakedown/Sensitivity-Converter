declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.png';

declare module '*.jpg' {
	const content: string;
	export default content;
}
declare module '*.json' {
	const value: any;
	export default value;
}
declare global {
	interface Window {
		ipcRenderer: any;
	}
	interface Client {
		request: any;
	}
}
