import { Component } from 'solid-js';

const DeviceGrid: Component = (props) => {
	return (
		<>
			<div className="grid grid-cols-2 mt-6 gap-8">{props.children}</div>
		</>
	);
};
export default DeviceGrid;
