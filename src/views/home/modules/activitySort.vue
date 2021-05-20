<template>
  <div class="box">
    <!-- 分组 -->
    <el-row style="margin-top: 10px; margin-left: 30%">
      <el-col
        :span="2"
        v-for="playerGroupItem in playerGroupList"
        :key="playerGroupItem.id"
      >
        <el-badge :value="12" class="item">
          <el-button round @click="getNewsList(playerGroupItem.id)">{{
            playerGroupItem.name
          }}</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <span>排行榜</span>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="number" label="编号" width="120">
        </el-table-column>
        <el-table-column property="name" label="用户名称" width="120">
        </el-table-column>
        <el-table-column property="count" label="票数"> </el-table-column>
      </el-table>
    </el-card>
    <!-- 底部菜单 -->
    <el-row style="margin-top: 10px; margin-bottom: 10px">
      <el-col :span="10" :offset="9">
        <el-button
          type="primary"
          icon="el-icon-s-shop
"
          plain
          @click="redirectHome"
          >首页</el-button
        >
        <el-button
          type="success"
          icon="el-icon-trophy-1
"
          plain
          @click="redirectSort"
          >排行榜</el-button
        >
        <el-button
          type="info"
          icon="el-icon-milk-tea
"
          @click="redirectIntroduce"
          plain
          >活动规则</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityId: 0,
      playerGroupList: [
        {
          id: 1,
          name: "语文",
        },
        {
          id: 1,
          name: "数学",
        },
      ],
      tableData: [
        {
          id: 1,
          number: 2,
          name: "cuberxp",
          count: 23,
        },
        {
          id: 2,
          number: 2,
          name: "cuberxp",
          count: 23,
        },
        {
          id: 3,
          number: 2,
          name: "cuberxp",
          count: 23,
        },
      ],
    };
  },
  created() {
    this.activityId = this.$route.params.id;
  },
  methods: {
    redirectHome() {
      this.$router.push({ path: `/activity/${this.activityId}` });
    },
    redirectSort() {
      this.$router.push({ path: `/activitySort/${this.activityId}` });
    },
    redirectIntroduce() {
      this.$router.push({ path: `/activityIntroduce/${this.activityId}` });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  min-height: 550px;
  max-height: 1500px;
  border: 1px solid rgb(204, 204, 204, 0.5);
  border-radius: 20px;
}
.box-card {
  width: 700px;
  height: 500px;
  margin-left: 25%;
  margin-top: 20px;
}
</style>
