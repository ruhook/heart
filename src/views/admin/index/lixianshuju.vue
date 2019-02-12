<template>
  <div class="lixianshuju">
    <div class="name">王小虎的离线数据</div>
    <div class="table-warp">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="260"
        >
        </el-table-column>
        <el-table-column
          width="260"
          prop="endTime"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="dataState"
          label="数据状态"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.dataState === '正在采集' ? '' : scope.row.dataState === '未编辑' ?  'danger': 'success' ">{{scope.row.dataState}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              size="small"
            >查看心电图</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[20, 30, 50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      current: 1,
      total: 40,
      tableData: [{
        startTime: '2016-05-04 00:00:00',
        endTime: '2016-05-04 23:59:59',
        dataState: '正在采集'
      }, {
        startTime: '2016-05-04 00:00:00',
        endTime: '2016-05-04 23:59:59',
        dataState: '未编辑'
      }, {
        startTime: '2016-05-04 00:00:00',
        endTime: '2016-05-04 23:59:59',
        dataState: '已编辑'
      },]
    }
  },
  methods: {
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

    },
    handleClick(){
      window.open('/mould')
    }
  },
}
</script>

<style scoped lang='scss' type='text/css'>
.lixianshuju{
  width: 100%;
  .name{
    height: 50px;
    width: auto;
    margin: 20px;
    background: #FFF;
    line-height: 50px;
    padding-left: 20px;
    font-size: 26px;
  }
  .table-warp{
    margin: 20px;
    padding: 20px;
    background: #FFF;
  }
  .block {
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    /deep/ .el-pagination{
      margin: 0 auto;
    }
    .demonstration {
      font-size: 14px;
    }
  }
}
</style>
