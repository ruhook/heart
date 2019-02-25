<template>
  <div class="warp">
    <el-menu
      :default-active="route[$route.name]"
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="true"
      @select="selectMenu"
    >
      <div class="logo">
        <img src="@/../static/images/logo.png" />
      </div>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">模板</span>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-bell"></i>
        <span slot="title">事件</span>
      </el-menu-item> -->
      <el-menu-item index="3">
        <i class="el-icon-sort"></i>
        <span slot="title">趋势</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">报告</span>
      </el-menu-item>
    </el-menu>

    <div class="content-warp">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      router: ['/mould', '', '/trend', '/report'],
      route:{'mould':'1','trend':'3','report':'4',}
    }
  },
  methods: {
    selectMenu (index) {
      this.setFirstGetDetails(true)
      let planId = this.$route.params.id
      localStorage.setItem('planId', planId)
      this.$router.push(`${this.router[index - 1]}/${planId}`)
    },
    ...mapMutations([
      'setFirstGetDetails'
    ])
  },
}
</script>

<style scoped lang='scss' type='text/css'>
.warp {
  display: flex;
  font-size: 16px;
  min-width: 1340px;
  // min-height: 750px;
  width: 100%;
}
.menu {
  min-height: 750px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.logo {
  width: 64px;
  margin-top: 30px;
}
.content-warp {
  padding-left: 64px;
  display: flex;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
</style>
