/*
class Events {  // built-in event pool itself
    static on(eventName,callback) {
        if(!this.eventName) this.eventName = [];
        this.eventName.push(callback);
    }
    static trigger(eventName,data) {
        if(!this.eventName) return;
        else {
            for(let event of this.eventName)
                event(data);
        }
    }
    static removeAtIdxCallback(eventName,idx) {  // Remove any callbacks, if value of idx is boolean(true)
        if(!this.eventName) throw new Error('Do not exsist event name you indicated');
        else if(idx === true) this.eventName.length = 0;
        else this.eventName.splice(idx,1);
    }
}
*/


const Events = ( () => {
    const eventPool = [];

    return class {
        static findEvent(eventName) {
            let foundEvent;

            for(let event of eventPool) {
                if(event.eventName === eventName) {
                    foundEvent = event;
                    break;
                }
            }
            
            return foundEvent ? foundEvent : false;
        }
        static on(eventName,callback) {
            const e = Events.findEvent(eventName);

            if(!e) {
                eventPool.push({
                    eventName : eventName,
                    callback : [callback]
                });
            } else 
                e.callback.push(callback);
        }
        static trigger(eventName,data) {
            const event = Events.findEvent(eventName);

            if(!event) return;
            else {
                for(let callback of event.callback)
                    callback(data);
            }
        }
        static off(eventName,callback) {
            const event = Events.findEvent(eventName);

            for(let i=0; i<event.callback.length; i++) {
                if(event.callback[i] === callback) {
                    event.callback.splice(i,1);
                    break;
                }
            }
        }
    }
})();