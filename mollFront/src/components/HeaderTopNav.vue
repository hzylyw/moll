<template>
  <div
    style="height: 30px;padding: 0 0;background-color:#f4f4f4;width:100%;text-align:right;line-height:30px;"
  >
    <span v-show="flag">
      <router-link :to="{path: '/'}">
        <a>首页</a>
      </router-link>&nbsp;&nbsp;你好&nbsp;&nbsp;
      <router-link :to="{path: '/signIn'}">
        <a>请登录</a>
      </router-link>
      <router-link :to="{path: '/login'}">
        <a>&nbsp;&nbsp;&nbsp;&nbsp;免费注册</a>
      </router-link>

      <router-link :to="{path: '/signIn'}">
        <a>&nbsp;&nbsp;&nbsp;&nbsp;我的订单</a>
      </router-link>
      <router-link :to="{path: '/signIn'}">
        <a>&nbsp;&nbsp;&nbsp;&nbsp;购物车0件</a>
      </router-link>
    </span>
    <span v-show="!flag">
      <router-link :to="{path: '/'}" style="margin-left:10px;">
        <a>首页</a>&nbsp;&nbsp;
      </router-link>你好&nbsp;&nbsp;
      <a>{{ name }}</a>
      <a @click.stop="clear">&nbsp;&nbsp;&nbsp;&nbsp;退出</a>

      <router-link :to="{path: '/myOrders'}">
        <a>&nbsp;&nbsp;&nbsp;&nbsp;我的订单</a>
      </router-link>
      <router-link :to="{path: '/shoppingCart'}">
        <a>&nbsp;&nbsp;&nbsp;&nbsp;购物车{{ cartNum }}件</a>
      </router-link>
    </span>
  </div>
</template>
<script>
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      flag: true,
      name: "",
      cartNum: 0
    };
  },
  mounted() {
    this.name = cookieAbout.getCookie("username");
    this.cartNum = cookieAbout.getCookie("cartNum");
    if (this.name != "") {
      this.flag = false;
    }
  },
  methods: {
    clear: function() {
      cookieAbout.clearCookie("username");
      cookieAbout.clearCookie("cartNum");
      cookieAbout.clearCookie("uid");
      this.flag = true;
      this.cartNum = 0;
      this.cartNumChange();
    },
    cartNumChange: function() {
      this.$emit("cartNumchange", this.cartNum);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
/* 栅格布局 css */
/* .el-row { */
/* margin-bottom: 10px; */
/* &:last-child {
    margin-bottom: 0;
  } */
/* } */
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/* 设置搜索框高度变高 */
.el-input--small >>> .el-input__inner {
  height: 40px;
  line-height: 40px;
}
/* 设置头部 a 标签移动到上面变红 */
span a {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
span a:hover {
  color: red;
}
/* span a:visited {
  color: black;
} */
/* 设置 button padding 使其 居中 */
.el-button--small,
.el-button--small.is-round {
  padding: 12px 20px;
}
</style>
