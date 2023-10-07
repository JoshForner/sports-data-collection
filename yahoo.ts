import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import parser from 'xml2json';

export class YahooSports {
  authorizationCode: string;
  client: {
    key: string;
    secret: string;
  };
  request: {
    tokenHost: 'https://api.login.yahoo.com';
    tokenPath: '/oauth2/get_token';
    contentType: 'application/x-www-form-urlencoded';
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';
  };
  authHeader: string;
  refreshToken: string;
  accessToken: string;

  constructor(clientKey: string, clientSecret: string, authorizationCode: string) {
    this.client = {
        key: clientKey,
        secret: clientSecret,
    };
    this.authorizationCode = authorizationCode;
    this.authHeader = `Basic ${Buffer.from(`${this.client.key}:${this.client.secret}`).toString('base64')}`;
  }

  async getToken() {
    return await axios({
      url: this.request.tokenHost + this.request.tokenPath,
      method: 'post',
      headers: {
        'Authorization': `Basic ${this.authHeader}`,
        'Content-Type': this.request.contentType,
        'User-Agent': this.request.userAgent,
      },
      data: qs.stringify({
        client_id: this.client.key,
        client_secret: this.client.secret,
        redirect_uri: 'oob',
        code: this.authorizationCode,
        grant_type: 'authorization_code'
      }),
      timeout: 1000,
    }).then((res) => {
      console.log(res);
      return res;
    })
      .catch((err) => {
      console.error(`Error in getInitialAuthorization(): ${err}`);
    });
  }

  async refreshAuthorizationToken(token: string | void | AxiosResponse<any, any>) {
    return await axios({
      url: this.request.tokenHost + this.request.tokenPath,
      method: 'post',
      headers: {
        'Authorization': `Basic ${this.authHeader}`,
        'Content-Type': this.request.contentType,
        'User-Agent': this.request.userAgent,
      },
      data: qs.stringify({
        redirectUri: 'oob',
        grantType: 'refresh_token',
        refreshToken: token
      }),
      timeout: 10000,
    }).catch((err) => {
      console.error(`Error in refreshAuthorizationToken(): ${err}`);
    });
  }

  async makeAPIrequest(url: string): Promise<any> {
    let response;
    try {
      response = await axios({
        url: url,
        method: 'get',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': this.request.contentType,
          'User-Agent': this.request.userAgent,
        },
        timeout: 10000,
      });
      const jsonData = JSON.parse(parser.toJson(response.data));
      return jsonData;
    } catch (err) {
      if (err.response.data && err.response.data.error && err.response.data.error.description && err.response.data.error.description.includes("token_expired")) {
        const newToken = await this.refreshAuthorizationToken(this.refreshToken);
        if (newToken && newToken.data && newToken.data.access_token) {
          this.refreshToken = newToken.data.refresh_token;
          this.accessToken = newToken.data.access_token;

          return this.makeAPIrequest(url);

        }
      } else {
        console.error(`Error with credentials in makeAPIrequest()/refreshAuthorizationToken(): ${err}`);
        process.exit();
      }
    }
  }
}
