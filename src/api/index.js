import { heartType, heartThumbs, planId, heartDetails, ecgAdd, ecgUpdate, ecgDelete, typeUpdate, types, points } from './merge'
import axios from './ajax'

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
    deviceName: options.deviceName,
    beatTime: options.beatTime
  })
}
export function getTypes() {
  return axios(types)
}
export function updateType() {
  return axios(typeUpdate, {
    id: 11,
    beatTypeId: 3
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



export function getPoints() {
  return axios(points, {
    "deviceName":"123456",
    "start":0,
    "end":14633598961761
})
}