<template>
  <ui-dialog v-if="value" :value="value"  title="Set flag" :persistent="false" @input="onClose" :width="400">
      <template v-slot:default >
          <div class="flex flex-row">
              <ui-label text="Flag name:" :width="100" right /><ui-input label="Flag name" :width="210"  :maxlength="32" v-model="flagName" />
          </div>
          <div class="flex flex-row">
              <ui-label text="Flag state:" :width="100" right /><ui-drop-down-list :items="states"   v-model="flagState" />
          </div>
      </template>
      <template v-slot:buttons >
          <ui-button flat color="alert" @click="onClose">Cancel</ui-button>
          <ui-button flat color="success" @click="onSubmit" >Set Flag</ui-button>
      </template>
  </ui-dialog>
</template>

<script>
import UiDialog from '../../components/ui/dialog/dialog.vue'
import UiButton from '../../components/ui/button/button.vue'
import UiInput from '../../components/ui/input/input.vue'
import UiLabel from '../../components/ui/label/label.vue'
import UiDropDownList from '../../components/ui/dropdown/dropdown.vue'
export default {

    name : "SetFlagDialog",
    components :{UiDialog,UiButton,UiInput,UiLabel,UiDropDownList},
    props:{
        value :{
            type : Boolean,
            default : false,
        }
    },
    data(){
        return {
            flagName : "",
            odate : "",
            states : ["Shared","Exclusive"],
            flagState : ""
        }
    },
    methods : {
        onClose(){
            this.$emit("input",false);
        },
        onSubmit(){
            //:TODO validator
            this.$emit("submit",{name : this.flagName, state : this.flagState == "Shared" ?0:1 })
            this.$emit("input",false);
        }
    }
}
</script>

<style>


</style>