import dotenv from "dotenv";
import { App } from "@slack/bolt";
import { SlackActions } from "./slackActions";
import SFDCConnection from "./salesforce/auth";
import { SendApprovalRequest } from "endpoints/send-approval-request";

(async () => {
  dotenv.config();

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    customRoutes: [
      {
        path: "/send-approval-request",
        method: ["POST"],
        handler: (req, res) => {
          new SendApprovalRequest().handleRoute(app, req, res);
        },
      },
    ],
  });

  new SlackActions(app).start();
  await app
    .start(3000)
    .then(() => console.log("⚡️ Bolt app is running!"))
    .catch((e) => {
      throw new Error(`😱 Bolt app failed to start\n ${e}`);
    });

  await SFDCConnection.connectToSFDC();
})();
