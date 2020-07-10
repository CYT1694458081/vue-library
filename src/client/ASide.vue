<template>
  <div>
    <div class="image"><img src="../../static/image/library.png" height="70px" width="150px" style="float: left"/>
      <img src="../../static/image/CYT.png" height="70px" width="150px" style="float: right"/>
      <h2> 欢迎来到CYT的LIBRARY系统</h2>
      </div>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="rgb(16,103,155)"
    text-color="#fff"
    active-text-color="#ffd04b" router>
    <el-menu-item index="home">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的借阅</template>
      <el-menu-item index="Myborrow">借阅情况</el-menu-item>
      <el-menu-item index="Myback">归还情况</el-menu-item>
    </el-submenu>
    <el-menu-item index="library">书库</el-menu-item>
    <el-dropdown style="margin-right:25px;margin-top: 20px;color: white; float: right">
      <div style="font-size:200%">
      <i class="el-icon-setting" style="margin-right: 0px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="out">退出登录</a></el-dropdown-item>
        <el-dropdown-item><a href="https://github.com/CYT1694458081/vue-library" style="text-decoration:none">前端GIT地址</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'my',
      activeIndex2: '1'
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    out () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.image{
  height: 70px;
  width: auto;
  border: black 3px solid;
  background-color: rgba(106,216,236,50);
}

</style>
