import { App } from "@slack/bolt";
import { CaseApprovalMessage } from "$messages/case-approval-message";

export class CustomHook {
  app: App;
  constructor(app: App) {
    this.app = app;
    this.listen();
  }

  listen() {
    this.app.message(":wave:", async ({ event, body, client }) => {
      //this.renderAndSendMessage(app, event.channel);
      //   this.createChannelAndInvite(app, event);
    });
  }
  renderAndSendMessage(app: App, user: string) {
    // new CaseApprovalMessage().postMessage(this.app, user);
  }
}

/*
HttpRequest req = new HttpRequest();
req.setMethod('GET');     
//you don't need this                               
//Seting HttpRequest Method
//req.setHeader('content-type', 'application/json');       
//Seting HttpRequest header properties
//req.setHeader('Content-Length', '2000');
req.setEndpoint('https://1395-73-187-247-100.ngrok.io/sample-route?test=10' );
Http http = new Http();
try{
    HTTPResponse res = http.send(req);                 
    //Executing web service call
    System.debug('STATUS:' + res.getStatus());
    System.debug('STATUS_CODE:' + res.getStatusCode());
}
catch(System.CalloutException e){
    //Exception handling goes here..
    system.debug(e);
}
// localhost:3000/sample-route?test=10
*/
