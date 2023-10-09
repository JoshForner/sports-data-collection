import { YahooApiInterface } from './YahooApiInterface';
import { PlayerStatsMapper } from './PlayerStatsMapper';
import { promises as fs } from 'fs';

export class YahooSportsWrapper {
	yahoo: YahooApiInterface;
	statsMapper: PlayerStatsMapper;
	fileInfo: {
		filePath: string;
		fileName: string;
	};
	baseUrl: string = 'https://fantasysports.yahooapis.com/fantasy/v2';

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

	async generatePlayerStats(playerKey: string) {
		const url = `${this.baseUrl}/player/${playerKey}/stats`;
		const res = await this.yahoo.callApi(url);
		await fs.writeFile('./yahoo-info/nfl.player_stats_response.json', JSON.stringify(res, null, '\t'));
	}

	async getPlayerStats(playerKey: string) {
		const url = `${this.baseUrl}/player/${playerKey}/stats`;
		const res = await this.yahoo.callApi(url);
		return res;
	}
}
