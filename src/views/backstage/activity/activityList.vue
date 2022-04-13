<template>
	<el-card>
		<!-- 活动列表区域 -->
		<el-table :data="activityeList" border stripe>
			<el-table-column type="index"></el-table-column>
			<el-table-column label="标题" prop="title"></el-table-column>
			<el-table-column label="活动是否开启" width="100">
				<!-- 作用域插槽 -->
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status == 0" type="success">己开启</el-tag>
					<el-tag v-else type="warning">己关闭</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="活动状态" width="110">
				<!-- 作用域插槽 -->
				<template slot-scope="scope">
					<el-tag v-if="scope.row.passed == 1" type="success">解除禁止</el-tag>
					<el-tag v-else-if="scope.row.passed == 0" type="warning"
						>己禁止</el-tag
					>
				</template>
			</el-table-column>

			<el-table-column label="活动数据" width="150">
				<template slot-scope="scope">
					<el-tooltip
						effect="dark"
						content="报名人数"
						placement="top"
						:enterable="false"
					>
						<el-badge :value="scope.row.playerCount" class="item"> </el-badge>
					</el-tooltip>
					<el-tooltip
						effect="dark"
						content="投票数"
						placement="top"
						:enterable="false"
					>
						<el-badge :value="scope.row.voteCount" class="item" type="primary">
						</el-badge>
					</el-tooltip>
					<el-tooltip
						effect="dark"
						content="浏览量"
						placement="top"
						:enterable="false"
					>
						<el-badge :value="scope.row.views" class="item" type="warning">
						</el-badge>
					</el-tooltip>
				</template>
			</el-table-column>

			<el-table-column label="创建时间">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span> {{ scope.row.createTime | dateFormat }}</span>
				</template>
			</el-table-column>

			<el-table-column label="禁止活动" width="80">
				<template slot-scope="scope">
					<el-switch
						v-model="scope.row.passed"
						:active-value="0"
						:inactive-value="1"
						@change="updateActivityStatus(scope.row.id, scope.row.passed)"
					>
					</el-switch>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip
						effect="dark"
						content="查看活动详信息"
						placement="top"
						:enterable="false"
					>
						<el-button
							type="info"
							icon="el-icon-info"
							size="mini"
							@click="getActivityInfo(scope.row.id)"
						></el-button>
					</el-tooltip>
					<el-tooltip
						effect="dark"
						content="选手管理"
						placement="top"
						:enterable="false"
					>
						<el-button
							type="primary"
							icon="el-icon-ice-drink"
							size="mini"
							@click="playerActivityManager(scope.row.id)"
						></el-button>
					</el-tooltip>
					<el-tooltip
						effect="dark"
						content="删除活动"
						placement="top"
						:enterable="false"
					>
						<!-- 删除按钮 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeActivity(scope.row.id)"
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

		<el-dialog title="活动详细信息" :visible.sync="dialogVisible" width="50%">
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
									disabled
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
									disabled
								>
								</el-date-picker>
							</el-form-item>
						</el-col>

						<el-col :span="22" :offset="1">
							<el-form-item label="活动说明">
								<mavon-editor
									ref="md"
									v-model="baseSetting.ruleContent"
									:subfield="props.subfield"
									:defaultOpen="props.defaultOpen"
									:editable="props.editable"
									:toolbarsFlag="props.toolbarsFlag"
									:navigation="props.navigation"
									:boxShadow="props.boxShadow"
								/>
							</el-form-item>
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
						<el-tabs v-model="styleSetting.coverType">
							<el-tab-pane label="图片封面" name="0">
								<el-upload
									:action="uploadURL"
									:on-preview="handlePreview"
									list-type="picture"
									:headers="headerObj"
									:file-list="styleSetting.imgsCover"
									disabled
								>
								</el-upload>
							</el-tab-pane>
							<el-tab-pane label="视频封面" name="1">
								<el-input
									placeholder="请输入BiliBili视频链接"
									v-model="styleSetting.videoCover"
									disabled
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
							disabled
						>
						</el-switch>
						<el-input
							class="inputNotice"
							v-if="styleSetting.noticeFlag"
							placeholder="请输入活动公告"
							v-model="styleSetting.notice"
							disabled
						></el-input>
						<p class="noticeRemakr">可以帮助用户宣传</p>
					</el-col>

					<el-col :span="23" :offset="1">
						<h5>按票按钮</h5>
						<div class="voteButtonsGroup">
							<el-radio-group
								v-model="styleSetting.voteButtonType"
								class="voteType"
								disabled
							>
								<el-radio :label="1" disabled>点赞</el-radio>
								<el-radio :label="2" disabled>打分</el-radio>
								<el-radio :label="3" disabled>投票</el-radio>
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
									disabled
								></el-input-number>
								~
								<el-input-number
									v-model="styleSetting.inputRangeEnd"
									:precision="2"
									:step="0.1"
									:max="1000"
									size="mini"
									disabled
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
				<el-form>
					<el-row>
						<el-col :span="19" :offset="1">
							<span class="noticeStyle">是否开启选手自主报名 </span>
							<el-radio-group
								disabled
								size="small"
								v-model="functionSetting.signFlag"
							>
								<el-radio-button :label="0">关闭</el-radio-button>
								<el-radio-button :label="1">开启</el-radio-button>
							</el-radio-group>
						</el-col>
						<el-col
							disabled
							:span="19"
							:offset="1"
							v-if="functionSetting.signFlag"
						>
							<span class="noticeStyle">报名审核</span>
							<el-radio-group
								disabled
								size="small"
								v-model="functionSetting.singUpFlag"
							>
								<el-radio-button :label="0">关闭</el-radio-button>
								<el-radio-button :label="1">开启</el-radio-button>
							</el-radio-group>
						</el-col>
						<el-col disabled :span="23" :offset="1" style="margin-top: 10px">
							<span class="noticeStyle">选手排序 </span>
							<el-radio-group
								disabled
								size="small"
								v-model="functionSetting.playerMethod"
							>
								<el-radio-button label="1">编号从低到高</el-radio-button>
								<el-radio-button label="2">票数从高到低</el-radio-button>
								<el-radio-button label="3">报名时间倒序</el-radio-button>
							</el-radio-group>
						</el-col>
						<el-col disabled :span="23" :offset="1">
							<span class="noticeStyle">分组是否开启</span>
							<el-switch
								v-model="functionSetting.groupFlag"
								active-text="开启"
								inactive-text="关闭"
								disabled
							>
							</el-switch>
							<span class="noticeGroupRemark"
								>（选填）选手报名和排行进行分组</span
							>
							<div v-if="functionSetting.groupFlag" style="margin-top: 10px">
								<el-button
									size="small"
									type="danger"
									@click="addGroupDialogVisible = true"
									disabled
									>增加</el-button
								>
								<el-table :data="functionSetting.group" style="width: 100%">
									<el-table-column prop="id" label="编号" width="180">
									</el-table-column>

									<el-table-column prop="name" label="分组名称" width="180">
									</el-table-column>
								</el-table>
							</div>
						</el-col>

						<el-col :span="23" :offset="1">
							<p class="voetRoleTile">投票规则</p>
							<el-radio-group v-model="functionSetting.voteRuleType">
								<el-radio :label="1" disabled
									>一个号每天能投(打)

									<el-input-number
										v-model="functionSetting.playerVoteCount"
										controls-position="right"
										:min="1"
										:max="100"
										size="small"
										class="everyDayNumStyle"
										disabled
									></el-input-number>
									票(次打分)，可将全部票投给同一个选手</el-radio
								>
								<el-radio :label="2" style="margin-top: 10px" disabled
									>活动时间内只能投(打)一票(次打分)</el-radio
								>
							</el-radio-group>
						</el-col>
						<el-col :span="19" :offset="1">
							<span class="noticeStyle">是否开启是否开启匿名投票</span>
							<el-radio-group
								size="small"
								v-model="functionSetting.secretVoteFlag"
								disabled
							>
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
							<el-button type="success" @click="dialogVisible = false" plain
								>返回</el-button
							>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-dialog>
		<el-dialog title="选手管理" :visible.sync="playerDialogVisible" width="50%">
			<!-- 用户列表区域 -->
			<el-table :data="playerList" border stripe>
				<el-table-column
					label="编号"
					prop="number"
					width="50px"
				></el-table-column>
				<el-table-column label="名称" prop="name"></el-table-column>
				<el-table-column label="报名时间" width="150px">
					<template slot-scope="scope">{{
						scope.row.createTime | dateFormat
					}}</template>
				</el-table-column>
				<el-table-column
					label="票数"
					prop="votesCount"
					width="50px"
				></el-table-column>

				<el-table-column label="状态">
					<!-- 作用域插槽 -->
					<template slot-scope="scope">
						<el-tag v-if="scope.row.review == true" type="info">未禁止</el-tag>
						<el-tag v-else type="success">己禁止</el-tag>
					</template>
				</el-table-column>

				<el-table-column label="禁止选手" width="80">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.review"
							:active-value="false"
							:inactive-value="true"
							@change="
								updateActivityPlayerReview(scope.row.id, scope.row.review)
							"
						>
						</el-switch>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
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
				@size-change="playerHandleSizeChange"
				@current-change="playerHandleCurrentChange"
				:current-page="playerQueryInfo.currentPage"
				:page-sizes="[1, 2, 5, 10]"
				:page-size="playerQueryInfo.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="playerTotal"
			></el-pagination>
		</el-dialog>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			playerList: [],
			playerDialogVisible: false,
			uploadURL: "http://localhost:8081/user/avatar",
			headerObj: {
				t: window.localStorage.getItem("token"),
			},
			// 处理图片预览效果
			handlePreview(file) {
				console.log("图片预览效果", file)
				this.previcewPath = file.url
				this.previewDialogVisible = true
			},
			previcewPath: "",
			previewDialogVisible: true,
			active: 0,
			// 已选步骤
			stepSuc: [0],
			dialogVisible: false,
			activityeList: [],
			// 获取用户列表的参数对象
			queryInfo: {
				//当前页数
				currentPage: 1,
				//当前每次显示多少条数据
				limit: 10,
			},
			flag: false,
			total: 0,
			activityDate: [],
			baseSetting: {},
			styleSetting: {},
			functionSetting: {},
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
			props: {
				defaultOpen: "preview",
				subfield: false,
				editable: false,
				toolbarsFlag: false,
				navigation: false,
				boxShadow: false,
			},
			playerQueryInfo: {
				currentPage: 1,
				limit: 5,
			},
			playerTotal: 0,
			playerActivityId: 0,
		}
	},
	created() {
		this.getActivityList()
	},
	methods: {
		async updateActivityPlayerReview(playerId, status) {
			const { data: res } = await this.$http.put(
				`/player/${playerId}/review/status?status=${status}`
			)

			if (res.code !== 200) {
				return this.$message.error("修改状态失败!")
			} else {
				this.$message.success("修改成功！")

				this.getActivityPlayer(this.playerActivityId)
			}
		},
		//监听pageSize 改变的事件
		playerHandleSizeChange(newSize) {
			this.playerQueryInfo.limit = newSize
			this.getActivityPlayer(this.playerActivityId)
		},
		//监听 页码值 改变的事件
		playerHandleCurrentChange(newPage) {
			this.playerQueryInfo.currentPage = newPage
			this.getActivityPlayer(this.playerActivityId)
		},
		async getActivityPlayer(activityId) {
			this.playerActivityId = activityId

			const { data: res } = await this.$http.get("/player/page", {
				params: {
					activityId: activityId,
					currentPage: this.playerQueryInfo.currentPage,
					limit: this.playerQueryInfo.limit,
					groupId: -1,
				},
			})

			if (res.code !== 200) {
				this.$message.error(res.message)
			}

			this.playerList = res.data.records
			this.playerTotal = res.data.total
		},
		// 点击步骤条
		handleStep(val) {
			this.active = val
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
			this.stepSuc.push(++this.active)
		},
		async getActivityInfo(activityId) {
			this.dialogVisible = true

			const { data: res } = await this.$http.get(`/activity/${activityId}/all`)

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
		handleClose() {},
		playerActivityManager(activityId) {
			this.playerDialogVisible = true
			this.getActivityPlayer(activityId)
		},
		async removeActivity(id) {
			const { data: res } = await this.$http.delete(`/activity/${id}`)

			if (res.code !== 200) {
				return this.$message.error("删除活动失败!")
			}

			this.$message.success("删除活动成功!")
			this.getActivityList()
		},
		async updateActivityStatus(id, updatePassed) {
			console.log(this.activityeList)

			// PUT http://localhost:8081/activity/2/passed
			let value = Number(updatePassed)
			const { data: res } = await this.$http.put(
				`/activity/${id}/passed?passed=${value}`
			)

			if (res.code !== 200) {
				return this.$message.error("修改审核状态失败!")
			} else {
				this.$message.success("修改成功！")
			}
		},
		async getActivityList() {
			const { data: res } = await this.$http.get("/activity/all/info", {
				params: this.queryInfo,
			})

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}
			this.activityeList = res.data.records
			this.total = res.data.total
			console.log(res)
		},
		//监听pageSize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.limit = newSize
			this.getActivityList()
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newPage) {
			this.queryInfo.currentPage = newPage
			this.getActivityList()
		},
		async removeUserById(playerId) {
			const { data: res } = await this.$http.delete(
				`/player/${playerId}/activity/${this.playerActivityId}`
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.$message.success("删除该选手的信息成功!")
			this.getActivityPlayer(this.playerActivityId)
		},
	},
}
</script>

<style scoped>
.item {
	margin-right: 10px;
}

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
