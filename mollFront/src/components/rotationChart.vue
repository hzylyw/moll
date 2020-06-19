<template>
  <el-row style="height:300px;">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in imgGroup" :key="item">
        <img v-bind:src="item" alt="图片未显示" style="height:100%;width:100%;" />
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      imgGroup: [
        "/static/images/lunbo/1.jpg",
        "/static/images/lunbo/2.jpg",
        "/static/images/lunbo/3.jpg",
        "/static/images/lunbo/4.jpg"
      ]
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 设置走马灯 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
