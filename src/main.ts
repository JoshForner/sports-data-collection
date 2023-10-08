import { YahooSports } from "./yahoo";
async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config);

	// await yahoo.getToken();

	//await yahoo.refreshToken();

	const url = 'https://fantasysports.yahooapis.com/fantasy/v2/game/nfl';
	const res = await yahoo.callApi(url);
	console.log(res); // why is this undefined?
}

main();
