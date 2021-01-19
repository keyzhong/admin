<template>
  <div class="layout-container">
    <el-container class="layout-container">
      <el-aside
        class="aside"
        width="200px">
      <app-aside class='aside-menu'></app-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class='header-text'>
            <i class="el-icon-s-fold"></i>
            <span>rporis voluptates ad nobis odio hic!</span>
          </div>
          <el-dropdown>
            <!-- <span>
              下拉菜单<i class="el-icon-arrow-down"></i>
            </span> -->
            <div class='avatar-wrap'>
              <img class='avatar' :src="userInfo.photo" alt="">
              <span>{{userInfo.name}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
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
      userInfo: {
        name: ''
      }
    }
  },
  props: {

  },
  methods: {
    loadUserProfile () {
      getUserInfo().then(res => {
        this.userInfo = res.data.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {

  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang='less'>
.layout-container{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom:0;
}
.aside{
  background-color:"#002033";
  .aside-menu{
    height: 100%;
  }
}
.header{
  height:60px;
  display: flex;
  justify-content: spacae-between;
  align-items:center;
  border-bottom: 1px solid #ddd;
  .header-text{
    flex:1;
  }
  .avatar-wrap{
    display:flex;
    align-items: center;
    .avatar{
      height:30px;
      width: 30px;
      border-radius:50%;
      margin-right:5px;
    }
  }
}
.main{
}
</style>
