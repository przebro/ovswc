<template>
  <div :class="classT" :style="styleT">
      <div class="ui-input-container" >
      <input :value="tval" @input="handleInput" :type="type" :id="id" :disabled="disabled" :maxlength="maxlength" >
      <label v-if="labeled" :for="id" :class="classL">{{label}}</label>
      </div>
  </div>
</template>

<script>

import idgen from '../mixins/idgen.js'
import themeable from '../mixins/themeable'

export default {
    name :"UiInput",
    props:{
        value : {
            type : [String,null],
            default : () => ""
        },
        label : String,
        password : Boolean,
        width : Number,
        disabled : Boolean,
        format : String,
        maxlength :{
            type : Number,
            default: -1
        } 
    },
    mixins:[idgen,themeable],
    data(){
        return{
            tval : this.value || "",
            id : "",
        }  
    },
    filters:{
        sample(val){
            console.log("filtered")
            return val
        },
        capitalize(val){
            return val.toUpperCase()
        }
    },
    computed:{
        labeled(){
            return  this.tval.length > 0 ?false:true;
        },
        type(){
            return (this.password == false?'text': 'password');
        },
        styleT(){
            let style = this.width  > 0 ? "width:"+this.width +"px;":"";
            return style
        },
        classT(){
            return 'ui-input-control'
        },
        classL(){
            let cls = this.getTheme("")
            cls += ' ui-input-label'
            
            return cls
        }

    },
    methods: {
        handleInput (e) {
          e.preventDefault();
          this.tval = this.formatValue(e)
          this.$emit('input',this.tval)
        },
        formatValue(e){

            if (e.inputType != "insertText"){
                return e.target.value
            }

            if (this.format == 'numeric'){
                console.log("checking numeric")
                if (!/\d/.test(e.data)) { 
                    console.log("not numeric")
                     return "" 
                    }
            }
            return e.target.value
        }
    },
    beforeMount(){
        this.id = this.Next("inp")
        
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

input[type=text],input[type=password]{
    outline-style: none;
    font-size: $ui-font-size;
    border:none transparent 1px;
    padding: .5em;
    width: 100%;
    height:28px;
    border-radius: 3px;
}

.ui-input-control{
    display: flex;
    height: 28px;
    margin: 2px;
}

.ui-input-container{
    position: relative;
    flex-grow: 1;
}
input[type=text]:focus + .ui-input-label ,input[type=password]:focus + .ui-input-label{
       transform: scale(0.5,0.5) translate(-24px,-16px);
}
.ui-input-label{
    display: inline;
    top:5px;
    position: absolute;
    left:10px;
    font-style: italic;
    transition-property:transform;
    transition-duration: 0.3s;
}

</style>