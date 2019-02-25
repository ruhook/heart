import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
//admin相关模块
import Login from 'views/admin/login'
import Index from 'views/admin/index'
import lixianshuju from 'views/admin/index/lixianshuju'
import shebeiguanli from 'views/admin/index/shebeiguanli'

import heartIndex from 'views/heart'
import Mould from 'views/heart/mould'
import Trend from 'views/heart/trend'
import Report from 'views/heart/report'


Vue.use(Router)

const adminRouter = [{
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/',
  component: Index,
  redirect: '/home',
  children: [{
    path: 'home',
    component: shebeiguanli,
    meta: {
      title: '设备管理',
      icon: 'printer'
    }
  }, {
    path: 'offlineData/:name',
    component: lixianshuju,
    meta: {
      title: '离线数据',
      icon: 'date'
    }
  }]
}]

const heartRouter = [{
  path: '/heart',
  name: 'heartIndex',
  component: heartIndex,
  children: [{
    path: '/mould/:id',
    name: 'mould',
    component: Mould,
  }, {
    path: '/trend/:id',
    name: 'trend',
    component: Trend
  }, {
    path: '/report/:id',
    name: 'report',
    component: Report
  }]
}]

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: adminRouter.concat(heartRouter)
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (!localStorage.getItem('token') && to.name != 'login') {
    NProgress.done()
    next({ path: '/login', replace: false })
  }

  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router