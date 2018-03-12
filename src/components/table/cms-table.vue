<template>
  <div class="cms-table">
    <cms-toolbar :actions="actions" :formUrl="url"></cms-toolbar>
    <el-table :data="tableData" ref="table" style="width: 100%" stripe border height="500px" 
      @selection-change="handleSelectionChange" @select="select" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column label="序号" type="index" width="60">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableColumn" :label='map[item]' :prop='item' :key='index' width="auto">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" 
        layout="total, sizes, prev, pager, next, jumper" :total="page.totalNums">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Table, TableColumn, Button, Pagination} from 'element-ui'

//导入自定义的类，组件，数据等
import request from '@/api/request'
import map from '@/api/map'
import CmsToolbar from '@/components/toolbar/cms-toolbar'
import bus from '@/api/bus'
import data from '@/api/data'
import action from '@/api/action'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
export default {
  name: 'cms-table',
  data() {
    return {
      tableData: [],
      tableColumn: [],
      actions: ['create', 'update', 'delete'],
      page: {
        currentPage: 1,
        pageSize: 10,
        totalNums: 0
      },
      map: map,
    }
  },
  props: ['url'],
  components: {
    'cms-toolbar': CmsToolbar
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    update(row) {//更新
      this.$refs['table'].clearSelection(data.table.selects[this.url])
      data.table.selects[this.url] = []      
      data.table.selects[this.url][0] = row
      bus.$emit('updateRow', this.url)
      this.$router.push({
        path: this.url + '/update',
        query: {
          t: +new Date()
        }
      })
    },
    deleteRow(row){//删除操作
      data.table.selects[this.url] = []      
      data.table.selects[this.url][0] = row
      bus.$emit('updateRow', this.url)
      action.delete(this.url)
    },
    handleSelectionChange(selection) {//处理状态改变的行
    },
    //处理用户点击事件，保存用户选择，用于更新或者删除
    select(selection, row) { //selection表示当前已经选择的所有行，而row表示当前选择的一行
      data.table.selects[this.url] = selection
      if (selection.length === 1) bus.$emit('updateRow', this.url)
    },
    filterHandler(value, row, column) {//过滤器，没用到
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange(val) {//处理用户点击分页大小，即每页的大小
      let t = this
      this.page.pageSize = val
      //通过api/request.js中定义的axios方法来请求数据
      request.get(this.url + '/get?currentPage=' + this.page.currentPage + "&pageSize=" + this.page.pageSize).then(function (response) {
        //将数据保存到当前table的局部变量中
        t.tableData = response.data.data.content
        //将数据保存到全局变量中，由于与其它组件进行共享，同时作为缓存，减少不必要的请求操作
        //保存的key是为当前路由的资源名称，如/api/v1/cms/system,而system这个资源可以有get,create,update,delete等操作
        data.table.tables[t.url] = t.tableData
      }).catch(function (err) {//请求错误
        alert(err)
      })
    },
    handleCurrentChange(val) {//处理用户点击某一页
      let t = this
      this.page.currentPage = val
      //通过api/request.js中定义的axios方法来请求数据
      request.get(this.url + '/get?currentPage=' + this.page.currentPage + "&pageSize=" + this.page.pageSize).then(function (response) {
        //将数据保存到当前table的局部变量中
        t.tableData = response.data.data.content
        //将数据保存到全局变量中，由于与其它组件进行共享，同时作为缓存，减少不必要的请求操作
        //保存的key是为当前路由的资源名称，如/api/v1/cms/system,而system这个资源可以有get,create,update,delete等操作
        data.table.tables[t.url] = t.tableData
      }).catch(function (err) {
        alert(err)
      })
    }
  },
  created() {//在创建后，初始化相关数据，这个是Vue组件生命周期中的一环，每一个组件加载时都只会调用一次
    let t = this
    if('undefined' !== typeof (data.table.tables[this.url])){//判断当前数据是否已经加载，有则直接获取并赋给当前table作为局部变量
      this.tableData = data.table.tables[this.url]
      this.page.totalNums = this.tableData.length
       if (this.tableData !== null) {//获取第一个数据对象所拥有的属性，从而自动在表格中进行遍历显示，而且使用src/api/map来进行属性映射，如id: 编号
        let obj = this.tableData[0]
        for (let name in obj) {
          this.tableColumn.push(name)
        }
      }
      return;
    }
    request.get(this.url + '/get').then(function (response) {//若是没有数据，则通过请求来获取
      //将数据保存到当前table的局部变量中
      t.tableData = response.data.data.content
      t.page.totalNums = response.data.data.totalNums
      data.table.tables[t.url] = t.tableData
      //获取第一个数据对象所拥有的属性，从而自动在表格中进行遍历显示，而且使用src/api/map来进行属性映射，如id: 编号
      if (t.tableData !== null) {
        let obj = t.tableData[0]
        for (let name in obj) {
          t.tableColumn.push(name)
        }
      }
    }).catch(function (err) {//网络请求发生错误
      alert(err)
    })
  },
  mounted() {//Vue组件挂载时调用，单个生命周期只会调用一次
    //响应表单操作，自动更新列表
    bus.$on('flushTable', (rows, action) => {//使用消息总线来处理不同组件间的通讯
      //创建表单操作后自动更新
      if (action === 'create') {
        this.tableData.push(rows)
        this.page.totalNums += 1
      } else if (action === 'update') {//更新表单后接到事件消息自动更新
        this.tableData.forEach(element => {
          if (element.id === rows.id) {
            element = rows
          }
        });
        //清空选择表格中的选择
        this.$refs['table'].clearSelection(rows)
        //清空用户选择的数据
        data.table.selects[this.url] = []
      } else { //删除操作
        rows.forEach(row => {
          this.tableData.forEach((line, index) => {
            if (line.id === row.id) {
              this.tableData.splice(index, 1)
            }
          });
        });
        //更新相应的数据数量
        this.page.totalNums -= rows.length
        //清空选择及数据
        this.$refs['table'].clearSelection(data.table.selects[this.url])
        data.table.selects[this.url] = []
      }
    })
  }
}
</script>

<style lang="scss">
.cms-table {
  margin: -10px 0px 10px 0px;
}
</style>
