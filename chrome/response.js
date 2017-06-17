/**
 * Created by l on 2017/6/13.
 */

function ResponseBody(id ,response,response_body)
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
function SecurityDetials(id,security)
{
    // TODO : implement
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
    /*
     "timing": {
     "requestTime": 198884.282331,
     "proxyStart": -1,
     "proxyEnd": -1,
     "dnsStart": 0,
     "dnsEnd": 0,
     "connectStart": 0,
     "connectEnd": 20.7940000109375,
     "sslStart": 0,
     "sslEnd": 20.7940000109375,
     "workerStart": -1,
     "workerReady": -1,
     "sendStart": 1.02799999876879,
     "sendEnd": 1.20500000775792,
     "pushStart": 0,
     "pushEnd": 0,
     "receiveHeadersEnd": 97.0059999963269
     },*/
    /*
     let timings = {
     from:requestId,
     timings:
     {
     blocked: ,
     dns: ,
     connect: ,
     send: ,
     wait: ,
     receive: ,
     },
     totalTime: ,
     }
     */
    /*
     {
     "from": "server1.conn121.child1/netEvent29",
     "timings": {
     "blocked": 74,
     "dns": 0,
     "connect": 0,
     "send": 0,
     "wait": 129,
     "receive": 0
     },
     "totalTime": 203
     }

     let timings = {};
     this.update(requestId, {
     eventTimings: timings
     }).then(() => {
     window.emit(EVENTS.RECEIVED_EVENT_TIMINGS, response.from);
     }); */
}
module.exports = {
    ResponseBody
}