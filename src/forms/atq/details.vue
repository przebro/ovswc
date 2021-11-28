<template>
  <ui-card :width="360">
    <ui-expander-view :select="1">
          <ui-expander header="Task summary" flat :groupKey="1"  v-if="item != null">
                <div class="flex flex-row"><ui-label condensed text="Group:" :width="90" /><div class="ui-static">{{item.taskData.groupName}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="Task name:" :width="90" /><div class="ui-static">{{item.taskData.taskName}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="Task ID:" :width="90" /><div class="ui-static">{{item.taskData.taskId}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="Order date:" :width="90" /><div class="ui-static">{{item.taskData.orderDate}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="No Runs:" :width="90" /><div class="ui-static">{{item.taskData.runNumber}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="Start:" :width="90" /><div class="ui-static">{{item.startTime}}</div></div>
                <div class="flex flex-row"><ui-label condensed text="End:" :width="90" /><div class="ui-static">{{item.endTime}}</div></div>
                <div class="flex flex-row" v-if="item.cycleData.isCyclic"><ui-label condensed text="Cycle:" :width="90" /><div class="ui-static">From {{item.cycleData.runFrom}}, every {{item.cycleData.interval}} minutes</div></div>
                <div class="flex flex-row" v-if="item.cycleData.isCyclic"><ui-label condensed text="Max runs:" :width="90" /><div class="ui-static">{{item.cycleData.maxRun}}</div></div>
          </ui-expander>
          <ui-expander header="Preconditions" flat color="warn" :groupKey="2" v-if="item != null">
                  <div class="flex flex-row">
                    <ui-label condensed text="From:" :width="100" /><div class="ui-static">{{item.conds.runFrom}}</div>
                </div>
                <div class="flex flex-row">
                    <ui-label condensed text="To:" :width="100" /><div class="ui-static">{{item.conds.runTo}}</div>
                </div>
                <div class="flex flex-row">
                    <ui-label condensed text="Resources" :width="100" />
                </div>
                <div class="flex flex-row">
                    <table>
                    <tr v-for="(itm,i) in item.conds.resources" :key="i">
                         <td>{{itm.name}}</td><td>{{itm.odate}}</td>
                    </tr>
                    </table>
                </div>
          </ui-expander>
    </ui-expander-view>
  </ui-card>
</template>

<script>
import UiCard from '../../components/ui/card/card.vue'
import UiLabel from '../../components/ui/label/label.vue'
import UiExpanderView from '../../components/ui/expander/expanderview.vue'
import UiExpander from '../../components/ui/expander/expander.vue'

export default {
    name : "AtqDetails",
    props : {
        item : Object
    },
    components : {UiCard,UiLabel,UiExpanderView,UiExpander},
}
</script>

<style>
.ui-container{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ui-static{
    display: flex;
    padding: 0.5em;
}
</style>