<template>
<ui-card flex>
    <atq-actions @refresh="onSetAutoRefresh" />
    <div style="flex-grow:1;display:flex" >
      <atq-list :items="dataItems" @selected="onItemSelected" @ontasklog="onTaskLog"  />
      <atq-details :item="selectedItem"  />
    </div>
    <task-log-dialog :v-if="taskDialog"  v-model="taskDialog" :content="taskLog" />
</ui-card>
</template>

<script>
import UiCard from '../components/ui/card/card.vue'
import AtqActions from '../forms/atq/actions.vue'
import AtqDetails from '../forms/atq/details.vue'
import AtqList from '../forms/atq/atqlist.vue'
import taskLogDialog from '../forms/common/taskLogDialog.vue'
import {provider,channels} from '../io/request.js'

export default {
    name :'Atq',
    components :{UiCard,AtqActions,AtqList,AtqDetails,taskLogDialog},
    data(){
      return {
        selectedItem : null,
        autoRefresh : false,
        dataItems :null,
        interval : null,
        taskLog  : null,
        taskDialog : false,
      }
    },
    watch :{
      autoRefresh : function(nval){
            if (nval == true){
                this.enableAutoRefresh()
            }else{
                this.disableAutoRefresh()
            }
      }
    },
    methods :{
      onItemSelected(itemId){
        this.onItemChange(itemId)
      },
      onSetAutoRefresh(val){
        this.autoRefresh = val
      },
      onTaskLog(data){
            this.taskLog = data.output
            this.taskDialog = true
      },
      enableAutoRefresh(){
            this.interval = setInterval(this.onRefreshResults,2000)
      },
      disableAutoRefresh(){
            clearInterval(this.interval)
      },
      onTaskListComplete(data){
            if (data === "") return;

            let items = new Array()
            if (Array.isArray(data)) {
              for(const e of data) {
                items.push(e.result) 
              }
            }else{
              items.push(data.result)
            }
            
            this.dataItems = items
        },
      onRefreshResults(){
            provider.Send(channels.TASK_LIST,{},this.onTaskListComplete,this.onError)
      },
      onItemChange(taskID){
            provider.Send(channels.TASK_DETAILS,{taskID : taskID},this.onResult,this.onError)
      },
      onResult(data){

            this.selectedItem = {
              taskData : data.baseData,
              startTime : data.startTime,
              endTime : data.endTime,
              conds : {
                runFrom : data.from,
                runTo : data.to,
                resources : data.resources
              },
              cycleData : data.cyclicData

            }
        },
        onError(data){
            console.log(data)
        }
    },
    mounted(){
        this.onRefreshResults()
    }
}
</script>

<style lang="scss">
</style>
