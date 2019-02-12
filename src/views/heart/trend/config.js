export const options_24 = {
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
  },

  series: [{
    type: 'scatter'
  }]
}

export function setSeries(data) {
  data = data.slice(0,200)
  console.log(data)
  this.options.series = [{
    type: 'scatter',
    data:data,
    symbolSize: 1,
    itemStyle: {
      color: '#000',

    }
  }]
}