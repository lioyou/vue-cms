<template>
  <div class="create-system">
    <el-dialog title="创建系统" :visible.sync="dialog" :modal="false">
      <system-form :isCreate="true" @hiddenDialog="hiddenDialog"></system-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SystemForm from '@/views/system/system'
import data from '@/api/data'

export default {
  name: 'create-form',
  data() {
    return {
      dialog: true
    }
  },
  methods: {
    hiddenDialog() {
      this.dialog = false
    }
  },
  components: {
    'system-form': SystemForm
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = true
    next()
  }
}
</script>

<style lang="scss">
  
</style>