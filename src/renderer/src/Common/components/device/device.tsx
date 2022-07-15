import { Component } from 'solid-js';
import deviceImages from './deviceImages/deviceImages.json';

const Device = (props) => {
	let currentDev = props.dev;
	return (
		<>
			<div className="p-4 flex items-center justify center flex-col text-white bg-frosted rounded-xl h-64 hover:shadow-md hover:shadow-frosted	">
				{deviceImages[currentDev].device}
				<img
					src={deviceImages[currentDev].image}
					alt="device"
					className=" w-36 rounded-xl shadow-img "
				/>
				<label class="switch">
					<input type="checkbox" />
					<span class="slider round"></span>
				</label>
			</div>
		</>
	);
};
export default Device;
