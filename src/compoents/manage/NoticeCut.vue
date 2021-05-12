<template>
  <div class="notice-cut">
    <div
      class="notice"
      @click="
        $router.push({
          path: '/notice/details',
          query: {
            id: item.id,
          },
        })
      "
    >
      <el-row :gutter="24" style="margin: 0">
        <el-col :lg="5" :sm="24">
          <img class="cover" :src="url" alt />
        </el-col>
        <el-col :lg="18" :sm="24">
          <h4>测试</h4>
          <p class="content" style="min-height: 75px">
            国新办举行第七次全国人口普查主要数据结果发布会
          </p>
          <div class="notice-item_footer">
            <p>
              <span>
                <img
                  :src="url"
                  height="30px"
                  width="30px"
                  style="border-radius: 50%"
                  alt
                />
              </span>
              <span>测试账户</span>
              <span>
                <i class="el-icon-date"></i>
                2020-2-18 8:20:57
              </span>
              <span>
                <i class="el-icon-date"></i>
                25
              </span>
            </p>
            <p style="float: right"></p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div
      class="notice"
      @click="
        $router.push({
          path: '/notice/details',
          query: {
            id: item.id,
          },
        })
      "
    >
      <el-row :gutter="24" style="margin: 0">
        <el-col :lg="5" :sm="24">
          <img class="cover" :src="url" alt />
        </el-col>
        <el-col :lg="18" :sm="24">
          <h4>测试</h4>
          <p class="content" style="min-height: 75px">
            国新办举行第七次全国人口普查主要数据结果发布会
          </p>
          <div class="notice-item_footer">
            <p>
              <span>
                <img
                  :src="url"
                  height="30px"
                  width="30px"
                  style="border-radius: 50%"
                  alt
                />
              </span>
              <span>测试账户</span>
              <span>
                <i class="el-icon-date"></i>
                2020-2-18 8:20:57
              </span>
              <span>
                <i class="el-icon-date"></i>
                25
              </span>
            </p>
            <p style="float: right"></p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    otherNotice: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      url:
        "http://www.xinhuanet.com/photo/2021-05/11/1127431865_16207038204891n.jpg",
    };
  },
};
</script>

<style scoped>
.notice-cut {
  width: 98%;
  margin: 5px;
}

.notice-cut div {
  margin: 5px 0;
  padding: 0 2px;
}

.notice-cut .notice {
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.notice-cut .notice:hover {
  box-shadow: 0px 0px 5px 1px #e0e0e0;
}

.notice-cut .notice:hover .cover {
  transform: scale(1.01);
}

.notice-cut .cover {
  width: 98%;
  height: 148px;
  object-fit: cover;
  border-radius: 8px;
}

.notice-cut .content {
  overflow: hidden !important;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 15px;
}

.notice-cut h4 {
  padding: 0;
  margin: 0;
}

.notice-cut .notice-item_footer {
  color: #666666;
  font-size: 13px;
}

.notice-cut .notice-item_footer p {
  display: flex;
  align-items: center;
  margin: 5px;
}

.notice-cut .notice-item_footer span {
  margin: 0 5px;
}
</style>