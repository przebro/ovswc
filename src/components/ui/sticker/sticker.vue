<template>
  <div :class="classS">
      <span class="ui-sticker-text"><slot></slot></span>
      <span class="mdi icon mdi-pencil"></span>
  </div>
</template>

<script>
import themeable from '../mixins/themeable.js'
export default {
    name : "UiSticker",
    mixins : [themeable],
    props:{
        color :{ type : String,default : ""},
        icon : {type : String,default : ""}
    },
    computed:{

        classS(){
            return ["ui-sticker",this.getBackgroundByName(  this.color === ""?"primary" : this.color ),this.getTextColorByName("light")]
        }
    }


}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-sticker{
    font-size: 10px;
    border-radius: 6px;
    padding: 0.2rem 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
}
.ui-sticker-text{
    margin: 0 auto;
}
.icon{
    margin:  0;
    font-weight: bold;
}
</style>