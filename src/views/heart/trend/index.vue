<template>
  <div class="trend">
    <chart24
      :height="height"
      v-if="height"
    />
    <chart1
      :height="height"
      v-if="height"
    />
    <div
      class="details"
      v-if="height"
    >
      <details-line
        :height="height"
        class="details-line"
        v-loading="!details.showTime"
        :data="details"
        :isOperation='isSelectOperation'
        @nextPage="nextPage"
        @prevPage="prevPage"
      />
      <details-btn
        @selectOperation="selectOperation"
        :isSelectOperation="isSelectOperation"
        :typeData="typeData"
      />
    </div>
  </div>
</template>

<script>
import chart24 from './chart-24'
import chart1 from './chart-1'
import detailsLine from 'components/detailsLine'
import detailsBtn from 'components/detailsLine/rightBtn'

import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      height: null,
      isSelectOperation: false,
    }
  },
  mounted () {
    this.setHeartType()
    this.height = parseInt(document.body.scrollHeight / 4, 10)
  },
  computed: {
    ...mapGetters([
      'typeData',
      'details'
    ])
  },
  methods: {
    nextPage () {

    },
    prevPage () {

    },
    //选中操作按钮
    selectOperation () {
      this.isSelectOperation = !this.isSelectOperation
    },
    ...mapActions([
      'setPointsLine',
      'setHeartType'
    ])
  },
  components: { chart24, chart1, detailsLine, detailsBtn }
}
</script>

<style scoped lang='scss' type='text/css'>
.trend {
  width: 100%;
  min-height: 750px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .details {
    margin: 0 20px;
    display: flex;
    box-sizing: border-box;
    // overflow: hidden;
    width: auto;
    height: auto;
    .details-line {
      width: calc(100% - 300px);
    }
  }
}
</style>
