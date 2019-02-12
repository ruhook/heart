<template>
  <div
    class="state-warp"
    :class="[{'state-second':waveTotal>=5000 && waveTotal<9999},{'state-three': waveTotal>=9999},{'active':waveNo == selectType.id}]"
    @click="onClickType(item)"
  >
    <i class="el-icon-d-arrow-right" @click.stop="toChangeType(item)"></i>
    <span class="serialNumber">{{waveNo}}</span>
    <span class="amount">{{waveTotal}}个</span>
    <v-chart
      :options="options"
      class="chart-line"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapActions,mapGetters,mapMutations } from 'vuex'
export default {
  props: {
    item:{
      default:function(){
        return {}
      }
    },
    type: {
      default: null
    },
    waveNo: {
      default: ''
    },
    waveTotal: {
      default: ''
    },
    data: {
      default: function () {
        return [-201, -247, -66, -205, 30, 1826, 8156, 12459, 13465, 10402, 4680, 2, -765, -2253, -3487, -4734, -5355, -5393, -4314, -2208, -517, -41, 69, -3, 71]
      }
    },
    waveId: {
      default: ''
    }
  },
  data () {
    return {
      dialogTableVisible:false,
      options: {
        animation: false,
        xAxis: {
          boundaryGap: false,
          show: false,
          data: Array.from({ length: 25 }, item => '')
        },
        yAxis: {
          show: false
        },
        grid: {
          left: '20%',
          right: '20%',
          top: '10%',
          bottom: '10%',
          containLabe: true
        },
        series: [
          {
            name: '心电图',
            type: 'line',
            symbol: "none",
            data: this.data,
            itemStyle: {
              normal: {
                color: this.waveTotal >= 5000 ? '#FFF' : '#8a9eba'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    onClickType (id) {
      this.setSelectType(id)
      this.handleClickThumbs('reset')
    },
    toChangeType(item){
      this.$emit('getItem',item)
      this.setTypeShow(true)
    },
    ...mapActions([
      'setSelectType',
      'handleClickThumbs'
    ]),
    ...mapMutations([
      'setTypeShow'
    ])
  },
  computed: {
    ...mapGetters([
      'selectType'
    ])
  },
}
</script>

<style lang="scss">
.state-warp{
  position: relative;
  background: #e0ebfc;
  margin-top: 5px;
  border-radius: 5px;
 
  /deep/.el-collapse-item__wrap{
    overflow: auto;
  }
  &.active{
    box-shadow: 0 0 20px red;
  }
  &.state-second{
    background: #8a9eba;
    span{
      color: #FFF;
    }
  }
  &:hover {
    .el-icon-d-arrow-right{
      opacity: 1;
    }
  }
  .el-icon-d-arrow-right{
    opacity: 0;
    position: absolute;
    top:50%;
    right: 10px;
    font-size: 30px;
    margin-top: -10px;
    z-index: 9;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: blue;
    }
  }
  &.state-three{
    background: #3b4d68;
    span{
      color: #FFF;
    }
  }
  .chart-line {
    width:320px;
    height:100px;
    border:1px solid #dedede;
    border-radius: 4px;
  }
  .serialNumber{
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .amount{
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
  

</style>