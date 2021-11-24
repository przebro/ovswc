import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Navigator from './forms/common/nav.vue'
import UiNotification from './components/ui/notification/notification.vue'

Vue.config.productionTip = false

Vue.component('navigator',Navigator)
Vue.component("ui-notification",UiNotification)

new Vue({
  router,
  Navigator,UiNotification,
  render: h => h(App)
}).$mount('#app')
