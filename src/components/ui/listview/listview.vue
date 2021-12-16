<template>
  <div class="ui-list-view" >
      <div :class="classT" ref="content-view" @wheel="onScroll($event)">
          <div :class="classP" >
            <slot v-for="(n) in listViewItems" v-bind:item="n"></slot>
          </div>
            
      </div>
      <div class="ui-listview-scrollbar" ref="scroll-bar">
          <div :class="classH" :style="styleH" ref="scroll-bar-handler"  @mousedown="onStartDrag"  @mousemove="onDragHandler($event)" @mouseleave="onStopDrag"  />
      </div>
  </div>
</template>

<script>

import themeable from '../mixins/themeable'

export default {
    name: "UiListView",
    mixins :[themeable],
    props:{
        items : [],
        itemHeight :{
            type : Number,
            default : 20
        }
    },
    data(){
        return {
            listViewItems : [],
            rows : 0,
            currentRow : 0,
            currentPos : 0,
            startPos : 0,
            srcollSz : 0,
            cursorPos :{x: 0,y:0},
            isHandlerDragged : false,
            sbAreaHeight : 0,
        }
    },
    watch:{
        items :function(){
            this.updateListVieItems()
            
        }
    },
    methods:{
        computeItemHeight(){
            let cnt = this.$refs['content-view'].childElementCount
            if (cnt == 0){
                return 0
                }
            },
            onStartDrag(e){
                e.preventDefault()
                this.startPos = this.currentPos;
                this.cursorPos = {x : e.pageX,y : e.pageY}
                
            },
            onStopDrag(){
                this.isHandlerDragged = false
            },
            onDragHandler(e){
                e.preventDefault()
                if (e.buttons == 1){
                    this.isHandlerDragged = true
                }
                if (this.isHandlerDragged){

                    let pos = {x : this.cursorPos.x, y:  e.pageY - this.cursorPos.y }
                    
                    if ( (this.startPos + pos.y) < 0 || (this.startPos + pos.y) > this.sbAreaHeight){ return;}

                    this.currentPos = this.startPos + pos.y
                    this.currentRow = Math.round( this.items.length *  (this.currentPos / this.sbAreaHeight)) ;
                    this.updateListVieItems()
                }
            },
            onScroll(e){
                if (this.countElements == 0){return}
                if ( (this.currentPos + e.deltaY) < 0 || (this.currentPos + e.deltaY) > this.sbAreaHeight){ return;}

                this.currentPos +=  e.deltaY
                this.currentRow = Math.round( this.items.length *  (this.currentPos / this.sbAreaHeight)) ;
                this.updateListVieItems()
            },
            calculateScrollbar(){
                
                let h1 = this.$refs['scroll-bar'].getBoundingClientRect().height
                let h2 = this.$refs['scroll-bar-handler'].getBoundingClientRect().height
                this.sbAreaHeight = h1 - h2

                this.rows = parseInt(this.$refs['content-view'].clientHeight / this.itemHeight)
                this.srcollSz = parseInt(this.$refs['content-view'].clientHeight/ this.itemHeight)

            },
            updateListVieItems(){
                if (this.items == null) return ;
                let  n = parseInt(this.currentRow) + parseInt(this.rows);
                
                this.listViewItems = this.items.filter( (e,idx) =>{
                    return idx>=this.currentRow && idx <= (this.currentRow + n)
                } )
            }

    },
    computed:{
        classT(){
            return [this.getTheme("container"),"ui-listview-content"]
        },
        classH(){
            return [this.getTheme(""),"ui-scrollbar-handle"]
        },
        classP(){
            return [this.getTheme(""),"ui-list-content-presenter"]
        },
        styleH(){
            return "height:"+this.srcollSz+"px;top:"+parseInt(this.currentPos)+"px;"
        },
        countElements(){
            if (this.listViewItems == null || this.listViewItems.length == 0){
                return 0
            }

            return this.listViewItems.length
        }
    },
    mounted(){
        
        this.calculateScrollbar()

    },
    created(){
        window.addEventListener('resize',this.calculateScrollbar)
    },
    destroyed(){
        window.removeEventListener('resize',this.calculateScrollbar)
    }
    

}
</script>

<style lang="scss">
@import "../../../sass/variables.scss";
.ui-list-view{
    flex-grow: 1;
    display: flex;
}
.ui-listview-content{
    flex-grow: 1;
    overflow: hidden;
    padding:5px;
    display: flex;
    flex-direction: column;
}
.ui-listview-scrollbar{
    background-color: lightgray;
    width: 21px;
}
.ui-scrollbar-handle{
    padding:0 5px;
    margin: 0 2px;
    position:relative;
    border-radius: 2px;
}
.ui-list-content-presenter{
    flex-shrink: 1;
    flex-grow: 1;
    flex-basis: 0;
    user-select: none;
    overflow: hidden;
}
</style>