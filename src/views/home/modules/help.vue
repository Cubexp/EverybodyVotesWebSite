<template>
  <div>
    <div class="helpbanner">
      <img :src="help_banner_background" alt="" />
    </div>
    <el-row>
      <el-col
        :span="2"
        v-for="newsTypeItem in newsTypeList"
        :key="newsTypeItem.id"
      >
        <el-button round @click="getNewsList(newsTypeItem.id)">{{
          newsTypeItem.name
        }}</el-button>
      </el-col>
    </el-row>
    <div class="content_about">
      <div class="practical_functions_title">
        <div>
          {{ currentNewsType.name.substr(0, 2)
          }}<span>{{
            currentNewsType.name.substr(2, currentNewsType.name.length)
          }}</span>
        </div>
        <p class="practical_functions_about">{{ currentNewsType.remark }}</p>
      </div>

      <div class="notice_list">
        <div
          class="notice_item"
          v-for="newsItem in newsList"
          :key="newsItem.id"
          @click="directNewsInfo(newsItem.id)"
        >
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">{{ newsItem.title }}</div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="newsQueryInfo.currentPage"
        :page-sizes="[1, 3, 5]"
        :page-size="newsQueryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination_style"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      help_banner_background:
        "https://www.rrwtp.com/static/index/img/bangzhu.jpg",
      newsTypeList: [],
      newsList: [],
      currentNewsType: {
        id: "",
        name: "",
        remark: "",
      },
      querInfo: {
        currentPage: 1,
        limit: 100,
      },
      total: 0,
      newsQueryInfo: {
        //当前页数
        currentPage: 1,
        //当前每次显示多少条数据
        limit: 5,
        status: 1,
        title: null,
        typeId: 0,
      },
    };
  },
  created() {
    this.getNewsTypeList();
  },
  methods: {
    async getNewsTypeList() {
      const { data: res } = await this.$http.get("/newsType/page", {
        params: this.querInfo,
      });

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.newsTypeList = res.data.records;

      if (this.newsTypeList.length > 0) {
        this.currentNewsType = this.newsTypeList[0];
        console.log(this.currentNewsType);
        this.getNewsList(this.currentNewsType.id);
      }
      console.log(res);
    },
    async getNewsList(newsTypeId) {
      this.newsQueryInfo.typeId = newsTypeId;
      console.log(this.newsQueryInfo);
      const { data: res } = await this.$http.get("/news/page", {
        params: this.newsQueryInfo,
      });

      this.newsList = res.data.records;
      this.total = res.data.total;

      this.newsTypeList.forEach((item) => {
        if (item.id === newsTypeId) {
          this.currentNewsType = item;
        }
      });
    },
    //监听pageSize 改变的事件
    handleSizeChange(newSize) {
      console.log("新闻类别id" + this.currentNewsType.id);
      this.newsQueryInfo.limit = newSize;
      this.getNewsList(this.currentNewsType.id);
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log("新闻类别id" + this.currentNewsType.id);
      this.newsQueryInfo.currentPage = newPage;
      this.getNewsList(this.currentNewsType.id);
    },
    directNewsInfo(id) {
      this.$router.push({ path: `/helpDetail/${id}` });
    },
  },
};
</script>

<style scoped>
.helpbanner {
  width: 100%;
}
.helpbanner img {
  width: 100%;
}

.content_about {
  padding-bottom: 60px;
  width: 100%;
}

.practical_functions_title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}

.practical_functions_title div {
  font-size: 24px;
}

.practical_functions_about {
  color: #666666;
  font-size: 20px;
}

.practical_functions_title span {
  color: #fe4f4d;
}

.notice_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.notice_item {
  margin-top: 10px;
  cursor: pointer;
  width: 260px;
  height: 150px;
  position: relative;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.notice_image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.title {
  font-size: 13px;
  text-align: center;
  position: absolute;
  top: 70px;
  left: 10px;
}
.pagination_style {
  float: right;
}
</style>