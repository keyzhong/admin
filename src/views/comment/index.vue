<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/comment' }"
            >评论管理</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <el-table
        class="list-table"
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="tableLoading"
      >
        <el-table-column
          prop="title"
          label="标题"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="总评论数"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
          width="180"
        ></el-table-column>
        <el-table-column prop="comment_status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.comment_status ? '关闭' : '正常' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              size="medium"
              v-if="scope.row.comment_status"
              type="success"
              >打开评论</el-button
            >
            <el-button size="medium" v-else type="danger">关闭评论</el-button> -->
            <el-switch
              v-model="scope.row.comment_status"
              @change='fn'
              inactive-color="#13ce66"
              active-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

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
      :show-file-list="false"
      :append-to-body="true"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fn = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      params: {
        page: 1,
        pre_page: 10
      },
      tableData: [
        { id: 13528480, title: 'zidongceshi', comment_status: true, total_comment_count: 0, fans_comment_count: 0 },
        { id: 1352848296686649300, title: 'Apriori', comment_status: false, total_comment_count: 1, fans_comment_count: 1 },
        { id: 1352848249300, title: '爬虫', comment_status: true, total_comment_count: 2, fans_comment_count: 2 },
        { id: 13528486649300, title: '算法', comment_status: false, total_comment_count: 3, fans_comment_count: 4 },
        { id: 135829649300, title: '显示', comment_status: true, total_comment_count: 6, fans_comment_count: 9 }

      ],
      tableLoading: false,
      totalCount: 0,
      dialogVisible: false
    }
  },
  props: {

  },
  methods: {
    currentChange (page) {
      console.log(page)
    },
    fn () {

    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<style>
</style>
