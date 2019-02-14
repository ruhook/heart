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
        color: 'red',
        width: 100
      }
    },
    formatter(param) {
      param = param[0]
      return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
  },
  xAxis: {
    splitLine: { show: false },
    scale: true,
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
    right: 0,
    top: '10px',
    bottom: '10px',
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
        color: 'red',
        width: 100
      }
    },
    formatter(param) {
      param = param[0]
      return param.axisValue + '<br/><i class="el-icon-star-on" style="color:red;margin-right:10px;"></i>' + param.seriesName + ' ' + param.value
    }
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