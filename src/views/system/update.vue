<template>
  <div class="update-system">
    <el-dialog title="修改系统" :visible.sync='dialog' :modal="false">
      <system-form :isCreate="false" @hiddenDialog="hiddenDialog"></system-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Message } from 'element-ui'

import SystemForm from '@/views/system/system'
import data from '@/api/data'

export default {
  name: 'update-form',
  data() {
    return {
      dialog: true
    }
  },
  components: {
    'system-form': SystemForm
  },
  methods: {
    hiddenDialog(){
      this.dialog = false
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = true
    next()
  }
}
</script>

<style lang="scss">
  
</style>