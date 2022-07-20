import { OnOffButton } from '../onOffButton/onOffButton';
import deviceImages from './deviceImages/deviceImages.json';

const Device = (props: any) => {
	let currentDev = props.dev;
	let click = props.click;
	let onClick: void = props.onClick;
	return (
		<>
			<div class="p-4 gap-3 flex items-center justify center flex-col text-white bg-frosted rounded-xl h-64 hover:shadow-md hover:shadow-frosted	">
				<div onClick={click}>
					{deviceImages[currentDev].device}
					<img
						src={deviceImages[currentDev].image}
						alt="device"
						class=" w-36 rounded-xl shadow-img "
					/>
				</div>
				<OnOffButton onClick={onClick} />
			</div>
		</>
	);
};
export default Device;
