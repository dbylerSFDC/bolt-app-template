import { Constants } from "$constants";
import { App } from "@slack/bolt";
import { View } from "@slack/types";
import { HomeTab, Blocks, HomeTabBuilder, Elements } from "slack-block-builder";

export class HomeView {
  // You can change this function if you want, but we recommend keeping it here :)
  async publishHome(app: App, user_id: string) {
    const homeTab = HomeTab();
    this.renderBanner(homeTab);
    this.renderClickMe(homeTab);

    const view = (homeTab.buildToJSON() as unknown) as View;

    try {
      await app.client.views.publish({ user_id, view });
    } catch (e) {
      console.error(e);
    }
  }

  /// A few sample blocks to get you started

  renderBanner(view: HomeTabBuilder) {
    view.blocks(
      Blocks.Image()
        .imageUrl(Constants.BOLT_APP_BANNER)
        .altText("success")
    );
  }

  renderClickMe(view: HomeTabBuilder) {
    view.blocks(
      Blocks.Actions().elements(
        Elements.Button({
          text: "CLICK ME!",
          actionId: "click_me_modal_open",
        }).primary()
      )
    );
  }
}
