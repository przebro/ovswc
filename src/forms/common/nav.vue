<template>
  <ui-navigator>
      <ui-nav-item icon="cog-sync" to="/atq" />
      <ui-nav-item icon="format-list-text" to="/res" />
      <!-- <ui-nav-item icon="lead-pencil" to="/atq" /> -->
      <ui-nav-item icon="account-supervisor" to="/adm" />
      <ui-nav-item icon="logout" to="/" />
  </ui-navigator>
</template>

<script>

import UiNavigator from '../../components/ui/navigator/navigator.vue'
import UiNavItem   from '../../components/ui/navigator/navitem.vue'

export default {
    name :"Navigator",
    components:{UiNavigator,UiNavItem}
}
</script>

<style>

</style>