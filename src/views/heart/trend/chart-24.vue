<template>
  <div class="scatter-24">
    <el-card v-loading="pointsDay.length === 0">
      <v-chart
        :options="options"
        class="chart"
        :style="`height:${height}px`"
      />
    </el-card>

  </div>
</template>

<script>
import { options_24, setSeries } from './config.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    height: {
      type: Number,
      default:0
    }
  },
  data () {
    return {
      options: options_24
    }
  },
  computed: {
    ...mapGetters([
      'pointsDay'
    ])
  },
  created () {
    setTimeout(() => {
      this.setPointsDay()
    }, 300);
  },
  methods: {
    ...mapActions([
      'setPointsDay'
    ])
  },
  watch: {
    pointsDay (value) {
      let result = []
      let data = value.forEach((item, index) => {
        if(item.y.length === 0) {
          result.push([index, 0])
          return
        } 
        item.y.forEach(item=>{
          result.push([index,item])
        })
      })
      setSeries.call(this, result)
    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.scatter-24{
    height: auto; 
    width: auto;
    margin: 20px;
    .chart{
      width: 100%;
      height: auto;
    }
  }
</style>
