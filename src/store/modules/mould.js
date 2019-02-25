import { getHeartType, getHeartThumbs, getHeartDetails, addEcg, updateEcg, deleteEcg } from 'api'
import Vue from 'vue'
let vue = new Vue()


const mould = {
  state: {
    selectType: {},
    detailsNeedType: null,
    typeData: [],
    thumbs: [], // 缩略图的数据
    thumbsTotal: 0,
    activeThumb: {}, //选中的缩略图
    thumbLoading: true,
    details: {}, //详情图的数据
    selectDetail: {}, //选中的详情的点 默认beatTime的点
    selectBeatTime: null,
    isIn: false,
    typeShow: false,
    firstGetDetails: true
  },
  mutations: {
    SET_HEART_TYPE(state, data) {
      state.typeData = data
    },
    SET_SELECT_TYPE(state, type) {
      state.selectType = type
      //模拟ajax请求 去改变 thumbs
    },
    SET_DETAIL_NEED_TYPE(state, type) {
      state.detailsNeedType = type
    },
    SET_THUMBS(state, thumbs) {
      state.thumbs = thumbs
    },
    SET_THUMBS_TOTAL(state, total) {
      state.thumbsTotal = total
    },
    SET_ACTIVE_THUMB(state, thumb) {
      state.activeThumb = thumb
    },
    SET_DETAILS(state, details) {
      state.details = details
    },
    SET_SELECT_DETAIL(state, selectDetail) {
      state.selectDetail = selectDetail[0] || {}
    },
    setSelectBeatTime(state, beatTime) {
      state.selectBeatTime = beatTime
    },
    SET_IS_IN(state, isIn) {
      state.isIn = isIn
    },
    setTypeShow(state, typeShow) {
      state.typeShow = typeShow
    },
    setFirstGetDetails(state, firstGetDetails) {
      state.firstGetDetails = firstGetDetails
    }
  },
  actions: {
    setChangedTypes({ commit, dispatch, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getHeartType()
          let data = result.data

          commit('SET_HEART_TYPE', data)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 获取模块首次加载数据
     * 1、心波类型数据
     * 2、默认首个心波类型的缩略图数据
     * 3、默认时间戳的心波详情数据
     */
    getInitData() {
      //心波类型
      //缩略图
      //详情图
    },
    /**
     * 获取心波类型
     * @param {*} { commit }
     */
    setHeartType({ commit, dispatch, state }) {
      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getHeartType()
          let data = result.data

          commit('SET_HEART_TYPE', data)
          //只有第一次进入页面的时候 初始 type 为 获取的   之后都是点击缩略图之后 修改 
          if (state.firstGetDetails) {
            commit('SET_DETAIL_NEED_TYPE', data[0].graphs[0].id)
          }
          commit('SET_SELECT_TYPE', data[0].graphs[0])
          //初始 加载根据数据类型获取的第一个的类型id 去请求 缩略图
          dispatch('setHeartThumbs', { beatGraphId: state.selectType.id })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 获取心波缩略图
     * @param {*} { commit }
     */
    setHeartThumbs({ commit, dispatch, state }, { beatGraphId, pages = 1 }) {
      commit('SET_THUMBS', [])
      return new Promise(async (resolve, reject) => {
        try {
          let result = await getHeartThumbs(beatGraphId, pages)
          let resultData = result.resultData
          let total = result.total
          commit('SET_THUMBS', resultData)
          commit('SET_THUMBS_TOTAL', total)
          if (state.firstGetDetails) {
            commit('SET_ACTIVE_THUMB', { index: 0, ...result.resultData[0] })

            commit('setFirstGetDetails', false)
            dispatch('setHeartDetails')
          }
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
    setHeartDetails({ commit, state }, beatTime) {
      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {
          commit('setSelectBeatTime', state.activeThumb.beatTime)

          let options = {
            beatTime: beatTime || state.activeThumb.beatTime
          }
          let result = await getHeartDetails(options)
          // let resultData = result.resultData
          // let total = result.total

          commit('SET_DETAILS', result.data)

          commit(
            'SET_SELECT_DETAIL',
            result.data.beats.filter(item => {
              return item.beatTime === result.data.showTime
            })
          )

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 获取心波详情图  -- 翻页
     * @param {*} { commit }
     */
    setHeartChangeDetails({ commit, state }) {
      commit('SET_DETAILS', {})
      return new Promise(async (resolve, reject) => {
        try {
          let options = {
            beatTime: state.selectBeatTime
          }
          let result = await getHeartDetails(options)
          // let resultData = result.resultData
          // let total = result.total
          commit('SET_DETAILS', result.data)
          // commit('SET_ACTIVE_THUMB', {})
          // commit(
          //   'SET_SELECT_DETAIL',
          //   result.data.beats.filter(item => {
          //     return item.beatTime === result.data.showTime
          //   })
          // )

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    //新增ecg-准备工作
    async setAddEcgReady({ commit, state, dispatch }, from = 'mould') {
      let result = await dispatch('getIsIn', from)
      return new Promise(async (resolve, reject) => {
        if (state.isIn.length !== 0) {
          vue.$notify.error({
            title: '新增失败',
            message: '目前所处位置有心跳点存在，不可新增，请重新选择位置'
          })
          resolve({
            success: false
          })
        }
        resolve({
          success: true
        })
      })
    },
    async setAddEcg({ commit, state, dispatch }, { beatGraphId, from = 'mould' }) {
      return new Promise(async (resolve, reject) => {
        try {
          let data = state.selectDetail
          let index = data.dataIndex || 1250
          let start = state.details.start
          let options = {
            beatTime: start + 8 * index,
            beatGraphId
          }

          let result = await addEcg(options)

          resolve({
            success: true,
            beatTime: options.beatTime
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    //修改ecg
    async setUpdateEcgReady({ commit, state, dispatch }, from = 'mould') {
      let result = await dispatch('getIsIn', from)
      return new Promise(async (resolve, reject) => {
        if (state.isIn.length === 0) {
          vue.$notify.error({
            title: '修改失败',
            message: '目前所处位置没有心跳点存在，不可修改，请重新选择位置'
          })
          resolve({
            success: false
          })
        }
        resolve({
          success: true
        })
      })
    },
    async setUpdateEcg({ commit, state, dispatch }, { beatGraphId, from = 'mould' }) {
      return new Promise(async (resolve, reject) => {
        try {
          let data = state.selectDetail
          let index = data.dataIndex || 1250
          let start = state.details.start
          let options = {
            id: state.isIn[0].beatId,
            beatGraphId
          }
          let result = await updateEcg(options)

          resolve({
            success: true,
            beatTime: state.details.start + 8 * index,
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    //删除ecg
    async setDeleteEcg({ commit, state, dispatch }, from = 'mould') {
      let result = await dispatch('getIsIn', from)
      if (state.isIn.length === 0) {
        vue.$notify.error({
          title: '删除失败',
          message: '目前所处位置没有心跳点存在，不可删除，请重新选择位置'
        })
        Promise.resolve({
          success: false
        })
      }


      // deleteEcg
      return new Promise((resolve, reject) => {
        vue.$confirm('确认删除这条心跳？').then(async _ => {
            try {
              let options = {
                id: state.isIn[0].beatId
              }
              let result = await deleteEcg(options.id)

              resolve({
                success: true,
                beatTime: state.details.start
              })
            } catch (error) {
              reject(error)
            }
          })
          .catch(_ => {});
      })
    },
    getIsIn({ commit, state, dispatch }, from) {
      return new Promise((resolve, reject) => {
        let data = state.selectDetail
        let dataIndex = state.selectDetail.dataIndex
        let startTime = state.details.start
        let beats = state.details.beats
        //计算 标注线 是否在心跳范围内
        let result = beats.filter(item => {
          if (!dataIndex) {
            return (
              data.startIndex === item.startIndex &&
              data.endIndex === item.endIndex
            )
          }

          return dataIndex > item.startIndex && dataIndex < item.endIndex
        })
        commit('SET_IS_IN', result)
        console.log('isin', result);
        resolve()
      })
    },
    /**
     * @param {*} { commit }
     * @param {String} type
     */
    setSelectType({ commit, dispatch }, type) {
      return new Promise((resolve, reject) => {
        commit('SET_SELECT_TYPE', type)
        dispatch('setHeartThumbs', { beatGraphId: type.id })
        resolve()
      })
    },
    handleClickThumbs({ commit, state }, index) {
      if (index === 'reset') {
        commit('SET_ACTIVE_THUMB', {})
        return
      }
      commit('SET_DETAIL_NEED_TYPE', state.selectType.id)
      commit('SET_ACTIVE_THUMB', {
        index,
        ...state.thumbs[index]
      })
    }
  }
}

export default mould