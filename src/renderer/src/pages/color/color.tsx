import { Component, createSignal } from 'solid-js';
import { HexColorInput, HexColorPicker, RgbColorPicker } from 'solid-colorful';

export const Color: Component = () => {
	const [color, setColor] = createSignal('#aabbcc');

	return (
		<>
			<HexColorPicker color={color()} onChange={setColor} />
			<HexColorInput color={color()} onChange={setColor} />
		</>
	);
};
