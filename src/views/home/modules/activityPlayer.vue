<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-link :underline="false" @click="back()">
            <i class="el-icon-back">Back</i>
          </el-link>
        </el-col></el-row
      >
      <!-- 用户列表区域 -->
      <el-table :data="playerList" border stripe>
        <el-table-column label="编号" prop="number"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="报名时间">
          <template slot-scope="scope">{{
            scope.row.createTime | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="票数" prop="votesCount"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              effect="dark"
              content="报名审核"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                size="mini"
                @click="reviewUserById(scope.row.id)"
                plain
                >审核通过</el-button
              >
              <el-button
                v-if="scope.row.review == true"
                type="danger"
                size="mini"
                disabled
                >己审核通过</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.review == true" type="info"
              >审核通过</el-tag
            >
            <el-tag v-else type="success">未审核</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activityId: 0,
      queryInfo: {
        currentPage: 1,
        limit: 10,
      },
      activity: {},
      total: 0,
      playerList: [],
    };
  },
  created() {
    this.activityId = this.$route.params.id;
    this.getActivityPlayer(this.activityId);
    this.getActivityInfo(this.activityId);
  },
  methods: {
    async reviewUserById(playerId) {
      const { data: res } = await this.$http.put(
        `/player/review?activityUserId=${playerId}`
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.$message.success("审核成功!");
      this.getActivityPlayer(this.activityId);
    },
    async removeUserById(playerId) {
      const { data: res } = await this.$http.delete(
        `/player/${playerId}/activity/${this.activityId}`
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.$message.success("删除该选手的信息成功!");

      this.getActivityPlayer(this.activityId);
    },
    async getActivityInfo(activityId) {
      const { data: res } = await this.$http.get(`/activity/${activityId}/all`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.activity = res.data;
    },
    async getActivityPlayer(activityId) {
      const { data: res } = await this.$http.get("/player/page", {
        params: {
          activityId: activityId,
          currentPage: this.queryInfo.currentPage,
          limit: this.queryInfo.limit,
          groupId: -1,
        },
      });

      if (res.code !== 200) {
        this.$message.error(res.message);
      }

      this.playerList = res.data.records;
      this.total = res.data.total;
    },
    //监听pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize;
      this.getActivityPlayer(this.activityId);
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getActivityPlayer(this.activityId);
    },
    back() {
      history.back();
    },
  },
};
</script>

<style scoped>
</style>
