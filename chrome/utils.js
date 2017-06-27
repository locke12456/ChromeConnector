/**
 * Created by l on 2017/6/13.
 */
const { Request, Header, Cause, Cookie, PostData } = require("./request");
const { State, ResponseContent, Timings } = require("./response");

class Scheduler
{
    constructor(){
        this.busy = false;
        this.queue = [];
    }
    sync(task)
    {
        this.queue.push(task);
        if(!this.busy)return this.dequeue();
    }
    dequeue()
    {
        let self = this;
        this.busy = true;
        let next = this.queue.shift();
        if(next)
        {
            next().then(
                (resolve) => {
                    self.dequeue();
                },(reject) => {
                    self.dequeue();
                });
        }else this.busy=false;
    }
}

class Payload{
    constructor() {
        this.payload = {};
        this.update = this.update.bind(this);
    }
    async update(payload)
    {
        let { request, response, requestId, timestamp, content } = payload;
        let {
            headers,
            postData,
            timing
        }= request ? request : response;
        let header = await this.mappingHeader(requestId,headers);
        this.requestId = requestId;
        let payloads = await Promise.all([
            this.mappingRequest(requestId,payload),
            header,
            this.mappingRequestPostData(requestId,postData,header),
            this.mappingResponseStatus(requestId,response,header),
            this.mappingTimming(requestId,timing),
            this.mappingResponseContent(requestId,response,content)
        ]);
        //implement payload log
        //let postData = PostData(requestId,request,header);
        //this.payload.add({requestId,header,postData ,request:timestamp});
        return payloads;
    }
    updatePayload(data) {
        return Object.assign({}, this.payload, data);
    }
    async mappingTimming(requestId,timing)
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
        this.update = this.update.bind(this);
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

    updatePayload(payload, data) {
        return Object.assign({}, payload, data);
    }

    update(id, data) {
        return this.payloads.set(id, this.updatePayload(this.get(id), data));
        //payload = this.get(id);
    }
}


module.exports = {
    Payload,Payloads,Scheduler
};
