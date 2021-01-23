<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/setting' }"
            >个人设置</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <el-row :gutter="10">
        <el-col :span="10">
          <el-form
            ref="userInfo"
            :model="userInfo"
            label-width="80px"
            :rules="rules"
            size="small"
          >
            <el-form-item label="编号">{{ userInfo.code }}</el-form-item>
            <el-form-item label="手机">{{ userInfo.phone }}</el-form-item>
            <el-form-item label="媒体名称" prop="mediaName">
              <el-input type="text" v-model="userInfo.mediaName"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="mediaDesc">
              <el-input type="textarea" v-model="userInfo.mediaDesc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveInfo" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="userInfo.photo"
          ></el-avatar>
          <!--  <p @click='$refs.file.click()'>点击修改头像</p> -->
          <p><label for="file">点击修改头像</label></p>
          <input
            type="file"
            hidden
            ref="file"
            id="file"
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
      @opened="openedDialog"
      @closed="closedDialog"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          ref="previewImage"
          :src="previewImg"
          alt=""
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveImg" :loading='uploadLoading'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { isEmptyObj } from '@/utils/utilsFn'
import { updateUserPhoto } from '@/api/user.js'
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {
        code: 1,
        phone: 1,
        mediaName: '',
        mediaDesc: '',
        email: '',
        photo: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg'
      },
      dialogVisible: false,
      previewImg: '',
      cropper: null, // 裁切器实例
      uploadLoading: false,
      rules: {
        mediaName: [
          { required: true, trigger: 'blur', message: '请输入' }
        ],
        mediaDesc: [
          { required: true, trigger: 'blur', message: '请输入' }
        ],
        email: [
          { required: true, trigger: 'blur', message: '请输入' }
        ]
      }
    }
  },
  props: {

  },
  methods: {
    saveInfo () {
      this.$refs.userInfo.validate(valid => {
        if (!valid) {
          return false
        }
      })
      console.log('save')
    },
    onFileChange () {
      // 弹出层预览图片
      // 图片裁切必须基于img已经初始化 img必须是可见状态才能获取DOM节点

      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImg = blobData

      this.dialogVisible = true
      // 解决选择相同文件不触发change事件
      this.$refs.file.value = ''
    },
    openedDialog () {
      if (this.cropper) {
        this.cropper.replace(this.previewImg)
        return
      }
      this.cropper = new Cropper(this.$refs.previewImage, {
        viewMode: 1, // 裁切框不超过图片
        dragMode: 'move',
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true,
        aspectRatio: 1 / 1,
        crop (event) { // 移动裁切器会触发这个事件
        // console.log(event.detail.x)
        }
      })
    },
    closedDialog () {
      // 或者使用replace方法在初始化的时候替换
      this.cropper.destroy()
    },
    saveImg () {
      this.uploadLoading = true
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob)
        const fd = new FormData()
        fd.append('photo', blob/*, 'example.png' */)
        updateUserPhoto(fd).then(res => {
          this.userInfo.photo = window.URL.createObjectURL(blob)
          eventBus.$emit('updateAvatar', this.userInfo.photo)
          this.uploadLoading = false
          this.dialogVisible = false
          console.log(res)
        })
      })
      console.log(this.cropper)
    }
  },
  computed: {

  },
  components: {

  },
  created () {
    const userInfo = localStorage.getItem('userInfo') || {}
    this.userInfo = isEmptyObj(userInfo) ? this.userInfo : userInfo
  },
  destroyed () {
    eventBus.$off('updateAvatar')
  }
}
</script>

<style scoped lang='less'>
.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: 100%;
  }
}
</style>
