<template>
  <div id="cms-admin">
    <el-container id="cms-page">
      <el-header id="cms-header" class="cms-header">
        <cms-menu>
        </cms-menu>
      </el-header>
      <el-container id="cms-body" class="cms-body">
        <el-aside class="cms-aside">
          <cms-aside>
          </cms-aside>
        </el-aside>
        <el-main class="cms-main">
          <cms-main>
          </cms-main>
        </el-main>
      </el-container>
      <el-footer id="cms-footer" class="cms-footer">Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import { Container, Header, Aside, Main, Footer } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import CmsMenu from '@/components/header/cms-menu'
import CmsAside from '@/components/aside/cms-aside'
import CmsMain from '@/components/main/cms-main'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

export default {
  name: 'Index',
  components: {
    'cms-menu': CmsMenu,
    'cms-aside': CmsAside,
    'cms-main': CmsMain
  }
}
</script>

<style lang="scss">
//导入默认的统一样式文件，由于element-ui本身样式已经挺好的，所以这个文件的作用目前还没有体现，可以直接忽略
@import url('../../assets/css/common.scss');
//接下来这些都是为了响应式而准备的，由于当前只是在电脑上，所以并没有编写移动手机端的，如果需要请自行编写
// Extra small devices (portrait phones, less than 576px)手机
@media (max-width: 575.98px) {
  .cms-header {
    height: 50px;
    width: 100%;
    text-align: right;
  }
  .cms-body {
    width: 100%;
    height: 800px;
    .cms-aside {
    }
    .cms-main {
    }
  }
  .cms-footer {
    width: 100%;
    height: 50px;
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) {
  .cms-header {
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) {
  .cms-header {
  }
}

// Large devices (desktops, 992px and up)IPad
@media (min-width: 992px) and (max-width: 1199.98px) {
  .cms-header {
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  //14寸电脑
  body {
    margin: 0px;
    padding: 0px;
    webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    .cms-header {
      height: 50px;
      width: 100%;
      padding: 0px;
    }
    .cms-body {
      width: 100%;
      z-index: 2001;
    }
    .cms-footer {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
