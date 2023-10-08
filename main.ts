import { YahooSports } from "./temp";
async function main() {
  const yahoo = new YahooSports(
    process.env.YAHOO_CLIENT_KEY || '',
    process.env.YAHOO_CLIENT_SECRET || ''
  );

  // const token = await yahoo.getToken();
  // console.log(token);

  const refresh = await yahoo.refreshAuthorizationToken(process.env.YAHOO_REFRESH_TOKEN || '');
  console.log(refresh);
}

main();
