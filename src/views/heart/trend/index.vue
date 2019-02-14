<template>
  <div class="trend">
    <chart24/>
    <chart1/>

  </div>
</template>

<script>
import chart24 from './chart-24'
import chart1 from './chart-1'

export default {
  data () {
    return {
    }
  },

  components:{chart24,chart1}
}
</script>

<style scoped lang='scss' type='text/css'>
.trend{
  width: 100%;
  
}

</style>
