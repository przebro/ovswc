<template>
  <div :class="classT">
      <slot></slot>
  </div>
</template>

<script>
import themeable from '../mixins/themeable'
export default {
    name : "UiNavigator",
    mixins :[themeable],
    provide(){
        return {

        }

    },
    computed :{
        classT(){
            return ["ui-navigator",this.getTheme(""),"theme"].join(" ")
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";
.ui-navigator{
    width : 48px;
    display: flex;
    flex-direction: column;
}
.theme{
    background-color: #00a212 !important;
}
    
</style>