/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class ChromeConnector {
    constructor() {
        // Internal properties
        this.payloadQueue = [];

        // Public methods
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.sendHTTPRequest = this.sendHTTPRequest.bind(this);
        this.setPreferences = this.setPreferences.bind(this);
        this.triggerActivity = this.triggerActivity.bind(this);
        this.inspectRequest = this.inspectRequest.bind(this);
        this.getLongString = this.getLongString.bind(this);
        this.getNetworkRequest = this.getNetworkRequest.bind(this);
        this.getTabTarget = this.getTabTarget.bind(this);
        this.viewSourceInDebugger = this.viewSourceInDebugger.bind(this);
        
    }
    disconnect()
    {
        // TODO : implement.
    }
    connect(connection, actions, getState)
    {
        // TODO : implement.
    }
    inspectRequest()
    {
        // TODO : implement.
    }
    getLongString()
    {
        // TODO : implement.
    }
    getNetworkRequest()
    {
        // TODO : implement.
    }
    getTabTarget()
    {
        // TODO : implement.
    }
    sendHTTPRequest()
    {
        // TODO : implement.
    }
    setPreferences()
    {
        // TODO : implement.
    }
    triggerActivity()
    {
        // TODO : implement.
    }
    viewSourceInDebugger()
    {
        // TODO : implement.
    }
}