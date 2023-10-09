import { YahooSportsWrapper } from './YahooWrapper';

async function main() {
	const config = {
		key: process.env.YAHOO_CLIENT_KEY || '',
		secret: process.env.YAHOO_CLIENT_SECRET || '',
		authorizationCode: process.env.YAHOO_AUTHORIZATION_CODE || '',
	};

	const yahoo = new YahooSportsWrapper(config);

	// Generate the stat categories for the current NFL Season
	await yahoo.generateStatCategories('nfl');
	// Generate a player's stats for the current NFL Season
	await yahoo.generatePlayerStats('423.p.30977');
	// TODO Figure out how to map the player's stats to the stat categories
}

main();
