<template>
  <div>
    <el-row>
      <el-col :span="5" class="form_image" :offset="5">
        <el-image
          style="width: 480px; height: 410px"
          :src="logoUrl2"
          :fit="contain"
        ></el-image>
      </el-col>
      <el-col :span="5" class="from_div" :offset="2">
        <div class="login_div">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户登陆" name="login">
              <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="60px"
                class="login_form"
              >
                <el-form-item label="账号" prop="username">
                  <el-input
                    v-model="loginForm.username"
                    placeholder="请输入你的手机号码"
                    prefix-icon="el-icon-user"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="loginForm.password"
                    placeholder="请输入你的密码"
                    type="password"
                    prefix-icon="iconfont icon-3702mima"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="btns" type="primary" @click="login"
                    >登录</el-button
                  >
                </el-form-item>
                <el-form-item>
                  <el-col :span="24" :offset="17"
                    ><a
                      href="javascript:"
                      @click="forgivePasswordVisible = true"
                      >忘记密码</a
                    ></el-col
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register">
              <el-form
                ref="registerFormRef"
                :model="registerForm"
                :rules="registerFormRules"
                label-width="0px"
              >
                <!-- 用户名 -->
                <el-form-item prop="phone">
                  <el-input
                    placeholder="手机号码"
                    v-model="registerForm.phone"
                    prefix-icon="iconfont icon-user"
                  ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                  <el-input
                    v-model="registerForm.password"
                    prefix-icon="iconfont icon-3702mima"
                    type="password"
                    placeholder="密码"
                  ></el-input>
                </el-form-item>

                <!-- 注册码 -->
                <el-form-item prop="phoneCode">
                  <el-input
                    type="text"
                    clearable
                    style="width: 55%"
                    v-model="registerForm.emailCode"
                    prefix-icon="el-icon-s-comment"
                    placeholder="验证码"
                  ></el-input>
                  <el-button
                    icon="el-icon-message"
                    @click="send"
                    style="width: 40%; float: right"
                    type="success"
                    :disabled="(disabled = !show)"
                  >
                    <span v-show="show">验证码</span>
                    <span v-show="!show" class="count">{{ count }} s</span>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="btns2" type="primary" @click="register"
                    >注册</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!--- 忘记密码 -->
    <el-dialog
      custom-class="el-dialog-style"
      title="忘记密码"
      :visible.sync="forgivePasswordVisible"
      width="25%"
    >
      <el-form
        ref="forgetFormRef"
        :model="forgetForm"
        :rules="forgetFormRules"
        label-width="0px"
      >
        <!-- 用户名 -->
        <el-form-item prop="phone">
          <el-input
            placeholder="手机号码"
            v-model="forgetForm.phone"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="forgetForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="新密码"
          ></el-input>
        </el-form-item>

        <!-- 注册码 -->
        <el-form-item prop="phoneCode">
          <el-input
            type="text"
            clearable
            style="width: 55%"
            v-model="forgetForm.phoneCode"
            prefix-icon="el-icon-s-comment"
            placeholder="验证码"
          ></el-input>
          <el-button
            icon="el-icon-message"
            @click="send"
            style="width: 40%; float: right"
            type="success"
            :disabled="(disabled = !show)"
          >
            <span v-show="show">验证码</span>
            <span v-show="!show" class="count">{{ count }} s</span>
          </el-button>
        </el-form-item>
        <el-form-item class="forget_btn_group">
          <el-button @click="forgivePasswordVisible = false">取 消</el-button>
          <el-button type="primary" @click="forgivePassword">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const TIME_COUNT = 60;
export default {
  components: {},
  data() {
    return {
      // logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
      logoUrl2: "https://www.rrwtp.com/static/index/img/loginct.png",
      activeName: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        phone: "",
        password: "",
        phoneCode: "",
      },
      forgetForm: {
        phoneCode: "",
        password: "",
        phone: "",
      },
      show: true, // 初始启用按钮
      count: "", // 初始化次数
      timer: null,
      forgivePasswordVisible: false,
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 10,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
      registerFormRules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 10,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        //验证密码
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在6 到 15 个字符之间",
            trigger: "blur",
          },
        ],
        phoneCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "验证码长度5", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    register() {},
    login() {},
    forgivePassword() {},
  },
};
</script>

<style scoped>
.btns {
  width: 320px;
}
a {
  text-decoration: none;
  color: red;
  font-size: 15px;
}

.from_div {
  background-color: white;
  display: flex;
  justify-content: center;
  height: 400px;
  width: 450px;
  border-radius: 10px;
  margin-top: 5%;
  border: 1px solid red;
}
.login_div {
  width: 80%;
}

.el-form-item {
  margin-top: 30px;
}

.form_image {
  margin-top: 5%;
}

#footer_text {
  font-size: 15px;
  color: #cccccc;
  text-align: center;
}
.register {
  position: absolute;
  left: 5%;
  top: 90%;
  font-size: 15px;
  text-decoration: none;
}
.btns2 {
  width: 300px;
}
.forget_btn_group {
  display: flex;
  justify-content: center;
}
.style1 {
  border-radius: 10px;
  border: 2px red solid;
}
</style>
