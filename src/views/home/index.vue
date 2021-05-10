<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="2" :offset="4">
					<el-image
						style="width: 160px; height: 55px"
						:src="logoUrl"
						:fit="contain"
					></el-image>
				</el-col>
				<el-col :span="2" :offset="1">
					<div class="title_hover title_hover2">
						<p>首页</p>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="title_hover">
						<p>免费创建</p>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="title_hover">
						<p>投票管理</p>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="title_hover">
						<p>帮助中心</p>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="title_hover">
						<p>关于我们</p>
					</div>
				</el-col>
				<el-col :span="2">
					<el-button class="register-button" type="danger">立即注册</el-button>
				</el-col>
				<el-col :span="2">
					<el-button class="login-button">登陆</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<el-col :span="5" class="form_image" :offset="5">
					<el-image
						style="width: 480px; height: 410px"
						:src="logoUrl2"
						:fit="contain"
					></el-image>
				</el-col>
				<el-col :span="10" class="from_div" :offset="2">
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
									<el-form-item label="账号" prop="username">
										<el-input
											v-model="loginForm.username"
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
										<el-button class="btns" type="primary" @click="login"
											>登录</el-button
										>
									</el-form-item>
									<el-row>
										<el-col :span="24" :offset="19"
											><a href="">忘记密码</a></el-col
										>
									</el-row>
								</el-form>
							</el-tab-pane>
							<el-tab-pane label="用户注册" name="register"> </el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<el-row>
				<el-col>
					<p id="footer_text">©2020 All rights reserved Cuberxp</p>
				</el-col>
			</el-row>
				
		</el-footer>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			logoUrl: "https://www.rrwtp.com/static/index/img/logo2.png",
			logoUrl2: "https://www.rrwtp.com/static/index/img/loginct.png",
			activeName: "login",
			loginForm: {
				username: "",
				password: "",
			},
			// 表单验证
			loginFormRules: {
				username: [
					{ required: true, message: "请输入手机号码", trigger: "blur" },
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
		}
	},
	methods: {
		handleClick(tab, event) {},
	},
}
</script>

<style scoped>
.el-container {
	height: 100%;
	width: 100%;
	position: absolute;
	padding: 0px;
}

.el-header {
	min-height: 80px;
	background-color: white;
	padding: 0px;
}
.el-main {
	padding: 0px;
	background-color: #f0f3fa;
}
.el-footer {
	background-color: #333333;
	min-height: 100px;
	padding: 0px;
}

.bg-purple-dark {
	background: #99a9bf;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.el-col {
	padding: 10px;
}
.el-col p {
	font-size: 16px;
	color: black;
}
.title_hover {
	height: 43px;
	width: 50%;
	border: 1px solid white;
}
.title_hover:hover {
	border-bottom: 2px solid red;
	color: red;
}
.register-button {
	margin-top: 10px;
}
.login-button {
	margin-top: 10px;
}
.title_hover2 {
	width: 25%;
}
.main {
	background-color: #f0f3fa;
}
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
	height: 500px;
	width: 500px;
	border-radius: 10px;
	margin-top: 5%;
}
.login_div {
	width: 80%;
}

.el-form-item {
	margin-top: 60px;
}

.form_image {
	margin-top: 5%;
}

.el-footer {
	background-color: #333333;
}

#footer_text {
	font-size: 15px;
	color: #cccccc;
	text-align: center;
}
</style>
