<template>
  <div class="release">
    <!--<div class="">-->
    <refush v-show="showRefush"
            style="position:fixed;width: 100%;height: 100%;left: 0;background: rgba(0,0,0,0.4);"></refush>
    <div class="search">
      <div>
        <h3>根据手机号查找</h3>
        <input type="text" placeholder="手机号" v-model="phone" style="padding:4px;"/>
        <button @click="search_phone" style="padding:4px;">查询</button>
        <button style="padding:4px;background: #e62727;color: #fff;outline: none" @click="deleteUser">删除该用户</button>
      </div>
      <div>
        <h3>根据眼镜条码查找</h3>
        <input type="text" placeholder="条码号" v-model="bar_code" style="padding:4px;"/>
        <button @click="search_bar" style="padding:4px;">查询</button>
      </div>
    </div>
    <div class="result">
      <div class="result_inner user_info">
        <h4>用户信息</h4>
        <p>
          <label>手机:</label><input type="text" readonly v-model="result.username">
        </p>
        <p>
          <label>姓名:</label><input type="text" v-model="result.real_name">
        </p>
        <p>
          <label>性别:</label><input type="text" v-model="result.sex">
        </p>
        <p>
          <label>年龄:</label><input type="text" v-model="result.age">
        </p>
        <p>矫正度数:</p>
        <p>
          <label>左眼:</label><input type="text" v-model="result.optician_left">
        </p>
        <p>
          <label>右眼:</label><input type="text" v-model="result.optician_right">
        </p>
        <p>裸眼视力:</p>
        <p>
          <label>左眼:</label><input type="text" v-model="result.naked_left">
        </p>
        <p>
          <label>右眼:</label><input type="text" v-model="result.naked_right">
        </p>
        <label>双眼:</label><input type="text" v-model="result.naked">
        <p>戴镜视力:</p>
        <p>
          <label>左眼:</label><input type="text" v-model="result.wear_left">
        </p>
        <p>
          <label>右眼:</label><input type="text" v-model="result.wear_right">
        </p>
        <p>
          <label>瞳距:</label><input type="text" v-model="result.interpupillary_distance">
        </p>
        <p>
          <label>学校:</label><input type="text" readonly v-model="result.school">
        </p>
        <p>
          <label>地址:</label><input type="text" readonly v-model="result.address">
        </p>

      </div>
      <div class="result_inner device_info">
        <h4>绑定眼镜</h4>
        <p v-show="result.noDevice">无绑定眼镜!!!</p>
        <div v-for="(device,index) in result.devices" style="border-bottom: 1px solid #ddd;padding: 10px;">
          <label>设备ID:</label><span>{{device.device_id}}</span>
          <br>
          <label>设备名称:</label><span>{{device.device_name}}</span>
          <br>
          <label>系统:</label><span>{{device.system_type}}:{{device.system_version}}</span>
          <br>
          <label>绑定时间:</label><span>{{device.regiter_time}}</span>
          <br>
          <button @click="unbind(index)">解除绑定</button>
        </div>
      </div>
      <div class="result_inner experience_info">
        <h4>体验记录</h4>
        <button v-show="!result.noRecords" @click="deleteAllRecords">删除所有体验记录</button>
        <p v-show="result.noRecords">没有体验记录</p>
        <ul>
          <li v-for="(record,index) in result.records" style="overflow: hidden;border-bottom: 1px solid #ddd;padding: 10px;">
              <!--<label>id:</label><span>{{record.id}}</span>-->
              <!--<label>user_id:</label><span>{{record.user_id}}</span><br>-->
              <label>左眼视力:</label><input style="width: 50px;" type="text" v-model="record.left_vision"><br>
              <label>右眼视力:</label><input style="width: 50px;" type="text" v-model="record.right_vision"><br>
              <label>双眼视力:</label><input style="width: 50px;" type="text" v-model="record.vision"><br>
              <label>左眼度数:</label><input style="width: 50px;" type="text" v-model="record.left_degree"><br>
              <label>右眼度数:</label><input style="width: 50px;" type="text" v-model="record.right_degree"><br>
              <label>体验时间:</label><span>{{record.experience_time}}</span><br>
              <label>体验时长:</label><span>{{record.total_time}}min</span><br>
              <label>创建时间:</label><span>{{record.create_time}}</span><br>
              <label>速度:</label><span>{{record.speed}}</span><br>
              <label>范围:</label><span>{{record.r_range}}</span><br>
              <label>increase_time:</label><span>{{record.increase_time}}</span><br>
              <label>r_day:</label><span>{{record.r_day}}</span><br>
              <button @click="updateRecord(index)">修改</button>
              <button @click="deleteRecord(index)" style="background: #e62727;color: #fff;outline: none">删除该体验记录</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!--</div>-->
</template>

