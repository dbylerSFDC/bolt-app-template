import { App } from "@slack/bolt";

const actionIds = ["ack"];

export class AcknowledgeEvents {
  app: App;

  constructor(app: App) {
    this.app = app;
    this.listen();
  }

  listen() {
    actionIds.forEach((actionId) =>
      this.app.action(actionId, async ({ ack }) => {
        await ack();
      })
    );
  }
}
