/**
 ** Network.requestWillBeSent
 {
  "requestId": "17338.1721",
  "frameId": "17338.1",
  "loaderId": "17338.64",
  "documentURL": "https://www.google.com.tw/?gfe_rd=cr&ei=1Qo9WdW6CMb48AfI1JvwDw",
  "request": {
    "url": "https://www.google.com.tw/gen_204?atyp=i&ct=slh&cad=&ei=fGk-WdPoHMrJ0ATI1I-wBg&s=2&v=2&pv=0.8137105477596054&me=12:1497262461324,V,0,0,0,0:10683046,U,10683046:3,V,0,0,918,830:1534,e,U&zx=1497273145908",
    "method": "POST",
    "headers": {
      "Cache-Control": "max-age=0",
      "Origin": "https://www.google.com.tw",
      "Referer": "https://www.google.com.tw/",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
      "Content-Type": "text/plain;charset=UTF-8"
    },
    "postData": "",
    "mixedContentType": "none",
    "initialPriority": "VeryLow",
    "referrerPolicy": "origin"
  },
  "timestamp": 209877.496189,
  "wallTime": 1497273145.90849,
  "initiator": {
    "type": "script",
    "stack": {
      "callFrames": [
        {
          "functionName": "s_bwa.log",
          "scriptId": "2025",
          "url": "https://www.google.com.tw/xjs/_/js/k=xjs.s.zh_TW.u8UkD7jqTnM.O/m=aa,abd,async,dvl,foot,fpe,ipv6,lu,m,sf,spch,tl,vs,tnv,mrn,abn,ilrp,iuci,riu,udlg,me,atn/am=ACMU7fGCB5D_OwTCeBPCAmkDUwz0/exm=sx,c,sb,cdos,cr,elog,hsm,jsa,r,qsm,j,d,csi/rt=j/d=1/ed=1/t=zcms/rs=ACT90oE3pcAyS4pVdjio4tn7ky6TrGAQhQ",
          "lineNumber": 1097,
          "columnNumber": 198
        }
      ]
    }
  },
  "type": "Other"
}
 */
// struct
let {
  requestId,
  frameId,
  loaderId,
  documentURL,
  request,
    url,
    method,
    headers
    {
      Cache-Control,
      Origin,
      Referer,
      User-Agent,
      Content-Type,
    },
    postData,
    mixedContentType,
    initialPriority,
    referrerPolicy,
  },
  timestamp,
  wallTime,
  initiator,
    type,
    stack,
      callFrames
      [
        {
          functionName,
          scriptId,
          url,
          lineNumber,
          columnNumber,
        }
      ]
    }
  },
  type,
} = params;
/**
 ** Network.responseReceived
{
  "requestId": "17338.1210",
  "frameId": "17338.1",
  "loaderId": "17338.49",
  "timestamp": 198884.380373,
  "type": "Document",
  "response": {
    "url": "https://www.google.com.tw/?gfe_rd=cr&ei=1Qo9WdW6CMb48AfI1JvwDw",
    "status": 200,
    "statusText": "",
    "headers": {
      "date": "Mon, 12 Jun 2017 10:09:12 GMT",
      "content-encoding": "gzip",
      "server": "gws",
      "x-frame-options": "SAMEORIGIN",
      "content-type": "text/html; charset=UTF-8",
      "status": "200",
      "cache-control": "private, max-age=0",
      "alt-svc": "quic=\":443\"; ma=2592000; v=\"38,37,36,35\"",
      "x-xss-protection": "1; mode=block",
      "expires": "-1"
    },
    "mimeType": "text/html",
    "connectionReused": false,
    "connectionId": 0,
    "remoteIPAddress": "172.217.27.131",
    "remotePort": 443,
    "fromDiskCache": false,
    "fromServiceWorker": false,
    "encodedDataLength": 6656,
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
    },
    "protocol": "http/2+quic/35",
    "securityState": "secure",
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
  }
}
 **/
