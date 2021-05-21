<template>
  <div class="box">
    <!-- 分组 -->
    <el-row style="margin-top: 10px; margin-left: 25%">
      <el-col
        :span="2"
        v-for="playerGroupItem in group"
        :key="playerGroupItem.id"
      >
        <el-button round @click="getActivitySorByGroupId(playerGroupItem.id)">{{
          playerGroupItem.name
        }}</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <span>排行榜</span>
      <el-table
        ref="singleTable"
        :data="activitySort"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="排名" width="50">
        </el-table-column>
        <el-table-column property="number" label="编号" width="120">
        </el-table-column>
        <el-table-column property="name" label="用户名称" width="120">
        </el-table-column>
        <el-table-column
          v-if="activity.voteButtonType == 1"
          property="voteCount"
          label="票数"
        >
        </el-table-column>
        <el-table-column
          v-if="activity.voteButtonType == 2"
          property="voteCount"
          label="点选数"
        >
        </el-table-column>
        <el-table-column
          v-if="activity.voteButtonType == 3"
          property="averageScore"
          label="评分"
        >
        </el-table-column>
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
      activitySort: [],
      activity: {},
      group: [],
    };
  },
  created() {
    this.activityId = this.$route.params.id;
    this.getGroupId(this.activityId);
    this.getActivitySor();
  },
  methods: {
    async getGroupId(activityId) {
      const { data: res } = await this.$http.get(`/activity/${activityId}/all`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.group = res.data.group;
      this.activity = res.data;
    },
    async getActivitySor() {
      const { data: res } = await this.$http.get(
        `/activity/${this.activityId}/sort`,
        {
          params: {
            groupId: -1,
          },
        }
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.activitySort = res.data.records;
    },
    async getActivitySorByGroupId(groupId) {
      const { data: res } = await this.$http.get(
        `/activity/${this.activityId}/sort`,
        {
          params: {
            groupId: groupId,
          },
        }
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.activitySort = res.data.records;
    },
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
