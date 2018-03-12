<template>
  <div class="create-tag">
    <el-dialog title="创建标签" :visible.sync="dialog" :modal="false">
      <tag-form :isCreate="true" @hiddenDialog="hiddenDialog"></tag-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TagForm from '@/views/tag/tag'

export default {
  name: 'create-form',
  data () {
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
    'tag-form': TagForm
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = true
    next()
  }
}
</script>

<style lang="scss">
  
</style>