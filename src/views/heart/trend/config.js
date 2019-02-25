import store from 'store'
import dayjs from 'dayjs'

export const options_24 = {
  animation: false,
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    enterable: true,
    confine: true,
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(245,8,26,0.7)',
        width: 2
      }
    },
    formatter(param) {
      param = param[0]
      // 获取小时区间  
      let hour = ('000' + parseInt((param.data[0] / 360), 10)).substr(-2)
      console.log(param)
      let time = `${store.state.trend.day}${hour}`
      store.dispatch('setPointsHour', { time, index: param.data[0] })

      // if (_time === time) return //时间区间没有发生变化 直接return
      // _time = time
      return
      // return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    scale: true,
    type: 'category',
    data: Array.from({ length: 8641 }, (item, index) => ((index / 720).toString().length === 1 || (index / 720).toString().length === 2) ? ('000' + index / 720 * 2).substr(-2) + ':00:00' : ''),
    axisLabel: {
      interval: 719,
      align: 'center'
    },
    axisPointer: {
      value: 0,
      lineStyle: {
        color: 'rgba(245,8,26,0.7)',
        width: 2
      },
      label: {
        show: false
      },
      handle: {
        show: true,
        color: 'transparent'
      }
    },
  },
  yAxis: {
    scale: true,
    splitLine: { show: false },
    type: 'value',
    // boundaryGap: [0, '100%'],
    minInterval: 50,
    min: 0,
    max: 300,
    axisPointer: {
      snap: true
    }
  },
  grid: {
    show: false,
    left: '50px',
    right: '50px',
    top: '10px',
    bottom: '30px',
    containLabe: true
  },
  series: [{
    type: 'scatter',
    animation: false,
  }]
}

export const options_1 = Object.assign(JSON.parse(JSON.stringify(options_24)), {
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    enterable: true,
    confine: true,
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(245,8,26,0.7)',
        width: 2
      }
    },
    formatter(param) {
      param = param[0]
      let date = `${store.state.trend.day}`
      let dayhour = dayjs(date).valueOf() + store.state.trend.hour * 3600000 // 获取当天+小时的时间戳
      let fen = parseInt(param.data[0], 10) * 10000 // 获取分钟所占的时间戳

      let _date = dayhour + fen //  时间戳
      store.dispatch('setPointsLine', _date)
      return
      // return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    scale: true,
    type: 'category',
    data: Array.from({ length: 361 }, (item, index) => {
      let hour = store.state.trend.hour
      let fen = ('000' + (index / 30) * 5).substr(-2)
      if (fen == 60) {
        hour++
        fen = '00'
      }
      return ((index / 30).toString().length === 1 || (index / 30).toString().length === 2) ? `${hour}:${fen}:00` : ''
    }),
    axisLabel: {
      interval: 29,
      align: 'center'
    },
    axisPointer: {
      value: 0,
      lineStyle: {
        color: 'rgba(245,8,26,0.7)',
        width: 2
      },
      label: {
        show: false
      },
      handle: {
        show: true,
        color: 'transparent'
      }
    },
  },
})

export function setSeries(data) {
  // data = data.slice(0,20000)
  this.options.series = [{
    type: 'scatter',
    animation: false,
    data: data,
    symbolSize: 2,
    itemStyle: {
      color: '#000',
    }
  }]
}

export function setSeries1(data) {
  // data = data.slice(0,20000)
  this.options.xAxis = {
    data: Array.from({ length: 361 }, (item, index) => {
      let hour = store.state.trend.hour
      let fen = ('000' + (index / 30) * 5).substr(-2)
      if (fen == 60) {
        hour = ('000' + (parseInt(hour, 10) + 1)).substr(-2)
        fen = '00'
      }
      return ((index / 30).toString().length === 1 || (index / 30).toString().length === 2) ? `${hour}:${fen}:00` : ''
    }),
    axisPointer: {
      value: store.state.trend.hourIndex || 0,
      lineStyle: {
        color: 'rgba(245,8,26,0.7)',
        width: 2
      },
      label: {
        show: false
      },
      handle: {
        show: true,
        color: 'transparent'
      }
    },
  }
  this.options.series = [{
    type: 'scatter',
    animation: false,
    data: data,
    symbolSize: 2,
    itemStyle: {
      color: '#000',
    }
  }]
}