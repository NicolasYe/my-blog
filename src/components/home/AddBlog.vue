<template>
  <div class="add-blog">
    <div v-show="preview">
      <h1 class="title">添加博客</h1>
      <div class="container">
        <label>博客标题</label>
        <input class="content" type="text" v-model="blog.title" placeholder="标题...">
      </div>
      <div class="container">
        <label>博客内容</label>
        <textarea class="content"  v-model="blog.content" placeholder="内容..."></textarea>
      </div>
      <div class="container tag">
        <input type="checkbox" value="vue.js" v-model="blog.tags"><label>vue.js</label>
        <input type="checkbox" value="apicloud" v-model="blog.tags"><label>apicloud</label>
        <input type="checkbox" value="java" v-model="blog.tags"><label>java</label>
        <input type="checkbox" value="mysql" v-model="blog.tags"><label>mysql</label>
      </div>
      <div class="container author">
        <label>作者</label>
        <input type="text" placeholder="作者..." v-model="blog.author">
      </div>
      <button class="btn submit" @click="submit">确定</button>
    </div>
    <div class="container preview" v-show="!preview">
      <h1 class="title">博客预览</h1>
      <label>博客标题</label><p>{{blog.title}}</p>
      <label>博客内容</label>
      <!--<p class="content">{{blog.content | short}}</p>-->
      <textarea readonly>{{blog.content | short}}</textarea>
      <label>标签</label>
      <p class="tags">
        <span v-for="tag in blog.tags">{{tag}}</span>
      </p>
      <label>作者</label>
      <p>{{blog.author}}</p>
      <button class="btn back" @click="back">返回</button>
      <button class="btn post" @click="post">提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add-blog",
    data() {
      return {
        preview: true,
        blog: {
          title: '',
          content: '',
          author: '',
          tags: []
        }
      }
    },
    methods: {
      submit() {
        this.preview = !this.preview;
      },
      back() {
        this.preview = !this.preview;
      },
      post(){
        alert('fasongchengg')
      }
    }
  }
</script>

<style scoped>
  .add-blog * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .add-blog h1.title {
    margin: 20px 0;
  }

  .add-blog {
    width: 1200px;
    margin: 0 auto;
  }

  .container {
    margin: 10px;
  }

  label {
    display: block;
    font-size: 18px;
    margin: 10px;
  }

  input[type=text], textarea {
    width: 100%;
    padding: 20px;
    font-size: 18px;
  }

  textarea {
    height: 200px;
    max-width: 100%;
    min-width: 100%;
    color: #797979;
  }

  .tag label {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
  .tag input{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left:10px;
  }

  button.btn {
    font-size: 18px;
    padding: 10px 20px;
  }
  button.back{

  }
  .preview p{
    color: #797979;
    margin: 10px 0;
  }
.preview .tags span{
  margin: 0 5px;
}
</style>
