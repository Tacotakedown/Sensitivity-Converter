import { Component, createSignal } from 'solid-js';
import ConvertSens, { getinchPer360 } from './components/converter';

import './app.scss';

const App: Component = () => {
	const [game1, setGame1] = createSignal('Apex Legends');
	const handleGame1Change = (event: any) => {
		setGame1(event?.target.value);
	};
	const [game2, setGame2] = createSignal('');
	const handleGame2Change = (event: any) => {
		setGame2(event?.target.value);
	};
	const [sens, setSens] = createSignal(0);
	const handleSensChange = (event: any) => {
		setSens(event?.target.value);
	};
	const [dpi, setDpi] = createSignal(800);
	const handleDpiChange = (event: any) => {
		setDpi(event?.target.value);
	};
	return (
		<div class="centerChild">
			<div style={{ 'font-weight': 'bold', 'font-size': '25px' }}>
				Convert Your Sens
			</div>
			<form>
				<div class="mainContainer">
					<div class="verticalFlex">
						<label>From</label>
						<select value={game1()} onChange={handleGame1Change}>
							<option value="Apex Legends">Apex Legends</option>
							<option value="borderlands">borderlands</option>
							<option value="csgo">csgo</option>
							<option value="destiny">destiny</option>
							<option value="fortnite">fortnite</option>
							<option value="overwatch">overwatch</option>
							<option value="quake">quake</option>
							<option value="tf2">tf2</option>
							<option value="titanfall">titanfall</option>
							<option value="r6">r6</option>
							<option value="darwinproject">darwinproject</option>
							<option value="doometernal">doometernal</option>
							<option value="eft">eft</option>
							<option value="halo">halo</option>
							<option value="huntshowdown">huntshowdown</option>
							<option value="roblox">roblox</option>
							<option value="valorant">valorant</option>
						</select>

						<label>
							sens:
							<input
								type="text"
								name="sens"
								value={sens()}
								onChange={handleSensChange}
							/>
						</label>
						<label>
							DPI:
							<input
								type="text"
								name="DPI"
								value={dpi()}
								onChange={handleDpiChange}
							/>
						</label>
					</div>
					<div class="verticalDivider" />
					<div class="verticalFlex">
						<label>To</label>
						<select value={game2()} onChange={handleGame2Change}>
							<option value="Apex Legends">Apex Legends</option>
							<option value="borderlands">borderlands</option>
							<option value="csgo">csgo</option>
							<option value="destiny">destiny</option>
							<option value="fortnite">fortnite</option>
							<option value="overwatch">overwatch</option>
							<option value="quake">quake</option>
							<option value="tf2">tf2</option>
							<option value="titanfall">titanfall</option>
							<option value="r6">r6</option>
							<option value="darwinproject">darwinproject</option>
							<option value="doometernal">doometernal</option>
							<option value="eft">eft</option>
							<option value="halo">halo</option>
							<option value="huntshowdown">huntshowdown</option>
							<option value="roblox">roblox</option>
							<option value="valorant">valorant</option>
						</select>
					</div>
					<div class="verticalDivider" />
					<div>In per 360°: {getinchPer360(sens(), game1())}</div>
					<div>your sens is: {ConvertSens(sens(), game1(), game2())}</div>
				</div>
			</form>
		</div>
	);
};

export default App;
