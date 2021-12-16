export default {
    name : "resize",
    data () {
        return {
            positionX : 0,
            positionY : 0,
            activatorWidth : 0,
            activatorHeight : 0
        }
    },
    methods :{
        onWindowResize(){
            
            if (this.isAttached){
                this.positionX = this.$parent.$el.offsetLeft
                this.positionY = this.$parent.$el.offsetTop + this.$parent.$el.offsetHeight
                this.activatorWidth = this.$parent.$el.offsetWidth
            }
            if (this.$scopedSlots["activator"])
            {
                this.positionX =  this.$children[0].$el.offsetLeft;
                this.positionY =  this.$children[0].$el.offsetTop;
                this.activatorWidth = 200;
                this.activatorHeight = this.$children[0].$el.offsetHeight;
            }
        }

    },
    mounted(){
        window.addEventListener('resize',this.onWindowResize)
        this.onWindowResize()
    },
    beforeUnmount(){
        window.removeEventListener('resize',this.onWindowResize)
    }
}