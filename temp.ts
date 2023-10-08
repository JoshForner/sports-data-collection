import axios from 'axios';
import qs from 'qs';
import * as fs from "fs";
export class YahooSports {
  client: {
    key: string;
    secret: string;
  };
  authHeader: string;

  constructor(clientKey: string, clientSecret: string) {
      this.client= {
        key: clientKey,
        secret: clientSecret,
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
      },
      data: qs.stringify({
        client_id: this.client.key,
        client_secret: this.client.secret,
        redirect_uri: 'oob',
        code: process.env.YAHOO_AUTHORIZATION_CODE,
        grant_type: 'authorization_code'
      }),
      timeout: 10000,
    }).then((res) => {
      fs.writeFileSync('./temp/token.json', JSON.stringify(res.data));
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
      },
      data: qs.stringify({
        redirect_uri: 'oob',
        grant_type: 'refresh_token',
        refresh_token: token
      }),
      timeout: 10000,
    }).then((res) => {
      fs.writeFileSync('./temp/token.json', JSON.stringify(res.data));
    }).catch((err) => {
      console.error(`Error in refreshAuthorizationToken(): ${err}`);
    });
  }
}
