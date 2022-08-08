import dotenv from "dotenv";
import { App, ExpressReceiver } from "@slack/bolt";
import { SlackActions } from "./slackActions";
import SFDCConnection from "./salesforce/auth";
import { getCaseId, updateApproval } from "./salesforce/service";
const persistedClient = require("./store/web-client");
import { CaseApprovalMessage } from "$messages/case-approval-message";
import { parse } from "querystring";

(async () => {
  dotenv.config();

  const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET! });

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    customRoutes: [
      {
        path: "/sample-route",
        method: ["POST"],
        handler: (req, res) => {
          let body = "";
          req.on("data", (buffer) => {
            body += decodeURIComponent(buffer.toString());
          });
          req.on("end", async () => {
            const result = parse(body);
            let id = result.id;
            let description = result.description;
            let priority = result.priority;
            console.log(id);
            console.log(description);
            //@ts-ignore
            new CaseApprovalMessage().postMessage(app, "U02GVNNUJDR", id!, description!, priority!);

            res.writeHead(200);
            res.end();
          });

          //@ts-ignore
          // console.log(req.body)
          // let params = new URL("localhost:3000" + req.url!).searchParams;
          // let id = params.get("id");
          // let description = params.get("description");
          // let priority = params.get("priority");

          // res.writeHead(200);
          // console.log("MESSSAGE GIVEN!");
          // res.end("Health check displayed here!");
        },
      },
    ],
  });

  // const customRoutesApp = new App({
  //   token: process.env.SLACK_BOT_TOKEN,
  //   signingSecret: process.env.SLACK_SIGNING_SECRET,
  //   socketMode: true,
  //   appToken: process.env.SLACK_APP_TOKEN,
  //   customRoutes: [
  //     {
  //       path: "/sample-route",
  //       method: ["GET"],
  //       handler: (req, res) => {
  //         let params = new URL("localhost:3000" + req.url!).searchParams;
  //         let test = params.get("test");
  //         console.log(test);
  //         res.writeHead(200);
  //         console.log("MESSSAGE GIVEN!");
  //         res.end("Health check displayed here!");
  //       },
  //     },
  //   ],
  // });

  // All action files are auto-initialized
  new SlackActions(app).start();
  await app
    .start(3000)
    .then(() => console.log("⚡️ Bolt app is running!"))
    .catch((e) => {
      throw new Error(`😱 Bolt app failed to start\n ${e}`);
    });

  await SFDCConnection.connectToSFDC();

  persistedClient.client = app.client;

  receiver.router.post("/secret-page", (req, res) => {
    // You're working with an express req and res now.
    res.send("yay!");
  });
})();
