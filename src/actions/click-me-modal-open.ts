/**
 * Example of an action
 */
import { Constants } from "$constants";
import { ClickMeModal } from "$modals/click-me";
import { App } from "@slack/bolt";

export class ClickMeModalOpen {
  app: App;

  constructor(app: App) {
    this.app = app;

    this.listen();
  }

  listen() {
    this.app.action(
      {
        type: Constants.BLOCK_ACTIONS,
        action_id: "click_me_modal_open",
      },
      async ({ body, action, ack }) => {
        await ack();
        new ClickMeModal().openModal(this.app, body.trigger_id);
      }
    );
  }
}
