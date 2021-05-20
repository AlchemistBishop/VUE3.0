<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.index"
          @click="changeMenue(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--表单-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="medium "
      >
        <el-form-item prop="username" :style="itemFrom">
          <label style="color: white">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" :style="itemFrom">
          <label style="color: white">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

<el-form-item prop="passwords" :style="itemFrom" v-if="model ==='register'">
          <label style="color: white">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" :style="itemFrom">
          <label style="color: white">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" :style="loginBlock"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="login-block">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :style="loginBlock"
            style="marginTop: 20px"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validateEmail,validatePassword,validateCode } from "@/utils/validate";
export default {
  name: "login",
  data() {
    //验证邮箱
    var chneckEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validatePassword(value)) {
        callback(new Error("密码需为6-20位字母数字或字符的组合"));
      } else {
        callback();
      }
    };
    var checkPasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    //校验验证码
    var checkCode = (rule, value, callback) => {
      
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      isActive: 0,
      //当前处于模块
      model:'login',
      menuTab: [
        { txt: "登录", current: true ,type:'login'},
        { txt: "注册", current: false,type:'register' },
      ],
      //表单的数据
      ruleForm: {
        username: "",
        password: "",
        passwords:"",
        code: "",
      },
      rules: {
        username: [{ validator: chneckEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        passwords: [{ validator: checkPasswords, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      loginBlock: {
        width: "100%",
        display: "block",
      },
      itemFrom: {
        marginBottom: "13px",
      },
    };
  },
  created() {},
  //挂在完成后自动执行的
  mounted() {},
  methods: {
    changeMenue(data) {
      this.menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #abd1f5;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: #2c4258;
  }
}
</style>