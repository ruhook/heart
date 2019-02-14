<template>
  <div class="shebeiguanli">
    <div class="table-warp">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="设备ID"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="utcCreate"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="deviceStatusStr"
          label="设备状态"
          width="260"
        >
          <!-- <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              size="small"
            >查看数据</el-button>
          </template> -->
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push(`/offlineData/${scope.row.deviceName}`)"
              size="small"
            >查看数据</el-button>
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
import { getDevice } from "api/admin"

export default {
  data () {
    return {
      current: 1,
      total: 0,
      tableData: []
    }
  },
  metaInfo: {
    title: '心电图后台管理-设备管理'
  },
  mounted() {
    this._getDevice()
  },
  methods: {
    async _getDevice (pageNum, pageSize) {
      let result = await getDevice(pageNum, pageSize)

      this.tableData = result.resultData
      this.total = result.total
    },
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

    },
    handleClick () {
      this.$router.push('/offlineData/1')
    }
  },

}
</script>

<style scoped lang='scss' type='text/css'>
.shebeiguanli{
  width: 100%;
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
