/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const { EVENTS } = require("../../constants");
const { Payloads } = require("./utils");
const { Header, Cause, PostData } = require("./request");
const { ResponseBody } = require("./response");

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
    }
    setup(connection , actions)
    {
        let { Network } = connection;
        this.Network = Network;
        this.actions = actions;
        Network.requestWillBeSent(this.onNetworkUpdate);
        Network.responseReceived(this.onResponseReceived);
        Network.dataReceived(this.onDataReceived);
        Network.loadingFinished(this.onLoadingFinished);
        Network.loadingFailed(this.onLoadingFailed);
        Network.enable();
    }
    disconnect() {
        this.Network.disable();
    }
    onNetworkUpdate(params) {
        let {request,requestId,initiator} = params;
        let {headers} = request;
        //if(!this.payloads.has(params.requestId)){
        //    this.payloads.set(params.requestId, {});
        //}
        let cause = Cause(initiator);

        let data = { method:params.request.method,url:params.request.url,cause:cause,isXHR:false,startedDateTime:params.timestamp,fromCache:undefined,fromServiceWorker:undefined };

        this.addRequest( requestId, data );

        let header = Header(requestId, headers);
        let postData = PostData(requestId,request,header);

        this.update(requestId, {
            requestHeaders: header
        }).then(() => {
            window.emit(EVENTS.RECEIVED_REQUEST_HEADERS, header);
        });
        if (postData) {
            this.update(requestId, {
                requestPostData: postData,
            }).then(() => {
                window.emit(EVENTS.RECEIVED_REQUEST_POST_DATA, requestId);
            });
        }
        console.log(requestId);
    }
    onResponseReceived(params){
        let {response} = params;

        let {
            headers,
            status,
            statusText,
            remoteIPAddress,
            remotePort,
        } = response;
        let {requestId} = params;
        let header = Header(requestId,headers);
        this.update(requestId, {
            responseHeaders: header
        }).then(() => {
            window.emit(EVENTS.RECEIVED_RESPONSE_HEADERS, header);
        });


        this.update(requestId, {
            remoteAddress: remoteIPAddress,
            remotePort: remotePort,
            status: status,
            statusText: statusText,
            headersSize: header.headersSize
        }).then(() => {
            window.emit(EVENTS.STARTED_RECEIVING_RESPONSE, requestId);
        });

        this.getResponseBody(params);

    }
    onDataReceived(params){
        console.log(params.requestId);
    }
    onLoadingFinished(params){
        console.log(params.requestId);
    }
    onLoadingFailed(params){
        console.log(params.requestId);
    }
    async getResponseBody(params)
    {
        let {requestId,response} = params;
        let self = this;
        this.Network.getResponseBody = this.Network.getResponseBody.bind(this);
        return await this.Network.getResponseBody({requestId},
            (base64 , params)=> {
                const {body} = params;
                let responseContent = ResponseBody(requestId, response, params);
                let payload = Object.assign({responseContent: responseContent}, body);
                self.update(responseContent.from, payload).then(() => {
                    window.emit(EVENTS.RECEIVED_RESPONSE_CONTENT, responseContent.from);
                });
            });
    }
    async update(id,payload)
    {
        this.actions.updateRequest(id, payload, true);
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