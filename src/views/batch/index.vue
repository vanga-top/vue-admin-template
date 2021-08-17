<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.coach" placeholder="Coach" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in coaches" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      &nbsp;
      <el-select v-model="listQuery.orderState" placeholder="State" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in orderStates" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      &nbsp;
      <el-input v-model="listQuery.phone" placeholder="User Phone" clearable style="width: 200px" class="filter-item"/>
      &nbsp;
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px"
                 @click="handleQuery"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>

      <el-table
        :key="tableKey"
        v-loading="isLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="订单ID" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员名" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上课教练" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.techCoachName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.startTime | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.endTime | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.orderType | parserOrderType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣款" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.finalPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="handleUpdate(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                  @pagination="handleQuery"
      />

      <!-- 编辑/新增数据弹窗 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
                 style="width: 500px; margin-left:50px;"
        >
          <el-form-item label="课程模版">
            <el-select v-model="temp.courseId" class="filter-item" placeholder="选择课程模版" @change="selectCourse">
              <el-option v-for="item in coaches" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="CourseId" >
            <el-input v-model="temp.courseName" style="width: 200px"/>
          </el-form-item>

        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { postOrderQuery } from '@/api/batch'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  name: 'Batch',
  components: { Pagination },
  filters: {
    formatTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    parserOrderType(orderType) {
      if (orderType === 0) {
        return '团课'
      } else if (orderType === 1) {
        return '私教课'
      }
    }
  },
  data() {
    return {
      isLoading: false,
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 20,
        coach: undefined,
        orderState: undefined,
        phone: undefined
      },
      coaches: [{ name: 'chenhui', id: 2 }, { name: 'laowang', id: 3 }],
      orderStates: [{ id: 1, name: '已完成' }, { id: 2, name: '预约中' }, { id: 3, name: '已取消' }],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        techCoachId: [{ required: true, message: 'type is required', trigger: 'change' }],
        userId: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        techCoachId: '',
        courseId: undefined,
        courseName: '',
        userId: '',
        status: 'published'
      }
    }
  }, methods: {
    handleQuery() {
      this.isLoading = true
      // 发请求
      postOrderQuery(this.listQuery).then(response => {
        console.log(response)
        this.isLoading = false
        this.list = response.result
        this.total = response.total

        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    selectCourse(item) {
      this.temp.courseName = item
      console.log(item)
    }
  }
}
</script>
