<template>
  <el-container class="el-big-container" ref="containerBox">
    <header-top-nav></header-top-nav>
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      style="margin:10px 200px;"
    >
      <el-tab-pane label="所有订单" name="first">
        <div v-if="arr == false">暂无订单</div>
        <div v-else>
          <el-row class="elRowHeader">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">宝贝</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">单价</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">数量</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">实付款</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">交易操作</div>
            </el-col>
          </el-row>
          <div v-for="item in arr" :key="''+item.orderId">
            <el-row style="margin-top:20px;background-color:#f4f4f4;height:30px;line-height:30px;">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple-dark"
                  style="text-align:left"
                >{{ time(item.orderCode) }} 订单号:{{ item.orderCode }}</div>
              </el-col>
              <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple-dark">
                  <i
                    class="el-icon-delete-solid"
                    style="cursor:pointer;"
                    @click="deleteOrderById(item.orderId)"
                  ></i>
                </div>
              </el-col>
            </el-row>
            <el-row
              v-for="item1 in item.products"
              :key="''+item1.id"
              style="background-color:#f4f4f4;height:100px;background-color:#ffffff;border:1px solid #f4f4f4;"
            >
              <el-col :span="3" style="position:relative;height:100%;">
                <div class="grid-content bg-purple-dark">
                  <img
                    :src="'static/images/productSingle_small/'+ item1.id +'.jpg'"
                    alt="产品图片"
                    style="display: -webkit-box;position: absolute;margin: auto;top: 0px;left: 0px;right: 0px;bottom: 0px;height:80%;width:80%;"
                  />
                </div>
              </el-col>
              <el-col :span="9">
                <div
                  class="grid-content bg-purple-dark"
                  style="margin:20px auto;text-align:left;"
                >{{item1.name}}</div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{item1.price}}</strong>
                </div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">{{item1.num}}</div>
              </el-col>
              <el-col :span="3" style="line-height:50px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{(item1.price*item1.num).toFixed(2)}}</strong>
                  <br />(含运费￥0.00)
                </div>
              </el-col>
              <el-col :span="3" row="2" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <el-button v-if="item.status == 'waitDelivery'" type="text">待发货</el-button>
                  <el-button v-if="item.status == 'waitPay'" type="text">待付款</el-button>
                  <el-button v-if="item.status == 'waitConfirm'" type="text">待收货</el-button>
                  <el-button v-if="item.status == 'confirmed'" type="text">已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">
        <div v-if="waitPayarr == false">暂无待付款订单</div>
        <div v-else>
          <el-row class="elRowHeader">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">宝贝</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">单价</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">数量</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">实付款</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">交易操作</div>
            </el-col>
          </el-row>
          <div v-for="item in waitPayarr" :key="''+item.orderId">
            <el-row style="margin-top:20px;background-color:#f4f4f4;height:30px;line-height:30px;">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple-dark"
                  style="text-align:left"
                >{{ time(item.orderCode) }} 订单号:{{ item.orderCode }}</div>
              </el-col>
              <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple-dark">
                  <i
                    class="el-icon-delete-solid"
                    style="cursor:pointer;"
                    @click="deleteOrderById(item.orderId)"
                  ></i>
                </div>
              </el-col>
            </el-row>
            <el-row
              v-for="item1 in item.products"
              :key="''+item1.id"
              style="background-color:#f4f4f4;height:100px;background-color:#ffffff;border:1px solid #f4f4f4;"
            >
              <el-col :span="3" style="position:relative;height:100%;">
                <div class="grid-content bg-purple-dark">
                  <img
                    :src="'static/images/productSingle_small/'+ item1.id +'.jpg'"
                    alt="产品图片"
                    style="display: -webkit-box;position: absolute;margin: auto;top: 0px;left: 0px;right: 0px;bottom: 0px;height:80%;width:80%;"
                  />
                </div>
              </el-col>
              <el-col :span="9">
                <div
                  class="grid-content bg-purple-dark"
                  style="margin:20px auto;text-align:left;"
                >{{item1.name}}</div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{item1.price}}</strong>
                </div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">{{item1.num}}</div>
              </el-col>
              <el-col :span="3" style="line-height:50px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{(item1.price*item1.num).toFixed(2)}}</strong>
                  <br />(含运费￥0.00)
                </div>
              </el-col>
              <el-col :span="3" row="2" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <el-button v-if="item.status == 'waitDelivery'" type="text">待发货</el-button>
                  <el-button v-if="item.status == 'waitPay'" type="text">待付款</el-button>
                  <el-button v-if="item.status == 'waitConfirm'" type="text">待收货</el-button>
                  <el-button v-if="item.status == 'confirmed'" type="text">已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="third">
        <div v-if="waitDeliveryarr == false">暂无待发货订单</div>
        <div v-else>
          <el-row class="elRowHeader">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">宝贝</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">单价</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">数量</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">实付款</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">交易操作</div>
            </el-col>
          </el-row>
          <div v-for="item in waitDeliveryarr" :key="''+item.orderId">
            <el-row style="margin-top:20px;background-color:#f4f4f4;height:30px;line-height:30px;">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple-dark"
                  style="text-align:left"
                >{{ time(item.orderCode) }} 订单号:{{ item.orderCode }}</div>
              </el-col>
              <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple-dark">
                  <i
                    class="el-icon-delete-solid"
                    style="cursor:pointer;"
                    @click="deleteOrderById(item.orderId)"
                  ></i>
                </div>
              </el-col>
            </el-row>
            <el-row
              v-for="item1 in item.products"
              :key="''+item1.id"
              style="background-color:#f4f4f4;height:100px;background-color:#ffffff;border:1px solid #f4f4f4;"
            >
              <el-col :span="3" style="position:relative;height:100%;">
                <div class="grid-content bg-purple-dark">
                  <img
                    :src="'static/images/productSingle_small/'+ item1.id +'.jpg'"
                    alt="产品图片"
                    style="display: -webkit-box;position: absolute;margin: auto;top: 0px;left: 0px;right: 0px;bottom: 0px;height:80%;width:80%;"
                  />
                </div>
              </el-col>
              <el-col :span="9">
                <div
                  class="grid-content bg-purple-dark"
                  style="margin:20px auto;text-align:left;"
                >{{item1.name}}</div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{item1.price}}</strong>
                </div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">{{item1.num}}</div>
              </el-col>
              <el-col :span="3" style="line-height:50px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{(item1.price*item1.num).toFixed(2)}}</strong>
                  <br />(含运费￥0.00)
                </div>
              </el-col>
              <el-col :span="3" row="2" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <el-button v-if="item.status == 'waitDelivery'" type="text">待发货</el-button>
                  <el-button v-if="item.status == 'waitPay'" type="text">待付款</el-button>
                  <el-button v-if="item.status == 'waitConfirm'" type="text">待收货</el-button>
                  <el-button v-if="item.status == 'confirmed'" type="text">已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="fourth">
        <div v-if="waitConfirmarr == false">暂无待收货订单</div>
        <div v-else>
          <el-row class="elRowHeader">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">宝贝</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">单价</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">数量</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">实付款</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">交易操作</div>
            </el-col>
          </el-row>
          <div v-for="item in waitConfirmarr" :key="''+item.orderId">
            <el-row style="margin-top:20px;background-color:#f4f4f4;height:30px;line-height:30px;">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple-dark"
                  style="text-align:left"
                >{{ time(item.orderCode) }} 订单号:{{ item.orderCode }}</div>
              </el-col>
              <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple-dark">
                  <i
                    class="el-icon-delete-solid"
                    style="cursor:pointer;"
                    @click="deleteOrderById(item.orderId)"
                  ></i>
                </div>
              </el-col>
            </el-row>
            <el-row
              v-for="item1 in item.products"
              :key="''+item1.id"
              style="background-color:#f4f4f4;height:100px;background-color:#ffffff;border:1px solid #f4f4f4;"
            >
              <el-col :span="3" style="position:relative;height:100%;">
                <div class="grid-content bg-purple-dark">
                  <img
                    :src="'static/images/productSingle_small/'+ item1.id +'.jpg'"
                    alt="产品图片"
                    style="display: -webkit-box;position: absolute;margin: auto;top: 0px;left: 0px;right: 0px;bottom: 0px;height:80%;width:80%;"
                  />
                </div>
              </el-col>
              <el-col :span="9">
                <div
                  class="grid-content bg-purple-dark"
                  style="margin:20px auto;text-align:left;"
                >{{item1.name}}</div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{item1.price}}</strong>
                </div>
              </el-col>
              <el-col :span="3" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">{{item1.num}}</div>
              </el-col>
              <el-col :span="3" style="line-height:50px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <strong>￥{{(item1.price*item1.num).toFixed(2)}}</strong>
                  <br />(含运费￥0.00)
                </div>
              </el-col>
              <el-col :span="3" row="2" style="line-height:100px;border-left:1px solid #f4f4f4;">
                <div class="grid-content bg-purple-dark">
                  <el-button v-if="item.status == 'waitDelivery'" type="text">待发货</el-button>
                  <el-button v-if="item.status == 'waitPay'" type="text">待付款</el-button>
                  <el-button v-if="item.status == 'waitConfirm'" type="text">待收货</el-button>
                  <el-button v-if="item.status == 'confirmed'" type="text">已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      currentDate: new Date(),
      activeName: "first",
      arr: [],
      uid: ""
    };
  },
  computed: {
    time: function() {
      return function(value) {
        let y = value.substring(0, 4);
        let mon = value.substring(4, 6);
        let day = value.substring(6, 8);
        let time = new Date(parseInt(value.substring(8)));
        let h = time.getHours();
        let min = time.getMinutes();
        let s = time.getSeconds();
        return `${y}-${mon}-${day} ${h}:${min}:${s}`;
      };
    },
    waitPayarr: function() {
      let arrTemp = [];
      for (const item of this.arr) {
        if (item.status == "waitPay") {
          arrTemp.push(item);
        }
      }
      return arrTemp;
    },
    waitDeliveryarr: function() {
      let arrTemp = [];
      for (const item of this.arr) {
        if (item.status == "waitDelivery") {
          arrTemp.push(item);
        }
      }
      return arrTemp;
    },
    waitConfirmarr: function() {
      let arrTemp = [];
      for (const item of this.arr) {
        if (item.status == "waitConfirm") {
          arrTemp.push(item);
        }
      }
      return arrTemp;
    }
  },
  mounted() {
    this.uid = cookieAbout.getCookie("uid");
    this.axios({
      method: "get",
      url: "http://localhost:3000/getOrders?uid=" + this.uid
    })
      .then(res => {
        let data = res.data;
        let array = [];
        for (let item of data) {
          let objItem = {}; //商品初始化
          objItem.id = item.id; // 商品的图片的号码
          objItem.pid = item.pid; // 商品的id
          objItem.num = item.number; // 商品的数量
          objItem.name = item.name; // 商品名称
          objItem.price = item.promotePrice; //商品单价
          let flag = -1;
          for (let i = 0; i < array.length; ++i) {
            if (array[i].orderId == item.orderId) {
              flag = i;
              array[i].products.push(objItem);
            }
          }
          if (flag == -1) {
            let obj = {};
            obj.orderId = item.orderId; //订单编号
            obj.orderCode = item.orderCode; //订单号 根据时间创建
            obj.status = item.status; //订单状态  待付款，待发货，待收货，已完成
            obj.products = []; //该订单下面有几个商品
            obj.products.push(objItem);
            array.push(obj);
          }
        }
        this.arr = array;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    deleteOrderById(orderId) {
      //删除某个订单  同时删除订单产品用户关系表中的关系
      this.axios({
        method: "get",
        url: "http://localhost:3000/deleteOrder?id=" + orderId
      })
        .then(res => {
          window.location.href = "/myOrders";
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
/* 在头部 Header 上滚动条滚到一定高度则将搜索框置于最上面的 class  */
.searchTop {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 1000;
}
.el-tabs__nav .el-tabs__item {
  border-left: 1px solid #f4f4f4;
}
.elRowHeader {
  background-color: #f4f4f4;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}
strong {
  color: red;
}
</style>
