<template>
  <div class="details">
    <div class="notice-details">
      <h3>习近平的扶贫相册丨小角落大民生 这件“小事”总书记一直关心</h3>
      <p class="author">
        <span>
          <img
            :src="avaotrUrl"
            height="30px"
            width="30px"
            style="border-radius: 50%"
            alt
          />
        </span>
        <span>测试账户</span>
      </p>
      <p class="tip">
        <span>
          <i class="el-icon-date"></i>
          2020.8.20 20:57:23
        </span>
        <span>
          <i class="el-icon-view"></i>
          23
        </span>
      </p>
      <div
        class="content"
        style="min-height: 150px; font-size: 18px"
        v-html="content"
      ></div>
    </div>
    <NoticeCut :otherNotcie="otherNotcie"></NoticeCut>
  </div>
</template>

<script>
import NoticeCut from "@/compoents/manage/NoticeCut";

export default {
  components: {
    NoticeCut,
  },
  data() {
    return {
      avaotrUrl:
        "http://cpc.people.com.cn/NMediaFile/2021/0511/MAIN202105111649000198686590044.jpg",
      content:
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd<h1>333<h2>",
      otherNotcie: [],
    };
  },
  created() {
    const id = this.$route.query.id;
    this.setNotice(id);
  },
  methods: {
    // 获取通知信息
    setNotice(id) {},
  },
};
</script>

<style scoped>
.details {
  border: 1px solid #ccc;
  border-radius: 10px;
  min-height: 550px;
}
.notice-details {
  padding: 20px 0;
  font-size: 20px;
  padding-bottom: 40px;
}

.notice-details .author {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.notice-details .author span {
  margin: 0 5px;
}

.notice-details .tip {
  font-size: 14px;
}

.notice-details .tip span {
  margin: 0 5px;
}

.notice-details .el-tag {
  margin: 0 3px;
}

.notice-details .content img {
  max-width: 80%;
  max-height: 50%;
  display: block;
  margin: auto;
}

.notice-details .fr-img-wrap {
  text-align: center;
  display: block;
}

.notice-details .fr-inner {
  display: block;
  text-align: center;
}

a {
  color: #00a1ff;
}
.tip span:nth-child(1) {
  color: #00a1ff;
}

.tip span:nth-child(2) {
  color: #ccc;
}
</style>