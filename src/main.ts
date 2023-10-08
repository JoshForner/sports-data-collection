import { YahooSportsWrapper } from "./yahoo-wrapper";
import { promises as fs } from 'fs';

async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSportsWrapper(config);

	await fs.writeFile('./yahoo-info/nfl.stat_categories.json', JSON.stringify(await yahoo.getStatCategories('nfl'), null, "\t"));
}

main();
