<template>
  <div>
    <div class="voteManageList">
      <div
        class="voteManageItem"
        v-for="activityItem in activity"
        :key="activityItem.id"
      >
        <div class="voteManageItemTitle">
          <div>
            活动名称: <span>{{ activityItem.title }}</span>
          </div>

          <el-switch
            v-model="activityItem.activityFlag"
            active-text="活动开启"
            inactive-text="关闭"
          >
          </el-switch>
        </div>
        <div class="voteManageItemDate">
          <span>ID: {{ activityItem.id }}</span>
          <span>创建时间: {{ activityItem.createTime }}</span>
        </div>

        <div class="imag_box">
          <!--- 活动关闭图片 -->
          <div v-if="activityItem.activityFlag == false" class="guanbi">
            活动已关闭
          </div>
          <img class="voteManageItemImage" :src="activityItem.activityImage" />
        </div>

        <div class="shijianqujian">
          <i class="el-icon-date"></i>{{ activityItem.beginTime }} -
          {{ activityItem.endTime }}
        </div>

        <div class="activityData">
          <div class="activityDataItem">
            <p class="activityCout">{{ activityItem.playerCount }}</p>
            <p>选手数</p>
          </div>
          <div class="activityDataItem">
            <p class="activityCount">{{ activityItem.votesCount }}</p>
            <p>投票数</p>
          </div>
          <div class="activityDataItem">
            <p class="activityCount">{{ activityItem.views }}</p>
            <p>浏览量</p>
          </div>
        </div>

        <div class="activityButtonGroup">
          <el-button size="small" type="primary" icon="el-icon-document-copy"
            >活动修改</el-button
          >
          <el-button size="small" type="info" plain icon="el-icon-sunrise-1"
            >选手管理</el-button
          >
          <el-button size="small" type="success" plain icon="el-icon-printer"
            >数据导出</el-button
          >
        </div>

        <div class="activityLook">
          <el-button type="primary">查看活动链接及二维码</el-button>
        </div>
      </div>
    </div>
    <el-pagination
      current-page="1"
      :page-sizes="[1, 3, 6]"
      page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      total="25"
      class="pagination_style"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: [
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
        {
          title: "ssss",
          activityFlag: true,
          id: 1,
          createTime: "2021-05-06 16:20:52",
          activityImage:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          beginTime: "2021-05-06 16:20:52",
          endTime: "2021-05-21 22:00:00",
          playerCount: 70,
          votesCount: 1000,
          views: 9999,
        },
      ],
    };
  },
  methods: {
    handleSelect(tab, event) {},
  },
};
</script>

<style scoped>
.voteManageItemTitle {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  padding-top: 3px;
  font-size: 14px;
}

.voteManageItemTitle span {
  color: #666;
}

.voteManageItemDate {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  font-size: 14px;
}
.voteManageList {
  width: 100%;
  min-height: 480px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.voteManageItem {
  width: 350px;
  height: 480px;
  min-height: 480px;
  border: 1px solid black;
  border-radius: 10px;
  border-color: #cccc;
  padding-left: 10px;
  padding-right: 5px;
  color: #333;
  margin-top: 20px;
}

.shijianqujian {
  width: 100%;
  color: #fff;
  text-align: center;
  position: relative;
  left: 0;
  bottom: 30px;
  font-size: 14px;
}
.activityData {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 10px;
  line-height: 5px;
}
.activityDataItem {
  width: 42px;
  height: 42px;
}
.activityCount {
  color: rgba(18, 76, 224, 1);
}

.activityButtonGroup {
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  margin-top: 10px;
}
.activityLook {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.voteManageItemImage {
  border-radius: 10px;
  width: 100%;
}

.imag_box {
  display: flex;
  position: relative;
}

.guanbi {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  border: 1px solid red;
  position: absolute;
  opacity: 0.78;
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  line-height: 200px;
}
.pagination_style {
  float: right;
}
</style>