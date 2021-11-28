<template>
  <ui-dialog v-if="value" :value="value"  title="Task log" :persistent="false" @input="onClose" :width="600">
      <template v-slot:default >
          <div :class="classC">
              <div class="ui-log-presenter">
                <div class="ui-log-item" v-for="(items,i) in content" :key="i">{{items}}</div>
              </div>
          </div>
      </template>
      <template v-slot:buttons >
          <ui-button flat color="success" @click="onClose">Close</ui-button>
      </template>
  </ui-dialog>
</template>

<script>
import UiDialog from '../../components/ui/dialog/dialog.vue'
import UiButton from '../../components/ui/button/button.vue'
import themeable from '../../components/ui/mixins/themeable'

export default {
    name : "taskLogDialog",
    components : {UiDialog,UiButton},
    mixins :[themeable],
    props:{
        value : Boolean,
        content : Array
    },
    data(){
        return {
        }
    },
    computed:{
        classC(){
            return [this.getTheme(""),"ui-log-container"]
        },
        classI(){
            return [this.getTheme(""),"ui-log-item"]
        }
    },
    methods :{
        onClose(){
            
            this.$emit('input',false)
        }
    }

}
</script>

<style lang="scss">
@import "../../sass/variables.scss";
.ui-log-container{
    display: flex;
    overflow-y:scroll;
    height: 100%;
}
.ui-log-presenter{
    padding: 0.2rem;
    display: inline-flex;
    flex-direction: column;
    white-space: nowrap;
    width:100%;

}
.ui-log-item{
    padding: 0.2rem 0.5rem;
    display: flex;
}
.ui-log-item:nth-child(even){
    background-color: #f0f0f0;
}

</style>