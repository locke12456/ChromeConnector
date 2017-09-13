# Chrome connector
Chrome connector's main feature is connect network features to Netmonintor from Chrome remote debugging protocol. After attached Chrome interce, netmonitor will show the request data from Chrome. 

## Prerequisite
Chrome connector is rely on Chrome DevTools Protocol API version 1.2.
More detials: [stable 1.2 protocol](https://chromedevtools.github.io/devtools-protocol/1-2/)
* [Google Chrome] >= 5.4.x

## Quick Setup

Chrome connector need attach to to a remotely running Chrome instance for debugging. For this scenario to work, you should start your host Chrome instance with the remote-debugging-port command line switch:

```bash
google-chrome --remote-debugging-port=9222
```

### How it works



## Snapshoots

![N|Solid](https://locke12456.github.io/ChromeConnector/img/requests.png)
![N|Solid](https://locke12456.github.io/ChromeConnector/img/headers.png)
![N|Solid](https://locke12456.github.io/ChromeConnector/img/params.png)
![N|Solid](https://locke12456.github.io/ChromeConnector/img/response.png)
![N|Solid](https://locke12456.github.io/ChromeConnector/img/timings.png)
![N|Solid](https://locke12456.github.io/ChromeConnector/img/stack_traces.png)
