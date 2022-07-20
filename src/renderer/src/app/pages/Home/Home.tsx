import { createSignal, createResource, Show, createEffect } from 'solid-js';
import superagent from 'superagent';
import { HexColorInput, HexColorPicker, RgbColorPicker } from 'solid-colorful';
import DeviceGrid from '../../components/device/deviceGrid';
import Device from '../../components/device/device';
import { createStore } from 'solid-js/store';
import { DeviceDetails } from '../../components/device/deviceDetails/deviceDetails';
import request from 'superagent';

const Home = () => {
	// const [data, setData] = createSignal('');
	// const [code, setCode] = createSignal('');
	// const [message, setMessage] = createSignal('');

	// const fetchDevices = () => {
	// 	superagent
	// 		.get(
	// 			'https://govee-proxy.herokuapp.com/https://developer-api.govee.com/v1/devices'
	// 		)
	// 		.set('Govee-API-Key', '5d0bd033-4261-40fa-8ebe-0c3044489d8d')
	// 		.then((res) => {
	// 			setData(JSON.stringify(res.body.data));
	// 			setCode(res.body.code);
	// 			setMessage(res.body.message);
	// 		});
	// };
	const [command, setCommand] = createSignal('');
	const [color, setColor] = createSignal({ r: 255, g: 255, b: 255 });
	const [deviceMenu, setDeviceMenu] = createStore({ state: false });
	const [onOff, setOnOff] = createSignal(true);
	const [onOffSignal, setOnOffSignal] = createSignal('on');

	const setDevices = () => {
		let settings = {
			device: '12:8E:D4:AD:FC:3B:6A:D2',
			model: 'H6143',
			cmd: {
				name: 'turn',
				value: onOffSignal(),
			},
		};
		request
			.put(
				'https://govee-proxy.herokuapp.com/https://developer-api.govee.com/v1/devices/control'
			)
			.set('Govee-API-Key', '5d0bd033-4261-40fa-8ebe-0c3044489d8d')
			.set('Content-Type', 'application/json')
			.send(settings)
			.end(function (err, res) {});
	};

	// const [deviceMenu, setDeviceMenu] = createSignal(true);

	// const [devices] = createResource(fetchDevices);
	const handleClose = () => {
		setDeviceMenu((deviceMenu) => ({ state: false }));
		// console.log(deviceMenu.state, 'closed');
	};
	const handleClick = () => {
		setDeviceMenu((deviceMenu) => ({ state: !deviceMenu.state }));
		// console.log(deviceMenu.state, 'opened!');
	};

	const handleOnOffClick = () => {
		setOnOff(!onOff());
		if (onOff() == false) {
			setOnOffSignal('off');
		} else {
			setOnOffSignal('on');
		}
		// console.log(onOffSignal());
		setDevices();
	};

	const handleSetColor = () => {
		// console.log(color());
		let settings = {
			device: '12:8E:D4:AD:FC:3B:6A:D2',
			model: 'H6143',
			cmd: {
				name: 'color',
				value: {
					r: color().r,
					g: color().g,
					b: color().b,
				},
			},
		};
		request
			.put(
				'https://govee-proxy.herokuapp.com/https://developer-api.govee.com/v1/devices/control'
			)
			.set('Govee-API-Key', '5d0bd033-4261-40fa-8ebe-0c3044489d8d')
			.set('Content-Type', 'application/json')
			.send(settings)
			.end(function (err, res) {});
	};

	return (
		<>
			<div class="text-white">
				All Devices:
				<DeviceGrid>
					<Device dev="1" onClick={handleOnOffClick} click={handleClick} />
				</DeviceGrid>
			</div>
			<Show when={deviceMenu.state == true}>
				<DeviceDetails>
					<div class="flex row-rev w-full justify-end">
						<div onclick={handleClose}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25"
								class="fill-top-bar-red hover:animate-closeSpin	"
								viewBox="0 0 16 16"
							>
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</div>
					</div>
					<div>
						<RgbColorPicker color={color()} onChange={setColor} />

						<button onClick={handleSetColor}>Apply</button>
					</div>
				</DeviceDetails>
			</Show>
		</>
	);
};

export default Home;
