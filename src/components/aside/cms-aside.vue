<template>
  <div class="cms-aside">
    <div class="avatar">
      <a href="#"><img src="../../../static/image/logo.png" alt=""></a>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统菜单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="addTab('/api/v1/cms/system','系统管理')">系统管理</el-menu-item>
          <el-menu-item index="1-2" @click="addTab('/api/v1/cms/menu','菜单管理')">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>类别标签管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="addTab('/api/v1/cms/category','类别管理')">类别管理</el-menu-item>
          <el-menu-item index="2-2" @click="addTab('/api/v1/cms/tag','标签管理')">标签管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>专题文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="addTab('/api/v1/cms/topic','专题管理')">专题管理</el-menu-item>
          <el-menu-item index="3-2" @click="addTab('/api/v1/cms/article','文章管理')">文章管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>评论管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="addTab('/api/v1/cms/comment','评论管理')">评论管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import {Menu, MenuItem, Submenu} from 'element-ui'

import data from '@/api/data'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

export default {
  methods: {
    addTab(targetName, title) {//向cms-main中动态添加tab这个组件
      let hadTab = false
      let newTabName = 0
      data.tab.editableTabs.forEach(element => {//判断此tabf是否已经添加过
        if (element.title === title) {
          hadTab = true
          newTabName = element.name
        }
      })
      if (!hadTab) {//如果没有此tab，则添加此tab组件
        newTabName = ++data.tab.tabIndex + ''
        data.tab.editableTabs.push({//由于使用到了数组，所以将其push，而Vue对数组的Push方法具有响应处理，所以可监听到此变化，从而在cms-main中自动添加tab组件
          title: title,
          name: newTabName,
          content: targetName
        })
      }
      data.tab.editableTabsValue = newTabName  //表示当前触发的tab组件
    },
    handleOpen(key, keyPath) {//菜单组件的方法，可以去element-ui官网看看
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<style lang="scss">
@import url('../../assets/css/common.scss');
.cms-aside {
  .avatar {
    width: 100%;
    height: 100%;
    background-image: url('../../../static/image/cms-avatar-bg.png');
    background-size: 100% 100%;
    img {
      width: 150px;
      height: 150px;
      margin-left: 68px;
      max-width: 100%;
      background: white;
      max-height: 100%;
      border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
    }
  }
}

// Extra small devices (portrait phones, less than 576px)手机
@media (max-width: 575.98px) {
  .el-aside .el-menu {
    collapse: true
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  //14寸电脑
}
</style>
