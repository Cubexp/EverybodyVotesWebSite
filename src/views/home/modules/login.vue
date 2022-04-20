<template>
	<div>
		<el-row>
			<el-col :span="5" class="form_image" :offset="2">
				<el-image
					style="width: 410px; height: 400px"
					:src="require('@/assets/image/login/login_home.png')"
				></el-image>
			</el-col>
			<el-col :span="5" class="from_div" :offset="4">
				<div class="login_div">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="用户登陆" name="login">
							<el-form
								ref="loginFormRef"
								:model="loginForm"
								:rules="loginFormRules"
								label-width="60px"
								class="login_form"
							>
								<el-form-item label="账号" prop="phone">
									<el-input
										v-model="loginForm.phone"
										placeholder="请输入你的手机号码"
										prefix-icon="el-icon-user"
									></el-input>
								</el-form-item>
								<el-form-item label="密码" prop="password">
									<el-input
										v-model="loginForm.password"
										placeholder="请输入你的密码"
										type="password"
										prefix-icon="iconfont icon-3702mima"
									></el-input>
								</el-form-item>
								<el-form-item>
									<el-button class="btns" type="primary" @click="loginClick"
										>登录</el-button
									>
								</el-form-item>
								<el-form-item>
									<el-col :span="24" :offset="17"
										><a
											href="javascript:"
											@click="forgivePasswordVisible = true"
											>忘记密码</a
										></el-col
									>
								</el-form-item>
							</el-form>
						</el-tab-pane>

						<el-tab-pane label="用户注册" name="register">
							<el-form
								ref="registerFormRef"
								:model="registerForm"
								:rules="registerFormRules"
								label-width="0px"
							>
								<!-- 用户名 -->
								<el-form-item prop="phone">
									<el-input
										placeholder="手机号码"
										v-model="registerForm.phone"
										prefix-icon="iconfont icon-user"
									></el-input>
								</el-form-item>
								<!-- 密码 -->
								<el-form-item prop="password">
									<el-input
										v-model="registerForm.password"
										prefix-icon="iconfont icon-3702mima"
										type="password"
										placeholder="密码"
									></el-input>
								</el-form-item>

								<!-- 注册码 -->
								<el-form-item prop="code">
									<el-input
										type="text"
										clearable
										style="width: 55%"
										v-model="registerForm.code"
										prefix-icon="el-icon-s-comment"
										placeholder="验证码"
									></el-input>
									<el-button
										icon="el-icon-message"
										@click="registerSend"
										style="width: 40%; float: right"
										type="success"
										:disabled="(disabled = !registerShow)"
									>
										<span v-show="registerShow">验证码</span>
										<span v-show="!registerShow" class="count"
											>{{ registerCount }} s</span
										>
									</el-button>
								</el-form-item>
								<el-form-item>
									<el-button class="btns2" type="primary" @click="register"
										>注册</el-button
									>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
		<!--- 忘记密码 -->
		<el-dialog
			custom-class="el-dialog-style"
			title="忘记密码"
			:visible.sync="forgivePasswordVisible"
			width="25%"
		>
			<el-form
				ref="forgetFormRef"
				:model="forgetForm"
				:rules="forgetFormRules"
				label-width="0px"
			>
				<!-- 用户名 -->
				<el-form-item prop="phone">
					<el-input
						placeholder="手机号码"
						v-model="forgetForm.phone"
						prefix-icon="iconfont icon-user"
					></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input
						v-model="forgetForm.password"
						prefix-icon="iconfont icon-3702mima"
						type="password"
						placeholder="新密码"
					></el-input>
				</el-form-item>

				<!-- 注册码 -->
				<el-form-item prop="code">
					<el-input
						type="text"
						clearable
						style="width: 55%"
						v-model="forgetForm.code"
						prefix-icon="el-icon-s-comment"
						placeholder="验证码"
					></el-input>
					<el-button
						icon="el-icon-message"
						@click="forgetSend"
						style="width: 40%; float: right"
						type="success"
						:disabled="(disabled = !forgetShow)"
					>
						<span v-show="forgetShow">验证码</span>
						<span v-show="!forgetShow" class="count">{{ forgetCount }} s</span>
					</el-button>
				</el-form-item>
				<el-form-item class="forget_btn_group">
					<el-button @click="forgivePasswordVisible = false">取 消</el-button>
					<el-button type="primary" @click="forgivePassword">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
