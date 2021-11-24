<template>
    <ui-dialog v-if="value" :value="value"  title="Order task" :persistent="false" @input="onClose" :width="540" :height="400">
      <template v-slot:default >
          <div class="flex flex-row">
              <ui-label text="Group:" :width="120" right /><ui-drop-down-list :items="groups" :width="150" @itemSelected="onItemChange" v-model="groupName" />
              <ui-label text="Entire group:" :width="120" right /><ui-switch v-model="groupOnly" color="success" />
          </div>
          <div class="flex flex-row">
               <ui-label text="Task:" :width="120" right /><ui-drop-down-list :items="tasks" :width="150" :disabled="groupOnly"  v-model="taskName" />
          </div>
          <div class="flex flex-row">
               <ui-label text="Specific Odate:" :width="120" right /><ui-switch v-model="specificOdate" color="success" />
               <ui-date-picker format="YYYYMMDD" :disabled="!specificOdate" v-model="orderDate" />
          </div>
          <div class="flex flex-row">
               <ui-label text="Force:" :width="120" right /><ui-switch v-model="force" color="success" />
               
          </div>
      </template>
      <template v-slot:buttons >
          <ui-button flat color="alert" @click="onClose">Cancel</ui-button>
          <ui-button flat color="success" @click="onSubmit" >Order</ui-button>
      </template>
    </ui-dialog>
</template>

<script>
import UiDialog from '../../components/ui/dialog/dialog.vue'
import UiButton from '../../components/ui/button/button.vue'
import UiLabel from '../../components/ui/label/label.vue'
import UiSwitch from '../../components/ui/switch/switch.vue'
import UiDropDownList from '../../components/ui/dropdown/dropdown.vue'
import UiDatePicker from '../../components/ui/pickers/datetpicker.vue'
import {provider,channels} from '../../io/request'

export default {

    name : "OrderTaskDialog",
    components :{UiDialog,UiButton,UiLabel,UiDropDownList,UiSwitch,UiDatePicker},
    props:{
        value :{
            type : Boolean,
            default : false
        },
    },
    data(){
        return{
            groups : [],
            tasks : [],
            groupOnly : false,
            specificOdate : false,
            force : false,
            orderDate : "",
            groupName : "",
            taskName  : ""
        }
    },
    methods : {
        onClose(){
            this.$emit("input",false);
        },
        onSubmit(){
            //:TODO validator, prevent
            this.$emit("input",false);
            this.$emit("submit",{"groupName" : this.groupName,"taskName" : this.taskName,"odate" :this.orderDate,"grouponly" : this.groupOnly,"force" : this.force})
        },
        onItemChange(index,value){
            //:TODO validator
            provider.Send(channels.DEFINITION_LIST_TASKDEF,{"groupName" : value},this.onDefinitionListComplete)
        },
        onRequestGroupComplete(data){
            this.groups = data.groupName
        },
        onDefinitionListComplete(data){

            this.tasks = []
            for (const item of data.definitions){
                this.tasks.push(item.taskName)
            }
        }
    },
    mounted(){
        provider.Send(channels.DEFINITION_LIST_GROUPS, {filter : ""},this.onRequestGroupComplete)
    }
}
</script>

<style>

</style>