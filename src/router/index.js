import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CmsLogin from '@/views/login/login'
import CreateSystem from '@/views/system/create'
import UpdateSystem from '@/views/system/update'
import CreateMenu from '@/views/menu/create'
import UpdateMenu from '@/views/menu/update'
import CreateCategory from '@/views/category/create'
import UpdateCategory from '@/views/category/update'
import CreateTag from '@/views/tag/create'
import UpdateTag from '@/views/tag/update'
import CreateTopic from '@/views/topic/create'
import UpdateTopic from '@/views/topic/update'
import Index from '@/components/index/index'
import {Message } from 'element-ui'
import data from '@/api/data'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/api/v1/cms/index',
      component: Index,
      children: [
        {
          path: '/api/v1/cms/system/create',
          components: { '/api/v1/cms/system': CreateSystem },
        },
        {
          path: '/api/v1/cms/system/update',
          components: {
            '/api/v1/cms/system': UpdateSystem
          }
        },
        {
          path: '/api/v1/cms/menu/create',
          components: {
            '/api/v1/cms/menu': CreateMenu
          }
        },
        {
          path: '/api/v1/cms/menu/update',
          components: {
            '/api/v1/cms/menu': UpdateMenu
          }
        },
        {
          path: '/api/v1/cms/category/create',
          components: {
            '/api/v1/cms/category': CreateCategory
          }
        },
        {
          path: '/api/v1/cms/category/update',
          components: {
            '/api/v1/cms/category': UpdateCategory
          }
        },
        {
          path: '/api/v1/cms/tag/create',
          components: {
            '/api/v1/cms/tag': CreateTag
          }
        },
        {
          path: '/api/v1/cms/tag/update',
          components: {
            '/api/v1/cms/tag': UpdateTag
          }
        },
        {
          path: '/api/v1/cms/topic/create',
          components: {
            '/api/v1/cms/topic': CreateTopic
          }
        },
        {
          path: '/api/v1/cms/topic/update',
          components: {
            '/api/v1/cms/topic': UpdateTopic
          }
        }
      ]
    },
    {
      path: '/api/v1/cms/login',
      component: CmsLogin
    }

  ]
})

//全局钩子，在路由传递之前进行拦截
router.beforeEach((to, from, next) => {
  if(data.login !== true && to.path !== '/api/v1/cms/login'){//判断是否已经登录
    next('/api/v1/cms/login')
  }
  //如果是更新操作，查看用户是否已经选择了数据
  let pos = to.path.indexOf('update')
  if (pos !== -1) { //操作是update更新，进行过滤
    let prePath = to.path.slice(0, pos - 1)
    if ('undefined' === typeof (data.table.selects[prePath]) ||
      data.table.selects[prePath].length !== 1) {
      //由于用户没有选择，所以直接对路由进行拦截
      next(false)
      Message({
        message: '请选择一条数据',
        type: 'error'
      })
    } else { //用户已经选择了数据，直接放行
      next()
    }
  } else {//不是Update操作，直接放行
    next()
  }
})

export default router