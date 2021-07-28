<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }} token: {{ token }}</div>
    <!-- 几个面板 -->
    <panel-group :init-data="initChartData" @handleSetLineChartData="handleSetLineChartData"/>
    <!-- 联动的折线图 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table/>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <box-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import { initPanelData, getLineData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable,
    BoxCard
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
