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
          v-loading="!details.showTime"
          :data="details"
          :isOperation='isSelectOperation'
          @nextPage="nextPage"
          @prevPage="prevPage"
        />
        <details-btn
          @selectOperation="selectOperation"
          :isSelectOperation="isSelectOperation"
          :typeData="typeData"
        />
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import leftType from 'components/leftType'
import thumb from 'common/thumb'
import axios from 'axios'
import detailsLine from 'components/detailsLine'
import detailsBtn from 'components/detailsLine/rightBtn'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  metaInfo: {
    title: '心电图-模块'
  },
  mounted () {
    this.setHeartType()
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

    nextPage () {
      //beatTime++ 递增  20000ms
      this.setSelectBeatTime(this.selectBeatTime + 20000)
      this.setHeartChangeDetails()
    },
    prevPage () {
      this.setSelectBeatTime(this.selectBeatTime - 20000)
      this.setHeartChangeDetails()
      this.setHeartChangeDetails()
    },
    ...mapActions([
      'setHeartType',
      'setHeartThumbs',
      'handleClickThumbs',
      'setHeartDetails',
      'setAddEcg',
      'setUpdateEcg',
      'setDeleteEcg',
      'setHeartChangeDetails'
    ]),
    ...mapMutations([
      'setSelectBeatTime'
    ])
  },
  computed: {
    ...mapGetters([
      'typeData',
      'thumbs',
      'selectType',
      'thumbsTotal',
      'activeThumb',
      'details',
      'selectBeatTime'
    ])

  },
  data () {
    return {
      thumbIndex: 0,
      loading: false,
      isSelectOperation: false,
    }
  },
  components: {
    thumb, detailsLine, leftType, detailsBtn
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade.leave-to {
  opacity: 0;
}

.module {
  min-height: 750px;
  display: flex;
  width: 100%;
  .module-left {
    width: 340px;
    background: #fff;
    overflow: auto;
    padding: 10px 0;
    flex-shrink: 0;
    /deep/.el-collapse {
      margin: 0 10px;
      .el-collapse-item__wrap {
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
    .thumb-group {
      // flex-shrink:0;
      height: calc(100% - 325px);
      overflow: hidden;
      .thumb-header {
        background: #fff;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
      }
      .group-content {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        background: #fff;
        padding: 10px;
        height: calc(100% - 74px);

        overflow: auto;

        width: 100%;
        .group-content-item {
          margin-top: 10px;
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            margin-top: 0;
          }
        }
      }
    }

    .details {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height: 315px;
      .details-line {
        width: calc(100% - 300px);
      }
    }
  }
}
</style>