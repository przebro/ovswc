<template>

    <div :class="classT" >
        <card flex>
            <div class="ui-notification-container">
                <div><span class="icon mdi mdi-close" style="padding:2px 4px;display:block;" @click="received=false" ></span></div>
                <div class="ui-notification-message">
                    <p>{{message}}</p>
                    
                </div>
                <div :class="classB"></div>
            </div>
        </card>
    </div>
  
</template>

<script>
import card from '../card/card.vue'
import {Subscribe,MSGTYPE} from '../mixins/mbus'
import themeable from '../mixins/themeable'

export default {
    name : "UiNotification",
    components:{card},
    mixins :[themeable],
    data(){
        return{
            received : false,
            message : "",
            msgColor : ""
        }
    },
    provide(){
        return{
            dialog: true
        }
    },
    computed:{
        classT(){
            let cls = "ui-notification-area"
            cls += this.received == true ? " ui-notification-area-active":"";
            return cls
        },
        classB(){
            return ["ui-notification-bar",this.getBackgroundByName(this.msgColor)]
        }
    },
    methods:{
        OnMessageReceived(msg,level){

            if (level == MSGTYPE.MSG) this.msgColor = "success";
            if (level == MSGTYPE.WARN) this.msgColor = "warn";
            if (level == MSGTYPE.ERROR) this.msgColor = "alert";

            this.message = msg
            this.received = true
            console.log(MSGTYPE.MSG)
            
            setTimeout(()=>{this.received = false;this.msgColor = "success"},14000)
        }
    },
    mounted(){
        Subscribe(this.OnMessageReceived)

    }

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";
.ui-notification-area{
    width: 400px;
    min-height: 1px;
    background-color: gray;
    position: absolute;
    bottom : 0px;
    right: 10px;
    opacity: 0;
    visibility: hidden;
    transition:opacity 0.1s, transform 0.3s;
    display: flex;
}
.ui-notification-area-active{
    visibility: visible;
    opacity: 100%;
    transform: translate(0px,-10px);
}

.ui-notification-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    user-select: none;
}
.ui-notification-bar{
    flex-shrink: 1;
    height: 100%;
    width: 8px;
}
.ui-notification-message{
    width: 100%;
    flex-grow: 1;

}
</style>