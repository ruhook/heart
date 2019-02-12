import Vue from 'vue'
import Router from 'vue-router'
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
    path: 'offlineData/:id',
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
    path: '/mould',
    name: 'mould',
    component: Mould,
  }, {
    path: '/trend',
    component: Trend
  }, {
    path: '/report',
    component: Report
  }]
}]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: adminRouter.concat(heartRouter)
})