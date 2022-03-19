<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">当前位置:首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>我的创建活动</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs type="border-card" v-model="activeName" @tab-click="handleSelect">
      <el-tab-pane name="createActivity">
        <span slot="label" @click="$router.push('/create')"
          ><i class="el-icon-date"></i> 创建活动</span
        >
      </el-tab-pane>
      <el-tab-pane name="voteManage">
        <span slot="label"> <i class="el-icon-postcard"></i> 投票管理</span>
        <VoteManage> </VoteManage>
      </el-tab-pane>
      <!-- 增删改查我要写吐了。。。这个功能，弄成以后扩展吧。。。 -->
      <!-- <el-tab-pane label="数据管理" name="dataManage">
        <span slot="label"> <i class="el-icon-trophy-1"></i> 我参加的活动</span>
        <DataManage></DataManage>
      </el-tab-pane> -->
      <el-tab-pane label="个人资料" name="personData">
        <span slot="label"> <i class="el-icon-user"></i> 个人资料</span>
        <PersonDetail></PersonDetail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VoteManage from "@/compoents/manage/VoteManage";
import PersonDetail from "@/compoents/manage/PersonDetail";
import DataManage from "@/compoents/manage/DataManage";

export default {
  components: {
    VoteManage,
    DataManage,
    PersonDetail,
  },
  data() {
    return {
      activeName: "voteManage",
    };
  },
};
</script>
<style scoped>
</style>