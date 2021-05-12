<template>
  <div>
    <div class="helpbanner">
      <img :src="help_banner_background" alt="" />
    </div>
    <div class="content_about">
      <div class="practical_functions_title">
        <div>平台<span>公告</span></div>
        <p class="practical_functions_about">Platform announcement</p>
      </div>

      <div class="notice_list">
        <div class="notice_item">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">【平台公告】服务器升级维护完成</div>
        </div>
        <div class="notice_item">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">【平台公告】服务器升级维护完成</div>
        </div>
        <div class="notice_item">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">【平台公告】服务器升级维护完成</div>
        </div>
        <div class="notice_item">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">【平台公告】服务器升级维护完成</div>
        </div>
        <div class="notice_item">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            alt=""
            class="notice_image"
          />
          <div class="title">【平台公告】服务器升级维护完成</div>
        </div>
      </div>
      <el-pagination
        current-page="1"
        :page-sizes="[1, 3, 5]"
        page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        total="25"
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
    };
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