<template>
  <div class="scatter-1">
    <el-card>
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
      default:0
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
      'hour'
    ])
  },
  created () {
    this.getPointsHour()
  },
  methods: {
    async getPointsHour () {
      let result = await getPointsHour()

      console.log(result)
      let data = result.data.points.map((item, index) => [index, item.y]).slice(0, 86400 / 24)
      this.data = data
      setSeries1.call(this, data)
    }
  },
  watch: {
    hour (value) {
      console.log(value)
      setSeries1.call(this, this.data)
    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.scatter-1{
    height: auto; 
    width: auto;
    margin: 20px;
    margin-top: 10px;

    .chart{
      width: 100%;
      height: auto;
    }
  }
</style>
