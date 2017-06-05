/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

class ChromeConnector {
    constructor() {
        // Internal properties
        this.payloadQueue = [];

        // Public methods
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.willNavigate = this.willNavigate.bind(this);
        this.displayCachedEvents = this.displayCachedEvents.bind(this);
        this.onDocLoadingMarker = this.onDocLoadingMarker.bind(this);
        this.addRequest = this.addRequest.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
        this.fetchRequestHeaders = this.fetchRequestHeaders.bind(this);
        this.fetchResponseHeaders = this.fetchResponseHeaders.bind(this);
        this.fetchPostData = this.fetchPostData.bind(this);
        this.fetchResponseCookies = this.fetchResponseCookies.bind(this);
        this.fetchRequestCookies = this.fetchRequestCookies.bind(this);
        this.getPayloadFromQueue = this.getPayloadFromQueue.bind(this);
        this.isQueuePayloadReady = this.isQueuePayloadReady.bind(this);
        this.pushPayloadToQueue = this.pushPayloadToQueue.bind(this);
        this.sendHTTPRequest = this.sendHTTPRequest.bind(this);
        this.setPreferences = this.setPreferences.bind(this);
        this.triggerActivity = this.triggerActivity.bind(this);
        this.inspectRequest = this.inspectRequest.bind(this);
        this.getLongString = this.getLongString.bind(this);
        this.getNetworkRequest = this.getNetworkRequest.bind(this);
        this.getTabTarget = this.getTabTarget.bind(this);
        this.viewSourceInDebugger = this.viewSourceInDebugger.bind(this);

        // Event handlers
        this.onNetworkEvent = this.onNetworkEvent.bind(this);
        this.onNetworkEventUpdate = this.onNetworkEventUpdate.bind(this);
        this.onRequestHeaders = this.onRequestHeaders.bind(this);
        this.onRequestCookies = this.onRequestCookies.bind(this);
        this.onRequestPostData = this.onRequestPostData.bind(this);
        this.onSecurityInfo = this.onSecurityInfo.bind(this);
        this.onResponseHeaders = this.onResponseHeaders.bind(this);
        this.onResponseCookies = this.onResponseCookies.bind(this);
        this.onResponseContent = this.onResponseContent.bind(this);
        this.onEventTimings = this.onEventTimings.bind(this);
    }
    connect()
    {
        //TODO : implement
    }
    disconnect()
    {
        //TODO : implement
    }
    willNavigate()
    {
        //TODO : implement
    }
    displayCachedEvents()
    {
        //TODO : implement
    }
    onDocLoadingMarker()
    {
        //TODO : implement
    }
    addRequest()
    {
        //TODO : implement
    }
    updateRequest()
    {
        //TODO : implement
    }
    fetchImage()
    {
        //TODO : implement
    }
    fetchRequestHeaders()
    {
        //TODO : implement
    }
    fetchResponseHeaders()
    {
        //TODO : implement
    }
    fetchPostData()
    {
        //TODO : implement
    }
    fetchResponseCookies()
    {
        //TODO : implement
    }
    fetchRequestCookies()
    {
        //TODO : implement
    }
    getPayloadFromQueue()
    {
        //TODO : implement
    }
    isQueuePayloadReady()
    {
        //TODO : implement
    }
    pushPayloadToQueue()
    {
        //TODO : implement
    }
    sendHTTPRequest()
    {
        //TODO : implement
    }
    setPreferences()
    {
        //TODO : implement
    }
    triggerActivity()
    {
        //TODO : implement
    }
    inspectRequest()
    {
        //TODO : implement
    }
    getLongString()
    {
        //TODO : implement
    }
    getNetworkRequest()
    {
        //TODO : implement
    }
    getTabTarget()
    {
        //TODO : implement
    }
    viewSourceInDebugger()
    {
        //TODO : implement
    }
    onNetworkEvent()
    {
        //TODO : implement
    }
    onNetworkEventUpdate()
    {
        //TODO : implement
    }
    onRequestHeaders()
    {
        //TODO : implement
    }
    onRequestCookies()
    {
        //TODO : implement
    }
    onRequestPostData()
    {
        //TODO : implement
    }
    onSecurityInfo()
    {
        //TODO : implement
    }
    onResponseHeaders()
    {
        //TODO : implement
    }
    onResponseCookies()
    {
        //TODO : implement
    }
    onResponseContent()
    {
        //TODO : implement
    }
    onEventTimings()
    {
        //TODO : implement
    }
}