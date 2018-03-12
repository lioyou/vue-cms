// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// el： 指Vue编译完成之后，需要挂载到#id为app的节点上
//router：指路由器
//compoents指的是当前Vue实例所拥有的组件，在App.vue中定义
// 而这里定义的App.vue这个组件就是主入口，在App.vue这个文件只有一个 <router-view></router-view>
//   这个声明将路由组件默认导入到此，所以Login.vue组件及Index.vue组件也会通过路由解析挂载到此router-view所声明的位置
//   而Index.vue是包含了管理界面的相关组件，包括了cms-header,cms-aside,cms-main,cms-footer
//     从名称就可以理解整个界面的布局了，需要更改可以直接到src/components这个文件夹下对这些文件进行相应的更改
//     这里再介绍一下cms-aside这个文件，这个是菜单栏，通过点击菜单项，从而触发cms-main中内容的更新
//     而cms-main包含了tab（toolbar table pagination)等展示内容的组件
//   而所有的页面组件都是在src/views这个文件夹下，基本的分为form（表单组件），create（显示创建对话框），update（显示修改对话框）
//     删除是直接在表单中或者toolbar组件中，调用api/action.js中的方法来执行删除的
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
