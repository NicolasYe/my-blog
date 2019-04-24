<template>
  <div class="home">
    <app-header></app-header>

  </div>
</template>

<script>
  import AppHeader from './home/APPHeader'
    export default {
        name: "home",
      components:{
        'app-header': AppHeader
      }
    }
</script>

<style scoped>

</style>
