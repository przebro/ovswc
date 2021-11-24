<template>
  <login-form />  
</template>

<script>

import LoginForm from '../forms/login/LoginForm.vue'


export default {
  name: 'Home',
  components: {
    LoginForm
  },
  props:{
    
  },
  data(){
    return {
      isVisble : true
    }
  },
  mounted(){
    this.isVisble = true
  }
}
</script>
