<template>
  <div class="cms-nav">
    <img class="logo" src="../../../static/image/cms-logo.png" alt="">
    <el-menu class="cms-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <a @click="logout">退出</a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">操作</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import {  Menu,  Submenu,  MenuItem,  MenuItemGroup,  DropdownMenu } from 'element-ui'

import data from '@/api/data'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(DropdownMenu)

export default {
  name: 'cms-menu',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      query: 1
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    logout() {//即出登录用的，这里需要发送的服务端进行真正的退出，实现很容易，使用api/reqeust.js中的axios方法来发送退出请求即可
      //请在此实现真正退出的逻辑，并没有实现哦，
      data.login = false  //前端退出，这个是一个全局的变量，在api/data.js中定义
      this.$router.push('/api/v1/cms/login') //触发一个路由，导向登录组件，并将组件引入到App中的router-view那个声明的位置
    }
  }
}
</script>

<style lang="scss">
@import url('../../assets/css/common.scss');

.cms-header {
  background: #29a176;
  .cms-nav {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    .cms-menu {
      margin: 0px;
      padding: 0px;
      float: right;
      background: none;
      li:hover {
        background: #16815a;
      }
      .el-submenu .el-submenu__title:hover {
        background-color: #16815a;
      }
      .el-menu-item {
        font-size: 1.2em;
        color: white;
      }
      .el-submenu__title {
        font-size: 1.2em;
        color: white;
        
      } 
    }
    li {
      a {
        text-decoration: none;
      }
    }
  }
  .logo {
    width: auto;
    height: auto;
    margin-left: 30px;
    max-width: 100%;
    max-height: 100%;
  }
}

@media (max-width: 575.98px) {}

@media (min-width: 1200px) {
}
</style>
