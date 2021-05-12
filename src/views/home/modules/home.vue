<template>
  <div class="home_continer">
    <el-carousel :interval="4000" type="card" height="300px" autoplay="true">
      <el-carousel-item v-for="item in pictrues" :key="item">
        <el-image
          style="width: 800px; height: 300px"
          :src="item"
          :fit="contain"
        ></el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="practical_functions1">
      <div class="practical_functions_title">
        实用
        <span>功能</span>
      </div>
    </div>
    <div class="practical_functions1">
      <div class="practical_functions_title_english">
        <p>Practical Functions</p>
      </div>
    </div>

    <div class="practical_functions2">
      <div
        v-for="practicalItem in practical_functionss"
        :key="practicalItem.id"
        class="practicalItem"
      >
        <img class="practical_img" :src="practicalItem.url" />
        <p class="practical_title">{{ practicalItem.title }}</p>
        <p class="practical_describe">{{ practicalItem.describe }}</p>
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
      practical_functionss: [
        {
          id: 1,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon1.png",
          title: "免费创建",
          describe: "极简模式，3分钟即可完成活动搭建",
        },
        {
          id: 2,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon2.png",
          title: "视频支持",
          describe: "视频支持BiliBili视频通用代码在线播放视频",
        },
        {
          id: 3,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon4.png",
          title: "数据导出",
          describe:
            "排行榜，投票可实时查看便携管理清晰明确的活动管理模式方便管理",
        },
        {
          id: 4,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon5.png",
          title: "便携管理",
          describe: "清晰明确的活动管理模式方便管理",
        },
        {
          id: 5,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon7.png",
          title: "不限数量",
          describe: "不限制投票活动创建数量想做多久都可以",
        },
        {
          id: 6,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon8.png",
          title: "分组设置",
          describe: "可以设置不同选手分组分组报名，分组投票",
        },
        {
          id: 7,
          url: "https://www.rrwtp.com/static/index/img/index/gn_icon6.png",
          title: "实时预览",
          describe: "创建时整体效果预览更清晰操作",
        },
      ],
    };
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.practical_functions1 {
  display: flex;
  justify-content: center;
}

.practical_functions2 {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100px;
  width: 60%;
  margin: 0 auto;
}

.practicalItem {
  width: 216px;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}

.practicalItem img {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
}
.practical_functions_title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.practical_functions_title span {
  color: #fe4f4d;
}
.practical_functions_title_english {
  font-size: 22px;
  font-weight: 400;
  color: rgba(97, 97, 97, 1);
}
.practical_title {
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  line-height: 10px;
}

.practical_describe {
  color: #666666;
  display: block;
  font-size: 14px;
}
</style>