<template>
  <div :class="classT"></div>
</template>

<script>
export default {
    name :"UiDock",
    computed : {
        classT(){
            return ["ui-dock-container"]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-dock-container{
    background-color: red;
    width:30px;
}
</style>