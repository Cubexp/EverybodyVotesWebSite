<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input
            placeholder="请输入标题"
            v-model="queryInfo.title"
            clearable
            @clear="getNewsList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getNewsList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="queryInfo.status"
            placeholder="状态"
            @change="updaetNewsStatus()"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          分类:
          <el-cascader
            :options="newsTypeList"
            :props="cascaderProps"
            v-model="selectedKeys"
            @change="parentNewsTypeChanged"
            clearable
            change-on-select
            @remove-tag="test()"
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="newsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="info">草稿</el-tag>
            <el-tag v-else type="success">己发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{
            scope.row.createTime | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="类别" prop="type.name"></el-table-column>
        <el-table-column label="创建人" prop="sysUser.name"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="修改"
              placement="top"
              :enterable="false"
            >
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditView(scope.row.id)"
              ></el-button>
            </el-tooltip>

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
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[1, 2, 5, 10]"
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
      // 获取用户列表的参数对象
      queryInfo: {
        title: "",
        //当前页数
        currentPage: 1,
        //当前每次显示多少条数据
        limit: 10,
        status: 2,
        typeId: 0,
      },
      newsList: [],
      flag: false,
      total: 0,
      statusOptions: [
        {
          value: 0,
          label: "草稿",
        },
        {
          value: 1,
          label: "己发布",
        },
        {
          value: 2,
          label: "所有",
        },
      ],
      newsTypeList: [],
      //选中的父级分类数组
      selectedKeys: [],
      //指定级联选择器的配置对象
      cascaderProps: {
        value: "id",
        label: "name",
        children: "children",
      },
      cateQuerInfo: {
        status: true,
        level: 3,
      },
    };
  },
  created() {
    this.getNewsList();
    this.getNewsTypeList();
  },
  methods: {
    async getNewsTypeList() {
      const { data: res } = await this.$http.get("/newsType/page", {
        params: this.queryInfo,
      });

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.newsTypeList = res.data.records;
      this.total = res.data.total;
      console.log(res);
    },
    async getNewsList() {
      const { data: res } = await this.$http.get("/news/page", {
        params: this.queryInfo,
      });

      this.newsList = res.data.records;
      this.total = res.data.total;
    },
    //监听pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize;
      this.getNewsList();
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getNewsList();
    },
    async removeUserById(newsId) {
      // 弹框询问是否删除
      const editPromise = await this.$confirm(
        "此操作将永久删除该公告, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (editPromise === "cancel") {
        return this.$message.info("己取消删除");
      }

      const { data: res } = await this.$http.delete(`/news/${newsId}`);

      if (res.code !== 200) {
        return this.$message.error("删除公告失败!");
      }

      this.$message.success("删除公告成功!");
      this.getNewsList();
    },
    parentNewsTypeChanged() {
      //如果selectedKeys数组中的length大于0 选中了父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.queryInfo.typeId = this.selectedKeys[this.selectedKeys.length - 1];

        this.getNewsList();
        return;
      } else {
        this.queryInfo.typeId = 0;
        this.getNewsList();
      }
    },
    // 跳转到新闻编辑页面
    showEditView(id) {
      this.$router.push({ path: `/newsEdit/${id}` });
    },
  },
};
</script>

<style scoped>
</style>