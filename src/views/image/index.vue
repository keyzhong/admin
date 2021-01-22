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
      <div class="img-header-wrap">
        <el-radio-group v-model="isShowCollected" style="margin-bottom: 30px">
       <!--  <el-radio-group v-model="isShowCollected" style="margin-bottom: 30px" @change="fn(val)"> -->
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="collected">收藏</el-radio-button>
        </el-radio-group>
      <div>
        <el-button type='success' @click='dialogVisible= true '>添加素材</el-button>
      </div>
      </div>
      <el-row :gutter="10">
        <el-col
          v-for="item in imgList"
          :key="item.id"
          :span="4"
          :xs="24"
          :sm="12"
          :md="6"
          :lg="4"
          v-show = 'isShowCollected === "all" || (item.is_collected && isShowCollected === "collected")'
        >
          <el-image style="height: 200px" :src="item.url"></el-image>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="params.per_page"
        :current-page="params.page"
        @current-change="currentChange"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>

    <!--可用v-if清除记录-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :show-file-list= "false"
      :append-to-body = "true"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        :headers="uploadHeaders"
        drag
        :on-success="onUploadImg"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
     <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpload = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getImages } from '@/api/image.js'
export default {
  name: 'imageIndex',
  data () {
    // const userInfo = localStorage.getItem('userInfo')
    return {
      params: {
        page: 1,
        per_page: 3,
        collect: false
      },
      isShowCollected: 'all',
      imgList: [],
      totalCount: 100,
      dialogVisible: false,
      uploadHeaders: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDI3NDk0OTQsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.R50JoDKYaEBlqAjBnYtnIjANFrtjyhQyKRcx8L00ME0'
      }
    }
  },
  props: {

  },
  watch: {
    isShowCollected (newVal, oldVl) {
      if (newVal === 'all') {
        this.params.collect = false
      } else {
        this.params.collect = true
      }
      this.params.page = 1
      this.getImagesList()
    }
  },
  methods: {
    getImagesList () {
      getImages(this.params).then(res => {
        this.imgList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    currentChange (page) {
      this.params.page = page
      this.getImagesList()
    },
    // 上传
    handleUpload () {

    },
    handleClose () {
      this.dialogVisible = false
    },
    onUploadImg () {
      this.dialogVisible = false
      this.getImagesList()
    }
  },
  computed: {

  },
  components: {
  },
  created () {
    this.getImagesList()
  }
}
</script>

<style scoped lang='less'>
.el-col {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.img-header-wrap{
  display: flex;
  justify-content: space-between;
}
</style>
