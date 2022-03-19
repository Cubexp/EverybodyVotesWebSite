<template>
  <el-header>
    <el-row>
      <el-col :span="2" :offset="4">
        <el-image style="width: 40px; height: 35px; margin-top:10px" :src="require('@/assets/image/header/head_logo.png')"></el-image>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="title_hover title_hover2">
          <p @click="$router.push('/home')">首页</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="title_hover">
          <p @click="$router.push('/create')">免费创建</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="title_hover">
          <p @click="$router.push('/manage')">投票管理</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="title_hover">
          <p @click="$router.push('/help')">帮助中心</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="title_hover">
          <p @click="$router.push('/about')">关于我们</p>
        </div>
      </el-col>

      <div v-if="isLogined == false">
        <el-col :span="2">
          <el-button
            class="register-button"
            type="danger"
            @click="$router.push('/login')"
            >立即注册</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button class="login-button" @click="$router.push('/login')"
            >登陆</el-button
          >
        </el-col>
      </div>

      <div v-if="isLogined == true">
        <el-col :span="2" class="logined_style">
          <el-avatar
            class="logined_avatar"
            :size="20"
            :src="userInfo.avatar"
          ></el-avatar>
          <div style="color: red; margin-top: 20px; margin-left: 3px">
            {{ userInfo.name }}
          </div>
        </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="2" v-if="isAdmin == true">
          <el-button
            type="success"
            class="login-button"
            plain
            @click="$router.push('/backstage')"
            >后台管理</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button class="login-button" @click="logout">退出</el-button>
        </el-col>
      </div>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
      isLogined: false,
      isAdmin: false,
      id: 0,
      userInfo: {},
    };
  },
  created() {
    let localstorage = window.localStorage;
    this.id = localstorage.getItem("id");

    this.isLogined = localstorage.getItem("token") != null ? true : false;
    this.isAdmin = localstorage.getItem("roleName") === "admin" ? true : false;

    if (this.isLogined == true) {
      this.getUserInfo();
    }
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get("/user/" + this.id);

      console.log(res);

      if (res.code !== 200) {
        if (res.code == 401) {
          return this.$router.push("/error/401");
        }
        return this.$message.error(res.message);
      }

      this.userInfo = res.data;
    },
    async logout() {
      const { data: res } = await this.$http.put("/oauth/logout");

      if (res.code !== 200) {
        this.$message.error(res.message);
      }

      let localstorage = window.localStorage;
      localstorage.removeItem("id");
      localstorage.removeItem("token");
      localstorage.removeItem("roleName");

      this.$router.go(0);

      this.$message.success(res.message);
    },
  },
};
</script>
<style scoped>
.el-header {
  min-height: 60px;
  background-color: white;
  padding: 0px;
}
.register-button {
  margin-top: 10px;
}
.login-button {
  margin-top: 10px;
  margin-left: 5px;
}
.title_hover {
  height: 43px;
  width: 50%;
  border: 1px solid white;
}
.title_hover:hover {
  border-bottom: 2px solid red;
  color: red;
  cursor: pointer;
}
.title_hover2 {
  width: 25%;
}
.userInfo_avator {
  width: 30px;
  height: 30px;
  border-radius: 10px;
}
.logined_avatar {
  margin-top: 20px;
}
.logined_style {
  display: flex;
}
</style>