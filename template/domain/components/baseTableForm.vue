<template>
    <div>
        <el-form :model="form" ref="form" inline :rules="rules" v-bind="$attrs">
            <div v-if="filterData.selectData">
                <el-form-item v-for="(item,index) in formOptions.selectData"
                              :key="index"
                              :prop="item.valueFlag">
                    <span>{{item.label}}</span>
                    <el-select clearable v-model="form[item.valueFlag]" :multiple="item.multiple">
                        <el-option v-for="(options,index) in item.remoteOptions"
                                   :key="index"
                                   :label="options.name"
                                   :value="options.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right" v-if="actions">
                    <slot>
                        <el-button v-if="searchButton" type="primary" @click="$emit('searchClick',form)">搜索</el-button>
                        <el-button v-if="resetButton" type="primary" @click="restForm('form')">清空筛选条件</el-button>
                    </slot>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'

	// 数据层面的字段如果添加了下划线 表示只是用作 未来某个时刻的渲染
	const selectAll = {name: '全部', id: ''}

	export default {
		name: 'table-fliter',
		props: {
			searchButton: {
				type: Boolean,
				default: true
			},
			resetButton: {
				type: Boolean,
				default: true
			},
			actions: {
				type: Boolean,
				default: true
			},
			filterData: {
				type: [Object],
				default: function () {
					return {}
				}
			},
			rules: {
				type: [Object],
				default: function () {
					return {}
				}
			},
			autoRender: {
				type: [Boolean],
				default: false
			},
			value: {
				type: [Object],
				default: function () {
					return {}
				}
			}
		},
		data () {
			return {
				basicInfo: {}
				// form: {}
			}
		},
		computed: {
			...mapGetters('common', ['comBasicInfo']),
			formOptions () {
				return this.filterData
			},
			form: {
				get: function () {
					return this.value
				},
				set: function (v) {
					this.$emit('input', v)
				}
			}
		},
		methods: {
			...mapActions('common', ['getBasicInfo']),

			/**
			 * @desc 初始化 基础信息
			 * @return {Promise<void>}
			 * @private
			 */
			async _initModel () {
				let cache = window.localStorage.getItem('basicInfo')
				this.basicInfo = JSON.parse(cache) || await this.getBasicInfo()
				// this.basicInfo = await this.getBasicInfo()
				window.localStorage.setItem('basicInfo', JSON.stringify(this.basicInfo))
			},
			/**
			 * @desc 初始化 组件视图
			 * @return {Promise<void>}
			 * @private
			 */
			async _initView () {
				this.filterData.selectData = this.filterData.selectData.map(item => {
					let user = item.customOptions
					if (user) {

					}

					let remote = this.basicInfo[item.basicInfoKey]
					let all = selectAll
					return {
						...item,
						remoteOptions: remote
							? item.optionsAll === 'hidden'
								? user //optionsAll hidden
									? [...user, ...remote]
									: [...remote]
								: user //optionsAll
									? [all, ...user, ...remote]
									: [all, ...remote]
							: user
								? [...user]
								: []
					}
				})
			},

			/**
			 * @desc 初始化 自定义默认值
			 * @return {Promise<void>} 在父组件调用 此方法
			 */
			async _initDefaultValue () {
				await this.filterData.selectData.map(i => {
					const target = this.form
					const propertyName = i.valueFlag
					const value = Object.prototype.toString.call(i.defaultValue) === '[object Function]' ? i.defaultValue(i) : ''
					if (i.defaultValue && i.multiple && !Array.isArray(value)) {
						console.error(i.label + '选项支持多选 multiple：true，defaultValue 返回值必须为 数组 ')
						return
					}
					this.$set(target, propertyName, value)
				})
				return Promise.resolve(this.form)
			},

			/**
			 * @desc 初始化
			 * @return {Promise<void>}
			 */
			async initialize () {
				await this._initModel()
				await this._initView()
				return this._initDefaultValue()
			},

			/**
			 * @desc 重置 搜索表单
			 * @param formName
			 */
			restForm (formName) {
				this.$refs[formName].resetFields()
			},
			validate () {
				if (Object.keys(this.rules).length === 0) {
					throw new Error(`调用了组件 ${this.$options.name} 的验证方法，但是 rules 为空，父组件 ${this.$parent.$options.name}`)
				}
				return this.$refs['form'].validate()
			}
		},
		created () {
			// 是否自动 初始化 ，如果需要初始值，设置为false
			// eslint-disable-next-line no-unused-expressions
			this.autoRender ? this.initialize() : null
		}
	}
</script>

<style scoped>

</style>
