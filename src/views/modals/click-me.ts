import { App } from "@slack/bolt";
import { View } from "@slack/types";
import { Modal, ModalBuilder, Blocks } from "slack-block-builder";

export class ClickMeModal {
  async openModal(app: App, trigger: string, channel?: string) {
    const modal = Modal();
    modal.title("Your App");
    this.renderText(modal);
    modal.notifyOnClose(true);
    modal.close("Close");

    const view = (modal.buildToJSON() as unknown) as View;

    try {
      await app.client.views.open({
        trigger_id: trigger,
        view: view,
      });
    } catch (e) {
      console.error(e);
    }
  }

  renderText(view: ModalBuilder) {
    view.blocks(Blocks.Section().text(`Hello World ⚡️`));
  }
}
