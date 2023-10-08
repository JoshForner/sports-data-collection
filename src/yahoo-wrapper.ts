import { YahooSports } from "./yahoo";

export class YahooSportsWrapper {
	yahoo: YahooSports;
	fileInfo: {
		filePath: string;
		fileName: string;
	};

	constructor(config: { key: string; secret: string; authorizationCode: string; }, fileInfo?: { filePath: string; fileName: string; }) {
		this.fileInfo = fileInfo || { filePath: './temp', fileName: 'token.json' };
		this.yahoo = new YahooSports(config, this.fileInfo);
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
