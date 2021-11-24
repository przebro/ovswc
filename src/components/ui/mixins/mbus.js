

export const MSGTYPE = {
    ERROR :0,
    WARN :1,
    MSG :2
}
    
export const level_warn = 2
export const level_error = 3

function MessageBus(){
    const $this = this
    this.queue = new Array()
    this.subscribers = new Array()
    this.subscribe = function(callback){
        
        $this.subscribers.push(callback)
    }
    this.notify = function(msg,level){
        $this.subscribers.forEach( (func) =>{ func(msg,level) })
    }
}

const mbus = new MessageBus()

export function SendMessage(msg){
    mbus.notify(msg,MSGTYPE.MSG)
}
export function SendError(msg){
    mbus.notify(msg,MSGTYPE.ERROR)
}
export function SendWarning(msg){
    mbus.notify(msg,MSGTYPE.WARN)
}
export function Subscribe(func){
    mbus.subscribe(func)
}