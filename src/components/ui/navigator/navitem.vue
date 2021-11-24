<template>
  <div class="ui-nav-item" @click="OnClick">
      <span :class="classI" />
  </div>
</template>

<script>
export default {
    name : "UiNavItem",
    props :{
        icon : String,
        text  : String,
        to : String
    },
    computed:{
        classI(){
            if (this.icon == ""){
                return ""
            }
            return "icon mdi mdi-" + this.icon
        }
    },
    methods : {
        OnClick(){
            console.log(this.to)
            if (this.to !== undefined) {
                this.$router.push(this.to)
            }

            this.$emit("click")
            
        }
    }

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-nav-item{
    font-size: 24px;
    color: whitesmoke;
    padding: 5px 0px;
    border-radius: 3px;
    cursor: pointer;
        &:hover {
            color : adjust-color($color: whitesmoke, $lightness: 10%);
            background-color: #ffffff33;
          }

}
.ui-nav-item,span{
    margin: 2px;
}

</style>