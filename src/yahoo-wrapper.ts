import { YahooSports } from "./yahoo";

export class YahooSportsWrapper {
	yahoo: YahooSports;
	filePath: string = './temp/token.json';

	constructor(config: { key: string; secret: string; authorizationCode: string; }, filePath?: string) {
		if (filePath) {
			this.filePath = filePath;
		}
		this.yahoo = new YahooSports(config, this.filePath);
	}

	async getToken() {
		await this.yahoo.getToken();
	}

	async refreshToken() {
		await this.yahoo.refreshToken();
	}

	async callApi(url: string) {
		return await this.yahoo.callApi(url);
	}

	async getStatCategories(sport: string) {
		const url = `https://fantasysports.yahooapis.com/fantasy/v2/game/${sport}/stat_categories`;
		const res = await this.yahoo.callApi(url);
		return res.fantasy_content.game.stat_categories.stats;
	}
}
