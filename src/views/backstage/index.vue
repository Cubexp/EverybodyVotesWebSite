<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <el-row>
        <el-col :span="3">
          <el-image
            style="width: 160px; height: 55px"
            :src="logoUrl"
          ></el-image>
        </el-col>
        <el-col :span="3" :offset="15" class="loginedStyle">
          <el-avatar
            class="logined_avatar"
            :size="40"
            :src="userInfo.avatar"
          ></el-avatar>
          <div style="color: red; margin-top: 20px; margin-left: 3px">
            {{ userInfo.name }}
          </div>
        </el-col>
        <el-col :span="3">
          <el-button
            type="success"
            class="login-button"
            plain
            @click="$router.push('/home')"
            >首页</el-button
          >
          <el-button class="login-button" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
        <!-- 侧边栏 菜单区 -->
        <!-- 不加冒号 就是字符 -->
        <el-menu
          :unique-opened="true"
          text-color="black"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.name }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.address"
              v-for="subItem in item.lists"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.address)"
            >
              <template slot="title">
                <i :class="iconsObj[subItem.id]"></i>
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
      //左侧菜单数据
      menuList: [
        {
          id: 125,
          name: "帮助中心",
          address: "backstage/newsList",
          lists: [
            {
              id: 101,
              name: "公告列表",
              address: "backstage/newsList",
            },
            {
              id: 102,
              name: "公告类别",
              address: "backstage/newsType",
            },
            {
              id: 103,
              name: "发布公告",
              address: "backstage/newsPublish",
            },
          ],
        },
      ],
      iconsObj: {
        125: "el-icon-reading",
        101: "el-icon-coffee-cup",
        102: "el-icon-cold-drink",
        103: "el-icon-water-cup",
        145: "iconfont icon-changyongtubiao_yunyingshitu",
      },
      //被激活的链接地址
      activePath: "",
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    async getUserInfo() {
      let id = window.localStorage.getItem("id");
      const { data: res } = await this.$http.get("/user/" + id);

      console.log(res);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.userInfo = res.data;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    async logout() {
      const { data: res } = await this.$http.put("/oauth/logout");

      if (res.code !== 200) {
        this.$message.error(res.message);
      }

      let localstorage = window.localStorage;
      localstorage.clear();
      this.$router.push("/home");
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
  border: 1px solid #ccc;
}
.login-button {
  margin-top: 10px;
  margin-left: 10px;
}
.loginedStyle {
  display: flex;
}
.logined_avatar {
  margin-top: 8px;
}
</style>