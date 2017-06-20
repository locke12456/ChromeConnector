/**
 * Created by l on 2017/6/13.
 */

function Cause( initiator ) {
    let { url , type , stack } = initiator;
    let { callFrames } = stack;
    if(!stack || !callFrames.length)return undefined;
    let cause = {
        type: type,
        loadingDocumentUri: url,
        stacktrace: []
    };
    try{
        callFrames.forEach( (stack, index) => {
                let {
                    functionName,
                    scriptId,
                    url,
                    lineNumber,
                    columnNumber
                } = stack;
                let stacktrace = {
                    scriptId,
                    filename: url,
                    lineNumber,
                    columnNumber,
                    functionName,
                    //asyncCause: undefined,
                };
                cause.stacktrace.push(stacktrace);
            }
        );
    }catch(e){}
    return cause;
}

function Header( id, headers ) {
    let header = [];
    let headersSize = 0;
    Object.keys(headers).map((value) => {
        header.push(
            {
                name: value,
                value: headers[value],
            }
        );
        headersSize += value.length+headers[value].length;
        console.log(`headers[${value}] = ${headers[value]}`);
    });

    return {
        from: id,
        headers: header,
        headersSize: headersSize,
        rawHeaders: undefined,
    };
}
function PostData(id,request , header) {
    let {headers,headersSize} = header;
    let {postData} = request;
    let payload = undefined ,requestPostData = {postData:{}};
    if(postData) {
        payload = {from: id,postDataDiscarded:false};
        requestPostData.postData.text = postData;
        payload.requestPostData = Object.assign({}, requestPostData);
        payload.requestHeadersFromUploadStream = {headers, headersSize};
    }
    return payload;
}
/**
 * Not support on current version.
 * unstable method: Network.getCookies
 * cause: https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies
 */
function Cookie(id , Network)
{
    // TODO: verify
}

function Request( id, request ) {

}

function Timing( id, timing ) {
    // TODO: verify
}

module.exports = {
    Cause,
    Header,
    Request,
    PostData,
    Timing
}
