export const dashboard = {
	selectData: [
		{
			label: '学年',
			remoteOptions: [],
			valueFlag: 'year_id',
			basicInfoKey: 'years',
			/**
			 * @desc 这是一个回调函数，用于设置默认值，会在 filterData组件渲染完毕之后 调用
			 * @param ctx 当前选项
			 * @return {*}
			 */
			defaultValue: (ctx) => {
				const fullYear = new Date().getFullYear().toString().slice(2)
				const defaultV = ctx.remoteOptions.find(i => i.id == fullYear)
				return defaultV.id
			}
		},
		{
			label: '学期',
			remoteOptions: [],
			valueFlag: 'term_id',
			basicInfoKey: 'terms',
			defaultValue: (ctx) => {
				return ctx.remoteOptions[1].id
			}
		},
		{
			label: '基地',
			remoteOptions: [],
			optionsAll: 'hidden',
			valueFlag: 'school_ids',
			basicInfoKey: 'branchschools',
			multiple: true
		},
		{
			label: '教师类型',
			remoteOptions: [],
			customOptions: [
				{
					id: 4,
					name: '全职教师'
				}, {
					id: 6,
					name: '兼职教师'
				}
			],
			valueFlag: 'teacher_type_id',
			defaultValue: (ctx) => {
				return 4
			}
			// basicInfoKey: 'teachertypes'
		}
	]
}
