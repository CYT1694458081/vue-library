<template>
    <div class="wrapper">
      <v-aside></v-aside>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
      <v-bottom></v-bottom>
    </div>
</template>

<script>
import vAside from './ASide.vue'
import vBottom from './Bottom.vue'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vAside,
    vBottom
  },
  created () {

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
  }
}
</script>

<style scoped>

</style>
