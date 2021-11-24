<template>
  <div class="ui-switch-control"> 
      <div :class="classS">
        <div :class="classB" @click="toggleCheckbox"></div>
        <input type="checkbox" :disabled="isDisabled"  :id="id" v-model="ischecked" />
      </div>
      <label v-if="label!==undefined" :class="classL" :for="id">{{label}}</label>
      
  </div>
</template>

<script>
import idgen from '../mixins/idgen.js'
import themeable from '../mixins/themeable.js'

export default {
    name:"UiSwitch",
    props:{
        label : String,
        value : Boolean,
        disabled : Boolean,
        color : String,
        labelColor : String
        },
    mixins : [idgen,themeable],
    data(){
        return {
            ischecked : this.value,
            disable : false,
            id : ""
        }
    },
    computed:{
        Value(){
            return this.value
        },
        classB(){
            let cls = "ui-switch-btn"
            cls += this.ischecked == true ? " ui-switch-btn-on":"";
            cls += !this.disabled  ? "": " ui-switch-btn-disabled";
            return cls
        },
        classS(){
            
            return ["ui-switch-box",
                this.ischecked == true ? this.getBackgroundByName( this.color == "" ? "primary":this.color ):"",
                !this.disabled  ? "": " ui-switch-box-disabled",
            ]
        },
        classL(){
            return ["ui-switch-label",this.getTextColorByName( this.labelColor == ""? "dark":this.labelColor)  ]
        },
        isDisabled(){
            return this.disabled 
        }
    },
    methods:{
        toggleCheckbox(){
            if (this.disabled) return;
            this.ischecked = !this.ischecked
            this.$emit("input",this.ischecked)
        }
    },
    beforeMount(){
        this.id = this.Next("sw")
    }
    

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

input[type=checkbox]{
    display: none;
}
.ui-switch-control{
    width: auto;
    position: relative;
    display: flex;
    height: 32px;
    
}
.ui-switch-btn{
    background-color: whitesmoke;
    width: 18px;
    height: 18px;
    transition-duration: 0.25s;
    border-radius:9px;
    border: solid #999 1px;
}
.ui-switch-btn-on{
    transition-duration: 0.25s;
    transform : translate(18px,0);

}

.ui-switch-btn-disabled{
   background-color: whitesmoke !important; 
   border-color: #DDD !important;
}

.ui-switch-label{
    font-size: 14px;
    display: inline-flex;
    position: relative;
    padding: 6px;
}
.ui-switch-box{
    height: auto;
    padding:1px;
    width:40px;
    background-color: #aaa;
    border: solid #999 px;
    border-radius:9px;
    display: inline-flex;
    margin: 6px;
    
}
.ui-switch-box-disabled{
   background-color: whitesmoke !important; 
}

</style>