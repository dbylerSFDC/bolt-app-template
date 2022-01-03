require("dotenv").config();
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

import { FeatureAction } from "./actions";

new FeatureAction(app);

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
