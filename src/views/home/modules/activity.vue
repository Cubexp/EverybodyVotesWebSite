<template>
  <div :class="activitFlag == true ? 'box' : 'activityClose'">
    <!-- 活动开启中 -->
    <div v-if="activitFlag == true">
      <div v-if="activity.coverType == 0" class="coverImg">
        <el-carousel
          :interval="4000"
          type="card"
          height="300px"
          autoplay="true"
        >
          <el-carousel-item v-for="item in activity.coverImages" :key="item">
            <el-image
              style="width: 800px; height: 300px"
              :src="item"
              fit="contain"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="activity.coverType == 1" class="coverVideo">
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
          <el-badge :value="activity.playerCount" class="item">
            <el-button
              icon="el-icon-user
"
              size="small"
              >己报名</el-button
            >
          </el-badge>
        </el-col>

        <el-col :span="2">
          <el-badge :value="activity.voteCount" class="item">
            <el-button
              icon="el-icon-coordinate
"
              size="small"
              >{{ getTileType }}</el-button
            >
          </el-badge>
        </el-col>

        <el-col :span="2">
          <el-badge :value="activity.views" class="item">
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
          <el-button type="success" plain @click="activitySingup"
            >俺要报名!</el-button
          >
        </el-col>

        <p class="voteRemark">谁都不能阻止俺报名！！！</p>
      </el-row>

      <!-- 选 手 -->
      <el-row style="margin-top: 10px">
        <el-col :span="20" :offset="4">
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
              <el-col :span="1">
                <span class="playerGroup">分组:</span>
              </el-col>
              <el-col
                :span="2"
                v-for="playerGroupItem in activity.group"
                :key="playerGroupItem.id"
              >
                <el-button
                  round
                  @click="getPlayerListBygroupId(playerGroupItem.id)"
                  >{{ playerGroupItem.name }}</el-button
                >
              </el-col>
            </el-row>

            <!-- 选手 -->
            <el-row>
              <el-col
                :span="6"
                style="margin-top: 20px"
                :offset="1"
                v-for="playerItem in playerList"
                :key="playerItem.id"
              >
                <div class="playerBox">
                  <div class="playerHeader">
                    <span>{{ playerItem.number }}号</span>
                    <img :src="playerItem.imgUrl" />
                  </div>
                  <div class="playerFooter">
                    <span>{{ playerItem.name }}</span>
                    <span>{{ playerItem.votesCount }} {{ getTickType }}</span>
                  </div>
                  <div class="playerRemark">
                    <p>{{ playerItem.remark }}</p>
                  </div>
                  <div class="playerVote">
                    <el-button
                      v-if="activity.voteButtonType == 1"
                      style="margin-left: 40%"
                      size="small"
                      type="danger"
                      @click="likesClick(playerItem.id, playerItem.group.id)"
                      plain
                      >点赞</el-button
                    >
                    <el-button
                      v-if="activity.voteButtonType == 2"
                      style="margin-left: 35%"
                      size="small"
                      type="danger"
                      plain
                      @click="voteClick(playerItem.id, playerItem.group.id)"
                      >投票</el-button
                    >
                    <el-button
                      v-if="activity.voteButtonType == 3"
                      style="margin-left: 35%"
                      size="small"
                      type="danger"
                      @click="scoreClick(playerItem.id, playerItem.group.id)"
                      plain
                      >评分</el-button
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

      <!-- 报名 -->
      <el-dialog
        title="报名信息表"
        :visible.sync="playerSingupDialogVisible"
        width="30%"
      >
        <el-form
          ref="sginupFormRef"
          :model="singupForm"
          :rules="singupFormRules"
          label-width="60px"
          class="login_form"
        >
          <el-form-item label="封面">
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过4mb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            v-if="activity.groupFlag == true"
            label="分组"
            prop="phone"
          >
            <el-select
              v-model="singupForm.groupId"
              v-for="groupItem in activity.group"
              :key="groupItem.id"
              placeholder="请选择活动区域"
            >
              <el-option
                :label="groupItem.name"
                :value="groupItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input
              v-model="singupForm.remark"
              placeholder="描述"
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="btns" type="primary" @click="sginUpClick"
              >报名</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 打分 -->

      <el-dialog
        title="评分"
        :visible.sync="votesScoreDialogVisible"
        width="30%"
      >
        <el-form
          ref="voteScoreFormRef2"
          label-width="60px"
          :model="voteScore"
          :rules="voteScoreRules"
          class="login_form"
        >
          <el-form-item label="分数" prop="score">
            <el-input v-model="voteScore.value" type="text"></el-input>
            <span class="voteRanage">{{ voteRemakr }}</span>
          </el-form-item>

          <el-form-item>
            <el-button class="btns" type="primary" @click="voteScoreClick"
              >评分</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 活动未开启 -->
    <div v-else-if="activitFlag == false">
      <div class="box-card3">
        <img :src="require('@/assets/image/activityClose.png')" alt="" />
        <h4>活动己关闭</h4>
        <p>Activity closed</p>
      </div>
    </div>
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
      playerGroupList: [],
      activityId: 0,
      activitFlag: true,
      activity: {},
      endTime: 0,
      beginTime: 0,
      // 选手报名对话框可视
      playerSingupDialogVisible: false,
      votesScoreDialogVisible: false,
      voteScore: {
        value: 0.0,
        activityId: 0,
        playerId: 0,
        votePersonId: 0,
      },
      // 报名表单验证
      singupFormRules: {
        remark: [
          { required: true, message: "请输入描述", trigger: "blur" },
          {
            min: 5,
            max: 200,
            message: "长度在 5 到 40 个字符",
            trigger: "blur",
          },
        ],
      },
      voteScoreRules: {
        score: [{ type: "number", message: "评分必须为数字值" }],
      },
      singupForm: {
        activityId: 1,
        userId: 0,
        groupId: "",
        remark: "",
        imgUrl: "",
      },
      headerObj: {
        t: window.localStorage.getItem("token"),
      },
      uploadURL: "http://localhost:8081/user/avatar",
      previcewPath: "",
      srcList: [],
      playerList: [],
      voteRemakr: "",
    };
  },
  computed: {
    getTileType: function () {
      if (this.activity.voteButtonType == 1) {
        return "总点赞";
      }
      if (this.activity.voteButtonType == 2) {
        return "总投票";
      } else {
        return "总评分";
      }
    },
    getTickType: function () {
      if (this.activity.voteButtonType == 1) {
        return "点赞";
      }
      if (this.activity.voteButtonType == 2) {
        return "投票";
      } else {
        return "评分";
      }
    },
  },
  created() {
    this.activityId = this.$route.params.id;

    this.getActivityInfo(this.activityId);
    setInterval(this.getRTime, 1000);

    this.addActivityViews(this.activityId);
  },
  methods: {
    async activitySingup() {
      if (!this.activitFlag) {
        return this.$message.error("该活动未开启报名!!!");
      }

      let userId = window.localStorage.getItem("id");

      if (!userId) {
        return this.$message.error("请先登陆!");
      }
      this.playerSingupDialogVisible = true;
    },
    async getActivityInfo(activityId) {
      const { data: res } = await this.$http.get(`/activity/${activityId}/all`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.activity = res.data;
      this.activitFlag = res.data.status;

      this.endTime = res.data.endTime;
      this.beginTime = res.data.beginTime;
      this.activityDate = [
        new Date(res.data.beginTime),
        new Date(res.data.endTime),
      ];
      if (this.activity.groupFlag) {
        this.getPlayerListBygroupId(this.activity.group[0].id);
      } else {
        this.getAllPlayerList();
      }
      this.voteRemakr = `评分范围:${this.activity.inputRangeBegin} ~ ${this.activity.inputRangeEnd}`;
    },
    async addActivityViews(activityId) {
      const { data: res } = await this.$http.post(`/activity/${activityId}`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
    },
    getRTime() {
      let t = this.endTime - this.beginTime;
      this.beginTime += 1000;

      this.countDown.day = Math.floor(t / 1000 / 60 / 60 / 24);
      this.countDown.hour = Math.floor((t / 1000 / 60 / 60) % 24);
      this.countDown.minute = Math.floor((t / 1000 / 60) % 60);
      this.countDown.second = Math.floor((t / 1000) % 60);

      if (t <= 0) {
        // 活动关闭
        this.activitFlag = false;
      }
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
    // 处理图片预览效果
    handlePreview(file) {
      this.previcewPath = file.response.data;
    },
    // 处理移除图片的操作
    handleRemove(file) {
      const filePath = file.response.data;
      const i = this.srcList.findIndex((x) => x === filePath);

      this.srcList.splice(i, 1);
      this.singupForm.imgUrl = "";
      console.log(this.addForm);
    },
    // 监听图片上传成功
    handleSuccess(response) {
      if (response.code !== 200) {
        return this.$message.error("上传文件失败!" + response.message);
      }

      console.log(response);
      // 2.将图片信息对象push 到 pics 数组中
      this.singupForm.imgUrl = response.data;
      this.srcList = new Array(response.data, response.data);
    },
    async sginUpClick() {
      this.singupForm.userId = Number.parseInt(
        window.localStorage.getItem("id")
      );
      this.singupForm.activityId = Number.parseInt(this.activityId);
      this.singupForm.groupId = Number.parseInt(this.singupForm.groupId);
      console.log(this.singupForm);

      const { data: res } = await this.$http.post(
        "/player/enter/activity",
        this.singupForm
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      if (!this.activity.singUpFlag) {
        this.$message.success("报名成功");
      } else {
        this.$message.success(
          "报名成功!由于该活动开启了报名审核!请等待活动发起人审核!留意邮箱通知!"
        );
      }

      this.playerSingupDialogVisible = false;
    },
    async getPlayerListBygroupId(playerGroupId) {
      let queryInfo = {
        currentPage: 1,
        limit: 1000,
        activityId: this.activityId,
        status: true,
        sortType: -1,
        playerName: "",
        phone: "",
        groupId: playerGroupId,
      };
      const { data: res } = await this.$http.get("/player/page", {
        params: queryInfo,
      });

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.playerList = res.data.records;
      console.log(res);
    },
    async getAllPlayerList() {
      let queryInfo = {
        currentPage: 1,
        limit: 1000,
        activityId: this.activityId,
        status: true,
        sortType: -1,
        playerName: "",
        phone: "",
        groupId: -1,
      };
      const { data: res } = await this.$http.get("/player/page", {
        params: queryInfo,
      });

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.playerList = res.data.records;
      console.log(res);
    },
    async likesClick(userId, userGroupId) {
      //匿名投票未开启
      if (!this.activity.secretVoteFlag) {
        let logined = window.localStorage.getItem("id");

        if (!logined) {
          return this.$message.error("请先登陆！该活动未开启匿名投票哦！");
        }
      }

      let currentVotePersonId = window.localStorage.getItem("id")
        ? window.localStorage.getItem("id")
        : null;
      let likesRequest = {
        activityId: this.activityId,
        playerId: userId,
        value: 1,
        votePersonId: currentVotePersonId,
      };
      const { data: res } = await this.$http.post("/vote/", likesRequest);

      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("点赞失败!" + res.message);
      }

      this.$message.success("点赞成功");
      this.getPlayerListBygroupId(userGroupId);
    },
    async voteClick(userId, userGroupId) {
      //匿名投票未开启
      if (!this.activity.secretVoteFlag) {
        let logined = window.localStorage.getItem("id");

        if (!logined) {
          return this.$message.error("请先登陆！该活动未开启匿名投票哦！");
        }
      }

      let currentVotePersonId = window.localStorage.getItem("id")
        ? window.localStorage.getItem("id")
        : null;
      let likesRequest = {
        activityId: Number.parseInt(this.activityId),
        playerId: userId,
        value: 1,
        votePersonId: Number.parseInt(currentVotePersonId),
      };
      const { data: res } = await this.$http.post("/vote/", likesRequest);

      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("投票失败!" + res.message);
      }

      this.$message.success("投票成功");
      this.getPlayerListBygroupId(userGroupId);
    },
    scoreClick(userId, userGroupId) {
      this.votesScoreDialogVisible = true;

      this.voteScore.activityId = this.activityId;
      this.voteScore.playerId = userId;
      this.voteScore.votePersonId = window.localStorage.getItem("id");
      this.voteScore.userGroupId = userGroupId;
    },
    async voteScoreClick() {
      console.log(this.voteScore);
      this.$refs.voteScoreFormRef2.validate(async (valid) => {
        if (!valid) return;
        if (!Number(this.voteScore.value)) {
          this.$message.error("必须是数值类型");
        }
        if (
          this.voteScore.value < this.activity.inputRangeBegin ||
          this.voteScore.value > this.activity.inputRangeEnd
        ) {
          return this.$message.error(
            `评分范围${this.activity.inputRangeBegin} ~ ${this.activity.inputRangeEnd}`
          );
        }

        let currentGroupId = this.voteScore.userGroupId;
        delete this.voteScore.userGroupId;

        const { data: res } = await this.$http.post("/vote/", this.voteScore);

        if (res.code !== 200) {
          return this.$message.error("评分失败!" + res.message);
        }
        this.$message.success("评分成功!");
        this.getPlayerListBygroupId(currentGroupId);
        this.votesScoreDialogVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  min-height: 800px;
  max-height: 1500px;
  border: 1px solid rgb(204, 204, 204, 0.5);
  border-radius: 20px;
}
.coverVideo {
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
  height: 350px;
  min-height: 350px;
  max-height: 600px;
  border: 1px solid rgb(204, 204, 204, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  margin-left: 45px;
}
.playerRemark {
  text-align: center;
  font-size: 13px;
  min-height: 70px;
}
.voteRanage {
  font-size: 13px;
  color: #ccc;
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
.box-card3 {
  width: 300px;
  height: 400px;
  text-align: center;
  margin-left: 40%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.box-card3 p {
  color: #ccc;
}
.activityClose {
  border: 1px solid rgb(204, 204, 204, 0);
}
.playerGroup {
  margin-top: 10px;
  display: block;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>