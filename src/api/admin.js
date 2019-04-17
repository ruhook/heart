import { device, plan, execPlan } from './merge'
import axios from './ajax'


export function getDevice(pageNum = 1, pageSize = 20) {
  return axios(device, {
    pageNum,
    pageSize
  })
}

export function getPlan(deviceName, pageNum = 1, pageSize = 20) {
  return axios(plan, {
    deviceName,
    pageNum,
    pageSize
  })
}

export function postExecPlan(planId) {
  return axios(execPlan, {
    planId
  })
}