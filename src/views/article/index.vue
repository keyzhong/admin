<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article' }" >内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <!--筛选表单-->
        <el-form ref="form" :model="params" label-width="40px" size='mini'>
          <el-form-item label="状态">
            <!-- el-radio-group中默认值的设置是用:label -->
            <el-radio-group v-model="params.status">
              <el-radio  :label=null>全部</el-radio>
              <el-radio  :label=0>草稿</el-radio>
              <el-radio  :label=1>待审核</el-radio>
              <el-radio  :label=2>审核通过</el-radio>
              <el-radio  :label=3>审核失败</el-radio>
              <el-radio  :label=4>已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="params.channel_id" placeholder="请选择活动区域">
              <el-option label='全部' :value="null"></el-option>
              <el-option v-for='item in channelArr' :value='item.id' :key='item.id' :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              format='yyyy-MM-dd'
              value-format='yyyy-MM-dd'
              v-model="rangDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadArticles" :disabled = 'tableLoading'>查询</el-button>
          </el-form-item>
        </el-form>
    </el-card>

    <el-card class="box-card table-container">
      <div slot="header" class="clearfix">根据筛选条件共查询到{{totalArticleNum}}条结果</div>
      <el-table class='list-table' :data="tableData" stripe  style="width: 100%" v-loading='tableLoading'>
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope='scope'>
            <!-- <img :src="scope.row.cover.images[0] || defaultImg " width='100px' height='60px' alt=""> -->
            <!--上面这种情况是在运行期间动态改变的处理的 而本地图片必须在打包的时候就存在-->
            <el-image style="width:100px; height:100px" :src='scope.row.cover.images[0]' fit='cover'></el-image>
            <!-- <img v-if='scope.row.cover.images[0]' :src="scope.row.cover.images[0] " width='100px' height='60px' alt="">
            <img v-else :src='defaultImg' width='100px' height='60px' alt=""> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <!-- <div v-for='item in articlesStatus' :key='item.status'>
              <el-tag v-if = 'item.status !== scope.row.status'>{{scope.row.title}}</el-tag>
            </div> -->
           <el-tag size="medium" :type='articlesStatus[scope.row.status].type' >{{articlesStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
         <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
             <el-button type='primary' class='el-icon-edit' @click="$router.push('/publish?id=' + scope.row.id)" circle plain></el-button>
             <el-button type='danger' class='el-icon-delete' @click='onDeleteArticle(scope.row.id)' circle plain></el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 默认按10条每页处理 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalArticleNum"
        :current-page.sync='currentPage'
        @current-change='currentChange'
        :disabled = 'tableLoading'
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article.js'
export default {
  name: 'AticleIndex',
  data () {
    return {
      params: {
        page: 1, // 传入页
        per_page: 10, // 每页条数
        begin_pubdate: '',
        end_pubdate: '',
        status: null,
        channel_id: null
      },
      rangDate: [],
      currentPage: 1,
      pageSize: 10,
      totalArticleNum: 0,
      defaultImg: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
      channelArr: [],
      tableData: [],
      articlesStatus: [
        {
          text: '草稿',
          status: 0,
          type: 'warning'
        },
        {
          text: '待审核',
          status: 1,
          type: ''
        },
        {
          text: '审核通过',
          status: 2,
          type: 'success'
        },
        {
          text: '审核失败',
          status: 3,
          type: 'danger'
        },
        {
          text: '已删除',
          status: 4,
          type: 'info'
        }
      ],
      tableLoading: false
    }
  },
  props: {

  },
  methods: {
    // 加载列表
    loadArticles () {
      this.params.begin_pubdate = this.rangDate.length ? this.rangDate[0] : ''
      this.params.end_pubdate = this.rangDate.length ? this.rangDate[1] : ''
      this.tableLoading = true
      getArticles(this.params).then(res => {
        this.tableLoading = false
        this.tableData = res.data.data.results
        this.totalArticleNum = res.data.data.total_count
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
      })
    },
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channelArr = res.data.data.channels
      })
    },
    currentChange (page) {
      // this.params.page = this.currentPage
      this.loadArticles()
    },
    onDeleteArticle (id) {
      console.log(id.toString())
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id.toString()).then(res => {
          this.loadArticles()
        })
      }).catch(() => { })
    }
  },
  computed: {

  },
  components: {

  },
  created () {
    this.loadArticles()
    this.loadArticleChannels()
  }
}
</script>

<style lang='less' scoped>
.article-container{
  .table-container{
    margin-top:40px;
    .list-table{
      margin-bottom:20px;
    }
  }

}
</style>
