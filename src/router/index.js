import Vue from 'vue'
import VueRouter from 'vue-router'
// import NProgress from 'nprogress'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空 作为默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article', // path为空 作为默认子路由
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截
// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
/* router.beforeEach((to, from, next) => {
  // 顶部动态进度条效果
  NProgress.start()
  const userInfo = localStorage.getItem('userInfo')
  if (to.path !== '/login') {
    if (userInfo) { // 已经登录过
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 在路由的全局后置钩子中，关闭进度条特效
router.afterEach((to, from) => {
  NProgress.done()
})
*/

export default router
