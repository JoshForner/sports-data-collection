import { YahooSportsWrapper } from './YahooWrapper';
import { promises as fs } from 'fs';

async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSportsWrapper(config);

	// Generate the stat categories for the NFL
	await yahoo.generateStatCategories('nfl');
	// Generate a player's stats for the NFL
	await fs.writeFile('./yahoo-info/nfl.player.json', JSON.stringify(await yahoo.getPlayerStats('423.p.30977'), null, '\t'));
	// TODO Figure out how to map the player's stats to the stat categories
}

main();
