import { App } from "@slack/bolt";
import { CaseApprovalMessage } from "$messages/case-approval-message";

export class CustomHook {
  app: App;
  constructor(app: App) {
    this.app = app;
    this.listen();
  }

  listen() {
    this.app.message(":wave:", async ({ event, body, client }) => {
      //this.renderAndSendMessage(app, event.channel);
      //this.createChannelAndInvite(app, event);
    });
  }

  async createChannelAndInvite(app: App, event: any) {
    let user = event.user;

    let channelName = "testing-trailblazer-ranch-bot-channel-3";

    let users = new Array();
    users.push(user);
    let usersString = users.join();

    console.log(usersString);
    let result = await app.client.conversations.create({ name: channelName });
    console.log(result);
    if (result.ok == true && result.channel?.id) {
      let inviteResult = await app.client.conversations.invite({
        channel: result.channel.id,
        users: usersString,
      });
      console.log(inviteResult);
    }
  }
}
