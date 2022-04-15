import { App } from "@slack/bolt";
import { Message } from "slack-block-builder";

export class HelloWorldMessage {
  async postMessage(app: App, channel: string) {
    const message = Message();
    message.text("Hello World! ⚡️");
    message.channel(channel);

    await app.client.chat.postMessage(message.buildToObject());
  }
}
