<template>
    <div class="right-container">
        <base-filter ref="baseFilter"
                     v-model="searchForm"
                     @searchClick="_queryTableData"
                     :filterData="filterData"
                     :autoRender="false"
        />

        <el-row class="buttons-group" :gutter="10" type="flex" justify="end">
            <el-col>
                <el-button type="primary" @click="$router.push({path:'/headTeacherResources|recruitmentPlan|create'})">
                    增加目标
                </el-button>
            </el-col>
        </el-row>

        <!-- 反人类ui 早晚要改 -->
        <el-table
                :data="tableData"
                :span-method="spanMethod"
                border
                v-loading="tableLoading"
                style="width: 100%">
            <el-table-column align="">
                <template slot="header" slot-scope="scope">
                    <span class="table-head">招聘目标</span>
                    <!--                    <span class="el-icon-date"></span>-->
                    更新于 {{latestUpdateTime1}}
                </template>
                <el-table-column
                        align="center"
                        v-for="item in tableColumns1"
                        :key="item.prop"
                        :label="item.label"
                        :prop="item.prop"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="招聘总缺口"
                        prop="dimission_num"
                >
                    <template slot-scope="scope">
                        <div @click="_viewAction({type:'showCalendar|plan',payload:scope})" style="cursor:pointer">
                            {{scope.row.dimission_num}}
                            <span class="el-icon-date"></span>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column align="">
                <template slot="header" slot-scope="scope">
                    <span class="table-head">选聘岗前培训进展</span>
                    更新于 {{latestUpdateTime2||'————'}}
                </template>
                <el-table-column
                        align="center"
                        v-for="item in tableColumns2"
                        :key="item.prop"
                        :label="item.label"
                        :prop="item.prop"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row[item.prop]" @click="_viewAction({type:'showCalendar',payload:scope})" style="cursor:pointer">
                            {{scope.row[item.prop]}} <span class="el-icon-date"></span>
                        </div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <span class="table-head">岗后培训进展</span>
                    更新于 {{latestUpdateTime3||'————'}}
                </template>
                <el-table-column
                        align="center"
                        v-for="item in tableColumns3"
                        :key="item.prop"
                        :label="item.label"
                        :prop="item.prop"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row[item.prop]" @click="_viewAction({type:'showCalendar',payload:scope})" style="cursor:pointer">
                            {{scope.row[item.prop]}}
                            <span class="el-icon-date"></span>
                        </div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column fixed="right" width="300" align="center">
                <template slot="header" slot-scope="scope">
                    <div class="table-head">操作</div>
                </template>
                <el-table-column label="招聘目标更新" width="100">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="_routerAction({type:'updateRecruitment',payload:scope.row})"
                                type="text"
                                size="small">
                            更新目标
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="岗前培训更新" width="100">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="_routerAction({type:'preJobTraining|update',payload:scope.row})"
                                type="text"
                                size="small">
                            更新进展
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="岗后培训更新" width="100">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="_routerAction({type:'onJobTraining|update',payload:scope.row})"
                                type="text"
                                size="small">
                            更新进展
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="calendarVisible" width="80%" top="5vh" :close-on-click-modal="false" title="招聘到岗需求">
            <!--            {{JSON.stringify(calendarData)}}-->
            <el-row :gutter="20" type="flex" align="middle" justify="space-between" class="cmptCalendarTitles">
                <el-col style="text-align: center" v-for="(item,index) in cmptCalendarTitles" :key="index">
                    {{item.label}}: {{item.value}}
                </el-col>
            </el-row>
            <el-calendar v-model="calendarValue">
                <template
                        slot="dateCell"
                        slot-scope="{date, data}">
                    <p>{{ data.day.split('-').slice(1)[1]}}</p>
                    <p v-if="calendarData" :class="data.isSelected ? 'is-selected' : ''">
                        {{calendarData.plan_date_list&&calendarData.plan_date_list.find(i=>i.item_date===
                        data.day)?'计划：':''}}
                        {{calendarData.plan_date_list&&calendarData.plan_date_list.find(i=>i.item_date ===
                        data.day)?calendarData.plan_date_list.find(i=>i.item_date ===
                        data.day).item_val:''}}
                    </p>
                </template>
            </el-calendar>
        </el-dialog>
    </div>
