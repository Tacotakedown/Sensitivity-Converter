import { OnOffButton } from '../onOffButton/onOffButton';
import deviceImages from './deviceImages/deviceImages.json';

const Device = (props: any) => {
	let currentDev = props.dev;
	let click = props.click;
	return (
		<>
			<div
				onClick={click}
				class="p-4 gap-3 flex items-center justify center flex-col text-white bg-frosted rounded-xl h-64 hover:shadow-md hover:shadow-frosted	"
			>
				{deviceImages[currentDev].device}
				<img
					src={deviceImages[currentDev].image}
					alt="device"
					class=" w-36 rounded-xl shadow-img "
				/>
				<OnOffButton />
			</div>
		</>
	);
};
export default Device;
