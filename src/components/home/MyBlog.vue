<template>
  <div v-theme:column="'wide'" class="my-blog">
    <h1 class="title">博客总览</h1>
    <div class="searchBox">
      <input type="text" placeholder="搜索" v-model="search">
    </div>
    <article class="content">
      <ul>
        <li v-for="blog in filterblog">
          <h3 v-rainbow>{{blog.title}}</h3>
          <p>{{blog.body | short}}</p>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
  export default {
    name: "my-blog",
    data() {
      return {
        blogs: [],
        search: ''
      }
    },
    computed: {
      filterblog() {
        return this.blogs.filter((blog) => {
          return blog.title.match(this.search)
        })
      }
    },
    created() {
      this.$http.get('http://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          this.blogs = response.body.slice(0, 10);
        })
    }
  }
</script>

<style scoped>
  .my-blog * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .my-blog {
    width: 1200px;
    margin: 0 auto;
  }

  .my-blog div.searchBox {
    margin: 10px;
  }

  div.searchBox input {
    width: 100%;
    outline: none;
    padding: 10px;
  }

  .my-blog h1.title {
    margin: 20px 0;
  }

  .my-blog article.content {
    border: 1px solid #ccc;
    width: 100%;
    padding: 20px;
    background: #2c3e50;
  }

  article.content li {
    cursor: pointer;
    text-align: left;
    background: #ddd;
    padding: 10px;
    margin: 10px;
  }

  article.content li h3 {
    margin: 10px;
    font-size: 20px;
  }

  article.content li p {
    margin: 10px;
    font-size: 16px;
  }
</style>