</template>

<script>
	/* eslint-disable */
	import baseFilter from '../../../components/baseTableForm.vue'
	import {dashboard} from './profile.js'
	// import '../../config/mock.js'
	import API, {Employ} from '../../../apis'

	/**
	 * @desc 提取指定字段 =》 组成对象 =》返回
	 * @param origin: Object
	 * @param keys: Array<Object>
	 * @return Object
	 */

	function extractFields (origin, keys) {
		if (typeof origin !== 'object') throw new Error('typeError: origin expect Object')
		if (!keys instanceof Array) throw new Error('typeError: keys expect Array')
		let obj = {}
		keys.map(key => {
			obj[key] = origin[key]
		})
		return obj
	}

	export default {
		components: {baseFilter},
		name: 'index.vue',
		data () {
			return {
				filterData: dashboard,
				// newTargetProfile: newTargetProfile,
				// 表格 搜索参数
				searchForm: {},

				tableLoading: true,
				tableColumns1: [{
					label: '基地',
					prop: 'school_name'
				}, {
					label: '学部',
					prop: 'division_name'
				}, {
					label: '学科',
					prop: 'subject_name'
				}, {
					label: '招生总目标',
					prop: 'target_num'
				}],

				tableColumns2: [{
					label: '简历量',
					prop: 'actual_resume'
				}, {
					label: '面试通过量',
					prop: 'actual_interview_pass'
				}, {
					label: '岗前实际参培量',
					prop: 'actual_training_before'
				}, {
					label: '岗前培训通过量',
					prop: 'actual_pass_before'
				}],

				tableColumns3: [{
					label: '签约量',
					prop: 'actual_sign'
				}, {
					label: '教学实际参培量',
					prop: 'actual_training_after'
				}, {
					label: '设备实际配置量',
					prop: 'actual_device'
				}, {
					label: '教学培训通过量',
					prop: 'actual_pass_after'
				}
				],
				tableData: [],
				calendarVisible: false,
				calendarValue: new Date(),
				calendarData: {
					plan_date_list: []
				},
				calendarActualData: '',

				//权限
				permissions: {
					'batchsaveplan': false,
					'saveemploybefore': false,
					'saveemployafter': false
				},

				latestUpdateTime1: '',
				latestUpdateTime2: '',
				latestUpdateTime3: ''
			}
		},
		computed: {
			cmptCalendarTitles () {
				const {
					target_num,
					max_teacher_num,
					actual_teacher_num,
					teacher_gap,
					dimission_num
				} = this.calendarData

				return [
					{label: '招聘总缺口', value: target_num},
					{label: '最大并发班主任', value: max_teacher_num},
					{label: '实际班主任数', value: actual_teacher_num},
					{label: '班主任缺口', value: teacher_gap},
					{label: '学期离职替补缺口', value: dimission_num}
				]
			}
		},
		methods: {
			_createForm (formName) {

			},
			_routerAction ({type, payload}) {
				const {year_id, term_id, teacher_type_id, school_id} = payload
				switch (type) {
					case 'updateRecruitment':
						this.$router.push({
							path: '/headTeacherResources|recruitmentPlan|update',
							query: {year_id, term_id, teacher_type_id, school_id}
						})
						break
					case 'preJobTraining|update':
						this.$router.push({
							path: '/preJobTraining|update',
							query: {...payload}
						})
						break
					case 'onJobTraining|update':
						this.$router.push({
							path: 'onJobTraining|update',
							query: {...payload}
						})
						break
					default:
					//do something
				}
			},
			_viewAction ({type, payload}) {
				switch (type) {
					case 'showCalendar|plan':
						this._showCalendar({type: 'plan', payload})
						break
				}
			},
			_showCalendar ({type, payload}) {
				this.calendarData = []

				const {
					basic_id
				} = payload.row

				if (!basic_id) {
					this.$message.error('入参缺失 basic_id')
					return
				}
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})

				API.Employ.getPlanInfo({
					basic_id
				}).then(rep => {

					this.calendarData = {
						...rep,
						'_type': type
					}
					this.calendarVisible = true
					loading.close()
				})
			},

			// 表格合并方法 参考elementUI文档：https://element.eleme.cn/#/zh-CN/component
			spanMethod ({row, column}) {
				// 需要合并的列
				const mergeRows = ['基地', '简历量', '面试通过量', '岗前实际参培量', '岗前培训通过量','岗前培训更新','招聘目标更新']

				// // 第一列
				if (mergeRows.find(col => col === column.label)) {
					if (row._rowspan !== 0) {
						return [row._rowspan, 1]
					} else {
						return [0, 0]
					}
				}
			},

			/**
			 * @desc 手动 初始化 筛选项
			 * @return {Promise<void>}
			 * @private
			 */
			async _initFilter () {
				await this.$refs['baseFilter'].initialize()
			},

			/**
			 * @desc 查询 表格数据 必须在初始化筛选项完成后执行
			 * @param params
			 * @return {Promise<void>}
			 * @private
			 */
			async _queryTableData (params) {
				this.tableLoading = true
				let school_ids = this.searchForm.school_ids
				let result = await API.Employ.getDashboard({
					...this.searchForm,
					school_ids: Array.isArray(school_ids) ? school_ids.join(',') : ''
				})
				await this._renderTableData(result)
				this.tableLoading = false
			},

			async _getPlanList (params) {
				let result = await API.Employ.getPlanList(params)
				const {plan_date_list} = result
				return plan_date_list
			},

			/**
			 * @desc 初始化筛选项，表格数据
			 * @return {Promise<void>}
			 * @private
			 */
			async _initalizer () {
				await this._initFilter()
				await this._queryTableData()
			},
			/**
			 * @desc 根据校区唯一标识（school_id）合并三个独立的数据，为满足渲染合并表格的需求
			 * @param data
			 * @private
			 */
			_renderTableData (data) {

				// 获得最新更新时间
				try {
					this.latestUpdateTime1 = data.plan_list[data.plan_list.length - 1].updated_at.slice(0, 10)
					this.latestUpdateTime2 = data.plan_list[data.employ_before_sum_list.length - 1].updated_at.slice(0, 10)
					this.latestUpdateTime3 = data.plan_list[data.employ_after_sum_list.length - 1].updated_at.slice(0, 10)
				} catch (e) {

				}

				const planList = data.plan_list.sort((a, b) => a.school_id - b.school_id)
				this.tableData = planList.map((i, index) => {
					let beforeInfo = data.employ_before_sum_list.find(j => j.school_id === i.school_id)
					let afterInfo = data.employ_after_sum_list.find(j => j.school_id === i.school_id)
					let len = data.plan_list.filter(j => j.school_id === i.school_id).length

					// 岗前 培训
					let employBefore = beforeInfo && extractFields(beforeInfo, [
						'actual_resume',
						'actual_interview_pass',
						'actual_training_before',
						'actual_pass_before'
					])

					// 岗后 培训
					let employAfter = afterInfo && extractFields(afterInfo, [
						'actual_sign',
						'actual_training_after',
						'actual_device',
						'actual_pass_after'
					])

					// 按照 校区分组 ，比如有3行北京数据，2行济南数据，只有第一行北京 有 _rowspan:2, 其他北京的 _rowspan:0, 第四行济南校区的 _rowspan:2,后面的 都是0
					let isFirst = index === 0
						? true
						: i.school_id !== data.plan_list[index - 1].school_id
					return {
						...i,
						...employBefore,
						...employAfter,
						_rowspan: isFirst || index === 0 ? len : 0
					}
				})
			}
		},
		created () {
			/**
			 * @desc 判断权限
			 */
			API.User.getPermissions().then(permissions => {
				const permissionArray = Object.values(permissions)
				Object.keys(this.permissions).forEach(key => {
					this.permissions[key] = !!(permissionArray.find(p => p === `/${key}`))
				})
			})
		},
		mounted () {
			this._initalizer()
		}
	}
</script>

<style lang="less" scoped>
    /deep/ .table-header-cell-parent {
        background: #000 !important;
    }

    .table-head {
        font-size: 16px;
        color: #000;
        margin-right: 10px;
    }

    .pain-title {
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
        margin-bottom: 30px;
        font-weight: bold;
        border-left: 2px solid #4a82f7;
    }

    .cmptCalendarTitles {
        color: #333333;
        height: 46px;
        background: rgba(209, 222, 239, 0.5);
        border-radius: 4px;
    }
</style>
