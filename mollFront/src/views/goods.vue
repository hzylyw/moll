<template>
  <el-container class="el-big-container" ref="containerBox">
    <header-top-nav></header-top-nav>
    <div style="margin-top:10px;background-color:white;"></div>
    <div style="padding: 10px 200px;background-color:#f4f4f4;">
      <goods-list interface-name="premise"></goods-list>
    </div>
    <moll-footer></moll-footer>
  </el-container>
</template>

<script>
import headerTopNav from "@/components/HeaderTopNav.vue";
import goodsList from "@/components/goodsList.vue";
import mollFooter from "@/components/Footer.vue";
export default {
  data() {
    return {
      premise: ""
    };
  },
  methods: {},
  mounted() {
    if (!isNaN(this.$route.params.name)) {
      //数字 就是 按照类别查询
      this.premise = "premiseByCid";
    } else {
      this.premise = "premiseByName";
    }
  },
  components: {
    headerTopNav,
    goodsList,
    mollFooter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 整体布局css */
.el-big-container {
  flex-direction: column;
}
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0px 0px 0px 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
