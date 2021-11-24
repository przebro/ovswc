<template>
  <ui-card :width="360">
          <ui-expander header="Task summary" flat  :group="expGroup" :groupKey="1" @expand="onGroupChange" v-if="taskData != null">
              <ui-expander-view>
                  <div class="flex flex-row"><ui-label text="Group:" :width="100" /><div class="ui-static">{{taskData.groupName}}</div></div>
                <div class="flex flex-row"><ui-label text="Task name:" :width="100" /><div class="ui-static">{{taskData.taskName}}</div></div>
                <div class="flex flex-row"><ui-label text="Task ID:" :width="100" /><div class="ui-static">{{taskData.taskId}}</div></div>
                <div class="flex flex-row"><ui-label text="Order date:" :width="100" /><div class="ui-static">{{taskData.orderDate}}</div></div>
                <div class="flex flex-row"><ui-label text="No Runs:" :width="100" /><div class="ui-static">{{taskData.runNumber}}</div></div>
                <div class="flex flex-row"><ui-label text="Start:" :width="100" /><div class="ui-static">{{startTime}}</div></div>
                <div class="flex flex-row"><ui-label text="End:" :width="100" /><div class="ui-static">{{endTime}}</div></div>
              </ui-expander-view>
          </ui-expander>
          <ui-expander header="Preconditions" flat color="warn"  :group="expGroup" :groupKey="2" @expand="onGroupChange" v-if="taskData != null">
              <ui-expander-view>
                  <div class="flex flex-row">
                    <ui-label text="From:" :width="100" /><div class="ui-static">{{conds.runFrom}}</div>
                </div>
                <div class="flex flex-row">
                    <ui-label text="To:" :width="100" /><div class="ui-static">{{conds.runTo}}</div>
                </div>
                <div class="flex flex-row">
                    <ui-label text="Resources" :width="100" />
                </div>
                <div class="flex flex-row">
                    <table>
                    <tr v-for="(item,i) in conds.resources" :key="i">
                         <td>{{item.name}}</td><td>{{item.odate}}</td>
                    </tr>
                    </table>
                </div>
              </ui-expander-view>
          </ui-expander>
  </ui-card>
</template>

<script>
import UiCard from '../../components/ui/card/card.vue'
import UiLabel from '../../components/ui/label/label.vue'
import UiExpanderView from '../../components/ui/expander/expanderview.vue'
import UiExpander from '../../components/ui/expander/expander.vue'
import {provider,channels} from '../../io/request.js'
export default {
    name : "AtqDetails",
    props : {
        itemId : String
    },
    data(){
        return {
            expGroup : [1],
            taskData : null,
            startTime : "",
            endTime : "",
            conds :{
                runFrom : "",
                runTo : "",
                resources : []
            }
            
        }
    },
    components : {UiCard,UiLabel,UiExpanderView,UiExpander},
    watch:{
        
        itemId(nval){
            if (nval!==""){
                this.onItemChange(nval)
            }
        }
        
    },
    methods :{
        onGroupChange(groupKey){
            this.expGroup = [groupKey]
        },
        onItemChange(taskID){
            provider.Send(channels.TASK_DETAILS,{taskID : taskID},this.onResult,this.onError)
        },
        onResult(data){
            console.log(data)
            this.taskData = data.baseData
            this.startTime = data.startTime
            this.endTime = data.endTime

            this.conds.runFrom = data.from
            this.conds.runTo = data.to
            this.conds.resources = data.resources
            
        },
        onError(data){
            console.log(data)
        }
    }

}
</script>

<style>
.ui-container{

    display: flex;
    flex-direction: column;
    height: 100%;
}
.ui-static{
    display: flex;
    padding: 0.5em;
}
</style>