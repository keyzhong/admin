<template>
  <div class="layout-container">
    <el-container class="layout-container">
      <el-aside class="aside" :width="asideWidth">
        <app-aside class="aside-menu" :isCollapse="isCollapse"></app-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-text">
            <i
              :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse,
              }"
              @click="showAside"
            ></i>
            <span>后台管理系统</span>
          </div>
          <el-dropdown>
            <!-- <span>
              下拉菜单<i class="el-icon-arrow-down"></i>
            </span> -->
            <div class="avatar-wrap">
              <img class="avatar" :src="userInfo.photo" alt="" />
              <span>{{ userInfo.name }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!--组件默认不识别原生事件 除非处理-->
              <!--.native 将原生事件绑定到组件-->
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import AppAside from './components/aside'
import { getUserInfo } from '@/api/user'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      userInfo: {},
      isCollapse: false
    }
  },
  props: {

  },
  methods: {
    loadUserProfile () {
      getUserInfo().then(res => {
        this.userInfo = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    showAside () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }).catch(() => { })
    }
  },
  computed: {
    asideWidth () {
      const val = this.isCollapse ? '64px' : '200px'
      return val
    }
  },
  watch: {
  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
  }
}
// computed 和watch的区别
/**
 * computed支持缓存 依赖数据发生改变，才会重新进行计算  watch无法缓存 数据变，直接会触发相应的操作
 * computed不支持异步  watch(newVal, oldVVal) 支持异步
 * 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
 * 当一个属性发生变化时，需要执行对应的操作；一对多；用watch
 * 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
immediate：组件加载立即触发回调函数执行，
deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。
 */
</script>

<style scoped lang='less'>
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside {
  max-width: 200px;
  .aside-menu {
    height: 100%;
  }
}
.header {
  height: 60px;
  display: flex;
  justify-content: spacae-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .header-text {
    flex: 1;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
