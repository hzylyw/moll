<template>
  <el-container class="el-big-container" ref="containerBox">
    <moll-header ref="headerDiv"></moll-header>
    <div style="padding: 10px 200px;background-color:#f4f4f4;">
      <el-container>
        <el-aside width="200px">
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <rotation-chart></rotation-chart>
        </el-main>
      </el-container>
      <goods-list interface-name="Nopremise"></goods-list>
    </div>
    <moll-footer></moll-footer>
  </el-container>
</template>

<script>
import mollHeader from "@/components/Header.vue";
import leftNav from "@/components/leftNav.vue";
import rotationChart from "@/components/rotationChart.vue";
import goodsList from "@/components/goodsList.vue";
import mollFooter from "@/components/Footer.vue";
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    showIcon() {
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 120
      ) {
        console.log(this);
        this.$refs.headerDiv.$refs.searchDiv.$el.className += " searchTop";
      } else {
        this.$refs.headerDiv.$refs.searchDiv.$el.className = "el-row";
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.showIcon);
  },
  components: {
    mollHeader,
    leftNav,
    rotationChart,
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
/* 在头部 Header 上滚动条滚到一定高度则将搜索框置于最上面的 class  */
.searchTop {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 1000;
}
</style>
