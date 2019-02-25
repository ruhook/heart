import { heartType, heartThumbs, heartDetails, ecgAdd, ecgUpdate, ecgDelete, typeUpdate, types, points, report, message } from './merge'
import axios from './ajax'

const planId = Number(localStorage.getItem('planId')) || null

console.log(planId);
export function getHeartType() {
  return axios(heartType, {
    planId
  })
}

export function getHeartThumbs(beatGraphId, pageNum = 1) {
  return axios(heartThumbs, {
    planId,
    beatGraphId,
    pageSize: 20,
    pageNum
  })
}

export function getHeartDetails(options) {
  return axios(heartDetails, {
    planId,
    beatTime: options.beatTime
  })
}
export function getTypes() {
  return axios(types)
}

export function updateType(id, beatTypeId) {
  return axios(typeUpdate, {
    id,
    beatTypeId
  })
}

export function addEcg(options) {
  return axios(ecgAdd, {
    planId,
    beatTime: options.beatTime,
    beatGraphId: options.beatGraphId
  })
}

export function updateEcg(options) {
  return axios(ecgUpdate, {
    id: options.id,
    beatGraphId: options.beatGraphId
  })
}

export function deleteEcg(id) {
  return axios(ecgDelete, {
    id: id
  })
}


//默认获取24h的
export function getPoints() {
  return axios(points, {
    planId
  })
}
//获取1h的
export function getPointsHour(time) {
  return axios(points, {
    planId,
    time
  })
}

//

export function getReport() {
  return axios(report, {
    planId
  })
}


export function sendMessage(msg) {
  return axios(message, {
    planId,
    message:msg
  })
}