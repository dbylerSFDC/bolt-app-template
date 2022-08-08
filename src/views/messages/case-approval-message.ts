import { App } from "@slack/bolt";
import { Message, Blocks, Elements } from "slack-block-builder";

export class CaseApprovalMessage {
  async postMessage(
    app: App,
    channel: string,
    id?: string,
    subject?: string,
    description?: string,
    comments?: string
  ) {
    const message = Message();
    message.text("Hello World! ⚡️");
    message.blocks(
      Blocks.Section().text(
        "*Request for Approval* \nSubject: " +
          subject +
          "\nDescription: " +
          description +
          "\nComments: " +
          comments
      ),
      Blocks.Actions().elements(
        Elements.Button()
          .actionId("approve")
          .primary()
          .value(id)
          .text("Approve"),
        Elements.Button()
          .actionId("deny")
          .danger()
          .value(id)
          .text("Reject")
      )
    );
    message.channel(channel);

    await app.client.chat.postMessage(message.buildToObject());
  }
}
