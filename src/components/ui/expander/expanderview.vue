<template>
  <div class="ui-expander-view">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name :"UiExpanderView"

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