<template>
  <div id="login" >
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
          <label for="username" style="color: white">邮箱</label>
          <el-input
          id = "username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" :style="itemFrom">
          <label for="password" style="color: white">密码</label>
          <el-input
            id = "password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          :style="itemFrom"
          v-if="model === 'register'"
        >
          <label style="color: white">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" :style="itemFrom" >
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
              <el-button type="success" :style="loginBlock" @click="getSms()"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item >
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :style="loginBlock"

            style="marginTop: 20px"
            :disabled="loginStatus">{{model==='login'?"登录":"注册"}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import {GetSms} from '@/api/login.js'
import { reactive, ref, isRef, onMounted } from "@vue/composition-api";
import {validateEmail,validatePassword,validateCode,} from "@/utils/validate";
export default {
  name: "login",
  setup(props, {refs,root}) {
    //验证邮箱
    let  checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validatePassword(value)) {
        callback(new Error("密码需为6-20位字母数字或字符的组合"));
      } else {
        callback();
      }
    };
    let checkPasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    //校验验证码
    let checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    /*
    声明数据
    */
    //这里放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    //当前处于模块，基础类型用ref 对象用reactive
    const model = ref("login");
    //登录按钮禁用
    const loginStatus = ref(true);
    //表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    //表单验证规则
    const rules = reactive({
      username: [{ validator: checkEmail, trigger: "blur" }],
      password: [{ validator: checkPassword, trigger: "blur" }],
      passwords: [{ validator: checkPasswords, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
    });
    const loginBlock = reactive({
      width: "100%",
      display: "block",
    });
    const itemFrom = reactive({
      marginBottom: "13px",
    });
    //判断声明的数据是否是一个ref对象
    //console.log(isRef(model) ? true : false);
    /*
      声明函数
      */
    const changeMenue = (data) => {
      menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
    };
    /**
     * 获取验证码
     */
    let getSms = (()=>{
      if(ruleForm.username == ''){
        root.$message.error('邮箱不能为空');
        return false
      }if(validateEmail(ruleForm.username)){
        root.$message.error('邮箱格式有误，清重新输入');
        return false
      }
      loginStatus.value = false
      let requestData = {
          username : ruleForm.username,
          module:'login'
      }
      GetSms(requestData).then(response=>{
        loginStatus.value = false
      }).catch(error =>{

      });
    })
    /**
     * 提交表单
     */
    const submitForm = (formName) => {

      refs[formName].validate((valid) => {
        if (valid) {
          root.$message.error('submit');
          
        } else {
          root.$message.error('error submit!!');
          return false;
        }
      });
    };
    
    /*
      生命周期
      */
    //挂在完成后自动执行的
    onMounted(() => {
      console.log(process.env.VUE_APP_ABC)
    });
    return {
      menuTab,
      model,
      loginStatus,
      ruleForm,
      rules,
      loginBlock,
      itemFrom,
      changeMenue,
      submitForm,
      checkEmail,
      checkPassword,
      checkPasswords,
      checkCode,
      getSms
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
body {
  margin: 0px;
}
#login {
    width: 100%;
  height: 100vh;
  background-color: #abd1f5;
  margin:0px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: auto;

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
  .loginBlock{
    width: "100%";
      display: "block";
  }
  .itemFrom{
    margin-bottom: 13px;
  }

}
</style>