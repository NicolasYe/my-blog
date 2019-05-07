// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import MyBlog from './components/home/MyBlog'
import AddBlog from './components/home/AddBlog'
import Release from './components/home/Release'
import "babel-polyfill"

import Axios from 'axios'


//挂载在vue原型上
Axios.defaults.baseURL = '/apis';

Vue.prototype.$axios=Axios;

Vue.config.productionTip = false
Vue.use(VueRouter)
const router=new VueRouter({
  routes:[
    {path:'/login',name:'login',component:Login},
    {path:'/home',name:'home',redirect:'/home/release',component:Home,children:[
        {path:'/home/my-blog',name:'myblog',component:MyBlog},
        {path:'/home/add-blog',name:'addblog',component:AddBlog},
        {path:'/home/release',name:'release',component:Release}
      ]},
  ],
  mode:'history'
})
Vue.use(VueResource)
/**
 * 自定义指令
 *  directive:自定义指令方法
 *  ranbow:自定义的指令的名字
 *  el:使用ranbow这个自定义指令的元素（标签）
 *  binding:自定义标签绑定的参数
 */
Vue.directive('rainbow',{
  bind(el,binding,vnode){
    var color='#';
    for(var i=0;i<3;i++){
      color+=Math.ceil(Math.random()*255).toString(16)
    }
    el.style.color=color;
  }
})
Vue.directive('theme',{
  bind(el,binding,vnode){
    if(binding.value=='wide'){
      el.style.width='1200px'
    }else if(binding.value='normal'){
      el.style.width='800px'
    }
  }
})
/**
 * 自定义过滤器
 */
Vue.filter('short',function(value){
  if(value.length>100){
    return value.slice(0,100)+'...'
  }
  return value
})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
