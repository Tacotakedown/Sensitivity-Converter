## Installation

```bash
# clone the project
git clone https://github.com/ch99q/vite-solid-electron.git

# open the project directory
cd vite-solid-electron

# install dependencies
npm install

# start the application
npm run dev

# make a production build
npm run build
```

## Use Electron and NodeJS API

> 🚧 By default, Electron doesn't support the use of API related to Electron and NodeJS in the Renderer process, but someone might need to use it. If so, you can see the template 👉 **[electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)**

#### Invoke Electron and NodeJS API in `Preload-script`

-  **src/preload/index.ts**

   ```typescript
   import fs from 'fs';
   import { contextBridge, ipcRenderer } from 'electron';

   // --------- Expose some API to Renderer-process. ---------
   contextBridge.exposeInMainWorld('fs', fs);
   contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
   ```

-  **src/renderer/src/global.d.ts**

   ```typescript
   // Defined in the window
   interface Window {
   	fs: typeof import('fs');
   	ipcRenderer: import('electron').IpcRenderer;
   }
   ```

-  **src/renderer/src/main.ts**

   ```typescript
   // Use Electron and NodeJS API in the Renderer-process
   console.log('fs', window.fs);
   console.log('ipcRenderer', window.ipcRenderer);
   ```

## Use SerialPort, SQLite3, or other node-native addons in the Main-process

-  First, you need to make sure that the dependencies in the `package.json` are NOT in the "devDependencies". Because the project will need them after packaged.

-  Main-process, Preload-script are also built with Vite, and they're built as [build.lib](https://vitejs.dev/config/#build-lib).  
    So they just need to configure Rollup.

**Click to see more** 👉 [src/main/vite.config.ts](https://github.com/ch99q/vite-solid-electron/blob/main/packages/main/vite.config.ts)

```js
export default {
	build: {
		// built lib for Main-process, Preload-script
		lib: {
			entry: 'index.ts',
			formats: ['cjs'],
			fileName: () => '[name].js',
		},
		rollupOptions: {
			// configuration here
			external: ['serialport', 'sqlite3'],
		},
	},
};
```
