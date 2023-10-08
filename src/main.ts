import { YahooSportsWrapper } from "./yahoo-wrapper";

async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSportsWrapper(config);

	console.log(await yahoo.getStatCategories('mlb'));
}

main();
