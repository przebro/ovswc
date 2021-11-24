<template>
  <div :class="classI" @click="onClick">
      <span class="menu-item-content"><slot></slot></span>
  </div>
</template>

<script>
import themeable from '../mixins/themeable.js'
export default {
    name :"UiMenuItem",
    mixins : [themeable],
    inject:{
        isInMenu : {
            default : false,
        },
        onMenuItemClick : {
            default : null
        }
    },
    props :{
        
        disabled : {
            default : false
        }
    },
    computed:{
        classI(){
           return [this.getTheme("item"),"ui-menu-item"] 
        }
    },
    methods:{
        onClick(){
            this.$emit('click')
            if (this.onMenuItemClick != null) this.onMenuItemClick();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-menu-item{
    font-size:14px;
    margin: 2px;
    padding: 4px 2px;
    font-weight:  400 !important;
}
.ui-menu-item:first-child{
    margin-top: 8px;
}
.ui-menu-item:last-child{
    margin-bottom: 8px;
}
.menu-item-content{
    padding: 5px;
}


</style>