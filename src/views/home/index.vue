<template>
  <el-container>
    <Header></Header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <Footer> </Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "@/compoents/Header";
import Footer from "@/compoents/Footer";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-container {
  height: 100%;
  width: 100%;
  position: relative;
}
.el-col {
  padding: 10px;
}
.el-col p {
  font-size: 16px;
  color: black;
}
.register-button {
  margin-top: 10px;
}
.login-button {
  margin-top: 10px;
}
.main {
  background-color: #f0f3fa;
}
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
</style>
