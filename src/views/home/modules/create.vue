<template>
  <div class="create_content_box">
    <div class="preview"></div>
    <div class="steps">
      <div class="steps_title">
        <el-steps :active="active" finish-status="success">
          <el-step title="基础设置" @click.native="handleStep(0)"></el-step>
          <el-step title="样式设置" @click.native="handleStep(1)"></el-step>
          <el-step title="功能设置" @click.native="handleStep(2)"></el-step>
        </el-steps>
      </div>

      <div v-show="active === 0">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="19" :offset="1">
              <el-form-item label="活动名称">
                <el-input placeholder="请输入活动标题"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" :offset="1">
              <el-form-item label="活动时间">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  align="right"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="22" :offset="1">
              <mavon-editor
                ref="md"
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
                v-model="originalContent"
                :subfield="props.subfield"
                :defaultOpen="props.defaultOpen"
                :editable="props.editable"
                :toolbarsFlag="props.toolbarsFlag"
                :navigation="props.navigation"
                :boxShadow="props.boxShadow"
              />
            </el-col>
            <el-col :span="22" :offset="1" class="nextButton">
              <el-button type="primary" @click="handleNextStep"
                >进入下一步</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-show="active === 1">
        <el-row>
          <el-col :span="22" :offset="1">
            <span class="activity_image_title">活动封面设置</span>
            <span class="activity_image_title2">活动封面只能选择一种方式</span>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="图片封面" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="视频封面" name="second">
                <el-input placeholder="请输入BiliBili视频链接"></el-input>
                <el-link type="primary" href="www.baidu.com"
                  >目前仅支技BiliBili视频链接，如何上传视频链接？</el-link
                >
              </el-tab-pane></el-tabs
            >
          </el-col>
          <el-col :span="22" :offset="1" class="nextButton">
            <el-button type="warning" @click="handleNextStep"
              >进入下一步</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div v-show="active === 2">
        <div>功能设置</div>
        <el-button type="primary">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: "",
      active: 0,
      originalContent: "",
      activeName: "first",
      // 已选步骤
      stepSuc: [0],
      props: {
        defaultOpen: "preview",
        subfield: false,
        editable: true,
        toolbarsFlag: true,
        navigation: true,
        boxShadow: false,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    // 点击步骤条
    handleStep(val) {
      if (this.stepSuc.includes(val) === true) {
        this.active = val;
      }
    },
    // 组件点击上一步
    handleLastStep() {
      if (--this.active === 0) {
        this.active = 1;
      }
    },
    // 组件点击下一步
    handleNextStep() {
      this.stepSuc.push(++this.active);
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {},
    $imgDel(pos) {},
  },
};
</script>

<style scoped>
.create_content_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.preview {
  width: 500px;
  height: 600px;
  border: 1px solid red;
}
.steps {
  width: 600px;
  height: 600px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 4px 17px 1px rgb(0 0 0 / 15%);
  border-radius: 30px;
}
.steps_title {
  display: flex;
  justify-content: center;
  padding-left: 120px;
}

.el-step {
  cursor: pointer;
  width: 180px;
}
.nextButton {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.nextButton button {
  width: 30%;
}

.activity_image_title {
  font-size: 14px;
  font-weight: 700;
}

.activity_image_title2 {
  font-size: 12px;
  color: #ccc;
  margin-left: 10px;
}
</style>