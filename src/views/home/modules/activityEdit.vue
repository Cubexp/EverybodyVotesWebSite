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
								<el-input
									placeholder="请输入活动标题"
									v-model="baseSetting.title"
								></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8" :offset="1">
							<el-form-item label="活动时间">
								<el-date-picker
									v-model="activityDate"
									type="datetimerange"
									:picker-options="pickerOptions"
									range-separator="至"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
									align="right"
									@change="selectActvityDate"
								>
								</el-date-picker>
							</el-form-item>
						</el-col>

						<el-col :span="22" :offset="1">
							<mavon-editor
								ref="md"
								@imgAdd="$imgAdd"
								@imgDel="$imgDel"
								v-model="baseSetting.ruleContent"
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
						<el-tabs v-model="styleSetting.coverType" @tab-click="handleClick">
							<el-tab-pane label="图片封面" name="0">
								<el-upload
									:action="uploadURL"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
									list-type="picture"
									:headers="headerObj"
									:on-success="handleSuccess"
									:file-list="styleSetting.imgsCover"
								>
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">
										只能上传jpg/png文件，且不超过4mb
									</div>
								</el-upload>
							</el-tab-pane>
							<el-tab-pane label="视频封面" name="1">
								<el-input
									placeholder="请输入BiliBili视频链接"
									v-model="styleSetting.videoCover"
								></el-input>
								<el-link type="primary" href="www.baidu.com"
									>目前仅支技BiliBili视频链接，如何上传视频链接？</el-link
								>
							</el-tab-pane></el-tabs
						>
					</el-col>

					<el-col :span="19" :offset="1" class="noticeDiv">
						<span class="noticeStyle">活动公告</span>
						<el-switch
							v-model="styleSetting.noticeFlag"
							active-text="开启"
							inactive-text="关闭"
						>
						</el-switch>
						<el-input
							class="inputNotice"
							v-if="styleSetting.noticeFlag"
							placeholder="请输入活动公告"
							v-model="styleSetting.notice"
						></el-input>
						<p class="noticeRemakr">可以帮助用户宣传</p>
					</el-col>

					<el-col :span="23" :offset="1">
						<h5>按票按钮</h5>
						<div class="voteButtonsGroup">
							<el-radio-group
								v-model="styleSetting.voteButtonType"
								class="voteType"
							>
								<el-radio :label="1">点赞</el-radio>
								<el-radio :label="2">打分</el-radio>
								<el-radio :label="3">投票</el-radio>
							</el-radio-group>

							<div
								v-if="styleSetting.voteButtonType == 1"
								class="voteButtPrise"
							>
								<el-button type="primary" size="medium" plain>点赞</el-button>
							</div>

							<div
								v-if="styleSetting.voteButtonType == 3"
								class="voteButtPrise"
							>
								<el-button type="success" size="medium" plain>投票</el-button>
							</div>

							<div
								v-if="styleSetting.voteButtonType == 2"
								class="voteButtPrise2"
							>
								<el-input-number
									v-model="styleSetting.inputRangeBegin"
									:precision="2"
									:step="0.1"
									:max="1000"
									size="mini"
								></el-input-number>
								~
								<el-input-number
									v-model="styleSetting.inputRangeEnd"
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
					<el-radio-group size="small" v-model="functionSetting.signFlag">
						<el-radio-button :label="0">关闭</el-radio-button>
						<el-radio-button :label="1">开启</el-radio-button>
					</el-radio-group>
				</el-col>
				<el-col :span="19" :offset="1" v-if="functionSetting.signFlag">
					<span class="noticeStyle">报名审核</span>
					<el-radio-group size="small" v-model="functionSetting.singUpFlag">
						<el-radio-button :label="0">关闭</el-radio-button>
						<el-radio-button :label="1">开启</el-radio-button>
					</el-radio-group>
				</el-col>
				<el-col :span="23" :offset="1" style="margin-top: 10px">
					<span class="noticeStyle">选手排序 </span>
					<el-radio-group size="small" v-model="functionSetting.playerMethod">
						<el-radio-button label="1">编号从低到高</el-radio-button>
						<el-radio-button label="2">票数从高到低</el-radio-button>
						<el-radio-button label="3">报名时间倒序</el-radio-button>
					</el-radio-group>
				</el-col>
				<el-col :span="23" :offset="1">
					<span class="noticeStyle">分组是否开启</span>
					<el-switch
						v-model="functionSetting.groupFlag"
						active-text="开启"
						inactive-text="关闭"
					>
					</el-switch>
					<span class="noticeGroupRemark">（选填）选手报名和排行进行分组</span>
					<div v-if="functionSetting.groupFlag" style="margin-top: 10px">
						<el-button
							size="small"
							type="danger"
							@click="addGroupDialogVisible = true"
							>增加</el-button
						>
						<el-table :data="functionSetting.group" style="width: 100%">
							<el-table-column prop="id" label="编号" width="180">
							</el-table-column>

							<el-table-column prop="name" label="分组名称" width="180">
							</el-table-column>
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button
										type="success"
										@click="setUpdateDigalVisital(scope.row.id)"
										plain
										size="mini"
										>修改</el-button
									>
									<el-button
										type="danger"
										size="mini"
										@click="delGroup(scope.row.id)"
										plain
										>删除</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>

				<el-col :span="23" :offset="1">
					<p class="voetRoleTile">投票规则</p>
					<el-radio-group v-model="functionSetting.voteRuleType">
						<el-radio :label="1"
							>一个号每天能投(打)

							<el-input-number
								v-model="functionSetting.playerVoteCount"
								controls-position="right"
								:min="1"
								:max="100"
								size="small"
								class="everyDayNumStyle"
							></el-input-number>
							票(次打分)，可将全部票投给同一个选手</el-radio
						>
						<el-radio :label="2" style="margin-top: 10px"
							>活动时间内只能投(打)一票(次打分)</el-radio
						>
					</el-radio-group>
				</el-col>
				<el-col :span="19" :offset="1">
					<span class="noticeStyle">是否开启是否开启匿名投票</span>
					<el-radio-group size="small" v-model="functionSetting.secretVoteFlag">
						<el-radio-button :label="0">关闭</el-radio-button>
						<el-radio-button :label="1">开启</el-radio-button>
					</el-radio-group>
					<p class="noticeRemakr">无需登陆就可投票</p>
				</el-col>
				<el-col
					:span="14"
					offset="9"
					style="margin-top: 10px; margin-bottom: 10px"
				>
					<el-button type="success" @click="updateActivity" plain
						>保存设置</el-button
					>
				</el-col>
			</div>
		</div>

		<el-dialog
			title="修改分组名称"
			:visible.sync="updateGroupDialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				placeholder="输入修改后的分组名称"
				v-model="updateGroupItem.name"
			></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="updateGroupDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateGroup">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog
			title="添加分组名称"
			:visible.sync="addGroupDialogVisible"
			width="30%"
		>
			<el-input placeholder="输入组名称" v-model="groupName"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addGroupDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addGroup">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			activeName: "first",
			// 已选步骤
			stepSuc: [0],
			props: {
				defaultOpen: "edit",
				subfield: false,
				editable: true,
				toolbarsFlag: true,
				navigation: false,
				boxShadow: false,
			},
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit("pick", [start, end])
						},
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit("pick", [start, end])
						},
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit("pick", [start, end])
						},
					},
				],
			},
			uploadURL: "http://localhost:8081/user/avatar",
			headerObj: {
				t: window.localStorage.getItem("token"),
			},
			srcList: [],
			previcewPath: "",
			previewDialogVisible: true,
			groupName: "",
			groupActivityId: 0,
			updateGroupDialogVisible: false,
			addGroupDialogVisible: false,
			activityDate: [],
			updateGroupItem: {
				id: 0,
				name: "",
			},
			//基础设置相关参数
			baseSetting: {
				title: "",
				beginTime: 0,
				endTime: 0,
				ruleContent: "",
			},
			styleSetting: {
				// 0 图片封面 1视频
				coverType: "0",
				videoCover: "",
				// 图片封南
				imgsCover: [],
				//活动公告
				noticeFlag: false,
				notice: "",
				// 投票按钮类型
				// 1点赞，2投票，3打分
				voteButtonType: 1,
				// 打分的话他的范围是多少
				inputRangeBegin: 0,
				inputRangeEnd: 100,
			},
			functionSetting: {
				// 是否开启选手自主报名
				// 0 关闭 1开启
				signFlag: 0,
				// 报名审核
				//  0 关闭 1开启
				singUpFlag: 0,
				//选手排序
				// 1 编号从低到高
				// 2  票数从高到低
				// 3 报名时间倒序
				playerMethod: 1,
				groupFlag: true,
				//分组数据
				group: [],
				// 1一个号每天能投，2活动时间内只能投
				voteRuleType: 1,
				playerVoteCount: 1,
				// 0 关闭 1开记
				secretVoteFlag: 0,
			},

			activityId: 0,
		}
	},
	created() {
		this.activityId = this.$route.params.id
		this.getActivityInfo()
	},
	methods: {
		async getActivityInfo() {
			const { data: res } = await this.$http.get(
				`/activity/${this.activityId}/all`
			)

			if (res.code !== 200) {
				this.$message.error(res.message)
			}
			let activity = res.data

			this.activityDate = [
				new Date(activity.beginTime),
				new Date(activity.endTime),
			]
			this.baseSetting = {
				title: activity.title,
				beginTime: activity.beginTime,
				endTime: activity.endTime,
				ruleContent: activity.ruleContent,
			}

			let urls = []
			if (activity.coverType === 0) {
				activity.coverImages.forEach((item) => {
					urls.push({
						url: item,
					})
				})
			}

			this.styleSetting = {
				// 0 图片封面 1视频
				coverType: activity.coverType + "",
				videoCover: activity.videoCover,
				// 图片封南
				imgsCover: urls,
				//活动公告
				noticeFlag: activity.noticeFlag,
				notice: activity.notice,
				// 投票按钮类型
				// 1点赞，2投票，3打分
				voteButtonType: activity.voteButtonType,
				// 打分的话他的范围是多少
				inputRangeBegin: activity.inputRangeBegin,
				inputRangeEnd: activity.inputRangeEnd,
			}
			console.log(this.styleSetting + " test")
			let currentSingFlag = activity.signFlag ? 1 : 0
			let currentSingUpFlag = activity.singUpFlag ? 1 : 0
			let currentSecretVoteFlag = activity.secretVoteFlag ? 1 : 0
			this.functionSetting = {
				// 是否开启选手自主报名
				// 0 关闭 1开启
				signFlag: currentSingFlag,
				// 报名审核
				//  0 关闭 1开启
				singUpFlag: currentSingUpFlag,
				//选手排序
				// 1 编号从低到高
				// 2  票数从高到低
				// 3 报名时间倒序
				playerMethod: activity.playerMethod,
				groupFlag: activity.groupFlag,
				//分组数据
				group: activity.group,
				// 1一个号每天能投，2活动时间内只能投
				voteRuleType: activity.voteRuleType,
				playerVoteCount: activity.playerVoteCount,
				// 0 关闭 1开记
				secretVoteFlag: currentSecretVoteFlag + "",
			}
		},
		// 点击步骤条
		handleStep(val) {
			if (this.stepSuc.includes(val) === true) {
				this.active = val
			}
		},
		// 组件点击上一步
		handleLastStep() {
			if (--this.active === 0) {
				this.active = 1
			}
		},
		// 组件点击下一步
		handleNextStep() {
			// 这里可以加上参数检验
			console.log(this.baseSetting)
			console.log(this.styleSetting)
			console.log(this.functionSetting)
			this.stepSuc.push(++this.active)
		},
		// 绑定@imgAdd event
		async $imgAdd(pos, $file) {},
		$imgDel(pos) {},
		selectActvityDate(date) {
			this.baseSetting.beginTime = date[0].valueOf()
			this.baseSetting.endTime = date[1].valueOf()

			console.log(this.baseSetting)
		},
		// 处理图片预览效果
		handlePreview(file) {
			this.previcewPath = file.url
			this.previewDialogVisible = true
		},
		// 处理移除图片的操作
		async handleRemove(file) {
			console.log(file)
			const filePath = file.url
			const i = this.styleSetting.imgsCover.findIndex((x) => x === filePath)

			this.styleSetting.imgsCover.splice(i, 1)

			if (res.code !== 200) {
				this.$message.error(res.message)
			}
		},
		// 监听图片上传成功
		async handleSuccess(response) {
			if (response.code !== 200) {
				return this.$message.error("上传文件失败!" + res.message)
			}

			// 2.将图片信息对象push 到 pics 数组中
			this.styleSetting.imgsCover.push(response.data)
			this.srcList = new Array(response.data, response.data)

			console.log(this.styleSetting.imgsCover)
			console.log(this.srcList)
		},
		async addGroup() {
			let groupObject = {
				activityId: this.activityId,
				name: this.groupName,
			}

			const { data: res } = await this.$http.post(
				"/activity/group",
				groupObject
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.$message.success("添加分组成功")
			groupObject = {
				id: res.data,
				name: this.groupName,
			}
			this.functionSetting.group.push(groupObject)
			this.addGroupDialogVisible = false
			this.groupName = ""
		},
		async delGroup(id) {
			const { data: res } = await this.$http.delete(`/activity/group/${id}`)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}
			this.$message.success("删除分组成功")
			const index = this.functionSetting.group.findIndex(
				(item) => item.id === id
			)

			this.functionSetting.group.splice(index, 1)
		},
		setUpdateDigalVisital(id) {
			this.updateGroupItem = this.functionSetting.group.find(
				(item) => item.id === id
			)

			this.updateGroupDialogVisible = true
		},
		async updateGroup() {
			const { data: res } = await this.$http.put(
				`/activity/group/${this.updateGroupItem.id}?name=${this.updateGroupItem.name}`
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}
			this.$message.success("修改分组成功")
			this.functionSetting.group.forEach((item) => {
				if (item.id === this.updateGroupItem.id) {
					item.name = this.updateGroupItem.name
				}
			})
			this.updateGroupDialogVisible = false
		},
		// 修改活动
		async updateActivity() {
			console.log("开始时的: ", this.styleSetting.videoCover)
			console.log(this.baseSetting)
			console.log(this.styleSetting)
			console.log(this.functionSetting)

			const bilUrl =
				"https://player.bilibili.com/player.html?aid=637507257&bvid={url}&cid=556614853&page=1&updated"
			if (
				this.styleSetting.coverType == 1 &&
				this.styleSetting.videoCover.indexOf(
					"https://player.bilibili.com/player.html?"
				) == -1
			) {
				let urlRegex = new RegExp("[a-zA-z]+://[^s]*")

				if (!urlRegex.test(this.styleSetting.videoCover)) {
					this.$message.error("视频封面格式错误!请修改")

					return
				}

				this.styleSetting.videoCover = bilUrl.replace(
					"{url}",
					this.styleSetting.videoCover.split("video/")[1].split("?")[0]
				)
			}

			delete this.functionSetting.group
			let targetActivity = Object.assign(
				this.baseSetting,
				this.styleSetting,
				this.functionSetting
			)
			let test = []

			for (let i = 0; i < this.styleSetting.imgsCover.length; i++)
				if (this.styleSetting.imgsCover[i] !== null)
					if (typeof this.styleSetting.imgsCover[i] === "object") {
						test.push(this.styleSetting.imgsCover[i].url)
					} else {
						test.push(this.styleSetting.imgsCover[i])
					}

			targetActivity.imgsCover = test

			targetActivity.coverType = Number.parseInt(targetActivity.coverType)
			targetActivity.createId = window.localStorage.getItem("id")
			console.log(targetActivity)

			const { data: res } = await this.$http.put(
				`/activity/${this.activityId}`,
				targetActivity
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.$message.success("修改活动成功!")
			this.$router.push("/manage/votes_manage")
		},
	},
}
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
	max-height: 2000px;
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
.everyDayNumStyle {
	width: 85px;
	height: 30px;
}
.voetRoleTile {
	font-size: 13px;
	font-weight: bold;
}
</style>
