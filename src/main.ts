import { YahooSportsWrapper } from './YahooWrapper';
import { promises as fs } from 'fs';

async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSportsWrapper(config);

	await yahoo.generateStatCategories('nfl');
	await fs.writeFile('./yahoo-info/nfl.josh_allen.json', JSON.stringify(await yahoo.getPlayerStats('423.p.30977'), null, '\t'));
}

main();
