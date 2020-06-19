<template>
  <el-footer class="footer">
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="outerRing">
            <div class="innerRing">优</div>
          </div>
          <div class="detailsDiv">
            <div class="weightText">品质保障</div>
            <div class="thinText">品质护航&nbsp;&nbsp;购物无忧</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="outerRing">
            <div class="innerRing">七</div>
          </div>
          <div class="detailsDiv">
            <div class="weightText">七天无理由退货</div>
            <div class="thinText">为您提供售后无忧保障</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="outerRing">
            <div class="innerRing">特</div>
          </div>
          <div class="detailsDiv">
            <div class="weightText">特色服务体验</div>
            <div class="thinText">为您呈现不一样的服务</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="outerRing">
            <div class="innerRing">帮</div>
          </div>
          <div class="detailsDiv">
            <div class="weightText">帮助中心</div>
            <div class="thinText">您的购物指南</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </el-footer>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  height: 120px;
  background-color: #ffffff;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  height: 120px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* foot 上的文字 */
.outerRing {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #f4073f;
  float: left;
  margin: 30px 5px;
}
.innerRing {
  height: 52px;
  width: 52px;
  border-radius: 50%;
  background-color: white;
  position: relative;
  top: 4px;
  left: 4px;
  line-height: 52px;
  font-size: 34px;
  font-weight: 500;
  color: #f4073f;
}
.detailsDiv {
  float: left;
  height: 60px;
  margin-top: 15px;
  text-align: left;
}
.weightText {
  font-size: 18px;
  font-weight: 600;
  height: 50%;
}
.thinText {
  font-size: 16px;
  height: 50%;
  color: #bdbdbd;
}
</style>
