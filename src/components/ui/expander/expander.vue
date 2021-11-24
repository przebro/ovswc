<template>
  <div :class="ClassT" >
      <div class="ui-expander-header" @click="expand">
          <div class="ui-expander-icon"><span class="mdi mdi-chevron-right"></span></div> 
          {{header}}
          <div :class="classD"></div>
      </div>
      <div v-if="isVisible==true" class="ui-expander-content">
      <slot></slot>
      </div>
  </div>
</template>

<script>
import themeable from '../mixins/themeable.js'
export default {
    name : "UiExpander",
    mixins : [themeable],
    props:{
        header : String,
        flat : Boolean,
        color : {
            type : String,
            default : ""
        },
        groupKey : Number,
        group : Array
    },
    data(){
        return{
            expanded : false,
            isVisible : false
        }
    },
    watch :{
        expanded : function(nval){
            if (nval == true){
                this.isVisible = true
            }else{
                setTimeout(()=>{ this.isVisible = false },530)
            }
        },
        group : function(nval){
            console.log(nval[0])
            if (nval[0] != this.groupKey )this.expanded = false;
        }
    },
    computed:{
        ClassT(){
            let theme = [ "ui-expander",this.expanded == true ?"ui-expander-active":"",this.flat == true ? "ui-expander-flat":""]
            return theme
        },
        classD(){
            return ["ui-expander-decorator",this.getBackgroundByName(this.color == ""?"primary":this.color)]
        }
    },
    methods : {
        expand : function(){
            this.expanded = !this.expanded
            if (this.groupKey != undefined && this.expanded == true){
                this.$emit("expand",this.groupKey)
            }
        }
    },
    mounted(){
        this.$emit("expand",this.group[0])
    }

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-expander{
    width: 100% !important;
    margin-bottom: 10px;
    box-shadow: 0px 0px 8px black;
    border: solid $ui-control-background 1px;
    display: flex;
    flex-direction: column;
    height:30px;
    overflow: hidden;
    transition-duration: 0.2s ;
    transition-property: height ease-out;
}
.ui-expander-flat{
    box-shadow: none !important;
}
.ui-expander-icon{
    font-weight: bold;
    display: inline-block;
    transform: rotate(0deg);
    transition-duration: 0.5s;
    transition-property: transform;
    
}
.ui-expander-active .ui-expander-icon{
    transform: rotate(90deg) !important;
}

.ui-expander-decorator{
    padding: 8px 4px;
    float: right;
}

.ui-expander-active{
    height:100%;
}
.ui-expander-header{
    min-height: 30px;
    padding: 0.5rem;
    text-align: left;
}
.ui-expander-content{
    padding : 1.5rem;
    padding-top: 0.5rem;
}
</style>