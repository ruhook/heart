import { getPoints, getPointsHour, getHeartDetails } from 'api'
import dayjs from 'dayjs'

const trend = {
  state: {
    pointsDay: [], //24小时的数据
    day: '', //当天时间戳
    pointsHour: [], //1小时的数据
    hour: '00', //当前的小时数
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
  },
  actions: {
    setPointsDay({ commit, dispatch, state }) {
      commit('SET_POINTS_DAY', [])
      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getPoints()
          let data = result.data

          commit('SET_POINTS_DAY', data.points)
          commit('SET_DAY', dayjs(data.start).format("YYYYMMDD"))
          dispatch('setPointsLine')
          // //只有第一次进入页面的时候 初始 type 为 获取的   之后都是点击缩略图之后 修改 
          // if (firstGetDetails) {
          //   commit('SET_DETAIL_NEED_TYPE', data[0].graphs[0].id)
          // }
          // commit('SET_SELECT_TYPE', data[0].graphs[0])
          // //初始 加载根据数据类型获取的第一个的类型id 去请求 缩略图
          // dispatch('setHeartThumbs', { beatGraphId: state.selectType.id })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    setPointsHour({ commit, dispatch, state }, time) {
      commit('SET_POINTS_HOUR', [])
      let hour = ('0' + time).substr(-2)
      commit('SET_HOUR', hour)
      dispatch('setPointsLine')
      // return new Promise(async (resolve, reject) => {
      //   try {
      //     let result = await getPointsHour(time)
      //     let data = result.data

      //     commit('SET_POINTS_HOUR', data.points)
      //     commit('SET_DAY', dayjs(data.start).format("YYYYMMDD"))
      //     // //只有第一次进入页面的时候 初始 type 为 获取的   之后都是点击缩略图之后 修改 
      //     // if (firstGetDetails) {
      //     //   commit('SET_DETAIL_NEED_TYPE', data[0].graphs[0].id)
      //     // }
      //     // commit('SET_SELECT_TYPE', data[0].graphs[0])
      //     // //初始 加载根据数据类型获取的第一个的类型id 去请求 缩略图
      //     // dispatch('setHeartThumbs', { beatGraphId: state.selectType.id })
      //     resolve()
      //   } catch (error) {
      //     reject(error)
      //   }
      // })
    },
    /**
     * 获取心波详情图
     * @param {*} { commit }
     */
    setPointsLine({ commit, state }, beatTime = 1463359906176) {

      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {
          // commit('setSelectBeatTime', state.activeThumb.beatTime)

          let options = {
            beatTime: beatTime
          }
          let result = await getHeartDetails(options)
          commit('SET_DETAILS', result.data)

          resolve()
        } catch (error) {
          reject(error)
        }
      })

    }
  }
}
export default trend