<!--登录界面-->
<template>
  <div class="all">
  <el-card class="box-card" v-if="type === 1" >
    <div slot="header" class="clearfix">
      <span>登录界面</span>
    </div>
    <div  class="text item">
      <el-input prefix-icon="el-icon-user-solid" v-model="username" name="username" placeholder="请输入用户名" class="in"></el-input>
      <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="password" name="password" show-password class="in"></el-input>
      <el-button type="primary" class="bt" @click="login" plain>登录</el-button>
      <el-button type="primary" class="bt" @click="type=2" plain>注册</el-button>
    </div>
  </el-card>
  <el-card class="box-card" v-if="type === 2">
    <div slot="header" class="clearfix">
      <span>欢迎注册我馆账号</span>
    </div>
    <div  class="text item">
      <el-input prefix-icon="el-icon-user-solid" v-model="user.username2" name="username" placeholder="请输入用户名" class="in"></el-input>
      <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="user.password2" name="password" show-password class="in"></el-input>
      <el-button type="primary" class="bt" plain @click="regist">注册</el-button>
      <el-button type="primary" class="bt" @click="type=1" plain>返回</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      type: 1,
      username: '',
      password: '',
      user: {
        username2: '',
        password2: ''
      }
    }
  },
  methods: {
    login () {
      postRequest('api/public/login', {
        username: this.username,
        password: this.password
      }).then((result) => {
        // console.log(result.data)
        if (result.data.code === 200) {
          this.$message({
            message: `${result.data.msg}`,
            type: 'success'
          })
          if (result.data.data.role === '管理员') {
            window.localStorage.setItem('user', JSON.stringify(result.data.data))
            this.$router.push('/my')
          } else {
            window.localStorage.setItem('user', JSON.stringify(result.data.data))
            this.$router.push('/home')
          }
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    regist () {
      if (this.user.username2 !== '' && this.user.password2 !== '') {
        let ruser = {
          user_id: 0,
          name: this.user.username2,
          password: this.user.password2,
          role: '普通用户',
          borrow_num: 0
        }
        console.log(ruser)
        postRequest('/api/public/regist', ruser).then((result) => {
          if (result.data.code === 200) {
            this.$message({
              message: `${result.data.msg}`,
              type: 'success'
            })
            this.type = 1
          } else if (result.data.code === -1) {
            alert(result.data.msg)
          }
        }).catch(e => {
          console.log(e)
          this.type = 1
        })
      } else { alert('关键信息不能为空') }
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 16px;
  }
span {
  font: 35px bolder;
  font-weight: bolder;
  /*color: #fbfff6;*/
  background-image: linear-gradient(to right, #0226f1, #06e0fd, #043d92, #02ffd5,#8bd7f5);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  animation: bgp 2s infinite linear;
}
  @-webkit-keyframes bgp{
    0%{
      background-position: 0 0;
    }
    100%{
      background-position: -100% 0;
    }
  }

.light{
  position: absolute;
  top: 10%;
  right: 20%;
  width: 20%;
  height: 50%;
}
  .light2{
    margin-top:50px ;
    width: 250px;
    height: 50%;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .in{
    margin: 10px;
  }
  .bt{
    margin: 15px;
  }
  .el-card{
    position: absolute;
    left:53%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -250px;
    border-radius: 5px;
    background: rgba(219, 219, 219, 0.6);
    overflow: hidden;
  }
  .el-card:hover{
    box-shadow: #474747 0px 0px 50vmax 50vmax;
    -webkit-box-shadow: 0px 0px 82vmax 200vmax rgba(54, 54, 54, 0.7);
    -moz-box-shadow: 0px 0px 82vmax 200vmax rgba(51, 51, 51, 0.7);
    box-shadow: 0px 0px 82vmax 200vmax rgba(57, 57, 57, 0.7);
  }

  .all{
    width:100%;
    height:98vh;
    /*border: black 3px solid;*/
    /*background-color: #1dbd4a;*/
    background-image: url(../../static/image/background1.jpg);
    background-size: 100%;
  }
</style>
