//cms-登录
export const login = '/user/login'
export const planId = 1

//cms-设备管理
export const device = '/device/page'
export const plan = '/device/plan' //离线数据
export const execPlan = '/ecg/execPlan' // 重新计算
//心电图-首页
export const heartType = '/ecg/queryBeatType' //类型分组
export const heartThumbs = '/ecg/queryBeat' //缩略图
export const heartDetails = '/ecg/showEcgData' //详情图
export const types = '/ecg/beat/types' //获取属性
export const typeUpdate = '/ecg/update/graph' //类型批量操作
export const ecgAdd = '/ecg/beat/add' //新增
export const ecgUpdate = '/ecg/beat/update' //修改
export const ecgDelete = '/ecg/beat/delete' //删除

export const points = '/ecg/beat/points' //1天的散点图


export const report = '/device/getReport' //报告查看
export const message = '/device/sendReport' //下发报告