import axios from 'axios';
import qs from 'qs';
export class YahooSports {
  config: {
    client: {
      key: string;
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
        key: clientKey,
        secret: clientSecret,
      },
      auth: {
        tokenHost: 'https://api.login.yahoo.com'
      }
    };
    this.authHeader = Buffer.from(`${clientKey}:${clientSecret}`, `binary`).toString(`base64`);
  }

  async getToken() {
    return axios({
      url: `https://api.login.yahoo.com/oauth2/get_token`,
      method: 'post',
      headers: {
        'Authorization': `Basic ${this.authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
      },
      data: qs.stringify({
        client_id: this.config.client.key,
        client_secret: this.config.client.secret,
        redirect_uri: 'oob',
        code: process.env.YAHOO_AUTHORIZATION_CODE,
        grant_type: 'authorization_code'
      }),
      timeout: 10000,
    }).then((res) => {
      return res;
    }).catch((err) => {
      console.error(`Error in getInitialAuthorization(): ${err}`);
    });
  }

  async refreshAuthorizationToken(token) {
    return axios({
      url: `https://api.login.yahoo.com/oauth2/get_token`,
      method: 'post',
      headers: {
        'Authorization': `Basic ${this.authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
      },
      data: qs.stringify({
        redirect_uri: 'oob',
        grant_type: 'refresh_token',
        refresh_token: token
      }),
      timeout: 10000,
    }).catch((err) => {
      console.error(`Error in refreshAuthorizationToken(): ${err}`);
    });
  }
}
