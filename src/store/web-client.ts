"use strict";

// Singleton Class to persist the Slack WebClient Object
class SlackWebClient {
  client;
  constructor() {
    this.client = {};
  }
}

module.exports = new SlackWebClient();