<script>
  import Refush from './Refush'

  export default {
    name: "release",
    components: {
      "refush": Refush
    },
    data() {
      return {
        showRefush: false,
        phone: '',
        bar_code: '',
        result: {
          username: '',
          id:'',
          real_name: '',
          sex: '',
          age: '',
          optician_left: '',
          optician_right: '',
          wear_left: '',
          wear_right: '',
          naked_left: '',
          naked_right: '',
          naked: '',
          interpupillary_distance: '',
          school: '',
          address: '',
          devices: [],
          records:[],
          noDevice:false,
          noRecords:false,
        }
      }
    },
    methods: {
      insertData(user, devices,records) {
        this.result.id=user.id;
        this.result.username = user.username
        this.result.real_name = user.real_name
        this.result.sex = user.sex == null ? '':(user.sex==0?'男':'女')
        this.result.age = user.age
        this.result.optician_left = user.optician_left
        this.result.optician_right = user.optician_right
        this.result.wear_left = user.wear_left
        this.result.wear_right = user.wear_right
        this.result.naked_left = user.naked_left
        this.result.naked_right = user.naked_right
        this.result.naked = user.naked
        this.result.interpupillary_distance = user.interpupillary_distance
        this.result.school = user.shcool
        this.result.address = user.address
        if(devices.length==0){
          this.result.noDevice=true;
        }else{
          this.result.noDevice=false;
        }
        if(records.length==0){
          this.result.noRecords=true;
        }else{
          this.result.noRecords=false;
        }
        for (var i = 0; i < devices.length; i++) {
          devices[i].regiter_time = new Date(parseInt(devices[i].regiter_time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
          this.result.devices.push(devices[i]);
        }
        for(var i=0;i<records.length;i++){
          records[i].create_time=new Date(parseInt(records[i].create_time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
          this.result.records.push(records[i]);
        }
      },
      search_phone() {
        this.result.devices=[];
        if (this.phone == null || this.phone.trim() == '' || this.phone == undefined) {
          alert("请输入手机号")
          return;
        }
        this.showRefush=true;
        let params = new URLSearchParams();
        params.append("username", this.phone);
        this.$axios({
          url: 'searchUsername.do',
          method: 'post',
          data: params
        }).then(res => {
          // console.log(JSON.stringify(res.data))
          this.showRefush=false;
          if(res.data.status==0){
            alert(res.data.message);
          }else{
            var user = res.data.data.user;
            var devices = res.data.data.devices;
            if(user==null){
              alert("该用户不存在")
              return
            }else if (user.password == null) {
              alert("该用户注册未完成")
              return;
            }
            this.$axios({
              url:'searchExperience.do',
              method:'post',
              data:params
            }).then(res=>{
              console.log(res.data.data.experiences);
              if(res.data.status==1){
                var records=res.data.data.experiences;
                this.insertData(user, devices,records);
              }
            })
          }
        })
      },
      search_bar() {
        this.result.records=[];
        if (this.bar_code == null || this.bar_code.trim() == '' || this.bar_code == undefined) {
          alert("请输入条码")
          return;
        }
        this.showRefush=true;
        // console.log(this.bar_code)
        let params = new URLSearchParams();
        params.append("barCode", this.bar_code);
        this.$axios({
          url: 'searchBar.do',
          method: 'post',
          data: params
        }).then(res => {
          this.showRefush=false;
          // console.log(res.data.data)
          if(res.data.status==0){
            alert(res.data.message)
            return;
          }
          var user = res.data.data.user;
          var devices = res.data.data.devices;
          this.insertData(user, devices,[]);
        })
      },
      unbind(index) {
        console.log(this.result.devices[index].device_id);
        this.showRefush = true;
        let params = new URLSearchParams();
        params.append("barCode", this.result.devices[index].device_id);
        params.append("username", this.result.username);
        this.$axios({
          url: 'ubind.do',
          method: 'post',
          data: params
        }).then(res => {
          // console.log(res.data)
          if (res.data.status == 1) {
            this.showRefush = false;
            alert("解绑成功");
            var user = res.data.data.user;
            var devices = res.data.data.devices;
            this.insertData(user, devices);
          }
        })
      },
      deleteUser() {
        if(confirm("确认删除该用户?")){
          this.showRefush = true;
          let params=new URLSearchParams();
          params.append("username", this.phone);
          this.$axios({
            url:'deleteuser.do',
            method:'post',
            data:params
          }).then(res=>{
            // console.log(res.data)
            if(res.data.status==1){
              alert("已删除用户")
              location.reload()
            }
          })

        }
      },
      updateRecord(index){
        this.showRefush=true;
        let params=new URLSearchParams();
        params.append("id",this.result.records[index].id);
        params.append("leftVision",this.result.records[index].left_vision);
        params.append("rightVision",this.result.records[index].right_vision);
        params.append("vision",this.result.records[index].vision);
        params.append("leftDegree",this.result.records[index].left_degree);
        params.append("rightDegree",this.result.records[index].right_degree);
        this.$axios({
          url:'updateRecord.do',
          method:'post',
          data:params
        }).then(res=>{
          this.showRefush=false;
          if(res.data.status==0 && res.data.message=="无更新内容"){
            alert(res.data.message);
            return;
          }
          alert("更新成功");
        })
      },
      deleteRecord(index){
        this.showRefush=true;
        let params=new URLSearchParams();
        params.append("id",this.result.records[index].id);
        this.$axios({
          url:'deleteRecord.do',
          method:'post',
          data:params
        }).then(res=>{
          this.showRefush=false;
          console.log(res.data.status);
          if(res.data.status==1){
            alert("删除成功");
            location.reload();
          }
        })
      },
      deleteAllRecords(){
        console.log(this.result.id);
        this.showRefush=true;
        let params=new URLSearchParams();
        params.append("userId",this.result.id);
        this.$axios({
          url:'deleteAllRecord.do',
          method:'post',
          data:params
        }).then(res=>{
          this.showRefush=false;
          console.log(res.data.status);
          if(res.data.status==1){
            alert("删除成功");
            location.reload();
          }
        })
      }
    }
  }
</script>

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .release {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
  }

  .result {
    /*height: 200px;*/
    max-width: 100%;
    min-width: 100%;
    color: #797979;
    border: 1px solid #ddd;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    margin-top: 10px;
  }

  .result div.result_inner {
    flex: 1;
    padding: 10px;
  }

  .result_inner label {
    /*display: block;*/
  }

  .user_info p {
    margin: 8px 0;
  }

  .search {
    display: flex;
    flex-flow: row nowrap;
  }

  .search > div {
    flex: 1;
  }
</style>
