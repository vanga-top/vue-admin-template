<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.userId" placeholder="User" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in users" :key="item.id" :label="item | formatUserLabel" :value="item.id"/>
      </el-select>
      &nbsp;
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
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
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
        <el-table-column label="订单ID" prop="id" align="center" width="80">
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
            <el-button type="danger" size="mini">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="handleQuery"
      />

      <!-- 编辑/新增数据弹窗 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="100px"
          style="width: 500px; margin-left:50px;"
        >
          <el-form-item label="消费会员">
            <el-select v-model="temp.userId" placeholder="选择消费用户" clearable style="width: 200px" class="filter-item">
              <el-option v-for="item in users" :key="item.id" :label="item | formatUserLabel" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="课程模版">

            <el-select
              v-model="temp.courseId"
              class="filter-item"
              placeholder="选择课程模版"
              style="width: 200px"
              @change="selectCourse"
            >
              <el-option v-for="item in courseList" :key="item.id" :label="item.courseName" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="temp.courseName" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="上课教练">
            <el-select ref="coach_select" v-model="temp.techCoachId" class="filter-item" style="width: 200px">
              <el-option v-for="item in coaches" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="temp.originPrice" style="width: 200px" disabled/>
          </el-form-item>
          <el-form-item label="扣款">
            <el-input v-if="dialogStatus === 'create'" v-model="temp.finalPrice" style="width: 200px" disabled/>
            <el-input v-if="dialogStatus === 'update'" v-model="temp.finalPrice" style="width: 200px" disabled/>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="temp.startTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item label="课程时长">
            <el-input v-model="temp.duration" style="width: 200px"/>
            分钟
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            确认
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  postOrderQuery,
  queryCourseList,
  loadAllCoachInfo,
  queryUserNameList,
  postCreateOrder,
  queryCourseById, queryUserType
} from '@/api/batch'
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
    },
    formatUserLabel(item) {
      return item.name + '-' + item.phone
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
      coaches: [],
      users: [],
      selectUserLevel: undefined,
      orderStates: [{ id: 0, name: '预约成功' }, { id: 1, name: '已完成' }, { id: 2, name: '已取消' }],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        startTime: [{ type: 'date', required: true, message: '时间必选', trigger: 'blur' }]
      },
      courseList: null,
      temp: {
        techCoachId: null,
        courseId: null,
        courseName: null,
        userId: null,
        originPrice: 0,
        finalPrice: 0,
        startTime: null,
        duration: 0,
        orderId: 0
      }
    }
  }, created() {
    this.init()
  },
  methods: {
    init() { // load coach data
      loadAllCoachInfo().then(response => {
        this.coaches = response.result
      })

      queryUserNameList().then(response => {
        this.users = response.result
      })

      // 查询course
      queryCourseList().then(response => {
        this.courseList = response.result
      })
    },
    handleQuery() {
      this.isLoading = true
      // 发请求
      postOrderQuery(this.listQuery).then(response => {
        this.isLoading = false
        this.list = response.result
        this.total = response.total

        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    handleCreate() { // 添加新记录，这里需要做一些查询操作
      this.clearTemp()
      this.dialogStatus = 'create'
      this.$nextTick(() => { // 这里需要清空一下
        this.$refs['dataForm'].clearValidate()
        this.$refs['dataForm'].resetFields()
      })
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.clearTemp()
      this.temp.orderId = row.id
      this.temp.courseId = row.courseId
      this.temp.userId = row.userId
      this.temp.originPrice = row.originPrice
      this.temp.finalPrice = row.finalPrice
      this.temp.techCoachId = row.techCoachId
      this.temp.startTime = new Date(parseTime(row.startTime, '{y}-{m}-{d} {h}:{i}:{s}'))
      queryCourseById({ 'courseId': this.temp.courseId }).then(response => {
        this.temp.duration = response.result.duration
        this.temp.courseName = response.result.courseName
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    selectCourse(item) {
      this.temp.courseName = item.courseName
      this.temp.courseId = item.id
      this.temp.techCoachId = item.coachId
      this.temp.originPrice = item.price
      this.temp.duration = item.duration

      if (this.dialogStatus === 'create') {
        queryUserType({ 'userId': this.temp.userId }).then(response => {
          this.selectUserLevel = response.result
          if (this.selectUserLevel != null) {
            switch (item.courseType) {
              case 0 :
                this.temp.finalPrice = this.temp.originPrice - this.selectUserLevel.groupDeduct
                break
              case 1:
                this.temp.finalPrice = this.temp.originPrice - this.selectUserLevel.privateDeduct
                break
              default:
                this.temp.finalPrice = item.price
            }
          } else {
            this.temp.finalPrice = item.price
          }
        })
      }
    }, createData() {
      this.temp.startTime = parseTime(this.temp.startTime, '{y}-{m}-{d} {h}:{i}:{s}')
      const tempData = Object.assign({}, this.temp)
      console.log(tempData.startTime)
      postCreateOrder(tempData).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: response.code,
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }, updateData() {
      console.log(this.temp.startTime)
    },
    clearTemp() {
      this.temp.techCoachId = null
      this.temp.courseId = null
      this.temp.courseName = null
      this.temp.userId = null
      this.temp.originPrice = 0
      this.temp.finalPrice = 0
      this.temp.startTime = null
      this.temp.duration = 0
    }
  }
}
</script>
