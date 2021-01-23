<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/publish' }"
            >素材管理</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <img-list></img-list>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import ImgList from '@/components/imgList.vue'
export default {
  name: 'imageIndex',
  data () {
    // const userInfo = localStorage.getItem('userInfo')
    return {
    }
  },
  props: {
  },
  watch: {
  },
  methods: {
  },
  computed: {

  },
  components: {
    ImgList
  },
  created () {
  }
}
</script>

<style scoped lang='less'>

</style>
