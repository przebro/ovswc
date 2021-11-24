<template>
  <div :class="classT" :style="styleT"><span :style="styleS">{{text}}</span></div>
</template>

<script>
import themeable from '../mixins/themeable'

export default {
    name :"UiLabel",
    mixins :[themeable],
    props:{
        text : String,
        width : Number,
        right : Boolean
    },
    computed:{
        classT(){
            let cls = [this.getTheme(""),"ui-label"]
            cls
            return cls
        },
        styleT(){

            let style = this.width  > 0 ? "width:"+this.width +"px;":"";
            return style 
        },
        styleS(){
            let style = this.right == true ? "margin-left:auto;":"";
            return style
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";
.ui-label{
    background-color: transparent;
    display: flex;
    padding: 0.5em;
}

</style>