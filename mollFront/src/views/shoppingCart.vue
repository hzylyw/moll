<template>
  <el-container class="el-big-container" ref="containerBox">
    <header-top-nav></header-top-nav>
    <div style="margin:10px 200px;">
      <el-row>
        <el-col :span="1" style="text-align:left;padding-left:20px;">
          <div class="grid-content bg-purple">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </div>
        </el-col>
        <el-col :span="9" :offset="2">
          <div class="grid-content bg-purple">商品信息</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">单价</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">数量</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">金额</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">操作</div>
        </el-col>
      </el-row>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedItems" @change="handleCheckedItemsChange">
        <div v-for="item in arr" :key="item.name" style="font-size:16px;">
          <el-row style="height:100px;line-height:100px;border:1px solid #bdbdbd;">
            <el-col
              :span="1"
              style="text-align:left;padding-left:20px;box-shadow:1 1 1 #000000;height: 100px;"
            >
              <div class="grid-content bg-purple">
                <el-checkbox :label="item">&nbsp;</el-checkbox>
              </div>
            </el-col>
            <el-col :span="2" style="position:relative;height:100%;">
              <div class="grid-content bg-purple">
                <img
                  :src="'static/images/productSingle_small/'+ item.id +'.jpg'"
                  alt="产品图片"
                  style="display: -webkit-box;position: absolute;margin: auto;top: 0px;left: 0px;right: 0px;bottom: 0px;"
                />
              </div>
            </el-col>
            <el-col :span="9" style="line-height:normal;margin-top:20px;text-align:left;">
              <div class="grid-content bg-purple">{{ item.name }}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <strong>￥{{ item.promotePrice }}</strong>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-input-number
                  v-model="item.num"
                  :min="1"
                  :max="10000"
                  label="描述文字"
                  @change="numChange(item.pid,item.num)"
                ></el-input-number>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <strong v-text="'￥'+(item.promotePrice*item.num).toFixed(2)"></strong>
              </div>
            </el-col>
            <el-col :span="3">
              <div
                class="grid-content bg-purple"
                style="color:#bdbdbd;cursor:pointer;"
                @click="deleteItem(item.pid)"
              >删除</div>
            </el-col>
          </el-row>
        </div>
      </el-checkbox-group>
    </div>
    <moll-footer></moll-footer>
    <div style="width:100%;height:50px;line-height:50px;position:fixed;bottom:0px;z-index:100;">
      <el-row style="margin:0px 200px;background-color:#dcdfe6">
        <el-col :span="1" style="text-align:left;padding-left:20px;">
          <div class="grid-content bg-purple">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </div>
        </el-col>
        <el-col :span="4" :offset="14">
          <div class="grid-content bg-purple">
            已选商品
            <strong>{{productCheckedSumNum}}</strong>件
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <strong>￥{{productCheckedSumMoney}}</strong>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button
              type="primary"
              style="height:50px;background-color:red;width:100%;font-size:18px;"
              @click="dialogFormVisible = true"
            >结&nbsp;&nbsp;&nbsp;&nbsp;算</el-button>
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
                <el-button type="primary" @click="addOrder">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import headerTopNav from "@/components/HeaderTopNav.vue";
import mollFooter from "@/components/Footer.vue";
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      uid: 0,
      checkAll: false,
      checkedItems: [],
      isIndeterminate: false,
      arr: [],
      productCheckedSumNum: 0,
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
        uid: 0,
        status: "waitPay",
        orderItemsPidNum: []
      }
    };
  },
  computed: {
    productCheckedSumMoney: function() {
      this.productCheckedSumNum = this.checkedItems.length;
      let sum = 0.0;
      for (let item of this.checkedItems) {
        let price = parseFloat((item.promotePrice * item.num).toFixed(2));
        sum =
          parseFloat(sum.toFixed(2)) +
          parseFloat((item.promotePrice * item.num).toFixed(2));
      }
      return sum;
    }
  },
  mounted() {
    this.uid = cookieAbout.getCookie("uid");
    if (this.uid == "") {
      this.arr = [];
    } else {
      this.axios({
        methods: "get",
        url: "http://localhost:3000/getShoppingCart?uid=" + this.uid
      })
        .then(res => {
          this.arr = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.arr : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.arr.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.arr.length;
    },
    numChange(pid, num) {
      this.axios({
        method: "post",
        url: "http://localhost:3000/shoppingCartNumChange",
        data: {
          uid: this.uid,
          pid: pid,
          num: num
        }
      })
        .then(res => {
          console.log("pid:" + pid + "num:" + num);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteItem(pid) {
      this.axios({
        method: "get",
        url:
          "http://localhost:3000/shoppingCatrDeleteItem?uid=" +
          this.uid +
          "&pid=" +
          pid
      })
        .then(res => {
          console.log("pid:" + pid + "删除成功");
          cookieAbout.setCookie(
            "cartNum",
            cookieAbout.getCookie("cartNum") - 1,
            1
          );
          window.location.href = "/shoppingCart";
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    addOrder() {
      // 处理现在选中几个产品
      for (const item of this.checkedItems) {
        let obj = {};
        obj.pid = item.pid;
        obj.num = item.num;
        this.form.orderItemsPidNum.push(obj);
      }
      //下订单
      let date = new Date();
      this.form.orderCode = this.dateToSqlCode(date);
      this.form.createDate = this.dateToSqlDate(date);
      this.form.uid = parseInt(this.uid);
      console.log(this.form);
      this.axios({
        method: "post",
        url: "http://localhost:3000/addOrderShopping",
        data: {
          form: this.form
        }
      })
        .then(res => {
          // console.log(res);
          this.dialogFormVisible = false;
          cookieAbout.setCookie(
            "cartNum",
            parseInt(cookieAbout.getCookie("cartNum")) -
              this.checkedItems.length,
            1
          );
          // window.alert("成功");
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
