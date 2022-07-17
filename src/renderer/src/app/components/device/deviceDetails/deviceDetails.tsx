import './deviceDetails.scss';
import { Show } from 'solid-js';
import { useEffect } from 'react';

export const DeviceDetails = (props: any) => {
	let children = props.children;

	return (
		<div>
			<div class="deviceDetailsContainer bg-button-bg-purple">
				<div>{children}</div>
			</div>
		</div>
	);
};
