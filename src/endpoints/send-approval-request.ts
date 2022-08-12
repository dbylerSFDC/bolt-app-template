import { App, CustomRoute } from "@slack/bolt";
import { CaseApprovalMessage } from "$messages/case-approval-message";
import { parse } from "querystring";
import { IncomingMessage, ServerResponse } from "http";

export class SendApprovalRequest {
  constructor() {}
  handleRoute(app: App, req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (buffer) => {
      body += decodeURIComponent(buffer.toString());
    });
    req.on("end", async () => {
      const result = parse(body);

      if (
        typeof result.id === "string" &&
        typeof result.subject === "string" &&
        typeof result.description === "string" &&
        typeof result.comments === "string"
      )
        new CaseApprovalMessage().postMessage(
          app,
          "U02GVNNUJDR",
          result.id,
          result.subject,
          result.description,
          result.comments
        );

      res.writeHead(200);
      res.end();
    });
  }
}
