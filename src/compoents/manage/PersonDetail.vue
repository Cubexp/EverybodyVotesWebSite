<template>
  <div>
    <el-tabs tab-position="left" class="personDetail">
      <el-tab-pane label="个人信息">
        <div class="personInfo">
          <el-form
            :model="updateUserForm"
            :rules="updateUserFormRules"
            ref="updateUserFormRef"
            label-width="100px"
          >
            <el-row>
              <el-col :span="6" :offset="3">
                <!-- 头像区域 -->
                <el-avatar
                  style="width: 150px; height: 150px; border-radius: 50px"
                  :src="logoUrl"
                  :preview-src-list="srcList"
                ></el-avatar>
              </el-col>
              <el-col :span="6" :offset="5" class="personImg">
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
                <!-- 图片预览 -->
                <el-dialog
                  title="图片预览"
                  :visible.sync="previewDialogVisible"
                  width="50%"
                >
                  <img :src="previcewPath" alt class="previewImg" />
                </el-dialog>
              </el-col>
              <el-col :span="24">
                <el-form-item label="用户名称:">
                  <el-input
                    type="text"
                    placeholder="请输入用户名称"
                    maxlength="10"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别:">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="创建时间:">
                  2021-05-06 16:20:52
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    @click="updateUserName()"
                    >保存修改</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="updatePasswordUserFormRef" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="新密码密码:" prop="password">
                <el-input
                  type="password"
                  placeholder="请输入新密码"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item label="旧密码:" prop="password">
                <el-input
                  type="password"
                  placeholder="请输入旧密码"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-button type="success" style="float: right"
                >修改密码</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱管理">
        <el-form ref="updatePasswordUserFormRef" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="新密码密码:" prop="password">
                <el-input
                  type="password"
                  placeholder="请输入新密码"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item label="旧密码:" prop="password">
                <el-input
                  type="password"
                  placeholder="请输入旧密码"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-button type="success" style="float: right"
                >修改密码</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号管理" class="phoneManage">
        <el-form ref="updatePasswordUserFormRef" label-width="100px">
          <el-form-item label="当前手机号码:">
            <el-input
              placeholder="18821914103"
              prefix-icon="iconfont icon-user"
              disabled
            ></el-input>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="新手机号码">
            <el-input
              placeholder="新手机号码"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>

          <!-- 注册码 -->
          <el-form-item label="验证码:">
            <el-input
              type="text"
              clearable
              style="width: 55%"
              prefix-icon="el-icon-s-comment"
              placeholder="验证码"
            ></el-input>
            <el-button
              icon="el-icon-message"
              style="width: 40%; float: right"
              type="success"
              :disabled="(disabled = !show)"
            >
              <span v-show="show">验证码</span>
              <span v-show="!show" class="count">{{ count }} s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="btns2" type="primary" @click="register"
              >更换手机</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoUrl:
        "http://pic.people.com.cn/NMediaFile/2021/0511/MAIN202105110848000346167302778.JPG",
      radio: "1",
      show: true, // 初始启用按钮
    };
  },
};
</script>

<style scoped>
.personInfo {
  min-height: 500px;
  width: 400px;
}
.personDetail {
  height: 500px;
}
.personImg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 160px;
}
.phoneManage {
  width: 400px;
}
</style>