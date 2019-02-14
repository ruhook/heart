<template>
  <div class="scatter-24">
    <el-card>
      <v-chart
        :options="options"
        class="chart"
      />
    </el-card>

  </div>
</template>

<script>
import { options_24, setSeries } from './config.js'
import { getPoints } from 'api'

export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      options: options_24
    }
  },
  created () {
    this._getPoints()
  },
  methods: {
    async _getPoints () {
      let result = await getPoints()

      console.log(result)
      let data = result.data.points.map(item => [item.t, item.y])
      setSeries.call(this, data)
    }
  },
}
</script>

<style scoped lang='scss' type='text/css'>
.scatter-24{
    height: 300px; 
    width: auto;
    margin: 30px;
    .chart{
      width: 100%;
      height: 260px;
    }
  }
</style>
