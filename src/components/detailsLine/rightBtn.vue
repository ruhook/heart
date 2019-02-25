<template>
  <div class="btn-warp">
    <el-button
      @click="selectOperation"
      class="selectOperation"
    >操作</el-button>
    <el-tag :type="!isSelectOperation?'info':'danger'">{{!isSelectOperation? '不可操作状态':'可操作状态'}}</el-tag>
    <el-button
      type="primary"
      :disabled="!isSelectOperation ? true : false"
      @click="add"
    >新增</el-button>
    <el-button
      type="warning"
      :disabled="!isSelectOperation ? true : false"
      @click="emit"
    >修改</el-button>
    <el-button
      type="danger"
      :disabled="!isSelectOperation ? true : false"
      @click="handleSetDeleteEcg"
    >删除</el-button>

    <!-- 新增 -->
    <el-dialog
      v-if="addShow"
      title="新增心跳点"
      :visible.sync="addShow"
      width="60%"
      class="type-warp"
      :show-close="false"
    >
      <span>您可以新增到下面这些分类里面</span>
      <div class="add-list">
        <div class="left">
          <div
            class="item"
            v-for="(item ,index) in typeData"
            :key="index"
            :class="{'active' : showItem === index}"
            @click="itemClick(index)"
          >
            {{item.name}}
          </div>
        </div>
        <div class="right">
          <el-row class="row-warp">
            <el-col
              :span="8"
              v-for="(item ,index) in typeData[showItem].graphs"
              :key="index"
              :class="{'avtive':selectItemId === item.id}"
              @click.native="setSelectItemId(item.id)"
            >
              <select-tag
                :item="item"
                :waveNo="item.id"
                :waveTotal="item.beatCount"
                :waveId="item.id"
                :data="item.ecgs"
                @click.native="handleClickTag(item)"
              />
            </el-col>
          </el-row>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addOk"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      v-if="emitShow"
      title="修改心跳点"
      :visible.sync="emitShow"
      width="60%"
      class="type-warp"
      :show-close="false"
    >
      <span>您可以修改这个心跳点到下面这些分类里面</span>
      <div class="add-list">
        <div class="left">
          <div
            class="item"
            v-for="(item ,index) in typeData"
            :key="index"
            :class="{'active' : showItem === index}"
            @click="itemClick(index)"
          >
            {{item.name}}
          </div>
        </div>
        <div class="right">
          <el-row class="row-warp">
            <el-col
              :span="8"
              v-for="(item ,index) in typeData[showItem].graphs.filter(item => item.id != isIn[0].beatGraphId)"
              :key="index"
              :class="{'avtive':selectItemId === item.id}"
              @click.native="setSelectItemId(item.id)"
            >
              <select-tag
                :item="item"
                :waveNo="item.id"
                :waveTotal="item.beatCount"
                :waveId="item.id"
                :data="item.ecgs"
                @click.native="handleClickTag(item)"
              />
            </el-col>
          </el-row>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="emitOk"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import selectTag from 'components/state/selectTag'
export default {
  props: {
    isSelectOperation: null,
    typeData: null,
    beatGraphId: null,
    pages: null
  },
  data () {
    return {
      addShow: false,
      emitShow: false,
      showItem: 0,

      selectItemId: null,
      _beatGraphId: null
    }
  },
  computed: {
    ...mapGetters([
      'isIn'
    ])
  },
  methods: {
    handleClickTag (item) {
      this._beatGraphId = item.id
    },
    selectOperation () {
      this.$emit('selectOperation')
    },
    async add () {
      let result = await this.setAddEcgReady()
      if (result.success) this.addShow = true
    },
    async addOk () {
      let result = await this.setAddEcg({ beatGraphId: this._beatGraphId })
      //添加成功之后更新缩略图 更新左侧归类
      this.setChangedTypes()  //更新缩略图
      this.setHeartThumbs({ beatGraphId: this.beatGraphId, pages: this.pages }) // 更新缩略图
      this.setHeartDetails(result.beatTime) //更新当前视图
      this.$emit('selectOperation')

      this.cancel()
    },
    async emit () {
      let result = await this.setUpdateEcgReady()
      if (result.success) this.emitShow = true
    },
    async emitOk () {
      let result = await this.setUpdateEcg({ beatGraphId: this._beatGraphId })
      //添加成功之后更新缩略图 更新左侧归类
      this.setChangedTypes()  //更新缩略图
      this.setHeartThumbs({ beatGraphId: this.beatGraphId, pages: this.pages }) // 更新缩略图
      this.setHeartDetails(result.beatTime) //更新当前视图
      this.$emit('selectOperation')
      this.cancel()
    },
    cancel () {
      this.emitShow = false
      this.addShow = false
      this.showItem = 0
      this.selectItemId = null

    },
    async handleSetDeleteEcg () {
      let result = await this.setDeleteEcg()
      if (result.success)      {

        this.$emit('selectOperation')
        this.setChangedTypes()  //更新缩略图
        this.setHeartThumbs({ beatGraphId: this.beatGraphId, pages: this.pages }) // 更新缩略图
        this.setHeartDetails(result.beatTime) //更新当前视图
      }
    },
    setSelectItemId (id) {
      this.selectItemId = id
    },
    itemClick (index) {
      this.showItem = index
    },
    ...mapActions([
      'setChangedTypes',
      'setHeartThumbs',
      'setHeartDetails',
      'setDeleteEcg',
      'setAddEcgReady',
      'setAddEcg',
      'setUpdateEcgReady',
      'setUpdateEcg',
    ]),
  },
  components: { selectTag }
}
</script>

<style scoped lang='scss' type='text/css'>
.btn-warp {
  width: 300px;
  height: 100%;
  background: #fff;
  margin-left: 10px;
  padding: 0 10px;
  & > button {
    display: block;
    width: 100%;
    margin: 0;
    margin-top: 10px;
  }

  .selectOperation {
    margin-bottom: 20px;
  }
  /deep/ .el-tag {
    display: block;
    margin: 0 auto;
    width: 160px;
    text-align: center;
  }
  .add-list {
    margin-top: 20px;
    height: 350px;
    .left {
      width: 30%;
      height: 350px;
      float: left;
      .item {
        padding-left: 10px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #dedede;
        transition: all 0.3s;
        &:hover,
        &.active {
          background: #f7f7f7;
        }
      }
    }
    .right {
      float: left;
      width: 70%;
      height: 350px;
      padding: 0 10px;
      /deep/ .row-warp {
        .el-col {
          margin-top: 10px;
          border-radius: 5px;
          margin-left: 10px;
        }
        .el-col-8 {
          width: 30%;
        }
      }

      .avtive {
        box-shadow: 0 0 20px blue;
      }
    }
  }
}
</style>
