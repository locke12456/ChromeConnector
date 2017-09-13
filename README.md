# Chrome connector
Chrome connector's main feature is connect network features to Netmonintor from Chrome remote debugging protocol. After attached Chrome instance, netmonitor will show the request data from Chrome. 

## Prerequisite
Chrome connector is rely on Chrome DevTools Protocol API version 1.2.
More details: [stable 1.2 protocol](https://chromedevtools.github.io/devtools-protocol/1-2/)
* [Google Chrome] >= 5.4.x

## Quick Setup

Chrome connector need remote to attach a running Chrome instance for debugging. For this scenario to work, you should start your host Chrome instance with the remote-debugging-port command line switch:

```bash
google-chrome --remote-debugging-port=9222
```

### How it works

This connector is rely on [devtools-launchpad](https://github.com/devtools-html/devtools-core/blob/master/packages/devtools-launchpad/#readme) and chrome-remote-interface.

. after attached Chrome instance, launchpad will looping to fetch tabs information from Chrome.
More details infomation about chrome-remote-interface could see from [github](https://github.com/cyrus-and/chrome-remote-interface).

Connector used Netwrok and Page modules from CDP. Once connected it will mapping all payload data to request list when network request update, until tab was closed.

Request header data format from CDP could refer to [Network.requestWillBeSent](https://chromedevtools.github.io/devtools-protocol/1-2/Network/#event-requestWillBeSent), response header format colud refer to [Network.responseReceived](https://chromedevtools.github.io/devtools-protocol/1-2/Network/#event-responseReceived).

Response content could collect after reponse header revived. To fetch response content could refer to [Network.getResponseBody
](https://chromedevtools.github.io/devtools-protocol/1-2/Network/#event-responseReceived) method.
