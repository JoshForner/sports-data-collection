// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expect, test } from "bun:test";
import { YahooSports } from "../src/yahoo";
import * as fs from "fs";

test.todo("Refresh Token", async () => {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config, './tests/token.json');

	await yahoo.refreshToken();

	expect(JSON.parse(fs.readFileSync('token.json').toString())).toHaveProperty('access_token');
});
