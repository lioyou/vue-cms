<template>
  <div class="create-menu">
    <el-dialog title="创建菜单" :visible.sync='dialog' :modal="false">
      <menu-form :isCreate="true" @hiddenDialog="hiddenDialog"></menu-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MenuForm from '@/views/menu/menu'

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
    'menu-form': MenuForm
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = true
    next()
  }
}
</script>

<style lang="scss">
  
</style>