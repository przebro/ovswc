<template>
  <ui-dialog :value="true" :height="320" :width="480" title="Overseer Login" >
    <template v-slot:default >
        <div class="flex-row flex" ><ui-label text="Server:" /><ui-input :value="server"  :width="230" /></div>
        <ui-expander header="More" :flat="true" >
          <div class="flex-row" style="margin-left:8px"><ui-input label="Username" :width="230" v-model="username" /></div>
          <div class="flex-row" style="margin-left:8px" ><ui-input label="Password" :width="230" v-model="password" :password="true" /></div>    
        </ui-expander >
    </template>
    <template v-slot:buttons >
        <ui-button flat color="success" @click="onLogin" >Login</ui-button>
    </template>
  </ui-dialog>
</template>

<script>
import UiDialog from '../../components/ui/dialog/dialog.vue'
import UiInput from '../../components/ui/input/input.vue'
import UiButton from '../../components/ui/button/button.vue'
import UiExpander from '../../components/ui/expander/expander.vue'
import UiLabel from '../../components/ui/label/label.vue'
import {registerAddress,requestAuthenticationToken} from '../../io/request.js'
import router from '../../router'

export default {
    name : "LoginForm",
    components : {UiDialog,UiInput,UiButton,UiExpander,UiLabel},
    data() {
      return {
        server : "127.0.0.1:7054",
        username :"",
        password : ""
      }
    },
    methods:{
      onLogin(){
        registerAddress(this.server)
        requestAuthenticationToken({username : this.username,password : this.password},this.onResponseReady)
      },
      onResponseReady(data){
        if (data.success){
          router.push("/atq")
        }
      }
    }
}
</script>

<style lang="scss">
@import "../../sass/variables.scss";

</style>