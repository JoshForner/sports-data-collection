import {AuthorizationCode} from 'simple-oauth2';

export class YahooSports {
  config: {
    client: {
      id: string;
      secret: string;
    };
    auth: {
      tokenHost: string;
    };
  };
  authHeader: string;

  constructor(clientKey: string, clientSecret: string) {
    this.config = {
      client: {
        id: clientKey,
        secret: clientSecret,
      },
      auth: {
        tokenHost: 'https://api.login.yahoo.com'
      }
    };
    this.authHeader = Buffer.from(`${clientKey}:${clientSecret}`, `binary`).toString(`base64`);
  }

  async getToken() {
    const client = new AuthorizationCode(this.config);

    const tokenParams = {
      code: process.env.YAHOO_AUTHORIZATION_CODE || '',
      redirect_uri: 'oob',
      grant_type: 'authorization_code'
    };

    try {
      const accessToken = await client.getToken(tokenParams,{
        headers: {
          'Authorization': `Basic ${this.authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
        },
      });
      console.log(accessToken);
    } catch (error) {
      console.log('Access Token Error', error);
    }
  }
}
