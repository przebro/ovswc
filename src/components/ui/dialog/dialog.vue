<template>
  <div class="ui-dialog-overlay" ref="ovrl" v-show="isActive" @keydown.esc="close()" tabindex="-1">
      <ui-card :width="dialogWidth" :height="dialogHeight">
          <div class="ui-dialog-container">
              <div class="ui-dialog-title">
                  <div class="flex-row flex filler">{{title}}
                  <div class="filler" />
                  <slot name="header"></slot>
                  </div>
              </div>
              <div class="ui-dialog-content">
                  <slot :model="model"></slot>
              </div>
              <div class="ui-dialog-buttons">
                  <slot name="buttons"></slot>
              </div>
          </div>
      </ui-card>
  </div>
</template>

<script>
import UiCard from '../card/card.vue'
import resize from '../mixins/resize'
export default {
  components: { UiCard },
    name : "UiDialog",
    mixins : [resize],
    props:{
        value : Boolean,
        width : Number,
        height : Number,
        title : String,
        persistent : Boolean
    },
    provide(){
        return{
            dialog: true
        }
    },
    data(){
        return{
            model : null
        } 
    },
    computed:{
        isActive(){
            return this.value
        },
        dialogWidth(){
            if (this.width > 0){
                return this.width
            }else{
                return 300
            }
        },
        dialogHeight(){
            if (this.height > 0){
                return this.height
            }else{
                return 240
            }
        },
        CancelText(){
            return this.cancelText === undefined?"":this.cancelText
        },
        SubmitText(){
            return this.submitText === undefined?"":this.submitText
        }
    },
    watch :{
        value : function(n){
            if (n == true){
                this.$nextTick(() => {this.$refs.ovrl.focus()});
            }
        }
    },
    methods:{
        close(){
            if (this.persistent == true) return;
            
            this.$emit("input",false);
        },
        cancel(){
            this.$emit('cancel',false);
            this.$emit("input",false);
        },
        submit(){
            this.$emit('submit',true);
            console.log(this.model)
            this.$emit("input",this.model);
        },
    },

}
</script>

<style>
.ui-dialog-overlay{
    position: fixed;
    top:0px;
    left: 0px;
    background-color: transparent;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    outline-color: transparent;
    display: flex;
    flex-direction: column;
    z-index: 199;
}

.ui-dialog-container{

    display: flex;
    flex-direction: column;
    height: 100%;

}
.ui-dialog-title{
    display: flex;
    height: 30px;
    flex-shrink: 1;
    padding: 3px;
}
.ui-dialog-title, p{
    
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    padding: 2px;
    margin: 0px;
}
.ui-dialog-content{

    flex-grow: 1;
    padding: 2px;
    overflow: hidden;
}

.ui-dialog-buttons{

    flex-basis: 32px;
    flex-shrink: 1;
    text-align: right;
}

.filler{
    flex-grow: 1;
}


</style>