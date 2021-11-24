<template>
  <div id="app">
    <div class="main">
      <navigator />
      <router-view/>
    </div>
    <ui-notification />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
</style>
