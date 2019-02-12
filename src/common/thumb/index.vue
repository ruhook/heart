<template>
  <div
    class="thumb-warp"
    :class="{'active':isActive}"
    @click="onClickSelf"
  >
    <v-chart
      :options="options"
      :auto-resize="true"
      class="chart-line"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'


export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.options.series = [
      {
        name: '心电图',
        type: 'line',
        symbol: "none",
        data: this.item.ecgs
      }
    ]
    this.options.visualMap = {
      show: false,
      dimension: 0,
      pieces: [{
        lte: this.item.beatStartIndex,
        color: this.showColor[1]
      }, {
        gt: this.item.beatStartIndex,
        lte: this.item.beatEndIndex,
        color: this.showColor[0]
      }, {
        gt: this.item.beatEndIndex,
        color: this.showColor[1]
      }]
    }
  },
  methods: {
    onClickSelf () {
      this.$emit('clickThumb')
    }
  },
  data () {
    return {
      showColor: ['red', 'blue'],
      options: {
        animation: false,
        xAxis: {
          boundaryGap: false,
          show: false,
          data: Array.from({ length: 375 }, item => '')
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: '10%',
          bottom: '10%',
          containLabe: true
        },
        series: [
          {
            type: 'line',
            symbol: "none"
          }
        ]
      }
    }
  },
  watch: {
    isActive () {
      if (!this.isActive)      {
        this.options.series = [
          {
            type: 'line',
            symbol: "none",
            data: this.item.ecgs
          }
        ]
        this.options.visualMap = {
          show: false,
          dimension: 0,
          pieces: [{
            lte: this.item.beatStartIndex,
            color: this.showColor[1]
          }, {
            gt: this.item.beatStartIndex,
            lte: this.item.beatEndIndex,
            color: this.showColor[0]
          }, {
            gt: this.item.beatEndIndex,
            color: this.showColor[1]
          }]
        }
        return
      }
      this.options.series = [
        {
          type: 'line',
          symbol: "none",
          data: this.item.ecgs
        }
      ]
      this.options.visualMap = {
        show: false,
        dimension: 0,
        pieces: [{
          lte: this.item.beatStartIndex,
          color: '#dedede'
        }, {
          gt: this.item.beatStartIndex,
          lte: this.item.beatEndIndex,
          color: '#876876'
        }, {
          gt: this.item.beatEndIndex,
          color: '#dedede'
        }]
      }
    }
  },
}
</script>

<style lang="scss">
.thumb-warp{
  background: #FEFEFE;
  border-radius: 5px;
  transition: all 0.3s;
  &.active {
    background: #8a9eba;
  }
  // width: 360px;
  // overflow: auto;
  .chart-line {
    width:100%;
    height:95px;
    border:1px solid #dedede;
    border-radius: 4px;
  }
  @media screen and (max-width: 1700px) {
    .chart-line {
      width:100%;
      height:90px;
      border:1px solid #dedede;
      border-radius: 4px;
    }
  }
  @media screen and (max-width: 1500px) {
    .chart-line {
      width:100%;
      height:70px;
      border:1px solid #dedede;
      border-radius: 4px;
    }
  }
}
  

</style>