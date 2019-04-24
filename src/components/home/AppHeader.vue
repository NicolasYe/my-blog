<template>
  <div>
    <header class="header">
      <div class="title myblog">
        <router-link :to="{name:'myblog'}"><span>博客总览</span></router-link>
      </div>
      <div class="title addblog">
        <router-link :to="{name:'addblog'}"><span>添加博客</span></router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: "app-header"
  }
</script>

<style scoped>
  .header {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #ddd;
  }

  .title {
    display: inline-block;
    margin: 0 10px;

  }

  .title span {
    color: #288ee6;
  }
</style>
