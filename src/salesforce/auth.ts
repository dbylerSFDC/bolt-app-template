import jsforce from "jsforce";
import dotenv from "dotenv";
dotenv.config();

const redirectUri = process.env.SALESFORCE_CALLBACK;
const loginUrl = process.env.SALESFORCE_LOGIN_URL;
const userName = process.env.SALESFORCE_USER;
const password = process.env.SALESFORCE_PASSWORD;
const token = process.env.SALESFORCE_SECURITY_TOKEN;
const combinedToken = (password! + token!) as string;

class SFDCConnection {
  conn?: jsforce.Connection;
  accessToken?: string;
  instanceUrl?: string;
  tokenStart?: Date;
  tokenExpiration = 60 * 60; // In seconds, 60 minutes

  /**
   * @param refresh If the token has expired and we need to attempt a re-login.
   */
  async connectToSFDC(refresh?: boolean) {
    console.log("Hit connectToSFDC()");

    this.conn = new jsforce.Connection({
      oauth2: {
        loginUrl: loginUrl,
        redirectUri: redirectUri,
      },
    });

    console.log("LOGGING IN TO SFDC....");
    let result = await this.conn.login(userName!, password! + token!);
    console.log(result);

    console.log("SFDC Connection has been established successfully");

    this.accessToken = this.conn?.accessToken;
    this.instanceUrl = this.conn?.instanceUrl;
    this.tokenStart = new Date();

    return this.conn;
  }

  async getConnection() {
    if (!this.tokenStart) {
      return await this.connectToSFDC();
    }

    const now = new Date();
    const tokenDuration = (now.getTime() - this.tokenStart.getTime()) / 1000;
    if (tokenDuration > this.tokenExpiration) {
      return await this.connectToSFDC();
    }


    try {
      console.log("Getting connection via accessToken");
      return new jsforce.Connection({
        instanceUrl: this.instanceUrl,
        accessToken: this.accessToken,
      });
    } catch (e) {
      console.log(`getConnection() failed ===> ${e}`);
    }
  }
}

export default new SFDCConnection();