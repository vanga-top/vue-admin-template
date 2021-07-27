<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }} token: {{ token }}</div>
    <!-- 几个面板 -->
    <panel-group :init-data="initChartData" @handleSetLineChartData="handleSetLineChartData"/>
    <!-- 联动的折线图 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  avgScores: {
    expectedData: [9.5, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5],
    actualData: [8.5, 9.5, 10.0, 6.7, 7.6, 9.5, 8.9]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

const initChartData = {
  avgScores: 10,
  messages: 30
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart
  },
  computed: {
    ...mapGetters([
      'name', 'token'
    ])
  },
  data() {
    return {
      lineChartData: lineChartData.avgScores,
      initChartData: initChartData
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
      // this.initChartData[type] = initChartData[type] + 10
    },
    handleInitChartData(type) {
      console.log(type)
      this.initChartData = initChartData[type]
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
