import jsforce from "jsforce";
import dotenv from "dotenv";
const request = require("request");
dotenv.config();

const authURL = process.env.MARKETING_CLOUD_AUTH_URL;
const restURL = process.env.MARKETING_CLOUD_REST_URL;
const clientId = process.env.MARKETING_CLOUD_CLIENT_ID;
const clientSecret = process.env.MARKETING_CLOUD_CLIENT_SECRET;

class MarketingCloudConnection {
  conn?: jsforce.Connection;
  accessToken?: string;
  instanceUrl?: string;
  tokenStart?: Date;
  tokenExpiration = 60 * 60; // In seconds, 60 minutes

  /**
   * @param refresh If the token has expired and we need to attempt a re-login.
   */
  async connectToSFDC(refresh?: boolean) {
    console.log("Hit connectToMarketingCloud()");

    request(
      {
        method: "POST",
        url: authURL,
        body: {
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        },
        headers: {
          "content-type": "application/json",
        },
        json: true,
      },
      //@ts-ignore
      function(err, response, body) {
        if (err) {
          return console.error(err);
        }
        var ret = body;
        // console.log(ret);
        let conn = new jsforce.Connection({
          accessToken: ret.access_token,
          instanceUrl: ret.instance_url,
        });

        let requestBody = {
          definitionKey: "TBR_APITrigger",
          recipient: {
            contactKey: "dbyler@salesforce",
            to: "dbyler@salesforce.com",
          },
        };

        let messageKey = "dsfsdsdsdsdf";
        var _request = {
          url: restURL + "/messaging/v1/email/messages/" + messageKey,
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        };

        conn.request(_request).then(
          (value) => {
            console.log(value); // Success!
          },
          (reason) => {
            console.error(reason); // Error!
          }
        );
        console.log("Here");
      }
    );
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

export default new MarketingCloudConnection();
