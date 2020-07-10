import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/components/Login'], resolve)
const Handbook = resolve => require(['@/components/Handbook'], resolve)
const User = resolve => require(['@/components/User'], resolve)
const userlog = resolve => require(['@/components/UserLog'], resolve)
const borrowlog = resolve => require(['@/components/BorrowLog'], resolve)
const backlog = resolve => require(['@/components/BackLog'], resolve)
const My = resolve => require(['@/components/My'], resolve)
const More = resolve => require(['@/components/More'], resolve)
const Home = resolve => require(['@/client/Home'], resolve)
const library = resolve => require(['@/client/Library'], resolve)
const Myback = resolve => require(['@/client/Myback'], resolve)
const Myborrow = resolve => require(['@/client/Myborrow'], resolve)
Vue.use(Router)

export default new Router({
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: resolve => require(['../components/Main.vue'], resolve),
      beforeEnter: (to, from, next) => {
        var data = JSON.parse(window.localStorage.getItem('user'))
        var role = JSON.parse(window.localStorage.getItem('user')).role
        if (data != null && role === '管理员') {
          next()
        } else if (role !== '管理员') {
          bus.$notify.error({
            title: '错误',
            message: '权限不足！'
          })
          next('/login')
        } else {
          bus.$notify.error({
            title: '错误',
            message: '请先登录！'
          })
          next('/login')
        }
      },
      children: [
        {
          path: '/my',
          name: 'my',
          component: My
        },
        {
          path: '/handbook',
          name: 'handbook',
          component: Handbook
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/userlog',
          name: 'userlog',
          component: userlog
        },
        {
          path: '/borrowlog',
          name: 'borrowlog',
          component: borrowlog
        },
        {
          path: '/backlog',
          name: 'backlog',
          component: backlog
        },
        {
          path: '/more',
          name: 'more',
          component: More
        }
      ]
    },
    {
      path: '/',
      component: resolve => require(['../client/Main.vue'], resolve),
      beforeEnter: (to, from, next) => {
        var data = JSON.parse(window.localStorage.getItem('user'))
        if (data != null) {
          next()
        } else {
          bus.$notify.error({
            title: '错误',
            message: '请先登录！'
          })
          next('/login')
        }
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/library',
          name: 'library',
          component: library
        },
        {
          path: '/Myback',
          name: 'Myback',
          component: Myback
        },
        {
          path: '/Myborrow',
          name: 'Myborrow',
          component: Myborrow
        }
      ]
    }
  ]
})
