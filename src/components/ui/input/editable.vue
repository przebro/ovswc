<template>
  <div class="editable-container">
      <div class="editable" contenteditable="true" v-html="content" @blur="onEdit"> 
      </div>
  </div>
</template>

<script>

import themeable from '../mixins/themeable'

export default {
    name :"UiEditable",
    data(){
        return {
             content : ""
        }
    },
    methods:{
        onEdit(evt){
             var src = evt.target.innerHTML
             this.content = src
             this.$emit("contentChange",this.content)
         },
    }

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.editable-container{
    max-height: 200px;
    outline-style: none;
    font-size: $ui-font-size;
    color: $ui-font-color;
    border:none transparent 1px;
    background-color: $ui-control-background;
    padding: .5em;
    overflow : hidden;
    outline: hidden;
}

.editable{
    height: 200px;
    max-height: 200px;
    outline: transparent none 0px;
    text-align: left;

}

</style>