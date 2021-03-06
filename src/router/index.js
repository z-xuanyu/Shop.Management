import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局 */
import Layout from '@/layout'

/**
 * 注意: 子菜单仅在路由children.length> = 1时出现
 * 详细请看: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目不会显示在边栏中（默认为false）如果设置为true，将始终显示根菜单
 * alwaysShow: true               如果未设置alwaysShow，则当项具有多个子路线时，
 *                                它将变为嵌套模式，否则不显示根菜单
 *
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
    icon: 'svg-name'/'el-icon-x' 侧栏中的图标显示
    noCache: true                如果设置为true，将不缓存页面（默认为false）
    affix: true                  如果设置为true，则标签将粘贴在标签视图中
    breadcrumb: false            如果设置为false，则该项将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'  如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: '类别管理', icon: 'el-icon-collection' }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'tag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
      }
    ]

  },
  {
    path: '/unit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'unit',
        component: () => import('@/views/unit/index'),
        meta: { title: '单位管理', icon: 'el-icon-collection-tag' }
      }
    ]

  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'el-icon-s-order' }
      }
    ]

  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'product',
        component: () => import('@/views/product/index'),
        meta: { title: '商品管理', icon: 'el-icon-s-goods' }
      }
    ]

  },
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'member',
        component: () => import('@/views/member/index'),
        meta: { title: '会员管理', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/administrator',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'administrator',
        component: () => import('@/views/administrator/index'),
        meta: { title: 'Admin管理', icon: 'user', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'banner',
        component: () => import('@/views/banner/index'),
        meta: { title: 'Banner管理', icon: 'el-icon-picture' }
      }
    ]

  },
  {
    path: '/navigator',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'navigator',
        component: () => import('@/views/navigator/index'),
        meta: { title: '导航管理', icon: 'el-icon-picture' }
      }
    ]
  },
  {
    path: 'link',
    component: Layout,
    children: [
      {
        path: 'https://www.zhouxuanyu.com',
        meta: { title: '轩钰博客', icon: 'el-icon-paperclip' }
      }
    ]
  },

  // 404页必须放在最后！
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
