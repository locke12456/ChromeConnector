/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const { EVENTS } = require("../../constants");
const { Payloads } = require("./utils");
const { getBulkLoader,PriorityLevels } = require("./bulk-loader");

class CDPConnector
{
    constructor()
    {
        this.payloads = new Payloads();
        this.onNetworkUpdate = this.onNetworkUpdate.bind(this);
        this.onResponseReceived = this.onResponseReceived.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
        this.onLoadingFinished = this.onLoadingFinished.bind(this);
        this.onLoadingFailed = this.onLoadingFailed.bind(this);
        this.targetInfoChanged = this.targetInfoChanged.bind(this);
        this.securityStateChanged = this.securityStateChanged.bind(this);
        this.update = this.update.bind(this);
    }
    setup(connection , actions)
    {
        let { Network, Page, Security, Target } = connection;
        this.Network = Network;
        this.Page = Page;
        this.Target = Target; // 'maybe' cloud catch reload event when browser was triggered reload, I guessed.
        this.actions = actions;
        Network.requestWillBeSent(this.onNetworkUpdate);
        Network.responseReceived(this.onResponseReceived);
        Network.dataReceived(this.onDataReceived);
        Network.loadingFinished(this.onLoadingFinished);
        Network.loadingFailed(this.onLoadingFailed);
        Security.securityStateChanged(this.securityStateChanged);
        Network.enable();
        Security.enable();
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
    securityStateChanged(params)
    {
        params;
    }
    targetInfoChanged(info)
    {
        console.log(info);
    }
    willNavigate(event)
    {
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
                        this.addRequest(requestId, request).then(()=>{
                            this.updateRequestHeader(requestId, header);
                            this.updatePostData(requestId, postData);
                            resolve();
                        })
                , PriorityLevels.Critical );
            });
    }

    onResponseReceived(params){
        let {requestId} = params;
        let payload = this.payloads.get(requestId);
        try {
            return payload.update(params).then(
                ([request, header, postData, state, timings,response,securityInfo]) => {
                    let loader = getBulkLoader();
                    loader.add(
                        requestId,
                        (resolve, reject) => {
                            this.updateResponseHeader(requestId, header);
                            this.updateResponseState(requestId, state);
                            this.updateResponseTiming(requestId, timings);
                            this.getResponseContent(params);
                            //this.updateSecurityInfo(requestId,securityInfo);
                            resolve();
                        }
                        , PriorityLevels.Major);
                });
        }catch (e){}
    }

    updateRequestHeader(requestId, header) {
        this.update(requestId, {
            requestHeaders: header
        }).then(() => {
            window.emit(EVENTS.RECEIVED_REQUEST_HEADERS, header);
        });
    }

    updateResponseTiming(requestId, timings) {
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
        this.update(requestId, {
            responseHeaders: header
        }).then(() => {
            window.emit(EVENTS.RECEIVED_RESPONSE_HEADERS, header);
        });
    }

    updateSecurityInfo(requestId, securityInfo) {
        this.update(requestId, {
            securityState: securityInfo,
        }).then(() => {
            window.emit(EVENTS.RECEIVED_SECURITY_INFO, requestId);
        });
    }

    onDataReceived(params){
        let {requestId} = params;
        try {
            let payload = this.payloads.get(requestId);
            payload.update(params);
        }catch (e){}
        //console.log(params.requestId);
    }

    onLoadingFinished(params){

        let {requestId} = params;
        try {
            let {request, response, dataLength, encodedDataLength} = this.payloads.get(requestId).payload;

            // TODO: verify getCookie method. ;Cookie(params.requestId,this.Network);
            console.log(`${requestId} request: ${request}, response: ${response}, data: ${dataLength}, encoded:${encodedDataLength}`);
        }catch (e){}
    }

    onLoadingFailed(params){
        //console.log(params.requestId);
    }

    async getResponseContent(params)
    {
        let {requestId,response} = params;

        return await this.Network.getResponseBody({requestId} ,
            (success , content)=> {
                let payload = this.payloads.get(requestId);
                return payload.update({requestId,response,content}).then(
                    ([request, header, postData ,state,timings,responseContent]) => {

                        let loader = getBulkLoader();
                        loader.add(
                            requestId,
                            (resolve, reject) => {
                                return this.updateResponseContent(requestId,responseContent).then(
                                    () => resolve()
                                );
                            },
                            PriorityLevels.Normal
                        );
                    }
                );
            }
        );
    }

    updateResponseContent(requestId, payload) {
        return this.actions.updateRequest(requestId, payload, true).then(
            () => {
                window.emit(EVENTS.RECEIVED_RESPONSE_CONTENT, requestId);
            }
        );
    }

    updatePostData(requestId, postData)
    {
        if (postData) {
            this.update(requestId, {
                requestPostData: postData,
            }).then(() => {
                window.emit(EVENTS.RECEIVED_REQUEST_POST_DATA, requestId);
            });
        }
    }

    async update(id,payload)
    {
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
                // Convert the received date/time string to a unix timestamp.
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