<template>
  <div class="shebeiguanli">
    <div class="table-warp">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="用户名"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="equipment"
          label="设备名称"
          width="260"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
        >
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
export default {
  data () {
    return {
      current: 1,
      total: 40,
      tableData: [{
        name: '王小虎',
        equipment: '设备名称',
        date: '2016-05-04'
      }, {
        name: '王小虎',
        equipment: '设备名称',
        date: '2016-05-04'
      }, {
        name: '王小虎',
        equipment: '设备名称',
        date: '2016-05-04'
      },]
    }
  },
  methods: {
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

    },
    handleClick(){
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