let {
  requestId,
  frameId,
  loaderId,
  timestamp,
  type,
  response: {
    url,
    status,
    statusText,
    headers: {
      date,
      content-encoding,
      server,
      x-frame-options,
      content-type,
      status,
      cache-control,
      alt-svc,
      x-xss-protection,
      expires,
    },
    mimeType,
    connectionReused,
    connectionId,
    remoteIPAddress,
    remotePort,
    fromDiskCache,
    fromServiceWorker,
    encodedDataLength,
    timing: {
      requestTime,
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
      receiveHeadersEnd,
    },
    protocol,
    securityState,
    securityDetails: {
      protocol,
      keyExchange,
      keyExchangeGroup,
      cipher,
      certificateId,
      subjectName,
      sanList: [],
      issuer,
      validFrom,
      validTo,
      signedCertificateTimestampList: [
        {
          status,
          origin,
          logDescription,
          logId,
          timestamp,
          hashAlgorithm,
          signatureAlgorithm,
          signatureData,
        }
      ]
    }
  }
} = params;
// onRequestHeaders
{
  "from": "server1.conn72.child1/netEvent29",
  "headers": [
    {
      "name": "Host",
      "value": "www.google.com.tw"
    },
    {
      "name": "User-Agent",
      "value": "Mozilla/5.0 (X11; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0"
    },
    {
      "name": "Accept",
      "value": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    {
      "name": "Accept-Language",
      "value": "en-US,en;q=0.5"
    },
    {
      "name": "Accept-Encoding",
      "value": "gzip, deflate, br"
    },
    {
      "name": "Referer",
      "value": "https://www.google.com.tw/"
    },
    {
      "name": "Cookie",
      "value": "NID=105=NNewWRFsKpEPlhtzdZxaf3HQzvmlIsyOnLU2vLsVhBNpHM9I7gxVWo6lLUXhAFzuL-65M__m1zbyDJlPX4slxuuOz2c2lmGBLCTR8Dk523L_o_9lDV5aO3mMIHFMzso-qQxDxHY-x1zZZkIgzadEhPw; OGPC=5061821-15:"
    },
    {
      "name": "Connection",
      "value": "keep-alive"
    },
    {
      "name": "Upgrade-Insecure-Requests",
      "value": "1"
    },
    {
      "name": "Cache-Control",
      "value": "max-age=0"
    }
  ],
  "headersSize": 571,
  "rawHeaders": "GET / HTTP/1.1\r\nHost: www.google.com.tw\r\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Language: en-US,en;q=0.5\r\nAccept-Encoding: gzip, deflate, br\r\nReferer: https://www.google.com.tw/\r\nCookie: NID=105=NNewWRFsKpEPlhtzdZxaf3HQzvmlIsyOnLU2vLsVhBNpHM9I7gxVWo6lLUXhAFzuL-65M__m1zbyDJlPX4slxuuOz2c2lmGBLCTR8Dk523L_o_9lDV5aO3mMIHFMzso-qQxDxHY-x1zZZkIgzadEhPw; OGPC=5061821-15:\r\nConnection: keep-alive\r\nUpgrade-Insecure-Requests: 1\r\nCache-Control: max-age=0\r\n\r\n"
}
// fetchRequestHeaders
{
  "from": "server1.conn72.child1/netEvent29",
  "headers": [
    {
      "name": "Host",
      "value": "www.google.com.tw"
    },
    {
      "name": "User-Agent",
      "value": "Mozilla/5.0 (X11; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0"
    },
    {
      "name": "Accept",
      "value": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    {
      "name": "Accept-Language",
      "value": "en-US,en;q=0.5"
    },
    {
      "name": "Accept-Encoding",
      "value": "gzip, deflate, br"
    },
    {
      "name": "Referer",
      "value": "https://www.google.com.tw/"
    },
    {
      "name": "Cookie",
      "value": "NID=105=NNewWRFsKpEPlhtzdZxaf3HQzvmlIsyOnLU2vLsVhBNpHM9I7gxVWo6lLUXhAFzuL-65M__m1zbyDJlPX4slxuuOz2c2lmGBLCTR8Dk523L_o_9lDV5aO3mMIHFMzso-qQxDxHY-x1zZZkIgzadEhPw; OGPC=5061821-15:"
    },
    {
      "name": "Connection",
      "value": "keep-alive"
    },
    {
      "name": "Upgrade-Insecure-Requests",
      "value": "1"
    },
    {
      "name": "Cache-Control",
      "value": "max-age=0"
    }
  ],
  "headersSize": 571,
  "rawHeaders": "GET / HTTP/1.1\r\nHost: www.google.com.tw\r\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Language: en-US,en;q=0.5\r\nAccept-Encoding: gzip, deflate, br\r\nReferer: https://www.google.com.tw/\r\nCookie: NID=105=NNewWRFsKpEPlhtzdZxaf3HQzvmlIsyOnLU2vLsVhBNpHM9I7gxVWo6lLUXhAFzuL-65M__m1zbyDJlPX4slxuuOz2c2lmGBLCTR8Dk523L_o_9lDV5aO3mMIHFMzso-qQxDxHY-x1zZZkIgzadEhPw; OGPC=5061821-15:\r\nConnection: keep-alive\r\nUpgrade-Insecure-Requests: 1\r\nCache-Control: max-age=0\r\n\r\n"
}
// onRequestCookies
{
  "from": "server1.conn72.child1/netEvent39",
  "cookies": [
    {
      "name": "NID",
      "value": "105=quOIf5PSiWJ4N639xkgcV83n8pow4UakLyf16OebTDwbT1e6mUYlp35SsPDy4gLixnYV48OGvgc4MsAZwWLH0aVwwjhfRRaU9reOAOuUyQaaYcK04ohTZObkv8lpx4Lp"
    }
  ]
}
// onSecurityInfo
{
  "from": "server1.conn72.child1/netEvent47",
  "securityInfo": {
    "state": "secure",
    "cipherSuite": "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
    "protocolVersion": "TLSv1.2",
    "cert": {
      "subject": {
        "commonName": "*.apis.google.com",
        "organization": "Google Inc",
        "organizationalUnit": ""
      },
      "issuer": {
        "commonName": "Google Internet Authority G2",
        "organization": "Google Inc",
        "organizationUnit": ""
      },
      "validity": {
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
}
// onResponseContent
{
  "from": "server1.conn72.child1/netEvent40",
  "content": {
    "mimeType": "text/javascript; charset=UTF-8",
    "text": {
      "type": "longString",
      "initial": "/* _GlobalPrefix_ */\n/* _Module_:emd */\ntry{\ns_G(\"emd\");\ns_F(\"emd\");s_H();\n}catch(e){_DumpException(e)}\n/* _Module_:eme */\ntry{\ns_G(\"eme\");\ns_F(\"eme\");s_H();\n}catch(e){_DumpException(e)}\n/* _Module_:emf */\ntry{\ns_G(\"emf\");\ns_F(\"emf\");s_H();\n}catch(e){_DumpException(e)}\n/* _Module_:emg */\ntry{\ns_G(\"emg\");\ns_F(\"emg\");s_H();\n}catch(e){_DumpException(e)}\n/* _Module_:sy1n */\ntry{\nvar s_fka,s_gka,s_4i,s_hka,s_5i,s_ika={};s_G(\"sy1n\");var s_6i=function(a){s_N(this,a,0,2,null,null)};s_g(s_6i,s_M);s_6i.prototype.jh=function(){return s_O(this,1)};var s_7i={};var s_8i=s_c,s_9i=s_Xc(0),s_$i=s_Xc(0),s_aj=s_Xc(0),s_jka=function(a,b){window.scrollBy(a,b)},s_bj=function(a,b){window.scrollTo(a,b)},s_cj=s_Yc,s_dj=s_Yc,s_kka=s_c,s_lka=s_c,s_mka=s_c,s_ej=function(){if(document.body){var a=s_Od(document.body).top;s_ej=s_Xc(a);return a}return 0},s_nka=s_bb.match(/ GSA\\/([.\\d]+)/),s_fj=s_nka?s_nka[1]:\"\";s_hka=(s_5i=!!s_nka)&&0<=s_Ia(s_fj,\"4\");s_4i=s_5i&&0<=s_Ia(s_fj,\"5.2\");s_gka=s_5i&&0<=s_Ia(s_fj,\"5.7\");s_fk",
      "length": 62901,
      "actor": "server1.conn72.child1/longString43"
    },
    "size": 62901,
    "transferredSize": 21273
  },
  "contentDiscarded": false
}
// onResponseHeaders
{
  "from": "server1.conn72.child1/netEvent50",
  "headers": [
    {
      "name": "date",
      "value": "Mon, 12 Jun 2017 10:44:04 GMT"
    },
    {
      "name": "expires",
      "value": "Mon, 12 Jun 2017 10:44:04 GMT"
    },
    {
      "name": "cache-control",
      "value": "private, max-age=31536000"
    },
    {
      "name": "last-modified",
      "value": "Wed, 14 Dec 2016 20:30:00 GMT"
    },
    {
      "name": "x-content-type-options",
      "value": "nosniff"
    },
    {
      "name": "server",
      "value": "sffe"
    },
    {
      "name": "x-xss-protection",
      "value": "1; mode=block"
    },
    {
      "name": "alt-svc",
      "value": "quic=\":443\"; ma=2592000; v=\"38,37,36,35\""
    },
    {
      "name": "X-Firefox-Spdy",
      "value": "h2"
    }
  ],
  "headersSize": 345,
  "rawHeaders": "HTTP/2.0 304 Not Modified\r\ndate: Mon, 12 Jun 2017 10:44:04 GMT\r\nexpires: Mon, 12 Jun 2017 10:44:04 GMT\r\ncache-control: private, max-age=31536000\r\nlast-modified: Wed, 14 Dec 2016 20:30:00 GMT\r\nx-content-type-options: nosniff\r\nserver: sffe\r\nx-xss-protection: 1; mode=block\r\nalt-svc: quic=\":443\"; ma=2592000; v=\"38,37,36,35\"\r\nX-Firefox-Spdy: h2\r\n\r\n"
}
//
{
  "from": "server1.conn72.child1/netEvent41",
  "timings": {
    "blocked": 1,
    "dns": 0,
    "connect": 0,
    "send": 0,
    "wait": 12,
    "receive": 0
  },
  "totalTime": 13
}
/** 
 ** Network.dataReceived
{
  "requestId": "17338.1210",
  "timestamp": 198884.38061,
  "dataLength": 21649,
  "encodedDataLength": 0
}
 **/

/**
 ** Network.loadingFinished
{
  "requestId": "17338.1210",
  "timestamp": 198884.401704,
  "encodedDataLength": 69159
}
 **/

/**
 ** Network.loadingFailed
{
  "requestId": "17338.1353",
  "timestamp": 199178.803614,
  "type": "Other",
  "errorText": "",
  "canceled": true
}
 **/