import { App, ButtonAction } from "@slack/bolt";
import { setApproval } from "../salesforce/service";

export class ApprovalResponseConfirmation {
  constructor(app: App) {
    app.view("approval_response_confirmation", async ({ body, view, ack }) => {
      await ack();
      let metadata = JSON.parse(view.private_metadata);
      let caseId = metadata.caseId;
      let approvalAction = metadata.action;

      let comments = view.state.values.commentsBlock.comments.value;
      setApproval(caseId, approvalAction, comments!);
    });
  }
}
