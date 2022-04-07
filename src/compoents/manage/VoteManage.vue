<template>
	<div>
		<a ref="downLoadLink"></a>
		<div class="voteManageList">
			<div
				class="voteManageItem"
				v-for="activityItem in activity"
				:key="activityItem.id"
			>
				<div class="voteManageItemTitle">
					<div>
						活动名称: <span>{{ activityItem.title }}</span>
					</div>

					<el-switch
						v-model="activityItem.status"
						active-text="活动开启"
						inactive-text="关闭"
						:disabled="activityItem.passed == 0"
						@change="updateActivityStatus(activityItem.status, activityItem.id)"
					>
					</el-switch>
				</div>
				<div class="voteManageItemDate">
					<span>ID: {{ activityItem.id }}</span>
					<span>创建时间: {{ activityItem.createTime | dateFormat }}</span>
				</div>

				<div class="imag_box">
					<!--- 活动关闭图片 -->
					<div v-if="activityItem.status == false" class="guanbi">
						活动已关闭
					</div>

					<div v-if="activityItem.passed == 0" class="guanbi">
						活动己被禁止，请联系管理员
					</div>
					<img
						v-if="activityItem.coverType == 0"
						class="voteManageItemImage"
						:src="activityItem.activityImage"
					/>
					<div v-if="activityItem.coverType == 1" class="voteManageItemImage">
						<iframe
							:src="activityItem.videoCover"
							scrolling="no"
							border="0"
							frameborder="no"
							framespacing="0"
							height="200px"
							allowfullscreen="true"
							class="voteManageItemImage"
						>
						</iframe>
					</div>
				</div>

				<div class="shijianqujian">
					<i class="el-icon-date"></i
					>{{ activityItem.beginTime | dateFormat }} -
					{{ activityItem.endTime | dateFormat }}
				</div>

				<div class="activityData">
					<div class="activityDataItem">
						<p class="activityCout">{{ activityItem.playerCount }}</p>
						<p>选手数</p>
					</div>
					<div class="activityDataItem">
						<p class="activityCount">{{ activityItem.voteCount }}</p>
						<p>投票数</p>
					</div>
					<div class="activityDataItem">
						<p class="activityCount">{{ activityItem.views }}</p>
						<p>浏览量</p>
					</div>
				</div>

				<div class="activityButtonGroup">
					<el-button
						size="small"
						type="primary"
						icon="el-icon-document-copy"
						@click="activityEdit(activityItem.id)"
						:disabled="activityItem.passed == 0"
						>活动修改</el-button
					>
					<el-button
						size="small"
						type="info"
						plain
						icon="el-icon-sunrise-1"
						@click="playerManageClick(activityItem.id)"
						:disabled="activityItem.passed == 0"
						>选手管理</el-button
					>
					<el-button
						size="small"
						type="success"
						plain
						icon="el-icon-printer"
						@click="exportActivityExcel(activityItem.id)"
						:disabled="activityItem.passed == 0"
						>数据导出</el-button
					>
				</div>

				<div class="activityLook">
					<el-button
						type="primary"
						@click="getActivityUrlClick(activityItem.id)"
						:disabled="activityItem.passed == 0"
						>查看活动链接及二维码</el-button
					>
				</div>
			</div>
		</div>
		<el-pagination
			:current-page="queryInfo.currentPage"
			:page-sizes="[1, 3, 6]"
			:page-size="queryInfo.limit"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			class="pagination_style"
		></el-pagination>

		<el-dialog
			title="活动链接"
			:visible.sync="activityDialogVisible"
			width="25%"
		>
			<div class="activityLink">
				<h3>二维码</h3>
				<el-image
					class="codeImage"
					style="width: 100px; height: 100px"
					:src="currentActivity.activityQRCode"
				></el-image>
				<h3>链接地址</h3>
				<el-link
					:href="currentActivity.activityUrl"
					target="_blank"
					type="success"
					>{{ currentActivity.activityUrl }}</el-link
				>
				<p class="codeStyle">
					点击活动修改，可调整优化活动的界面样式，规则介绍等
				</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activity: [],
			queryInfo: {
				//当前页数
				currentPage: 1,
				//当前每次显示多少条数据
				limit: 6,
			},
			total: 0,
			currentActivity: {},
			activityDialogVisible: false,
		}
	},
	created() {
		this.getActivityList()
	},
	methods: {
		playerManageClick(activityId) {
			this.$router.push({ path: `/activityPlayer/${activityId}` })
		},
		activityEdit(activityId) {
			this.$router.push({ path: `/activityEdit/${activityId}` })
		},
		async getActivityList() {
			let userId = window.localStorage.getItem("id")
			const { data: res } = await this.$http.get(`/activity/part/${userId}`, {
				params: this.queryInfo,
			})

			if (res.code !== 200) {
				this.$message.error(res.message)
			}

			this.activity = res.data.records
			this.total = res.data.total
		},
		async getActivityUrlClick(activityId) {
			this.activityDialogVisible = true
			const { data: res } = await this.$http.get(`/activity/${activityId}/code`)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.currentActivity = res.data
		},
		handleSelect(tab, event) {},
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
		async updateActivityStatus(activityStatus, activityId) {
			// 活动时间是否超过结束时间
			let hasOverDateTime = false
			for (let i = 0; i < this.activity.length; i++)
				if (
					this.activity[i].id === activityId &&
					this.activity[i].endTime < Date.parse(new Date())
				) {
					hasOverDateTime = true

					this.activity[i].status = false
					break
				}

			if (hasOverDateTime === true && activityStatus === true)
				return this.$message.info(
					"当前活动的时间己过期！请修改活动开始与结束时间！"
				)

			const { data: res } = await this.$http.put(
				`/activity/${activityId}/status?status=${activityStatus}`
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			if (activityStatus) {
				this.$message.success("开启活动成功")
			} else {
				this.$message.success("关闭活动成功")
			}
		},
		exportActivityExcel(activityId) {
			let blobUrl = `http://localhost:8081/player/activity/${activityId}`
			this.$refs.downLoadLink.href = blobUrl
			this.$refs.downLoadLink.download = "player.xlsx"
			this.$refs.downLoadLink.click()
		},
	},
}
</script>

