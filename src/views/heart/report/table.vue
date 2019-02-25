<template>
  <el-table
    class="table"
    :data="list"
    border
  >
    <el-table-column
      label="时间"
      width="300"
      align="center"
    >
      <template slot-scope="scope">
        {{scope.row.start}} - {{scope.row.end}}
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item,index) in propList"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      align="center"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      propList: [ {
        prop: 'beatCount',
        label: '心搏',
        width: '100',
      }, {
        prop: 'maxbpm',
        label: '最高心率',
        width: '100',
      }, {
        prop: 'minbpm',
        label: '最低心率',
        width: '100',
      }, {
        prop: 'meanbpm',
        label: '平均心率',
        width: '100',
      }, 
      // {
      //   prop: 'date',
      //   label: '室上性单发',
      //   width: '100',
      // }, {
      //   prop: 'date',
      //   label: '室上性成对',
      //   width: '100',
      // }, {
      //   prop: 'date',
      //   label: '室上性连续',
      //   width: '100',
      // }, 
      {
        prop: 'countBeatType2',
        label: '室上性总数',
        width: '100',
      },
      //  {
      //   prop: 'date',
      //   label: '室性单发',
      //   width: '100',
      // }, {
      //   prop: 'date',
      //   label: '室性成对',
      //   width: '100',
      // }, {
      //   prop: 'date',
      //   label: '室性连续',
      //   width: '100',
      // },
       {
        prop: 'countBeatType3',
        label: '室性总数',
        width: '100',
      },]
    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.table{
  background:transparent;
  border: none;
}
</style>
