<template>
  <div class="module">
    <div
      class="module-left"
      v-loading="typeData.length === 0"
    >
      <left-type :data="typeData" />
    </div>
    <div class="module-right">
      <div class="thumb-group">

        <div class="thumb-header">
          <el-pagination
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="thumbsTotal"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

        <transition name='fade'>
          <el-row
            :gutter="5"
            class="group-content"
            v-loading="thumbs.length === 0"
          >
            <el-col
              :span="6"
              v-for="(item, index) in thumbs"
              :key="index"
              class="group-content-item"
            >
              <thumb
                :item="item"
                :isActive="index === activeThumb.index"
                @clickThumb="handleClickSelf(index)"
              />
            </el-col>
          </el-row>
        </transition>

      </div>

      <div class="details">
        <details-line
          class="details-line"
         
          :data="details"
          :isOperation='isSelectOperation'
        />
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
            @click="setUpdateEcg"
          >修改</el-button>
          <el-button
            type="danger"
            :disabled="!isSelectOperation ? true : false"
            @click="setDeleteEcg"
          >删除</el-button>
        </div>
      </div>
    </div>

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
              />
            </el-col>
          </el-row>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addOk"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <!-- <el-dialog
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
          v-for="(item,index) in resetTypeList"
          :key="index"
        >{{item.name}}({{item.tag}})</el-radio>
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
    </el-dialog> -->
  </div>
</template>

<script>
// @ is an alias to /src
import leftType from 'components/leftType'
import thumb from 'common/thumb'
import axios from 'axios'
import detailsLine from 'components/detailsLine'
import selectTag from 'components/state/selectTag'
import { mapGetters, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: '心电图-模块'
  },
  mounted () {
    this.setHeartType()
    // this.setHeartThumbs({ beatGraphId: 62 })
  },
  methods: {
    handleCurrentChange (index) {
      this.setHeartThumbs({ beatGraphId: this.selectType.id, pages: index })
      this.handleClickThumbs('reset')
    },
    //点击thumbs，重置active，获取详情图
    async handleClickSelf (index) {
      this.isSelectOperation = false
      this.handleClickThumbs(index)
      this.setHeartDetails()
    },
    //选中操作按钮
    selectOperation () {
      this.isSelectOperation = !this.isSelectOperation
    },
    add () {
      this.addShow = true
      //this.setAddEcg()
    },
    addCancel () {
      this.addShow = false
      this.showItem = 0
      this.selectItemId = null
    },
    addOk () {
      this.addShow = false
      this.showItem = 0
      this.selectItemId = null
    },
    itemClick (index) {
      this.showItem = index
    },
    setSelectItemId (id) {
      this.selectItemId = id
    },
    ...mapActions([
      'setHeartType',
      'setHeartThumbs',
      'handleClickThumbs',
      'setHeartDetails',
      'setAddEcg',
      'setUpdateEcg',
      'setDeleteEcg'
    ])
  },
  computed: {
    ...mapGetters([
      'typeData',
      'thumbs',
      'selectType',
      'thumbsTotal',
      'activeThumb',
      'details'
    ])

  },
  data () {
    return {
      thumbIndex: 0,
      loading: false,
      isSelectOperation: false,
      addShow: false,
      showItem: 0,
      selectItemId: null
    }
  },
  components: {
    thumb, detailsLine, leftType, selectTag
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade.leave-to   {
  opacity: 0;
}


.module{
  display: flex;
  width: 100%;
  .module-left{
    width: 340px;
    background: #FFF;
    overflow: auto;
    padding: 10px 0 ;
    flex-shrink:0;
    /deep/.el-collapse{
      margin: 0 10px;
      .el-collapse-item__wrap{
        overflow: inherit;
      }
    }
  }
  .module-right {
    width: calc(100% - 340px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .thumb-group{
      // flex-shrink:0;
      height: calc(100% - 325px);
      overflow: hidden;
      .thumb-header {
        background: #FFF;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
      }
      .group-content{
        display: flex;
        flex-wrap: wrap;
        align-content:space-between;
        background: #FFF;
        padding: 10px;
        height: calc( 100% - 74px);
        
        overflow: auto;
        
        width: 100%;
        .group-content-item{
          margin-top: 10px;
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5){
            margin-top: 0;
          }
        }
      }
    }

    .details{
      display: flex;
      box-sizing: border-box;
      width: 100%;
      // max-width: 1000px;
      height: 315px;
      // background: #FFF;
      .details-line {
        width: calc(100% - 300px);
      }
      .btn-warp{
        width: 300px;
        height: 100%;
        background:#FFF;
        margin-left: 10px;
        padding: 0 10px ;
        button {
          display: block;
          width: 100%;
          margin: 0;
          margin-top: 10px;
        }

        .selectOperation{
          margin-bottom: 20px;
        }
        /deep/ .el-tag{
          display: block;
          margin: 0 auto;
          width: 160px;
          text-align: center;
        }
      }
    }
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
      /deep/ .row-warp{
        .el-col{
          margin-top: 10px;
          border-radius: 5px;
          margin-left: 10px;
        }
        .el-col-8{
          width: 30%;
        }
      }
      
      .avtive{
        box-shadow: 0 0 20px blue;
      }
    }
  }
}
</style>