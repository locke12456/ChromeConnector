/**
 * Created by l on 2017/7/3.
 */

let bulkLoader = undefined;

let PriorityLevels = {Critical:1,Major:2,Normal:3,None:0};

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
// singleton class
const getBulkLoader = () => {

    const mappingPriority = (priority,options) =>
    {
        switch (priority)
        {
            case PriorityLevels.Critical:return options.Critical;
            case PriorityLevels.Major:return options.Major;
            case PriorityLevels.Normal:return options.Normal;
            case PriorityLevels.None:
            default: break;
        }
        return options.None;
    }

    const getTimeoutMS = (priority) =>
    {
        const delay = {Critical:3000, Major:1000, Normal:500, None:100};
        return mappingPriority(priority,delay);
    }

    const getDelayStartMS = (priority) =>
    {
        const delay = {Critical:1, Major:50, Normal:100, None:500};
        return mappingPriority(priority,delay);
    }

    const LoaderPromise = (priority, callback) => {
        return new Promise( (resolve, reject) => {
            const ms = getTimeoutMS(priority);
            // Set up the real work
            setTimeout( ()=> callback(resolve, reject) , getDelayStartMS(priority) );

            // Set up the timeout
            setTimeout(() => {
                reject('Promise timed out after ' + ms + ' ms');
            }, ms );
        });
    };

    // TODO : recovery thread after all tasks finished.
    class Thread
    {
        constructor()
        {
            this.scheduler = new Scheduler();
        }

        addTask(callback, priority)
        {
            this.scheduler.sync(() => {
                return LoaderPromise(
                    !priority ? PriorityLevels.None : priority,
                    ( resolve, reject )=> callback( resolve, reject )
                );
            });
        }
    }

    class BulkLoader
    {
        constructor()
        {
            this.threads = new Map();
            this.tasks = [];
        }

        add(id, callback,priority){
            let thread = this.threads.get(priority);
            if(!this.threads.has(priority)) {
                thread = new Thread();
                this.threads.set(priority,thread);
            }
            this.tasks.push( { id, priority, task:callback, isFinished:false } );
            return thread.addTask(callback,priority);
        }

        reset(){
            this.threads.clear();
        }

    }

    if(!bulkLoader)
    {
        bulkLoader = new BulkLoader();
    }

    return bulkLoader;
}

module.exports = { getBulkLoader,PriorityLevels };