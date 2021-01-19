import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 样式
import './styles/index.less'

// ele
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
