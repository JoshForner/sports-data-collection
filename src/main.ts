import { YahooSports } from "./yahoo";
async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSports(config);

	// await yahoo.getToken();

	// await yahoo.refreshToken();

	// const url = 'https://fantasysports.yahooapis.com/fantasy/v2/player/423.p.30977/stats';
	// const url = 'https://fantasysports.yahooapis.com/fantasy/v2/game/nfl';
	// const url = 'https://fantasysports.yahooapis.com/fantasy/v2/league/423.l.628518/metadata';
	const url = 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games';
	const res = await yahoo.callApi(url);
	console.log(res); // why is this undefined?
}

main();
