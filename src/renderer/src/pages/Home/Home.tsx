import { Component, createSignal } from 'solid-js';
import GoveeLED from '../../Common/fetch/goveeApi';
import superagent from 'superagent';
import axios from 'axios';
import { HexColorInput, HexColorPicker } from 'solid-colorful';
import DeviceGrid from '@/Common/components/device/deviceGrid';
import Device from '@/Common/components/device/device';

const Home = () => {
	const [color, setColor] = createSignal('#aabbcc');
	const [data, setData] = createSignal('');
	// const headers = new Headers({
	// 	'Govee-API-Key': '5d0bd033-4261-40fa-8ebe-0c3044489d8d',
	// });

	// const request = new Request('https://cors-anywhere.herokuapp.com/https://developer-api.govee.com/v1/devices', {
	// 	method: 'GET',
	// 	headers: headers,
	// 	mode: 'no-cors',
	// 	cache: 'default',
	// });

	// fetch(request)
	// 	.then((res) => setData(res.toString()))
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
	// headers: {
	// 	'Content-Type': 'application/json',
	// 	'Govee-API-Key': '5d0bd033-4261-40fa-8ebe-0c3044489d8d',
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	// 	'Access-Control-Allow-Credentials': true,
	// },

	superagent
		.get(
			'https://cors-anywhere.herokuapp.com/https://developer-api.govee.com/v1/devices'
		)
		.set('Govee-API-Key', '5d0bd033-4261-40fa-8ebe-0c3044489d8d')
		.then((res) => {
			console.log(res.body.message);
			setData(res.body.message);
		})
		.catch(console.error);

	return (
		<>
			<div className="text-white">
				All Devices:
				<DeviceGrid>
					<Device dev="1" />
					{data()}
				</DeviceGrid>
			</div>
		</>
	);
};

export default Home;
