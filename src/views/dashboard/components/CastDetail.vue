<template>
  <el-row :gutter="8">
    <!-- 左侧列表 -->
    <el-col
      :xs="{span: 24}"
      :sm="{span: 24}"
      :md="{span: 24}"
      :lg="{span: 12}"
      :xl="{span: 12}"
      style="padding-right:8px;margin-bottom:30px;"
    >
      <el-table :data="list" style="width: 100%;padding-top: 15px;">
        <el-table-column label="编号" min-width="200" prop="order_no">
        </el-table-column>
        <el-table-column label="分值" width="195" align="center" prop="price">
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter" @click="handleDataChange(scope.row.order_no)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 右侧详细评分 -->
    <el-col
      :xs="{span: 24}"
      :sm="{span: 24}"
      :md="{span: 24}"
      :lg="{span: 12}"
      :xl="{span: 12}"
      style="margin-bottom:30px;"
    >
      <el-card class="box-card-component" style="margin-left:8px;">
        <div slot="header" class="box-card-header">
          <img src="https://dn-lego-static.qbox.me/1625036098-kodopage-banner.jpg">
        </div>
        <div style="position:relative;" :data="rows">
          <span class-name="mallki-text">综合视频评分:{{ selectedID }}</span>
          <template v-for="(data,index) in rows">
            <div v-if="index===0" class="progress-item" style="padding-top:35px;">
              <span>{{ data.name }}</span>
              <el-progress :percentage="data.score"/>
            </div>
            <div v-else class="progress-item">
              <span>{{ data.name }}</span>
              <el-progress :percentage="data.score"/>
            </div>
          </template>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { transactionList, getBoxCardData } from '@/api/dashboard'

const params = {}

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null,
      rows: null,
      selectedID: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() { // 初始化调用
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 10)
        this.selectedID = this.list[0].order_no
      })
      getBoxCardData(params).then(response => {
        this.rows = response.data.items.slice(0, 10)
      })
    },
    handleDataChange(params) {
      console.log(this.selectedID + '  .......  ' + params)
      this.selectedID = params
      getBoxCardData(params).then(response => {
        this.rows = response.data.items.slice(0, 10)
      })
    }
  }
}
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;

    ::v-deep .pan-info {
      box-shadow: none !important;
    }
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
