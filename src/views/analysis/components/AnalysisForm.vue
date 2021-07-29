<template>
  <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

  </el-form>
</template>

<script>
const defaultForm = {
  fileId: '',
  startTime: undefined,
  endTime: undefined
}

export default {
  data: {
    return: {
      postForm: Object.assign({}, defaultForm)
    }
  }
}
</script>
