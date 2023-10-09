// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { expect, test } from 'bun:test';
import { YahooSportsWrapper } from '../src/YahooWrapper';
import { promises as fs } from 'fs';

const config = {
	key: process.env.YAHOO_TEST_CLIENT_KEY || '',
	secret: process.env.YAHOO_TEST_CLIENT_SECRET || '',
	authorizationCode: process.env.YAHOO_TEST_AUTHORIZATION_CODE || '',
};
const fileInfo = {
	filePath: './temp/test',
	fileName: 'test.token.json',
};
const yahoo = new YahooSportsWrapper(config, fileInfo);
const fullPath = `${fileInfo.filePath}/${fileInfo.fileName}`;

test('Get Token', async () => {
	await yahoo.getToken();

	const tokenData = JSON.parse(await fs.readFile(fullPath, 'utf8'));

	expect(tokenData).toHaveProperty('access_token');
	expect(tokenData).toHaveProperty('refresh_token');
	expect(tokenData).toHaveProperty('expires_in');
	expect(tokenData).toHaveProperty('token_type');
	expect(tokenData.expires_in).toBe(3600);
	expect(tokenData.token_type).toBe('bearer');
});

test('Refresh Token', async () => {
	await yahoo.refreshToken();

	const tokenData = JSON.parse(await fs.readFile(fullPath, 'utf8'));

	expect(tokenData).toHaveProperty('access_token');
	expect(tokenData).toHaveProperty('refresh_token');
	expect(tokenData).toHaveProperty('expires_in');
	expect(tokenData).toHaveProperty('token_type');
	expect(tokenData.expires_in).toBe(3600);
	expect(tokenData.token_type).toBe('bearer');
});
