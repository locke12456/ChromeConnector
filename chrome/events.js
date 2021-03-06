/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const {EVENTS} = require("../../constants");
const {Payloads} = require("./utils");
const {getBulkLoader, PriorityLevels} = require("./bulk-loader");

class CDPConnector {
  constructor() {
    this.payloads = new Payloads();
    this.onNetworkUpdate = this.onNetworkUpdate.bind(this);
    this.onResponseReceived = this.onResponseReceived.bind(this);
    this.onDataReceived = this.onDataReceived.bind(this);
    this.onLoadingFinished = this.onLoadingFinished.bind(this);
    this.onLoadingFailed = this.onLoadingFailed.bind(this);
    this.update = this.update.bind(this);
  }

  setup(connection, actions) {
    let {Network, Page} = connection;
    this.Network = Network;
    this.Page = Page;
    this.actions = actions;
    Network.requestWillBeSent(this.onNetworkUpdate);
    Network.responseReceived(this.onResponseReceived);
    Network.dataReceived(this.onDataReceived);
    Network.loadingFinished(this.onLoadingFinished);
    Network.loadingFailed(this.onLoadingFailed);
    Network.enable();
    Page.enable();
  }

  disconnect() {
    this.Network.disable();
    this.Page.disable();
    this.payloads.clear();
  }

  async reset() {
    return Promise.all([
      this.Network.disable(),
      this.Page.disable(),
      this.payloads.clear(),
      this.Network.enable(),
      this.Page.enable()
    ]);
  }

  willNavigate(event) {
    // not support
  }

  onNetworkUpdate(params) {
    let {requestId} = params;
    let payload = this.payloads.add(requestId);
    return payload.update(params).then(
      ([request, header, postData]) => {
        let bulkloader = getBulkLoader();
        bulkloader.add(
          requestId,
          (resolve, reject) =>
            this.addRequest(requestId, request).then(() => {
              this.updateRequestHeader(requestId, header);
              this.updatePostData(requestId, postData);
              resolve();
            })
          , PriorityLevels.Critical);
      });
  }

  onResponseReceived(params) {
    let {requestId} = params;
    let payload = this.payloads.get(requestId);
    return payload.update(params).then(
      ([request, header, postData, state, timings]) => {
        let loader = getBulkLoader();
        loader.add(
          requestId,
          (resolve) => {
            this.updateResponseHeader(requestId, header);
            this.updateResponseState(requestId, state);
            this.updateResponseTiming(requestId, timings);
            this.getResponseContent(params);
            resolve();
          }
          , PriorityLevels.Major);
      });
  }

  updateRequestHeader(requestId, header) {
    if (!header) {
      return;
    }
    this.update(requestId, {
      requestHeaders: header
    }).then(() => {
      window.emit(EVENTS.RECEIVED_REQUEST_HEADERS, header);
    });
  }

  updateResponseTiming(requestId, timings) {
    if (!timings) {
      return;
    }
    this.update(requestId, {
      eventTimings: timings
    }).then(() => {
      window.emit(EVENTS.RECEIVED_EVENT_TIMINGS, requestId);
    });
  }

  updateResponseState(requestId, state) {
    this.update(requestId, state).then(() => {
      window.emit(EVENTS.STARTED_RECEIVING_RESPONSE, requestId);
    });
  }

  updateResponseHeader(requestId, header) {
    if (!header) {
      return;
    }
    this.update(requestId, {
      responseHeaders: header
    }).then(() => {
      window.emit(EVENTS.RECEIVED_RESPONSE_HEADERS, header);
    });
  }

  onDataReceived(params) {
    let {requestId} = params;
    let payload = this.payloads.get(requestId);
    payload.update(params);
  }

  onLoadingFinished(params) {
    // TODO: verify getCookie method.
    //
  }

  onLoadingFailed(params) {
    // console.log(params.requestId);
  }

  async getResponseContent(params) {
    let {requestId, response} = params;

    return this.Network.getResponseBody({requestId}).then(
      (content) => {
        let payload = this.payloads.get(requestId);
        return payload.update({requestId, response, content}).then(
          ([request, header, postData, state, timings, responseContent]) => {
            let loader = getBulkLoader();
            loader.add(
              requestId,
              (resolve) => {
                this.updateResponseContent(requestId, responseContent);
                return resolve();
              },
              PriorityLevels.Normal
            );
          }
        );
      }
    );
  }

  updateResponseContent(requestId, payload) {
    if (!payload) {
      return null;
    }
    return this.actions.updateRequest(requestId, payload, true).then(
      () => {
        window.emit(EVENTS.RECEIVED_RESPONSE_CONTENT, requestId);
      }
    );
  }

  updatePostData(requestId, postData) {
    if (!postData) {
      return;
    }
    this.update(requestId, {
      requestPostData: postData,
    }).then(() => {
      window.emit(EVENTS.RECEIVED_REQUEST_POST_DATA, requestId);
    });
  }

  async update(id, payload) {
    return this.actions.updateRequest(id, payload, true);
  }

  async addRequest(id, data) {
    let {
      method,
      url,
      isXHR,
      cause,
      startedDateTime,
      fromCache,
      fromServiceWorker,
    } = data;

    this.actions.addRequest(
      id,
      {
        startedMillis: startedDateTime,
        method,
        url,
        isXHR,
        cause,
        fromCache,
        fromServiceWorker,
      },
      true,
    )
      .then(() => window.emit(EVENTS.REQUEST_ADDED, id));
  }
}

module.exports = {
  CDPConnector
};
