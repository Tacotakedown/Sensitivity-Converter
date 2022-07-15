import { Component, createSignal } from 'solid-js';
import { HexColorInput, HexColorPicker } from 'solid-colorful';

const Home: Component = () => {
	const [color, setColor] = createSignal('#aabbcc');

	return (
		<>
			<div>home</div>
		</>
	);
};

export default Home;
