import { YahooSports } from "./yahoo";
async function main() {
	const yahoo = new YahooSports(
		process.env.YAHOO_CLIENT_KEY || '',
		process.env.YAHOO_CLIENT_SECRET || ''
	);

	// const token = await yahoo.getToken();

	await yahoo.refreshToken();
}

main();
