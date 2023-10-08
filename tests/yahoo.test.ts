// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expect, test } from "bun:test";
import { YahooSports } from "../src/yahoo";
import { promises as fs } from 'fs';

test("Get Token", async () => {
	const config = {
		key: process.env.YAHOO_TEST_CLIENT_KEY || '',
		secret: process.env.YAHOO_TEST_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_TEST_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config, './temp/test.token.json');

	await yahoo.getToken();

	const tokenData = JSON.parse(await fs.readFile('./temp/test.token.json', 'utf8'));

	expect(tokenData).toHaveProperty('access_token');
	expect(tokenData).toHaveProperty('refresh_token');
	expect(tokenData).toHaveProperty('expires_in');
	expect(tokenData).toHaveProperty('token_type');
	expect(tokenData.expires_in).toBe(3600);
	expect(tokenData.token_type).toBe('bearer');
});

test("Refresh Token", async () => {
	const config = {
		key: process.env.YAHOO_TEST_CLIENT_KEY || '',
		secret: process.env.YAHOO_TEST_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_TEST_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config, './temp/test.token.json');

	await yahoo.refreshToken();

	const tokenData = JSON.parse(await fs.readFile('./temp/test.token.json', 'utf8'));

	expect(tokenData).toHaveProperty('access_token');
	expect(tokenData).toHaveProperty('refresh_token');
	expect(tokenData).toHaveProperty('expires_in');
	expect(tokenData).toHaveProperty('token_type');
	expect(tokenData.expires_in).toBe(3600);
	expect(tokenData.token_type).toBe('bearer');
});
