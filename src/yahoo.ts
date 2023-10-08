import axios from 'axios';
import qs from 'qs';
import { promises as fs } from 'fs';
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
	filePath: string = './temp/token.json';
	url: string = 'https://api.login.yahoo.com/oauth2/get_token';

	constructor(client: { key: string; secret: string; authorizationCode: string; }, filePath?: string) {
		this.client = client;
		const authHeader = Buffer.from(`${client.key}:${client.secret}`, `binary`).toString(`base64`);
		this.headers = {
			Authorization: `Basic ${authHeader}`,
			ContentType: 'application/x-www-form-urlencoded',
		};
		if (filePath) {
			this.filePath = filePath;
		}
	}

	async getToken() {
		return axios({
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
		}).then(async (res) => {
			await fs.writeFile(this.filePath, JSON.stringify(res.data, null, "\t"));
		}).catch((err) => {
			console.error(`Error in getToken(): ${err}`);
		});
	}

	async refreshToken() {
		fs.access(this.filePath)
			.then(async () => {
				const tokenData = JSON.parse(await fs.readFile(this.filePath, 'utf8'));
				return axios({
					url: this.url,
					method: 'post',
					headers: this.headers,
					data: qs.stringify({
						redirect_uri: 'oob',
						grant_type: 'refresh_token',
						refresh_token: tokenData.refresh_token,
					}),
					timeout: 10000,
				}).then(async (res) => {
					await fs.writeFile(this.filePath, JSON.stringify(res.data, null, "\t"
					)).catch((err) => {
						console.error(`Error in refreshToken(): ${err}`);
					});
				});
			})
			.catch(async () => {
				console.error(`Error in refreshToken(): File path ${this.filePath} does not exist.`);
			});
	}
}