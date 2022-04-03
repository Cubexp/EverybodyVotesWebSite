<template>
	<div>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="7">
					<el-link :underline="false" @click="back()">
						<i class="el-icon-back">Back</i>
					</el-link>
				</el-col>

				<el-col :span="2" :offset="11">
					<el-button type="info" plain @click="activityPlayerAdd"
						>添加选手</el-button
					>
				</el-col>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="playerList" border stripe>
				<el-table-column label="编号" prop="number"></el-table-column>
				<el-table-column label="姓名" prop="name"></el-table-column>
				<el-table-column label="报名时间">
					<template slot-scope="scope">{{
						scope.row.createTime | dateFormat
					}}</template>
				</el-table-column>
				<el-table-column label="票数" prop="votesCount"></el-table-column>

				<el-table-column label="操作">
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

						<el-tooltip
							effect="dark"
							content="报名审核"
							placement="top"
							:enterable="false"
						>
							<el-button
								type="success"
								size="mini"
								@click="reviewUserById(scope.row.id)"
								plain
								>审核通过</el-button
							>
							<el-button
								v-if="scope.row.review == true"
								type="danger"
								size="mini"
								disabled
								>己审核通过</el-button
							>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<!-- 作用域插槽 -->
					<template slot-scope="scope">
						<el-tag v-if="scope.row.review == true" type="info"
							>审核通过</el-tag
						>
						<el-tag v-else type="success">未审核</el-tag>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.currentPage"
				:page-sizes="[1, 2, 5, 10]"
				:page-size="queryInfo.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>

		<!-- 报名 -->
		<el-dialog
			title="选手信息表"
			:visible.sync="playerAddDialogVisible"
			width="30%"
		>
			<el-form
				ref="addPlayerFormRef"
				:model="addPlayerForm"
				:rules="addPlayerFormRules"
				label-width="100px"
			>
				<el-form-item label="手机号码" prop="phone">
					<el-input
						type="text"
						v-model="addPlayerForm.phone"
						placeholder="手机号码"
						prefix-icon="el-icon-phone"
					></el-input>
				</el-form-item>
				<el-form-item label="选手昵称" prop="name">
					<el-input
						type="text"
						v-model="addPlayerForm.name"
						placeholder="昵称"
						prefix-icon="el-icon-user"
					></el-input>
				</el-form-item>
				<el-form-item label="选手封面">
					<el-upload
						:action="uploadURL"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						list-type="picture"
						:headers="headerObj"
						:on-success="handleSuccess"
						:file-list="srcList"
					>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">
							只能上传jpg/png文件，且不超过4mb
						</div>
					</el-upload>
				</el-form-item>
				<el-form-item v-if="activity.groupFlag == true" label="分组">
					<el-select
						v-model="addPlayerForm.groupId"
						placeholder="请选择活动区域"
					>
						<el-option
							v-for="groupItem in activity.group"
							:key="groupItem.id"
							:label="groupItem.name"
							:value="groupItem.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" prop="remark">
					<el-input
						v-model="addPlayerForm.remark"
						placeholder="描述"
						type="textarea"
					></el-input>
				</el-form-item>

				<el-form-item>
					<el-button class="btns" type="primary" @click="addPlayerClick"
						>添加选手</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			uploadURL: "http://localhost:8081/user/avatar",
			// 报名表单验证
			addPlayerFormRules: {
				phone: [
					{
						required: true,
						min: 11,
						max: 11,
						message: "长度为11",
						trigger: "blur",
					},
				],
				name: [
					{
						required: true,
						message: "请输入昵称",
						trigger: "blur",
					},
					{
						min: 2,
						max: 20,
						message: "长度在 2 到 20 个字符",
						trigger: "blur",
					},
				],
				remark: [
					{ required: true, message: "请输入描述", trigger: "blur" },
					{
						min: 5,
						max: 200,
						message: "长度在 5 到 200 个字符",
						trigger: "blur",
					},
				],
			},
			addPlayerForm: {
				phone: "",
				name: "",
				groupId: "",
				remark: "",
				imgUrl: "",
			},
			activityId: 0,
			queryInfo: {
				currentPage: 1,
				limit: 10,
			},
			activity: {},
			total: 0,
			playerList: [],
			playerAddDialogVisible: false,
			headerObj: {
				t: window.localStorage.getItem("token"),
			},
			srcList: [],
			previcewPath: "",
		}
	},
	created() {
		this.activityId = this.$route.params.id
		this.getActivityPlayer(this.activityId)
		this.getActivityInfo(this.activityId)
	},
	methods: {
		async addPlayerClick() {
			console.log("添加选手:" + this.addPlayerForm)

			this.$refs.addPlayerFormRef.validate(async (valid) => {
				if (!valid) return

				this.addPlayerForm.groupId = Number.parseInt(this.addPlayerForm.groupId)
				console.log(this.playerAddDialogVisible)

				const { data: res } = await this.$http.post(
					`/player/activity/${this.activityId}`,
					this.addPlayerForm
				)

				if (res.code !== 200) {
					return this.$message.error(res.message)
				}

				this.$message.success("添加选手成功！！")

				this.playerAddDialogVisible = false

				this.getActivityPlayer(this.activityId)

				console.log("srclits:" + this.srcList)
				const i = this.srcList.findIndex(
					(x) => x.url === this.addPlayerForm.imgUrl
				)

				this.srcList.splice(i, 1)
				this.addPlayerForm = {
					phone: "",
					name: "",
					groupId: "",
					remark: "",
					imgUrl: "",
				}
			})
		},
		// 监听图片上传成功
		handleSuccess(response) {
			if (response.code !== 200) {
				return this.$message.error("上传文件失败!" + response.message)
			}

			console.log(response)
			// 2.将图片信息对象push 到 pics 数组中
			this.addPlayerForm.imgUrl = response.data
			this.srcList.push({
				name: "1",
				url: this.addPlayerForm.imgUrl,
			})
		},
		// 处理移除图片的操作
		handleRemove(file) {
			const filePath = file.response.data
			const i = this.srcList.findIndex((x) => x === filePath)

			this.srcList.splice(i, 1)
			this.singupForm.imgUrl = ""
			console.log(this.addForm)
		},
		// 处理图片预览效果
		handlePreview(file) {
			this.previcewPath = file.response.data
		},
		activityPlayerAdd() {
			this.playerAddDialogVisible = true
		},
		async reviewUserById(playerId) {
			const { data: res } = await this.$http.put(
				`/player/review?activityUserId=${playerId}`
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.$message.success("审核成功!")
			this.getActivityPlayer(this.activityId)
		},
		async removeUserById(playerId) {
			const { data: res } = await this.$http.delete(
				`/player/${playerId}/activity/${this.activityId}`
			)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}

			this.$message.success("删除该选手的信息成功!")

			this.getActivityPlayer(this.activityId)
		},
		async getActivityInfo(activityId) {
			const { data: res } = await this.$http.get(`/activity/${activityId}/all`)

			if (res.code !== 200) {
				return this.$message.error(res.message)
			}
			this.activity = res.data
		},
		async getActivityPlayer(activityId) {
			const { data: res } = await this.$http.get("/player/page", {
				params: {
					activityId: activityId,
					currentPage: this.queryInfo.currentPage,
					limit: this.queryInfo.limit,
					groupId: -1,
				},
			})

			if (res.code !== 200) {
				this.$message.error(res.message)
			}

			this.playerList = res.data.records
			this.total = res.data.total
		},
		//监听pageSize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.limit = newSize
			this.getActivityPlayer(this.activityId)
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newPage) {
			this.queryInfo.currentPage = newPage
			this.getActivityPlayer(this.activityId)
		},
		back() {
			history.back()
		},
	},
}
</script>

<style scoped></style>
