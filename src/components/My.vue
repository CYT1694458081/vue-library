<!--管理员主页-->
<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="require('../../static/image/user.jpg')" class="user-avator" alt="">
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
          <div class="user-info-list">上次登录地点：<span>丽水</span></div>
        </el-card>
        <el-card shadow="hover" style="height:252px;" class="mgb21">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="3.7"></el-progress>
          HTML
          <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb22">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <img src="../../static/image/background.jpg" style="z-index:-2; position: absolute; top:0vh; left: 0vw;width: 100%;height:100%"/>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {
      name: JSON.parse(window.localStorage.getItem('user')).name,
      role: JSON.parse(window.localStorage.getItem('user')).role
    }
  }
}
</script>

<style scoped>

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    height: 50vh;
    position: absolute;
    left: 0;
    top: 140px;
    width: 35vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb21{
    height: 50vh;
    position: absolute;
    right: 5vw;
    top: 140px;
    width: 35vw;
    margin-right: 40px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb22{
    /*height: 80vh;*/
    position: absolute;
    right: 10vw;
    top:220px;
    width: 65vw;
    margin-right:20vw;
    margin-top: 50vh;
    box-shadow: 0px 0px 10px #babfbf;
  }
</style>
