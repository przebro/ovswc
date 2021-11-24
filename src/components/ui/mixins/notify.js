
export default{
    name : "Notifier",
    methods :{
        Notify(title,message){
            window.velectron.SystemNotify(title,message)
        }
    }
}
