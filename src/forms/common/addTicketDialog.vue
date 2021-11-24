<template>
  <ui-dialog v-if="value" :value="value"  title="Add Ticket" :persistent="false" @input="onClose" :width="400">
      <template v-slot:default >
          <div class="flex flex-row">
              <ui-label text="Ticket name:" :width="100" right /><ui-input label="Ticket name" :maxlength="32" v-model="ticketName" />
          </div>
          <div class="flex flex-row">
              <ui-label text="Order date:" :width="100" right /><ui-input label="ODAT" format="numeric" :width="80" :maxlength="8" v-model="odate" />
          </div>
      </template>
      <template v-slot:buttons >
          <ui-button flat color="alert" @click="onClose">Cancel</ui-button>
          <ui-button flat color="success" @click="onSubmit" >Add Ticket</ui-button>
      </template>
  </ui-dialog>
</template>

<script>
import UiDialog from '../../components/ui/dialog/dialog.vue'
import UiButton from '../../components/ui/button/button.vue'
import UiInput from '../../components/ui/input/input.vue'
import UiLabel from '../../components/ui/label/label.vue'
export default {

    name : "AddTicketDialog",
    components :{UiDialog,UiButton,UiInput,UiLabel},
    props:{
        value :{
            type : Boolean,
            default : false,
        }
    },
    data(){
        return {
            ticketName : "",
            odate : ""
        }
    },
    methods : {
        onClose(){
            this.$emit("input",false);
        },
        onSubmit(){
            //:TODO validator
            this.$emit("submit",{name : this.ticketName, odate : this.odate})
            this.$emit("input",false);
        }
    }
}
</script>

<style>


</style>