<template>
  <div class="batchQuery">
    <!--<h3>批量查询</h3>-->
    <div class="search">
      <div>
        <h3>输入要查找的城市</h3>
        <input type="text" placeholder="城市" v-model="city" style="padding:4px;"/>
        <button @click="search_city" style="padding:4px;">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        city:''
      }
    },
    methods:{
      // search2(){
      //   this.$axios({
      //     url:''
      //   }).then(res=>{
      //
      //   })
      // },
      search_city(){
        console.log(this.city)
        let params = new URLSearchParams();
        params.append("city", this.city);
        this.$axios({
          url:'getAllUserCorrespondDeviceBycity.do',
          method:'post',
          data:params
        }).then(res=>{
          // console.log(res.data.data)
          let params2 = new URLSearchParams();
          params2.append("username", res.data.data);
          setInterval(function(){

            this.$axios({
              url:'getAllUserCorrespondDeviceBycity.do',
              method:'post',
              data:params
            }).then(res=>{

            })
          },10)
        })
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .batchQuery {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
  }

  .search {
    display: flex;
    flex-flow: row nowrap;
  }

  .search > div {
    flex: 1;
  }
</style>
