/**
 * Created by l on 2017/6/13.
 */
const { Request, Header, Cause, Cookie, PostData } = require("./request");
const { State, ResponseContent, Timings, SecurityDetails } = require("./response");
const { getBulkLoader } = require("./bulk-loader");

class Payload{
    constructor() {
        this.payload = {};
        this.update = this.update.bind(this);
    }
    async update(payload)
    {
        let { request, response, requestId, timestamp,
            content, dataLength, encodedDataLength } = payload;
        let {
            headers,
            postData,
            timing
        }= (request ? request : response) || {};

        const header = await this.mappingHeader(requestId,headers);
        if(response)
            ;
        this.requestId = requestId;
        let [Request, Header, Post ,State, Timings, Response] = await Promise.all([
            this.mappingRequest(requestId,payload),
            header,
            this.mappingRequestPostData(requestId,postData,header),
            this.mappingResponseStatus(requestId,response,header),
            this.mappingTiming(requestId,timing),
            this.mappingResponseContent(requestId,response,content)
        ]);
        this.updateTimestamp(timestamp);
        this.updatePayload({ Request, Header, Post, State, Timings, Response, dataLength, encodedDataLength });
        return [ Request, Header, Post, State, Timings, Response ];
    }

    updateTimestamp(timestamp)
    {
        let {request} = this.payload;
        this.updatePayload(
            request ? { response: timestamp } : { request: timestamp }
        );
    }

    updatePayload(data) {
        this.payload = Object.assign({}, this.payload, data);
    }

    async mappingTiming(requestId, timing)
    {
        return !timing ? undefined : Timings(requestId,timing);
    }

    async mappingRequest(requestId,payload)
    {
        let {request} = payload;
        return !request ? undefined : Request(requestId, payload);
    }

    async mappingHeader(requestId,headers)
    {
        return !headers ? undefined : Header(requestId, headers);
    }

    async mappingRequestPostData(requestId, postData, headers)
    {
        return !postData ? undefined : PostData(requestId, postData, headers);
    }

    async mappingResponseStatus(requestId, response, header)
    {
        return !response ? undefined : State(response,header);
    }

    async mappingResponseContent(requestId, response, content)
    {
        return !response||!content ? undefined : ResponseContent(requestId, response, content);
    }

    async mappingSecurityInfo()
    {

    }

    mappingCookie()
    {

    }

}
class Payloads {
    constructor() {
        this.payloads = new Map();
    }

    add(id) {
        if (!this.payloads.has(id)) {
            this.payloads.set(id, new Payload());
        }
        return this.payloads.get(id);
    }

    get(id) {
        if (this.payloads.has(id))
            return this.payloads.get(id);
    }

    clear()
    {
        this.payloads.clear();
        let loader = getBulkLoader();
        loader.reset();
    }

}


module.exports = {
    Payload, Payloads
};
