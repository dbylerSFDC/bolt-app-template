import { ApprovalResponseModal } from "$modals";
import { App, ButtonAction } from "@slack/bolt";

export class RequestResponse {
  constructor(app: App) {
    app.action({ type: "block_actions", action_id: "approve" }, async ({ body, action, ack }) => {
      ack();
      let caseId = (<ButtonAction>action).value;
      let approvalAction = "Approve";
      let trigger_id = body.trigger_id;
      new ApprovalResponseModal().openModal(app, trigger_id, caseId, approvalAction);
    });
    app.action({ type: "block_actions", action_id: "deny" }, async ({ body, action, ack }) => {
      ack();
      let caseId = (<ButtonAction>action).value;
      let approvalAction = "Reject";
      let trigger_id = body.trigger_id;
      new ApprovalResponseModal().openModal(app, trigger_id, caseId, approvalAction);
    });
  }
}
