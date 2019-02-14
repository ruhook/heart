<template>
  <div class="scatter-1">
    <el-card>
      <v-chart
        :options="options"
        class="chart"
      />
    </el-card>

  </div>
</template>

<script>
import { options_1, setSeries1 } from './config.js'
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
      options: options_1
    }
  },
  created () {
    this._getPoints()
  },
  methods: {
    async _getPoints () {
      let result = await getPoints()

      console.log(result)
      let data = result.data.points.map(item => [item.t, item.y]).slice(0,86400/24)
      setSeries1.call(this, data)
    }
  },
}
</script>

<style scoped lang='scss' type='text/css'>
.scatter-1{
    height: 300px; 
    width: auto;
    margin: 30px;
    margin-top: 10px;

    .chart{
      width: 100%;
      height: 260px;
    }
  }
</style>
