import day from 'dayjs'
import store from 'store'
//详情图-配置项
export const options = {
  animation: false,
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    enterable: true,
    confine: true,
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'red',
        width: 2
      }
    },
    formatter(param) {
      store.commit('SET_SELECT_DETAIL', param)
      param = param[0]
      return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    offset: -40,
    type: 'category',
    data: Array.from({ length: 2501 }, (item, index) => index),
    axisLabel: {
      interval: 499,
    },
    axisLine: {
      show: false
    },
    axisPointer: {
      value: 0,
      snap: true,
      lineStyle: {
        color: 'red',
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
    splitLine: { show: false },
    type: 'value',
    // boundaryGap: [0, '100%'],
    minInterval: 5000,
    min: -16000,
    max: 16000,
    axisPointer: {
      snap: true
    }
  },
  grid: {
    show: false,
    left: '50px',
    right: 0,
    top: '10px',
    bottom: '10px',
    containLabe: true
  },

  series: [{
    name: '心电图',
    type: 'line',
    symbol: "none"
  }]
}

export function showDetails(isShowArea) {
  this.options.series = [{
    type: 'line',
    symbol: "none",
    data: this.data.ecgs,
    markArea: {
      itemStyle: isShowArea ? { color: 'rgba(255, 106, 106, 0.5)' } : { color: 'transparent' },
      silent: true,
      label: {
        align: 'center',
        offset: [0, 15]
      },
      data: this.data.beats && this.data.beats.map(item => {
        return [{
          name: this.type[item.beatTypeId],
          xAxis: day(this.data.start + item.startIndex * 8).format('YYYY-MM-DD HH:mm:ss .SSS') + 'ms'
        }, {
          xAxis: day(this.data.start + (item.endIndex >= 2501 ? 2500 : item.endIndex) * 8).format('YYYY-MM-DD HH:mm:ss .SSS') + 'ms'
        }]
      })
    }
  }]

  // 8ms 是一个格子
  this.options.xAxis = {
    splitLine: { show: false },
    offset: -40,
    type: 'category',
    data: Array.from({ length: 2501 }, (item, index) => day(this.data.start + index * 8).format('YYYY-MM-DD HH:mm:ss .SSS') + 'ms'),
    axisLabel: {
      interval: 625,
      align: 'left'
    },
    axisLine: {
      show: false
    },
    axisPointer: {
      value: 1251,
      snap: true,
      lineStyle: {
        color: 'red',
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
}

let min = -16000
let max = 16000
export function changeRatio(ratio) {
  this.options.yAxis = {
    splitLine: { show: false },
    type: 'value',
    minInterval: 5000,
    min:min*ratio,
    max:max*ratio,
    axisPointer: {
      snap: true
    }
  }
}
