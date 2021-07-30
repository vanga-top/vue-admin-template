<template>
  <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
    <div class="createPost-main-container">
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 40px;" prop="fileId">
            <MDinput v-model="postForm.fileIdTxt" :maxlength="100" name="name" required>
              视频地址/ID
            </MDinput>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="postInfo-container">
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="Start Time:" class="postInfo-container-item">
              <el-date-picker v-model="startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" label="End Time:" class="postInfo-container-item">
              <el-date-picker v-model="endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" class="postInfo-container-item">
              <el-button @click="handleClick(postForm.fileIdTxt)">开始分析</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row>
      <el-col :span="24">
        <el-divider/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-row>文件：{{ fileId }}</el-row>
        <el-row>综合分： {{ score }}</el-row>
        <el-row>告警项：<span style="color: red">（{{ errCount }}）</span></el-row>
        <el-row>优化项：<span style="color: #ffbc54">（{{ warnCount }}）</span></el-row>
        <el-row>优化建议：</el-row>
        <el-row style="white-space: pre">{{ suggest }}</el-row>
      </el-col>
      <el-col :span="16">
        <!-- -->
        <el-card class="box-card-component" style="margin-left:8px;">
          <div slot="header" class="box-card-header">
            <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" controls="controls">
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <div style="position:relative;" :data="detailRows">
            <span class-name="mallki-text">综合视频评分: {{ score }}</span>
            <template v-for="(data,index) in detailRows">
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
  </el-form>

</template>

<script>
import MDinput from '@/components/MDinput'
import Player from './Player'
import { getBoxCardData } from '@/api/dashboard'

const defaultForm = {
  fileIdTxt: ''
}

export default {
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        fileIdTxt: [{ validator: validateRequire }]
      },
      detailRows: null,
      score: null,
      errCount: 0,
      warnCount: 0,
      suggest: null
    }
  },
  components: {
    MDinput, Player
  },
  computed: {
    startTime: {
      get() {
        return (+new Date(this.postForm.startTime))
      },
      set(val) {
        this.postForm.startTime = new Date(val)
      }
    },
    endTime: {
      get() {
        return (+new Date(this.postForm.endTime))
      },
      set(val) {
        this.postForm.endTime = new Date(val)
      }
    }
  },
  methods: {
    handleClick(params) {
      getBoxCardData(params).then(response => {
        console.log(params)
        this.detailRows = response.data.items.slice(0, 10)
        this.score = response.data.score
        this.fileId = response.data.fileId
        this.warnCount = 3
        this.errCount = 1
        this.suggest = "1、建议码率设置\n2、建议降低帧率\n"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.mallki-text {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 20px;
  font-weight: bold;
}

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    video {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
    }
  }
}
</style>
<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
