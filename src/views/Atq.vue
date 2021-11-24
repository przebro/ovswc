<template>
<ui-card flex>
    <atq-actions @refresh="onSetAutoRefresh" />
    <div style="flex-grow:1;display:flex" >
    <atq-container @selected="onItemSelected" :refresh="autoRefresh" />
    <atq-details :itemId="itemID" />
    </div>

</ui-card>
</template>

<script>


import UiCard from '../components/ui/card/card.vue'
import AtqActions from '../forms/atq/actions.vue'
import AtqContainer from '../forms/atq/atqcontainer.vue'
import AtqDetails from '../forms/atq/details.vue'

export default {
    name :'Atq',
    components :{UiCard,AtqActions, AtqContainer,AtqDetails},
    data(){
      return {
        itemID : "",
        autoRefresh : false,
      }
    },
    methods :{
      onItemSelected(itemId){
        this.itemID = itemId
      },
      onSetAutoRefresh(val){
        this.autoRefresh = val
      }
    }
}
</script>

<style lang="scss">
.main{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
</style>
