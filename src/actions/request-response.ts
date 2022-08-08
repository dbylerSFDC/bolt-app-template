import { App, ButtonAction } from "@slack/bolt";
import { setApproval } from "../salesforce/service";

export class RequestResponse {
  constructor(app: App) {
    app.action({ type: "block_actions", action_id: "approve" }, async ({ body, action, ack }) => {
      ack();
      let caseId = (<ButtonAction>action).value;
      let comments = "Approved in Slack and ready for the next manager to approve!";
      let approvalAction = "Approve";
      setApproval(caseId, approvalAction, comments);
    });
    app.action({ type: "block_actions", action_id: "deny" }, async ({ body, action, ack }) => {
      ack();
      let caseId = (<ButtonAction>action).value;
      let comments = "Denied from Slack!";
      let approvalAction = "Reject";
      setApproval(caseId, approvalAction, comments);
    });
  }
}