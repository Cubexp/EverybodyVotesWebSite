<template>
  <div class="create_content_box">
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
              <el-tab-pane label="图片封面" name="first">
                <el-upload
                  :action="uploadURL"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  list-type="picture"
                  :headers="headerObj"
                  :on-success="handleSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过4mb
                  </div>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="视频封面" name="second">
                <el-input placeholder="请输入BiliBili视频链接"></el-input>
                <el-link type="primary" href="www.baidu.com"
                  >目前仅支技BiliBili视频链接，如何上传视频链接？</el-link
                >
              </el-tab-pane></el-tabs
            >
          </el-col>

          <el-col :span="19" :offset="1" class="noticeDiv">
            <span class="noticeStyle">活动公告</span>
            <el-switch
              v-model="noticeFlag"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
            <el-input
              class="inputNotice"
              v-if="noticeFlag"
              placeholder="请输入活动公告"
              v-model="notice"
            ></el-input>
            <p class="noticeRemakr">可以帮助用户宣传</p>
          </el-col>

          <el-col :span="23" :offset="1">
            <h5>按票按钮</h5>
            <div class="voteButtonsGroup">
              <el-radio-group v-model="voteButtonType" class="voteType">
                <el-radio :label="1">点赞</el-radio>
                <el-radio :label="3">投票</el-radio>
                <el-radio :label="2">打分</el-radio>
              </el-radio-group>

              <div v-if="voteButtonType == 1" class="voteButtPrise">
                <el-button type="primary" size="medium" plain>点赞</el-button>
              </div>

              <div v-if="voteButtonType == 3" class="voteButtPrise">
                <el-button type="success" size="medium" plain>投票</el-button>
              </div>

              <div v-if="voteButtonType == 2" class="voteButtPrise2">
                <el-input-number
                  v-model="beginNum"
                  :precision="2"
                  :step="0.1"
                  :max="1000"
                  size="mini"
                ></el-input-number>
                ~
                <el-input-number
                  v-model="endNum"
                  :precision="2"
                  :step="0.1"
                  :max="1000"
                  size="mini"
                ></el-input-number>
              </div>
            </div>
          </el-col>
          <el-col :span="22" :offset="1" class="nextButton">
            <el-button type="warning" @click="handleNextStep"
              >进入下一步</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div v-show="active === 2">
        <el-col :span="19" :offset="1">
          <span class="noticeStyle">是否开启选手自主报名 </span>
          <el-switch
            v-model="playerSignFlag"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </el-col>
        <el-col :span="19" :offset="1" v-if="playerSignFlag">
          <span class="noticeStyle">报名审核</span>
          <el-switch
            v-model="playerSignReviewFlag"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </el-col>
        <el-col :span="23" :offset="1" style="margin-top: 10px">
          <span class="noticeStyle">选手排序 </span>
          <el-radio-group size="small" v-model="playerSortMethod">
            <el-radio-button label="1">编号从低到高</el-radio-button>
            <el-radio-button label="2">票数从高到低</el-radio-button>
            <el-radio-button label="3">报名时间倒序</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="23" :offset="1">
          <span class="noticeStyle">分组是否开启</span>
          <el-switch
            v-model="playerGroupFlag"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
          <span class="noticeGroupRemark">（选填）选手报名和排行进行分组</span>
          <div v-if="playerGroupFlag" style="margin-top: 10px">
            <el-button
              size="small"
              type="danger"
              @click="addGroupDialogVisible = true"
              >增加</el-button
            >
            <el-table :data="group" style="width: 100%">
              <el-table-column prop="id" label="编号" width="180">
              </el-table-column>

              <el-table-column prop="name" label="分组名称" width="180">
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template>
                  <el-button
                    type="success"
                    @click="updateGroupDialogVisible = true"
                    plain
                    size="mini"
                    >修改</el-button
                  >
                  <el-button type="danger" size="mini" plain>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col :span="23" :offset="1" style="margin-top: 10px">
          <h6>投票规则</h6>
          <el-radio-group size="small" v-model="playerSortMethod">
            <el-radio-button label="1">编号从低到高</el-radio-button>
            <el-radio-button label="2">票数从高到低</el-radio-button>
            <el-radio-button label="3">报名时间倒序</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="23" offset="1">
          <el-button type="success" plain>创建活动</el-button>
        </el-col>
      </div>
    </div>

    <el-dialog
      title="修改分组名称"
      :visible.sync="updateGroupDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input placeholder="输入修改后的分组名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="添加分组名称"
      :visible.sync="addGroupDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input placeholder="输入组名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      noticeFlag: true,
      notice: "",
      beginNum: 0.0,
      endNum: 100,
      voteButtonType: 1,
      playerSignFlag: true,
      playerSignReviewFlag: true,
      playerGroupFlag: true,
      updateGroupDialogVisible: false,
      addGroupDialogVisible: false,
      group: [
        {
          id: 1,
          name: "test",
        },
        {
          id: 1,
          name: "test",
        },
        {
          id: 1,
          name: "test",
        },
      ],
      playerSortMethod: 2,
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
  min-width: 500px;
  min-height: 600px;
  max-height: 1000px;
  border: 1px solid red;
}
.steps {
  width: 600px;
  min-height: 600px;
  max-height: 1000px;
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
.noticeStyle {
  display: inline-block;
  margin-right: 10px;
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
  color: #555;
}
.noticeRemakr {
  font-size: 12px;
  color: #ccc;
}
.inputNotice {
  margin-top: 5px;
}
.voteButtPrise {
  /* border: 1px solid red; */
  margin-left: 30px;
}
.voteButtonsGroup {
  display: flex;
  /* border: 1px solid red; */
}
.voteType {
  margin-top: 15px;
}
.voteButtPrise2 {
  margin-left: 5px;
  margin-top: 8px;
}
.noticeDiv {
  margin-top: 20px;
}
.noticeGroupRemark {
  font-size: 12px;
  color: #9b9b9b;
}
</style>