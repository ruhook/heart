<template>
  <div class="trend">
    <div class="scatter-24">
      <v-chart
        :options="options"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import { getPoints } from 'api'
import { options_24, setSeries } from './config.js'
export default {
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
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.trend{
  width: 100%;
  .scatter-24{
    height: 300px; 
    width: 100%;
    .chart{
      width: 100%;
      height: 300px;
    }
  }
}

</style>
