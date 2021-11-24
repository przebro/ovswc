<template>
  <div :class="classT" :style="styleT">
      <input :value="selectedValue" :id="id" :disabled="disabled" readonly type="text" @click="isVisible = !isVisible" >
      <div :class="classB" @click="isVisible = !isVisible">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" class="ui-dropdown-icon" >
                  <path d="M7,10 L12,15 L17,10"></path>
            </svg>  
          
      </div>
      <ui-menu v-model="isVisible">
          <div :class="classI" v-for="(item,idx) in items" @click="onItemSelected(idx,item)" :key="idx" >{{item}}</div>
      </ui-menu>
  </div>
</template>

<script>
import idgen from '../mixins/idgen.js'
import themeable from '../mixins/themeable'
import UiMenu from '../menu/menu.vue'

export default {
    name : "UiDropDownList",
    mixins:[idgen,themeable],
    components : {UiMenu},
    props : {
        disabled :{
            type : Boolean,
            default : false
        },
        items : {
            type : Array,
            default  : () => []
        }

    },
    provide(){
        return{
            isAttached: true
        }
    },
    data(){
        return{
            id : "",
            isVisible : false,
            selectedIndex : 0,
            selectedValue : ""
        }
    },
    methods:{
        onItemSelected(idx,val){
            this.selectedIndex = idx
            this.selectedValue = val
            this.isVisible = false
            this.$emit('itemSelected',this.selectedIndex,this.selectedValue)
            this.$emit('input',this.selectedValue)
        }
    },
    computed:{
        styleT(){
            let style = this.width  > 0 ? "width:"+this.width +"px;":"";
            return style
        },
        classT(){
            return ['ui-dropdown-control', this.isVisible==true?' ui-dropdown-control-visible ':'']
        },
        classI(){
            return [this.getTheme("item"),'ui-dropdown-item']
        },
        classB(){
            return [this.getTheme(""),'ui-dropdown-button',this.disabled == true?'ui-dropdown-button-disabled':'']
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

input[type=text]{
    outline-style: none;
    font-size: $ui-font-size;
    border:none transparent 1px;
    padding: .5em;
    width: 100%;
    height:28px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.ui-dropdown-control{
    display: flex;
    height: 28px;
    margin: 2px;
    
}

.ui-dropdown-item{
    font-size:14px;
    margin: 2px;
    padding: 4px 2px;
    font-weight:  400 !important;
    cursor:pointer
}

.ui-dropdown-button{
    width: 32px;
    border-left: solid 1px $ui-font-color;
    height: auto;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
.ui-dropdown-button-disabled{
    pointer-events: none;
}
.ui-dropdown-icon{
    fill: none;
    stroke: #777;
    transition: transform 0.4s;
}
.ui-dropdown-control-visible .ui-dropdown-icon{
    transform: rotate(0.5turn);
}

</style>