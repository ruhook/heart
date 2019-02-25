import { getPoints, getPointsHour, getHeartDetails } from 'api'
import dayjs from 'dayjs'

const trend = {
  state: {
    pointsDay: [], //24小时的数据
    day: '', //当天时间戳
    pointsHour: [], //1小时的数据
    hour: '00', //当前的小时数
    hourIndex: 0, //初始化 小时红线的位置
    pointsLine: {}, //20s的数据
  },
  mutations: {
    SET_POINTS_DAY(state, points) {
      state.pointsDay = points
    },
    SET_DAY(state, day) {
      state.day = day
    },
    SET_POINTS_HOUR(state, points) {
      state.pointsHour = points
    },
    SET_HOUR(state, hour) {
      state.hour = hour
    },
    SET_POINTS_LINE(state, points) {
      state.details = points
    },
    SET_HOUR_INDEX(state, index) {
      state.hourIndex = index
    }
  },
  actions: {
    setPointsDay({ commit, dispatch, state }) {
      commit('SET_POINTS_DAY', []) //清除day数据
      commit('SET_POINTS_HOUR', []) //清除hour数据
      commit('SET_DETAILS', {}) //清除详情数据
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getPoints()
          let data = result.data
          commit('SET_POINTS_DAY', data.points)
          commit('SET_DAY', dayjs(data.start * 1000).format("YYYYMMDD"))
          dispatch('setPointsHour', {
            time: `${state.day}${state.hour}`
          })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setPointsHour({ commit, dispatch, state }, { time, index = 0 }) {
      // index 代表10s   360 index 
      commit('SET_POINTS_HOUR', [])
      let day = state.day //日期
      let hour = ('0' + time).substr(-2) // 小时 
      commit('SET_HOUR', hour)
      let s = index % 360
      commit('SET_HOUR_INDEX', s)
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getPointsHour(time)
          let data = result.data
          commit('SET_POINTS_HOUR', data.points)
          dispatch('setPointsLine', data.start * 1000 + s * 10000)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 获取心波详情图
     * @param {*} { commit }
     */
    setPointsLine({ commit, state }, beatTime = 1463359906176) {

      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {

          let options = {
            beatTime: beatTime
          }
          let result = await getHeartDetails(options)
          commit('SET_DETAILS', result.data)
          commit('setSelectBeatTime', result.data.showTime)
          resolve()
        } catch (error) {
          reject(error)
        }
      })

    }
  }
}
export default trend