<template>
  <el-header style="height:90px;padding: 0 0;">
    <header-top-nav @cartNumchange="changeCartNum"></header-top-nav>
    <el-row ref="searchDiv">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <form action style="height:60px;">
            <el-input placeholder="钢笔" v-model="input" clearable class="input-with-select">
              <el-button slot="append" icon="el-icon-search" bold @click="toGoods"></el-button>
            </el-input>
          </form>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content" v-if="flag">
          <router-link :to="{path:'/signIn'}">
            <el-button plain style="height:40px;">
              <el-badge :value="cartNum" class="item" style="font-size:18px;">
                <i class="el-icon-shopping-cart-2"></i>
              </el-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的购物车
            </el-button>
          </router-link>
        </div>
        <div class="grid-content" v-if="!flag">
          <router-link :to="{path:'/shoppingCart'}">
            <el-button plain style="height:40px;">
              <el-badge :value="cartNum" class="item" style="font-size:18px;">
                <i class="el-icon-shopping-cart-2"></i>
              </el-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的购物车
            </el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
import headerTopNav from "@/components/HeaderTopNav.vue";
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      input: "",
      cartNum: 0,
      flag: true
    };
  },
  mounted() {
    this.cartNum = cookieAbout.getCookie("cartNum");
    if (this.cartNum == "") {
      this.cartNum = 0;
    } else {
      this.flag = false;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    changeCartNum(val) {
      this.cartNum = val;
    },
    toGoods() {
      this.$router.push({ name: "goods", params: { name: this.input } });
    }
  },
  components: {
    headerTopNav
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
/* 在头部 Header 上滚动条滚到一定高度则将搜索框置于最上面的 class  */
.searchTop {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 1000;
}
</style>
