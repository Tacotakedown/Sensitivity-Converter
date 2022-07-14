import { Component } from 'solid-js';
import './titleBar.scss';
import WindowButtonGroup from '../windowButtonGroup/windowButtonGroup';

const TitleBar: Component = () => {
	return (
		<header>
			<div className="drag justify-start	 align-center flex flex-row-reverse">
				<WindowButtonGroup />
			</div>
		</header>
	);
};
export default TitleBar;
