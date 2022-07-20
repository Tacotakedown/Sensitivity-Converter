import { Component, Show, createSignal, createEffect } from 'solid-js';
import Electron from 'electron';
import * as Store from 'electron-store';
import { useEffect } from 'react';

const ipcRenderer = Electron.ipcRenderer;

const Settings: Component = () => {
	const [rpcState, setRpcState] = createSignal(true);

	const handleDiscordOffClick = () => {
		setRpcState(false);
		ipcRenderer.send('discord-rpc', false);
		console.log('sent off');
	};
	const handleDiscordOnClick = () => {
		setRpcState(true);
		ipcRenderer.send('discord-rpc', true);
		console.log('sent on');
	};
	return (
		<>
			<div>
				<Show when={rpcState() == true}>
					<button onclick={handleDiscordOffClick}>
						toggle Discord RPC off
					</button>
				</Show>
				<Show when={rpcState() == false}>
					<button onclick={handleDiscordOnClick}>
						toggle Discord RPC on
					</button>
				</Show>
				<br />
			</div>
		</>
	);
};

export default Settings;
