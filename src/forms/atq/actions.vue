<template>
  <div class="flex-row flex" style="justify-content:end;background-color:#333;" >
      <ui-button color="warn" icon="feature-search-outline" @click="showFilterDialog" >Filter</ui-button>
      <ui-switch color="warn" labelColor="light"  @input="onSetAutoRefresh" label="Auto refresh" ></ui-switch>
      <div style="flex-grow:1"></div>
      <ui-button color="success" icon="ticket-outline" @click=" ticketDialog = !ticketDialog " >Add Ticket</ui-button>
      <ui-button color="success" icon="flag-plus-outline" @click=" flagDialog = !flagDialog " >Set Flag</ui-button>
      <ui-button color="success" icon="calendar-check-outline" @click=" taskDialog = !taskDialog " >Order Task</ui-button>
      <add-ticket-dialog :value="ticketDialog" @input="ticketDialog = false" @submit="onAddTicket" />  
      <order-task-dialog v-if="taskDialog" :value="taskDialog" @input="taskDialog = false" @submit="onTaskSubmitted" />
      <set-flag-dialog :v-if="flagDialog" :value="flagDialog" @input="flagDialog= false" @submit="onFlagSubmitted" />
      
  </div>
</template>

<script>
import UiButton from '../../components/ui/button/button.vue'
import UiSwitch from '../../components/ui/switch/switch.vue'
import AddTicketDialog from '../common/addTicketDialog.vue'
import OrderTaskDialog from '../common/orderTaskDialog.vue'
import SetFlagDialog from '../common/setFlagDialog.vue'
import {SendMessage,SendError} from '../../components/ui/mixins/mbus'
import {provider,channels} from '../../io/request'

export default {

    name : "AtqActions",
    components : {UiButton,AddTicketDialog,OrderTaskDialog,UiSwitch,SetFlagDialog},
    data(){
      return{
        ticketDialog : false,
        taskDialog : false,
        flagDialog : false,
        autoRefresh : false
      } 
    },
    methods:{
      showFilterDialog(){
        SendMessage("Not implemented")
      },
      onTaskSubmitted(data){
        //:TODO validator
        if (data.grouponly){
          let chan  = data.force == true ? channels.TASK_FORCE_GROUP : channels.TASK_ORDER_GROUP;
          provider.Send(chan,{taskGroup : data.taskGroup, odate : data.odate},this.onOrderResult,this.onError)

        }else{
          let chan  = data.force == true ? channels.TASK_FORCE_TASK : channels.TASK_ORDER_TASK;
          provider.Send(chan,{taskGroup : data.groupName,taskName : data.taskName, odate : data.odate},this.onOrderResult,this.onError)
        }
      },
      onFlagSubmitted(data){
        console.log(data)
        provider.Send(channels.FLAG_ADD,data,this.onSetFlagResult,this.onError)
      },
      onSetAutoRefresh(){
        this.autoRefresh = !this.autoRefresh
        this.$emit('refresh',this.autoRefresh)
      },
      onAddTicket(data){
        //:TODO validator
        provider.Send(channels.TICKET_ADD,data,this.onAddTicketResult,this.onError)
      },
      onAddTicketResult(data){
        data.success == true ? SendMessage(data.message):SendError(data.message)
      },
      onSetFlagResult(data){
        data.success == true ? SendMessage(data.message):SendError(data.message)
      },
      onOrderResult(data){
        data.success == true ? SendMessage(data.message):SendError(data.message)
      },
      onError(err){
        SendError(err)
      }
    }

}
</script>

<style lang="scss">
@import "../../sass/variables.scss";

</style>