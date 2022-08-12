import { App } from "@slack/bolt";
import { ChannelWelcomeMessage } from "$messages";
import { parse } from "querystring";

import { IncomingMessage, ServerResponse } from "http";

export class Approved {
  constructor() {}
  handleRoute(app: App, req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (buffer) => {
      body += decodeURIComponent(buffer.toString());
    });
    req.on("end", async () => {
      const result = parse(body);
      console.log(result);
      let subject = result.subject;
      console.log(result);
      let user = "U02GVNNUJDR";
      let channelName = "testing-trailblazer-ranch-bot-channel-4";
      this.createChannelAndInvite(app, user, channelName);
      res.writeHead(200);
      res.end();
    });
  }

  async createChannelAndInvite(app: App, user: string, channelName: string) {
    let users = new Array();
    users.push(user);
    let usersString = users.join();

    let chan = "C03T7FSJVJ8";

    let result = await app.client.conversations.create({ name: channelName });
    if (result.ok == true && result.channel?.id) {
      let inviteResult = await app.client.conversations.invite({
        channel: result.channel.id,
        users: usersString,
      });
      await new ChannelWelcomeMessage().postMessage(app, result.channel.id);
      console.log(inviteResult);
    }
  }
}
