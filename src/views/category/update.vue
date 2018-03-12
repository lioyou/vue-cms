<template>
  <div class="create-category">
    <el-dialog :visible.sync='dialog' title="修改类别" :modal="false">
      <category-form :isCreate="false" @hiddenDialog="hiddenDialog"></category-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>


<script>
import categoryForm from '@/views/category/category'

export default {
  name: 'update-form',
  data () {
    return {
      dialog: true
    }
  },
  components: {
    'category-form': categoryForm
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