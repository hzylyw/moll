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
        <el-form-item label="确认密码" prop="checkpwd" class="width_80">
          <el-input
            v-model="ruleForm.checkpwd"
            placeholder="确认密码"
            type="password"
            @input="checkpwd"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left:0;display:flex;">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <moll-footer></moll-footer>
  </el-container>
</template>

<script>
import mollFooter from "@/components/Footer.vue";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
        checkpwd: "",
        flag: false
      },
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        checkpwd: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    mollFooter
  },
  methods: {
    checkpwd() {
      if (this.ruleForm.pwd == this.ruleForm.checkpwd) {
        this.flag = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (this.ruleForm.pwd == this.ruleForm.checkpwd) {
          if (valid) {
            this.axios({
              method: "post",
              url: "http://localhost:3000/login",
              data: {
                userName: this.ruleForm.name,
                userPwd: this.ruleForm.pwd
              }
            })
              .then(res => {
                let data = res.data;
                console.log(data);
                if (data == "ok") {
                  window.alert("注册成功");
                  window.location.href = "/signIn";
                } else {
                  window.alert("出了点问题,请重新注册");
                  this.ruleForm.name = "";
                  this.ruleForm.pwd = "";
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        } else {
          window.alert("两次密码输入的不一样，请重新输入");
          this.ruleForm.name = "";
          this.ruleForm.pwd = "";
          this.ruleForm.checkpwd = "";
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
