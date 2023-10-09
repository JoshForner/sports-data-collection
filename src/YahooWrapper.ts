import { YahooApiInterface } from './YahooApiInterface';
import { PlayerStatsMapper } from './PlayerStatsMapper';

export class YahooSportsWrapper {
	yahoo: YahooApiInterface;
	statsMapper: PlayerStatsMapper;
	fileInfo: {
		filePath: string;
		fileName: string;
	};

	constructor(
		config: { key: string; secret: string; authorizationCode: string },
		fileInfo?: { filePath: string; fileName: string }
	) {
		this.fileInfo = fileInfo || { filePath: './temp', fileName: 'token.json' };
		this.yahoo = new YahooApiInterface(config, this.fileInfo);
		this.statsMapper = new PlayerStatsMapper(this.fileInfo);
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

	async generateStatCategories(sport: string) {
		await this.yahoo.generateStatCategories(sport);
	}

	async getPlayerStats(playerKey: string) {
		const url = `https://fantasysports.yahooapis.com/fantasy/v2/player/${playerKey}/stats`;
		const res = await this.yahoo.callApi(url);
		return res;
	}
}
