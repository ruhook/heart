<template>
  <div class="report">
    <el-card class="box-card">
      <h-line />
      <pre>
  开始/结束  时间：{{beatInfo.starttime}}/{{beatInfo.endtime}}            最快心率：{{beatInfo.maxbpm}}bpm，（{{beatInfo.maxbpmtime}}）
  记录总时间：  秒            最慢心率：{{beatInfo.minbpm}}bpm，（{{beatInfo.minbpmtime}}）
  总心搏数：{{beatInfo.beattotal}}次
</pre>
      <h-line />
      <pre>
  ---室性心律失常---
  室性心搏总数：{{info3.count}}    单个室早： 阵          成对室早： 阵         室性二联律： 阵
  室速： 阵，共 次，最快{{info3.maxbpm}}bpm，发生时间：{{info3.maxbpmtime}}   最长 秒，最快频率 bpm，发生时间：
  平均每小时室早：            一小时最多室早： ，发生时间： 
</pre>
      <h-line />
      <pre>
  ---室上性心律失常---
  室上性心搏总数：{{info2.count}}     单个室上早： 阵          成对室上早： 阵         室上性二联律： 阵
  室上速： 阵，共 次，最快{{info2.maxbpm}}bpm，发生时间：{{info2.maxbpmtime}}   最长 秒，最快频率 bpm，发生时间：
  平均每小时室上早：           一小时最多室上早：，发生时间：
  房颤： 阵，最长 秒，起始于：    终止于： 
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

    <h-table :list="hourInfos" />

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
import { getReport, sendMessage } from 'api'

export default {
  data () {
    return {
      textarea: '',
      beatInfo: {},
      info2: {},
      info3: {},
      hourInfos: []
    }
  },
  metaInfo: {
    title: '心电图-报告'
  },
  mounted () {
    this._getReport()
  },
  methods: {
    async _getReport () {
      let result = await getReport()

      this.beatInfo = result.data.beatInfo
      let beatTypeInfos = result.data.beatTypeInfos
      this.info2 = beatTypeInfos.filter(item => item.beatType === 2)[0] || {}
      this.info3 = beatTypeInfos.filter(item => item.beatType === 3)[0] || {}

      this.hourInfos = result.data.hourInfos
    },
    async sendMessage (msg) {
      let result = await sendMessage(msg)

      this.$message({
        type: 'success',
        message: '发送成功!'
      });
    },
    push () {
      if (!this.textarea)      {
        this.$notify.error({
          title: '提示',
          message: '下发报告内容不能为空'
        });
        return
      }
      this.$confirm('是否要发送报告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendMessage(this.textarea)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    }
  },
  components: { hLine, hTable }
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
