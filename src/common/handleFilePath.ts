import Store, { Schema } from 'electron-store';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import walk from 'walkdir';
import { createStore } from 'solid-js';

const defaultCommunityDir = (): string => {
	if (os.platform().toString() === 'linux') {
		return 'linux';
	}

	let msfsConfigPath = null;

	const steamPath = path.join(
		process.env.APPDATA,
		'\\Microsoft Flight Simulator\\UserCfg.opt'
	);
	const storePath = path.join(
		process.env.LOCALAPPDATA,
		'\\Packages\\Microsoft.FlightSimulator_8wekyb3d8bbwe\\LocalCache\\UserCfg.opt'
	);

	if (fs.existsSync(steamPath)) {
		msfsConfigPath = steamPath;
	} else if (fs.existsSync(storePath)) {
		msfsConfigPath = storePath;
	} else {
		walk(process.env.LOCALAPPDATA, (path) => {
			if (path.includes('Flight') && path.includes('UserCfg.opt')) {
				msfsConfigPath = path;
			}
		});
	}
	if (!msfsConfigPath) {
		return 'C:\\';
	}

	try {
		const msfsConfig = fs.readFileSync(msfsConfigPath).toString();
		const msfsConfigLines = msfsConfig.split(/\r?\n/);
		const packagesPathLine = msfsConfigLines.find((line) =>
			line.includes('InstalledPackagesPath')
		);
		const communityDir = path.join(
			packagesPathLine.split(' ').slice(1).join(' ').replaceAll('"', ''),
			'\\Community'
		);

		return fs.existsSync(communityDir) ? communityDir : 'C:\\';
	} catch (e) {
		console.warn('Could not parse community dir from file', msfsConfigPath);
		console.error(e);
		return 'C:\\';
	}
};
export const persistWindowSettings = (window: Electron.BrowserWindow): void => {
	store.set('cache.main.maximized', window.isMaximized());

	const winSize = window.getSize();
	store.set('cache.main.lastWindowX', winSize[0]);
	store.set('cache.main.lastWindowY', winSize[1]);
};

const schema: Schema<unknown> = {
	mainSettings: {
		type: 'object',
		// Empty defaults are required when using type: "object" (https://github.com/sindresorhus/conf/issues/85#issuecomment-531651424)
		default: {},
		properties: {
			msfsPackagePath: {
				type: 'string',
				default: defaultCommunityDir(),
			},
		},
	},
	cache: {
		type: 'object',
		default: {},
		properties: {
			main: {
				type: 'object',
				default: {},
				properties: {
					lastWindowX: {
						type: 'integer',
					},
					lastWindowY: {
						type: 'integer',
					},
					maximized: {
						type: 'boolean',
						default: false,
					},
					lastShownSection: {
						type: 'string',
						default: '',
					},
					lastShownAddonKey: {
						type: 'string',
						default: '',
					},
				},
			},
		},
	},
	metaInfo: {
		type: 'object',
		default: {},
		properties: {
			lastVersion: {
				type: 'string',
				default: '',
			},
			lastLaunch: {
				type: 'integer',
				default: 0,
			},
		},
	},
};
const store = new Store({ schema, clearInvalidConfig: true });
store.set('metaInfo.lastLaunch', Date.now());

export default store;
