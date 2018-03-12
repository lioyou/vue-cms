<template>
  <div class="create-topic">
    <el-dialog title="创建专题" :visible.sync="dialog" :modal="false">
      <topic-form :isCreate="true" @hiddenDialog="hiddenDialog"></topic-form>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopicForm from '@/views/topic/topic'

export default {
  name: 'create-form',
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    hiddenDialog(){
      this.dialog = false
    }
  },
  components: {
    'topic-form': TopicForm   
  },
  beforeRouteUpdate(to, from, next) {
    this.dialog = true
    next()
  }
}
</script>

<style lang="scss">
  
</style>