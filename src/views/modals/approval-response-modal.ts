import { App, View } from "@slack/bolt";
import { Modal, Blocks, Elements } from "slack-block-builder";

export class ApprovalResponseModal {
  async openModal(app: App, trigger_id: string, caseId: string, action: string) {
    let privateMetaData = {
      caseId: caseId,
      action: action,
    };
    const modal = Modal();
    modal.title(action + " Case");
    modal.callbackId("approval_response_confirmation");
    modal.blocks(
      Blocks.Input()
        .label("Comments")
        .element(
          Elements.TextInput()
            .multiline()
            .actionId("comments")
        )
        .blockId("commentsBlock")
    );
    modal.submit(action);
    modal.close("Cancel");
    modal.privateMetaData(JSON.stringify(privateMetaData));
    const view = (modal.buildToJSON() as unknown) as View;

    try {
      await app.client.views.open({ trigger_id: trigger_id, view });
    } catch (e) {
      console.error(e);
    }
  }
}
