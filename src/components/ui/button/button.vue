<template>
  <button @click="onClick" :class="classT" :disabled="disabled" >
      <span><slot></slot></span><span v-if="classI!=''" :class="classI" ></span>
    </button>
</template>

<script>

export default {
    name : "UiBtn",
    props:{
        color : {
            type : String,
            default : () => ""
        },
        icon:{
            type : String
        },
        disabled : {
            type :Boolean
        },
        flat:{
            type : Boolean
        },
        toolbutton:{
            type : Boolean
        }
    },
    data(){
        return {
        }
    },
    attrs :{
        outlined : true,
    },
    computed:{
        classT(){

            let cls = ""
            if (this.toolbutton) {
                cls +=  "ui-tool-btn"
            }else{

                if (this.flat){
                    cls += "text-" + (this.color == undefined ? "primary" : this.color)

                }else{
                    cls = cls +" "+ (this.color == undefined ? "primary" : this.color)
                }
                
                cls += " ui-btn"
            }

            if (this.outlined){
                cls += " ui-btn-outlined"
            }

            return cls
        },
        classI(){
            if (this.icon!=="" && this.icon!== undefined){
                return "icon mdi mdi-" + this.icon
            }
            return ""
        }
    },
    methods:{
        onClick(){
            this.$emit("click")
        }
    }
}
</script>

<style lang="scss">
@import "../../../sass/variables.scss";


button {
    outline-style: none;
    border-radius:2px;
    -webkit-font-smoothing: antialiased;
    border: none;
    font-size: $ui-font-size;
    user-select: none;
    font-family: Roboto,sans-serif;
    font-weight:  500 !important;

}

.ui-btn{
    padding: .6em 1.25em;
    height: 28px;
    margin: 2px;
}

.ui-tool-btn{
    padding: .25em;
    color: $ui-font-color;
    background-color: $color-primary;
    border : solid transparent 1px;
    border-radius: 2px;
    margin: 2px;
    &:hover span{
        color: white;
    }
    
}

.ui-btn-outlined{
    background-color: transparent  !important;
    border-color: $ui-font-color-inactive;
}

.tool-btn .icon{
    margin-right: 6px;
}
.tool-btn:active{
    border : solid transparent 1px;
}

.ui-btn-flat{
    background-color: transparent !important
}


.tool-btn span{
    color: gray;
}

.icon{
    margin-left: 6px;
    font-weight: bold;
}


.primary {
      background-color:$color-primary;
      transition-property: background-color;
      transition-duration: 0.3s;
      color: $ui-font-color;
      &:hover {
            background-color : lighten( $color-primary, 10%)!important;
      }
      &:active{
            background-color : darken( $color-primary, 10%)!important;
      }
      &:disabled{
          background-color : $ui-color-disabled !important;
          &:hover{
              background-color : $ui-color-disabled !important;
          }
      }
}

.warn {
      background-color:$color-warn;
      transition-property: background-color;
      transition-duration: 0.3s;
      color: $ui-font-color;
      &:hover {
            background-color :lighten( $color-warn, 10%)!important;
      }
      &:active{
            background-color : darken( $color-warn, 10%)!important;
      }
}
.alert {
      background-color:$color-alert;
      transition-property: background-color;
      transition-duration: 0.3s;
      color: $ui-font-color;
      &:hover {
            background-color : alighten( $color-alert, 10%)!important;
      }
      &:active{
            background-color : darken( $color-alert, 10%)!important;
      }
}

.success {
      background-color:$color-success;
      transition-property: background-color;
      transition-duration: 0.3s;
      color: $ui-font-color;
      &:hover {
            background-color : lighten( $color-success, 10%)!important;
      }
      &:active{
            background-color : darken( $color-success, 10%)!important;
      }
}

.violet {
      background-color: $color-violet;
      transition-property: background-color;
      transition-duration: 0.3s;
      color: $ui-font-color;
      &:hover {
            background-color : lighten( $color-violet, 10%)!important;
      }
      &:active{
            background-color : darken( $color-violet, 10%)!important;
      }
}

.text-alert{
    background-color:transparent !important;
    font-weight: bold !important; 
    color : $color-alert;
    
      &:hover {
            color : lighten( $color-alert, 5%)!important;
            background-color: rgba($color-alert, $alpha: 0.1) !important;
      }
      &:active{
            color : lighten( $color-alert, 10%)!important;
      }

}
.text-success{
    background-color:transparent !important;
    font-weight: bold !important; 
    color: $color-success;
      &:hover {
            color : lighten( $color-success, 5%)!important;
            background-color: rgba($color-success, $alpha: 0.1) !important;
      }
      &:active{
            color : lighten( $color-success, 10%)!important;
      }
}

.text-violet{
    background-color:transparent;
    font-weight: bold;
    color: $ui-font-color;
      &:hover {
            color : lighten($color-violet, 5%)!important;
            background-color: rgba($color-violet, $alpha: 0.1) !important;
      }
      &:active{
            color : lighten($color-violet, 10%)!important;
      }
    
}
</style>>

