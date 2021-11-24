<template>
  <ui-list-view :items="items" >
      <template v-slot:default="item">
          <div :key="item.item.taskId" class="item-row" @click="selectRow(item.item.taskId)">
              <div class="item-column">{{item.item.taskId}}</div>
              <div class="item-column">{{item.item.taskName}}</div>
              <div class="item-column">{{item.item.groupName}}</div>
              <div class="item-column">{{item.item.runNumber}}</div>
              <div class="item-column">{{item.item.orderDate}}</div>
              <div class="item-column">{{ status[item.item.taskStatus]}}</div>
              <div class="item-column">
                  <ui-menu :maxWidth="180">
                      <template v-slot:activator="{on}">
                          <ui-button flat color="success" @click="on">...</ui-button>
                      </template>
                      <template>
                        <ui-menu-item @click="onTaskAction('setok',item.item.taskId)">Set to OK</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('rerun',item.item.taskId)">Rerun</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('enforce',item.item.taskId)">Enforce</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('hold',item.item.taskId)">Hold</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('free',item.item.taskId)">Free</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('confirm',item.item.taskId)">Confirm</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('log',item.item.taskId)">Task Log</ui-menu-item>
                        <ui-menu-item @click="onTaskAction('output',item.item.taskId)">Task Output</ui-menu-item>
                      </template>
                  </ui-menu>
              </div>
              <div class="item-column"></div>
          </div>
      </template>
  </ui-list-view>
</template>

<script>
import UiListView from '../../components/ui/listview/listview.vue'
import UiMenu from '../../components/ui/menu/menu.vue'
import UiMenuItem from '../../components/ui/menu/menuitem.vue'
import UiButton from '../../components/ui/button/button.vue'
import {SendMessage,SendError} from '../../components/ui/mixins/mbus'

import {provider,channels} from '../../io/request.js'

export default {
    name : "AtqList",
    components:{UiListView,UiMenu,UiButton,UiMenuItem},
    props :{
        items : []
    },
    data(){
        return {
            status : ["Waiting","Starting","Executing","Ended OK","Ended Not OK","Hold"],
            isVisible : false,
        }
    },
    methods:{
        selectRow(itemID){
            this.$emit('selected',itemID)
        },
        onTaskAction(action,taskID){

            //:TODO validator

            var chnl = null
            if (action === "setok") chnl = channels.TASK_SETOK;
            if (action === "rerun") chnl = channels.TASK_RERUN;
            if (action === "enforce") chnl = channels.TASK_ENFORCE;
            if (action === "hold") chnl = channels.TASK_HOLD;
            if (action === "free") chnl = channels.TASK_FREE;
            if (action === "confirm") chnl = channels.TASK_CONFIRM;
            if (action === "log") chnl = channels.TASK_LOG;
            if (action === "output") chnl = channels.TASK_OUTPUT;

            if (chnl != null){
                provider.Send(chnl,{ taskID : taskID},this.onTaskActionResult,this.onError)
            }
        },
        onTaskActionResult(data){
            SendMessage(data.message)
        },
        onError(err){
            SendError(err)
        }
    }
}
</script>

<style>
.item-row{
    font-size: 12px;
    display: flex;
    align-content: flex-start;
}
.item-column{
    text-align: left;
    width:100px;
    margin: 0 5px;
    vertical-align: center;
}
.item-row:nth-child(even){
    background-color: white;
}
.item-column:last-child{
    flex-grow: 1;
}
</style>