<template>

    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <div class="logo"></div>
      <el-menu-item index="/">
        <i class="iconfont iconindex"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont iconimage"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-document"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布管理</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconcomment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconfans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="iconfont iconSettingscontroloptions"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'AppAside',
  data () {
    return {

    }
  },
  props: {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<style scoped lang='less'>
  .el-menu-vertical-demo{
    .logo{
      height:60px;
      background: url('./logo_admin.png') no-repeat center center;
      background-size:70% ;
    }
    .iconfont{
      margin-right:10px;
      padding-left:3px
    }
  }
</style>
