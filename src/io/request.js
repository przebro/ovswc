import axios from "axios"
import router from "../router";

export const channels ={
    AUTHORIZE : {endpoint : "api/authorize",method : "post"},
    DEFINITION_LIST_GROUPS : {endpoint : "/api/def/groups/{filter}",method : "get"},
    DEFINITION_LIST_TASKDEF : {endpoint : "/api/def/{groupName}/definitions",method : "get"},
    TASK_ORDER_TASK : {endpoint : "/api/task/order",method : "put"},
    TASK_ORDER_GROUP : {endpoint : "/api/group/order",method : "put"},
    TASK_FORCE_TASK : {endpoint : "/api/task/force",method : "put"},
    TASK_FORCE_GROUP : {endpoint : "/api/group/force",method : "put"},
    TASK_LIST  : {endpoint : "/api/task/tasks",method : "post"},
    TASK_ENFORCE : {endpoint : "/api/task/{taskID}/enforce",method : "put"},
    TASK_RERUN  : {endpoint : "/api/task/{taskID}/rerun",method : "put"},
    TASK_HOLD  : {endpoint : "/api/task/{taskID}/hold",method : "put"},
    TASK_FREE  : {endpoint : "/api/task/{taskID}/free",method : "put"},
    TASK_SETOK  : {endpoint : "/api/task/{taskID}/setok",method : "put"},
    TASK_CONFIRM  : {endpoint : "/api/task/{taskID}/confirm",method : "put"},
    TASK_DETAILS  : {endpoint : "/api/task/{taskID}/details",method : "get"},
    TASK_OUTPUT  : {endpoint : "/api/task/{taskID}/output",method : "get"},
    TASK_LOG  : {endpoint : "/api/task/{taskID}/log",method : "get"},

    TICKET_ADD : {endpoint : "/api/resources/ticket", method : "put"},
    TICKET_DELETE : {endpoint : "/api/resources/ticket/{name}/{odate}", method : "delete"},
    TICKET_CHECK : {endpoint : "/api/resources/ticket/{name}/{odate}", method : "get"},
    TICKET_LIST : {endpoint : "/api/resources/tickets", method : "post"},

    FLAG_ADD : {endpoint : "/api/resources/flag", method : "put"},
    FLAG_LIST : {endpoint : "/api/resources/flags", method : "post"}
}



function HttpProvider(){
    const $this = this
    this.req = createRequest();
    /**
     * @param {ChannelData} channel
     * @param {Object} data
     */
    this.Send = function(channel,data){
        
        return $this.req({url : channel.endpoint,method : channel.method,data : data})
    }   
}

function ServiceProvider(provider) {
    const $this = this
    this.provider = provider

    this.Send = function(channel,data,callback,errcallback){
        
        let chnl = {endpoint : channel.endpoint, method : channel.method}
        Object.keys(data).map(  (val) =>{
            chnl.endpoint = channel.endpoint.replaceAll( "{"+val+"}", data[val] )
        } )


        $this.provider.Send(chnl,data).then ( result =>{
            
            if (typeof(result.data) === "string"){
                let chunked = []
                result.data.split('\n').forEach( vl =>{
                    if (vl == "") return;
                    chunked.push(JSON.parse(vl))
                })
                if (callback != null) callback(chunked);
                return
            }
            
            if (callback != null) callback(result.data)
            
        }).catch( err =>{
            if (err.response){
                err = err.response.data.error
            }
            if (errcallback != null) errcallback(err)
        })
        
    }
}

export const provider = new ServiceProvider(new HttpProvider())


export var registerAddress = function(addr){
    sessionStorage.setItem('connection-string',"http://"+addr)
}
export var requestAuthenticationToken = function (data,handler){

    let request = createRequest()
     request.post("api/authorize",data).then( (response) =>{
         if (response.data.message != "anonymous access"){
            sessionStorage.setItem("token",response.data.message)
         }else{
            sessionStorage.setItem("token","")
         }
         
         handler(response.data)
     }).catch( ()=>{
         router.push("/")
     })
}
export var requestTaskList =  function(data,handler){
    
    let chunked = []
    let request = createRequest()
    request({url : "api/task/tasks", method : "post", data : data}).then( (result)=>{
        
        result.data.split('\n').forEach( vl =>{
            if (vl == "") return;
            chunked.push(JSON.parse(vl))
        })
        handler(chunked)
    }).catch( (error)=>{
        console.log(error)
    })
}
export var requestGroupNames = function(data,handler){
    let request = createRequest()
    request.get("api/def/groups/").then( (result)=>{
        handler(result.data.groupName)
    }).catch( (error) =>{
        console.log(error)
    })
}

export var requestDefinitionList = function(data,handler){
    let request = createRequest()

    request.get("api/def/"+data+"/definitions").then( (result)=>{
        handler(result.data.definitions)
    }).catch( (error) =>{
        console.log(error)
    })
}

export var orderTask = function(data){
    let request = createRequest()
    console.log(data)
    request.post().then( (result) =>{
        console.log(result)
    } ).catch( (error) =>{
        console.log(error)
    })
}

function createRequest(){
    let req = axios.create()
    req.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    req.defaults.baseURL = sessionStorage.getItem('connection-string')
    return req
}