/**
 * Created by l on 2017/7/3.
 */

const { EVENTS } = require("../../constants");

let bulkLoader = undefined;

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
        if(next) {
            next().then(
                (resolve) => {
                    self.dequeue();
                }, (reject) => {
                    self.dequeue();
                });

        }else this.busy=false;
    }
}

function getBulkLoader() {

    let LoaderPromise = (ms, callback) => {
        return new Promise(function(resolve, reject) {
            // Set up the real work
            setTimeout( ()=> callback(resolve, reject) , 100 );

            // Set up the timeout
            setTimeout(() => {
                reject('Promise timed out after ' + ms + ' ms');

            }, ms);
        });
    };

    let updateResponseContent = (id,actions,payload) => {
        return actions.updateRequest(id, payload, true).then(
            () => {
                window.emit(EVENTS.RECEIVED_RESPONSE_CONTENT, id);
            }
        );
    };

    let onResponseLoaded = (params, payload, actions, resolve) => {
        let {requestId} = params;
        updateResponseContent(requestId, actions, payload);
        return resolve();
    };

    class BulkLoader
    {
        constructor()
        {
            this.scheduler = new Scheduler();
            this.failed = [];
        }

        loadResponseContent(actions,payload,params) {
            this.scheduler.sync(() => {
                    return LoaderPromise(1000,
                        (resolve, reject) => {
                            return onResponseLoaded(params, payload, actions, resolve);
                        }
                    )
                }
            );
        }

        reloadFailed() {
            let self = this;
            let next = self.failed.shift();
            if(next) {
                self.scheduler.sync(() => {
                    return LoaderPromise(3000, next);
                });
                self.reloadFailed();
            }
        }
    }

    if(!bulkLoader)
    {
        bulkLoader = new BulkLoader();
    }

    return bulkLoader;
}

module.exports = { getBulkLoader };