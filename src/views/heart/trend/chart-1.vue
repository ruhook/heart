<template>
  <div class="scatter-1">
    <el-card v-loading="pointsHour.length === 0">
      <v-chart
        :options="options"
        class="chart"
        :style="`height:${height}px`"
      />
    </el-card>

  </div>
</template>

<script>
import { options_1, setSeries1 } from './config.js'
import { getPointsHour } from 'api'
import { mapGetters } from 'vuex'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: options_1,
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'hour',
      'pointsHour'
    ])
  },
  created () {
  },
  methods: {
    async getPointsHour () {
      let result = await getPointsHour()

      console.log(result)
      let data = result.data.points.map((item, index) => [index, item.y])
      this.data = data
      setSeries1.call(this, data)
    }
  },
  watch: {
    pointsHour (value) {
      let result = []
      let data = value.forEach((item, index) => {
        if (item.y.length === 0)        {
          result.push([index, 0])
          return
        }
        item.y.forEach(item => {
          result.push([index, item])
        })
      })
      setSeries1.call(this, result)
    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.scatter-1 {
  height: auto;
  width: auto;
  margin: 20px;
  margin-top: 10px;

  .chart {
    width: 100%;
    height: auto;
  }
}
</style>
