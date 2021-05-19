<template>
  <div class="box">
    <div class="contentBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>活动规则</span>
        </div>
        <div>
          5月18日，在黑龙江省穆棱林业局有限公司林场，被放归自然的野生东北虎从铁箱子里走出（视频截图）。5月18日，记者在黑龙江省穆棱林业局有限公司东兴林场套子房沟61林班看到，之前在密山市获得成功救护的野生东北虎，18日已被放归长白山老爷岭山脉一带。专家表示，这是我国首次成功救护并放归野生东北虎。
          新华社发
        </div>
      </el-card>
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span>活动说明</span>
        </div>
        <div>
          5月18日，在黑龙江省穆棱林业局有限公司林场，被放归自然的野生东北虎从铁箱子里走出（视频截图）。5月18日，记者在黑龙江省穆棱林业局有限公司东兴林场套子房沟61林班看到，之前在密山市获得成功救护的野生东北虎，18日已被放归长白山老爷岭山脉一带。专家表示，这是我国首次成功救护并放归野生东北虎。
          新华社发
        </div>
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
export default {
  data() {
    return {
      activityId: 0,
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
