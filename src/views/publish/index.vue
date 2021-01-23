<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/publish' }">{{
            $route.query.id ? '修改文章' : '发布文章'
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form
        ref="articleForm"
        :model="article"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="cover-wrapper" v-if="article.cover.type > 0">
            <!--
              这里的saveImgInfo(index, $event)中的$event(固定) 代表了子组件事件传递的参数 且只能这么写
            -->
            <!--
              <article-cover
              :fromCoverImg="article.cover.images[index]"
              v-for="(item, index) in article.cover.type"
              :key="item"
              @updateCover="saveImgInfo(index, $event)"
            ></article-cover>
            -->
            <!--
              当给子组件提供数据的时候 还要修改 可以使用v-model简化数据绑定 v-model => { 监听input事件 传prop为value的值 }
            -->
            <article-cover
              v-model = article.cover.images[index]
              v-for="(item, index) in article.cover.type"
              :key="item"
            ></article-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="item in channelArr"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article.js'
import { isEmptyObj } from '@/utils/utilsFn.js'
import ArticleCover from './components/articleCover.vue'
export default {
  name: 'PublishIndex',
  data () {
    return {
      article: {
        title: '',
        cover: {
          type: 1,
          images: []
        },
        content: '',
        channel_id: ''
      },
      channelArr: null,
      articleId: null,
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '请输入' },
          { min: 5, max: 30, trigger: 'blur', message: '5-30个字符' }
        ],
        channel_id: [
          { required: true, trigger: 'blur', message: '请选择' }
        ]
      }
    }
  },
  props: {

  },
  computed: {
  },
  watch: {
    // 深度监听一下type
  },
  methods: {
    onPublish (isDraft) {
      this.$refs.articleForm.validate(valid => {
        if (!valid) {
          return
        }
        if (this.article.cover.type <= 0) {
          this.article.cover.images = []
        }
        if (this.articleId) {
          updateArticle(this.articleId, this.article, isDraft).then(() => {
            this.$message({
              message: isDraft ? '存为草稿成功' : '发布成功',
              type: 'success'
            })
          })
        } else {
          addArticle(this.article, isDraft).then(() => {
            this.$message({
              message: isDraft ? '存为草稿成功' : '发布成功',
              type: 'success'
            })
          })
        }
      })
    },
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channelArr = res.data.data.channels
      })
    },
    saveImgInfo (index, imgAddress) {
      this.article.cover.images[index] = imgAddress
    }
  },
  components: {
    ArticleCover
  },
  created () {
    this.loadArticleChannels()
    this.articleId = this.$route.query.id || ''
    if (this.articleId) {
      // 获取数据
      getArticle(this.articleId).then(res => {
        console.log(res.data.data)
        this.article = isEmptyObj(res.data.data) ? this.article : res.data.data
      })
    }
  }
}
</script>

<style scoped>
.cover-wrapper {
  display: flex;
}
</style>
