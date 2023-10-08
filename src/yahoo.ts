import axios from 'axios';
import qs from 'qs';
import { promises as fs } from 'fs';
import { XMLParser } from 'fast-xml-parser';
export class YahooSports {
	client: {
		key: string;
		secret: string;
		authorizationCode: string;
	};
	headers: {
		Authorization: string;
		ContentType: string;
	};
	fileInfo: {
		filePath: string;
		fileName: string;
	};
	url: string = 'https://api.login.yahoo.com/oauth2/get_token';
	fullPath: string;
	parser: XMLParser = new XMLParser();

	constructor(
		client: {
			key: string;
			secret: string;
			authorizationCode: string;
		},
		fileInfo: {
			filePath: string;
			fileName: string;
		}
	) {
		this.client = client;
		const authHeader = Buffer.from(
			`${client.key}:${client.secret}`,
			'binary'
		).toString('base64');
		this.headers = {
			Authorization: `Basic ${authHeader}`,
			ContentType: 'application/x-www-form-urlencoded',
		};
		this.fileInfo = fileInfo;
		this.fullPath = `${fileInfo.filePath}/${fileInfo.fileName}`;
	}

	async getToken() {
		try {
			await fs.mkdir(this.fileInfo.filePath, { recursive: true });
			const response = await axios({
				url: this.url,
				method: 'post',
				headers: this.headers,
				data: qs.stringify({
					client_id: this.client.key,
					client_secret: this.client.secret,
					redirect_uri: 'oob',
					code: this.client.authorizationCode,
					grant_type: 'authorization_code',
				}),
				timeout: 10000,
			});
			await fs.writeFile(
				this.fullPath,
				JSON.stringify(response.data, null, '\t')
			);
		} catch (error) {
			console.error(`Error in getToken(): ${error}`);
		}
	}

	async refreshToken() {
		try {
			await fs.access(this.fullPath);
			const tokenData = JSON.parse(await fs.readFile(this.fullPath, 'utf8'));
			const response = await axios({
				url: this.url,
				method: 'post',
				headers: this.headers,
				data: qs.stringify({
					redirect_uri: 'oob',
					grant_type: 'refresh_token',
					refresh_token: tokenData.refresh_token,
				}),
				timeout: 10000,
			});
			await fs.writeFile(
				this.fullPath,
				JSON.stringify(response.data, null, '\t')
			);
		} catch (error) {
			if (error.message.includes('No such file or directory')) {
				console.error(
					`Error in refreshToken(): File path ${this.fullPath} does not exist.`
				);
			} else {
				console.error(`Error in refreshToken(): ${error}`);
			}
		}
	}

	async callApi(url: string) {
		try {
			await fs.access(this.fullPath);
			const tokenData = JSON.parse(await fs.readFile(this.fullPath, 'utf8'));
			const response = await axios({
				url: url,
				method: 'get',
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
				},
				timeout: 10000,
			});
			return this.parser.parse(response.data);
		} catch (error) {
			if (error.response.status === 401) {
				this.refreshToken();
				this.callApi(url);
			} else if (error.message.includes('No such file or directory')) {
				console.error(
					`Error in callApi(): File path ${this.fullPath} does not exist.`
				);
			} else {
				console.error(`Error in callApi(): ${error}`);
			}
		}
	}

	async generateStatCategories(sport: string) {
		try {
			const statsUrl = `https://fantasysports.yahooapis.com/fantasy/v2/game/${sport}/stat_categories`;
			const advancedStatsUrl = `https://fantasysports.yahooapis.com/fantasy/v2/game/${sport}/advanced_stat_categories`;
			const statsRes = await this.callApi(statsUrl);
			const advancedStatsRes = await this.callApi(advancedStatsUrl);
			await fs.writeFile(
				`./${this.fileInfo.filePath}/${sport}.stat_categories.json`,
				JSON.stringify(
					statsRes,
					null,
					'\t'
				)
			);
			await fs.writeFile(
				`./${this.fileInfo.filePath}/${sport}.advanced_stat_categories.json`,
				JSON.stringify(
					advancedStatsRes,
					null,
					'\t'
				)
			);
		} catch (error) {
			console.error(`Error in generateStatCategories(): ${error}`);
		}
	}
}
