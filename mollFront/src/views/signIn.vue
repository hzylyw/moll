<template>
  <el-container style="flex-direction:column;">
    <el-main class="signInMain">
      <el-form
        class="demo-ruleForm signInelForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <h3>账户登录</h3>
        <el-form-item label="用户" prop="name" class="width_80">
          <el-input v-model="ruleForm.name" placeholder="手机/会员名/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" class="width_80">
          <el-input v-model="ruleForm.pwd" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:0;display:flex;">
          <router-link :to="{path:'login'}">
            <el-button>立即注册</el-button>
          </router-link>

          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <moll-footer></moll-footer>
  </el-container>
</template>

<script>
import mollFooter from "@/components/Footer.vue";
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    mollFooter
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "http://localhost:3000/signIn",
            data: {
              userName: this.ruleForm.name,
              userPwd: this.ruleForm.pwd
            }
          })
            .then(res => {
              let data = res.data;
              console.log(data);
              if (data == "signIn error") {
                window.alert("用户名或者密码错误，请重新输入");
                this.ruleForm.name = "";
                this.ruleForm.pwd = "";
              } else {
                window.alert("登录成功");
                cookieAbout.setCookie("username", this.ruleForm.name, 1);
                cookieAbout.setCookie("uid", data["id"], 1);
                cookieAbout.setCookie("cartNum", data["COUNT(id)"], 1);
                window.location.href = "/";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signInMain {
  background-color: #f7f7f7;
  height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/static/1.jpg");
  margin: 20px 50px;
}
.signInelForm {
  width: 400px;
  background-color: white;
  margin-right: 400px;
  box-shadow: 1 2 1 #fefefe;
}
h3 {
  text-align: left;
  margin-left: 50px;
}
.width_80 {
  width: 80%;
}
.el-form-item >>> .el-form-item__content {
  margin-left: 0;
}
</style>
