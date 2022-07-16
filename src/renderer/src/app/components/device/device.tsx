import { Component } from 'solid-js';
import deviceImages from './deviceImages/deviceImages.json';

const Device = (props: any) => {
	let currentDev = props.dev;
	return (
		<>
			<div class="p-4 flex items-center justify center flex-col text-white bg-frosted rounded-xl h-64 hover:shadow-md hover:shadow-frosted	">
				{deviceImages[currentDev].device}
				<img
					src={deviceImages[currentDev].image}
					alt="device"
					class=" w-36 rounded-xl shadow-img "
				/>
				<label class="switch">
					<input aria-label="onOff" type="checkbox" />
					<span class="slider round"></span>
				</label>
			</div>
		</>
	);
};
export default Device;
