/**
 * Created by l on 2017/6/13.
 */
const { Header } = require("./request");
class Payloads{
    constructor() {
        this.payloads = new Map();
    }
    add( id, payload ){
        if(!this.payloads.has(id)){
            this.payloads.set(id, payload);
        }
        return this.payloads.get(id);
    }
    get(id){
        if(this.payloads.has(id))
            return this.payloads.get(id);
    }
    updatePayload(payload, data)
    {
        return Object.assign({}, payload, data);
    }
    update( id, data){
        let payload = this.get(id);
        this.updatePayload(payload, data);
        payload = this.get(id);
    }
    mappingTimming( id,timing ) {

    }
    mappingCause( id ,initiator )
    {

        //this.update(id, {cause:cause} );
    }
    mappingRequestHeader(id, request )
    {
        let {headers} = request;
        let payload = Header(headers);
        this.update(id , {
            request:{
                header: payload
            }
        });

    }
    mappingResponseHeader(id, headers )
    {

    }
    mappingSecurityInfo()
    {

    }
    mappingCookie()
    {

    }
}
module.exports = {
    Payloads,
};
