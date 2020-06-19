<template>
  <el-container class="el-big-container" ref="containerBox">
    <header-top-nav></header-top-nav>
    <el-container
      style="margin:10px 300px;background-color:rgba(248,248,248,0.4);flex-direction:column;"
    >
      <div style="display:flex;">
        <div>
          <el-carousel
            indicator-position="none"
            :autoplay="false"
            ref="carousel"
            style="padding:10px;border:1px solid #eee;width:322px;"
          >
            <el-carousel-item
              v-for="item in singleImages"
              :key="item+''"
              style="height:300px;width:320px;box-sizing:border-box;"
            >
              <img
                :src="'/static/images/productSingle/'+item+'.jpg'"
                alt="产品图片"
                style="height:100%;width:100%;"
              />
            </el-carousel-item>
          </el-carousel>
          <br />
          <el-row type="flex" justify="center" :gutter="5" style="height:66px;">
            <el-col
              :span="4"
              v-for="(item,index) in singleImages"
              :key="item+''"
              style="height:56px;width:56px;float:left;"
            >
              <div class="grid-content bg-purple">
                <img
                  :src="'/static/images/productSingle/'+item+'.jpg'"
                  style="height:100%;width:100%;"
                  alt="产品小图"
                  @click="setItem(index)"
                />
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top:50px;text-align:left;margin-left:10px;">
          <h3>{{ productName }}</h3>
          <br />
          <br />
          <br />
          <p>
            价格：￥
            <del>{{productOriginalPrice}}</del>
          </p>
          <p>
            促销价：
            <strong class="red">￥{{productPromotePrice}}</strong>
          </p>
          <p>
            数量：
            <el-input-number v-model="num" controls-position="right" :min="1" :max="10"></el-input-number>
          </p>
          <p>
            服务承诺
            <strong>正品保证</strong>
            <strong>极速退款</strong>
            <strong>赠运费险</strong>
            <strong>七天无理由退换</strong>
          </p>
          <br />
          <p style="display:flex;justify-content:center;font-size:18px;">
            <el-button style="width:150px;font-size:18px;" @click="dialogFormVisible = true">立即购买</el-button>
            <!-- Form -->

            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="地址" :label-width="formLabelWidth">
                  <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮编" :label-width="formLabelWidth">
                  <el-input v-model="form.post" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人" :label-width="formLabelWidth">
                  <el-input v-model="form.receiver" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                  <el-input v-model="form.userMessage" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="buyNow">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
              style="width:150px;background-color:#ad0808;font-size:18px;"
              @click="addShoppingCart()"
            >
              <i class="el-icon-shopping-cart-2"></i>加入购物车
            </el-button>
          </p>
        </div>
      </div>
      <br />
      <div>
        <h3 style="text-align:left;">商品详情</h3>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align:left;">
              <strong>产品参数：</strong>
            </div>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in detailParams" :key="''+index">
          <el-col :span="12" v-for="(item1,index1) in item" :key="''+index1">
            <div
              class="grid-content bg-purple"
              style="text-align:left;"
            >{{item1.name}}：{{item1.value}}</div>
          </el-col>
        </el-row>
        <div style="margin-top:5px;"></div>
        <div v-for="item in detailImages" :key="item+''">
          <img :src="'/static/images/productDetail/'+item+'.jpg'" alt="产品图片" />
        </div>
      </div>
    </el-container>
    <moll-footer></moll-footer>
  </el-container>
</template>

<script>
import headerTopNav from "@/components/HeaderTopNav.vue";
import mollFooter from "@/components/Footer.vue";
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      num: 0,
      productName: "", //产品名
      productOriginalPrice: 4582, // 以前的价格
      productPromotePrice: 4125, //现在的价格
      singleImages: [], //简略图介绍的id
      detailImages: [], //详细图的id
      detailParams: [], //具体参数  参数名：参数值
      uid: 0,
      dialogFormVisible: false,
      form: {
        orderCode: "",
        address: "",
        post: "",
        receiver: "",
        mobile: "",
        userMessage: "",
        createDate: "",
        payDate: null,
        deliveryDate: null,
        confirmDate: null,
        uid: "",
        status: "waitPay",
        pid: 0, //产品id
        num: 0 //要买的产品个数
      }
    };
  },
  mounted() {
    // console.log(this.$route.params.id);   // 得到 url 上的参数
    this.uid = cookieAbout.getCookie("uid");
    this.axios({
      methods: "get",
      url: "http://localhost:3000/productDetails?id=" + this.$route.params.id
    })
      .then(res => {
        let data = res.data;
        this.productName = data.name;
        this.productOriginalPrice = data.originalPrice;
        this.productPromotePrice = data.promotePrice;
        this.singleImages = data.singleImages;
        this.detailImages = data.detailImages;
        let arrTemp = [];
        for (let i = 0; i < data.detailParams.length; ++i) {
          arrTemp.push(data.detailParams[i]);
          if ((i + 1) % 2 == 0) {
            this.detailParams.push(arrTemp);
            arrTemp = [];
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 将访问的类别存在 redis 中
    this.axios({
      method: "post",
      url: "http://localhost:3000/setZsetRedis",
      data: {
        uid: parseInt(this.uid),
        pid: this.$route.params.id,
        cid: 0
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {},
  methods: {
    //处理位数不足 前面补0
    appendZero(num) {
      return num < 10 ? "0" + num : num;
    },
    // 处理时间 变成序号
    dateToSqlCode(date) {
      let str = date.getFullYear();
      str += this.appendZero(date.getMonth() + 1);
      str += this.appendZero(date.getDate());
      str += date.getTime();
      return str;
    },
    // 处理时间 变成sql 中的 date 类型可存的
    dateToSqlDate(date) {
      let str = date.getFullYear() + "-";
      str += this.appendZero(date.getMonth() + 1) + "-";
      str += this.appendZero(date.getDay()) + " ";
      str += this.appendZero(date.getHours()) + ":";
      str += this.appendZero(date.getMinutes()) + ":";
      str += this.appendZero(date.getSeconds());
      return str;
    },
    setItem(item) {
      this.$refs.carousel.setActiveItem(item);
    },
    buyNow() {
      //下订单
      let date = new Date();
      this.form.orderCode = this.dateToSqlCode(date);
      this.form.createDate = this.dateToSqlDate(date);
      this.form.uid = this.uid;
      this.form.num = this.num;
      this.form.pid = this.$route.params.id;
      console.log(this.form);
      this.axios({
        method: "post",
        url: "http://localhost:3000/addOrder",
        data: {
          form: this.form
        }
      })
        .then(res => {
          // console.log(res);
          this.dialogFormVisible = false;
          window.location.href = "/myOrders";
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加到购物车
    addShoppingCart() {
      this.axios({
        method: "post",
        url: "http://localhost:3000/addShoppingCart",
        data: {
          pid: this.$route.params.id,
          uid: parseInt(this.uid),
          num: this.num
        }
      })
        .then(res => {
          console.log(res);
          window.alert("加入成功");
          cookieAbout.setCookie(
            "cartNum",
            parseInt(cookieAbout.getCookie("cartNum")) + 1,
            1
          ); //修改  cookie  中的  购物车中的件数
          window.location.href = "/shoppingCart";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    headerTopNav,
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
  background-color: #ffffff;
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
  background-color: #ffffff;
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
strong.red {
  color: red;
  font-size: 20px;
}
</style>
