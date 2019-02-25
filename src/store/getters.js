const getters = {
  thumbsTotal: state => state.mould.thumbsTotal,
  typeData: state => state.mould.typeData,
  typeShow: state => state.mould.typeShow,
  selectType: state => state.mould.selectType,
  thumbs: state => state.mould.thumbs,
  activeThumb: state => state.mould.activeThumb,
  details: state => state.mould.details,
  selectDetail: state => state.mould.selectDetail,
  selectBeatTime: state => state.mould.selectBeatTime,
  isIn:state => state.mould.isIn,
  
  pointsDay: state => state.trend.pointsDay,
  pointsHour: state => state.trend.pointsHour,
  pointsLine: state => state.trend.pointsLine,
  day: state => state.trend.day,
  hour: state => state.trend.hour,
  hourIndex: state => state.trend.hourIndex,
}

export default getters