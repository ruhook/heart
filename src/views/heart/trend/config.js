import store from 'store'
let _time = null
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
      let hour = ('000' + parseInt((param.dataIndex / 3600), 10)).substr(-2)
      let time = `${store.state.trend.day}${hour}`
      if (_time === time) return //时间区间没有发生变化 直接return
      _time = time
      store.dispatch('setPointsHour', time)
      return
      // return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    scale: true,
    type: 'category',
    data: Array.from({ length: 86400 }, (item, index) => ((index / 7199).toString().length === 1 || (index / 7199).toString().length === 2) ? ('000' + index / 7199 * 2).substr(-2) + ':00:00' : ''),
    axisLabel: {
      interval: 7198,
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
      console.log(param)
      // 获取小时区间  
      let hour = parseInt((param.dataIndex / 3600), 10);
      return
      // return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    scale: true,
    type: 'category',
    data: Array.from({ length: 3600 }, (item, index) => {
      let hour = store.state.trend.hour
      let fen = ('000' + (index / 299) * 5).substr(-2)
      if (fen == 60) {
        hour++
        fen = '00'
      }
      return ((index / 299).toString().length === 1 || (index / 299).toString().length === 2) ? `${hour}:${fen}:00` : ''
    }),
    axisLabel: {
      interval: 298,
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
    data: Array.from({ length: 3600 }, (item, index) => {
      let hour = store.state.trend.hour
      let fen = ('000' + (index / 299) * 5).substr(-2)
      if (fen == 60) {
        hour = ('000' + (parseInt(hour,10)+1)).substr(-2)
        fen = '00'
      }
      return ((index / 299).toString().length === 1 || (index / 299).toString().length === 2) ? `${hour}:${fen}:00` : ''
    }),
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