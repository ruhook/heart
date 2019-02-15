<template>
  <div class="details-warp">
    <div
      class="details-warp_auto"
      ref="warp"
    >
      <div class="addAndreduce">
        <i
          class="el-icon-remove-outline"
          @click="_reduction"
        ></i>
        <span>{{multiple}}</span>
        <i
          class="el-icon-circle-plus-outline"
          @click="_add"
        ></i>
      </div>
      <div class="chart-warp">
        <div class="left">
          <i
            class="el-icon-arrow-left"
            @click="prev"
          ></i>
        </div>
        <div class="right">
          <i
            class="el-icon-arrow-right"
            @click="next"
          ></i>
        </div>
        <v-chart
          :options="options"
          class="chart-line"
          :style="height?`height:${height}`:'height:280px'"
        />
      </div>

    </div>

    <!-- {{data}} -->
  </div>
</template>

<script>
import TWEEN from 'tween.js'
import { options, showDetails, changeRatio } from './config.js'

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
    height:null,
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
      multiple: 1,
      options
    }
  },
  methods: {
    _add () {
      if (this.multiple === 2)      {
        this.$message.error('已经到达放大的最大倍数了');
        return
      }
      this.multiple = this.multiple + 0.25
      changeRatio.call(this, this.multiple)
    },
    _reduction () {
      if (this.multiple === 0.5)      {
        this.$message.error('已经到达缩小的的最大倍数了');
        return
      }

      this.multiple = this.multiple - 0.25
      changeRatio.call(this, this.multiple)
    },
    next () {
      this.$emit('nextPage')
    },
    prev () {
      this.$emit('prevPage')
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
.details-warp {
  height: 100%;
  background: #fff;
  padding: 10px;
  position: relative;
  .details-warp_auto {
    overflow: auto;
  }
  .addAndreduce {
    height: 50px;
    width: 120px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    & > span {
      width: 40px;
      text-align: center;
    }
    i {
      display: inline-block;
      height: 50px;
      width: 50px;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color: burlywood;
      }
    }
  }
  .chart-warp {
    position: relative;
    width: 2501px;
    height: auto;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 40px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 40px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 9;
    }
    i {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($color: #000000, $alpha: 0.4);
      color: #fff;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        transition: all 0.3s;
        background: rgba($color: #000000, $alpha: 0.6);
      }
    }
  }
  .chart-line {
    background: url(~@/assets/xin-bg.png);
    width: 2501px;
    height: 280px;
    border: 1px solid #dedede;
    border-radius: 4px;
  }
}
</style>