<template>
  <div>
    <div class="aboutbanner">
      <img :src="about_banner" alt="" />
    </div>

    <div class="content_about">
      <div class="about_cont">
        <div class="practical_functions_title">
          <div>关于<span>我们</span></div>
          <p class="practical_functions_about">About us</p>
        </div>
        <div class="practical_describe">
          <p>人人投票----------专业的投票活动制作平台，此处省略一万个字</p>
        </div>
      </div>

      <div class="about_img">
        <img src="https://www.rrwtp.com/static/index/img/about3.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      about_banner: "https://www.rrwtp.com/static/index/img/about_banner.png",
    };
  },
};
</script>

<style scoped>
.aboutbanner {
  width: 100%;
}
.aboutbanner img {
  width: 100%;
}
.content_about {
  padding-bottom: 60px;
  width: 100%;
  margin: 0 auto;
}
.practical_functions_title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  margin-top: 30px;
}
.practical_functions_about {
  color: #666666;
  font-size: 20px;
}
.practical_functions_title span {
  color: #fe4f4d;
}
.practical_describe {
  color: #666666;
  display: block;
  font-size: 14px;
}
.content_about {
  display: flex;
  justify-content: center;
}
.about_img {
  margin-left: 100px;
  margin-top: 30px;
}
</style>