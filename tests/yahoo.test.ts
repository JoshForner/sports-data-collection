// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expect, test } from "bun:test";
import { YahooSports } from "../src/yahoo";
import { promises as fs } from 'fs';

test("Refresh Token", async () => {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY2 || '',
		secret: process.env.YAHOO_CLIENT_SECRET2 || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE2 || '',
	};

	const yahoo = new YahooSports(config, './temp/temp.token.json');

	// await yahoo.getToken();

	await yahoo.refreshToken();

	const tokenData = JSON.parse(await fs.readFile('./temp/temp.token.json', 'utf8'));

	expect(tokenData).toHaveProperty('access_token');
	expect(tokenData).toHaveProperty('refresh_token');
	expect(tokenData).toHaveProperty('expires_in');
	expect(tokenData).toHaveProperty('token_type');
	expect(tokenData.expires_in).toBe(3600);
	expect(tokenData.token_type).toBe('bearer');
});
