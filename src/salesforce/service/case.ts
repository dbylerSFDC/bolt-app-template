import SFDCConnection from "../auth";

export async function getCaseId(id: string) {
  const fields = `
    Id,
    Priority,
    Description
  `;

  //   const where = `pse__End_Date__c > ${currentTime}
  //   AND name LIKE '%${searchTerm}%'`;
  const where = `Id = \'${id}\'`;

  try {
    const conn = await SFDCConnection.getConnection();
    const records = <any[]>await conn
      ?.sobject("Case")
      .select(fields as any)
      .where(where)
      .execute();
    return records;
  } catch (e) {
    console.error(e);
  }
}

export async function updateApproval(caseId: string, approval: string) {
  try {
    const conn = await SFDCConnection.getConnection();
    await conn?.sobject("Case").update(
      {
        Id: caseId,
        Approval__c: approval,
      },
      function(err, ret) {
        if (err || !ret.success) {
          return console.error(err, ret);
        }
        console.log("Updated Successfully : " + ret.id);
      }
    );
  } catch (e) {}

  const fields = `
      Id,
      Priority
    `;

  let id = "5008c00001KAtWZAA1";
  //   const where = `pse__End_Date__c > ${currentTime}
  //   AND name LIKE '%${searchTerm}%'`;
  const where = `Id = \'${id}\'`;

  try {
    const conn = await SFDCConnection.getConnection();
    const records = <any[]>await conn
      ?.sobject("Case")
      .select(fields as any)
      .where(where)
      .execute();
    return records;
  } catch (e) {
    console.error(e);
  }
}

// HttpRequest req = new HttpRequest();
// req.setMethod('GET');
// //you don't need this
// //Seting HttpRequest Method
// //req.setHeader('content-type', 'application/json');
// //Seting HttpRequest header properties
// //req.setHeader('Content-Length', '2000');
// req.setEndpoint('https://1395-73-187-247-100.ngrok.io/sample-route?test=10' );
// Http http = new Http();
// try{
//     HTTPResponse res = http.send(req);
//     //Executing web service call
//     System.debug('STATUS:' + res.getStatus());
//     System.debug('STATUS_CODE:' + res.getStatusCode());
// }
// catch(System.CalloutException e){
//     //Exception handling goes here..
//     system.debug(e);
// }
// // localhost:3000/sample-route?test=10
