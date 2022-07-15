import axios from 'axios';

export default class GoveeLED {
	model: any;
	mac: any;
	apiKey: any;
	basePath: any;
	cors: any;
	constructor(config: any) {
		this.apiKey = '5d0bd033-4261-40fa-8ebe-0c3044489d8d';
		this.mac = config.mac;
		this.model = config.model;
		this.basePath = 'https://developer-api.govee.com/v1/devices';
		this.cors = 'Access-Control-Allow-Origin: *';
	}

	request(endpoint: any, reqData: any, method: any) {
		return new Promise((resolve, reject) => {
			if (this.mac === '')
				return reject(new Error('No MAC Address provided.'));
			if (this.model === '') return reject(new Error('No Model provided.'));

			let reqURL = this.basePath + endpoint;

			var data = JSON.stringify(reqData);

			var config = {
				method: method,
				url: reqURL,
				mode: 'no-cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Govee-API-Key': this.apiKey,
					'Content-Type': 'application/json',
				},
				data: data,
			};

			axios(config)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}

	setColor(hexCode: any) {
		var regex = /^#([0-9A-F]{3}){1,2}$/i;
		if (!regex.test(hexCode)) throw new Error('Invalid Hex Color Code');

		function hex2rgb(hex: any) {
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(
				shorthandRegex,
				function (m: any, r: any, g: any, b: any) {
					return r + r + g + g + b + b;
				}
			);

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16),
				  }
				: null;
		}

		var RGBconv = hex2rgb(hexCode);
		var reqData = {
			device: this.mac,
			model: this.model,
			cmd: {
				name: 'color',
				value: {
					r: RGBconv!.r,
					g: RGBconv!.g,
					b: RGBconv!.b,
				},
			},
		};
		var endpoint = '/control';
		return this.request(endpoint, reqData, 'put');
	}

	setBrightness(brightnessLevel: any) {
		if (!Number.isInteger(brightnessLevel))
			throw new Error('Brightness Level Provided is Not A Number');
		if (brightnessLevel > 100)
			throw new Error('Brightness Level Provided is Not From 1-100');
		if (brightnessLevel < 1)
			throw new Error('Brightness Level Provided is Not From 1-100');
		var reqData = {
			device: this.mac,
			model: this.model,
			cmd: {
				name: 'brightness',
				value: brightnessLevel,
			},
		};
		var endpoint = '/control';
		return this.request(endpoint, reqData, 'put');
	}

	setColorTemperature(temperatureLevel: any) {
		if (!Number.isInteger(temperatureLevel))
			throw new Error('Temperature Level Provided is Not A Number');
		if (temperatureLevel > 9000)
			throw new Error('Temperature Level Provided is Not From 2000-9000');
		if (temperatureLevel < 2000)
			throw new Error('Temperature Level Provided is Not From 2000-9000');
		var reqData = {
			device: this.mac,
			model: this.model,
			cmd: {
				name: 'colorTem',
				value: temperatureLevel,
			},
		};
		var endpoint = '/control';
		return this.request(endpoint, reqData, 'put');
	}

	turnOn() {
		var reqData = {
			device: this.mac,
			model: this.model,
			cmd: {
				name: 'turn',
				value: 'on',
			},
		};
		var endpoint = '/control';
		return this.request(endpoint, reqData, 'put');
	}

	turnOff() {
		var reqData = {
			device: this.mac,
			model: this.model,
			cmd: {
				name: 'turn',
				value: 'off',
			},
		};
		var endpoint = '/control';
		return this.request(endpoint, reqData, 'put');
	}

	getState() {
		var reqData = {};
		var endpoint = `/state?device=${this.mac}&model=${this.model}`;
		return this.request(endpoint, reqData, 'get');
	}

	async getDevices() {
		var reqData = {};
		var endpoint = ``;
		let reqURL = this.basePath + endpoint;

		var data = JSON.stringify(reqData);

		var config = {
			method: 'get',
			url: reqURL,
			mode: 'no-cors',
			headers: {
				'Govee-API-Key': 'this.apiKey',
				'Content-Type': 'application/json',
			},
		};

		let resData;

		await axios(config)
			.then(async function (response) {
				resData = response.data.data;
			})
			.catch(function (error) {
				throw new Error(error);
			});

		return resData;
	}
}
