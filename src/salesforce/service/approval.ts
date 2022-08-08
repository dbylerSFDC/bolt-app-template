import SFDCConnection from "../auth";

export async function setApproval(id: string, action: string, comments: string) {
  const conn = await SFDCConnection.getConnection();
  // body payload structure is depending to the Apex REST method interface.
  var body = { CaseIdString: id, approvalAction: action, comments: comments };
  conn!.apex.post("/ApprovalResponse/", body, function(err, res) {
    if (err) {
      return console.error(err);
    }
    console.log("response: ", res);
    // the response object structure depends on the definition of apex class
  });
}

export async function getApprovals() {

}
