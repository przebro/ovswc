<template>
    <div class="ui-menu-control">
        <slot name="activator" v-bind:on="on"></slot>
        <div :class="classT" v-show="isActive" :style="styles">
            <div class="ui-menu-scroll">
                <slot></slot>
            </div>
        </div>
  </div>
</template>

<script>
import toggle  from '../mixins/toggle.js'
import resize  from '../mixins/resize.js'
import themeable from '../mixins/themeable.js'

export default {
    name :"UiMenu",
    mixins : [toggle,resize,themeable],
    props:{
        value : Boolean,
        items  : Object,
        maxWidth : {
            type : Number,
            default : () => 0
        },
        align : String
    },
    provide(){
        return{
            isInMenu : true,
            onMenuItemClick : () =>{ this.on() }
        }
    },
    inject:{
        isAttached : {
            default : false
        }
    },
    data (){
        return {

        }
    },
    methods:{

        getLeftPos(){
            let width = this.getMaxWidth();
            let xpos = this.align == "right" ?  (this.positionX + this.activatorWidth) - width + "px" : this.positionX + "px"
            return   xpos
        },
        getTopPos(){
            return  this.positionY + this.activatorHeight + "px"

        },
        getMaxWidth(){
            return this.maxWidth == 0 ? this.activatorWidth + "px" : this.maxWidth + "px"
        },
        on(){
            this.activate(!this.isActive)
        },
        activate(val){
            this.$emit("input",val)    
            this.isActive = val;

            if (val == true){
                this.onWindowResize()
                 document.body.addEventListener('click', this.outsideClickWatcher,true)
            }else{
                document.body.removeEventListener('click',  this.outsideClickWatcher,true)
            }
        },
        outsideClickWatcher(event){

            if (!(this.$el == event.target || this.$el.contains(event.target))) {
               this.activate(false)
            }
        }
    },
    watch :{
        value : function(nv){
            this.onWindowResize()
            this.activate(nv)
        }
    },
    computed:{
        styles(){
            return {
                top : this.getTopPos(),
                left : this.getLeftPos(),
                width : this.getMaxWidth()
            }
        },
        classT(){
            return [this.getTheme(""),"ui-menu-content"]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.ui-menu-control{
    outline: none;
}

.ui-menu-scroll{
    overflow: hidden;
    overflow-y: auto;
    outline: none;
    
}
.ui-menu-content{
    box-shadow: black 3px 3px 3px;
    font-size: $ui-font-size;
    position: absolute;
    width:300px;
    left:0px;
    z-index: 299;
    
}
</style>