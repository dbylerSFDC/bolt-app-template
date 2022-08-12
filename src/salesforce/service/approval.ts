import SFDCConnection from "../auth";

export async function setApproval(id: string, action: string, comments: string) {
  const conn = await SFDCConnection.getConnection();
  var body = { CaseIdString: id, approvalAction: action, comments: comments };
  conn!.apex.post("/ApprovalResponse/", body, function(err, res) {
    if (err) {
      return console.error(err);
    }
    console.log("response: ", res);
  });
}

export async function getApprovals() {

}
