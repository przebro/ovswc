<template>
  <div class="ui-expander-view">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name :"UiExpanderView",
  props:{
    select :{
      default : null
    }
  },
  data(){
    return {
      selectedItm : 0
    }
  },
  computed:{
    selected(){
      return this.selectedItm
    }
  },
  provide(){
      return {
        selectedItem  : () => this.selectedItm,
        onselect : this.onSelectChange
      }
  },
  methods :{
      onSelectChange(val){
        this.selectedItm = val;
      }
  },
  mounted(){
    if (this.select != null) this.selectedItm = this.select;
  }
}
</script>

<style>
.ui-expander-view{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>