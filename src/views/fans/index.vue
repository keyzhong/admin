<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/fans' }"
            >粉丝管理</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="粉丝列表">
        </el-tab-pane>
        <el-tab-pane label="粉丝画像">
          <div ref='echartWrapper' style='width:500px; height:400px'></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import * as echarts from 'echarts'
export default {
  data () {
    return {
      myChart: null
    }
  },
  props: {

  },
  methods: {
    initECharts () {
      this.myChart = echarts.init(this.$refs.echartWrapper)
      //
      const option = {
        title: {
          text: ''
        },
        tooltip: {},
        xAxis: {
          data: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        },
        grid: {
          containLabel: true
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [150, 200, 150, 100, 100, 200, 150]
        }]
      }
      // 绘制图表
      this.myChart.setOption(option)
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  },
  mounted () { // 初始化就要操作dom 那么需要放在mounted后
    this.initECharts()
  }
}
</script>

<style>
</style>
