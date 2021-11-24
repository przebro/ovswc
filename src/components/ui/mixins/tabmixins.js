import Vue from 'vue';

const tEventHub = new Vue()

export default{
    name : "TabMixin",
    data(){
        return{
            hub : tEventHub
        }
    }
}