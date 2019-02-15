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
      let data = value.map((item, index) => [index, item.y])
      setSeries.call(this, data)
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
