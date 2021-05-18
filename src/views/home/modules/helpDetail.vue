<template>
  <div class="details">
    <div class="notice-details">
      <h3>{{ news.title }}</h3>
      <p class="author">
        <span>
          <img
            :src="news.sysUser.avatar"
            height="30px"
            width="30px"
            style="border-radius: 50%"
            alt
          />
        </span>
        <span>{{ news.sysUser.name }}</span>
        <span class="tip">
          <i class="el-icon-date"></i>
          {{ news.createTime | dateFormat }}
        </span>
      </p>
      <div
        class="content"
        style="min-height: 150px; font-size: 18px"
        v-html="news.content"
      ></div>
    </div>
  </div>
</template>

<script>
import marked from "@/assets/js/marked";

export default {
  data() {
    return {
      news: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    this.getNotice(id);
  },
  methods: {
    // 获取通知信息
    async getNotice(id) {
      const { data: res } = await this.$http.get(`/news/${id}`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.news = res.data;
      this.news.content = marked(this.news.content);
      console.log(this.news);
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
.details {
  border: 1px solid rgb(204, 204, 204, 0.4);
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
.tip i {
  color: #00a1ff;
}

.tip {
  color: #ccc;
}
</style>