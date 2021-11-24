<template>
  <div :class="classT" :style="styleT">
      <slot></slot>
  </div>
</template>

<script>
import themeable from '../mixins/themeable'
export default {
    name : "UiCard",
    props:{
        width : null,
        height: null,
        flex : Boolean,
        transparent : Boolean,
    },
    inject:{
        dialog :{ default : false}
    },
    mixins :[themeable],
    computed:{
        classT(){
            
            let cls = this.getTheme('container')
            cls += " ui-card"
            cls += this.transparent == false ? "": " transp"
            cls += this.flex  == false ? "":" ui-card-flex ui-card-column"
            
            if (this.dialog == true){
                cls += " dialog-shadowed"
            }
            return  cls;
        },
        styleT(){
            let st = ""

            
            if ((typeof(this.height) == 'number' && this.height >=0) || /^\d+(\.\d+)?%$/.test(this.height)){
                 st +=  this.height >= 0  ? "height:"+ this.height + "px;":"height:"+this.height;
                 st+=";"
            }
            
            if ((typeof(this.width) == 'number' && this.width >= 0 ) || /^\d+(\.\d+)?%$/.test(this.width)){
                st += this.width >= 0 ? "width:"+this.width + "px;":"width:" + this.width;
                st+=";"
            }
            
            return st
        }
    }

}
</script>

<style lang="scss">
@import "../../../sass/variables.scss";


.ui-card{
    padding: 5px;
    flex-direction: row;
}
.ui-card-flex{
    display: flex;
    flex-grow: 1;
}
.ui-card-row{
    flex-direction: row;
}
.ui-card-column{
    flex-direction: column;
}
.dialog-shadowed{
    border: solid $ui-control-background 1px;
    box-shadow: 0px 0px 8px black;
}

.transp{
    background-color: transparent !important;
}

</style>