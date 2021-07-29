<template>
  <div class="analysis-container">
    <div class="analysis-text">name: {{ name }} token: {{ token }}
      <analysis-form/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnalysisForm from './components/AnalysisForm'

export default {
  name: 'Analysis',
  computed: {
    ...mapGetters([
      'name', 'token'
    ])
  },
  components: {
    AnalysisForm
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
