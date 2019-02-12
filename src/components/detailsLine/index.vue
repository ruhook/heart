<template>
  <div
    class="details-warp"
  >
    <div class="details-warp_auto" ref="warp">
      <div class="addAndreduce">
        <i
          class="el-icon-remove-outline"
          @click="_reduction"
        ></i>
        <span>1</span>
        <i
          class="el-icon-circle-plus-outline"
          @click="_add"
        ></i>
      </div>
      <v-chart
        :options="options"
        class="chart-line"
      />
    </div>

    <!-- {{data}} -->
  </div>
</template>

<script>
import TWEEN from 'tween.js'
import { options, showDetails, add, reduction } from './config.js'

//正常心跳      N
//室上性心跳    V
//室性心跳      S
//噪声（伪差）  X
//逸性心跳      E
//起搏心跳      P
//未知类型      U
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    isOperation: false
  },
  data () {
    return {
      type: {
        1: 'N',
        2: 'V',
        3: 'S',
        4: 'X',
        5: 'E',
        6: 'P',
        7: 'U'
      },
      options
    }
  },
  methods: {
    _add () {
      add.call(this)
    },
    _reduction () {
      reduction.call(this)
    }
  },
  watch: {
    data (newValue) {
      //beatTime居中
      this.data && this.$refs.warp.scrollTo(1251 - this.$refs.warp.clientWidth / 2 + 20, 0)

      showDetails.call(this)
    },
    isOperation (val) {
      showDetails.call(this, val)
    }
  }
}
</script>

<style lang="scss">
.details-warp{
  height: 100%;
  background: #FFF;
  padding: 10px;
  position: relative;
  .details-warp_auto{
  overflow: auto;
    
  }
  .addAndreduce{
    height: 50px;
    width: 120px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    i{
      display: inline-block;
      height: 50px;
      width: 50px;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color:burlywood;
      }
    }
  }
  .chart-line {
    background: url(~@/assets/xin-bg.png);
    width: 2501px;
    height:280px;
    border:1px solid #dedede;
    border-radius: 4px;
  }
}

</style>