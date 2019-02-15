<template>
  <el-collapse
    v-model="activeName"
    accordion
  >
    <el-collapse-item
      :title="item.name"
      :name="(index+1).toString()"
      v-for="(item, index) in data"
      :key="index"
    >
      <state
        v-for="(item, index) in item.graphs"
        :item="item"
        :key="index"
        :waveNo="item.id"
        :waveTotal="item.beatCount"
        :waveId="item.id"
        :data="item.ecgs"
        @getItem="handleGetItem(item)"
      />
    </el-collapse-item>

    <el-dialog
      title="批量操作"
      :visible.sync="typeShow"
      width="50%"
      class="type-warp"
      :show-close="false"
    >
      <span>您可以把当前组移动到下面的一个归类里面</span>
      <div class="list">
        <el-radio
          v-model="radio"
          :label="item.id"
          :disabled="!item.isSelect"
          v-for="(item,index) in resetTypes"
          :key="index"
        >{{item.name}}</el-radio>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setTypeShow(false)">取 消</el-button>
        <el-button
          type="primary"
          @click="ok"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-collapse>
</template>

<script>
import state from 'components/state'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getTypes, updateType } from 'api'


//正常心跳      N
//室上性心跳    V
//室性心跳      S
//噪声（伪差）  X
//逸性心跳      E
//起搏心跳      P
//未知类型      U
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this._getTypes()
  },
  data () {
    return {
      dialogVisible: false,
      activeName: '1',
      activeId: null,
      id:null,
      radio: 0,
      types: []
    }
  },
  computed: {
    resetTypes () {
      return this.types.map(item => {
        return {
          ...item,
          isSelect: this.activeId === item.id ? false : true
        }
      })
    },
    ...mapGetters([
      'typeShow',
      'selectType'
    ])
  },
  methods: {
    ok () {
      this._updateType(this.id, this.radio)
    },
    handleClose (done) {
      done();
    },
    handleGetItem (item) {
      this.id = item.id
      this.activeId = item.beatTypeId
    },
    async _updateType (id, beatTypeId) {
      let result = await updateType(id, beatTypeId)
      this.$notify({
        title: '提示',
        message: '操作成功',
        type: 'success'
      });
      this.setChangedTypes()
      this.setTypeShow(false)
    },
    async _getTypes () {
      let result = await getTypes()
      this.types = result.data
    },
    ...mapActions([
      'setChangedTypes'
    ]),
    ...mapMutations([
      'setTypeShow'
    ])
  },
  components: { state }
}
</script>

<style scoped lang='scss' type='text/css'>
.type-warp {
  .list {
    margin-top: 40px;
    /deep/ .el-radio {
      width: 33%;
      margin-left: 0;
      margin-top: 5px;
    }
  }
}
</style>
