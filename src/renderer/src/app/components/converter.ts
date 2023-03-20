import offsets from '../offsets/offesets.json';

const getGameOffset = (game: string) => {
	switch (game) {
		case 'Apex Legends':
			return offsets.apex.divisor;
		case 'borderlands':
			return offsets.borderlands.divisor;
		case 'csgo':
			return offsets.csgo.divisor;
		case 'destiny':
			return offsets.destiny.divisor;
		case 'fortnite':
			return offsets.fortnite.divisor;
		case 'overwatch':
			return offsets.overwatch.divisor;
		case 'quake':
			return offsets.quake.divisor;
		case 'tf2':
			return offsets.teamfortress2.divisor;
		case 'titanfall':
			return offsets.titanfall.divisor;
		case 'r6':
			return offsets.raibow6siege.divisor;
		case 'darwinproject':
			return offsets.darwinproject.divisor;
		case 'doometernal':
			return offsets.doometernal.divisor;
		case 'eft':
			return offsets.eft.divisor;
		case 'halo':
			return offsets.halo.divisor;
		case 'huntshowdown':
			return offsets.huntshowdown.divisor;
		case 'roblox':
			return offsets.roblox.divisor;
		case 'valorant':
			return offsets.valorant.divisor;
		default:
			return 0;
	}
};

export const getinchPer360 = (sens: number, game: string) => {
	return sens * getGameOffset(game);
};

export const getDPI = (currentDPI: number, sens: number, newDPI: number) => {
	return (currentDPI * sens) / newDPI;
};
const ConvertSens = (sens: number, game1: string, game2: string) => {
	console.log(getinchPer360(sens, game1));
	return getGameOffset(game2) / getinchPer360(sens, game1);
};

export default ConvertSens;
