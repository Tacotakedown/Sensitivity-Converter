import { Component, createSignal } from 'solid-js';
import GoveeLED from '../../Common/fetch/goveeApi';
import { HexColorInput, HexColorPicker } from 'solid-colorful';
import DeviceGrid from '@/Common/components/device/deviceGrid';
import Device from '@/Common/components/device/device';

// const headers = new Headers({
// 	'Govee-API-Key': '5d0bd033-4261-40fa-8ebe-0c3044489d8d',
// });
// const request = new Request('https://developer-api.govee.com/v1/devices', {
// 	method: 'GET',
// 	headers: headers,
// 	mode: 'no-cors',
// 	cache: 'default',
// });

// fetch(request).then((res) => console.log(res));

const GoveeClient = new GoveeLED({
	apiKey: '5d0bd033-4261-40fa-8ebe-0c3044489d8d',
	mac: '',
	model: '',
});

GoveeClient.getDevices().then((data) => console.log(data));

const Home = () => {
	const [color, setColor] = createSignal('#aabbcc');

	return (
		<>
			<div className="text-white">
				All Devices:
				<DeviceGrid>
					<Device dev="2" />
					<Device dev={29} />
					<Device dev={89} />
					<Device dev={50} />
				</DeviceGrid>
			</div>
		</>
	);
};

export default Home;
