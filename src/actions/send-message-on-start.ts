import { App } from "@slack/bolt";
import { HelloWorldMessage } from "$messages/hello-world-message";

export class HelloWorld {
  messageSent: boolean = false;

  constructor(app: App) {
    app.event("app_home_opened", async ({ event, body, client }) => {
      this.renderAndSendMessage(app, event.user);
    });
  }

  renderAndSendMessage(app: App, user: string) {
    if (!this.messageSent) {
      new HelloWorldMessage().postMessage(app, user);
      this.messageSent = true;
    }
  }
}
