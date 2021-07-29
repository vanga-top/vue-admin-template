<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }} token: {{ token }}</div>
    <!-- 几个面板 -->
    <panel-group :init-data="initChartData" @handleSetLineChartData="handleSetLineChartData"/>
    <!-- 联动的折线图 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
    <cast-detail/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { initPanelData, getLineData } from '@/api/dashboard'
import CastDetail from './components/CastDetail'

export default {
  name: 'Dashboard',
  components: {
    CastDetail,
    PanelGroup,
    LineChart
  },
  computed: {
    ...mapGetters([
      'name', 'token'
    ])
  },
  created() {
    this.init()
  },
  data() {
    return {
      lineChartData: {},
      initChartData: {}
    }
  },
  methods: {
    // 初始化数据
    init() {
      this.listLoading = true
      initPanelData().then(response => {
        this.initChartData = response.data
        this.listLoading = false
      }).catch(reason => {
        console.error(reason)
      })
      getLineData({ type: 'avgScores' }).then(response => {
        this.lineChartData = response.data['avgScores']
      }).catch(reason => {
        console.error(reason)
      })
    },
    // 同步chart的数据集
    handleSetLineChartData(type) {
      getLineData({ type: type }).then(response => {
        this.lineChartData = response.data[type]
      }).catch(reason => {
        console.error(reason)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
