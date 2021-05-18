<template>
  <el-card>
    <el-row :gutter="20">
      <el-col>
        <el-button type="primary" @click="showAddNewsTypeDialog"
          >添加分类</el-button
        >
      </el-col>
    </el-row>

    <!-- 用户列表区域 -->
    <el-table :data="cateList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
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
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加公告分类对话框 -->
    <el-dialog
      title="添加公告分类"
      :visible.sync="addNewsTypeDialogVisible"
      width="25%"
      height="20%"
      @close="addNewsTypeDialogClosed"
    >
      <!-- 添加分类表单  -->
      <el-form
        :model="addNewsTypeForm"
        :rules="addNewsTypeFormRules"
        ref="addNewsTypeFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="addNewsTypeForm.name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="addNewsTypeForm.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewsTypeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewsType">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加公告分类对话框 -->
    <el-dialog
      title="修改公告分类"
      :visible.sync="updateNewsTypeDialogVisible"
      width="25%"
      height="20%"
      @close="updateNewsTypeDialogClosed"
    >
      <!-- 添加分类表单  -->
      <el-form
        :model="updateNewsTypeForm"
        :rules="updateNewsTypeFormRules"
        ref="updateNewsTypeFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="updateNewsTypeForm.name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="updateNewsTypeForm.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateNewsTypeDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="updateNewsType">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类数据
      cateList: [],
      // 查询条件
      queryInfo: {
        currentPage: 1,
        limit: 10,
      },
      addNewsTypeForm: {
        name: "",
        remark: "",
      },
      addNewsTypeFormRules: {
        name: [
          {
            required: true,
            message: "请输入公告类别名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "标是的长度在2到100个字符之间",
            trigger: "blur",
          },
        ],
      },
      updateNewsTypeForm: {},
      updateNewsTypeFormRules: {
        name: [
          {
            required: true,
            message: "请输入公告类别名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "标是的长度在2到100个字符之间",
            trigger: "blur",
          },
        ],
      },
      total: 0,
      addNewsTypeDialogVisible: false,
      updateNewsTypeDialogVisible: false,
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("/newsType/page", {
        params: this.queryInfo,
      });

      console.log(res);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.cateList = res.data.records;
      this.total = res.data.total;
    },
    //监听pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize;
      this.getCateList();
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getCateList();
    },
    async removeUserById(newsTypeId) {
      // 弹框询问是否删除
      const editPromise = await this.$confirm(
        "此操作将永久删除该类别, 是否继续?",
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

      const { data: res } = await this.$http.delete(`/newsType/${newsTypeId}`);

      if (res.code !== 200) {
        return this.$message.error("删除公告分类失败!");
      }

      this.$message.success("删除公告分类成功!");
      this.getCateList();
    },
    showAddNewsTypeDialog() {
      this.addNewsTypeDialogVisible = true;
    },
    addNewsTypeDialogClosed() {
      this.addNewsTypeDialogVisible = false;
    },
    async addNewsType() {
      this.$refs.addNewsTypeFormRef.validate(async (valid) => {
        if (!valid) return;

        const { data: res } = await this.$http.post(
          "/newsType/",
          this.addNewsTypeForm
        );

        if (res.code !== 200) {
          return this.$message.error(res.message);
        }

        this.$message.success("添加公告公类成功!");
        this.getCateList();
        this.addNewsTypeDialogVisible = false;
      });
    },
    async showEditView(newsTypeId) {
      const { data: res } = await this.$http.get(`/newsType/${newsTypeId}`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.updateNewsTypeForm = res.data;

      this.updateNewsTypeDialogVisible = true;
    },
    async updateNewsType() {
      let newsTypedId = this.updateNewsTypeForm.id;
      delete this.updateNewsTypeForm.id;

      const { data: res } = await this.$http.put(
        `/newsType/${newsTypedId}`,
        this.updateNewsTypeForm
      );

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }

      this.updateNewsTypeDialogVisible = false;

      this.getCateList();
      this.$message.success("修改成功了哦!");
    },
    updateNewsTypeDialogClosed() {
      this.updateNewsTypeDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.treeTable {
  margin-top: 20px;
}
</style>