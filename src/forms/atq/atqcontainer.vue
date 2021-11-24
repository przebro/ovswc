<template>
  <atq-list :items="dataItems" @selected="onItemSelected"  :key="datakey" >
  </atq-list>
</template>

<script>
import AtqList from './atqlist.vue'
import {provider,channels} from '../../io/request.js'
import {SendError} from '../../components/ui/mixins/mbus'

export default {

    name : 'AtqContainer',
    components :{AtqList},
    props:{
        refresh :{
            type :  Boolean
        }
    },
    data(){
        return {
            dataItems :null,
            interval : null,
            datakey : 0
        }
    },
    watch:{
        refresh : function(nval){
            if (nval == true){
                this.enableAutoRefresh()
            }else{
                this.disableAutoRefresh()
            }
        }
    },
    methods:{
        onItemSelected(itemId){
            this.$emit('selected',itemId)
        },
        onTaskListComplete(data){
            let items = new Array()
            for(const e of data){
                items.push(e.result) 
            }
            this.dataItems = items
            this.datakey = Math.ceil(Math.random() * 100000)
        },
        onRefreshResults(){
            provider.Send(channels.TASK_LIST,{},this.onTaskListComplete,this.onError)
        },
        onError(err){
            SendError(err)
        },
        enableAutoRefresh(){
            this.interval = setInterval(this.onRefreshResults,2000)
        },
        disableAutoRefresh(){
            clearInterval(this.interval)
        }

    },
    mounted(){
        
        provider.Send(channels.TASK_LIST,{},this.onTaskListComplete,this.onError)
        //:TODO autorefresh
    }
}
</script>

<style>

</style>