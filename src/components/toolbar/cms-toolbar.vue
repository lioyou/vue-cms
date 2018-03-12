<template>
  <div class="cms-toolbar">
    <li v-for="(action,index) in actions" :key='index' :action="action">
      <a @click="handleClick(formUrl+ '/' + action)">{{map[action]}}</a>
    </li>
    <router-view :name="formUrl"></router-view>
  </div>
</template>

<script>
 import Vue from 'vue'
 import {Button,ButtonGroup, MessageBox } from "element-ui"

 import map from '@/api/map'
 import data from '@/api/data'
 import request from '@/api/request'
 import bus from '@/api/bus'
 import action from '@/api/action'
 
 Vue.use(Button)
 Vue.use(ButtonGroup)
export default {
  name: 'cms-toolbar',
  props: ['actions', 'formUrl'],
  data() {
    return {
      map: map,
      context: this,
    }
  },
  methods: {
    handleClick(url) {//处理用户的操作事件
      let indexDelete = url.indexOf('delete')
      if (indexDelete !== -1) { //删除操作
        let key = url.slice(0, indexDelete - 1)
        if ('undefined' !== typeof (data.table.selects[key]) &&
          data.table.selects[key].length !== 0) { //判断当前用户是否已经选择了数据
          action.delete(key)//调用src/api/action中的delete方法来执行删除
        } else { //提示用户选择数据
          MessageBox({
            type: 'error',
            message: '请选择至少一条数据'
          })
        }
      } else {//创建或者更新操作，导向相应的组件
        this.$router.push({
          path: url,
          query: {
            t: +new Date()
          },
        })
      }
    }
  }
}

</script>
<style lang="scss">
.cms-toolbar {
  margin: 10px 0px 0px 0px;
  li {
    list-style-type: none;
    float: left;
    margin: 0 5px;
    a {
      color: #fff;
      background-color: #409EFF;
      border-color: #409EFF;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 10px 15px;
      font-size: 14px;
      border-radius: 4px;
      text-decoration: none;
    }
    a:hover {
      opacity: 0.8;
    }
  }
}
</style>