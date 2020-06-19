<template>
  <div>
    <el-row :gutter="10" v-for="(item,index) in goodsData" :key="index" style="margin-top:10px;">
      <el-col :span="6" v-for="(item1,index1) in item" :key="index1">
        <el-card :body-style="{ padding: '0px' }">
          <div v-if="flag" style="height:266.3px;width:266.3px;cursor:pointer;">
            <router-link :to="{name:'productDetails',params:{id:item1.pid}}">
              <img v-lazy="'/static/images/productSingle/'+item1.id+'.jpg'" class="image" />
            </router-link>
          </div>
          <div v-if="!flag" style="height:266.3px;width:266.3px;cursor:pointer;">
            <router-link :to="{path:'signIn'}">
              <img v-lazy="'/static/images/productSingle/'+item1.id+'.jpg'" class="image" />
            </router-link>
          </div>

          <div style="padding: 14px 0px;text-align:left;">
            <span style="font-size:16px;">{{item1.name}}</span>
            <br />
            <span style="color:red;font-size:20px;">￥{{item1.promoteprice}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      currentDate: new Date(),
      goodsData: [],
      uid: "",
      flag: false //是否登录状态
    };
  },
  props: ["interfaceName"],
  methods: {},
  mounted() {
    let url = "";
    if (this.interfaceName == "Nopremise") {
      //无条件的查询
      url = "http://localhost:3000/HomePageGoodsMessage";
      this.uid = cookieAbout.getCookie("uid");
      if (this.uid != "") {
        this.flag = true;
        url = "http://localhost:3000/HomePageGoodsMessageByUid?id=" + this.uid;
      }
    } else if (this.interfaceName == "premiseByName") {
      url =
        "http://localhost:3000/HomePageGoodsMessageByPremiseName?name=" +
        this.$route.params.name;
      this.uid = cookieAbout.getCookie("uid");
      if (this.uid != "") {
        this.flag = true;
      }
    } else {
      url =
        "http://localhost:3000/HomePageGoodsMessageByPremiseId?name=" +
        this.$route.params.name;
      this.uid = cookieAbout.getCookie("uid");
      if (this.uid != "") {
        this.flag = true;
      }
    }

    this.axios
      .get(url)
      .then(res => {
        console.log(res.data);
        let data = res.data;
        this.goodsData = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 商品显示 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
