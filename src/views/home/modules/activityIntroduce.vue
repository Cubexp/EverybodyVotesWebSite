<template>
  <div class="box">
    <div class="contentBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>活动规则</span>
        </div>
        <div v-if="activity.voteRuleType == 1">
          一个号每天能投{{
            activity.playerVoteCount
          }}票，可将全部票投给同一个选手
        </div>
        <div v-if="activity.voteRuleType == 2">活动时间内只能投一票</div>
      </el-card>
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span>活动说明</span>
        </div>
        <div v-html="activity.ruleContent"></div>
      </el-card>
    </div>

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
import marked from "@/assets/js/marked";
export default {
  data() {
    return {
      activityId: 0,
      activity: {},
    };
  },
  created() {
    this.activityId = this.$route.params.id;
    this.getActivityInfo(this.activityId);
  },
  methods: {
    async getActivityInfo(activityId) {
      const { data: res } = await this.$http.get(`/activity/${activityId}/all`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.activity = res.data;
      this.activity.ruleContent = marked(this.activity.ruleContent);
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
.contentBox {
  display: flex;
  justify-content: space-around;
}
.box-card {
  width: 400px;
  height: 300px;
  margin-left: 10px;
  margin-top: 50px;
}
.box-card2 {
  width: 550px;
  height: 480px;
  min-height: 250px;
  margin-left: 10px;
  margin-top: 50px;
}
</style>
