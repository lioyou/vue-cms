<template>
  <div class="create-category">
    <el-dialog :visible.sync='dialog' title="创建类别" :modal="false">
      <category-form :isCreate="true" @hiddenDialog="hiddenDialog"></category-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CategoryForm from '@/views/category/category'

export default {
  name: 'create-form',
  data () {
    return {
      dialog: true
    }
  },
  components: {
    'category-form': CategoryForm
  },
  methods: {
    hiddenDialog() {
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