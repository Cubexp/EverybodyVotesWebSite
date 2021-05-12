<template>
  <el-header>
    <el-row>
      <el-col :span="2" :offset="4">
        <el-image
          style="width: 160px; height: 55px"
          :src="logoUrl"
          :fit="contain"
        ></el-image>
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
    </el-row>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
    };
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
</style>