<template>
  <div class="lixianshuju">
    <div class="name">{{deviceName}}的离线数据</div>

    <div
      class="table-warp"
      v-loading="loading"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="planTime"
          label="数据日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="ecgBeatCount"
          label="当天心跳次数"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ecgBeatGraphCount"
          label="归类数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ecgRawPacketCount"
          label="接受数据包数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="数据状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 0 
              ? '' 
              : scope.row.status === 1 
                ? 'danger'
                : 'success' ">{{statusList[scope.row.status]}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1 || scope.row.status === 2"
              type="primary"
              @click="_postExecPlan(scope.row.id)"
              size="small"
            >重新计算</el-button>
            <el-button
              v-if="scope.row.status!==0"
              @click="handleClick(scope.row.id)"
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
import { getPlan, postExecPlan } from 'api/admin'

export default {
  data () {
    return {
      deviceName: '',
      current: 1,
      total: 0,
      tableData: [],
      statusList: ['数据上传中', '数据未编辑', '数据已经编辑'],
      loading: true
    }
  },
  metaInfo: {
    title: '心电图后台管理-离线数据'
  },
  mounted () {
    let deviceName = this.$route.params.name
    this.deviceName = deviceName
    this._getPlan(this.deviceName)
  },
  methods: {
    async _getPlan (deviceName, pageNum, pageSize) {
      let result = await getPlan(deviceName, pageNum, pageSize)

      this.tableData = result.resultData
      this.total = result.total
      this.loading = false
    },
    async _postExecPlan (planId) {
      this.loading = true
      let result = await postExecPlan(planId)

      this.$notify({
        title: '提示',
        message: '离线数据重新计算成功',
        type: 'success'
      });
      this._getPlan(this.deviceName)
    },
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

    },
    handleClick (id) {
      localStorage.setItem('planId', id)
      window.open(`/#/mould/${id}`)
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