<style scoped>
.voteManageItemTitle {
	display: flex;
	justify-content: space-between;
	padding-bottom: 3px;
	padding-top: 3px;
	font-size: 14px;
}

.voteManageItemTitle span {
	color: #666;
}

.voteManageItemDate {
	display: flex;
	justify-content: space-between;
	padding-bottom: 3px;
	font-size: 14px;
}
.voteManageList {
	width: 100%;
	min-height: 480px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.voteManageItem {
	width: 350px;
	height: 480px;
	min-height: 480px;
	border: 1px solid black;
	border-radius: 10px;
	border-color: #cccc;
	padding-left: 10px;
	padding-right: 5px;
	color: #333;
	margin-top: 20px;
}

.shijianqujian {
	width: 100%;
	color: #fff;
	text-align: center;
	position: relative;
	left: 0;
	bottom: 30px;
	font-size: 14px;
}
.activityData {
	display: flex;
	justify-content: space-around;
	text-align: center;
	font-size: 10px;
	line-height: 5px;
}
.activityDataItem {
	width: 42px;
	height: 42px;
}
.activityCount {
	color: rgba(18, 76, 224, 1);
}

.activityButtonGroup {
	display: flex;
	justify-content: space-around;
	font-size: 13px;
	margin-top: 10px;
}
.activityLook {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}

.voteManageItemImage {
	border-radius: 10px;
	width: 100%;
	height: 250px;
}

.imag_box {
	display: flex;
	position: relative;
}

.guanbi {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 1);
	border: 1px solid red;
	position: absolute;
	opacity: 0.78;
	text-align: center;
	color: #ffffff;
	font-size: 24px;
	line-height: 200px;
}
.pagination_style {
	float: right;
}
.activityLink {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.activityLink h3 {
	margin: 0 auto;
}
.codeStyle {
	font-size: 13px;
	color: #ccc;
}
.codeImage {
	display: block;
	margin: 0 auto;
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
