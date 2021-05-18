<template>
  <div>
    <!-- 添加新闻表单  -->
    <el-form :model="newsForm" :rules="newsFormRules" ref="newsFormRef">
      <el-row>
        <el-col :span="11">
          <el-form-item label="文章标题:" prop="title" label-width="90px">
            <el-input
              v-model="newsForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="分类:">
            <el-cascader
              :options="newsTypeList"
              :props="cascaderProps"
              v-model="selectedKeys"
              @change="parentNewsTypeChanged"
              clearable
              change-on-select
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="mavonEditor">
            <mavon-editor
              class="mavonEditor"
              ref="md"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
              v-model="newsForm.content"
              :subfield="props.subfield"
              :defaultOpen="props.defaultOpen"
              :editable="props.editable"
              :toolbarsFlag="props.toolbarsFlag"
              :navigation="props.navigation"
              :boxShadow="props.boxShadow"
            />
          </div>
          <div class="mavonButton">
            <el-button @click="saveNews">保存为草稿</el-button>
            <el-button type="primary" @click="publishNews">发布</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //指定级联选择器的配置对象
      cascaderProps: {
        value: "id",
        label: "name",
        children: "children",
      },
      newsId: 0,
      newsForm: {
        content: "",
        title: "",
        typeId: 0,
      },
      props: {
        defaultOpen: "preview",
        subfield: false,
        editable: true,
        toolbarsFlag: true,
        navigation: true,
        boxShadow: false,
      },
      newsFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "标是的长度在3到100个字符之间",
            trigger: "blur",
          },
        ],
      },
      querInfo: {
        currentPage: 1,
        limit: 100,
      },
      newsTypeList: [],
      //选中的父级分类数组
      selectedKeys: [],
    };
  },
  created() {
    this.newsId = this.$route.params.id;
    this.getNews();
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
      this.selectedKeys[0] = this.newsForm.typeId;
      console.log(res);
    },
    async getNews() {
      const { data: res } = await this.$http.get(`/news/${this.newsId}`);

      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.newsId = res.data.id;
      this.newsForm.content = res.data.content;
      this.newsForm.title = res.data.title;
      console.log(res.data.type.id);
      this.newsForm.typeId = res.data.type.id;
      this.getNewsTypeList();
    },
    parentNewsTypeChanged() {
      console.log(this.selectedKeys[0]);
      //如果selectedKeys数组中的length大于0 选中了父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.newsForm.typeId = this.selectedKeys[this.selectedKeys.length - 1];
        return;
      } else {
        this.newsForm.typeId = 0;
      }
    },
    // 发布新闻
    async publishNews() {
      this.$refs.newsFormRef.validate(async (valid) => {
        if (!valid) return;

        if (this.newsForm.typeId === 0) {
          return this.$message.error("分类不能为空!");
        }

        this.newsForm.status = 1;
        const { data: res } = await this.$http.put(
          `/news/${this.newsId}`,
          this.newsForm
        );

        console.log(this.newsForm);

        if (res.code !== 200) {
          return this.$message.error("发布公告失败!" + res.message);
        }

        this.$message.success("发布公告成功!");
        this.$router.push("/backstage/newsList");
      });
    },
    // 保存为草稿
    saveNews() {
      this.$refs.newsFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.newsForm.typeId === 0) {
          return this.$message.error("分类不能为空!");
        }
        // 草稿
        this.newsForm.status = 0;
        const { data: res } = await this.$http.put(
          `/news/${this.newsId}`,
          this.newsForm
        );

        console.log(this.newsForm);

        if (res.code !== 200) {
          return this.$message.error("保存公告失败!" + res.message);
        }

        this.$message.success("保存公告成功!");
      });

      this.$router.push("/backstage/newsList");
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      const { data: res } = await this.$http.post("/user/avatar", formdata);

      if (res.code !== 200) {
        return this.$message.success("上传图片失败!");
      }
      this.$refs.md.$img2Url(pos, res.data);
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
  },
};
</script>

<style scoped>
.mavonEditor {
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 500px;
  min-height: 500px;
  max-height: 500px;
  border: 1px solid rgba(204, 204, 204, 0.3);
}
.mavonButton {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  padding-left: 85%;
}
</style>