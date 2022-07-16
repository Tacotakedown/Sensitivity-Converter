import { children } from 'solid-js';

const DeviceGrid = (props: any) => {
	const child: any = children(() => props.children);
	return (
		<>
			<div class="grid grid-cols-2 mt-6 gap-8">{child()}</div>
		</>
	);
};
export default DeviceGrid;