const TIME_COUNT = 60
export default {
	components: {},
	data() {
		return {
			logoUrl2: "@/assets/login/login_home.png",
			activeName: "login",
			loginForm: {
				phone: "",
				password: "",
			},
			registerForm: {
				phone: "",
				password: "",
				code: "",
				codeKey: "",
			},
			forgetForm: {
				code: "",
				codeKey: "",
				password: "",
				phone: "",
			},
			forgetShow: true, // 初始启用按钮
			registerShow: true, // 初始启用按钮
			forgetCount: "", // 初始化次数
			registerCount: "",
			registerTimer: null,
			forgetTimer: null,
			forgivePasswordVisible: false,
			// 表单验证
			loginFormRules: {
				phone: [
					{
						required: true,
						message: "请输入手机号码",
						trigger: "blur",
					},
					{
						min: 10,
						max: 20,
						message: "长度在 2 到 20 个字符",
						trigger: "blur",
					},
				],
				password: [
					{ required: true, message: "请输入用户密码", trigger: "blur" },
					{
						min: 6,
						max: 18,
						message: "长度在 6 到 18 个字符",
						trigger: "blur",
					},
				],
			},
			registerFormRules: {
				phone: [
					{ required: true, message: "请输入手机号码", trigger: "blur" },
					{
						min: 10,
						max: 20,
						message: "长度在 2 到 20 个字符",
						trigger: "blur",
					},
				],
				//验证密码
				password: [
					{ required: true, message: "请输入登陆密码", trigger: "blur" },
					{
						min: 6,
						max: 15,
						message: "长度在6 到 15 个字符之间",
						trigger: "blur",
					},
				],
				code: [
					{ required: true, message: "请输入验证码", trigger: "blur" },
					{ min: 5, max: 5, message: "验证码长度5", trigger: "blur" },
				],
			},
			forgetFormRules: {
				phone: [
					{ required: true, message: "请输入手机号码", trigger: "blur" },
					{
						min: 10,
						max: 20,
						message: "长度在 2 到 20 个字符",
						trigger: "blur",
					},
				],
				//验证密码
				password: [
					{ required: true, message: "请输入新的密码", trigger: "blur" },
					{
						min: 6,
						max: 15,
						message: "长度在6 到 15 个字符之间",
						trigger: "blur",
					},
				],
				code: [
					{ required: true, message: "请输入验证码", trigger: "blur" },
					{ min: 5, max: 5, message: "验证码长度5", trigger: "blur" },
				],
			},
		}
	},
	methods: {
		handleClick(tab, event) {},
		async register() {
			this.$refs.registerFormRef.validate(async (valid) => {
				if (!valid) return

				const { data: res } = await this.$http.post(
					"/oauth/register",
					this.registerForm
				)

				if (res.code !== 200) {
					return this.$message.error(res.message)
				}

				this.registerForm.phone = ""
				this.registerForm.code = ""
				this.registerForm.codeKey = ""
				this.registerForm.password = ""
				this.registerShow = true
				this.registerTimer = null
				this.activeName = "login"
				this.registerCount = ""
				return this.$message.success("注册成功了哦！")
			})
		},
		async registerSend() {
			const regPhone = /^1[3-9]\d{9}$/

			console.log(this.registerForm)
			if (regPhone.test(this.registerForm.phone)) {
				const { data: res } = await this.$http.post(
					"/oauth/send/short/message?" + "phone=" + this.registerForm.phone
				)

				if (res.code !== 200) {
					return this.$message.error("发送验证码失败!" + res.message)
				}

				if (!this.registerTimer) {
					this.registerCount = TIME_COUNT
					this.registerShow = false
					this.registerTimer = setInterval(() => {
						if (this.registerCount > 0 && this.registerCount <= TIME_COUNT) {
							this.registerCount--
						} else {
							this.registerShow = true
							clearInterval(this.registerTimer) // 清除定时器
							this.registerTimer = null
						}
					}, 1000)
				}

				this.registerForm.codeKey = res.data
				return this.$message.success("发送验证码成功哦！！")
			}

			this.$message.error("手机号码不能为空且格式要正确哦！！")
		},
		async forgivePassword() {
			this.$refs.forgetFormRef.validate(async (valid) => {
				if (!valid) return

				const { data: res } = await this.$http.put(
					"/user/forgive/password",
					this.forgetForm
				)

				if (res.code !== 200) {
					return this.$message.error(res.message)
				}
				this.forgivePasswordVisible = false
				this.forgetForm.phone = ""
				this.forgetForm.code = ""
				this.forgetForm.codeKey = ""
				this.forgetForm.password = ""
				this.forgetShow = true
				this.forgetTimer = null
				this.forgetCount = ""
				return this.$message.success("找回密码成功了哦！")
			})
		},
		async forgetSend() {
			const regPhone = /^1[3-9]\d{9}$/
			if (regPhone.test(this.forgetForm.phone)) {
				const { data: res } = await this.$http.post(
					"/oauth/send/short/message?" + "phone=" + this.forgetForm.phone
				)

				if (res.code !== 200) {
					return this.$message.error("发送验证码失败!" + res.message)
				}

				if (!this.forgetTimer) {
					this.forgetCount = TIME_COUNT
					this.forgetShow = false
					this.forgetTimer = setInterval(() => {
						if (this.forgetCount > 0 && this.forgetCount <= TIME_COUNT) {
							this.forgetCount--
						} else {
							this.forgetShow = true
							clearInterval(this.forgetTimer) // 清除定时器
							this.forgetTimer = null
						}
					}, 1000)
				}

				this.forgetForm.codeKey = res.data
				return this.$message.success("发送验证码成功哦！！")
			}

			this.$message.error("手机号码不能为空且格式要正确哦！！")
		},

		async loginClick() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					"/oauth/login",
					this.loginForm
				)

				if (res.code !== 200) return this.$message.error(res.message)

				let localstorage = window.localStorage
				localstorage.setItem("token", res.data.token)
				localstorage.setItem("id", res.data.id)
				localstorage.setItem("roleName", res.data.roleName)
				this.$message.success("登陆成功!")

				location.replace("/home")
			})
		},
	},
}
</script>

<style scoped>
.btns {
	width: 320px;
}
a {
	text-decoration: none;
	color: red;
	font-size: 15px;
}

.from_div {
	background-color: white;
	display: flex;
	justify-content: center;
	height: 400px;
	width: 450px;
	border-radius: 10px;
	margin-top: 5%;
	border: 1px solid red;
}
.login_div {
	width: 80%;
}

.el-form-item {
	margin-top: 30px;
}

.form_image {
	margin-top: 5%;
}

#footer_text {
	font-size: 15px;
	color: #cccccc;
	text-align: center;
}
.register {
	position: absolute;
	left: 5%;
	top: 90%;
	font-size: 15px;
	text-decoration: none;
}
.btns2 {
	width: 300px;
}
.forget_btn_group {
	display: flex;
	justify-content: center;
}
.style1 {
	border-radius: 10px;
	border: 2px red solid;
}
</style>
