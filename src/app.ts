import dotenv from "dotenv";
import { App } from "@slack/bolt";
import { SlackActions } from "./slackActions";

(async () => {
  dotenv.config();

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  // All action files are auto-initialized
  new SlackActions(app).start();

  await app
    .start()
    .then(() => console.log("⚡️ Bolt app is running!"))
    .catch((e) => {
      throw new Error(`😱 Bolt app failed to start\n ${e}`);
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Other code and configurations go here 👇 (e.g. starting database connections) //

  //////////////////////////////////////////////////////////////////////////////////
})();
