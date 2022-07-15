import Store, { Schema } from 'electron-store';
import walk from 'walkdir';
import * as path from 'path';
import * as os from 'os';
import { createSignal, createEffect } from 'solid-js';

const schema: Schema<unknown> = {
	mainSettings: {
		devices: [],
	},
};
