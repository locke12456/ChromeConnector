/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const { ACTIVITY_TYPE } = require("../constants");
const { CDPConnector } = require("./chrome/event");
class ChromeConnector {
    constructor() {
        // Internal properties
        this.payloadQueue = [];
        this.connector = undefined;
        // Public methods
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.willNavigate = this.willNavigate.bind(this);
        this.sendHTTPRequest = this.sendHTTPRequest.bind(this);
        this.setPreferences = this.setPreferences.bind(this);
        this.triggerActivity = this.triggerActivity.bind(this);
        this.viewSourceInDebugger = this.viewSourceInDebugger.bind(this);
    }

    async connect(connection, actions, getState) {
        const { tabConnection } = connection;
        //this.tabTarget = connection.tabConnection.tabTarget;
        this.actions = actions;
        this.connector = new CDPConnector();
        this.connector.setup(tabConnection,this.actions);
        this.connector.willNavigate(this.willNavigate);
        // TODO : research, currently all events are about "navigation" is not support on CDP
    }
    async disconnect() {
        this.connector.disconnect();
    }

    willNavigate() {
        this.actions.batchReset();
        this.actions.clearRequests();
    }

    async fetchResponseCookies(responseCookies) {
        // TODO : research, currently Network.getCookie can't mapping to any response header via id or domain
    }

    async fetchRequestCookies(requestCookies) {
        // TODO : research, currently Network.getCookie can't mapping to any request header via id or domain
    }
    /**
     * Triggers a specific "activity" to be performed by the frontend.
     * This can be, for example, triggering reloads or enabling/disabling cache.
     *
     * @param {number} type The activity type. See the ACTIVITY_TYPE const.
     * @return {object} A promise resolved once the activity finishes and the frontend
     *                  is back into "standby" mode.
     */
    triggerActivity(type) {
        // Puts the frontend into "standby" (when there's no particular activity).
        let standBy = () => {
            this.currentActivity = ACTIVITY_TYPE.NONE;
        };

        // Waits for a series of "navigation start" and "navigation stop" events.
        let waitForNavigation = () => {
            return new Promise((resolve) => {
                resolve();//not support
            });
        };

        // Reconfigures the tab, optionally triggering a reload.
        let reconfigureTab = (options) => {
            return new Promise((resolve) => {
                resolve();// not support
            });
        };

        // Reconfigures the tab and waits for the target to finish navigating.
        let reconfigureTabAndWaitForNavigation = (options) => {
            options.performReload = true;
            let navigationFinished = waitForNavigation();
            return reconfigureTab(options).then(() => navigationFinished);
        };
        switch (type) {
            case ACTIVITY_TYPE.RELOAD.WITH_CACHE_ENABLED:
                this.currentActivity = ACTIVITY_TYPE.ENABLE_CACHE;
            case ACTIVITY_TYPE.RELOAD.WITH_CACHE_DEFAULT:
                return this.connector.reset().then( () => this.connector.Page.reload().then(standBy) );//then( () => this.connector.reset() );

                /*
                this.tabTarget.once("will-navigate", () => {
                    this.currentActivity = type;
                });
                return reconfigureTabAndWaitForNavigation({
                    cacheDisabled: false,
                    performReload: true,
                }).then(standBy);
                */
            case ACTIVITY_TYPE.RELOAD.WITH_CACHE_DISABLED:
                this.currentActivity = ACTIVITY_TYPE.DISABLE_CACHE;
                /*
                this.tabTarget.once("will-navigate", () => {
                    this.currentActivity = type;
                });
                return reconfigureTabAndWaitForNavigation({
                    cacheDisabled: true,
                    performReload: true,
                }).then(standBy);
                */
            case ACTIVITY_TYPE.ENABLE_CACHE:
                this.currentActivity = type;
                /*
                return reconfigureTab({
                    cacheDisabled: false,
                    performReload: false,
                }).then(standBy);
                */
            case ACTIVITY_TYPE.DISABLE_CACHE:
                this.currentActivity = type;
                /*
                return reconfigureTab({
                    cacheDisabled: true,
                    performReload: false,
                }).then(standBy);*/
        }
        this.currentActivity = ACTIVITY_TYPE.NONE;
        return Promise.reject(new Error("Invalid activity type"));
    }
    /**
     * Send a HTTP request data payload
     *
     * @param {object} data data payload would like to sent to backend
     * @param {function} callback callback will be invoked after the request finished
     */
    sendHTTPRequest(data, callback) {
        // TODO : not support. currently didn't provide this feature in CDP API.
    }
    setPreferences()
    {
        // TODO : implement.
    }
    viewSourceInDebugger()
    {
        // TODO : implement.
    }
}

module.exports = new ChromeConnector();