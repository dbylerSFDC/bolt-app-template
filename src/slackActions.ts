import * as actions from "$actions";
import { App } from "@slack/bolt";

/**
 * SlackActions is responsible for auto initializing all your classes in your Actions folder.
 * Make sure your class exported in index.ts if an action is not
 */
export class SlackActions {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  start() {
    Object.values(actions).forEach((val) => {
      this.createClass(val);
    });
  }

  private createClass(classRef: any) {
    new classRef(this.app);
  }
}
