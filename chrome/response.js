/**
 * Created by l on 2017/6/13.
 */

const { formDataURI } = require("../../utils/request-utils");

function ResponseInfo(id, response, response_body)
{
    let {
        mimeType
    } = response;
    const {body, base64Encoded} = response_body;
    return {
        from: id,
        content: {
            mimeType: mimeType,
            text: body,
            size: body.length,
            encoding: base64Encoded ? "base64" : undefined
        }
    };
}

function ResponseContent(id, response, content)
{
    const {body,base64Encoded} = content;
    let {mimeType,encodedDataLength} = response;
    let responseContent = ResponseInfo(id, response, content);
    let payload = Object.assign(
        {
            responseContent,
            contentSize: body.length,
            transferredSize: encodedDataLength, // TODO: verify
            mimeType: mimeType
        }, body);
    if (mimeType.includes("image/")) {
        payload.responseContentDataUri = formDataURI(mimeType, base64Encoded, response);
    }
    return payload;
}
/**
 * Not support on current version.
 * unstable method: Security
 * cause: https://chromedevtools.github.io/devtools-protocol/tot/Security/
 */
function SecurityDetials(id, security)
{
    // TODO : verify
    /*
    let secure = {
        "from": "server1.conn72.child1/netEvent47",
        "securityInfo": {
            "state": "secure",
            "cipherSuite": "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256", //"cipher": "CHACHA20_POLY1305",
            "protocolVersion": "TLSv1.2",//"protocol": "QUIC",
            "cert": {
                "subject": {
                    "commonName": "*.apis.google.com",//"subjectName": "*.google.com.tw",
                    "organization": "Google Inc",
                    "organizationalUnit": ""
                },
                "issuer": {
                    "commonName": "Google Internet Authority G2",//"issuer": "Google Internet Authority G2",
                    "organization": "Google Inc",
                    "organizationUnit": ""
                },
                "validity": {
                     //"validFrom": 1496250078,
                     //"validTo": 1503505920,

                    "start": "June 1, 2017",
                    "end": "August 24, 2017"
                },
                "fingerprint": {
                    "sha1": "45:ED:0A:67:24:20:34:CC:69:D3:F3:F2:F8:18:B1:20:F7:B5:93:36",
                    "sha256": "F0:42:50:FD:A1:E9:2F:90:4F:05:F4:01:FA:7F:7D:E8:E0:B2:BB:7B:83:37:77:B5:90:09:78:7B:20:1F:E1:44"
                }
            },
            "hsts": true,
            "hpkp": true
        }
    };
  */
    /*
     "securityDetails": {
     "protocol": "QUIC",
     "keyExchange": "",
     "keyExchangeGroup": "X25519",
     "cipher": "CHACHA20_POLY1305",
     "certificateId": 0,
     "subjectName": "*.google.com.tw",
     "sanList": [
     "*.google.com.tw",
     "*.google.tw",
     "google.com.tw",
     "google.tw"
     ],
     "issuer": "Google Internet Authority G2",
     "validFrom": 1496250078,
     "validTo": 1503505920,
     "signedCertificateTimestampList": [
     {
     "status": "Verified",
     "origin": "TLS extension",
     "logDescription": "Google 'Rocketeer' log",
     "logId": "EE4BBDB775CE60BAE142691FABE19E66A30F7E5FB072D88300C47B897AA8FDCB",
     "timestamp": 1496254757149,
     "hashAlgorithm": "SHA-256",
     "signatureAlgorithm": "ECDSA",
     "signatureData": "3044022022AF2E6EE95923A7A0A1FF59CFA7D44171D35C79DDDE7B433301B7CB884A4CBE0220097FCD9619BB730B63261D442AF938D4C1C7C19FFB9F0B1C58AEECFAF4F3565E"
     }
     ]
     }
     this.updateRequest(actor, {
     securityState: networkInfo.securityInfo,
     }).then(() => {
     window.emit(EVENTS.UPDATING_SECURITY_INFO, actor);
     });*/
}

function Timings(id ,timing)
{
    // TODO : implement
    let{requestTime,
        proxyStart,
        proxyEnd,
        dnsStart,
        dnsEnd,
        connectStart,
        connectEnd,
        sslStart,
        sslEnd,
        workerStart,
        workerReady,
        sendStart,
        sendEnd,
        pushStart,
        pushEnd,
        receiveHeadersEnd}= timing;
    let proxy = parseInt(proxyEnd - proxyStart);
    let dns = parseInt(dnsEnd - dnsStart);
    let connect = parseInt(connectEnd - connectStart);
    let ssl = parseInt(sslEnd - sslStart);
    let send = parseInt(sendEnd - sendStart);
    let push = parseInt(pushEnd - pushStart);

    /*console.log(`requestTime = [${requestTime}],
proxyStart = [${proxyStart}], proxyEnd = [${proxyEnd}], 
dnsStart = [${dnsStart}], dnsEnd = [${dnsEnd}], 
connectStart = [${connectStart}], connectEnd = [${connectEnd}], 
sslStart = [${sslStart}], sslEnd = [${sslEnd}], 
workerStart = [${workerStart}], workerReady = [${workerReady}],
sendStart = [${sendStart}], sendEnd = [${sendEnd}], 
pushStart = [${pushStart}], pushEnd = [${pushEnd}], 
receiveHeadersEnd = [${receiveHeadersEnd}], 
proxy = [${proxy}] dns = [${dns}] connect = [${connect}] ssl = [${ssl}] send = [${send}] push = [${push}]`);
*/
     let total = parseInt(receiveHeadersEnd);
     return {
         from: id,
         timings: {
             blocked: 0,
             dns: dns,
             connect: connect,
             send: send,
             wait: parseInt(receiveHeadersEnd-(send+connect+dns)),
             receive: 0,
         },
         totalTime: total,
     };
}
function State(response,headers) {
    let { headersSize } = headers;
    let {
        status,
        statusText,
        remoteIPAddress,
        remotePort
    } = response;
    return {
        remoteAddress: remoteIPAddress,
        remotePort,
        status,
        statusText,
        headersSize
    };
}
module.exports = {
    State,
    Timings,
    ResponseContent
}