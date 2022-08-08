import { App } from "@slack/bolt";
import { CaseApprovalMessage } from "$messages/case-approval-message";
import { getApprovals, setApproval } from "salesforce/service/approval";

export class SampleTrigger {
  constructor(app: App) {
    app.message(":wave:", async ({ event, body, client }) => {
      let caseId = "5008c00001KAxw5AAD";
      let comments = "Approved From Slack!";
      let action = "Approve";

      await setApproval(caseId, action, comments);
      //  this.renderAndSendMessage(app, "U02GVNNUJDR");
      console.log(event);
      // this.createChannelAndInvite(app, event);
    });
  }

  renderAndSendMessage(app: App, user: string) {
    // new CaseApprovalMessage().postMessage(app, user);
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
