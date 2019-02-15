<template>
  <div class="report">
    <el-card class="box-card">
      <h-line />
      <pre>
  开始/结束  时间：15:39:24/14:53:20            最快心率：154bpm，（07:22:28）
  记录总时间：23小时13分0秒            最慢心率：36bpm，（07:22:28）
  总心搏数：89669次
</pre>
      <h-line />
      <pre>
  ---室性心律失常---
  室性心搏总数：4    单个室早：4阵          成对室早：0阵         室性二联律：0阵
  室速：0阵，共0次，最快0bpm，发生时间：   最长0秒，最快频率0bpm，发生时间：
  平均每小时室早：0           一小时最多室早：2，发生时间：16:39-17:39
</pre>
      <h-line />
      <pre>
  ---室上性心律失常---
  室上性心搏总数：4    单个室上早：4阵          成对室上早：0阵         室上性二联律：0阵
  室上速：0阵，共0次，最快0bpm，发生时间：09:58:00   最长85.624秒，最快频率0bpm，发生时间：15：39：24
  平均每小时室上早：23           一小时最多室上早：2，发生时间：16:39-17:39
  房颤：65阵，最长1694.444秒，起始于：21:37:29   终止于：22:05:44
</pre>
      <h-line />
    </el-card>

    <el-input
      class="text"
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>

    <h-table />

    <el-button
      class="btn"
      type="primary"
      @click="push"
    >
      发送报告
    </el-button>
  </div>
</template>

<script>
import hLine from './line'
import hTable from './table'
export default {
  data () {
    return {
      textarea: ''
    }
  },
  metaInfo: {
    title: '心电图-趋势'
  },
  methods: {
    push () {
      this.$confirm('是否要发送报告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发送成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    }
  },
  components: { hLine,hTable }
}
</script>

<style scoped lang='scss' type='text/css'>
.report{
  padding: 30px;
  min-width: 500px;
  width: 100%;
  height: auto;
  min-height: 750px;
  overflow: auto;
  .box-card{
    // display: flex;
    min-height: 360px;
  }
  pre {
    line-height: 1.3;
  }
  .text{
    margin: 20px 0;
    /deep/ textarea{
      resize:none;
      height: 300px;
      line-height: 1.3;
      padding: 20px;
    }
  }
  .btn {
    display: block;
    min-height: 50px;
    width: 500px;
    margin:20px auto 0;
  }
}
</style>
