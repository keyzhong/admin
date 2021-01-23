<template>
  <div class="upload-cover" @click="showCover">
    <div class="cover-wrap">
      <img
        class="cover-img"
        ref='coverImg'
        alt=""
        :src='value'
      />
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <img-list
            :showUploadBtn = 'false'
            ref='imgListComponent'
            ></img-list>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="onFileChange" ref="file" />
          <img :src="previewImg" width="100px" alt="" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { updateUserPhoto } from '@/api/user.js'
import ImgList from '@/components/imgList.vue'
export default {
  name: 'articleIndex',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      previewImg: ''
    }
  },
  /*  props: {
    fromCoverImg: {
      type: String,
      default: 'https://user-gold-cdn.xitu.io/2020/7/13/17345e750e6865d1?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
    }
  }, */
  props: ['value'],
  methods: {
    showCover () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.previewImg = blob
      // 防止用户选择同一个文件不触发事件
      // this.$refs.file.value = ''
    },
    confirmUpload () {
      const file = this.$refs.file.files
      // 如果tab是上传图片 并且有上传的图片
      if (this.activeName === 'second') {
        if (!file.length) {
          this.$message({
            type: 'warning',
            message: '请上传文件'
          })
          return
        }
        const fd = new FormData()
        fd.append('cover', this.$refs.file.files[0])
        updateUserPhoto(fd).then(res => {
          const imgAddress = 'https://img01.51jobcdn.com/im/jobs/man.png'
          this.dialogVisible = false
          this.$refs.coverImg.src = imgAddress
          // 将图片数据发送给父组件
          // this.$emit('updateCover', imgAddress)
          this.$emit('input', imgAddress)
        })
      } else {
        // 父组件直接获取子组件的数据 ref 一般用于获取 不修改
        const imgList = this.$refs.imgListComponent
        const selected = imgList.selected
        console.log(imgList.imgList[0])
        if (selected === null) {
          this.$message('选啊')
          return
        }
        this.dialogVisible = false
        this.$emit('input', imgList.imgList[selected].url)
      }
    }
  },
  computed: {

  },
  components: {
    ImgList
  }
}
</script>

<style lang='less' scoped>
.upload-cover {
  margin: 0 5px 5px 0;
  .cover-wrap {
    width: 150px;
    height: 120px;
    border: 1px solid #ccc;
    .cover-img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
