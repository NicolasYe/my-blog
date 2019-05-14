<template>
  <div id="app">
    <!--<img src="./assets/logo.png" alt="">-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    mounted() {
      // localStorage.clear();
      if(!localStorage.getItem("user")){
        this.$router.push({name:'login'})
      }else{
        this.$router.push({name:'home'})
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>
