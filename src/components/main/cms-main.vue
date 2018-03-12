<template>
  <div>
    <el-tabs class="cms-tab" v-model="tab.editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(item) in tab.editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <cms-table :url="item.content">
        </cms-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import {Tabs, TabPane} from 'element-ui'

import data from '@/api/data'
import CmsTable from '@/components/table/cms-table'

Vue.use(Tabs)
Vue.use(TabPane)
export default {
  name: 'cms-main',
  data() {
    return {
      'tab': data.tab
    }
  },
  components: {
    'cms-table': CmsTable
  },
  methods: {
    removeTab(targetName) {//删除关闭的tab组件
      let tabs = this.tab.editableTabs  //获取当前激活的组件
      let activeName = this.tab.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.tab.editableTabsValue = activeName
      this.tab.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang="scss">
    .cms-main {
      width: 80%;
      padding: 0px 15px;
    }
</style>
