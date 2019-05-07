<template>
  <div class="login">
    <div class="container">
      <ul>
        <li>
          <p style="text-align: right;padding-right: 100px;">用户名:</p>
          <p>
            <input name="username" type="text" placeholder="用户名">
            <span v-show="err.usernameNull">用户名不能为空</span>
            <span v-show="err.usernameErr">用户名不存在</span>
          </p>
        </li>
        <li>
          <p style="text-align: right;padding-right: 100px;">密码:</p>
          <p>
            <input name="password" type="password" placeholder="密码">
            <span v-show="err.pwdNull">密码不能为空</span>
            <span v-show="err.pwdErr">密码错误</span>
          </p>

        </li>
        <li>
          <button class="submit" @click="submit">登录</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
    name: "login",
    data(){
      return{
        err:{
          usernameNull:false,
          usernameErr:false,
          pwdNull:false,
          pwdErr:false
        }
      }
    },
    methods:{
      submit(){
        const username=document.getElementsByName('username')[0].value;
        const password=md5(document.getElementsByName('password')[0].value);
        if(this.checkLogin(username,password)){
          // this.$router.push({name:'home'})
          let params = new URLSearchParams();
          params.append('username',username);
          params.append('password',password)
          this.$axios({
            url:'/login.do',
            method:'post',
            data:params
          }).then(res=>{
            if(res.data.status==0){
              alert(res.data.message);
            }else{
              this.$router.push({name:'home'});
              localStorage.setItem("user",JSON.stringify(res.data.data));
            }
          })
        }
      },
      checkLogin(username,password){
        if(username=='' || username==undefined || username==null){
          this.err.usernameNull=true
          return false
        }else if(password=='' || password==undefined || password==null){
          this.err.pwdNull=true
          return false
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .login {
    width: 100%;
    height: 100%;
    background: url("./../assets/timg.jpg") no-repeat center center;
    background-size: cover;
  }

  .container {
    width: 600px;
    height: 300px;
    border: 1px solid #ddd;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -300px;
    background: #fff;
  }
  .container li{
    padding: 20px 100px;
    height: 100px;
    display: table;
    width: 100%;
  }
  .container li p{
    width:50%;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }
  .container li p span{
    color: red;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
  .container li p input{
    width: 100%;
    height: 30px;
  }
  .submit{
    padding: 10px 20px;
  }
</style>
