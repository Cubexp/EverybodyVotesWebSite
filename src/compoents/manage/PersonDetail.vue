<template>
  <div>
    <el-tabs tab-position="left" class="personDetail">
      <el-tab-pane label="个人信息">
        <div class="personInfo">
          <el-form
            :model="userInfoForm"
            :rules="userInfoFormRules"
            ref="userInfoFormRef"
            label-width="100px"
          >
            <el-row>
              <el-col :span="6" :offset="3">
                <!-- 头像区域 -->
                <el-avatar
                  style="width: 150px; height: 150px; border-radius: 50px"
                  :src="userInfoForm.avatar"
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
              </el-col>
              <el-col :span="24" class="nameItem">
                <el-form-item label="用户名称:" prop="name">
                  <el-input
                    type="text"
                    placeholder="请输入用户名称"
                    maxlength="10"
                    v-model="userInfoForm.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别:" prop="gender">
                  <el-radio v-model="userInfoForm.gender" :label="1"
                    >男</el-radio
                  >
                  <el-radio v-model="userInfoForm.gender" :label="0"
                    >女</el-radio
                  >
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="注册时间:">
                  {{ userInfoForm.registerTime | dateFormat }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    @click="updateUserInfo()"
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
              <el-form
                :model="updatePasswordUserForm"
                :rules="updatePasswordRules"
                ref="updatePasswordRef"
              >
                <el-form-item label="旧密码:" prop="oldPassword">
                  <el-input
                    type="password"
                    placeholder="请输入旧密码"
                    maxlength="20"
                    v-model="updatePasswordUserForm.oldPassword"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码密码:" prop="newPassword">
                  <el-input
                    type="password"
                    placeholder="请输入新密码"
                    maxlength="20"
                    v-model="updatePasswordUserForm.newPassword"
                  ></el-input>
                </el-form-item>

                <el-button
                  type="success"
                  style="float: right"
                  @click="updatePasswordUser"
                  >修改密码</el-button
                >
              </el-form>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="手机号管理" class="phoneManage">
        <el-form ref="updatePasswordUserFormRef" label-width="100px">
          <el-form-item label="当前手机号码:">
            <el-input
              :placeholder="userInfoForm.phone"
              prefix-icon="iconfont icon-user"
              disabled
            ></el-input>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="新手机号码">
            <el-input
              placeholder="新手机号码"
              prefix-icon="iconfont icon-user"
              v-model="updatePhoen.newPhone"
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
              v-model="updatePhoen.verifyCode"
            ></el-input>
            <el-button
              icon="el-icon-message"
              style="width: 40%; float: right"
              type="success"
              @click="phoneSend"
              :disabled="(disabled = !phoneShow)"
            >
              <span v-show="phoneShow">验证码</span>
              <span v-show="!phoneShow" class="count">{{ phoneCout }} s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="btns2" type="primary" @click="updatePhone"
              >更换手机号码</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="邮箱管理" class="phoneManage">
        <el-form ref="updateEmailUserFormRef" label-width="100px">
          <el-form-item label="当前绑定的邮箱:">
            <el-input
              :placeholder="userInfoForm.email"
              prefix-icon="iconfont icon-user"
              disabled
            ></el-input>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="新邮箱">
            <el-input
              placeholder="新邮箱"
              prefix-icon="iconfont icon-user"
              v-model="updateEmailForm.newEmail"
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
              v-model="updateEmailForm.verifyCode"
            ></el-input>
            <el-button
              @click="emailSend"
              icon="el-icon-message"
              style="width: 40%; float: right"
              type="success"
              :disabled="(disabled = !emailShow)"
            >
              <span v-show="emailShow">验证码</span>
              <span v-show="!emailShow" class="count">{{ emailCount }} s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="btns2" type="primary" @click="updateEmail"
              >更换邮箱</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
let TIME_COUNT = 60;
export default {
  data() {
    return {
      logoUrl:
        "http://pic.people.com.cn/NMediaFile/2021/0511/MAIN202105110848000346167302778.JPG",
      radio: "1",
      show: true, // 初始启用按钮
      userInfoForm: {},
      previewDialogVisible: true,
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ],
      uploadURL: "http://localhost:8081/user/avatar",
      // 图片上传组件的请求头
      headerObj: {
        t: window.localStorage.getItem("token"),
      },
      previcewPath: "",
      activeName: "info",
      updatePasswordUserForm: {
        oldPassword: "",
        newPassword: "",
      },
      updatePasswordRules: {
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: "新密码的长度在6到20个字符之间",
            trigger: "blur",
          },
        ],
        oldPassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 30,
            message: "旧密码的长度在6到30个字符之间",
            trigger: "blur",
          },
        ],
      },
      userInfoFormRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 1,
            max: 30,
            message: "用户名的长度在1到30个字符之间",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      updatePhoen: {
        newPhone: "",
        verifyCode: "",
        verifyCodeKey: "",
      },
      phoneTimer: null,
      phoneCout: "",
      phoneShow: true,
      updateEmailForm: {
        newEmail: "",
        verifyCode: "",
        verifyCodeKey: "",
      },
      emailTimer: null,
      emailCount: "",
      emailShow: true,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let id = window.localStorage.getItem("id");
      const { data: res } = await this.$http.get("/user/" + id);

      console.log(res);

      if (res.code !== 200) {
        if (res.code == 401) {
          return this.$router.push("/error/401");
        }
        return this.$message.error(res.message);
      }

      this.userInfoForm = res.data;
      console.log(this.userInfoForm);
    },
    async updateUserInfo() {
      this.$refs.userInfoFormRef.validate(async (valid) => {
        if (!valid) return;

        let id = window.localStorage.getItem("id");
        let updateUserInfo = {
          name: this.userInfoForm.name,
          gender: this.userInfoForm.gender,
          avatar: this.userInfoForm.avatar,
        };
        const { data: res } = await this.$http.put(
          `/user/${id}/info`,
          updateUserInfo
        );

        if (res.code !== 200) {
          return this.$message.error("修改失败了哦~ " + res.message);
        }
        this.$message.success("修改成功了~");
        this.getUserInfo();
      });
    },
    // 处理图片预览效果
    handlePreview(file) {
      this.previcewPath = file.response.data;
      this.previewDialogVisible = true;
    },
    // 处理移除图片的操作
    handleRemove(file) {
      const filePath = file.response.data;
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath);

      this.addForm.pics.splice(i, 1);
      console.log(this.addForm);
    },
    // 监听图片上传成功
    handleSuccess(response) {
      if (response.code !== 200) {
        return this.$message.error("上传文件失败!" + response.message);
      }

      console.log(response);
      // 2.将图片信息对象push 到 pics 数组中
      this.userInfoForm.avatar = response.data;
      this.srcList = new Array(response.data, response.data);
    },
    async updatePasswordUser() {
      this.$refs.updatePasswordRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        if (
          this.updatePasswordUserForm.newPassword ===
          this.updatePasswordUserForm.oldPassword
        ) {
          return this.$message.error("新旧密码不能一样哦！");
        }
        this.updatePasswordUserForm.userId = localStorage.getItem("id");

        const { data: res } = await this.$http.put(
          "user/password",
          this.updatePasswordUserForm
        );

        if (res.code !== 200) {
          return this.$message.error("修改密码失败~" + res.message);
        }

        this.updatePasswordUserForm.oldPassword = "";
        this.updatePasswordUserForm.newPassword = "";
        return this.$message.success("修改密码成功!");
      });
    },
    async phoneSend() {
      const regPhone = /^1[3-9]\d{9}$/;
      if (regPhone.test(this.updatePhoen.newPhone)) {
        const { data: res } = await this.$http.post(
          "/oauth/send/short/message?" + "phone=" + this.updatePhoen.newPhone
        );

        if (res.code !== 200) {
          return this.$message.error("发送验证码失败!" + res.message);
        }

        if (!this.phoneTimer) {
          this.phoneCout = TIME_COUNT;
          this.phoneShow = false;
          this.phoneTimer = setInterval(() => {
            if (this.phoneCout > 0 && this.phoneCout <= TIME_COUNT) {
              this.phoneCout--;
            } else {
              this.phoneShow = true;
              clearInterval(this.phoneTimer); // 清除定时器
              this.phoneTimer = null;
            }
          }, 1000);
        }

        this.updatePhoen.verifyCodeKey = res.data;
        return this.$message.success("发送验证码成功哦！！");
      }

      this.$message.error("手机号码不能为空且格式要正确哦！！");
    },
    async updatePhone() {
      const regPhone = /^1[3-9]\d{9}$/;
      if (regPhone.test(this.updatePhoen.newPhone)) {
        console.log(this.updatePhoen);
        let id = window.localStorage.getItem("id");
        const { data: res } = await this.$http.put(
          `/user/${id}/phone`,
          this.updatePhoen
        );

        if (res.code !== 200) {
          return this.$message.error(res.message);
        }

        this.updatePhoen.newPhone = "";
        this.updatePhoen.verifyCode = "";
        this.updatePhoen.verifyCodeKey = "";

        this.getUserInfo();
        return this.$message.success("修改成功");
      }

      this.$message.error("手机号码不能为空且格式要正确哦！！");
    },
    async emailSend() {
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      console.log(this.updateEmailForm);
      if (regEmail.test(this.updateEmailForm.newEmail)) {
        const { data: res } = await this.$http.post(
          "/user/seder/email/verify?" + "email=" + this.updateEmailForm.newEmail
        );

        if (res.code !== 200) {
          return this.$message.error("发送验证码失败!" + res.message);
        }

        if (!this.emailTimer) {
          this.emailCount = TIME_COUNT;
          this.emailShow = false;
          this.emailTimer = setInterval(() => {
            if (this.emailCount > 0 && this.emailCount <= TIME_COUNT) {
              this.emailCount--;
            } else {
              this.emailShow = true;
              clearInterval(this.emailTimer); // 清除定时器
              this.emailTimer = null;
            }
          }, 1000);
        }

        this.updateEmailForm.verifyCodeKey = res.data;
        return this.$message.success("发送验证码成功哦！！");
      }

      return this.$message.error("邮箱格式不正确!");
    },
    async updateEmail() {
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (regEmail.test(this.updateEmailForm.newEmail)) {
        console.log(this.updateEmailForm);
        let id = window.localStorage.getItem("id");
        const { data: res } = await this.$http.put(
          `/user/${id}/email`,
          this.updateEmailForm
        );

        if (res.code !== 200) {
          return this.$message.error(res.message);
        }

        this.updateEmailForm.newEmail = "";
        this.updateEmailForm.verifyCode = "";
        this.updateEmailForm.verifyCodeKey = "";

        this.getUserInfo();
        return this.$message.success("修改成功");
      }

      this.$message.error("邮箱不能为空且格式要正确哦！！");
    },
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
.nameItem {
  margin-top: 60px;
}
</style>