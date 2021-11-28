<template>
    <div :class="classM">
        <slot name="activator" v-bind:on="on"></slot>
        <transition name="fade">
        <div :class="classT" v-show="isActive" :style="styles" ref="item-container">
            <div :class="classS">
                <slot></slot>
            </div>
        </div>
        </transition>
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
            activated : false,
            menuHeight : 0,
            direction : "",
        }
    },
    methods:{

        getLeftPos(){
            let width = this.getMaxWidth();
            let xpos = this.align == "right" ?  (this.positionX + this.activatorWidth) - width + "px" : this.positionX + "px"
            return   xpos
        },
        getTopPos(){
            let topPos = this.direction == "top" ? (this.positionY - this.menuHeight) : this.positionY + this.activatorHeight;
            return topPos + "px"

        },
        getMaxWidth(){
            return this.maxWidth == 0 ? this.activatorWidth + "px" : this.maxWidth + "px"
        },
        on(){
            
            this.activate(!this.isActive)
            this.activated = true
        },
        activate(val){
            this.$emit("input",val)    
            this.isActive = val;
            this.activated = val;

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
        },
        activated : function(){
            this.$nextTick( () => {
                this.menuHeight = this.$refs["item-container"].clientHeight
                let totalHeight = (this.positionY + this.activatorHeight + this.menuHeight);

                if (totalHeight > document.documentElement.clientHeight){
                    this.direction = "top"
                }else{
                    this.direction = ""
                }
                
            } ) 
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
            //this.getTheme("")
            return ["ui-menu-content","ui-menu-shadow"]
        },
        classM(){
            return [this.getTheme(""),"ui-menu-control"]
        },
        classS(){
            return [this.getTheme(""), this.isActive == true? "ui-menu-scroll":""]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.fade-enter{
    opacity: 0;
}
.fade-enter-active{
  transition: opacity .3s;
}

.ui-menu-control{
    outline: none;
}
.ui-menu-control > button{
    z-index: 199 !important;
}

.ui-menu-scroll{
    overflow: hidden;
    overflow-y: auto;
    outline: none;
}
.ui-menu-content{
    font-size: $ui-font-size;
    position: absolute;
    width:300px;
    left:0px;
    z-index: 299;
}

.ui-menu-shadow{
    border-radius: 3px 3px 3px 3px;
    box-shadow: $color-gray 0px 0px 5px;
}
</style>