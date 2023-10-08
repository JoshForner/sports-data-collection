import { YahooSports } from "./yahoo";
async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config);

	// await yahoo.getToken();

	await yahoo.refreshToken();
}

main();
