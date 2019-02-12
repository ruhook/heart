<template>
  <div class="index">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
    </el-menu>
    <div class="admin-warp">
      <div class="tag-top">
        <div class="left">
          <i :class="`el-icon-${$route.meta.icon}`"></i>{{$route.meta.title}}
        </div>

        <el-dropdown
          class="avatar-container"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              class="user-avatar"
            >
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="user-dropdown"
          >
            <el-dropdown-item>
              <span
                style="display:block;"
                @click="logout"
              >退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {

    }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
.index{
  width: 100%;
  height: 100%;
  display: flex;
  /deep/ .el-menu{
    width: 200px;
    height: 100%;
  }
  .admin-warp{
    width: calc(100% - 200px);
    height: 100%;
    .tag-top{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #dedede;
      background: #FFF;
      padding-left: 30px;
      display: flex;
      .left {
        i {
          margin-right: 10px;
        }
      }
        .avatar-container {
          height: 50px;
          display: inline-block;
          position: absolute;
          right: 35px;
          .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            line-height: initial;
            .user-avatar {
              width: 40px;
              height: 40px;
              border-radius: 10px;
            }
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 25px;
              font-size: 12px;
            }
          }
  }
    }
  }
}
</style>
