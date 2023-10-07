import {AuthorizationCode} from 'simple-oauth2';

export class YahooSports {
  refreshToken: string;
  accessToken: string;
  config: {
    client: {
      id: string;
      secret: string;
    };
    auth: {
      tokenHost: string;
    };
  };

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
  }

  async getToken() {
    const client = new AuthorizationCode(this.config);

    const tokenParams = {
      code: process.env.YAHOO_AUTHORIZATION_CODE,
      redirect_uri: 'oob',
      grant_type: 'authorization_code'
    };

    try {
      const accessToken = await client.getToken(tokenParams);
      console.log(accessToken);
    } catch (error) {
      console.log('Access Token Error', error.message);
    }
  }
}
