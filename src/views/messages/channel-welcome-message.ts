import { App } from "@slack/bolt";
import { Message, Blocks, Elements } from "slack-block-builder";

export class ChannelWelcomeMessage {
  async postMessage(app: App, channel: string) {
    const message = Message();
    message.text("Welcome to your Trailblazer Ranch visit headquarters!");
    message.blocks(
      Blocks.Section().text("Welcome to your Trailblazer Ranch visit headquarters!"),
      Blocks.Section().text(
        "\nIn this channel you'll be able to access handy links, chat with your fellow attendees, and get instant help from our on-site team."
      ),
      Blocks.Section().text(
        "\nTo get started, ensure you've completed the following tasks in the <link.com|TBR Portal>.\n •\tKit Selection\n •\tPre-arrival Checklist\n •\tDining Preference"
      ),
      Blocks.Actions().elements(
        Elements.Button()
          .actionId("ack")
          .url("https://example.com")
          .text("Open TBR Portal")
      )
    );
    message.channel(channel);

    await app.client.chat.postMessage(message.buildToObject());
  }
}
