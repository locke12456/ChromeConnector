import websocket
import thread
import time,json
import argparse

def on_message(ws, message):
    print message

def on_error(ws, error):
    print error

def on_close(ws):
    print "### closed ###"

def on_open(ws):
    print "Connected."
    commands = [{"id":1,"method":"Log.enable"} ,
                {"id":2,"method":"Log.startViolationsReport","params":{"config":[{"name":"longTask","threshold":200},{"name":"longLayout","threshold":30},{"name":"blockedEvent","threshold":100},{"name":"blockedParser","threshold":-1},{"name":"handler","threshold":150},{"name":"recurringHandler","threshold":50}]}},
                {"id":3,"method":"Network.enable","params":{"maxTotalBufferSize":10000000,"maxResourceBufferSize":5000000}},
                {"id":4,"method":"Page.enable"},
                {"id":5,"method":"Page.getResourceTree"},
                {"id":6,"method":"Runtime.enable"},
                {"id":7,"method":"Debugger.enable"},
                {"id":8,"method":"Debugger.setPauseOnExceptions","params":{"state":"none"}},
                {"id":9,"method":"Debugger.setAsyncCallStackDepth","params":{"maxDepth":0}},
                {"id":10,"method":"DOM.enable"},
                {"id":11,"method":"CSS.enable"},
                {"id":12,"method":"Target.setAutoAttach","params":{"autoAttach":True,"waitForDebuggerOnStart":True}},
                {"id":13,"method":"Target.setRemoteLocations","params":{"locations":[{"host":"localhost","port":9229}]}},
                {"id":14,"method":"Target.setDiscoverTargets","params":{"discover":True}},
                {"id":15,"method":"Profiler.enable"},
                {"id":16,"method":"Profiler.setSamplingInterval","params":{"interval":100}},
                {"id":17,"method":"ServiceWorker.enable"},
                {"id":18,"method":"Debugger.setBlackboxPatterns","params":{"patterns":[]}},
                {"id":19,"method":"Page.setAutoAttachToCreatedPages","params":{"autoAttach":False}},
                {"id":20,"method":"Emulation.setScriptExecutionDisabled","params":{"value":False}},
                {"id":21,"method":"Rendering.setShowViewportSizeOnResize","params":{"show":True}},
                {"id":22,"method":"Inspector.enable"},
                {"id":23,"method":"Runtime.runIfWaitingForDebugger"},
                {"id":24,"method":"Page.configureOverlay","params":{"suspended":False}}
                ]
    for command in commands:
        enable = json.dumps(command)
        ws.send(enable)




if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="A simple google remote debugger client.")
    parser.add_argument('--url',
                       type=str, default=str(''), 
                       help='')
    try:

        args = parser.parse_args()
        url = args.url # example : "ws://localhost:9222/devtools/page/34679710-c559-4099-a556-107ce9ecfdee"
        websocket.enableTrace(True)
        ws = websocket.WebSocketApp(url,
                                    on_message = on_message,
                                    on_error = on_error,
                                    on_close = on_close)
        ws.on_open = on_open
        ws.run_forever()
    except Exception as e:
        parser.print_help()