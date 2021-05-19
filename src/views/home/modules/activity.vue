<template>
  <div class="box">
    <div v-if="coverType == 0" class="coverImg">
      <el-carousel :interval="4000" type="card" height="300px" autoplay="true">
        <el-carousel-item v-for="item in pictrues" :key="item">
          <el-image
            style="width: 800px; height: 300px"
            :src="item"
            :fit="contain"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-if="coverType == 1" class="coverVideo">
      <iframe
        :src="coverVideo"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="800px"
        height="400px"
        class="coverVideoItem"
      >
      </iframe>
    </div>

    <!-- 活动数据 -->
    <el-row>
      <el-col :span="2" :offset="9">
        <el-badge :value="12" class="item">
          <el-button
            icon="el-icon-user
"
            size="small"
            >己报名</el-button
          >
        </el-badge>
      </el-col>

      <el-col :span="2">
        <el-badge :value="12" class="item">
          <el-button
            icon="el-icon-coordinate
"
            size="small"
            >总投票</el-button
          >
        </el-badge>
      </el-col>

      <el-col :span="2">
        <el-badge :value="12" class="item">
          <el-button
            icon="el-icon-view
"
            size="small"
            >浏览量</el-button
          >
        </el-badge>
      </el-col>
    </el-row>

    <!-- 活动时间 -->
    <el-row>
      <el-col
        :span="14"
        :offset="20"
        style="margin-top: 10px; margin-left: 35%"
      >
        <el-date-picker
          v-model="activityDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          disabled
          size="small"
        >
        </el-date-picker>
      </el-col>
    </el-row>

    <!-- 活动倒计时  -->
    <el-row>
      <el-col :span="10" style="margin-top: 10px; margin-left: 44%">
        <i class="el-icon-loading"></i>
        <span class="noticeTitle">距离活动结束还有</span>
      </el-col></el-row
    >
    <el-row style="margin-top: 10px">
      <el-col :span="3" :offset="6">
        <el-progress
          type="circle"
          :percentage="countDown.day"
          :format="dayFormat"
        ></el-progress>
      </el-col>
      <el-col :span="3">
        <el-progress
          type="circle"
          :percentage="countDown.hour"
          :format="hourFormat"
          color="MediumOrchid"
        ></el-progress>
      </el-col>
      <el-col :span="3">
        <el-progress
          type="circle"
          :percentage="countDown.minute"
          :format="minuteFormat"
          color="Brown"
        ></el-progress>
      </el-col>
      <el-col :span="3">
        <el-progress
          type="circle"
          :percentage="countDown.second"
          :format="secondFormat"
          color="	DarkGray"
        ></el-progress>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="2" :offset="11">
        <el-button type="success" plain>俺要报名!</el-button>
      </el-col>

      <p class="voteRemark">谁都不能阻止俺报名！！！</p>
    </el-row>

    <!-- 选 手 -->
    <el-row style="margin-top: 10px">
      <el-col :span="20" offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选手</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            ></el-button>
          </div>
          <!-- 分组 -->
          <el-row>
            <el-col
              :span="3"
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

          <!-- 选手 -->
          <el-row>
            <el-col :span="6" style="margin-top: 20px" :offset="1">
              <div class="playerBox">
                <div class="playerHeader">
                  <span>3号</span>
                  <img
                    src="http://www.xinhuanet.com/photo/2021-05/18/1127460917_16213278412941n.jpg"
                  />
                </div>
                <div class="playerFooter">
                  <span>cuberxp</span>
                  <span>0票</span>
                </div>
                <div class="playerVote">
                  <el-button
                    style="margin-left: 35%"
                    size="small"
                    type="danger"
                    plain
                    >点赞</el-button
                  >
                </div>
              </div>
            </el-col>

            <el-col :span="6" :offset="1" style="margin-top: 20px">
              <div class="playerBox">
                <div class="playerHeader">
                  <span>3号</span>
                  <img
                    src="http://www.xinhuanet.com/photo/2021-05/18/1127460917_16213278412941n.jpg"
                  />
                </div>
                <div class="playerFooter">
                  <span>cuberxp</span>
                  <span>0票</span>
                </div>
                <div class="playerVote">
                  <el-button
                    style="margin-left: 35%"
                    size="small"
                    type="danger"
                    plain
                    >投票</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col :span="6" style="margin-top: 20px" :offset="1">
              <div class="playerBox">
                <div class="playerHeader">
                  <span>3号</span>
                  <img
                    src="http://www.xinhuanet.com/photo/2021-05/18/1127460917_16213278412941n.jpg"
                  />
                </div>
                <div class="playerFooter">
                  <span>cuberxp</span>
                  <span>0票</span>
                </div>
                <div class="playerVote">
                  <el-button
                    style="margin-left: 35%"
                    size="small"
                    type="danger"
                    plain
                    >投票</el-button
                  >
                </div>
              </div>
            </el-col>

            <el-col :span="6" :offset="1" style="margin-top: 20px">
              <div class="playerBox">
                <div class="playerHeader">
                  <span>3号</span>
                  <img
                    src="http://www.xinhuanet.com/photo/2021-05/18/1127460917_16213278412941n.jpg"
                  />
                </div>
                <div class="playerFooter">
                  <span>cuberxp</span>
                  <span>0票</span>
                </div>
                <div class="playerVote">
                  <el-button
                    style="margin-left: 35%"
                    size="small"
                    type="danger"
                    plain
                    >投票</el-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 底部菜单 -->
    <el-row style="margin-top: 10px; margin-bottom: 10px">
      <el-col :span="10" :offset="10">
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
      pictrues: [
        "https://wy.010zh.cn/web/static/img/banner.png",
        "https://wy.010zh.cn/web/static/img/banner2.png",
        "https://wy.010zh.cn/web/static/img/banner3.png",
      ],
      coverType: 0,
      coverVideo:
        "http://player.bilibili.com/player.html?aid=74300144&bvid=BV12E411t7w3&cid=127087669&page=9&as_wide=1",
      activityDate: [new Date(), new Date()],
      countDown: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
      success: "",
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
      activityId: 0,
    };
  },
  created() {
    this.activityId = this.$route.params.id;
    console.log(this.activityId);
    setInterval(this.getRTime, 1000);
  },
  methods: {
    getRTime() {
      var EndTime = new Date("2021/10/23 10:00:00"); //截止时间
      var NowTime = new Date();
      var t = EndTime.getTime() - NowTime.getTime();

      this.countDown.day = Math.floor(t / 1000 / 60 / 60 / 24);
      this.countDown.hour = Math.floor((t / 1000 / 60 / 60) % 24);
      this.countDown.minute = Math.floor((t / 1000 / 60) % 60);
      this.countDown.second = Math.floor((t / 1000) % 60);
    },
    //list.planQty*(list.fnshQty/100)
    secondFormat(percentage) {
      return percentage + "秒";
    },
    minuteFormat(percentage) {
      return percentage + "分钟";
    },
    hourFormat(percentage) {
      return percentage + "小时";
    },
    dayFormat(percentage) {
      return percentage + "天";
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
  min-height: 800px;
  max-height: 1500px;
  border-left: 1px solid rgb(204, 204, 204, 0.5);
  border-right: 1px solid rgb(204, 204, 204, 0.5);
  border-top: 1px solid rgb(204, 204, 204, 0.5);
  border-bottom: 1px solid rgb(204, 204, 204, 0.5);
  border-radius: 20px;
}
.coverVideo {
  border: 1px solid red;
  width: 100%;
  height: 400px;
}
.coverVideoItem {
  margin-left: 23%;
}
.totalClass {
  font-size: 14px;
}
.noticeTitle {
  font-size: 14px;
}
.voteRemark {
  font-size: 13px;
  color: #ccc;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 1100px;
  min-height: 600px;
  max-height: 1900px;
}

.playerBox {
  width: 100%;
  height: 270px;
  border: 1px solid rgb(204, 204, 204, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.playerHeader {
  position: relative;
}
.playerHeader span {
  color: white;
  width: 38px;
  height: 25px;
  font-size: 12px;
  background: DimGray;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 25px;
}

.playerFooter {
  display: flex;
  justify-content: space-between;
}
.playerFooter span:nth-child(1) {
  font-size: 15px;
  color: #000;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-left: 10px;
  color: #ccc;
}
.playerFooter span:nth-child(2) {
  margin-left: 10px;
  font-size: 14px;
  color: #000;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-right: 10px;
  color: rgba(18, 76, 224, 1);
}
.playerHeader img {
  width: 100%;
  height: 200px;
}
.playerVote {
  margin-top: 5px;
}
</style>