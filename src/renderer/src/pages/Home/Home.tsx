import { createSignal, createResource, For, createEffect } from 'solid-js';
import superagent from 'superagent';
import axios from 'axios';
import { HexColorInput, HexColorPicker } from 'solid-colorful';
import DeviceGrid from '@/Common/components/device/deviceGrid';
import Device from '@/Common/components/device/device';
import { MenuItem } from 'electron/main';

const Home = () => {
	const [data, setData] = createSignal('');
	const [code, setCode] = createSignal('');
	const [message, setMessage] = createSignal('');
	const fetchDevices = () => {
		superagent
			.get(
				'https://govee-proxy.herokuapp.com/https://developer-api.govee.com/v1/devices'
			)
			.set('Govee-API-Key', '5d0bd033-4261-40fa-8ebe-0c3044489d8d')
			.then((res) => {
				setData(res.body.data);
				setCode(res.body.code);
				setMessage(res.body.message);
			});
	};

	const [color, setColor] = createSignal('#aabbcc');

	const [command, setCommand] = createSignal('');
	const [devices] = createResource(fetchDevices);

	return (
		<>
			<div class="text-white">
				All Devices:
				<DeviceGrid>
					<Device dev="1" />
				</DeviceGrid>
				<div>
					{message() || 'error'}
					<br />
					{code() || 'error'}
					<br />
					{data() || 'error'}
				</div>
			</div>
		</>
	);
};

export default Home;
