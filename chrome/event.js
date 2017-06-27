/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const { EVENTS } = require("../../constants");
const { Payloads } = require("./utils");
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
        this.update = this.update.bind(this);
    }
    setup(connection , actions)
    {
        let { Network, Page } = connection;
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
                this.addRequest(requestId, request);
                this.updateRequestHeader(requestId, header);
                this.updatePostData(requestId, postData);
            });
    }

    onResponseReceived(params){
        let {requestId} = params;
        let payload = this.payloads.get(requestId);
        return payload.update(params).then(
            ([request, header, postData ,state,timings])=>
            {
                this.updateResponseHeader(requestId, header);
                this.updateResponseState(requestId, state);
                this.updateResponseTiming(requestId, timings);
                this.getResponseBody(params);
            });
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
    onDataReceived(params){
        let {requestId} = params;
        //let payload = this.payloads.get(requestId);
        //this.payloads.update(requestId,{receive:params.timestamp});
        console.log(params.requestId);
    }
    onLoadingFinished(params){

        //let {requestId} = params;
        //let payload = this.payloads.get(requestId);
        //this.payloads.update(requestId,{finish:params.timestamp});

        // TODO: verify getCookie method. ;Cookie(params.requestId,this.Network);
        console.log(params.requestId);
    }
    onLoadingFailed(params){
        console.log(params.requestId);
    }
    async getResponseBody(params)
    {
        let {requestId,response} = params;
        let self = this;
        return await self.Network.getResponseBody({requestId} ,
            (success , content)=> {
                let payload = self.payloads.get(requestId);
                return payload.update({requestId,response,content}).then(
                    ([request, header, postData ,state,timings,responseContent]) => {
                        self.updateResponseContent(requestId, responseContent);
                    }
                );
            }
        );
    }

    updateResponseContent(requestId, responseContent) {
        this.update(requestId, responseContent).then(
            () => {
                window.emit(EVENTS.RECEIVED_RESPONSE_CONTENT, requestId);
            }
        )
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

    addRequest(id, data) {
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